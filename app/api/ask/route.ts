// app/api/ask/route.ts — Ask: a grounded answer over the retrieved passages. Grounds on BOTH
// the candidate's distilled note passages (passed from /api/search, displayed as citations) AND
// the private ebook grounding index (verbatim course text, server-only) so answers carry the
// ebook's specifics — the enumerated fee lists, exact day-counts — that the notes distill away.
//
// SYNTH-ONLY: ebook text is used only to ground Claude; it is NEVER returned to the client. The
// answer is synthesized; citations point to the reader (note units + ebook page refs), never to
// verbatim ebook prose. Copied from app/api/explain/route.ts (KV cache, daily cap, degrade).
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import Anthropic from '@anthropic-ai/sdk';
import { getSearchIndex, getSourceIndex } from '@/lib/content';
import { dot, normalizeQuery, normalizeVector, readerRouteFor, type SearchResult } from '@/lib/search';

const client = new Anthropic();

const MODEL = 'claude-haiku-4-5-20251001'; // one-line constant — bump if a session needs Sonnet
const MAX_TOKENS = 420;                     // room for a compact enumerated list
const DAILY_CAP = 180;                      // the $2.50 guarantee (§1)
const EMBED_MODEL = 'text-embedding-3-small';
const EMBED_DIMS = 512;
const EBOOK_TOP_K = 6;
const EBOOK_MIN_SCORE = 0.30;   // drop weak ebook matches so we don't ground on noise
const EBOOK_PASSAGE_CHARS = 1400;

const SYSTEM_PROMPT = `You answer a self-studying SAFE Mortgage Loan Originator exam candidate's question using ONLY the passages provided — both the candidate's own note passages and passages from the course ebook. Ground every claim in them. The ebook passages are the authoritative source for specifics, exact lists, and numbers, so prefer them when they add detail the notes leave out. If a passage carries a number, threshold, day-count, or dollar amount that answers the question, state it exactly. If the passages don't contain the answer, say so plainly and name the closest topic — do not fill from outside knowledge.

Plain English, sentence case, active voice. Default to 2-3 sentences. When the question asks for an enumeration (e.g. "what fees", "which documents", "what types"), answer with a one-line lead then a compact list of the items as brief labels — do not copy long passages verbatim. No throat-clearing, no "great question," no restating the question. No self-referential preface — never open with "based on your notes," "from the passages," "from the ebook," or any variant; state the fact directly. Wrap the single most important value in <span class="hl">…</span> when there is one clear key value.`;

function buildCacheKey(q: string) {
  // v2 namespace: the value shape changed from a plain string (answer only) to { answer, cites }
  // when ebook grounding landed. A fresh prefix avoids reading stale string-format entries.
  return `ask:v2:${createHash('sha256').update(normalizeQuery(q)).digest('hex')}`;
}

function todayKey(userId: string) {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  return `ratelimit:ask:${userId}:${ymd}`;
}

function tomorrowMidnightUTC() {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
}

type Cite = { id: string; route: string; unitId: string; unitName: string; heading: string; gi?: number; kind: string };

async function embedQuery(q: string): Promise<number[] | null> {
  try {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: EMBED_MODEL, input: q, dimensions: EMBED_DIMS }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data: { embedding: number[] }[] };
    return normalizeVector(json.data[0].embedding);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: { q?: string; results?: SearchResult[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }
  const q = typeof body.q === 'string' ? body.q.trim() : '';
  const results = Array.isArray(body.results) ? body.results : [];
  if (q.length < 3 || q.length > 300) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  let kv: typeof import('@/lib/kvServer').kv | null = null;
  try {
    kv = (await import('@/lib/kvServer')).kv;
  } catch { /* KV not available */ }

  // Note passages (displayed citations) — resolve full text from the notes index by id.
  const notesIndex = getSearchIndex();
  const noteById = new Map(notesIndex.map((c) => [c.id, c]));
  const topNotes = results.slice(0, 5);
  const noteCites: Cite[] = topNotes.map((r) => ({
    id: r.id, route: r.route, unitId: r.unitId, unitName: r.unitName, heading: r.heading, gi: r.gi, kind: r.kind,
  }));

  const cacheKey = buildCacheKey(q);
  if (kv) {
    try {
      const cached = await kv.get<{ answer: string; cites: Cite[] }>(cacheKey);
      if (cached && typeof cached === 'object' && typeof cached.answer === 'string') {
        return NextResponse.json({ ...cached, cached: true });
      }
    } catch { /* cache miss */ }
  }

  // Daily Ask cap — the hard budget ceiling.
  if (kv) {
    try {
      const count = (await kv.get<number>(todayKey(userId))) ?? 0;
      if (count >= DAILY_CAP) {
        return NextResponse.json({ error: 'rate_limit_exceeded', resets_at: tomorrowMidnightUTC() }, { status: 429 });
      }
    } catch { /* skip cap if KV unavailable */ }
  }

  // Ebook grounding (private, server-only). Absent locally → skip → notes-only, as before.
  const sourceIndex = getSourceIndex();
  const ebookPassages: { page: number; title: string; text: string; chapterId: string; sectionId: string }[] = [];
  if (sourceIndex.length) {
    const qvec = await embedQuery(q);
    if (qvec) {
      const scored = sourceIndex
        .map((c) => ({ c, score: dot(qvec, c.embedding) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, EBOOK_TOP_K)
        .filter((x) => x.score >= EBOOK_MIN_SCORE);
      for (const { c } of scored) {
        ebookPassages.push({ page: c.page, title: c.sectionTitle, text: c.text, chapterId: c.chapterId, sectionId: c.sectionId });
      }
    }
  }

  // Build grounding context: note passages + ebook passages.
  const noteBlocks = topNotes
    .map((r) => `[${r.unitName} · ${r.heading}] ${noteById.get(r.id)?.text ?? r.snippet}`)
    .join('\n\n');
  const ebookBlocks = ebookPassages
    .map((p) => `[Ebook p.${p.page}${p.title ? ' · ' + p.title : ''}] ${p.text.slice(0, EBOOK_PASSAGE_CHARS)}`)
    .join('\n\n');
  const sections = [
    noteBlocks && `Note passages:\n${noteBlocks}`,
    ebookBlocks && `Ebook passages:\n${ebookBlocks}`,
  ].filter(Boolean).join('\n\n');

  if (!sections) return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  const userPrompt = `Question: ${q}\n\n${sections}\n\nAnswer.`;

  let answer: string;
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: userPrompt }],
    });
    answer = (response.content[0] as { type: 'text'; text: string }).text.trim();
  } catch {
    return NextResponse.json({ error: 'api_error' }, { status: 500 });
  }

  // Citations: note cites first, then up to 3 ebook page refs (deduped by ebook section).
  // Ebook cites carry only a page number + section title (no verbatim text) and deep-link to
  // the matching reader chapter when one exists.
  const ebookCites: Cite[] = [];
  const seenSecs = new Set<string>();
  for (const p of ebookPassages) {
    const key = p.sectionId || `p${p.page}`;
    if (seenSecs.has(key)) continue;
    seenSecs.add(key);
    const route = readerRouteFor(p.chapterId);
    ebookCites.push({
      id: `src:${p.page}`,
      route,
      unitId: p.sectionId,
      unitName: 'ebook',
      heading: `p.${p.page}${p.title ? ' · ' + p.title : ''}`,
      kind: 'source',
    });
    if (ebookCites.length >= 3) break;
  }
  const cites = [...noteCites, ...ebookCites].slice(0, 7);

  if (kv) {
    try { await kv.set(cacheKey, { answer, cites }, { ex: 60 * 60 * 24 * 90 }); } catch { /* non-fatal */ }
    try {
      const ttl = tomorrowMidnightUTC() - Math.floor(Date.now() / 1000);
      await kv.incr(todayKey(userId));
      await kv.expire(todayKey(userId), ttl);
    } catch { /* non-fatal */ }
  }

  return NextResponse.json({ answer, cites });
}

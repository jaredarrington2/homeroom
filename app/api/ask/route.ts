// app/api/ask/route.ts — Ask: a 2–3 sentence answer grounded ONLY in the retrieved passages.
// Copied from app/api/explain/route.ts (Anthropic client, KV response cache, daily cap, cached
// system prompt, graceful degrade). This is the ONLY part of search that spends Claude credits.
//
// The $2.50 budget guarantee is the daily Ask cap (180/user/day at Haiku ≈ $0.63 ceiling). The
// client passes the Find results it already has; we look each passage's FULL text up from the
// server-side index by id (the client only holds truncated snippets) for tight grounding.
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import Anthropic from '@anthropic-ai/sdk';
import { getSearchIndex } from '@/lib/content';
import { normalizeQuery, type SearchResult } from '@/lib/search';

const client = new Anthropic();

const MODEL = 'claude-haiku-4-5-20251001'; // one-line constant — bump if a session needs Sonnet
const MAX_TOKENS = 320;
const DAILY_CAP = 180; // the $2.50 guarantee (§1)

const SYSTEM_PROMPT = `You answer a self-studying SAFE MLO exam candidate's question using ONLY the note passages provided. Ground every claim in them. If a passage carries a number, threshold, day-count, or dollar amount that answers the question, state it exactly. If the passages don't contain the answer, say so plainly and name the closest passage — do not fill from outside knowledge. Plain English, sentence case, active voice. 2-3 sentences, hard cap. No throat-clearing, no "great question," no restating the question. No self-referential preface — never open with "based on your notes," "from the passages," "grounded in the sources," or any variant; state the fact directly. Wrap the single most important value in <span class="hl">…</span>.`;

function buildCacheKey(q: string) {
  return `ask:${createHash('sha256').update(normalizeQuery(q)).digest('hex')}`;
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
  if (q.length < 3 || q.length > 300 || !results.length) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  let kv: typeof import('@/lib/kvServer').kv | null = null;
  try {
    kv = (await import('@/lib/kvServer')).kv;
  } catch { /* KV not available */ }

  // Resolve the top-5 passages to their full text from the server index (not the client snippet).
  const index = getSearchIndex();
  const byId = new Map(index.map((c) => [c.id, c]));
  const top = results.slice(0, 5);
  const cites: Cite[] = top.map((r) => ({
    id: r.id, route: r.route, unitId: r.unitId, unitName: r.unitName, heading: r.heading, gi: r.gi, kind: r.kind,
  }));

  const cacheKey = buildCacheKey(q);
  if (kv) {
    try {
      const cached = await kv.get<string>(cacheKey);
      if (cached) return NextResponse.json({ answer: cached, cites, cached: true });
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

  const passages = top
    .map((r) => {
      const full = byId.get(r.id);
      const text = full?.text ?? r.snippet;
      return `[${r.unitName} · ${r.heading}] ${text}`;
    })
    .join('\n\n');
  const userPrompt = `Question: ${q}\n\nNote passages:\n${passages}\n\nAnswer.`;

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

  if (kv) {
    try { await kv.set(cacheKey, answer, { ex: 60 * 60 * 24 * 90 }); } catch { /* non-fatal */ }
    try {
      const ttl = tomorrowMidnightUTC() - Math.floor(Date.now() / 1000);
      await kv.incr(todayKey(userId));
      await kv.expire(todayKey(userId), ttl);
    } catch { /* non-fatal */ }
  }

  return NextResponse.json({ answer, cites });
}

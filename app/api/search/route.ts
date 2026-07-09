// app/api/search/route.ts — Find: semantic retrieval over the committed search index.
// Copied from app/api/explain/route.ts (X-User-Id gate, KV response cache, graceful degrade).
// Find is FREE — one tiny query embed + in-memory cosine — so there is NO Claude call and no
// daily Ask cap here (a loose abuse guard only). The index and its vectors stay server-side.
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { getSearchIndex } from '@/lib/content';
import { dot, normalizeQuery, normalizeVector, rareTokens, type SearchResult } from '@/lib/search';

const EMBED_MODEL = 'text-embedding-3-small';
const EMBED_DIMS = 512;
const TOP_K = 8;
const LEXICAL_BOOST = 0.08; // additive rescue for exact literal-token hits (numbers, §, codes)

function buildCacheKey(q: string) {
  return `search:${createHash('sha256').update(normalizeQuery(q)).digest('hex')}`;
}

function todayKey(userId: string) {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  return `ratelimit:search:${userId}:${ymd}`;
}

function tomorrowMidnightUTC() {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
}

async function embedQuery(q: string): Promise<number[]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBED_MODEL, input: q, dimensions: EMBED_DIMS }),
  });
  if (!res.ok) throw new Error(`embed ${res.status}`);
  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return normalizeVector(json.data[0].embedding);
}

/** ~220-char snippet centered on the first literal query-token hit; head of text otherwise. */
function makeSnippet(text: string, q: string): string {
  const toks = q.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  let at = -1;
  const lower = text.toLowerCase();
  for (const t of toks) {
    const i = lower.indexOf(t);
    if (i !== -1) { at = i; break; }
  }
  if (at < 0 || text.length <= 240) return text.length <= 240 ? text : text.slice(0, 220).trimEnd() + '…';
  const start = Math.max(0, at - 90);
  const end = Math.min(text.length, start + 220);
  return (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '');
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: { q?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }
  const q = typeof body.q === 'string' ? body.q.trim() : '';
  if (q.length < 2 || q.length > 1000) return NextResponse.json({ error: 'invalid_input' }, { status: 400 });

  // KV (gracefully skipped if not provisioned)
  let kv: typeof import('@/lib/kvServer').kv | null = null;
  try {
    kv = (await import('@/lib/kvServer')).kv;
  } catch { /* KV not available */ }

  const cacheKey = buildCacheKey(q);
  if (kv) {
    try {
      const cached = await kv.get<SearchResult[]>(cacheKey);
      if (cached) return NextResponse.json({ results: cached, cached: true });
    } catch { /* cache miss */ }
  }

  // Loose abuse guard (Find costs ~nothing, so this is generous — not the $2.50 cap).
  if (kv) {
    try {
      const count = (await kv.get<number>(todayKey(userId))) ?? 0;
      if (count >= 2000) {
        return NextResponse.json({ error: 'rate_limit_exceeded', resets_at: tomorrowMidnightUTC() }, { status: 429 });
      }
    } catch { /* skip guard if KV unavailable */ }
  }

  const index = getSearchIndex();
  if (!index.length) return NextResponse.json({ results: [] });

  let qvec: number[];
  try {
    qvec = await embedQuery(q);
  } catch {
    return NextResponse.json({ error: 'api_error' }, { status: 500 });
  }

  const literals = rareTokens(q);
  const scored = index.map((c) => {
    let score = dot(qvec, c.embedding);
    if (literals.length) {
      const hay = c.text.toLowerCase();
      if (literals.some((t) => hay.includes(t))) score += LEXICAL_BOOST;
    }
    return { c, score };
  });
  scored.sort((a, b) => b.score - a.score);

  const results: SearchResult[] = scored.slice(0, TOP_K).map(({ c, score }) => ({
    id: c.id, route: c.route, module: c.module, unitId: c.unitId, unitName: c.unitName,
    heading: c.heading, kind: c.kind, gi: c.gi, snippet: makeSnippet(c.text, q),
    score: Math.round(score * 1000) / 1000,
  }));

  if (kv) {
    try { await kv.set(cacheKey, results, { ex: 60 * 60 * 24 * 90 }); } catch { /* non-fatal */ }
    try {
      const ttl = tomorrowMidnightUTC() - Math.floor(Date.now() / 1000);
      await kv.incr(todayKey(userId));
      await kv.expire(todayKey(userId), ttl);
    } catch { /* non-fatal */ }
  }

  return NextResponse.json({ results });
}

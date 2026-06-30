import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import Anthropic from '@anthropic-ai/sdk';
import { getSectionContent } from '@/lib/content';
import type { Concept } from '@/lib/types';

const client = new Anthropic();

const SYSTEM_PROMPT = `You explain passages from a SAFE Mortgage Loan Originator exam study guide to a self-studying adult. The reader highlighted a passage they didn't understand. Your job is to explain it clearly in 2-3 sentences.

Rules:
- Plain English. Sentence case. Active voice.
- If the highlighted text contains a number, threshold, day count, or dollar amount, repeat the number exactly.
- Ground your explanation in the section context provided. Do not introduce concepts from elsewhere in mortgage law unless they're necessary to explain the passage.
- If the passage is a definition, explain what the term means in practice — what it does, when it applies, why it matters.
- If the passage is a rule, explain the trigger and the consequence.
- If the passage is a number or threshold, explain what it gates.
- No throat-clearing. No "great question." No "let's break this down." No "in other words." No padding.
- 2-3 sentences. Hard cap. If you can do it in one, do it in one.
- Never speculate beyond what's in the section context. If the highlight is ambiguous, say "this depends on context not shown — try selecting a fuller passage."`;

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

function buildCacheKey(sectionId: string, text: string) {
  const hash = createHash('sha256').update(`${sectionId}::${normalize(text)}`).digest('hex');
  return `explain:${hash}`;
}

function findMatchingConcept(concepts: Concept[], text: string): Concept | null {
  const norm = normalize(text);
  return concepts.find(c =>
    norm.includes(normalize(c.term)) || normalize(c.term).includes(norm) ||
    (c.definition && normalize(c.definition).includes(norm))
  ) ?? null;
}

function todayKey(userId: string) {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  return `ratelimit:explain:${userId}:${ymd}`;
}

function tomorrowMidnightUTC() {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: { text?: string; sectionId?: string; sectionTitle?: string; chapterId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const { text, sectionId, sectionTitle, chapterId } = body;
  if (!text || !sectionId || !sectionTitle || typeof text !== 'string') {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }
  if (text.length < 5 || text.length > 500) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  // Try KV (gracefully skipped if not provisioned)
  let kv: typeof import('@/lib/kvServer').kv | null = null;
  try {
    const mod = await import('@/lib/kvServer');
    kv = mod.kv;
  } catch {
    // KV not available
  }

  const cacheKey = buildCacheKey(sectionId, text);

  // Check response cache
  if (kv) {
    try {
      const cached = await kv.get<string>(cacheKey);
      if (cached) {
        return NextResponse.json({ explanation: cached, cached: true });
      }
    } catch {
      // cache miss, continue
    }
  }

  // Check rate limit
  const DAILY_CAP = 200;
  const rateLimitKey = todayKey(userId);
  if (kv) {
    try {
      const count = await kv.get<number>(rateLimitKey) ?? 0;
      if (count >= DAILY_CAP) {
        return NextResponse.json(
          { error: 'rate_limit_exceeded', resets_at: tomorrowMidnightUTC() },
          { status: 429 }
        );
      }
    } catch {
      // skip rate limiting if KV unavailable
    }
  }

  // Load section content for grounding
  const content = chapterId ? getSectionContent(chapterId, sectionId) : null;
  const matchedConcept = content ? findMatchingConcept(content.concepts, text) : null;

  let userPrompt = `Section: ${sectionTitle}\n\n`;
  if (content?.summary) {
    userPrompt += `Section context:\n${content.summary}\n\n`;
  }
  if (matchedConcept) {
    userPrompt += `Concept: ${matchedConcept.term}\nDefinition: ${matchedConcept.definition}`;
    if (matchedConcept.why_it_exists) {
      userPrompt += `\nWhy it exists: ${matchedConcept.why_it_exists}`;
    }
    userPrompt += '\n\n';
  }
  userPrompt += `Highlighted text:\n"${text}"\n\nExplain.`;

  let explanation: string;
  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 250,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: userPrompt }],
    });
    explanation = (response.content[0] as { type: 'text'; text: string }).text.trim();
  } catch {
    return NextResponse.json({ error: 'api_error' }, { status: 500 });
  }

  // Cache response and increment rate limit counter
  if (kv) {
    try {
      await kv.set(cacheKey, explanation, { ex: 60 * 60 * 24 * 90 }); // 90 days
    } catch { /* non-fatal */ }
    try {
      const ttl = tomorrowMidnightUTC() - Math.floor(Date.now() / 1000);
      await kv.incr(rateLimitKey);
      await kv.expire(rateLimitKey, ttl);
    } catch { /* non-fatal */ }
  }

  return NextResponse.json({ explanation });
}

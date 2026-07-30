// app/api/mentor/route.ts — the deal-desk mentor: a short-answer chat coach for the
// Module 6 pricing + lock simulation. Mirrors /api/explain's posture: server-side key,
// KV rate limit (graceful without KV), de-LLM voice rules in the system prompt.
//
// Model: claude-opus-5 with effort low — snappy, and strong enough to coach pricing
// mechanics accurately. Server-side refusal fallback is enabled (Opus 4.8 as the
// fallback) so a classifier decline re-runs there instead of surfacing an error.
// In-session chat only; nothing is persisted server-side beyond the rate-limit
// counter.
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { PRODUCTS, SCENARIO } from '@/content/module6/dealDesk';

const client = new Anthropic();

const inel = PRODUCTS.filter(p => !p.eligible)
  .map(p => `${p.name}: ${p.reason}`)
  .join('; ');

const SYSTEM_PROMPT = `You are an experienced pricing-desk mentor at ${SCENARIO.lender}, sitting beside a student loan originator who is working a pricing-and-lock simulation inside a SAFE MLO exam course. They can ask you anything while they price the file.

The file on their screen: borrower ${SCENARIO.borrower}, ${SCENARIO.purpose.toLowerCase()} of a ${SCENARIO.propertyType.toLowerCase()} in ${SCENARIO.location}, value $${SCENARIO.value.toLocaleString()}, loan $${SCENARIO.loan.toLocaleString()} (LTV ${SCENARIO.ltv}), credit score ${SCENARIO.fico}, DTI ${SCENARIO.dti}. Ineligible products and why: ${inel}.

How the simulated desk works (this matches the course material): the search takes a desired price and lock period BEFORE any product is returned. A product's final price is its base price plus a lock-period adjustment plus the loan-level adjustment stack (credit score by LTV, property type, occupancy). Price below 100 means the borrower pays points; above 100 generates a lender credit. A lock is a REQUEST — the file sits Lock pending until the secondary desk accepts, and it needs the borrower's SSN and an assigned loan officer first. A lock holds the rate and points against the market only: not lender fees, not approval, and a material file change (low appraisal, score drop, occupancy change) re-prices even a locked loan. One discount point costs 1% of the loan amount. Lender-paid compensation is built into the rate; borrower-paid strips it out and the borrower pays origination directly.

Rules:
- 1-4 sentences. Plain English, sentence case, active voice. You are a colleague, not a textbook.
- When a number matters, use the actual numbers from this file.
- Coach, don't do the work. If they ask which row to pick for the graded prompt (least cash to close), explain how to read the points/credit column and what premium pricing does — do not name the row or the rate.
- If they ask something outside pricing and locking, answer briefly if it's mortgage-related, and steer back to the desk.
- No "great question", no "let's", no pep talk, no emoji. Never announce what you're about to explain — just explain it.
- This is a course simulation with illustrative pricing, not live rates or financial advice. If asked for real-world rate predictions or personal financial advice, say that's outside the desk.`;

type ChatMsg = { role: 'user' | 'assistant'; content: string };

function todayKey(userId: string) {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  return `ratelimit:mentor:${userId}:${ymd}`;
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

  let body: { messages?: ChatMsg[]; desk?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 24) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }
  for (const m of messages) {
    if ((m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string' || m.content.length === 0 || m.content.length > 1500) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }
  }
  if (messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }
  const desk = typeof body.desk === 'string' ? body.desk.slice(0, 300) : '';

  // KV rate limit — gracefully skipped if not provisioned
  let kv: typeof import('@/lib/kvServer').kv | null = null;
  try {
    const mod = await import('@/lib/kvServer');
    kv = mod.kv;
  } catch {
    // KV not available
  }

  const DAILY_CAP = 300;
  const rateLimitKey = todayKey(userId);
  if (kv) {
    try {
      const count = (await kv.get<number>(rateLimitKey)) ?? 0;
      if (count >= DAILY_CAP) {
        return NextResponse.json(
          { error: 'rate_limit_exceeded', resets_at: tomorrowMidnightUTC() },
          { status: 429 },
        );
      }
    } catch {
      // skip rate limiting if KV unavailable
    }
  }

  // The desk snapshot rides on the final user turn (never in system — the system
  // prompt stays byte-stable so its cache breakpoint holds).
  const apiMessages: ChatMsg[] = messages.map((m, i) =>
    i === messages.length - 1 && desk
      ? { role: m.role, content: `[desk right now: ${desk}]\n\n${m.content}` }
      : { role: m.role, content: m.content },
  );

  let reply: string;
  try {
    const response = await client.beta.messages.create({
      model: 'claude-opus-5',
      max_tokens: 600, // deliberately short coaching answers
      output_config: { effort: 'low' },
      betas: ['server-side-fallback-2026-06-01'],
      fallbacks: [{ model: 'claude-opus-4-8' }],
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: apiMessages,
    });

    if (response.stop_reason === 'refusal') {
      reply = "That one's outside what the desk can help with. Ask me about pricing this file.";
    } else {
      const textBlock = response.content.find(b => b.type === 'text');
      reply = textBlock && 'text' in textBlock ? textBlock.text.trim() : '';
    }
    if (!reply) {
      return NextResponse.json({ error: 'api_error' }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: 'api_error' }, { status: 500 });
  }

  if (kv) {
    try {
      const ttl = tomorrowMidnightUTC() - Math.floor(Date.now() / 1000);
      await kv.incr(rateLimitKey);
      await kv.expire(rateLimitKey, ttl);
    } catch {
      /* non-fatal */
    }
  }

  return NextResponse.json({ reply });
}

// app/api/grade/route.ts — semantic grading for inline recall.
// Mirrors the /api/explain pattern: server-side key, optional KV cache, graceful degrade.
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import crypto from "crypto";
// import { kv } from "@vercel/kv"; // uncomment once KV is provisioned

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You grade a single mortgage-licensing flashcard answer against the canonical answer.
- Grade MEANING, not wording. Synonyms, paraphrases, and abbreviations are fully correct.
- Be STRICT on the tested fact: the specific number, amount, percentage, day-count, threshold, or named entity must match. A wrong or missing number is not "correct".
- "partial" = right idea but missing a required element or a near-miss on a number. "incorrect" = wrong or off-topic.
- Feedback = ONE short sentence naming what's right or missing. No praise, no preamble.
Respond with ONLY a JSON object, no markdown: {"verdict":"correct"|"partial"|"incorrect","feedback":"..."}`;

type Verdict = "correct" | "partial" | "incorrect";

export async function POST(req: NextRequest) {
  try {
    const { question, canonical, answer } = await req.json();
    if (!question || !canonical || typeof answer !== "string" || answer.trim().length === 0) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }
    if (answer.length > 600) {
      return NextResponse.json({ error: "too_long" }, { status: 400 });
    }

    // Cache key on (question + normalized answer). Enable once KV is provisioned.
    const hash = crypto.createHash("sha256")
      .update(question + "|" + answer.trim().toLowerCase()).digest("hex");
    // const cached = await kv.get(`grade:${hash}`);
    // if (cached) return NextResponse.json(cached);

    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001", // bump to claude-sonnet-4-6 if you want stricter grading
      max_tokens: 200,
      system: SYSTEM,
      messages: [{
        role: "user",
        content: `QUESTION: ${question}\nCANONICAL ANSWER: ${canonical}\nSTUDENT ANSWER: ${answer}`,
      }],
    });

    const text = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text).join("").trim().replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text) as { verdict: Verdict; feedback: string };
    if (!["correct", "partial", "incorrect"].includes(parsed.verdict)) {
      throw new Error("bad_verdict");
    }
    // await kv.set(`grade:${hash}`, parsed, { ex: 60 * 60 * 24 * 90 });
    void hash;
    return NextResponse.json(parsed);
  } catch (e) {
    // Client falls back to its local grader on any non-200.
    return NextResponse.json({ error: "grade_failed" }, { status: 500 });
  }
}

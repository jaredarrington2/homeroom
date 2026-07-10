/**
 * scripts/generate-application-audio.ts — pre-generate the scripted chapter voiceovers
 * for Module 6 Stage 1 (the Application). One mp3 per chapter, from the authored VOICEOVER
 * scripts in content/module6/application.ts — NOT a reading of the form fields.
 *
 * Runs LOCALLY ONLY (same posture as generate-audio.ts). The deployed app only plays the
 * static mp3s this writes into public/audio/application/. Key from .env.local, never shipped.
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-application-audio.ts          # dry run (cost)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-application-audio.ts --build  # generate
 *
 * Skips any chapter whose mp3 already exists. Commit public/audio/application/.
 */
import * as fs from "fs";
import * as path from "path";
import { CHAPTERS, VOICEOVER } from "../content/module6/application";

// The audio for a chapter = the on-screen intro paragraph, then the deeper walk-through.
const scriptFor = (chId: string, intro: string): string =>
  VOICEOVER[chId] ? `${intro} ${VOICEOVER[chId]}` : "";

const MODEL_ID = "gpt-4o-mini-tts";
const VOICE = "ash"; // same narrator as the reader
const INSTRUCTIONS =
  "Accent: a STRONG, broad Australian accent — unmistakably and heavily Australian, the way a working " +
  "bloke from the Sydney suburbs actually talks. NOT neutral, NOT American, NOT British. Lean hard into " +
  "broad-Australian vowels, drop the 'r's (non-rhotic), relaxed nasal drawl with a slight upward lilt at " +
  "sentence ends. A man in his late thirties. Warm, easy and conversational — like a mate walking you " +
  "through it — at a steady audiobook pace for studying. Grounded, never theatrical, but the heavy Aussie " +
  "accent must be obvious in every sentence.";
const USD_PER_MIN = 0.015;
const CHARS_PER_SEC = 14.5;
const MAX_INPUT = 4096;

const AUDIO_DIR = path.join(process.cwd(), "public", "audio", "application");

function loadApiKey(): string {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
      const m = /^\s*OPENAI_API_KEY\s*=\s*(.+?)\s*$/.exec(line);
      if (m) return m[1].replace(/^['"]|['"]$/g, "");
    }
  }
  return process.env.OPENAI_API_KEY || "";
}

async function tts(text: string, apiKey: string): Promise<Buffer> {
  const url = "https://api.openai.com/v1/audio/speech";
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: MODEL_ID, voice: VOICE, input: text, instructions: INSTRUCTIONS, response_format: "mp3" }),
    });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    const body = await res.text();
    if (attempt === 0 && (res.status === 429 || res.status >= 500)) {
      console.warn(`    ${res.status} — retrying in 2s…`);
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }
    throw new Error(`OpenAI TTS ${res.status}: ${body.slice(0, 300)}`);
  }
  throw new Error("unreachable");
}

function costTable() {
  console.log("\n  chapter   question                     chars");
  console.log("  ------------------------------------------------");
  let total = 0;
  for (const ch of CHAPTERS) {
    const c = scriptFor(ch.id, ch.intro).length;
    total += c;
    console.log(`  ${ch.id.padEnd(9)} ${ch.q.padEnd(28)} ${String(c).padStart(5)}`);
  }
  console.log("  ------------------------------------------------");
  const mins = total / CHARS_PER_SEC / 60;
  console.log(`  TOTAL ${String(total).padStart(38)}`);
  console.log(`\n  ${MODEL_ID} (~$${USD_PER_MIN}/audio-min) → ~${mins.toFixed(1)} min ≈ ~$${(mins * USD_PER_MIN).toFixed(2)} (pay-as-you-go, rough).\n`);
}

async function build() {
  const apiKey = loadApiKey();
  if (!apiKey) { console.error("\n  OPENAI_API_KEY not found in .env.local.\n"); process.exit(1); }
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  let made = 0, skipped = 0;
  for (const ch of CHAPTERS) {
    const script = scriptFor(ch.id, ch.intro);
    if (!script) { console.warn(`  ${ch.id}: no script, skipping`); continue; }
    const mp3 = path.join(AUDIO_DIR, `${ch.id}.mp3`);
    if (fs.existsSync(mp3)) { skipped++; continue; }
    process.stdout.write(`  ${ch.id} (${script.length})… `);
    const buf = await tts(script.slice(0, MAX_INPUT), apiKey);
    fs.writeFileSync(mp3, buf);
    made++; console.log("ok");
    await new Promise((r) => setTimeout(r, 200));
  }
  console.log(`\n  Done. ${made} mp3s generated, ${skipped} already existed. Commit public/audio/application/.\n`);
}

async function main() {
  costTable();
  if (!process.argv.includes("--build")) {
    console.log("  Dry run — nothing generated. Re-run with --build to generate.\n");
    return;
  }
  await build();
}

main().catch((e) => { console.error(e); process.exit(1); });

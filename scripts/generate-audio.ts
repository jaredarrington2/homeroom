/**
 * scripts/generate-audio.ts — pre-generate narration for the Module 3 reader via OpenAI TTS.
 *
 * Runs LOCALLY ONLY. The deployed app never calls any TTS API — it plays the static mp3s
 * this writes into public/audio/. The API key lives only in .env.local (gitignored) and is
 * read from there; it is never committed and never shipped.
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-audio.ts            # dry run (cost only)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-audio.ts --unit=ecoa
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-audio.ts --all
 *
 * A bare run prints the per-unit character table + total cost and generates nothing.
 * Generation skips any segment whose mp3 already exists, so a re-run continues rather than
 * re-charging. To regenerate a unit after a content edit: delete public/audio/<unitId>/ and
 * re-run. Commit the mp3s + manifests.
 *
 * Pay-as-you-go: gpt-4o-mini-tts is billed by audio length (~$0.015/min), no subscription and
 * no expiring credits. It takes a free-text `instructions` field that steers accent / age /
 * delivery — that's how we get an Australian-male narrator instead of the fixed US voices.
 * Swap INSTRUCTIONS to retune the voice; VOICE is the base timbre.
 */
import * as fs from "fs";
import * as path from "path";
import section3 from "../content/sections/section-3";
import { unitManifest, isSegment, type UnitManifest } from "../lib/audioText";

const MODEL_ID = "gpt-4o-mini-tts"; // steerable via `instructions`; tts-1 has no accent control
const VOICE = "ash";                // male base timbre. Other male options: onyx, echo, ballad, verse
const INSTRUCTIONS =
  "Accent: a STRONG, broad Australian accent — unmistakably and heavily Australian, the way a working " +
  "bloke from the Sydney suburbs actually talks. NOT neutral, NOT American, NOT British. Lean hard into " +
  "broad-Australian vowels ('day/mate' flatten toward 'die/mite', long vowels broadened), drop the 'r's " +
  "(non-rhotic), and use the relaxed nasal drawl with a slight upward lilt at the end of sentences. " +
  "A man in his late thirties. Warm, easy and conversational — like a mate walking you through it — at a " +
  "steady audiobook pace for studying. Grounded, never theatrical, but the heavy Aussie accent must be " +
  "obvious in every sentence.";
const USD_PER_MIN = 0.015;          // gpt-4o-mini-tts is billed by audio minutes (rough estimate only)
const CHARS_PER_SEC = 14.5;         // ~spoken pace, for the minutes estimate

const AUDIO_ROOT = path.join(process.cwd(), "public", "audio");
const REQUEST_GAP_MS = 200;

// Generic spoken cues for interactive gates (generated once, reused across every unit).
// The player plays a chime, then the matching cue, then stops — the question itself is never read.
const CUES: Record<string, string> = {
  synth: "Question on screen.",
  definitions: "Definitions on screen.",
  flashcards: "Flashcards on screen.",
  mcq: "Questions on screen.",
};
const MAX_INPUT = 4096; // OpenAI per-request input limit (our paragraph segments are well under)

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

function parseArgs() {
  const args = process.argv.slice(2);
  const all = args.includes("--all");
  const unitArg = args.find((a) => a.startsWith("--unit="));
  const unit = unitArg ? unitArg.slice("--unit=".length) : null;
  return { all, unit, dryRun: !all && !unit };
}

function targetManifests(unit: string | null): UnitManifest[] {
  if (unit) {
    const u = section3.units.find((x) => x.id === unit);
    if (!u) { console.error(`No unit "${unit}". Ids: ${section3.units.map((x) => x.id).join(", ")}`); process.exit(1); }
    return [unitManifest(u)];
  }
  return section3.units.map(unitManifest);
}

const charsOf = (m: UnitManifest) => m.items.filter(isSegment).reduce((n, s) => n + s.text.length, 0);

function printCostTable(manifests: UnitManifest[]) {
  console.log("\n  unit                chars   segments");
  console.log("  ----------------------------------------");
  let totalChars = 0, totalSegs = 0, overLimit = 0;
  for (const m of manifests) {
    const c = charsOf(m);
    const segs = m.items.filter(isSegment).length;
    overLimit += m.items.filter((i) => isSegment(i) && i.text.length > MAX_INPUT).length;
    totalChars += c; totalSegs += segs;
    console.log(`  ${m.unitId.padEnd(18)} ${String(c).padStart(6)}   ${String(segs).padStart(5)}`);
  }
  console.log("  ----------------------------------------");
  console.log(`  ${"TOTAL".padEnd(18)} ${String(totalChars).padStart(6)}   ${String(totalSegs).padStart(5)}`);
  const mins = totalChars / CHARS_PER_SEC / 60;
  const usd = (mins * USD_PER_MIN).toFixed(2);
  console.log(`\n  ${MODEL_ID} (~$${USD_PER_MIN}/audio-min) → ~${mins.toFixed(0)} min ≈ ~$${usd} for ${totalChars.toLocaleString()} chars (pay-as-you-go, rough).`);
  if (overLimit) console.log(`  ⚠ ${overLimit} segment(s) exceed the ${MAX_INPUT}-char request limit and would need splitting.`);
  console.log("");
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

async function generate(manifests: UnitManifest[]) {
  const apiKey = loadApiKey();
  if (!apiKey) {
    console.error("\n  OPENAI_API_KEY not found in .env.local. Add it, then re-run.\n");
    process.exit(1);
  }
  let made = 0, skipped = 0, chars = 0;

  // Interactive-gate cues (once, shared by all units).
  const cueDir = path.join(AUDIO_ROOT, "_cue");
  fs.mkdirSync(cueDir, { recursive: true });
  for (const [kind, text] of Object.entries(CUES)) {
    const mp3 = path.join(cueDir, `${kind}.mp3`);
    if (fs.existsSync(mp3)) { skipped++; continue; }
    process.stdout.write(`    _cue/${kind} (${text.length})… `);
    fs.writeFileSync(mp3, await tts(text, apiKey));
    made++; chars += text.length;
    console.log("ok");
    await new Promise((r) => setTimeout(r, REQUEST_GAP_MS));
  }

  for (const m of manifests) {
    const dir = path.join(AUDIO_ROOT, m.unitId);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(m, null, 2));
    console.log(`\n  ${m.unitId} — ${m.items.filter(isSegment).length} segments`);
    for (const item of m.items) {
      if (!isSegment(item)) continue;
      const mp3 = path.join(dir, `${item.id}.mp3`);
      if (fs.existsSync(mp3)) { skipped++; continue; }
      process.stdout.write(`    ${item.id} (${item.text.length})… `);
      const buf = await tts(item.text.slice(0, MAX_INPUT), apiKey);
      fs.writeFileSync(mp3, buf);
      made++; chars += item.text.length;
      console.log("ok");
      await new Promise((r) => setTimeout(r, REQUEST_GAP_MS));
    }
  }
  const usd = (chars / CHARS_PER_SEC / 60 * USD_PER_MIN).toFixed(2);
  console.log(`\n  Done. ${made} mp3s generated, ${skipped} already existed (~${chars.toLocaleString()} chars ≈ $${usd} this run).`);
  console.log("  Commit public/audio/.\n");
}

async function main() {
  const { unit, dryRun } = parseArgs();
  const manifests = targetManifests(unit);
  printCostTable(manifests);
  if (dryRun) {
    console.log("  Dry run — nothing generated. Re-run with --unit=<id> or --all to generate.\n");
    return;
  }
  await generate(manifests);
}

main().catch((e) => { console.error(e); process.exit(1); });

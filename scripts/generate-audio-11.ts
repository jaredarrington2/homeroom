/**
 * scripts/generate-audio-11.ts — pre-generate Module 3 narration via ElevenLabs (Bryce / v2).
 *
 * Runs LOCALLY ONLY. The deployed app plays the static per-segment mp3s this writes into
 * public/audio/<unitId>/. One mp3 per paragraph, named to match the DOM id from
 * unitAudioItems, so click-to-skip and highlight line up. Writes the real multi-item
 * manifest.json alongside.
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-audio-11.ts            # dry run (chars/cost)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-audio-11.ts --unit=respa
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-audio-11.ts --units=respa,hoepa,ecoa
 *
 * Skips any segment whose mp3 already exists (re-run continues, no re-charge). To force a
 * unit, delete public/audio/<unitId>/ first. Key read from .env.local (ELEVENLABS_API_KEY),
 * never printed, never committed.
 */
import * as fs from "fs";
import * as path from "path";
import section3 from "../content/sections/section-3";
import { unitManifest, isSegment, type UnitManifest } from "../lib/audioText";

const MODEL_ID = "eleven_multilingual_v2"; // v2 keeps Bryce's Australian accent (v3 flattens it)
const OUTPUT_FORMAT = "mp3_44100_192";
const VOICE_SETTINGS = { stability: 0.4, similarity_boost: 0.9, style: 0.5, use_speaker_boost: true };
const REQUEST_GAP_MS = 250;
const CHARS_PER_SEC = 14.5;

const AUDIO_ROOT = path.join(process.cwd(), "public", "audio");
const ALL_UNITS = section3.units;

// Phonetic spellings for the ear only — the on-screen text stays the real acronym. Applied to
// the spoken string right before TTS. RESPA="Ress-puh" is user-confirmed on Bryce/v2.
const PRONUNCIATION: Array<[RegExp, string]> = [
  [/\bRESPA\b/g, "Ress-puh"],
  [/\bTILA\b/g, "Teela"],
  [/\bHOEPA\b/g, "Hoepa"],
  [/\bTRID\b/g, "Tridd"],
  [/\bHMDA\b/g, "Humda"],
  [/\bFACTA\b/g, "Facta"],
  [/\bCFPB\b/g, "Seeyeff Pee Bee"],
  [/\bECOA\b/g, "E-C-O-A"],
  [/\bFCRA\b/g, "F-C-R-A"],
  [/\bGLBA\b/g, "G-L-B-A"],
  [/\bBSA\b/g, "B-S-A"],
  [/\bAML\b/g, "A-M-L"],
  [/\bHPA\b/g, "H-P-A"],
  [/\bAPR\b/g, "A-P-R"],
  [/\bAPOR\b/g, "A-P-O-R"],
  [/\bFTC\b/g, "F-T-C"],
  [/\bPMI\b/g, "P-M-I"],
  [/\bLTV\b/g, "L-T-V"],
  [/\bNMLS\b/g, "N-M-L-S"],
  [/\bTSR\b/g, "T-S-R"],
  [/\bDNC\b/g, "D-N-C"],
  [/\bSAR\b/g, "S-A-R"],
  [/\bSARs\b/g, "S-A-Rs"],
  [/\bCTR\b/g, "C-T-R"],
  [/\bOFAC\b/g, "Oh-fack"],
];

function phoneticize(text: string): string {
  let out = text;
  for (const [re, rep] of PRONUNCIATION) out = out.replace(re, rep);
  return out;
}

function loadApiKey(): string {
  const envPath = path.join(process.cwd(), ".env.local");
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = /^\s*ELEVENLABS_API_KEY\s*=\s*(.+?)\s*$/.exec(line);
    if (m) return m[1].replace(/^['"]|['"]$/g, "");
  }
  return "";
}
function loadVoiceId(): string {
  const envPath = path.join(process.cwd(), ".env.local");
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = /^\s*ELEVEN_VOICE_AU\s*=\s*(.+?)\s*$/.exec(line);
    if (m) return m[1].replace(/^['"]|['"]$/g, "");
  }
  return "";
}

function parseArgs() {
  const args = process.argv.slice(2);
  const unitArg = args.find((a) => a.startsWith("--unit="));
  const unitsArg = args.find((a) => a.startsWith("--units="));
  let units: string[] = [];
  if (unitArg) units = [unitArg.slice("--unit=".length)];
  else if (unitsArg) units = unitsArg.slice("--units=".length).split(",").map((s) => s.trim()).filter(Boolean);
  return { units, dryRun: units.length === 0 };
}

function targets(ids: string[]): UnitManifest[] {
  if (!ids.length) return ALL_UNITS.map(unitManifest);
  return ids.map((id) => {
    const u = ALL_UNITS.find((x) => x.id === id);
    if (!u) { console.error(`No M3 unit "${id}". Ids: ${ALL_UNITS.map((x) => x.id).join(", ")}`); process.exit(1); }
    return unitManifest(u);
  });
}

const charsOf = (m: UnitManifest) => m.items.filter(isSegment).reduce((n, s) => n + phoneticize((s as any).text).length, 0);

function printTable(manifests: UnitManifest[]) {
  console.log("\n  unit                chars   segments");
  console.log("  ----------------------------------------");
  let tc = 0, ts = 0;
  for (const m of manifests) {
    const c = charsOf(m), s = m.items.filter(isSegment).length;
    tc += c; ts += s;
    console.log(`  ${m.unitId.padEnd(18)} ${String(c).padStart(6)}   ${String(s).padStart(5)}`);
  }
  console.log("  ----------------------------------------");
  console.log(`  ${"TOTAL".padEnd(18)} ${String(tc).padStart(6)}   ${String(ts).padStart(5)}`);
  console.log(`\n  ElevenLabs ${MODEL_ID} — ${tc.toLocaleString()} chars ≈ ~${(tc / CHARS_PER_SEC / 60).toFixed(0)} min audio (1 credit/char on v2).\n`);
}

async function tts(text: string, key: string, voice: string): Promise<Buffer> {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=${OUTPUT_FORMAT}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE_SETTINGS }),
    });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    const body = await res.text();
    if (attempt < 2 && (res.status === 429 || res.status >= 500)) {
      console.warn(`    ${res.status} — retry in 3s…`); await new Promise((r) => setTimeout(r, 3000)); continue;
    }
    throw new Error(`ElevenLabs ${res.status}: ${body.slice(0, 300)}`);
  }
  throw new Error("unreachable");
}

async function generate(manifests: UnitManifest[]) {
  const key = loadApiKey(), voice = loadVoiceId();
  if (!key || !voice) { console.error("\n  ELEVENLABS_API_KEY / ELEVEN_VOICE_AU missing in .env.local.\n"); process.exit(1); }
  let made = 0, skipped = 0, chars = 0;
  for (const m of manifests) {
    const dir = path.join(AUDIO_ROOT, m.unitId);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(m, null, 2));
    // Clear the old single stitched file so it can't shadow the new per-segment set.
    const full = path.join(dir, "full.mp3");
    if (fs.existsSync(full)) fs.unlinkSync(full);
    console.log(`\n  ${m.unitId} — ${m.items.filter(isSegment).length} segments`);
    for (const item of m.items) {
      if (!isSegment(item)) continue;
      const mp3 = path.join(dir, `${item.id}.mp3`);
      if (fs.existsSync(mp3)) { skipped++; continue; }
      const spoken = phoneticize(item.text);
      process.stdout.write(`    ${item.id} (${spoken.length})… `);
      const buf = await tts(spoken, key, voice);
      fs.writeFileSync(mp3, buf);
      made++; chars += spoken.length; console.log("ok");
      await new Promise((r) => setTimeout(r, REQUEST_GAP_MS));
    }
  }
  console.log(`\n  Done. ${made} mp3s made, ${skipped} existed (~${chars.toLocaleString()} chars this run).`);
  console.log("  Commit public/audio/.\n");
}

async function main() {
  const { units, dryRun } = parseArgs();
  const manifests = targets(units);
  printTable(manifests);
  if (dryRun) { console.log("  Dry run — nothing generated. Add --unit=<id> or --units=a,b,c.\n"); return; }
  await generate(manifests);
}
main().catch((e) => { console.error(e); process.exit(1); });

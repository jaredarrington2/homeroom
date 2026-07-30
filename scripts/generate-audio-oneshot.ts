/**
 * scripts/generate-audio-oneshot.ts — generate a unit's narration as ONE continuous Bryce/v2
 * take (so pitch/accent stay consistent), then split it into per-paragraph mp3s by ElevenLabs
 * timestamps — so click-to-skip + highlight still work. This replaces the per-segment approach
 * (separate calls per paragraph) that let the voice drift between paragraphs.
 *
 *   npx --yes -p typescript@5.4.5 -p ts-node@10.9.2 ts-node --transpile-only \
 *     --project tsconfig.scripts.json scripts/generate-audio-oneshot.ts --units=second-liens
 *
 * Requires ffmpeg on PATH. Key read from .env.local (ELEVENLABS_API_KEY); never printed.
 */
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import section3 from "../content/sections/section-3";
import section5 from "../content/sections/section-5";
import { unitManifest, isSegment } from "../lib/audioText";

const MODEL_ID = "eleven_multilingual_v2";
const OUTPUT_FORMAT = "mp3_44100_192";
const VOICE_SETTINGS = { stability: 0.4, similarity_boost: 0.9, style: 0.5, use_speaker_boost: true };
const ALL_UNITS = [...section3.units, ...section5.units];
const AUDIO_ROOT = path.join(process.cwd(), "public", "audio");

const PRONUNCIATION: Array<[RegExp, string]> = [
  [/\bRESPA\b/g, "RESpa"], [/\bTILA\b/g, "Teela"], [/\bHOEPA\b/g, "Hoepa"], [/\bTRID\b/g, "Tridd"],
  [/\bHMDA\b/g, "Humda"], [/\bFACTA\b/g, "Facta"], [/\bCFPB\b/g, "C-F-P-B"], [/\bECOA\b/g, "E-C-O-A"],
  [/\bFCRA\b/g, "F-C-R-A"], [/\bGLBA\b/g, "G-L-B-A"], [/\bBSA\b/g, "B-S-A"], [/\bAML\b/g, "A-M-L"],
  [/\bHPA\b/g, "H-P-A"], [/\bAPR\b/g, "A-P-R"], [/\bAPOR\b/g, "A-P-O-R"], [/\bFTC\b/g, "F-T-C"],
  [/\bPMI\b/g, "P-M-I"], [/\bLTV\b/g, "L-T-V"], [/\bCLTV\b/g, "C-L-T-V"], [/\bFHA\b/g, "F-H-A"],
  [/\bVA\b/g, "V-A"], [/\bUSDA\b/g, "U-S-D-A"], [/\bMIP\b/g, "M-I-P"], [/\bUFMIP\b/g, "U-F-M-I-P"],
  [/\bDTI\b/g, "D-T-I"], [/\bHECM\b/g, "heck-um"], [/\bGSE\b/g, "G-S-E"], [/\bGSEs\b/g, "G-S-Es"],
  [/\bARM\b/g, "A-R-M"], [/\bARMs\b/g, "A-R-Ms"], [/\bNMLS\b/g, "N-M-L-S"], [/\bTSR\b/g, "T-S-R"],
  [/\bDNC\b/g, "D-N-C"], [/\bSAR\b/g, "S-A-R"], [/\bSARs\b/g, "S-A-Rs"], [/\bCTR\b/g, "C-T-R"],
  [/\bOFAC\b/g, "Oh-fack"],
];
const phoneticize = (t: string) => PRONUNCIATION.reduce((o, [re, rep]) => o.replace(re, rep), t);

function loadEnv(name: string): string {
  for (const line of fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8").split("\n")) {
    const m = new RegExp(`^\\s*${name}\\s*=\\s*(.+?)\\s*$`).exec(line);
    if (m) return m[1].replace(/^['"]|['"]$/g, "");
  }
  return "";
}

async function tts(text: string, key: string, voice: string): Promise<any> {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=${OUTPUT_FORMAT}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE_SETTINGS }),
    });
    if (res.ok) return res.json();
    const body = await res.text();
    if (attempt < 2 && (res.status === 429 || res.status >= 500)) { await new Promise((r) => setTimeout(r, 3000)); continue; }
    throw new Error(`ElevenLabs ${res.status}: ${body.slice(0, 300)}`);
  }
}

async function genUnit(unitId: string, key: string, voice: string) {
  const unit = ALL_UNITS.find((u) => u.id === unitId);
  if (!unit) { console.error(`  no unit "${unitId}"`); return; }
  const man = unitManifest(unit);
  const prose = man.items.filter(isSegment) as Array<{ id: string; text: string }>;

  // One script for the whole unit; record each segment's char range so we can find its time.
  let script = "";
  const spans: { id: string; start: number; end: number }[] = [];
  prose.forEach((it, i) => {
    const start = script.length;
    script += phoneticize(it.text.trim());
    spans.push({ id: it.id, start, end: script.length });
    if (i < prose.length - 1) script += " ";
  });
  console.log(`\n  ${unitId}: ${prose.length} segments, ${script.length} chars - one take...`);

  const data = await tts(script, key, voice);
  const al = data.alignment;
  const starts: number[] = al.character_start_times_seconds;
  const ends: number[] = al.character_end_times_seconds;
  const N = al.characters.length;
  const idxAt = (p: number) => (N === script.length ? p : Math.round((p / script.length) * N));
  const clamp = (i: number) => Math.min(Math.max(i, 0), N - 1);
  const duration = ends[N - 1];

  const dir = path.join(AUDIO_ROOT, unitId);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(man, null, 2));
  const full = path.join(dir, "_full.mp3");
  fs.writeFileSync(full, Buffer.from(data.audio_base64, "base64"));

  const segStart = spans.map((s) => starts[clamp(idxAt(s.start))]);
  spans.forEach((s, i) => {
    const t0 = i === 0 ? 0 : segStart[i];
    const t1 = i < spans.length - 1 ? segStart[i + 1] : duration;
    const dur = Math.max(0.1, t1 - t0);
    const out = path.join(dir, `${s.id}.mp3`);
    execSync(`ffmpeg -y -ss ${t0.toFixed(3)} -t ${dur.toFixed(3)} -i "${full}" -c:a libmp3lame -b:a 192k "${out}" -loglevel error`);
    console.log(`    ${s.id}  ${t0.toFixed(1)}-${t1.toFixed(1)}s`);
  });
  fs.unlinkSync(full);
  const stale = path.join(dir, "full.mp3");
  if (fs.existsSync(stale)) fs.unlinkSync(stale);
  console.log(`  done - ${spans.length} clips split from one ${duration.toFixed(1)}s take.`);
}

async function main() {
  const key = loadEnv("ELEVENLABS_API_KEY"), voice = loadEnv("ELEVEN_VOICE_AU");
  if (!key || !voice) { console.error("ELEVENLABS_API_KEY / ELEVEN_VOICE_AU missing in .env.local"); process.exit(1); }
  const arg = process.argv.find((a) => a.startsWith("--units="));
  if (!arg) { console.error("pass --units=a,b,c"); process.exit(1); }
  const ids = arg.slice("--units=".length).split(",").map((s) => s.trim()).filter(Boolean);
  for (const id of ids) { await genUnit(id, key, voice); await new Promise((r) => setTimeout(r, 300)); }
  console.log("\n  Commit public/audio/.\n");
}
main().catch((e) => { console.error(e); process.exit(1); });

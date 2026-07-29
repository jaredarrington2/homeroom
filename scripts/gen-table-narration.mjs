// scripts/gen-table-narration.mjs — POC: a synced, spotlighted narration of the four-programs
// table. Each cue is a spoken beat tied to a table target (a cell/row/column selector).
// Generates ONE conversational track on Bryce/v2 via ElevenLabs with-timestamps, then maps
// each cue's character range to its spoken time window, so the player can light the target
// exactly when it's named. Writes:
//   public/audio/tables/loan-programs.mp3
//   public/audio/tables/loan-programs.cues.json  → { audio, cues:[{tStart,tEnd,targets}] }
import fs from "node:fs";
import path from "node:path";

const envPath = path.join(process.env.HOME, "homeroom", ".env.local");
const env = Object.fromEntries(
  fs.readFileSync(envPath, "utf8").split("\n").map((l) => {
    const m = /^\s*([A-Z_]+)\s*=\s*(.+?)\s*$/.exec(l);
    return m ? [m[1], m[2].replace(/^['"]|['"]$/g, "")] : ["", ""];
  }).filter(([k]) => k)
);
const KEY = env.ELEVENLABS_API_KEY, VOICE = env.ELEVEN_VOICE_AU;
if (!KEY || !VOICE) { console.error("missing key/voice"); process.exit(1); }

// POC = the table's spine (backing) → its first consequence (down payment). Conversational,
// but each beat points at one thing on the "slide". Acronyms spelled for the ear.
const cues = [
  { text: "Okay — four loan programs, and the whole table really comes down to one question: who is standing behind the loan?", targets: ['[data-pc-row="backed"]'] },
  { text: "A conventional loan? No government at all — Fannie Mae and Freddie Mac just buy it from the lender.", targets: ['[data-pc="backed:conv"]'] },
  { text: "An F-H-A loan is insured by the government: if the borrower stops paying, the F-H-A pays the lender back.", targets: ['[data-pc="backed:fha"]'] },
  { text: "A V-A loan is guaranteed by the Department of Veterans Affairs.", targets: ['[data-pc="backed:va"]'] },
  { text: "And a U-S-D-A loan is guaranteed too — by the Department of Agriculture, for buyers out in rural areas.", targets: ['[data-pc="backed:usda"]'] },
  { text: "Now, watch what that backing does to the down payment.", targets: ['[data-pc-row="down"]'] },
  { text: "Because the government stands behind V-A and U-S-D-A, those lenders can ask for zero down — nothing out of pocket.", targets: ['[data-pc="down:va"]', '[data-pc="down:usda"]'] },
  { text: "F-H-A sits in the middle: just three-and-a-half percent down.", targets: ['[data-pc="down:fha"]'] },
  { text: "And a conventional loan usually wants five percent — with no government backing, the lender is carrying more of the risk.", targets: ['[data-pc="down:conv"]'] },
  { text: "And that same backing quietly shapes the rest of the table — the mortgage insurance, and every row beneath it. The more the government is involved, the easier the terms tend to be.", targets: [] },
];

// Build the full script + record each cue's [startChar, endChar) in it.
let script = "";
const spans = [];
cues.forEach((c, i) => {
  const start = script.length;
  script += c.text;
  spans.push({ start, end: script.length, targets: c.targets });
  if (i < cues.length - 1) script += " "; // one space between cues
});

const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_192`, {
  method: "POST",
  headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
  body: JSON.stringify({
    text: script,
    model_id: "eleven_multilingual_v2",
    // speed < 1 slows the delivery for a more measured, lecture pace (the highlights follow it).
    voice_settings: { stability: 0.4, similarity_boost: 0.9, style: 0.5, use_speaker_boost: true, speed: 0.88 },
  }),
});
if (!res.ok) { console.error(res.status, (await res.text()).slice(0, 400)); process.exit(1); }
const data = await res.json();
const al = data.alignment;
if (!al || !al.characters) { console.error("no alignment in response"); process.exit(1); }
const chars = al.characters;
const starts = al.character_start_times_seconds;
const ends = al.character_end_times_seconds;
console.log(`script chars: ${script.length} · alignment chars: ${chars.length}`);

// Map each cue span → time window. If lengths match, index directly; otherwise fall back to
// proportional (robust to any minor normalization).
const N = chars.length;
const idxAt = (charPos) => (chars.length === script.length ? charPos : Math.round((charPos / script.length) * N));
const cueOut = spans.map((s) => {
  const a = Math.min(Math.max(idxAt(s.start), 0), N - 1);
  const b = Math.min(Math.max(idxAt(s.end - 1), 0), N - 1);
  return { tStart: +starts[a].toFixed(3), tEnd: +ends[b].toFixed(3), targets: s.targets };
});

const dir = path.join(process.env.HOME, "homeroom", "public", "audio", "tables");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "loan-programs.mp3"), Buffer.from(data.audio_base64, "base64"));
fs.writeFileSync(
  path.join(dir, "loan-programs.cues.json"),
  JSON.stringify({ audio: "/audio/tables/loan-programs.mp3", duration: +ends[N - 1].toFixed(3), cues: cueOut }, null, 2),
);
console.log(`wrote loan-programs.mp3 + cues.json (${cueOut.length} cues, ${ends[N - 1].toFixed(1)}s)`);
cueOut.forEach((c, i) => console.log(`  ${i}: ${c.tStart}s–${c.tEnd}s → ${c.targets.join(", ") || "(clear)"}`));

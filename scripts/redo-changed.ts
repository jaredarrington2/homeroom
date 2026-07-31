/** Delete only the per-segment mp3s whose spoken text contains a term whose pronunciation
 *  changed, so a re-run of generate-audio-11 regenerates just those.
 *
 *    npx ts-node --project tsconfig.scripts.json scripts/redo-changed.ts --terms=ARM,ARMs,MIP,PITI tila trid
 *    npx ts-node --project tsconfig.scripts.json scripts/redo-changed.ts --terms=RESPA,CFPB --all
 *
 *  Defaults to RESPA,CFPB (the v5.2 change) when --terms is omitted. Units are matched across
 *  sections 1, 3 and 5 — the same set generate-audio-11 knows about. A bare run lists what it
 *  WOULD delete; pass --apply to actually unlink.
 */
import * as fs from "fs";
import * as path from "path";
import section1 from "../content/sections/section-1";
import section3 from "../content/sections/section-3";
import section5 from "../content/sections/section-5";
import { unitManifest, isSegment } from "../lib/audioText";

const ALL_UNITS = [...section1.units, ...section3.units, ...section5.units];
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const termArg = args.find((a) => a.startsWith("--terms="));
const terms = (termArg ? termArg.slice("--terms=".length) : "RESPA,CFPB")
  .split(",").map((t) => t.trim()).filter(Boolean);
const CHANGED = new RegExp(`\\b(${terms.join("|")})\\b`);

const named = args.filter((a) => !a.startsWith("--"));
const units = args.includes("--all")
  ? ALL_UNITS
  : named
      .map((id) => {
        const u = ALL_UNITS.find((x) => x.id === id);
        if (!u) console.error(`no unit ${id}`);
        return u;
      })
      .filter((u): u is (typeof ALL_UNITS)[number] => Boolean(u));

const ROOT = path.join(process.cwd(), "public", "audio");
let hit = 0;
for (const u of units) {
  for (const item of unitManifest(u).items) {
    if (!isSegment(item)) continue;
    if (!CHANGED.test(item.text)) continue;
    const mp3 = path.join(ROOT, u.id, `${item.id}.mp3`);
    if (!fs.existsSync(mp3)) continue;
    hit++;
    if (APPLY) { fs.unlinkSync(mp3); console.log(`  deleted ${u.id}/${item.id}.mp3`); }
    else console.log(`  would delete ${u.id}/${item.id}.mp3`);
  }
}
console.log(
  `\nterms /${CHANGED.source}/ · ${units.length} unit(s) · ${hit} mp3(s) ` +
    (APPLY ? "deleted — re-run generate-audio-11 to regenerate" : "matched (dry run; pass --apply)")
);

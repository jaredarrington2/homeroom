/** Delete only the per-segment mp3s whose spoken text contains an acronym whose pronunciation
 *  changed (RESPA, CFPB), so a re-run of generate-audio-11 regenerates just those. */
import * as fs from "fs";
import * as path from "path";
import section3 from "../content/sections/section-3";
import { unitManifest, isSegment } from "../lib/audioText";

const UNITS = process.argv.slice(2);
const CHANGED = /\b(RESPA|CFPB)\b/;
const ROOT = path.join(process.cwd(), "public", "audio");
let deleted = 0;
for (const id of UNITS) {
  const u = section3.units.find((x) => x.id === id);
  if (!u) { console.error(`no unit ${id}`); continue; }
  for (const item of unitManifest(u).items) {
    if (!isSegment(item)) continue;
    if (CHANGED.test(item.text)) {
      const mp3 = path.join(ROOT, id, `${item.id}.mp3`);
      if (fs.existsSync(mp3)) { fs.unlinkSync(mp3); deleted++; console.log(`  deleted ${id}/${item.id}.mp3`); }
    }
  }
}
console.log(`\n${deleted} mp3(s) deleted — re-run generate-audio-11 to regenerate them.`);

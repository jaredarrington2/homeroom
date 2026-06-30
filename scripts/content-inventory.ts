/**
 * scripts/content-inventory.ts
 *
 * Prints a per-unit content inventory for Module 3 (federal mortgage laws) as a
 * markdown table, plus a totals row. Useful for keeping the context file's
 * "Content inventory" section honest after content edits.
 *
 * Run: npx ts-node --project tsconfig.scripts.json scripts/content-inventory.ts
 *
 * Note: section-3.ts default-exports the section, and its only import (`@/lib/section`)
 * is type-only, so it erases at runtime — no path-alias resolution is required here.
 */
import section3 from "../content/sections/section-3";

// Count actual `class="cloze"` occurrences (a paragraph may, in principle, carry
// more than one), not just paragraphs-that-contain-a-cloze.
const clozeOccurrences = (html: string): number =>
  (html.match(/class="cloze"/g) ?? []).length;

let totGroups = 0,
  totCloze = 0,
  totSynth = 0,
  totDefs = 0,
  totFlash = 0,
  totMcq = 0,
  totAnchors = 0;

const rows: string[] = [];

section3.units.forEach((unit, i) => {
  const cloze = unit.groups.reduce(
    (sum, g) => sum + g.paras.reduce((s, p) => s + clozeOccurrences(p.html), 0),
    0
  );
  const synth = unit.groups.filter((g) => g.synth).length;
  const anchors = unit.groups.filter((g) => g.anchor).length;
  const defs = unit.definitions?.length ?? 0;
  const flash = unit.review.flashcards.length;
  const mcq = unit.review.mcq.length;
  const headings = unit.groups
    .map((g) => g.heading || "(untitled)")
    .join(" · ");

  totGroups += unit.groups.length;
  totCloze += cloze;
  totSynth += synth;
  totDefs += defs;
  totFlash += flash;
  totMcq += mcq;
  totAnchors += anchors;

  rows.push(
    `| ${i + 1} | ${unit.id} | ${unit.name} | ${unit.reg} | ${unit.groups.length} | ${cloze} | ${synth} | ${defs} | ${flash} | ${mcq} | ${anchors} | ${headings} |`
  );
});

console.log(
  "| # | id | name | reg | groups | cloze | synth | defs | flash | mcq | anchors | concept group headings |"
);
console.log(
  "|---|---|---|---|---|---|---|---|---|---|---|---|"
);
rows.forEach((r) => console.log(r));
console.log(
  `| | | **Totals** | | **${totGroups}** | **${totCloze}** | **${totSynth}** | **${totDefs}** | **${totFlash}** | **${totMcq}** | **${totAnchors}** | ${section3.units.length} units |`
);

console.error(
  `\nTotals: ${totGroups} groups · ${totCloze} cloze · ${totSynth} synth · ${totDefs} definitions · ${totFlash} flashcards · ${totMcq} MCQ · ${totAnchors} anchors (${section3.units.length} units)`
);

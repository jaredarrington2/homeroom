// scripts/generate-section.ts
// Produce a content/sections/<id>.ts from a slice of the course ebook, in the
// recall-gradient shape (inline cloze -> synthesis short-answer -> review deck) with
// restrained, tag-matched imagery. Run once per section.
//
//   npx ts-node --project tsconfig.scripts.json scripts/generate-section.ts \
//     --id general-mortgage-knowledge --title "General mortgage knowledge" --kicker "Section 5" \
//     --src /tmp/module5.txt --out content/sections/section-5.ts
//
// Prereqs: ANTHROPIC_API_KEY set; content/manifest.json present; source text extracted
//   pdftotext -f <startPage> -l <endPage> source/emlo.pdf /tmp/moduleN.txt
//
// The model drafts the section; YOU verify the numbers once before publishing.
// Section 3 (content/sections/section-3.ts) is the reference content.
import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

const args = Object.fromEntries(
  process.argv.slice(2).reduce<[string, string][]>((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const { id, title, kicker, src, out } = args;
if (!id || !title || !src || !out) {
  console.error("required: --id --title --src --out  (optional --kicker)");
  process.exit(1);
}

const sourceText = fs.readFileSync(src, "utf8").slice(0, 120_000); // keep within context
const manifest = JSON.parse(fs.readFileSync("content/manifest.json", "utf8"));

// Compact asset catalogue for the matcher: filename, kind, and the tag fields.
const assets = (Array.isArray(manifest) ? manifest : manifest.entries ?? []).map((e: any) => ({
  file: e.filename ?? e.file ?? e.name,
  kind: e.kind === "property" ? "bldg" : "char",
  roles: e.mortgage_roles ?? e.mortgage_relevance ?? [],
  concept: e.tags?.concept ?? e.concept ?? [],
  domain: e.tags?.domain ?? e.domain ?? [],
  metaphor: e.tags?.metaphor ?? e.metaphor ?? [],
  property: e.mortgage_relevance ?? e.property_type ?? [],
}));

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You convert a slice of a U.S. mortgage pre-licensing course into ONE structured study section for an active-recall page. Return ONLY JSON in the schema below — no markdown, no commentary.

VOICE (de-LLM):
- Open each unit from the borrower's own situation, not the system's abstraction.
- Function before name: say what a thing does before its acronym; never front-load acronyms.
- Cause -> effect, not bare lists. Establish a baseline before the breakage. Give each actor a motive.
- Sentence case. No throat-clearing, no "Let's", no reductive "that's it / it all comes down to" closers, no balanced antithetical fragments ("N noun, M noun").

STRUCTURE:
- Split each unit into 2-4 concept GROUPS, each a small set of related facts.
- Each group: an optional plain lowercase heading (e.g. "what it covers", "the prohibition", "escrow"); 1-3 short paragraphs; at most ONE small anchor image; at most ONE inline cloze. The first group may be a headingless opening paragraph.

RECALL TIERS — assign every quizzable fact to EXACTLY ONE tier. Never test the same fact twice.
- TIER 1, inline cloze (2-3 per unit): a single atomic, high-yield value — a number, day-count, percentage, dollar amount, or short term. Embed it as a blank inside a narrative sentence using:
  <span class="cloze" data-accept='["<answer>","<variant>","<variant>"]' data-reveal="<canonical>">?</span>
  Include numeric AND word variants in data-accept. Max 1 per group. Pick the most testable fact in the group.
- TIER 2, synthesis short-answer (group.synth, 1-2 per unit): ONLY when a group holds 2+ related facts that combine into one idea (e.g. two notices + two deadlines). Ask the learner to assemble them in their own words. {q, a} where a states the full correct answer with its numbers. Max 1 per group.
- TIER 3, review: everything else — definitions, lists, lower-yield numbers — goes to review as flashcards (3-4) and MCQ (2-3). Flashcard {peg (<=2 words), q, a}; a may wrap key values in <span class='hl'>. MCQ {q, opts (3-4), correct (index)}. Recognition, not production; the correct option must match the source.

IMAGERY:
- Add group.anchor ONLY when the group's core idea strongly matches an asset's tags. character = the idea (roles/concept/domain/metaphor); building = property type (residential = consumer-protection; commercial/land = business-purpose exemption). caption <=2 words naming the link. 0-2 per unit; never decorative, never one-per-paragraph. file MUST be an EXACT filename from the asset catalogue.

SELF-CONTAINED (critical): every fact any recall tier tests must be STATED PLAINLY in that unit's narrative prose, before/around the test — a reader who read the unit top-to-bottom must be able to answer every prompt. Every number/day-count/percentage/dollar/threshold that appears in a cloze answer, a synth answer, a flashcard answer, or a correct MCQ option must also appear, in words or figures, in the readable prose. For a cloze specifically, state the blanked fact plainly elsewhere in the unit (teach it, then blank a restatement) — never let a cloze be the only place its fact appears. Teach first, test second.

ACCURACY: every number, day-count, threshold, dollar amount, and named entity must match the source EXACTLY. When in doubt, move the fact to a flashcard rather than inventing precision.

SCHEMA (return ONE object):
{"id":"${id}","title":${JSON.stringify(title)},"kicker":${JSON.stringify(kicker ?? "")},
 "units":[{"id":"slug","name":"Short name","reg":"Full name / citation",
   "groups":[{"heading":"lowercase or omit","anchor":{"file":"exact-filename","caption":"tag link","kind":"char|bldg"} (optional),
     "paras":[{"html":"narrative; may contain one cloze span"}],
     "synth":{"q":"...","a":"..."} (optional)}],
   "review":{"flashcards":[{"peg":"...","q":"...","a":"..."}],"mcq":[{"q":"...","opts":["..."],"correct":0}]}}]}`;

async function main() {
  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 16000,
    system: SYSTEM,
    messages: [{
      role: "user",
      content:
        `ASSET CATALOGUE (match anchor.file to these exact filenames):\n${JSON.stringify(assets)}\n\n` +
        `SOURCE TEXT (section "${title}"):\n${sourceText}`,
    }],
  });

  const text = msg.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text).join("").trim().replace(/```json|```/g, "").trim();

  const json = JSON.parse(text); // throws if the model drifted — re-run if so
  const banner = `import type { SectionContent } from "@/lib/section";\n\n` +
    `// GENERATED by scripts/generate-section.ts from ${path.basename(src)}.\n` +
    `// Verify all numbers against the source before publishing.\n\n` +
    `const section: SectionContent = ${JSON.stringify(json, null, 2)};\n\nexport default section;\n`;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, banner);

  const nUnits = json.units.length;
  const nCloze = json.units.reduce((n: number, u: any) => n + u.groups.reduce((a: number, g: any) => a + (g.paras || []).filter((p: any) => /class="cloze"/.test(p.html)).length, 0), 0);
  const nSynth = json.units.reduce((n: number, u: any) => n + u.groups.filter((g: any) => g.synth).length, 0);
  const nFlash = json.units.reduce((n: number, u: any) => n + (u.review?.flashcards?.length ?? 0), 0);
  const nMcq = json.units.reduce((n: number, u: any) => n + (u.review?.mcq?.length ?? 0), 0);
  console.log(`wrote ${out} · ${nUnits} units · ${nCloze} cloze · ${nSynth} synth · ${nFlash} flashcards · ${nMcq} mcq`);
}

main().catch((e) => { console.error(e); process.exit(1); });

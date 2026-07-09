/**
 * scripts/generate-search-index.ts — build the committed semantic search index for the
 * search/ask feature. Mirrors scripts/generate-audio.ts: LOCAL-ONLY, reads OPENAI_API_KEY
 * from .env.local (gitignored), a bare run is a dry-run cost table, generation is incremental
 * (skip chunks whose text hasn't changed), and the output is committed static JSON that the
 * deployed app loads server-side. The app never embeds anything except the one tiny query
 * embed inside /api/search.
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-search-index.ts           # dry run (cost only)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-search-index.ts --build   # embed stale chunks + write
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-search-index.ts --build --force   # re-embed everything
 *
 * Output: content/generated/search-index.json (committed) + search-index.meta.json (hash sidecar).
 */
import * as fs from "fs";
import * as path from "path";
import { createHash } from "crypto";
import section3 from "../content/sections/section-3";
import section4 from "../content/sections/section-4";
import section5 from "../content/sections/section-5";
import { FORMS } from "../content/module6/forms";
import { clozeHtmlToSpokenText } from "../lib/audioText";
import { MODULE_LABEL, normalizeVector, type SearchChunk } from "../lib/search";
import type { SectionContent } from "../lib/section";

const SECTIONS: SectionContent[] = [section3, section4, section5];

const MODEL_ID = "text-embedding-3-small";
const DIMENSIONS = 512;
const BATCH = 256;
const USD_PER_MTOK = 0.02;

const OUT = path.join(process.cwd(), "content", "generated", "search-index.json");
const META = path.join(process.cwd(), "content", "generated", "search-index.meta.json");

function parseArgs() {
  const args = process.argv.slice(2);
  return { build: args.includes("--build"), force: args.includes("--force") };
}

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

type RawChunk = Omit<SearchChunk, "embedding"> & { prefixed: string };

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);

const stripTags = (s: string) => clozeHtmlToSpokenText(s).replace(/\s+/g, " ").trim();

/** Contextual prefix (Anthropic's contextual-retrieval trick — free here since we hold the
 *  metadata). The embedding is taken from the prefixed string; the clean `text` is stored. */
const prefixOf = (module: string, unitName: string, heading: string, text: string) =>
  `[${module} · ${unitName}] ${heading ? heading + ". " : ""}${text}`;

function buildChunks(): RawChunk[] {
  const chunks: RawChunk[] = [];

  for (const section of SECTIONS) {
    const chapterId = section.id;
    const moduleLabel = MODULE_LABEL[chapterId] ?? section.kicker;
    const route = `/learn/${chapterId}`;

    for (const unit of section.units) {
      unit.groups.forEach((g, gi) => {
        const body = g.paras.map((p) => stripTags(p.html)).filter(Boolean).join(" ");
        const heading = g.heading ?? "";
        const text = [heading, body].filter(Boolean).join(" — ");
        if (!text.trim()) return;
        chunks.push({
          id: `${unit.id}:${gi}`,
          route, chapterId, module: moduleLabel, unitId: unit.id, unitName: unit.name, gi,
          heading: heading || unit.name, kind: "prose", text,
          prefixed: prefixOf(moduleLabel, unit.name, heading, body),
        });
      });

      (unit.definitions ?? []).forEach((d) => {
        const text = `${d.term} — ${d.def}`;
        chunks.push({
          id: `${unit.id}:def:${slug(d.term)}`,
          route, chapterId, module: moduleLabel, unitId: unit.id, unitName: unit.name,
          heading: d.term, kind: "definition", text,
          prefixed: prefixOf(moduleLabel, unit.name, d.term, d.def),
        });
      });

      if (unit.recap) {
        const facts = unit.recap.facts.map((f) => stripTags(f)).join(" ");
        const text = [unit.recap.plainLanguage, facts].filter(Boolean).join(" ");
        chunks.push({
          id: `${unit.id}:recap`,
          route, chapterId, module: moduleLabel, unitId: unit.id, unitName: unit.name,
          heading: "recap", kind: "recap", text,
          prefixed: prefixOf(moduleLabel, unit.name, "recap", text),
        });
      }
    }
  }

  // Module 6 forms — one chunk per form section (coarse deep-link to the explorer, §9).
  const m6Module = MODULE_LABEL["mlo-activities"];
  const m6Route = "/learn/mlo-activities";
  for (const form of FORMS) {
    for (const sec of form.sections) {
      const parts = [
        form.name, sec.name, sec.purpose,
        `Fields: ${sec.fields.join("; ")}`,
        sec.rules.length ? `Rules: ${sec.rules.join(" ")}` : "",
        sec.trap ? `Where people lose the point: ${sec.trap}` : "",
      ].filter(Boolean);
      const text = parts.join(" ");
      chunks.push({
        id: `mlo-activities:${form.id}:${sec.id}`,
        route: m6Route, chapterId: "mlo-activities", module: m6Module,
        unitId: "mlo-activities", unitName: form.name,
        heading: sec.name, kind: "form", text,
        prefixed: prefixOf(m6Module, form.name, sec.name, text),
      });
    }
  }

  return chunks;
}

async function embed(inputs: string[], apiKey: string): Promise<number[][]> {
  const url = "https://api.openai.com/v1/embeddings";
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: MODEL_ID, input: inputs, dimensions: DIMENSIONS }),
    });
    if (res.ok) {
      const json = (await res.json()) as { data: { index: number; embedding: number[] }[] };
      return json.data.sort((a, b) => a.index - b.index).map((d) => d.embedding);
    }
    const body = await res.text();
    if (attempt < 2 && (res.status === 429 || res.status >= 500)) {
      console.warn(`    ${res.status} — retrying in 2s…`);
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }
    throw new Error(`OpenAI embeddings ${res.status}: ${body.slice(0, 300)}`);
  }
  throw new Error("unreachable");
}

const hash = (s: string) => createHash("sha256").update(s).digest("hex").slice(0, 16);
const estTokens = (s: string) => Math.ceil(s.length / 4);
const chunkInto = <T>(arr: T[], n: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
};

async function main() {
  const { build, force } = parseArgs();
  const chunks = buildChunks();

  const meta: Record<string, string> = force || !fs.existsSync(META)
    ? {}
    : JSON.parse(fs.readFileSync(META, "utf8"));
  const stale = chunks.filter((c) => hash(c.prefixed) !== meta[c.id]);

  const byKind = chunks.reduce<Record<string, number>>((m, c) => ((m[c.kind] = (m[c.kind] ?? 0) + 1), m), {});
  const totalTokens = chunks.reduce((n, c) => n + estTokens(c.prefixed), 0);
  const staleTokens = stale.reduce((n, c) => n + estTokens(c.prefixed), 0);
  console.log("\n  search index — chunks by kind");
  console.log("  ----------------------------------------");
  for (const k of Object.keys(byKind).sort()) console.log(`  ${k.padEnd(14)} ${String(byKind[k]).padStart(5)}`);
  console.log("  ----------------------------------------");
  console.log(`  ${"TOTAL".padEnd(14)} ${String(chunks.length).padStart(5)} chunks · ~${totalTokens.toLocaleString()} tok`);
  console.log(`\n  to embed now: ${stale.length} stale chunk(s) · ~${staleTokens.toLocaleString()} tok`);
  console.log(`  ${MODEL_ID} @ $${USD_PER_MTOK}/MTok, ${DIMENSIONS}-d → ≈ $${(staleTokens / 1e6 * USD_PER_MTOK).toFixed(4)} this run` +
    `  (full rebuild ≈ $${(totalTokens / 1e6 * USD_PER_MTOK).toFixed(4)})`);

  if (!build) {
    console.log("\n  Dry run — nothing embedded. Re-run with --build to embed + write.\n");
    return;
  }

  const apiKey = loadApiKey();
  if (!apiKey) { console.error("\n  OPENAI_API_KEY not found in .env.local.\n"); process.exit(1); }

  const vectors = new Map<string, number[]>();
  let done = 0;
  for (const batch of chunkInto(stale, BATCH)) {
    const vecs = await embed(batch.map((c) => c.prefixed), apiKey);
    batch.forEach((c, i) => vectors.set(c.id, normalizeVector(vecs[i])));
    done += batch.length;
    console.log(`  embedded ${done}/${stale.length}…`);
  }

  const existing: SearchChunk[] = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : [];
  const prevVec = new Map(existing.map((c) => [c.id, c.embedding]));
  const index: SearchChunk[] = chunks.map(({ prefixed, ...c }) => {
    void prefixed;
    const embedding = vectors.get(c.id) ?? prevVec.get(c.id);
    if (!embedding) throw new Error(`no embedding for ${c.id}`);
    return { ...c, embedding };
  });

  const nextMeta: Record<string, string> = {};
  for (const c of chunks) nextMeta[c.id] = hash(c.prefixed);

  fs.writeFileSync(OUT, JSON.stringify(index));
  fs.writeFileSync(META, JSON.stringify(nextMeta, null, 2));
  const sizeMb = (fs.statSync(OUT).size / 1e6).toFixed(2);
  console.log(`\n  Wrote ${index.length} chunks → ${path.relative(process.cwd(), OUT)} (${sizeMb} MB).`);
  console.log("  Commit content/generated/search-index.json + search-index.meta.json.\n");
}

main().catch((e) => { console.error(e); process.exit(1); });

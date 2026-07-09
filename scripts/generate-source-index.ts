/**
 * scripts/generate-source-index.ts — build the PRIVATE ebook grounding index for Ask.
 *
 * Reads the copyrighted course ebook (source/emlo.pdf) LOCALLY, chunks it per page (tagged
 * with the chapter/section it falls in via the same page-range map extract-content.ts uses),
 * embeds each passage (OpenAI text-embedding-3-small, 512-d, normalized), and writes
 * content/generated/source-index.json.
 *
 * IMPORTANT — this file is GITIGNORED and must NEVER be committed: it holds verbatim ebook
 * text. It reaches prod only as a server-only fs asset via .vercelignore (uploaded to the
 * deployment, never in the public repo, never publicly served). Ask uses it to ground answers;
 * the raw text is never shown in the UI (synth-only). See /api/ask.
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-source-index.ts           # dry run (cost only)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-source-index.ts --build    # embed + write
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-source-index.ts --build --force
 */
import * as fs from "fs";
import * as path from "path";
import { createHash } from "crypto";
import { normalizeVector, type SourceChunk } from "../lib/search";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfParse = require("pdf-parse");

const MODEL_ID = "text-embedding-3-small";
const DIMENSIONS = 512;
const BATCH = 256;
const USD_PER_MTOK = 0.02;
const MIN_PAGE_CHARS = 140;   // skip blank / cover / divider pages
const MAX_CHUNK_CHARS = 1500; // split long pages so a chunk stays a tight retrieval target
const OVERLAP_CHARS = 160;

const OUT = path.join(process.cwd(), "content", "generated", "source-index.json");
const META = path.join(process.cwd(), "content", "generated", "source-index.meta.json");

// Page-range map — mirrors scripts/extract-content.ts CHAPTERS. Reader chapters
// (federal-mortgage-laws / uniform-state-content / general-mortgage-knowledge / mlo-activities)
// let an ebook passage cite the matching reader unit; ethics/front-matter have no reader.
const PAGE_MAP: { chapterId: string; sectionId: string; title: string; start: number; end: number }[] = [
  { chapterId: "front-matter", sectionId: "rules-of-conduct", title: "Rules of Conduct", start: 1, end: 15 },
  { chapterId: "front-matter", sectionId: "course-logistics", title: "Course Logistics", start: 16, end: 30 },
  { chapterId: "federal-mortgage-laws", sectionId: "respa", title: "RESPA", start: 31, end: 50 },
  { chapterId: "federal-mortgage-laws", sectionId: "ecoa", title: "ECOA", start: 51, end: 70 },
  { chapterId: "federal-mortgage-laws", sectionId: "tila", title: "TILA", start: 71, end: 100 },
  { chapterId: "federal-mortgage-laws", sectionId: "hoepa", title: "HOEPA", start: 101, end: 115 },
  { chapterId: "federal-mortgage-laws", sectionId: "trid", title: "TRID", start: 116, end: 145 },
  { chapterId: "federal-mortgage-laws", sectionId: "hmda", title: "HMDA", start: 146, end: 165 },
  { chapterId: "federal-mortgage-laws", sectionId: "fcra-facta", title: "FCRA & FACTA", start: 166, end: 190 },
  { chapterId: "federal-mortgage-laws", sectionId: "ftc-red-flags", title: "FTC Red Flags Rule", start: 191, end: 205 },
  { chapterId: "federal-mortgage-laws", sectionId: "bsa-aml", title: "BSA/AML", start: 206, end: 225 },
  { chapterId: "federal-mortgage-laws", sectionId: "glba", title: "GLBA", start: 226, end: 240 },
  { chapterId: "federal-mortgage-laws", sectionId: "dnc-tsr", title: "DNC/TSR", start: 241, end: 252 },
  { chapterId: "federal-mortgage-laws", sectionId: "maps", title: "MARS/MAPs", start: 253, end: 270 },
  { chapterId: "general-mortgage-knowledge", sectionId: "loan-products", title: "Loan Products", start: 271, end: 310 },
  { chapterId: "general-mortgage-knowledge", sectionId: "loan-programs", title: "Loan Programs", start: 311, end: 350 },
  { chapterId: "general-mortgage-knowledge", sectionId: "mortgage-terminology", title: "Mortgage Terminology", start: 351, end: 390 },
  { chapterId: "mlo-activities", sectionId: "application", title: "Application", start: 391, end: 415 },
  { chapterId: "mlo-activities", sectionId: "qualification", title: "Qualification", start: 416, end: 440 },
  { chapterId: "mlo-activities", sectionId: "processing-underwriting", title: "Processing & Underwriting", start: 441, end: 470 },
  { chapterId: "mlo-activities", sectionId: "appraisals", title: "Appraisals", start: 471, end: 490 },
  { chapterId: "mlo-activities", sectionId: "title", title: "Title", start: 491, end: 505 },
  { chapterId: "mlo-activities", sectionId: "closing", title: "Closing", start: 506, end: 520 },
  { chapterId: "mlo-activities", sectionId: "mortgage-math", title: "Mortgage Math", start: 521, end: 540 },
  { chapterId: "ethics", sectionId: "fraud", title: "Mortgage Fraud", start: 541, end: 552 },
  { chapterId: "ethics", sectionId: "fair-lending", title: "Fair Lending", start: 553, end: 562 },
  { chapterId: "ethics", sectionId: "prohibited-practices", title: "Prohibited Practices", start: 563, end: 570 },
  { chapterId: "uniform-state-content", sectionId: "safe-act", title: "SAFE Act", start: 571, end: 585 },
  { chapterId: "uniform-state-content", sectionId: "licensing-standards", title: "Licensing Standards", start: 586, end: 600 },
];

const sectionFor = (page: number) =>
  PAGE_MAP.find((s) => page >= s.start && page <= s.end) ??
  { chapterId: "", sectionId: "", title: "" };

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

function findPdf(): string {
  for (const p of ["source/emlo.pdf", "emlo.pdf"]) {
    const abs = path.join(process.cwd(), p);
    if (fs.existsSync(abs)) return abs;
  }
  console.error("\n  emlo.pdf not found (looked in source/ and repo root).\n");
  process.exit(1);
}

async function pageTexts(buffer: Buffer): Promise<string[]> {
  const pages: string[] = [];
  await pdfParse(buffer, {
    pagerender: (pageData: any) =>
      pageData.getTextContent().then((content: any) => {
        const text = content.items.map((i: any) => i.str).join(" ");
        pages.push(text);
        return text;
      }),
  });
  if (pages.length === 0) {
    const parsed = await pdfParse(buffer);
    const total = parsed.numpages || 600;
    const per = Math.ceil(parsed.text.length / total);
    for (let i = 0; i < parsed.text.length; i += per) pages.push(parsed.text.slice(i, i + per));
  }
  return pages;
}

const clean = (s: string) => s.replace(/\s+/g, " ").trim();

type RawChunk = Omit<SourceChunk, "embedding"> & { prefixed: string };

function buildChunks(pages: string[]): RawChunk[] {
  const chunks: RawChunk[] = [];
  pages.forEach((raw, i) => {
    const page = i + 1;
    const text = clean(raw);
    if (text.length < MIN_PAGE_CHARS) return;
    const sec = sectionFor(page);
    // split long pages into overlapping windows; short pages stay whole
    const windows: string[] = [];
    if (text.length <= MAX_CHUNK_CHARS) {
      windows.push(text);
    } else {
      for (let s = 0; s < text.length; s += MAX_CHUNK_CHARS - OVERLAP_CHARS) {
        windows.push(text.slice(s, s + MAX_CHUNK_CHARS));
        if (s + MAX_CHUNK_CHARS >= text.length) break;
      }
    }
    windows.forEach((w, n) => {
      chunks.push({
        id: `p${page}:${n}`,
        page,
        chapterId: sec.chapterId,
        sectionId: sec.sectionId,
        sectionTitle: sec.title,
        text: w,
        prefixed: `[${sec.title || "ebook"} · p.${page}] ${w}`,
      });
    });
  });
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
  const buffer = fs.readFileSync(findPdf());
  console.log("  parsing ebook…");
  const pages = await pageTexts(buffer);
  console.log(`  ${pages.length} pages extracted.`);
  const chunks = buildChunks(pages);

  const meta: Record<string, string> = force || !fs.existsSync(META)
    ? {}
    : JSON.parse(fs.readFileSync(META, "utf8"));
  const stale = chunks.filter((c) => hash(c.prefixed) !== meta[c.id]);

  const totalTokens = chunks.reduce((n, c) => n + estTokens(c.prefixed), 0);
  const staleTokens = stale.reduce((n, c) => n + estTokens(c.prefixed), 0);
  console.log(`\n  ${chunks.length} ebook chunks · ~${totalTokens.toLocaleString()} tok`);
  console.log(`  to embed now: ${stale.length} · ~${staleTokens.toLocaleString()} tok`);
  console.log(`  ${MODEL_ID} @ $${USD_PER_MTOK}/MTok, ${DIMENSIONS}-d → ≈ $${(staleTokens / 1e6 * USD_PER_MTOK).toFixed(4)} this run` +
    ` (full ≈ $${(totalTokens / 1e6 * USD_PER_MTOK).toFixed(4)})`);

  if (!build) {
    console.log("\n  Dry run — nothing embedded. Re-run with --build.\n");
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

  const existing: SourceChunk[] = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : [];
  const prevVec = new Map(existing.map((c) => [c.id, c.embedding]));
  const index: SourceChunk[] = chunks.map(({ prefixed, ...c }) => {
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
  console.log(`\n  Wrote ${index.length} ebook chunks → ${path.relative(process.cwd(), OUT)} (${sizeMb} MB).`);
  console.log("  GITIGNORED — do not commit. Ships to prod via .vercelignore as a server-only asset.\n");
}

main().catch((e) => { console.error(e); process.exit(1); });

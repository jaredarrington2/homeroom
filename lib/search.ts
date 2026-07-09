// lib/search.ts — the search/ask index shape + shared helpers used by both the
// authoring-time index builder (scripts/generate-search-index.ts) and the runtime
// routes (/api/search, /api/ask). Kept out of section.ts to keep that file lean.
//
// Retrieval is dense-vector: every concept group / definition / recap / form section is
// embedded once at authoring time (OpenAI text-embedding-3-small, 512-d, unit-normalized);
// at query time we embed the query and rank by cosine similarity (a plain dot product,
// since every vector is normalized). No embedding API call ships to the client except the
// one tiny query embed inside /api/search.

export type SearchKind = "prose" | "definition" | "recap" | "form";

export interface SearchChunk {
  /** `${unitId}:${gi}` for groups; `${unitId}:def:${slug}`; `${unitId}:recap`;
   *  `mlo-activities:${formId}:${sectionId}` for forms. */
  id: string;
  /** reader route, e.g. "/learn/federal-mortgage-laws" */
  route: string;
  /** "federal-mortgage-laws" | "uniform-state-content" | "general-mortgage-knowledge" | "mlo-activities" */
  chapterId: string;
  /** display label, e.g. "Module 3" */
  module: string;
  /** "respa" (the reader unit; "mlo-activities" for forms) */
  unitId: string;
  /** "RESPA" (for forms, the form name) */
  unitName: string;
  /** group index (prose only) → deep-link anchor grp-${unitId}-${gi} */
  gi?: number;
  /** "escrow accounts" (or the term, for defs; the section name, for forms) */
  heading: string;
  kind: SearchKind;
  /** the clean, searchable body shown in the UI (never the contextual-prefixed form) */
  text: string;
  /** 512-d unit-normalized vector. SERVER-ONLY — never shipped to the client. */
  embedding: number[];
}

export type SearchIndex = SearchChunk[];

/** A verbatim ebook passage — the PRIVATE grounding corpus for Ask only. Never displayed
 *  (synth-only), never in the public repo (gitignored), never publicly served (server-only
 *  fs asset shipped via .vercelignore). See scripts/generate-source-index.ts + /api/ask. */
export interface SourceChunk {
  id: string;          // `p{page}:{n}`
  page: number;
  chapterId: string;   // reader chapter id, or "" (ethics / front-matter have no reader)
  sectionId: string;   // ebook section id (matches a reader unit id for Modules 3/4)
  sectionTitle: string;
  text: string;        // verbatim ebook text — grounding only, NEVER shown to the client
  embedding: number[]; // 512-d unit-normalized
}
export type SourceIndex = SourceChunk[];

/** Reader route for an ebook chapter, or "" when that chapter has no recall reader. */
export function readerRouteFor(chapterId: string): string {
  return MODULE_LABEL[chapterId] ? `/learn/${chapterId}` : "";
}

/** What /api/search returns per hit (no vectors — display fields only). */
export interface SearchResult {
  id: string;
  route: string;
  module: string;
  unitId: string;
  unitName: string;
  heading: string;
  kind: SearchKind;
  gi?: number;
  snippet: string;
  score: number;
}

/** chapterId → the "Module N" display label. The section kickers aren't uniform
 *  ("Section 3" vs "Module 4"/"Module 5"), so the label is pinned here to match the
 *  prototype's breadcrumb ("Module 3 · RESPA › escrow accounts"). */
export const MODULE_LABEL: Record<string, string> = {
  "federal-mortgage-laws": "Module 3",
  "uniform-state-content": "Module 4",
  "general-mortgage-knowledge": "Module 5",
  "mlo-activities": "Module 6",
};

export function normalizeQuery(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Unit-normalize a vector so runtime similarity is a plain dot product. */
export function normalizeVector(v: number[]): number[] {
  let sum = 0;
  for (const x of v) sum += x * x;
  const norm = Math.sqrt(sum) || 1;
  return v.map((x) => x / norm);
}

/** Dot product of two equal-length vectors (== cosine when both are unit-normalized). */
export function dot(a: number[], b: number[]): number {
  let s = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) s += a[i] * b[i];
  return s;
}

/** Rare literal tokens exam lookups hinge on: numbers, dollar/section/percent figures, and
 *  short all-caps codes (RESPA, TILA, SCIF, §32-style). Used for the hybrid lexical boost —
 *  dense retrieval alone is weak on exact literals. */
export function rareTokens(q: string): string[] {
  const out = new Set<string>();
  // numbers / money / percents / § refs, kept with their symbol
  for (const m of q.match(/[$§]?\d[\d.,]*%?/g) ?? []) {
    const t = m.trim();
    if (t.length >= 2 || /\d/.test(t)) out.add(t.toLowerCase());
  }
  // short uppercase codes as authored (2–6 letters), e.g. RESPA, TILA, SCIF, URLA, VA, PMI
  for (const m of q.match(/\b[A-Z][A-Z0-9-]{1,5}\b/g) ?? []) out.add(m.toLowerCase());
  return Array.from(out);
}

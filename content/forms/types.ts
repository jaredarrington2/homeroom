// content/forms/types.ts — data model for the guided form walkthrough (LE / CD).
// Only the ordered steps are data; the faithful form markup stays JSX (LeForm/CdForm).

export interface WalkStep {
  /** 1-based page index. */
  page: number;
  /** Matches data-r on the form region this step highlights. */
  region: number;
  /** Caption heading — a plain noun phrase. */
  title: string;
  /** Caption body — states what the field says; never "read"/"look"/"notice". */
  body: string;
  /** Optional margin insight (Caveat hand). May contain <mark>…</mark> for the highlighter. */
  tell?: string;
}

/** A labeled field on the arm-note artifact (rendered from config, not hard-coded JSX). */
export interface NoteField {
  label: string;
  value: string;
}

export interface FormWalkthroughData {
  kind: "le" | "cd" | "arm-note";
  /** Header title, e.g. "Loan Estimate". */
  label: string;
  /** Header subline. */
  sub: string;
  /** 1 now; grows as pages are added. */
  pageCount: number;
  /** arm-note only: the labeled fields the note renders, in order. Region N is the 1-based
   *  field index; steps target them by region. LE/CD ignore this (their markup is JSX). */
  fields?: NoteField[];
  /** Ordered top-to-bottom, page by page. */
  steps: WalkStep[];
}

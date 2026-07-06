// lib/section.ts — content shape for the recall-gradient section reader.
// One SectionContent per section; every section renders through the same components,
// so the design + woven recall apply everywhere. Only this data is authored per section.
//
// Recall gradient (each quizzable fact lives in EXACTLY one tier):
//   tier 1 — inline cloze: an atomic high-yield value, blanked inside a narrative sentence
//   tier 2 — synthesis short-answer: a concept group's 2+ facts, assembled in the reader's words
//   tier 3 — review deck: everything else, as flashcards (flip) + MCQ (select)

export type FigKind = "char" | "bldg" | "illus";

export interface Figure {
  /** Image filename as it sits in public/. char -> /characters, bldg -> /properties,
   *  illus -> /illustrations (authoring-time generated art; file may include a unit subdir,
   *  e.g. "tila/finance-charge-card.png"). */
  file: string;
  /** ≤2-word mono caption naming the memory link, e.g. "outside RESPA", "Section 8" */
  caption: string;
  kind: FigKind;
  /** Listen feature: what the narrator says for this figure. Name it and walk its parts;
   *  don't narrate it as an image. Omit to skip the figure in audio. */
  spokenCaption?: string;
}

export interface SectionParagraph {
  /** Narrative HTML (may use <b>). May contain ONE inline cloze span:
   *  <span class="cloze" data-accept='["..."]' data-reveal="...">?</span> */
  html: string;
  /** Listen feature: override the spoken text for this paragraph. Falls back to the
   *  cloze-substituted, tag-stripped html. */
  spoken?: string;
}

/** A full-width document mockup rendered inline in a concept group (DisclosureVisual.tsx).
 *  Distinct from `anchor` (a small floated photo) — these show what a disclosure contains. */
export type DisclosureVisualKind =
  | "lifecycle-timeline"
  | "escrow-accrual"
  | "escrow-analysis"
  | "servicing-transfer"
  | "apr-stack"
  | "tolerance-buckets"
  | "licensed-vs-registered"
  | "pe-ce-hours"
  | "exam-attempts"
  | "temp-authority-windows";

export interface ConceptGroup {
  /** Plain lowercase mono heading, e.g. "what it covers". Omit for the opening paragraph. */
  heading?: string;
  /** 0–1 small anchor image, matched to the group's core idea by manifest tags. */
  anchor?: Figure;
  /** 0–1 full-width bespoke illustration (a generated study visual, not a floated anchor).
   *  Rendered large after the prose, before the synth — for content-rich art like the
   *  finance-charge sort card. Kind is typically "illus". */
  illustration?: Figure;
  /** Listen feature: override the spoken text for this group's FIRST paragraph (e.g. to
   *  skip a scene-setting opener). Falls back to that paragraph's own spoken/html. */
  spoken?: string;
  paras: SectionParagraph[];
  /** 0–1 synthesis short-answer after the group (graded for meaning via /api/grade). */
  synth?: { q: string; a: string };
  /** 0–1 inline document mockup showing what this disclosure requires. */
  visual?: DisclosureVisualKind;
  /** 0–1 live photoreal study card (an id in content/study-cards.ts). Rendered as the layered
   *  <StudyCard> after the prose — richer than `visual` for content that sorts into columns. */
  studyCard?: string;
  /** 0–1 guided form walkthrough (FormWalkthrough.tsx, a client component). Renders the faithful
   *  Loan Estimate ('le') or Closing Disclosure ('cd') and steps a highlight field-by-field. */
  walkthrough?: "le" | "cd";
}

export interface Definition {
  /** The term being defined, e.g. "Balloon Payment". */
  term: string;
  /** The definition text (plain prose; statutory wording, lightly cleaned). */
  def: string;
}

export interface ReviewFlashcard {
  /** ≤2-word corner peg, e.g. "the days". */
  peg: string;
  /** Theme label for the unit's review topic bar; cards sharing a theme dedupe into one pill. */
  topic?: string;
  q: string;
  /** Answer; may wrap key values in <span class='hl'>…</span>. */
  a: string;
}

export interface ReviewMCQ {
  q: string;
  opts: string[];
  /** Index into opts of the correct option. */
  correct: number;
}

export interface UnitRecap {
  /** 1–3 sentences, no jargon — "what is this law, in plain terms". */
  plainLanguage: string;
  /** Key facts to memorize. Each string is rendered with dangerouslySetInnerHTML, so
   *  values to memorize can be wrapped in <span class="hl">…</span> for the highlighter
   *  effect — same convention as ReviewFlashcard.a. */
  facts: string[];
}

export interface SectionUnit {
  id: string;    // slug, e.g. "respa"
  name: string;  // "RESPA"
  reg: string;   // "Real Estate Settlement Procedures Act · Reg X"
  /** 0+ statutory definitions for this law, shown as a flip-card deck before the reading. */
  definitions?: Definition[];
  groups: ConceptGroup[];
  review: { flashcards: ReviewFlashcard[]; mcq: ReviewMCQ[] };
  /** 0–1 end-of-unit recap card (big-format recall card). Hand-authored, optional —
   *  units without one don't render the trigger. */
  recap?: UnitRecap;
}

export interface SectionContent {
  id: string;       // chapter/section id, e.g. "federal-mortgage-laws"
  title: string;    // "Federal mortgage related laws"
  kicker: string;   // "Section 3"
  units: SectionUnit[];
}

/** Resolve a figure's public path. */
export function figureSrc(fig: Figure): string {
  const dir = fig.kind === "bldg" ? "/properties/" : fig.kind === "illus" ? "/illustrations/" : "/characters/";
  return dir + fig.file;
}

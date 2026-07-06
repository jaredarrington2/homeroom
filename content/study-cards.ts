// content/study-cards.ts — the manifest that drives BOTH generation and render for the
// photoreal "study card" family (see ~/Downloads/homeroom-photoreal-study-cards-spec.md).
//
// Adding a card = adding an entry here. No new code. The generator
// (scripts/generate-study-cards.ts) reads this to decide what OpenAI assets to make; the
// <StudyCard> component reads it to render the live, layered card in the reader.
//
// Doctrine (from the render-review rubric, enforced for the whole class): generate only what
// floats free (the blank paper plate + the Sharpie title); DRAW everything with coordinates
// locally (rules, margin, dividers, typed body, highlighter, marginalia, tooltips). So the
// plate is a single BLANK card face shared by every format — the overlay supplies the ruling.

export type CardFormat = "single-column" | "two-column" | "three-column";

/** Brand highlighter tokens (the .dv-hl-* set already in the design system). */
export type HighlighterColor = "pink" | "yellow" | "green" | "blue";

export interface HighlighterSwipe {
  color: HighlighterColor;
  /** The exact column header string the swipe sits behind. */
  target: string;
}

export interface StudyCardColumn {
  /** Typed small-caps header; highlit if a swipe targets it. */
  header?: string;
  /** Typed body, one entry per ruled line. */
  lines: string[];
}

export interface CardMarginalia {
  /** Caveat pen note. */
  text: string;
  /** The body line (verbatim) the leader arrow points at. */
  anchor: string;
}

export interface StudyCard {
  id: string; // e.g. "trid-tolerances"
  unitId: string; // e.g. "trid"
  format: CardFormat;
  /** The ONE Sharpie string — the card's main title. Sub-headers are never Sharpie. */
  title: string;
  /** Caveat marginalia under the title. */
  subtitle?: string;
  columns: StudyCardColumn[];
  highlighter?: HighlighterSwipe[];
  marginalia?: CardMarginalia[];
  /** term -> gloss, shown in a Courier Prime popover on hover/tap. */
  tooltips?: Record<string, string>;
  /** Pen-marginalia line along the base rule. */
  footer?: string;
  /** A photoreal sticker (OpenAI) affixed to the card — a VISUAL CATEGORY CUE, not a fact (the
   *  stamps + typed text carry the facts). `motif` is the generation subject: a simple thematic
   *  icon that harkens to the card's topic. */
  sticker?: { motif: string; alt?: string; corner?: "tl" | "tr" | "bl" | "br" };
}

export const studyCards: StudyCard[] = [
  {
    id: "trid-tolerances",
    unitId: "trid",
    format: "three-column",
    title: "TRID Fee Tolerances",
    subtitle: "How far a quoted fee may move from Loan Estimate to Closing Disclosure",
    columns: [
      {
        header: "ZERO TOLERANCE",
        lines: [
          "lender / origination fees",
          "a provider the lender requires",
          "transfer taxes",
        ],
      },
      {
        header: "10% TOLERANCE",
        lines: [
          "recording fees",
          "a provider you shopped from the lender's list",
        ],
      },
      {
        header: "NO TOLERANCE",
        lines: [
          "prepaid interest, property taxes",
          "homeowner's insurance",
          "a provider you chose off the list",
        ],
      },
    ],
    highlighter: [
      { color: "pink", target: "ZERO TOLERANCE" },
      { color: "yellow", target: "10% TOLERANCE" },
      { color: "green", target: "NO TOLERANCE" },
    ],
    tooltips: {
      "transfer taxes":
        "Government taxes on transferring the title. The lender can't shop or control them, so they get zero tolerance — the disclosed figure can't rise at all.",
      "prepaid interest":
        "Interest from closing to your first payment. It moves with the closing date, so it carries no tolerance limit.",
      "recording fees":
        "What the county charges to record the deed and mortgage. Grouped with the 10% bucket.",
    },
    footer:
      "The 10% test compares LE and CD totals for the whole bucket, not fee by fee — anything above 110% of the disclosed total is the lender's to refund.",
    sticker: {
      motif: "two tabbed document sheets joined by a zipper with a small clock tucked behind them (letterpress office ephemera)",
      alt: "Sticker: two documents zipped together with a clock behind — the TRID integrated disclosures and their timing.",
      corner: "br",
    },
  },

  // Migrated off the old baked PNG (scripts/generate-finance-card.ts) into the live system.
  {
    id: "finance-charge",
    unitId: "tila",
    format: "two-column",
    title: "What counts in the finance charge",
    subtitle: "= the APR, just in dollars instead of a rate",
    columns: [
      {
        header: "IN",
        lines: [
          "Interest + points",
          "The lender's own fees",
          "Insurance for the lender's default risk",
          "A required third-party fee — the part the lender keeps",
          "Broker's fee — always",
        ],
      },
      {
        header: "OUT",
        lines: [
          "Application fee (charged to everyone)",
          "Late & over-limit fees",
          "The seller's points",
          "Pre-closing services — appraisal, credit report",
        ],
      },
    ],
    highlighter: [
      { color: "blue", target: "IN" },
      { color: "pink", target: "OUT" },
    ],
    marginalia: [{ text: "even if you picked them", anchor: "Broker's fee — always" }],
    sticker: {
      motif: "a paper price tag under a round magnifying lens with coins and tiny fee marks inside (mid-century editorial cut-paper collage)",
      alt: "Sticker: a price tag under a magnifying glass — reading the true cost of a loan.",
      corner: "br",
    },
  },
];

export function getStudyCard(id: string): StudyCard | undefined {
  return studyCards.find((c) => c.id === id);
}

/** How many columns a format renders. */
export function columnCount(format: CardFormat): number {
  return format === "three-column" ? 3 : format === "two-column" ? 2 : 1;
}

/** Shared blank plate (one card face for every format — the overlay draws the ruling). */
export const PLATE_FILE = "_plates/index-card.png";

/** Per-card Sharpie title PNG (dark ink on white; the component multiplies out the white). */
export function titleFile(card: StudyCard): string {
  return `${card.unitId}/${card.id}-title.png`;
}

/** Per-card photoreal sticker PNG (keyed to transparent). */
export function stickerFile(card: StudyCard): string {
  return `${card.unitId}/${card.id}-sticker.png`;
}

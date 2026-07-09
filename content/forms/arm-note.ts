// content/forms/arm-note.ts — the Adjustable-Rate Note walkthrough (Module 5, ARMs unit).
// Unlike le/cd (hard-coded government forms), the note is a labeled-field artifact rendered
// from `fields` — the generalized FormWalkthrough artifact slot (slice-3 open decision 1).
// Copy is voice-checked (arm-slice-content.md §1); figures verify against the exam year:
// FIAR = index + margin rounded to the nearest ⅛% → 4.350 + 3.000 = 7.350 → 7.375.
import type { FormWalkthroughData } from "./types";

export const armNoteWalk: FormWalkthroughData = {
  kind: "arm-note",
  label: "Adjustable-Rate Note",
  sub: "5/1 ARM · sample terms",
  pageCount: 1,
  fields: [
    { label: "Loan type", value: "5/1 ARM" },
    { label: "Start rate", value: "2.000%" },
    { label: "Index — SOFR", value: "4.350%" },
    { label: "Margin", value: "3.000%" },
    { label: "Fully-indexed rate", value: "7.375%" },
    { label: "Interest-rate caps", value: "3 / 1 / 8" },
  ],
  steps: [
    {
      page: 1, region: 1, title: "Loan type",
      body: "The first number is the years the rate stays fixed — five. The second is how often it adjusts after that — every year.",
    },
    {
      page: 1, region: 2, title: "Start rate",
      body: "The start rate is the introductory rate, set below market to make the ARM worth taking. It holds through the whole fixed period.",
    },
    {
      page: 1, region: 3, title: "Index",
      body: "The index is the moving part — a public rate the loan tracks. When the loan adjusts, its rate is built from wherever the index sits that day.",
    },
    {
      page: 1, region: 4, title: "Margin",
      body: "The margin is the lender's markup, fixed for the life of the loan and added to the index. The rate can never fall below it.",
    },
    {
      page: 1, region: 5, title: "Fully-indexed rate",
      body: "Index plus margin is the fully-indexed rate — the real rate once the ARM adjusts. Here, 4.350 + 3.000 = 7.350.",
      tell: "Rounded to the nearest <mark>⅛%</mark>, 7.350 becomes 7.375.",
    },
    {
      page: 1, region: 6, title: "Interest-rate caps",
      body: "The caps limit each jump: the first adjustment, every one after, and the lifetime ceiling. A cap is a number of percentage points, not a rate.",
      tell: "<mark>Together they set the worst case.</mark>",
    },
  ],
};

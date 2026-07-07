// lib/answer.ts — shared answer normalization + checking for fill-in recall.
// Extracted verbatim from ClozeProse so the cloze inputs and the Worksheet drill
// (components/Worksheet.tsx) grade answers the same way. No behavior change to cloze.

/** Lowercase, trim, drop $ , % and trailing period, collapse whitespace. */
export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[$,%]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\.$/, "");
}

/** True when `input` normalizes to any of the accepted strings. */
export function checkAnswer(input: string, accept: string[]): boolean {
  const n = normalizeAnswer(input);
  return accept.some((a) => normalizeAnswer(a) === n);
}

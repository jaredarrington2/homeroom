// lib/answer.ts — shared answer normalization + checking for fill-in recall.
// Used by ClozeProse, Worksheet (components/Worksheet.tsx) and RecallBoxes.
//
// v2 (Module 1 cloze sweep): the normalizer canonicalizes spelling and numeral variants,
// so `data-accept` lists only carry genuine SYNONYMS ("CFPB" / "Consumer Financial
// Protection Bureau") rather than spelling permutations. These all collapse to one string:
//   2.5 · 2.50 · two and a half · two-and-a-half · 2 1/2
//   20% · 20 · twenty percent
//   a twelfth · one-twelfth · 1/12
//   $3,000 · 3000 · three thousand
//
// Unit-safety: unit words are NOT stripped, so "3 days" and "3 years" stay distinct.
// A bare "3" matches either only if the accept list offers the bare form itself.

const SMALL: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
  eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13,
  fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
};
const TENS: Record<string, number> = {
  twenty: 20, thirty: 30, forty: 40, fifty: 50,
  sixty: 60, seventy: 70, eighty: 80, ninety: 90,
};
const MULT: Record<string, number> = {
  thousand: 1e3, million: 1e6, billion: 1e9, trillion: 1e12,
};
/** Ordinal words usable as fractions: "a twelfth", "three quarters". */
const ORD_FRAC: Record<string, number> = {
  half: 1 / 2, halves: 1 / 2, third: 1 / 3, thirds: 1 / 3,
  quarter: 1 / 4, quarters: 1 / 4, fourth: 1 / 4, fourths: 1 / 4,
  fifth: 1 / 5, fifths: 1 / 5, eighth: 1 / 8, eighths: 1 / 8,
  twelfth: 1 / 12, twelfths: 1 / 12,
};
const LEADING_STOPWORDS = /^(?:the|a|an|its|his|her|their)\s+/;

const isNum = (w: string) => /^\d+(?:\.\d+)?$/.test(w);
const isFrac = (w: string) => /^\d+\/\d+$/.test(w);
const fmt = (v: number) => String(Math.round(v * 10000) / 10000);

/**
 * Collapse runs of numeral tokens into a single canonical numeric token.
 *
 * Spoken years and hundreds are read as a PAIR, not a sum: "nineteen seventy-four"
 * is 1974, not 93; "twenty fifteen" is 2015; "five eighty" is 580. So a tens word —
 * or a teen — arriving on top of a chunk still under 100 multiplies that chunk by 100
 * instead of adding to it. Ordinary sums are untouched ("twenty five" = 25, because
 * a unit word under ten is always additive; "one hundred twenty" = 120, because the
 * chunk is already at 100 when "twenty" lands).
 */
function composeNumerals(tokens: string[]): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < tokens.length) {
    let total = 0, cur = 0, saw = false, j = i, mixed = false;
    /** True when `cur` holds a finished 1–99 chunk that a following pair-half rides on. */
    const pairs = () => cur > 0 && cur < 100;
    while (j < tokens.length) {
      const w = tokens[j];
      // Two bare numerals in a row are separate values ("September 11, 2001"), not a sum.
      if (isNum(w)) { if (saw) break; cur += parseFloat(w); saw = true; j++; }
      else if (isFrac(w)) {
        const [a, b] = w.split("/").map(Number);
        cur += a / b; saw = true; j++;
      }
      else if (w in SMALL) {
        // A teen can be the second half of a year ("twenty fifteen"); a unit word can't.
        cur = SMALL[w] >= 10 && pairs() ? cur * 100 + SMALL[w] : cur + SMALL[w];
        saw = true; j++;
      }
      else if (w in TENS) { cur = pairs() ? cur * 100 + TENS[w] : cur + TENS[w]; saw = true; j++; }
      else if (w === "hundred") { cur = (cur || 1) * 100; saw = true; j++; }
      else if (w in MULT) { total += (cur || 1) * MULT[w]; cur = 0; saw = true; j++; }
      else if (w === "and" && j + 1 < tokens.length &&
               (tokens[j + 1] in ORD_FRAC ||
                (tokens[j + 1] === "a" && j + 2 < tokens.length && tokens[j + 2] in ORD_FRAC))) {
        mixed = true; j++; // "two and a half" is additive, not a fraction
      }
      else if (w === "a" && j + 1 < tokens.length && tokens[j + 1] in ORD_FRAC) { j++; }
      else if (w in ORD_FRAC) {
        // "one twelfth" / "three quarters" = numerator x fraction;
        // "two and a half" / bare "half" = additive.
        if (saw && !mixed && cur > 0) cur = cur * ORD_FRAC[w];
        else cur += ORD_FRAC[w];
        saw = true; j++;
      }
      else break;
    }
    if (saw) { out.push(fmt(total + cur)); i = j; }
    else { out.push(tokens[i]); i++; }
  }
  return out;
}

/**
 * Lowercase, trim, drop $ , % and trailing punctuation, collapse whitespace,
 * turn hyphens into spaces, compose numerals, drop leading articles, de-pluralize.
 */
export function normalizeAnswer(s: string): string {
  let t = s
    .toLowerCase()
    .trim()
    .replace(/[\u2019']/g, "")
    .replace(/[$,%]/g, "")
    .replace(/[-_\u2010-\u2015]/g, " ")
    .replace(/\u00bd/g, " 1/2")
    .replace(/\u00bc/g, " 1/4")
    .replace(/\u00be/g, " 3/4")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\bpercent\b|\bpct\b/g, "")
    .replace(/\s+/g, " ")
    .replace(/[.\s]+$/, "")
    .trim();

  t = t.replace(LEADING_STOPWORDS, "");
  t = composeNumerals(t.split(" ").filter(Boolean)).join(" ");
  t = t.replace(LEADING_STOPWORDS, "");
  // de-pluralize a trailing s on words of 4+ chars (days -> day, GSEs -> GSE)
  t = t.replace(/\b([a-z]{3,}?)s\b/g, "$1");
  return t.replace(/\s+/g, " ").trim();
}

/** True when `input` normalizes to any of the accepted strings. */
export function checkAnswer(input: string, accept: string[]): boolean {
  const n = normalizeAnswer(input);
  if (!n) return false;
  return accept.some((a) => normalizeAnswer(a) === n);
}

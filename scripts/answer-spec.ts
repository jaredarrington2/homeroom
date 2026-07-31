// Spec for lib/answer.ts normalization. Run:
//   npx --yes -p typescript@5.4.5 -p ts-node@10.9.2 ts-node --transpile-only \
//     --project tsconfig.scripts.json scripts/answer-spec.ts
import { normalizeAnswer, checkAnswer } from "../lib/answer";

const eq: [string, string][] = [
  // the v2 header's own claims
  ["2.5", "two and a half"], ["2.50", "2 1/2"], ["two-and-a-half", "2.5"],
  ["20%", "20"], ["twenty percent", "20%"],
  ["a twelfth", "one-twelfth"], ["1/12", "one twelfth"],
  ["$3,000", "3000"], ["three thousand", "$3,000"],
  // spoken years and hundreds read as pairs
  ["nineteen seventy-four", "1974"], ["nineteen sixty-eight", "1968"],
  ["nineteen seventy", "1970"], ["nineteen ninety-nine", "1999"],
  ["nineteen ninety-eight", "1998"], ["nineteen forty-four", "1944"],
  ["twenty fifteen", "2015"], ["twenty ten", "2010"], ["two thousand ten", "2010"],
  ["two thousand eight", "2008"], ["five eighty", "580"], ["five hundred eighty", "580"],
  // ordinary sums still sum
  ["twenty five", "25"], ["one hundred twenty", "120"], ["ninety", "90"],
  ["ten million", "10,000,000"], ["eleven trillion", "$11 trillion"],
  // words, articles, plurals
  ["the margin", "margin"], ["GSEs", "GSE"], ["Consumer Financial Protection Bureau", "consumer financial protection bureau"],
];

const ne: [string, string][] = [
  // unit safety
  ["3", "3 days"], ["3 years", "3 days"], ["3 days", "3 business days"],
  ["1974", "93"], ["2015", "35"], ["2010", "30"], ["1968", "87"],
  ["11 2001", "2012"], ["580", "85"],
  ["25", "2005"], ["120", "1020"],
];

let fail = 0;
for (const [a, b] of eq) {
  if (normalizeAnswer(a) !== normalizeAnswer(b)) {
    fail++; console.log(`FAIL  "${a}" should equal "${b}"  ("${normalizeAnswer(a)}" vs "${normalizeAnswer(b)}")`);
  }
}
for (const [a, b] of ne) {
  if (normalizeAnswer(a) === normalizeAnswer(b)) {
    fail++; console.log(`FAIL  "${a}" should NOT equal "${b}"  (both "${normalizeAnswer(a)}")`);
  }
}
if (checkAnswer("", ["anything"])) { fail++; console.log("FAIL  empty input must never grade correct"); }
console.log(`${eq.length + ne.length + 1 - fail}/${eq.length + ne.length + 1} pass`);
process.exit(fail ? 1 : 0);

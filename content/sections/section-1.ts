// content/sections/section-1.ts — Module 1, "Introduction to Mortgage Lending" (Plan v4, Slice G).
// The front-door reader: teaches the vocabulary every later module assumes — the note & the lien,
// principal/interest/term & escrow, the parties, the secondary market, the regulators (intro),
// the loan lifecycle, the axes that make loans differ, the price-of-a-loan vocabulary, and why the
// rules exist. Authored to the same recall-gradient schema as Modules 3/4/5. Foundational,
// universally-true US mortgage facts only — no exam-year-sensitive figures live here.
import type { SectionContent } from '@/lib/section';
import unitsA from './m1-units-a';
import unitsB from './m1-units-b';
import unitsC from './m1-units-c';

const section1: SectionContent = {
  id: 'front-matter',
  title: 'Introduction to Mortgage Lending',
  moduleNumber: 1,
  units: [...unitsA, ...unitsB, ...unitsC],
};

export default section1;

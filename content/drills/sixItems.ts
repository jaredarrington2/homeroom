// content/drills/sixItems.ts — data for the "six items" recall drill (RecallBoxes.tsx),
// mounted on Module 6 unit 01. The learner names the six pieces of information that
// turn a conversation into an application, in any order, in their own words; each
// match locks the canonical label and shows how Maya's file answers it.
//
// Sample values are Maya Okonkwo's, so the borrower who runs through the application
// unit and the deal desk is the same person here.
//
// The clock: TRID gives the lender three GENERAL BUSINESS days to issue the Loan
// Estimate. The strip below shows those three days falling across a weekend — the
// point being that three business days is commonly five or six calendar days, which
// is where the "about a week" intuition comes from. Do NOT change 3 to a calendar
// count; the three-business-day figure is cloze-tested in this unit and carried in
// the recap card.

export interface DrillItem {
  key: string;
  /** The canonical label, revealed once the learner names it. */
  canon: string;
  /** How Maya's file answers it. */
  sample: string;
}

export const ITEMS: DrillItem[] = [
  { key: 'name', canon: 'Her name', sample: 'Maya A. Okonkwo' },
  { key: 'income', canon: 'Her income', sample: '$6,200 / mo' },
  { key: 'ssn', canon: 'Her Social Security number', sample: '•••–••–1834' },
  { key: 'address', canon: "The property's address", sample: '88 Alders Ct #204' },
  { key: 'value', canon: "The property's value or purchase price", sample: '$340,000' },
  { key: 'amount', canon: 'The loan amount', sample: '$315,000' },
];

/** Specific phrases resolve first, then bare keywords — so "loan amount" lands on
 *  `amount` rather than being caught by the `value`/`price` keyword. */
const PHRASES: [RegExp, string][] = [
  [/loan amount|mortgage amount|amount of the loan|amount sought|amount borrowed|how much.*borrow/, 'amount'],
  [/purchase price|sale price|sales price|estimated value|estimate of value|property value|value of the property|home value|what.*worth/, 'value'],
  [/property address|address of the property|subject property|property location/, 'address'],
  [/social security|security number/, 'ssn'],
];

const KEYWORDS: [RegExp, string][] = [
  [/\bnames?\b/, 'name'],
  [/income|salary|salaries|wages?|earnings?|earns?|pay ?stub/, 'income'],
  [/\bssn\b|\bss\b|social/, 'ssn'],
  [/address|street|location/, 'address'],
  [/value|price|worth/, 'value'],
  [/amount|\bloans?\b|borrows?/, 'amount'],
];

const norm = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[’']/g, '')
    .replace(/[.,;:!?#\-–—]/g, ' ')
    .replace(/\s+/g, ' ');

/** Resolve free text to one of the six keys, or null if it isn't one of them. */
export function resolve(raw: string): string | null {
  const v = norm(raw);
  if (!v) return null;
  for (const [re, key] of PHRASES) if (re.test(v)) return key;
  for (const [re, key] of KEYWORDS) if (re.test(v)) return key;
  return null;
}

export const SHEET = { lender: 'Bayline Home Lending', meta: 'Intake · file 4417' };

/** The three-business-day clock, drawn across a weekend. `n` numbers the business
 *  days that count; closed days are skipped. */
export interface ClockDay {
  label: string;
  kind: 'applied' | 'business' | 'closed' | 'due';
  n?: number;
}

export const CLOCK: ClockDay[] = [
  { label: 'Thu', kind: 'applied' },
  { label: 'Fri', kind: 'business', n: 1 },
  { label: 'Sat', kind: 'closed' },
  { label: 'Sun', kind: 'closed' },
  { label: 'Mon', kind: 'business', n: 2 },
  { label: 'Tue', kind: 'due', n: 3 },
];

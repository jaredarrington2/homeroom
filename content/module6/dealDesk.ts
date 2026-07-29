// content/module6/dealDesk.ts — data + pricing model for the Module 6 deal desk
// (components/DealDesk.tsx, embedded on the pricing-locking unit).
//
// The shape follows the real PPE workflow the unit teaches: a scenario, a target
// price + lock period set BEFORE any product is returned, eligible and ineligible
// lists (ineligible with reasons), a per-product rate ladder whose final price is
// base price + lock-period adjustment + the loan-level adjustment stack, then a
// lock REQUEST that sits pending until the desk accepts. Dollar figures here are
// illustrative sample data (the DisclosureVisual precedent) — internally
// consistent, not exam-tested.

export interface RateRung {
  rate: number;   // note rate, %
  base: number;   // base price at the 45-day lock, per $100
}

export interface Adjustment {
  label: string;
  amount: number; // price adjustment; negative worsens (costs) the price
}

export interface DeskProduct {
  id: string;
  name: string;
  termMonths: number;
  kind: 'fixed' | 'arm';
  eligible: boolean;
  /** Ineligible products carry the expandable reason instead of a ladder. */
  reason?: string;
  ladder?: RateRung[];
}

/** Price add-on by lock period, relative to the 45-day base. Shorter locks price better. */
export const PERIOD_ADJ: Record<number, number> = { 15: 0.25, 30: 0.125, 45: 0, 60: -0.25 };

export const LOCK_PERIODS = [15, 30, 45, 60];

/** Lock-extension menu: days → price cost. */
export const EXTENSIONS: { days: number; cost: number }[] = [
  { days: 7, cost: 0.125 },
  { days: 15, cost: 0.25 },
];

/** Originator compensation, in points, when lender-paid comp is stripped out
 *  (borrower-paid mode: prices improve by this, and the borrower pays it directly). */
export const COMP_POINTS = 1.0;

export const SCENARIO = {
  lender: 'Bayline Home Lending',
  desk: 'Pricing & lock desk',
  borrower: 'Maya A. Okonkwo',
  purpose: 'Purchase',
  propertyType: 'Condominium',
  location: 'Oakland · Alameda County · CA',
  value: 340000,
  loan: 315000,
  ltv: '92.6%',
  fico: 742,
  dti: '41%',
  escrow: 'Escrowed',
  ssnMasked: '•••-••-1834',
};

/** The stack for this file, by occupancy. Zero-amount lines are shown deliberately —
 *  reading "no adjustment" is part of learning to read the stack. */
export function adjustments(occ: 'primary' | 'investment', product: DeskProduct): Adjustment[] {
  if (product.termMonths === 180) {
    return [{ label: 'Term 15 years — credit-score and LTV adjustments waived', amount: 0 }];
  }
  const stack: Adjustment[] = [
    { label: 'Credit score 740–759 · LTV 90.01–95', amount: -0.375 },
    { label: 'Condominium · LTV over 90', amount: -0.5 },
  ];
  if (product.kind === 'arm') stack.push({ label: 'Adjustable rate · LTV over 90', amount: -0.25 });
  if (occ === 'investment') stack.push({ label: 'Investment property', amount: -2.125 });
  else stack.push({ label: 'Owner-occupied primary residence', amount: 0 });
  return stack;
}

export const PRODUCTS: DeskProduct[] = [
  {
    id: 'conv30',
    name: 'Conventional 30 Fixed',
    termMonths: 360,
    kind: 'fixed',
    eligible: true,
    ladder: [
      { rate: 6.125, base: 98.125 },
      { rate: 6.25, base: 98.625 },
      { rate: 6.375, base: 99.125 },
      { rate: 6.5, base: 99.625 },
      { rate: 6.625, base: 100.125 },
      { rate: 6.75, base: 100.5 },
      { rate: 6.875, base: 100.875 },
      { rate: 7.0, base: 101.125 },
      { rate: 7.125, base: 101.375 },
    ],
  },
  {
    id: 'conv15',
    name: 'Conventional 15 Fixed',
    termMonths: 180,
    kind: 'fixed',
    eligible: true,
    ladder: [
      { rate: 5.5, base: 98.375 },
      { rate: 5.625, base: 98.875 },
      { rate: 5.75, base: 99.375 },
      { rate: 5.875, base: 99.875 },
      { rate: 6.0, base: 100.25 },
      { rate: 6.125, base: 100.625 },
      { rate: 6.25, base: 100.875 },
    ],
  },
  {
    id: 'arm56',
    name: '5/6 ARM · SOFR',
    termMonths: 360,
    kind: 'arm',
    eligible: true,
    ladder: [
      { rate: 5.875, base: 98.5 },
      { rate: 6.0, base: 99.0 },
      { rate: 6.125, base: 99.5 },
      { rate: 6.25, base: 99.875 },
      { rate: 6.375, base: 100.25 },
      { rate: 6.5, base: 100.5 },
    ],
  },
  { id: 'fha30', name: 'FHA 30 Fixed', termMonths: 360, kind: 'fixed', eligible: false, reason: 'condo is not on the FHA approved list' },
  { id: 'va30', name: 'VA 30 Fixed', termMonths: 360, kind: 'fixed', eligible: false, reason: 'borrower is not a veteran' },
  { id: 'usda30', name: 'USDA Guaranteed 30', termMonths: 360, kind: 'fixed', eligible: false, reason: 'property is not in an eligible rural area' },
  { id: 'jumbo30', name: 'Jumbo 30 Fixed', termMonths: 360, kind: 'fixed', eligible: false, reason: 'loan amount is within the conforming limit' },
  { id: 'homeready', name: 'HomeReady 30', termMonths: 360, kind: 'fixed', eligible: false, reason: 'income exceeds the area median income limit' },
];

/** Final price for a rung under a lock period + this file's stack (+ comp mode). */
export function finalPrice(
  rung: RateRung,
  period: number,
  stack: Adjustment[],
  comp: 'lp' | 'bp',
): number {
  const adj = stack.reduce((s, a) => s + a.amount, 0);
  return rung.base + (PERIOD_ADJ[period] ?? 0) + adj + (comp === 'bp' ? COMP_POINTS : 0);
}

/** Monthly principal & interest. */
export function pmt(loan: number, rate: number, months: number): number {
  const r = rate / 1200;
  return (loan * r) / (1 - Math.pow(1 + r, -months));
}

/** Points cost (+) or credit (−) in dollars for a final price. */
export function pointsDollars(price: number, loan: number): number {
  return ((100 - price) / 100) * loan;
}

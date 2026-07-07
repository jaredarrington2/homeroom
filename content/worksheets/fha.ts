// content/worksheets/fha.ts — data + math for the FHA structuring worksheet-drill.
// Single source of truth for both modes: the drill checks the learner's entries against
// derive(), the explorer prints them live. Mirrors content/forms/ for the walkthrough.
//
// Figures are the ebook's "Structuring the Perfect FHA Loan" example (Alicia, pp. 327–328),
// verified against the exam year (3.5% down floor · 1.75% UFMIP · round-DOWN-to-$50 ·
// 0.55% annual MIP factor for a 30-yr term above 95% LTV) and the derived chain:
//   13,142.50 → 362,357.50 → 6,341.26 → 368,698.76 → 368,650 ; PITI 2,624.70.
import type { WorksheetScenario, WorksheetStep } from "@/lib/section";

export interface FhaInputs {
  price: number;
  downP: number;
  amipF: number;
  rate: number;
  tax: number;
  ins: number;
}

/** Standard fully-amortizing monthly payment. Used live in the explorer; the drill hands
 *  P&I over as a given, since computing it by hand isn't the FHA-structuring skill. */
export function amort(principal: number, ratePct: number, years: number): number {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  return r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/** Every worksheet line, keyed. The single source of truth for drill + explorer. */
export function derive(i: FhaInputs): Record<string, number> {
  const dn = (i.price * i.downP) / 100; // down payment
  const base = i.price - dn; // base loan amount
  const uf = base * 0.0175; // up-front MIP, 1.75% of base
  const total = base + uf; // total loan amount
  const round = Math.floor(total / 50) * 50; // rounded DOWN to nearest $50 — the exam's trap
  const pi = amort(round, i.rate, 30); // principal & interest (given in the drill)
  const mip = (base * i.amipF) / 100 / 12; // monthly MIP
  const taxM = i.tax / 12; // monthly taxes
  const insM = i.ins / 12; // monthly insurance
  return { price: i.price, dn, base, uf, total, round, pi, mip, taxM, insM, piti: pi + mip + taxM + insM };
}

const loanAmount: WorksheetStep[] = [
  { op: "", label: "purchase price", key: "price", given: true },
  { op: "−", label: "down payment (3.5%)", key: "dn", ask: true },
  { op: "=", label: "base loan amount", key: "base", ask: true, total: true },
  { op: "×", label: "up-front MIP (1.75%)", key: "uf", ask: true },
  { op: "=", label: "total loan amount", key: "total", ask: true },
  {
    op: "",
    label: 'rounded <span class="hl">down to the nearest $50</span>',
    key: "round",
    ask: true,
    total: true,
    scrawl: "round down",
  },
];

const monthly: WorksheetStep[] = [
  { op: "", label: "principal & interest", key: "pi", given: true },
  { op: "+", label: "monthly MIP", key: "mip", ask: true },
  { op: "+", label: "monthly taxes", key: "taxM", ask: true },
  { op: "+", label: "monthly insurance", key: "insM", ask: true },
  { op: "=", label: "total monthly payment", key: "piti", ask: true, total: true },
];

export const fhaScenario: WorksheetScenario = {
  lender: "Meridian Home Lending",
  program: "FHA 203(b), 30-yr fixed",
  borrower: "Alicia R.",
  rate: "5.25%",
  inputs: { price: 375500, downP: 3.5, amipF: 0.55, rate: 5.25, tax: 4050, ins: 1025 },
  explorer: [
    { key: "price", label: "purchase price", kind: "currency", tip: "The home's contract price — the figure every other line is derived from." },
    { key: "downP", label: "down %", kind: "number", step: 0.1, tip: "Percent of price paid up front. FHA's floor is 3.5%, or 10% if the credit score is under 580." },
    { key: "amipF", label: "AMIP %", kind: "number", step: 0.05, tip: "Annual MIP rate, set by loan term and LTV. 0.55% here — a 30-yr term above 95% LTV." },
    { key: "rate", label: "rate %", kind: "number", step: 0.125, tip: "The note rate — it drives the principal & interest payment." },
    { key: "tax", label: "annual taxes", kind: "currency", tip: "Yearly property tax, split by 12 into the monthly payment." },
    { key: "ins", label: "annual insurance", kind: "currency", tip: "Yearly homeowner's insurance, split by 12 into the monthly payment." },
  ],
  sections: [
    { title: "loan amount", steps: loanAmount },
    { title: "estimated monthly payment (PITI)", steps: monthly },
  ],
  footnote: "Total loan amount is rounded down to the nearest $50. Figures are estimates for illustration.",
};

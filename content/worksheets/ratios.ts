// content/worksheets/ratios.ts — the qualifying-ratios drill for Module 6 unit 07,
// on the Worksheet shell. The learner assembles the housing expense line by line,
// then computes the front-end and back-end ratios. Numbers chosen to land clean:
// front-end 28.0%, back-end 40.0% on $7,400 gross monthly income.
import type { WorksheetScenario } from "@/lib/section";

export const ratiosScenario: WorksheetScenario = {
  lender: "Bayline Home Lending",
  program: "Conventional 30 · qualifying worksheet",
  borrower: "Jordan & Sam Reyes",
  rate: "6.50%",
  inputs: {
    income: 7400,
    pi: 1480,
    taxesAnnual: 4800,
    insAnnual: 1440,
    pmi: 47,
    hoa: 25,
    car: 430,
    cards: 145,
    student: 313,
  },
  explorer: [
    { key: "income", label: "gross monthly income", tip: "All applicants' gross monthly income, before taxes.", kind: "currency" },
    { key: "pi", label: "monthly P&I", tip: "The principal-and-interest payment on the proposed loan.", kind: "currency" },
    { key: "taxesAnnual", label: "annual property taxes", tip: "The yearly real-estate tax bill — the worksheet converts it to a monthly figure.", kind: "currency" },
    { key: "insAnnual", label: "annual homeowner's insurance", tip: "The yearly hazard-insurance premium.", kind: "currency" },
    { key: "pmi", label: "monthly PMI", tip: "The monthly private mortgage insurance premium.", kind: "currency" },
    { key: "hoa", label: "monthly HOA dues", tip: "Mandatory association dues count toward housing whether or not they're escrowed.", kind: "currency" },
    { key: "car", label: "car payment", tip: "Monthly installment debt.", kind: "currency" },
    { key: "cards", label: "card minimums", tip: "The minimum payments on revolving accounts — not the balances.", kind: "currency" },
    { key: "student", label: "student loans", tip: "Monthly student-loan obligation.", kind: "currency" },
  ],
  sections: [
    {
      title: "The housing expense",
      steps: [
        { op: "", label: "Monthly principal & interest", key: "pi", given: true, hint: "The payment on the loan itself — the P&I." },
        { op: "+", label: "Real estate taxes ÷ 12", key: "taxesM", ask: true, hint: "The annual tax bill of $4,800, as a monthly figure." },
        { op: "+", label: "Homeowner's insurance ÷ 12", key: "insM", ask: true, hint: "The $1,440 annual premium, as a monthly figure." },
        { op: "+", label: "Private mortgage insurance", key: "pmi", given: true, hint: "Monthly PMI counts toward housing." },
        { op: "+", label: "<span class='hl'>HOA dues</span>", key: "hoa", given: true, scrawl: "mandatory = housing", hint: "A mandatory cost of owning the home counts in the housing expense whether or not it's part of the mortgage payment." },
        { op: "=", label: "Total housing expense (PITI)", key: "housing", ask: true, total: true, hint: "Everything it costs, per month, to carry the home." },
      ],
    },
    {
      title: "The ratios",
      steps: [
        { op: "", label: "Gross monthly income", key: "income", given: true, hint: "All applicants' income before taxes." },
        { op: "÷", label: "Housing ÷ income — front-end ratio", key: "front", ask: true, pct: true, accept: ["28", "28%", "28.0", "28.0%", ".28", "0.28"], hint: "The housing expense as a share of gross monthly income. Conventional guideline: 28." },
        { op: "+", label: "Monthly debts (car + cards + student loans)", key: "debts", ask: true, hint: "$430 + $145 + $313 — minimum payments, not balances." },
        { op: "=", label: "Total monthly obligations", key: "total", ask: true, total: true, hint: "Housing plus all recurring debt." },
        { op: "÷", label: "Obligations ÷ income — back-end ratio", key: "back", ask: true, pct: true, accept: ["40", "40%", "40.0", "40.0%", ".40", "0.40", ".4", "0.4"], hint: "The total obligations as a share of gross monthly income. Conventional guideline: 36 — this file leans on compensating factors." },
      ],
    },
  ],
  footnote: "Guidelines, not walls: conventional 28/36 · FHA 31/43 · VA —/41 · USDA 29/41. Compensating factors — high score, low LTV, deep reserves — carry files past them.",
};

export function derive(i: Record<string, number>): Record<string, number> {
  const taxesM = i.taxesAnnual / 12;
  const insM = i.insAnnual / 12;
  const housing = i.pi + taxesM + insM + i.pmi + i.hoa;
  const debts = i.car + i.cards + i.student;
  const total = housing + debts;
  const front = Math.round((housing / i.income) * 1000) / 10;
  const back = Math.round((total / i.income) * 1000) / 10;
  return { ...i, taxesM, insM, housing, debts, total, front, back };
}

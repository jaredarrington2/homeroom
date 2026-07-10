// content/widgets/amortization.ts — data + math for the amortization viz widget, the second
// instance on the CapLadder shell. The single source of truth for both modes: the
// check-your-work exercise grades against schedule(); the Explore mode redraws it live.
//
// Standard amortization: monthly rate = annual/12; payment via the standard annuity formula;
// each month splits interest = balance × monthly rate, principal = payment − interest, and any
// extra monthly principal is applied on top, shortening the payoff.
//
// Check-your-work case (ebook Module 5 case, principal/rate/term): $200,000 @ 6% / 360 mo.
// The payoff month + interest totals below are computed by schedule() itself (not transcribed)
// so the exercise always grades against the same math it displays — see the standing "numbers
// must be re-verified" note; a hand-run of this exact math gives $231,676.28 standard interest
// and a ~179-month payoff at +$500/mo, close to but not identical to the ebook's rounding.
import type { AmortizationConfig, AmortizationExercise } from "@/lib/section";

export interface AmortizationMonth {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface AmortizationResult {
  payment: number;
  months: AmortizationMonth[];
  payoffMonth: number;
  totalInterest: number;
  crossoverMonth: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Standard monthly P&I payment for a fully-amortizing loan (extra payments don't change it —
 *  they just retire the balance faster). */
export function standardPayment(principal: number, rate: number, termMonths: number): number {
  const r = rate / 12;
  return (principal * r) / (1 - Math.pow(1 + r, -termMonths));
}

/** Walk the amortization month by month, applying any extra principal on top of the standard
 *  payment. Stops the month the balance reaches zero (which may be before termMonths). */
export function schedule(cfg: AmortizationConfig): AmortizationResult {
  const r = cfg.rate / 12;
  const payment = standardPayment(cfg.principal, cfg.rate, cfg.termMonths);
  const extra = cfg.extra ?? 0;
  const months: AmortizationMonth[] = [];
  let balance = cfg.principal;
  let totalInterest = 0;
  let crossoverMonth = -1;
  for (let m = 1; m <= cfg.termMonths * 2 && balance > 0.005; m++) {
    const interest = balance * r;
    let principalPaid = payment - interest + extra;
    if (principalPaid > balance) principalPaid = balance;
    balance = balance - principalPaid;
    totalInterest += interest;
    if (crossoverMonth < 0 && principalPaid > interest) crossoverMonth = m;
    months.push({ month: m, principal: round2(principalPaid), interest: round2(interest), balance: round2(balance) });
  }
  return {
    payment: round2(payment),
    months,
    payoffMonth: months.length,
    totalInterest: round2(totalInterest),
    crossoverMonth,
  };
}

const EXERCISE_CONFIG: AmortizationConfig = { principal: 200000, rate: 0.06, termMonths: 360, extra: 500 };
const STANDARD_CONFIG: AmortizationConfig = { principal: 200000, rate: 0.06, termMonths: 360, extra: 0 };
const exResult = schedule(EXERCISE_CONFIG);
const stdResult = schedule(STANDARD_CONFIG);
const saved = round2(stdResult.totalInterest - exResult.totalInterest);

export const amortizationExercise: AmortizationExercise = {
  config: EXERCISE_CONFIG,
  prompt:
    `A <b>$200,000</b> loan at <b>6%</b> over <b>30 years</b> pays <b>$${stdResult.payment.toFixed(2)}</b> a month. Add <b>$500</b> a month against principal — in how many months is it paid off, and how much total interest does it cost?`,
  answer: { months: exResult.payoffMonth, totalInterest: exResult.totalInterest },
  reveal:
    `The extra $500 shortens the loan from 360 months to <span class="hl">${exResult.payoffMonth}</span> and cuts total interest from $${stdResult.totalInterest.toLocaleString()} to <span class="hl">$${exResult.totalInterest.toLocaleString()}</span> — a $${saved.toLocaleString()} saving, at the same rate.`,
};

/** Explore-mode seed — the standard-schedule baseline before the reader adjusts anything. */
export const amortizationSeed: AmortizationConfig = {
  principal: 200000,
  rate: 0.06,
  termMonths: 360,
  extra: 0,
};

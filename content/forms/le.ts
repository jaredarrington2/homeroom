// content/forms/le.ts — Loan Estimate walkthrough steps.
// Steps ported verbatim from le-walkthrough-page1.html (copy is final, voice-checked).
import type { FormWalkthroughData } from "./types";

export const leWalk: FormWalkthroughData = {
  kind: "le",
  label: "Loan Estimate",
  sub: "Ficus Bank sample · walk it top to bottom",
  pageCount: 1,
  steps: [
    { page: 1, region: 1, title: "The basics",
      body: "Who's borrowing, the property they're buying, its sale price, and the date the lender issued this estimate." },
    { page: 1, region: 2, title: "The loan's shape",
      body: "A 30-year term, a purchase, a fixed-rate product, conventional type, and the loan ID that follows this file everywhere it goes." },
    { page: 1, region: 3, title: "Rate lock, and two expiration dates",
      body: "The interest rate is locked until 4/16 at 5:00 p.m. The rest of the estimated closing costs expire earlier, on 3/4.",
      tell: "Two deadlines, not one — <mark>the rate holds longer than the cost estimate does</mark>." },
    { page: 1, region: 4, title: "Loan amount, and whether it can rise",
      body: "$162,000 for the loan amount. The column on the right answers whether it can increase after closing — for this loan, no.",
      tell: "<mark>Every term in this section carries that same yes/no.</mark>" },
    { page: 1, region: 5, title: "Rate and P&I, same question",
      body: "The 3.875% rate and the $761.78 principal-and-interest payment, each with the same can-it-increase answer. On a fixed-rate loan, all three say no." },
    { page: 1, region: 6, title: "The two features called out by name",
      body: "This loan has a prepayment penalty — as high as $3,240 in the first two years — and no balloon payment.",
      tell: "When a prepay penalty exists, <mark>its cost and its window are stated right here</mark>." },
    { page: 1, region: 7, title: "Payments come in two bands",
      body: "Principal and interest hold steady across the life of the loan. Mortgage insurance ($82) only shows up in years 1–7.",
      tell: "MI falls off at year 8 — <mark>that's why the total steps down later</mark>." },
    { page: 1, region: 8, title: "Escrow, and the total that lands",
      body: "Add escrow ($206) to the rows above and you get the total monthly payment: $1,050 early, $968 once mortgage insurance drops. Escrow is flagged as able to rise." },
    { page: 1, region: 9, title: "What that escrow actually covers",
      body: "Property taxes and homeowner's insurance, collected monthly — $206. Anything not checked here, the borrower pays separately." },
    { page: 1, region: 10, title: "Estimated closing costs",
      body: "$8,054 to close, broken into $5,672 of loan costs plus $2,382 of other costs, with no lender credits. The line items live on page 2." },
    { page: 1, region: 11, title: "Estimated cash to close",
      body: "$16,054 is what the borrower actually brings to the table. It folds in the closing costs; the full arithmetic is on page 2.",
      tell: "Closing costs and cash to close are <mark>different numbers</mark> — cash to close is the larger one." },
  ],
};

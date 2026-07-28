import type { SectionContent } from "@/lib/section";

// Module 5 — FHA Depth (Track A, exam-relevant)
// Expands the existing FHA unit with MIP duration rule, streamline mechanics,
// CAIVRS, property standards, and loan limits. All figures verified against 2026
// exam cheat sheet and Fannie/FHA guidelines.

const m5FHADepth: SectionContent = {
  id: "fha-depth-track-a",
  title: "FHA — Complete Unit",
  moduleNumber: 5,
  units: [
    {
      id: "fha-overview",
      name: "FHA overview and the MIP system",
      reg: "Federal Housing Administration · mortgage insurance · insured mortgages",
      definitions: [
        { term: "Mortgage Insurance Premium (MIP)", def: "FHA's substitute for private mortgage insurance on conventional loans: a one-time up-front fee (UFMIP, financed into the loan) plus annual premiums spread across monthly payments." },
        { term: "Up-Front Mortgage Insurance Premium (UFMIP)", def: "A percentage of the base loan amount (currently 1.75%), rounded down to the nearest $50 and financed into the loan." },
        { term: "Annual MIP", def: "A percentage of the loan amount spread across 12 monthly payments. Stays for the life of the loan if LTV > 90%; drops after 11 years if LTV ≤ 90%." },
        { term: "Loan-to-Value (LTV)", def: "The loan amount divided by the property value (as appraised). Down payment percentage = 100% − LTV." },
        { term: "Case Number", def: "FHA's unique identifier for an endorsed loan. Required before the loan can be sold on the secondary market." },
      ],
      groups: [
        {
          heading: "When MIP duration matters",
          paras: [
            {
              html: `Annual MIP runs for <span class="cloze" data-accept='["life of the loan","the life of the loan","forever"]' data-reveal="life of the loan">?</span> when the down payment is under 10% (LTV > 90%). If the down payment is 10% or more (LTV ≤ 90%), annual MIP drops after <span class="cloze" data-accept='["11 years","eleven years"]' data-reveal="11 years">?</span>. This is the single most-tested FHA rule on the exam.`,
            },
            {
              html: `Why it matters: a borrower with a 3% down payment on a 30-year loan pays MIP for the entire 360 months. The same borrower with 10% down pays it for 132 months, then drops it. The difference is thousands of dollars over the life of the loan, which is why loan officers have to explain it.`,
            },
          ],
        },
        {
          heading: "Building the MIP cost",
          paras: [
            {
              html: `An FHA borrower's total mortgage insurance cost has two pieces. The UFMIP is <span class="cloze" data-accept='["1.75%","one point seven five percent"]' data-reveal="1.75%">?</span> of the base loan, financed into the loan. Then monthly payments include annual MIP, which depends on LTV. For a 96% LTV loan (4% down), the annual MIP rate is roughly <span class="cloze" data-accept='["0.55%","point five five percent"]' data-reveal="0.55%">?</span> per year.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "fha-streamline",
      name: "FHA streamline refinance (203b)",
      reg: "Interest Rate Reduction Refinance Loan · net tangible benefit · seasoning",
      definitions: [
        { term: "Streamline Refinance", def: "An accelerated FHA refinance (203b) whose purpose is lowering the borrower's rate, with reduced documentation and underwriting." },
        { term: "Net Tangible Benefit", def: "The requirement that an FHA streamline must result in a monthly payment reduction (PITI + MIP) or a meaningful reduction in loan term. The borrower must benefit, not just refinance into a different rate." },
        { term: "Seasoning", def: "The time a loan must be active before it can be refinanced. FHA streamlines require six months of seasoning (six on-time payments or proof of payment history)." },
        { term: "Non-Credit-Qualifying Streamline", def: "An FHA streamline that does not require a new credit report or employment verification — only proof that the loan was seasoned and payments are current." },
      ],
      groups: [
        {
          heading: "When streamline applies",
          paras: [
            {
              html: `A borrower with an existing FHA loan can streamline if the loan has been active for at least <span class="cloze" data-accept='["six months","6 months"]' data-reveal="six months">?</span> and payments are current (or show a 12-month history of on-time payments). Streamline is intended for rate reductions, not cash-out refinancing.`,
            },
          ],
        },
        {
          heading: "The net tangible benefit test",
          paras: [
            {
              html: `The new payment (including new MIP) must be lower than the old payment, <strong>or</strong> the loan term must drop meaningfully. A borrower who streamlines into a lower rate but keeps the same 30-year term gets a payment reduction. A borrower who extends the term does NOT have a net tangible benefit and cannot streamline.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "fha-property-standards",
      name: "FHA property standards and the repair list",
      reg: "Minimum property requirements (MPR) · appraisal conditions · sound sleep requirement",
      definitions: [
        { term: "Minimum Property Requirements (MPR)", def: "FHA's baseline standards for property condition. Properties must be safe, sound, and sanitary — the 'sound sleep' requirement is sometimes used colloquially." },
        { term: "Appraisal Condition", def: "When an FHA appraisal returns conditions (issues the property must fix before closing), the borrower's options are: repair the property, obtain a price reduction, or walk away. The seller usually absorbs the cost." },
        { term: "Non-Repairable Issues", def: "Some conditions fail FHA MPR permanently: foundation rot, hazardous materials, condemned structures. These properties ineligible for FHA financing." },
      ],
      groups: [
        {
          heading: "Why property standards matter to loan officers",
          paras: [
            {
              html: `FHA properties are appraised to stricter standards than conventional mortgages. A house with deferred maintenance, missing shingles, or water stains might clear a conventional appraisal but fail FHA. This is why an FHA offer gets treated differently by a listing agent — there's real risk the appraisal comes back with repairs.`,
            },
            {
              html: `The repair path: appraiser identifies condition → lender flags it in the appraisal report → borrower (or seller) must fix it → re-inspection required → closing happens when all conditions are cleared.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "fha-loan-limits",
      name: "FHA loan limits and area limits",
      reg: "Loan limit floor and ceiling · conforming analog · annual adjustments",
      definitions: [
        { term: "FHA Loan Limit", def: "The maximum loan amount FHA will insure in a given county, set as a percentage of the conforming loan limit (which moves annually)." },
        { term: "Base Loan Limit", def: "The floor FHA loan limit, set nationally each year. As of 2026, the base limit is $472,030 for a single-family home (moves annually)." },
        { term: "High-Cost-Area Limit", def: "In high-cost counties, the FHA loan limit can go as high as 150% of the conforming limit. These limits allow borrowers in expensive markets to get FHA financing on jumbo-sized mortgages." },
      ],
      groups: [
        {
          heading: "How the limits move",
          paras: [
            {
              html: `The conforming loan limit is set annually based on a housing-price index. FHA's base limit is usually <span class="cloze" data-accept='["100%","one hundred percent"]' data-reveal="100%">?</span> of the conforming limit (in most areas). In high-cost areas, FHA goes as high as <span class="cloze" data-accept='["150%","one hundred fifty percent"]' data-reveal="150%">?</span> of conforming. This means Pylon can offer FHA financing on larger loans than many people realize — it's not just for first-time homebuyers with 3% down.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "fha-credit-score-tiers",
      name: "FHA credit and down payment tiers",
      reg: "Credit score cutoffs · down payment by tier · ineligibility floor",
      definitions: [
        { term: "FHA Credit Tiers", def: "Three credit-score bands that determine minimum down payment: 580+, 500–579, and below 500 (ineligible)." },
        { term: "580+ Credit Score", def: "Eligible for the standard 3.5% minimum down payment." },
        { term: "500–579 Credit Score", def: "Eligible for FHA, but with a 10% minimum down payment instead of 3.5%." },
        { term: "Below 500 Credit Score", def: "Ineligible for FHA financing." },
      ],
      groups: [
        {
          heading: "The tier structure",
          paras: [
            {
              html: `Credit score <span class="cloze" data-accept='["580+","580 or higher"]' data-reveal="580+">?</span> → 3.5% down. Credit score <span class="cloze" data-accept='["500-579","500 to 579"]' data-reveal="500–579">?</span> → 10% down. Below 500 → ineligible. These tiers are tested every year, usually in context questions: 'A borrower has a 520 credit score and 5% saved. Can they get an FHA loan?' (Answer: no, FHA requires 10% with that credit score.)`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
  ],
};

export default m5FHADepth;

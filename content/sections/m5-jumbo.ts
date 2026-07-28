import type { SectionContent } from "@/lib/section";

// Module 5 — Jumbo Loans (Track A, exam-relevant)
// Jumbo leaves the Fannie/Freddie execution path. Focus: what makes a loan jumbo,
// why underwriting tightens, where jumbo loans go, and why pricing can vary.

const m5Jumbo: SectionContent = {
  id: "jumbo-loans-track-a",
  title: "Jumbo Loans",
  moduleNumber: 5,
  units: [
    {
      id: "what-is-jumbo",
      name: "What makes a loan jumbo",
      reg: "Loan limit · conforming ceiling · investor-specific markets · private-label securitization",
      definitions: [
        { term: "Jumbo Loan", def: "A mortgage that exceeds the conforming loan limit and does not qualify for Fannie Mae or Freddie Mac purchase. Jumbo loans enter a different execution path — whole-loan sale, private-label securitization, or portfolio retention." },
        { term: "Jumbo Threshold", def: "The point where a loan leaves the conforming market. In 2026, this is $766,550 in most areas (the baseline conforming limit) and $1,149,825 in high-cost areas (150% of baseline)." },
        { term: "Private-Label MBS (PLMBS)", def: "A mortgage-backed security without government guarantee or agency backing — created by private lenders from jumbo and other non-conforming mortgages. Carries different risk than agency MBS." },
        { term: "Whole-Loan Sale", def: "Selling a jumbo loan to a single buyer (a bank, hedge fund, or other investor) rather than pooling it into a security. The buyer holds the note and receives all payments." },
        { term: "Portfolio Retention", def: "When a lender originates a jumbo but keeps it on its balance sheet instead of selling it. The lender collects payments and owns the risk for 30 years." },
      ],
      groups: [
        {
          heading: "The jumbo category",
          paras: [
            {
              html: `Any loan above the conforming limit is jumbo. The key is: <strong>jumbo leaves the agency path.</strong> Fannie and Freddie won't buy it. A loan officer can't use their DU/LPA underwriting system. A different set of investors (banks, funds, private securitizers) step in.`,
            },
            {
              html: `Pylon started with conventional and jumbo. No FHA, VA, USDA. This means Pylon handles the simplest end of the product menu (conforming + high-balance) plus the most premium end (jumbo). Everything in between (government programs) is in the roadmap.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "jumbo-underwriting",
      name: "Jumbo underwriting: why it tightens",
      reg: "Credit standards · reserves · LTV · investor guidelines · no federal guarantee",
      definitions: [
        { term: "Jumbo Reserves", def: "Proof of liquid assets (cash, securities) the borrower has after closing. Jumbo lenders require higher reserve multiples (e.g., 9 months PITI) because there's no government guarantee to fall back on." },
        { term: "Jumbo Credit Floor", def: "The minimum credit score for jumbo is typically 680+, higher than the conforming floor of 620. Some investors require 700+ for jumbo." },
        { term: "Jumbo LTV", def: "The maximum LTV for jumbo is typically lower than conforming — 80–85% LTV is common, vs. 95–97% for conforming. Higher down payment required." },
        { term: "Asset Verification", def: "Jumbo loans require deeper proof of asset source and stability. Not just bank statements — documentation of where the down payment comes from matters more than in conforming." },
      ],
      groups: [
        {
          heading: "Why underwriting is tighter",
          paras: [
            {
              html: `Jumbo loans carry <strong>no government guarantee.</strong> Fannie and Freddie absorb default risk on conforming loans (paid for by mortgage insurance + the guarantee fee). Jumbo lenders are uninsured — if the borrower defaults, the lender eats the loss. This is why credit, reserves, and LTV are stricter.`,
            },
            {
              html: `A borrower with a 620 credit score and 3% down might qualify for an FHA or high-LTV conforming loan. The same borrower will NOT qualify for jumbo. Jumbo is a premium product for borrowers who can show significant strength — high income, large assets, strong credit.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "jumbo-execution",
      name: "Where jumbo loans go: execution paths",
      reg: "Secondary market · portfolio banks · private securitization · correspondent lenders",
      definitions: [
        { term: "Portfolio Lender", def: "A bank or financial institution that keeps jumbo mortgages on its balance sheet instead of selling them. Usually has stable deposits and long-term funding." },
        { term: "Correspondent Relationship", def: "When a mortgage broker or smaller originator sells jumbo loans to a larger lender (correspondent), who then either keeps them (portfolio) or resells them to an investor." },
        { term: "Jumbo Investor Base", def: "The set of banks, hedge funds, insurance companies, and private securitizers that buy whole jumbo loans or PLMBS pools. Smaller and more relationship-driven than the Fannie/Freddie market." },
      ],
      groups: [
        {
          heading: "The three jumbo paths",
          paras: [
            {
              html: `<strong>Whole-loan sale:</strong> Originator closes a jumbo, then sells it to a bank or investor. The buyer now owns it and collects payments. Done.`,
            },
            {
              html: `<strong>Portfolio retention:</strong> Originator closes it and keeps it. Holds the mortgage, gets the payments, owns the 30-year risk.`,
            },
            {
              html: `<strong>PLMBS securitization:</strong> Originator pools 50–100 jumbos with other originators, creates a private-label MBS, and sells bonds backed by the pool. Investors buy the bonds; the originator is out.`,
            },
            {
              html: `Unlike conforming loans (where Fannie/Freddie standardizes the path), jumbo execution is customized. This is where your 'best execution' optimization problem becomes real. Which of these three paths gives this particular borrower the best price?`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "jumbo-pricing",
      name: "Jumbo pricing: why it moves differently",
      reg: "Rate volatility · market depth · relationship pricing · spread variation",
      definitions: [
        { term: "Jumbo Spread", def: "The difference between a jumbo rate and a comparable conforming rate. Jumbo spreads are wider than conforming (reflecting the lack of guarantee) and less stable (because the jumbo market is smaller and more relationship-driven)." },
        { term: "Pricing Volatility", def: "Jumbo pricing can move quickly based on bank deposit demand, investor appetite, and capital markets conditions. With a smaller investor base, individual investors have more impact on overall pricing." },
      ],
      groups: [
        {
          heading: "Jumbo vs. conforming rates",
          paras: [
            {
              html: `Conforming rates are set in a deep market: Fannie and Freddie are constant buyers, and the TBA market is liquid. Jumbo rates are set by individual investor demand: if a bank has excess deposits, it buys more jumbos and rates come down. If it's capital-constrained, jumbos get expensive.`,
            },
            {
              html: `Sometimes jumbo rates are actually <strong>better</strong> than conforming rates (when banks are seeking deposits). Sometimes they're worse by 75bps or more (when capital is tight). The relationship matters — a jumbo lender with a direct pipeline to a portfolio bank can often beat other originators on price.`,
            },
            {
              html: `This is also why Pylon's capital markets infrastructure matters. Direct access to jumbo buyers means per-loan routing to whoever pays most, rather than going through wholesale correspondents who take a margin.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
  ],
};

export default m5Jumbo;

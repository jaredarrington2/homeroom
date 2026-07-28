import type { SectionContent } from "@/lib/section";

// Module 5 — Conventional Loans (Track A, exam-relevant)
// Establishes the baseline for mortgage products: conforming vs. non-conforming,
// the conforming loan limit and how it moves, high balance, Fannie vs. Freddie.

const m5Conventional: SectionContent = {
  id: "conventional-loans-track-a",
  title: "Conventional Loans",
  moduleNumber: 5,
  units: [
    {
      id: "what-is-conventional",
      name: "Conventional mortgages: the baseline",
      reg: "Mortgage-backed securities · investor guidelines · conventional vs. government-backed",
      definitions: [
        { term: "Conventional Loan", def: "A mortgage that is NOT government-guaranteed or insured — no FHA, VA, or USDA backing. Most private mortgages sold into the secondary market are conventional." },
        { term: "Conforming Loan", def: "A conventional loan that meets Fannie Mae or Freddie Mac's standards: under the conforming loan limit, acceptable credit, acceptable LTV, sound property. Fannie and Freddie will buy it." },
        { term: "Non-Conforming Loan", def: "A conventional loan that does not meet Fannie/Freddie standards (e.g., loan amount exceeds the limit, credit is below 620, LTV is above the investor's threshold)." },
        { term: "Investor Guidelines", def: "The rules that define which loans Fannie Mae or Freddie Mac will buy. These set the floor for loan quality in the market and are the most load-bearing document a loan officer understands." },
      ],
      groups: [
        {
          heading: "Where conventional sits",
          paras: [
            {
              html: `Conventional mortgages are the default product for most borrowers. No government guarantee means higher credit standards, higher down payments, and private mortgage insurance (PMI) for LTV > 80%. But for borrowers who clear the bar, conventional loans have lower rates than government products, because the lender (and later the investor) carries no default risk subsidy.`,
            },
            {
              html: `Conforming conventional loans are Fannie Mae and Freddie Mac's bread and butter. Non-conforming conventionals exist (jumbo, non-QM, portfolio) but are smaller markets.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "conforming-limit",
      name: "The conforming loan limit",
      reg: "Fannie Mae · Freddie Mac · FHFA · annual adjustment · baseline limit",
      definitions: [
        { term: "Conforming Loan Limit", def: "The maximum loan amount Fannie Mae or Freddie Mac will buy without special approval. Set annually by the Federal Housing Finance Agency (FHFA), based on the Home Price Index. As of 2026, the baseline conforming limit is $766,550 for a single-family home." },
        { term: "Home Price Index", def: "FHFA's measure of home prices nationally. The conforming limit moves annually based on HPI growth. When home prices rise, the limit rises; when they fall (rarely), it can stay flat or fall." },
        { term: "Baseline Limit", def: "The conforming limit in areas that are not high-cost. The majority of the country uses the baseline; high-cost areas get a higher limit to accommodate regional price variation." },
        { term: "High-Cost-Area Limit", def: "In counties where median home prices are high, Fannie and Freddie set a higher conforming limit (up to 150% of the baseline). This allows large mortgages to still be 'conforming' in expensive markets." },
      ],
      groups: [
        {
          heading: "Why the limit matters",
          paras: [
            {
              html: `A loan below the conforming limit can be sold to Fannie or Freddie. A loan above it cannot (without significant lender effort and added cost). This makes the conforming limit a bright line: borrowers on either side of it face different pricing, different underwriting, different availability.`,
            },
            {
              html: `The limit moves <span class="cloze" data-accept='["annually","each year","once per year"]' data-reveal="annually">?</span> based on home price growth. As of 2026, the baseline conforming limit is roughly <span class="cloze" data-accept='["$766,550","766550"]' data-reveal="$766,550">?</span>, but this number changes every January.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "high-balance",
      name: "High-balance loans",
      reg: "High-cost areas · jumbo-eligible property · conforming alternative",
      definitions: [
        { term: "High-Balance Loan", def: "A conforming loan in a high-cost area — above the baseline conforming limit but below the high-cost-area cap (150% of baseline). Fannie and Freddie still buy these, but with different pricing and underwriting." },
        { term: "Jumbo-Eligible Property", def: "A property in a high-cost area where a borrower can get Fannie/Freddie financing at higher loan amounts than the baseline limit would allow. Not a jumbo loan (which leaves the Fannie/Freddie market), but a high-balance variant." },
      ],
      groups: [
        {
          heading: "High-balance as a category",
          paras: [
            {
              html: `A $850,000 loan in San Francisco (high-cost area) is 'high-balance conforming' — Fannie will still buy it if it meets their guidelines, but it carries different pricing than a $600,000 loan. High-balance loans bridge between the baseline conforming market and the jumbo market, giving borrowers in expensive regions access to Fannie/Freddie financing without leaving the agency execution path.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "fannie-vs-freddie",
      name: "Fannie Mae vs. Freddie Mac — practical differences",
      reg: "Secondary market · investor guidelines · execution paths · portfolio lenders",
      definitions: [
        { term: "Fannie Mae (FNMA)", def: "The Federal National Mortgage Association — a government-sponsored enterprise that buys and securitizes mortgages. Dominant player in the conforming market." },
        { term: "Freddie Mac (FHLMC)", def: "The Federal Home Loan Mortgage Corporation — a government-sponsored enterprise that buys and securitizes mortgages, in direct competition with Fannie Mae. Similar products, different guidelines on the edges." },
        { term: "DU (Loan Advisor)", def: "Fannie Mae's automated underwriting system. Loan officers submit applications through DU to get an initial approval decision." },
        { term: "LPA (Loan Product Advisor)", def: "Freddie Mac's automated underwriting system, comparable to Fannie's DU. Different box, same function." },
      ],
      groups: [
        {
          heading: "Practical differences",
          paras: [
            {
              html: `Fannie Mae and Freddie Mac buy most of the conforming mortgages in the US, and their guidelines are similar. But they differ on credit minimums, down payment floors, property type acceptance, and cash-out refinance limits. An originator selling to Fannie might see a property accepted; the same property sold to Freddie might hit a guideline exception. This is why loan officers care which investor is in the stack for a given file.`,
            },
            {
              html: `In this role, you'll be deciding which investor a loan routes to (Fannie, Freddie, Citi, or a portfolio lender) — the optimization problem that makes 'best execution' real. That decision drives price, delivery timeline, and the life of the loan afterward.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
  ],
};

export default m5Conventional;

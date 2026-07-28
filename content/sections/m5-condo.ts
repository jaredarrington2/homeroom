import type { SectionContent } from "@/lib/section";

// Module 5 — Condos as a Property Type (Track A, exam-relevant)
// Condos face a project-approval gate that single-family homes don't.
// Use property-types-set.svg asset for visual reference.

const m5Condo: SectionContent = {
  id: "condo-property-type-track-a",
  title: "Condos — Project Approval",
  moduleNumber: 5,
  units: [
    {
      id: "condo-basics",
      name: "Condos and project warrantability",
      reg: "Condominium · HOA · project approval · lender requirements · FHA, Fannie, Freddie",
      definitions: [
        { term: "Condominium (Condo)", def: "A property type where the owner owns the individual unit and shares ownership of common areas (parking, hallways, amenities). Governed by a homeowners association (HOA)." },
        { term: "Project Approval", def: "Lenders' requirement that the condo project (building or complex) meet their standards before they'll fund a mortgage in it. Single-family homes don't need project approval; condos do." },
        { term: "Warrantability", def: "Whether the condo project is in 'good standing' per the lender's guidelines — HOA financials are sound, reserves are adequate, litigation is minimal, owner-occupancy is above the threshold." },
        { term: "HOA Reserve Requirements", def: "Most lenders (and FHA/Fannie/Freddie) require the HOA to maintain reserves equal to a percentage of annual budget (often 20–25%). Underfunded reserves can disqualify a project." },
        { term: "Owner-Occupancy Requirement", def: "Fannie Mae and Freddie Mac require that at least 50% of units in a condo project be owner-occupied (not rental). If too many units are investor-owned, the project becomes ineligible." },
      ],
      groups: [
        {
          heading: "The project approval gate",
          paras: [
            {
              html: `A borrower finds a condo they want to buy. The underwriter pulls the <span class="cloze" data-accept='["project approval","condo approval"]' data-reveal="project approval">?</span> — a file showing the HOA's financials, budget, reserves, litigation history, and unit-ownership mix. If reserves are low or litigation is high, the lender might <strong>deny the project</strong>, and the loan cannot close, even if the borrower is qualified.`,
            },
            {
              html: `This doesn't happen with single-family homes. A house stands alone. A condo stands on the HOA's financial health, which is why lenders treat condo approvals as a separate underwriting line.`,
            },
          ],
        },
        {
          heading: "Why it matters for loan officers",
          paras: [
            {
              html: `A buyer puts an offer on a condo in a project that's had board disputes or is underfunded on reserves. The loan application starts fine — borrower has good credit, good income. But the project approval comes back with red flags, and the lender declines to fund in that project. The buyer loses the deal.`,
            },
            {
              html: `Experienced loan officers flag this risk early: 'I need to run a project approval before we go too far. If the HOA financials look weak, this loan might not happen.'`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
    {
      id: "condo-fha-fannie",
      name: "Condo project requirements by lender",
      reg: "FHA condo projects · Fannie Mae warrantability · Freddie Mac guidelines · differences",
      definitions: [
        { term: "FHA Condo Requirements", def: "FHA requires 50%+ owner-occupancy and positive HOA reserves. FHA will occasionally approve projects others won't, making FHA a backup path for condos in marginal projects." },
        { term: "Fannie Mae Condo Guidelines", def: "Fannie requires 50%+ owner-occupancy, adequate reserves (typically 20%+), and no excessive litigation. Fannie also limits investor-financed purchases in projects (not just share of ownership)." },
        { term: "Freddie Mac Condo Guidelines", def: "Similar to Fannie but with slightly different reserve thresholds and litigation tolerances. Each agency publishes its own condo approval list." },
      ],
      groups: [
        {
          heading: "The approval hierarchy",
          paras: [
            {
              html: `A condo project might be approved by Fannie Mae but <strong>not</strong> by Freddie Mac. Or approved by FHA but not Fannie. This is why loan officers keep a project-approval file: they know which lenders will fund in which buildings.`,
            },
            {
              html: `A strong project (50%+ owner-occupancy, healthy reserves, clean litigation) clears all lenders. A weak one might only clear FHA. This affects what rate the borrower can get and which lenders are in the competitive set.`,
            },
          ],
        },
        {
          heading: "The reserve adequacy standard",
          paras: [
            {
              html: `Most lenders want HOA reserves at <span class="cloze" data-accept='["20%","twenty percent"]' data-reveal="20%">?</span> or more of annual budget. This is a bright line: under it, the project is underfunded and risky. The HOA may be forced to levy special assessments (additional fees) on owners, which affects affordability.`,
            },
          ],
        },
      ],
      review: { flashcards: [], mcq: [] },
    },
  ],
};

export default m5Condo;

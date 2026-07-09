import type { SectionContent } from "@/lib/section";

// Section 5 — General Mortgage Knowledge (ebook Module 5). Recall-gradient reader,
// same shape as Sections 3 & 4 (cloze / synth / review), self-contained: every tested
// fact is taught in the unit's prose before it's tested. Numbers verified against the
// Module 5 ebook (VA pp. 327–335, USDA pp. 336–337) and the 2026 loan-year values.
//
// Slice 1 ships the first unit — VA & USDA — because it hosts the capstone
// four-program comparison matrix (Conventional · FHA · VA · USDA), the module's
// highest exam-value visual. Conventional (U6) and FHA (U8) units land in later slices.

const section5: SectionContent = {
  id: "general-mortgage-knowledge",
  title: "General Mortgage Knowledge",
  kicker: "Module 5",
  units: [
    {
      id: "va-and-usda",
      name: "VA & USDA loans",
      reg: "Government-guaranteed loans · Servicemen's Readjustment Act (VA) · USDA §502",
      definitions: [
        { term: "Government-Guaranteed Loan", def: "A loan a federal agency (the VA or USDA) guarantees against the lender's loss — distinct from an FHA loan, which the agency insures, and a conventional loan, which no agency stands behind." },
        { term: "Certificate of Eligibility (COE)", def: "The document proving a veteran qualifies for VA financing. It reflects the borrower's entitlement." },
        { term: "Entitlement", def: "The dollar amount the VA will guarantee on a veteran's behalf — a basic entitlement of $36,000. With full entitlement and no active VA loan, no maximum loan limit applies up to the property's VA Reasonable Value." },
        { term: "VA Funding Fee", def: "A one-time fee collected at settlement (and financeable into the loan) that pools funds to reimburse lenders when a guaranteed VA loan defaults. It stands in for mortgage insurance." },
        { term: "VA Reasonable Value", def: "The VA's determination of a property's value, established through the Notice of Value (NOV) after a VA-approved appraisal. A VA loan may not exceed it." },
        { term: "Notice of Value (NOV)", def: "The notice the underwriter issues after a VA appraisal is approved — it sets the VA Reasonable Value and lists any conditions the property must satisfy for the guaranty." },
        { term: "Residual Income", def: "Monthly income left after all mandatory monthly expenses are paid. The VA requires a minimum residual amount that scales with loan amount, family size, and region." },
        { term: "IRRRL (VA Streamline)", def: "Interest Rate Reduction Refinance Loan — an accelerated VA refinance whose purpose is lowering the borrower's rate, with reduced documentation." },
        { term: "Guarantee Fee (USDA)", def: "The USDA's substitute for mortgage insurance on a Guaranteed Rural Housing loan: a 1% up-front fee financed into the loan plus an annual 0.35% fee spread across the monthly payments." },
        { term: "Area Median Income (AMI)", def: "The median household income for an area. USDA eligibility caps a household's income at 115% of the adjusted AMI." },
        { term: "Guaranteed Rural Housing (GRH)", def: "The standard USDA loan — a 30-year, 100%-LTV loan carrying the 1% up-front and 0.35% annual guarantee fees." },
        { term: "Homeownership Direct (HD)", def: "A USDA loan for very-low-income borrowers (50%–80% of adjusted AMI), funded directly, with terms up to 33–38 years and no guarantee fee." },
      ],
      groups: [
        {
          paras: [
            {
              html: `Two of the four loan programs an originator works with are <b>guaranteed</b> by the federal government rather than insured or left to the private market. On a <b>VA loan</b>, the Department of Veterans Affairs stands behind the loan; on a <b>USDA loan</b>, the Department of Agriculture does. That government guaranty is what lets both programs do something conventional and even FHA loans can't — lend with <b>no down payment and no mortgage insurance</b>. This unit teaches both, then sets all four programs side by side.`,
            },
          ],
        },
        {
          heading: "where the VA loan came from",
          anchor: { file: "soldier-flannel-transparent.png", caption: "coming home", kind: "char" },
          paras: [
            {
              html: `In <span class="cloze" data-accept='["1944","nineteen forty-four"]' data-reveal="1944">?</span>, Congress passed the <b>Servicemen's Readjustment Act</b> to ease the return of World War II veterans, and among other things it created VA mortgage financing. A VA residential mortgage loan is <b>guaranteed</b> through — and governed by the rules of — the U.S. Department of Veterans Affairs. The VA doesn't lend the money or insure the loan; it promises the lender that a portion of the loan is backed by the government if the veteran defaults.`,
            },
          ],
        },
        {
          heading: "eligibility and the certificate of eligibility",
          paras: [
            {
              html: `Not everyone can get a VA loan. The borrower must be active military in good standing or anything other than <b>dishonorably</b> discharged, and must hold a <b>Certificate of Eligibility (COE)</b>. The COE reflects a basic <b>entitlement</b> of <span class="cloze" data-accept='["$36,000","36000","36,000"]' data-reveal="$36,000">?</span>. That entitlement means the VA will guarantee a loan up to <span class="cloze" data-accept='["four","4","four times","4 times","4x"]' data-reveal="four">?</span> times the entitlement amount — but that isn't the ceiling on what a veteran can borrow. As long as the borrower qualifies, has <b>full entitlement</b>, and has no other active VA loan, <b>no maximum loan limit applies</b> (up to the property's VA Reasonable Value).`,
            },
          ],
          synth: {
            q: "A VA loan needs no down payment and no mortgage insurance, yet the lender is still protected. How?",
            a: "The VA guaranty replaces both. Backed by the veteran's entitlement (basic $36,000, guaranteeing up to four times that), the government promises to cover part of the lender's loss on default — so the lender doesn't need a borrower down payment or a private insurer to take the risk.",
          },
        },
        {
          heading: "no PMI — a funding fee instead",
          paras: [
            {
              html: `Conventional loans require private mortgage insurance when the loan-to-value is above 80%, and FHA loans carry their own insurance. VA loans <b>prohibit mortgage insurance</b> altogether. Instead, the borrower pays a one-time <b>VA funding fee</b> at settlement, which the VA pools to reimburse lenders when a guaranteed loan defaults. The fee may be financed into the loan, and its amount turns on three things: purchase vs. refinance, the size of any down payment, and whether this is the veteran's first or a subsequent VA loan. For a first-use purchase with less than 5% down, the funding fee is <span class="cloze" data-accept='["2.15%","2.15","2.15 percent"]' data-reveal="2.15%">?</span> of the loan amount; it falls as the down payment rises. Escrow for taxes and insurance is mandatory on a VA loan.`,
            },
          ],
        },
        {
          heading: "who skips the funding fee",
          paras: [
            {
              html: `The funding fee is waived for veterans the program most wants to protect. A veteran with a service-connected <b>disability of <span class="cloze" data-accept='["10%","10","10 percent","ten percent"]' data-reveal="10%">?</span> or more</b> (as rated by the VA), and their immediate family, is exempt — as is an active member awarded a <b>Purple Heart</b>, and certain surviving spouses of members killed or missing in action. Everyone else pays the fee. VA loans also <b>never</b> permit a prepayment penalty, and their proceeds may never be used to pay a prepayment penalty on a loan being refinanced.`,
            },
          ],
        },
        {
          heading: "how the VA underwrites — back-end DTI and residual income",
          paras: [
            {
              html: `Unlike every other program, the VA doesn't look at the borrower's front-end (housing) debt-to-income ratio at all. It considers only a <b>back-end DTI</b>, generally up to 41%, and that ceiling can stretch higher when residual income is strong. <b>Residual income</b> is what's left each month after all mandatory expenses are paid; the VA sets a minimum that varies by loan amount, family size, and geographic region. The idea is simple: measure whether a household actually has money left to live on, not just whether a ratio clears a line.`,
            },
          ],
        },
        {
          heading: "assumable — with the COE attached",
          paras: [
            {
              html: `VA loans are <b>fully assumable</b>, and even a <b>non-veteran</b> may assume a veteran's VA mortgage. There's a catch that trips up originators: because the assuming non-veteran has no COE of their own, the <b>original veteran's COE stays attached</b> to the assumed loan until it is paid in full — so that veteran can't get another VA loan in the meantime. The original veteran is not, however, still liable for the debt and keeps no ownership in the property. For refinancing, the VA offers the <b>IRRRL</b> — the Interest Rate Reduction Refinance Loan, or VA Streamline — a low-documentation refinance aimed at lowering the rate.`,
            },
          ],
        },
        {
          heading: "the USDA loan — homeownership in rural America",
          anchor: { file: "01-cozy-cottage.png", caption: "rural roots", kind: "bldg" },
          paras: [
            {
              html: `<b>Section <span class="cloze" data-accept='["502","five hundred two","five oh two"]' data-reveal="502">?</span></b> of the USDA code establishes USDA home financing, whose purpose is to encourage homeownership in <b>rural</b> America. Like the VA loan, it's <b>guaranteed</b> by its agency — the U.S. Department of Agriculture — not insured. A property qualifies only if it sits in an <b>approved USDA rural locale</b> (the USDA publishes an eligibility map). USDA loans, like FHA, accommodate both traditional and non-traditional credit, and finance <b>primary residences only</b>.`,
            },
          ],
        },
        {
          heading: "the income cap that keeps it targeted",
          paras: [
            {
              html: `Congress funds the USDA program with a finite annual budget, so an <b>income cap</b> keeps it aimed at people of modest means: a household's income may not exceed <span class="cloze" data-accept='["115%","115","115 percent"]' data-reveal="115%">?</span> of the adjusted <b>area median income (AMI)</b> for the area. Because it's income-tested, a USDA applicant can't decline to disclose income — alimony, child support, and separate maintenance the borrower is legally entitled to must all be reported on the application.`,
            },
          ],
          synth: {
            q: "Who is the USDA loan for, and what two limits keep it targeted at them?",
            a: "It's for buyers of modest means in rural America. Two limits keep it there: the property must sit in an approved USDA rural locale, and the household's income can't exceed 115% of the adjusted area median income (AMI).",
          },
        },
        {
          heading: "no PMI — a guarantee fee, and two loan types",
          paras: [
            {
              html: `USDA loans require <b>zero down (100% LTV)</b> and, like VA loans, <b>prohibit mortgage insurance</b> — but they may carry a <b>guarantee fee</b> instead. The standard USDA loan, the <b>Guaranteed Rural Housing (GRH)</b> loan, charges a 1% up-front guarantee financed into the loan plus a small monthly fee of <span class="cloze" data-accept='["0.35%","0.35","0.35 percent","35 basis points","35 bps"]' data-reveal="0.35%">?</span> per year (35 basis points), and amortizes over 30 years with no prepayment penalty. The second type, the <b>Homeownership Direct (HD)</b> loan, serves very-low-income borrowers (50%–80% of adjusted AMI), can run 33–38 years, may offer payment subsidies, and carries <b>no guarantee fee</b> at all.`,
            },
          ],
        },
        {
          heading: "the four programs, side by side",
          spoken: `Here are the four residential loan programs set side by side. Conventional loans are backed by Fannie Mae and Freddie Mac; FHA loans are insured by the government; VA loans are guaranteed by the Department of Veterans Affairs; and USDA loans are guaranteed by the Department of Agriculture. On screen, a reference matrix compares them across down payment, mortgage insurance, debt-to-income, occupancy, seller concessions, loan limits, and assumability.`,
          paras: [
            {
              html: `Four programs finance nearly every home in the country, and each is defined by <b>who stands behind it</b>. <b>Conventional</b> loans are backed by Fannie Mae and Freddie Mac; <b>FHA</b> loans are insured by the government through HUD; <b>VA</b> loans are guaranteed by the Department of Veterans Affairs; and <b>USDA</b> loans are guaranteed by the Department of Agriculture. That single difference in backing ripples through everything else — the down payment, whether there's mortgage insurance, how income is measured, and whether the loan can be handed to the next buyer. The matrix below is the one every MLO ends up memorizing.`,
            },
          ],
          visual: "program-comparison",
          synth: {
            q: "VA and USDA both skip PMI. What does each charge instead, and why can they get away with it?",
            a: "A VA loan charges a funding fee; a USDA loan charges a guarantee fee. Both can skip private mortgage insurance because the government's own guaranty already stands behind the loan — the agency, not a private insurer, absorbs the lender's risk, so the fee simply funds that guaranty pool.",
          },
        },
      ],
      review: {
        flashcards: [
          { peg: "the fee", topic: "VA funding fee", q: "Can the VA funding fee be financed into the loan?", a: "Yes — it may be <span class='hl'>financed into the loan</span> rather than paid in cash at settlement." },
          { peg: "no penalty", topic: "VA rules", q: "Do VA loans allow a prepayment penalty?", a: "<span class='hl'>Never.</span> A prepayment penalty is not permitted on any VA loan." },
          { peg: "the catch", topic: "assumption", q: "A non-veteran assumes a veteran's VA loan. What happens to the veteran's eligibility?", a: "The veteran's <span class='hl'>COE stays attached</span> to the assumed loan until it's paid in full, so the veteran can't get another VA loan meanwhile — but is no longer liable for the debt." },
          { peg: "left over", topic: "VA underwriting", q: "What is residual income?", a: "The income left each month after all mandatory expenses are paid. The VA sets a minimum that varies by <span class='hl'>loan amount, family size, and region</span>." },
          { peg: "the map", topic: "USDA eligibility", q: "What makes a property eligible for USDA financing?", a: "It must sit in an <span class='hl'>approved USDA rural locale</span> (per the USDA eligibility map) and be a primary residence." },
          { peg: "two kinds", topic: "USDA types", q: "Name the two USDA loan types and who each serves.", a: "<span class='hl'>Guaranteed Rural Housing (GRH)</span> — the standard 30-year loan; and <span class='hl'>Homeownership Direct (HD)</span> — for very-low-income borrowers (50–80% AMI), up to 33–38 years, no guarantee fee." },
          { peg: "the notice", topic: "VA appraisal", q: "What does the Notice of Value (NOV) establish?", a: "The property's <span class='hl'>VA Reasonable Value</span> — a VA loan may not exceed it — plus any conditions the property must satisfy for the guaranty." },
        ],
        mcq: [
          {
            q: "A VA loan carries no mortgage insurance. What protects the lender instead?",
            opts: ["Private mortgage insurance", "The VA funding fee and guaranty", "An FHA MIP", "A larger down payment"],
            correct: 1,
          },
          {
            q: "The USDA loan program exists primarily to:",
            opts: ["Insure high-value urban loans", "Encourage homeownership in rural America", "Refinance conventional loans", "Guarantee second homes"],
            correct: 1,
          },
          {
            q: "Prepayment penalties on VA loans are:",
            opts: ["Allowed for the first 3 years", "Allowed up to 2% of the balance", "Never permitted", "Required on refinances"],
            correct: 2,
          },
          {
            q: "USDA Homeownership Direct (HD) loans serve borrowers with income:",
            opts: ["Above the area median", "Between 50% and 80% of adjusted AMI", "Exactly at 115% of AMI", "With no income limit"],
            correct: 1,
          },
          {
            q: "The IRRRL (VA Streamline) is used to:",
            opts: ["Buy a first home with no entitlement", "Refinance a VA loan to a lower interest rate", "Convert a USDA loan to VA", "Take cash out of a conventional loan"],
            correct: 1,
          },
          {
            q: "Who is exempt from the VA funding fee?",
            opts: ["Any first-time buyer", "A veteran with a service-connected disability (or a Purple Heart recipient)", "Anyone putting 20% down", "Borrowers over 62"],
            correct: 1,
          },
        ],
      },
      recap: {
        plainLanguage: "VA and USDA are the two government-guaranteed loans. Because the government itself stands behind them, both lend with no down payment and no mortgage insurance — the VA charges a funding fee and the USDA a guarantee fee in place of PMI.",
        facts: [
          "VA loans came from the <span class=\"hl\">1944 Servicemen's Readjustment Act</span>; the COE reflects a <span class=\"hl\">$36,000</span> entitlement, guaranteeing up to <span class=\"hl\">four times</span> that.",
          "No mortgage insurance on either: VA charges a <span class=\"hl\">funding fee</span> (first-use, &lt;5% down = <span class=\"hl\">2.15%</span>), USDA a <span class=\"hl\">guarantee fee</span> (1% up-front + <span class=\"hl\">0.35%</span>/yr).",
          "VA underwrites on <span class=\"hl\">back-end DTI only</span> plus residual income; the funding fee is waived for a <span class=\"hl\">10%+ service-connected disability</span> or a Purple Heart.",
          "USDA is capped at <span class=\"hl\">115% of AMI</span> and limited to <span class=\"hl\">approved rural</span> areas; GRH is the standard loan, HD serves 50–80% AMI.",
          "Both are <span class=\"hl\">assumable</span>; a non-veteran assuming a VA loan keeps the veteran's COE attached until it's paid off.",
        ],
      },
    },
    {
      id: "fha",
      name: "FHA loans",
      reg: "Federal Housing Administration · HUD-insured loans · National Housing Act",
      definitions: [
        { term: "Base loan amount", def: "The purchase price minus the down payment. Every other figure on the worksheet is built from it." },
        { term: "Mortgage insurance premium (MIP)", def: "FHA's protection against default, charged in two parts: once up front and again every year." },
        { term: "Up-front MIP (UFMIP)", def: "The one-time premium, 1.75% of the base loan amount. Most borrowers finance it into the loan rather than pay it at closing." },
        { term: "Annual MIP (AMIP)", def: "The ongoing premium, set by loan term and loan-to-value, collected monthly inside the payment." },
        { term: "PITI", def: "The full monthly payment: principal, interest, taxes, and insurance. On an FHA loan the monthly MIP rides inside it." },
      ],
      groups: [
        {
          heading: "structuring an FHA loan",
          paras: [
            {
              html: `An FHA loan is insured by HUD, so a borrower can qualify with a smaller down payment and a lower credit score than a conventional loan requires. In exchange, it carries mortgage insurance in two parts — an up-front premium financed into the loan, and an annual premium collected monthly with the payment.`,
            },
          ],
          worksheet: "fha-structure",
          synth: {
            q: "A borrower notices their FHA loan amount is larger than the purchase price minus their down payment. What accounts for the difference?",
            a: "The up-front MIP — 1.75% of the base loan amount — is financed into the loan rather than paid in cash. So the loan is the base plus the UFMIP, then rounded down to the nearest $50.",
          },
        },
      ],
      review: {
        flashcards: [
          {
            peg: "why finance",
            topic: "Mortgage insurance",
            q: "Why is the up-front MIP usually financed into the loan instead of paid at closing?",
            a: "It spares the borrower a large cash outlay — the premium is rolled into the loan amount and repaid over the term.",
          },
          {
            peg: "monthly part",
            topic: "Mortgage insurance",
            q: "On an FHA loan, which part of the mortgage insurance is collected monthly?",
            a: "The <span class=\"hl\">annual MIP</span> — the up-front premium is one-time, while the annual premium rides inside each monthly payment.",
          },
        ],
        mcq: [
          {
            q: "Which statement about FHA mortgage insurance is correct?",
            opts: [
              "It is paid entirely at closing.",
              "It comes in two parts — an up-front premium and an annual premium.",
              "It is required only when the down payment is under 20%.",
              "It replaces the borrower's homeowner's insurance.",
            ],
            correct: 1,
          },
        ],
      },
    },
    {
      id: "arms",
      name: "Adjustable-rate mortgages",
      reg: "ARMs · fully-indexed rate + cap structure · Reg Z disclosures",
      definitions: [
        { term: "Start rate", def: "The introductory rate an ARM locks at, set below market and held through the fixed period." },
        { term: "Index", def: "The public rate an ARM tracks; when the loan adjusts, its rate is built from wherever the index sits that day." },
        { term: "Margin", def: "The lender's fixed markup, added to the index. The rate can't fall below it." },
        { term: "Fully-indexed rate (FIAR)", def: "The index plus the margin, rounded to the nearest ⅛%. It's the rate the loan charges once it adjusts." },
        { term: "Initial adjustment cap", def: "The most the rate can move at the first adjustment, measured from the start rate." },
        { term: "Periodic adjustment cap", def: "The most the rate can move at each adjustment after the first, measured from the prior rate." },
        { term: "Life-of-loan cap", def: "The most the rate can ever rise above the start rate." },
        { term: "Teaser vs discount rate", def: "Both are start rates below the fully-indexed rate. A discount rate is within 3% of it; a teaser rate is more than 3% below." },
      ],
      groups: [
        {
          paras: [
            {
              html: `An adjustable-rate mortgage keeps a low fixed rate for its first few years, then adjusts on a set schedule for the rest of the term. Lenders write it as two numbers — how long the rate stays fixed, then how often it adjusts after that, like 5/1. Where the rate goes from there depends on the note's index, margin, and caps.`,
            },
          ],
          walkthrough: "arm-note",
        },
        {
          heading: "what the caps do over the loan's life",
          anchor: { file: "three-women-in-poodle-skirts-transparent.png", caption: "three caps", kind: "char" },
          paras: [
            {
              html: `Each cap applies to a different move: the initial cap to the first adjustment, the periodic cap to every one after, and the life cap sets the ceiling the rate can never pass. FHA and VA ARMs have no initial cap — there, the periodic cap applies to the first adjustment too.`,
            },
          ],
          vizWidget: "arm-cap-ladder",
          synth: {
            q: "Two ARMs start at the same rate and share the same life cap. One is conventional with a 3/1/6 structure; the other is FHA with a 3/6 structure. Which reaches its ceiling sooner, and why?",
            a: "The FHA ARM. After the first jump both sit three points above start, but the conventional loan's periodic cap is one point a year while the FHA loan's is three — so the FHA rate hits the +6 ceiling in two adjustments, the conventional in four.",
          },
        },
      ],
      review: {
        flashcards: [
          {
            peg: "cap basis",
            topic: "ARM caps",
            q: "On a conventional ARM, what does the periodic cap measure from — the start rate or the prior year's rate?",
            a: "The prior year's rate. Only the initial and life caps measure from the start rate.",
          },
          {
            peg: "teaser",
            topic: "ARM start rates",
            q: "What separates a teaser rate from a discount rate?",
            a: "Both are start rates below the fully-indexed rate. A discount rate is within 3% of it; a <span class=\"hl\">teaser rate</span> is more than 3% below.",
          },
        ],
        mcq: [
          {
            q: "An ARM's fully-indexed rate is the:",
            opts: [
              "start rate plus the initial cap",
              "index plus the margin, rounded to the nearest ⅛%",
              "highest rate the life cap allows",
              "index at closing",
            ],
            correct: 1,
          },
        ],
      },
    },
  ],
};

export default section5;

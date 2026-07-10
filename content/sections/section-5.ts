import type { SectionContent } from "@/lib/section";

// Section 5 — General Mortgage Knowledge (ebook Module 5). Recall-gradient reader,
// same shape as Sections 3 & 4 (cloze / synth / review), self-contained: every tested
// fact is taught in the unit's prose before it's tested. Numbers verified against the
// Module 5 ebook (VA pp. 327–335, USDA pp. 336–337) and the 2026 loan-year values.
//
// Units: VA & USDA · FHA · ARMs, then the loan-products catalog appended by axis —
// repayment structures · second liens · reverse mortgages · construction & rehab ·
// less-common programs. Every tested fact is taught in the unit's prose before it's
// tested; the figures are exam-year-sensitive and must be re-verified before shipping.

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
          heading: "how the four programs differ",
          spoken: `The four residential loan programs differ by who carries the lender's risk, and how. On a conventional loan, Fannie Mae and Freddie Mac buy the loan; there is no government role. On an FHA loan, the federal government insures it through HUD. On a VA loan, the Department of Veterans Affairs guarantees part of it. On a USDA loan, the Department of Agriculture guarantees it. That one difference sets the rest — the down payment, whether there's mortgage insurance, how income is measured, and whether the loan can pass to the next buyer.`,
          paras: [
            {
              html: `<p>What separates the four loan programs isn't the house or the borrower — it's who carries the lender's risk if the loan goes bad, and how. Each program uses a different mechanism, and the exact word matters:</p><ul><li><b>Conventional</b> — bought and backed by <b>Fannie Mae and Freddie Mac</b>. No government role.</li><li><b>FHA</b> — <b>insured</b> by the federal government through HUD: if the borrower defaults, the FHA repays the lender.</li><li><b>VA</b> — <b>guaranteed</b> by the Department of Veterans Affairs, which covers part of the lender's loss.</li><li><b>USDA</b> — <b>guaranteed</b> by the Department of Agriculture, for rural borrowers.</li></ul><p>That one difference sets everything after it: the down payment, whether there's mortgage insurance, how income is measured, and whether the loan can pass to the next buyer.</p>`,
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
    {
      id: "repayment-structures",
      name: "How a loan gets repaid",
      reg: "fixed-rate · interest-only · balloon · the amortization curve",
      definitions: [
        { term: "Amortization", def: "The gradual repayment of a loan through regular payments, each split between interest and principal, until the balance reaches zero at the end of the term." },
        { term: "Fully-amortizing payment", def: "A payment large enough to pay the loan down to zero over its scheduled term — the standard fixed-rate arrangement." },
        { term: "Negative amortization", def: "When a payment doesn't cover even the interest due, so the unpaid interest is added to the balance and the loan grows instead of shrinking." },
        { term: "Re-cast", def: "A lender's recomputation of the monthly payment against a reduced balance, usually after a large principal payment. The rate and term stay put; only the payment drops. Discretionary and often carries a fee." },
        { term: "Balloon payment", def: "A single large payment of the entire remaining balance, due on a date well before the loan would amortize — the defining feature of a balloon loan." },
        { term: "Conditional right to modify (CRTM)", def: "A borrower's right, written into some balloon loans, to convert the loan to a fixed rate at the call date instead of paying the balloon — conditioned on meeting the loan's terms and giving timely written notice." },
        { term: "Interest-only period", def: "A set span at the start of a loan during which the borrower pays only interest, so the balance holds flat; when it ends, the loan re-casts to a fully-amortizing payment over the remaining term." },
      ],
      groups: [
        {
          paras: [
            {
              html: `A <b>fixed-rate loan</b> locks one interest rate for the whole term, so the principal-and-interest payment never changes. Early on, most of each payment is interest; as the balance falls, more of it goes to principal, until the loan is paid off on schedule. Every other product in this unit is a change to that one arrangement — the payment, the payoff date, or both.`,
            },
          ],
        },
        {
          heading: "the amortization curve",
          paras: [
            {
              html: `On a 30-year loan the <b>crossover</b> — the month principal finally overtakes interest inside each payment — sits more than halfway in. A $200,000 loan at 6% pays <span class="cloze" data-accept='["$231,676","231676","231,676"]' data-reveal="$231,676">?</span> in interest across the full schedule. Paying extra against principal each month moves the crossover earlier and drops that total sharply.`,
            },
          ],
          vizWidget: "amortization",
        },
        {
          heading: "when the payment only covers interest",
          paras: [
            {
              html: `An <b>interest-only loan</b> bills only the interest for a set period, so the balance holds flat — nothing is going to principal. It exists only as a feature of a <span class="cloze" data-accept='["non-qm","non-qualified","nonqualified","non qualified","non-qualified mortgage"]' data-reveal="non-QM">?</span> mortgage: a lender either keeps it in portfolio or sells it to a private investor. When the interest-only period ends, the loan <b>re-casts</b> to a payment that repays the full balance over the years left, and that payment jumps.`,
            },
          ],
          synth: {
            q: "A borrower pays interest-only for the first 15 years of a 30-year loan, then it re-casts. Why is the new payment higher than if the loan had amortized from day one?",
            a: "Because nothing went to principal during the interest-only years, the balance never fell. At the re-cast, the full original principal now has to amortize over the shorter remaining term (15 years instead of 30), so each payment must be larger.",
          },
        },
        {
          heading: "a payment on one clock, a payoff on another",
          anchor: { file: "detective-medicine-ball-transparent.png", caption: "the call", kind: "char" },
          paras: [
            {
              html: `A <b>balloon loan</b> sets its payment on a 30- or 15-year amortization but calls the entire remaining balance due years earlier. Lenders write it as two numbers — years to the call, then the amortization behind the payment — so a <b>3/27</b> pays like a 30-year loan but comes due at year three. The low rate is the trade for the risk that the borrower can't cover the call. To exercise a <b>conditional right to modify (CRTM)</b> — converting the balloon to a fixed rate instead of paying it — the borrower must give written notice no later than <span class="cloze" data-accept='["45","45 days","forty-five","forty-five days"]' data-reveal="45 days">?</span> before the call.`,
            },
          ],
        },
        {
          heading: "re-cast — same rate, smaller payment",
          paras: [
            {
              html: `When a borrower pays a lump sum against principal, a fixed-rate loan normally keeps the payment the same and shortens the term. A <b>re-cast</b> does the opposite: the servicer recomputes a lower payment against the new, smaller balance over the remaining term. It's discretionary and often carries a fee — and the interest rate never changes.`,
            },
          ],
        },
      ],
      review: {
        flashcards: [
          { peg: "the math", topic: "Interest-only", q: "How is an interest-only monthly payment calculated?", a: "Balance × annual rate ÷ 12 — <span class='hl'>interest only</span>, nothing toward principal, so the balance holds flat." },
          { peg: "two numbers", topic: "Balloon", q: "In a 3/27 balloon, what do the two numbers mean?", a: "The call comes in <span class='hl'>year 3</span>; the payment is set on a <span class='hl'>30-year</span> amortization (3 + 27)." },
          { peg: "convert", topic: "Balloon", q: "What is a conditional right to modify (CRTM)?", a: "A right written into some balloon loans to <span class='hl'>convert to a fixed rate</span> at the call date instead of paying the balloon — if the borrower meets the conditions and gives timely written notice." },
          { peg: "same rate", topic: "Re-cast", q: "What does a re-cast change, and what does it leave alone?", a: "It lowers the <span class='hl'>payment</span> against a smaller balance; the <span class='hl'>rate and term</span> don't change." },
        ],
        mcq: [
          {
            q: "A balloon loan offers a lower rate than a comparable fixed-rate loan. What is the borrower trading for it?",
            opts: ["A longer amortization schedule", "The risk of covering the full balance at the call date", "A prepayment penalty", "Mandatory mortgage insurance"],
            correct: 1,
          },
          {
            q: "A re-cast changes the monthly payment but not the loan's:",
            opts: ["principal balance", "interest rate", "monthly escrow", "loan amount"],
            correct: 1,
          },
        ],
      },
      recap: {
        plainLanguage: "Every residential loan is a variation on one arrangement: a fixed-rate loan that pays a level amount each month until the balance hits zero. Interest-only, balloon, and re-cast each change the payment, the payoff date, or both.",
        facts: [
          "A fixed-rate loan is <span class=\"hl\">fully amortizing</span> — early payments are mostly interest, and the <span class=\"hl\">crossover</span> to mostly-principal sits past the halfway mark.",
          "<span class=\"hl\">Interest-only</span> is a non-QM feature: the balance holds flat, then the loan re-casts to a higher fully-amortizing payment.",
          "A <span class=\"hl\">balloon</span> loan pays on a long amortization but calls the full balance early — a 3/27 means call at year 3, 30-year payment.",
          "A <span class=\"hl\">CRTM</span> lets the borrower convert instead of paying the balloon — written notice no later than <span class=\"hl\">45 days</span> before the call.",
          "A <span class=\"hl\">re-cast</span> lowers the payment against a smaller balance; the rate and term don't move.",
        ],
      },
    },
    {
      id: "second-liens",
      name: "Second liens and equity lines",
      reg: "home-equity loans · HELOCs · purchase-money seconds",
      definitions: [
        { term: "Home equity loan (HEQ)", def: "A closed-end second mortgage: a fixed lump sum at a fixed rate, repaid on a set amortization schedule. A one-time draw." },
        { term: "Home equity line of credit (HELOC)", def: "An open-end second lien that works like a credit card against the home — the borrower draws, repays, and draws again during the draw period, usually at a variable rate tied to Prime." },
        { term: "Draw period", def: "The span (about ten years) during which a HELOC borrower can draw on the line; after it, the line freezes and the balance amortizes over the years left." },
        { term: "Purchase-money second mortgage", def: "A second lien taken out at the time of purchase (not later against built-up equity), typically to cover part of the price and avoid PMI." },
        { term: "Piggyback financing", def: "Splitting a purchase into a first mortgage plus a simultaneous second lien so the first stays at 80% LTV or below and avoids PMI. Named by its pieces — 80/10/10, 80/15/5, and so on." },
        { term: "Combined loan-to-value (CLTV)", def: "The two liens together as a percentage of the home's value — first plus second — even though PMI keys only off the first." },
      ],
      groups: [
        {
          paras: [
            {
              html: `A <b>second lien</b> lets an owner borrow against the equity they've built without touching the first mortgage. It comes in two shapes: a <b>home-equity loan</b> hands over a fixed sum at a fixed rate and amortizes like any loan, while a <b>home-equity line of credit (HELOC)</b> works like a credit card against the house — draw, repay, and draw again.`,
            },
          ],
        },
        {
          heading: "the line you draw against",
          anchor: { file: "house-of-cards-made-of-credit-cards-transparent.png", caption: "revolving", kind: "char" },
          paras: [
            {
              html: `A HELOC is open for about <span class="cloze" data-accept='["10 years","10","ten","ten years","10 yrs"]' data-reveal="10 years">?</span> — the <b>draw period</b> — during which the borrower draws and repays freely and is usually billed interest-only on whatever is outstanding, at a rate that tracks the <b>Prime rate</b>. When the draw period closes, the line freezes and the remaining balance amortizes over the years left.`,
            },
          ],
        },
        {
          heading: "two loans, one purchase",
          anchor: { file: "couple-football-fans-tandem-bicycle-transparent.png", caption: "riding double", kind: "char" },
          paras: [
            {
              html: `A buyer without 20% down can still skip PMI by splitting the financing into two loans. Private mortgage insurance attaches only to the <b>first</b> mortgage, so a first lien at <span class="cloze" data-accept='["80%","80","80 percent","eighty percent"]' data-reveal="80%">?</span> loan-to-value or below carries no PMI at all; a second lien then covers the gap between that first mortgage and the buyer's down payment.`,
            },
          ],
          vizWidget: "piggyback",
          synth: {
            q: "Why does an 80/10/10 avoid PMI when the buyer is only putting 10% down?",
            a: "PMI keys off the first lien's loan-to-value, not the buyer's down payment. In an 80/10/10 the first mortgage is only 80% of value — at or below the PMI threshold — so no PMI attaches. The 10% second lien carries the rest of what the small down payment doesn't cover.",
          },
        },
      ],
      review: {
        flashcards: [
          { peg: "vs", topic: "HEQ vs HELOC", q: "Home-equity loan vs HELOC?", a: "<span class='hl'>HEQ</span> — closed-end, fixed rate, one lump sum; <span class='hl'>HELOC</span> — open-end, variable rate, revolving draws." },
          { peg: "the splits", topic: "Piggyback", q: "Name the common piggyback splits.", a: "<span class='hl'>80/20, 75/25, 80/15/5, 80/10/10</span> — first / second / (down). The first stays at 80% or below to dodge PMI." },
          { peg: "both debts", topic: "Piggyback", q: "What must a piggyback borrower qualify to carry?", a: "<span class='hl'>Both loans at once</span> — the first mortgage and the second lien are underwritten together." },
        ],
        mcq: [
          {
            q: "During a HELOC's draw period, the borrower is typically billed:",
            opts: ["principal and interest", "interest-only on the outstanding balance", "a fixed amortizing payment", "nothing until the line closes"],
            correct: 1,
          },
          {
            q: "A second lien taken out at the time of purchase — rather than later against built-up equity — is a:",
            opts: ["home-equity loan", "purchase-money second mortgage", "reverse mortgage", "construction loan"],
            correct: 1,
          },
        ],
      },
      recap: {
        plainLanguage: "A second lien borrows against home equity without disturbing the first mortgage. A home-equity loan is a fixed lump sum; a HELOC is a revolving line you draw against. At purchase, a piggyback second lien lets the first mortgage stay at 80% and skip PMI.",
        facts: [
          "<span class=\"hl\">HEQ</span>: closed-end, fixed rate, lump sum. <span class=\"hl\">HELOC</span>: open-end, variable (tracks Prime), revolving.",
          "A HELOC's <span class=\"hl\">draw period</span> runs about 10 years, usually interest-only; then the line freezes and the balance amortizes.",
          "A <span class=\"hl\">piggyback</span> keeps the first lien at 80% LTV to avoid PMI — an 80/10/10 is 80% first, 10% second, 10% down.",
          "PMI keys off the <span class=\"hl\">first lien's LTV</span> only; the borrower must qualify carrying <span class=\"hl\">both</span> loans.",
        ],
      },
    },
    {
      id: "reverse-mortgages",
      name: "Reverse mortgages",
      reg: "HECM / FHA 255 · HUD-insured · age 62+ · non-recourse",
      definitions: [
        { term: "Home equity conversion mortgage (HECM)", def: "The FHA-insured reverse mortgage, the most common kind. Lets an owner 62 or older convert equity to cash with no monthly mortgage payment." },
        { term: "Principal limit", def: "The maximum a reverse mortgage will lend, set from the youngest borrower's age, the home's value, and expected interest rates. Older borrowers get a higher limit." },
        { term: "60% first-year utilization rule", def: "A cap on a reverse mortgage: no more than 60% of the principal limit may be drawn in the first year (with room for a bit more if it's needed to pay off an existing mortgage)." },
        { term: "LESA (life expectancy set-aside)", def: "A portion of the reverse-mortgage proceeds set aside to pay the borrower's property taxes and insurance, so a lapse can't trigger the loan." },
        { term: "Maximum claim amount", def: "The ceiling FHA insures on a HECM — the lesser of the home's appraised value or the FHA limit ($1,249,125 in 2026). The principal limit is calculated from it." },
        { term: "Non-recourse", def: "A loan whose repayment is limited to the collateral: if a HECM balance exceeds the home's value, the FHA insurance covers the shortfall — the borrower and heirs owe nothing more." },
        { term: "Non-borrowing spouse", def: "A spouse under 62 (or otherwise not on the loan) who stays on title; they may remain in the home for life once the borrowing spouse's obligations end, as long as the borrowing spouse qualified." },
        { term: "Tenure vs term payment", def: "Two monthly-annuity options: tenure pays a set amount for as long as the borrower lives in the home; term pays a larger amount for a fixed number of years." },
        { term: "Single-purpose reverse mortgage", def: "A reverse mortgage from a state or local government or nonprofit for one specified use, such as home repairs or property taxes. The lowest-cost, narrowest kind." },
        { term: "Proprietary reverse mortgage", def: "A private, uninsured reverse mortgage, typically for higher-value homes above the FHA limit. Not backed by FHA." },
      ],
      groups: [
        {
          anchor: { file: "lighthouse-keeper-jetpack-transparent.png", caption: "aging in place", kind: "char" },
          paras: [
            {
              html: `A <b>reverse mortgage</b> lets an owner <span class="cloze" data-accept='["62","sixty-two"]' data-reveal="62">?</span> or older draw the equity in their home as cash while staying in it, with no monthly mortgage payment required. Interest accrues onto the balance instead of being paid down. The loan comes due only when the last borrower leaves the home — sells it, moves out, or passes away.`,
            },
          ],
        },
        {
          heading: "how much, and how it comes out",
          paras: [
            {
              html: `The <b>youngest</b> borrower's age sets how much of the home's value the loan will lend — the <b>principal limit</b>. Older borrowers can draw more, since the balance has less time to grow against the home's value. However the money is taken, a first-year cap lets the borrower access no more than <span class="cloze" data-accept='["60%","60","60 percent","sixty percent"]' data-reveal="60%">?</span> of the principal limit up front.`,
            },
            {
              html: `The proceeds can arrive several ways: a <b>lump sum</b>, a <b>line of credit</b> the borrower draws on over time, or a monthly annuity — <b>tenure</b>, which pays for as long as the borrower lives in the home, or <b>term</b>, which pays a larger amount for a set number of years.`,
              spoken: `The proceeds can arrive several ways. First, as a lump sum. Second, as a line of credit the borrower draws on over time. Third, as a monthly annuity — either tenure, which pays for as long as the borrower lives in the home, or term, which pays a larger amount for a set number of years.`,
            },
          ],
          visual: "reverse-disbursement",
        },
        {
          heading: "the money doesn't have to be paid back — until it does",
          paras: [
            {
              html: `Nothing is owed until a triggering event: the last borrower dies with no surviving spouse, the home is sold, the borrower is out of the home for more than <span class="cloze" data-accept='["12","12 months","twelve","twelve months"]' data-reveal="12 months">?</span> straight, or the property taxes and insurance lapse. Because the loan is <b>non-recourse</b>, if the balance ever climbs above the home's value, the FHA insurance covers the gap — never the borrower or the heirs.`,
              spoken: `Nothing is owed until a triggering event. First, the last borrower dies with no surviving spouse. Second, the home is sold. Third, the borrower is out of the home for more than twelve straight months. Fourth, the property taxes and insurance lapse. Because the loan is non-recourse, if the balance ever climbs above the home's value, the F H A insurance covers the gap — never the borrower or the heirs.`,
            },
          ],
          synth: {
            q: "A reverse-mortgage balance grows past the home's value, then the borrower dies. Who pays the difference, and why isn't it the heirs?",
            a: "The FHA mortgage insurance pays it. A HECM is non-recourse, so the debt is limited to the home's value — the heirs can settle by handing over the property and owe nothing beyond it. The insurance the borrower paid into covers the lender's shortfall.",
          },
        },
        {
          heading: "the pieces that keep the loan safe",
          paras: [
            {
              html: `Before closing, every borrower completes independent <b>HUD-approved counseling</b>; without that certificate the lender has no enforceable lien. A <b>LESA</b> — a life expectancy set-aside — can be carved out of the proceeds to pay the taxes and insurance on the borrower's behalf, so a lapse never triggers the loan. A spouse under 62 can stay on the title as a <b>non-borrowing spouse</b> and remain in the home for life, as long as the borrowing spouse qualified.`,
            },
          ],
        },
        {
          heading: "three kinds, and how they're sold",
          paras: [
            {
              html: `The <b>HECM</b> — home equity conversion mortgage — is the common one: FHA-insured, and flexible in how it pays out. A <b>single-purpose</b> reverse mortgage comes from a state or local program for one named use, like repairs or property taxes; a <b>proprietary</b> one is a private, uninsured loan for higher-value homes. Because the audience is elderly, the advertising is policed hard: the <b>MAP Rule</b> (Regulation N) makes it a violation to misrepresent the costs, the payments, or the borrower's right to stay in the home.`,
            },
          ],
        },
      ],
      review: {
        flashcards: [
          { peg: "payouts", topic: "Disbursement", q: "What are the monthly-annuity payout options on a reverse mortgage?", a: "<span class='hl'>Tenure</span> (a set amount for as long as you live in the home) and <span class='hl'>term</span> (a larger amount for a fixed number of years), plus modified versions that pair either with a line of credit." },
          { peg: "LESA", topic: "Safeguards", q: "What does a LESA do?", a: "Sets aside part of the proceeds to <span class='hl'>pay taxes and insurance</span>, so a lapse can't trigger the loan." },
          { peg: "vs", topic: "Reverse kinds", q: "Single-purpose vs proprietary reverse mortgage?", a: "<span class='hl'>Single-purpose</span> — government or nonprofit, one named use, lowest cost; <span class='hl'>proprietary</span> — private, uninsured, for higher-value homes." },
          { peg: "the case", topic: "Reg N", q: "What did the Nationwide Equities enforcement action (2021) penalize?", a: "Deceptive reverse-mortgage advertising under the <span class='hl'>MAP Rule (Reg N)</span> — a <span class='hl'>$140,000</span> penalty for misrepresenting the loan to elderly borrowers." },
        ],
        mcq: [
          {
            q: "Who covers the shortfall when a non-recourse HECM's balance exceeds the home's value?",
            opts: ["The borrower's estate", "The heirs", "The FHA mortgage insurance", "The original lender"],
            correct: 2,
          },
          {
            q: "Which of these is NOT a reverse-mortgage repayment trigger?",
            opts: ["The home is sold", "The last borrower dies with no surviving spouse", "The borrower pays down part of the balance", "Property taxes and insurance lapse"],
            correct: 2,
          },
          {
            q: "Before a reverse mortgage closes, every borrower must complete:",
            opts: ["a credit-counseling course", "independent HUD-approved counseling", "a home inspection", "a financial-planning seminar"],
            correct: 1,
          },
        ],
      },
      recap: {
        plainLanguage: "A reverse mortgage lets an owner 62 or older turn home equity into cash with no monthly payment — the balance grows and is repaid only when the last borrower leaves. The common one is the FHA-insured HECM, and because it's non-recourse the borrower can never owe more than the home is worth.",
        facts: [
          "Every borrower must be <span class=\"hl\">62+</span>; the <span class=\"hl\">youngest</span> borrower's age sets the principal limit.",
          "A first-year cap limits the draw to <span class=\"hl\">60%</span> of the principal limit; proceeds come as a line of credit, lump sum, or annuity (tenure or term).",
          "Repayment triggers: the last borrower dies with no surviving spouse, the home is sold, the borrower is <span class=\"hl\">out of it 12+ months</span>, or taxes/insurance lapse.",
          "It's <span class=\"hl\">non-recourse</span> — the FHA insurance, not the heirs, covers any shortfall. HUD counseling is mandatory, and a <span class=\"hl\">LESA</span> can prepay taxes and insurance.",
          "Three kinds: <span class=\"hl\">HECM</span> (FHA-insured), single-purpose (government), proprietary (private). Advertising is policed by the <span class=\"hl\">MAP Rule (Reg N)</span>.",
        ],
      },
    },
    {
      id: "construction-rehab",
      name: "Construction and rehab loans",
      reg: "construction · construction-to-permanent · rehab (203k / HomeStyle)",
      definitions: [
        { term: "Construction loan", def: "Short-term financing that funds a home's construction in stages (draws), with interest paid only on the amount drawn. It's replaced by permanent financing once the home is built." },
        { term: "Draw", def: "A staged release of construction funds, paid to the builder as each phase is completed and inspected." },
        { term: "Construction-to-permanent (one-close / two-close)", def: "A loan that funds the build and then converts to a permanent end loan. One-close settles once; two-close closes the permanent loan in a separate settlement." },
        { term: "End loan", def: "The permanent mortgage that replaces construction financing once the home is complete." },
        { term: "Rehabilitation loan", def: "Financing based on a home's as-is value plus the cost of planned improvements, released against inspections as the work proceeds." },
        { term: "FHA 203(k)", def: "The FHA's rehab loan — owner-occupied 1–4 unit properties (plus limited mixed-use), financing purchase or refinance plus renovation in one loan." },
        { term: "HomeStyle / Freddie Renovation", def: "The conventional rehab loans (Fannie Mae's HomeStyle, Freddie Mac's Renovation) which — unlike the 203(k) — can also cover second homes and investment properties." },
      ],
      groups: [
        {
          paras: [
            {
              html: `A lender won't write a standard mortgage on a house that doesn't exist yet — there's no finished collateral to secure the loan. <b>Construction financing</b> fills the gap: it funds the build in stages and converts to an ordinary mortgage once the home stands.`,
            },
          ],
        },
        {
          heading: "money released in stages",
          anchor: { file: "triathlete-snow-ski-transparent.png", caption: "in stages", kind: "char" },
          paras: [
            {
              html: `At closing the lender advances the land cost and an agreed share of the build. As each phase finishes, the builder requests the next <b>draw</b>; the lender inspects the work before releasing it, and repeats until the home is complete and fully funded. During the build the borrower is billed <span class="cloze" data-accept='["interest-only","interest only","interest"]' data-reveal="interest-only">?</span>, and only on the funds drawn so far.`,
            },
          ],
          visual: "draw-schedule",
        },
        {
          heading: "when the build becomes the mortgage",
          anchor: { file: "samurai-three-legged-race-transparent.png", caption: "two, bound", kind: "char" },
          paras: [
            {
              html: `A <b>construction-to-permanent</b> loan settles the build into an <b>end loan</b> the borrower chooses while construction is still underway. <b>One-close</b> does it in a single settlement; <b>two-close</b> closes the permanent loan separately, in a second settlement. Long rate locks are available, but they get expensive past <span class="cloze" data-accept='["90 days","90","ninety","ninety days"]' data-reveal="90 days">?</span>, so timing the lock against the build schedule matters.`,
            },
          ],
        },
        {
          heading: "financing a home that needs work",
          paras: [
            {
              html: `A <b>rehab loan</b> lends on the home's as-is value plus the cost of the planned work, releasing funds against inspections as the renovation proceeds, then converting to an end loan. The government versions are the <b>FHA 203(k)</b> and the VA Renovation loan; the conventional versions — Fannie Mae's <b>HomeStyle</b> and Freddie Mac's Renovation loan — also cover second homes and investment properties, which the 203(k) can't.`,
            },
          ],
          synth: {
            q: "A 203(k) and a HomeStyle both finance a fixer-upper. Name one thing HomeStyle can do that the 203(k) can't.",
            a: "HomeStyle can finance a second home or an investment property. The FHA 203(k) is limited to owner-occupied 1–4 unit properties, so it can't be used on a non-owner-occupied home the way a conventional HomeStyle (or Freddie Renovation) loan can.",
          },
        },
      ],
      review: {
        flashcards: [
          { peg: "three", topic: "Construction types", q: "Construction vs construction-to-permanent vs rehab?", a: "<span class='hl'>Construction</span> — funds the build, interest-only on draws; <span class='hl'>construction-to-permanent</span> — converts to an end loan; <span class='hl'>rehab</span> — as-is value plus the cost of work." },
          { peg: "203k", topic: "Rehab loans", q: "Who can use an FHA 203(k)?", a: "<span class='hl'>Owner-occupied 1–4 unit</span> properties (plus limited mixed-use, up to 49% commercial) — not investment properties." },
          { peg: "one/two", topic: "Construction-to-permanent", q: "One-close vs two-close?", a: "<span class='hl'>One-close</span> — a single settlement covering build and permanent; <span class='hl'>two-close</span> — the permanent loan closes in a separate settlement." },
        ],
        mcq: [
          {
            q: "How are construction funds released to the builder?",
            opts: ["All at once at closing", "In staged draws, each after an inspection", "Only at completion", "As a line of credit the builder manages"],
            correct: 1,
          },
          {
            q: "Which rehab loan can finance an investment property?",
            opts: ["FHA 203(k)", "VA Renovation", "HomeStyle", "A single-purpose loan"],
            correct: 2,
          },
        ],
      },
      recap: {
        plainLanguage: "A standard mortgage needs finished collateral, so a home that isn't built — or isn't whole — needs construction or rehab financing. Both fund the work in inspected stages, charge interest only on what's drawn, and convert to an ordinary end loan when the home is done.",
        facts: [
          "A <span class=\"hl\">construction loan</span> funds the build in staged <span class=\"hl\">draws</span>, each released after inspection; the borrower pays interest only on what's drawn.",
          "A <span class=\"hl\">construction-to-permanent</span> loan converts to an end loan — <span class=\"hl\">one-close</span> (single settlement) or <span class=\"hl\">two-close</span> (separate). Rate locks past <span class=\"hl\">90 days</span> get costly.",
          "A <span class=\"hl\">rehab loan</span> lends on as-is value plus the cost of the work, releasing funds against inspections.",
          "<span class=\"hl\">203(k)</span> — FHA, owner-occupied 1–4 unit. <span class=\"hl\">HomeStyle</span> / Freddie Renovation — conventional, and also cover second homes and investment properties.",
        ],
      },
    },
    {
      id: "less-common-programs",
      name: "Less-common programs",
      reg: "GPM · GEM · land contract · package · ROM",
      definitions: [
        { term: "Graduated payment mortgage (GPM)", def: "A fixed-rate loan whose payments start low and step up on a schedule. The early payments don't cover the interest, so the loan negatively amortizes at first." },
        { term: "Growth equity mortgage (GEM)", def: "A fixed-rate loan whose payments start higher than required and rise, with the extra applied to principal, so the loan pays off early." },
        { term: "Land contract", def: "A seller-financed sale where the buyer takes possession but not title — paying the seller directly and receiving the deed only when the balance is paid. Default can forfeit the payments made." },
        { term: "Package mortgage", def: "A loan secured by the real property plus the personal property inside it (appliances, furnishings), all appraised together as one bundle." },
        { term: "Reduction option mortgage (ROM)", def: "A fixed-rate loan with a one-time option to lower the rate without a full refinance, usually for a fee and within a set window." },
      ],
      groups: [
        {
          paras: [
            {
              html: `Two fixed-rate programs deliberately break the level payment. A <b>graduated payment mortgage</b> starts the payments below the true cost — the shortfall is added to the balance, so it <span class="cloze" data-accept='["negative amortization","negatively amortizes","negative","neg am"]' data-reveal="negative amortization">?</span> — then steps them up on a set schedule. A <b>growth equity mortgage</b> does the reverse: the payments run higher than required, the extra goes straight to principal, and the loan pays off early.`,
            },
          ],
        },
        {
          heading: "owning by contract, and other structures",
          anchor: { file: "forest-rangers-pizza-boxes-transparent.png", caption: "one package", kind: "char" },
          paras: [
            {
              html: `A <b>land contract</b> hands over possession but not the deed — the buyer pays the seller directly and takes title only once the agreed sum is paid; walk away early and the payments are forfeit. A <b>package mortgage</b> collateralizes the land, the dwelling, and the personal property inside it — furniture and appliances — as one appraised bundle. A <b>reduction option mortgage</b> is a fixed-rate loan with a one-time chance to drop the rate without refinancing, for a fee.`,
            },
          ],
          synth: {
            q: "A GPM and a GEM are both fixed-rate. How do their payment schedules move in opposite directions, and what happens to the balance in each?",
            a: "A GPM starts with low payments that don't cover the interest, so the balance grows (negative amortization) before the payments step up. A GEM starts with payments higher than required and the extra goes to principal, so the balance falls faster and the loan pays off early.",
          },
        },
      ],
      review: {
        flashcards: [
          { peg: "vs", topic: "GPM vs GEM", q: "Graduated payment vs growth equity mortgage?", a: "<span class='hl'>GPM</span> — low payments, negative amortization, then step up; <span class='hl'>GEM</span> — high payments, extra to principal, early payoff." },
          { peg: "no deed", topic: "Land contract", q: "What does a buyer get — and not get — under a land contract?", a: "<span class='hl'>Possession, not the deed</span>. Title transfers only when the balance is paid; early default can forfeit the payments made." },
          { peg: "bundle", topic: "Package mortgage", q: "What does a package mortgage's appraisal include beyond the real estate?", a: "The <span class='hl'>personal property</span> inside — appliances and furnishings — appraised with the land and dwelling as one bundle." },
          { peg: "one drop", topic: "ROM", q: "What's the feature of a reduction option mortgage?", a: "A <span class='hl'>one-time rate reduction</span> without a full refinance, usually for a fee." },
        ],
        mcq: [
          {
            q: "Under a land contract, the buyer takes title:",
            opts: ["at closing", "when the agreed balance is fully paid", "after one year of payments", "only if the seller dies"],
            correct: 1,
          },
          {
            q: "A growth equity mortgage's higher-than-required payments go toward:",
            opts: ["an escrow cushion", "principal, so the loan pays off early", "interest only", "a rate buy-down"],
            correct: 1,
          },
        ],
      },
      recap: {
        plainLanguage: "A handful of niche programs change how payments move or how ownership transfers. Two fixed-rate loans break the level payment on purpose — GPM starts low and steps up, GEM runs high and pays off early — while land contracts, package mortgages, and reduction-option mortgages rework the title, the collateral, or the rate.",
        facts: [
          "<span class=\"hl\">GPM</span>: payments start low, negatively amortize, then step up. <span class=\"hl\">GEM</span>: payments run high, extra to principal, early payoff.",
          "A <span class=\"hl\">land contract</span> gives possession but not the deed — title passes only when the balance is paid; default forfeits payments.",
          "A <span class=\"hl\">package mortgage</span> bundles the real property with the personal property inside (appliances, furniture), appraised together.",
          "A <span class=\"hl\">reduction option mortgage</span> allows a one-time rate drop without a full refinance, for a fee.",
        ],
      },
    },
  ],
};

export default section5;

import type { SectionContent } from "@/lib/section";

// Module 6 — Refinances. Recall-gradient reader (cloze / synth / review / recap),
// built from the refinances-section outline. Self-contained: every tested fact is
// taught in the unit's prose before it is tested. Cloze density follows the
// selective-promotion rule: marquee exam numbers are blanked as the first pass.
//
// ⚠️ Human-verify-once before shipping (numbers that change or changed recently):
//   - Limited/no-cash-out cash-back cap: GREATER of 1% or $2,000 (changed Sept 27,
//     2025 from "lesser of 2% or $2,000" — older study guides disagree).
//   - Conventional LTV caps (cash-out ~80%, 75% on 2–4 units; rate-and-term up to
//     95–97%) — confirm against the current Fannie/Freddie eligibility matrix.
//   - FHA Streamline NTB thresholds (0.5-point combined-rate drop is the
//     fixed-to-fixed case; HUD 4000.1 has scenario-specific values).
//   - VA cash-out Type II: equity-extraction over 90% LTV generally ineligible —
//     confirm current rule + common lender overlays.
//   - HOEPA 2026 dollar triggers ($27,592 loan-size threshold, $1,380
//     points-and-fees figure) — re-indexed every year.

const m6Refinances: SectionContent = {
  id: "mlo-refinances",
  title: "Refinances",
  moduleNumber: 6,
  units: [
    {
      id: "refi-basics",
      name: "What a refinance is",
      reg: "A new loan pays off the old one · purchase vs. refinance",
      definitions: [
        { term: "Refinance", def: "A new mortgage on a home you already own, used to pay off the existing mortgage. The old loan ends; the new loan's rate, term, and balance take over." },
        { term: "Purchase-Money Loan", def: "The loan used to buy the home in the first place — the financing that made the purchase happen." },
        { term: "Mortgage", def: "A loan secured by the home: if the borrower stops paying, the lender can force a sale of the property to recover the debt." },
        { term: "Principal", def: "The amount borrowed — the balance the borrower still owes, not counting interest." },
        { term: "Interest", def: "What the lender charges for the use of its money, expressed as a yearly rate on the balance." },
        { term: "Term", def: "How long the borrower has to repay the loan — 30 years and 15 years are the common mortgage terms." },
        { term: "Equity", def: "The part of the home's value the owner actually owns: the home's value minus everything still owed against it." },
        { term: "Payoff Statement", def: "The current servicer's quote of exactly what it takes to retire the loan — the balance plus interest accruing per day — so a new loan can pay off the old one to the penny." },
        { term: "PMI (Private Mortgage Insurance)", def: "Insurance on a conventional loan with a low down payment. It protects the lender, and the borrower pays for it until there's enough equity." },
        { term: "MIP (Mortgage Insurance Premium)", def: "FHA's version of mortgage insurance: an up-front premium plus an annual premium paid monthly." },
        { term: "ARM (Adjustable-Rate Mortgage)", def: "A loan whose rate resets on a schedule after an initial fixed period — the payment can rise or fall with the market." },
        { term: "Fixed-Rate Mortgage", def: "A loan whose rate never changes: the principal-and-interest payment is the same from the first month to the last." },
      ],
      groups: [
        {
          paras: [
            {
              html: `You bought a house three years ago with a mortgage at 7%. Rates have dropped to 5%. A lender writes you a brand-new loan at 5%, and that new loan's money pays off the old 7% loan. Same house, same you — just a new loan with better terms. That swap is a <b>refinance</b>: a new mortgage on a home you already own, used to pay off the one you have. You didn't buy anything; you replaced your loan.`,
            },
            {
              html: `The old loan disappears the day the new one funds — its rate, its term, its balance all retired. From then on only the new loan exists. A refinance replaces your old loan with a <span class="cloze" data-accept='["new","brand-new"]' data-reveal="new">?</span> loan.`,
            },
          ],
        },
        {
          heading: "purchase versus refinance",
          paras: [
            {
              html: `The loan that financed buying the home is a <b>purchase-money loan</b>. A refinance differs in one way that drives almost every rule that follows: in a purchase, you're getting the house; in a refinance, you already have it. And because the home a refinance borrows against is usually the one the borrower lives in, refinances carry protections purchases don't — including a right to cancel the deal after signing.`,
            },
          ],
          synth: {
            q: "In your own words: how is a refinance different from the loan you used to buy a house?",
            a: "A purchase-money loan finances acquiring the home. A refinance is a new loan on a home the borrower already owns, and its money pays off the existing mortgage — the borrower isn't buying anything, they're replacing their loan.",
          },
        },
        {
          heading: "why borrowers refinance",
          paras: [
            {
              html: `Every refinance is chasing something:
              <ul>
                <li><b>A lower rate</b> — less interest paid over the life of the loan.</li>
                <li><b>A lower monthly payment</b> — often by stretching the remaining balance back out over a fresh 30-year term.</li>
                <li><b>A shorter term</b> — a 30-year loan swapped for a 15-year one: a higher payment, but the home is owned sooner and total interest falls.</li>
                <li><b>Out of an ARM, into a fixed rate</b> — trading rate resets for a payment that never moves.</li>
                <li><b>Cash out</b> — borrow more than what's owed and keep the difference in cash.</li>
                <li><b>Dropping mortgage insurance</b> — with enough equity, a new loan can shed PMI or FHA's MIP.</li>
                <li><b>Adding or removing a borrower</b> — a divorce buyout is the classic case.</li>
                <li><b>Changing programs</b> — an FHA loan refinanced into a conventional loan, for example, once the borrower qualifies.</li>
              </ul>`,
            },
          ],
        },
      ],
      review: {
        flashcards: [
          {
            peg: "the swap",
            topic: "Definition",
            q: "What is a refinance?",
            a: "a <span class='hl'>new mortgage on a home you already own</span>, used to pay off the existing loan",
          },
          {
            peg: "own it first",
            topic: "Purchase vs. refi",
            q: "What separates a refinance from a purchase-money loan?",
            a: "in a purchase you're acquiring the home; in a refinance <span class='hl'>you already own it</span> and are replacing the loan",
          },
          {
            peg: "the reasons",
            topic: "Why refinance",
            q: "Name three common reasons borrowers refinance.",
            a: "lower the <span class='hl'>rate</span> or <span class='hl'>payment</span>, shorten the <span class='hl'>term</span>, leave an ARM for a fixed rate, take <span class='hl'>cash out</span>, or drop <span class='hl'>mortgage insurance</span>",
          },
        ],
        mcq: [
          {
            q: "A homeowner replaces her 7% mortgage with a new 5% loan on the same house. This is —",
            opts: [
              "a purchase-money loan",
              "a refinance",
              "a reverse mortgage",
              "a construction loan",
            ],
            correct: 1,
          },
          {
            q: "A borrower five years into a 30-year loan wants to own the home sooner and pay less total interest. Which refinance goal fits?",
            opts: [
              "lower the monthly payment",
              "shorten the term",
              "take cash out",
              "drop mortgage insurance",
            ],
            correct: 1,
          },
        ],
      },
      recap: {
        plainLanguage:
          "A refinance is a new loan that pays off your old one on a home you already own. Borrowers do it to lower the rate or payment, shorten the term, pull out cash, or drop mortgage insurance.",
        facts: [
          "A refinance = a <span class='hl'>new mortgage</span> on a home you <span class='hl'>already own</span>; the new loan pays off the old one.",
          "Purchase = getting the house. Refinance = <span class='hl'>already have the house</span>.",
          "Why borrowers do it: lower <span class='hl'>rate</span>, lower <span class='hl'>payment</span>, shorter <span class='hl'>term</span>, ARM → fixed, <span class='hl'>cash out</span>, drop <span class='hl'>PMI/MIP</span>.",
        ],
      },
    },

    {
      id: "refi-cash-out",
      name: "Rate-and-term vs. cash-out",
      reg: "Loan-to-value · equity · limited cash-out · seasoning",
      definitions: [
        { term: "Rate-and-Term Refinance", def: "A refinance that covers only what's still owed plus closing costs — it changes the rate and/or the term, and the borrower walks away with essentially no cash." },
        { term: "Limited Cash-Out Refinance", def: "Fannie Mae's name for a rate-and-term refinance that allows a small amount of cash back — at most the greater of 1% of the new loan or $2,000. Freddie Mac calls the same product a 'no cash-out' refinance." },
        { term: "Cash-Out Refinance", def: "A refinance larger than the loan it pays off. The borrower converts equity into cash and keeps the difference." },
        { term: "Cash-In Refinance", def: "The opposite of cash-out: the borrower brings money to closing to pay the balance down, usually to reach a lower LTV or shed mortgage insurance." },
        { term: "Equity", def: "The home's value minus everything owed against it — the slice of the house the owner actually owns." },
        { term: "Loan-to-Value (LTV)", def: "The loan balance divided by the home's value, as a percentage. Lower LTV means more of the borrower's own money is in the house." },
        { term: "Combined Loan-to-Value (CLTV)", def: "All loans against the house — first and second liens together — divided by its value." },
        { term: "HCLTV", def: "CLTV computed with a credit line's full limit counted, not just the amount drawn." },
        { term: "Seasoning", def: "How long a loan (or an ownership stake) must exist before a refinance is allowed." },
        { term: "On Title", def: "Listed as a legal owner of the property." },
        { term: "Delayed-Financing Exception", def: "A buyer who paid all cash within the last six months may do a cash-out refinance immediately, within limits — the usual 12-month wait doesn't apply." },
      ],
      groups: [
        {
          paras: [
            {
              html: `Lenders sort every refinance by whether the borrower walks away with cash. A <b>rate-and-term refinance</b> changes the rate or the term and pays the borrower essentially nothing; a <b>cash-out refinance</b> borrows more than what's owed and hands the borrower the difference. A cash-out loan leaves the lender with less cushion, so it lives under stricter limits.`,
            },
          ],
        },
        {
          heading: "equity and loan-to-value",
          anchor: { file: "cash-pyramid-in-glass-display-case-transparent.png", caption: "the equity", kind: "char" },
          paras: [
            {
              html: `<b>Equity</b> is the slice of the home its owner actually owns: the home's value minus what's owed on it. A $400,000 home carrying a $250,000 balance holds $150,000 of equity.`,
            },
            {
              html: `<b>Loan-to-value (LTV)</b> is the lender's view of the same split: the loan balance divided by the home's value. That same home sits at $250,000 ÷ $400,000 = <span class="cloze" data-accept='["62.5%","62.5","62.5 percent"]' data-reveal="62.5%">?</span> LTV. The lower the LTV, the more of the borrower's own money is in the house, and the safer the loan is for the lender.`,
            },
            {
              html: `With a second loan on the house, <b>combined loan-to-value (CLTV)</b> adds every lien together before dividing. <b>HCLTV</b> goes one step further and counts a credit line's full limit, not just what's been drawn.`,
            },
          ],
        },
        {
          heading: "rate-and-term, by its three names",
          paras: [
            {
              html: `A rate-and-term refinance covers the old balance plus closing costs, and nothing more. Fannie Mae calls it a <b>limited cash-out</b> refinance; Freddie Mac calls the same product a <b>no cash-out</b> refinance. Two names, one product. The small cash allowance that gives Fannie's version its name is capped at the greater of 1% of the new loan or $<span class="cloze" data-accept='["2,000","2000","two thousand"]' data-reveal="2,000">?</span>.`,
            },
          ],
        },
        {
          heading: "cash-out",
          paras: [
            {
              html: `A cash-out refinance is bigger than the loan it retires. The new loan pays off the old balance, and the difference — minus closing costs — arrives as cash. The borrower has converted equity into money, and the house now secures a larger debt with a thinner cushion behind it.`,
            },
          ],
        },
        {
          heading: "the LTV ceilings",
          paras: [
            {
              html: `On a conventional loan, a rate-and-term refinance can run up to 95% LTV — even 97% on a one-unit primary residence. A conventional cash-out refinance typically caps at <span class="cloze" data-accept='["80%","80","eighty"]' data-reveal="80%">?</span> LTV, and 75% on two- to four-unit properties. The exact percentages shift with the agencies' eligibility tables; the pattern holds: the more cash pulled out, the lower the ceiling.`,
            },
          ],
          synth: {
            q: "Why do lenders allow a higher LTV on a rate-and-term refinance than on a cash-out?",
            a: "A cash-out refinance pulls equity out of the home, leaving the borrower with less of their own money at stake and the lender with less cushion if the loan defaults. More risk, so the ceiling is lower — about 80% conventional cash-out versus up to 95–97% for rate-and-term.",
          },
        },
        {
          heading: "cash-in",
          paras: [
            {
              html: `A <b>cash-in refinance</b> runs the other direction: the borrower brings money to closing and pays the balance down. The point is usually to land under an LTV threshold — a better rate, or an LTV low enough to drop mortgage insurance.`,
            },
          ],
        },
        {
          heading: "the waiting periods",
          paras: [
            {
              html: `Conventional cash-out comes with seasoning rules. The first mortgage being paid off must be at least <span class="cloze" data-accept='["12","twelve","12 months"]' data-reveal="12">?</span> months old, and at least one borrower must have been on title for at least <span class="cloze" data-accept='["6","six","6 months"]' data-reveal="6">?</span> months. One carve-out: a buyer who paid all cash within the last six months can do a cash-out right away — the <b>delayed-financing exception</b>. The equity in that house is money the buyer just put in, not value they're stripping out.`,
            },
          ],
          synth: {
            q: "A home is worth $400,000 and the borrower owes $250,000. At an 80% LTV cap, about how much cash could a cash-out refinance produce?",
            a: "80% of $400,000 allows a $320,000 new loan. Paying off the $250,000 balance leaves about $70,000 in cash, before closing costs.",
          },
        },
      ],
      review: {
        flashcards: [
          {
            peg: "your slice",
            topic: "Equity",
            q: "What is equity?",
            a: "the home's <span class='hl'>value minus what you owe</span> — the part of the house you own",
          },
          {
            peg: "the formula",
            topic: "LTV",
            q: "How is loan-to-value computed?",
            a: "<span class='hl'>loan balance ÷ home value</span>, as a percentage",
          },
          {
            peg: "two names",
            topic: "Limited cash-out",
            q: "Fannie Mae's 'limited cash-out' is the same product Freddie Mac calls —",
            a: "<span class='hl'>'no cash-out'</span> — cash back capped at the <span class='hl'>greater of 1% or $2,000</span>",
          },
          {
            peg: "the ceilings",
            topic: "LTV caps",
            q: "Conventional LTV ceilings: rate-and-term vs. cash-out?",
            a: "rate-and-term up to <span class='hl'>95–97%</span>; cash-out about <span class='hl'>80%</span> (75% on 2–4 units)",
          },
        ],
        mcq: [
          {
            q: "A borrower refinances her $210,000 balance into a new loan at a lower rate, taking no cash back. This is —",
            opts: [
              "a cash-out refinance",
              "a rate-and-term refinance",
              "a cash-in refinance",
              "delayed financing",
            ],
            correct: 1,
          },
          {
            q: "A conventional cash-out refinance on a single-family primary residence typically caps LTV at —",
            opts: ["70%", "80%", "90%", "97%"],
            correct: 1,
          },
          {
            q: "Home value $400,000, balance $250,000, 80% max LTV. Cash available before closing costs is about —",
            opts: ["$50,000", "$70,000", "$120,000", "$150,000"],
            correct: 1,
          },
        ],
      },
      recap: {
        plainLanguage:
          "Two families: rate-and-term (change the rate or term, little or no cash) and cash-out (borrow more than you owe, keep the difference). LTV — loan divided by value — decides how far a lender will go, and cash-out gets the lower ceiling.",
        facts: [
          "Equity = <span class='hl'>value − what you owe</span>. LTV = <span class='hl'>loan ÷ value</span>.",
          "Fannie's <span class='hl'>limited cash-out</span> = Freddie's <span class='hl'>no cash-out</span>; cash back capped at the <span class='hl'>greater of 1% or $2,000</span>.",
          "Conventional ceilings: rate-and-term up to <span class='hl'>95–97%</span>; cash-out ≈ <span class='hl'>80%</span> (75% on 2–4 units).",
          "Conventional cash-out seasoning: loan <span class='hl'>12 months</span> old, borrower <span class='hl'>6 months</span> on title — with a <span class='hl'>delayed-financing</span> exception for recent all-cash buyers.",
        ],
      },
    },

    {
      id: "refi-streamline",
      name: "Streamline refinances",
      reg: "FHA Streamline · VA IRRRL · USDA Streamlined-Assist · net tangible benefit",
      definitions: [
        { term: "Streamline Refinance", def: "A reduced-documentation refinance for a borrower who already holds a government-backed loan — often no appraisal and no income or credit re-check. Always into the same program: FHA to FHA, VA to VA, USDA to USDA." },
        { term: "Net Tangible Benefit (NTB)", def: "The requirement that a refinance leave the borrower measurably better off — a lower rate, a lower payment, or a more stable loan. Without it, the streamline isn't allowed." },
        { term: "Recoupment", def: "Earning back the closing costs through monthly savings. A VA IRRRL's costs must recoup within 36 months." },
        { term: "FHA Streamline", def: "FHA's reduced-doc refinance of an existing FHA loan: at least 210 days since closing, at least 6 payments made, loan current." },
        { term: "VA IRRRL", def: "The Interest Rate Reduction Refinance Loan — the VA-to-VA streamline. At least 210 days since the first payment due date and 6 consecutive payments; typically no appraisal and no re-underwriting; generally no cash out." },
        { term: "USDA Streamlined-Assist", def: "USDA's streamline: 12 months of on-time payments, no appraisal or credit/income check, and the payment must drop by at least $50 a month." },
        { term: "Funding Fee", def: "The VA's up-front charge on its loans. On an IRRRL it is 0.50% of the loan." },
        { term: "Credit-Qualifying Streamline", def: "An FHA streamline where the lender re-checks income and credit — required in cases like removing a borrower from the loan." },
        { term: "Non-Credit-Qualifying Streamline", def: "An FHA streamline with no income or credit re-verification — the usual kind." },
        { term: "Seasoning", def: "The minimum age or payment history a loan needs before it can be refinanced." },
      ],
      groups: [
        {
          anchor: { file: "jester-checking-stopwatch-transparent.png", caption: "210 days", kind: "char" },
          paras: [
            {
              html: `A borrower who already holds a government-backed loan — FHA, VA, or USDA — and wants a lower rate can refinance with far less paperwork: often no new appraisal, and no re-checking of income or credit. The government already insures or guarantees this borrower's loan, and the new loan must lower the rate or payment, so there is little new risk to verify. Less to verify means faster and cheaper. That is a <b>streamline refinance</b>, and each agency runs its own version — always into the same program it came from: FHA to FHA, VA to VA, USDA to USDA.`,
            },
          ],
          synth: {
            q: "What does a streamline let a borrower skip, and why is that allowed?",
            a: "It skips or reduces the appraisal and the income and credit re-verification. That's allowed because the agency already insures or guarantees the existing loan and the new loan must lower the rate or payment, so the added risk is small.",
          },
        },
        {
          heading: "net tangible benefit",
          paras: [
            {
              html: `The shortcut comes with a test. A streamline is only allowed if it leaves the borrower measurably better off — a lower rate, a lower payment, or a safer loan. That requirement is the <b>net tangible benefit</b>, and it exists to block refinances whose only product is fees.`,
            },
          ],
          synth: {
            q: "What is net tangible benefit, and why does it exist?",
            a: "Proof that the refinance genuinely helps the borrower — a lower rate, a lower payment, or a more stable loan. It exists to stop churning: refinances done over and over just to generate fees.",
          },
        },
        {
          heading: "the FHA Streamline",
          paras: [
            {
              html: `An FHA borrower can streamline once the current FHA loan is at least <span class="cloze" data-accept='["210","210 days","two hundred ten"]' data-reveal="210">?</span> days old and at least <span class="cloze" data-accept='["6","six","6 monthly payments"]' data-reveal="6">?</span> monthly payments have been made, with the loan current. It comes in two flavors: <b>non-credit-qualifying</b> — no income or credit re-check — and <b>credit-qualifying</b>, where the lender re-underwrites (required when, for instance, a borrower comes off the loan). Usually there's no appraisal, and an investment property may <em>only</em> be streamlined without one. For a fixed-to-fixed streamline, the combined rate — note rate plus annual MIP — generally has to drop at least half a percentage point to pass the benefit test.`,
            },
          ],
        },
        {
          heading: "the VA IRRRL",
          paras: [
            {
              html: `The VA's streamline is the <b>Interest Rate Reduction Refinance Loan</b> — the IRRRL, VA to VA only. Seasoning: at least 210 days since the first payment came due, and six consecutive payments made. No appraisal, no income or credit re-verification, and generally no cash out (a small exception covers energy-efficiency improvements). The benefit test has hard numbers here: fixed-to-fixed must cut the rate by at least 0.50%, and the closing costs must be recouped through monthly savings within <span class="cloze" data-accept='["36","thirty-six","36 months"]' data-reveal="36">?</span> months. The funding fee is 0.50% of the loan.`,
            },
          ],
        },
        {
          heading: "the USDA Streamlined-Assist",
          paras: [
            {
              html: `USDA's version asks for <span class="cloze" data-accept='["12","twelve","12 months"]' data-reveal="12">?</span> months of on-time payments and skips the appraisal and the credit and income checks. Its benefit test is a dollar figure: the monthly payment — principal, interest, and the annual fee — must drop by at least $<span class="cloze" data-accept='["50","fifty"]' data-reveal="50">?</span>.`,
            },
          ],
        },
        {
          heading: "the VA cash-out is not a streamline",
          paras: [
            {
              html: `The VA also offers a cash-out refinance, and it is full-documentation: appraisal, underwriting, the works. <b>Type I</b> doesn't exceed the payoff of the loan being refinanced; <b>Type II</b> pulls equity out. Cash-out above 90% LTV is generally ineligible. Only the IRRRL is the light-paperwork VA refinance — assuming every VA refi skips underwriting is a classic exam mistake.`,
            },
          ],
        },
      ],
      review: {
        flashcards: [
          {
            peg: "the shortcut",
            topic: "Streamline",
            q: "What does a streamline refinance usually skip?",
            a: "the <span class='hl'>appraisal</span> and the <span class='hl'>income/credit re-check</span> — same program only (FHA→FHA, VA→VA, USDA→USDA)",
          },
          {
            peg: "210 + 6",
            topic: "Seasoning",
            q: "Seasoning for the FHA Streamline and the VA IRRRL?",
            a: "both: <span class='hl'>210 days</span> and <span class='hl'>6 payments</span>",
          },
          {
            peg: "12 months",
            topic: "Seasoning",
            q: "Seasoning and benefit test for USDA Streamlined-Assist?",
            a: "<span class='hl'>12 months</span> of on-time payments; the payment must drop at least <span class='hl'>$50/month</span>",
          },
          {
            peg: "must help",
            topic: "Net tangible benefit",
            q: "What must every streamline prove?",
            a: "a <span class='hl'>net tangible benefit</span> — a lower rate, lower payment, or safer loan for the borrower",
          },
        ],
        mcq: [
          {
            q: "A borrower with a VA loan wants a lower rate with minimal paperwork. The product is —",
            opts: [
              "an FHA Streamline",
              "the VA IRRRL",
              "a VA Type II cash-out",
              "the USDA Streamlined-Assist",
            ],
            correct: 1,
          },
          {
            q: "An FHA borrower closed five months ago and has made five payments. Can they streamline?",
            opts: [
              "Yes — FHA has no seasoning rule",
              "Yes, but only credit-qualifying",
              "No — the loan needs 210 days and 6 payments",
              "No — FHA loans can't be streamlined",
            ],
            correct: 2,
          },
          {
            q: "Which VA refinance requires a full appraisal and full underwriting?",
            opts: [
              "the IRRRL",
              "the VA cash-out refinance",
              "both",
              "neither",
            ],
            correct: 1,
          },
        ],
      },
      recap: {
        plainLanguage:
          "A streamline is a lighter, faster refinance for borrowers who already hold an FHA, VA, or USDA loan — usually no appraisal and no income or credit re-check — and it must genuinely help the borrower.",
        facts: [
          "FHA Streamline &amp; VA IRRRL seasoning: <span class='hl'>210 days + 6 payments</span>. USDA Streamlined-Assist: <span class='hl'>12 months</span> on time.",
          "Every streamline needs a <span class='hl'>net tangible benefit</span>; IRRRL closing costs must recoup within <span class='hl'>36 months</span>.",
          "USDA test: payment drops at least <span class='hl'>$50/month</span>. IRRRL funding fee: <span class='hl'>0.50%</span>.",
          "VA cash-out is <span class='hl'>not</span> a streamline: full appraisal and underwriting, and over <span class='hl'>90% LTV</span> generally ineligible.",
        ],
      },
    },

    {
      id: "refi-rescission",
      name: "The right to cancel",
      reg: "Right of rescission · Reg Z §1026.23 · TRID",
      definitions: [
        { term: "Right of Rescission", def: "The borrower's right to cancel, within three business days and without penalty, a refinance (or other non-purchase loan) secured by their principal residence." },
        { term: "Principal Residence", def: "The home the borrower actually lives in — not a second home, not an investment property." },
        { term: "Notice of Right to Rescind", def: "The written notice of the cancellation right. The borrower must receive two copies; without them, the rescission clock doesn't start." },
        { term: "Business Day (rescission)", def: "For counting the rescission window: every calendar day except Sundays and federal holidays. Saturdays count." },
        { term: "Loan Estimate", def: "The TRID disclosure of the loan's terms and estimated costs, due within three business days of application." },
        { term: "Closing Disclosure", def: "The TRID disclosure of the final terms and costs, due at least three business days before closing." },
        { term: "Consummation", def: "The moment the borrower becomes legally obligated on the loan — signing day." },
        { term: "Ability-to-Repay (ATR)", def: "The Reg Z requirement that a lender reasonably verify the borrower can repay the loan before making it." },
        { term: "Qualified Mortgage (QM)", def: "A loan meeting Reg Z's safe-harbor standards — no risky features, and the lender is presumed to have met ability-to-repay." },
        { term: "Appraiser Independence", def: "Reg Z's ban on anyone with a stake in the deal — the MLO included — pressuring or influencing an appraiser's value." },
      ],
      groups: [
        {
          anchor: { file: "santa-holding-december-calendar-transparent.png", caption: "count the days", kind: "char" },
          paras: [
            {
              html: `You sign a refinance on the home you live in. That evening, the numbers start to feel wrong. Federal law gives you <span class="cloze" data-accept='["3","three"]' data-reveal="three">?</span> business days to change your mind — cancel the whole deal, no penalty. This cooling-off window is the <b>right of rescission</b>, and it exists because a refinance puts the borrower's own home on the line for a loan they don't strictly need. A purchase can't work this way — the sale would collapse if buyers could unwind it — so the right belongs to refinances.`,
            },
          ],
        },
        {
          heading: "where it applies — and where it doesn't",
          paras: [
            {
              html: `Rescission covers a refinance of the borrower's <b>principal residence</b> — the home they actually live in. It does not cover a purchase. It does not cover a second home or an investment property. The exam circles this line from every direction: a vacation-home refi carries no rescission right, a purchase of any kind carries none, and a refinance of the home you live in always does.`,
            },
          ],
          synth: {
            q: "A borrower buying a vacation home asks when their three-day right to cancel begins. What do you tell them?",
            a: "It doesn't exist. Rescission applies only to refinances of a principal residence — not to purchases of any kind, and not to second homes or investment properties.",
          },
        },
        {
          heading: "starting the clock",
          paras: [
            {
              html: `The clock doesn't start at signing alone. Three things must all happen: the borrower signs the loan contract, receives the Truth-in-Lending disclosure, and receives <span class="cloze" data-accept='["2","two"]' data-reveal="two">?</span> copies of the <b>Notice of Right to Rescind</b>. Day one is the first business day after the last of the three. And if a required disclosure never arrives or is wrong, the window doesn't close on schedule — the right can stretch to as long as <span class="cloze" data-accept='["3 years","three years","3"]' data-reveal="3 years">?</span>.`,
            },
          ],
        },
        {
          heading: "counting the days",
          paras: [
            {
              html: `Rescission counts <b>business days</b> its own way: every calendar day except Sundays and federal <span class="cloze" data-accept='["holidays","federal holidays"]' data-reveal="holidays">?</span>. Saturdays count — the opposite of what "business day" usually means. Sign on a Friday with no holiday in the way, and the three days are Saturday, Monday, and Tuesday: the borrower can cancel until midnight Tuesday.`,
            },
          ],
        },
        {
          heading: "no money moves",
          paras: [
            {
              html: `Until the window closes, nothing funds. The lender can't disburse, and the old loan isn't paid off. One wrinkle: when the borrower's <em>current</em> lender does the refinancing, the right to rescind covers only the new money advanced above the old balance — not the whole loan.`,
            },
          ],
          synth: {
            q: "Why does the law give a rescission right on refinances but not on purchases?",
            a: "A refinancing borrower already owns and lives in the home and is putting it at risk for a loan they don't strictly need, so the law builds in a cooling-off window. A purchase can't be unwound that way — the sale would collapse if buyers could cancel after closing.",
          },
        },
        {
          heading: "the disclosures still run",
          paras: [
            {
              html: `A refinance is still a TRID loan: the borrower gets a <b>Loan Estimate</b> within three business days of applying and a <b>Closing Disclosure</b> at least <span class="cloze" data-accept='["3","three"]' data-reveal="three">?</span> business days before closing. (HELOCs, reverse mortgages, and loans not secured by a dwelling sit outside TRID.)`,
            },
            {
              html: `<b>Ability-to-repay</b> applies too, with one refinance-specific exemption: a lender that already holds a risky loan — an ARM, an interest-only note, a negative-amortization note — may move that borrower into a safer loan with a materially lower payment without the full eight-factor review. That exemption is why streamlines can re-underwrite so lightly. Appraiser-independence rules bar anyone with a stake in the deal — the MLO included — from pressuring the appraiser, and RESPA's kickback ban applies to a refinance the same as to a purchase.`,
            },
          ],
        },
      ],
      review: {
        flashcards: [
          {
            peg: "the window",
            topic: "Rescission",
            q: "What is the right of rescission?",
            a: "<span class='hl'>three business days</span> to cancel, penalty-free, a refinance of a <span class='hl'>principal residence</span>",
          },
          {
            peg: "not these",
            topic: "Coverage",
            q: "Which loans carry NO rescission right?",
            a: "<span class='hl'>purchases</span>, and loans on <span class='hl'>second homes</span> or <span class='hl'>investment properties</span>",
          },
          {
            peg: "three triggers",
            topic: "The clock",
            q: "What three events start the rescission clock?",
            a: "<span class='hl'>signing</span>, receiving the <span class='hl'>TIL disclosure</span>, and receiving <span class='hl'>two copies</span> of the Notice of Right to Rescind — day one is the next business day",
          },
          {
            peg: "Saturdays count",
            topic: "Day counting",
            q: "Rescission 'business days' exclude only —",
            a: "<span class='hl'>Sundays and federal holidays</span> — Saturdays count",
          },
        ],
        mcq: [
          {
            q: "Which borrower has a three-day right to cancel?",
            opts: [
              "buying a first home",
              "refinancing the home they live in",
              "refinancing a rental property",
              "buying a vacation home",
            ],
            correct: 1,
          },
          {
            q: "A rescission clock is triggered on Friday, with no holidays that week. The borrower can cancel until midnight —",
            opts: ["Monday", "Tuesday", "Wednesday", "Saturday"],
            correct: 1,
          },
          {
            q: "A borrower refinances with her current lender, borrowing $40,000 above her old balance. Rescission covers —",
            opts: [
              "the whole new loan",
              "only the $40,000 of new money",
              "only the old balance",
              "nothing — same-lender refis can't be rescinded",
            ],
            correct: 1,
          },
        ],
      },
      recap: {
        plainLanguage:
          "Refinancing the home you live in comes with a three-business-day right to cancel. It never applies to purchases or to second and investment homes, and no money moves until the window closes.",
        facts: [
          "Rescission: <span class='hl'>3 business days</span>, refinance of a <span class='hl'>principal residence</span> only — never purchases, second homes, or investment property.",
          "Clock starts the day after the last of: <span class='hl'>signing</span>, the <span class='hl'>TIL disclosure</span>, and <span class='hl'>two copies</span> of the Notice of Right to Rescind.",
          "Count every day except <span class='hl'>Sundays and federal holidays</span> — Saturdays count. Missing/wrong disclosures stretch the right to <span class='hl'>3 years</span>.",
          "Nothing funds until rescission expires. Same-lender refi: only the <span class='hl'>new money</span> is rescindable.",
          "TRID still applies: Loan Estimate in <span class='hl'>3 business days</span>, Closing Disclosure <span class='hl'>3 business days</span> before closing.",
        ],
      },
    },

    {
      id: "refi-predatory",
      name: "Predatory refinancing",
      reg: "Loan flipping · equity stripping · HOEPA §32",
      definitions: [
        { term: "Loan Flipping (Churning)", def: "Refinancing a borrower repeatedly in a short period with little or no real benefit, generating fees each round and draining equity." },
        { term: "Equity Stripping", def: "Lending against the home's equity rather than the borrower's ability to repay, so that fees or foreclosure transfer the equity from borrower to lender." },
        { term: "Fee Packing", def: "Rolling excessive or junk fees — including products like single-premium credit insurance — into the loan balance where the borrower barely sees them." },
        { term: "HOEPA", def: "The Home Ownership and Equity Protection Act — TILA §32. It flags 'high-cost mortgages' and attaches extra protections and bans. It covers refinances and home-equity loans, generally not ordinary purchases." },
        { term: "High-Cost Mortgage", def: "A loan that crosses any HOEPA tripwire — the APR trigger, the points-and-fees trigger, or the prepayment-penalty trigger." },
        { term: "Average Prime Offer Rate (APOR)", def: "A published benchmark of rates offered to well-qualified borrowers. HOEPA's rate trigger measures a loan's APR against it." },
        { term: "Points and Fees", def: "The up-front charges HOEPA totals against its threshold — origination charges, most fees, and certain insurance premiums." },
        { term: "Prepayment Penalty", def: "A charge for paying a loan off early. On a high-cost analysis, penalties that run past 36 months or exceed 2% of the amount prepaid trip the trigger." },
        { term: "Homeownership Counseling", def: "Counseling from an approved agency that a borrower must receive before closing a high-cost mortgage." },
      ],
      groups: [
        {
          anchor: { file: "burning-stack-of-cash-transparent.png", caption: "equity stripped", kind: "char" },
          paras: [
            {
              html: `Every classic refinance abuse targets the same asset: the equity a homeowner has built up. The rules from the earlier units — the benefit test, the cancellation window — were written against the practices in this one.`,
            },
          ],
        },
        {
          heading: "loan flipping",
          paras: [
            {
              html: `The flagship abuse is loan <span class="cloze" data-accept='["flipping","churning"]' data-reveal="flipping">?</span>, also called churning: refinancing a borrower over and over in a short stretch, each round delivering little or no real benefit, each round rolling new points and fees into the balance. Round by round, the fees eat the equity. Net-tangible-benefit rules exist to block exactly this.`,
            },
          ],
          synth: {
            q: "What is loan flipping, and which refinance rule is designed to stop it?",
            a: "Repeatedly refinancing a borrower with no real benefit, so each round generates fees and drains equity. Net tangible benefit requirements block it by demanding that every refinance leave the borrower measurably better off.",
          },
        },
        {
          heading: "equity stripping and fee packing",
          paras: [
            {
              html: `<b>Equity stripping</b> is lending against the home's equity instead of the borrower's ability to repay — the loan is built around what can be taken if it fails, not around whether it will succeed. <b>Fee packing</b> hides the take: excessive or junk charges — and products like single-premium credit insurance — rolled into the balance where the borrower barely notices them.`,
            },
          ],
        },
        {
          heading: "HOEPA and the high-cost line",
          paras: [
            {
              html: `<b>HOEPA</b> — the Home Ownership and Equity Protection Act, TILA's §32 — draws hard lines around expensive loans. Cross any one and the loan is a <b>high-cost mortgage</b>. HOEPA covers refinances and home-equity loans, generally not ordinary purchase loans. The three tripwires:
              <ul>
                <li><b>Rate</b> — the APR exceeds the Average Prime Offer Rate by more than <span class="cloze" data-accept='["6.5","6.5 points","six and a half"]' data-reveal="6.5">?</span> points on a first lien (8.5 points on a junior lien).</li>
                <li><b>Points and fees</b> — more than 5% of the loan, for loans of $27,592 or more; below that, the lesser of 8% or $1,380. (2026 figures — the dollar amounts re-index every year.)</li>
                <li><b>Prepayment penalty</b> — one that can be charged more than 36 months out, or that exceeds 2% of the amount prepaid.</li>
              </ul>`,
            },
          ],
        },
        {
          heading: "what high-cost sets off",
          paras: [
            {
              html: `A high-cost loan brings special advance disclosures, a <b>homeownership-counseling</b> requirement before closing, and bans on the terms that made these loans traps — balloon payments and most prepayment penalties among them.`,
            },
          ],
        },
      ],
      review: {
        flashcards: [
          {
            peg: "the churn",
            topic: "Loan flipping",
            q: "What is loan flipping?",
            a: "repeated refinancing with <span class='hl'>no real benefit</span>, each round generating fees that <span class='hl'>strip equity</span>",
          },
          {
            peg: "the take",
            topic: "Equity stripping",
            q: "What is equity stripping?",
            a: "lending against the home's <span class='hl'>equity</span> rather than the borrower's <span class='hl'>ability to repay</span>",
          },
          {
            peg: "not purchases",
            topic: "HOEPA coverage",
            q: "Which loans does HOEPA cover?",
            a: "<span class='hl'>refinances and home-equity loans</span> — generally not ordinary purchase loans",
          },
        ],
        mcq: [
          {
            q: "A lender refinances the same borrower three times in two years, each time rolling new fees into the balance with no rate improvement. This is —",
            opts: [
              "fee packing",
              "loan flipping",
              "equity stripping",
              "a cash-in refinance",
            ],
            correct: 1,
          },
          {
            q: "A first-lien loan becomes HOEPA high-cost when its APR exceeds the APOR by more than —",
            opts: ["1.5 points", "3.5 points", "6.5 points", "8.5 points"],
            correct: 2,
          },
        ],
      },
      recap: {
        plainLanguage:
          "Predatory refinancing means loan flipping (churning with no benefit), equity stripping, and fee packing. HOEPA flags high-cost loans — refinances and home-equity loans, not purchases — and attaches counseling requirements and bans.",
        facts: [
          "<span class='hl'>Loan flipping</span> = repeat refis with no benefit; blocked by <span class='hl'>net tangible benefit</span> rules.",
          "HOEPA covers <span class='hl'>refinances and home-equity loans</span>, not standard purchases.",
          "Rate trigger: APR &gt; APOR + <span class='hl'>6.5 points</span> (first lien) / <span class='hl'>8.5</span> (junior). Points-and-fees trigger: <span class='hl'>5%</span> (dollar figures re-index yearly).",
          "High-cost brings <span class='hl'>homeownership counseling</span> plus bans on balloon payments and most prepayment penalties.",
        ],
      },
    },

    {
      id: "refi-process",
      name: "The refinance process",
      reg: "Application → payoff → underwriting → rescission → funding",
      definitions: [
        { term: "Payoff Statement", def: "The current servicer's quote of exactly what retires the loan — the balance plus per-diem interest through the expected payoff date." },
        { term: "Per-Diem Interest", def: "The interest a loan accrues per day. A payoff quote includes it through the day the money actually arrives." },
        { term: "Underwriting", def: "The lender's review of the whole file — LTV, debt-to-income, reserves, seasoning, and on a refinance, the net tangible benefit." },
        { term: "Disbursement", def: "The release of the loan funds — paying off the old loan and sending any cash-out to the borrower." },
        { term: "Funding", def: "The moment the new lender's money actually moves. On a primary-residence refinance it waits for rescission to expire." },
        { term: "Consummation", def: "When the borrower signs and becomes legally obligated. On a refinance, funding comes later — after the rescission window." },
      ],
      groups: [
        {
          paras: [
            {
              html: `A refinance file moves through the same stations as a purchase, with two additions: paying off the old loan, and — on a primary residence — a waiting period after signing. In order:
              <ol>
                <li><b>Application</b> — the 1003/URLA. Taking it starts the Loan Estimate's three-business-day clock.</li>
                <li><b>Documentation</b> — income, assets, credit; reduced or skipped on a streamline.</li>
                <li><b>Payoff statement</b> — ordered from the current servicer so the new loan is sized to retire the old one exactly.</li>
                <li><b>Appraisal</b> — ordered under appraiser-independence rules; often waived on a streamline.</li>
                <li><b>Underwriting</b> — LTV and CLTV, debt-to-income, reserves, seasoning, and the net tangible benefit; ability-to-repay or its refinance exemption.</li>
                <li><b>Closing Disclosure</b> — in the borrower's hands at least three business days before closing.</li>
                <li><b>Rescission period</b> — primary residence only: three business days in which the borrower can still cancel. Nothing funds.</li>
                <li><b>Funding</b> — the new lender disburses, the old loan is paid off, and any cash-out goes to the borrower.</li>
              </ol>`,
            },
          ],
        },
        {
          heading: "the payoff statement",
          anchor: { file: "mime-long-receipt-transparent.png", caption: "the payoff", kind: "char" },
          paras: [
            {
              html: `The balance on the borrower's monthly statement is not the payoff. Interest accrues daily, so the servicer quotes the balance plus <b>per-diem interest</b> — the per-day charge — through the expected funding date. A closing that slips past that date needs an updated quote, or the old loan is left a few days' interest short of paid off.`,
            },
          ],
        },
        {
          heading: "where the cancel window sits",
          paras: [
            {
              html: `Between closing and funding. The borrower signs, then the <span class="cloze" data-accept='["rescission","recission","rescission period"]' data-reveal="rescission">?</span> period runs; only when it expires does money move and the old loan get paid off. On an investment property or second home there's no window — the loan can fund at once.`,
            },
          ],
          synth: {
            q: "Put these in order — closing, funding, rescission period, underwriting — and say where the borrower can still cancel.",
            a: "Underwriting, then closing, then the rescission period, then funding. The borrower can still cancel during the rescission period — after closing but before any money moves.",
          },
        },
      ],
      review: {
        flashcards: [
          {
            peg: "plus per-diem",
            topic: "Payoff",
            q: "Why isn't the monthly-statement balance the payoff amount?",
            a: "interest accrues daily — the payoff adds <span class='hl'>per-diem interest</span> through the funding date",
          },
          {
            peg: "the order",
            topic: "Process",
            q: "Order the refinance file's stations.",
            a: "application → docs → <span class='hl'>payoff statement</span> → appraisal → underwriting → Closing Disclosure → <span class='hl'>rescission</span> → funding",
          },
          {
            peg: "last exit",
            topic: "Rescission",
            q: "Where in the process can the borrower still walk away?",
            a: "during the <span class='hl'>rescission period</span> — after signing, before funding (primary residence only)",
          },
        ],
        mcq: [
          {
            q: "On a primary-residence refinance, the old loan is paid off —",
            opts: [
              "at signing",
              "when the Closing Disclosure is delivered",
              "after the rescission period expires and the loan funds",
              "when underwriting approves the file",
            ],
            correct: 2,
          },
          {
            q: "A borrower signs a refinance on her own home on Monday. When can she no longer cancel?",
            opts: [
              "immediately — signing is final",
              "after the three-business-day rescission window expires",
              "after the appraisal is delivered",
              "after the first payment on the new loan",
            ],
            correct: 1,
          },
        ],
      },
      recap: {
        plainLanguage:
          "A refinance runs application → documentation → payoff statement → appraisal → underwriting → Closing Disclosure → rescission window → funding. On a primary residence, no money moves until the three-day cancel window expires.",
        facts: [
          "The payoff = balance + <span class='hl'>per-diem interest</span> through the funding date — not the statement balance.",
          "Underwriting checks LTV, DTI, reserves, seasoning, and the <span class='hl'>net tangible benefit</span>.",
          "Order at the end: closing → <span class='hl'>rescission</span> → funding. The borrower's last exit is the rescission window.",
        ],
      },
    },
  ],
};

export default m6Refinances;

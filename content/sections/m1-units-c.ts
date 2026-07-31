import type { SectionUnit } from '@/lib/section';

// Module 1 — Introduction to Mortgage Lending (units 7–9).
// Recall-gradient shape (cloze / synth / review). Self-contained: every tested fact is
// taught in the unit's narrative prose before it is tested. Facts may recur across tiers
// (v6.0 retired "never tested twice") provided each appearance varies the ask.
// Standard, universally-true US mortgage facts only.

const unitsC: SectionUnit[] = [
  {
    "id": "what-makes-loans-differ",
    "name": "What makes loans differ",
    "reg": "The five axes that tell one mortgage from another",
    "definitions": [
      { "term": "Fixed-Rate Mortgage", "def": "A loan whose interest rate is locked for the entire term, so the principal-and-interest payment never changes." },
      { "term": "Adjustable-Rate Mortgage (ARM)", "def": "A loan whose interest rate can move over time, tied to a market index, so the payment can rise or fall." },
      { "term": "Conventional Loan", "def": "A mortgage not insured or guaranteed by a government agency." },
      { "term": "Government Loan", "def": "A mortgage insured or guaranteed by a federal agency — FHA, VA, or USDA." },
      { "term": "Conforming Loan", "def": "A loan that meets Fannie Mae and Freddie Mac standards, including a maximum loan amount (the conforming loan limit)." },
      { "term": "Jumbo Loan", "def": "A loan larger than the conforming loan limit, so Fannie Mae and Freddie Mac won't buy it." },
      { "term": "Lien Position", "def": "The order in which liens are repaid from a property — a first lien is paid before a second lien." },
      { "term": "Refinance", "def": "A new loan that replaces an existing mortgage on a property the borrower already owns." }
    ],
    "groups": [
      {
        "paras": [
          {
            "html": "Every mortgage looks unique, but the differences come down to a handful of axes. Once you know the axes, any loan is easy to place. (The products themselves are taught in Module 5.)",
            "spoken": "Every mortgage looks unique, but the differences come down to a handful of axes. Learn the axes and any loan you meet is easy to place — including ones that haven't been invented yet. The products themselves are taught in Module Five."
          }
        ]
      },
      {
        "heading": "how the rate behaves",
        "paras": [
          {
            "html": "The first axis is how the interest rate behaves. A <b>fixed-rate mortgage</b> locks the rate for the <span class=\"cloze\" data-accept='[\"whole term\", \"the whole term\", \"term\", \"entire term\", \"full term\", \"life of the loan\"]' data-reveal=\"whole term\">?</span> — the principal-and-interest payment is the same in year one and year thirty. An <b>adjustable-rate mortgage</b> (<b>ARM</b>) ties the rate to a market <span class=\"cloze\" data-accept='[\"index\", \"market index\", \"a market index\", \"the index\"]' data-reveal=\"index\">?</span>, so it can move, and the payment moves with it. A loan whose rate never changes is fixed; one whose rate can move is adjustable.",
            "spoken": "The first axis is how the interest rate behaves. A fixed-rate mortgage locks the rate for the whole term — the principal-and-interest payment is the same in year one and in year thirty. An adjustable-rate mortgage, an arm, ties the rate to a market index, so it can move, and the payment moves with it. A loan whose rate never changes is fixed. One whose rate can move is adjustable."
          }
        ]
      },
      {
        "heading": "who stands behind it, and how big",
        "paras": [
          {
            "html": "The next axis is whether a government agency insures or guarantees the loan. A <b>conventional loan</b> is not insured or guaranteed by any <span class=\"cloze\" data-accept='[\"government agency\", \"a government agency\", \"federal agency\", \"the government\", \"government\"]' data-reveal=\"government agency\">?</span> — the lender and the secondary market carry the risk. A <b>government loan</b> is insured or guaranteed by a federal agency: the <b>FHA</b>, the <b>VA</b>, or the <b>USDA</b>. A separate axis is size. A <b>conforming loan</b> meets Fannie Mae and Freddie Mac standards, including a maximum dollar amount called the <span class=\"cloze\" data-accept='[\"conforming loan limit\", \"loan limit\", \"conforming limit\", \"the conforming loan limit\"]' data-reveal=\"conforming loan limit\">?</span>; a <b><span class=\"cloze\" data-accept='[\"jumbo\", \"jumbo loan\", \"a jumbo loan\", \"non-conforming\"]' data-reveal=\"jumbo\">?</span> loan</b> exceeds that limit, so those two buyers won't purchase it. Two different questions, easy to conflate: conforming-versus-jumbo is about the loan amount, conventional-versus-government is about who insures or guarantees it.",
            "spoken": "The next axis is whether a government agency insures or guarantees the loan. A conventional loan is not insured or guaranteed by any government agency — the lender and the secondary market carry that risk themselves. A government loan is insured or guaranteed by a federal agency: the F-H-A, the V-A, or the U-S-D-A. A separate axis is size. A conforming loan meets Fannie Mae and Freddie Mac standards, including a maximum dollar amount called the conforming loan limit. A jumbo loan exceeds that limit, so those two buyers won't purchase it. These are two different questions and they get conflated constantly. Conforming versus jumbo is about the loan amount. Conventional versus government is about who insures or guarantees it. A single loan sits on both axes at the same time."
          }
        ],
        "synth": {
          "q": "A conventional loan and a jumbo loan describe two different things. What does each axis actually measure?",
          "a": "Conventional versus government measures who backs the loan — a conventional loan has no federal insurance or guarantee, while a government loan is insured or guaranteed by the FHA, VA, or USDA. Conforming versus jumbo measures the loan amount — a conforming loan fits within Fannie Mae and Freddie Mac limits, while a jumbo loan exceeds the conforming loan limit. A single loan sits on both axes at once."
        }
      },
      {
        "heading": "lien position and purpose",
        "paras": [
          {
            "html": "Two axes remain. <b>Lien position</b> is the order of repayment if the property is sold or foreclosed: a <b>first lien</b> gets paid before anything else; a <b>second lien</b> — like a home-equity loan — sits behind it and is <span class=\"cloze\" data-accept='[\"riskier\", \"more risky\", \"higher risk\", \"riskier for the lender\", \"more risk\"]' data-reveal=\"riskier\">?</span> for the lender. The last axis is purpose. A <b>purchase</b> loan buys a home the borrower doesn't yet own; a <b><span class=\"cloze\" data-accept='[\"refinance\", \"a refinance\", \"refi\", \"refinancing\"]' data-reveal=\"refinance\">?</span></b> replaces a mortgage on a home they already have — purchase versus refinance.",
            "spoken": "Two axes remain. Lien position is the order of repayment if the property is sold or foreclosed: a first lien gets paid before anything else, and a second lien — a home-equity loan, say — sits behind it, which makes it riskier for the lender. That's why a second lien almost always carries a higher rate. Nothing about the borrower changed. Only the position in line did. The last axis is purpose. A purchase loan buys a home the borrower doesn't own yet. A refinance replaces a mortgage on a home they already have."
          }
        ]
      }
    ],
    "review": {
      "flashcards": [
        {
          "peg": "locked vs. moving",
          "topic": "Rate type",
          "q": "What is the core difference between a fixed-rate loan and an ARM?",
          "a": "a <span class='hl'>fixed</span> rate stays the same for the whole term; an <span class='hl'>ARM</span>'s rate can move with a market index"
        },
        {
          "peg": "who insures it",
          "topic": "Conventional vs. government",
          "q": "Which three agencies back a 'government' loan?",
          "a": "the <span class='hl'>FHA</span>, the <span class='hl'>VA</span>, and the <span class='hl'>USDA</span>"
        },
        {
          "peg": "over the limit",
          "topic": "Conforming vs. jumbo",
          "q": "What makes a loan 'jumbo'?",
          "a": "it exceeds the <span class='hl'>conforming loan limit</span>, so Fannie Mae and Freddie Mac won't buy it"
        },
        {
          "peg": "paid first",
          "topic": "Lien position",
          "q": "Which lien gets repaid before the other?",
          "a": "the <span class='hl'>first lien</span> is paid before a second lien"
        }
      ],
      "mcq": [
        {
          "q": "A loan whose interest rate is tied to a market index and can change over time is —",
          "opts": [
            "a fixed-rate mortgage",
            "an adjustable-rate mortgage (ARM)",
            "a conforming loan",
            "a first lien"
          ],
          "correct": 1
        },
        {
          "q": "The conventional-versus-government axis is about —",
          "opts": [
            "the size of the loan",
            "whether a federal agency insures or guarantees the loan",
            "the order liens are repaid",
            "whether it's a purchase or a refinance"
          ],
          "correct": 1
        },
        {
          "q": "A refinance is best described as a loan that —",
          "opts": [
            "buys a home the borrower does not yet own",
            "replaces an existing mortgage on a home the borrower already owns",
            "must be a second lien",
            "is always government-backed"
          ],
          "correct": 1
        },
        {
          "q": "A home-equity loan that sits behind the main mortgage is an example of a —",
          "opts": [
            "first lien",
            "second lien",
            "jumbo loan",
            "conforming loan"
          ],
          "correct": 1
        }
      ]
    },
    "recap": {
      "plainLanguage": "Any mortgage can be placed along five axes: how the rate behaves (fixed vs. adjustable), who backs it (conventional vs. government), how big it is (conforming vs. jumbo), where it sits in line for repayment (first vs. second lien), and why it exists (purchase vs. refinance). This is just the map — Module 5 teaches the products themselves.",
      "facts": [
        "Fixed-rate = same payment for the whole term; an <span class='hl'>ARM</span>'s rate moves with a market index.",
        "Government loans are backed by the <span class='hl'>FHA</span>, <span class='hl'>VA</span>, or <span class='hl'>USDA</span>; conventional loans have no government backing.",
        "A <span class='hl'>jumbo</span> loan exceeds the conforming loan limit set for Fannie Mae and Freddie Mac.",
        "A <span class='hl'>first lien</span> is repaid before a second lien.",
        "A purchase loan buys a new home; a <span class='hl'>refinance</span> replaces a loan on a home already owned."
      ]
    }
  },
  {
    "id": "price-of-a-loan",
    "name": "The price of a loan",
    "reg": "The numbers that decide what a mortgage costs",
    "definitions": [
      { "term": "Interest Rate", "def": "The note rate — the yearly cost of borrowing the principal, expressed as a percentage." },
      { "term": "Annual Percentage Rate (APR)", "def": "A yearly cost figure that adds certain lender fees and financing costs to the interest rate, so it reflects the true cost of the loan." },
      { "term": "Points", "def": "Fees paid to the lender at closing, each point equal to 1% of the loan amount; discount points buy down the interest rate." },
      { "term": "Loan-to-Value (LTV)", "def": "The loan amount divided by the property's value, expressed as a percentage." },
      { "term": "Debt-to-Income (DTI)", "def": "A borrower's monthly debt payments divided by gross monthly income, expressed as a percentage." },
      { "term": "Credit Score", "def": "A number summarizing a borrower's credit history that lenders use to gauge the risk of lending to them." },
      { "term": "Private Mortgage Insurance (PMI)", "def": "Insurance a borrower pays on a conventional loan, typically required when the down payment is below 20%." },
      { "term": "Mortgage Insurance Premium (MIP)", "def": "The mortgage insurance charged on an FHA loan." }
    ],
    "groups": [
      {
        "anchor": { "file": "mime-long-receipt-transparent.png", "caption": "the price", "kind": "char" },
        "paras": [
          {
            "html": "A borrower doesn't qualify for a loan in the abstract — they qualify at a price, set by a small set of numbers, each one a lever on what the loan costs or whether it's approved.",
            "spoken": "A borrower doesn't qualify for a loan in the abstract. They qualify at a price, and that price is set by a small set of numbers — each one a lever on what the loan costs, or on whether it gets approved at all."
          }
        ]
      },
      {
        "heading": "rate versus APR",
        "paras": [
          {
            "html": "Two percentages describe a loan's cost, and they're not the same. The <b>interest rate</b> (or <span class=\"cloze\" data-accept='[\"note rate\", \"the note rate\", \"nominal rate\", \"contract rate\"]' data-reveal=\"note rate\">?</span>) is the yearly cost of borrowing the principal by itself. The <b>annual percentage rate</b> (<b>APR</b>) folds certain lender fees and financing costs on top of that rate, so it shows the fuller cost. Because it includes those fees, the APR is always <b><span class=\"cloze\" data-accept='[\"equal to or higher than\", \"equal or higher\", \"higher\", \"at least as high\", \"equal to or greater than\", \"the same or higher\", \"equal or greater\", \"greater\"]' data-reveal=\"equal to or higher than\">?</span></b> the note rate — never lower. The note rate sets the monthly payment; the <span class=\"cloze\" data-accept='[\"APR\",\"annual percentage rate\"]' data-reveal=\"APR\">?</span>, running at least as high, is the number for comparing offers.",
            "spoken": "Two percentages describe a loan's cost, and they are not the same thing. The interest rate — also called the note rate — is the yearly cost of borrowing the principal, by itself. The annual percentage rate, the A-P-R, folds certain lender fees and financing costs on top of that rate, so it shows the fuller cost. And because it includes those fees, the A-P-R is always equal to or higher than the note rate. Never lower. If you ever compute an A-P-R below the note rate, you've made an arithmetic error. The note rate sets the monthly payment. The A-P-R, running at least as high, is the number for comparing offers."
          }
        ],
        "synth": {
          "q": "Why is a loan's APR always at least as high as its note interest rate?",
          "a": "The interest rate reflects only the cost of borrowing the principal. The APR adds certain lender fees and financing costs on top of that rate, so it captures a fuller cost of the loan. Because those fees can only add to the figure, the APR is always equal to or higher than the note rate — never below it."
        }
      },
      {
        "heading": "points",
        "paras": [
          {
            "html": "Price can also be paid up front. <b>Points</b> are fees paid to the lender at closing; one point equals <b><span class=\"cloze\" data-accept='[\"1\", \"1%\", \"one percent\", \"one\", \"1 percent\", \"1 pct\"]' data-reveal=\"1%\">?</span> of the loan amount</b> — on a $300,000 loan, one point is <span class=\"cloze\" data-accept='[\"3000\", \"3,000\", \"$3,000\", \"$3000\", \"three thousand\", \"three thousand dollars\"]' data-reveal=\"$3,000\">?</span>. Discount points <b><span class=\"cloze\" data-accept='[\"buy down\", \"buydown\", \"buy-down\", \"buy down the rate\", \"lower\", \"reduce\"]' data-reveal=\"buy down\">?</span> the interest rate</b>, trading cash today for a lower rate, and a lower payment, over the life of the loan.",
            "spoken": "Price can also be paid up front. Points are fees paid to the lender at closing, and one point equals one percent of the loan amount. On a three hundred thousand dollar loan, one point is three thousand dollars. Discount points buy down the interest rate — trading cash today for a lower rate, and a lower payment, over the life of the loan. Whether that's a good trade depends entirely on how long the borrower keeps the loan, and that is a conversation you will have over and over in this job."
          }
        ]
      },
      {
        "heading": "the qualifying ratios",
        "paras": [
          {
            "html": "Much of a loan's risk comes down to two ratios. <b>Loan-to-value</b> is the loan amount divided by the property's value — a $180,000 loan on a $200,000 home is a <span class=\"cloze\" data-accept='[\"90\", \"90%\", \"ninety\", \"ninety percent\", \"90 percent\"]' data-reveal=\"90%\">?</span> <span class=\"cloze\" data-accept='[\"LTV\",\"loan-to-value\",\"loan to value\"]' data-reveal=\"LTV\">?</span>; a higher ratio means less borrower equity and more lender risk. <b>Debt-to-income</b> (<b>DTI</b>) is total monthly debt payments divided by <span class=\"cloze\" data-accept='[\"gross monthly income\", \"gross income\", \"gross\", \"monthly gross income\", \"gross monthly\", \"pre-tax income\"]' data-reveal=\"gross monthly income\">?</span>; a lower DTI means more room to absorb the new payment. Alongside them, the <b>credit score</b> is a single number summarizing credit history that lenders read as a measure of risk.",
            "spoken": "Much of a loan's risk comes down to two ratios. Loan-to-value is the loan amount divided by the property's value — so a hundred and eighty thousand dollar loan on a two hundred thousand dollar home is a ninety percent L-T-V. A higher ratio means less borrower equity and more lender risk. Debt-to-income, D-T-I, is total monthly debt payments divided by gross monthly income. Gross. Not take-home. That one word is worth points on the exam. A lower D-T-I means more room to absorb the new payment. And alongside both of them, the credit score is a single number summarizing credit history that lenders read as a measure of risk."
          }
        ],
        "synth": {
          "q": "What do LTV and DTI each measure, and how are they calculated?",
          "a": "LTV (loan-to-value) is the loan amount divided by the property's value — it measures how much equity the borrower has, so a higher LTV means more lender risk. DTI (debt-to-income) is total monthly debt payments divided by gross monthly income — it measures whether the borrower can absorb the payment, so a lower DTI is safer. Both are expressed as percentages."
        }
      },
      {
        "heading": "mortgage insurance: PMI vs. MIP",
        "paras": [
          {
            "html": "When a borrower puts little down, the lender protects itself with mortgage insurance — and the name depends on the loan type. On a <b>conventional</b> loan it's <b>private mortgage insurance</b> (<b>PMI</b>), typically required when the down payment is below <b><span class=\"cloze\" data-accept='[\"20\", \"20%\", \"twenty\", \"twenty percent\", \"20 percent\"]' data-reveal=\"20%\">?</span></b> (an LTV above <span class=\"cloze\" data-accept='[\"80\", \"80%\", \"eighty\", \"eighty percent\", \"80 percent\"]' data-reveal=\"80%\">?</span>). On an <b>FHA</b> loan the equivalent charge is the <b>mortgage insurance premium</b> (<b><span class=\"cloze\" data-accept='[\"mip\", \"mortgage insurance premium\", \"m.i.p.\"]' data-reveal=\"MIP\">?</span></b>). PMI applies to conventional loans, MIP to FHA loans.",
            "spoken": "When a borrower puts little down, the lender protects itself with mortgage insurance — and the name of that charge depends on the loan type. On a conventional loan it's private mortgage insurance, P-M-I, typically required when the down payment is below twenty percent — which is the same thing as an L-T-V above eighty percent. Two ways of stating one fact, and the exam will use both. On an F-H-A loan the equivalent charge is the mortgage insurance premium. P-M-I goes with conventional. The mortgage insurance premium goes with F-H-A."
          }
        ]
      }
    ],
    "review": {
      "flashcards": [
        {
          "peg": "fees folded in",
          "topic": "Rate vs. APR",
          "q": "What does the APR include that the plain interest rate doesn't?",
          "a": "certain <span class='hl'>lender fees and financing costs</span> on top of the note rate"
        },
        {
          "peg": "one percent",
          "topic": "Points",
          "q": "How much is one point, and what do discount points do?",
          "a": "one point = <span class='hl'>1% of the loan amount</span>; discount points <span class='hl'>buy down the rate</span>"
        },
        {
          "peg": "debt over income",
          "topic": "DTI",
          "q": "How is debt-to-income (DTI) calculated?",
          "a": "monthly <span class='hl'>debt payments ÷ gross monthly income</span>"
        },
        {
          "peg": "two names",
          "topic": "Mortgage insurance",
          "q": "Which mortgage insurance goes with a conventional loan, and which with FHA?",
          "a": "<span class='hl'>PMI</span> on conventional loans; <span class='hl'>MIP</span> on FHA loans"
        }
      ],
      "mcq": [
        {
          "q": "Compared with a loan's note interest rate, its APR is —",
          "opts": [
            "always lower",
            "always equal to or higher, because it adds fees",
            "unrelated to the rate",
            "the same only on ARMs"
          ],
          "correct": 1
        },
        {
          "q": "On a $250,000 loan, one point equals —",
          "opts": [
            "$250",
            "$2,500",
            "$25,000",
            "1% of the home's value, not the loan"
          ],
          "correct": 1
        },
        {
          "q": "Loan-to-value (LTV) is calculated as —",
          "opts": [
            "monthly debt ÷ monthly income",
            "the loan amount ÷ the property's value",
            "the down payment ÷ the loan amount",
            "the interest rate ÷ the APR"
          ],
          "correct": 1
        },
        {
          "q": "Private mortgage insurance (PMI) on a conventional loan is typically required when —",
          "opts": [
            "the down payment is below 20%",
            "the loan is government-backed",
            "the borrower has any second lien",
            "the APR exceeds the note rate"
          ],
          "correct": 0
        }
      ]
    },
    "recap": {
      "plainLanguage": "The price and approval of a loan come down to a few numbers: the interest rate (and the fee-inclusive APR), points paid up front, the LTV and DTI ratios, the credit score, and the mortgage insurance a low down payment triggers. Together they explain why a borrower gets the rate they get and whether they qualify.",
      "facts": [
        "The <span class='hl'>APR</span> adds lender fees to the note rate, so it is always equal to or higher than the rate.",
        "One point equals <span class='hl'>1%</span> of the loan amount; discount points buy down the rate.",
        "<span class='hl'>LTV</span> = loan ÷ value; <span class='hl'>DTI</span> = monthly debt ÷ gross monthly income.",
        "Conventional loans carry <span class='hl'>PMI</span>; FHA loans carry <span class='hl'>MIP</span>.",
        "Conventional PMI is typically required when the down payment is below <span class='hl'>20%</span>."
      ]
    }
  },
  {
    "id": "why-rules-exist",
    "name": "Why the rules exist",
    "reg": "How the 2008 crash built the modern rulebook",
    "definitions": [
      { "term": "No-Doc Loan", "def": "A loan made with little or no verification of the borrower's income, assets, or employment." },
      { "term": "Risk Layering", "def": "Stacking several risky loan features on a single loan, so each added risk compounds the others." },
      { "term": "Dodd-Frank Act", "def": "The 2010 law overhauling financial regulation after the 2008 crisis; it created the CFPB." },
      { "term": "Consumer Financial Protection Bureau (CFPB)", "def": "The federal agency created by Dodd-Frank in 2010 to enforce consumer financial protection laws." },
      { "term": "SAFE Act", "def": "The 2008 law that created a national system to license, register, and track mortgage loan originators." },
      { "term": "Ability-to-Repay (ATR)", "def": "The rule requiring a lender to verify that a borrower can actually repay a mortgage before making it." }
    ],
    "groups": [
      {
        "paras": [
          {
            "html": "The mortgage rulebook wasn't written in the abstract; it was written in response to a disaster. Almost every major consumer-protection rule traces back to what went wrong in the years before 2008 — each one a patch over a specific failure.",
            "spoken": "The mortgage rulebook wasn't written in the abstract. It was written in response to a disaster. Almost every major consumer-protection rule in this course traces back to something that went wrong in the years before two thousand eight — each rule a patch over a specific failure. Which is good news for studying, actually. These rules are much easier to remember as answers than as lists."
          }
        ]
      },
      {
        "heading": "the setup: loose lending",
        "paras": [
          {
            "html": "In the years before the crash, credit was easy and standards were thin. Lenders wrote <b><span class=\"cloze\" data-accept='[\"no-doc\", \"no doc\", \"no-doc loans\", \"stated income\", \"no documentation\", \"nodoc\"]' data-reveal=\"no-doc\">?</span> loans</b> — mortgages made with little or no verification of income, assets, or employment — because risky loans were profitable and could be sold off to investors. Worse, lenders practiced <b><span class=\"cloze\" data-accept='[\"risk layering\", \"layering\", \"risk-layering\", \"stacking risk\"]' data-reveal=\"risk layering\">?</span></b>: stacking several risky features on one loan at once, so a borrower might get a no-doc loan <em>and</em> an adjustable rate <em>and</em> a tiny down payment, each danger compounding the next. Underneath it all, one thing was missing: no one checked whether the borrower could actually <span class=\"cloze\" data-accept='[\"repay\",\"repay the loan\",\"pay it back\",\"pay\"]' data-reveal=\"repay\">?</span>.",
            "spoken": "In the years before the crash, credit was easy and standards were thin. Lenders wrote no-doc loans — mortgages made with little or no verification of income, assets, or employment — because risky loans were profitable and could be sold off to investors. Worse, lenders practiced risk layering: stacking several risky features onto one loan at once. So a borrower might get a no-doc loan and an adjustable rate and a tiny down payment, each danger compounding the next. And nobody was checking the simplest question of all — whether the borrower could actually repay."
          }
        ],
        "synth": {
          "q": "What was 'risk layering,' and why did it make the pre-2008 lending environment so dangerous?",
          "a": "Risk layering meant stacking several risky loan features on a single loan at once — for example a no-doc loan combined with an adjustable rate and a very small down payment. Each risk compounded the others, so a borrower already unlikely to repay was given a loan that also grew more expensive over time. Because standards weren't verified, these loans piled hidden risk into the system."
        }
      },
      {
        "heading": "the crash",
        "anchor": { "file": "burning-stack-of-cash-transparent.png", "caption": "the crash", "kind": "char" },
        "paras": [
          {
            "html": "When home prices stopped rising and adjustable payments reset upward, borrowers who never should have qualified began to default in the millions. Their loans had been bundled and sold to investors around the world, so the losses didn't stay local — they spread through the entire financial system. In September <span class=\"cloze\" data-accept='[\"2008\",\"two thousand eight\"]' data-reveal=\"2008\">?</span>, Lehman Brothers collapsed, lending froze, and the crisis reached every front page.",
            "spoken": "When home prices stopped rising and adjustable payments reset upward, borrowers who never should have qualified began to default in the millions. Their loans had been bundled and sold to investors around the world, so the losses didn't stay local. They spread through the entire financial system. In September of two thousand eight, Lehman Brothers collapsed, lending froze, and the crisis reached every front page on earth."
          },
          {
            "html": "Over the next several years, roughly <span class=\"cloze\" data-accept='[\"ten million\", \"10 million\", \"10,000,000\", \"10m\", \"10\"]' data-reveal=\"ten million\">?</span> American families lost their homes to foreclosure. Household net worth fell about <span class=\"cloze\" data-accept='[\"11 trillion\", \"$11 trillion\", \"11\", \"eleven trillion\", \"$11t\", \"11t\"]' data-reveal=\"$11 trillion\">?</span> in 2008 alone — the steepest one-year drop on record — and the national homeownership rate sank to a fifty-year low. Millions of children changed schools or moved in with relatives; whole blocks stood empty. The damage outlasted the headlines by a decade.",
            "spoken": "Over the next several years, roughly ten million American families lost their homes to foreclosure. Household net worth fell about eleven trillion dollars in two thousand eight alone — the steepest one-year drop on record — and the national homeownership rate sank to a fifty-year low. Millions of children changed schools or moved in with relatives. Whole blocks stood empty. The damage outlasted the headlines by a decade."
          },
          {
            "html": "Every one of those foreclosures began as a loan someone originated — often one that should never have been written. That is why the rules in this course exist: the licensing, the disclosures, and the verification steps that follow are all answers to one hard lesson — when the industry stops checking whether borrowers can repay, real families lose their homes.",
            "spoken": "And every one of those foreclosures began as a loan somebody originated. Often a loan that should never have been written in the first place. That's why the rules in this course exist. The licensing, the disclosures, the verification steps — they're all answers to one hard lesson. When the industry stops checking whether borrowers can repay, real families lose their homes. You're going to be the person doing the checking."
          }
        ]
      },
      {
        "heading": "the response: the new rulebook",
        "paras": [
          {
            "html": "Congress answered with a wave of law. The <b><span class=\"cloze\" data-accept='[\"safe act\", \"the safe act\", \"safe\", \"s.a.f.e. act\", \"secure and fair enforcement\"]' data-reveal=\"SAFE Act\">?</span></b> (2008) created a national system to license, register, and track every loan originator, so bad actors could no longer resign and start over untracked. Two years later, the <b>Dodd-Frank Act</b> (<span class=\"cloze\" data-accept='[\"2010\", \"two thousand ten\"]' data-reveal=\"2010\">?</span>) overhauled financial regulation and created the <b>Consumer Financial Protection Bureau</b> — the CFPB — to enforce consumer financial protection law.",
            "spoken": "Congress answered with a wave of law. The SAFE Act, in two thousand eight, created a national system to license, register, and track every loan originator. Before it, an originator caught doing something illegal in one state could pack up, cross a state line, and start over — no questions asked, no record following them. That's the hole the SAFE Act closed, and it's why your N-M-L-S number stays with you for your entire career. Two years later the Dodd-Frank Act of two thousand ten overhauled financial regulation and created the Consumer Financial Protection Bureau, to enforce consumer financial protection law."
          }
        ]
      },
      {
        "heading": "the fix at the core: ability-to-repay",
        "paras": [
          {
            "html": "The most direct fix targeted the original failure. Under the <b><span class=\"cloze\" data-accept='[\"ability-to-repay\", \"ability to repay\", \"atr\", \"the ability to repay\"]' data-reveal=\"ability-to-repay\">?</span></b> (<b>ATR</b>) rule, a lender must verify that a borrower can actually repay — checking income, assets, debts, and employment — <em><span class=\"cloze\" data-accept='[\"before\", \"prior to\", \"beforehand\", \"in advance\", \"ahead of\"]' data-reveal=\"before\">?</span></em> making the loan. It's the legal inverse of the no-doc loan: the practice that fueled the crisis is now the one the law forbids. Every piece of the framework — the SAFE Act's licensing, the CFPB's enforcement, Dodd-Frank's rules, ATR's verification — exists because the old, unchecked way of lending broke the system.",
            "spoken": "The most direct fix went straight at the original failure. Under the ability-to-repay rule — A-T-R — a lender has to verify that a borrower can actually repay, checking income, assets, debts, and employment, before making the loan. It's the legal inverse of the no-doc loan: the practice that fueled the crisis is now the practice the law forbids. Every piece of the framework you're about to learn — the SAFE Act's licensing, the C-F-P-B's enforcement, Dodd-Frank's rules, A-T-R's verification — exists because the old, unchecked way of lending broke the system. And that's Module One. You now have the vocabulary the rest of this course assumes: the note and the lien, what a payment is actually made of, who does what, where the money comes from, who writes the rules, how a loan moves, what makes one loan different from another, what sets its price, and why any of the rules exist at all. Everything from here is detail hung on that frame."
          }
        ]
      }
    ],
    "review": {
      "flashcards": [
        {
          "peg": "don't check",
          "topic": "Loose lending",
          "q": "What is a 'no-doc' loan?",
          "a": "a loan made with <span class='hl'>little or no verification</span> of income, assets, or employment"
        },
        {
          "peg": "stack the risks",
          "topic": "Risk layering",
          "q": "What does 'risk layering' mean?",
          "a": "stacking <span class='hl'>several risky features</span> on one loan so each risk compounds the others"
        },
        {
          "peg": "born 2010",
          "topic": "Dodd-Frank",
          "q": "Which law created the CFPB, and in what year?",
          "a": "the <span class='hl'>Dodd-Frank Act</span>, in <span class='hl'>2010</span>"
        },
        {
          "peg": "verify first",
          "topic": "Ability-to-repay",
          "q": "What does the ability-to-repay (ATR) rule require of a lender?",
          "a": "to <span class='hl'>verify the borrower can repay</span> the loan before making it"
        }
      ],
      "mcq": [
        {
          "q": "A key lending failure that led to the 2008 crisis was —",
          "opts": [
            "requiring too much documentation from borrowers",
            "making loans without verifying that borrowers could repay them",
            "capping interest rates too low",
            "refusing to sell loans to investors"
          ],
          "correct": 1
        },
        {
          "q": "The Consumer Financial Protection Bureau (CFPB) was created by —",
          "opts": [
            "the SAFE Act",
            "the Dodd-Frank Act of 2010",
            "the ability-to-repay rule",
            "the Federal Reserve"
          ],
          "correct": 1
        },
        {
          "q": "The SAFE Act's main contribution to the new rulebook was —",
          "opts": [
            "insuring loans against default",
            "a national system to license, register, and track loan originators",
            "setting the conforming loan limit",
            "eliminating adjustable-rate mortgages"
          ],
          "correct": 1
        },
        {
          "q": "The ability-to-repay rule is best described as the legal opposite of —",
          "opts": [
            "a fixed-rate mortgage",
            "the no-doc loan",
            "a conforming loan",
            "a second lien"
          ],
          "correct": 1
        }
      ]
    },
    "recap": {
      "plainLanguage": "The modern mortgage rulebook is a direct response to the 2008 crisis. Loose, unverified lending and stacked risks caused a crash, and lawmakers answered with the SAFE Act, the Dodd-Frank Act and its CFPB, and the ability-to-repay rule. Each rule patches a specific failure from the run-up to the crash.",
      "facts": [
        "Pre-2008 lending featured <span class='hl'>no-doc</span> loans and <span class='hl'>risk layering</span> — unverified loans with stacked risks.",
        "The financial crisis peaked in <span class='hl'>2008</span> as those loans defaulted and losses spread to investors.",
        "The <span class='hl'>Dodd-Frank Act</span> of <span class='hl'>2010</span> created the <span class='hl'>CFPB</span>.",
        "The <span class='hl'>SAFE Act</span> built the national system to license and track loan originators.",
        "The <span class='hl'>ability-to-repay (ATR)</span> rule requires verifying a borrower can repay before the loan is made."
      ]
    }
  }
];

export default unitsC;

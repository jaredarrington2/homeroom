import type { SectionUnit } from '@/lib/section';

// Module 1 — Introduction to Mortgage Lending (units 7–9).
// Recall-gradient shape (cloze / synth / review). Self-contained: every tested fact is
// taught in the unit's narrative prose before it is tested. No fact tested twice across
// cloze and review. Standard, universally-true US mortgage facts only.

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
            "html": "Every mortgage looks unique, but the differences fall along a handful of axes. Learn the axes and any loan becomes readable: you can place it, describe it, and tell it apart from its neighbors. This unit is the map, not the territory — the products themselves get taught in depth in Module 5. Here we just learn the names and the questions each axis answers."
          }
        ]
      },
      {
        "heading": "how the rate behaves",
        "paras": [
          {
            "html": "The first axis is how the interest rate behaves over time. A <b>fixed-rate mortgage</b> locks the rate for the whole term, so the principal-and-interest payment is the same in year one and year thirty. An <b>adjustable-rate mortgage</b> (<b>ARM</b>) ties the rate to a market index, so it can move — and the payment moves with it. Put the vocabulary in one sentence: a loan whose rate never changes is <span class=\"cloze\" data-accept='[\"fixed\",\"fixed-rate\",\"fixed rate\"]' data-reveal=\"fixed\">?</span>, and a loan whose rate can move over time is adjustable."
          }
        ]
      },
      {
        "heading": "who stands behind it, and how big",
        "paras": [
          {
            "html": "The next axis is who backs the loan. A <b>conventional loan</b> is not insured or guaranteed by any government agency — the lender and the secondary market carry the risk. A <b>government loan</b> is insured or guaranteed by a federal agency: the <b>FHA</b>, the <b>VA</b>, or the <b>USDA</b>. A separate axis is size. A <b>conforming loan</b> meets Fannie Mae and Freddie Mac standards, including a maximum dollar amount called the conforming loan limit; a <b>jumbo loan</b> exceeds that limit, so those two buyers won't purchase it. Conforming-versus-jumbo is about the loan amount; conventional-versus-government is about who insures it — don't confuse the two."
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
            "html": "Two more axes finish the map. <b>Lien position</b> is the order of repayment if the property is sold or foreclosed: a <b>first lien</b> gets paid before anything else, and a <b>second lien</b> — like a home-equity loan — sits behind it and is riskier for the lender. The last axis is why the loan exists. A <b>purchase</b> loan buys a home the borrower doesn't yet own; a <b>refinance</b> replaces a mortgage on a home they already own. Name the purpose axis and you've named the loan's job: <span class=\"cloze\" data-accept='[\"purchase\",\"a purchase\",\"purchase or refinance\"]' data-reveal=\"purchase\">?</span> versus refinance."
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
        "paras": [
          {
            "html": "A borrower doesn't qualify for a loan in the abstract — they qualify at a price, and the price is set by a small set of numbers. Learn these numbers and a loan file stops being a mystery: you can see why a rate is what it is, why insurance is required, and whether the borrower fits. Each term below is a lever on cost or approval."
          }
        ]
      },
      {
        "heading": "rate versus APR",
        "paras": [
          {
            "html": "Two percentages describe the cost of a loan and they are not the same. The <b>interest rate</b> (the note rate) is the yearly cost of borrowing the principal by itself. The <b>annual percentage rate</b> (<b>APR</b>) folds certain lender fees and financing costs in on top of that rate, so it shows the fuller cost of the loan. Because the APR includes those fees, it is always <b>equal to or higher than</b> the note rate — never lower. If a borrower is comparing two offers, the note rate tells the monthly payment, but the fee-inclusive figure that runs at least as high is the <span class=\"cloze\" data-accept='[\"APR\",\"annual percentage rate\"]' data-reveal=\"APR\">?</span>."
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
            "html": "Price can also be paid up front. <b>Points</b> are fees paid to the lender at closing, and one point equals <b>1% of the loan amount</b> — so on a $300,000 loan, one point is $3,000. Discount points are the useful kind: paying them <b>buys down the interest rate</b>, trading cash today for a lower rate (and lower payment) over the life of the loan. More points paid up front, lower rate; that's the trade."
          }
        ]
      },
      {
        "heading": "the qualifying ratios",
        "paras": [
          {
            "html": "Two ratios decide how much risk a loan carries. <b>Loan-to-value</b> (<b>LTV</b>) is the loan amount divided by the property's value: borrow $180,000 on a $200,000 home and the LTV is 90%. A higher LTV means less borrower equity and more lender risk. <b>Debt-to-income</b> (<b>DTI</b>) is the borrower's total monthly debt payments divided by their gross monthly income; a lower DTI means more room to absorb the new payment. State the formula plainly: divide the loan amount by the property value and you get the <span class=\"cloze\" data-accept='[\"LTV\",\"loan-to-value\",\"loan to value\"]' data-reveal=\"LTV\">?</span>. Alongside these sits the <b>credit score</b>, a single number summarizing the borrower's credit history that lenders read as a measure of risk."
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
            "html": "When a borrower puts little down, the lender protects itself with mortgage insurance — but its name depends on the loan type. On a <b>conventional</b> loan, it's <b>private mortgage insurance</b> (<b>PMI</b>), and it's typically required when the down payment is below <b>20%</b> (an LTV above 80%). On an <b>FHA</b> loan, the equivalent charge is the <b>mortgage insurance premium</b> (<b>MIP</b>). Same idea, two names: PMI rides on conventional loans, MIP on FHA loans. Keep them straight — the loan type tells you which one applies."
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
            "html": "The mortgage rulebook wasn't written in the abstract — it was written in response to a disaster. Almost every major consumer-protection rule you'll study traces back to what went wrong in the years leading up to 2008. Understanding that arc makes the rules make sense: each one is a patch over a specific failure."
          }
        ]
      },
      {
        "heading": "the setup: loose lending",
        "paras": [
          {
            "html": "In the years before the crash, credit was easy and standards were thin. Lenders wrote <b>no-doc loans</b> — mortgages made with little or no verification of income, assets, or employment — because risky loans were profitable and could be sold off to investors. Worse, lenders practiced <b>risk layering</b>: stacking several risky features on one loan at once, so a borrower might get a no-doc loan <em>and</em> an adjustable rate <em>and</em> a tiny down payment, each danger compounding the next. The core failure had a simple shape: loans were made without checking whether the borrower could actually <span class=\"cloze\" data-accept='[\"repay\",\"repay the loan\",\"pay it back\",\"pay\"]' data-reveal=\"repay\">?</span> them."
          }
        ],
        "synth": {
          "q": "What was 'risk layering,' and why did it make the pre-2008 lending environment so dangerous?",
          "a": "Risk layering meant stacking several risky loan features on a single loan at once — for example a no-doc loan combined with an adjustable rate and a very small down payment. Each risk compounded the others, so a borrower already unlikely to repay was given a loan that also grew more expensive over time. Because standards weren't verified, these loans piled hidden risk into the system."
        }
      },
      {
        "heading": "the crash",
        "paras": [
          {
            "html": "When home prices stopped rising and adjustable payments reset upward, borrowers who never should have qualified began to default in large numbers. Because those loans had been bundled and sold to investors worldwide, the losses spread far beyond the original lenders and helped trigger a broad financial crisis in <span class=\"cloze\" data-accept='[\"2008\",\"two thousand eight\"]' data-reveal=\"2008\">?</span>. The lesson lawmakers drew was blunt: unverified, unaccountable lending is a systemic hazard, not just a private risk."
          }
        ]
      },
      {
        "heading": "the response: the new rulebook",
        "paras": [
          {
            "html": "Congress answered with a wave of law. The <b>SAFE Act</b> (2008) created a national system to license, register, and track every loan originator, so bad actors could no longer resign and start over untracked. Two years later, the <b>Dodd-Frank Act</b> (2010) overhauled financial regulation and created the <b>Consumer Financial Protection Bureau</b> (<b>CFPB</b>), a single federal agency charged with enforcing consumer financial protection law. Name the agency Dodd-Frank stood up in 2010 to protect borrowers: the <span class=\"cloze\" data-accept='[\"CFPB\",\"Consumer Financial Protection Bureau\",\"the CFPB\"]' data-reveal=\"CFPB\">?</span>."
          }
        ]
      },
      {
        "heading": "the fix at the core: ability-to-repay",
        "paras": [
          {
            "html": "The single most direct fix targeted the original failure. Under the <b>ability-to-repay</b> (<b>ATR</b>) rule, a lender must verify that a borrower can actually repay a mortgage — checking income, assets, debts, and employment — <em>before</em> making the loan. It's the legal opposite of the no-doc loan: the very practice that fueled the crisis is now what the law forbids. Every piece of the framework — the SAFE Act's licensing, the CFPB's enforcement, Dodd-Frank's rules, ATR's verification — exists because the old, unchecked way of lending broke the system."
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

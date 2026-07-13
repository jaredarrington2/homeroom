import type { SectionUnit } from '@/lib/section';

// Module 1 — Introduction to Mortgage Lending (units A).
// Front-door vocabulary every later module assumes. Recall-gradient shape: every tested
// fact is taught in the unit's prose before it is tested, and no fact is tested twice.

const unitsA: SectionUnit[] = [
  {
    "id": "note-and-lien",
    "name": "What a mortgage is",
    "reg": "The note and the lien",
    "definitions": [
      { "term": "Promissory Note", "def": "The borrower's written, personal promise to repay the loan — it states the amount, the interest rate, the payment, and the term. The note is the debt itself." },
      { "term": "Mortgage", "def": "A security instrument that pledges the property as collateral for the note, creating a lien in the lender's favor. A two-party document between borrower and lender." },
      { "term": "Deed of Trust", "def": "A security instrument that does the same job as a mortgage but adds a third party — a neutral trustee who holds title until the debt is paid and can sell the property on default. Three parties: borrower (trustor), lender (beneficiary), and trustee." },
      { "term": "Lien", "def": "A legal claim against a property that secures a debt. It lets the creditor force a sale of the property if the debt goes unpaid, and it stays attached to the property until released." },
      { "term": "Collateral (Security)", "def": "The asset pledged to back a loan. In a mortgage the collateral is the home itself, which is why lenders call these 'secured' loans." },
      { "term": "Foreclosure", "def": "The legal process by which a lender enforces its lien — forcing a sale of the property to repay the unpaid debt when the borrower defaults." },
      { "term": "Lien Position", "def": "The priority order among liens on the same property, which decides who gets paid first from a sale. Generally set by recording order: first recorded, first paid." },
      { "term": "Trustee", "def": "The neutral third party in a deed of trust who holds legal title on the lender's behalf and conducts the sale if the borrower defaults." }
    ],
    "groups": [
      {
        "paras": [
          {
            "html": "People say \"I got a mortgage,\" but a home loan is really <b>two documents</b>, not one, and keeping them straight is the foundation for everything else. One is a promise to pay the money back. The other is what lets the lender take the house if you don't. They do different jobs, and every later topic assumes you know which is which."
          }
        ]
      },
      {
        "heading": "the note",
        "paras": [
          {
            "html": "The first document is the <b>promissory note</b> — the borrower's personal, written promise to repay. It spells out the amount borrowed, the interest rate, the monthly payment, and the term. The note <em>is</em> the debt: sign it and you owe the money. But a note by itself is just a promise, like an IOU. If that were all the lender had, a borrower who stopped paying could only be chased like any other unpaid debt — the lender would have no special claim on the house."
          }
        ]
      },
      {
        "heading": "the mortgage and the deed of trust",
        "paras": [
          {
            "html": "The second document fixes that. The <b>mortgage</b> — or, in many states, the <b>deed of trust</b> — is the security instrument. It pledges the property as <b>collateral</b> and creates a <span class=\"cloze\" data-accept='[\"lien\",\"the lien\",\"a lien\"]' data-reveal=\"lien\">?</span> in the lender's favor: a legal claim attached to the home. That claim is what makes the loan \"secured.\" A mortgage is a two-party document, borrower and lender. A deed of trust does the same job but adds a neutral third party, the <b>trustee</b>, who holds title and can sell the property on default — three parties instead of two. Same purpose, different plumbing."
          }
        ]
      },
      {
        "heading": "foreclosure and priority",
        "paras": [
          {
            "html": "Because the lien exists, the lender has a remedy the note alone can't give: <b>foreclosure</b>, the legal process of enforcing the lien by forcing a sale to recover the unpaid debt. When more than one lien sits on the same property, <b>lien position</b> decides who gets paid from that sale, and priority generally follows recording order — the lien recorded <span class=\"cloze\" data-accept='[\"first\",\"1st\",\"first position\"]' data-reveal=\"first\">?</span> is paid first. The main home loan is usually the first lien; a second mortgage or home-equity line sits behind it. One notable exception: unpaid property-tax liens typically jump ahead of even a first mortgage."
          }
        ],
        "synth": {
          "q": "Why does a lender need the mortgage (or deed of trust) in addition to the note, and what does lien position determine?",
          "a": "The note is only the borrower's promise to repay — an unsecured IOU. The mortgage or deed of trust creates a lien on the property, which gives the lender the power to foreclose (force a sale) if the debt goes unpaid. Lien position sets the priority order among liens, deciding who gets paid first from a foreclosure sale — generally the earliest-recorded lien, though property-tax liens usually take priority over even a first mortgage."
        }
      }
    ],
    "review": {
      "flashcards": [
        {
          "peg": "the promise",
          "topic": "The note",
          "q": "What is the promissory note?",
          "a": "the borrower's <span class='hl'>personal written promise to repay</span> — it is the debt itself"
        },
        {
          "peg": "three parties",
          "topic": "Security instrument",
          "q": "How does a deed of trust differ from a mortgage?",
          "a": "it adds a neutral <span class='hl'>trustee</span> — three parties (borrower, lender, trustee) instead of two"
        },
        {
          "peg": "the house",
          "topic": "Collateral",
          "q": "In a home loan, what is the collateral?",
          "a": "the <span class='hl'>home itself</span> — which is why the loan is called 'secured'"
        }
      ],
      "mcq": [
        {
          "q": "A home loan actually consists of —",
          "opts": [
            "one document that both promises repayment and pledges the house",
            "two instruments: the note (the promise) and the mortgage or deed of trust (the security)",
            "only a deed transferring the house to the lender",
            "a mortgage and a homeowners-insurance policy"
          ],
          "correct": 1
        },
        {
          "q": "Foreclosure is best described as —",
          "opts": [
            "the lender forgiving the remaining debt",
            "the legal process of enforcing the lien by forcing a sale to repay the unpaid debt",
            "the borrower selling the home voluntarily",
            "a penalty added to the monthly payment"
          ],
          "correct": 1
        },
        {
          "q": "An unpaid property-tax lien typically —",
          "opts": [
            "is wiped out by the first mortgage",
            "takes priority over even a first mortgage",
            "cannot attach to a home at all",
            "is paid last, after every other lien"
          ],
          "correct": 1
        }
      ]
    },
    "recap": {
      "plainLanguage": "A home loan is two documents. The note is your promise to pay the money back; the mortgage (or deed of trust) is the lien that lets the lender take the house if you don't.",
      "facts": [
        "The <span class=\"hl\">note</span> is the promise to repay; the <span class=\"hl\">mortgage / deed of trust</span> is the lien that secures it.",
        "The collateral securing the loan is the <span class=\"hl\">home itself</span>.",
        "<span class=\"hl\">Foreclosure</span> is the lender enforcing its lien by forcing a sale.",
        "A deed of trust adds a third party, the <span class=\"hl\">trustee</span>; a mortgage has only two.",
        "Lien priority generally follows recording order — <span class=\"hl\">first recorded, first paid</span>."
      ]
    }
  },
  {
    "id": "principal-interest-term",
    "name": "Principal, interest, and the term",
    "reg": "What the borrower repays",
    "definitions": [
      { "term": "Principal", "def": "The amount of money actually borrowed — the balance still owed. Each payment chips a piece off it." },
      { "term": "Interest", "def": "The cost of borrowing the principal — the lender's charge for the use of the money, quoted as an annual percentage rate. It is charged on the outstanding balance." },
      { "term": "Amortization", "def": "Paying a loan off gradually through scheduled, level payments, so that by the end of the term the balance reaches zero." },
      { "term": "Term", "def": "The length of the loan — the number of years (or months) over which it is scheduled to be repaid." },
      { "term": "PITI", "def": "The four parts of a typical monthly housing payment: Principal, Interest, Taxes, and Insurance." },
      { "term": "Escrow Account", "def": "An account the servicer uses to hold the borrower's property-tax and insurance money, collected a little each month and paid out to the tax authority and insurer when the bills come due. Also called an impound account." },
      { "term": "Servicer", "def": "The company that manages the loan after closing — collects the monthly payment, keeps the records, and runs the escrow account." }
    ],
    "groups": [
      {
        "paras": [
          {
            "html": "Every mortgage payment answers one question: where does the money go? Two pieces are the loan itself, and the rest is money the borrower owes to others that just flows through the lender. Get these apart and a payment stops being a mystery number."
          }
        ]
      },
      {
        "heading": "principal versus interest",
        "paras": [
          {
            "html": "The <b>principal</b> is the amount you actually borrowed — the balance you still owe. <b>Interest</b> is the cost of borrowing it, the lender's charge for letting you use the money, quoted as an annual percentage. Only part of each payment reduces the principal; the rest is interest, and none of the interest ever comes back to you. Interest is charged on the balance that is still outstanding, which turns out to shape how the whole loan behaves."
          }
        ]
      },
      {
        "heading": "amortization and the term",
        "paras": [
          {
            "html": "A standard mortgage is <b>amortizing</b>: you make level payments, and by the end the balance reaches zero. But the split inside those level payments shifts over time. Because interest is charged on the balance, and the balance starts high, the early payments are mostly <span class=\"cloze\" data-accept='[\"interest\",\"mostly interest\"]' data-reveal=\"interest\">?</span> with only a sliver going to principal. As the balance shrinks, the mix tips the other way, until late payments are mostly principal. The <b>term</b> is how long the loan is scheduled to run — a 30-year and a 15-year loan of the same amount are the same debt stretched over different lengths. A shorter term means a higher monthly payment but far less total interest paid."
          }
        ]
      },
      {
        "heading": "PITI and escrow",
        "paras": [
          {
            "html": "The principal and interest are the loan, but most borrowers' monthly checks cover more. The industry shorthand is <b>PITI</b>: Principal, Interest, Taxes, and Insurance. The taxes are the property taxes owed to the local government; the insurance is the homeowners policy. Rather than let a borrower save up for a big once-a-year tax or insurance bill, the <b>servicer</b> collects a twelfth of those costs with each payment and holds the money in an <span class=\"cloze\" data-accept='[\"escrow\",\"escrow account\",\"an escrow account\"]' data-reveal=\"escrow\">?</span> account, then pays the tax authority and the insurer directly when the bills come due. So two of PITI's four letters never belong to the lender at all — they just pass through."
          }
        ],
        "synth": {
          "q": "What are the four parts of PITI, and which two does the servicer merely hold and pass through?",
          "a": "PITI is Principal, Interest, Taxes, and Insurance. Principal and interest are the loan itself and go to the lender. The taxes and insurance are money owed to the local government and the homeowners insurer — the servicer collects them a little each month, holds them in an escrow account, and pays those bills when they come due."
        }
      }
    ],
    "review": {
      "flashcards": [
        {
          "peg": "what you owe",
          "topic": "Principal",
          "q": "What is the principal?",
          "a": "the <span class='hl'>amount actually borrowed</span> — the balance still owed"
        },
        {
          "peg": "how long",
          "topic": "The term",
          "q": "What is the term of a loan?",
          "a": "the <span class='hl'>length of the loan</span> — the years it is scheduled to take to repay"
        },
        {
          "peg": "PITI",
          "topic": "The payment",
          "q": "What do the letters PITI stand for?",
          "a": "<span class='hl'>Principal, Interest, Taxes, and Insurance</span>"
        }
      ],
      "mcq": [
        {
          "q": "Interest is —",
          "opts": [
            "the amount originally borrowed",
            "the cost of borrowing the principal — the lender's charge for the money",
            "the property tax bill",
            "the down payment"
          ],
          "correct": 1
        },
        {
          "q": "By the last payment of a fully amortizing loan, the remaining balance is —",
          "opts": [
            "one final lump sum still owed",
            "zero — the loan is paid in full",
            "half the original principal",
            "whatever interest has accrued"
          ],
          "correct": 1
        },
        {
          "q": "Compared with a longer term, a shorter term generally means —",
          "opts": [
            "a lower monthly payment and more total interest",
            "a higher monthly payment but less total interest paid",
            "no change to either payment or interest",
            "a higher interest rate that never changes"
          ],
          "correct": 1
        }
      ]
    },
    "recap": {
      "plainLanguage": "Your payment is the loan plus money that passes through. Principal is what you borrowed, interest is the cost of borrowing it, and the term is how long you take. Taxes and insurance ride along and the servicer holds them.",
      "facts": [
        "<span class=\"hl\">Principal</span> is the amount borrowed; <span class=\"hl\">interest</span> is the cost of borrowing it.",
        "Early amortizing payments are mostly <span class=\"hl\">interest</span>; later ones are mostly principal.",
        "The <span class=\"hl\">term</span> is the loan's length; a shorter term = higher payment, less total interest.",
        "<span class=\"hl\">PITI</span> = Principal, Interest, Taxes, Insurance.",
        "The servicer holds taxes and insurance in an <span class=\"hl\">escrow account</span> and pays those bills when due."
      ]
    }
  },
  {
    "id": "whos-in-the-room",
    "name": "Who's in the room",
    "reg": "The parties to a loan",
    "definitions": [
      { "term": "Mortgage Broker", "def": "A company or person who arranges a loan by shopping the borrower's application among multiple lenders — but does not fund the loan with its own money." },
      { "term": "Mortgage Lender (Creditor)", "def": "The party that actually funds the loan — the money is theirs. Also called the creditor. May originate directly or take loans that a broker brings." },
      { "term": "Servicer", "def": "The company that manages the loan after closing — collects payments, runs escrow, and handles the account. May be a different company than the lender, and the servicing can be sold." },
      { "term": "Loan Processor", "def": "The person who assembles and organizes the loan file — gathering documents and verifications — without making the approval decision or negotiating terms." },
      { "term": "Underwriter", "def": "The person who evaluates the loan against the program's guidelines, weighs the risk, and decides whether it is approved." },
      { "term": "Appraiser", "def": "An independent, licensed professional who gives an unbiased opinion of the property's market value. Their independence must be protected." },
      { "term": "Title Company", "def": "The company that searches the property's title for liens and ownership problems and issues title insurance." },
      { "term": "Settlement Agent", "def": "The neutral party who conducts the closing — handling the documents and disbursing the funds. Also called the closing or escrow agent; often the title company or an attorney." }
    ],
    "groups": [
      {
        "paras": [
          {
            "html": "One mortgage passes through a lot of hands, and each hand has a narrow job. Most of the confusion beginners feel comes from blurring roles that sound alike, so it is worth naming everyone in the room and what, exactly, they do."
          }
        ]
      },
      {
        "heading": "the borrower and the MLO",
        "paras": [
          {
            "html": "At the center are two people. The <b>borrower</b> is the one taking the loan and pledging the home. The <b>mortgage loan originator (MLO)</b> is the licensed professional who takes the application and offers or negotiates the loan's terms — the borrower's main point of contact through the process. The MLO works for a broker or a lender, and that employer is where the next distinction begins."
          }
        ]
      },
      {
        "heading": "broker vs. lender vs. servicer",
        "paras": [
          {
            "html": "This is the trio people mix up. A <b>mortgage broker</b> arranges the loan — shopping your application among several lenders to find a fit — but never puts up the money itself. The <b>lender</b> (also called the creditor) is the party that actually funds the loan; the money going to close is <span class=\"cloze\" data-accept='[\"the lender\",\"lender\",\"the lender's\",\"the creditor\"]' data-reveal=\"the lender\">?</span>'s. And the <b>servicer</b> is whoever manages the loan <em>after</em> closing — collecting the monthly payment, running escrow, sending statements. The servicer is often a different company than the lender, and the servicing rights can be sold, which is why your payment address can change even though your loan hasn't."
          }
        ],
        "synth": {
          "q": "Distinguish the broker, the lender, and the servicer.",
          "a": "The broker arranges the loan by shopping the application among lenders but does not fund it with its own money. The lender (creditor) is the party that actually provides the money. The servicer manages the loan after closing — collecting payments and running escrow — and is often a different company than the lender, with servicing rights that can be sold."
        }
      },
      {
        "heading": "the supporting cast",
        "paras": [
          {
            "html": "Behind the origination sits a crew. The <b>loan processor</b> assembles and organizes the file — documents, verifications — but makes no decisions. The <b>underwriter</b> then measures the file against the program's guidelines and <span class=\"cloze\" data-accept='[\"underwriter\",\"the underwriter\"]' data-reveal=\"underwriter\">?</span> is the one who actually approves or denies the loan. The <b>appraiser</b> gives an independent opinion of the home's value, and that independence is protected — no one on the deal may lean on it. The <b>title company</b> searches the title and issues title insurance, and the <b>settlement agent</b> (often the title company or an attorney) conducts the closing and disburses the funds. The <b>real estate agent</b> represents the buyer or seller in the purchase itself. As for who pays whom: the appraiser is paid for the appraisal but stays independent of the outcome, the real estate agents are customarily paid by commission out of the sale, and the servicer earns a fee for managing the loan — not the borrower's monthly interest."
          }
        ]
      }
    ],
    "review": {
      "flashcards": [
        {
          "peg": "shops it",
          "topic": "Broker",
          "q": "What does a mortgage broker do that a lender does not?",
          "a": "arranges the loan by <span class='hl'>shopping it among lenders</span> — but does <span class='hl'>not fund it</span> with its own money"
        },
        {
          "peg": "after closing",
          "topic": "Servicer",
          "q": "What is the servicer's job?",
          "a": "manages the loan <span class='hl'>after closing</span> — collects payments and runs escrow; can differ from the lender and be sold"
        },
        {
          "peg": "the value",
          "topic": "Appraiser",
          "q": "What does the appraiser provide, and what must be protected?",
          "a": "an <span class='hl'>independent opinion of value</span> — their independence must be protected from pressure"
        },
        {
          "peg": "conducts closing",
          "topic": "Settlement agent",
          "q": "What does the settlement (closing) agent do?",
          "a": "conducts the closing and <span class='hl'>disburses the funds</span> — often the title company or an attorney"
        }
      ],
      "mcq": [
        {
          "q": "The loan processor's role is to —",
          "opts": [
            "approve or deny the loan",
            "assemble and organize the loan file, without making the decision",
            "fund the loan at closing",
            "set the interest rate"
          ],
          "correct": 1
        },
        {
          "q": "Searching the title for liens and issuing title insurance is the job of the —",
          "opts": [
            "appraiser",
            "title company",
            "underwriter",
            "real estate agent"
          ],
          "correct": 1
        },
        {
          "q": "A real estate agent in a home purchase is customarily paid —",
          "opts": [
            "a share of the borrower's monthly interest",
            "by commission out of the sale, not by the lender",
            "a flat fee by the underwriter",
            "nothing — agents work for free"
          ],
          "correct": 1
        }
      ]
    },
    "recap": {
      "plainLanguage": "A mortgage passes through many hands. The trap is the broker–lender–servicer trio: the broker arranges the loan, the lender funds it, and the servicer runs it after closing.",
      "facts": [
        "The <span class=\"hl\">broker</span> arranges the loan; the <span class=\"hl\">lender</span> funds it; the <span class=\"hl\">servicer</span> manages it after closing.",
        "The <span class=\"hl\">processor</span> assembles the file; the <span class=\"hl\">underwriter</span> approves or denies it.",
        "The <span class=\"hl\">appraiser</span> gives an independent opinion of value and must stay independent.",
        "The <span class=\"hl\">title company</span> searches title and issues title insurance; the <span class=\"hl\">settlement agent</span> runs the closing.",
        "Real estate agents are customarily paid by <span class=\"hl\">commission</span> out of the sale, not by the lender."
      ]
    }
  }
];

export default unitsA;

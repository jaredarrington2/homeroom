import type { SectionUnit } from '@/lib/section';

// Module 1 — Introduction to Mortgage Lending. Units 4–6 (batch B).
// Recall-gradient shape (cloze / synth / review). Self-contained: every tested
// fact is taught in the unit's narrative prose before it is tested. Intro-level
// only — deeper regulator and lifecycle treatment lives in later modules.

const unitsB: SectionUnit[] = [
  {
    "id": "where-money-comes-from",
    "name": "Where the money comes from",
    "reg": "Primary vs. secondary market · the GSEs",
    "definitions": [
      { "term": "Primary Market", "def": "Where loans are made — the lenders and brokers who take applications and originate mortgages directly to consumers." },
      { "term": "Secondary Market", "def": "Where existing loans are bought and sold as investments after they close, replenishing lenders with cash to lend again." },
      { "term": "Government-Sponsored Enterprise (GSE)", "def": "A privately run, congressionally chartered company created to support a segment of lending — in housing, Fannie Mae and Freddie Mac." },
      { "term": "Fannie Mae", "def": "The Federal National Mortgage Association (FNMA), a GSE that buys conventional loans from lenders on the secondary market." },
      { "term": "Freddie Mac", "def": "The Federal Home Loan Mortgage Corporation (FHLMC), a GSE that, like Fannie Mae, buys conventional loans on the secondary market." },
      { "term": "Ginnie Mae", "def": "The Government National Mortgage Association (GNMA), a government agency that guarantees mortgage-backed securities built from government-backed loans (FHA, VA, USDA)." },
      { "term": "Mortgage-Backed Security (MBS)", "def": "An investment made by pooling many mortgages together and selling shares of the pool's cash flow to investors." },
      { "term": "Conforming Loan", "def": "A conventional loan that meets the GSEs' purchase guidelines, including a maximum loan amount, so Fannie Mae or Freddie Mac will buy it." },
      { "term": "Loan Servicing", "def": "The ongoing work of collecting the borrower's monthly payments, managing escrow, and handling the account after the loan is sold." }
    ],
    "groups": [
      {
        "paras": [
          {
            "html": "When a bank hands over a few hundred thousand dollars, that money doesn't sit in a vault waiting. A larger machine behind the loan decides who gets funded and on what terms. It has two halves: the <b>primary market</b> is where loans are made — the lenders and brokers who take the application and write the mortgage — and the <b>secondary market</b> is where those finished loans are bought and sold afterward as investments."
          }
        ]
      },
      {
        "heading": "why a lender sells your loan",
        "paras": [
          {
            "html": "A lender only has so much cash, and a 30-year loan ties up $300,000 of it for decades — unless the lender can sell the loan and get the money back now. So it does: a lender originates the loan, sells it into the <span class=\"cloze\" data-accept='[\"secondary market\",\"secondary\"]' data-reveal=\"secondary market\">?</span>, takes the fresh cash, and lends again to the next borrower. The loan you signed may change hands within weeks of closing, and none of your terms change when it does."
          }
        ],
        "synth": {
          "q": "Why does a lender sell a loan it just made instead of holding it?",
          "a": "Because lending ties up cash for the life of the loan. Selling the loan into the secondary market returns the lender's money immediately, letting it originate another loan for the next borrower. It recycles a limited pool of capital into far more lending than the lender could fund on its own."
        }
      },
      {
        "heading": "who buys the loans",
        "anchor": { "file": "astronaut-saxophone.PNG", "caption": "the buyers", "kind": "char" },
        "paras": [
          {
            "html": "The biggest buyers are two <b>government-sponsored enterprises</b> — private companies with a federal charter. <b>Fannie Mae</b> (the Federal National Mortgage Association) and <b>Freddie Mac</b> (the Federal Home Loan Mortgage Corporation) both buy <b>conventional</b> loans from lenders. Once they own a pile of loans, they bundle them into a <b>mortgage-backed security</b> — an investment that pools many mortgages and sells shares of the monthly payments to investors worldwide. A third player, <b>Ginnie Mae</b> (the Government National Mortgage Association), is different: it's an actual government agency, and it doesn't buy loans. Instead it <b>guarantees</b> the MBS built from FHA, VA, and USDA loans."
          }
        ],
        "synth": {
          "q": "How do Fannie Mae and Freddie Mac differ from Ginnie Mae?",
          "a": "Fannie Mae and Freddie Mac are government-sponsored enterprises (private, federally chartered) that buy conventional loans on the secondary market and pool them into securities. Ginnie Mae is a government agency that does not buy loans; it guarantees the mortgage-backed securities built from government loans — FHA, VA, and USDA."
        }
      },
      {
        "heading": "why guidelines exist at all",
        "paras": [
          {
            "html": "A lender will only write a loan it can sell, and Fannie Mae or Freddie Mac will only buy a loan that meets their rules. A loan that fits those rules — including a maximum amount the GSEs will purchase — is a <b>conforming loan</b>. This is why <b>underwriting guidelines</b> exist: someone downstream has to be willing to buy the loan, so it has to be built to their standard from the start. Selling the loan doesn't mean the lender walks away, though — lenders usually keep the <b>servicing</b>, collecting the payment and managing escrow, earning a steady fee even after the loan itself belongs to someone else."
          }
        ],
        "synth": {
          "q": "Why do underwriting guidelines exist in the first place?",
          "a": "Because the lender intends to sell the loan, and a buyer like Fannie Mae or Freddie Mac will only purchase a loan that meets their purchase rules (a conforming loan). The loan must be built to the downstream buyer's standard, so the guidelines that shape approval trace back to what the secondary market will buy."
        }
      }
    ],
    "review": {
      "flashcards": [
        {
          "peg": "two halves",
          "topic": "The markets",
          "q": "What's the difference between the primary and secondary market?",
          "a": "the <span class='hl'>primary</span> market is where loans are made; the <span class='hl'>secondary</span> market is where finished loans are bought and sold as investments"
        },
        {
          "peg": "the two GSEs",
          "topic": "The buyers",
          "q": "Which two buyers are government-sponsored enterprises, and what loans do they buy?",
          "a": "<span class='hl'>Fannie Mae</span> and <span class='hl'>Freddie Mac</span> — they buy <span class='hl'>conventional</span> loans"
        },
        {
          "peg": "the guarantor",
          "topic": "The buyers",
          "q": "What does Ginnie Mae do, and for which loans?",
          "a": "it <span class='hl'>guarantees</span> mortgage-backed securities built from government loans — <span class='hl'>FHA, VA, and USDA</span>"
        },
        {
          "peg": "keep the fee",
          "topic": "Servicing",
          "q": "After selling a loan, what does a lender often keep?",
          "a": "the <span class='hl'>servicing</span> — collecting payments and managing escrow for a fee"
        }
      ],
      "mcq": [
        {
          "q": "A mortgage-backed security is —",
          "opts": [
            "a loan made directly to a homebuyer",
            "a pool of many mortgages sold to investors as shares",
            "a type of homeowners insurance",
            "a government loan guarantee fund"
          ],
          "correct": 1
        },
        {
          "q": "A 'conforming' loan is one that —",
          "opts": [
            "is insured by the FHA",
            "meets the GSEs' purchase guidelines, so Fannie or Freddie will buy it",
            "is held by the original lender forever",
            "has no maximum loan amount"
          ],
          "correct": 1
        },
        {
          "q": "Ginnie Mae differs from Fannie Mae and Freddie Mac because it —",
          "opts": [
            "is a government agency that guarantees MBS rather than buying loans",
            "is a private bank",
            "only makes loans directly to consumers",
            "buys only conventional loans"
          ],
          "correct": 0
        },
        {
          "q": "Underwriting guidelines exist mainly because —",
          "opts": [
            "the government requires all loans to be identical",
            "a buyer on the secondary market will only purchase loans that meet its standard",
            "borrowers prefer more paperwork",
            "lenders never sell their loans"
          ],
          "correct": 1
        }
      ]
    },
    "recap": {
      "plainLanguage": "Loans are made in the primary market and sold in the secondary market so lenders get their cash back and can lend again. Fannie Mae and Freddie Mac (GSEs) buy conventional loans and pool them into securities; Ginnie Mae guarantees securities made from government loans. Loans must be built to fit what these buyers will purchase — that's why underwriting rules exist — and lenders usually keep servicing the loan after selling it.",
      "facts": [
        "The <span class='hl'>primary</span> market makes loans; the <span class='hl'>secondary</span> market buys and sells them.",
        "<span class='hl'>Fannie Mae</span> and <span class='hl'>Freddie Mac</span> are GSEs that buy <span class='hl'>conventional</span> loans.",
        "<span class='hl'>Ginnie Mae</span> guarantees MBS built from <span class='hl'>FHA, VA, and USDA</span> loans.",
        "A <span class='hl'>conforming</span> loan meets the GSEs' rules, including a maximum loan amount.",
        "Lenders often sell the loan but keep the <span class='hl'>servicing</span>."
      ]
    }
  },
  {
    "id": "who-makes-the-rules",
    "name": "Who makes the rules",
    "reg": "The regulators, at a glance",
    "definitions": [
      { "term": "Consumer Financial Protection Bureau (CFPB)", "def": "The federal agency that writes and enforces most consumer mortgage-protection laws, such as TILA and RESPA." },
      { "term": "Department of Housing and Urban Development (HUD)", "def": "The federal department overseeing housing programs and fair-housing enforcement; the FHA operates within it." },
      { "term": "Federal Housing Administration (FHA)", "def": "The agency within HUD that insures mortgages made by approved lenders to lower-down-payment borrowers." },
      { "term": "Department of Veterans Affairs (VA)", "def": "The federal department that guarantees home loans for eligible veterans and service members." },
      { "term": "U.S. Department of Agriculture (USDA)", "def": "The federal department that guarantees home loans for eligible buyers in qualifying rural areas." },
      { "term": "Federal Housing Finance Agency (FHFA)", "def": "The federal agency that oversees and regulates Fannie Mae and Freddie Mac." },
      { "term": "State Regulators", "def": "Each state's own agency (often a department of financial institutions or banking) that licenses and supervises loan originators locally." },
      { "term": "Nationwide Mortgage Licensing System (NMLS)", "def": "The single national system used to license and register loan originators and track them across states and employers." }
    ],
    "groups": [
      {
        "paras": [
          {
            "html": "No single office runs the mortgage industry. A handful of federal bodies, plus every state, each own a slice: some protect the consumer, some insure or guarantee specific loan programs, one oversees the secondary market, and the states handle licensing on the ground. A later module covers each in depth."
          }
        ]
      },
      {
        "heading": "the consumer's regulator",
        "paras": [
          {
            "html": "The main consumer regulator is the <b>Consumer Financial Protection Bureau</b>. Created after the 2008 crisis, the <span class=\"cloze\" data-accept='[\"CFPB\",\"Consumer Financial Protection Bureau\"]' data-reveal=\"CFPB\">?</span> writes and enforces most of the consumer-protection laws an MLO deals with — the disclosure and fair-dealing rules that govern how a loan is quoted, priced, and closed. It's the agency that polices how borrowers are treated."
          }
        ]
      },
      {
        "heading": "the loan-program agencies",
        "anchor": { "file": "pirate-stack-of-books-transparent.png", "caption": "the programs", "kind": "char" },
        "paras": [
          {
            "html": "A second cluster insures or guarantees specific kinds of loans. <b>HUD</b> — the Department of Housing and Urban Development — oversees housing and fair-lending programs, and the <b>FHA</b> (Federal Housing Administration) operates <em>inside</em> HUD, insuring loans for lower-down-payment borrowers. The <b>VA</b> (Department of Veterans Affairs) guarantees loans for veterans and service members, and the <b>USDA</b> guarantees loans for buyers in qualifying rural areas. These bodies don't police disclosures the way the CFPB does; they make their loan programs possible by insuring or guaranteeing them."
          }
        ],
        "synth": {
          "q": "What do HUD/FHA, the VA, and the USDA have in common, and how does that differ from the CFPB's job?",
          "a": "Each stands behind a specific loan program — the FHA (within HUD) insures loans, and the VA and USDA guarantee loans for their eligible borrowers. That's different from the CFPB, whose job is enforcing consumer-protection rules on how any loan is quoted, priced, and closed, not backing particular loan programs."
        }
      },
      {
        "heading": "the money's overseer, and the states",
        "paras": [
          {
            "html": "The <b>FHFA</b> — the Federal Housing Finance Agency — oversees Fannie Mae and Freddie Mac. Licensing, finally, happens at the state level: a <b>state regulator</b> issues and supervises the license through the <b>NMLS</b>, the national system that tracks every originator across states and employers. The FHFA oversees the <span class=\"cloze\" data-accept='[\"GSEs\",\"government-sponsored enterprises\",\"Fannie Mae and Freddie Mac\",\"Fannie and Freddie\"]' data-reveal=\"GSEs\">?</span>; the states license the people."
          }
        ],
        "synth": {
          "q": "Which body oversees Fannie Mae and Freddie Mac, and who licenses originators?",
          "a": "The FHFA (Federal Housing Finance Agency) oversees Fannie Mae and Freddie Mac. Loan originators are licensed by their state regulators, which do that work through the NMLS — the national system that tracks originators across states and employers."
        }
      }
    ],
    "review": {
      "flashcards": [
        {
          "peg": "the borrower's cop",
          "topic": "CFPB",
          "q": "Which body writes and enforces most consumer mortgage-protection laws?",
          "a": "the <span class='hl'>CFPB</span> (Consumer Financial Protection Bureau)"
        },
        {
          "peg": "inside HUD",
          "topic": "FHA",
          "q": "The FHA operates within which department, and what does it do?",
          "a": "within <span class='hl'>HUD</span> — it <span class='hl'>insures</span> loans for lower-down-payment borrowers"
        },
        {
          "peg": "who backs whom",
          "topic": "VA & USDA",
          "q": "Which bodies guarantee loans for veterans and for rural buyers?",
          "a": "the <span class='hl'>VA</span> (veterans/service members) and the <span class='hl'>USDA</span> (qualifying rural areas)"
        },
        {
          "peg": "the money's overseer",
          "topic": "FHFA",
          "q": "Which agency oversees Fannie Mae and Freddie Mac?",
          "a": "the <span class='hl'>FHFA</span> (Federal Housing Finance Agency)"
        }
      ],
      "mcq": [
        {
          "q": "The agency that writes and enforces most consumer mortgage-protection rules is the —",
          "opts": [
            "FHFA",
            "CFPB",
            "USDA",
            "VA"
          ],
          "correct": 1
        },
        {
          "q": "The FHA sits within which department?",
          "opts": [
            "the Department of Veterans Affairs",
            "the Department of Housing and Urban Development (HUD)",
            "the Department of Agriculture",
            "the Treasury"
          ],
          "correct": 1
        },
        {
          "q": "Loan originators are licensed —",
          "opts": [
            "by the CFPB directly",
            "by their state regulators, working through the NMLS",
            "by Fannie Mae",
            "by the FHA"
          ],
          "correct": 1
        },
        {
          "q": "Which body's main job is overseeing Fannie Mae and Freddie Mac?",
          "opts": [
            "HUD",
            "the FHFA",
            "the VA",
            "the CFPB"
          ],
          "correct": 1
        }
      ]
    },
    "recap": {
      "plainLanguage": "The industry is split among several regulators. The CFPB enforces most consumer-protection laws. HUD (with the FHA inside it), the VA, and the USDA stand behind specific loan programs by insuring or guaranteeing them. The FHFA oversees Fannie Mae and Freddie Mac. States license originators through the NMLS. This is the overview; each regulator gets a deeper look later.",
      "facts": [
        "The <span class='hl'>CFPB</span> enforces most consumer mortgage-protection laws.",
        "The <span class='hl'>FHA</span> sits inside <span class='hl'>HUD</span> and insures loans.",
        "The <span class='hl'>VA</span> and <span class='hl'>USDA</span> guarantee loans for veterans and rural buyers.",
        "The <span class='hl'>FHFA</span> oversees Fannie Mae and Freddie Mac.",
        "<span class='hl'>State</span> regulators license originators through the <span class='hl'>NMLS</span>."
      ]
    }
  },
  {
    "id": "life-of-a-loan",
    "name": "The life of a loan",
    "reg": "Application to servicing, one map",
    "definitions": [
      { "term": "Application", "def": "The stage where the borrower provides their information and the loan officially begins; a completed application starts the clock on required disclosures." },
      { "term": "Processing", "def": "The stage where a processor gathers and organizes the borrower's documents — income, assets, credit — and builds a complete loan file." },
      { "term": "Underwriting", "def": "The stage where the lender's underwriter reviews the file against guidelines and decides to approve, deny, or approve with conditions." },
      { "term": "Appraisal", "def": "An independent professional's opinion of the property's value, ordered so the lender knows the collateral is worth the loan." },
      { "term": "Title Search", "def": "A review of public records confirming the seller truly owns the property and no unexpected liens or claims cloud it." },
      { "term": "Closing", "def": "The stage where the borrower signs the final documents, funds change hands, and ownership transfers." },
      { "term": "Servicing", "def": "The stage after closing where a servicer collects the monthly payments, manages escrow, and handles the account for the life of the loan." }
    ],
    "groups": [
      {
        "paras": [
          {
            "html": "Every loan moves through the same stages in the same order, from the borrower's first form to the last payment years later, through a fixed sequence: <b>application → processing → underwriting → appraisal/title → closing → servicing</b>. A later module walks each stage in depth."
          }
        ]
      },
      {
        "heading": "from application to a complete file",
        "paras": [
          {
            "html": "It begins with <span class=\"cloze\" data-accept='[\"application\",\"the application\"]' data-reveal=\"application\">?</span>: the borrower hands over their information and the loan officially exists — which also starts the clock on required disclosures. Next comes <b>processing</b>: a processor collects and organizes the supporting documents — income, assets, credit — into one complete file. Processing decides nothing; its job is to make the file whole and accurate before anyone judges it."
          }
        ]
      },
      {
        "heading": "the decision and the property",
        "anchor": { "file": "cowboy-riding-dinosaur-transparent.png", "caption": "the verdict", "kind": "char" },
        "paras": [
          {
            "html": "With a complete file in hand, <span class=\"cloze\" data-accept='[\"underwriting\"]' data-reveal=\"underwriting\">?</span> makes the call: measuring the file against the guidelines and deciding approve, deny, or — most often — approve <b>with conditions</b> the borrower must still satisfy. Alongside that, the lender checks the <b>property</b>. An <b>appraisal</b> gives an independent opinion of what the home is worth, so the lender knows the home is worth enough to secure the debt; a <b>title search</b> confirms the seller really owns it, free of surprise liens or claims."
          }
        ],
        "synth": {
          "q": "What does underwriting decide, and why are the appraisal and title search done alongside it?",
          "a": "Underwriting reviews the complete file against the guidelines and decides to approve, deny, or approve with conditions. The appraisal and title search examine the property instead of the borrower — the appraisal confirms the home is worth enough to back the loan, and the title search confirms the seller owns it free of unexpected liens or claims, so the collateral is sound."
        }
      },
      {
        "heading": "closing, then the long tail",
        "paras": [
          {
            "html": "Once the loan is approved and the property checks out, the deal reaches <b>closing</b>: the borrower signs the final documents, money changes hands, and ownership transfers. The loan's life is only beginning, though. After closing comes <b>servicing</b> — the longest stage by far — where a servicer collects the monthly payment, manages escrow, and handles the account for years, often for the loan's entire term."
          }
        ],
        "synth": {
          "q": "What happens at closing, and what stage follows it?",
          "a": "At closing the borrower signs the final documents, funds change hands, and ownership transfers. Servicing follows and is by far the longest stage — a servicer collects the monthly payments, manages escrow, and handles the account for years, often for the full term of the loan."
        }
      }
    ],
    "review": {
      "flashcards": [
        {
          "peg": "the road",
          "topic": "The sequence",
          "q": "In order, what are the stages of a loan's life?",
          "a": "<span class='hl'>application → processing → underwriting → appraisal/title → closing → servicing</span>"
        },
        {
          "peg": "gather, don't judge",
          "topic": "Processing",
          "q": "What is the processor's job — and what does it NOT do?",
          "a": "it <span class='hl'>collects and organizes</span> the file (income, assets, credit); it does <span class='hl'>not</span> make the approval decision"
        },
        {
          "peg": "check the house",
          "topic": "Appraisal & title",
          "q": "What do the appraisal and the title search each confirm?",
          "a": "the appraisal confirms the property's <span class='hl'>value</span>; the title search confirms the seller's <span class='hl'>ownership</span> is free of surprise liens"
        },
        {
          "peg": "the long tail",
          "topic": "Servicing",
          "q": "Which stage lasts the longest, and what happens in it?",
          "a": "<span class='hl'>servicing</span> — collecting payments and managing escrow for years, often the whole term"
        }
      ],
      "mcq": [
        {
          "q": "Which stage decides to approve, deny, or approve-with-conditions?",
          "opts": [
            "processing",
            "underwriting",
            "closing",
            "servicing"
          ],
          "correct": 1
        },
        {
          "q": "The processor's main role is to —",
          "opts": [
            "decide whether the loan is approved",
            "gather and organize the documents into a complete file",
            "set the interest rate",
            "appraise the property"
          ],
          "correct": 1
        },
        {
          "q": "An appraisal is ordered so the lender knows —",
          "opts": [
            "the borrower's credit score",
            "the property is worth enough to back the loan",
            "the closing date",
            "the servicer's fee"
          ],
          "correct": 1
        },
        {
          "q": "At closing —",
          "opts": [
            "the file is first assembled",
            "the borrower signs final documents, funds change hands, and ownership transfers",
            "the underwriter reviews the loan",
            "the appraisal is ordered"
          ],
          "correct": 1
        }
      ]
    },
    "recap": {
      "plainLanguage": "Every loan follows the same path: application, processing, underwriting, appraisal and title, closing, then servicing. The borrower applies, a processor builds the file, an underwriter decides, the property is checked by appraisal and title search, everyone signs at closing, and a servicer manages the account for years afterward. This is the whole map; each stage is examined closely in a later module.",
      "facts": [
        "The order is <span class='hl'>application → processing → underwriting → appraisal/title → closing → servicing</span>.",
        "<span class='hl'>Processing</span> builds the file; it does not decide the loan.",
        "<span class='hl'>Underwriting</span> approves, denies, or approves with conditions.",
        "The <span class='hl'>appraisal</span> checks value; the <span class='hl'>title search</span> checks ownership.",
        "<span class='hl'>Servicing</span> is the longest stage — payments and escrow for years."
      ]
    }
  }
];

export default unitsB;

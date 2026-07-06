import type { SectionContent } from "@/lib/section";

// Section 4 — The SAFE Act & state licensing (ebook Module 4 = Uniform State Content).
// Recall-gradient shape (cloze / synth / review). Self-contained: every tested fact is
// taught in the unit's narrative prose before it is tested. Numbers verified against source.

const section4: SectionContent = {
  "id": "uniform-state-content",
  "title": "The SAFE Act & state licensing",
  "kicker": "Module 4",
  "units": [
    {
      "id": "the-safe-act",
      "name": "The SAFE Act",
      "reg": "Secure and Fair Enforcement for Mortgage Licensing Act · 12 USC Ch. 51",
      "definitions": [
        { "term": "Bureau", "def": "The Consumer Financial Protection Bureau (CFPB)." },
        { "term": "Director", "def": "The Director of the Consumer Financial Protection Bureau." },
        { "term": "Depository Institution", "def": "Any bank, savings association, or credit union." },
        { "term": "Federal Banking Agency", "def": "The Federal Reserve Board, the Office of the Comptroller of the Currency (OCC), the National Credit Union Administration (NCUA), and the FDIC." },
        { "term": "Exempt Entity", "def": "A depository institution (or a subsidiary it owns and controls that a federal banking agency regulates), or an institution regulated by the Farm Credit Administration — registered in the NMLS with a unique identifier. Its MLO employees register but don't need a state license." },
        { "term": "Individual", "def": "A natural person." },
        { "term": "Immediate Family Member", "def": "A spouse, child, sibling, parent, grandparent, or grandchild — including step-relationships and adoptive relationships." },
        { "term": "Loan Originator", "def": "An individual who takes a residential mortgage loan application and offers or negotiates loan terms for compensation or gain. Excludes purely clerical or administrative staff, real-estate-only agents (unless paid by a lender or broker), and people solely handling timeshare credit." },
        { "term": "Loan Processor or Underwriter", "def": "Someone performing clerical or support duties under the direction and supervision of a licensed or registered loan originator — collecting and analyzing loan information — without offering or negotiating rates or terms." },
        { "term": "Nationwide Mortgage Licensing System & Registry (NMLS)", "def": "The mortgage licensing system developed and maintained by the Conference of State Bank Supervisors (CSBS) and the American Association of Residential Mortgage Regulators (AARMR) to license state MLOs and register registered ones." },
        { "term": "Non-Traditional Mortgage Product", "def": "Any mortgage loan other than a 30-year fixed-rate mortgage." },
        { "term": "Registered Loan Originator", "def": "A loan originator employed by an exempt entity, registered in the NMLS with a unique identifier — no state license required while acting as such." },
        { "term": "State-Licensed Loan Originator", "def": "A loan originator who is not an exempt-entity employee, licensed by a state (or the Director), and registered in the NMLS with a unique identifier." },
        { "term": "Residential Mortgage Loan", "def": "A loan primarily for personal, family, or household use secured by a mortgage, deed of trust, or similar interest on a dwelling or residential real estate." },
        { "term": "Unique Identifier", "def": "A permanent NMLS-assigned number (never a Social Security number) that identifies a loan originator and lets the public track their employment history and any disciplinary or enforcement actions." },
        { "term": "Real Estate Brokerage Activity", "def": "Acting as a real estate agent or broker for a party to a real-property transaction — bringing parties together or negotiating a sale, lease, or exchange — other than arranging the financing for it." },
        { "term": "Person", "def": "A natural person, corporation, company, limited liability company, partnership, or association." },
        { "term": "State", "def": "Any U.S. state, the District of Columbia, Puerto Rico, Guam, American Samoa, the U.S. Virgin Islands, the Northern Mariana Islands, or any U.S. territory." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "In the years before 2008, becoming a mortgage loan originator took almost nothing — no license, no exam, no background check, and barely any oversight. That's the world the <b>SAFE Act</b> was built to end. Passed in the wreckage of the 2008 crisis, it created a single national system to license, register, and track everyone who originates home loans, so the industry could never again run unaccountable. Its full name is the <b>Secure and Fair Enforcement for Mortgage Licensing Act</b>, and it lives at Title V of the Housing and Economic Recovery Act."
            }
          ]
        },
        {
          "heading": "the wild, wild west",
          "paras": [
            {
              "html": "Before the SAFE Act, mortgage rules existed but were rarely enforced, and originators knew it. Lenders wrote loans that barely checked whether the borrower could pay — low-doc, no-doc, even a <b>\"no income, no asset, no employment\"</b> loan — because risky products were wildly profitable. An originator who lied or cheated and got caught could simply resign, move, and start over somewhere else; there was no system tracking who they were or what they'd done. That escape hatch is exactly what the SAFE Act slammed shut."
            }
          ]
        },
        {
          "heading": "what the SAFE Act changed",
          "paras": [
            {
              "html": "The SAFE Act, enacted in <span class=\"cloze\" data-accept='[\"2008\",\"two thousand eight\"]' data-reveal=\"2008\">?</span>, did two big things. It created the <b>NMLS</b> — one national registry every loan originator must be entered in — and it attached real consequences to misconduct. It also spread the accountability upward: under the doctrine of <b>respondeat superior</b> (\"let the master answer\"), when an originator breaks the law, the employer can be held responsible too — even if the violation traced back to poor training. The fox could no longer guard the henhouse."
            }
          ],
          "synth": {
            "q": "What two core changes did the SAFE Act bring to the mortgage industry?",
            "a": "It created the Nationwide Mortgage Licensing System & Registry (NMLS) to license, register, and track every loan originator, and it attached real accountability and consequences to misconduct — extending that accountability to employers under respondeat superior."
          }
        },
        {
          "heading": "the NMLS",
          "paras": [
            {
              "html": "The <b>Nationwide Mortgage Licensing System &amp; Registry (NMLS)</b> is the spine of the whole system — one database that licenses state MLOs, registers the exempt ones, and follows them across state lines and jobs. It was built and is run by two bodies working together: the <b>Conference of State Bank Supervisors (CSBS)</b> and the <b>American Association of Residential Mortgage Regulators (AARMR)</b>. Because everything funnels through it, a consumer can look up an originator's employment history and any public disciplinary action for free."
            }
          ],
          "synth": {
            "q": "Why did the SAFE Act create one national registry instead of leaving oversight to each state?",
            "a": "Because state-by-state oversight let bad actors escape accountability — an originator caught breaking the rules could resign, cross a state line, and start over untracked. A single national registry (the NMLS) closes that escape hatch: every originator carries a permanent record that follows them across states and employers, so misconduct is visible anywhere."
          }
        },
        {
          "heading": "the unique identifier",
          "paras": [
            {
              "html": "The NMLS gives every loan originator a permanent number — the <b>unique identifier</b> — that follows them for their whole career. Two things make it matter. It is deliberately <b>not your Social Security number</b>, so it can be public without exposing you, and it's <b>permanent</b>: change employers or states and the number stays the same, which is what makes cross-country tracking possible. An originator has to display it on their applications, solicitations, and advertising, and share it with anyone who asks."
            }
          ]
        },
        {
          "heading": "who counts as a loan originator",
          "paras": [
            {
              "html": "The whole Act turns on one definition. A <b>loan originator</b> is someone who <b>takes a residential mortgage loan application</b> and <b>offers or negotiates loan terms</b> for <span class=\"cloze\" data-accept='[\"compensation or gain\",\"compensation\",\"gain\",\"pay\",\"money\"]' data-reveal=\"compensation or gain\">?</span>. Both halves matter — take an application <em>and</em> talk terms, for money. That's why some people who touch a loan aren't originators at all: purely <b>clerical or administrative</b> staff, a <b>real-estate agent</b> doing brokerage work (unless a lender or broker pays them for the loan), and anyone dealing solely in <b>timeshare</b> credit all fall outside the definition — and outside the licensing that comes with it."
            }
          ],
          "synth": {
            "q": "What two things must a person do to be a 'loan originator,' and name someone who isn't one.",
            "a": "A loan originator both takes a residential mortgage loan application and offers or negotiates its terms, for compensation or gain — both halves are required. Someone doing only clerical or administrative work, a real-estate agent doing brokerage (unless paid by a lender or broker for the loan), or a person handling only timeshare credit is not a loan originator."
          }
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "HERA",
            "topic": "Origin",
            "q": "The SAFE Act is Title V of which larger 2008 law?",
            "a": "the <span class='hl'>Housing and Economic Recovery Act (HERA)</span>"
          },
          {
            "peg": "the builders",
            "topic": "NMLS",
            "q": "Which two bodies built and run the NMLS?",
            "a": "the <span class='hl'>CSBS</span> (Conference of State Bank Supervisors) and <span class='hl'>AARMR</span> (American Association of Residential Mortgage Regulators)"
          },
          {
            "peg": "let the master answer",
            "topic": "Accountability",
            "q": "Under respondeat superior, who else is accountable for an MLO's violation?",
            "a": "the <span class='hl'>employer</span> — even if the violation came from poor training"
          },
          {
            "peg": "not the SSN",
            "topic": "Unique identifier",
            "q": "Can an originator's unique identifier be their Social Security number?",
            "a": "<span class='hl'>No</span> — it's a permanent NMLS number, never the SSN"
          },
          {
            "peg": "not an LO",
            "topic": "Loan originator",
            "q": "Name someone who touches a loan but is NOT a 'loan originator.'",
            "a": "<span class='hl'>clerical or administrative</span> staff, a real-estate agent doing brokerage (unless lender/broker-paid), or someone handling only <span class='hl'>timeshare</span> credit"
          }
        ],
        "mcq": [
          {
            "q": "The SAFE Act was enacted primarily in response to —",
            "opts": [
              "the dot-com bust",
              "the 2008 mortgage crisis and lax oversight",
              "a rise in identity theft",
              "the savings-and-loan crisis of the 1980s"
            ],
            "correct": 1
          },
          {
            "q": "The NMLS is best described as —",
            "opts": [
              "a federal mortgage lender",
              "one national system to license, register, and track loan originators",
              "a credit bureau",
              "an insurance program"
            ],
            "correct": 1
          },
          {
            "q": "An originator's unique identifier must be displayed on —",
            "opts": [
              "the borrower's tax return",
              "their applications, solicitations, and advertisements",
              "the county deed only",
              "nothing — it's confidential"
            ],
            "correct": 1
          },
          {
            "q": "To be a 'loan originator,' a person must —",
            "opts": [
              "merely advertise loan products",
              "take a loan application AND offer or negotiate terms, for compensation",
              "only sign the closing documents",
              "hold any real-estate license"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "who-needs-a-license",
      "name": "Who needs a license",
      "reg": "SAFE Act · 12 USC 5103",
      "groups": [
        {
          "paras": [
            {
              "html": "Not everyone who works on a mortgage needs a license, and the line the SAFE Act draws is about employer and role. Every loan originator has to be registered in the NMLS with a unique identifier — that part is universal. Whether they also need a <b>state license</b> on top of that depends entirely on who they work for."
            }
          ]
        },
        {
          "heading": "registered versus licensed",
          "paras": [
            {
              "html": "There are two kinds of loan originator. A <b>registered loan originator</b> works for an <b>exempt entity</b> — a bank, credit union, or other depository institution (or an institution the Farm Credit Administration regulates). They register in the NMLS and carry a unique identifier, but because a federal banking agency already supervises their employer, they do <b>not</b> need a state license. A <b>state-licensed loan originator</b> is everyone else — someone at a mortgage broker or non-depository lender — and they must earn and maintain a state license. Both are tracked in the NMLS; only one needs the license."
            }
          ],
          "visual": "licensed-vs-registered",
          "synth": {
            "q": "What decides whether a loan originator needs a state license versus only NMLS registration?",
            "a": "Their employer. An originator employed by an exempt entity (a depository institution or FCA-regulated institution) is a registered loan originator — registered in the NMLS but not state-licensed, since a federal banking agency already supervises the employer. Everyone else (brokers, non-depository lenders) is a state-licensed loan originator and must hold a state license."
          }
        },
        {
          "heading": "the individual exemptions",
          "paras": [
            {
              "html": "Beyond the exempt-entity rule, a few individuals can arrange a mortgage without a license because they aren't in the business of it. You don't need a license to negotiate a loan for an <b>immediate family member</b>, or on a home that is <b>your own residence</b>. A <b>licensed attorney</b> is also exempt when negotiating a mortgage as an incidental part of representing a client — unless a lender or broker is paying the attorney for it, in which case the exemption disappears."
            }
          ]
        },
        {
          "heading": "processors and underwriters",
          "paras": [
            {
              "html": "A <b>loan processor or underwriter</b> who works clerical, behind-the-scenes duties under a licensed originator's supervision doesn't need a license — they collect and analyze information but never offer or negotiate rates or terms. Two things flip that. If they <b>hold themselves out</b> as able to originate — on a business card, a sign, a rate sheet — they need a license. And a <b>contract (1099) processor or underwriter</b>, working independently rather than as a supervised employee, must be licensed in <span class=\"cloze\" data-accept='[\"every state\",\"each state\",\"all states\",\"every state where the property is\"]' data-reveal=\"every state\">?</span> where the properties they work on are located."
            }
          ],
          "synth": {
            "q": "When does a loan processor or underwriter need a state MLO license?",
            "a": "When they hold themselves out to the public as able to perform loan-originator activities, or when they work as an independent contract (1099) processor/underwriter rather than a supervised employee — in which case they must be licensed in every state where the subject properties are located. A supervised in-house processor who never offers or negotiates terms doesn't need one."
          }
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "universal part",
            "topic": "Registration",
            "q": "What must every loan originator have, licensed or not?",
            "a": "NMLS <span class='hl'>registration</span> and a <span class='hl'>unique identifier</span>"
          },
          {
            "peg": "own home",
            "topic": "Exemptions",
            "q": "Name two individual transactions exempt from MLO licensing.",
            "a": "negotiating a loan for an <span class='hl'>immediate family member</span> or on your <span class='hl'>own residence</span>"
          },
          {
            "peg": "the paid attorney",
            "topic": "Exemptions",
            "q": "When does an attorney LOSE the licensing exemption?",
            "a": "when a <span class='hl'>lender or broker pays</span> the attorney for negotiating the loan"
          },
          {
            "peg": "the exempt line",
            "topic": "Registered vs. licensed",
            "q": "Why is a bank MLO exempt from state licensing while a broker's MLO isn't?",
            "a": "a <span class='hl'>federal banking agency</span> already supervises the bank; no such regulator sits over the broker, so the <span class='hl'>state</span> licenses that originator directly"
          }
        ],
        "mcq": [
          {
            "q": "A loan originator employed by a bank (a depository institution) is —",
            "opts": [
              "a state-licensed loan originator",
              "a registered loan originator (no state license needed)",
              "exempt from the NMLS entirely",
              "not a loan originator at all"
            ],
            "correct": 1
          },
          {
            "q": "Which makes an exempt entity 'exempt' from state licensing of its MLOs?",
            "opts": [
              "it is small",
              "a federal banking agency (or the FCA) already regulates it",
              "it only does refinances",
              "it operates in one state"
            ],
            "correct": 1
          },
          {
            "q": "A supervised in-house loan processor needs a license only if they —",
            "opts": [
              "analyze a credit report",
              "hold themselves out as able to originate loans",
              "speak with the borrower to collect documents",
              "work more than 40 hours a week"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "getting-licensed",
      "name": "Getting licensed",
      "reg": "SAFE Act · 12 USC 5104",
      "groups": [
        {
          "paras": [
            {
              "html": "Earning a state MLO license is a gauntlet, and it's designed that way — the whole point of the SAFE Act was to make sure the people originating loans are trustworthy and competent. A candidate has to pass a background check, clear a set of minimum standards, complete required education, pass a national exam, and get sponsored by a licensed employer. Miss any one and the license doesn't issue."
            }
          ]
        },
        {
          "heading": "the background check",
          "paras": [
            {
              "html": "It starts with the NMLS looking hard at who you are. Before applying, a candidate submits <b>fingerprints</b> for a state and national criminal-history check run through the <b>FBI</b> — obtained within the most-recent <span class=\"cloze\" data-accept='[\"180 days\",\"180\",\"one hundred eighty\",\"180-day\"]' data-reveal=\"180 days\">?</span>, and re-taken if the prints already on file are older than <span class=\"cloze\" data-accept='[\"3 years\",\"3\",\"three\",\"three years\"]' data-reveal=\"3 years\">?</span>. The candidate also authorizes the NMLS to pull an independent <b>credit report</b> and files a full personal history: their most-recent <span class=\"cloze\" data-accept='[\"10 years\",\"10\",\"ten\",\"ten years\"]' data-reveal=\"10 years\">?</span> of residential and employment history, containing <b>no gaps</b>, plus any past administrative, civil, or criminal findings. It all goes to the NMLS on <b>form MU4</b>. The background check is the gate everything else sits behind."
            }
          ]
        },
        {
          "heading": "the minimum standards",
          "paras": [
            {
              "html": "Clearing the background check means meeting fixed standards. You must have <b>never had an MLO license revoked</b>. You can't have a <b>felony conviction within the past 7 years</b> — and for a felony involving <b>fraud, dishonesty, a breach of trust, or money laundering</b>, the bar is <em>ever</em>, with no time limit at all. Put a number on the general rule: a disqualifying felony conviction within the last <span class=\"cloze\" data-accept='[\"7 years\",\"7\",\"seven\",\"seven years\"]' data-reveal=\"7 years\">?</span> blocks a license. You also have to show <b>financial responsibility</b> — no outstanding judgments (medical excepted) or tax liens, no foreclosures in the past 3 years, and no pattern of seriously delinquent accounts."
            }
          ],
          "synth": {
            "q": "How does the SAFE Act's felony bar differ for an ordinary felony versus one involving fraud or dishonesty?",
            "a": "An ordinary felony conviction disqualifies a candidate if it falls within the 7-year period before the application. But a felony involving fraud, dishonesty, a breach of trust, or money laundering disqualifies the candidate no matter when it occurred — there is no time limit."
          }
        },
        {
          "heading": "sponsorship",
          "paras": [
            {
              "html": "A license isn't usable on its own — it has to be tied to an employer. To originate, an MLO must be <b>sponsored</b> by a state-licensed entity. Submit your application without a sponsor and, if you're otherwise qualified, the state issues the license in an <b>\"approved-inactive\"</b> status. You can't originate a single loan until a sponsorship flips it to <b>\"approved-active.\"</b> The license exists; the sponsorship is what switches it on."
            }
          ]
        },
        {
          "heading": "pre-licensing education",
          "paras": [
            {
              "html": "Before the exam comes the classroom. A candidate must complete at least <span class=\"cloze\" data-accept='[\"20 hours\",\"20\",\"twenty\",\"twenty hours\"]' data-reveal=\"20 hours\">?</span> of NMLS-approved pre-licensing education, and the hours are carved up: at least <b>3 hours of federal law</b>, <b>3 hours of ethics</b> (covering fraud, consumer protection, and fair lending), and <b>2 hours on non-traditional mortgage products</b>. One approved course satisfies the national requirement for every state, though a particular state may pile its own state-specific hours on top."
            }
          ],
          "visual": "pe-ce-hours",
          "synth": {
            "q": "How are the 20 hours of pre-licensing education allocated?",
            "a": "At least 20 total NMLS-approved hours, including at least 3 hours of federal law and regulations, 3 hours of ethics (fraud, consumer protection, and fair lending), and 2 hours on non-traditional mortgage products. The remaining hours round out the 20."
          }
        },
        {
          "heading": "the exam",
          "paras": [
            {
              "html": "The finish line is a national exam: a <span class=\"cloze\" data-accept='[\"120\",\"one hundred twenty\",\"120-question\"]' data-reveal=\"120\">?</span>-question test written by the NMLS, and passing means scoring at least <span class=\"cloze\" data-accept='[\"75%\",\"75\",\"seventy-five\",\"seventy-five percent\"]' data-reveal=\"75%\">?</span>. Fail and you can retake it twice more — three attempts in all — with each try at least <b>30 days</b> after the last. Fail all three and you're locked out for <b>6 months</b> before the cycle starts over. One more rule reaches into the future: let your license lapse for 5 years or more (not counting time you spent as a registered originator) and you have to sit the exam again."
            }
          ],
          "visual": "exam-attempts"
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "prints to the FBI",
            "topic": "Background check",
            "q": "What does the NMLS submit for the criminal-history check?",
            "a": "the candidate's <span class='hl'>fingerprints</span>, to the FBI"
          },
          {
            "peg": "3 years",
            "topic": "Minimum standards",
            "q": "Financial responsibility bars foreclosures within the past…",
            "a": "<span class='hl'>3 years</span>"
          },
          {
            "peg": "flip the switch",
            "topic": "Sponsorship",
            "q": "What turns an 'approved-inactive' license into 'approved-active'?",
            "a": "securing <span class='hl'>sponsorship</span> by a state-licensed entity"
          },
          {
            "peg": "30 days apart",
            "topic": "The exam",
            "q": "How long must a candidate wait between exam retakes?",
            "a": "at least <span class='hl'>30 days</span> between attempts"
          },
          {
            "peg": "three strikes",
            "topic": "The exam",
            "q": "After failing the exam three times, the wait before retrying is…",
            "a": "<span class='hl'>6 months</span>"
          }
        ],
        "mcq": [
          {
            "q": "A felony involving fraud or money laundering disqualifies a candidate —",
            "opts": [
              "only within 7 years",
              "only within 10 years",
              "at any time, with no time limit",
              "only if it was a federal charge"
            ],
            "correct": 2
          },
          {
            "q": "Which is a minimum standard for issuing an MLO license?",
            "opts": [
              "at least five years of prior banking experience",
              "never having had an MLO license revoked",
              "a college degree in finance",
              "residence in the licensing state"
            ],
            "correct": 1
          },
          {
            "q": "One NMLS-approved pre-licensing course —",
            "opts": [
              "must be retaken in every state",
              "satisfies the national requirement for every state",
              "expires after 30 days",
              "counts only toward continuing education"
            ],
            "correct": 1
          },
          {
            "q": "Under the financial-responsibility standard, which is NOT disqualifying?",
            "opts": [
              "an outstanding tax lien",
              "a foreclosure within the past 3 years",
              "a judgment solely from medical expenses",
              "a pattern of seriously-delinquent accounts"
            ],
            "correct": 2
          }
        ]
      }
    },
    {
      "id": "keeping-the-license",
      "name": "Keeping the license",
      "reg": "SAFE Act · 12 USC 5105",
      "groups": [
        {
          "paras": [
            {
              "html": "A license isn't a one-time achievement — it's a subscription you renew every year. Miss the renewal and you can't legally originate a thing until you fix it. Keeping the license means meeting the same standards you started with, taking continuing education, and paying the fees, all on an annual clock."
            }
          ]
        },
        {
          "heading": "the December 31 deadline",
          "paras": [
            {
              "html": "Every MLO license expires on the same day: <b>11:59 p.m.</b> on <span class=\"cloze\" data-accept='[\"December 31\",\"Dec 31\",\"December 31st\",\"dec 31\"]' data-reveal=\"December 31\">?</span>. Miss the renewal and the license is dead at 12:00 a.m. on January 1 — and from that moment you must stop any activity that requires a license. Because state agencies take time to process, the smart move is to submit the renewal early, around <b>November 1</b>, rather than gambling on the last week of December. A license that does expire isn't gone for good — reinstatement follows each state's own policy."
            }
          ]
        },
        {
          "heading": "continuing education",
          "paras": [
            {
              "html": "Each year the license also demands fresh learning: at least <span class=\"cloze\" data-accept='[\"8 hours\",\"8\",\"eight\",\"eight hours\"]' data-reveal=\"8 hours\">?</span> of NMLS-approved continuing education. The hours are earmarked much like pre-licensing: at least <b>3 hours of federal law</b>, <b>2 hours of ethics</b> (fraud, consumer protection, fair lending), and <b>2 hours on non-traditional mortgage products</b>, with the remaining hour rounding it out. A state may require its own state-specific CE on top of the national eight."
            }
          ],
          "visual": "pe-ce-hours"
        },
        {
          "heading": "the fine print on CE",
          "paras": [
            {
              "html": "The CE rules exist to stop people from gaming them. You can only get credit for a course in the <b>year you take it</b> — no stockpiling — and you can't take the <b>same approved course in the same or successive years</b>. If you also teach an approved CE course, you earn <b>two hours of credit for every one hour you teach</b>. And if your license lapses, a <b>Late CE (LCE)</b> course completed by the <b>last day of February</b> lets you still renew for the previous year."
            }
          ],
          "synth": {
            "q": "Give two rules that keep MLOs from gaming continuing education.",
            "a": "Credit counts only for the year the course is taken (no stockpiling for future years), and the same approved course can't be taken in the same or successive years. (Instructors of approved CE earn 2 hours of credit per hour taught.)"
          }
        },
        {
          "heading": "the five-year lapse rule",
          "paras": [
            {
              "html": "Letting a license expire briefly is recoverable, but there's a hard limit. If a license stays lapsed for <span class=\"cloze\" data-accept='[\"5 years\",\"5\",\"five\",\"five years\"]' data-reveal=\"5 years\">?</span> or more, the originator has to <b>retake the national exam</b> to get back in. The key wrinkle: time spent working as a <b>registered</b> loan originator (at an exempt entity like a bank) doesn't count toward the lapse. So someone who leaves a licensed shop for a bank and originates there for years can return without re-testing — the clock only runs while they're fully out of origination."
            }
          ],
          "synth": {
            "q": "When does a lapsed license force an MLO to retake the national exam, and what time doesn't count?",
            "a": "When the license has been lapsed for 5 years or more. Time the individual spent acting as a registered loan originator (employed by an exempt entity) does not count toward that 5-year lapse — only time completely out of origination does."
          }
        },
        {
          "heading": "telling the NMLS",
          "paras": [
            {
              "html": "The registry only works if it's current, so changes have to be reported. When a registered MLO changes employers, or a licensed MLO changes sponsorship, the update is filed with the NMLS on <b>form MU4</b> — and both the individual and the company have to file it. The SAFE Act itself doesn't set a national deadline for the filing, but individual states usually do, which is one more reason to know each state's rules."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "file early",
            "topic": "Renewal",
            "q": "When should an MLO ideally submit a license renewal?",
            "a": "around <span class='hl'>November 1</span> — well before the December 31 expiry"
          },
          {
            "peg": "CE split",
            "topic": "Continuing education",
            "q": "The federal-law and ethics portions of the 8 CE hours?",
            "a": "at least <span class='hl'>3 hours federal law</span> and <span class='hl'>2 hours ethics</span> (plus 2 on non-traditional products)"
          },
          {
            "peg": "teach for credit",
            "topic": "Continuing education",
            "q": "An approved-CE instructor earns how much credit per hour taught?",
            "a": "<span class='hl'>2 hours</span> of credit for every 1 hour taught"
          },
          {
            "peg": "late CE",
            "topic": "Continuing education",
            "q": "A Late CE (LCE) course to renew for the prior year must be done by…",
            "a": "the <span class='hl'>last day of February</span>"
          },
          {
            "peg": "MU4",
            "topic": "NMLS updates",
            "q": "Which NMLS form reports a change of employment or sponsorship?",
            "a": "form <span class='hl'>MU4</span> — filed by both the individual and the company"
          }
        ],
        "mcq": [
          {
            "q": "Once a license expires at 12:00 a.m. on January 1, the former licensee must —",
            "opts": [
              "keep originating until the state objects",
              "stop all activity that requires a license",
              "pay a flat $500 penalty and continue",
              "wait exactly 30 days, then resume"
            ],
            "correct": 1
          },
          {
            "q": "An MLO whose license has expired reinstates it by —",
            "opts": [
              "automatic renewal after 90 days",
              "following each state's own reinstatement policy",
              "retaking the exam in every case",
              "filing with the FBI"
            ],
            "correct": 1
          },
          {
            "q": "An MLO may receive CE credit for a course —",
            "opts": [
              "banked for any future year",
              "only in the year it is taken",
              "twice in successive years",
              "retroactively for prior years"
            ],
            "correct": 1
          },
          {
            "q": "A license lapsed 5+ years forces the MLO to —",
            "opts": [
              "pay a small fee",
              "retake the national exam",
              "wait 30 days",
              "nothing — it renews automatically"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "state-oversight",
      "name": "State oversight",
      "reg": "SAFE Act · 12 USC 5107–5114",
      "groups": [
        {
          "paras": [
            {
              "html": "The SAFE Act is federal, but the day-to-day policing of loan originators is done by the <b>states</b>. Congress gave each state a template — the <b>State Model Law</b> — and required every one of them to adopt its own SAFE Act and stand up a regulator to enforce it. That regulator, and the person who runs it, is where the real supervisory power sits."
            }
          ]
        },
        {
          "heading": "the state model law and the commissioner",
          "paras": [
            {
              "html": "The Housing and Economic Recovery Act made every state pass a state-specific SAFE Act, built from a common <b>Model Law</b> so the rules stay roughly uniform coast to coast. Each state's system is run by a <b>State Commissioner</b> with broad authority: to write rules, to <b>deny, suspend, condition, or revoke</b> licenses, and to examine, investigate, and enforce — including the power to subpoena, issue <b>cease-and-desist</b> orders, order restitution and penalties, and ban an individual from the industry."
            }
          ],
          "synth": {
            "q": "What is the State Model Law, and what does a State Commissioner do with it?",
            "a": "The Model Law is the common template the Housing and Economic Recovery Act required every state to use in adopting its own state-specific SAFE Act, keeping the rules roughly uniform nationwide. Each state's Commissioner administers and enforces it — writing rules, issuing and revoking licenses, and investigating, subpoenaing, issuing cease-and-desist orders, ordering restitution/penalties, and banning bad actors."
          }
        },
        {
          "heading": "what every state must guarantee",
          "paras": [
            {
              "html": "The SAFE Act sets a floor each state has to clear to count as compliant. A state must run a <b>loan-originator supervisory authority</b> that can actually enforce the law — suspending, revoking, or refusing to renew a license for a violation. It must make sure every state-licensed MLO is <b>registered in the NMLS</b>, <b>report violations and enforcement actions</b> back to the NMLS, and keep a process that lets an originator <b>challenge</b> information held about them. It must be able to <b>penalize unlicensed activity</b>, and require a minimum net worth or surety bond (or a recovery fund) scaled to each originator's loan volume. In short: supervise, register, report, and put money behind the promise."
            }
          ]
        },
        {
          "heading": "investigation and examination",
          "paras": [
            {
              "html": "To do that job, the CFPB and every State Commissioner can <b>examine and investigate</b> any licensee as often as necessary. They can demand the books and records, interview officers and employees under oath, and even take physical possession of documents during an investigation. The flip side is a hard duty on you: no one under examination may knowingly <b>withhold, alter, or destroy</b> records — doing so is itself a serious violation."
            }
          ]
        },
        {
          "heading": "the prohibitions",
          "paras": [
            {
              "html": "The SAFE Act spells out what an originator may never do, and the theme is honesty. It's a violation to defraud or mislead a borrower or lender, to engage in any unfair or deceptive practice, or to advertise or contract for rates and terms that <b>aren't actually available</b> — classic <b>bait-and-switch</b>. It's also a violation to originate without a valid license, to try to influence an <b>appraiser's</b> judgment, to collect a prohibited fee, or to fail to truthfully <b>account for money</b> belonging to a party in the transaction."
            }
          ],
          "synth": {
            "q": "Name several acts the SAFE Act prohibits an MLO from doing.",
            "a": "Defrauding or misleading borrowers or lenders, engaging in unfair or deceptive practices, advertising or contracting for rates/terms not actually available (bait-and-switch), originating without a valid license, attempting to influence an appraiser's independent judgment, charging prohibited fees, and failing to truthfully account for money belonging to a party in the transaction."
          }
        },
        {
          "heading": "penalties and call reports",
          "paras": [
            {
              "html": "When someone violates the Act, a Commissioner can deny, suspend, or revoke a license, order restitution, and impose fines. The ceiling on a civil penalty is <span class=\"cloze\" data-accept='[\"$25,000\",\"25000\",\"25,000\",\"twenty-five thousand\"]' data-reveal=\"$25,000\">?</span> for each act or omission — and each separate violation counts on its own, so they stack. Separately, every mortgage licensee entity has to keep regulators informed by filing a <b>Call Report</b> — a report of condition submitted to the NMLS <span class=\"cloze\" data-accept='[\"quarterly\",\"every quarter\",\"each quarter\",\"4 times a year\",\"four times a year\"]' data-reveal=\"quarterly\">?</span>, describing the origination activity of the previous calendar quarter."
            }
          ]
        },
        {
          "heading": "surety bonds and net worth",
          "paras": [
            {
              "html": "States also make originators put money behind their promises. Every MLO must be covered by a <b>surety bond</b> — a guarantee that pays out if the originator causes harm — though an employer's bond can cover its employees. Each must also maintain a <b>minimum net worth</b>. Both the bond amount and the net worth aren't fixed dollar figures; they <b>scale with the dollar amount of loans</b> the originator produces, as the State Commissioner sets."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "who runs it",
            "topic": "State regulation",
            "q": "Who administers and enforces a state's SAFE Act?",
            "a": "the <span class='hl'>State Commissioner</span> (state regulatory agency)"
          },
          {
            "peg": "don't shred",
            "topic": "Examination",
            "q": "During an examination, an MLO may not do what to records?",
            "a": "knowingly <span class='hl'>withhold, alter, or destroy</span> them"
          },
          {
            "peg": "bait-and-switch",
            "topic": "Prohibitions",
            "q": "Is advertising rates that aren't actually available allowed?",
            "a": "<span class='hl'>No</span> — that's prohibited bait-and-switch"
          },
          {
            "peg": "scales with volume",
            "topic": "Bonds & net worth",
            "q": "The surety-bond and net-worth amounts are set by —",
            "a": "the <span class='hl'>dollar amount of loans</span> originated (per the Commissioner)"
          }
        ],
        "mcq": [
          {
            "q": "Each state's SAFE Act is built from a common —",
            "opts": [
              "federal license",
              "State Model Law",
              "NMLS bylaw",
              "CFPB regulation"
            ],
            "correct": 1
          },
          {
            "q": "To be counted as SAFE-Act compliant, a state must, among other things —",
            "opts": [
              "cap all mortgage interest rates",
              "keep a process letting an originator challenge NMLS information about them",
              "employ every licensee directly",
              "run its own national exam"
            ],
            "correct": 1
          },
          {
            "q": "During an investigation, the CFPB or a State Commissioner may —",
            "opts": [
              "take physical custody of records if it fears they'll be destroyed",
              "jail the licensee without a hearing",
              "seize the borrower's home",
              "waive all federal law"
            ],
            "correct": 0
          },
          {
            "q": "A licensee's surety bond can be satisfied by —",
            "opts": [
              "a co-signer",
              "the employer's bond covering its employees",
              "a credit card",
              "the NMLS"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "temporary-authority-and-the-job",
      "name": "Temporary authority & on the job",
      "reg": "SAFE Act · 12 USC 5117",
      "definitions": [
        { "term": "Application State", "def": "The state in which a registered or state-licensed loan originator is seeking to be licensed." },
        { "term": "State-Licensed Mortgage Company", "def": "An entity licensed or registered under any state's law to engage in residential mortgage loan origination and processing activities." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "Getting a license in a new state takes time, and the SAFE Act didn't want a qualified originator sitting idle for weeks while paperwork clears. So it created <b>temporary authority</b> — a bridge that lets certain originators start working in a new state before that state's license is actually issued, as long as they already have a clean track record and an application pending."
            }
          ]
        },
        {
          "heading": "temporary authority — the registered path",
          "paras": [
            {
              "html": "The first bridge is for a <b>registered</b> loan originator moving to a licensed shop. When a registered LO takes a job at a state-licensed mortgage company, they get temporary authority if their record is clean — no denied, revoked, or suspended license, no cease-and-desist order, no disqualifying conviction — <b>and</b> they've submitted a state license application and were registered in the NMLS at some point during the <span class=\"cloze\" data-accept='[\"1 year\",\"1\",\"one\",\"one year\",\"12 months\",\"one-year\"]' data-reveal=\"1 year\">?</span> before applying."
            }
          ]
        },
        {
          "heading": "temporary authority — the licensed path",
          "paras": [
            {
              "html": "The second bridge is for a <b>state-licensed</b> originator crossing into a new state. They get temporary authority in the new (application) state if they meet the standard requirements, are employed by a state-licensed company there, and held a license in a <em>different</em> state at some point during the <span class=\"cloze\" data-accept='[\"30 days\",\"30\",\"thirty\",\"thirty days\",\"30-day\"]' data-reveal=\"30 days\">?</span> before submitting the new application. The idea is the same both ways: an already-vetted originator shouldn't have to stop working just to change states."
            }
          ],
          "synth": {
            "q": "Contrast the two temporary-authority paths — the registered originator's versus the state-licensed originator's.",
            "a": "A registered LO (from an exempt entity) joining a state-licensed company gets temporary authority if they have a clean record, have submitted a state license application, and were NMLS-registered during the 1-year period before applying. A state-licensed LO moving to a new state gets it if they're employed by a licensed company there and held a license in a different state during the 30-day period before applying."
          }
        },
        {
          "heading": "when temporary authority ends",
          "paras": [
            {
              "html": "Temporary authority isn't open-ended — it ends at the <b>earliest</b> of four events: the originator withdraws the application, the state denies it (or signals intent to deny), the state grants the license, or <span class=\"cloze\" data-accept='[\"120 days\",\"120\",\"one hundred twenty\"]' data-reveal=\"120 days\">?</span> pass with the application still sitting incomplete. Whichever comes first closes the bridge."
            }
          ],
          "visual": "temp-authority-windows"
        },
        {
          "heading": "assumable loans",
          "paras": [
            {
              "html": "One product feature worth knowing: some mortgages can be <b>assumed</b> — a buyer takes over the seller's existing loan, qualifies for it, gets added to the note and title, and the seller is released. What makes a loan assumable is the <em>absence</em> of an <b>alienation clause</b> (also called a <b>due-on-sale clause</b>), the provision that would otherwise let the lender demand full repayment when the property changes hands. Without it, the loan can pass to a new owner. Government loans — <b>FHA, VA, and USDA</b> — are assumable, as are some conventional adjustable-rate loans."
            }
          ],
          "synth": {
            "q": "What makes a mortgage assumable, and which loan types are?",
            "a": "A loan is assumable when it lacks an alienation (due-on-sale) clause — the provision that lets a lender accelerate the balance when the property's title changes. Without it, a qualified buyer can take over the loan. FHA, VA, and USDA loans are assumable, along with some conventional adjustable-rate mortgages."
          }
        },
        {
          "heading": "the loan-originator rule (see Module 3)",
          "paras": [
            {
              "html": "One more rulebook governs the job, but it isn't the SAFE Act's — it's the <b>CFPB Loan Originator Rule</b>, taught in full back in Module 3 under the Truth in Lending Act (12 CFR 1026.36). The short version: an originator's <b>compensation can't be tied to a loan's terms</b> (or a proxy for them), an originator <b>can't be paid by both the borrower and another party</b> on the same loan (no dual compensation), and steering a borrower into a worse loan for a bigger payday is off-limits. Its qualification duties simply echo the SAFE Act — be licensed or registered — and it requires the originator's and the company's names and NMLS identifiers to appear on certain loan documents. Treat it here as a cross-reference; the mechanics live in Module 3."
            }
          ]
        },
        {
          "heading": "the identifier, the file, and 'N/A'",
          "paras": [
            {
              "html": "Three habits round out compliant practice. Your <b>unique identifier</b> has to appear on every application, solicitation, and advertisement — business cards and websites included — and you disclose it to anyone who asks. Every loan gets an organized <b>loan file</b> holding the records that support and service it. And on the <b>Loan Estimate and Closing Disclosure</b>, the entry <b>\"N/A\" is prohibited</b> — a line that doesn't apply is simply left <b>blank</b>."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "the point",
            "topic": "Temporary authority",
            "q": "What problem does temporary authority solve?",
            "a": "it lets a vetted originator <span class='hl'>work in a new state before the license issues</span>, instead of sitting idle"
          },
          {
            "peg": "no due-on-sale",
            "topic": "Assumable loans",
            "q": "The clause whose ABSENCE makes a loan assumable?",
            "a": "the <span class='hl'>alienation (due-on-sale) clause</span>"
          },
          {
            "peg": "gov't loans",
            "topic": "Assumable loans",
            "q": "Which loan types are assumable?",
            "a": "<span class='hl'>FHA, VA, and USDA</span> (and some conventional ARMs)"
          },
          {
            "peg": "leave it blank",
            "topic": "Loan documents",
            "q": "How is an inapplicable line handled on the LE and CD?",
            "a": "left <span class='hl'>blank</span> — 'N/A' is prohibited"
          }
        ],
        "mcq": [
          {
            "q": "Temporary authority ends at the EARLIEST of all EXCEPT —",
            "opts": [
              "the applicant withdraws the application",
              "the state grants the license",
              "the state denies the application",
              "the applicant's first anniversary in the industry"
            ],
            "correct": 3
          },
          {
            "q": "A registered LO's temporary authority requires NMLS registration during the — before applying.",
            "opts": [
              "30-day period",
              "1-year period",
              "5-year period",
              "120-day period"
            ],
            "correct": 1
          },
          {
            "q": "A loan is assumable when it lacks —",
            "opts": [
              "a prepayment penalty",
              "an alienation (due-on-sale) clause",
              "an escrow account",
              "mortgage insurance"
            ],
            "correct": 1
          },
          {
            "q": "On the Loan Estimate and Closing Disclosure, an inapplicable field must be —",
            "opts": [
              "marked 'N/A'",
              "left blank",
              "crossed out",
              "filled with zeros"
            ],
            "correct": 1
          }
        ]
      }
    }
  ]
};

export default section4;

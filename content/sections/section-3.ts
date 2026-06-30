import type { SectionContent } from "@/lib/section";

// Section 3 — Federal mortgage related laws. Recall-gradient shape (cloze / synth / review).
// Self-contained: every tested fact is taught in the unit's narrative prose before it is tested.
// Numbers verified against source. HOEPA $27,592 is a 2026 value (resets annually).

const section3: SectionContent = {
  "id": "federal-mortgage-laws",
  "title": "Federal mortgage related laws",
  "kicker": "Section 3",
  "units": [
    {
      "id": "respa",
      "name": "RESPA",
      "reg": "Real Estate Settlement Procedures Act · Reg X",
      "definitions": [
        { "term": "Application", "def": "The borrower's financial information submitted for a mortgage credit decision. At minimum: name, monthly income, SSN, property address, estimated property value or purchase price, and loan amount. Once the lender has enough to treat it as submitted, disclosure timing kicks in — even if some details are still missing." },
        { "term": "Balloon Payment", "def": "A lump-sum payment due before a loan would naturally pay itself off through regular installments. The borrower owes whatever principal remains in one large payment." },
        { "term": "Bureau", "def": "The Consumer Financial Protection Bureau (CFPB)." },
        { "term": "Business Day", "def": "A day the business is open and running normal operations. RESPA breaks this into Calendar Day, Precise Business Day, and General Business Day — each counted differently." },
        { "term": "Changed Circumstances", "def": "A valid reason to revise a Loan Estimate after it's been issued." },
        { "term": "Dealer", "def": "For property improvement loans: a seller, contractor, or supplier. For manufactured home loans: a retailer who sells manufactured homes." },
        { "term": "Dealer Loan / Dealer Consumer Credit Contract", "def": "An arrangement where a dealer helps a borrower get a mortgage, then assigns its interest to the funding lender and receives the proceeds. The funding lender handles disclosures — unless the dealer qualifies as a creditor." },
        { "term": "Federally Related Mortgage Loan", "def": "A residential mortgage on a one-to-four unit home used as a primary residence, secondary residence, or investment (rental) property." },
        { "term": "HUD", "def": "The U.S. Department of Housing and Urban Development." },
        { "term": "Lender", "def": "The secured creditor named in the loan documents. In a table-funded deal, the lender is whoever the loan is assigned to at or after closing. In a dealer loan, the assignee — unless the dealer qualifies as a creditor." },
        { "term": "Loan Originator", "def": "A person who originates residential mortgage loans while employed by or sponsored by a mortgage lender or broker." },
        { "term": "Markup", "def": "The amount a lender, broker, or loan originator adds to a third-party settlement service fee and keeps — not passed through to the provider." },
        { "term": "Mortgage Broker", "def": "An intermediary between borrowers and lenders in a federally related mortgage transaction. Not a lender's employee. May close the loan in their own name in a table-funded deal." },
        { "term": "Mortgaged Property", "def": "The real estate used as collateral for the mortgage loan." },
        { "term": "Origination Service", "def": "Any service involved in creating a mortgage — taking the application, processing, underwriting, funding, and the administrative work behind those steps." },
        { "term": "Person", "def": "An individual, corporation, association, partnership, or trust." },
        { "term": "Prepayment Penalty", "def": "A fee triggered when the borrower pays off more than a defined amount ahead of schedule. Typically a percentage of the prepaid amount, spelled out in the promissory note, and only applies before a specified date." },
        { "term": "Public Guidance Documents", "def": "Federal Register documents the CFPB has adopted or published, updatable by new Federal Register entries." },
        { "term": "Refinancing", "def": "Replacing an existing mortgage (secured by the same residential property) with a new loan — same borrower, same or different lender." },
        { "term": "Regulation Z", "def": "The CFPB's rules (12 CFR 1026) implementing the Truth in Lending Act, including its official Commentary." },
        { "term": "Required Use", "def": "When a borrower must use a specific settlement service provider to access a loan or property — and pays for it. Optional discount packages with genuine savings don't count." },
        { "term": "Servicer", "def": "The entity responsible for servicing a mortgage — collecting payments, managing escrow, distributing funds. The lender itself can also be the servicer." },
        { "term": "Servicing", "def": "Collecting a borrower's scheduled payments (including escrow), then distributing principal, interest, and other amounts to the loan owner or third parties. For reverse mortgages, also includes making payments to the borrower." },
        { "term": "Settlement", "def": "The process of executing legally-binding documents for a mortgage lien on property. Also called \"closing\" or \"escrow\" depending on the jurisdiction." },
        { "term": "Settlement Service", "def": "Any service connected to a mortgage settlement: loan origination, broker services, title work, attorney services, document prep, credit reports, appraisals, inspections, insurance, taxes, agent services — anything charged at closing." },
        { "term": "Special Information Booklet", "def": "A booklet (currently the HUD Home Loan Toolkit) required under RESPA Section 5 to help borrowers understand settlement services and costs." },
        { "term": "State", "def": "Any U.S. state, the District of Columbia, Puerto Rico, or any U.S. territory or possession." },
        { "term": "Table Funding", "def": "A closing where the loan is funded by an immediate advance from a third party and simultaneously assigned to that party. Not a secondary market transaction." },
        { "term": "Third Party", "def": "Any settlement service provider other than the loan originator." },
        { "term": "Title Company", "def": "An institution (or its authorized agent) qualified to issue title insurance." },
        { "term": "Title Service", "def": "Any service involved in providing title insurance — examination, commitment prep, clearing objections, issuing the policy, and related admin. Also includes conducting the settlement." },
        { "term": "Tolerance", "def": "The maximum amount a settlement cost category can exceed its Loan Estimate figure. The allowable overage depends on which tolerance bucket the charge falls into." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "You're buying a house. Between the offer and the keys, a dozen companies you never picked get paid out of your closing — a title company, an escrow agent, an appraiser, a credit bureau. <b>RESPA governs that stretch</b>. It does two jobs: it forces those settlement costs into the open through required disclosures, and it bans the back-channel payments that used to quietly inflate them. The CFPB enforces it under <b>Regulation X</b>, and the records behind a covered loan have to be kept for at least 5 years."
            }
          ]
        },
        {
          "heading": "what it covers",
          "anchor": {
            "file": "17-laundromat.png",
            "caption": "outside RESPA",
            "kind": "bldg"
          },
          "paras": [
            {
              "html": "RESPA only reaches <b>consumer mortgages</b>. Borrow to buy a laundromat, an office, or a stretch of raw land and you're outside it — those are business deals, and the law assumes that borrower can look after themselves. Two edges trip people up: a temporary bridge loan keeps its exemption only while its term stays short — a year or less — and vacant land is exempt unless construction starts within two years. So a bridge loan crosses back under RESPA the moment its term runs longer than <span class=\"cloze\" data-accept='[\"12 months\",\"12 month\",\"12\",\"twelve\",\"twelve months\",\"a year\",\"one year\"]' data-reveal=\"12 months\">?</span>."
            }
          ]
        },
        {
          "heading": "prohibitions against kickbacks and unearned fees",
          "anchor": {
            "file": "burglar-knight.PNG",
            "caption": "Section 8",
            "kind": "char"
          },
          "paras": [
            {
              "html": "Section 8 of RESPA is the anti-kickback rule. It prohibits the exchange of <em>anything of value</em> between actual or potential referral sources in connection with a federally related mortgage loan. The logic is straightforward: if real estate professionals can earn rewards for steering borrowers to specific service providers, the borrower's interests stop driving the referral — the reward does."
            },
            {
              "html": "The prohibition runs in both directions: no person may <em>give</em> and no person may <em>accept</em> any fee, kickback, or other thing of value tied to the referral of settlement service business. A referral itself is not a compensable service — a company cannot pay another company, or another company's employees, simply for sending business its way."
            },
            {
              "html": "The same principle blocks fee-splitting for work not performed. No one may give or accept any portion, split, or percentage of a charge for rendering a settlement service unless it's for services <em>actually performed</em>. A charge for which no real work — or only nominal work — is done is an unearned fee and a violation. Duplicative charges for the same service are also unearned fees."
            },
            {
              "html": "RESPA defines \"thing of value\" broadly: money, discounts, commissions, stock, dividends, partnership distributions, franchise royalties, future credits, the opportunity to participate in a money-making program, trips, payment of another person's expenses, services at special or free rates, sales or rentals at special prices, and lease payments tied to referral volume. The term \"payment\" is synonymous with giving or receiving any thing of value — it does not require the transfer of money."
            },
            {
              "html": "An agreement to refer business doesn't have to be written or even spoken. A practice, pattern, or course of conduct can establish it. When something of value is received repeatedly and is connected in any way to the volume or value of the business referred, that pattern is evidence of an agreement."
            }
          ]
        },
        {
          "heading": "what counts as a referral",
          "paras": [
            {
              "html": "Under RESPA, a \"referral\" is any oral or written action that has the effect of <em>affirmatively influencing</em> someone's selection of a settlement service provider — when that person will pay for the service. It also covers situations where a borrower is <em>required</em> to use a particular provider."
            },
            {
              "html": "Seven categories of payments are allowed despite the referral prohibition. The common thread: each involves compensation for <em>work actually done</em>, not for steering business."
            },
            {
              "html": "Payments to an attorney for services actually rendered. Payments by a title company to its appointed agent for work actually performed in issuing a title policy. Payments by a lender to its agent or contractor for work actually performed in originating, processing, or funding a loan. Bona fide salary or compensation for goods or facilities actually furnished or services actually performed. Cooperative brokerage and referral arrangements <em>solely between real estate agents and brokers</em>. Normal promotional and educational activities that are not conditioned on referrals and don't defray expenses for people in a position to refer. An employer's payment to its own employees for referral activities."
            }
          ],
          "synth": {
            "q": "A mortgage lender sends a real estate agent gift cards and spa trips whenever the agent refers a homebuyer who closes a loan. The lender argues these are \"promotional activities.\" Does this violate Section 8 of RESPA, and why?",
            "a": "Yes. The promotional activities exception only applies to activities that are not conditioned on the referral of business. Here, the gifts are directly tied to completed referrals — the agent receives them specifically because borrowers closed loans. The pattern of repeated gifts connected to referral volume is itself evidence of an agreement to exchange things of value for referrals, which Section 8 prohibits."
          }
        },
        {
          "heading": "section 8 penalties",
          "paras": [
            {
              "html": "Any person who violates the kickback or unearned fee prohibitions faces a fine of up to <span class=\"cloze\" data-accept='[\"$10,000\",\"10000\",\"10,000\"]' data-reveal=\"$10,000\">?</span>, imprisonment for up to <span class=\"cloze\" data-accept='[\"1 year\",\"one year\",\"12 months\"]' data-reveal=\"1 year\">?</span>, or both."
            }
          ]
        },
        {
          "heading": "title companies",
          "paras": [
            {
              "html": "With limited exceptions, borrowers have the right to choose their own settlement service providers. Section 9 of RESPA targets one specific abuse: a seller forcing the buyer to use a particular title insurance company as a condition of the sale."
            },
            {
              "html": "No seller of property purchased with a federally related mortgage loan may require — directly or indirectly — that the buyer purchase title insurance from a specific title company. If a seller violates this rule, the penalty is <span class=\"cloze\" data-accept='[\"treble damages\",\"triple damages\",\"3 times\",\"three times\"]' data-reveal=\"treble damages\">?</span> — the seller is liable to the buyer for three times all charges made for the title insurance."
            }
          ]
        },
        {
          "heading": "three types of days",
          "visual": "lifecycle-timeline",
          "paras": [
            {
              "html": "RESPA's disclosure deadlines use three different definitions of \"day,\" and the exam tests whether you can tell them apart."
            },
            {
              "html": "A <b>calendar day</b> is every day — weekends, holidays, all of them. When a rule says \"60 calendar days,\" count every square on the calendar."
            },
            {
              "html": "A <b>precise business day</b> is every day except <span class=\"cloze\" data-accept='[\"Sundays and federal holidays\",\"sundays and holidays\",\"sundays & federal holidays\"]' data-reveal=\"Sundays and federal holidays\">?</span>. Saturdays count."
            },
            {
              "html": "A <b>general business day</b> adds one more filter: the entity in question must be <span class=\"cloze\" data-accept='[\"fully operational\",\"open\",\"open for business\"]' data-reveal=\"fully operational\">?</span> that day. A lender closed on Saturdays has fewer general business days than precise business days — which means a \"three general business days\" deadline can land later than \"three precise business days\" for the same event."
            }
          ],
          "synth": {
            "q": "What's the practical difference between a precise business day and a general business day, and why does it matter for disclosure deadlines?",
            "a": "A precise business day is every day except Sundays and federal holidays — Saturdays always count. A general business day adds the requirement that the entity in question must be fully operational that day. A lender closed on Saturdays would have fewer general business days than precise business days, so a \"three general business days\" deadline could fall later than a \"three precise business days\" deadline for the same event."
          }
        },
        {
          "heading": "special information booklet",
          "paras": [
            {
              "html": "When someone applies for a mortgage, the lender must issue a Special Information Booklet — also called the HUD Home Loan Toolkit — no later than <span class=\"cloze\" data-accept='[\"3 general business days\",\"three general business days\",\"3\"]' data-reveal=\"3 general business days\">?</span> from the application date. Its purpose is to help the applicant understand the nature and costs of settlement services. If two or more people apply together, the lender only needs to issue one copy to one of them. If a mortgage broker is involved, the broker issues it, relieving the lender of the obligation."
            },
            {
              "html": "The booklet is not required for every loan type. No Special Information Booklet is needed when the application is for a refinance, a closed-end subordinate lien, a reverse mortgage, or any other federally related mortgage loan whose purpose is not the purchase of a one-to-four-family residential dwelling."
            },
            {
              "html": "The booklet can be reproduced in any format — any color, paper, print — as long as no changes are made to the content and it remains clearly legible. It cannot be embedded inside a larger document."
            }
          ]
        },
        {
          "heading": "when your home is on the line",
          "paras": [
            {
              "html": "When a lender takes an application for a home equity line of credit (HELOC), it must issue a separate disclosure booklet — <em>When Your Home is on the Line: What You Need to Know About Home Equity Lines of Credit</em> — within <span class=\"cloze\" data-accept='[\"3 precise business days\",\"three precise business days\",\"3\"]' data-reveal=\"3 precise business days\">?</span> from the application date. Note the day type: <em>precise</em> business days, not the general business days used for the Special Information Booklet."
            },
            {
              "html": "The booklet explains how HELOCs function so the applicant can make an informed decision about whether and how to use the credit line."
            }
          ]
        },
        {
          "heading": "affiliated business arrangement disclosure",
          "paras": [
            {
              "html": "An <em>affiliated business arrangement</em> exists when someone in a position to refer settlement-related business has a direct ownership interest of more than <span class=\"cloze\" data-accept='[\"1%\",\"one percent\",\"1 percent\"]' data-reveal=\"1%\">?</span> in a settlement service provider and either refers business to that provider or influences its selection."
            },
            {
              "html": "The term <em>associate</em> covers a spouse, parent, or child of the referring person; a corporation or business that controls, is controlled by, or shares common control with them; an employer, officer, director, partner, franchisor, or franchisee; or anyone with an agreement whose purpose or practical effect is to let the referring person benefit financially from the referrals."
            },
            {
              "html": "When a borrower is referred to a third-party settlement service provider and an affiliate or associate relationship exists, the referrer must issue an Affiliated Business Arrangement Disclosure (ABAD) — either at the moment of referral or, if a mortgage application is involved, within three business days. The ABAD must disclose the nature of the relationship and ownership interest, the estimated range of costs the borrower can expect, and the borrower's right to use a different provider unless the service falls into an exempt category (appraiser, credit repository, lender attorney, mortgage insurance company, flood search, or tax search)."
            },
            {
              "html": "Lenders must retain copies of all ABADs and supporting documentation for at least five years from execution."
            }
          ],
          "synth": {
            "q": "A loan officer refers a borrower to a title company owned by the loan officer's spouse. What disclosure is required, when must it be issued, and what must it contain?",
            "a": "The loan officer must issue an Affiliated Business Arrangement Disclosure (ABAD), either at the time of referral or within three business days. The ABAD must disclose the nature of the relationship (the spouse's ownership interest in the title company), the estimated range of costs for the title services, and the borrower's right to use a different title company."
          }
        },
        {
          "heading": "sham affiliated business arrangements",
          "paras": [
            {
              "html": "An affiliated business arrangement is legal — RESPA allows it as long as the disclosure happens. The risk is when someone sets up a shell company that <em>looks</em> like an affiliated business but exists only to funnel referral fees. That's a sham arrangement, and it violates RESPA's anti-kickback provisions."
            },
            {
              "html": "The scheme works like this: a loan officer or real estate agent creates a title company, appraisal firm, or other settlement service provider. On paper, it's a separate business. In practice, it has no real employees, no real office, and no real operations — it exists to receive referrals from its owner and pass the actual work to a third party while skimming a fee."
            },
            {
              "html": "In 1996, HUD published a ten-factor test for identifying sham arrangements. A federal court later ruled the test doesn't carry the force of law, but the factors remain useful as red flags. They all ask variations of one question: is this entity a real, functioning business?"
            },
            {
              "html": "The ten factors fall into three clusters. <strong>Does it operate independently?</strong> A real business has its own capital, its own employees, its own office, and controls its own affairs. <strong>Does it do real work?</strong> A real business performs the services it advertises rather than contracting them out and charging a markup for routing the paperwork. <strong>Does it compete for business?</strong> A real business serves multiple clients and competes in the open market — not just one referral source."
            }
          ],
          "synth": {
            "q": "A real estate brokerage creates a title company. The title company has no employees — all title work is subcontracted to a third party. Its only clients are borrowers referred by the brokerage. Using HUD's sham arrangement factors, what red flags are present?",
            "a": "Multiple red flags: the entity has no employees of its own (doesn't staff independently), it contracts out all actual work rather than performing the services it advertises, and it does no business with anyone outside its affiliate (doesn't compete in the open market). These factors suggest the title company exists to collect referral fees, not to provide settlement services — a sham affiliated business arrangement."
          }
        },
        {
          "heading": "homeownership counseling disclosure",
          "paras": [
            {
              "html": "Within three precise business days of a mortgage application, the lender or mortgage broker must issue a Homeownership Counseling Disclosure describing the benefits of independent, third-party homeownership counseling. Two loan types are exempt: reverse mortgages (which have their own separate counseling notice) and timeshare plans."
            },
            {
              "html": "The disclosure must be issued regardless of whether the loan requires the borrower to complete counseling — the point is to make sure every applicant knows the option exists. It must list at least <span class=\"cloze\" data-accept='[\"10\",\"ten\"]' data-reveal=\"10\">?</span> HUD-approved counseling agencies located as close as possible to the borrower's current zip code."
            }
          ]
        },
        {
          "heading": "mortgage servicing disclosure statement",
          "paras": [
            {
              "html": "Within three precise business days of a mortgage application — for transactions not already subject to the TILA-RESPA Integrated Disclosure Rule (TRID) — the lender, table-funding broker, or first-lien dealer must issue a Mortgage Servicing Disclosure Statement. It tells the applicant whether the loan's servicing can be assigned, sold, or transferred, and reports the likelihood based on how many loans the company transferred during the prior calendar year."
            },
            {
              "html": "Mortgage brokers who directly issue the Loan Estimate must also indicate their intent to transfer servicing on page three of the Loan Estimate under \"Other Considerations.\" Servicers must retain all servicing-related documents until at least <span class=\"cloze\" data-accept='[\"1 year\",\"one year\",\"12 months\"]' data-reveal=\"1 year\">?</span> after the loan is discharged or its servicing is transferred."
            }
          ]
        },
        {
          "heading": "initial escrow account disclosure statement",
          "visual": "escrow-accrual",
          "paras": [
            {
              "html": "When a mortgage closes with an escrow account for homeowner's insurance or property taxes, the lender must hand the borrower an Initial Escrow Account Disclosure Statement at settlement — also called the Escrow Accrual Sheet. It tells the borrower, as of closing day, exactly what their escrow account holds and what it's scheduled to pay."
            },
            {
              "html": "The statement identifies the total monthly mortgage payment and breaks out the escrow portion. It itemizes every charge the servicer expects to pay from the account during the computation year — taxes, insurance premiums, other recurring items — along with each charge's expected disbursement date, dollar amount, and recipient."
            },
            {
              "html": "When a charge is scheduled to come due within <span class=\"cloze\" data-accept='[\"60 calendar days\",\"60 days\",\"60\"]' data-reveal=\"60 calendar days\">?</span> of settlement, the lender typically does not collect it at closing. Servicers can take that long to activate a new loan on their system, and a payment falling due before activation becomes a servicer-owned delinquency. To avoid that, a third party — usually the title or escrow company — collects the funds at closing and takes responsibility for disbursing them, or the borrower signs the disclosure acknowledging the payment as their own responsibility."
            }
          ],
          "synth": {
            "q": "A borrower's property tax is due 50 days after settlement. Under RESPA's escrow rules, what happens to that payment at closing, and why?",
            "a": "Because the payment falls within 60 calendar days of settlement, the lender typically does not collect it at closing — servicers can take up to 60 days to activate a new loan on their system. Either a third party (such as the title or escrow company) collects and disburses the payment at settlement, or the borrower signs the Initial Escrow Account Disclosure Statement acknowledging the payment as their own responsibility."
          }
        },
        {
          "heading": "aggregate escrow analysis statement",
          "visual": "escrow-analysis",
          "paras": [
            {
              "html": "No later than <span class=\"cloze\" data-accept='[\"45 calendar days\",\"45 days\",\"45\"]' data-reveal=\"45 calendar days\">?</span> after settlement, the servicer must run an escrow account analysis — and then repeat it annually."
            },
            {
              "html": "The analysis checks two things: that the account holds enough to cover each anticipated disbursement on the date it falls due, and that the monthly escrow contribution collects exactly <span class=\"cloze\" data-accept='[\"1/12\",\"one twelfth\",\"one-twelfth\"]' data-reveal=\"1/12\">?</span> of the projected annual total."
            },
            {
              "html": "The resulting annual statement looks in both directions. Looking back: the prior year's monthly payment and escrow portion, the total paid into the account, the total paid out by category (taxes itemized separately from insurance), and the ending balance. Looking forward: the servicer's projected disbursements for the coming year."
            },
            {
              "html": "The statement must also account for gaps between plan and reality. A surplus — money left over — gets explained: how the servicer is handling it, typically a refund or credit toward future payments. A shortage or deficiency gets explained: how the borrower is expected to make it up. If the account's actual low balance differed from the prior year's projection, the statement must say why."
            }
          ],
          "synth": {
            "q": "What two calculations does the annual escrow analysis verify, and what must the statement address when the account's balance deviates from what was projected?",
            "a": "It verifies (1) that the account holds enough to cover all anticipated disbursements on their due dates, and (2) that the monthly escrow contribution collects exactly 1/12 of the projected annual total. A surplus must be explained (how the servicer handles it). A shortage or deficiency must be explained (how the borrower will make it up). If the actual low balance differed from the prior year's projection, the statement must explain why."
          }
        },
        {
          "heading": "transfer of servicing disclosure",
          "visual": "servicing-transfer",
          "paras": [
            {
              "html": "When a loan's servicing is transferred, two notices are required — one from each side."
            },
            {
              "html": "The releasing servicer must send a \"goodbye letter\" no later than <span class=\"cloze\" data-accept='[\"15 calendar days\",\"15 days\",\"15\"]' data-reveal=\"15 calendar days\">?</span> <em>before</em> the transfer date. It must state when the transfer takes effect, provide the new servicer's name, address, and contact information, and confirm that the transfer does not change any term or condition of the loan."
            },
            {
              "html": "The receiving servicer must send a \"welcome letter\" no later than 15 calendar days <em>after</em> the transfer date, repeating the same information: effective date, contact details, and the assurance that no loan terms have changed."
            },
            {
              "html": "During the 60-calendar-day period beginning on the transfer date, the new servicer cannot charge late fees or report late payments to credit bureaus if the borrower accidentally sends payment to the old servicer. Once the 60 days pass, any remaining delinquency is treated normally."
            }
          ],
          "synth": {
            "q": "A borrower keeps sending payments to their old servicer for two months after a servicing transfer. What protections apply during that period, and what changes after?",
            "a": "During the 60-calendar-day period following the transfer, the new servicer is prohibited from charging late fees or reporting late payments to credit bureaus when a borrower inadvertently pays the old servicer. After the 60 days, the protection expires — the new servicer can assess late charges and report payment history to the credit bureaus."
          }
        },
        {
          "heading": "escrow accounts",
          "paras": [
            {
              "html": "An escrow account — also called an impound account — is a holding account built into the mortgage through which the servicer pays certain obligations on the borrower's behalf. Servicers prefer escrow accounts because they guarantee that homeowner's insurance and property taxes stay current. If either lapses, the servicer is exposed: an uninsured loss destroys its collateral, and a delinquent tax bill can trigger a tax sale that wipes out the mortgage lien entirely."
            },
            {
              "html": "Escrow is mandatory in several situations. If a conventional loan requires private mortgage insurance (PMI), escrow for homeowner's insurance and property taxes is required. If the property sits in a flood zone requiring flood insurance, escrow for at least flood insurance and taxes is required. If the loan is a Higher-Priced Mortgage Loan (HPML), escrow for taxes and insurance is mandatory for no less than the loan's first <span class=\"cloze\" data-accept='[\"5 years\",\"five years\",\"5\"]' data-reveal=\"5 years\">?</span>. All government loans — FHA, VA, and USDA — mandate escrow for homeowner's insurance and taxes with no exception."
            },
            {
              "html": "A borrower on a conventional loan can petition to eliminate escrow once PMI is no longer required. On an HPML, the borrower can petition at the later of five years or when PMI drops off."
            }
          ]
        },
        {
          "heading": "how escrow accounts work",
          "paras": [
            {
              "html": "Each month, the servicer collects 1/12 of the anticipated annual disbursements along with the loan's principal and interest payment. The insurance company and tax authority bill the servicer directly, and the servicer disburses on the borrower's behalf. In states that require it, servicers must also pay interest to borrowers on the escrow balance."
            },
            {
              "html": "At the end of each computation year, the servicer runs an escrow analysis to recalculate the monthly escrow payment for the next year. The servicer estimates upcoming disbursements based on the most recent previous payment of each type. The analysis also determines whether the account has a surplus, shortage, or deficiency, and the servicer adjusts accordingly."
            },
            {
              "html": "After the analysis sets the correct balance, the servicer is permitted to add a cushion — a buffer against unexpected increases — amounting to no more than <span class=\"cloze\" data-accept='[\"1/6\",\"one sixth\",\"one-sixth\"]' data-reveal=\"1/6\">?</span> of the anticipated annual disbursements."
            }
          ]
        },
        {
          "heading": "escrow shortage, surplus, and deficiency",
          "paras": [
            {
              "html": "These three terms describe different problems, and the exam tests each one separately. A <strong>shortage</strong> means the account has less money than it needs to cover upcoming disbursements. A <strong>surplus</strong> (overage) means the account has more than it needs. A <strong>deficiency</strong> means the account balance is negative — the servicer has already paid out more than the account held. A deficiency is independent of a shortage or surplus."
            },
            {
              "html": "<strong>Shortage.</strong> If the shortage is less than one monthly escrow payment, the servicer has three options: allow it to exist and do nothing, require the borrower to repay it within 30 days, or spread repayment over at least 12 months interest-free. If the shortage is equal to or greater than one monthly escrow payment, only two options remain: do nothing, or spread repayment over at least <span class=\"cloze\" data-accept='[\"12 months\",\"12\",\"twelve months\"]' data-reveal=\"12 months\">?</span> interest-free. The 30-day lump-sum demand is not available for larger shortages."
            },
            {
              "html": "<strong>Surplus.</strong> If the surplus is <span class=\"cloze\" data-accept='[\"$50\",\"50\",\"50 dollars\",\"50.00\"]' data-reveal=\"$50\">?</span> or more, the servicer must refund it to the borrower within 30 days of the analysis. If the surplus is less than that threshold, the servicer may either refund it or credit it against next year's escrow payments."
            },
            {
              "html": "<strong>Deficiency.</strong> If the deficiency is less than one monthly escrow payment, the servicer has three options: do nothing, require repayment within 30 days, or spread repayment over two or more monthly installments. If the deficiency equals or exceeds one monthly escrow payment, the servicer can do nothing or require repayment in two or more equal monthly payments."
            }
          ],
          "synth": {
            "q": "An escrow analysis reveals a $1,000 shortage that exceeds the borrower's monthly escrow payment of $400. What are the servicer's options for resolving the shortage?",
            "a": "Because the shortage exceeds one monthly escrow payment, the servicer has two options: allow it to exist and do nothing, or require the borrower to repay the shortage in equal monthly payments spread over at least 12 months, interest-free. The servicer cannot demand a lump-sum repayment within 30 days — that option is only available when the shortage is less than one monthly escrow payment."
          }
        },
        {
          "heading": "error resolution procedures",
          "paras": [
            {
              "html": "When a borrower believes the servicer has made an error, RESPA provides a structured resolution process. A valid notice of error must be in writing and include three things: the borrower's name, information sufficient to identify the mortgage account, and a description of the alleged error. A note scribbled on a payment coupon does not count — but a qualified written request that asserts a servicing error does, and the servicer must treat it as a notice of error."
            },
            {
              "html": "RESPA defines eleven categories of covered errors. They include failing to accept a conforming payment, failing to apply a payment correctly to principal, interest, or escrow, failing to credit a payment as of the date received, failing to pay taxes or insurance from escrow on time, imposing a fee without reasonable basis, providing an inaccurate payoff balance, providing inaccurate loss mitigation or foreclosure information, failing to transfer servicing information accurately, and inappropriately initiating or advancing a foreclosure. The eleventh is a catch-all: any other error relating to the servicing of a mortgage loan."
            }
          ]
        },
        {
          "heading": "error resolution timelines",
          "paras": [
            {
              "html": "Once the servicer receives a notice of error, the clock starts. Within <span class=\"cloze\" data-accept='[\"5 days\",\"five days\",\"5\"]' data-reveal=\"5 days\">?</span> (excluding Saturdays, Sundays, and federal holidays), the servicer must send a written acknowledgment of receipt."
            },
            {
              "html": "The servicer then has two paths: correct the error and notify the borrower of the correction, its effective date, and contact information for further help — or investigate and send a written explanation that no error occurred, with the reasoning, the borrower's right to request the documents the servicer relied on, and contact information."
            },
            {
              "html": "Time limits for the response depend on the error type. Payment-related errors (failure to accept or credit a conforming payment) must be resolved within <span class=\"cloze\" data-accept='[\"7 days\",\"seven days\",\"7\"]' data-reveal=\"7 days\">?</span> (excluding weekends and holidays). Foreclosure-related errors must be resolved before the foreclosure sale date or within 30 days, whichever is earlier. All other errors must be resolved within 30 days."
            },
            {
              "html": "The servicer can extend the response period by an additional 15 days (excluding weekends and holidays) as long as it notifies the borrower of the extension and the reasons for it in writing before the original 30-day period expires."
            }
          ],
          "synth": {
            "q": "A borrower sends a written notice asserting that the servicer failed to credit a payment. Walk through the timeline: what must the servicer do, and by when?",
            "a": "Within 5 days (excluding weekends and holidays), the servicer must send a written acknowledgment of receipt. Then, because this is a payment-related error, the servicer must resolve it within 7 days (excluding weekends and holidays) — either by correcting the error and notifying the borrower, or by investigating and providing a written explanation that no error occurred, including the borrower's right to request supporting documents."
          }
        },
        {
          "heading": "bona fide discount points",
          "paras": [
            {
              "html": "Discount points are upfront interest that a borrower pays at settlement to buy a lower interest rate than the market's current \"par\" rate. One discount point costs <span class=\"cloze\" data-accept='[\"1%\",\"one percent\",\"1 percent\"]' data-reveal=\"1%\">?</span> of the loan amount. Points can be purchased in increments as small as 1/8 of a percent."
            },
            {
              "html": "On a $375,000 loan, one full point costs $3,750. Five-eighths of a point costs $2,343.75. One and three-quarter points costs $6,562.50. The math is always the loan amount multiplied by the point percentage."
            },
            {
              "html": "The number of points purchased does not correspond directly to the rate reduction — buying 1.5 points on a 6% par rate does not guarantee a 4.5% rate. Point pricing fluctuates just like interest rates. The loan originator accesses a pricing matrix that shows the specific rate reduction each point amount buys across available products."
            },
            {
              "html": "To help a borrower decide whether points make sense, calculate the break-even period: divide the cost of the points by the monthly payment reduction. If a borrower spends $2,000 on points and saves $40 per month, the break-even is 50 months — about four years and two months. If the borrower plans to stay in the home longer than that, the points may be worthwhile. If not, they may not be."
            },
            {
              "html": "Discount point costs may be tax-deductible, but a mortgage loan originator who is not a credentialed tax advisor should never give definitive tax advice. The compliant MLO refers tax questions to a qualified tax professional or the IRS."
            }
          ],
          "synth": {
            "q": "A borrower is considering purchasing 1.25 discount points on a $400,000 loan. The points would reduce the monthly payment by $65. Calculate the cost and the break-even period.",
            "a": "The cost is $400,000 × 1.25% = $5,000. The break-even period is $5,000 ÷ $65 = approximately 77 months, or about six years and five months. If the borrower expects to keep the loan longer than that, the points may be worthwhile."
          }
        },
        {
          "heading": "the security instruments",
          "paras": [
            {
              "html": "When a borrower finances a home, two documents create the obligation. The <strong>Promissory Note</strong> is the debt instrument — the borrower's promise to repay the loan under its stated terms. The <strong>Security Instrument</strong> creates a lien against the property, giving the lender the right to take ownership of the collateral if the borrower defaults. The type of security instrument determines the type of foreclosure."
            },
            {
              "html": "A <strong>Mortgage</strong> is one type of security instrument. A <strong>Deed of Trust</strong> (also called a Trust Deed) is the other. Which one is used depends on state law. The distinction matters because a Mortgage leads to judicial foreclosure and a Deed of Trust leads to <span class=\"cloze\" data-accept='[\"non-judicial foreclosure\",\"nonjudicial foreclosure\",\"non judicial foreclosure\"]' data-reveal=\"non-judicial foreclosure\">?</span>."
            }
          ]
        },
        {
          "heading": "judicial vs non-judicial foreclosure",
          "paras": [
            {
              "html": "Foreclosure is a last resort. A foreclosed property is a liability for the lender — it must pay taxes, insurance, and maintenance on the property until it can sell it. Lenders exhaust all state and federal loss-mitigation options before proceeding."
            },
            {
              "html": "<strong>Judicial foreclosure</strong> applies when the security instrument is a Mortgage. The lender files an action in court and must demonstrate three things: the lien is valid, the default is valid, and all legally required attempts to avoid foreclosure were made and failed. If the court agrees, it issues an order of foreclosure. The borrower then has a state-defined <span class=\"cloze\" data-accept='[\"period of redemption\",\"redemption period\"]' data-reveal=\"period of redemption\">?</span> during which they can recover the property by satisfying the debt in full. If the borrower doesn't redeem, the local sheriff conducts a foreclosure sale auction. The first-lien holder has first right of redemption — it gets the first bid."
            },
            {
              "html": "<strong>Non-judicial foreclosure</strong> applies when the security instrument is a Deed of Trust. The process is simpler because, technically, the lender already holds title to the property — it would have transferred to the borrower only after full repayment. On default, the lender appears in court to demonstrate the validity of the lien, the default, and the exhaustion of alternatives, then obtains permission to sell the property to recover its investment."
            },
            {
              "html": "In either case, if the property sells for less than what the borrower owes, the lender may pursue a <span class=\"cloze\" data-accept='[\"deficiency judgment\",\"deficiency\"]' data-reveal=\"deficiency judgment\">?</span> against the former borrower for the difference — if the state's laws allow it."
            }
          ],
          "synth": {
            "q": "A borrower defaults on a mortgage in a state that uses Deeds of Trust. What type of foreclosure applies, and how does it differ from the alternative?",
            "a": "A Deed of Trust triggers non-judicial foreclosure. The process is simpler than judicial foreclosure (used with Mortgages) because the lender technically already holds title — the property would have transferred to the borrower only upon full repayment. The lender still must demonstrate a valid lien, a valid default, and exhaustion of loss-mitigation options, but doesn't need a full court action with a state-defined period of redemption and sheriff's auction the way judicial foreclosure does."
          }
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "keep it",
            "topic": "Recordkeeping",
            "q": "How long are RESPA records kept?",
            "a": "at least <span class='hl'>5 years</span>"
          },
          {
            "peg": "the days",
            "topic": "Disclosures",
            "q": "Name the three types of days used in RESPA disclosure deadlines.",
            "a": "<span class='hl'>Calendar day</span> (every day), <span class='hl'>precise business day</span> (every day except Sundays and federal holidays), and <span class='hl'>general business day</span> (same exclusions, plus the entity must be fully operational)."
          },
          {
            "peg": "the toolkit",
            "topic": "Disclosures",
            "q": "What is another name for the Special Information Booklet, and when must it be issued?",
            "a": "The <span class='hl'>HUD Home Loan Toolkit</span>. Issued within <span class='hl'>3 general business days</span> of application."
          },
          {
            "peg": "ABAD files",
            "topic": "Recordkeeping",
            "q": "How long must a lender retain copies of Affiliated Business Arrangement Disclosures?",
            "a": "At least <span class='hl'>5 years</span> from execution."
          },
          {
            "peg": "the sham",
            "topic": "Affiliated businesses",
            "q": "What is a sham affiliated business arrangement under RESPA?",
            "a": "A shell company that <span class='hl'>appears</span> to be a legitimate settlement service provider but exists only to <span class='hl'>funnel referral fees</span> to its owner — it has no real operations, employees, or independent business."
          },
          {
            "peg": "ten factors",
            "topic": "Affiliated businesses",
            "q": "HUD's ten-factor test for sham arrangements asks one underlying question. What is it?",
            "a": "Is the entity a <span class='hl'>real, functioning business</span>? The factors check for independent capital, employees, office space, risk-taking, actual service performance, and competition in the open market."
          },
          {
            "peg": "accrual sheet",
            "topic": "Escrow accounts",
            "q": "What is another name for the Initial Escrow Account Disclosure Statement?",
            "a": "The <span class='hl'>Escrow Accrual Sheet</span>."
          },
          {
            "peg": "the letters",
            "topic": "Servicing transfers",
            "q": "What are the two letters required in a servicing transfer, and who sends each?",
            "a": "A <span class='hl'>goodbye letter</span> from the releasing servicer (15 calendar days before) and a <span class='hl'>welcome letter</span> from the receiving servicer (15 calendar days after)."
          },
          {
            "peg": "Section 8",
            "topic": "Kickbacks & referrals",
            "q": "What does Section 8 of RESPA prohibit?",
            "a": "The exchange of <span class='hl'>anything of value</span> between actual or potential referral sources in connection with a federally related mortgage loan — both giving and accepting."
          },
          {
            "peg": "unearned fee",
            "topic": "Kickbacks & referrals",
            "q": "What makes a settlement service charge an 'unearned fee' under RESPA?",
            "a": "A charge for which <span class='hl'>no or nominal services</span> are performed, or a <span class='hl'>duplicative charge</span> for the same service."
          },
          {
            "peg": "thing of value",
            "topic": "Kickbacks & referrals",
            "q": "Does RESPA's 'thing of value' require the transfer of money?",
            "a": "No. It includes discounts, stock, trips, special rates, services, future credits, and <span class='hl'>the opportunity to participate in a money-making program</span> — anything, not just cash."
          },
          {
            "peg": "pattern as evidence",
            "topic": "Kickbacks & referrals",
            "q": "Can a kickback agreement exist without a written or verbal agreement?",
            "a": "Yes. A <span class='hl'>practice, pattern, or course of conduct</span> can establish it. Repeated receipt of value connected to referral volume is evidence of an agreement."
          },
          {
            "peg": "cooperative brokerage",
            "topic": "Kickbacks & referrals",
            "q": "Which exception allows referral payments between real estate professionals?",
            "a": "Cooperative brokerage and referral arrangements <span class='hl'>solely between real estate agents and brokers</span>."
          },
          {
            "peg": "impound account",
            "topic": "Escrow accounts",
            "q": "What is another name for an escrow account?",
            "a": "An <span class='hl'>impound account</span>."
          },
          {
            "peg": "deficiency vs shortage",
            "topic": "Escrow accounts",
            "q": "How does an escrow deficiency differ from an escrow shortage?",
            "a": "A <span class='hl'>deficiency</span> means the balance is negative — the servicer already paid out more than the account held. A <span class='hl'>shortage</span> means the account has less than it needs for upcoming disbursements but is not negative."
          },
          {
            "peg": "error extension",
            "topic": "Error resolution",
            "q": "Can a servicer extend the 30-day error resolution deadline, and by how much?",
            "a": "Yes — by <span class='hl'>15 additional days</span>, as long as the servicer notifies the borrower in writing before the original 30-day period expires."
          }
        ],
        "mcq": [
          {
            "q": "Which type of day excludes Sundays and federal holidays but counts Saturdays regardless of whether the lender is open?",
            "opts": [
              "Calendar day",
              "General business day",
              "Precise business day",
              "Settlement day"
            ],
            "correct": 2
          },
          {
            "q": "The Special Information Booklet is NOT required for which of the following?",
            "opts": [
              "A purchase of a single-family home",
              "A refinance",
              "A purchase with two co-applicants",
              "A purchase using a mortgage broker"
            ],
            "correct": 1
          },
          {
            "q": "A loan officer's sister works at an appraisal management company. The loan officer refers a borrower there. Is an ABAD required?",
            "opts": [
              "No — the referring party's relative is an appraiser, which is an exempt category",
              "Yes — the associate relationship (sibling) triggers the disclosure requirement",
              "No — the relative must have more than 1% ownership",
              "Yes, but only if the sibling is a direct supervisor"
            ],
            "correct": 1
          },
          {
            "q": "Which of the following is the strongest indicator of a sham affiliated business arrangement?",
            "opts": [
              "The affiliate has a separate office in the same building as the referrer",
              "The affiliate's only clients are borrowers referred by its owner",
              "The affiliate charges fees comparable to competitors",
              "The affiliate employs licensed professionals"
            ],
            "correct": 1
          },
          {
            "q": "HUD's sham arrangement guidelines:",
            "opts": [
              "Carry the full force of federal law after a Sixth Circuit ruling",
              "Were adopted as binding regulation by the CFPB in 2010",
              "Were rejected as legally binding by a federal court but remain useful as red flags",
              "Apply only to arrangements involving more than 10% ownership"
            ],
            "correct": 2
          },
          {
            "q": "Which document must itemize the anticipated disbursement dates, amounts, and recipients of escrow payments at settlement?",
            "opts": [
              "Annual Escrow Analysis Statement",
              "Initial Escrow Account Disclosure Statement",
              "Loan Estimate",
              "Closing Disclosure"
            ],
            "correct": 1
          },
          {
            "q": "Which disclosure uses \"general business days\" for its issuance deadline?",
            "opts": [
              "HELOC booklet",
              "Special Information Booklet",
              "Homeownership Counseling Disclosure",
              "Mortgage Servicing Disclosure Statement"
            ],
            "correct": 1
          },
          {
            "q": "Which of the following payments is an allowable exception under RESPA's kickback prohibition?",
            "opts": [
              "A title company paying a real estate agent for each client referred",
              "A lender paying its own contractor for work actually performed in funding a loan",
              "A settlement company paying another company's employees for referrals",
              "A service provider offering free vacations to loan officers who refer business"
            ],
            "correct": 1
          },
          {
            "q": "Which of the following loan types always requires an escrow account?",
            "opts": [
              "Conventional with 25% down payment",
              "FHA",
              "Conventional with no PMI",
              "HELOC"
            ],
            "correct": 1
          },
          {
            "q": "An MLO's borrower asks whether discount points are tax-deductible. The MLO should:",
            "opts": [
              "Confirm they are always fully deductible",
              "Explain that they are never deductible on a refinance",
              "Refer the borrower to a qualified tax professional or the IRS",
              "Calculate the deduction and include it in the Loan Estimate"
            ],
            "correct": 2
          }
        ]
      },
      "recap": {
        "plainLanguage": "RESPA exists to stop kickbacks and hidden referral fees in the home-buying process, and to make sure borrowers can see exactly what they're paying for settlement services before they're locked in.",
        "facts": [
          "Covers <span class=\"hl\">federally related mortgage loans</span> — most purchase and refi loans on 1–4 unit residential property.",
          "Section 8 bans <span class=\"hl\">kickbacks, referral fees, and unearned fee splitting</span> for settlement services.",
          "Section 8 penalties: up to <span class=\"hl\">1 year in prison</span> and a <span class=\"hl\">$10,000 fine</span> per violation. Section 9 (title-company steering) allows a private suit for <span class=\"hl\">treble damages</span>.",
          "Borrowers get a <span class=\"hl\">Loan Estimate</span> within 3 business days of application and a <span class=\"hl\">Closing Disclosure</span> at least 3 business days before closing.",
          "Servicers must acknowledge a Notice of Error within 5 business days and resolve it within <span class=\"hl\">30–45 business days</span>, depending on the error type."
        ]
      }
    },
    {
      "id": "ecoa",
      "name": "ECOA",
      "reg": "Equal Credit Opportunity Act · Reg B",
      "definitions": [
        { "term": "Account", "def": "An extension of credit." },
        { "term": "Adverse Action", "def": "Terminating an account, unfavorably changing its terms (when the change doesn't apply across the board to all accounts in that class), or refusing to increase credit for an applicant who requested it." },
        { "term": "Age", "def": "The number of fully elapsed years from an applicant's birth date." },
        { "term": "Applicant", "def": "Anyone who requests or has received credit from a creditor, including anyone who is or may become contractually liable on the credit (co-signers, guarantors, endorsers, etc.)." },
        { "term": "Application", "def": "An oral or written request for credit made through the creditor's established procedures. A \"completed\" application means the creditor has received everything it normally collects to evaluate that type and amount of credit." },
        { "term": "Business Credit", "def": "Credit extended primarily for business, commercial, or agricultural purposes." },
        { "term": "Consumer Credit", "def": "Credit extended to a person primarily for personal, family, or household purposes." },
        { "term": "Contractually Liable", "def": "Expressly obligated by agreement to repay all debts on an account." },
        { "term": "Credit", "def": "The right granted by a creditor to defer payment, incur debt and defer its payment, or buy goods/services and pay later." },
        { "term": "Credit Card", "def": "Any card, plate, coupon book, or device used to obtain money, property, or services on credit." },
        { "term": "Creditor", "def": "A person who regularly participates in credit decisions, including setting terms. Also includes assignees, transferees, or subrogees who participate, and anyone who regularly refers applicants to creditors." },
        { "term": "Credit Transaction", "def": "Every aspect of an applicant's dealings with a creditor — from application through collection — including information requirements, investigation procedures, creditworthiness standards, credit terms, and reporting." },
        { "term": "Discriminate Against an Applicant", "def": "Treating an applicant less favorably than others." },
        { "term": "Elderly", "def": "Age 62 or older." },
        { "term": "Empirically Derived and Other Credit Scoring Systems", "def": "A system that mechanically evaluates creditworthiness based on key applicant attributes and transaction aspects to determine whether someone qualifies for credit." },
        { "term": "Extend Credit", "def": "Granting credit in any form: new credit, increases, refinancing, renewals, consolidations, issuing replacement cards, or continuing existing credit without collecting at maturity." },
        { "term": "Good Faith", "def": "Honesty in fact in a transaction." },
        { "term": "Inadvertent Error", "def": "A mechanical, electronic, or clerical mistake that was unintentional and occurred despite reasonable procedures to prevent it." },
        { "term": "Judgmental System of Evaluating Applicants", "def": "Any creditworthiness evaluation system that is not an empirically derived, statistically sound credit scoring system — one that relies on human judgment rather than automated scoring." },
        { "term": "Marital Status", "def": "Being unmarried, married, or separated under applicable state law. \"Unmarried\" includes single, divorced, and widowed." },
        { "term": "Negative Factor or Value", "def": "Using a scoring weight for elderly applicants that is less favorable than the creditor's actual experience justifies, or less favorable than the weight given to the non-elderly group the creditor favors most." },
        { "term": "Open-End Credit", "def": "A credit plan where the borrower can make purchases or draw loans over time, directly or via a credit card or similar device, up to a limit the creditor sets." },
        { "term": "Person", "def": "A natural person, corporation, government entity, trust, estate, partnership, cooperative, or association." },
        { "term": "Pertinent Element of Creditworthiness", "def": "Any information a creditor obtains and considers (in a judgmental system) that has a demonstrable relationship to determining creditworthiness." },
        { "term": "Prohibited Basis", "def": "Race, color, religion, national origin, sex, marital status, or age (if the applicant can legally contract); the fact that income derives from public assistance; or the fact that the applicant has exercised rights under consumer credit protection laws." },
        { "term": "State", "def": "Any U.S. state, the District of Columbia, Puerto Rico, or any U.S. territory or possession." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "A lender can turn you down — what it can't do is turn you down for who you are. <b>ECOA makes it illegal to base a credit decision</b> on race, color, religion, national origin, sex, marital status, age, or the fact that your income comes from public assistance. The protection reaches further than the moment of denial: it's also a violation to act in a way that would discourage a reasonable person from even applying, on one of those grounds, which means a lender can break the law before any application is filed. ECOA lives in Regulation B."
            }
          ]
        },
        {
          "heading": "the paperwork trail",
          "anchor": {
            "file": "soldier-painting.PNG",
            "caption": "reason in writing",
            "kind": "char"
          },
          "paras": [
            {
              "html": "The teeth are in the timing. Once an application is complete, the creditor owes you a <b>Notice of Action Taken</b>, and the deadline is fixed: it must go out within 30 calendar days. That fixed window is what turns \"we'll get back to you\" into something a regulator can audit — so the creditor must send the Notice of Action Taken within <span class=\"cloze\" data-accept='[\"30 calendar days\",\"30 days\",\"30\",\"thirty\",\"thirty days\"]' data-reveal=\"30 calendar days\">?</span>. If the news is adverse, the clock runs the other way too: you have 30 days from that notice to demand the specific reasons behind it. ECOA application records have to be kept for <b>25 months</b>."
            }
          ],
          "synth": {
            "q": "After a completed application, what are the two ECOA deadlines — the creditor's to notify, and the applicant's to push back?",
            "a": "The creditor must send the Notice of Action Taken within 30 calendar days; after an adverse action, the applicant then has 30 days from that notification to request the specific reasons for the denial."
          }
        },
        {
          "heading": "the appraisal copy",
          "paras": [
            {
              "html": "You paid for the appraisal, so ECOA makes sure you see it. The creditor must hand over a free copy of any appraisal or written valuation <b>promptly on completion</b>, and the outside limit is three business days before consummation. No later than <span class=\"cloze\" data-accept='[\"3 business days\",\"3\",\"three\",\"three business days\"]' data-reveal=\"3 business days\">?</span> before consummation, that copy has to be in your hands. You're allowed to waive the three-day timing and take the copy later — but the copy itself is never optional."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "classes",
            "topic": "Protected classes",
            "q": "The two ECOA protected classes people forget?",
            "a": "<span class='hl'>receipt of public-assistance income</span>, and <span class='hl'>exercising rights</span> under consumer-credit law"
          },
          {
            "peg": "discouragement",
            "topic": "Discouragement",
            "q": "What is 'discouragement' under ECOA?",
            "a": "acting in a way that would discourage a reasonable person from applying, on a prohibited basis — a violation even with <span class='hl'>no formal application</span>"
          },
          {
            "peg": "treatment",
            "topic": "Disparate treatment",
            "q": "Disparate treatment means…",
            "a": "treating an applicant differently <span class='hl'>because of a protected class</span>"
          },
          {
            "peg": "impact",
            "topic": "Disparate impact",
            "q": "Disparate impact means…",
            "a": "a <span class='hl'>neutral policy</span> that harms a protected class without business justification"
          }
        ],
        "mcq": [
          {
            "q": "Which of these is a protected class under ECOA?",
            "opts": [
              "Sexual orientation",
              "Receipt of public-assistance income",
              "Political affiliation",
              "Profession"
            ],
            "correct": 1
          },
          {
            "q": "ECOA application records must be retained for —",
            "opts": [
              "12 months",
              "25 months",
              "3 years",
              "5 years"
            ],
            "correct": 1
          },
          {
            "q": "A neutral policy that disadvantages a protected class with no business justification is —",
            "opts": [
              "Disparate treatment",
              "Disparate impact",
              "Discouragement",
              "Redlining"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "tila",
      "name": "TILA",
      "reg": "Truth in Lending Act · Reg Z",
      "definitions": [
        { "term": "Advertisement", "def": "A commercial message in any medium that promotes a credit transaction." },
        { "term": "Application", "def": "A consumer's financial information submitted to obtain credit. For mortgages: name, income, SSN, property address, estimated value, and loan amount." },
        { "term": "Billing Cycle", "def": "The interval between regular periodic statements. Must be no longer than a quarter of a year, and is considered equal if it doesn't vary by more than four days." },
        { "term": "Bureau", "def": "The Consumer Financial Protection Bureau (CFPB)." },
        { "term": "Business Day", "def": "General: a day the creditor's offices are open for substantially all business. Precise: all calendar days except Sundays and federal holidays." },
        { "term": "Cash Price", "def": "The price at which a creditor would sell the property or service for cash. May include accessories, related services, taxes, and title/registration fees. Does not include finance charges." },
        { "term": "Closed-End Credit", "def": "A one-time loan repaid through periodic, contractually agreed-upon payments — not open-end credit." },
        { "term": "Consumer", "def": "A natural person to whom consumer credit is offered or extended, including anyone whose principal dwelling secures (or will secure) the credit." },
        { "term": "Consumer Credit", "def": "Credit offered to a consumer primarily for personal, family, or household purposes." },
        { "term": "Consummation", "def": "The moment a consumer becomes contractually obligated on a credit transaction." },
        { "term": "Credit", "def": "The right to defer payment of debt or to incur debt and defer its payment." },
        { "term": "Credit Sale", "def": "A sale in which the seller is a creditor. Includes lease-to-own arrangements where the consumer pays roughly the full value and can become the owner." },
        { "term": "Creditor", "def": "A person who regularly extends consumer credit subject to a finance charge or payable in more than four installments, and to whom the obligation is initially payable." },
        { "term": "Downpayment", "def": "An amount (including trade-in value) paid to reduce the cash price in a credit sale. A deferred portion counts as downpayment if it's due by the second regular payment and carries no finance charge." },
        { "term": "Dwelling", "def": "A one-to-four unit residential structure, whether or not attached to real property. Includes condos, co-ops, mobile homes, and trailers used as residences." },
        { "term": "Open-End Credit", "def": "A revolving credit plan where the consumer can borrow and repay repeatedly up to a limit, with finance charges applied to unpaid balances." },
        { "term": "Periodic Rate", "def": "A finance charge rate applied to a balance for a day, week, month, or other subdivision of a year." },
        { "term": "Person", "def": "A natural person or an organization: corporation, partnership, proprietorship, association, cooperative, estate, trust, or government unit." },
        { "term": "Prepaid Finance Charge", "def": "Any finance charge paid in cash or check before or at closing, or withheld from the loan proceeds." },
        { "term": "Residential Mortgage Transaction", "def": "A transaction creating a security interest in the consumer's principal dwelling to finance its acquisition or initial construction." },
        { "term": "Security Interest", "def": "An interest in property that secures a consumer credit obligation, recognized by state or federal law. Does not include incidental interests like proceeds, fixtures, or insurance." },
        { "term": "State", "def": "Any U.S. state, the District of Columbia, Puerto Rico, or any U.S. territory or possession." },
        { "term": "Successor in Interest", "def": "A person who receives ownership of a dwelling securing a closed-end loan through inheritance, family transfer, divorce decree, or transfer into a living trust where the original consumer remains a beneficiary." },
        { "term": "Board-Selected Benchmark Replacement", "def": "The SOFR-based index chosen by the Federal Reserve to replace LIBOR tenors (1-, 3-, 6-, and 12-month) for consumer loans." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "The rate in the ad isn't what the loan costs you. <b>The Truth in Lending Act forces out the all-in price</b> by standardizing two figures so you can hold two lenders side by side: the <b>annual percentage rate (APR)</b>, the cost of credit as a yearly rate, and the <b>finance charge</b>, the dollar total credit will cost over the life of the loan. Like RESPA, this is consumer law — a business-purpose loan falls outside it. TILA is Regulation Z."
            }
          ]
        },
        {
          "heading": "how exact the apr must be",
          "paras": [
            {
              "html": "A disclosed APR is allowed a little slack, and the amount depends on the loan's regularity. A <b>regular transaction</b> gets the tighter tolerance: the stated APR has to land within one-eighth of 1 percentage point of the true figure, above or below. So for a regular transaction the disclosed APR must be accurate within <span class=\"cloze\" data-accept='[\"1/8\",\"one-eighth\",\"one eighth\",\"an eighth\",\".125\",\"0.125\"]' data-reveal=\"1/8 of 1 percentage point\">?</span> of 1 percentage point. An <b>irregular transaction</b> — uneven payments or timing — gets a wider band of 1/4 of 1 percentage point."
            }
          ],
          "synth": {
            "q": "What are TILA's two APR accuracy tolerances, and which loan gets which?",
            "a": "A regular transaction must be accurate within 1/8 of 1 percentage point above or below the actual APR; an irregular transaction is allowed the wider band of 1/4 of 1 percentage point."
          }
        },
        {
          "heading": "the right of rescission",
          "anchor": {
            "file": "cowboy-business-man-tango.PNG",
            "caption": "back out",
            "kind": "char"
          },
          "paras": [
            {
              "html": "TILA hands you an escape on certain loans secured by your home. You <b>can't rescind buying</b> your own house — a purchase-money loan is final — but you can unwind a <b>refinance</b> on your principal dwelling. The window is short and it's three business days: counting every day except Sundays and federal holidays, you have <span class=\"cloze\" data-accept='[\"3 business days\",\"3\",\"three\",\"three business days\"]' data-reveal=\"3 business days\">?</span> after consummation to back out. Once you rescind, the lender has 20 calendar days to return what you paid in connection with the deal. If the lender never properly delivered the rescission disclosure, that window doesn't close in three days — it stretches to <b>3 years</b>."
            }
          ]
        },
        {
          "heading": "higher-priced loans",
          "paras": [
            {
              "html": "When a loan's APR runs far enough above the average prime offer rate (APOR), TILA tags it a <b>Higher-Priced Mortgage Loan (HPML)</b> and attaches an escrow requirement. The trigger scales with risk: a first-lien conforming loan crosses at <b>1.5 points or more</b> over APOR, a first-lien jumbo at 2.5, and a subordinate lien at 3.5. An HPML's escrow account stays mandatory for at least 5 years, and can come off only after that if the loan's LTV is 80% or less of the current balance."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "two figures",
            "topic": "Cost disclosures",
            "q": "The two cost figures TILA requires?",
            "a": "the <span class='hl'>APR</span> and the <span class='hl'>finance charge</span>"
          },
          {
            "peg": "stale window",
            "topic": "Rescission",
            "q": "If the rescission disclosure was never properly given, the window becomes…",
            "a": "<span class='hl'>3 years</span> after consummation"
          },
          {
            "peg": "refund",
            "topic": "Rescission",
            "q": "After a borrower rescinds, the lender returns money within…",
            "a": "<span class='hl'>20 calendar days</span>"
          },
          {
            "peg": "escrow off",
            "topic": "HPML escrow",
            "q": "An HPML escrow can be removed after 5 years if LTV is…",
            "a": "<span class='hl'>80%</span> or less of the current balance"
          }
        ],
        "mcq": [
          {
            "q": "The HPML threshold for a first-lien jumbo loan is APOR plus —",
            "opts": [
              "1.5 points",
              "2.5 points",
              "3.5 points",
              "6.5 points"
            ],
            "correct": 1
          },
          {
            "q": "The HPML threshold for a subordinate lien is APOR plus —",
            "opts": [
              "1.5 points",
              "2.5 points",
              "3.5 points",
              "5 points"
            ],
            "correct": 2
          },
          {
            "q": "Which loan is eligible for TILA's right of rescission?",
            "opts": [
              "A purchase-money loan on a new home",
              "A refinance secured by the principal dwelling",
              "A business-purpose loan",
              "An auto loan"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "hoepa",
      "name": "HOEPA",
      "reg": "Home Ownership & Equity Protection Act · TILA §32",
      "groups": [
        {
          "paras": [
            {
              "html": "Some loans cost enough that the law sets them apart and bolts on extra protection. <b>HOEPA is that tripwire.</b> Cross any one of three thresholds — on rate, on points and fees, or on the prepayment penalty — and the loan becomes a <b>\"high-cost\" mortgage</b> carrying a list of restrictions. The aim isn't to ban these loans but to make sure a borrower was warned and advised before signing. HOEPA sits inside TILA as Section 32, which is why you'll hear \"Section 32 loan.\""
            }
          ]
        },
        {
          "heading": "the rate trigger",
          "paras": [
            {
              "html": "The first threshold watches the APR against the average prime offer rate. A <b>first-lien loan</b> goes high-cost when its APR beats APOR by 6.5 percentage points or more. That first-lien tripwire — APR over APOR by <span class=\"cloze\" data-accept='[\"6.5\",\"6.5 percentage points\",\"6.5 points\",\"six and a half\"]' data-reveal=\"6.5 percentage points\">?</span> or more — is the one to fix. A subordinate lien, or a personal-property loan under $50,000, crosses at the steeper <b>8.5 percentage points</b> over APOR."
            }
          ],
          "synth": {
            "q": "What are HOEPA's two interest-rate triggers, and which lien gets which?",
            "a": "A first-lien loan is high-cost when its APR exceeds APOR by 6.5 percentage points or more; a subordinate lien (or a personal-property loan under $50,000) crosses at 8.5 percentage points or more over APOR."
          }
        },
        {
          "heading": "fees, penalties, counseling",
          "anchor": {
            "file": "witch-microphone.PNG",
            "caption": "counsel first",
            "kind": "char"
          },
          "paras": [
            {
              "html": "The other two triggers catch cost loaded elsewhere. On a loan of <b>$27,592 or more</b> (the 2026 figure), total points and fees that come to more than 5% of the loan amount make it high-cost — so once points and fees cross <span class=\"cloze\" data-accept='[\"5%\",\"5\",\"5 percent\",\"five percent\",\"five\"]' data-reveal=\"5% of the loan amount\">?</span> of the loan amount, the loan is high-cost. A prepayment penalty does the same if it runs more than 2% of the amount prepaid, or can apply more than 36 months after consummation. Once a loan is high-cost, HOEPA demands <b>pre-loan homeownership counseling</b>, the high-cost disclosure must reach the borrower at least 3 business days before consummation, and any late fee is capped at 4% of the past-due payment."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "three triggers",
            "topic": "High-cost triggers",
            "q": "HOEPA's three high-cost thresholds?",
            "a": "the <span class='hl'>rate (APR)</span> threshold, the <span class='hl'>points-and-fees</span> threshold, and the <span class='hl'>prepayment-penalty</span> threshold"
          },
          {
            "peg": "prepay",
            "topic": "High-cost triggers",
            "q": "The prepayment-penalty trigger?",
            "a": "a penalty over <span class='hl'>2%</span> of the amount prepaid, or one that can apply more than <span class='hl'>36 months</span> after consummation"
          },
          {
            "peg": "late fee",
            "topic": "Fee limits",
            "q": "Late-fee cap on a high-cost mortgage?",
            "a": "no more than <span class='hl'>4%</span> of the past-due payment"
          },
          {
            "peg": "disclosure",
            "topic": "Disclosures",
            "q": "When is the high-cost disclosure due?",
            "a": "at least <span class='hl'>3 business days</span> before consummation"
          }
        ],
        "mcq": [
          {
            "q": "HOEPA's subordinate-lien rate trigger is APOR plus —",
            "opts": [
              "6.5 percentage points",
              "7.5 percentage points",
              "8.5 percentage points",
              "5 percentage points"
            ],
            "correct": 2
          },
          {
            "q": "A high-cost mortgage's late fee may not exceed —",
            "opts": [
              "2% of the past-due payment",
              "4% of the past-due payment",
              "5% of the loan amount",
              "$50"
            ],
            "correct": 1
          },
          {
            "q": "Before closing a high-cost loan, HOEPA requires —",
            "opts": [
              "A second appraisal",
              "Pre-loan homeownership counseling",
              "A co-signer",
              "Lender-paid mortgage insurance"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "trid",
      "name": "TRID",
      "reg": "TILA-RESPA Integrated Disclosure Rule",
      "groups": [
        {
          "paras": [
            {
              "html": "RESPA and TILA each used to demand their own forms, so a borrower drowned in four overlapping disclosures that never quite reconciled. <b>TRID merged them into two.</b> The <b>Loan Estimate (LE)</b> comes at the front — the lender's early promise of terms and costs. The <b>Closing Disclosure (CD)</b> is the final accounting at the end, and it has to land far enough ahead of signing that you can actually read it. The rest of TRID governs when those numbers may move, and who pays when they move too far."
            }
          ]
        },
        {
          "heading": "the two clocks",
          "anchor": {
            "file": "navy-family-headphones.PNG",
            "caption": "three days to read",
            "kind": "char"
          },
          "paras": [
            {
              "html": "Each disclosure runs on its own timer. The Loan Estimate has to go out fast — no later than three general business days after application — and once delivered the lender must honor its terms for at least 10 business days. Put a number on that first deadline: the LE is due within <span class=\"cloze\" data-accept='[\"3 general business days\",\"3\",\"three\",\"three general business days\",\"3 business days\"]' data-reveal=\"3 general business days\">?</span> after application. The Closing Disclosure has to be <b>received</b> at least 3 precise business days before consummation. Send it by mail or electronically and the wait grows to 6 precise business days — three to account for delivery, three to read."
            }
          ],
          "synth": {
            "q": "Lay out the Closing Disclosure waiting period both ways — delivered in person versus mailed or sent electronically.",
            "a": "The borrower must receive the CD at least 3 precise business days before consummation; if it's mailed or sent electronically, the period becomes 6 precise business days (3 mailing days plus 3 review days)."
          }
        },
        {
          "heading": "tolerances and cures",
          "paras": [
            {
              "html": "Quoted fees can drift, but only so far. TRID sorts them into three buckets: <b>zero tolerance</b> (the fee can't rise at all), <b>10% tolerance</b>, and <b>no-tolerance</b> (unlimited). Under the 10% bucket the borrower can be charged up to 10% over the disclosed total — anything beyond that the <b>creditor</b> eats. When fees breach tolerance with no valid change of circumstance, the lender has to refund the excess — the <b>cure</b> — and the deadline is 60 days after consummation. The refund is due no later than <span class=\"cloze\" data-accept='[\"60 days\",\"60\",\"sixty\",\"sixty days\"]' data-reveal=\"60 days after consummation\">?</span>."
            }
          ]
        },
        {
          "heading": "what restarts the clock",
          "paras": [
            {
              "html": "Most last-minute changes just get a corrected CD. Three don't — they reset the full 3-day waiting period: the <b>APR moving more than 0.125% on a fixed loan</b> (or 0.25% on an ARM), the loan product itself changing, or a prepayment penalty being added. Records outlive the deal: the Loan Estimate is kept at least 3 years, the Closing Disclosure at least 5."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "two forms",
            "topic": "Integrated disclosures",
            "q": "TRID's two integrated disclosures?",
            "a": "the <span class='hl'>Loan Estimate (LE)</span> and the <span class='hl'>Closing Disclosure (CD)</span>"
          },
          {
            "peg": "honor",
            "topic": "Loan Estimate",
            "q": "How long must Loan Estimate terms be honored?",
            "a": "at least <span class='hl'>10 business days</span>"
          },
          {
            "peg": "retention",
            "topic": "Recordkeeping",
            "q": "Record retention for the LE vs. the CD?",
            "a": "LE at least <span class='hl'>3 years</span>; CD at least <span class='hl'>5 years</span>"
          }
        ],
        "mcq": [
          {
            "q": "Which change forces a new 3-day CD waiting period?",
            "opts": [
              "A $100 drop in title fees",
              "The APR rising more than 0.125% on a fixed loan",
              "A typo in the borrower's address",
              "A lower interest rate"
            ],
            "correct": 1
          },
          {
            "q": "TRID's three fee tolerance categories are —",
            "opts": [
              "1%, 5%, 10%",
              "Zero, 10%, and no-tolerance",
              "Fixed, variable, capped",
              "Low, medium, high"
            ],
            "correct": 1
          },
          {
            "q": "Under the 10% tolerance, who pays the overage above 10%?",
            "opts": [
              "The borrower",
              "The creditor",
              "The title company",
              "Split evenly"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "hmda",
      "name": "HMDA",
      "reg": "Home Mortgage Disclosure Act · Reg C",
      "definitions": [
        { "term": "Application", "def": "An oral or written request for a covered loan, made through the financial institution's procedures." },
        { "term": "Application Pre-Approval", "def": "A request for pre-approval for a home purchase loan, reviewed under a program where the lender does a full creditworthiness analysis and issues a written commitment for a set period up to a specified amount. Conditions can only cover finding a property, no material financial changes, and limited non-financial items." },
        { "term": "Branch Office", "def": "Any office considered a branch by the applicable regulator. Excludes ATMs and free-standing terminals. For non-depository lenders, any office that takes applications from the public." },
        { "term": "Closed-End Mortgage Loan", "def": "A closed-end mortgage or an open-end line of credit that isn't an excluded transaction." },
        { "term": "Dwelling", "def": "A residential structure (attached to real property or not): detached homes, condos, co-ops, manufactured homes, factory-built homes, or multifamily buildings." },
        { "term": "Financial Institution (Depository)", "def": "A bank, savings association, or credit union meeting asset, location, origination, and federal oversight thresholds. Must have originated at least 25 closed-end mortgages or 200 open-end lines of credit in each of the two prior calendar years." },
        { "term": "Financial Institution (Non-Depository)", "def": "A for-profit mortgage lender (not a bank/thrift/credit union) with a home or branch in an MSA that originated at least 25 closed-end mortgages or 200 open-end lines of credit in each of the two prior calendar years." },
        { "term": "Home Improvement Loan", "def": "A mortgage loan or line of credit used to repair, rehabilitate, remodel, or improve a dwelling or its real property." },
        { "term": "Home Purchase Loan", "def": "A mortgage loan or line of credit used to purchase a dwelling." },
        { "term": "Loan/Application Register (LAR)", "def": "The record of required information that institutions collect and submit annually or quarterly." },
        { "term": "Manufactured Home", "def": "A residential structure as defined by HUD construction and safety standards. Includes manufactured home communities." },
        { "term": "Metropolitan Division (MD)", "def": "A subdivision of an MSA, as defined by the U.S. Office of Management and Budget." },
        { "term": "Metropolitan Statistical Area (MSA)", "def": "A geographic area defined by the U.S. Office of Management and Budget." },
        { "term": "Multifamily Dwelling", "def": "A dwelling containing five or more individual units, regardless of construction method." },
        { "term": "Open-End Line of Credit", "def": "Dwelling-secured credit where the creditor contemplates repeated transactions, may impose finance charges on unpaid balances, and the credit limit is generally available as balances are repaid." },
        { "term": "Refinancing", "def": "A new dwelling-secured loan that satisfies and replaces an existing dwelling-secured debt by the same borrower." },
        { "term": "Reverse Mortgage", "def": "A non-recourse loan secured by the consumer's principal dwelling where principal, interest, or shared equity is due only after death, transfer, or the consumer ceases to occupy the dwelling." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "Redlining never shows up in a single file. One denial looks like a credit call; it's only across a whole market — who got approved, who didn't, which neighborhoods went dry — that the pattern surfaces. <b>HMDA forces that pattern into the open.</b> Covered lenders report standardized data on the applications they take, and regulators and the public comb it for discrimination and for areas being starved of credit. The data lands in a <b>Loan/Application Register</b>, and a lender holds onto the underlying register data for at least 3 years and the public disclosure reports built from it for at least 5 years."
            }
          ]
        },
        {
          "heading": "who has to report",
          "anchor": {
            "file": "caution-mirror.PNG",
            "caption": "the pattern",
            "kind": "char"
          },
          "paras": [
            {
              "html": "A lender gets pulled in by volume, not by choice. The closed-end trigger is 25 closed-end mortgage loans in each of the two preceding calendar years — make fewer than that and you stay out, so the line that turns an ordinary lender into a HMDA reporter sits at <span class=\"cloze\" data-accept='[\"25\",\"twenty-five\",\"25 closed-end loans\"]' data-reveal=\"25\">?</span> closed-end loans. For revolving credit, the parallel trigger is at least <b>200 open-end lines of credit</b>, again in each of the two preceding years."
            }
          ],
          "synth": {
            "q": "The open-end line-of-credit trigger pulls a lender into HMDA at what count, and over what look-back?",
            "a": "At least 200 open-end lines of credit in each of the two preceding calendar years."
          }
        },
        {
          "heading": "reporting cadence",
          "paras": [
            {
              "html": "Most reporters file once a year. A high-volume lender — one with <b>60,000 or more</b> covered loans and applications combined (purchased loans don't count) — has to file <b>quarterly</b> instead. Each quarterly report covers every quarter but the fourth, and the deadline is the same each time: 60 calendar days after the quarter closes. So a high-volume lender's first-quarter numbers are due within <span class=\"cloze\" data-accept='[\"60 days\",\"60\",\"sixty\",\"60 calendar days\"]' data-reveal=\"60 calendar days\">?</span> of the quarter ending."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "purpose",
            "topic": "Purpose",
            "q": "What does HMDA exist to expose?",
            "a": "Discriminatory lending, <span class='hl'>redlining</span>, and underserved areas — by collecting lending data"
          },
          {
            "peg": "the register",
            "topic": "Data reporting",
            "q": "Where does the reported HMDA data live?",
            "a": "The <span class='hl'>Loan/Application Register</span> (LAR or L/AR)"
          },
          {
            "peg": "quarterly trigger",
            "topic": "Data reporting",
            "q": "Loan volume that forces quarterly (not annual) reporting?",
            "a": "<span class='hl'>60,000 or more</span> covered loans and applications combined, excluding purchased loans"
          },
          {
            "peg": "keep it",
            "topic": "Recordkeeping",
            "q": "HMDA retention — LAR data vs. disclosure reports?",
            "a": "LAR data <span class='hl'>at least 3 years</span>; disclosure reports <span class='hl'>at least 5 years</span>"
          }
        ],
        "mcq": [
          {
            "q": "A lender becomes a HMDA reporter on closed-end volume at —",
            "opts": [
              "10 loans in the prior year",
              "25 loans in each of the two preceding calendar years",
              "50 loans in the prior year",
              "100 loans in each of the two preceding years"
            ],
            "correct": 1
          },
          {
            "q": "The open-end line-of-credit threshold for HMDA reporting is —",
            "opts": [
              "100 lines",
              "200 lines in each of the two preceding calendar years",
              "500 lines",
              "1,000 lines"
            ],
            "correct": 1
          },
          {
            "q": "HMDA disclosure reports must be retained for at least —",
            "opts": [
              "2 years",
              "3 years",
              "5 years",
              "7 years"
            ],
            "correct": 2
          }
        ]
      }
    },
    {
      "id": "fcra",
      "name": "FCRA",
      "reg": "Fair Credit Reporting Act",
      "definitions": [
        { "term": "Act", "def": "The Fair Credit Reporting Act (15 U.S.C. 1681 et seq.)." },
        { "term": "Adverse Action", "def": "A denial of credit." },
        { "term": "Affiliate", "def": "Any company related by common ownership or common corporate control with another company." },
        { "term": "Common Ownership or Common Corporate Control", "def": "When one company owns or controls 25% or more of another's voting shares, controls a majority of its directors, or exercises controlling influence over its management or policies." },
        { "term": "Company", "def": "Any corporation, LLC, business trust, partnership, association, or similar organization." },
        { "term": "Consumer", "def": "An individual." },
        { "term": "Consumer Report", "def": "A credit report." },
        { "term": "Credit Repository", "def": "An intermediary between the user and the consumer reporting agency. Users typically order credit reports through a repository." },
        { "term": "File", "def": "All information on a consumer recorded and retained by a consumer reporting agency, regardless of storage method." },
        { "term": "Identifying Information", "def": "Any name or number that can identify a specific person: SSN, date of birth, driver's license number, passport number, biometric data, address, routing code, or telecom access device." },
        { "term": "Identity Theft", "def": "Fraud committed or attempted using another person's identifying information without authorization." },
        { "term": "Identity Theft Report", "def": "A report filed with a federal, state, or local law enforcement agency alleging identity theft, with as much detail as the consumer can provide." },
        { "term": "Investigative Consumer Report / Full Factual", "def": "A consumer report where information about character, reputation, or lifestyle is obtained through personal interviews with the consumer's associates or acquaintances. All information is independently verified." },
        { "term": "Medical Information", "def": "Information created by or derived from a healthcare provider or consumer about past, present, or future health, healthcare provision, or healthcare payment." },
        { "term": "Person", "def": "Any individual, partnership, corporation, trust, estate, cooperative, association, government entity, or other entity." },
        { "term": "Rapid Rescore", "def": "A process to revise a consumer's credit score by correcting errors or removing inaccurate/obsolete information — only for the current transaction, not a permanent fix." },
        { "term": "Tri-Merge Credit Report", "def": "A single report combining a consumer's data from all three major consumer reporting agencies, provided by a credit repository." },
        { "term": "User", "def": "An individual or entity that uses consumer reporting agency data to make decisions about credit, insurance, or employment." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "Your credit report decides whether you get the loan and at what rate, so the law over it really answers two questions: who's allowed to pull your file, and what power you have to fix it when it's wrong. A lender can't open your report on a whim — it needs a <b>permissible purpose</b>, such as your own application for credit. And the score that lender sees isn't a black box: a FICO score is built from five weighted pieces — payment history at 35%, amounts owed at 30%, length of credit history at 15%, credit mix at 10%, and new credit and inquiries at 10% — so the single biggest lever, payment history, carries 35% of the score."
            }
          ]
        },
        {
          "heading": "fixing what's wrong",
          "paras": [
            {
              "html": "When you dispute an item, the furnisher and the bureau owe you an investigation on a clock — 30 days from receipt, with a 15-day extension if they genuinely need it, which pushes the outside limit to 45 days. Separately, after a mortgage application the lender has to hand you the credit-score disclosure quickly — within 3 business days. So if you apply on a Monday, that score disclosure is due within <span class=\"cloze\" data-accept='[\"3 business days\",\"3\",\"three\",\"three business days\"]' data-reveal=\"3 business days\">?</span>."
            }
          ],
          "synth": {
            "q": "A borrower disputes a tradeline. How long does the investigation run, and what extension is allowed?",
            "a": "30 days from receipt of the dispute, extendable by 15 days if more time is genuinely needed — 45 days at the outside."
          }
        },
        {
          "heading": "how long marks last",
          "paras": [
            {
              "html": "Derogatory items don't sit on your file forever; each kind ages off on its own schedule. Most negatives — late payments, collections, charge-offs, foreclosures — drop after about <b>7 years</b> (late payments can linger to roughly 7½). Bankruptcy splits by chapter: a Chapter 13 stays <b>7 years</b>, while the heavier Chapter 7 stays a full 10 years on your file. So the chapter that haunts a borrower the longest, Chapter 7, sticks for <span class=\"cloze\" data-accept='[\"10 years\",\"10\",\"ten\"]' data-reveal=\"10 years\">?</span>."
            }
          ],
          "synth": {
            "q": "Contrast how long a Chapter 7 versus a Chapter 13 bankruptcy stays on a credit report.",
            "a": "Chapter 7 stays 10 years; Chapter 13 stays 7 years."
          }
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "to pull",
            "topic": "Permissible purpose",
            "q": "What does a lender need before accessing a credit report?",
            "a": "A <span class='hl'>permissible purpose</span> under FCRA — e.g., the consumer's own credit application"
          },
          {
            "peg": "most marks",
            "topic": "Credit reporting",
            "q": "How long do most derogatory items remain?",
            "a": "Generally <span class='hl'>7 years</span> (late/missed payments up to about 7½)"
          },
          {
            "peg": "fico mix",
            "topic": "Credit scoring",
            "q": "The five FICO categories and their weights?",
            "a": "Payment history <span class='hl'>35%</span>, amounts owed <span class='hl'>30%</span>, length of history <span class='hl'>15%</span>, credit mix <span class='hl'>10%</span>, new credit/inquiries <span class='hl'>10%</span>"
          }
        ],
        "mcq": [
          {
            "q": "The single largest FICO scoring factor is —",
            "opts": [
              "amounts owed (30%)",
              "payment history (35%)",
              "length of credit history (15%)",
              "new credit (10%)"
            ],
            "correct": 1
          },
          {
            "q": "Most derogatory items (collections, charge-offs, foreclosures) generally remain on a report for —",
            "opts": [
              "2 years",
              "5 years",
              "7 years",
              "10 years"
            ],
            "correct": 2
          },
          {
            "q": "Amounts owed accounts for what share of a FICO score?",
            "opts": [
              "10%",
              "15%",
              "30%",
              "35%"
            ],
            "correct": 2
          }
        ]
      }
    },
    {
      "id": "facta",
      "name": "FACTA",
      "reg": "Fair & Accurate Credit Transactions Act",
      "definitions": [
        { "term": "Accuracy", "def": "That the information a furnisher provides to a CRA correctly reflects the account terms, the consumer's liability, the consumer's payment behavior, and identifies the right consumer." },
        { "term": "Direct Dispute", "def": "A dispute submitted directly to a furnisher (not through a CRA) by a consumer about the accuracy of information in a consumer report related to an account the furnisher has or had with that consumer." },
        { "term": "Furnisher", "def": "An entity that reports consumer information to one or more CRAs. Does not include someone who only provides info to get a consumer report, a CRA itself, the consumer in question, or personal acquaintances responding to a CRA's specific request." },
        { "term": "Integrity", "def": "That furnished information is backed by the furnisher's records, is formatted to minimize reporting errors, and includes everything the CFPB has determined would be materially misleading if omitted." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "FCRA assumed the identity on your file was yours to begin with. <b>FACTA is the amendment that added the identity-theft toolkit</b> — the alerts you can drop onto your own credit file, the free report you're owed every year, and the rule about destroying the data once you're done with it."
            }
          ]
        },
        {
          "heading": "the three alerts",
          "anchor": {
            "file": "caution-mirror.PNG",
            "caption": "red flags",
            "kind": "char"
          },
          "paras": [
            {
              "html": "The alerts come in three lengths, and the length tells you the situation behind it. An <b>initial fraud alert</b> — \"something feels off\" — stays on the file for one year, and the bureau has to deliver a free report within 3 business days of it; so the lightest, no-proof-needed alert lasts <span class=\"cloze\" data-accept='[\"1 year\",\"1\",\"one year\",\"one\"]' data-reveal=\"1 year\">?</span>. An <b>extended alert</b>, dropped after real, documented theft, runs a full <b>7 years</b>. An <b>active-duty (military) alert</b>, shielding a deployed service member's credit, lasts <b>1 year</b>."
            }
          ],
          "synth": {
            "q": "Name FACTA's three fraud alerts and how long each lasts.",
            "a": "Initial fraud alert — 1 year (free report within 3 business days); extended fraud alert — 7 years; active-duty/military alert — 1 year."
          }
        },
        {
          "heading": "free report and disposal",
          "paras": [
            {
              "html": "Beyond the alerts, FACTA entitles every consumer to <b>one free credit report per year from each of the three</b> major reporting agencies. And once a business is finished with consumer-report data, the <b>FTC Disposal Rule</b> requires it be destroyed securely — shredded or burned — so it can't be reconstructed."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "extended",
            "topic": "Fraud alerts",
            "q": "How long does an extended fraud alert last?",
            "a": "<span class='hl'>7 years</span> (placed after real identity theft)"
          },
          {
            "peg": "active-duty",
            "topic": "Fraud alerts",
            "q": "How long does an active-duty (military) alert last?",
            "a": "<span class='hl'>1 year</span>"
          },
          {
            "peg": "free yearly",
            "topic": "Consumer rights",
            "q": "What is every consumer entitled to annually under FACTA?",
            "a": "<span class='hl'>One free credit report per year</span> from each of the three major reporting agencies"
          },
          {
            "peg": "disposal",
            "topic": "Disposal Rule",
            "q": "What does the FTC Disposal Rule require?",
            "a": "Secure disposal of consumer-report info (<span class='hl'>shred/burn</span>) so it can't be reconstructed"
          }
        ],
        "mcq": [
          {
            "q": "An initial fraud alert lasts —",
            "opts": [
              "90 days",
              "1 year",
              "2 years",
              "7 years"
            ],
            "correct": 1
          },
          {
            "q": "After an initial fraud alert, the bureau must provide a free report within —",
            "opts": [
              "1 business day",
              "3 business days",
              "15 days",
              "30 days"
            ],
            "correct": 1
          },
          {
            "q": "An extended fraud alert remains on file for —",
            "opts": [
              "1 year",
              "2 years",
              "7 years",
              "10 years"
            ],
            "correct": 2
          }
        ]
      }
    },
    {
      "id": "ftc-red-flags-rule",
      "name": "FTC Red Flags Rule",
      "reg": "Identity Theft Prevention",
      "groups": [
        {
          "paras": [
            {
              "html": "FACTA told institutions to watch for identity theft. The Red Flags Rule is what \"watching\" actually becomes on the ground: a covered institution must put its watching in writing and maintain a written Identity Theft Prevention Program — the program that catches a stolen identity before it turns into a funded loan. Because nothing here can be informal or unwritten, what each covered institution has to keep on file is a <span class=\"cloze\" data-accept='[\"written identity theft prevention program\",\"written program\",\"identity theft prevention program\",\"written identity theft program\"]' data-reveal=\"written Identity Theft Prevention Program\">?</span>."
            }
          ]
        },
        {
          "heading": "what the program does",
          "anchor": {
            "file": "caution-mirror.PNG",
            "caption": "the flags",
            "kind": "char"
          },
          "paras": [
            {
              "html": "The program has a three-part job in covered accounts: <b>detect, prevent, and mitigate</b> identity theft. The \"red flags\" it watches for are the concrete warning signs — an alert from a credit bureau, a suspicious or altered document, personal information that doesn't line up, an address mismatch, or unusual activity on the account."
            }
          ],
          "synth": {
            "q": "What three things must a covered institution's Red Flags program do, and against what?",
            "a": "Detect, prevent, and mitigate identity theft in connection with covered accounts."
          }
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "the program",
            "topic": "Program requirement",
            "q": "What must a covered institution maintain under the Red Flags Rule?",
            "a": "A written <span class='hl'>Identity Theft Prevention Program</span>"
          },
          {
            "peg": "three jobs",
            "topic": "Program functions",
            "q": "The program's three required functions?",
            "a": "<span class='hl'>Detect, prevent, and mitigate</span> identity theft in covered accounts"
          },
          {
            "peg": "examples",
            "topic": "Red flag examples",
            "q": "Give examples of red flags.",
            "a": "Credit-bureau alerts, <span class='hl'>altered/suspicious documents</span>, inconsistent personal info, address mismatch, unusual account activity"
          }
        ],
        "mcq": [
          {
            "q": "The Red Flags Rule requires a covered institution to maintain —",
            "opts": [
              "a written Identity Theft Prevention Program",
              "a Currency Transaction Report",
              "a Customer Identification Program",
              "an annual privacy notice"
            ],
            "correct": 0
          },
          {
            "q": "The three things a Red Flags program must do are —",
            "opts": [
              "report, audit, and disclose",
              "detect, prevent, and mitigate",
              "verify, retain, and notify",
              "collect, store, and share"
            ],
            "correct": 1
          },
          {
            "q": "Which is an example of a red flag?",
            "opts": [
              "a 20% down payment",
              "an address mismatch on the application",
              "a high credit score",
              "a co-signer on the loan"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "bsa-aml",
      "name": "BSA / AML",
      "reg": "Bank Secrecy Act · Anti-Money Laundering",
      "definitions": [
        { "term": "Financial Agency", "def": "A person acting on behalf of another (not a government or international financial institution) as a financial institution, depository, trustee, agent, or similar role related to money, credit, securities, precious metals, or value substituting for currency." },
        { "term": "Financial Institution", "def": "A broad category covering banks, credit unions, thrifts, broker-dealers, insurance companies, currency exchanges, money transmitters, casinos, pawnbrokers, loan companies, travel agencies, vehicle dealers, real estate closing agents, the U.S. Postal Service, and any other cash-intensive business the Treasury designates." },
        { "term": "Monetary Instruments", "def": "Coins and currency (domestic and foreign), traveler's checks, bearer instruments and securities, checks, drafts, notes, money orders, and value that substitutes for currency." },
        { "term": "Nonfinancial Trade or Business", "def": "Any trade or business other than a financial institution that is subject to BSA/AML reporting requirements." },
        { "term": "Person", "def": "A trustee, estate representative, and at times a governmental entity." },
        { "term": "United States", "def": "The 50 states, D.C., Puerto Rico, the U.S. Virgin Islands, Guam, Northern Mariana Islands, American Samoa, the Trust Territory of the Pacific Islands, and any U.S. territory, possession, or military/diplomatic establishment." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "Dirty money isn't spendable until it's been washed, and the rinse cycle runs through financial institutions. <b>BSA/AML drafts those institutions into the watch</b>: they have to notice when a transaction is really an attempt to make illegitimate money look earned, and report it to the Treasury's <b>FinCEN</b>. Two reports carry most of the load — one fires on size alone, the other on judgment."
            }
          ]
        },
        {
          "heading": "the size-based report",
          "anchor": {
            "file": "man-smoking.PNG",
            "caption": "Suspicious activity",
            "kind": "char"
          },
          "paras": [
            {
              "html": "The first report is mechanical. Any cash transaction of $10,000 or more triggers a <b>Currency Transaction Report (CTR)</b>, no suspicion required — the figure that matters is <span class=\"cloze\" data-accept='[\"$10,000\",\"10000\",\"ten thousand\"]' data-reveal=\"$10,000\">?</span>. Try to dodge it by slicing one deposit into smaller pieces, each kept under $10,000, and you've committed <b>structuring</b> — a crime in its own right."
            }
          ]
        },
        {
          "heading": "the judgment-based report",
          "paras": [
            {
              "html": "The second report runs on judgment. Anything that looks like laundering gets a <b>Suspicious Activity Report (SAR)</b> filed with FinCEN within 30 days of detecting the activity, so the standard deadline is <span class=\"cloze\" data-accept='[\"30 days\",\"30\",\"thirty\"]' data-reveal=\"30 days\">?</span>. When no suspect can be named, the clock stretches by another 30 days, but the SAR can land no later than 60 days out. The dollar triggers depend on the suspect: a SAR is owed at $5,000 or more when a suspect can be identified, and at $25,000 or more regardless of whether any suspect is identified."
            }
          ],
          "synth": {
            "q": "A SAR keys off two dollar thresholds depending on whether a suspect is known. What are they?",
            "a": "$5,000 or more when a suspect can be identified; $25,000 or more regardless of whether any suspect is identified."
          }
        },
        {
          "heading": "after you file",
          "paras": [
            {
              "html": "Filing a SAR comes with a gag: tipping off the subject, or even disclosing that a SAR exists, is illegal. The records of that filing — SARs along with CIP and account records — have to be kept on hand for at least 5 years from the filing date."
            },
            {
              "html": "Separately, <b>OFAC</b> administers U.S. sanctions and maintains the SDN list of blocked parties. Institutions holding blocked property file the Annual Report of Blocked Property each year by September 30, so the cutoff date is <span class=\"cloze\" data-accept='[\"september 30\",\"sept 30\",\"sept. 30\",\"9/30\"]' data-reveal=\"September 30\">?</span>."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "structuring",
            "topic": "Structuring",
            "q": "What is structuring?",
            "a": "breaking deposits into amounts under <span class='hl'>$10,000</span> to dodge the CTR filing requirement — itself illegal"
          },
          {
            "peg": "no suspect",
            "topic": "SAR filing",
            "q": "If no suspect is identified, how long can the SAR deadline extend?",
            "a": "an extra 30 days, but no later than <span class='hl'>60 days</span> from the activity"
          },
          {
            "peg": "tipping off",
            "topic": "SAR filing",
            "q": "Once a SAR is filed, what's prohibited?",
            "a": "telling the subject or disclosing the SAR's existence — that's illegal"
          },
          {
            "peg": "retention",
            "topic": "Recordkeeping",
            "q": "How long must SARs and CIP/account records be kept?",
            "a": "at least <span class='hl'>5 years</span> from the date of filing"
          }
        ],
        "mcq": [
          {
            "q": "A Currency Transaction Report covers cash transactions at or above —",
            "opts": [
              "$3,000",
              "$5,000",
              "$10,000",
              "$25,000"
            ],
            "correct": 2
          },
          {
            "q": "A SAR is filed with —",
            "opts": [
              "OFAC",
              "FinCEN",
              "the CFPB",
              "the FTC"
            ],
            "correct": 1
          },
          {
            "q": "OFAC's Annual Report of Blocked Property is due each year by —",
            "opts": [
              "December 31",
              "September 30",
              "April 15",
              "June 30"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "glba",
      "name": "GLBA",
      "reg": "Gramm-Leach-Bliley Act",
      "definitions": [
        { "term": "Affiliate", "def": "A company that controls, is controlled by, or is under common control with another company." },
        { "term": "Consumer", "def": "An individual who uses a financial institution's products or services for personal, family, or household purposes without establishing a formal customer relationship (no account opened, no credit secured)." },
        { "term": "Customer", "def": "An individual who uses a financial institution's products or services for personal, family, or household purposes after establishing a formal relationship — by opening an account or securing credit." },
        { "term": "Nonaffiliated Third Party", "def": "Any entity not related to the financial institution by common ownership or corporate control. Does not include joint employees." },
        { "term": "Nonpublic Personal Information", "def": "Personal information that cannot be found through a general records search or Freedom of Information Act request." },
        { "term": "Personally Identifiable Information", "def": "Any information that can positively confirm an individual's identity." },
        { "term": "Public Personal Information", "def": "Personal information freely available through a general records search or FOIA request." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "A mortgage application is a dossier — income, Social Security number, account balances, the whole financial life of the person across the desk. <b>GLBA governs what the institution may do with that dossier</b> once it holds it: tell you what gets shared, let you stop some of the sharing, and actually guard the data."
            }
          ]
        },
        {
          "heading": "notice and opt-out",
          "anchor": {
            "file": "soldier-painting.PNG",
            "caption": "Privacy notice",
            "kind": "char"
          },
          "paras": [
            {
              "html": "The relationship opens with a <b>privacy notice</b> spelling out what the institution shares, and that notice repeats annually for as long as you're a customer — owed at the start of the relationship and once <span class=\"cloze\" data-accept='[\"annually\",\"annual\",\"every year\",\"yearly\"]' data-reveal=\"annually\">?</span> thereafter. Built into it is your right to <b>opt out</b> of having nonpublic personal information shared with nonaffiliated third parties."
            }
          ],
          "synth": {
            "q": "GLBA's privacy machinery has two moving parts the institution owes the consumer. Name both, including the notice's timing.",
            "a": "A privacy notice at the start of the relationship and annually thereafter, plus the right to opt out of sharing nonpublic personal information with nonaffiliated third parties."
          }
        },
        {
          "heading": "safeguards and penalties",
          "paras": [
            {
              "html": "The <b>Safeguards Rule</b> turns privacy into engineering: the institution must run a written information-security program protecting customer data, with regular testing, monitoring, and adjustment as threats change."
            },
            {
              "html": "The penalties bite at two levels. The institution can be fined up to $100,000 per violation, so its exposure runs to <span class=\"cloze\" data-accept='[\"$100,000\",\"100000\",\"one hundred thousand\"]' data-reveal=\"$100,000\">?</span> each time. Officers and directors face up to $10,000 each, with imprisonment of up to 5 years behind it."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "safeguards",
            "topic": "Safeguards Rule",
            "q": "What does the GLBA Safeguards Rule require?",
            "a": "a written <span class='hl'>information-security program</span> to protect customer data, with regular testing, monitoring, and adjustment"
          },
          {
            "peg": "opt-out",
            "topic": "Privacy & opt-out",
            "q": "What right does GLBA give consumers over information sharing?",
            "a": "the right to <span class='hl'>opt out</span> of sharing nonpublic personal information with nonaffiliated third parties"
          },
          {
            "peg": "people",
            "topic": "Penalties",
            "q": "GLBA penalty against officers/directors, plus prison?",
            "a": "up to <span class='hl'>$10,000</span> per officer/director and imprisonment up to <span class='hl'>5 years</span>"
          }
        ],
        "mcq": [
          {
            "q": "A GLBA privacy notice is owed to the customer —",
            "opts": [
              "once, at account opening only",
              "at the start of the relationship and annually thereafter",
              "only when sharing changes",
              "every quarter"
            ],
            "correct": 1
          },
          {
            "q": "The maximum GLBA penalty against the institution per violation is —",
            "opts": [
              "$10,000",
              "$50,000",
              "$100,000",
              "$1,000,000"
            ],
            "correct": 2
          },
          {
            "q": "The opt-out right covers sharing nonpublic personal information with —",
            "opts": [
              "affiliated companies",
              "nonaffiliated third parties",
              "credit bureaus",
              "federal regulators"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "dnc-tsr",
      "name": "DNC / TSR",
      "reg": "Do-Not-Call · Telemarketing Sales Rule",
      "definitions": [
        { "term": "Acquirer", "def": "A business or financial institution authorized by a credit card system to let merchants accept and process credit card payments." },
        { "term": "Attorney General", "def": "The chief legal officer of a state." },
        { "term": "Billing Information", "def": "Any data that enables access to a customer's or donor's account — credit card, checking, savings, mortgage, debit card, or utility account." },
        { "term": "Caller Identification Service", "def": "A service that transmits the calling party's phone number (and name, if available) to the recipient's phone display during the call." },
        { "term": "Cardholder", "def": "The person to whom a credit card is issued, or anyone authorized to use it." },
        { "term": "Charitable Contribution", "def": "Any donation or gift of money or anything of value." },
        { "term": "Customer", "def": "Any person who is or may be required to pay for goods or services offered through telemarketing." },
        { "term": "Established Business Relationship", "def": "A relationship based on a purchase, rental, or lease within the last 18 months, or the consumer's inquiry or application within the last 3 months." },
        { "term": "Merchant", "def": "A person authorized under a written contract with an acquirer to accept or process credit card payments for goods, services, or charitable contributions." },
        { "term": "Negative Option Feature", "def": "A provision where the customer's silence or failure to act is treated as acceptance of an offer." },
        { "term": "Outbound Telephone Call", "def": "A call initiated by a telemarketer to sell goods/services or solicit a charitable contribution." },
        { "term": "Person", "def": "Any individual, group, unincorporated association, partnership, corporation, or other business entity." },
        { "term": "Preacquired Account Information", "def": "Information that lets a seller or telemarketer charge a customer's account without getting the account number directly during the telemarketing call." },
        { "term": "Prize", "def": "Anything offered and given by chance. \"Chance\" exists when the person is guaranteed to receive something but the telemarketer doesn't identify the specific item at the time of the offer." },
        { "term": "Prize Promotion", "def": "A sweepstakes, game of chance, or any representation that a person has won or may be eligible to receive a prize." },
        { "term": "Seller", "def": "Anyone who provides, offers to provide, or arranges for goods or services in exchange for payment in a telemarketing transaction." },
        { "term": "Telemarketer", "def": "Anyone who initiates or receives telemarketing calls to or from a customer or donor." },
        { "term": "Telemarketing", "def": "A plan, program, or campaign using one or more phones and involving more than one interstate call to sell goods/services or solicit charitable contributions." },
        { "term": "Upselling", "def": "Soliciting an additional purchase during a single call after an initial transaction. An \"external upsell\" is on behalf of a different seller; an \"internal upsell\" is on behalf of the same seller. Either way, it's a separate transaction." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "An MLO who cold-calls for business is, in this rule's eyes, a telemarketer — so the registry applies to them too. <b>DNC/TSR draws the boundaries on those calls</b>: whose number you have to scrub against the Do-Not-Call list, how fresh that scrub has to be, and what tips a call into abusive."
            }
          ]
        },
        {
          "heading": "scrubbing the list",
          "paras": [
            {
              "html": "Before dialing, the number has to be checked against the Do-Not-Call registry within the last 31 days — anything older than <span class=\"cloze\" data-accept='[\"31 days\",\"31\",\"thirty-one\",\"thirty one\"]' data-reveal=\"31 days\">?</span> doesn't count. Calls are also boxed in by time: you can only dial between <b>8:00 a.m. and 9:00 p.m.</b> in the call recipient's local time."
            }
          ]
        },
        {
          "heading": "abusive calling",
          "paras": [
            {
              "html": "Hang up on too many people because an autodialer outran your agents and you trip the abandonment limit: no more than 3% of answered calls may be abandoned, so the ceiling is <span class=\"cloze\" data-accept='[\"3%\",\"3\",\"three percent\",\"three\"]' data-reveal=\"3%\">?</span>. Break these rules and the cost is steep — the FTC can assess up to $51,744 per violation under the Telemarketing Sales Rule."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "hours",
            "topic": "Calling hours",
            "q": "What are the permissible telemarketing calling hours?",
            "a": "<span class='hl'>8:00 a.m. to 9:00 p.m.</span> in the call recipient's local time"
          },
          {
            "peg": "penalty",
            "topic": "Penalties",
            "q": "Penalty per Telemarketing Sales Rule violation?",
            "a": "up to <span class='hl'>$51,744</span> per violation"
          },
          {
            "peg": "abandonment",
            "topic": "Call abandonment",
            "q": "Maximum allowable call-abandonment rate?",
            "a": "no more than <span class='hl'>3%</span>"
          }
        ],
        "mcq": [
          {
            "q": "Numbers must be scrubbed against the Do-Not-Call registry within —",
            "opts": [
              "7 days before the call",
              "31 days before the call",
              "60 days before the call",
              "90 days before the call"
            ],
            "correct": 1
          },
          {
            "q": "The maximum penalty per Telemarketing Sales Rule violation is —",
            "opts": [
              "$11,000",
              "$25,000",
              "$51,744",
              "$100,000"
            ],
            "correct": 2
          },
          {
            "q": "Telemarketing calls are permitted only between —",
            "opts": [
              "9:00 a.m. and 5:00 p.m.",
              "8:00 a.m. and 9:00 p.m.",
              "7:00 a.m. and 10:00 p.m.",
              "8:00 a.m. and 8:00 p.m."
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "maps-reg-n",
      "name": "MAPs (Reg N)",
      "reg": "Mortgage Acts and Practices — Advertising",
      "definitions": [
        { "term": "Commercial Communication", "def": "Any written or oral statement, illustration, or depiction designed to drive a sale or create interest in a product or service." },
        { "term": "Consumer", "def": "A natural person to whom a mortgage credit product is offered or extended." },
        { "term": "Credit", "def": "The right to defer payment of a debt or to incur debt and defer its payment." },
        { "term": "Dwelling", "def": "A one-to-four unit residential structure, attached to real property or not. Includes condos, co-ops, mobile homes, manufactured homes, and trailers used as residences." },
        { "term": "Mortgage Credit Product", "def": "Any form of credit secured by real property or a dwelling, offered to a consumer primarily for personal, family, or household purposes." },
        { "term": "Person", "def": "Any individual, group, unincorporated association, partnership, corporation, or other business entity." },
        { "term": "Term", "def": "Any fee, cost, obligation, or characteristic of the product, including any condition related to the product's availability." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "A teaser rate with the strings buried, a \"government\" badge that means nothing — mortgage ads are where a lot of deception gets its start. <b>MAPs polices that advertising</b>: it bans material misrepresentations in any commercial communication about a mortgage credit product, and it pins down which terms force you to disclose the rest."
            }
          ]
        },
        {
          "heading": "triggering terms",
          "anchor": {
            "file": "witch-microphone.PNG",
            "caption": "Mortgage ads",
            "kind": "char"
          },
          "paras": [
            {
              "html": "Some figures can't stand alone in an ad. A <b>triggering term</b> — a stated rate, a payment amount, a down-payment figure — pulls additional disclosures in behind it the moment you use it, so the borrower sees the full terms instead of the flattering fragment."
            },
            {
              "html": "Whatever the ad claims, the proof has to survive afterward. MAPs advertising records must be retained for 24 months, so the file stays on hand for <span class=\"cloze\" data-accept='[\"24 months\",\"24\",\"twenty-four\",\"twenty four\",\"2 years\",\"two years\"]' data-reveal=\"24 months\">?</span>."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "prohibition",
            "topic": "Deceptive practices",
            "q": "What does MAPs (Regulation N) prohibit?",
            "a": "<span class='hl'>material misrepresentations</span> in any commercial communication about a mortgage credit product"
          },
          {
            "peg": "trigger",
            "topic": "Advertising terms",
            "q": "What is a 'triggering term' in mortgage advertising?",
            "a": "a specific term (a stated rate, payment, or down-payment figure) that, once used, <span class='hl'>requires additional disclosures</span>"
          },
          {
            "peg": "records",
            "topic": "Recordkeeping",
            "q": "How long must MAPs advertising records be retained?",
            "a": "<span class='hl'>24 months</span>"
          }
        ],
        "mcq": [
          {
            "q": "Regulation N (MAPs) prohibits —",
            "opts": [
              "any mortgage advertising at all",
              "material misrepresentations in mortgage-product communications",
              "advertising rates below the APOR",
              "referral fees between settlement providers"
            ],
            "correct": 1
          },
          {
            "q": "MAPs advertising records must be retained for —",
            "opts": [
              "12 months",
              "24 months",
              "36 months",
              "5 years"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "e-sign-act",
      "name": "E-Sign Act",
      "reg": "Electronic Signatures in Global & National Commerce",
      "definitions": [
        { "term": "Consumer", "def": "An individual who obtains products or services primarily for personal, family, or household purposes, including that person's legal representative." },
        { "term": "Electronic", "def": "Relating to technology with electrical, digital, magnetic, wireless, optical, electromagnetic, or similar capabilities." },
        { "term": "Electronic Agent", "def": "A computer program or automated system that initiates actions or responds to electronic records without human review at the time of action." },
        { "term": "Electronic Record", "def": "A contract or other record created, generated, sent, communicated, received, or stored by electronic means." },
        { "term": "Electronic Signature", "def": "An electronic sound, symbol, or process attached to or associated with a contract or record, executed with the intent to sign." },
        { "term": "Federal Regulatory Agency", "def": "An agency as defined in Title 5, U.S. Code, Section 552(f)." },
        { "term": "Information", "def": "Data, text, images, sounds, codes, computer programs, software, databases, or similar content." },
        { "term": "Person", "def": "An individual, corporation, business trust, estate, trust, partnership, LLC, association, joint venture, governmental agency, public corporation, or any other legal or commercial entity." },
        { "term": "Record", "def": "Information inscribed on a tangible medium or stored electronically in a form that can be retrieved and perceived." },
        { "term": "Requirement", "def": "Includes a prohibition." },
        { "term": "Self-Regulatory Organization", "def": "An entity (not a federal agency or state) supervised by a federal regulatory agency and authorized to adopt and enforce rules for its members." },
        { "term": "State", "def": "Includes the District of Columbia and all U.S. territories and possessions." },
        { "term": "Transaction", "def": "An action or set of actions relating to business, consumer, or commercial affairs between two or more persons — covering sales, leases, exchanges, licensing, dispositions of goods, services, intangibles, and real property interests." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "You close a mortgage from your couch, clicking through a stack of documents you never print. For that to hold up, the click has to carry the same weight as a pen on paper. <b>E-Sign supplies that weight</b>: it gives electronic records and electronic signatures the same legal validity and enforceability as ink and paper, so a contract can't be thrown out later just because it was signed on a screen. An electronic signature, under the act, is any electronic sound, symbol, or process attached to or logically associated with a record and adopted by a person with the intent to sign — broad enough to cover a typed name, a clicked box, or a stylus scrawl, as long as the signer meant it to count."
            }
          ]
        },
        {
          "heading": "going electronic",
          "anchor": {
            "file": "pioneer-dj-2.PNG",
            "caption": "old to new",
            "kind": "char"
          },
          "paras": [
            {
              "html": "That validity isn't automatic for required disclosures. Before a lender may deliver them electronically, the borrower has to affirmatively consent to electronic delivery and demonstrate they can actually access the records in the format used. Both steps matter: the consumer must <span class=\"cloze\" data-accept='[\"affirmatively consent\",\"consent\",\"affirmative consent\",\"opt in\"]' data-reveal=\"affirmatively consent\">?</span> rather than be opted in by default, and they must show the documents will reach a screen they can open, not vanish into a file they can't read."
            }
          ],
          "synth": {
            "q": "What two things must a consumer do before a lender can send required disclosures electronically?",
            "a": "Affirmatively consent to electronic delivery, and demonstrate (reasonably prove) that they can access the electronic records in the format used."
          }
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "the term",
            "topic": "Electronic signatures",
            "q": "Define an 'electronic signature' under E-Sign.",
            "a": "an electronic <span class='hl'>sound, symbol, or process</span> attached to or logically associated with a record and adopted with intent to sign"
          },
          {
            "peg": "same weight",
            "topic": "Legal equivalence",
            "q": "What core principle does the E-Sign Act establish?",
            "a": "electronic records and signatures have the <span class='hl'>same legal validity</span> and enforceability as paper and ink"
          }
        ],
        "mcq": [
          {
            "q": "Under E-Sign, an electronic signature is best described as —",
            "opts": [
              "a scanned image of a handwritten name",
              "a sound, symbol, or process adopted with intent to sign",
              "a notarized digital certificate",
              "a typed name on any web form"
            ],
            "correct": 1
          },
          {
            "q": "Before disclosures may be delivered electronically, the consumer must —",
            "opts": [
              "pay an electronic-delivery fee",
              "waive the right to paper copies permanently",
              "affirmatively consent and show they can access the records",
              "sign a separate paper authorization in ink"
            ],
            "correct": 2
          }
        ]
      }
    },
    {
      "id": "usa-patriot-act",
      "name": "USA PATRIOT Act",
      "reg": "Counterterrorism · CIP",
      "definitions": [
        { "term": "Account", "def": "A formal banking or business relationship for regular services, transactions, or extensions of credit. Includes demand deposits, savings, transaction accounts, and credit accounts." },
        { "term": "Customer", "def": "A person who opens a new account." },
        { "term": "Financial Institution", "def": "Includes traditional financial institutions, casinos, pawnbrokers, and automobile salespeople (broader than the typical banking definition)." },
        { "term": "Money Laundering", "def": "Filtering illegally-obtained money through a series of transactions to disguise its criminal origin." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "A borrower fills out an application with a name and a number, and at face value you can't tell whether any of it is real. After 2001, anti-money-laundering law grew a counterterrorism arm to close that gap, and it reinforced every institution's duty to maintain an Anti-Money-Laundering (AML) program. <b>For an MLO it lands as the Customer Identification Program (CIP)</b> — the duty to verify a customer is who they claim to be before the relationship goes forward, so identity-checking sits inside the larger machinery for catching laundering."
            }
          ]
        },
        {
          "heading": "what cip collects",
          "anchor": {
            "file": "caution-mirror.PNG",
            "caption": "verify identity",
            "kind": "char"
          },
          "paras": [
            {
              "html": "At minimum a CIP gathers four pieces of identifying information before opening the account: name, date of birth, address, and an identification number such as an SSN or TIN. Each one narrows who the applicant can be, and together those <span class=\"cloze\" data-accept='[\"four\",\"4\"]' data-reveal=\"four\">?</span> data points give the institution enough to check the person against its records and government lists."
            }
          ],
          "synth": {
            "q": "Name the four pieces of identifying information a CIP must collect at minimum.",
            "a": "Name, date of birth, address, and an identification number (e.g., SSN or TIN)."
          }
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "the program",
            "topic": "Customer identification",
            "q": "What program does the PATRIOT Act require to verify identity?",
            "a": "a <span class='hl'>Customer Identification Program (CIP)</span>"
          },
          {
            "peg": "broader duty",
            "topic": "AML obligations",
            "q": "What broader AML obligation did the PATRIOT Act reinforce?",
            "a": "maintaining an <span class='hl'>Anti-Money-Laundering (AML)</span> program"
          }
        ],
        "mcq": [
          {
            "q": "The PATRIOT Act requires financial institutions to verify customer identity through a —",
            "opts": [
              "Suspicious Activity Report",
              "Customer Identification Program (CIP)",
              "Currency Transaction Report",
              "privacy opt-out notice"
            ],
            "correct": 1
          },
          {
            "q": "Which set is the minimum identifying information a CIP collects?",
            "opts": [
              "Name, employer, salary, SSN",
              "Name, date of birth, address, identification number",
              "Name, address, credit score, account balance",
              "Date of birth, address, marital status, income"
            ],
            "correct": 1
          }
        ]
      }
    },
    {
      "id": "hpa",
      "name": "HPA",
      "reg": "Homeowners Protection Act · PMI",
      "definitions": [
        { "term": "Adjustable-Rate Mortgage", "def": "A residential mortgage with an interest rate that can change. Also covers mortgages that don't fully amortize and include a conditional right to refinance at maturity." },
        { "term": "Cancellation Date (Fixed-Rate)", "def": "The date when the principal balance, based on the original amortization schedule, first reaches 80% of the property's original value — or the date actual payments bring the balance to 80%." },
        { "term": "Cancellation Date (ARM)", "def": "Same concept, but based on the current amortization schedule in effect rather than the original one." },
        { "term": "Fixed-Rate Mortgage", "def": "A residential mortgage with an interest rate that does not change." },
        { "term": "Good Payment History", "def": "No payments 60+ days late in the 24 months before the cancellation date or cancellation request, and no payments 30+ days late in the 12 months before that date or request." },
        { "term": "Initial Amortization Schedule", "def": "The schedule established at closing for a fixed-rate mortgage showing principal and interest due at each interval to fully pay off the loan." },
        { "term": "Amortization Schedule Then in Effect", "def": "For an ARM, the most recent schedule (original or recalculated) showing principal, interest, and remaining balance at each interval." },
        { "term": "High-Risk Loan", "def": "A conventional loan that doesn't meet Fannie Mae or Freddie Mac underwriting guidelines or FHFA conforming loan limits." },
        { "term": "Midpoint of the Amortization Period", "def": "The halfway point between the first day of the amortization period and the end of the full scheduled amortization." },
        { "term": "Mortgage Insurance", "def": "Insurance (including guaranty insurance) against nonpayment or default on an individual residential mortgage." },
        { "term": "Mortgage Insurer", "def": "A provider of private mortgage insurance authorized to do business in the applicable state." },
        { "term": "Mortgagee", "def": "The holder of a residential mortgage at the time the transaction closes." },
        { "term": "Mortgagor", "def": "The original borrower, or their successors or assignees." },
        { "term": "Original Value", "def": "The lesser of the purchase price (per the contract) or the appraised value at closing. For a refinance of a principal residence: only the appraised value used to approve the refinance." },
        { "term": "Private Mortgage Insurance (PMI)", "def": "Mortgage insurance other than government insurance (FHA MIP, VA, or USDA guarantees)." },
        { "term": "Residential Mortgage", "def": "A mortgage loan on a single-family dwelling that is the borrower's principal residence." },
        { "term": "Residential Mortgage Transaction", "def": "A transaction on or after one year after July 29, 1998, creating a security interest on a principal-residence single-family dwelling to finance its acquisition, initial construction, or refinancing." },
        { "term": "Servicer", "def": "The person responsible for servicing the loan (including the lender, if the lender also services it)." },
        { "term": "Single-Family Dwelling", "def": "A residence consisting of one unit." },
        { "term": "Termination Date (Fixed-Rate)", "def": "The date when the principal balance, based on the original amortization schedule, first reaches 78% of the property's original value." },
        { "term": "Termination Date (ARM)", "def": "Same concept, but based on the current amortization schedule in effect." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "Put down less than 20% and the lender makes you buy private mortgage insurance that protects the lender, not you. Left alone it would ride your bill long after the equity made it pointless. <b>HPA is the rule that gets it off</b> — and it works through two LTV numbers that do different jobs: 80%, where you can ask, and 78%, where the servicer has to act on its own."
            }
          ]
        },
        {
          "heading": "two ltv triggers",
          "paras": [
            {
              "html": "Once the loan reaches 80% LTV — measured against the original value or purchase price — the borrower can request that PMI come off. Lower, at 78% LTV, the servicer must terminate it automatically, but only if the borrower is current. So the request right opens at <span class=\"cloze\" data-accept='[\"80%\",\"80\",\"eighty percent\"]' data-reveal=\"80% LTV\">?</span> LTV, while automatic termination waits for 78%. Miss the current-payment condition at 78% and final termination is deferred to the midpoint of the loan's amortization period, taking effect once the borrower is back in good standing."
            }
          ],
          "synth": {
            "q": "Contrast the 80% and 78% PMI thresholds — what happens at each, and who acts?",
            "a": "At 80% LTV (of original value/purchase price) the borrower may REQUEST cancellation. At 78% LTV the servicer must AUTOMATICALLY terminate PMI, provided the borrower is current. If not current at 78%, automatic termination is deferred to the midpoint of the loan's amortization period (once current)."
          }
        },
        {
          "heading": "high-risk and the clock",
          "paras": [
            {
              "html": "A high-risk (non-conforming) loan moves the automatic-termination line down to 77% LTV, and the loan must still be current; the midpoint backstop doesn't apply to these loans. For that riskier tier the cutoff is <span class=\"cloze\" data-accept='[\"77%\",\"77\",\"seventy-seven percent\"]' data-reveal=\"77% LTV\">?</span> rather than 78%. Once PMI is canceled or terminated, the clock starts on the servicer: notice to the borrower within 30 days, and any unearned premiums returned within 45 days."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "high-risk",
            "topic": "Automatic termination",
            "q": "Automatic-termination LTV for a high-risk (non-conforming) loan?",
            "a": "<span class='hl'>77% LTV</span>, and the loan must be current (midpoint rule does not apply)"
          },
          {
            "peg": "refund",
            "topic": "Premium refunds",
            "q": "After PMI is canceled/terminated, how fast must unearned premiums be refunded?",
            "a": "within <span class='hl'>45 days</span>"
          },
          {
            "peg": "notice",
            "topic": "Borrower notice",
            "q": "How soon after cancellation/termination must the servicer notify the borrower?",
            "a": "no later than <span class='hl'>30 days</span>"
          },
          {
            "peg": "not current",
            "topic": "Final termination",
            "q": "If the borrower isn't current at 78%, when does final termination happen?",
            "a": "at the <span class='hl'>midpoint of the loan's amortization period</span> (once the borrower is current)"
          }
        ],
        "mcq": [
          {
            "q": "On a standard loan, the servicer must AUTOMATICALLY terminate PMI at —",
            "opts": [
              "80% LTV",
              "78% LTV",
              "77% LTV",
              "75% LTV"
            ],
            "correct": 1
          },
          {
            "q": "After PMI is canceled, unearned premiums must be refunded within —",
            "opts": [
              "15 days",
              "30 days",
              "45 days",
              "60 days"
            ],
            "correct": 2
          },
          {
            "q": "For a high-risk (non-conforming) loan, automatic termination occurs at —",
            "opts": [
              "80% LTV",
              "78% LTV",
              "77% LTV",
              "the midpoint, always"
            ],
            "correct": 2
          }
        ]
      }
    },
    {
      "id": "dodd-frank",
      "name": "Dodd-Frank",
      "reg": "Wall Street Reform & Consumer Protection Act",
      "definitions": [
        { "term": "Affiliate", "def": "A person that controls, is controlled by, or is under common control with another person." },
        { "term": "Bureau", "def": "The Bureau of Consumer Financial Protection (CFPB)." },
        { "term": "Consumer", "def": "An individual, or an agent/trustee/representative acting on their behalf." },
        { "term": "Consumer Financial Product or Service", "def": "Any financial product or service offered to consumers." },
        { "term": "Credit", "def": "The right to defer payment, incur debt and defer payment, or buy goods/services and pay later." },
        { "term": "Fair Lending", "def": "Fair, equitable, and nondiscriminatory access to credit for consumers." },
        { "term": "Federal Consumer Financial Law", "def": "Dodd-Frank Title X provisions, the enumerated consumer laws, and any CFPB rule or order issued under them." },
        { "term": "Financial Product or Service", "def": "A broad category: extending credit, servicing loans, leasing, real estate settlement, deposit-taking, funds transmission, payment processing, financial advisory services, consumer report information, debt collection, and anything else the CFPB designates." },
        { "term": "Foreign Exchange", "def": "Exchanging U.S. or foreign currency for another country's currency, for compensation." },
        { "term": "Person", "def": "An individual, partnership, company, corporation, association, trust, estate, cooperative, or other entity." },
        { "term": "Commission", "def": "The Federal Trade Commission (FTC)." },
        { "term": "Mortgage Originator", "def": "Anyone who, for compensation, takes a residential mortgage application, assists a consumer in obtaining one, or advises on loan terms, prepares loan packages, or collects information on behalf of the consumer." },
        { "term": "Nationwide Mortgage Licensing System and Registry", "def": "The system developed by CSBS and AARMR for state licensing of mortgage loan originators." },
        { "term": "Residential Mortgage Loan", "def": "A consumer credit transaction secured by a mortgage or equivalent interest on a dwelling, excluding open-end credit and timeshare-related credit." },
        { "term": "Secretary", "def": "The Secretary of Housing and Urban Development (in the context of residential mortgage transactions)." },
        { "term": "Servicer", "def": "The person responsible for servicing a federally related mortgage loan, including the lender if it also services the loan." }
      ],
      "groups": [
        {
          "paras": [
            {
              "html": "The 2008 crash ran on loans nobody could really repay, written by originators who earned more for pushing borrowers into worse terms. Dodd-Frank rewrote both halves. <b>Title X stood up the Consumer Financial Protection Bureau (CFPB)</b> to police consumer lending, and Title XIV — the Mortgage Reform and Anti-Predatory Lending Act — bolted on the rules that reach the loan itself."
            }
          ]
        },
        {
          "heading": "ability to repay",
          "anchor": {
            "file": "rollerskates-packages.PNG",
            "caption": "can't repay",
            "kind": "char"
          },
          "paras": [
            {
              "html": "The Ability-to-Repay (ATR) rule forces a creditor to make a reasonable, good-faith, documented determination that the borrower can actually repay before the loan is made — weighing credit history, current and expected income, current obligations, debt-to-income or residual income, employment status, and other resources. A Qualified Mortgage (QM) is presumed to satisfy that requirement, which is why lenders steer toward it: writing a <span class=\"cloze\" data-accept='[\"qualified mortgage\",\"QM\",\"qualified mortgage (QM)\"]' data-reveal=\"Qualified Mortgage (QM)\">?</span> is the cleanest way to show ATR was met."
            }
          ],
          "synth": {
            "q": "What is the ATR rule, and how does a Qualified Mortgage relate to it?",
            "a": "ATR requires a creditor to make a reasonable, good-faith, documented determination that the borrower can repay before making the loan (considering credit history, income, obligations, DTI/residual income, employment, and other resources). A Qualified Mortgage (QM) is presumed to satisfy — to comply with — the Ability-to-Repay requirement."
          }
        },
        {
          "heading": "paying the originator",
          "paras": [
            {
              "html": "To kill the incentive behind the crash, Dodd-Frank bars loan-originator compensation from varying based on the loan's terms — anything other than the loan amount — and prohibits steering a borrower into worse terms for higher pay. Separately, a hybrid ARM reset notice has to reach the borrower during the one-month period ending six months before the rate first adjusts, so the warning lands while there's still time to react — that window closes <span class=\"cloze\" data-accept='[\"6 months\",\"6\",\"six months\",\"six\"]' data-reveal=\"6 months\">?</span> ahead of the first adjustment."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "Title X",
            "topic": "CFPB (Title X)",
            "q": "What did Title X of Dodd-Frank create?",
            "a": "the <span class='hl'>Consumer Financial Protection Bureau (CFPB)</span>"
          },
          {
            "peg": "Title XIV",
            "topic": "Mortgage reform (Title XIV)",
            "q": "What is Title XIV of Dodd-Frank called?",
            "a": "the <span class='hl'>Mortgage Reform and Anti-Predatory Lending Act</span>"
          },
          {
            "peg": "ARM notice",
            "topic": "ARM disclosures",
            "q": "When must a hybrid ARM reset notice be delivered?",
            "a": "during the one-month period ending <span class='hl'>6 months</span> before the rate first adjusts"
          },
          {
            "peg": "LO comp",
            "topic": "LO compensation",
            "q": "How does Dodd-Frank restrict loan-originator compensation?",
            "a": "comp may not vary based on the loan's terms (other than <span class='hl'>loan amount</span>); steering for higher pay is prohibited"
          }
        ],
        "mcq": [
          {
            "q": "Title X of Dodd-Frank created the —",
            "opts": [
              "Federal Housing Finance Agency",
              "Consumer Financial Protection Bureau (CFPB)",
              "Office of the Comptroller of the Currency",
              "Financial Stability Oversight Council"
            ],
            "correct": 1
          },
          {
            "q": "A hybrid ARM reset notice must be delivered during the one-month period ending —",
            "opts": [
              "3 months before the first rate adjustment",
              "6 months before the first rate adjustment",
              "12 months before the first rate adjustment",
              "60 days before the first rate adjustment"
            ],
            "correct": 1
          },
          {
            "q": "Loan-originator compensation under Dodd-Frank may vary based on —",
            "opts": [
              "the interest rate",
              "the loan amount",
              "whether a prepayment penalty applies",
              "the loan's points and fees"
            ],
            "correct": 1
          }
        ]
      }
    }
  ]
};

export default section3;

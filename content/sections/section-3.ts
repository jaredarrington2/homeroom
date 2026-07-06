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
            "peg": "ABAD files",
            "topic": "Recordkeeping",
            "q": "How long must a lender retain copies of Affiliated Business Arrangement Disclosures?",
            "a": "At least <span class='hl'>5 years</span> from execution."
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
            "peg": "cooperative brokerage",
            "topic": "Kickbacks & referrals",
            "q": "Which exception allows referral payments between real estate professionals?",
            "a": "Cooperative brokerage and referral arrangements <span class='hl'>solely between real estate agents and brokers</span>."
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
              "html": "A lender can turn you down — what it can't do is turn you down for who you are. <b>ECOA</b>, enacted in <span class=\"cloze\" data-accept='[\"1974\",\"nineteen seventy-four\"]' data-reveal=\"1974\">?</span> and implemented through <b>Regulation B</b>, makes it illegal to base any credit decision on a prohibited basis. Unlike the Fair Housing Act, ECOA isn't limited to real estate — it covers <b>all forms of lending</b>. The full list of prohibited bases under § 1002.4(a) runs to <b>11 items</b>: race, color, nationality, sex (including gender, sexual orientation, and sexual identity), religion, marital status, age (with an exception for capacity to contract), participation in a credit counseling program, income earned through public assistance, prior exercise of rights under consumer credit protection laws, and intent to bear offspring. The protection reaches further than the moment of denial: it's also a violation to <b>discourage</b> a reasonable person from even applying on one of those grounds, which means a lender can break the law before any application exists."
            }
          ]
        },
        {
          "heading": "who's exempt",
          "paras": [
            {
              "html": "Almost every creditor falls under ECOA, but a handful of credit types carry partial exemptions. <b>Public utilities credit</b> — service provided through pipes, wires, or transmission — is exempt only from marital-status inquiries and record-retention rules. <b>Securities credit</b> under the Securities Exchange Act gets a broader carve-out: sex, marital status, spouse information, name designation, account aggregation, furnishing credit information, and record retention. <b>Incidental credit</b> — consumer credit with no finance charge and no more than <span class=\"cloze\" data-accept='[\"4\",\"four\",\"four installments\",\"4 installments\"]' data-reveal=\"4 installments\">?</span> — carries a similar list plus an exemption from notifications. <b>Government credit</b> — extensions to governments or their subdivisions — stands alone as the only category exempt from the general discrimination rule itself. And <b>special purpose credit programs</b> are the reverse: they're the one place a creditor may deliberately consider prohibited characteristics, because the whole point is to serve an economically disadvantaged class. A program qualifies only if it doesn't discriminate against applicants on any other prohibited basis."
            }
          ],
          "synth": {
            "q": "What makes government credit and special purpose credit programs different from the other three ECOA exemptions?",
            "a": "Government credit is the only type fully exempt from ECOA's discrimination rule. Special purpose credit programs are the only type where a creditor may intentionally consider prohibited characteristics (like race or national origin) as eligibility criteria, because the program exists to serve an economically disadvantaged class. The other three (public utilities, securities, incidental) are only exempt from specific procedural requirements — not from the discrimination prohibition itself."
          }
        },
        {
          "heading": "government monitoring",
          "paras": [
            {
              "html": "When a creditor receives an application for credit that will be <b>secured by a dwelling</b> the applicant occupies or will occupy as a principal residence — a purchase or refinance — the creditor must collect the applicant's <b>ethnicity and race, sex, marital status, and age</b>. If the applicant refuses to self-identify in a face-to-face application, the MLO is required to note what he or she believes to be the applicant's race, national origin, and sex based on <b>visual observation</b>. In a non-face-to-face application — phone, mail, online — a refusal is simply recorded as a refusal, and the MLO may not guess."
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
              "html": "Once an application is complete, the creditor owes you a <b>Notice of Action Taken</b>, and the deadline is fixed: it must arrive within <span class=\"cloze\" data-accept='[\"30 calendar days\",\"30 days\",\"30\",\"thirty\",\"thirty days\"]' data-reveal=\"30 calendar days\">?</span>. If the lender approves, the notice explains outstanding conditions and next steps. If the lender can't approve as submitted but can offer different terms, the <b>counteroffer</b> goes on the notice and the applicant has <b>90 calendar days</b> to accept. If additional information is still needed, the creditor sends a <b>Notice of Incomplete Application</b> specifying what's missing and a reasonable deadline to provide it — silence from the applicant releases the creditor from any further obligation. ECOA application records must be retained for <b>25 months</b>."
            }
          ],
          "synth": {
            "q": "After a completed application, what are the two ECOA deadlines — the creditor's to notify, and the applicant's to push back on an adverse decision?",
            "a": "The creditor must send the Notice of Action Taken within 30 calendar days. If the action is adverse, the applicant has 60 days from the denial notification to submit a written request for the specific reasons; the creditor then has 30 days from receiving that request to provide them."
          }
        },
        {
          "heading": "the adverse action notice",
          "paras": [
            {
              "html": "A denial can't hide behind vague language. The <b>Adverse Action Notice</b> must state the action taken, give the creditor's name and address, name the federal agency that administers compliance for that creditor, and explain how the applicant may challenge the decision. For the reasons themselves, the creditor has a choice: state the specific reasons on the notice, or tell the applicant that a written request for reasons will be honored — that request must reach the lender within <span class=\"cloze\" data-accept='[\"60 days\",\"60\",\"sixty\",\"sixty days\"]' data-reveal=\"60 days\">?</span> of the denial, and the creditor then has 30 days to respond. Saying the denial was \"based on internal standards\" or that the applicant \"failed to achieve a qualifying score\" is never sufficient. If the denial relied on a <b>credit report</b>, the notice must also name the repository, tell the applicant a free copy is available, and state that the credit bureau did not make the lending decision."
            }
          ],
          "synth": {
            "q": "What additional information must an Adverse Action Notice include when the denial was based, in whole or in part, on the applicant's credit profile?",
            "a": "The name and address of the credit repository that supplied the report, notice that the applicant may obtain a free copy of that report, and a statement that the credit bureau did not influence the decision — the creditor made it independently."
          }
        },
        {
          "heading": "the appraisal copy",
          "paras": [
            {
              "html": "You paid for the appraisal, so ECOA makes sure you see it. For any first-lien dwelling-secured loan not covered by TRID, the creditor must notify you within <b>3 business days</b> of receiving the application that you have the right to a copy. The copy itself must arrive <b>promptly upon completion</b>, and the hard backstop is <span class=\"cloze\" data-accept='[\"3 business days\",\"3\",\"three\",\"three business days\"]' data-reveal=\"3 business days\">?</span> before consummation for closed-end credit or account opening for open-end. You can waive the timing and agree to receive it at or before closing — but the waiver must be obtained at least 3 business days ahead, and waiving the timing never waives the copy itself. If the deal falls through, the creditor has <b>30 days</b> after deciding the transaction won't close to deliver whatever valuations were completed. The creditor may not charge for providing the copy, though it can charge a reasonable fee for the appraisal itself."
            }
          ]
        },
        {
          "heading": "income and co-applicants",
          "paras": [
            {
              "html": "A creditor cannot discount or exclude an applicant's income because of a prohibited basis, because the income is <b>part-time</b>, or because it comes from an <b>annuity, pension, or other retirement benefit</b>. Public-assistance income and unemployment benefits are valid income — the creditor may evaluate the amount and whether it's likely to continue, but cannot dismiss the source. When an applicant relies on legally entitled <b>alimony, child support, or separate maintenance payments</b>, the creditor may consider them as income to the extent they're likely to be consistently received. A creditor may offer the option to add a co-applicant, but it can never <b>require</b> one or condition the credit on having one."
            }
          ],
          "synth": {
            "q": "Under ECOA, what is the rule for how a creditor must treat alimony and child support income on an application?",
            "a": "The creditor may count alimony, child support, or separate maintenance payments as income to the extent they are likely to be consistently made and are due to continue — but cannot refuse to consider them simply because of their source."
          }
        },
        {
          "heading": "testing and self-testing",
          "paras": [
            {
              "html": "A state or federal examiner may approach an MLO posing as a customer or referral source to test compliance — fail, and legal consequences follow. A <b>self-test</b> is the company's own version: a program or study designed to measure the extent of its compliance with ECOA. If a self-test turns up a likely violation — the standard is <b>more likely than not</b>, even without formal adjudication — the company must report the failure to the relevant regulator and take <b>corrective action</b> that is reasonably likely to remedy both the cause and the effect. Corrective action means identifying the policies behind the violation, determining its scope, and assessing its extent. It may include both prospective and remedial relief. Taking corrective action is <span class=\"cloze\" data-accept='[\"not an admission\",\"not an admission that a violation occurred\",\"not an admission of violation\"]' data-reveal=\"not an admission that a violation occurred\">?</span>."
            }
          ]
        },
        {
          "heading": "disparate treatment and disparate impact",
          "paras": [
            {
              "html": "<b>Disparate treatment</b> is intentional discrimination: an applicant is treated differently because of a protected characteristic. A lender charging higher rates to borrowers of one ethnicity while offering lower rates to equally qualified borrowers of another ethnicity is disparate treatment — the intent to discriminate is the defining element."
            },
            {
              "html": "<b>Disparate impact</b> is harder to spot because the policy itself looks neutral. Centier Bank, an Indiana-chartered bank, decided on purely cost grounds to open only <b>partial-service branches</b> throughout the Gary Primary Metropolitan Statistical Area — the most segregated metro area in the nation for African Americans. Centier's rationale had nothing to do with race: the MSA's socioeconomic profile meant few residents could qualify for full-service products, so full branches would lose money. But the result was that the predominantly African-American population was denied access to the full range of financial services. The court found disparate impact: a facially neutral business decision that disproportionately harmed a protected class. Centier was required to open full-service centers in the Gary MSA, absorbing the losses as a cost of doing business."
            }
          ],
          "synth": {
            "q": "Why was Centier Bank's decision found to be disparate impact rather than disparate treatment?",
            "a": "Because Centier's decision to open only partial-service branches was based on cost and the MSA's socioeconomic profile, not on the race of its residents — so there was no intent to discriminate (which would be disparate treatment). But the neutral decision disproportionately deprived the predominantly African-American population of access to full financial services, which is disparate impact."
          }
        },
        {
          "heading": "foreign language and disclosures",
          "paras": [
            {
              "html": "Any written disclosure or information a creditor provides must be <b>clear and conspicuous</b> and in a form the applicant can retain. Disclosures may be issued in languages other than English, as long as they're also <b>available in English upon request</b>."
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
            "peg": "co-applicant",
            "topic": "Income & co-applicants",
            "q": "Can a creditor require a co-applicant?",
            "a": "No — a creditor may <span class='hl'>offer</span> the option, but can never require one or condition credit on having one"
          },
          {
            "peg": "foreign language",
            "topic": "Disclosures",
            "q": "When can ECOA disclosures be issued in a language other than English?",
            "a": "Anytime, as long as they're <span class='hl'>available in English upon request</span>"
          },
          {
            "peg": "visual observation",
            "topic": "Government monitoring",
            "q": "An applicant refuses to self-identify race in a face-to-face application. What must the MLO do?",
            "a": "Note the applicant's race, national origin, and sex based on <span class='hl'>visual observation</span>"
          },
          {
            "peg": "counteroffer",
            "topic": "Adverse action",
            "q": "After a counteroffer on an Adverse Action Notice, the applicant has —",
            "a": "<span class='hl'>90 calendar days</span> to accept"
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
          },
          {
            "q": "Which type of credit is fully exempt from ECOA's discrimination rule?",
            "opts": [
              "Public utilities credit",
              "Securities credit",
              "Incidental credit",
              "Government credit"
            ],
            "correct": 3
          },
          {
            "q": "A self-test finds a likely ECOA violation. The threshold for requiring corrective action is —",
            "opts": [
              "Beyond a reasonable doubt",
              "Clear and convincing evidence",
              "More likely than not",
              "Preponderance of the evidence"
            ],
            "correct": 2
          },
          {
            "q": "A creditor denies a loan and offers a counteroffer instead. How long does the applicant have to accept?",
            "opts": [
              "30 calendar days",
              "60 calendar days",
              "90 calendar days",
              "120 calendar days"
            ],
            "correct": 2
          },
          {
            "q": "An applicant refuses to self-identify their race on a mail-in application. The MLO must —",
            "opts": [
              "Note the race based on the applicant's name",
              "Record the refusal and make no designation",
              "Leave the field blank without notation",
              "Assign a default category"
            ],
            "correct": 1
          },
          {
            "q": "Which income source can a creditor NOT discount under ECOA?",
            "opts": [
              "Income from an illegal activity",
              "Part-time employment income",
              "Gambling winnings",
              "Non-recurring gifts"
            ],
            "correct": 1
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "ECOA makes it illegal to judge a credit application on who someone is rather than whether they can repay, and forces a creditor to say why when it turns someone down.",
        "facts": [
          "Bars decisions on any <span class=\"hl\">prohibited basis</span> — race, color, religion, national origin, sex, marital status, age, receipt of public-assistance income, or exercising a consumer-credit right.",
          "<span class=\"hl\">Discouraging</span> a reasonable person from applying on a prohibited basis is a violation, even with no application on file.",
          "A creditor may offer a co-applicant but can <span class=\"hl\">never require one</span>.",
          "\"Elderly\" means <span class=\"hl\">age 62 or older</span>.",
          "After a counteroffer on an Adverse Action Notice, the applicant has <span class=\"hl\">90 calendar days</span> to accept."
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
              "html": "A lender's ad shows one number: a rate, big and bold. That number is real, but it isn't what the loan costs you — the fees you pay up front, the insurance the lender requires, and the interest itself all pile on top of it. <b>The Truth in Lending Act (TILA) makes the lender put the full price in writing</b>, in a few standardized figures, so you can hold two offers side by side and see which is actually cheaper. It's a disclosure law, passed in 1968 and run today through the Consumer Financial Protection Bureau's <b>Regulation Z</b>."
            }
          ]
        },
        {
          "heading": "what a rate actually is",
          "paras": [
            {
              "html": "Borrowing money has a price, and that price is the <b>interest rate</b> — also called the <b>note rate</b>, because it's written into the promissory note you sign. It's a yearly percentage charged on the money you still owe. Borrow $250,000 at a 6% note rate and the first year's interest runs about $15,000, folded into twelve monthly payments. The rate is what sets that payment: a higher rate means a bigger payment for the same loan amount. Every other figure TILA discloses is built on top of this one number."
            }
          ]
        },
        {
          "heading": "points and up-front fees",
          "paras": [
            {
              "html": "Some loan costs aren't in the rate — you pay them once, at closing, in cash. The unit of measure is the <b>point</b>: one point is <span class=\"cloze\" data-accept='[\"1%\",\"1\",\"one percent\",\"one\"]' data-reveal=\"1%\">?</span> of the loan amount, so on a $250,000 loan one point is $2,500. Points come in two kinds. <b>Discount points</b> are optional — you pay them to buy your interest rate down, trading cash now for a lower payment later. <b>Origination points</b> (or origination fees) are what the lender charges to make the loan in the first place. Either way the money leaves your pocket up front, which is why the rate alone never tells you the whole cost."
            }
          ]
        },
        {
          "heading": "the finance charge",
          "paras": [
            {
              "html": "Add up everything the credit costs you in dollars — the interest over the whole loan, plus the fees the lender charges as a condition of lending — and you have the <b>finance charge</b>: the cost of credit stated as one dollar figure. The test for what counts is a plain one. If you'd pay the charge even when buying the house with cash, it isn't a finance charge; if it exists only because you're borrowing, it is. So interest, points, and the lender's own fees are in; the home's price and the property taxes are out. The whole point of the figure is to gather every borrowing cost into one place, in dollars."
            }
          ],
          "synth": {
            "q": "What separates a finance charge from a cost that isn't one?",
            "a": "A finance charge is any cost you incur because you're borrowing — interest, points, the lender's own fees. A cost you'd pay even in an all-cash purchase, like the price of the home or the property taxes, is not a finance charge."
          }
        },
        {
          "heading": "the annual percentage rate",
          "visual": "apr-stack",
          "paras": [
            {
              "html": "The note rate lets you compare two loans only if their fees are identical — and they never are. So TILA requires a second figure that folds the fees back in: the <b>annual percentage rate (APR)</b>, the cost of credit expressed as a yearly rate. It takes the finance charge — interest plus the up-front points and lender fees — and spreads it back across the loan as one percentage you can line up against another lender's. Two loans can quote the same 6% note rate, yet one comes in at 6.50% APR and the other at 6.625%. Same price of money; the higher APR is carrying higher fees. That gap is the reason APR exists — it's built for comparison shopping, and a lender can't advertise a rate without stating it."
            }
          ],
          "synth": {
            "q": "Two loans quote the same note rate but different APRs — what does the higher APR tell you, and why does APR exist at all?",
            "a": "The higher-APR loan carries higher up-front points and fees; the note rate — the price of the money — is the same on both. APR folds those fees into one yearly rate so a borrower can compare loans that would otherwise look identical."
          }
        },
        {
          "heading": "liens and your principal dwelling",
          "paras": [
            {
              "html": "When a loan is <b>secured</b> by your home, you've given the lender a <b>lien</b> — a legal claim on the property. Miss enough payments and the lien lets the lender force a sale to get its money back. Order matters: the <b>first lien</b> is repaid first out of any sale, and a <b>subordinate lien</b> (a second mortgage or a home-equity line) stands behind it, which makes it riskier for that lender and usually pricier for you. TILA saves its strongest protections for loans tied to your <b>principal dwelling</b> — the home you actually live in, not a rental or a vacation place."
            }
          ]
        },
        {
          "heading": "what TILA covers",
          "paras": [
            {
              "html": "TILA does three jobs: it forces lenders to disclose a loan's terms and total cost so borrowers can comparison-shop, it gives borrowers a right to cancel certain home loans, and it polices how credit is advertised. It reaches a lender only when four things are all true — the credit goes to a <b>consumer</b>, the lender extends credit <b>regularly</b>, the credit carries a finance charge or is repaid in more than <span class=\"cloze\" data-accept='[\"4\",\"four\"]' data-reveal=\"four\">?</span> installments, and it's for personal, family, or household use. Borrow for a business, a farm, or an organization and you're outside TILA — the same logic as RESPA, that a business borrower can look after itself. A handful of other deals are exempt too: credit above an inflation-adjusted dollar threshold (about $72,000 in 2025) that isn't secured by real estate, public-utility credit, student loans, and employer retirement-plan loans."
            }
          ]
        },
        {
          "heading": "how exact the apr must be",
          "paras": [
            {
              "html": "A disclosed APR gets a little slack, because a hand calculation and the lender's software rarely agree to the last decimal. How much slack depends on how regular the loan is. A <b>regular transaction</b> — level payments on a steady schedule — gets the tighter band: the stated APR must land within <span class=\"cloze\" data-accept='[\"1/8\",\"one-eighth\",\"one eighth\",\"an eighth\",\".125\",\"0.125\"]' data-reveal=\"1/8 of 1 percentage point\">?</span> of 1 percentage point of the true figure, above or below. An <b>irregular transaction</b> — one with multiple advances, uneven payment periods, or uneven payment amounts — is harder to compute exactly, so it's allowed the wider band of 1/4 of 1 percentage point."
            }
          ],
          "synth": {
            "q": "What makes a transaction 'irregular' for APR-accuracy purposes, and what tolerance does it get?",
            "a": "An irregular transaction has multiple advances, irregular payment periods, or irregular payment amounts. Because it's harder to compute exactly, it gets the wider tolerance of 1/4 of 1 percentage point, versus the 1/8-point band allowed on a regular transaction."
          }
        },
        {
          "heading": "which fees the apr includes",
          "paras": [
            {
              "html": "Because the APR is just the finance charge expressed as a rate, the same test decides what lands in it. <b>In:</b> interest, points, and the lender's own charges; any premium for insurance that protects the lender against your default; and a required third-party fee — a title or closing service the lender insists on, or any part of such a fee the lender keeps. A <b>mortgage broker's fee</b> is always in, even if you picked the broker and the lender keeps none of it. <b>Out:</b> an application fee charged to every applicant whether they close or not, late fees and over-limit charges, the <b>seller's</b> points, and fees paid before closing for services like the appraisal and the credit report."
            }
          ],
          "studyCard": "finance-charge"
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
              "html": "On some home loans TILA gives you a cooling-off period — a short window to walk away after you've signed, no reason required. It exists because these loans put your home on the line, and a signature made under pressure shouldn't be irreversible. You <b>can't</b> rescind buying a house — a purchase-money loan is final the moment it closes — but you <b>can</b> unwind a <b>refinance</b> or a home-equity loan on your <b>principal dwelling</b>, where you're borrowing against a home you already own. The window is <span class=\"cloze\" data-accept='[\"3 business days\",\"3\",\"three\",\"three business days\",\"3 precise business days\"]' data-reveal=\"3 business days\">?</span> — counted as precise business days, meaning every day except Sundays and federal holidays — starting the day the loan settles. A few refinances are carved out: one on a second home or an investment property, and a refinance through your original lender that adds no new money."
            }
          ]
        },
        {
          "heading": "inside the rescission window",
          "paras": [
            {
              "html": "Until those three days run out, the deal is frozen: the lender can't disburse any money (except into escrow), no services tied to the loan may be performed, and no materials may be delivered, until the lender is reasonably satisfied you haven't cancelled. If you do rescind, the loan never funds and the lender has <span class=\"cloze\" data-accept='[\"20 calendar days\",\"20\",\"twenty\",\"20 days\",\"twenty calendar days\"]' data-reveal=\"20 calendar days\">?</span> to return everything you paid in connection with the deal. At settlement, every owner of the dwelling gets two copies of the notice of right to cancel — one copy each if it's delivered electronically — but only one of them has to exercise the right to undo the loan for everyone."
            }
          ]
        },
        {
          "heading": "when a missing notice reopens the window",
          "paras": [
            {
              "html": "That three-day clock only starts if the lender does its part. If the lender never properly delivered the notice of right to cancel or the material cost disclosures, the window doesn't close in three days — it stays open for up to <span class=\"cloze\" data-accept='[\"3 years\",\"3\",\"three\",\"three years\"]' data-reveal=\"3 years\">?</span> after consummation, or until you sell or transfer the home, whichever comes first. There is one way to give the window up early: with a genuine financial emergency that needs the money now, you can waive it — but only with a dated statement that describes the emergency and is signed by everyone entitled to rescind. Pre-printed waiver forms aren't allowed, and the lender has the final say on whether the emergency qualifies."
            }
          ],
          "synth": {
            "q": "How can a borrower waive the right of rescission, and what makes the waiver valid?",
            "a": "Only for a bona fide personal financial emergency, using a dated written statement that describes the emergency and is signed by every consumer entitled to rescind. Pre-printed forms are prohibited, and the lender decides whether the emergency justifies the waiver."
          }
        },
        {
          "heading": "adjustable-rate disclosures",
          "paras": [
            {
              "html": "A fixed-rate loan keeps the same rate for its whole life. An <b>adjustable-rate mortgage (ARM)</b> doesn't — after an initial stretch, its rate resets periodically to an outside benchmark called the <b>index</b>, plus a fixed markup the lender adds called the <b>margin</b>. Because the payment can climb, TILA makes the lender explain the risk up front. On any closed-end loan secured by your principal dwelling whose rate can rise after closing, two disclosures go out at application or within <span class=\"cloze\" data-accept='[\"3 business days\",\"3\",\"three\",\"three business days\"]' data-reveal=\"3 business days of application\">?</span>: the <b>CHARM booklet</b> (the Consumer Handbook on Adjustable-Rate Mortgages), which explains how ARMs work in general, and the <b>Early ARM Disclosure</b>, which spells out the specific program — that the rate, payment, or term can change, what index and margin drive it, and whether the starting rate is a temporary discount."
            }
          ]
        },
        {
          "heading": "triggering terms in advertising",
          "paras": [
            {
              "html": "TILA's third job is advertising, and its signature rule is about <b>triggering terms</b>. Vague copy — 'low monthly payments,' 'great rates' — triggers nothing. But the moment an ad states one specific number — the amount or percent of the <b>down payment</b>, the number of payments or the repayment period, the amount of a payment, or the dollar amount of the finance charge — it 'triggers' a set of disclosures the ad must then spell out clearly and conspicuously: the down payment, the full repayment terms including any <b>balloon payment</b>, and the <b>annual percentage rate</b>, named as such, plus whether it can rise after closing. A tempting number can't stand alone — it has to arrive with the context that makes it honest."
            }
          ],
          "synth": {
            "q": "What is a triggering term, and what must an ad disclose once one appears?",
            "a": "A triggering term is a specific credit figure in an ad — the down payment amount or percent, the number or period of payments, a payment amount, or the finance-charge amount. Once one appears, the ad must clearly disclose the down payment, the full repayment terms (including any balloon payment), and the APR (using that term) and whether it can increase."
          }
        },
        {
          "heading": "prohibited advertising practices",
          "paras": [
            {
              "html": "TILA names specific advertising moves that are off-limits, all of them ways to make a loan look better than it is. Calling a rate or payment <b>'fixed'</b> when it can actually rise is prohibited, unless the word 'ARM' or 'adjustable-rate' sits just as prominently and the ad states how long the fixed period lasts. Claiming a loan is a <b>government program</b> or government-endorsed is banned unless it truly is one, like an FHA or VA loan. Using the borrower's <b>current lender's name</b> in an ad the lender didn't send is banned unless the ad plainly says who's really behind it and that they aren't affiliated. Also out: promising the product will <b>eliminate or forgive</b> existing debt, calling a for-profit broker or lender a <b>'counselor,'</b> making misleading rate comparisons, and running <b>foreign-language</b> ads that put the attractive terms in one language and the catches only in English."
            }
          ]
        },
        {
          "heading": "appraiser independence",
          "paras": [
            {
              "html": "A loan can't safely close for more than the home is worth, so the appraisal sits between the borrower and the loan — and that made appraisers a target. Originators used to lean on them to hit the number a deal needed, and appraisers who refused got quietly dropped from future work; the inflated values that resulted left buyers owing more than their homes were worth. TILA now walls the originator off from the appraiser. No one with a stake in the loan may <b>coerce, bribe, threaten, or induce</b> an appraiser to reach a particular value, withhold or condition the appraiser's pay on hitting a number, or dangle future assignments in exchange for a friendly figure. Appraisers, in turn, may not materially misrepresent a value, and no one may falsify or alter a completed valuation. What stays allowed is ordinary quality control — asking the appraiser to weigh additional comparable sales, to correct a genuine error, or to explain a conclusion, and ordering a second valuation when the first looks unreliable."
            }
          ],
          "synth": {
            "q": "Where's the line between illegally pressuring an appraiser and legitimately questioning an appraisal?",
            "a": "Illegal: coercing, bribing, threatening, or paying (or refusing to pay) an appraiser to reach a target value, or conditioning future work on the value. Legitimate: asking the appraiser to consider additional comparable sales, correct a real error, or provide more detail, and obtaining a second valuation when the first appears unreliable."
          }
        },
        {
          "heading": "servicing: payments and payoffs",
          "paras": [
            {
              "html": "Once a loan is made, <b>servicing</b> is the day-to-day handling of it — taking payments, running escrow, issuing payoff figures. TILA polices three parts of that. First, <b>payment crediting</b>: a servicer must credit your payment as of the day it arrives, so a payment isn't quietly held to rack up interest or a late fee. A payment that doesn't follow the servicer's written instructions still has to be credited within 5 days. Second, <b>no pyramiding of late fees</b>: if you pay this month on time but an old late fee is still sitting unpaid, the servicer can't charge a fresh late fee just because of that old one — late fees can't stack on late fees. Third, the <b>payoff statement</b> — the exact amount to close out the loan — must go out within <span class=\"cloze\" data-accept='[\"7 business days\",\"7\",\"seven\",\"seven business days\"]' data-reveal=\"7 business days\">?</span> of your written request."
            }
          ]
        },
        {
          "heading": "how originators get paid",
          "paras": [
            {
              "html": "How a loan originator gets paid shapes which loan they'll steer you toward, so TILA controls it. An originator's pay <b>can't be based on a loan's terms</b> — not the interest rate, not any feature that varies deal to deal — because paying more for a higher rate would reward the originator for making your loan worse. Pay <b>can</b> be a fixed percentage of the <b>loan amount</b>, since the amount isn't a term you'd quietly inflate against the borrower. There's also a <b>dual-compensation</b> bar: if the originator takes payment directly from you, the consumer, they can't also collect from the lender or anyone else on that same loan — one source per deal."
            }
          ],
          "synth": {
            "q": "What can and can't a loan originator's compensation be based on, and why?",
            "a": "It can't be based on a loan's terms — the interest rate or any feature that varies by deal — because that would reward the originator for giving the borrower worse terms. It can be a fixed percentage of the loan amount, since the amount isn't a 'term.' And under the dual-compensation rule, an originator paid directly by the consumer can't also be paid by the lender on the same loan."
          }
        },
        {
          "heading": "the steering safe harbor",
          "paras": [
            {
              "html": "Closely related to pay is <b>steering</b> — directing a borrower into a particular loan because it earns the originator more, when a better loan was available. TILA gives originators a <b>safe harbor</b>: present the borrower a real set of options and you're clear. The set has to include three loans — the one with the <b>lowest interest rate</b>; the one with the lowest rate that carries <b>none of the risky features</b> (no negative amortization, no prepayment penalty, no interest-only period, no balloon in the first <span class=\"cloze\" data-accept='[\"7 years\",\"7\",\"seven\",\"seven years\"]' data-reveal=\"7 years\">?</span>, no demand feature, no shared equity or appreciation); and the one with the <b>lowest total points and origination fees</b>. Show those three, and the choice is genuinely the borrower's."
            }
          ]
        },
        {
          "heading": "higher-priced mortgage loans",
          "paras": [
            {
              "html": "When a loan's rate runs well above the going rate for safe borrowers, TILA flags it a <b>Higher-Priced Mortgage Loan (HPML)</b> and attaches extra protections against excessive points and fees. The benchmark is the <b>Average Prime Offer Rate (APOR)</b> — a low-risk baseline the CFPB publishes and updates about weekly, built from the rates and pricing offered to the strongest borrowers. Compare a loan's APR to APOR, and how far above the line it sits decides the label. A first-lien loan within the conforming limit becomes an HPML at <span class=\"cloze\" data-accept='[\"1.5\",\"1.5 points\",\"1.5 percentage points\",\"1.5%\"]' data-reveal=\"1.5 percentage points\">?</span> percentage points over APOR; a first-lien <b>jumbo</b> loan (above that limit) at 2.5; and a <b>subordinate</b> lien at 3.5. A few loans are never HPMLs — co-op shares, a loan for a home's initial construction, a home-equity line, a bridge loan of 12 months or less, and a reverse mortgage."
            }
          ]
        },
        {
          "heading": "what an hpml requires",
          "paras": [
            {
              "html": "Being tagged an HPML pulls in three requirements. First, an <b>escrow account</b> for property taxes and homeowner's insurance, so a stretched borrower can't skip them and lose the home — mandatory for at least <span class=\"cloze\" data-accept='[\"5 years\",\"5\",\"five\",\"five years\"]' data-reveal=\"5 years\">?</span>. After that it can be removed, but only if the borrower asks in writing, the loan is current, and the balance has fallen to 80% or less of the home's original value. Second, an <b>interior-inspection appraisal</b> by a licensed or certified appraiser who actually visits the property, before closing — and a <b>second</b> appraisal on a quick flip: if the seller bought the place 90 or fewer days earlier and is reselling for more than <span class=\"cloze\" data-accept='[\"10%\",\"10\",\"ten percent\",\"ten\"]' data-reveal=\"10%\">?</span> above what they paid, or bought it 91 to 180 days earlier and is reselling for more than 20% above. Third, the lender must give the borrower a copy of any appraisal, even if the loan never closes."
            }
          ],
          "synth": {
            "q": "Once an HPML is old enough, what conditions let its escrow account be removed?",
            "a": "The borrower must request removal in writing, the loan must be current, and the balance must have dropped to 80% or less of the home's original value."
          }
        },
        {
          "heading": "how long records are kept",
          "paras": [
            {
              "html": "TILA sets how long a lender keeps the paperwork, and the periods differ by document. Most TILA records — the initial cost disclosures and the like — are held for <span class=\"cloze\" data-accept='[\"3 years\",\"3\",\"three\",\"three years\"]' data-reveal=\"3 years\">?</span>. The <b>Closing Disclosure</b> and its related documents are held longer, for 5 years after closing; if the lender sells the loan and stops servicing it, it has to hand those disclosures to the new owner to keep for whatever's left of the five years. Records of what the lender paid its <b>loan originators</b> are kept for 3 years from the date of payment."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "note rate",
            "topic": "Cost basics",
            "q": "What sets the size of your monthly payment?",
            "a": "the <span class='hl'>interest rate</span> (note rate)"
          },
          {
            "peg": "cash test",
            "topic": "APR & finance charge",
            "q": "A fee you'd also pay when buying the home with cash is…",
            "a": "<span class='hl'>not</span> a finance charge"
          },
          {
            "peg": "broker fee",
            "topic": "APR & finance charge",
            "q": "Is a mortgage broker's fee part of the finance charge?",
            "a": "<span class='hl'>Yes</span> — always, even if you chose the broker and the lender keeps none of it"
          },
          {
            "peg": "two copies",
            "topic": "Rescission",
            "q": "How many copies of the notice of right to cancel does each owner receive?",
            "a": "<span class='hl'>two</span> (one if delivered electronically)"
          },
          {
            "peg": "the ARM pair",
            "topic": "Adjustable rates",
            "q": "The two disclosures required for an adjustable-rate loan?",
            "a": "the <span class='hl'>CHARM booklet</span> and the <span class='hl'>Early ARM Disclosure</span>"
          },
          {
            "peg": "'fixed'",
            "topic": "Advertising",
            "q": "Can an ad call an ARM's rate 'fixed'?",
            "a": "Only if <span class='hl'>'ARM' / 'adjustable-rate'</span> is equally prominent and the ad states how long the fixed period lasts"
          },
          {
            "peg": "gov't loan",
            "topic": "Advertising",
            "q": "When may an ad call a loan 'government-endorsed'?",
            "a": "only if it truly is — such as an <span class='hl'>FHA or VA</span> loan"
          },
          {
            "peg": "no pyramiding",
            "topic": "Servicing & records",
            "q": "Can a servicer charge a new late fee only because an old late fee went unpaid?",
            "a": "<span class='hl'>No</span> — late fees can't pyramid on late fees"
          },
          {
            "peg": "5-day credit",
            "topic": "Servicing & records",
            "q": "A payment that doesn't follow the servicer's written instructions must be credited within…",
            "a": "<span class='hl'>5 days</span>"
          },
          {
            "peg": "CD kept",
            "topic": "Servicing & records",
            "q": "The Closing Disclosure and related documents must be retained for…",
            "a": "<span class='hl'>5 years</span> after closing"
          },
          {
            "peg": "second look",
            "topic": "HPML",
            "q": "An HPML needs a second appraisal if the seller bought 91–180 days earlier and resells for more than…",
            "a": "<span class='hl'>20%</span> above what they paid"
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
          },
          {
            "q": "Which of these is a triggering term in a credit advertisement?",
            "opts": [
              "\"Great rates available\"",
              "\"Low monthly payments\"",
              "\"$1,200 per month\"",
              "\"Call us today\""
            ],
            "correct": 2
          },
          {
            "q": "Which is NOT one of TILA's three purposes?",
            "opts": [
              "Disclosing loan costs for comparison shopping",
              "Establishing the right of rescission",
              "Overseeing lending advertising",
              "Setting a maximum interest rate lenders may charge"
            ],
            "correct": 3
          },
          {
            "q": "The Average Prime Offer Rate (APOR) is best described as —",
            "opts": [
              "the highest rate a lender may legally charge",
              "a low-risk baseline rate the CFPB publishes",
              "the borrower's own note rate",
              "the APR ceiling for jumbo loans"
            ],
            "correct": 1
          },
          {
            "q": "Under the dual-compensation rule, an originator paid directly by the borrower may also collect from —",
            "opts": [
              "the lender",
              "no one else on that loan",
              "the title company",
              "the appraiser"
            ],
            "correct": 1
          },
          {
            "q": "During the 3-day rescission window, the lender may —",
            "opts": [
              "disburse the loan proceeds to the borrower",
              "perform services connected to the loan",
              "hold funds in escrow",
              "deliver materials for the transaction"
            ],
            "correct": 2
          },
          {
            "q": "An HPML's interior-inspection appraisal must be performed by —",
            "opts": [
              "any licensed real estate agent",
              "a licensed or certified appraiser who visits the property",
              "an automated valuation model",
              "the loan originator"
            ],
            "correct": 1
          },
          {
            "q": "Which loan is never subject to HPML rules?",
            "opts": [
              "A first-lien purchase loan",
              "A subordinate-lien loan",
              "A bridge loan of 12 months or less",
              "A jumbo refinance"
            ],
            "correct": 2
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "TILA puts the true cost of borrowing into the same two numbers on every loan so borrowers can compare lenders, and gives homeowners a short window to unwind certain refinances.",
        "facts": [
          "Every loan must state the <span class=\"hl\">APR</span> and the <span class=\"hl\">finance charge</span>.",
          "The right of rescission runs <span class=\"hl\">3 business days</span> after consummation on a qualifying refinance.",
          "If the rescission disclosure was never properly given, the window stretches to <span class=\"hl\">3 years</span>.",
          "After a borrower rescinds, the lender returns money within <span class=\"hl\">20 calendar days</span>.",
          "An HPML escrow can be removed after 5 years once LTV is <span class=\"hl\">80% or less</span> of the current balance."
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
              "html": "Most of TILA sets the rules every mortgage follows. <b>HOEPA is a trap-door inside it.</b> When a loan's cost climbs past certain lines, the loan trips into a category called a <b>\"high-cost\" mortgage</b> and a wall of extra restrictions drops down on it. The point isn't to ban these loans — it's to make sure a borrower taking on an expensive, risky one was warned and advised first. HOEPA lives in TILA as <b>Section 32</b>, which is why you'll hear a high-cost loan called a \"Section 32 loan.\""
            }
          ]
        },
        {
          "heading": "equity, and why it's a target",
          "paras": [
            {
              "html": "The thing HOEPA is really protecting is your <b>equity</b> — the slice of the home you actually own, the difference between what it's worth and what you still owe on it. Pay a mortgage down for thirty years and your equity grows until, paid off, you own the whole thing outright. That stored-up wealth is exactly what makes a longtime or elderly homeowner a target: a house with lots of equity and an owner who may not read the fine print is, to the wrong kind of lender, a prize sitting behind an easy loan."
            }
          ]
        },
        {
          "heading": "the predatory loan",
          "paras": [
            {
              "html": "Normally a lender wants the loan repaid. A predatory lender wants the opposite. <b>Equity stripping</b> is the abuse HOEPA is named against: a lender writes a loan it expects the borrower <em>can't</em> afford — stuffed with fees, carrying a payment that will eventually balloon — not despite the likelihood of default but because of it. When the borrower falls behind, the lender forecloses and walks away with a house that had real equity in it. The loan was never meant to be paid; it was a way to take the home."
            }
          ],
          "synth": {
            "q": "Why would a predatory lender deliberately make a loan the borrower can't repay?",
            "a": "To strip the borrower's equity. The lender loads the loan with fees and an unaffordable payment expecting default, then forecloses and takes a home that had real equity in it — the foreclosure is the goal, not a failure. HOEPA exists to stop this."
          }
        },
        {
          "heading": "the three lines that make a loan high-cost",
          "paras": [
            {
              "html": "A loan becomes high-cost the moment it crosses <b>any one</b> of three lines — you don't need all three, just one. The three watch the three places excess cost hides: the loan's <b>rate</b>, its <b>points and fees</b>, and its <b>prepayment penalty</b>. HOEPA reaches consumer loans on a borrower's principal dwelling; it leaves out reverse mortgages, loans for a home's initial construction, loans where a state Housing Finance Agency is the creditor, and USDA Section 502 Direct loans."
            }
          ]
        },
        {
          "heading": "the rate trigger",
          "paras": [
            {
              "html": "The first line watches the APR against the <b>average prime offer rate (APOR)</b>, the low-risk benchmark from TILA. A <b>first-lien</b> loan goes high-cost when its APR beats APOR by <span class=\"cloze\" data-accept='[\"6.5\",\"6.5 percentage points\",\"6.5 points\",\"six and a half\"]' data-reveal=\"6.5 percentage points\">?</span> percentage points or more. The bar sits higher for riskier, smaller loans: a <b>subordinate lien</b>, or a personal-property loan under $50,000, crosses at 8.5 percentage points over APOR."
            }
          ],
          "synth": {
            "q": "What are HOEPA's rate triggers, and which loan gets which?",
            "a": "A first-lien loan is high-cost when its APR exceeds APOR by 6.5 percentage points or more; a subordinate lien — or a personal-property loan under $50,000 — crosses at 8.5 percentage points or more over APOR."
          }
        },
        {
          "heading": "the points-and-fees trigger",
          "paras": [
            {
              "html": "The second line catches cost front-loaded into fees. On a normal-sized loan — $27,592 or more, a figure that resets each year — the loan goes high-cost once total <b>points and fees</b> exceed <span class=\"cloze\" data-accept='[\"5%\",\"5\",\"5 percent\",\"five percent\",\"five\"]' data-reveal=\"5% of the loan amount\">?</span> of the loan amount. On a smaller loan the percentage would let a lender pile on fees without ever tripping it, so the test tightens to the lesser of 8% of the loan or a flat $1,380. The dollar figures move with inflation; the idea doesn't — fees past a share of the loan flip it high-cost."
            }
          ],
          "synth": {
            "q": "How does HOEPA's points-and-fees trigger change with loan size?",
            "a": "For loans of $27,592 or more, the loan is high-cost once points and fees exceed 5% of the loan amount. For smaller loans, the threshold tightens to the lesser of 8% of the loan amount or a flat dollar cap (about $1,380), so small loans can't be loaded with fees under the percentage rule."
          }
        },
        {
          "heading": "the prepayment-penalty trigger",
          "paras": [
            {
              "html": "The third line watches the <b>prepayment penalty</b> — a fee for paying the loan off early. A loan goes high-cost if that penalty can be charged more than 36 months after consummation, or if it can ever run to <span class=\"cloze\" data-accept='[\"2%\",\"2\",\"2 percent\",\"two percent\",\"two\"]' data-reveal=\"2% of the amount prepaid\">?</span> or more of the amount prepaid. A penalty that reaches too deep into the loan's life, or bites too hard, is treated as a mark of a high-cost loan."
            }
          ]
        },
        {
          "heading": "what high-cost turns off",
          "paras": [
            {
              "html": "Once a loan is high-cost, HOEPA strips out the terms a predatory loan relies on. No <b>balloon payment</b> more than twice a regular payment. No <b>negative amortization</b> — the balance can't be built to grow. No <b>prepayment penalty</b> at all, and no interest-rate hike triggered just by default. No <b>demand feature</b> letting the lender call the whole balance due, except for fraud, real default, or damage to the lender's security. And the loan's proceeds can't pay more than two periodic payments in advance."
            }
          ],
          "synth": {
            "q": "Name the loan terms HOEPA bans once a mortgage is high-cost.",
            "a": "No balloon payment over twice a regular payment, no negative amortization, no prepayment penalty, no interest-rate increase on default, no demand-feature acceleration (except for fraud, default, or harm to the lender's security), and proceeds can't prepay more than two periodic payments."
          }
        },
        {
          "heading": "counseling and the warning",
          "anchor": {
            "file": "witch-microphone.PNG",
            "caption": "counsel first",
            "kind": "char"
          },
          "paras": [
            {
              "html": "Because a high-cost loan is dangerous, HOEPA forces a pause before signing. The borrower must first get <b>homeownership counseling</b> from a HUD-approved counselor of their own choosing — one not employed by or tied to the lender — and the lender must hold written certification of it before extending the loan. On top of that, a special high-cost disclosure has to reach the borrower at least <span class=\"cloze\" data-accept='[\"3 business days\",\"3\",\"three\",\"three business days\"]' data-reveal=\"3 business days\">?</span> before consummation, carrying a blunt warning: you don't have to go through with this, and if you take the loan you could lose your home and everything you've put into it."
            }
          ],
          "synth": {
            "q": "What counseling does HOEPA require before a high-cost loan can close, and who gives it?",
            "a": "The borrower must receive homeownership counseling on the advisability of the loan from a HUD-approved counselor of the borrower's own choosing who is not employed by or affiliated with the lender, conducted after the required disclosures are issued. The lender must obtain written certification of that counseling before extending the loan."
          }
        },
        {
          "heading": "the rest of the high-cost rulebook",
          "paras": [
            {
              "html": "HOEPA closes the side doors, too. Loan proceeds meant for home improvements can't be paid straight to the <b>contractor</b> — they go to the borrower, jointly, or to an agreed escrow — so a contractor can't take the money and vanish. Anyone who buys a high-cost loan is put on <b>notice</b> that they inherit the borrower's claims and defenses, which makes these loans hard to offload. A lender can't refinance a borrower's high-cost loan into <b>another</b> high-cost loan within <span class=\"cloze\" data-accept='[\"1 year\",\"1\",\"one\",\"one year\",\"12 months\",\"twelve months\"]' data-reveal=\"1 year\">?</span> unless it's clearly in the borrower's interest, can't encourage a borrower to default, and must actually check the borrower's <b>ability to repay</b>. Late fees are capped at 4% of the past-due payment, charged only after a 15-day grace period and only once per late payment."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "aka",
            "topic": "What HOEPA is",
            "q": "Two other names for a HOEPA loan?",
            "a": "a <span class='hl'>Section 32 loan</span> or a <span class='hl'>high-cost mortgage</span>"
          },
          {
            "peg": "36 months",
            "topic": "High-cost triggers",
            "q": "A prepayment penalty also trips high-cost if it can be charged more than…",
            "a": "<span class='hl'>36 months</span> after consummation"
          },
          {
            "peg": "exempt",
            "topic": "Coverage",
            "q": "Name loans HOEPA doesn't cover.",
            "a": "<span class='hl'>reverse mortgages</span>, initial-construction loans, HFA-creditor loans, and USDA Section 502 Direct loans"
          },
          {
            "peg": "no neg-am",
            "topic": "Banned terms",
            "q": "Can a high-cost loan let the balance grow (negative amortization)?",
            "a": "<span class='hl'>No</span> — negative amortization is banned"
          },
          {
            "peg": "≤2 advance",
            "topic": "Banned terms",
            "q": "How many periodic payments may a high-cost loan's proceeds pay in advance?",
            "a": "no more than <span class='hl'>two</span>"
          },
          {
            "peg": "contractor pay",
            "topic": "Prohibited acts",
            "q": "Home-improvement proceeds from a high-cost loan may not be paid…",
            "a": "directly to the <span class='hl'>contractor</span> — pay the borrower, jointly, or an agreed escrow"
          },
          {
            "peg": "assignee",
            "topic": "Prohibited acts",
            "q": "What does a buyer of a high-cost loan inherit?",
            "a": "the borrower's <span class='hl'>claims and defenses</span> against the original lender"
          },
          {
            "peg": "no default push",
            "topic": "Prohibited acts",
            "q": "Before refinancing a debt into a high-cost loan, a lender may not…",
            "a": "<span class='hl'>recommend or encourage default</span> on the existing debt"
          },
          {
            "peg": "grace",
            "topic": "Fee limits",
            "q": "A high-cost late fee can be charged only after a grace period of…",
            "a": "<span class='hl'>15 days</span>, and only once per late payment"
          }
        ],
        "mcq": [
          {
            "q": "How many of HOEPA's three thresholds must a loan cross to become high-cost?",
            "opts": [
              "All three",
              "Any one",
              "At least two",
              "None — it's the lender's choice"
            ],
            "correct": 1
          },
          {
            "q": "HOEPA applies to consumer loans secured by —",
            "opts": [
              "any investment property",
              "the borrower's principal dwelling",
              "commercial real estate",
              "vacant land"
            ],
            "correct": 1
          },
          {
            "q": "HOEPA's ability-to-repay requirement does NOT apply to —",
            "opts": [
              "a 30-year fixed high-cost loan",
              "a bridge loan with a term under 12 months",
              "a subordinate-lien high-cost loan",
              "a cash-out refinance"
            ],
            "correct": 1
          },
          {
            "q": "The required high-cost disclosure must warn the borrower that —",
            "opts": [
              "the rate is fixed for life",
              "they could lose their home if they don't meet the loan's terms",
              "the loan is government-insured",
              "closing costs are waived"
            ],
            "correct": 1
          },
          {
            "q": "HOEPA is part of which law?",
            "opts": [
              "RESPA (Regulation X)",
              "ECOA (Regulation B)",
              "TILA, as Section 32",
              "the Fair Credit Reporting Act"
            ],
            "correct": 2
          },
          {
            "q": "A personal-property loan under $50,000 becomes high-cost when its APR exceeds APOR by —",
            "opts": [
              "6.5 percentage points",
              "8.5 percentage points",
              "1.5 percentage points",
              "3.5 percentage points"
            ],
            "correct": 1
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "HOEPA catches the most expensive home loans and wraps them in extra protections, so a borrower who crosses into high-cost territory gets warned and shielded from the worst terms.",
        "facts": [
          "A loan becomes high-cost by crossing any of three triggers: the <span class=\"hl\">APR</span>, the <span class=\"hl\">points-and-fees</span>, or the <span class=\"hl\">prepayment-penalty</span> threshold.",
          "The prepayment trigger: a penalty over <span class=\"hl\">2% of the amount prepaid</span>, or one that can apply more than <span class=\"hl\">36 months</span> after consummation.",
          "Late fees are capped at <span class=\"hl\">4% of the past-due payment</span>.",
          "The high-cost disclosure is due at least <span class=\"hl\">3 business days before consummation</span>."
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
              "html": "At the end of buying a house comes the <b>closing</b> — you sit at a table, sign a thick stack of paper, the money moves, and you walk out with the keys. Buried in that stack are dozens of fees you never itemized: a title search, an appraisal, recording charges, prepaid taxes. Two forms bracket that whole event, and the rule that governs them is <b>TRID</b> — the TILA-RESPA Integrated Disclosure rule. Since 2015 it has merged four overlapping old forms into a <b>Loan Estimate</b> at the start and a <b>Closing Disclosure</b> at the end, and it sets how far the numbers may move between them."
            }
          ]
        },
        {
          "heading": "what a closing actually is",
          "paras": [
            {
              "html": "Two words get used loosely at the end of a loan. <b>Settlement</b> (or closing) is the event where the documents are signed and the funds change hands; <b>consummation</b> is the exact moment you become contractually obligated on the loan — the point every TRID deadline counts from. The fees in the stack pay for <b>settlement services</b>: the outside jobs a loan needs done — the appraisal that values the home, the title work that proves the seller owns it, the escrow or settlement agent who handles the money, the county's recording of the new lien. You didn't hire most of these companies, but you pay them, which is exactly why the law forces their costs into the open."
            }
          ]
        },
        {
          "heading": "two forms, front and back",
          "paras": [
            {
              "html": "The <b>Loan Estimate (LE)</b> comes first — the lender's early, good-faith quote of your rate, your monthly payment, and every closing cost, laid out so you can set two lenders' offers side by side and shop. The <b>Closing Disclosure (CD)</b> comes last — the final, binding accounting of the same items, the numbers you'll actually pay. The point of having both is that you can hold the CD up against the LE and see what moved. Everything else in TRID is about that gap: how fast each form has to reach you, and how far a fee is allowed to drift from the estimate to the final bill."
            }
          ],
          "synth": {
            "q": "What's the difference in purpose between the Loan Estimate and the Closing Disclosure?",
            "a": "The Loan Estimate is the lender's early good-faith quote of rate, payment, and costs, given so the borrower can compare lenders and shop. The Closing Disclosure is the final, binding statement of the same figures at the end, so the borrower can check it against the estimate before signing."
          }
        },
        {
          "heading": "the four forms it replaced",
          "paras": [
            {
              "html": "Before TRID, four documents did this job: a <b>Good Faith Estimate</b> and an initial <b>Truth-in-Lending</b> statement up front, then a <b>HUD-1</b> settlement statement and a final Truth-in-Lending statement at the end. They overlapped, used inconsistent language, and were hard to line up — so an unscrupulous originator could hand out a Good Faith Estimate with intentionally lowballed fees to look cheaper than the competition, then reveal the real total on the HUD-1 as late as the morning of closing. Cornered at the table, the borrower usually just signed and paid. TRID collapsed those four into the LE and CD to end exactly that surprise."
            }
          ]
        },
        {
          "heading": "who TRID covers",
          "paras": [
            {
              "html": "TRID reaches most <b>closed-end consumer loans secured by real property</b> — an ordinary purchase or refinance mortgage. It leaves out a familiar handful: <b>home-equity lines of credit</b> (HELOCs), <b>reverse mortgages</b>, loans on a <b>mobile home not attached to real property</b>, and certain no-interest second mortgages used for down-payment assistance or rehab. A loan outside TRID falls back to the older disclosure forms. This is roughly the same consumer-versus-business line the other federal laws draw — TRID is built for the individual home borrower drowning in paperwork, not the sophisticated commercial one."
            }
          ]
        },
        {
          "heading": "what starts the loan estimate clock",
          "paras": [
            {
              "html": "The Loan Estimate is due once you have a real application, and TRID defines that precisely: an application exists the moment the originator has all <b>six</b> items — your name, your income, your Social Security number, the property address, an estimate of the property's value, and the loan amount you want. Once those six are in hand, the lender has to send the LE no later than <span class=\"cloze\" data-accept='[\"3 general business days\",\"3\",\"three\",\"three general business days\",\"3 business days\"]' data-reveal=\"3 general business days\">?</span> after application, and must formally approve or deny the loan within 30 calendar days. Collecting the six items is what trips the clock — even if you say you're only browsing, they still owe you an LE."
            }
          ]
        },
        {
          "heading": "before the lender can charge you",
          "paras": [
            {
              "html": "The LE is meant to be free to receive and easy to walk away from, so TRID guards the moment money first changes hands. After it issues the LE, the lender may not charge you <b>any</b> fee — beyond the actual cost of pulling your credit report — until you tell it, in writing or out loud, that you <b>intend to proceed</b>. Every fee on the LE has to be quoted in good faith, and if one later changes the lender must be able to justify why. A blank line item is left blank, never marked \"N/A.\" And a lender that gives an informal cost sheet instead of the official LE has to print, in at least 12-point type, that the real rate and costs could be higher and the borrower should get an official Loan Estimate."
            }
          ]
        },
        {
          "heading": "the seven-day floor",
          "paras": [
            {
              "html": "Getting the estimate early is only useful if there's time to act on it, so TRID puts a floor under the whole process: once the Loan Estimate is delivered or mailed, the loan may not close for at least <span class=\"cloze\" data-accept='[\"7 precise business days\",\"7\",\"seven\",\"seven precise business days\",\"7 business days\"]' data-reveal=\"7 precise business days\">?</span>. That waiting period can be shortened only for a genuine, documented financial emergency. It guarantees a full week between the first real quote and the earliest possible signing."
            }
          ]
        },
        {
          "heading": "what lets a fee change",
          "paras": [
            {
              "html": "Once the LE is out, its fees are supposed to hold. Only a <b>valid change of circumstance (VCOC)</b> lets them move and forces a revised estimate. There are five: an extraordinary event outside anyone's control; information the lender relied on turning out to be wrong or changing; new, relevant information surfacing after disclosure; a natural disaster; or the chosen title company going out of business mid-deal. When one of these happens, the borrower pays the item's true cost — but absent a VCOC, the tolerance rules below hold the line."
            }
          ],
          "synth": {
            "q": "What is a valid change of circumstance (VCOC), and what does it do to the fee tolerances?",
            "a": "A VCOC is one of five events — an extraordinary event beyond anyone's control, information the lender relied on being wrong or changing, new relevant information surfacing, a natural disaster, or the chosen title company closing mid-transaction. It suspends the tolerance limits, so the borrower pays the fee's true cost and the lender issues a revised Loan Estimate."
          }
        },
        {
          "heading": "the three tolerance buckets",
          "studyCard": "trid-tolerances",
          "paras": [
            {
              "html": "How far a quoted fee may drift from the LE to the CD depends on who controls it. TRID sorts every fee into three <b>tolerance</b> buckets. <b>Zero tolerance</b>: fees the lender controls — its own charges, a provider it required you to use, transfer taxes — can't rise a dollar; the lender eats any increase. <b>10% tolerance</b>: fees you could shop but only from the lender's list, plus recording fees — the whole group's total may rise up to <span class=\"cloze\" data-accept='[\"10%\",\"10\",\"ten percent\",\"ten\"]' data-reveal=\"10%\">?</span>, and the lender pays anything beyond that. <b>No tolerance</b>: fees the lender doesn't control — prepaid interest, property taxes, insurance, or a provider you picked entirely on your own — can rise to their true cost as long as the estimate was made in good faith. The logic is one idea: the more control the lender had over a fee, the less it's allowed to move."
            }
          ],
          "synth": {
            "q": "Why does TRID let some fees rise freely while freezing others at the estimate?",
            "a": "Because the buckets track control. Fees the lender controls — its own charges, required providers, transfer taxes — are zero-tolerance and can't rise. Fees the borrower can shop from the lender's list can rise up to 10% in aggregate. Fees the lender doesn't control — taxes, insurance, a provider the borrower chose independently — have no tolerance limit and can rise to actual cost."
          }
        },
        {
          "heading": "how the 10% test works",
          "paras": [
            {
              "html": "The 10% bucket isn't checked fee by fee — it's checked in <b>total</b>. Add up that bucket's fees on the Loan Estimate, add up the same fees on the Closing Disclosure, and compare the two sums. The borrower can be charged up to 110% of the disclosed total; anything above that is the lender's to absorb. So one fee can overshoot as long as another in the bucket came in low enough to keep the group under 110%. It's the aggregate that has to stay in bounds."
            }
          ]
        },
        {
          "heading": "the cure",
          "paras": [
            {
              "html": "When the final numbers breach a tolerance and no valid change of circumstance excuses it, the lender has to make the borrower whole — the <b>cure</b>. It refunds the excess the borrower overpaid, and the deadline is no later than <span class=\"cloze\" data-accept='[\"60 days\",\"60\",\"sixty\",\"sixty days\"]' data-reveal=\"60 days after consummation\">?</span> after consummation. The cure is the enforcement behind the tolerance rules: exceed the limit without a valid reason and you simply owe the money back."
            }
          ]
        },
        {
          "heading": "revising the loan estimate",
          "paras": [
            {
              "html": "A valid change of circumstance triggers a <b>revised Loan Estimate</b>, due within 3 general business days of the lender identifying the change. Because a revised estimate resets the borrower's chance to react, the closing can't happen for at least <span class=\"cloze\" data-accept='[\"4 precise business days\",\"4\",\"four\",\"four precise business days\",\"4 business days\"]' data-reveal=\"4 precise business days\">?</span> after the borrower receives it — stretched to seven if it's mailed, to allow for delivery. One hard stop: a revised LE may never be issued after the Closing Disclosure has already gone out. Past that point, changes ride on the CD instead."
            }
          ]
        },
        {
          "heading": "the closing disclosure clock",
          "paras": [
            {
              "html": "The Closing Disclosure has to reach the borrower with time to read it against the estimate. The rule: the borrower must <b>receive</b> the CD at least <span class=\"cloze\" data-accept='[\"3 precise business days\",\"3\",\"three\",\"three precise business days\",\"3 business days\"]' data-reveal=\"3 precise business days\">?</span> before consummation. If it's mailed or sent electronically, the wait grows to six precise business days — three assumed for delivery, three to review — unless the borrower confirms receipt earlier. The lender, the settlement agent, or both may prepare it, and on a rescindable loan every party with the right to cancel gets a copy."
            }
          ],
          "synth": {
            "q": "Lay out the Closing Disclosure waiting period both ways — handed over in person versus mailed or sent electronically.",
            "a": "The borrower must receive the CD at least 3 precise business days before consummation. If it's mailed or sent electronically, the period becomes 6 precise business days — 3 for delivery plus 3 to review — unless the borrower confirms receipt sooner."
          }
        },
        {
          "heading": "what restarts the three-day clock",
          "paras": [
            {
              "html": "Most last-minute changes just get a corrected CD handed over at the table — no new waiting period. Three changes are serious enough to reset the full three-day clock and force a new Closing Disclosure: the final <b>APR</b> moving more than <span class=\"cloze\" data-accept='[\"0.125%\",\".125\",\"0.125\",\"1/8\",\"one-eighth\"]' data-reveal=\"0.125% (fixed) / 0.25% (ARM)\">?</span> on a fixed-rate loan (or 0.25% on an ARM), the <b>loan product itself changing</b>, or a <b>prepayment penalty being added</b>. Each of these changes the deal enough that the borrower is owed a fresh three days to reconsider."
            }
          ],
          "synth": {
            "q": "Which three changes force a brand-new 3-day Closing Disclosure waiting period?",
            "a": "The APR moving more than 0.125% on a fixed-rate loan (or 0.25% on an ARM), the loan product changing, or a prepayment penalty being added. Any of the three resets the full 3-day clock."
          }
        },
        {
          "heading": "how long the forms are kept",
          "paras": [
            {
              "html": "TRID's records outlast the loan. The Loan Estimate must be kept for at least 3 years after consummation; the Closing Disclosure, longer, for at least <span class=\"cloze\" data-accept='[\"5 years\",\"5\",\"five\",\"five years\"]' data-reveal=\"5 years\">?</span>; and a post-consummation Escrow Closing Notice or Partial Payment Policy disclosure for at least 2 years. If the loan is sold, the original creditor hands the file — LE and CD included — to the new owner, and both keep copies for the remainder of their periods."
            }
          ]
        },
        {
          "heading": "what the forms actually show",
          "paras": [
            {
              "html": "Both forms walk the same path: the loan's terms (amount, interest rate, monthly principal-and-interest, and whether each can rise), the projected payments over the loan's life, the closing costs, and the cash the borrower brings to the table. The Closing Disclosure closes with a page of loan calculations — the total you'll pay over the loan's life, the finance charge, the amount financed, and the <b>Total Interest Percentage (TIP)</b>, the total interest as a percentage of the loan amount. Signing the CD only acknowledges you received it; it doesn't, by itself, obligate you to the loan."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "the old four",
            "topic": "Integrated disclosures",
            "q": "The four forms TRID replaced?",
            "a": "the <span class='hl'>Good Faith Estimate</span> + initial <span class='hl'>TIL</span> (front) and the <span class='hl'>HUD-1</span> + final <span class='hl'>TIL</span> (back)"
          },
          {
            "peg": "who issues",
            "topic": "Loan Estimate",
            "q": "If a broker takes the application, who may issue the Loan Estimate?",
            "a": "the <span class='hl'>lender or the broker</span> — as long as the 3-day timing is met"
          },
          {
            "peg": "intent",
            "topic": "Loan Estimate",
            "q": "Before the borrower states intent to proceed, the only fee the lender may charge is…",
            "a": "the cost of the <span class='hl'>credit report</span>"
          },
          {
            "peg": "decision",
            "topic": "Loan Estimate",
            "q": "After a live (six-item) application, the lender must approve or deny within…",
            "a": "<span class='hl'>30 calendar days</span>"
          },
          {
            "peg": "no N/A",
            "topic": "Loan Estimate",
            "q": "A line item that doesn't apply on the LE is handled how?",
            "a": "left <span class='hl'>blank</span> — never marked \"N/A\""
          },
          {
            "peg": "in aggregate",
            "topic": "Tolerances",
            "q": "Is the 10% tolerance checked fee-by-fee or in total?",
            "a": "in <span class='hl'>total</span> — the bucket's LE sum vs. its CD sum, up to 110%"
          },
          {
            "peg": "who prepares",
            "topic": "Closing Disclosure",
            "q": "Who may prepare the Closing Disclosure?",
            "a": "the <span class='hl'>lender, the settlement agent, or both</span>"
          },
          {
            "peg": "LE kept",
            "topic": "Recordkeeping",
            "q": "How long must the Loan Estimate be retained?",
            "a": "at least <span class='hl'>3 years</span> after consummation"
          },
          {
            "peg": "the 2-year pair",
            "topic": "Recordkeeping",
            "q": "Which TRID records are kept only 2 years?",
            "a": "the <span class='hl'>Escrow Closing Notice</span> and <span class='hl'>Partial Payment Policy</span> disclosure"
          },
          {
            "peg": "TIP",
            "topic": "The forms",
            "q": "What does the Total Interest Percentage (TIP) express?",
            "a": "total interest paid over the loan's life as a <span class='hl'>percentage of the loan amount</span>"
          },
          {
            "peg": "just receipt",
            "topic": "The forms",
            "q": "Does signing the Closing Disclosure obligate the borrower to the loan?",
            "a": "<span class='hl'>No</span> — it only acknowledges receipt"
          }
        ],
        "mcq": [
          {
            "q": "TRID's three fee-tolerance categories are —",
            "opts": [
              "1%, 5%, 10%",
              "Zero, 10%, and no-tolerance",
              "Fixed, variable, capped",
              "Low, medium, high"
            ],
            "correct": 1
          },
          {
            "q": "Which fee falls in the zero-tolerance bucket?",
            "opts": [
              "Property taxes",
              "Prepaid interest",
              "A transfer tax",
              "Homeowner's insurance you shopped for yourself"
            ],
            "correct": 2
          },
          {
            "q": "Which loan is exempt from TRID?",
            "opts": [
              "A 30-year purchase mortgage",
              "A home-equity line of credit (HELOC)",
              "A conventional refinance",
              "An FHA purchase loan"
            ],
            "correct": 1
          },
          {
            "q": "Which is a valid change of circumstance?",
            "opts": [
              "The borrower changes their mind about the color of the house",
              "The chosen title company goes out of business mid-transaction",
              "The lender wants to earn more",
              "Interest rates fall generally"
            ],
            "correct": 1
          },
          {
            "q": "A revised Loan Estimate may not be issued after —",
            "opts": [
              "the borrower states intent to proceed",
              "the Closing Disclosure has been issued",
              "the appraisal is ordered",
              "the rate is locked"
            ],
            "correct": 1
          },
          {
            "q": "Which set of items makes a 'live application' that triggers the LE?",
            "opts": [
              "Name, income, SSN, property address, property value, loan amount",
              "A signed purchase contract and earnest money",
              "A credit score above 620",
              "Two years of tax returns and pay stubs"
            ],
            "correct": 0
          },
          {
            "q": "An informal cost sheet given instead of the official LE must state, in ≥12-point type —",
            "opts": [
              "that the loan is pre-approved",
              "that the actual rate and costs could be higher; get an official Loan Estimate",
              "the lender's NMLS number only",
              "that fees are final"
            ],
            "correct": 1
          },
          {
            "q": "On a rescindable transaction, the Closing Disclosure must go to —",
            "opts": [
              "only the primary borrower",
              "all parties with the right to rescind",
              "only the settlement agent",
              "the real estate agent"
            ],
            "correct": 1
          },
          {
            "q": "The Total Interest Percentage (TIP) tells the borrower —",
            "opts": [
              "the monthly payment",
              "total interest over the loan's life as a percent of the loan amount",
              "the APR",
              "the down payment required"
            ],
            "correct": 1
          },
          {
            "q": "If the Closing Disclosure is mailed rather than handed over, the borrower is assumed to receive it after —",
            "opts": [
              "1 business day",
              "3 precise business days (making the wait 6 in total)",
              "10 business days",
              "the day it is sent"
            ],
            "correct": 1
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "TRID merged RESPA's and TILA's overlapping paperwork into two forms, so a borrower sees the same numbers up front and again at the table and can check that they held.",
        "facts": [
          "The two integrated forms are the <span class=\"hl\">Loan Estimate (LE)</span> and the <span class=\"hl\">Closing Disclosure (CD)</span>.",
          "Loan Estimate terms must be honored for at least <span class=\"hl\">10 business days</span>.",
          "Retention: the LE for at least <span class=\"hl\">3 years</span>, the CD for at least <span class=\"hl\">5 years</span>."
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
              "html": "Most federal laws tell a lender how to make a loan. <b>HMDA</b> — the Home Mortgage Disclosure Act — tells lenders to <b>report</b> the loans they make, so regulators can see the whole pattern from above. It makes most mortgage lenders hand over data on every application and loan, sorted by geography and by the borrower's race, sex, and national origin. It sounds invasive until you know what it's watching for. HMDA passed in 1975 and runs through Regulation C, with the CFPB as its main enforcer."
            }
          ]
        },
        {
          "heading": "redlining, and why lending got mapped",
          "paras": [
            {
              "html": "For decades, lenders drew literal lines on maps — often red — around poor and majority-minority neighborhoods and refused to lend inside them, no matter how qualified the individual applicant. That practice is <b>redlining</b>: an institution avoiding whole areas, starving them of the mortgages that build wealth. One loan officer's decision looks innocent; the pattern across thousands of loans is where the discrimination shows. HMDA forces that pattern into the open — which is the honest answer to \"why does the government need the race of everyone I lend to.\" Not to police one loan, but to catch the map."
            }
          ],
          "synth": {
            "q": "Why does HMDA make lenders report the race and location of their borrowers?",
            "a": "To detect redlining and other discriminatory lending patterns. A single loan decision can't reveal discrimination, but the aggregate data across many loans exposes whether a lender is avoiding certain neighborhoods or groups — letting regulators enforce fair-lending laws at scale."
          }
        },
        {
          "heading": "what HMDA is for",
          "paras": [
            {
              "html": "The reporting serves three purposes. It shows whether lenders are meeting the <b>housing needs of their communities</b>; it helps <b>public officials steer investment</b> toward areas that need it; and it helps <b>identify discriminatory lending</b> and enforce the laws against it. Everyone is entitled to <em>pursue</em> a mortgage on equal footing — HMDA isn't a promise that everyone qualifies, only that the door is open to everyone equally, and the data is how that's checked."
            }
          ]
        },
        {
          "heading": "the register",
          "paras": [
            {
              "html": "The data lands in one document: the <b>Loan/Application Register (LAR)</b>. Every covered application and loan becomes a row, filled with data points — the loan's purpose and amount, the outcome, the property's location, and the applicant's demographics. Bundled together and reported, the LAR is the raw material regulators sift for unfair patterns. Of everything on it, the <b>loan originator</b> is personally responsible for collecting one piece: the applicant's <b>race, national origin, and sex</b>."
            }
          ]
        },
        {
          "heading": "who has to report",
          "paras": [
            {
              "html": "Not every lender reports — the rules aim at institutions doing real volume. A lender is covered if it has an office in a metropolitan area, meets an annually-set asset threshold, and crosses a loan-count line: it originated at least <span class=\"cloze\" data-accept='[\"25\",\"twenty-five\"]' data-reveal=\"25\">?</span> closed-end mortgage loans in each of the two prior years, or at least 200 open-end lines of credit in each of those years. Fall below both counts and you're exempt from that category of reporting."
            }
          ]
        },
        {
          "heading": "what's left out",
          "paras": [
            {
              "html": "HMDA also carves out loans that wouldn't tell regulators much about community lending. Out: loans on <b>unimproved land</b>, temporary <b>bridge financing</b>, loans made for <b>agricultural</b> or <b>business</b> purposes (unless the loan is a home purchase, home improvement, or refinance), the purchase of loan pools or servicing rights alone, and any loan under <span class=\"cloze\" data-accept='[\"$500\",\"500\",\"five hundred\"]' data-reveal=\"$500\">?</span>. What's left — ordinary consumer home loans — is exactly the lending HMDA wants to map."
            }
          ]
        },
        {
          "heading": "when the reports are due",
          "paras": [
            {
              "html": "The main filing is annual: a lender submits its full prior-year LAR, in electronic form and certified accurate by someone who knows the data, by <span class=\"cloze\" data-accept='[\"March 1\",\"march 1\",\"march 1st\",\"march first\"]' data-reveal=\"March 1\">?</span> each year. The largest lenders also file quarterly — within 60 days after each quarter except the fourth — but only if they reported at least 60,000 covered loans and applications the year before. Most lenders file once a year and never touch the quarterly rule."
            }
          ]
        },
        {
          "heading": "how long records are kept",
          "paras": [
            {
              "html": "HMDA sets two retention clocks. The submitted <b>LAR</b> is kept for at least <span class=\"cloze\" data-accept='[\"3 years\",\"3\",\"three\",\"three years\"]' data-reveal=\"3 years\">?</span> from the date it's filed. The underlying records and data used to build the reports are kept longer — at least 5 years. The register that's filed ages off first; the working papers behind it live longer."
            }
          ]
        },
        {
          "heading": "collecting the demographic data",
          "paras": [
            {
              "html": "How the borrower's demographics get recorded depends on how you meet. <b>Face-to-face</b> — where you can see and hear each other — you ask the applicant to self-identify race, national origin, and sex; if they refuse, you must record it yourself based on <b>visual observation</b>. <b>Not face-to-face</b> — over the phone or online — you still offer the chance to self-identify, but if the applicant declines, you simply note the refusal and stop. If you later meet them or see a photo, you may <b>not</b> go back and change what was recorded."
            }
          ],
          "synth": {
            "q": "How does demographic collection differ between a face-to-face and a non-face-to-face application when the applicant won't self-identify?",
            "a": "Face-to-face, if the applicant refuses to self-identify their race, national origin, and sex, the loan originator must record it based on visual observation. Non-face-to-face (phone or online), the originator only notes the refusal and stops — and may not later alter the data even after meeting the applicant or seeing a photo."
          }
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "reg + year",
            "topic": "What HMDA is",
            "q": "HMDA's regulation and year?",
            "a": "<span class='hl'>Regulation C</span>, enacted <span class='hl'>1975</span>"
          },
          {
            "peg": "three jobs",
            "topic": "Purpose",
            "q": "HMDA's three purposes?",
            "a": "gauge if lenders meet <span class='hl'>community housing needs</span>, guide <span class='hl'>public investment</span>, and detect <span class='hl'>discriminatory lending</span>"
          },
          {
            "peg": "open-end line",
            "topic": "Coverage",
            "q": "The open-end coverage threshold?",
            "a": "at least <span class='hl'>200</span> open-end lines in each of the two prior years"
          },
          {
            "peg": "big filers",
            "topic": "Reporting",
            "q": "Who must file HMDA data quarterly?",
            "a": "lenders that reported at least <span class='hl'>60,000</span> covered loans and applications the prior year"
          },
          {
            "peg": "working papers",
            "topic": "Recordkeeping",
            "q": "How long are the underlying records behind the reports kept?",
            "a": "at least <span class='hl'>5 years</span>"
          },
          {
            "peg": "MLO's piece",
            "topic": "The register",
            "q": "Which data is the loan originator personally responsible for collecting?",
            "a": "the applicant's <span class='hl'>race, national origin, and sex</span>"
          },
          {
            "peg": "certified",
            "topic": "Reporting",
            "q": "How is the annual LAR submitted?",
            "a": "in <span class='hl'>electronic</span> form, <span class='hl'>certified accurate</span> by someone who knows the data"
          }
        ],
        "mcq": [
          {
            "q": "The lending pattern HMDA is chiefly designed to expose is —",
            "opts": [
              "usury",
              "redlining / discriminatory lending",
              "money laundering",
              "appraisal fraud"
            ],
            "correct": 1
          },
          {
            "q": "The Loan/Application Register (LAR) is —",
            "opts": [
              "a borrower's promissory note",
              "the record of covered applications and loans a lender reports",
              "a credit report",
              "the closing disclosure"
            ],
            "correct": 1
          },
          {
            "q": "A lender must report under HMDA if, among other tests, it originated at least —",
            "opts": [
              "5 closed-end loans in the prior year",
              "25 closed-end loans in each of the two prior years",
              "1,000 loans in the prior year",
              "any loan at all"
            ],
            "correct": 1
          },
          {
            "q": "Which loan is exempt from HMDA reporting?",
            "opts": [
              "a home purchase mortgage",
              "a refinance of a home loan",
              "a loan on unimproved land",
              "a home improvement loan"
            ],
            "correct": 2
          },
          {
            "q": "In a non-face-to-face application where the applicant refuses to self-identify, the loan originator —",
            "opts": [
              "records demographics by visual observation",
              "notes the refusal and may not later alter it",
              "must deny the application",
              "guesses based on the name"
            ],
            "correct": 1
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "HMDA makes lenders report who they lend to and where, so regulators and the public can see redlining and underserved neighborhoods in the data.",
        "facts": [
          "Reported data lives in the <span class=\"hl\">Loan/Application Register (LAR)</span>.",
          "Hitting <span class=\"hl\">60,000 or more</span> covered loans and applications forces quarterly rather than annual reporting.",
          "Retention: LAR data at least <span class=\"hl\">3 years</span>, disclosure reports at least <span class=\"hl\">5 years</span>."
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
              "html": "Somewhere, a private company keeps a <b>file on you</b> — every credit card, car loan, and mortgage you've ever had, whether you paid on time, how much you owe right now. It sells that file to lenders, who read it to guess whether you'll pay them back. That file is your <b>credit report</b>, and the company keeping it is a <b>credit bureau</b>. The <b>Fair Credit Reporting Act (FCRA)</b> is the law that keeps the file honest: it makes your report accurate, keeps it private, and gives you the power to fix what's wrong. FCRA passed in 1970 and runs through Regulation V."
            }
          ]
        },
        {
          "heading": "the players",
          "paras": [
            {
              "html": "Three parties move your data. A <b>furnisher</b> — a bank or card company you borrow from — reports how you're handling the account. A <b>consumer reporting agency (CRA)</b>, the credit bureau, gathers those reports into your file. And a <b>user</b> — a lender deciding whether to approve you — buys the file to make the call. There are <span class=\"cloze\" data-accept='[\"3\",\"three\"]' data-reveal=\"three (Equifax, Experian, TransUnion)\">?</span> nationwide bureaus — Equifax, Experian, and TransUnion — which is why a lender often pulls a merged \"tri-merge\" report showing all three."
            }
          ],
          "synth": {
            "q": "Name the three roles FCRA regulates in the flow of your credit data and what each does.",
            "a": "A furnisher (a lender you have an account with) reports your account behavior; a consumer reporting agency / credit bureau (Equifax, Experian, TransUnion) assembles that into your file; and a user (a lender deciding on your application) buys the report to make its decision."
          }
        },
        {
          "heading": "what's in the report",
          "paras": [
            {
              "html": "A credit report is a snapshot of one thing: how likely you are to repay. It's built from more than whether you pay on time — it lists your past addresses and employers, your <b>tradelines</b> (each open account, its balance, its payment record, how much of your limit you're using), matters of public record like a bankruptcy, and recent <b>inquiries</b> when someone pulled your file. Together those paint a picture of how you manage money, and it moves both ways: bad credit can be repaired over time, good credit can be damaged fast."
            }
          ]
        },
        {
          "heading": "the score",
          "paras": [
            {
              "html": "Lenders boil the report down to a <b>credit score</b> — a single number predicting repayment. Five things build it, and they don't count equally. <b>Payment history</b> — whether you pay on time — is the biggest, at <span class=\"cloze\" data-accept='[\"35%\",\"35\",\"thirty-five percent\",\"thirty-five\"]' data-reveal=\"35%\">?</span>. <b>Amounts owed</b> — how much of your available credit you're using — is next at 30%. Then <b>length of credit history</b> at 15%, your <b>credit mix</b> (cards, car loans, a mortgage) at 10%, and <b>new credit</b> — recent hard inquiries — at 10%. A lender usually weighs the whole report, not just the score."
            }
          ]
        },
        {
          "heading": "who's allowed to look",
          "paras": [
            {
              "html": "Your file isn't public. A user may pull it only with both <b>permission</b> from you and a <b>permissible purpose</b> — a legitimate reason like reviewing your loan application. A lender can't just check the credit of anyone it's curious about. In a mortgage, completing the <b>Uniform Residential Loan Application (URLA)</b> gives the lender both at once; short of that, you sign a Credit Report Authorization and Release. And though a lender can go over your report with you, it can't hand you a copy — only a bureau or credit repository can give you that."
            }
          ],
          "synth": {
            "q": "What two things must a lender have before pulling a consumer's credit report, and what supplies them in a mortgage?",
            "a": "Both permission from the consumer and a permissible purpose (a legitimate reason, such as acting on the consumer's loan application). Completing the Uniform Residential Loan Application (URLA) provides both; otherwise the consumer signs a Credit Report Authorization and Release form."
          }
        },
        {
          "heading": "prescreened offers and affiliate marketing",
          "paras": [
            {
              "html": "Ever get a \"you're pre-approved\" card offer you never asked for? That's a lender pulling limited data to <b>prescreen</b> you, which FCRA allows only if the offer carries an opt-out. A short opt-out notice must run in at least <span class=\"cloze\" data-accept='[\"12-point\",\"12\",\"12 point\",\"twelve-point\",\"twelve\"]' data-reveal=\"12-point type\">?</span> type with a toll-free number, pointing to a longer \"PRESCREEN &amp; OPT-OUT NOTICE.\" Separately, a company can't use information from an <b>affiliate</b> to market to you unless it disclosed that use and gave you a chance to opt out first."
            }
          ]
        },
        {
          "heading": "fixing what's wrong",
          "paras": [
            {
              "html": "When your report shows something false, you can send a <b>direct dispute</b> to the furnisher that reported it. Once it gets a proper dispute — enough detail to identify the account and the basis, with any supporting proof — the furnisher must investigate and report back within <span class=\"cloze\" data-accept='[\"30 days\",\"30\",\"thirty\",\"thirty days\"]' data-reveal=\"30 days\">?</span> (a 15-day extension is allowed), and if it finds the item was wrong, correct it with every bureau it told. It can decline only a <b>frivolous</b> dispute — one with too little information or a repeat of a settled one — and it has to say so within 5 business days."
            }
          ],
          "synth": {
            "q": "What must a furnisher do when it receives a proper direct dispute, and how fast?",
            "a": "It must reasonably investigate the disputed item and report the results to the consumer within 30 days (a 15-day extension is available), and if the information was inaccurate, notify every consumer reporting agency it reported to and send the correction. A frivolous or insufficient dispute can be declined, with notice to the consumer within 5 business days."
          }
        },
        {
          "heading": "the quick fix versus the real fix",
          "paras": [
            {
              "html": "A formal dispute can take 30 to 60 days — too slow when a loan is waiting. So a lender can order faster tools through the credit repository: a <b>tradeline verification</b> for a stray error, or an <b>investigative consumer report</b> (a \"full factual\") when there are many, where the repository interviews the borrower and re-checks the file. A <b>rapid rescore</b> can then update the score once errors are corrected. The catch: these only fix the file for the <b>current transaction</b> — to clear an error for good, the borrower still has to take it up with the furnisher or the bureau directly."
            }
          ]
        },
        {
          "heading": "when you're turned down",
          "paras": [
            {
              "html": "If a lender denies you based even partly on your credit, that denial is an <b>adverse action</b>, and FCRA gives you three things. The notice must name the <b>bureau</b> it pulled from (name and address), it must tell you that you can get a <b>free copy</b> of that report, and it must state plainly that the lender — not the bureau — made the decision. The bureau only sold the data; the call was the lender's."
            }
          ],
          "synth": {
            "q": "When a lender denies credit based on a report, what three things must the adverse-action notice give the consumer?",
            "a": "The name and address of the consumer reporting agency the lender used, notice that the consumer is entitled to a free copy of that report, and a statement that the lender — not the bureau — made the decision."
          }
        },
        {
          "heading": "how long marks last",
          "paras": [
            {
              "html": "Bad marks don't stay forever — most age off after <b>7 years</b>: late payments, collections, charged-off accounts, foreclosures, and a Chapter 13 bankruptcy. The heavier ones run longer: a <b>Chapter 7 bankruptcy</b> reports for <span class=\"cloze\" data-accept='[\"10 years\",\"10\",\"ten\",\"ten years\"]' data-reveal=\"10 years\">?</span>, and a paid tax lien for 7 years from its filing. One never expires on its own: an <b>unpaid</b> tax lien can be reported potentially forever."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "reg + year",
            "topic": "What FCRA is",
            "q": "FCRA's regulation and year?",
            "a": "<span class='hl'>Regulation V</span>, enacted <span class='hl'>1970</span>"
          },
          {
            "peg": "the other four",
            "topic": "The score",
            "q": "Beyond payment history, name the other credit-score factors.",
            "a": "amounts owed <span class='hl'>30%</span>, length of history <span class='hl'>15%</span>, credit mix <span class='hl'>10%</span>, new credit <span class='hl'>10%</span>"
          },
          {
            "peg": "no self-copy",
            "topic": "Access rules",
            "q": "May a lender hand you a copy of your own credit report?",
            "a": "<span class='hl'>No</span> — only a bureau or credit repository can"
          },
          {
            "peg": "long notice",
            "topic": "Prescreened offers",
            "q": "The longer prescreen opt-out notice is headed…",
            "a": "\"<span class='hl'>PRESCREEN &amp; OPT-OUT NOTICE</span>\" (≥8-point type)"
          },
          {
            "peg": "frivolous",
            "topic": "Disputes",
            "q": "A furnisher that rejects a dispute as frivolous must say so within…",
            "a": "<span class='hl'>5 business days</span>"
          },
          {
            "peg": "unpaid lien",
            "topic": "How long marks last",
            "q": "Which derogatory mark can be reported potentially forever?",
            "a": "an <span class='hl'>unpaid tax lien</span>"
          },
          {
            "peg": "most = 7",
            "topic": "How long marks last",
            "q": "How long do late payments, collections, charge-offs, and foreclosures report?",
            "a": "<span class='hl'>7 years</span>"
          },
          {
            "peg": "only this deal",
            "topic": "Disputes",
            "q": "A tradeline verification or rapid rescore fixes an error…",
            "a": "only for the <span class='hl'>current transaction</span> — not permanently"
          },
          {
            "peg": "no outdated",
            "topic": "Access rules",
            "q": "FCRA bars a bureau or furnisher from reporting…",
            "a": "<span class='hl'>outdated</span> negative information past its reporting period"
          }
        ],
        "mcq": [
          {
            "q": "FCRA exists to keep a consumer report —",
            "opts": [
              "cheap for lenders to buy",
              "accurate, fair, and private",
              "permanent and unchangeable",
              "hidden from the consumer"
            ],
            "correct": 1
          },
          {
            "q": "Completing a Uniform Residential Loan Application (URLA) gives a lender —",
            "opts": [
              "permission only",
              "a permissible purpose only",
              "both permission and a permissible purpose",
              "neither — a separate release is always required"
            ],
            "correct": 2
          },
          {
            "q": "A Chapter 13 bankruptcy generally reports for —",
            "opts": [
              "3 years",
              "7 years",
              "10 years",
              "forever"
            ],
            "correct": 1
          },
          {
            "q": "Which is NOT a permissible purpose to pull someone's credit report?",
            "opts": [
              "reviewing their loan application",
              "a neighbor's curiosity",
              "an employment decision they applied for",
              "an insurance application they initiated"
            ],
            "correct": 1
          },
          {
            "q": "An adverse-action notice based on credit must tell the consumer all EXCEPT —",
            "opts": [
              "the name and address of the bureau used",
              "that they can get a free copy of the report",
              "that the lender, not the bureau, made the decision",
              "the exact internal score cutoff the lender used"
            ],
            "correct": 3
          },
          {
            "q": "The three nationwide credit bureaus are —",
            "opts": [
              "Equifax, Experian, and TransUnion",
              "FICO, VantageScore, and Experian",
              "Fannie Mae, Freddie Mac, and Ginnie Mae",
              "the CFPB, FTC, and OCC"
            ],
            "correct": 0
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "FCRA governs who may pull a credit report and how long the bad marks stay, so a consumer's file is used only for real purposes and doesn't follow them forever.",
        "facts": [
          "A lender needs a <span class=\"hl\">permissible purpose</span> — such as the consumer's own application — before pulling a report.",
          "Most derogatory items fall off after about <span class=\"hl\">7 years</span>.",
          "FICO weights: payment history <span class=\"hl\">35%</span>, amounts owed <span class=\"hl\">30%</span>, length of history <span class=\"hl\">15%</span>, credit mix <span class=\"hl\">10%</span>, new credit <span class=\"hl\">10%</span>."
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
              "html": "<b>Identity theft</b> is someone using your name, Social Security number, or other details to open credit as if they were you — and your credit file is where the damage lands, filling with accounts you never opened. In 2003 Congress bolted a set of identity-theft defenses onto FCRA: the <b>Fair and Accurate Credit Transactions Act (FACTA)</b>. It adds alerts you can flag on your file, a free look at your own report, rules for shredding sensitive paper, and duties when a lender spots a mismatched address."
            }
          ]
        },
        {
          "heading": "fraud alerts",
          "paras": [
            {
              "html": "A <b>fraud alert</b> is a flag on your credit file telling any lender who pulls it to stop and confirm you're really you before opening anything. Two lengths. An <b>initial</b> fraud alert — placed on a good-faith suspicion you've been or may be victimized — lasts at least <span class=\"cloze\" data-accept='[\"1 year\",\"1\",\"one\",\"one year\"]' data-reveal=\"1 year\">?</span>. An <b>extended</b> alert requires you to file an identity-theft report first, and in exchange it runs for 7 years, keeps you off prescreened-offer lists for 5 years, and entitles you to two free reports in the following 12 months. Whichever bureau places an alert must pass it to the other two."
            }
          ],
          "synth": {
            "q": "How does an extended fraud alert differ from an initial one?",
            "a": "An initial fraud alert lasts at least 1 year and needs only a good-faith suspicion of fraud. An extended alert requires the consumer to file an identity-theft report, and in return lasts 7 years, removes the consumer from prescreened-offer lists for 5 years, and provides two free reports over the next 12 months."
          }
        },
        {
          "heading": "active-duty alerts",
          "paras": [
            {
              "html": "A deployed service member can't watch their credit closely, so FACTA gives them an <b>active-duty alert</b>. Like a fraud alert, it tells lenders to verify identity before extending credit, and it lasts at least <span class=\"cloze\" data-accept='[\"12 months\",\"12\",\"twelve\",\"twelve months\",\"1 year\",\"one year\"]' data-reveal=\"12 months\">?</span>. It also keeps the service member off prescreened credit and insurance lists for two years."
            }
          ]
        },
        {
          "heading": "free reports and fast disclosures",
          "paras": [
            {
              "html": "FACTA opened up access to your own file. Every consumer can get a <b>free copy of their credit report once a year from each of the three bureaus</b>. On a mortgage, the lender must send a <b>Credit Score Disclosure</b> — telling you the score it used — within <span class=\"cloze\" data-accept='[\"3 business days\",\"3\",\"three\",\"three business days\"]' data-reveal=\"3 business days\">?</span> of your application. And when you report identity theft to a bureau, it must block the theft-related entries from your file, hand you a Victim's Notice of Rights, and give you copies of the fraudulent transaction's paperwork free."
            }
          ]
        },
        {
          "heading": "the disposal rule",
          "paras": [
            {
              "html": "Discarded paper is a thief's easiest source, so the FTC <b>Disposal Rule</b> — which FACTA requires — allows only <span class=\"cloze\" data-accept='[\"3\",\"three\"]' data-reveal=\"three (shredding, burning, pulverizing)\">?</span> ways to destroy a consumer's personal information: <b>shredding</b>, <b>burning</b>, or <b>pulverizing</b>. Tossing sensitive documents in the trash intact is a violation."
            }
          ]
        },
        {
          "heading": "address changes and discrepancies",
          "paras": [
            {
              "html": "A sudden address change is a classic sign of a stolen identity, so FACTA makes lenders watch for it. A user must run a secure process for handling <b>address-change</b> requests, verifying the person asking is really the customer. And when a credit report comes back with an address that doesn't match what the applicant gave — an <b>address discrepancy</b> — the lender must form a <b>reasonable belief</b> that the report actually belongs to the person in front of it before relying on it."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "the bolt-on",
            "topic": "What FACTA is",
            "q": "FACTA amended which law, and in what year?",
            "a": "it amended <span class='hl'>FCRA</span> in <span class='hl'>2003</span>"
          },
          {
            "peg": "AD list",
            "topic": "Alerts",
            "q": "An active-duty alert keeps a service member off prescreened-offer lists for…",
            "a": "<span class='hl'>2 years</span>"
          },
          {
            "peg": "annual free",
            "topic": "Access",
            "q": "How often can a consumer get a free report from each bureau?",
            "a": "once a <span class='hl'>year</span>, from each of the three bureaus"
          },
          {
            "peg": "free docs",
            "topic": "Identity-theft response",
            "q": "When a consumer reports that a transaction involved identity theft, the creditor must give…",
            "a": "free <span class='hl'>copies of that transaction's documents</span>"
          },
          {
            "peg": "reasonable belief",
            "topic": "Address rules",
            "q": "On an address discrepancy, what must the lender form before relying on the report?",
            "a": "a <span class='hl'>reasonable belief</span> the report belongs to the applicant"
          },
          {
            "peg": "block it",
            "topic": "Identity-theft response",
            "q": "After a consumer reports identity theft to a bureau, the bureau must provide a…",
            "a": "<span class='hl'>Victim's Notice of Rights</span> (and block the fraudulent entries)"
          }
        ],
        "mcq": [
          {
            "q": "FACTA's central purpose is to —",
            "opts": [
              "set interest-rate caps",
              "strengthen protection against identity theft",
              "require flood insurance",
              "license loan originators"
            ],
            "correct": 1
          },
          {
            "q": "A user must maintain a secure process for handling —",
            "opts": [
              "wire transfers",
              "address-change requests",
              "appraisal orders",
              "rate locks"
            ],
            "correct": 1
          },
          {
            "q": "Which lasts the longest?",
            "opts": [
              "an initial fraud alert",
              "an active-duty alert",
              "an extended fraud alert",
              "they are all the same length"
            ],
            "correct": 2
          },
          {
            "q": "FACTA requires lenders to treat which as a possible identity-theft signal?",
            "opts": [
              "a high credit score",
              "a suspicious address change",
              "a large down payment",
              "a fixed interest rate"
            ],
            "correct": 1
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "FACTA bolted identity-theft protections onto FCRA, giving consumers free reports, fraud alerts, and a rule for destroying old credit data.",
        "facts": [
          "Every consumer gets <span class=\"hl\">one free credit report a year</span> from each of the three major agencies.",
          "An extended fraud alert, placed after real identity theft, lasts <span class=\"hl\">7 years</span>.",
          "An active-duty military alert lasts <span class=\"hl\">1 year</span>.",
          "The FTC Disposal Rule requires <span class=\"hl\">secure destruction</span> of consumer-report data so it can't be reconstructed."
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
              "html": "FACTA's alerts put tools in the consumer's hands. The <b>FTC Red Flags Rule</b> flips the burden onto the business: a lender must actively watch for identity theft <em>before</em> it opens or funds an account, not clean up afterward. Added to FACTA and effective <span class=\"cloze\" data-accept='[\"2008\",\"January 1, 2008\",\"Jan 1 2008\"]' data-reveal=\"January 1, 2008\">?</span>, it requires every creditor under Federal Trade Commission enforcement — which includes mortgage lenders and brokers — to run a written program to detect, prevent, and mitigate identity theft."
            }
          ]
        },
        {
          "heading": "covered accounts",
          "paras": [
            {
              "html": "The rule attaches to a <b>covered account</b>: an account a creditor offers mainly for personal, family, or household purposes that allows <b>multiple payments or transactions</b> — a mortgage is the textbook case. The multiple-payment part is what makes an account a standing target for impersonation over time, which is why these accounts, and not one-off transactions, are the ones the program has to guard."
            }
          ]
        },
        {
          "heading": "the identity-theft prevention program",
          "paras": [
            {
              "html": "At the center of the rule is a written <b>Identity Theft Prevention Program</b> — a standing routine, not a one-time policy. It has to do four things and then keep doing them: <b>identify</b> the red flags relevant to the creditor's accounts, <b>detect</b> those red flags in day-to-day business, <b>respond</b> appropriately when one appears, and stay <b>updated</b> as new theft patterns emerge. And it has to answer to leadership: the program reports to the board or senior management at least <span class=\"cloze\" data-accept='[\"annually\",\"yearly\",\"once a year\",\"1\",\"one\"]' data-reveal=\"annually\">?</span>."
            }
          ],
          "synth": {
            "q": "What four ongoing jobs must an Identity Theft Prevention Program perform?",
            "a": "Identify the red flags relevant to its covered accounts, detect those red flags in daily operations, respond appropriately when one appears, and keep the program updated as identity-theft risks change (reporting to the board or senior management at least annually)."
          }
        },
        {
          "heading": "what a red flag looks like",
          "paras": [
            {
              "html": "A <b>red flag</b> is a pattern that signals possible impersonation. The Guidelines give examples, and each makes sense once you picture the fraud behind it: an <b>alert from a credit bureau</b> or fraud-detection service; <b>suspicious documents</b> that look altered; <b>suspicious personal information</b>, like an address that doesn't match the file or a Social Security number that belongs to someone else; <b>unusual activity</b> on an existing account; or a <b>notice</b> from a customer, a victim, or law enforcement that theft may be underway. The rule expects staff to recognize these and act."
            }
          ],
          "synth": {
            "q": "Give two examples of a red flag and the fraud each one hints at.",
            "a": "Examples include a credit-bureau or fraud-service alert, suspicious or altered documents, suspicious personal information (a mismatched address or a Social Security number tied to someone else), unusual activity on an existing account, or a notice from a customer/victim/law enforcement. Each suggests someone may be opening or using an account under a stolen identity."
          }
        },
        {
          "heading": "the guidelines and service providers",
          "paras": [
            {
              "html": "The creditor must keep a written copy of <b>The Guidelines on Identity Theft Detection, Prevention, and Mitigation</b> on premises and build its program around them. Responsibility doesn't end at the company's own door: when a creditor hires a <b>service provider</b> to work on covered accounts, it must make sure that provider follows red-flag procedures too — and it can be held liable for harm to its customers if the provider's controls fall short. Failing to catch a red flag anyone in the role would reasonably be expected to spot can carry serious accountability."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "who it burdens",
            "topic": "Scope",
            "q": "Does the Red Flags Rule burden the consumer or the business?",
            "a": "the <span class='hl'>business</span> — creditors under FTC enforcement, including mortgage lenders and brokers"
          },
          {
            "peg": "covered account",
            "topic": "Scope",
            "q": "What makes an account a 'covered account'?",
            "a": "a personal/family/household account allowing <span class='hl'>multiple payments</span> — e.g. a mortgage"
          },
          {
            "peg": "written plan",
            "topic": "The program",
            "q": "What must every covered creditor maintain?",
            "a": "a written <span class='hl'>Identity Theft Prevention Program</span>"
          },
          {
            "peg": "on premises",
            "topic": "The program",
            "q": "What must the creditor keep a written copy of on premises?",
            "a": "<span class='hl'>The Guidelines</span> on Identity Theft Detection, Prevention, and Mitigation"
          },
          {
            "peg": "vendor too",
            "topic": "Service providers",
            "q": "Is a creditor responsible for a service provider's red-flag controls?",
            "a": "<span class='hl'>Yes</span> — and it can be liable for customer harm if they fall short"
          },
          {
            "peg": "must act",
            "topic": "Enforcement",
            "q": "What happens if staff miss a red flag they'd reasonably be expected to catch?",
            "a": "they can face serious <span class='hl'>accountability</span> — the rule expects recognition and response"
          }
        ],
        "mcq": [
          {
            "q": "The Red Flags Rule places the duty to watch for identity theft on —",
            "opts": [
              "the consumer",
              "the credit bureau",
              "the creditor / financial institution",
              "the FTC itself"
            ],
            "correct": 2
          },
          {
            "q": "Which is a 'covered account' under the rule?",
            "opts": [
              "a one-time cash purchase",
              "a mortgage loan",
              "a wire transfer",
              "a stock trade"
            ],
            "correct": 1
          },
          {
            "q": "Which is an example of a red flag?",
            "opts": [
              "an on-time mortgage payment",
              "an address on the application that doesn't match the credit report",
              "a high credit score",
              "a 20% down payment"
            ],
            "correct": 1
          },
          {
            "q": "An Identity Theft Prevention Program must be —",
            "opts": [
              "an unwritten understanding",
              "a written, ongoing program that reports to leadership",
              "prepared only after a breach",
              "handled entirely by the FTC"
            ],
            "correct": 1
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "The Red Flags Rule makes covered institutions write down how they'll spot the early signs of identity theft before an account is opened or drained.",
        "facts": [
          "Each covered institution must maintain a written <span class=\"hl\">Identity Theft Prevention Program</span>.",
          "The program has to <span class=\"hl\">detect, prevent, and mitigate</span> identity theft in covered accounts.",
          "Red flags include credit-bureau alerts, altered documents, <span class=\"hl\">address mismatches</span>, and unusual account activity."
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
              "html": "Criminals and terrorists run on cash — and cash earned from drugs, fraud, or gambling can't just be spent, because a pile of unexplained money invites questions. So they <b>launder</b> it: run it through the banking system until it looks like ordinary, legitimate income. The <b>Bank Secrecy Act (BSA)</b> — also called the Anti-Money Laundering law, so you'll see it as BSA/AML — is the country's main weapon against that. Passed in 1970, it turns banks and mortgage companies into watchers: keep records, verify who you're dealing with, and report the suspicious. Your job as an MLO sits right inside it."
            }
          ]
        },
        {
          "heading": "how laundering works",
          "paras": [
            {
              "html": "Laundering dirty money into clean money runs in three moves. <b>Placement</b> slips the illegal cash into the financial system — deposited, often in small amounts, to avoid notice. <b>Layering</b> then moves it through a maze of transactions — shell companies, transfers, fake invoices — so the trail back to the crime goes cold. <b>Integration</b> is the payoff: the now-clean-looking money re-enters the economy as ordinary income — a paycheck, an investment, a house — and the launderer even pays taxes on it to complete the disguise. Placement, layering, and <span class=\"cloze\" data-accept='[\"integration\"]' data-reveal=\"integration\">?</span> — in that order."
            }
          ],
          "synth": {
            "q": "Name money laundering's three stages in order and what each accomplishes.",
            "a": "Placement — getting the illegal cash into the financial system; layering — moving it through many transactions to hide its origin; integration — bringing the now-clean-looking money back into the economy as apparently legitimate income."
          }
        },
        {
          "heading": "structuring and the $10,000 line",
          "paras": [
            {
              "html": "Banks must report any cash transaction of <span class=\"cloze\" data-accept='[\"$10,000\",\"10000\",\"10,000\",\"ten thousand\"]' data-reveal=\"$10,000\">?</span> or more to the government on a <b>Currency Transaction Report (CTR)</b>. Launderers know the line, so they <b>structure</b> — breaking one big deposit into several smaller ones, each under the limit, to stay invisible. Structuring is itself a crime, and a pattern of just-under-$10,000 deposits is one of the loudest red flags there is."
            }
          ]
        },
        {
          "heading": "why real estate",
          "paras": [
            {
              "html": "A mortgage is a launderer's dream, which is why this law reaches you. Real estate is a big, respectable purchase that soaks up a lot of money at once and turns it into an asset nobody blinks at — perfect for the integration stage. Buy a house with laundered funds, or take a loan to move dirty money through a closing, and the crime hides behind an ordinary transaction. Mortgage professionals sit at that exact chokepoint, in direct contact with the buyer, which is why the law leans on them so hard."
            }
          ]
        },
        {
          "heading": "the agencies, by job",
          "paras": [
            {
              "html": "Three Treasury bodies run this world, each with one job. The financial-intelligence unit that collects the reports and hunts for patterns — that's <b>FinCEN</b>, the Financial Crimes Enforcement Network, the BSA's administrator. The supervisor that examines national banks to keep them sound and compliant is the <b>OCC</b>, the Office of the Comptroller of the Currency. And the sanctions enforcer that maintains the list of people the U.S. forbids doing business with is <b>OFAC</b>, the Office of Foreign Assets Control. Report to FinCEN; answer to the OCC; screen against OFAC."
            }
          ],
          "synth": {
            "q": "Match each Treasury body to its job: FinCEN, OCC, OFAC.",
            "a": "FinCEN (Financial Crimes Enforcement Network) is the BSA administrator that collects reports and analyzes financial intelligence; the OCC (Office of the Comptroller of the Currency) supervises and examines national banks for safety, soundness, and BSA compliance; OFAC (Office of Foreign Assets Control) runs U.S. economic sanctions and the list of barred persons."
          }
        },
        {
          "heading": "your first duty: know the customer",
          "paras": [
            {
              "html": "The first thing every financial institution owes the law is certainty about <em>who</em> it's dealing with — money can't be traced if identities are fake. So each one must run a <b>Customer Identification Program (CIP)</b>: verify and record the identity of anyone opening an account or applying for a loan. The CIP is the foundation the reporting sits on, and its detailed mechanics come from the USA PATRIOT Act, covered next."
            }
          ]
        },
        {
          "heading": "the anti-money-laundering program",
          "paras": [
            {
              "html": "Every institution — banks and mortgage companies alike — must maintain a written <b>anti-money-laundering (AML) program</b> built on <span class=\"cloze\" data-accept='[\"4\",\"four\"]' data-reveal=\"four\">?</span> pillars: internal policies, procedures, and controls; a designated <b>compliance officer</b>; ongoing employee <b>training</b>; and an independent <b>audit</b> to test that the program actually works. The four together are meant to make catching laundering a routine, not an accident."
            }
          ],
          "synth": {
            "q": "What are the four required pillars of an anti-money-laundering program?",
            "a": "Internal policies, procedures, and controls; a designated compliance officer; an ongoing employee training program; and an independent audit function to test the program."
          }
        },
        {
          "heading": "your second duty: report the suspicious",
          "paras": [
            {
              "html": "When something looks like laundering or fraud, you file a <b>Suspicious Activity Report (SAR)</b> — electronically, to FinCEN. The clock is <span class=\"cloze\" data-accept='[\"30 days\",\"30\",\"thirty\",\"thirty days\"]' data-reveal=\"30 days\">?</span> from the date the activity is spotted. If no suspect has been identified yet, filing can be pushed back another 30 days to try to name one — but never beyond 60 days total. When the activity needs immediate attention, like suspected terrorist financing, you also alert law enforcement directly, on top of the SAR."
            }
          ]
        },
        {
          "heading": "the dollar thresholds — and why they don't apply to you",
          "paras": [
            {
              "html": "For banks, SARs kick in at dollar lines: insider abuse in <b>any</b> amount, criminal violations of $5,000 or more when a suspect is known, and $25,000 or more even when no suspect is. But for <b>mortgage</b> lenders and brokers, there is no dollar floor at all — a mortgage professional must file a SAR for <b>any</b> suspicious activity, regardless of the amount. The one carve-out: a person selling their own property and arranging its financing is exempt from filing."
            }
          ],
          "synth": {
            "q": "How does the SAR dollar threshold differ for a mortgage lender versus a bank?",
            "a": "Banks file SARs at dollar thresholds — any amount for insider abuse, $5,000+ with a known suspect, $25,000+ without one. Mortgage lenders and brokers have no dollar floor: they must file a SAR for any suspicious activity regardless of the amount involved."
          }
        },
        {
          "heading": "never tip off the subject",
          "paras": [
            {
              "html": "A SAR is secret by law. Once one is filed, it is <b>illegal to tell the subject</b> that a report was made — no warning, no hint. If someone subpoenas the SAR or asks anything that would reveal its existence, you refuse and may notify FinCEN of the request. A copy of every SAR, along with the CIP and account records behind it, must be kept for at least <span class=\"cloze\" data-accept='[\"5 years\",\"5\",\"five\",\"five years\"]' data-reveal=\"5 years\">?</span> from filing."
            }
          ]
        },
        {
          "heading": "the sanctions list (OFAC)",
          "paras": [
            {
              "html": "Some people the United States simply forbids you to transact with — foreign terrorists, narcotics traffickers, certain regimes — collected on OFAC's list of <b>Specially Designated Nationals (SDNs) and Blocked Persons</b>. Before issuing a mortgage, you must screen the applicant against that list. A match means you <b>may not proceed</b> — completing a blocked transaction is itself a violation with severe penalties. Blocked transactions must be reported to OFAC within <span class=\"cloze\" data-accept='[\"10 days\",\"10\",\"ten\",\"ten days\"]' data-reveal=\"10 days\">?</span>, and an annual Report of Blocked Property is due each September 30."
            }
          ]
        },
        {
          "heading": "what a red flag looks like",
          "paras": [
            {
              "html": "A <b>red flag</b> is anything that warrants a second look — not proof of a crime, just a reason to pay attention (everyone stays innocent until proven otherwise). In a loan file, common ones include cash deposits structured just under $10,000, documents with deletions or correction fluid, a Social Security number or address that doesn't match across the file, a cash-out refinance of a property the seller only just bought, or a buyer who already lives in the home they're supposedly purchasing. The rule isn't to accuse — it's to not ignore."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "the report",
            "topic": "Currency reporting",
            "q": "Which report covers a cash transaction of $10,000 or more?",
            "a": "the <span class='hl'>Currency Transaction Report (CTR)</span>"
          },
          {
            "peg": "FinCEN",
            "topic": "The agencies",
            "q": "Which agency administers the BSA and collects the reports?",
            "a": "<span class='hl'>FinCEN</span> — the Financial Crimes Enforcement Network (Treasury)"
          },
          {
            "peg": "60 max",
            "topic": "SAR",
            "q": "The absolute maximum time to file a SAR?",
            "a": "<span class='hl'>60 days</span> from the date the activity was identified"
          },
          {
            "peg": "$25k no suspect",
            "topic": "SAR",
            "q": "A bank's SAR threshold when no suspect can be identified?",
            "a": "<span class='hl'>$25,000</span> or more"
          },
          {
            "peg": "sell-your-own",
            "topic": "SAR",
            "q": "Who's exempt from the mortgage SAR-filing requirement?",
            "a": "an individual <span class='hl'>selling their own property</span> and arranging its financing"
          },
          {
            "peg": "structuring",
            "topic": "Money laundering",
            "q": "What is 'structuring'?",
            "a": "breaking a large cash deposit into smaller ones <span class='hl'>under $10,000</span> to dodge reporting"
          },
          {
            "peg": "SDN list",
            "topic": "OFAC",
            "q": "What is OFAC's list of barred persons called?",
            "a": "<span class='hl'>Specially Designated Nationals (SDNs)</span> and Blocked Persons"
          },
          {
            "peg": "Sept 30",
            "topic": "OFAC",
            "q": "When is the annual Report of Blocked Property due?",
            "a": "each <span class='hl'>September 30</span>"
          },
          {
            "peg": "the OCC",
            "topic": "The agencies",
            "q": "Which body examines national banks for safety and BSA compliance?",
            "a": "the <span class='hl'>OCC</span> — Office of the Comptroller of the Currency"
          }
        ],
        "mcq": [
          {
            "q": "The correct order of money laundering's three stages is —",
            "opts": [
              "layering, placement, integration",
              "placement, layering, integration",
              "integration, layering, placement",
              "placement, integration, layering"
            ],
            "correct": 1
          },
          {
            "q": "A mortgage broker must file a SAR for suspicious activity —",
            "opts": [
              "only above $5,000",
              "only above $25,000",
              "regardless of the dollar amount",
              "only if a suspect is identified"
            ],
            "correct": 2
          },
          {
            "q": "After filing a SAR, informing the subject that a report was filed is —",
            "opts": [
              "required",
              "illegal",
              "optional",
              "encouraged"
            ],
            "correct": 1
          },
          {
            "q": "If a mortgage applicant matches an OFAC SDN listing, the lender must —",
            "opts": [
              "charge a higher rate",
              "not proceed with the transaction",
              "require a co-signer",
              "proceed but file a CTR"
            ],
            "correct": 1
          },
          {
            "q": "SARs and the CIP/account records behind them must be retained for at least —",
            "opts": [
              "1 year",
              "3 years",
              "5 years",
              "7 years"
            ],
            "correct": 2
          },
          {
            "q": "FinCEN is a division of —",
            "opts": [
              "the U.S. Treasury",
              "the FBI",
              "the CFPB",
              "the Federal Reserve"
            ],
            "correct": 0
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "The BSA puts financial institutions on the front line against money laundering — reporting large and suspicious cash movements and keeping the records that let investigators follow the money.",
        "facts": [
          "<span class=\"hl\">Structuring</span> — splitting deposits under $10,000 to dodge a CTR filing — is itself a crime.",
          "If no suspect is identified, the SAR deadline can extend <span class=\"hl\">an extra 30 days</span>, but no later than 60 days from the activity.",
          "Once a SAR is filed, <span class=\"hl\">tipping off</span> the subject or disclosing the SAR is prohibited.",
          "SARs and CIP/account records are kept at least <span class=\"hl\">5 years</span>."
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
              "html": "Your lender knows an enormous amount about you — income, balances, debts, Social Security number. The <b>Gramm-Leach-Bliley Act (GLBA)</b> is the law that says it can't just do whatever it wants with that. Passed in 1999, GLBA forces financial institutions to guard your private financial information, tell you what they share, let you say no to some of it, and actually secure the data they hold."
            }
          ]
        },
        {
          "heading": "why bank mergers created a privacy problem",
          "paras": [
            {
              "html": "For most of the 20th century a Depression-era law, <b>Glass-Steagall</b> (1933), kept banking, investing, and insurance in separate companies. GLBA tore down that wall, letting them combine into single <b>financial holding companies</b>. Convenient — but now one corporate family could hold your checking account, your brokerage, and your insurance, pooling a complete financial picture of you in one place. That concentration is exactly the privacy risk GLBA was written to manage."
            }
          ]
        },
        {
          "heading": "what NPI is",
          "paras": [
            {
              "html": "The thing GLBA protects is your <b>nonpublic personal information (NPI)</b> — the financial details about you that someone <em>couldn't</em> just dig up through a public records search or a Freedom of Information Act request. Your account balance and loan application are NPI; something already public isn't. The protection covers information tied to products you get for personal, family, or household use — a business or commercial account falls outside it."
            }
          ]
        },
        {
          "heading": "consumer versus customer",
          "paras": [
            {
              "html": "GLBA splits the people it protects into two, and the difference decides how often they hear from you. A <b>consumer</b> uses a financial product without a continuing relationship — someone who just gets a quote. A <b>customer</b> has a formal, ongoing relationship — they opened an account or took a loan. The distinction matters because a customer is owed the privacy notice up front <em>and</em> on a repeating basis, while a one-time consumer is not."
            }
          ]
        },
        {
          "heading": "the deal: notice and opt-out",
          "paras": [
            {
              "html": "The core bargain is simple. Before a financial institution shares your NPI with a <b>nonaffiliated third party</b> — an outside company it doesn't own or control — it must first tell you clearly that it may, and give you a real chance to <b>opt out</b> and stop it. There are practical exceptions: it can share NPI to get the deal done (ordering your title report) or under a joint marketing agreement without an opt-out. But it can <b>never</b> hand your account number to an outside company for that company's telemarketing or mail marketing."
            }
          ],
          "synth": {
            "q": "Before sharing a customer's NPI with a nonaffiliated third party, what must a financial institution do?",
            "a": "It must first clearly and conspicuously tell the customer that it may share the information, and give the customer a reasonable opportunity and simple method to opt out before any sharing occurs. (Exceptions exist for sharing needed to perform the transaction or under joint marketing agreements.)"
          }
        },
        {
          "heading": "the privacy notice",
          "paras": [
            {
              "html": "The vehicle for all this is the <b>privacy notice</b>. A financial institution must give a customer a clear written notice of its information-sharing policies when the relationship begins and <span class=\"cloze\" data-accept='[\"annually\",\"yearly\",\"once a year\",\"every year\"]' data-reveal=\"annually\">?</span> after that. The notice spells out what it collects, what it shares and with whom, and how to opt out. One break: if its policies haven't changed since the last notice, it doesn't have to send the yearly one."
            }
          ]
        },
        {
          "heading": "the Safeguards Rule",
          "paras": [
            {
              "html": "Promising privacy is worthless if the data leaks, so GLBA's <b>Safeguards Rule</b> requires a written <b>information security program</b> — real administrative, technical, and physical protections for customer information. It has to name a qualified individual to run it, run regular risk assessments, control who can reach the data, test and monitor the protections, train staff, and oversee any service providers that touch the information. The idea is a living program, not a filed-away policy."
            }
          ],
          "synth": {
            "q": "What does GLBA's Safeguards Rule require a financial institution to build?",
            "a": "A written information security program with administrative, technical, and physical safeguards to protect customer information — including a designated qualified individual to run it, regular risk assessments, access controls, ongoing testing and monitoring, staff training, and oversight of service providers."
          }
        },
        {
          "heading": "what non-compliance costs",
          "paras": [
            {
              "html": "GLBA's penalties are steep enough to take seriously. An institution can be fined up to <span class=\"cloze\" data-accept='[\"$100,000\",\"100000\",\"100,000\",\"one hundred thousand\"]' data-reveal=\"$100,000\">?</span> per violation, its officers and directors up to $10,000 each, and violations can carry imprisonment of up to five years, plus license revocation and the reputational hit that follows."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "tore the wall",
            "topic": "Origin",
            "q": "Which 1933 law did GLBA repeal, letting banks, brokerages, and insurers merge?",
            "a": "<span class='hl'>Glass-Steagall</span>"
          },
          {
            "peg": "not NPI",
            "topic": "NPI",
            "q": "Is information findable through a public records search or FOIA request NPI?",
            "a": "<span class='hl'>No</span> — that's public personal information, not protected NPI"
          },
          {
            "peg": "no acct #",
            "topic": "Sharing limits",
            "q": "Can a lender share your account number with an outside company for its marketing?",
            "a": "<span class='hl'>Never</span> — account numbers can't go to a nonaffiliated third party for marketing"
          },
          {
            "peg": "unchanged = skip",
            "topic": "Privacy notice",
            "q": "When is the annual privacy notice NOT required?",
            "a": "when the institution's sharing <span class='hl'>policies haven't changed</span>"
          },
          {
            "peg": "one-time",
            "topic": "Who's covered",
            "q": "Who gets the privacy notice repeatedly — a consumer or a customer?",
            "a": "a <span class='hl'>customer</span> (formal ongoing relationship); a one-time consumer does not"
          },
          {
            "peg": "officers too",
            "topic": "Penalties",
            "q": "GLBA fine cap for an institution's officers and directors?",
            "a": "up to <span class='hl'>$10,000</span> each (and up to 5 years' imprisonment)"
          }
        ],
        "mcq": [
          {
            "q": "GLBA exists chiefly to protect a consumer's —",
            "opts": [
              "credit score",
              "nonpublic personal (financial) information",
              "interest rate",
              "property value"
            ],
            "correct": 1
          },
          {
            "q": "A 'customer' under GLBA differs from a 'consumer' in that a customer —",
            "opts": [
              "has a formal, ongoing relationship (an account or loan)",
              "always pays cash",
              "is a business, not an individual",
              "has opted out of sharing"
            ],
            "correct": 0
          },
          {
            "q": "Before sharing NPI with a nonaffiliated third party, an institution must —",
            "opts": [
              "get a court order",
              "give notice and an opportunity to opt out",
              "charge a fee",
              "notify the CFPB"
            ],
            "correct": 1
          },
          {
            "q": "The GLBA Safeguards Rule requires —",
            "opts": [
              "a written information security program",
              "a fixed interest rate",
              "an annual credit report",
              "a co-signer"
            ],
            "correct": 0
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "GLBA makes financial institutions guard customer data and disclose how it's shared, giving consumers a say before their private information goes to outsiders.",
        "facts": [
          "The Safeguards Rule requires a written <span class=\"hl\">information-security program</span>, tested and adjusted over time.",
          "Consumers can <span class=\"hl\">opt out</span> of sharing nonpublic personal information with nonaffiliated third parties.",
          "Penalties reach <span class=\"hl\">$10,000 per officer/director</span> and up to <span class=\"hl\">5 years</span> in prison."
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
              "html": "By the early 2000s the dinner hour belonged to telemarketers. Congress answered in 2003 with the <b>Telemarketing Sales Rule (TSR)</b>, which created the <b>Do-Not-Call Registry</b> — the list you add your number to so sellers have to leave you alone. Two agencies enforce it: the <b>FTC</b> handles interstate calls (caller and recipient in different states), and the <b>FCC</b> handles intrastate calls (both in the same state)."
            }
          ]
        },
        {
          "heading": "deceptive versus abusive",
          "paras": [
            {
              "html": "The TSR splits bad telemarketing into two kinds. <b>Deceptive</b> practices are about <em>lying</em> — hiding the real cost, faking prize odds, burying a policy of no refunds. <b>Abusive</b> practices are about <em>harassing</em> — calling at all hours, threatening, demanding money up front, dialing a number that asked to be left alone. Deception attacks your wallet; abuse attacks your peace. Nearly every TSR rule falls into one bucket or the other."
            }
          ],
          "synth": {
            "q": "What's the difference between a 'deceptive' and an 'abusive' telemarketing practice?",
            "a": "Deceptive practices involve lying or misleading the consumer — hiding total costs, misstating prize odds, concealing a no-refund policy. Abusive practices involve harassment or coercion — calling outside permitted hours, threats or profanity, demanding advance fees, or calling numbers on the Do-Not-Call list."
          }
        },
        {
          "heading": "the deceptive line",
          "paras": [
            {
              "html": "Before taking a consumer's payment, a telemarketer must truthfully and clearly disclose the <b>total cost</b> and quantity, any material restrictions, and — if it applies — a <b>no-refund</b> policy. In a prize promotion, they must state the odds, that <b>no purchase is necessary</b> to win, and how to enter for free. Lying about any of it — the cost, the product, a refund policy, an investment's risk, or an affiliation — is a deceptive act and prohibited outright."
            }
          ]
        },
        {
          "heading": "the abusive line",
          "paras": [
            {
              "html": "On the abuse side, the TSR bans threats and profanity, calling repeatedly to annoy, and blocking your caller ID. It bars demanding a fee <b>in advance</b> of delivering a loan or credit, and charging for debt-relief work before a debt is actually settled. It also forbids charging your account without your <b>express informed consent</b>. And residential sales calls are boxed into set hours — no earlier than 8 a.m. and no later than <span class=\"cloze\" data-accept='[\"9 p.m.\",\"9pm\",\"9 pm\",\"9:00 p.m.\",\"9\",\"nine\"]' data-reveal=\"9 p.m.\">?</span> in the called person's local time."
            }
          ]
        },
        {
          "heading": "scrubbing the list",
          "paras": [
            {
              "html": "A telemarketer can't just dial — it has to <b>scrub</b> its call list against the Do-Not-Call Registry, removing listed numbers, and re-scrub every <span class=\"cloze\" data-accept='[\"31 days\",\"31\",\"thirty-one\",\"thirty-one days\"]' data-reveal=\"31 days\">?</span> since numbers come and go. A few calls escape the registry: to a current customer, to someone who was a customer within the last 18 months, to someone who asked about the product within the last 3 months, and calls that are purely charitable or political."
            }
          ]
        },
        {
          "heading": "the safe harbor",
          "paras": [
            {
              "html": "A seller that slips up isn't automatically liable if it can show a genuine compliance routine: written procedures, trained staff, its own internal do-not-call list, scrubbing the registry on time, and technology that keeps <b>abandoned</b> (dead-air) calls to no more than <span class=\"cloze\" data-accept='[\"3%\",\"3\",\"three percent\",\"three\"]' data-reveal=\"3%\">?</span> of calls answered. It must also let an unanswered call ring at least 15 seconds or four rings, and play a message naming the seller when no rep is available. The safe harbor rewards the company that tried."
            }
          ]
        },
        {
          "heading": "records and the price of breaking it",
          "paras": [
            {
              "html": "Telemarketers must keep their scripts, ads, and sales records for at least 24 months. And the rule has teeth: as of 2024, a TSR violation carries a fine of up to <span class=\"cloze\" data-accept='[\"$51,744\",\"51744\",\"51,744\"]' data-reveal=\"$51,744\">?</span> per violation — a number that ratchets up with inflation, so it's the per-call scale, not the exact figure, worth remembering."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "two enforcers",
            "topic": "Enforcement",
            "q": "Which agency enforces interstate telemarketing calls, and which intrastate?",
            "a": "the <span class='hl'>FTC</span> (interstate) and the <span class='hl'>FCC</span> (intrastate)"
          },
          {
            "peg": "EBR window",
            "topic": "The registry",
            "q": "How long after a purchase can a seller still call a former customer?",
            "a": "within <span class='hl'>18 months</span> (or 3 months after the consumer's inquiry)"
          },
          {
            "peg": "advance fee",
            "topic": "Abusive practices",
            "q": "Can a telemarketer demand a fee before delivering a loan?",
            "a": "<span class='hl'>No</span> — advance fees for credit are an abusive practice"
          },
          {
            "peg": "let it ring",
            "topic": "Safe harbor",
            "q": "How long must an unanswered telemarketing call ring before disconnect?",
            "a": "at least <span class='hl'>15 seconds</span> or four rings"
          },
          {
            "peg": "charity/politics",
            "topic": "The registry",
            "q": "Which call types aren't blocked by the Do-Not-Call Registry?",
            "a": "<span class='hl'>charitable</span> and <span class='hl'>political</span> calls (plus current-customer calls)"
          },
          {
            "peg": "keep the tape",
            "topic": "Recordkeeping",
            "q": "Telemarketing scripts and records must be kept for at least…",
            "a": "<span class='hl'>24 months</span>"
          }
        ],
        "mcq": [
          {
            "q": "The two categories of prohibited telemarketing conduct are —",
            "opts": [
              "civil and criminal",
              "deceptive and abusive",
              "inbound and outbound",
              "local and national"
            ],
            "correct": 1
          },
          {
            "q": "Residential telemarketing sales calls are permitted only between —",
            "opts": [
              "6 a.m. and 11 p.m.",
              "8 a.m. and 9 p.m. local time",
              "9 a.m. and 5 p.m.",
              "any time"
            ],
            "correct": 1
          },
          {
            "q": "A telemarketer must re-scrub its list against the Do-Not-Call Registry every —",
            "opts": [
              "24 hours",
              "31 days",
              "6 months",
              "year"
            ],
            "correct": 1
          },
          {
            "q": "To stay within the safe harbor, abandoned (dead-air) calls must not exceed —",
            "opts": [
              "3% of answered calls",
              "10% of answered calls",
              "25% of answered calls",
              "half of answered calls"
            ],
            "correct": 0
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "The Telemarketing Sales Rule and Do-Not-Call registry limit when and how a business can cold-call, so consumers aren't hounded at dinner or after they've opted out.",
        "facts": [
          "Calls are allowed only between <span class=\"hl\">8:00 a.m. and 9:00 p.m.</span> in the recipient's local time.",
          "The call-abandonment rate can't exceed <span class=\"hl\">3%</span>.",
          "Each violation can cost up to <span class=\"hl\">$51,744</span>."
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
              "html": "People pick a mortgage off an ad — a rate in a window, a payment in a mailer — and a loan is too big a decision to make on a lie. <b>Mortgage Acts and Practices–Advertising (MAPs)</b>, issued under <b>Regulation N</b> in 2009, is the rule that keeps mortgage advertising honest. It's a close cousin of TILA's advertising rules, and its core is blunt: don't materially misrepresent anything about a mortgage."
            }
          ]
        },
        {
          "heading": "the one rule underneath",
          "paras": [
            {
              "html": "MAPs reads like a long list of don'ts, but they all reduce to a single idea: any <b>material misrepresentation</b> — express or implied — about a mortgage credit product violates the rule. That covers the interest and the <b>APR</b>, the existence or amount of any fees (including claiming there are none), a prepayment penalty, whether the rate is really <b>'fixed,'</b> the loan type, taxes and insurance, any government affiliation or endorsement, whether the ad comes from your current lender, and promises to <b>eliminate or reduce debt</b>. If it would mislead a borrower about the loan, MAPs reaches it."
            }
          ],
          "synth": {
            "q": "What single principle underlies all of MAPs' specific prohibitions?",
            "a": "That no commercial communication may materially misrepresent — expressly or by implication — any term or aspect of a mortgage credit product: its rate or APR, its fees, a prepayment penalty, whether it's fixed, government affiliation, the source of the ad, debt-elimination claims, and so on."
          }
        },
        {
          "heading": "triggering terms, again",
          "paras": [
            {
              "html": "MAPs also carries the same <b>triggering-term</b> logic you met in TILA. State a specific number in a mortgage ad — a down-payment amount or percent, the number or period of payments, a payment amount, or a finance-charge amount — and the ad must then clearly and conspicuously disclose the full picture: the down payment, the actual repayment terms over the whole loan (including any balloon), and the annual percentage rate, using that term. A tempting figure can't travel alone."
            }
          ]
        },
        {
          "heading": "keeping the ads on file",
          "paras": [
            {
              "html": "So violations can be traced, MAPs requires whoever runs a mortgage ad to keep it. Copies of all materially different commercial communications — plus the sales scripts, training, and marketing materials behind them, and records of the products actually available while the ad ran — must be retained for at least <span class=\"cloze\" data-accept='[\"24 months\",\"24\",\"twenty-four\",\"two years\",\"2 years\"]' data-reveal=\"24 months\">?</span>."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "Reg N",
            "topic": "What MAPs is",
            "q": "MAPs is implemented under which regulation, and when?",
            "a": "<span class='hl'>Regulation N</span> (2009)"
          },
          {
            "peg": "\"no fees\"",
            "topic": "Prohibited claims",
            "q": "Can a mortgage ad claim 'no fees' when fees exist?",
            "a": "<span class='hl'>No</span> — misrepresenting the existence or amount of fees violates MAPs"
          },
          {
            "peg": "debt gone",
            "topic": "Prohibited claims",
            "q": "May a mortgage ad promise to eliminate or forgive the borrower's debt?",
            "a": "<span class='hl'>No</span> — debt-elimination misrepresentations are prohibited"
          },
          {
            "peg": "who enforces",
            "topic": "What MAPs is",
            "q": "MAPs resembles the advertising rules of which other law?",
            "a": "the <span class='hl'>Truth in Lending Act</span> (TILA)"
          },
          {
            "peg": "gov't tie",
            "topic": "Prohibited claims",
            "q": "Can an ad imply a government endorsement the loan doesn't have?",
            "a": "<span class='hl'>No</span> — misrepresenting government affiliation is barred"
          }
        ],
        "mcq": [
          {
            "q": "The single principle behind MAPs is that a mortgage ad may not —",
            "opts": [
              "quote any interest rate",
              "materially misrepresent any aspect of the mortgage product",
              "mention the lender's name",
              "use color images"
            ],
            "correct": 1
          },
          {
            "q": "Records of a mortgage ad must be retained for at least —",
            "opts": [
              "6 months",
              "12 months",
              "24 months",
              "5 years"
            ],
            "correct": 2
          },
          {
            "q": "Stating a specific payment amount in a mortgage ad triggers disclosure of —",
            "opts": [
              "only the lender's phone number",
              "the down payment, full repayment terms, and the APR",
              "the loan officer's name",
              "nothing further"
            ],
            "correct": 1
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "Regulation N bans lying in mortgage ads: a material misstatement about a loan product in any commercial message is a violation.",
        "facts": [
          "Prohibits <span class=\"hl\">material misrepresentations</span> in any commercial communication about a mortgage credit product.",
          "A <span class=\"hl\">triggering term</span> — a stated rate, payment, or down-payment figure — pulls in extra required disclosures once used.",
          "Advertising records are kept for <span class=\"hl\">24 months</span>."
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
              "html": "For centuries the enforceable thing was ink on paper — a signature you could hold. When lending moved online, that raised a real question: is a click, or a typed name, actually binding? The <b>Electronic Signatures in Global and National Commerce Act (E-Sign Act)</b>, passed in 2000, answered yes. It gives electronic records and electronic signatures the same legal force as paper ones, so a mortgage can be signed and delivered entirely on a screen."
            }
          ]
        },
        {
          "heading": "what counts as a signature now",
          "paras": [
            {
              "html": "E-Sign defines an <b>electronic signature</b> broadly: any electronic sound, symbol, or process attached to a record and adopted <b>with the intent to sign</b>. A typed name, a clicked \"I agree,\" a drawn signature on a pad — any of them can bind, as long as the person meant it as their signature. The Act's key promise is that a contract or signature <b>can't be denied legal effect</b> just because it's electronic. Intent is what makes it a signature, not paper."
            }
          ]
        },
        {
          "heading": "the consumer has to agree first",
          "paras": [
            {
              "html": "Electronic delivery isn't something a lender can simply impose. If a law requires that information reach the consumer <em>in writing</em>, the lender may deliver it electronically only if the consumer has <b>affirmatively consented</b> to receive it that way and hasn't withdrawn that consent. Nobody can be forced to accept electronic records; the choice stays with the consumer."
            }
          ]
        },
        {
          "heading": "prove they can actually open it",
          "paras": [
            {
              "html": "The heart of E-Sign is a step that's easy to miss: the consumer's consent has to <b>reasonably demonstrate that they can actually access</b> the electronic records in the format you'll use. In practice, the consumer consents (or confirms consent) electronically, in that same format — proving they can open the PDF you're about to bind them with before you rely on it. Consent given in a form the borrower can't actually read wouldn't count."
            }
          ],
          "synth": {
            "q": "Why must a consumer give (or confirm) E-Sign consent electronically, in the format that will be used?",
            "a": "Because consent must reasonably demonstrate that the consumer can actually access the electronic records in the format the lender will use. Consenting in that format proves the borrower can open and read the documents before the lender relies on electronic delivery to bind them."
          }
        },
        {
          "heading": "what they're told before consenting",
          "paras": [
            {
              "html": "Before that consent, the lender must give a clear statement covering the consumer's options: their right to get the record on <b>paper</b> instead, their right to <b>withdraw</b> consent and any conditions or fees for doing so, whether the consent covers just this transaction or a whole category of records, how to withdraw consent or update contact information, and how to request a paper copy and any fee for it. The consumer must also receive a statement of the <b>hardware and software</b> needed to access and keep the records."
            }
          ]
        },
        {
          "heading": "when the tech changes, and keeping the records",
          "paras": [
            {
              "html": "If the hardware or software requirements later change enough to risk the consumer no longer being able to open their records, the lender must send a revised statement and give the consumer the right to <b>withdraw consent free</b> of any fee or penalty. And the records themselves have to be kept in a form that stays accurate, accessible to anyone legally entitled to them, and reproducible for later reference. One carve-out: agreements made before the Act took effect, on <span class=\"cloze\" data-accept='[\"October 1, 2000\",\"october 1 2000\",\"oct 1 2000\",\"10/1/2000\",\"2000\"]' data-reveal=\"October 1, 2000\">?</span>, are exempt."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "intent",
            "topic": "E-signatures",
            "q": "What turns an electronic sound, symbol, or process into a signature?",
            "a": "adopting it <span class='hl'>with the intent to sign</span> the record"
          },
          {
            "peg": "not denied",
            "topic": "E-signatures",
            "q": "Can a contract be voided just because it's electronic?",
            "a": "<span class='hl'>No</span> — it can't be denied legal effect solely for being electronic"
          },
          {
            "peg": "right to paper",
            "topic": "Consumer consent",
            "q": "One thing a lender must disclose before e-delivery consent?",
            "a": "the consumer's right to receive the record on <span class='hl'>paper</span> (and to withdraw consent)"
          },
          {
            "peg": "tech changes",
            "topic": "Consumer consent",
            "q": "If access requirements change and risk locking the consumer out, they may…",
            "a": "<span class='hl'>withdraw consent free</span> of any fee or penalty"
          },
          {
            "peg": "no forcing",
            "topic": "Consumer consent",
            "q": "Can a consumer be required to accept electronic records?",
            "a": "<span class='hl'>No</span> — consent is the consumer's choice"
          },
          {
            "peg": "keep it open",
            "topic": "Records",
            "q": "Electronic records must be kept in a form that is…",
            "a": "accurate, <span class='hl'>accessible</span>, and reproducible for later reference"
          }
        ],
        "mcq": [
          {
            "q": "The E-Sign Act's core effect is to —",
            "opts": [
              "ban electronic contracts",
              "give electronic records and signatures the same legal force as paper",
              "require notarization of all loans",
              "set interest-rate caps"
            ],
            "correct": 1
          },
          {
            "q": "Before delivering required disclosures electronically, a lender must —",
            "opts": [
              "get the consumer's affirmative consent",
              "obtain a court order",
              "mail a paper copy first",
              "wait 30 days"
            ],
            "correct": 0
          },
          {
            "q": "E-Sign consent must reasonably demonstrate that the consumer —",
            "opts": [
              "has good credit",
              "can actually access the records in the format used",
              "owns a printer",
              "has a co-signer"
            ],
            "correct": 1
          },
          {
            "q": "An 'electronic signature' under E-Sign requires, above all —",
            "opts": [
              "a handwritten image",
              "the intent to sign",
              "a notary's seal",
              "a witness"
            ],
            "correct": 1
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "The E-Sign Act makes an electronic signature count the same as ink, so a loan can close online without losing legal force.",
        "facts": [
          "Electronic records and signatures carry the <span class=\"hl\">same legal validity</span> as paper and ink.",
          "An electronic signature is any <span class=\"hl\">sound, symbol, or process</span> attached to a record and adopted with intent to sign."
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
              "html": "The attacks of September 11, 2001 were funded through ordinary bank accounts, so part of the response was to tighten the financial system itself. Weeks later Congress passed the <b>USA PATRIOT Act</b>, which — among far broader counterterrorism powers — strengthened the Bank Secrecy Act's grip on money laundering and pushed identity checks deeper into every financial institution, mortgage companies included. Where BSA/AML set up the reporting, the PATRIOT Act sharpened the question underneath it: are you certain who you're dealing with?"
            }
          ]
        },
        {
          "heading": "knowing exactly who you're lending to",
          "paras": [
            {
              "html": "The PATRIOT Act's centerpiece for lenders is the <b>Customer Identification Program (CIP)</b> — the formal routine for proving an applicant is who they claim to be. Every institution must verify and record the identity of anyone opening an account or applying for a loan, post a notice in its lobby that it will ask for identification, and check applicants against government <b>watch lists</b> of known or suspected terrorists. Someone already verified as an existing customer doesn't have to prove their identity again."
            }
          ],
          "synth": {
            "q": "What three things must a Customer Identification Program (CIP) do?",
            "a": "Verify the identity of any person opening an account or applying for a loan (to the extent reasonable and practicable), keep records of the identifying information used, and check the person against government lists of known or suspected terrorists."
          }
        },
        {
          "heading": "the mortgage identity steps",
          "paras": [
            {
              "html": "For a mortgage, the CIP has a concrete sequence. At application, the lender gives every applicant the <b>Patriot Act Information Disclosure</b>, explaining that identification is required. Then, for anyone not already a customer, the loan originator must collect a valid, <b>government-issued photo ID</b> whose picture clearly resembles the person presenting it — and attest, <b>under penalty of law</b>, that identity was verified as the Act requires. Getting this wrong isn't a paperwork slip; the attestation carries legal weight."
            }
          ]
        },
        {
          "heading": "the watch lists",
          "paras": [
            {
              "html": "Verifying identity is only half the check; the other half is <em>who</em> that verified person is. The CIP requires screening applicants against government lists of terrorists and barred parties — the same duty as OFAC's Specially Designated Nationals list from BSA/AML. A match is a hard stop: no financial institution may open an account or make a loan for anyone on such a list."
            }
          ]
        },
        {
          "heading": "credit files and terror investigations",
          "paras": [
            {
              "html": "The Act also reaches into credit files. A credit bureau must hand a consumer's report and file to a government agency conducting an authorized international-terrorism investigation when the agency certifies in writing that it needs it. And the bureau must stay silent about it: it may <b>not</b> tell the consumer — or note in the report — that a government agency requested or obtained access to the file."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "post-9/11",
            "topic": "Origin",
            "q": "The USA PATRIOT Act strengthened which earlier law's anti-laundering rules?",
            "a": "the <span class='hl'>Bank Secrecy Act</span> (BSA/AML)"
          },
          {
            "peg": "lobby sign",
            "topic": "CIP",
            "q": "What must an institution post in its lobby under its CIP?",
            "a": "a notice that it will require <span class='hl'>identification</span> to open an account or apply for a loan"
          },
          {
            "peg": "the disclosure",
            "topic": "CIP",
            "q": "What does a mortgage applicant receive at application under the PATRIOT Act?",
            "a": "the <span class='hl'>Patriot Act Information Disclosure</span>"
          },
          {
            "peg": "already known",
            "topic": "CIP",
            "q": "Must an already-verified existing customer re-prove their identity?",
            "a": "<span class='hl'>No</span> — only new, non-customers must"
          },
          {
            "peg": "stay silent",
            "topic": "Credit files",
            "q": "May a bureau tell a consumer a government agency accessed their file for a terror probe?",
            "a": "<span class='hl'>No</span> — it must not disclose the access"
          },
          {
            "peg": "penalty of law",
            "topic": "CIP",
            "q": "How does an MLO confirm they verified a new customer's identity?",
            "a": "by attesting <span class='hl'>under penalty of law</span>, after collecting a government photo ID that resembles the person"
          }
        ],
        "mcq": [
          {
            "q": "The USA PATRIOT Act's Customer Identification Program requires a lender to —",
            "opts": [
              "guarantee the lowest rate",
              "verify identity and screen against government watch lists",
              "pull a credit report weekly",
              "waive closing costs"
            ],
            "correct": 1
          },
          {
            "q": "A mortgage applicant who is a brand-new (non-existing) customer must provide —",
            "opts": [
              "two years of tax returns",
              "a valid government-issued photo ID resembling them",
              "a co-signer",
              "a notarized letter"
            ],
            "correct": 1
          },
          {
            "q": "If an applicant appears on a government terrorist watch list, the institution must —",
            "opts": [
              "charge more",
              "not open the account or make the loan",
              "require a larger down payment",
              "proceed but monitor"
            ],
            "correct": 1
          },
          {
            "q": "When a government agency lawfully accesses a consumer's credit file for a terror investigation, the bureau —",
            "opts": [
              "must notify the consumer",
              "may not disclose the access to the consumer",
              "must publish it in the report",
              "charges the consumer a fee"
            ],
            "correct": 1
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "The PATRIOT Act pushed identity checks and anti-money-laundering duties onto financial institutions, so accounts can't be opened anonymously to move terrorist or criminal money.",
        "facts": [
          "Requires a <span class=\"hl\">Customer Identification Program (CIP)</span> to verify who is opening an account.",
          "Reinforces the duty to maintain an <span class=\"hl\">Anti-Money-Laundering (AML) program</span>."
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
              "html": "Put less than 20% down on a house and the lender is carrying more risk — borrowers with little equity default more often. To cover that gap, the lender makes you buy <b>private mortgage insurance (PMI)</b>: insurance that pays the <em>lender</em>, not you, if you default. PMI does nothing for the borrower except make a low-down-payment loan possible — and it's an extra monthly cost you'd want gone as soon as you're allowed. The <b>Homeowners Protection Act (HPA)</b>, passed in 1998, is the law that makes sure PMI actually comes off."
            }
          ]
        },
        {
          "heading": "what loan-to-value means",
          "paras": [
            {
              "html": "Everything in this law runs on one ratio: <b>loan-to-value (LTV)</b> — the loan balance divided by the home's value, the lender's share of the property expressed as a percent. Buy a $100,000 home with $10,000 down and you borrow $90,000; that's a 90% LTV, and the other 10% is your <b>equity</b>. With a single loan, LTV and equity always add to 100%, and every payment you make shifts the balance — LTV down, equity up. (For a purchase, LTV uses the <em>lesser</em> of the price or the appraised value.)"
            }
          ],
          "synth": {
            "q": "What is loan-to-value (LTV), and how does it relate to a borrower's equity?",
            "a": "LTV is the loan balance divided by the home's value (for a purchase, the lesser of price or appraised value), expressed as a percentage — the lender's share of the property. On a single-lien loan, LTV and the borrower's equity always add to 100%, so as the borrower pays down the loan, LTV falls and equity rises."
          }
        },
        {
          "heading": "why you pay PMI, and who it protects",
          "paras": [
            {
              "html": "Conventional lenders draw the risk line at <span class=\"cloze\" data-accept='[\"80%\",\"80\",\"eighty percent\",\"eighty\"]' data-reveal=\"80%\">?</span> LTV. Borrow more than that — less than 20% down — and PMI is required, insuring the lender against the slice of the loan above the 80% line, not the whole balance. Read that twice: the borrower pays the premium, but the coverage protects the lender and the investor. HPA applies only to conventional loans with PMI; FHA, VA, and USDA government loans use their own insurance and fall outside it."
            }
          ]
        },
        {
          "heading": "the problem HPA fixed",
          "paras": [
            {
              "html": "Before HPA, the only way to shed PMI was to ask your servicer to remove it once you hit 80% LTV — and hitting 80% could take years. The removal right was explained once, at closing, then forgotten, so thousands of borrowers kept paying PMI for years after they qualified to drop it. HPA fixed that by making removal happen on a schedule the servicer has to track, not one the borrower has to remember."
            }
          ]
        },
        {
          "heading": "cancellation by request",
          "paras": [
            {
              "html": "The first exit is the borrower's to take. Once the loan reaches 80% LTV, you can <b>request</b> that the servicer cancel PMI — but you have to earn it. You need a <b>good payment history</b>, no subordinate liens on the property (a second mortgage disqualifies you), and usually an appraisal you pay for to prove the value supports the 80%. Meet all three and the servicer removes the PMI."
            }
          ]
        },
        {
          "heading": "what counts as good payment history",
          "paras": [
            {
              "html": "\"Good payment history\" has a precise meaning here: no payment <span class=\"cloze\" data-accept='[\"60 days\",\"60\",\"sixty\",\"sixty days\"]' data-reveal=\"60 days\">?</span> or more past due in the last 24 months, and none 30 days or more past due in the last 12 months. Because it looks back two years, a loan essentially has to be at least two years old to clear the bar. Miss those marks and the request waits."
            }
          ]
        },
        {
          "heading": "automatic termination",
          "paras": [
            {
              "html": "The second exit doesn't need the borrower at all. Whether or not you ask, the servicer <b>must automatically</b> drop PMI once the loan is scheduled to reach <span class=\"cloze\" data-accept='[\"78%\",\"78\",\"seventy-eight percent\",\"seventy-eight\"]' data-reveal=\"78%\">?</span> LTV of the home's original value — provided the loan is current. (For a <b>high-risk</b>, non-conforming loan the automatic point drops to 77%.) No good-payment showing, no appraisal — the servicer tracks it and cancels it."
            }
          ]
        },
        {
          "heading": "final termination",
          "paras": [
            {
              "html": "The third exit is a backstop for a loan that never reaches the LTV triggers — say the borrower fell behind. At the <b>midpoint</b> of the loan's amortization period (halfway through the scheduled term), PMI must come off <b>regardless of payment status</b>. It's the guarantee that PMI can't run the entire life of the loan. Final termination is the one exit that doesn't apply to high-risk loans."
            }
          ]
        },
        {
          "heading": "after PMI comes off",
          "paras": [
            {
              "html": "Once PMI is cancelled or terminated, the servicer can't keep collecting for it — no premium may be charged more than 30 days after it ends — and it must <b>refund any unearned premium</b> within <span class=\"cloze\" data-accept='[\"45 days\",\"45\",\"forty-five\",\"forty-five days\"]' data-reveal=\"45 days\">?</span>. The servicer also has to send an annual reminder of the borrower's cancellation rights. A servicer that violates the HPA can owe statutory damages of up to $2,000 to the borrower, on top of actual damages."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "protects whom",
            "topic": "What PMI is",
            "q": "Who does private mortgage insurance protect?",
            "a": "the <span class='hl'>lender</span> (and investor) — not the borrower"
          },
          {
            "peg": "not covered",
            "topic": "Coverage",
            "q": "Which loans does the HPA NOT apply to?",
            "a": "government loans — <span class='hl'>FHA, VA, USDA</span> — and lender-paid PMI"
          },
          {
            "peg": "high-risk",
            "topic": "Termination",
            "q": "The automatic-termination LTV for a high-risk (non-conforming) loan?",
            "a": "<span class='hl'>77%</span> (versus 78% for a conforming loan)"
          },
          {
            "peg": "no subordinate",
            "topic": "Cancellation",
            "q": "Besides good payment history, what disqualifies a PMI cancellation request?",
            "a": "a <span class='hl'>subordinate lien</span> (a second mortgage) on the property"
          },
          {
            "peg": "the backstop",
            "topic": "Termination",
            "q": "Final termination removes PMI at the amortization midpoint —",
            "a": "<span class='hl'>regardless of payment status</span> (not for high-risk loans)"
          },
          {
            "peg": "yearly note",
            "topic": "Disclosures",
            "q": "What must a servicer send PMI borrowers every year?",
            "a": "an <span class='hl'>annual reminder</span> of their PMI cancellation rights"
          }
        ],
        "mcq": [
          {
            "q": "Private mortgage insurance is generally required when a conventional loan's LTV is above —",
            "opts": [
              "50%",
              "70%",
              "80%",
              "95%"
            ],
            "correct": 2
          },
          {
            "q": "A borrower may REQUEST PMI cancellation once the loan reaches —",
            "opts": [
              "78% LTV",
              "80% LTV",
              "77% LTV",
              "the amortization midpoint"
            ],
            "correct": 1
          },
          {
            "q": "Automatic PMI termination on a conforming loan happens at —",
            "opts": [
              "80% LTV",
              "78% LTV",
              "the first payment",
              "closing"
            ],
            "correct": 1
          },
          {
            "q": "On a single-lien loan, LTV plus the borrower's equity equals —",
            "opts": [
              "80%",
              "100%",
              "120%",
              "it varies"
            ],
            "correct": 1
          },
          {
            "q": "After PMI is cancelled, the servicer must refund any unearned premium within —",
            "opts": [
              "10 days",
              "30 days",
              "45 days",
              "60 days"
            ],
            "correct": 2
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "The Homeowners Protection Act ends private mortgage insurance once a borrower has enough equity, so PMI stops charging after it has stopped protecting the lender's risk.",
        "facts": [
          "PMI terminates automatically at <span class=\"hl\">78% LTV</span> when the borrower is current — <span class=\"hl\">77%</span> for a high-risk loan.",
          "If the borrower isn't current at 78%, final termination waits for the <span class=\"hl\">midpoint of amortization</span>.",
          "Unearned premiums are refunded within <span class=\"hl\">45 days</span> of cancellation or termination.",
          "The servicer must notify the borrower no later than <span class=\"hl\">30 days</span> after PMI ends."
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
              "html": "In the mid-2000s, lenders handed out mortgages to people who plainly couldn't afford them — low teaser rates that would jump, almost no check on whether the borrower could pay the higher payment — then bundled those loans and sold them off. When the rates reset and home values fell, borrowers couldn't pay and couldn't refinance, and foreclosures hit at a scale the country had never seen. <b>Dodd-Frank</b>, the Wall Street Reform and Consumer Protection Act, is the 2010 response to that collapse. Nearly every mortgage rule in it is a fix for a specific thing that broke."
            }
          ]
        },
        {
          "heading": "what actually broke",
          "paras": [
            {
              "html": "The failure had a shape. Borrowers were pushed into <b>adjustable-rate mortgages</b> with low start rates, qualified on that low payment and not the one coming after the reset. When rates climbed, payments became unaffordable. At the same moment, home values dropped, so borrowers owed more than their homes were worth — <b>underwater</b> — and couldn't refinance their way out. Unable to pay and unable to sell or refinance, they defaulted in waves. Dodd-Frank's central mortgage reforms each target one link in that chain."
            }
          ],
          "synth": {
            "q": "In plain terms, what chain of events did Dodd-Frank's mortgage reforms respond to?",
            "a": "Lenders made loans (often adjustable-rate with low teaser payments) to borrowers without verifying they could afford the eventual payment. When rates reset and home values fell, borrowers couldn't afford the loans and — being underwater — couldn't refinance, so they defaulted en masse, triggering the 2007–2008 foreclosure crisis."
          }
        },
        {
          "heading": "the new referee: the CFPB",
          "paras": [
            {
              "html": "The scattered regulators had failed to catch any of it, so Dodd-Frank built one watchdog: the <b>Consumer Financial Protection Bureau (CFPB)</b>, an independent bureau housed within the Federal Reserve, dedicated to consumer finance. It writes the rules, supervises companies, and enforces the law against unfair, deceptive, or abusive practices. It's led by a single <b>Director</b>, appointed by the President and confirmed by the Senate to a <span class=\"cloze\" data-accept='[\"5 years\",\"5\",\"five\",\"five-year\",\"five year\",\"five years\"]' data-reveal=\"5-year\">?</span> term, removable only for cause. It's also the agency Dodd-Frank ordered to build TRID."
            }
          ],
          "synth": {
            "q": "What is the CFPB, and why did Dodd-Frank create it?",
            "a": "The Consumer Financial Protection Bureau is an independent bureau within the Federal Reserve that regulates consumer financial products — writing rules, supervising companies, and enforcing against unfair, deceptive, or abusive practices. Dodd-Frank created it because the pre-crisis patchwork of regulators had failed to police consumer finance, and one accountable agency was needed."
          }
        },
        {
          "heading": "the core fix: ability to repay",
          "paras": [
            {
              "html": "The heart of the reform answers the question nobody was asking in 2006: can this borrower actually pay? The <b>ability-to-repay (ATR)</b> rule bars a creditor from making a mortgage unless it first makes a reasonable, good-faith determination — based on <b>verified, documented</b> information — that the borrower can repay it. Wasn't the lender always supposed to check that? Legally, no — and that gap is exactly what ATR closes."
            }
          ]
        },
        {
          "heading": "what ability-to-repay weighs",
          "paras": [
            {
              "html": "ATR isn't a gut call; it's a checklist of verified facts. The creditor must consider the borrower's income, employment status, credit history, current debts and obligations, and either the <b>debt-to-income ratio</b> or the residual income left after paying the bills — plus assets other than the home itself. Crucially, the payment used in the math has to be a <b>fully amortizing</b> one: for a teaser-rate ARM, interest-only, or negative-amortization loan, the lender must qualify the borrower on the real, higher payment, not the low introductory one. That single requirement is what would have stopped the crisis loans."
            }
          ],
          "synth": {
            "q": "What must a creditor verify under the ability-to-repay rule, and which payment must it use?",
            "a": "It must make a reasonable, good-faith, documented determination the borrower can repay — weighing income, employment, credit history, current obligations, debt-to-income or residual income, and non-home assets. It must qualify the borrower using a fully amortizing payment (the real payment after any teaser rate resets), not a low introductory or interest-only one."
          }
        },
        {
          "heading": "the safe loan: the Qualified Mortgage",
          "paras": [
            {
              "html": "To give lenders a clear lane, Dodd-Frank defined the <b>Qualified Mortgage (QM)</b> — a loan built to meet the ability-to-repay standard by design, without the riskiest features. Make a QM and you're <b>presumed</b> to have satisfied ATR; the loan is treated as having considered the borrower's ability to repay. It's the safe harbor that rewards writing the sound loan instead of the exotic one."
            }
          ]
        },
        {
          "heading": "the ARM reset warning",
          "paras": [
            {
              "html": "Because a payment shock was central to the crisis, Dodd-Frank makes the reset visible in advance. For a hybrid ARM — one with a fixed intro period longer than a year before it starts adjusting — the creditor or servicer must send a written notice roughly <span class=\"cloze\" data-accept='[\"6 months\",\"6\",\"six\",\"six months\"]' data-reveal=\"6 months\">?</span> before the first rate adjustment. The notice estimates the new payment, explains the index and margin behind it, and lists the borrower's options — refinance, renegotiate, forbearance — along with HUD-approved counseling contacts."
            }
          ]
        },
        {
          "heading": "where TILA's originator rules came from",
          "paras": [
            {
              "html": "Two rules you already met under TILA are Dodd-Frank's doing. Its <b>loan-originator compensation</b> limits — pay can't be based on a loan's terms, only on the loan amount — and its <b>anti-steering</b> rule — you can't push a borrower into a costlier loan, one they can't repay, or away from a Qualified Mortgage they qualify for — both originate here, in the Mortgage Reform and Anti-Predatory Lending Act. Dodd-Frank also locked in <b>appraiser independence</b>, walling originators off from the people who value the collateral. TILA is where you drill them; Dodd-Frank is where they were born."
            }
          ]
        }
      ],
      "review": {
        "flashcards": [
          {
            "peg": "the response",
            "topic": "Origin",
            "q": "Dodd-Frank (2010) was the response to what?",
            "a": "the <span class='hl'>2007–2008 financial crisis</span> and its foreclosure epidemic"
          },
          {
            "peg": "housed where",
            "topic": "CFPB",
            "q": "The CFPB is an independent bureau within which body?",
            "a": "the <span class='hl'>Federal Reserve</span> System"
          },
          {
            "peg": "for cause",
            "topic": "CFPB",
            "q": "How can the CFPB Director be removed before the term ends?",
            "a": "only <span class='hl'>for cause</span> (inefficiency, neglect, or malfeasance)"
          },
          {
            "peg": "verified",
            "topic": "Ability to repay",
            "q": "ATR determinations must be based on what kind of information?",
            "a": "<span class='hl'>verified and documented</span> information (not stated or assumed)"
          },
          {
            "peg": "QM presumption",
            "topic": "Qualified Mortgage",
            "q": "What does making a Qualified Mortgage give the lender?",
            "a": "a <span class='hl'>presumption</span> that the ability-to-repay rule was satisfied"
          },
          {
            "peg": "built TRID",
            "topic": "CFPB",
            "q": "Which disclosure rule did Dodd-Frank order the CFPB to build?",
            "a": "<span class='hl'>TRID</span> (integrating the TILA and RESPA disclosures)"
          },
          {
            "peg": "the exception",
            "topic": "Ability to repay",
            "q": "ATR generally must be assessed on a refinance except for —",
            "a": "certain <span class='hl'>streamlined refinances</span>"
          }
        ],
        "mcq": [
          {
            "q": "The CFPB was created by —",
            "opts": [
              "RESPA",
              "the Dodd-Frank Act",
              "the USA PATRIOT Act",
              "TILA"
            ],
            "correct": 1
          },
          {
            "q": "Under the ability-to-repay rule, a creditor must qualify the borrower using —",
            "opts": [
              "the introductory teaser payment",
              "an interest-only payment",
              "a fully amortizing payment",
              "whatever the borrower requests"
            ],
            "correct": 2
          },
          {
            "q": "A Qualified Mortgage (QM) is —",
            "opts": [
              "any loan over $100,000",
              "a loan built to satisfy the ability-to-repay rule, presumed compliant",
              "a government-insured loan",
              "an adjustable-rate loan"
            ],
            "correct": 1
          },
          {
            "q": "For a hybrid ARM, the reset notice must be sent roughly — before the first adjustment.",
            "opts": [
              "3 days",
              "30 days",
              "6 months",
              "2 years"
            ],
            "correct": 2
          },
          {
            "q": "The CFPB Director serves a term of —",
            "opts": [
              "2 years",
              "4 years",
              "5 years",
              "life"
            ],
            "correct": 2
          }
        ]
      }
    ,
      "recap": {
        "plainLanguage": "Dodd-Frank was the post-2008 overhaul: it created the CFPB and rewrote mortgage rules so originators can't be paid to steer borrowers into worse loans.",
        "facts": [
          "Title X created the <span class=\"hl\">Consumer Financial Protection Bureau (CFPB)</span>.",
          "Title XIV is the <span class=\"hl\">Mortgage Reform and Anti-Predatory Lending Act</span>.",
          "Originator pay can't vary with a loan's terms other than amount; <span class=\"hl\">steering</span> for higher pay is prohibited.",
          "A hybrid ARM reset notice is due in the one-month window ending <span class=\"hl\">6 months before</span> the first rate adjustment."
        ]
      }
    }
  ]
};

export default section3;

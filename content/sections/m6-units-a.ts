import type { SectionUnit } from '@/lib/section';

// Module 6 — MLO Activities, units 01–05: the front half of the origination arc,
// inquiry → application → the forms package → pricing and locking → the disclosure
// calendar. Recall-gradient shape; every tested fact is taught in the unit's prose
// before it is tested, and marquee exam facts are blanked densely as the first pass
// (selective promotion). Facts recur across tiers where they earn it, each appearance
// asking different work (the reinforcement rule) — never verbatim restatement.
//
// Grounded in the ebook's Module 6 (pp. 374–526), the NMLS content outline §III, and
// the 2026 cheat sheet. Numbers that re-index annually are flagged where they appear.

const unitsA: SectionUnit[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // 01 · The first conversation
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'first-conversation',
    name: 'The first conversation',
    reg: 'Loan inquiry · suitability · what makes an application',
    definitions: [
      { term: 'Loan Inquiry', def: "A consumer's request for information about mortgage financing — rates, costs, programs — before any application exists. Answering it is unregulated conversation right up until the six application items are in hand." },
      { term: 'Application', def: 'Under TRID, the moment the originator holds six pieces of information: the consumer\'s name, income, and Social Security number, the property\'s address, its value or purchase price, and a loan amount. No form or intent required.' },
      { term: 'Cost Estimate', def: 'An informal, non-binding estimate of a loan\'s costs. No universal format, commits the lender to nothing, and must carry a front-page warning to get an official Loan Estimate.' },
      { term: 'Loan Estimate', def: 'The universal TRID estimate of a loan\'s terms and costs. Once issued, its non-interest fees must be honored for at least ten days.' },
      { term: 'Intent to Proceed', def: 'The consumer\'s expressed decision, after receiving the Loan Estimate, to go forward with the loan. Until it is given, the only fee the lender may collect is for the credit report.' },
      { term: 'Fiduciary Responsibility', def: 'The duty to act in the customer\'s best interest ahead of your own — including naming a better-fitting product your company doesn\'t offer.' },
      { term: 'Non-Public Personal Information (NPI)', def: 'The personal financial details a consumer shares — income, balances, Social Security number. Once shared, it must be kept from anyone without a specific business purpose to see it.' },
      { term: 'Suitability', def: 'The match between a borrower\'s situation — purpose, property, income, credit, savings, time horizon — and a particular loan product. Establishing it is the point of the first conversation.' },
    ],
    groups: [
      {
        paras: [
          {
            html: `A renter calls on her lunch break. She has been reading listings for a month, she has a number in her head, and she wants to know what a mortgage would actually cost her. Nothing is signed. No form exists. This conversation — the <b>inquiry</b> — is where every loan file starts.`,
          },
          {
            html: `The conversation has rules: what you may hand her, what you may charge her, and the exact moment it stops being casual. The law defines that moment precisely, and it arrives earlier than most new originators expect.`,
          },
        ],
      },
      {
        heading: 'earning the file',
        paras: [
          {
            html: `The job in an inquiry is to understand the caller — her wants, her needs, and her qualifications — well enough to match her to the right financing. You may never recommend a product because it serves your own interest over hers. What you can do immediately is prepare her: give her the complete list of documents she will eventually need, and tell her to bring a valid government-issued <b>photo ID</b> that actually resembles her when she presents it.`,
          },
          {
            html: `You may not demand paperwork as the price of an answer. Supporting documents — pay stubs, bank statements, tax returns — may never be required as a condition of issuing an estimate. You can explain, truthfully, that an application built on real documents makes for a smoother transaction. You cannot withhold numbers until she produces them.`,
          },
          {
            html: `This stage of the work lives in the <b>CRM</b> — the customer relationship system (Surefire and BNTouch are common). It holds the lead record, the contact history, which referral partner sent her, and any rate alerts set for her — plus her consent to be called or texted at all, which the Telephone Consumer Protection Act requires before marketing calls. When she moves forward, the lead record hands off to the loan origination system.`,
          },
        ],
      },
      {
        heading: 'the six items that make an application',
        paras: [
          {
            html: `TRID draws the line with a list. The moment you hold six pieces of information — the consumer's name, her income, her Social Security number, the property's address, the property's value or purchase price, and a loan amount — an <b>application</b> exists. It does not matter whether she meant to apply. It does not matter that no form was filled out. Six items in your hands, and the clock starts.`,
          },
          {
            html: `From that moment the lender owes her a Loan Estimate within <span class="cloze" data-accept='["three","3","three general business days","3 general business days"]' data-reveal="three">?</span> general business days. Five of the six items surface naturally in any serious conversation about a specific home; the one shoppers rarely hand over by accident is the <span class="cloze" data-accept='["social security number","ssn","social security"]' data-reveal="Social Security number">?</span>. An originator who has that almost always has an application.`,
          },
        ],
        synth: {
          q: `A shopper emails you her name, her salary, the address of a condo she likes, its listing price, and the loan amount she has in mind — and adds that she isn't applying yet. What one more piece of information would obligate your company to issue a Loan Estimate, and on what timeline?`,
          a: `Her Social Security number. With all six items — name, income, SSN, property address, property value or price, and loan amount — an application exists whether or not she intended one, and the Loan Estimate must be issued within three general business days.`,
        },
      },
      {
        heading: 'the two estimates',
        paras: [
          {
            html: `When an inquirer asks for numbers before an application exists, you answer with one of two documents. The <b>Cost Estimate</b> is the informal one: non-binding, no universal format, and it commits the lender to nothing. It carries one hard rule — the front page must warn, near the top, in <span class="cloze" data-accept='["12","twelve","12-point","12 point"]' data-reveal="12">?</span>-point type or larger: <i>“Your actual rate and costs could be higher. Get an official Loan Estimate before choosing your loan.”</i> And it may never be dressed up to resemble a Loan Estimate, a Closing Disclosure, or the old Good Faith Estimate.`,
          },
          {
            html: `The <b>Loan Estimate</b> is the formal one, and a lender may choose to issue it even without an application. Issuing it costs the lender something real: every non-interest fee on it must be honored for at least <span class="cloze" data-accept='["ten","10","10 days","ten days"]' data-reveal="ten">?</span> days from issuance.`,
          },
          {
            html: `One fee, and only one, may be requested before the Loan Estimate goes out and the consumer expresses intent to proceed: the cost of the <span class="cloze" data-accept='["credit report","the credit report","credit"]' data-reveal="credit report">?</span>.`,
          },
        ],
      },
      {
        heading: 'three options, not one',
        paras: [
          {
            html: `When it comes time to present solutions, the safe practice — and the safe harbor against steering — is to offer no fewer than <span class="cloze" data-accept='["three","3"]' data-reveal="three">?</span>: one priced at the <b>par</b> rate, one at a higher rate with lower costs, and one at a lower rate with higher costs. Par is the market rate with nothing added and nothing rebated; the other two trade the rate against the cash it takes to get it. Offering all three puts the choice of trade where it belongs — with the borrower.`,
          },
        ],
      },
      {
        heading: 'what you may never do',
        paras: [
          {
            html: `You are not the underwriter, so you may never tell an applicant that her loan will be approved or declined — that decision belongs to <span class="cloze" data-accept='["the underwriter","underwriter","underwriting","an underwriter"]' data-reveal="the underwriter">?</span> alone. You may never discourage anyone from applying, either.`,
          },
          {
            html: `There are exactly three people you may refuse to work with: someone under age <span class="cloze" data-accept='["18","eighteen"]' data-reveal="18">?</span>, someone committing or who has committed fraud, and someone who is mentally incompetent. Everyone else who wants an application gets one.`,
          },
          {
            html: `And once an inquirer shares non-public personal information — income figures, account balances, a Social Security number — you are bound to protect it and keep it from anyone who lacks a specific business purpose to see it.`,
          },
        ],
      },
      {
        heading: 'matching the product to the person',
        paras: [
          {
            html: `The first question that shapes everything else is <b>purpose</b>: a purchase, a refinance, a reverse mortgage, a home-equity line, a second loan. Each points at a different shelf of the catalog Module 5 taught.`,
          },
          {
            html: `From there, suitability is a short interview: what kind of property and how she will occupy it, her income and existing debt, her credit score, her savings, her employment history, how long she plans to own — which drives the fixed-versus-adjustable call — and when she plans to buy.`,
          },
          {
            html: `The duty underneath is fiduciary. If the product that serves her best is one your company doesn't offer, you name it, explain it, and point her toward a lender that has it. If she still chooses to work with you after that conversation, you document it and proceed with what you do offer.`,
          },
        ],
        synth: {
          q: `An inquirer would clearly be best served by a loan program your company doesn't offer. What does acting in her best interest require you to do — and what may you do if she still wants to work with you?`,
          a: `Tell her about the better-fitting program, explain its benefits, and give her the chance to pursue it with a lender that offers it. If she still prefers to work with you, document that conversation and proceed with the products you do offer.`,
        },
      },
    ],
    review: {
      flashcards: [
        { peg: 'the six', topic: 'the application line', q: 'Name the six items that turn an inquiry into an application.', a: `Name, income, <span class='hl'>Social Security number</span>, property address, property value or purchase price, and loan amount. All six in hand = an application, whatever the consumer intended.` },
        { peg: 'the warning', topic: 'estimates', q: 'What must every Cost Estimate say, and where?', a: `<span class='hl'>“Your actual rate and costs could be higher. Get an official Loan Estimate before choosing your loan.”</span> — near the top of the front page, in 12-point type or larger.` },
        { peg: 'three offers', topic: 'steering', q: 'What are the three options in the anti-steering safe harbor?', a: `One at the <span class='hl'>par rate</span>, one at a <span class='hl'>higher rate with lower costs</span>, and one at a <span class='hl'>lower rate with higher costs</span>.` },
        { peg: 'turned away', topic: 'the interview', q: 'The only three people an MLO may refuse to work with?', a: `Someone <span class='hl'>under 18</span>, someone committing or who has <span class='hl'>committed fraud</span>, and someone <span class='hl'>mentally incompetent</span>.` },
        { peg: 'come prepared', topic: 'the interview', q: 'What should every serious inquirer leave the first conversation with?', a: `The complete <span class='hl'>list of documents</span> she'll eventually need, and a reminder to bring a valid government-issued <span class='hl'>photo ID</span> that resembles her.` },
        { peg: 'first system', topic: 'the software', q: 'Which system holds the work before an application exists, and what does it hand off?', a: `The <span class='hl'>CRM</span> — lead record, contact history, referral source, rate alerts, and <span class='hl'>TCPA consent</span> to call or text. When the borrower moves forward, the lead hands off to the LOS.` },
      ],
      mcq: [
        {
          q: 'Which of the following is NOT one of the six items that create an application under TRID?',
          opts: ['The property address', "The consumer's employment history", "The consumer's income", 'The loan amount'],
          correct: 1,
        },
        {
          q: 'Before issuing a Loan Estimate and receiving intent to proceed, a lender may collect a fee for:',
          opts: ['An appraisal', 'Rate-lock processing', 'The credit report', 'Document preparation'],
          correct: 2,
        },
        {
          q: 'A consumer inquires about rates but refuses to provide bank statements. The MLO may:',
          opts: [
            'Decline to provide any estimate until documents arrive',
            'Provide a Cost Estimate or Loan Estimate — estimates may not be conditioned on documentation',
            'Provide only a verbal range, since written estimates require documents',
            'Charge a document-waiver fee and proceed',
          ],
          correct: 1,
        },
        {
          q: 'An applicant asks whether her loan will be approved. The MLO should say:',
          opts: [
            'Yes, if her credit score clears the program minimum',
            'That only the underwriter can make that decision',
            'Yes, subject to appraisal',
            'No, unless she locks her rate today',
          ],
          correct: 1,
        },
      ],
    },
    recap: {
      plainLanguage: `Before any form exists, the conversation is already regulated: what you hand a shopper, what you may charge her, and the exact moment six facts turn curiosity into an application.`,
      facts: [
        `Six items = an application: name · income · <span class="hl">SSN</span> · property address · value or price · loan amount`,
        `Loan Estimate due within <span class="hl">3 general business days</span> of application`,
        `Only fee before the LE + intent to proceed: the <span class="hl">credit report</span>`,
        `Cost Estimate warns on page 1, <span class="hl">12-point+</span>: get an official Loan Estimate`,
        `Anti-steering: offer <span class="hl">3 options</span> — par · higher rate / lower costs · lower rate / higher costs`,
        `Refuse only: <span class="hl">under 18</span> · fraud · mentally incompetent`,
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 02 · Taking the application
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'application',
    name: 'Taking the application',
    reg: 'URLA · Fannie Mae 1003 / Freddie Mac 65 · Reg B limits',
    definitions: [
      { term: 'URLA (Uniform Residential Loan Application)', def: 'The standard application used for nearly every residential mortgage in the country — Fannie Mae Form 1003, Freddie Mac Form 65. Six distinct forms, of which the Borrower Information Form is the primary.' },
      { term: 'Declarations', def: 'The application section where the borrower answers legal yes/no questions under penalty of perjury — occupancy, other liens, bankruptcies, foreclosures, lawsuits, borrowed down payment.' },
      { term: 'Government Monitoring Section', def: "The URLA's demographic section, where the applicant may self-identify race, ethnicity, and sex — or decline. It exists so regulators can detect discrimination; the MLO may ask only what the section itself asks." },
      { term: 'Credit Report Authorization and Release Disclosure', def: "The consumer's signed permission to pull credit before any application exists. The creditor keeps a copy even if the consumer never applies." },
      { term: 'Loan Origination System (LOS)', def: 'The system of record for every loan file: the pipeline, the loan summary, borrower pairs, assets and liabilities, the document folder, and the milestones a file moves through.' },
      { term: 'Point-of-Sale System (POS)', def: "The borrower's side of the file — the online application and secure document upload that feed the LOS." },
      { term: 'Written Verification of Employment (WVOE)', def: "A form the employer completes and returns to the lender, substituting for pay stubs when the applicant can't provide them." },
    ],
    groups: [
      {
        paras: [
          {
            html: `The six items are in hand, so an application exists. Now it has to be taken well. The application form captures a person's entire financial life — who she is, what she earns, what she owns, what she owes, and what she's buying — and every field on it exists for a reason. If it's part of the form, address it; the only blank field should be one that genuinely does not apply.`,
          },
        ],
      },
      {
        heading: 'the form with three names',
        paras: [
          {
            html: `The industry's standard application is the <b>Uniform Residential Loan Application</b> — the URLA. Fannie Mae numbers it Form <span class="cloze" data-accept='["1003","form 1003"]' data-reveal="1003">?</span>; Freddie Mac calls the same document Form <span class="cloze" data-accept='["65","form 65"]' data-reveal="65">?</span>. Originators mostly say “the ten-oh-three.” It is not one form but six — the full package is the next unit's subject; this one is about taking the primary form well.`,
          },
          {
            html: `An application can arrive any way a conversation can: face to face, over the phone, over the internet, virtually, or through a translator or TTY relay operator. The rules are the same in every channel.`,
          },
        ],
      },
      {
        heading: 'what you may ask',
        paras: [
          {
            html: `The Equal Credit Opportunity Act draws hard lines through the interview. Marital status is three words and no more: <span class="cloze" data-accept='["married","separated","unmarried","married, separated, or unmarried"]' data-reveal="married, separated, or unmarried">?</span>. Asking an applicant to elaborate past those violates Reg B — though if she volunteers more on her own, no violation has occurred.`,
          },
          {
            html: `Whether she plans to have children — or grow her family in any way — is strictly off limits. But the number of her dependents and their <span class="cloze" data-accept='["ages","their ages"]' data-reveal="ages">?</span> is not only permitted, it's required.`,
          },
          {
            html: `In the Government Monitoring Section, ask only what the section itself asks, and she may decline to answer any of it. If she indicates she is not a U.S. citizen, you may not ask which country she is a citizen of.`,
          },
          {
            html: `And before asking about income at all — unless the program has a household income ceiling — she must be told that alimony, child support, and separate maintenance income need not be revealed unless she wants it counted toward qualifying.`,
          },
        ],
        synth: {
          q: `An applicant mentions she's divorced and asks whether she has to reveal her child support. What may you ask about her marital status, and what must she be told about the support income?`,
          a: `Marital status is limited to married, separated, or unmarried — no follow-up beyond those three. Alimony, child support, and separate maintenance need not be disclosed unless she wants that income counted, and she must be told so before being asked about income.`,
        },
      },
      {
        heading: 'documents, not estimates',
        anchor: { file: 'ballerina-holding-stack-of-folders-transparent.png', caption: 'the file', kind: 'char' },
        paras: [
          {
            html: `Everything entered on an application should come from the customer's actual documents, not her recollection. Applicant estimates of income and assets are accepted on an exception basis only — never as the norm — because a file that's accurate from the start doesn't need repairing mid-transaction.`,
          },
          {
            html: `The standard document set: the most recent <span class="cloze" data-accept='["one month","1 month","one month's","a month"]' data-reveal="one month">?</span> of pay stubs for every position, <span class="cloze" data-accept='["two years","2 years","two","2"]' data-reveal="two years">?</span> of W-2s, two years of signed federal tax returns with all schedules, two years of business returns if she's self-employed, two to three months of asset statements with all pages, and — for income like Social Security or a pension — the award letter plus six months to a year of evidence it's actually being received.`,
          },
          {
            html: `When pay stubs can't be produced, a <b>written verification of employment</b> substitutes: the lender sends the employer a blank VOE with the borrower's signed release, and the completed form stands in for the income documents. A <b>verification of assets</b> works the same way with a financial institution. For checking, savings, and money market accounts, the number that goes on the application is the ending balance of the most recent statement — that is the figure the underwriter will use.`,
          },
        ],
      },
      {
        heading: 'offering and negotiating terms',
        paras: [
          {
            html: `Taking the application is also where terms get shaped, and the shaping runs on four levers. Down payment size — which decides whether the loan carries mortgage insurance. Term — 15 years or 30, payment against total interest. <b>Discount points</b> — paying up-front interest to buy the rate down, sometimes the difference between qualifying and not. And <b>lender credits</b> — accepting a higher rate to generate money that covers closing costs. The loan the borrower ultimately pursues is documented by the lender in Section L3 of the Lender Loan Information Form.`,
          },
        ],
      },
      {
        heading: 'the systems the file lives in',
        paras: [
          {
            html: `Once taken, the application stops living on paper. It lives in the <b>LOS</b> — the loan origination system (Encompass, LendingPad, and Calyx are the common ones). The LOS is the system of record: a pipeline of files, each holding a loan summary — borrower, credit, subject property, transaction terms — plus borrower pairs, assets and liabilities entered by institution and account, a document folder, and milestones the file is moved through, each assigned to a person.`,
          },
          {
            html: `The borrower sees a different surface: the <b>POS</b> — the point-of-sale system (Floify, SimpleNexus), which is the online application and the secure document upload. What she types there lands in the LOS; what the file still needs from her goes back out through it. A great deal of the industry's remaining manual work is the chase across that seam — rekeying, requesting, reconciling.`,
          },
        ],
      },
      {
        heading: 'one borrower, end to end',
        paras: [],
        embed: 'maya-application',
      },
    ],
    review: {
      flashcards: [
        { peg: 'three words', topic: 'Reg B limits', q: 'The only marital statuses an MLO may ask about?', a: `<span class='hl'>Married, separated, or unmarried</span> — nothing beyond those three, unless the applicant volunteers it.` },
        { peg: 'off limits', topic: 'Reg B limits', q: 'Family questions: what is prohibited, and what is required?', a: `Prohibited: any question about <span class='hl'>plans to have children</span> or grow the family. Required: the <span class='hl'>number and ages of dependents</span>.` },
        { peg: 'no follow-up', topic: 'Reg B limits', q: 'An applicant says she is not a U.S. citizen. What may you not ask?', a: `<span class='hl'>Which country</span> she is a citizen of. Citizenship status itself is on the form; the follow-up is prohibited.` },
        { peg: 'the channels', topic: 'taking the app', q: 'In what ways can an application legitimately arrive?', a: `<span class='hl'>Face to face, by phone, over the internet, virtually, or through a translator / TTY relay</span> — same rules in every channel.` },
        { peg: 'the substitute', topic: 'documents', q: "An applicant can't produce pay stubs. How does the lender document her income?", a: `A <span class='hl'>written verification of employment</span>: a blank VOE goes to the employer with the borrower's signed release, and the completed form substitutes for income documents.` },
        { peg: 'which balance', topic: 'documents', q: 'Which account figure goes on the application for checking and savings?', a: `The <span class='hl'>ending balance of the most recent statement</span> — the figure the underwriter will use.` },
      ],
      mcq: [
        {
          q: 'Which question is permissible when taking an application?',
          opts: [
            '“Are you planning to have more children?”',
            '“How many dependents do you have, and what are their ages?”',
            '“Is your divorce final, or are you still fighting it?”',
            '“What country are you a citizen of?”',
          ],
          correct: 1,
        },
        {
          q: 'Applicant estimates of income and assets should be:',
          opts: [
            'Accepted whenever the applicant seems credible',
            'Accepted on an exception basis only',
            'Required for the initial application',
            'Refused in all circumstances',
          ],
          correct: 1,
        },
        {
          q: 'A borrower wants lower closing costs and will accept a higher payment for it. The matching lever is:',
          opts: ['Discount points', 'A larger down payment', 'A lender credit', 'A shorter term'],
          correct: 2,
        },
        {
          q: 'The system of record that holds the pipeline, loan summary, documents, and milestones is the:',
          opts: ['CRM', 'POS', 'LOS', 'AUS'],
          correct: 2,
        },
      ],
    },
    recap: {
      plainLanguage: `The URLA captures a whole financial life, and taking it well means two disciplines at once: complete, document-sourced data in every field, and hard ECOA lines on what may be asked.`,
      facts: [
        `URLA = Fannie Mae <span class="hl">1003</span> · Freddie Mac <span class="hl">65</span> — six forms, Borrower Information Form primary`,
        `Marital status: <span class="hl">married · separated · unmarried</span> — no more`,
        `Family plans: <span class="hl">prohibited</span> · dependents' number + ages: <span class="hl">required</span>`,
        `Docs: <span class="hl">1 mo</span> pay stubs · <span class="hl">2 yrs</span> W-2s + signed returns · 2–3 mo assets`,
        `Four levers: down payment · term · <span class="hl">points</span> · <span class="hl">lender credit</span> — recorded in Section L3`,
        `File of record lives in the <span class="hl">LOS</span>; the borrower works the POS`,
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 03 · The forms package
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'forms-package',
    name: 'The forms package',
    reg: 'Six URLA forms + URAR + LE + CD',
    groups: [
      {
        paras: [
          {
            html: `A loan file has a paper skeleton: nine forms that carry everything the transaction knows. Six of them make up the URLA itself. Three more — the appraisal report and the two TRID disclosures — join it on nearly every file. Knowing which form carries what is the difference between finding an answer in seconds and hunting for it.`,
          },
        ],
      },
      {
        heading: 'the six URLA forms',
        paras: [
          {
            html: `The URLA is <span class="cloze" data-accept='["six","6"]' data-reveal="six">?</span> distinct forms, not one. The <b>Borrower Information Form</b> is the primary — the borrower herself, her employment, income, assets, liabilities, real estate, declarations, and demographics. The <b>Additional Borrower Form</b> covers a second applicant's own information and cross-references the shared sections rather than repeating them.`,
          },
          {
            html: `The <b>Unmarried Addendum</b> exists for the narrow case where unmarried co-borrowers share property rights under a state's civil-union or domestic-partnership law. The <b>Lender Loan Information Form</b> is completed solely by the lender — sections L1 through L4, including L3, where the loan actually being pursued is documented, and L4, the minimum required funds and cash-back math. The <b>Continuation Sheet</b> is the overflow page for anything that didn't fit. And the <b>Supplemental Consumer Information Form</b> — the SCIF, Form <span class="cloze" data-accept='["1103","form 1103"]' data-reveal="1103">?</span> — records homeownership education and counseling completed and the borrower's language preference.`,
          },
        ],
      },
      {
        heading: 'the three that ride along',
        paras: [
          {
            html: `Three more forms complete the package. The <b>Uniform Residential Appraisal Report</b> — the URAR, Fannie Mae Form <span class="cloze" data-accept='["1004","form 1004"]' data-reveal="1004">?</span> — is the appraiser's full account of what the property is worth and why. The <b>Loan Estimate</b>, <span class="cloze" data-accept='["three","3"]' data-reveal="three">?</span> pages, is the cost estimate the law stands behind. The <b>Closing Disclosure</b>, <span class="cloze" data-accept='["five","5"]' data-reveal="five">?</span> pages, is the final accounting the borrower signs off on before settlement.`,
          },
        ],
      },
      {
        heading: 'drill the package',
        paras: [],
        embed: 'learn-forms',
      },
      {
        heading: 'looking one thing up',
        paras: [
          {
            html: `The <a href="/learn/mlo-activities/explorer">form explorer</a> looks up any single form or field in the package.`,
          },
        ],
      },
    ],
    review: {
      flashcards: [
        { peg: 'lender only', topic: 'the URLA forms', q: 'Which URLA form does the borrower never complete, and what lives in it?', a: `The <span class='hl'>Lender Loan Information Form</span> — sections L1–L4, including <span class='hl'>L3</span> (the loan being pursued) and <span class='hl'>L4</span> (minimum required funds and cash back).` },
        { peg: 'the overflow', topic: 'the URLA forms', q: 'Where does information go when it doesn\'t fit its section?', a: `The <span class='hl'>Continuation Sheet</span> — the URLA's overflow page.` },
        { peg: 'the SCIF', topic: 'the URLA forms', q: 'What does the Supplemental Consumer Information Form capture?', a: `<span class='hl'>Homeownership education and counseling</span> completed, and the borrower's <span class='hl'>language preference</span>. Form 1103.` },
        { peg: 'second borrower', topic: 'the URLA forms', q: 'How does the Additional Borrower Form handle sections shared with the primary borrower?', a: `It <span class='hl'>cross-references</span> them — assets, liabilities, real estate, and loan information are not repeated.` },
        { peg: 'the appraisal', topic: 'the ride-alongs', q: 'What is the URAR?', a: `The <span class='hl'>Uniform Residential Appraisal Report</span> — Fannie Mae Form <span class='hl'>1004</span>, the appraiser's full written valuation of the property.` },
      ],
      mcq: [
        {
          q: 'Unmarried co-borrowers in a state with a domestic-partnership property law would complete the:',
          opts: ['Continuation Sheet', 'Unmarried Addendum', 'SCIF', 'Additional Borrower Form'],
          correct: 1,
        },
        {
          q: 'The section documenting the loan the borrower ultimately pursues (L3) sits on the:',
          opts: ['Borrower Information Form', 'Closing Disclosure', 'Lender Loan Information Form', 'Loan Estimate'],
          correct: 2,
        },
        {
          q: 'How many pages are the Loan Estimate and Closing Disclosure, respectively?',
          opts: ['Three and five', 'Five and three', 'Two and four', 'Four and six'],
          correct: 0,
        },
      ],
    },
    recap: {
      plainLanguage: `The file's paper skeleton is nine forms: the six-form URLA plus the appraisal report and the two TRID disclosures. Each has one job, and knowing which form carries what makes the file navigable.`,
      facts: [
        `URLA = <span class="hl">6 forms</span>: Borrower Info · Additional Borrower · Unmarried Addendum · Lender Loan Info · Continuation Sheet · SCIF`,
        `SCIF = Form <span class="hl">1103</span>: education/counseling + language preference`,
        `URAR = Fannie Mae Form <span class="hl">1004</span> — the appraisal report`,
        `Loan Estimate: <span class="hl">3 pages</span> · Closing Disclosure: <span class="hl">5 pages</span>`,
        `L3 (the loan pursued) and L4 (funds math) live on the <span class="hl">lender's</span> form`,
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 04 · Pricing and locking
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'pricing-locking',
    name: 'Pricing and locking',
    reg: 'Par · points · the adjustment stack · the lock',
    definitions: [
      { term: 'Par Pricing', def: 'The current market interest rate offered with nothing added and nothing rebated — no discount points paid by the borrower, no credit generated by the lender.' },
      { term: 'Discount Point', def: 'Up-front interest paid at settlement to secure a lower-than-par rate — a permanent buydown. One point equals one percent of the loan amount.' },
      { term: 'Premium Pricing', def: 'Charging a higher-than-par rate to generate a credit against the borrower\'s settlement fees. The borrower must be aware of the trade, consent to it, and qualify at the higher payment.' },
      { term: 'Lender Credit', def: 'The money a higher-than-par rate generates, applied against the borrower\'s settlement fees.' },
      { term: '2/1 Buydown', def: 'A temporary buydown funded by seller concession: the borrower pays at 2% below the note rate in year one and 1% below in year two, with the conceded funds making the servicer whole; year three the full payment begins.' },
      { term: 'Yield Spread Premium (YSP)', def: 'A premium historically paid to a lender or broker for locking a borrower at an above-par rate. The mechanics survive today as lender-paid compensation and premium pricing.' },
      { term: 'Rate Lock Agreement', def: 'The document the applicant signs describing every term of the rate lock — the rate, the price, the lock period, and its expiration.' },
      { term: 'Pricing Engine (PPE)', def: 'The product-and-pricing engine — the system that takes a loan scenario plus a target price and lock period and returns eligible and ineligible products with per-product pricing. Optimal Blue, LoanSifter, Polly, Lender Price; EPPS inside Encompass.' },
      { term: 'Loan-Level Price Adjustment (LLPA)', def: 'A pricing add-on or credit applied to a product\'s base price for a specific risk attribute — credit score and LTV, occupancy, property type, cash-out, subordinate financing. The stack of them explains why a given borrower prices the way she does.' },
      { term: 'Lock Extension', def: 'Extra days added to an expiring lock, at a price — typically quoted per day or per block of days. Cheaper than relocking a dead lock at worst-case pricing.' },
      { term: 'Float', def: 'Proceeding without locking — the borrower keeps market risk in both directions until she locks.' },
    ],
    groups: [
      {
        paras: [
          {
            html: `The borrower's question is always the same: <i>what's my rate?</i> The honest answer is that there isn't one rate — there's a ladder of them, and each rung has a price. Pricing a loan means choosing a rung, and locking means holding it while the file catches up.`,
          },
        ],
      },
      {
        heading: 'par, discount, and premium',
        paras: [
          {
            html: `<b>Par</b> is the anchor: the market rate a borrower can have with no points paid and no credit generated. Below par costs money — <b>discount points</b>, up-front interest paid at settlement to permanently buy the rate down. One point equals <span class="cloze" data-accept='["one","1","1%","one percent","1 percent"]' data-reveal="one">?</span> percent of the loan amount.`,
          },
          {
            html: `Above par pays money. <b>Premium pricing</b> charges a higher-than-par rate and, in exchange, generates a <b>lender credit</b> that offsets the borrower's settlement fees. Three conditions attach: the borrower must be <span class="cloze" data-accept='["aware","aware of it","informed"]' data-reveal="aware">?</span> of the trade, consent to it, and qualify at the higher payment. The old name for the money an above-par rate generates is the <b>yield spread premium</b>.`,
          },
        ],
      },
      {
        heading: 'the temporary buydown',
        paras: [
          {
            html: `Points buy the rate down permanently. The <b>2/1 buydown</b> buys the payment down temporarily, and the seller funds it as a concession. Year one, the borrower pays as if the rate were <span class="cloze" data-accept='["two","2","2%"]' data-reveal="two">?</span> percent below the note rate; year two, <span class="cloze" data-accept='["one","1","1%"]' data-reveal="one">?</span> percent below; the conceded funds top up each payment so the servicer always receives the full note-rate amount. Year three, the borrower pays the true payment — which is why the qualification question with any temporary buydown is whether she can afford year three, not year one.`,
          },
        ],
      },
      {
        heading: 'the ladder and the target',
        anchor: { file: 'ninja-surfer-on-surfboard-transparent.png', caption: 'riding the market', kind: 'char' },
        paras: [
          {
            html: `Inside the shop, pricing runs through the <b>PPE</b> — the product-and-pricing engine (Optimal Blue, LoanSifter, Polly, Lender Price; Encompass ships its own as EPPS). The originator builds the scenario — purpose, occupancy, property type, state and county, value, loan amount, credit score, ratios, term — and then, before any product appears, sets a <b>target</b>: the desired price and the desired lock period. Pricing is a goal you search toward, not a number you look up.`,
          },
          {
            html: `The search returns two lists. Eligible products show a rate ladder — each rate with its price, its points or credit, and its payment. Ineligible products show <i>why</i> they missed: a loan-limit breach, an occupancy rule, a credit-score floor. The ineligible list teaches guidelines faster than the eligible one, which is why a sloppy scenario is dangerous: a quick-price form that omits the debt ratio silently drops every product that carries a DTI eligibility rule, and the originator never knows those options existed.`,
          },
        ],
      },
      {
        heading: 'the adjustment stack',
        paras: [
          {
            html: `A product's price is not one number. It is a <b>base price</b> plus a stack of <b>loan-level price adjustments</b> — a charge or credit for each risk attribute the investor prices: the credit-score-by-LTV grid, occupancy, property type, cash-out, subordinate financing. Two borrowers asking for the same product on the same day can price a point apart, and the stack is the explanation. Reading a product's adjustment detail — base price, each adjustment, final price — is how an originator answers <i>why does my loan cost this?</i> with something better than a shrug.`,
          },
        ],
        synth: {
          q: `Two borrowers ask for the same 30-year conventional product on the same morning and get prices nearly a point apart. Neither loan is locked yet. Where does the difference come from?`,
          a: `The adjustment stack. Each file starts from the same base price, then takes loan-level price adjustments for its own risk attributes — the credit-score-by-LTV grid, occupancy, property type, cash-out, subordinate financing. Different attributes, different stack, different final price.`,
        },
      },
      {
        heading: 'the lock is a request',
        paras: [
          {
            html: `A lock is not a button that locks. The originator selects a rate and submits a lock <b>request</b>, and the file sits in <span class="cloze" data-accept='["lock pending","pending"]' data-reveal="lock pending">?</span> until the <b>secondary desk</b> accepts it — unless the shop has configured auto-accept. Before the request can even go, the file needs the borrower's <span class="cloze" data-accept='["social security number","ssn"]' data-reveal="SSN">?</span> and an assigned loan officer. Common lock periods run 15, 30, 45, or 60 days, and the accepted lock — rate, price, period, expiration — is written back to the loan file. The borrower signs a <b>rate lock agreement</b> describing all of it.`,
          },
          {
            html: `Know the lock's real edges. It holds the <span class="cloze" data-accept='["rate and points","rate and the points","the rate and points"]' data-reveal="rate and points">?</span> against market movement — nothing else. It does not cap lender fees, and it is not an approval. And it protects against the market, not against the file: a material change — a low appraisal that moves the LTV, a credit-score drop, a program switch — re-runs the adjustment stack and re-prices the locked loan.`,
          },
          {
            html: `Locks die on a calendar. If closing slips past expiration, a <b>lock extension</b> buys days at a price; letting it lapse entirely usually means relocking at worst-case pricing. The alternative to all of it is to <b>float</b> — stay unlocked and keep market risk in both directions.`,
          },
        ],
        synth: {
          q: `A borrower locked ten days ago. Today her appraisal comes in low, moving the LTV from 78% to 85%. She insists her rate is locked. What actually happens to her pricing, and why?`,
          a: `The loan re-prices. A lock protects the rate and points against market movement, not against changes in the file itself — a material change like a higher LTV re-runs the adjustment stack, and the locked price adjusts to the new risk.`,
        },
      },
      {
        heading: 'who pays the originator',
        paras: [
          {
            html: `Underneath every ladder sits a compensation choice made before the loan is priced. With <b>lender-paid</b> compensation, the originator's pay is built into the rate — the borrower sees a retail price and writes no separate check for origination. With <b>borrower-paid</b> compensation, the pay is stripped out of the pricing: the borrower sees a wholesale rate and pays the origination fee directly, in cash at closing. Same loan, same market — a different-looking sheet, and an originator should be able to explain which one a borrower is looking at.`,
          },
        ],
      },
      {
        paras: [],
        embed: 'deal-desk',
      },
    ],
    review: {
      flashcards: [
        { peg: 'the trade', topic: 'par and points', q: 'What does one discount point cost, and what does it buy?', a: `<span class='hl'>1% of the loan amount</span>, paid at settlement — up-front interest that permanently buys the rate below par.` },
        { peg: 'three conditions', topic: 'par and points', q: 'Premium pricing is legitimate only when the borrower…', a: `Is <span class='hl'>aware</span> of the trade, <span class='hl'>consents</span> to it, and <span class='hl'>qualifies at the higher payment</span>.` },
        { peg: 'year three', topic: 'buydowns', q: 'Permanent vs. temporary buydown — and the qualification question a 2/1 raises?', a: `Points buy the rate down <span class='hl'>permanently</span>; a 2/1 buydown lowers the <span class='hl'>payment temporarily</span> on seller-conceded funds. The question is whether the borrower can afford <span class='hl'>year three</span> — the full payment.` },
        { peg: 'the gate', topic: 'the lock', q: 'What must be on the file before a lock request can be submitted?', a: `The borrower's <span class='hl'>SSN</span> and an <span class='hl'>assigned loan officer</span>. Then the request sits <span class='hl'>Lock pending</span> until the secondary desk accepts.` },
        { peg: 'the edges', topic: 'the lock', q: 'What does a rate lock NOT protect?', a: `<span class='hl'>Lender fees</span>, <span class='hl'>final approval</span>, and the file itself — a material change (low appraisal, score drop, program switch) <span class='hl'>re-prices</span> a locked loan.` },
        { peg: 'two sheets', topic: 'compensation', q: 'Lender-paid vs. borrower-paid compensation — what does the borrower see?', a: `Lender-paid: commission inside the rate — a <span class='hl'>retail</span> price, no separate origination check. Borrower-paid: a <span class='hl'>wholesale</span> rate plus an origination fee paid directly.` },
      ],
      mcq: [
        {
          q: 'A rate lock protects the borrower against:',
          opts: [
            'Increases in lender fees before closing',
            'Market movement in the rate and points during the lock period',
            'The loan being declined in underwriting',
            'Changes to her own credit score',
          ],
          correct: 1,
        },
        {
          q: 'On a $400,000 loan, two discount points cost:',
          opts: ['$4,000', '$2,000', '$8,000', '$800'],
          correct: 2,
        },
        {
          q: 'In a 2/1 buydown with a 7% note rate, the borrower\'s year-two payment is figured at:',
          opts: ['5%', '6%', '7%', '8%'],
          correct: 1,
        },
        {
          q: 'In a pricing engine, the desired price and lock period are entered:',
          opts: [
            'After choosing a product from the eligible list',
            'Only when the secondary desk requests them',
            'Before the search returns any products',
            'Only for government loans',
          ],
          correct: 2,
        },
        {
          q: 'A quick-price scenario omits the borrower\'s DTI. The engine will:',
          opts: [
            'Refuse to run the search',
            'Assume a 43% DTI',
            'Return all products with a warning',
            'Silently drop products that carry a DTI eligibility rule',
          ],
          correct: 3,
        },
      ],
    },
    recap: {
      plainLanguage: `There is no single rate — there's a ladder, where going below par costs points and going above generates credit. A pricing engine turns a full scenario plus a target into eligible products with adjustment stacks, and a lock is a request that holds the rate and points — nothing more — while the file catches up.`,
      facts: [
        `1 discount point = <span class="hl">1% of the loan amount</span> — permanent buydown`,
        `Premium pricing: borrower <span class="hl">aware · consents · qualifies</span> at the higher payment`,
        `2/1 buydown: pay at <span class="hl">−2%</span> yr 1, <span class="hl">−1%</span> yr 2, full payment yr 3 — seller-funded`,
        `Price = <span class="hl">base − adjustments</span> (FICO×LTV · occupancy · property type · cash-out · subordinate)`,
        `Lock request needs <span class="hl">SSN + assigned LO</span> → Lock pending → accepted by the secondary desk`,
        `A lock holds <span class="hl">rate + points</span> only — a material file change re-prices it`,
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 05 · Disclosures on the clock
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'disclosures',
    name: 'Disclosures on the clock',
    reg: 'TRID timing · tolerances · the disclosure calendar',
    definitions: [
      { term: 'General Business Day', def: 'A day on which the lender is open to the public and carrying out substantially all of its business functions. Governs issuance deadlines, like the three days to deliver a Loan Estimate.' },
      { term: 'Precise Business Day', def: 'Every day of the week except Sundays and federal holidays — Saturdays count. Governs the waiting periods before a loan may close.' },
      { term: 'Tolerance', def: 'The TRID thresholds defining how much a settlement fee may increase after the Loan Estimate, in the absence of a valid change of circumstance.' },
      { term: 'Valid Change of Circumstance', def: 'One of five recognized conditions — from an extraordinary event to a title company shutting down — that lets a fee be re-disclosed at its true amount.' },
      { term: 'Mailbox Rule', def: 'A disclosure sent by standard mail or email is treated as received three precise business days after it is sent, unless the borrower confirms receipt sooner.' },
      { term: 'Goodbye Letter', def: 'The releasing servicer\'s transfer-of-servicing notice, issued no later than 15 days before a servicing transfer.' },
      { term: 'Welcome Letter', def: 'The receiving servicer\'s notice, issued no later than 15 days after the transfer date. For 60 days after a transfer, no late fees may be charged and no adverse credit reported on a payment sent to the old servicer.' },
      { term: 'Cure', def: 'The fix for a tolerance violation discovered at or after closing: a refund of the overage plus a corrected Closing Disclosure, no later than 60 calendar days after consummation.' },
      { term: 'Bona Fide Financial Emergency', def: 'The only basis on which a borrower may waive the TRID waiting periods — in writing, and with the lender\'s approval.' },
    ],
    groups: [
      {
        paras: [
          {
            html: `The moment the six items made an application, a calendar started. Every disclosure the borrower receives from here to the closing table has a deadline attached, and the exam tests those deadlines relentlessly — which document, triggered by what, due when, counted in which kind of day.`,
          },
        ],
      },
      {
        heading: 'two kinds of business day',
        anchor: { file: 'jester-checking-stopwatch-transparent.png', caption: 'the clock', kind: 'char' },
        paras: [
          {
            html: `TRID counts time in two currencies. A <b>general business day</b> is a day the lender is open to the public for substantially all of its business — those govern issuance deadlines. A <b>precise business day</b> is every day except <span class="cloze" data-accept='["sundays and federal holidays","sunday and federal holidays","sundays & federal holidays"]' data-reveal="Sundays and federal holidays">?</span> — Saturdays count — and those govern the waiting periods before a loan may close. Get the currency wrong and every timing answer that follows comes out wrong with it.`,
          },
        ],
      },
      {
        heading: 'the loan estimate clock',
        paras: [
          {
            html: `The Loan Estimate goes out within three <i>general</i> business days of application — unit 01's line, seen now from the calendar's side. Once it is issued, the loan may not close for <span class="cloze" data-accept='["seven","7"]' data-reveal="seven">?</span> <i>precise</i> business days, a floor that exists so no one is rushed from first estimate to closing table. The LE's non-interest fees stay honored for ten days, and until the borrower expresses <b>intent to proceed</b>, the credit report remains the only chargeable fee.`,
          },
        ],
      },
      {
        heading: 'the three tolerance buckets',
        visual: 'tolerance-buckets',
        paras: [
          {
            html: `Once disclosed, a fee's room to grow depends on whose hands it is in. Fees paid to the creditor, the broker, or an affiliate of either; fees paid to a provider the lender <i>required</i>; and transfer taxes carry <b>zero tolerance</b> — the borrower pays not a dollar more than disclosed. Recording fees and third-party fees where the borrower picked from the lender's recommended list may rise, in aggregate, up to <span class="cloze" data-accept='["10","ten","10%","ten percent"]' data-reveal="10">?</span> percent — the ebook frames it as the borrower paying at most 110% of the original figure. Services the borrower shopped for on her own, plus prepaids and per-diem interest, carry no tolerance at all.`,
          },
          {
            html: `Anything above a bucket's ceiling is the lender's to absorb — unless a valid change of circumstance moved the fee, in which case the borrower pays the true amount.`,
          },
        ],
      },
      {
        heading: 'valid changes of circumstance',
        paras: [
          {
            html: `Five conditions qualify: an extraordinary event beyond anyone's control; information the lender relied on proving inaccurate or changing after disclosure; new and relevant information surfacing after disclosure; a natural disaster or act of God; and the title company intended for the transaction terminating operations. When one occurs, a revised Loan Estimate must be issued within <span class="cloze" data-accept='["three","3"]' data-reveal="three">?</span> general business days of identifying it, and the affected fees re-set to their actual amounts.`,
          },
        ],
      },
      {
        heading: 'the revised estimate\'s waiting period',
        anchor: { file: 'mail-carrier-holding-cotton-candy-transparent.png', caption: 'mailbox rule', kind: 'char' },
        paras: [
          {
            html: `A revised Loan Estimate restarts a clock of its own: the loan may not consummate until at least <span class="cloze" data-accept='["four","4"]' data-reveal="four">?</span> precise business days after the borrower receives it. Sent by mail or email, receipt is presumed three precise business days after sending — the <b>mailbox rule</b> — which stretches the wait to seven unless the borrower confirms receipt sooner. And a revised Loan Estimate may never be issued after the Closing Disclosure has gone out.`,
          },
        ],
        synth: {
          q: `A valid change of circumstance is identified on Monday, and the lender emails a revised Loan Estimate the same day. The borrower never confirms receipt. What two clocks now run, and when may the loan consummate?`,
          a: `The revised LE itself had to go out within three general business days of the change — done. Because it was emailed without confirmed receipt, the mailbox rule presumes receipt three precise business days after sending, and consummation must wait four more precise business days after that — effectively seven precise business days from the send.`,
        },
      },
      {
        heading: 'the closing disclosure clock',
        paras: [
          {
            html: `The Closing Disclosure — the loan's final accounting — must be <i>received</i> no later than <span class="cloze" data-accept='["three","3"]' data-reveal="three">?</span> precise business days before settlement. Mailed or emailed, the mailbox rule stretches that to <span class="cloze" data-accept='["six","6"]' data-reveal="six">?</span>, unless receipt is confirmed sooner. The borrower also receives a final Closing Disclosure at the settlement table, and on rescindable transactions every property owner gets copies — two each, or one if delivered electronically.`,
          },
          {
            html: `Three changes — and only three — void the issued CD and start a fresh three-precise-day wait: the APR moving by more than <span class="cloze" data-accept='["0.125","1/8","one-eighth",".125","0.125%"]' data-reveal="0.125%">?</span> on a regular (fixed-rate) transaction or more than 0.25% on an irregular one; the loan product changing; and a <span class="cloze" data-accept='["prepayment penalty","a prepayment penalty","prepay penalty"]' data-reveal="prepayment penalty">?</span> being added. Anything else can simply appear corrected on the CD presented at closing, tolerance rules permitting. Every waiting period in this unit can be waived only for a bona fide financial emergency, in writing, with the lender's approval.`,
          },
        ],
        synth: {
          q: `At the final walkthrough the lender discovers the CD understated the transfer tax, and separately the final APR came in 0.2% higher than disclosed on this fixed-rate loan. Which problem forces a new three-day wait, and what does the other one cost the lender?`,
          a: `The APR moved more than 0.125% on a regular transaction, so a revised CD must be issued and three more precise business days must pass. The transfer tax is a zero-tolerance fee, so the lender absorbs the overage — a cure, not a delay.`,
        },
      },
      {
        heading: 'after the closing',
        paras: [
          {
            html: `Errors discovered after settlement still owe the borrower paper. Non-numerical clerical errors get a corrected Closing Disclosure, and tolerance violations get the refund plus the corrected CD — both within <span class="cloze" data-accept='["60","sixty","60 days","60 calendar days"]' data-reveal="60">?</span> calendar days of consummation.`,
          },
        ],
      },
      {
        heading: 'the application package',
        paras: [
          {
            html: `A cluster of disclosures shares the LE's three-business-day deadline from application. The <b>HUD Home Loan Toolkit</b> — purchase transactions only. The <b>homeownership counseling disclosure</b> — every application, listing no fewer than <span class="cloze" data-accept='["10","ten"]' data-reveal="ten">?</span> HUD-approved counseling agencies near the applicant. The <b>mortgage servicing disclosure statement</b> — loans outside TRID's scope. The <b>affiliated business arrangement disclosure</b> — when a covered referral is made at application; made later, it's due at the time of the referral. The <b>CHARM booklet</b> and the <b>initial ARM program disclosure</b> — closed-end adjustable-rate applications. The <b>credit score disclosure</b> under FACTA. And for a higher-priced loan, the <b>HPML notice</b> of the borrower's right to the appraisal.`,
          },
        ],
      },
      {
        heading: 'decisions, transfers, and the table',
        paras: [
          {
            html: `ECOA gives the lender <span class="cloze" data-accept='["30","thirty"]' data-reveal="30">?</span> calendar days from application to answer with one of three letters: a notice of action taken, an adverse action notice, or a notice of incomplete application. The appraisal copy is due promptly — and no later than three business days before settlement, waivable in writing. Servicing transfers bracket the move with a goodbye letter at least <span class="cloze" data-accept='["15","fifteen"]' data-reveal="15">?</span> days before and a welcome letter within 15 days after, with a 60-day grace window in which a payment sent to the old servicer draws no late fee and no adverse credit reporting.`,
          },
          {
            html: `The settlement table has its own stack: the initial escrow account statement (first analysis due within <span class="cloze" data-accept='["45","forty-five","forty five"]' data-reveal="45">?</span> days, then annually), the right-to-rescind notice on rescindable loans, the GLBA privacy and opt-out notices, the E-Sign notice of the right to paper, the PMI notices, and — for high-cost loans — a disclosure due at least three business days <i>before</i> settlement.`,
          },
        ],
      },
      {
        heading: 'the delivery record',
        paras: [
          {
            html: `All of it moves through the <b>doc engine</b> — the system that generates the LE, the CD, and the initial package — and an e-sign platform that captures when each document went out and when the borrower opened it. Those timestamps are the compliance record: when a timing question is ever raised, the answer is whatever the delivery log says. Documents may go out face to face, by email under E-Sign's consent rules, by standard mail, or by overnight delivery — and which method was used decides whether the mailbox rule adds days.`,
          },
        ],
      },
    ],
    review: {
      flashcards: [
        { peg: 'two currencies', topic: 'business days', q: 'General vs. precise business day — and which clocks use which?', a: `General = lender <span class='hl'>open for substantially all business</span> (issuance deadlines). Precise = every day but <span class='hl'>Sundays and federal holidays</span> (waiting periods). Saturdays count as precise days.` },
        { peg: 'five changes', topic: 'changed circumstance', q: 'Name the five valid changes of circumstance.', a: `<span class='hl'>Extraordinary event</span> · relied-on info proves <span class='hl'>inaccurate or changes</span> · <span class='hl'>new relevant info</span> surfaces · <span class='hl'>natural disaster</span> / act of God · the intended <span class='hl'>title company terminates</span> operations.` },
        { peg: 'three triggers', topic: 'the CD', q: 'Which three changes void an issued Closing Disclosure?', a: `APR off by more than <span class='hl'>0.125%</span> (0.25% irregular) · the <span class='hl'>loan product changes</span> · a <span class='hl'>prepayment penalty is added</span>. Each restarts a three-precise-day wait.` },
        { peg: 'zero bucket', topic: 'tolerances', q: 'Which fees may not increase at all after the Loan Estimate?', a: `Fees to the <span class='hl'>creditor, broker, or their affiliates</span>; fees to <span class='hl'>lender-required providers</span>; and <span class='hl'>transfer taxes</span>.` },
        { peg: 'the letters', topic: 'servicing', q: 'The servicing-transfer timeline and its grace protection?', a: `Goodbye letter ≥ <span class='hl'>15 days before</span>, welcome letter ≤ <span class='hl'>15 days after</span>; for <span class='hl'>60 days</span>, payments to the old servicer draw no late fee and no adverse reporting.` },
        { peg: 'the waiver', topic: 'timing', q: 'When can TRID\'s waiting periods be waived?', a: `Only for a <span class='hl'>bona fide financial emergency</span> — the borrower requests it <span class='hl'>in writing</span> and the lender approves.` },
        { peg: 'the log', topic: 'the software', q: 'When a disclosure-timing dispute arises, what settles it?', a: `The <span class='hl'>doc engine and e-sign delivery timestamps</span> — the record of when each document was sent and opened.` },
      ],
      mcq: [
        {
          q: 'A Closing Disclosure is emailed and the borrower never confirms receipt. Settlement may occur no sooner than:',
          opts: ['Three precise business days after sending', 'Six precise business days after sending', 'Ten calendar days after sending', 'The next business day'],
          correct: 1,
        },
        {
          q: 'Which fee increase requires only a cure, not a new waiting period?',
          opts: [
            'The APR rising 0.3% on a fixed-rate loan',
            'A prepayment penalty added at the table',
            'A zero-tolerance fee that came in over the disclosed amount',
            'The loan switching from fixed to adjustable',
          ],
          correct: 2,
        },
        {
          q: 'The homeownership counseling disclosure must list at least:',
          opts: ['Three agencies', 'Five agencies', 'Ten HUD-approved agencies', 'One agency per county'],
          correct: 2,
        },
        {
          q: 'A tolerance violation is discovered two weeks after closing. The lender must refund the overage and issue a corrected CD within:',
          opts: ['30 calendar days of discovery', '60 calendar days of consummation', '90 calendar days of consummation', '10 business days of discovery'],
          correct: 1,
        },
        {
          q: 'The HUD Home Loan Toolkit is issued within three business days of application on:',
          opts: ['Every application', 'Refinances only', 'Purchase transactions only', 'ARM applications only'],
          correct: 2,
        },
      ],
    },
    recap: {
      plainLanguage: `From application to closing, every disclosure runs on a deadline — issuance deadlines in general business days, waiting periods in precise ones — and the tolerance buckets decide who absorbs a fee that grew.`,
      facts: [
        `Precise business day = all but <span class="hl">Sundays + federal holidays</span>; waiting periods use precise days`,
        `LE → closing floor: <span class="hl">7 precise days</span> · revised LE: received + <span class="hl">4</span> · CD: received + <span class="hl">3</span> (mail/email adds 3)`,
        `CD re-triggers: APR > <span class="hl">0.125%</span> (0.25% irregular) · product change · prepayment penalty added`,
        `Tolerances: <span class="hl">0%</span> lender/required/transfer tax · <span class="hl">10%</span> aggregate recording + lender-list picks · unlimited if borrower-shopped`,
        `Cure window: <span class="hl">60 calendar days</span> from consummation · ECOA decision letters: <span class="hl">30 days</span>`,
        `Goodbye ≥ <span class="hl">15 before</span> · welcome ≤ 15 after · 60-day no-late-fee grace · escrow analysis ≤ <span class="hl">45 days</span>, then annual`,
      ],
    },
  },
];

export default unitsA;

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
        paras: [
          {
            html: `The fastest way to learn the form is to watch it be filled in. Maya Okonkwo is a first-time buyer with a condo under contract. Her application is worked end to end below — every section, her answers inked in, the judgment calls flagged where a rule bites. Switch her off to read the form blank.`,
          },
        ],
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

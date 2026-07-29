import type { SectionUnit } from '@/lib/section';

// Module 6 — MLO Activities, units 06–11: the back half of the origination arc —
// verification → ratios and ability to repay → the property → underwriting →
// closing and funding → the math drill. Same recall-gradient shape and
// reinforcement rule as units 01–05 (m6-units-a.ts). Unit 11 deliberately
// re-drills calculations taught in place across units 04–10 — that is its job.
//
// Grounded in the ebook's Module 6 (pp. 425–526) and the 2026 cheat sheet.
// The derogatory-event waiting periods and PMI coverage grid follow the ebook's
// Fannie Mae tables; PMI factors and desk prices are illustrative sample data.

const unitsB: SectionUnit[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // 06 · Proving income, assets, and credit
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'qualification',
    name: 'Proving income, assets, and credit',
    reg: 'Verification · reserves · gifts · the credit report',
    definitions: [
      { term: 'Reserves', def: "Assets left over after closing, measured in months' worth of mortgage payments — the cushion a borrower could live on if income stopped." },
      { term: 'Sourcing', def: 'Documenting where money came from. A large, unexplained deposit is useless to the file — and a fraud flag — until its source is shown to be legitimate.' },
      { term: 'Seasoning', def: "Money that has sat in the borrower's account long enough (typically two months of statements) that it needs no further explanation." },
      { term: 'Gift Letter', def: "The donor's signed statement of the gift amount, the transfer date, the relationship, and — the line that matters — that no repayment is required or expected." },
      { term: 'Gift of Equity', def: 'A seller accepting less than the sale price and gifting the difference to the buyer for down payment and settlement fees. Only donors eligible for standard gifts may give one.' },
      { term: 'Verification of Deposit (VOD)', def: "A form the borrower's financial institution completes and returns to the lender, substituting for asset statements the borrower can't produce." },
      { term: 'Tri-Merge Credit Report', def: 'One report merging the files of all three bureaus — Equifax, Experian, and TransUnion — with a score from each.' },
      { term: 'Representative Credit Score', def: 'The score underwriting actually uses: the middle of three scores, the lower of two, and across multiple applicants, the lowest of their middle scores.' },
      { term: 'Rapid Re-Score', def: "A paid, fast reissue of the borrower's scores after a credit-report correction — for the current transaction, when there's no time to wait weeks for scores to catch up." },
      { term: 'Non-Traditional Credit', def: 'A credit history assembled from rent, utilities, and other recurring payments for an applicant with too few scores to underwrite conventionally.' },
    ],
    groups: [
      {
        paras: [
          {
            html: `The application is a set of claims. This stage turns claims into proof: every income figure, every account balance, and every line of the credit history gets documented, verified, and — where it falls short — explained. The underwriter decides on evidence, and this unit is about what counts as evidence.`,
          },
        ],
      },
      {
        heading: 'assets, at their real value',
        paras: [
          {
            html: `For checking, savings, and money market accounts, the file uses the <b>ending balance of the most recent statement</b> — nothing older, nothing hoped-for. When statements can't be produced, a <b>verification of deposit</b> completed by the bank substitutes.`,
          },
          {
            html: `Mutual funds and retirement accounts are jumpier, so they carry a discount rule. If the borrower is liquidating them to close, she must show receipt of the liquidated funds — unless the face value of at least one account reaches <span class="cloze" data-accept='["120","120%","one hundred twenty"]' data-reveal="120%">?</span> of the total funds needed to close, in which case statement face value stands on its own. Retirement funds used solely for <b>reserves</b> count at 100% of face value.`,
          },
        ],
      },
      {
        heading: 'reserves',
        anchor: { file: 'cash-pyramid-in-glass-display-case-transparent.png', caption: 'the cushion', kind: 'char' },
        paras: [
          {
            html: `Reserves are what's left after the wire goes out, counted in months of the new mortgage payment. A borrower with $100,000, a $50,000 cost to close, and a $1,000 payment has <span class="cloze" data-accept='["50","fifty"]' data-reveal="50">?</span> months of reserves — and an underwriter who can picture her surviving a job loss.`,
          },
          {
            html: `How many months a file needs depends on the property and the program. Conventional: a primary residence typically wants <span class="cloze" data-accept='["two","2"]' data-reveal="two">?</span> months (up to six), a vacation home three to four, an investment property <span class="cloze" data-accept='["six","6"]' data-reveal="six">?</span>. VA and FHA ask nothing on one-to-two-unit properties; on three-to-four units VA wants six months and FHA <span class="cloze" data-accept='["three","3"]' data-reveal="three">?</span>.`,
          },
        ],
      },
      {
        heading: 'the deposit that needs a story',
        paras: [
          {
            html: `A large deposit that the statements don't explain stops the file. It has to be <b>sourced</b> — a paper trail showing where it came from — because until it is, it could be an undisclosed loan or someone else's money staged for closing. Money that has sat through the full statement window is <b>seasoned</b> and needs no story. Unexplained deposits also sit at the top of every fraud-detection list, which is where the ethics module picks them up.`,
          },
        ],
      },
      {
        heading: 'gifts, and who may give them',
        paras: [
          {
            html: `Gift funds are allowed on primary and secondary residences — never on <span class="cloze" data-accept='["investment","investment properties","an investment property","investment property"]' data-reveal="investment">?</span> properties. The donor must be a relative by blood, marriage, adoption, or legal guardianship, or someone with a documented family-type relationship: a domestic partner, a fiancé or fiancée, a former relative, a godparent. What a donor may never be is an interested party — the builder, the developer, the real estate agent.`,
          },
          {
            html: `Every gift needs a <b>gift letter</b>: the dollar amount, the transfer date, the donor's name, address, phone, and relationship — and the statement that <span class="cloze" data-accept='["no repayment","repayment","no repayment is required","none"]' data-reveal="no repayment">?</span> is required or expected. The donor should also expect to document the gift's source.`,
          },
          {
            html: `How much of the deal a gift may carry has one conventional wrinkle. On a one-unit primary residence, gifts can cover everything at any LTV. But above 80% LTV on a two-to-four-unit primary or a second home, the borrower must put in at least <span class="cloze" data-accept='["5","5%","five","five percent"]' data-reveal="5%">?</span> of the purchase price from her own funds. FHA has no such wrinkle — a gift may satisfy the entire cost to close. A <b>gift of equity</b> — the seller taking less and gifting the difference — follows the same donor rules, and the seller-as-donor is allowed there.`,
          },
        ],
        synth: {
          q: `A first-time buyer's real estate agent — who is also her aunt — offers to gift her $20,000 toward the down payment on a duplex she'll live in, at 88% LTV. Two problems and one requirement stand in the way. Name them.`,
          a: `An interested party to the transaction — the agent — may not be a gift donor, even as a relative. On a two-to-four-unit primary residence above 80% LTV, the borrower must also contribute at least 5% of the price from her own funds. And any acceptable gift would need a signed gift letter stating no repayment is required, with the amount, date, and relationship documented.`,
        },
      },
      {
        heading: 'liabilities',
        paras: [
          {
            html: `The debts side of the file comes off the credit report and the application together: open-end revolving accounts at their minimum payments, closed-end installment loans at their fixed payments, leases, and court-ordered obligations — alimony, child support, separate maintenance. An installment debt with only a handful of payments left — the common line is <span class="cloze" data-accept='["10","ten"]' data-reveal="ten">?</span> months or fewer — can generally be excluded from the ratios. What the liabilities become is the numerator's back half: they flow straight into the debt ratio the next unit computes.`,
          },
        ],
      },
      {
        heading: 'income that counts',
        paras: [
          {
            html: `Qualifying income has two tests: it's documented, and it's likely to continue. The baseline is a <span class="cloze" data-accept='["two-year","two year","2-year","2 year","two years","2"]' data-reveal="two-year">?</span> history — W-2s and signed federal returns — with the recent pay stubs proving it's still flowing. Self-employed borrowers bring two years of business returns. Variable income — overtime, bonus, commission — qualifies only with its own two-year track record, averaged, and a declining trend gets averaged conservatively or cut.`,
          },
          {
            html: `Fixed income — Social Security, pensions, disability — is proven with the <b>award letter</b> plus six months to a year of receipt. Employment gaps need a written explanation; a new job needs the offer and a start close enough to closing to rely on. And behind all of it sits the IRS: a signed <b>4506-C</b> lets the lender pull transcripts and check the returns in the file against the returns the government has.`,
          },
          {
            html: `Ten or so days before settlement, the processor runs a <b>verbal verification of employment</b> — a phone call to the employer, independently sourced number, one question: does this person still work there. A yes keeps the closing date.`,
          },
        ],
      },
      {
        heading: 'reading the credit report',
        paras: [
          {
            html: `The credit pull is a <b>tri-merge</b>: one report, all three bureaus, three scores. Underwriting uses the <b>representative score</b> — the <span class="cloze" data-accept='["middle","the middle","middle score"]' data-reveal="middle">?</span> of three scores, or the lower of two. With multiple applicants, each person's middle score is found and the <span class="cloze" data-accept='["lowest","the lowest"]' data-reveal="lowest">?</span> of those governs the file. One exception: a manually underwritten conventional loan with multiple applicants uses the <b>average median score</b> — average the middle scores instead of taking the worst.`,
          },
          {
            html: `Scores age out: the report can be no more than <span class="cloze" data-accept='["four","4","4 months","four months"]' data-reveal="four">?</span> months old when the note is signed, or it gets re-pulled — and a re-pull can re-price the loan. The pull itself requires the borrower's permission and a permissible purpose; the application supplies both, and before an application exists, a signed <b>Credit Report Authorization and Release</b> does.`,
          },
        ],
      },
      {
        heading: 'fixing what the report gets wrong',
        paras: [
          {
            html: `Four repair tools, in rising order of speed. A <b>direct dispute</b> with the bureau: the creditor has <span class="cloze" data-accept='["30","thirty","30 days"]' data-reveal="30">?</span> days to justify the tradeline or it comes off — but scores can take weeks to catch up. A <b>tradeline verification</b> through the repository fixes one line for this transaction only. A <b>rapid re-score</b> reissues the scores fast, for this transaction only, at real cost. And the <b>full factual</b> — an investigative report — re-verifies everything through an interview. The transaction-only fixes share a catch: the permanent record still has to be corrected with the bureaus.`,
          },
          {
            html: `Derogatory items that are real, not errors, get a <b>letter of explanation</b> — written by the applicant, addressing each item, with documentation where it exists. You may coach what needs addressing. You may never draft it for them.`,
          },
        ],
      },
      {
        heading: 'when credit broke badly',
        paras: [
          {
            html: `Major derogatory events carry waiting periods before conventional financing, each shortened by documented extenuating circumstances. Chapter 7 or 11 bankruptcy: <span class="cloze" data-accept='["four","4","4 years","four years"]' data-reveal="four">?</span> years, or two with extenuating circumstances. Chapter 13: two years from discharge or four from dismissal — two either way with extenuating circumstances. More than one filing inside seven years: five years from the most recent. A <b>foreclosure</b> is the heaviest: <span class="cloze" data-accept='["seven","7","7 years","seven years"]' data-reveal="seven">?</span> years, or three with extenuating circumstances plus limits — 90% maximum LTV, primary-residence purchase or limited cash-out only. The gentler exits — deed-in-lieu, pre-foreclosure sale, mortgage charge-off — wait four years, or two with extenuating circumstances.`,
          },
          {
            html: `Every one of these paths also requires re-established, clean traditional credit. An applicant with too little score history to underwrite at all can build a <b>non-traditional credit</b> file — rent, utilities, recurring obligations — though the products that accept one narrow considerably.`,
          },
        ],
        synth: {
          q: `Applicants Rosa (scores 688, 712, 745) and Dean (scores 655, 680, 702) apply together for a conventional loan through automated underwriting. Which single score does the file run on, and why?`,
          a: `680. Each applicant's representative score is the middle of their three — 712 for Rosa, 680 for Dean — and with multiple applicants the lowest middle score governs. Only a manually underwritten conventional file would average the two middles instead.`,
        },
      },
    ],
    review: {
      flashcards: [
        { peg: 'face value', topic: 'assets', q: 'When do mutual-fund or retirement statements count at face value for funds to close?', a: `When at least one account's face value reaches <span class='hl'>120% of the total funds needed to close</span> — otherwise the borrower must show receipt of liquidation. For reserves only, retirement funds count at <span class='hl'>100%</span>.` },
        { peg: 'the months', topic: 'reserves', q: 'Reserve guidelines by occupancy and program?', a: `Conventional: primary <span class='hl'>2</span> (up to 6) · vacation <span class='hl'>3–4</span> · investment <span class='hl'>6</span> months. VA & FHA: none on 1–2 units; 3–4 units need <span class='hl'>6 (VA)</span> / <span class='hl'>3 (FHA)</span>.` },
        { peg: 'the donors', topic: 'gifts', q: 'Who may give gift funds — and who never may?', a: `Relatives by <span class='hl'>blood, marriage, adoption, or guardianship</span>; domestic partners, fiancé(e)s, former relatives, godparents. Never an <span class='hl'>interested party</span> — builder, developer, or agent.` },
        { peg: 'four fixes', topic: 'credit repair', q: 'The four credit-correction tools?', a: `<span class='hl'>Direct dispute</span> (30 days, permanent) · <span class='hl'>tradeline verification</span> · <span class='hl'>rapid re-score</span> · <span class='hl'>full factual</span> — the last three fix this transaction only.` },
        { peg: 'the wait', topic: 'derogatories', q: 'Conventional waiting periods: Chapter 7 · foreclosure · deed-in-lieu?', a: `Chapter 7: <span class='hl'>4 years</span> (2 EC) · foreclosure: <span class='hl'>7 years</span> (3 EC, with 90% LTV + primary purchase limits) · deed-in-lieu / short sale / charge-off: <span class='hl'>4 years</span> (2 EC). All require re-established credit.` },
        { peg: 'ten days out', topic: 'verification', q: 'What happens ten days before settlement?', a: `The processor's <span class='hl'>verbal verification of employment</span> — a call to the employer at an independently confirmed number to hear the borrower still works there.` },
        { peg: 'the pull', topic: 'the software', q: 'What does the tri-merge feed into the file?', a: `Scores, tradelines, inquiries, and public records from <span class='hl'>Equifax, Experian, and TransUnion</span> — and the liabilities flow into the file to become the <span class='hl'>denominator's back half</span> of the debt ratio.` },
      ],
      mcq: [
        {
          q: 'A borrower closes with $36,000 left in savings, and her new PITI is $2,400. Her reserves are:',
          opts: ['36 months', '18 months', '15 months', '12 months'],
          correct: 2,
        },
        {
          q: 'Which gift arrangement is acceptable on a conventional loan?',
          opts: [
            'The listing agent gifts $10,000 to the buyer',
            'The builder credits the down payment as a “gift”',
            "The borrower's godmother gifts the entire down payment on a one-unit primary residence at 95% LTV",
            'A gift covers the down payment on an investment condo',
          ],
          correct: 2,
        },
        {
          q: 'An applicant has exactly two credit scores: 690 and 655. Underwriting uses:',
          opts: ['690', '655', 'The average, 672.5', 'Neither — two scores are unusable'],
          correct: 1,
        },
        {
          q: 'Commission income qualifies when:',
          opts: [
            'The employer confirms it verbally',
            'It shows a two-year history and is averaged',
            'The most recent month is annualized',
            'The borrower writes a letter projecting it',
          ],
          correct: 1,
        },
        {
          q: 'A $9,000 deposit appears on last month\'s statement with no explanation. The file needs:',
          opts: [
            'Nothing — the money is in the account',
            'The deposit sourced with a documented paper trail',
            'A rapid re-score',
            'A larger down payment',
          ],
          correct: 1,
        },
      ],
    },
    recap: {
      plainLanguage: `Every claim on the application becomes evidence here: statements at real value, reserves in months, gifts from eligible donors with a no-repayment letter, a two-year income record, and one representative credit score — with repair tools and waiting periods when the report disappoints.`,
      facts: [
        `Reserves = months of the payment left after closing · conv: <span class="hl">2 / 3–4 / 6</span> (primary / vacation / investment)`,
        `Funds-to-close at face value only if one account ≥ <span class="hl">120%</span> of cash to close`,
        `Gifts: never on <span class="hl">investment</span> · 2–4-unit primary or 2nd home over 80% LTV → <span class="hl">5% own funds</span> · letter says <span class="hl">no repayment</span>`,
        `Representative score: <span class="hl">middle of 3</span> · lower of 2 · lowest middle across applicants · ≤ <span class="hl">4 months old</span> at note`,
        `Dispute: creditor has <span class="hl">30 days</span> to justify or remove`,
        `Waits: BK7 <span class="hl">4 yr</span> · BK13 2/4 · multiple 5 · foreclosure <span class="hl">7 yr</span> · DIL/short sale 4 — EC shortens each`,
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 07 · The ratios and ability to repay
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'ratios-atr',
    name: 'The ratios and ability to repay',
    reg: 'The four Cs · LTV · DTI · ATR & QM',
    definitions: [
      { term: 'Capacity', def: "The borrower's ability to repay — low debt-to-income ratios and reliable, stable employment." },
      { term: 'Capital', def: 'The money side of qualification: down payment, settlement fees, prepaids, and the reserves left afterward.' },
      { term: 'Character', def: "The borrower's willingness to repay, read through the credit profile and score." },
      { term: 'Collateral', def: "The pledged security — the property's value, condition, and marketability, and the LTV against it." },
      { term: 'Loan-to-Value (LTV)', def: "The loan amount as a share of the property's value. On a purchase, value means the LESSER of purchase price or appraised value. LTV plus equity always equals 100%." },
      { term: 'CLTV', def: 'Combined loan-to-value: all outstanding property-debt BALANCES — first lien plus what is actually drawn on any second — divided by appraised value.' },
      { term: 'TLTV (HCLTV)', def: 'Total loan-to-value: the first-lien balance plus the FULL LINE AMOUNT of any credit line, divided by appraised value — what the borrower could owe tomorrow.' },
      { term: 'Compensating Factors', def: 'Strengths that carry a file past a guideline — an exceptional score, a low LTV, deep reserves.' },
      { term: 'Qualified Mortgage (QM)', def: 'A loan meeting one of the three QM categories (General, Seasoned, Small Creditor), earning the lender a presumption that ability to repay was ensured.' },
      { term: 'Safe Harbor', def: "The strongest form of that presumption — on a non-higher-priced QM, the ability-to-repay determination is conclusive." },
    ],
    groups: [
      {
        paras: [
          {
            html: `Everything the last unit proved gets weighed here. Underwriters organize the weighing around the <b>four Cs</b> — and two of them are pure arithmetic, which is why this unit ends in a worksheet.`,
          },
        ],
      },
      {
        heading: 'the four Cs',
        anchor: { file: 'wedding-couple-on-scales-rear-view-transparent.png', caption: 'the weighing', kind: 'char' },
        paras: [
          {
            html: `<b>Capacity</b> is the ability to repay — measured by the debt ratios and the steadiness of the income behind them. <b>Capital</b> is the money in the deal: down payment, settlement costs, and reserves after closing. <b>Character</b> is the willingness to repay, read through the credit profile. <b>Collateral</b> is what secures it all — the property's value, condition, and marketability. The stronger the four run together, the easier the approval; a weakness in one gets carried by strength in another.`,
          },
        ],
      },
      {
        heading: 'loan-to-value, three ways',
        paras: [
          {
            html: `On a purchase, LTV is the loan divided by the <span class="cloze" data-accept='["lesser","the lesser","lower"]' data-reveal="lesser">?</span> of the purchase price or the appraised value. The rule bites when the appraisal comes in low: a $310,000 loan on a $475,000 contract looks like 65.3% — until the home appraises at $435,000 and the real figure is 71.3%. The lender will also want the price renegotiated down to the appraised value; if the seller refuses and the buyer still wants the house, the difference comes out of the buyer's pocket.`,
          },
          {
            html: `On a refinance, LTV runs against the current appraised value — unless the loan is inside the first <span class="cloze" data-accept='["year","one year","12 months","a year"]' data-reveal="year">?</span> of ownership, where it runs against the lesser of original value, original price, or current appraisal.`,
          },
          {
            html: `Seconds complicate the ratio into three. <b>CLTV</b> counts outstanding <i>balances</i>: a $175,000 first plus $62,500 drawn on a credit line, against a $975,000 value, is 24.4%. <b>TLTV</b> counts what <i>could</i> be owed — the full $300,000 line amount — and lands at 48.7%. Same borrower, same day, two very different answers, and the lender underwrites to the bigger one.`,
          },
        ],
        synth: {
          q: `A buyer is under contract at $400,000 with an $80,000 down payment. The appraisal comes back at $380,000 and the seller won't budge. What LTV does the lender use, and what happens to the buyer's cash if she proceeds?`,
          a: `LTV uses the lesser of price or appraised value — $380,000 — so the $320,000 loan is 84.2%, not 80%. To proceed she pays the $20,000 gap to the seller out of pocket on top of her down payment, or restructures the loan; the appraised value, not the contract, is what the lender will lend against.`,
        },
      },
      {
        heading: 'the two ratios',
        paras: [
          {
            html: `The <b>front-end</b> ratio is the housing expense against gross monthly income. Housing means everything mandatory about owning the home: principal and interest, taxes, insurance, PMI or MIP, flood insurance where required, HOA or condo fees, ground rent, any subordinate financing — escrowed or not, if owning the home requires it, it counts. The <b>back-end</b> ratio adds the consumer and long-term debt: card minimums, loans, leases, and court-ordered alimony, child support, or maintenance.`,
          },
          {
            html: `The guidelines, front over back: conventional <span class="cloze" data-accept='["28/36","28 36","28 over 36"]' data-reveal="28/36">?</span>, FHA <span class="cloze" data-accept='["31/43","31 43","31 over 43"]' data-reveal="31/43">?</span>, USDA 29/41 — and VA, which never looks at a front-end, holds the back at <span class="cloze" data-accept='["41","41%"]' data-reveal="41">?</span>. They are guidelines, not walls: an underwriter approves 31/41 on a conventional file when the score is exceptional, the LTV low, or the reserves deep.`,
          },
        ],
      },
      {
        heading: 'the qualifying worksheet',
        paras: [
          {
            html: `The Reyes file below assembles a housing expense line by line, then computes both ratios. The HOA line is the one people miss — mandatory dues count as housing whether or not they ride in the mortgage payment.`,
          },
        ],
        worksheet: 'ratios',
      },
      {
        heading: 'ability to repay, and the presumption',
        paras: [
          {
            html: `Dodd-Frank turned the arithmetic into law: a creditor must determine, on verified documentation, that the borrower can repay the loan — income and its stability, the two-year earning history, the debts against it, the ratios that result. Stated income is not determination; documents are. Lenders may even re-confirm the ratios days before settlement, because the duty runs to consummation.`,
          },
          {
            html: `A loan built inside the <b>Qualified Mortgage</b> fence earns an automatic presumption that the duty was met. The fence: no interest-only, no negative amortization, no balloon, a term of no more than <span class="cloze" data-accept='["30","thirty","30 years","thirty years"]' data-reveal="30">?</span> years, and points and fees capped at <span class="cloze" data-accept='["3","3%","three","three percent"]' data-reveal="3%">?</span> of the loan amount for loans of $137,958 and up (the 2026 tier; the cap steps higher for smaller loans). Three QM categories exist — General, Seasoned, and Small Creditor — and on a QM that isn't higher-priced, the presumption is a conclusive <b>safe harbor</b>. Module 5's QM unit carries the full product family; here the point is what QM buys the file.`,
          },
          {
            html: `Underneath the legal test sits the professional one — the loan suitability test: is this loan genuinely repayable by this borrower, or is it a file that closes and then fails? An originator who structures qualification to just barely clear the fence is setting up the fail, and both the exam and the ethics module treat that as the sin it is.`,
          },
        ],
      },
      {
        heading: 'occupancy, and the risk ladder',
        paras: [
          {
            html: `Every file claims an occupancy, and pricing climbs the ladder with the risk: <b>primary residence</b>, then <b>second home</b>, then <b>investment</b>. A primary claim should look like one — employment within a sensible distance, ID listing the address, the borrower actually living there more than six months of the year. A second home should sit where second homes make sense, far enough from the primary to be one. Anything that can't justify either claim is underwritten as an <span class="cloze" data-accept='["investment","investment property","an investment property"]' data-reveal="investment">?</span> property.`,
          },
          {
            html: `Occupancy also caps the portfolio: financing a primary residence, a borrower may have any number of financed properties; financing a second home or investment, the ceiling is generally <span class="cloze" data-accept='["10","ten"]' data-reveal="ten">?</span> financed properties with automated underwriting — six if the file is manual. Claiming primary on a house that will be rented out next month is occupancy fraud, and the rate discount it steals is the reason it's chased.`,
          },
        ],
      },
    ],
    review: {
      flashcards: [
        { peg: 'four Cs', topic: 'the weighing', q: 'Name the four Cs and what each weighs.', a: `<span class='hl'>Capacity</span> (ability — ratios, stable income) · <span class='hl'>Capital</span> (cash to close + reserves) · <span class='hl'>Character</span> (willingness — the credit profile) · <span class='hl'>Collateral</span> (the property and the LTV against it).` },
        { peg: 'three ratios', topic: 'LTV', q: 'CLTV vs. TLTV — what does each count?', a: `CLTV counts outstanding <span class='hl'>balances</span> on all liens. TLTV (HCLTV) counts the first-lien balance plus the <span class='hl'>full line amount</span> of any credit line — the exposure if the borrower drew it all.` },
        { peg: 'the fence', topic: 'ATR & QM', q: 'What features can a Qualified Mortgage never have?', a: `<span class='hl'>Interest-only</span> payments, <span class='hl'>negative amortization</span>, a <span class='hl'>balloon</span>, a term over <span class='hl'>30 years</span> — and points and fees over the cap (3% at $137,958+, 2026).` },
        { peg: 'housing is', topic: 'the ratios', q: 'What counts in the housing expense besides P&I?', a: `Everything mandatory: <span class='hl'>taxes, insurance, PMI/MIP, flood insurance, HOA/condo/co-op fees, ground rent, subordinate financing</span> — escrowed or not.` },
        { peg: 'no front', topic: 'the ratios', q: 'Which program ignores the front-end ratio entirely?', a: `<span class='hl'>VA</span> — it underwrites to a single <span class='hl'>41%</span> total-expense ratio (plus residual income).` },
        { peg: 'the ceiling', topic: 'occupancy', q: 'How many financed properties may an investor-borrower have?', a: `Generally <span class='hl'>10 with AUS</span>, <span class='hl'>6 manual</span> — and unlimited when the property being financed is her primary residence.` },
      ],
      mcq: [
        {
          q: 'A refinance eight months after purchase runs its LTV against:',
          opts: [
            'The current appraised value only',
            'The original purchase price only',
            'The lesser of original value, original price, or current appraisal',
            'The greater of the three',
          ],
          correct: 2,
        },
        {
          q: 'Front over back, the FHA debt-ratio guidelines are:',
          opts: ['28/36', '31/43', '29/41', '43/31'],
          correct: 1,
        },
        {
          q: 'A conventional file at 31/41 can still be approved because:',
          opts: [
            'FHA guidelines apply once conventional ones are exceeded',
            'DTI guidelines are advisory when the borrower signs a waiver',
            'Compensating factors — high score, low LTV, deep reserves — carry it',
            'The underwriter may not consider ratios at all',
          ],
          correct: 2,
        },
        {
          q: 'The safe harbor attached to a non-higher-priced Qualified Mortgage means:',
          opts: [
            'The loan can never be foreclosed',
            'The ability-to-repay determination is conclusively presumed',
            'The borrower waives the right to rescind',
            'The rate may not adjust for five years',
          ],
          correct: 1,
        },
      ],
    },
    recap: {
      plainLanguage: `Qualification is the four Cs weighed together: the ratios and income stability (capacity), cash and reserves (capital), the credit profile (character), and the property with the LTV against it (collateral) — with ATR the legal floor and QM the fence that presumes it was met.`,
      facts: [
        `Purchase LTV = loan ÷ <span class="hl">lesser</span> of price or appraised value · refi = appraised (first year: lesser of all three)`,
        `CLTV = <span class="hl">balances</span> · TLTV = balances + <span class="hl">full line amounts</span>`,
        `Guidelines: conv <span class="hl">28/36</span> · FHA <span class="hl">31/43</span> · VA <span class="hl">—/41</span> · USDA 29/41 — compensating factors flex them`,
        `QM: no IO · no neg-am · no balloon · ≤ <span class="hl">30 yrs</span> · points & fees ≤ <span class="hl">3%</span> ($137,958+, 2026)`,
        `Occupancy ladder: primary → second → investment · financed-property cap <span class="hl">10 AUS / 6 manual</span>`,
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 08 · The property
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'appraisals',
    name: 'The property',
    reg: 'Appraisal · title work · hazard, flood & MI',
    definitions: [
      { term: 'Principle of Substitution', def: 'A knowledgeable buyer will pay no more for a property than the cost of acquiring an equally desirable alternative — the logic underneath every appraisal.' },
      { term: 'Comparable (Comp)', def: 'A similar, recently sold property near the subject — ideally within one to three miles, closed within three to six months — whose price is adjusted to value the subject.' },
      { term: 'Subject Property', def: 'The property being appraised.' },
      { term: 'Automated Valuation Model (AVM)', def: 'A statistical valuation produced by software from sales data, without an appraiser visiting anything.' },
      { term: 'Title Binder', def: 'What the title company sends the lender once the title search is reviewed — the state of the title, clouds and all.' },
      { term: 'Title Commitment', def: 'The title company\'s assurance, once the clouds are cleared, that title insurance will be issued.' },
      { term: 'Mortgagee Clause', def: 'The declaration-page entry naming the lender ("its successors and/or assigns" — ISAOA) with the loan number, so claim checks include the lender and lapses are reported to it.' },
      { term: 'Force-Placed Insurance', def: 'A non-underwritten, expensive policy the lender buys when the borrower lets coverage lapse. It protects only the lender — never the borrower\'s belongings or liability.' },
      { term: 'Flood Zones A, V, and VE', def: 'The FEMA designations that make flood insurance mandatory. Every U.S. property is in some FEMA zone; these are the ones that require coverage.' },
    ],
    groups: [
      {
        paras: [
          {
            html: `The borrower has held up her half of the file. This unit is the other half — the collateral. Three professions certify it before closing: the appraiser values it, the title company proves it can be owned, and the insurers agree to stand behind it.`,
          },
        ],
      },
      {
        heading: 'what an appraisal is for',
        paras: [
          {
            html: `The appraisal answers the lender's only real property question: is this collateral adequate security for this loan? The appraiser is the eyes and ears of the underwriter, and the logic underneath is the <b>principle of substitution</b> — no informed buyer pays more for a home than an equally desirable alternative would cost. Fair market value assumes an arm's-length sale with a seller under no pressure.`,
          },
        ],
      },
      {
        heading: 'the three approaches to value',
        paras: [
          {
            html: `The <b>sales comparison approach</b> — the market approach — values nearly every residence: three <b>comparables</b>, ideally within one to three miles and sold within the last <span class="cloze" data-accept='["three to six","3-6","3 to 6","three-to-six","6","six"]' data-reveal="three to six">?</span> months, each adjusted to match the subject. The adjustments always land on the <span class="cloze" data-accept='["comparables","comps","the comparables","comparable"]' data-reveal="comparables">?</span>, never on the subject: a comp missing the subject's third bathroom gets value added; a comp with the bigger lot gets value taken away. Rural files stretch the distance because what's common to the area governs.`,
          },
          {
            html: `The <b>cost approach</b> prices land plus material and labor — the tool for new construction, rehab, and properties too unique to comp. The <b>income approach</b> values rentals: the property's net operating income divided by the <span class="cloze" data-accept='["capitalization rate","cap rate","capitalization"]' data-reveal="capitalization rate">?</span>, worked through an Operating Income Statement.`,
          },
        ],
      },
      {
        heading: 'the report and its cousins',
        paras: [
          {
            html: `The full written account is the URAR — Fannie's 1004, which Freddie files as Form <span class="cloze" data-accept='["70","form 70"]' data-reveal="70">?</span>. The family around it: the 1073 for individual condominiums, the 1004C for manufactured homes, the 1025 for two-to-four-unit income properties, the <b>AVM</b> when software alone estimates, and the VA's Notice of Value. Beyond value, the report speaks to safety, condition, and marketability — and an appraisal is not a home inspection, a well test, or a septic certification; those are separate calls the buyer makes for her own protection.`,
          },
        ],
      },
      {
        heading: 'ordering it, and keeping it independent',
        paras: [
          {
            html: `The lender orders the appraisal — commonly through an appraisal management company — and the originator stays out of the valuation: no pressuring, no coaching a number, no picking a favorite appraiser. Module 3's TILA unit carries the appraiser-independence rules; this is where they bite in practice.`,
          },
          {
            html: `The borrower's copy has its own clock, worth re-reading from the property's side: promptly on completion, no later than three business days before consummation, waivable in writing down to the closing table. If the loan never closes, the copy still goes out — within <span class="cloze" data-accept='["30","thirty","30 days"]' data-reveal="30">?</span> calendar days of the decision. The lender may charge for the appraisal itself; it may never charge for the copy.`,
          },
        ],
      },
      {
        heading: 'the HPML flip rules',
        paras: [
          {
            html: `A higher-priced mortgage loan always requires a full interior-inspection appraisal by a licensed or certified appraiser. And when the seller is flipping, a <b>second appraisal by a different appraiser</b> — at no cost to the borrower — is required if the seller bought within <span class="cloze" data-accept='["90","ninety","90 days"]' data-reveal="90">?</span> days and the price rose more than 10%, or within 91 to 180 days with the price up more than <span class="cloze" data-accept='["20","20%","twenty"]' data-reveal="20%">?</span>.`,
          },
        ],
        synth: {
          q: `An HPML buyer is paying $270,000 for a house the seller bought for $200,000 four months ago. What does the file now require, and who pays for it?`,
          a: `A second appraisal by a different licensed or certified appraiser, at the lender's expense — the seller acquired the property 91–180 days ago and the price is up 35%, past the 20% flip threshold. The first appraisal already had to be a full interior inspection, as every HPML's must be.`,
        },
      },
      {
        heading: 'the title work begins',
        paras: [
          {
            html: `While the appraiser measures, the title company searches. The processor orders title early; the search walks the public record and produces the <b>binder</b> — the state of the title, clouds included. When the clouds clear, the company issues the <b>commitment</b>: its promise that insurance will be written. At settlement comes the short-form policy; after funding and recording, the long-form. What the search can surface — easements, encumbrances, breaks in the chain — is the closing unit's subject; here the point is the sequence, because a title order placed late is how closings slip.`,
          },
        ],
      },
      {
        heading: 'hazard insurance, and the lender\'s name on it',
        anchor: { file: '12-beach-house.png', caption: 'zone A', kind: 'bldg' },
        paras: [
          {
            html: `A mortgaged home must carry homeowner's insurance every day the lien exists. The borrower picks the company; the lender's protection is the <b>mortgagee clause</b> — the lender's name, the loan number, and “its successors and/or assigns” on the declaration page. That clause puts the lender on every claim check (so repair money repairs) and gets it notified the day coverage lapses. The most a lender may require is full <span class="cloze" data-accept='["replacement","replacement coverage","replacement cost"]' data-reveal="replacement">?</span> coverage — never more.`,
          },
          {
            html: `Let coverage lapse and ignore the warnings, and the lender buys <b>force-placed insurance</b>: non-underwritten, expensive, paid out of an escrow account it will create if none exists, and protective of the lender alone. Escrowed insurance isn't always optional in the first place — government loans, conventional loans above <span class="cloze" data-accept='["80","80%","eighty"]' data-reveal="80%">?</span> LTV, and young higher-priced loans must pay insurance through escrow.`,
          },
          {
            html: `Flood is its own search on every origination. All U.S. property sits in a FEMA flood zone; zones <span class="cloze" data-accept='["a, v, and ve","a v ve","a, v, ve","a/v/ve"]' data-reveal="A, V, and VE">?</span> make flood insurance mandatory, through the National Flood Insurance Program or an acceptable private policy.`,
          },
        ],
      },
      {
        heading: 'mortgage insurance, three flavors',
        paras: [
          {
            html: `<b>PMI</b> is conventional-only, generally required above 80% LTV, and priced off the product, LTV, term, and credit score. The PMI company underwrites too — a lender's approval means nothing if the insurer declines, and without the insurer the loan as structured dies. Borrower-paid PMI runs as a monthly premium (the calculation is unit 11's); financed one-time PMI is available with 10% down; <b>LPMI</b> buries the premium in a higher rate the lender pays from.`,
          },
          {
            html: `What PMI covers is a slice, not the whole loan: Fannie's coverage grid asks 30% coverage on a 95% LTV 30-year fixed, 25% at 90, 12% at 85 — the insurer reimburses that share of the loss above the 80% line. Government files insure differently: FHA's MIP (upfront and annual) and the VA funding fee and USDA guarantee fees live in Module 5, and PMI's removal rules — borrower cancellation at 80%, automatic at 78%, final at midpoint — are Module 3's HPA unit. Here, the pattern: someone always stands behind the thin-equity slice, and the borrower pays for the standing.`,
          },
        ],
        synth: {
          q: `A borrower with spotless credit is approved by the lender for a 95% conventional loan — and the file still dies. What actor could kill it, and why does that actor get a vote?`,
          a: `The PMI company. Above 80% LTV the loan needs private mortgage insurance, and the insurer underwrites the file independently because it eats a share of any loss. If the PMI company declines, the loan as structured is declined — whatever the lender thought.`,
        },
      },
    ],
    review: {
      flashcards: [
        { peg: 'three tools', topic: 'appraisal', q: 'Match the approach to the property: standard home · new construction · rental fourplex.', a: `Standard home → <span class='hl'>sales comparison</span> · new construction / unique → <span class='hl'>cost</span> · rental → <span class='hl'>income</span> (NOI ÷ cap rate, via the OIS).` },
        { peg: 'adjust what', topic: 'appraisal', q: 'When a comp and the subject differ, what gets adjusted — and in which direction?', a: `Always the <span class='hl'>comparable</span>, never the subject: add value to a comp missing the subject's amenity, subtract from a comp that has more.` },
        { peg: 'the forms', topic: 'appraisal', q: 'Which appraisal form fits: condo · manufactured home · 2–4-unit rental?', a: `Condo → <span class='hl'>1073</span> · manufactured → <span class='hl'>1004C</span> · 2–4-unit income → <span class='hl'>1025</span> with an OIS. The URAR itself is 1004 / Freddie 70.` },
        { peg: 'binder first', topic: 'title work', q: 'Put the title paperwork in order.', a: `Search → <span class='hl'>binder</span> (clouds shown) → <span class='hl'>commitment</span> (clouds cleared, insurance promised) → short-form policy at settlement → <span class='hl'>long-form</span> after recording.` },
        { peg: 'the clause', topic: 'insurance', q: 'What does the mortgagee clause actually do?', a: `Names the lender + loan number ("<span class='hl'>ISAOA</span>") on the declaration page — putting the lender on every <span class='hl'>claim check</span> and guaranteeing it's told of any <span class='hl'>lapse</span>.` },
        { peg: 'who else', topic: 'mortgage insurance', q: 'Besides the lender, who underwrites a 95% conventional loan?', a: `The <span class='hl'>PMI company</span> — it shares the loss above 80% LTV (e.g., <span class='hl'>30% coverage</span> on a 95/30-fixed), so its decline kills the loan as structured.` },
      ],
      mcq: [
        {
          q: 'The principle of substitution says:',
          opts: [
            'A property is worth what it cost to build',
            'A buyer will pay no more than the cost of an equally desirable alternative',
            'A property is worth its tax assessment',
            'Comparables must substitute for an interior inspection',
          ],
          correct: 1,
        },
        {
          q: 'An HPML always requires:',
          opts: [
            'Two appraisals',
            'An AVM plus a drive-by',
            'A full interior-inspection appraisal by a licensed or certified appraiser',
            'A VA Notice of Value',
          ],
          correct: 2,
        },
        {
          q: 'Which loan does NOT have to escrow homeowner\'s insurance?',
          opts: [
            'An FHA purchase',
            'A conventional loan at 92% LTV',
            'A two-year-old higher-priced mortgage',
            'A conventional loan at 62% LTV',
          ],
          correct: 3,
        },
        {
          q: 'Force-placed insurance protects:',
          opts: [
            "The lender's interest only",
            "The borrower's belongings",
            'Both lender and borrower',
            'The title company',
          ],
          correct: 0,
        },
        {
          q: 'Flood insurance becomes mandatory when the flood search places the property in zone:',
          opts: ['B, C, or X', 'A, V, or VE', 'D only', 'Any FEMA zone'],
          correct: 1,
        },
      ],
    },
    recap: {
      plainLanguage: `Three professions certify the collateral: the appraiser values it against adjusted comparables, the title company searches its way to a commitment, and the insurers — hazard, flood, and mortgage — agree to stand behind what could go wrong.`,
      facts: [
        `Sales comparison: 3 comps · 1–3 miles · sold in <span class="hl">3–6 months</span> · adjust the <span class="hl">comps</span>, never the subject`,
        `Cost approach → new/unique · income approach → <span class="hl">NOI ÷ cap rate</span>`,
        `HPML: interior appraisal always · 2nd appraisal on flips ≤ 90 days +<span class="hl">10%</span> / 91–180 days +<span class="hl">20%</span>`,
        `Title: search → <span class="hl">binder</span> → <span class="hl">commitment</span> → short-form → long-form`,
        `Mortgagee clause = lender on claim checks + lapse notice · max requirement: <span class="hl">full replacement</span>`,
        `Zones <span class="hl">A / V / VE</span> = flood insurance required · PMI: conventional > <span class="hl">80% LTV</span>, insurer underwrites too`,
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 09 · Underwriting and conditions
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'processing-underwriting',
    name: 'Underwriting and conditions',
    reg: 'AUS · the findings report · clearing conditions',
    definitions: [
      { term: 'Processor', def: 'The person who assembles and verifies the file — orders title and the appraisal, chases documents, runs the verifications — so the underwriter decides on a complete record.' },
      { term: 'Underwriter', def: 'The person who reviews every facet of the file against investor parameters and decides. The only person who can say approved or declined.' },
      { term: 'Automated Underwriting System (AUS)', def: 'Software that risk-assesses a casefile and returns a recommendation plus findings: Desktop Underwriter (Fannie Mae), Loan Product Advisor (Freddie Mac), TOTAL Scorecard (FHA).' },
      { term: 'Findings Report', def: "The AUS's list of verification messages and conditions — in effect, the document checklist for the rest of the file." },
      { term: 'Condition', def: 'A requirement the approval hangs on — a document to produce, a fact to verify — cleared one at a time until nothing is outstanding.' },
      { term: 'Commitment Letter', def: "The lender's written commitment to lend, issued once conditions clear, usually still subject to clear title and acceptable insurance." },
      { term: 'Resubmission', def: 'Running the casefile through the AUS again after anything material changes. New data, new findings — the old recommendation no longer exists.' },
    ],
    groups: [
      {
        paras: [
          {
            html: `The file is documented, priced, and disclosed. Now someone has to decide. Two roles split the work: the <b>processor</b> completes and verifies the file, and the <b>underwriter</b> — reviewing all of it against investor parameters — decides. Unit 01's rule closes its loop here: only this desk ever promises an approval.`,
          },
        ],
      },
      {
        heading: 'the automated pass',
        anchor: { file: 'robot-holding-kitten-transparent.png', caption: 'assist, not decide', kind: 'char' },
        paras: [
          {
            html: `Before a human reads the file, software does. The casefile is submitted from the LOS to an <b>automated underwriting system</b>: Fannie Mae's <span class="cloze" data-accept='["desktop underwriter","du"]' data-reveal="Desktop Underwriter">?</span>, Freddie Mac's Loan Product Advisor, or FHA's TOTAL Scorecard. The AUS weighs the credit, the ratios, the reserves, and the loan's shape against the investor's model and returns two things: a recommendation, and the findings.`,
          },
          {
            html: `Read a DU recommendation as two verdicts stapled together. The risk half — <b>Approve</b>, <b>Refer</b>, <b>Refer with Caution</b>, or <b>Out of Scope</b> — says what the model thinks of the credit risk. The eligibility half — <b>Eligible</b> or <b>Ineligible</b> — says whether the loan as structured fits the investor's rules. <span class="cloze" data-accept='["approve/eligible","approve eligible"]' data-reveal="Approve/Eligible">?</span> is the clean pass; Approve/Ineligible means good risk, wrong structure; a Refer sends the file to a human; Out of Scope means the model can't judge it at all. Freddie's vocabulary is smaller — Accept or Caution.`,
          },
          {
            html: `What the AUS never does is decide. It recommends; the <span class="cloze" data-accept='["lender","the lender","underwriter","the underwriter"]' data-reveal="lender">?</span> decides. An Approve/Eligible casefile built on bad data approves nothing — which is why the recommendation is only as good as what the LOS sent it.`,
          },
        ],
        synth: {
          q: `DU returns Approve/Ineligible on a casefile. The borrower hears "approve" and starts packing. What do the two halves of that recommendation actually say, and what are the file's paths forward?`,
          a: `The risk half says the model finds the credit risk acceptable; the eligibility half says the loan as structured breaks an investor rule — the loan amount, LTV, or program doesn't fit. The paths: restructure the loan until it's eligible and resubmit, or place it with an investor whose rules it does fit. Nothing is approved yet — the AUS recommends, the lender decides.`,
        },
      },
      {
        heading: 'the findings are a to-do list',
        paras: [
          {
            html: `Under the recommendation sits the <b>findings report</b> — verification messages and conditions, line after line: which pay stubs, how many months of statements, what the appraisal must show, which explanations are owed. Read it as the document checklist for the rest of the file; processors work it top to bottom. And any material change — a new loan amount after a low appraisal, a vanished bonus, a fresh liability from the pre-closing credit refresh — means <b>resubmission</b>. New data, new findings; the old recommendation no longer exists.`,
          },
        ],
      },
      {
        heading: 'conditions, and the letters that carry them',
        paras: [
          {
            html: `A human approval arrives as a <b>Notice of Action Taken</b> that itemizes its <b>conditions</b> and the deadline to satisfy them. Conditions clear one at a time — a document uploaded through the POS, verified by the processor, signed off by the underwriter — and it is the slowest seam in the whole pipeline, which is why "conditional approval" is where files go quiet. When the list empties, the lender issues the <b>commitment letter</b>: its commitment to lend, typically still subject to clear and marketable <span class="cloze" data-accept='["title","clear title","marketable title"]' data-reveal="title">?</span> and an acceptable homeowner's insurance policy. Then a closing date gets scheduled and the disclosure clocks from unit 05 take over.`,
          },
        ],
      },
      {
        heading: 'when the machine can\'t',
        paras: [
          {
            html: `Some files route around the model: thin credit, non-traditional histories, casefiles the AUS refers or can't score. A <b>manual underwrite</b> is a human applying the guidelines directly — stricter documentation, tighter ratio tolerance, the average-median score rule from unit 06, and the lower financed-property ceiling from unit 07. Manual isn't a punishment; it's the system admitting the model has edges.`,
          },
        ],
      },
      {
        heading: 'what the desk watches for',
        paras: [
          {
            html: `Underwriting is also where fraud surfaces, because it's where the pieces first sit side by side. The classic flags: an unexplained deposit landing right before closing, an employer reachable only at a P.O. box, the same phone number for borrower and employer, a purchase where the buyer on the contract isn't the applicant, a seller who isn't on title, a recent quitclaim deed, an "owner-occupied" claim that makes no geographic sense. A processor or originator who spots one doesn't fix it quietly — the file's story has to actually hold. The ethics module carries the full catalog; this desk is where it gets read.`,
          },
        ],
      },
    ],
    review: {
      flashcards: [
        { peg: 'three engines', topic: 'the AUS', q: 'Name the AUS for each: Fannie · Freddie · FHA.', a: `Fannie Mae → <span class='hl'>Desktop Underwriter</span> · Freddie Mac → <span class='hl'>Loan Product Advisor</span> · FHA → <span class='hl'>TOTAL Scorecard</span>.` },
        { peg: 'four risks', topic: 'the AUS', q: 'The four DU risk recommendations?', a: `<span class='hl'>Approve · Refer · Refer with Caution · Out of Scope</span> — each paired with Eligible or Ineligible. Freddie's LPA answers Accept or Caution.` },
        { peg: 'the list', topic: 'findings', q: 'What is the findings report, practically?', a: `The AUS's verification messages and conditions — <span class='hl'>the document checklist</span> the processor works for the rest of the file.` },
        { peg: 'two letters', topic: 'conditions', q: 'Notice of Action Taken vs. commitment letter?', a: `The NAT approves <span class='hl'>with itemized conditions</span> and a deadline; the commitment letter follows once they clear — still subject to <span class='hl'>clear title</span> and acceptable insurance.` },
        { peg: 'run it again', topic: 'resubmission', q: 'When must a casefile go back through the AUS?', a: `On any <span class='hl'>material change</span> — loan amount, income, appraisal, new debt on the refresh. New data → new findings; the old recommendation is void.` },
      ],
      mcq: [
        {
          q: 'Desktop Underwriter returns Refer with Caution. This means:',
          opts: [
            'The loan is declined',
            'The loan is approved with conditions',
            'The casefile carries risk the model won\'t approve — a human underwrite is required',
            'The property is ineligible',
          ],
          correct: 2,
        },
        {
          q: 'Who ultimately decides whether a loan is approved?',
          opts: ['The AUS', 'The processor', 'The lender\'s underwriter', 'The PPE'],
          correct: 2,
        },
        {
          q: 'Three days before closing, the credit refresh shows a new $650/month auto lease. The file must be:',
          opts: [
            'Closed as scheduled — the recommendation already exists',
            'Resubmitted to the AUS with the new liability',
            'Switched to manual underwriting automatically',
            'Re-disclosed but not re-underwritten',
          ],
          correct: 1,
        },
        {
          q: 'Which is a classic fraud flag at the underwriting desk?',
          opts: [
            'A gift letter from a godparent',
            'The same phone number for the borrower and the employer',
            'A 45-day lock request',
            'Two years of W-2s from one employer',
          ],
          correct: 1,
        },
      ],
    },
    recap: {
      plainLanguage: `Software reads the file first — a recommendation plus findings — but the AUS only recommends; the underwriter decides, conditions clear one at a time, and any material change sends the casefile back through the machine.`,
      facts: [
        `Engines: <span class="hl">DU</span> (Fannie) · <span class="hl">LPA</span> (Freddie) · <span class="hl">TOTAL</span> (FHA)`,
        `Recommendation = risk (<span class="hl">Approve / Refer / Refer w/ Caution / Out of Scope</span>) × eligibility (<span class="hl">Eligible / Ineligible</span>)`,
        `Findings report = the file's <span class="hl">document checklist</span> · material change → <span class="hl">resubmit</span>`,
        `NAT itemizes conditions → cleared → <span class="hl">commitment letter</span> (subject to title + insurance)`,
        `The AUS <span class="hl">recommends</span>; the lender <span class="hl">decides</span>`,
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 10 · Closing and funding
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'closing',
    name: 'Closing and funding',
    reg: 'Title · the settlement table · funding & rescission',
    definitions: [
      { term: 'Fee Simple Estate', def: 'The most complete form of ownership — the full bundle of rights, indefinitely, subject only to government powers.' },
      { term: 'Leasehold Estate', def: 'The right to possess and use for a term, under a lease — the ground under the home belongs to someone else.' },
      { term: 'Life Estate', def: "Ownership measured by a life: the holder's rights end at the measuring life's death, when the property passes on." },
      { term: 'Easement Appurtenant', def: 'A right benefiting a neighboring parcel — a shared driveway — that runs with the land through every sale.' },
      { term: 'Easement in Gross', def: 'A right benefiting a person or company rather than a parcel — the utility line across the back of the lot.' },
      { term: 'Prescriptive Easement', def: 'A use ripened into a right by being open, notorious, and continuous for the statutory period — the neighbor whose fence has crossed the line for twenty years.' },
      { term: 'Deed of Reconveyance', def: 'The document the trustee records when a deed-of-trust loan pays off, returning full title to the borrower.' },
      { term: 'Subordination Agreement', def: 'A junior lienholder\'s recorded consent to stay junior — what lets a first mortgage refinance without the home-equity line jumping ahead of the new loan.' },
      { term: 'Wet vs. Dry Settlement', def: 'Wet-settlement states fund at the table (or when rescission runs); dry-settlement states fund only after the lender reviews, approves, and records the signed documents.' },
      { term: 'Table Funding', def: "A broker closes the loan in its own name and assigns it at the table to the lender whose money funds it." },
      { term: 'Affidavit of Title', def: 'The seller\'s or owner\'s sworn statement that nothing undisclosed clouds the title — no hidden liens, judgments, or claims.' },
    ],
    groups: [
      {
        paras: [
          {
            html: `Everything the file has produced converges on a table: the cleared conditions, the final numbers, the title work, and the people. This unit is what gets signed, what gets paid, what can still stop the funding — and the one window in which a borrower can undo the whole thing.`,
          },
        ],
      },
      {
        heading: 'title, held and proved',
        paras: [
          {
            html: `What the borrower is buying is an <b>estate</b> — a bundle of ownership rights. <b>Fee simple</b> is the whole bundle, indefinitely; a <b>leasehold</b> owns the years of a lease while someone else owns the ground; a <b>life estate</b> lasts exactly as long as its measuring life. The title search walks the <b>chain of title</b> backward through the public record looking for breaks — a missed heir, a forged deed, a seller who was a minor (a minor can hold title, but can't convey it). On a paid-off deed of trust, the trustee records a deed of <span class="cloze" data-accept='["reconveyance"]' data-reveal="reconveyance">?</span>, returning full title to the borrower — the document that proves the old loan is gone.`,
          },
        ],
      },
      {
        heading: 'easements, encumbrances, and who gets paid first',
        paras: [
          {
            html: `An <b>encumbrance</b> is anything that limits or claims the property — liens, easements, restrictions. Easements come in flavors the exam likes: <b>appurtenant</b> (benefits the neighboring parcel and runs with the land), <b>in gross</b> (benefits a company or person — the utility line), <b>by necessity</b> (the landlocked parcel's way out), <b>prescriptive</b> (open, continuous use ripened into a right), and historic or conservation easements that restrict what an owner may change.`,
          },
          {
            html: `Liens queue by <b>recording order</b> — first recorded, first paid from a foreclosure — with one standing exception: property-tax liens go to the <span class="cloze" data-accept='["front","front of the line","first","head of the line"]' data-reveal="front">?</span> of the line regardless of date. The queue is why a refinance needs the home-equity lender to sign a <b>subordination agreement</b>: without it, paying off the old first mortgage would promote the equity line into first position ahead of the new loan.`,
          },
        ],
      },
      {
        heading: 'the two policies',
        paras: [
          {
            html: `Title insurance looks backward: it insures against defects that already exist in the record. The <b>lender's policy</b> is mandatory — it protects only the lender, paying the lesser of the defect's value or the loan balance. The <b>owner's policy</b> is optional, offered on primary-residence purchases for a one-time premium, and it defends the <i>owner's</i> stake — the title company must resolve a covered defect regardless of its size, and a future refinance earns a discount on the new lender's policy. A buyer who skips it is unprotected for everything above the loan balance.`,
          },
        ],
        synth: {
          q: `Two years after closing, a valid $40,000 title defect surfaces. The loan balance is $180,000 and the home is worth $310,000. Walk what happens with only a lender's policy, and with an owner's policy too.`,
          a: `With only the lender's policy, the insurer protects the lender — paying the lesser of the defect's value or the loan balance — and the homeowner absorbs the defect's consequences herself. With an owner's policy, the title company must resolve the defect to protect her ownership interest, whatever it costs relative to the loan.`,
        },
      },
      {
        heading: 'who\'s at the table',
        anchor: { file: 'party-hat-on-stack-of-folders-with-champagne-transparent.png', caption: 'the table', kind: 'char' },
        paras: [
          {
            html: `The <b>settlement agent</b> — the closer — runs the table on the lender's written closing instructions. A purchase adds the seller and both agents; the borrower may bring an attorney at her own expense; the originator may attend, and whoever is present explains whatever the borrower asks. Before anything is signed, the borrower produces government-issued <b>photo ID</b>. An owner who can't attend signs through a <b>power of attorney</b> — one the lender approved in advance, not one produced at the table.`,
          },
          {
            html: `One signature rule sorts the whole stack: the <b>note</b> is signed by the borrowers — the people repaying the debt — while the <b>security instrument</b> is signed by everyone holding an <span class="cloze" data-accept='["ownership","ownership interest","an ownership interest"]' data-reveal="ownership">?</span> interest in the property, borrower or not. A spouse on title but off the loan signs the mortgage, not the note.`,
          },
        ],
      },
      {
        heading: 'the stack that gets signed',
        paras: [
          {
            html: `The final Closing Disclosure leads, and behind it: the note, the security instrument and its riders, the initial escrow account statement, the affidavit of title, the deed on a purchase, the right-to-rescind copies on a rescindable refinance, the URLA signed once more as final, fresh IRS 4506-C and W-9 forms, the first-payment notice, the PATRIOT Act compliance disclosure, the servicing disclosure, and the occupancy and employment affidavits — the borrower swearing, at the table, that the file is still true. Certified funds cover whatever the CD says she owes.`,
          },
        ],
      },
      {
        heading: 'the fees explained',
        anchor: { file: 'mime-long-receipt-transparent.png', caption: 'every line', kind: 'char' },
        paras: [
          {
            html: `Whoever explains the CD should be able to walk every line. The title cluster: search, binder, the lender's premium, the optional owner's premium, the settlement agent's fee, survey, tax monitoring. The <b>prepaids</b>: interim interest from funding through month-end, the first year of homeowner's insurance, taxes, and any mortgage insurance due up front. The <b>escrow deposit</b> that seeds the account. And the origination line — typically <span class="cloze" data-accept='["1","1%","one","one percent"]' data-reveal="1%">?</span> of the loan — which a par-rate borrower covers through the rate's credit, and a below-par borrower pays in cash along with her discount points. Unit 04's sheet, landing on paper.`,
          },
        ],
      },
      {
        heading: 'funding, and the three-day undo',
        anchor: { file: 'santa-holding-december-calendar-transparent.png', caption: 'day three', kind: 'char' },
        paras: [
          {
            html: `A purchase funds at the table. A primary-residence <b>refinance</b> carries the right of rescission: <span class="cloze" data-accept='["three","3"]' data-reveal="three">?</span> precise business days, ending at midnight of the third day, during which any owner can cancel the whole transaction in writing. Settle on Tuesday and the loan cannot fund before 12:01 a.m. <span class="cloze" data-accept='["saturday"]' data-reveal="Saturday">?</span> — Saturdays count as precise days, Sundays never do. Two copies of the notice go to every owner, and only a bona fide financial emergency waives the wait. Module 6's refinances section walks the cancellation itself; here it's the funding gate.`,
          },
          {
            html: `Where the money actually moves depends on state practice: <b>wet-settlement</b> states fund at the table or when rescission runs; <b>dry-settlement</b> states fund only after the lender reviews, approves, and records the executed documents. In a <b>table funding</b>, a broker closes in its own name and assigns the loan at the table to the funding lender. Then the security instrument and deed record into the public record, the escrow account opens for its first analysis within 45 days, and the servicing calendar from unit 05 takes over.`,
          },
        ],
        synth: {
          q: `A married couple refinances the home they live in; the wife owns it alone and is the only borrower. Who signs the note, who signs the security instrument, who receives rescission notices — and when can the loan fund if they sign on a Thursday?`,
          a: `She alone signs the note; every owner signs the security instrument — here that's her, though a spouse with an ownership interest under state law would sign it too. Every owner receives two copies of the right-to-rescind notice. Rescission runs three precise business days — Friday, Saturday, Monday (Sunday never counts) — so the loan can fund at 12:01 a.m. Tuesday.`,
        },
      },
    ],
    review: {
      flashcards: [
        { peg: 'the bundle', topic: 'estates', q: 'Fee simple vs. leasehold vs. life estate?', a: `<span class='hl'>Fee simple</span>: the whole bundle, indefinitely. <span class='hl'>Leasehold</span>: possession for a term, ground owned by another. <span class='hl'>Life estate</span>: ownership that ends with the measuring life.` },
        { peg: 'which easement', topic: 'easements', q: 'Shared driveway · utility line · landlocked lot · twenty-year fence — name the easements.', a: `<span class='hl'>Appurtenant</span> (runs with the land) · <span class='hl'>in gross</span> (benefits a company/person) · <span class='hl'>by necessity</span> · <span class='hl'>prescriptive</span> (open, continuous use for the statutory period).` },
        { peg: 'the queue', topic: 'lien priority', q: 'What sets lien priority, and what jumps the line?', a: `<span class='hl'>Recording order</span> — first recorded, first paid — except <span class='hl'>property-tax liens</span>, which take priority regardless of date. A refinance keeps its place via a <span class='hl'>subordination agreement</span>.` },
        { peg: 'two pens', topic: 'signatures', q: 'Who signs the note; who signs the security instrument?', a: `The note: the <span class='hl'>borrowers</span> repaying the debt. The security instrument: <span class='hl'>everyone with an ownership interest</span> — on title means signing the mortgage, even off the loan.` },
        { peg: 'wet or dry', topic: 'funding', q: 'When does the money move in a wet vs. dry settlement state?', a: `Wet: at the <span class='hl'>table</span> (or when rescission runs). Dry: only after the lender <span class='hl'>reviews, approves, and records</span> the signed documents.` },
        { peg: 'sworn again', topic: 'the stack', q: 'What do the closing affidavits make the borrower do?', a: `Swear at the table that the file is <span class='hl'>still true</span> — occupancy as claimed, still employed, everything disclosed — plus the affidavit of title on the seller's side.` },
      ],
      mcq: [
        {
          q: 'A neighbor has openly used a path across the property for twenty-two years. The title search will likely surface:',
          opts: ['An easement in gross', 'A prescriptive easement', 'An easement by necessity', 'A conservation easement'],
          correct: 1,
        },
        {
          q: 'A rescindable refinance settles on Tuesday. The earliest funding moment is:',
          opts: ['Wednesday at 9 a.m.', 'Friday at 12:01 a.m.', 'Saturday at 12:01 a.m.', 'Monday at 12:01 a.m.'],
          correct: 2,
        },
        {
          q: 'The lender\'s title policy pays, on a valid claim:',
          opts: [
            'The full value of the defect, always',
            'The lesser of the defect\'s value or the outstanding loan balance',
            'The home\'s market value',
            'Nothing until the owner\'s policy is exhausted',
          ],
          correct: 1,
        },
        {
          q: 'A power of attorney used at closing must be:',
          opts: [
            'Notarized at the table',
            'Approved by the lender in advance',
            'Signed by the settlement agent',
            'Recorded before the application',
          ],
          correct: 1,
        },
        {
          q: 'Interim (prepaid) interest collected at closing covers:',
          opts: [
            'The first full month\'s payment',
            'Interest from funding through the end of the closing month',
            'The last month of the old loan',
            'The escrow cushion',
          ],
          correct: 1,
        },
      ],
    },
    recap: {
      plainLanguage: `Closing is title proved and insured, a stack signed by the right pens — borrowers on the note, all owners on the security instrument — every fee explained, and funding gated by state practice and, on a primary-home refinance, the three-day right to cancel.`,
      facts: [
        `Estates: <span class="hl">fee simple</span> · leasehold · life estate — the search walks the <span class="hl">chain of title</span>`,
        `Priority = <span class="hl">recording order</span>; property-tax liens jump the line; refis need a <span class="hl">subordination agreement</span>`,
        `Lender's policy: required, pays lesser of defect or balance · owner's: optional, <span class="hl">defends the owner fully</span>`,
        `Note = borrowers · security instrument = <span class="hl">all owners</span> · POA pre-approved by the lender`,
        `Rescission: <span class="hl">3 precise days</span>, ends midnight day 3 · Tuesday settle → funds 12:01 a.m. <span class="hl">Saturday</span>`,
        `Wet state: funds at the table · dry state: after <span class="hl">review + recording</span> · escrow analysis within 45 days`,
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 11 · Running the numbers
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'mortgage-math',
    name: 'Running the numbers',
    reg: 'Financial calculations · the drill',
    groups: [
      {
        paras: [
          {
            html: `Every calculation the exam tests has already appeared once, in place — pricing in unit 04, the ratios in unit 07, the fees in unit 10. This unit runs them again, bare, because III.D is a quarter of nothing: it's pure points, and speed here is cheap. Prometric hands you a four-function calculator and nothing more; the dock beside this page is deliberately the same. Work every blank by hand.`,
          },
        ],
      },
      {
        heading: 'per-diem interest',
        anchor: { file: 'kid-in-tie-dye-holding-clock-transparent.png', caption: 'by the day', kind: 'char' },
        paras: [
          {
            html: `One chain produces every interest figure. Balance × rate = annual interest: on $415,622 at 3.125%, that's <span class="cloze" data-accept='["12,988.19","12988.19","12988","$12,988.19","12,988"]' data-reveal="$12,988.19">?</span>. Divide by 12 for the monthly share: $1,082.35. Divide the annual figure by <span class="cloze" data-accept='["360"]' data-reveal="360">?</span> — not 365, because 365 doesn't divide evenly by 12 — for the daily: $36.08 per diem.`,
          },
        ],
      },
      {
        heading: 'interim interest',
        paras: [
          {
            html: `The first payment won't arrive for a month or more, so closing collects the gap: per diem × the days left in the closing month. A $400,000 loan at 5% funds with 25 days remaining in the month. Annual: $20,000. Per diem: <span class="cloze" data-accept='["55.56","$55.56","55.55"]' data-reveal="$55.56">?</span>. Interim interest due at the table: <span class="cloze" data-accept='["1,389","1389","$1,389"]' data-reveal="$1,389">?</span>. Close late in the month and the number shrinks — the oldest cash-to-close trick there is.`,
          },
        ],
      },
      {
        heading: 'the payment, and the PITI on top',
        paras: [
          {
            html: `The P&I formula is worth recognizing even though the calculator does the lifting: P = (i × A) ÷ (1 − (1 + i)<sup>−N</sup>), where i is the monthly rate, A the loan amount, N the number of payments. $200,000 for 30 years at 6% fixed lands at $1,199.10.`,
          },
          {
            html: `PITI stacks the escrow on top at monthly equivalence. Same loan, $755 annual insurance and $3,750 annual taxes: ($755 + $3,750) ÷ 12 = <span class="cloze" data-accept='["375.42","$375.42"]' data-reveal="$375.42">?</span>, so the full payment is <span class="cloze" data-accept='["1,574.52","1574.52","$1,574.52"]' data-reveal="$1,574.52">?</span>. A fixed rate fixes only the P&I — when taxes or insurance move, the payment moves with them.`,
          },
        ],
      },
      {
        heading: 'down payment, loan amount, LTV',
        paras: [
          {
            html: `Three faces of one division. Down payment from a percentage: 15% down on $450,000 is <span class="cloze" data-accept='["67,500","67500","$67,500"]' data-reveal="$67,500">?</span>. The percentage from dollars: $50,000 down on $300,000 is <span class="cloze" data-accept='["16.7","16.7%","16.67","16.67%"]' data-reveal="16.7%">?</span>. And the purchase loan amount is the lesser of price or appraised value minus the down payment — the lesser rule again, doing arithmetic this time: a $285,000 loan against a $375,000 contract that appraised at $362,000 is an LTV of <span class="cloze" data-accept='["78.7","78.7%","78.73","79"]' data-reveal="78.7%">?</span>, because the $362,000 is the denominator.`,
          },
          {
            html: `With a second lien: a $240,000 first, $35,000 drawn on a $90,000 line, $500,000 value. CLTV — the balances — is 55%. TLTV — the full line — is <span class="cloze" data-accept='["66","66%"]' data-reveal="66%">?</span>.`,
          },
        ],
      },
      {
        heading: 'the ratios, at speed',
        paras: [
          {
            html: `Housing ÷ income, then everything ÷ income. Gross monthly income $8,200, full housing expense $2,132, other debts $902. Front-end: <span class="cloze" data-accept='["26","26%","26.0"]' data-reveal="26%">?</span>. Back-end: ($2,132 + $902) ÷ $8,200 = <span class="cloze" data-accept='["37","37%","37.0"]' data-reveal="37%">?</span>. Against the guidelines from unit 07, this file is conventional-shaped with room to spare in front and a conversation in back.`,
          },
        ],
      },
      {
        heading: 'points, and when they pay off',
        paras: [
          {
            html: `A point is 1% of the <i>loan amount</i> — never the purchase price. One and a half points on a $260,000 loan: <span class="cloze" data-accept='["3,900","3900","$3,900"]' data-reveal="$3,900">?</span>. Whether points are worth buying is a break-even: cost of the points ÷ monthly savings = months to recoup. $1,200 of points saving $48 a month breaks even at <span class="cloze" data-accept='["25","25 months"]' data-reveal="25">?</span> months — worthwhile only if the borrower keeps the loan at least that long.`,
          },
        ],
        synth: {
          q: `A borrower can pay $2,800 in points to save $70 a month, and she expects to sell the house in three years. Run the break-even and make the call.`,
          a: `$2,800 ÷ $70 = 40 months to break even. She expects to keep the loan 36 months — she'd sell before the points pay for themselves, so buying them loses money. The break-even test is cost of points divided by monthly savings, compared against how long she'll actually hold the loan.`,
        },
      },
      {
        heading: 'mortgage insurance math',
        paras: [
          {
            html: `Monthly PMI is loan × factor ÷ 12. A $355,000 loan with a 0.85% factor: $3,017.50 a year, <span class="cloze" data-accept='["251.46","$251.46"]' data-reveal="$251.46">?</span> a month. The factor itself comes off the insurer's rate card — product, LTV, term, score — which is why unit 08 called the PMI company a second underwriter.`,
          },
          {
            html: `FHA's upfront premium is its own two steps: base loan × <span class="cloze" data-accept='["1.75","1.75%"]' data-reveal="1.75%">?</span>, added to the base, then the total rounded <i>down</i> to the nearest $50. A $300,000 purchase with 3.5% down: base $289,500, UFMIP $5,066.25, total <span class="cloze" data-accept='["294,550","294550","$294,550"]' data-reveal="$294,550">?</span>.`,
          },
        ],
      },
      {
        heading: 'the ARM adjustment',
        paras: [
          {
            html: `When the fixed period ends, the new rate is <b>index + margin</b>, rounded to the nearest <span class="cloze" data-accept='["1/8","one-eighth","0.125","1/8th","eighth"]' data-reveal="1/8">?</span> of a percent, then checked against the caps. Index at 2.899, margin 2.125: the sum is 5.024, which rounds to <span class="cloze" data-accept='["5","5%","5.000","5.0"]' data-reveal="5%">?</span>. The caps from Module 5's ladder still rule the result — the formula proposes, the caps dispose.`,
          },
        ],
      },
      {
        heading: 'cash to close',
        paras: [
          {
            html: `The number the borrower actually asks about is an assembly, not a formula: down payment + settlement fees + prepaids + the escrow deposit − every credit in play (earnest money already paid, seller concessions, the lender credit a above-par rate generated). Every piece was computed somewhere above; cash to close is just the honest sum of them.`,
          },
        ],
      },
    ],
    review: {
      flashcards: [
        { peg: 'why 360', topic: 'per diem', q: 'Why does mortgage per-diem math divide by 360?', a: `Because <span class='hl'>365 doesn't divide evenly by 12</span> — the industry's banker's year is 360, so per diem = annual interest ÷ 360.` },
        { peg: 'the recoup', topic: 'points', q: 'The break-even formula for discount points?', a: `<span class='hl'>Cost of the points ÷ monthly savings = months to break even</span> — worth it only if the borrower keeps the loan longer than that.` },
        { peg: 'round down', topic: 'FHA math', q: 'The two FHA UFMIP steps?', a: `Base loan × <span class='hl'>1.75%</span>, add to the base, then round the total <span class='hl'>down to the nearest $50</span>.` },
        { peg: 'propose, dispose', topic: 'ARM math', q: 'The ARM adjustment formula — and what still overrides it?', a: `New rate = <span class='hl'>index + margin</span>, rounded to the nearest <span class='hl'>1/8%</span> — then the <span class='hl'>caps</span> override whatever the formula produced.` },
        { peg: 'which base', topic: 'points', q: 'A point is 1% of what, exactly?', a: `The <span class='hl'>loan amount</span> — never the purchase price. 2 points on a $315,000 loan is $6,300 regardless of what the house cost.` },
      ],
      mcq: [
        {
          q: 'A $288,000 loan at 6.25% funds with 11 days left in the month. Interim interest due at closing is:',
          opts: ['$500.00', '$495.00', '$550.00', '$605.00'],
          correct: 2,
        },
        {
          q: 'A borrower puts $78,000 down on a $520,000 purchase that appraises at $520,000. Her LTV is:',
          opts: ['15%', '85%', '80%', '87%'],
          correct: 1,
        },
        {
          q: 'Gross monthly income $9,000; housing $2,430; other debts $1,080. The ratios are:',
          opts: ['39/27', '27/39', '24/36', '27/12'],
          correct: 1,
        },
        {
          q: 'A 5/1 ARM leaves its fixed period with an index of 3.41 and a margin of 2.25. Before caps, the new rate is:',
          opts: ['5.75%', '5.66%', '5.625%', '5.5%'],
          correct: 2,
        },
        {
          q: 'A $410,000 loan carries a 0.60% PMI factor. The monthly premium is:',
          opts: ['$205.00', '$246.00', '$2,460.00', '$24.60'],
          correct: 0,
        },
      ],
    },
    recap: {
      plainLanguage: `One page of formulas covers the exam's math: interest by the day on a 360 divisor, the payment plus escrowed twelfths, the lesser rule inside every LTV, ratios as two divisions, points against their break-even, MI factors over 12, and index + margin rounded to the eighth.`,
      facts: [
        `Per diem = balance × rate ÷ <span class="hl">360</span> · interim interest = per diem × days left in the month`,
        `PITI = P&I + <span class="hl">annual T&I ÷ 12</span> — fixed rate fixes only the P&I`,
        `Purchase LTV denominator: the <span class="hl">lesser</span> of price or appraisal · TLTV uses full <span class="hl">line amounts</span>`,
        `Point = 1% of the <span class="hl">loan</span> · break-even = cost ÷ <span class="hl">monthly savings</span>`,
        `PMI = loan × factor ÷ 12 · FHA UFMIP = base × <span class="hl">1.75%</span>, round down to $50`,
        `ARM reset = index + margin → nearest <span class="hl">1/8%</span> → capped`,
      ],
    },
  },
];

export default unitsB;

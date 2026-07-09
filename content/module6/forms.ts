// content/module6/forms.ts
// Module 6 — the nine loan-application forms (six URLA forms + URAR + LE + CD):
// 42 sections, 233 fields, 65 rules, 16 traps. Authored from Module 6 pp. 380-494.
// Plus the lesson path: CHUNKS (17 lessons), CLOZE (15 hand-authored items), PAYOFF.
// Data only — consumed by lib/module6/{learnForms,formExplorer}.ts. Ported verbatim
// from the module 6 expansion prototype (learn-the-forms.html / form-explorer.html),
// which is the visual + interaction ground truth.

export interface SectionDef {
  id: string;
  name: string;
  purpose: string;
  fields: string[];
  rules: string[];
  trap: string | null;
}
export interface FormDef {
  id: string;
  name: string;
  aka: string;
  who: string;
  when: string;
  note: string | null;
  sections: SectionDef[];
}
export interface Chunk { id: string; form: string; title: string; secs: string[]; }
export interface Cloze { chunk: string; q: string; a: string; d: string[]; }

export const FORMS: FormDef[] = [
{id:"borrower", name:"Borrower Information Form", aka:"Part of the URLA · Fannie Mae 1003 / Freddie Mac 65",
 who:"The borrower", when:"Single-borrower applications, and joint applications where each borrower has separate personal assets",
 note:"Every field gets addressed. A field is left blank only when it truly doesn\u2019t apply \u2014 never because the answer is inconvenient or hard to get.",
 sections:[
  {id:"1a", name:"1a \u00b7 Personal information",
   purpose:"Establishes identity, the credit type requested, household, contact details, and residential history.",
   fields:["Legal name exactly as on government photo ID","Aliases, prior names, name variations","Social Security number","Date of birth","Citizenship status","Individual or joint credit","Marital status","Dependents and their ages","Home, cell, and work phone; email","Current address, time there, own or rent, monthly housing expense","Former address if under two years at current","Mailing address if different"],
   rules:["Marital status has exactly three permissible choices: married, separated, unmarried.","\u201cUnmarried\u201d covers single, divorced, widowed, civil union, domestic partnership, and registered reciprocal beneficiary.","A complete two-year residential history is required. If under two years at the current address, account for everything before it \u2014 including living with relatives, homelessness, incarceration, hospitalization, or institutionalization.","At two years or more, mark the former-address line \u201cDoes not apply.\u201d","Dependents are the ones claimed on the federal tax return, listed youngest first. Not limited to children."],
   trap:"Asking why someone is unmarried violates ECOA. They may volunteer it; you may not solicit it, directly or indirectly."},
  {id:"1b", name:"1b \u00b7 Current employment and income",
   purpose:"Documents the primary borrower\u2019s current employer, employment characteristics, self-employment status, and monthly income.",
   fields:["Employer name as it appears on paystubs","Employer main phone and full work address","Position or title","Start date","Years in the line of work","Whether employed by a family member, the seller, a real-estate agent, or another party to the transaction","Business owner / self-employed box and ownership share","Base, overtime, bonus, commission, military entitlements, other"],
   rules:["Owning 25% or more of the business that employs you means self-employed \u2014 regardless of how you\u2019re paid or how you describe yourself.","All income is entered as a monthly equivalent.","Self-employment income generally goes in \u201cOther,\u201d determined from the most recent federal tax returns.","Use actual income documentation, not verbal estimates.","Total monthly income must agree with both the income column total and the \u201cMonthly Income (or Loss)\u201d field.","If employment and income aren\u2019t relevant, or there\u2019s no employer, mark \u201cDoes not apply.\u201d"],
   trap:"Before you ask about alimony, child support, or separate maintenance, you must tell the applicant it doesn\u2019t need to be disclosed unless they want it counted. Exception: income-sensitive products with household caps, like Community Lending Programs and USDA."},
  {id:"1c", name:"1c \u00b7 Additional employment",
   purpose:"A second job, filled out exactly like 1b.",
   fields:["Same fields as 1b, for the additional employment"],
   rules:["Complete it the same way as 1b when there\u2019s employment beyond what 1b records.","Otherwise mark \u201cDoes not apply.\u201d"],
   trap:null},
  {id:"1d", name:"1d \u00b7 Previous employment",
   purpose:"Accounts for the prior two years of employment, gaps included.",
   fields:["Employer name and complete address","Position or title","Start date and end date","Previous gross monthly income","Business owner / self-employed indicator"],
   rules:["The prior two years must be accounted for, including gaps caused by unemployment.","More than one previous employer? Use the Continuation Sheet.","25% or more ownership counts as self-employment here too."],
   trap:null},
  {id:"1e", name:"1e \u00b7 Income from other sources",
   purpose:"Income that isn\u2019t from the employment already disclosed.",
   fields:["Alimony","Child support","Separate maintenance","Automobile allowance","Boarder income","Capital gains","Disability income","Foster care","Housing or parsonage allowance","Interest and dividends","Mortgage credit certificate income","Mortgage differential payments","Notes receivable","Public assistance","Retirement income","Royalty payments","Social Security","Trust income","Unemployment benefits","VA compensation","Other"],
   rules:["Record each source and its monthly amount, then total the section.","Enter the primary borrower\u2019s name at the bottom of the page.","If the borrower discloses alimony, child support, or separate maintenance, the file may need to establish source, seasoning, and likelihood of continuation."],
   trap:"Don\u2019t require disclosure of alimony, child support, or separate maintenance unless the borrower wants it considered \u2014 or an income-sensitive product requires all household income."},
  {id:"2a", name:"2a \u00b7 Assets: bank, retirement, other accounts",
   purpose:"Records the accounts the borrower can draw on.",
   fields:["Checking accounts","Savings accounts","Money-market accounts","Certificates of deposit","Mutual funds","Stocks","Stock options","Bonds","Retirement accounts","Bridge-loan proceeds","Trust accounts"],
   rules:["In a joint application where borrowers own only joint assets, list each joint asset once. Don\u2019t duplicate it."],
   trap:null},
  {id:"2b", name:"2b \u00b7 Other assets and credits",
   purpose:"Assets and credits that aren\u2019t accounts.",
   fields:["Proceeds from real estate to be sold on or before closing","Proceeds from sale of a non-real-estate asset","Secured borrowed funds","Unsecured borrowed funds","Earnest money","Sweat equity","Trade equity","Employer assistance","Relocation funds","Rent credit","Lot equity"],
   rules:["Describe the asset or credit type and record its cash or market value.","Enter the asset total at the bottom of the section."],
   trap:"A vehicle counts as an asset only if its value is supported: an appraisal, minus any vehicle liens, plus a title showing no lien or a release for one."},
  {id:"2c", name:"2c \u00b7 Liabilities: cards, debts, leases",
   purpose:"Every debt with a monthly obligation.",
   fields:["Account type: revolving, installment, open 30-day, lease, or other","Creditor name","Account number","Unpaid balance","Whether it\u2019s paid off at or before closing","Minimum monthly payment"],
   rules:["The loan origination system may populate this from the credit report \u2014 you remain responsible for reviewing the whole report.","Search for duplicate accounts: bureaus format account numbers differently, so one account can appear as two. Compare creditor, origination date, balance, and payment. Remove duplicates only with a documented reason.","Enter open revolving accounts with zero balances manually \u2014 especially HELOCs. Systems omit them, but a zero balance today doesn\u2019t remove future access to the line.","A liability showing no payment amount needs documentation of the required minimum, or what would be due absent deferment.","No liabilities at all? Mark \u201cDoes not apply.\u201d"],
   trap:"Installment debt with ten or fewer months remaining is the exception to the missing-payment rule \u2014 subject to judgment and underwriting requirements."},
  {id:"2d", name:"2d \u00b7 Other liabilities and expenses",
   purpose:"Legally obligated or recurring expenses.",
   fields:["Alimony","Child support","Separate maintenance","Job-related expenses","Other obligations"],
   rules:["Enter the expense type and its monthly equivalent.","A legal obligation to pay alimony, child support, or separate maintenance needs evidence of the obligation and the amount \u2014 the applicable order, for instance."],
   trap:"For alimony owed, the lender may reduce income by the monthly amount rather than add it as a liability. Same math, different place."},
  {id:"3a", name:"3a \u00b7 Property you own",
   purpose:"Every piece of real estate owned \u2014 even property owned free and clear.",
   fields:["Complete address including unit and country","Property value","Status: sold, pending sale, rental, retained","Intended occupancy: investment, primary, second home, other","Property type: SFR, 2\u20134FAM, COMM, PUD, CONDO, COOP, land","Gross monthly rental income (2\u20134 unit primary or investment)","Insurance, maintenance, taxes, and miscellaneous","Outstanding liens and loan details"],
   rules:["Disclose residential, commercial, vacant land, and free-and-clear property. Even a lien-free property carries mandatory expenses like real-estate taxes.","Ideally determine net rental income from Schedule E of the most recent federal tax return.","No return available? Use 75% of the gross rent shown on the lease, minus PITI \u2014 the discount accounts for vacancy."],
   trap:"If multiple liens are entered on separate lines, enter the housing expense only once."},
  {id:"3bc", name:"3b & 3c \u00b7 Additional property",
   purpose:"Overflow for more properties.",
   fields:["Same fields as 3a, repeated per property"],
   rules:["Complete as in 3a for each additional property."],
   trap:null},
  {id:"4a", name:"4a \u00b7 Loan and property information",
   purpose:"Defines what\u2019s being borrowed and against what.",
   fields:["Requested loan amount","Loan purpose: purchase, refinance, or other","Complete subject-property address","Number of units","Estimated property value","Intended occupancy: primary, second home, investment, FHA secondary residence","Whether the property is mixed use","Whether the property is manufactured housing"],
   rules:[],
   trap:"\u201cFHA secondary residence\u201d is a distinct occupancy choice here \u2014 not the same as a second home."},
  {id:"4b", name:"4b \u00b7 Other new mortgage loans",
   purpose:"Subordinate or piggyback financing on the same property.",
   fields:["Creditor name","Lien position: first or subordinate","Monthly payment","Current or future unpaid balance","Credit limit, if applicable"],
   rules:["Use it when the borrower is pursuing subordinate or piggyback financing, or refinancing while keeping an existing subordinate lien.","No current or simultaneous second liens? Mark \u201cDoes not apply.\u201d"],
   trap:null},
  {id:"4c", name:"4c \u00b7 Rental income on the property being purchased",
   purpose:"Expected rent from the subject property itself.",
   fields:["Expected monthly rental income"],
   rules:["Use it for a multifamily primary residence or an investment property.","Refinance, or single-family primary residence? Mark \u201cDoes not apply.\u201d"],
   trap:"3a is rent from property already owned. 4c is rent from the property being bought. Same idea, different section."},
  {id:"4d", name:"4d \u00b7 Gifts or grants",
   purpose:"Money toward the transaction the borrower doesn\u2019t have to repay.",
   fields:["Asset type: cash gift, gift of equity, or grant","Whether it has been deposited","Source","Cash or market value"],
   rules:["Listed eligible sources: community nonprofit, employer, federal agency, local agency, state agency, relative, religious nonprofit, unmarried partner, lender, other acceptable source."],
   trap:null},
  {id:"5a", name:"5a \u00b7 Declarations: this property and your money",
   purpose:"Risk questions about the transaction itself.",
   fields:["Will you occupy it as your primary residence?","If yes, have you owned property in the last three years?","If so: property type, and how title was held","Do the buyer and seller have a family or business relationship?","Is any part of your down payment borrowed? How much?","Are you applying for other credit not on this application?","Could any lien take priority over this mortgage?"],
   rules:["The MLO must ask every declaration question and may never answer on the applicant\u2019s behalf.","Borrowed down-payment funds may need their payment counted in underwriting."],
   trap:null},
  {id:"5b", name:"5b \u00b7 Declarations: your finances",
   purpose:"Risk questions about the borrower\u2019s credit history.",
   fields:["Cosigner or guarantor on undisclosed debt","Outstanding judgments","Currently delinquent or in default on federal debt","Party to a lawsuit creating personal financial liability","Conveyed title in lieu of foreclosure in the last seven years","Pre-foreclosure or short sale in the last seven years","Foreclosure in the last seven years","Bankruptcy in the last seven years, and the chapter"],
   rules:["Four of these look back exactly seven years: deed in lieu, short sale, foreclosure, bankruptcy."],
   trap:"Default on federal debt makes a borrower ineligible for FHA financing."},
  {id:"6", name:"6 \u00b7 Acknowledgements and agreements",
   purpose:"The borrower reads the terms, then signs and dates.",
   fields:["Borrower signature","Date"],
   rules:["The applicant should read and understand the rights, responsibilities, and terms before signing, and may consult counsel."],
   trap:"The application is a legal document. Signing one with false or inaccurate information may be fraud, or a false statement to a financial institution."},
  {id:"7", name:"7 \u00b7 Military service",
   purpose:"Establishes VA eligibility.",
   fields:["Has the applicant, or the applicant\u2019s spouse, served or is currently serving?","Relevant status","Projected expiration of service or tour, for current service"],
   rules:[],
   trap:null},
  {id:"8", name:"8 \u00b7 Demographic information",
   purpose:"The government-monitoring questionnaire tied to HMDA.",
   fields:["Ethnicity, with Hispanic or Latino subgroups","Sex: female, male, or decline","Race, one or more categories, with subcategories"],
   rules:["Tell the applicant the information is required by the federal government and does not affect the loan decision.","The borrower\u2019s self-identification controls \u2014 regardless of how you might interpret their characteristics.","Face-to-face: if they decline, advise that federal law requires you to determine ethnicity, sex, and race by visual observation or surname. If they still decline, mark only the primary categories \u2014 no subcategories.","Not face-to-face (phone, email, online, text, video-less virtual, TTY relay): if they decline, mark the three \u201cI do not wish to provide\u201d boxes.","After an in-person application, record whether the data came from visual observation or surname, and identify the channel: face-to-face, telephone, fax/mail, email, or Internet."],
   trap:"On a non-face-to-face application, never change a declined designation later \u2014 even if you come to believe you can identify the applicant\u2019s race, national origin, or sex."},
  {id:"9", name:"9 \u00b7 Loan originator information",
   purpose:"Identifies who took the application, and attests to it.",
   fields:["Organization name, address, unique identifier, state license number","MLO name, unique identifier, state license number","MLO email and telephone","MLO signature and date"],
   rules:["By signing, the MLO attests to assisting in the truthful, correct, and complete preparation of the application."],
   trap:"Signing an application that doesn\u2019t meet that standard can create criminal exposure, including for a false statement to a financial institution."}
 ]},

{id:"addl", name:"Additional Borrower Form", aka:"Part of the URLA",
 who:"The co-borrower", when:"Joint applications where the borrower and co-borrower share all assets",
 note:"Filled out like the Borrower Information Form, with four sections handled by cross-reference instead of repetition.",
 sections:[
  {id:"a2", name:"Section 2 \u00b7 Assets and liabilities", purpose:"Cross-reference, not a repeat.",
   fields:["Name of the primary borrower whose form holds the co-borrower\u2019s assets and liabilities"], rules:[], trap:null},
  {id:"a3", name:"Section 3 \u00b7 Real estate", purpose:"Cross-reference.",
   fields:["Name of the primary borrower whose form holds the co-borrower\u2019s real-estate information"], rules:[], trap:null},
  {id:"a4", name:"Section 4 \u00b7 Loan and property", purpose:"Cross-reference.",
   fields:["Name of the primary borrower whose form holds the co-borrower\u2019s loan and property information"], rules:[], trap:null},
  {id:"a6", name:"Section 6 \u00b7 Acknowledgements", purpose:"Cross-reference.",
   fields:["Name of the primary borrower whose form the co-borrower signed"], rules:[], trap:null},
  {id:"arest", name:"All other sections", purpose:"Completed exactly like the Borrower Information Form.",
   fields:["Sections 1, 5, 7, 8, 9 \u2014 same as the borrower\u2019s form"],
   rules:["If co-borrowers have their own individual assets, don\u2019t use this form. Each completes a separate Borrower Information Form."], trap:null}
 ]},

{id:"unmarried", name:"Unmarried Addendum", aka:"Part of the URLA",
 who:"Each unmarried borrower", when:"Two or more borrowers apply for joint credit and are not legally married to each other",
 note:"Exists because some states give civil unions, domestic partnerships, and registered reciprocal-beneficiary relationships property rights similar to marriage.",
 sections:[
  {id:"u1", name:"Non-spouse property rights",
   purpose:"Asks whether another non-spouse may hold real-property rights recognized by the state.",
   fields:["Does another non-spouse have such rights?","Relationship: civil union, domestic partnership, registered reciprocal beneficiary, or other with explanation","The state involved"],
   rules:["The state that matters is where the applicant lives, or where the subject property is located."],
   trap:null}
 ]},

{id:"lender", name:"Lender Loan Information Form", aka:"Part of the URLA",
 who:"The lender", when:"Every mortgage application",
 note:"Moves borrower-supplied information into lender-focused underwriting fields.",
 sections:[
  {id:"L1", name:"L1 \u00b7 Property and loan information",
   purpose:"Transaction features and property context.",
   fields:["Whether a borrower lives in a community-property state","Whether the property is in a community-property state","Whether a contract-for-deed or land-contract conversion is pending or done","Renovation, construction-conversion, or construction-to-permanent financing","Single-closing or two-closing construction financing","Construction or improvement costs","Lot acquisition date and original cost","Project type: condominium, cooperative, PUD, none","Refinance type: no cash-out, limited cash-out, cash-out","Refinance program: full documentation, interest-rate reduction, streamlined without appraisal, other","Whether energy-related improvements are financed","Whether another lien may take priority"],
   rules:[], trap:null},
  {id:"L2", name:"L2 \u00b7 Title information",
   purpose:"Who will hold title, how, and on what kind of estate.",
   fields:["Names of everyone who will hold title \u2014 or currently holds it, on a refinance","Estate type: fee simple or leasehold","Title-holding method: sole ownership, life estate, tenancy in common, joint tenancy with right of survivorship, tenancy by the entirety, other","Living-trust or land-trust information","Indian Country Land Tenure designation"],
   rules:["Fee simple: the borrower owns the land and the improvements. Leasehold: the borrower owns the improvements but not the land underneath.","On a leasehold, the title or escrow company must confirm the lease term outlasts the new mortgage by at least five years. If not, renew it, buy it out, or escrow enough funds to buy it out \u2014 or clear title may not be available and the loan may be declined.","Refer title-holding advice to a title professional or attorney unless you have genuine competence there."],
   trap:"An ownership interest doesn\u2019t make someone liable for the debt. Never assume the borrowers are the only owners \u2014 ask."},
  {id:"L3", name:"L3 \u00b7 Mortgage loan information",
   purpose:"Defines the proposed mortgage, and itemizes the payment.",
   fields:["Mortgage type: conventional, FHA, VA, USDA-RD, other","Interest rate","Loan term in months","Lien position","Amortization type: fixed, adjustable, other","Months to first adjustment; months between adjustments","Balloon payment and term","Interest-only feature and term","Potential negative amortization","Prepayment penalty and term","Temporary buydown, initial buydown rate, and percentage"],
   rules:["The proposed monthly payment is itemized, not shown as one undifferentiated PITI.","Components: first-lien P&I, subordinate-debt payment, homeowners insurance, supplemental property insurance, property taxes, mortgage insurance, condo/co-op/PUD dues, other mandatory ownership expense."],
   trap:null},
  {id:"L4", name:"L4 \u00b7 Qualifying the borrower",
   purpose:"A calculation check: minimum required funds, or cash back.",
   fields:["Sales-contract price","Improvements, renovation, repairs","Land cost or value when acquired separately","Payoffs of loans in a refinance","Other debts paid through loan proceeds","Settlement fees","Discount points","Total costs","Loan amount, less any financed mortgage-insurance premium","Other loans being obtained","Total loans","Seller credits and other credits"],
   rules:["Total costs above total credits \u2192 the difference is the borrower\u2019s required cash at settlement.","Total credits above total costs \u2192 the difference is cash back from loan proceeds."],
   trap:null}
 ]},

{id:"cont", name:"Continuation Sheet", aka:"Part of the URLA",
 who:"Either borrower", when:"Any section needs more space \u2014 a second previous employer, for instance",
 note:null,
 sections:[
  {id:"c1", name:"The sheet itself",
   purpose:"Overflow space for application information.",
   fields:["Whether the information relates to the primary or secondary borrower","The overflow information"],
   rules:["When the sheet is used, both borrowers sign and date the addendum."],
   trap:null}
 ]},

{id:"scif", name:"Supplemental Consumer Information Form", aka:"SCIF \u00b7 FNMA/FHLMC Form 1103",
 who:"The borrower", when:"Required as part of residential mortgage applications",
 note:"Begins with the borrower\u2019s complete name.",
 sections:[
  {id:"s1", name:"Section 1 \u00b7 Homeownership education and counseling",
   purpose:"Whether the applicant completed education or counseling before applying.",
   fields:["Whether either program was completed in the 12 months before the application","Format","Provider and provider information","Date completed"],
   rules:["The lookback is 12 months preceding the mortgage application.","If no designated program was completed, make the corresponding indication."],
   trap:null},
  {id:"s2", name:"Section 2 \u00b7 Preferred language",
   purpose:"The applicant\u2019s preferred language for communication and loan documents.",
   fields:["English","Chinese","Spanish","Tagalog","Vietnamese","Other","Decline to respond"],
   rules:["Completing the form is required."],
   trap:"The lender isn\u2019t required to accommodate the language the borrower selects. The information only helps where accommodation is possible."}
 ]},

{id:"urar", name:"Uniform Residential Appraisal Report", aka:"URAR \u00b7 Fannie Mae 1004 / Freddie Mac 70",
 who:"The appraiser", when:"The principal common appraisal form",
 note:"Seven pages, in a fixed order.",
 sections:[
  {id:"p1", name:"Page 1", purpose:"The property and its context.",
   fields:["Subject property","Contract","Neighborhood","Site","Noted improvements"], rules:[], trap:null},
  {id:"p2", name:"Page 2", purpose:"The comparison that produces the value.",
   fields:["Sales comparison approach","Reconciliation"], rules:[], trap:null},
  {id:"p3", name:"Page 3", purpose:"The other two approaches, where they apply.",
   fields:["Additional comments","Cost approach, if applicable","Income approach, if applicable","Project information, if applicable"], rules:[], trap:null},
  {id:"p46", name:"Pages 4\u20136", purpose:"The appraiser\u2019s terms and certifications.",
   fields:["Scope of work","Intended use and intended user","Definition of market value","Assumptions and limiting conditions","Appraiser certification","Supervisory appraiser certification"], rules:[], trap:null},
  {id:"p6", name:"Page 6", purpose:"Signatures.",
   fields:["Appraiser and supervisory appraiser signatures and identification"], rules:[], trap:null},
  {id:"p7", name:"Page 7", purpose:"How to use the form.",
   fields:["Instructions for URAR use","Modifications","Scope of work","Required exhibits"], rules:[], trap:null}
 ]},

{id:"le", name:"Loan Estimate", aka:"TRID",
 who:"The lender", when:"Within three general business days of a complete application",
 note:"A revised Loan Estimate is due within three general business days after a valid change of circumstance.",
 sections:[
  {id:"le1", name:"What it describes",
   purpose:"The cost, fee, and payment picture for the loan being offered.",
   fields:["Property","Sales price","Loan term","Loan purpose","Product","Loan type","Rate-lock status","Specific loan terms","Projected payments","Cash to close","Closing-cost details and breakdown","Comparisons","Other considerations"],
   rules:["It may also be given to a prospective customer who is only asking about a scenario\u2019s costs, fees, and payment."],
   trap:null}
 ]},

{id:"cd", name:"Closing Disclosure", aka:"TRID",
 who:"The lender", when:"Received at least three precise business days before settlement",
 note:"The loan\u2019s final accounting. The borrower also receives a final Closing Disclosure at settlement.",
 sections:[
  {id:"cd1", name:"Delivery and the waiting period",
   purpose:"When it has to land, and what restarts the clock.",
   fields:["Three precise business days before scheduled settlement","Six precise business days when mailed or emailed","Confirmed receipt starts the three-day clock early"],
   rules:["A precise business day is any day other than Sunday or a federal holiday.","A bona fide financial emergency can support an approved waiver.","After consummation, a corrected Closing Disclosure is due within 60 calendar days for non-numerical clerical errors and cure of tolerance violations."],
   trap:"A revised Closing Disclosure restarts the three-precise-business-day wait. For rescindable transactions, every property owner receives one."}
 ]}
];


/* Lessons: each is one bite. 2-5 sections max. */
export const CHUNKS: Chunk[] = [
 {id:"b1", form:"borrower", title:"Who they are",            secs:["1a"]},
 {id:"b2", form:"borrower", title:"What they earn",          secs:["1b","1c","1d","1e"]},
 {id:"b3", form:"borrower", title:"What they have and owe",  secs:["2a","2b","2c","2d"]},
 {id:"b4", form:"borrower", title:"What they already own",   secs:["3a","3bc"]},
 {id:"b5", form:"borrower", title:"What they're asking for", secs:["4a","4b","4c","4d"]},
 {id:"b6", form:"borrower", title:"What they declare",       secs:["5a","5b"]},
 {id:"b7", form:"borrower", title:"Signing off",             secs:["6","7","8","9"]},
 {id:"ad", form:"addl",     title:"The co-borrower's form",  secs:["a2","a3","a4","a6","arest"]},
 {id:"un", form:"unmarried",title:"The unmarried addendum",  secs:["u1"]},
 {id:"l1", form:"lender",   title:"The property and its title", secs:["L1","L2"]},
 {id:"l2", form:"lender",   title:"The loan and the cash to close",   secs:["L3","L4"]},
 {id:"ct", form:"cont",     title:"The continuation sheet",  secs:["c1"]},
 {id:"sc", form:"scif",     title:"The SCIF",                secs:["s1","s2"]},
 {id:"u1p",form:"urar",     title:"The appraisal: the value", secs:["p1","p2","p3"]},
 {id:"u2p",form:"urar",     title:"The appraisal: the terms", secs:["p46","p6","p7"]},
 {id:"le", form:"le",       title:"The Loan Estimate",       secs:["le1"]},
 {id:"cd", form:"cd",       title:"The Closing Disclosure",  secs:["cd1"]},
];

/* Hand-authored cloze. Each: the sentence with ___, the answer, three distractors. */
export const CLOZE: Cloze[] = [
 {chunk:"b1", q:"Marital status has exactly ___ permissible choices: married, separated, unmarried.", a:"three", d:["two","four","five"]},
 {chunk:"b1", q:"The application requires a complete ___ residential history.", a:"two-year", d:["one-year","three-year","five-year"]},
 {chunk:"b2", q:"Owning ___ or more of the business that employs you makes you self-employed.", a:"25%", d:["10%","20%","50%"]},
 {chunk:"b2", q:"Previous employment must account for the prior ___.", a:"two years", d:["one year","three years","seven years"]},
 {chunk:"b3", q:"Installment debt with ___ months remaining is the exception to the missing-payment rule.", a:"ten or fewer", d:["three or fewer","six or fewer","twelve or fewer"]},
 {chunk:"b4", q:"With no tax return available, use ___ of the gross rent on the lease, minus PITI.", a:"75%", d:["50%","80%","100%"]},
 {chunk:"b6", q:"Deed in lieu, short sale, foreclosure, and bankruptcy each look back exactly ___.", a:"seven years", d:["three years","five years","ten years"]},
 {chunk:"b6", q:"If they'll occupy it as a primary residence, ask whether they've owned property in the last ___.", a:"three years", d:["two years","five years","seven years"]},
 {chunk:"b7", q:"On a non-face-to-face application where the borrower declines, mark the ___ \u201cI do not wish to provide\u201d boxes.", a:"three", d:["two","four","five"]},
 {chunk:"l1", q:"A leasehold's term must outlast the new mortgage by at least ___.", a:"five years", d:["one year","three years","ten years"]},
 {chunk:"sc", q:"The SCIF asks about education or counseling completed in the ___ before the application.", a:"12 months", d:["6 months","24 months","36 months"]},
 {chunk:"le", q:"The Loan Estimate is due within ___ of a complete application.", a:"three general business days", d:["three precise business days","seven calendar days","thirty calendar days"]},
 {chunk:"cd", q:"The borrower must receive the Closing Disclosure at least ___ before settlement.", a:"three precise business days", d:["three general business days","six precise business days","one business day"]},
 {chunk:"cd", q:"Mailed or emailed, the Closing Disclosure wait expands to ___.", a:"six precise business days", d:["four precise business days","seven calendar days","ten business days"]},
 {chunk:"cd", q:"After consummation, a corrected Closing Disclosure is due within ___.", a:"60 calendar days", d:["30 calendar days","3 business days","90 calendar days"]},
];

/* One plain sentence per lesson. Shapes and lengths vary because the lessons do. */
export const PAYOFF: Record<string, string> = {
 b1:"Section 1a is identity: legal name, marital status, dependents, and two years of addresses. Asking a borrower why they\u2019re unmarried violates ECOA.",
 b2:"Current job in 1b, a second job in 1c, the prior two years in 1d, other sources in 1e. Owning 25% of the business that employs you makes you self-employed.",
 b3:"Accounts in 2a, other assets and credits in 2b, debts in 2c, obligations like alimony in 2d. A HELOC with a zero balance still gets entered by hand.",
 b4:"Every property the borrower owns goes in Section 3 \u2014 even one owned free and clear, because it still carries taxes.",
 b5:"Section 4 defines the loan: the amount, the property, any piggyback second, and any gift.",
 b6:"You ask every declaration question yourself and never answer one for the borrower. Default on federal debt ends FHA eligibility.",
 b7:"Acknowledgements, military service, demographic information, then your own signature and NMLS number.",
 ad:"Shared assets: one Borrower Information Form plus this one. Separate assets: each borrower gets their own Borrower Information Form.",
 un:"Two unmarried borrowers applying together need this, because some states give partners property rights close to a spouse\u2019s.",
 l1:"Fee simple means the borrower owns the land. Leasehold means they don\u2019t \u2014 and the lease has to outlast the mortgage by five years.",
 l2:"L3 defines the mortgage and itemizes the payment. L4 nets total costs against total credits: cash to close when costs win, cash back when credits do.",
 ct:"More room than a section allows. Both borrowers sign it.",
 sc:"Two questions: whether the borrower completed counseling in the 12 months before applying, and what language they prefer. The lender doesn\u2019t have to accommodate that language.",
 u1p:"Page 1 is the property. Page 2 is the sales comparison that produces the value. Page 3 holds the cost and income approaches.",
 u2p:"Pages 4 through 6 carry the appraiser\u2019s scope and certifications. Page 6 carries the signatures.",
 le:"It describes the loan\u2019s terms, projected payments, and cash to close, and it\u2019s due within three general business days of a complete application.",
 cd:"Three precise business days before settlement. Six if it\u2019s mailed. Sixty calendar days after consummation to send a correction.",
};


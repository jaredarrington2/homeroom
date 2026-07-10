// content/module6/application.ts
// Module 6 — Stage 1: the Application, taught through one worked borrower (Maya
// Okonkwo) instead of a section-by-section tour. Data only — consumed by
// components/Application.tsx. The form structure itself is reused from FORMS
// (the "borrower" form) in ./forms; this module adds the story layer: Maya's
// answers, the seven chapter framings, the beats, the judgment calls, and the
// study/recap decks. Ported from the stage-1 preview (stage1-preview.html),
// which is the visual + interaction ground truth. Intros are de-llm'd: they
// frame the "why" before any field, and never restate a heading.

export interface AppChapter {
  id: string;
  q: string;
  secs: string[];
  intro: string;
}
export interface StudyPair {
  front: string;
  back: string;
}
export interface Scenario {
  chapter: string;
  stem: string;
  right: string;
  wrong: string[];
  teach: string;
}
export interface HeroDef {
  file: string;
  side: "left" | "right";
}

export const MAYA_INTRO =
  "Maya Okonkwo is a 29-year-old marketing coordinator in San Francisco. She rents now, earns a steady " +
  "salary, and has saved enough for a down payment on her first home — a $340,000 condo across the bay in " +
  "Oakland. She has never applied for a mortgage. Her file runs through the whole application, and it’s the " +
  "one we’ll learn from: what each part of the form captures, and where an originator has to take care.";

export const CHAPTERS: AppChapter[] = [
  {
    id: "ch1",
    q: "Who they are",
    secs: ["1a"],
    intro:
      "Every loan starts with a person, and the lender has to establish exactly who: the legal identity, who " +
      "depends on their income, and where they’ve lived for the past two years. Most of it is simple to record. " +
      "One line — marital status — falls under fair-lending rules that limit what you’re allowed to ask.",
  },
  {
    id: "ch2",
    q: "What they earn",
    secs: ["1b", "1c", "1d", "1e"],
    intro:
      "A lender is really asking one thing across this whole part: can this person keep paying? Every field is " +
      "evidence for it — where the money comes from, how steady it is, how long it’s lasted. Maya draws a single " +
      "salary, so her income is easy to document. The harder files are the ones with several sources, or self-employment.",
  },
  {
    id: "ch3",
    q: "What they have and owe",
    secs: ["2a", "2b", "2c", "2d"],
    intro:
      "This part holds two questions at once: what the borrower could put toward the loan, and what already pulls " +
      "money from their pocket each month — assets, then debts. Maya’s are ordinary: a savings account, a car loan " +
      "almost paid off, an old credit line she’d forgotten. Each comes with a rule that’s easy to get wrong.",
  },
  {
    id: "ch4",
    q: "What they already own",
    secs: ["3a", "3bc"],
    intro:
      "Before lending against a new property, the lender wants every property the borrower already holds — even one " +
      "owned free and clear, since it still costs money to keep. Maya owns none; she’s a first-time buyer. Her file " +
      "reads “does not apply” here, which makes it a good place to learn what you’d do if she owned three.",
  },
  {
    id: "ch5",
    q: "What they’re asking for",
    secs: ["4a", "4b", "4c", "4d"],
    intro:
      "The earlier parts described the borrower; this one describes the deal — how much, against what, to live in or " +
      "rent, and where the cash to close comes from. Maya wants a $315,000 loan on a $340,000 condo she’ll live in. " +
      "It’s straightforward, except that one section here is easy to confuse with the property a borrower already owns.",
  },
  {
    id: "ch6",
    q: "What they declare",
    secs: ["5a", "5b"],
    intro:
      "These are the questions that decide whether the loan can happen at all. The borrower answers each under their " +
      "own signature — you ask, and you never answer for them. Maya’s come back clean. You still need to know what a " +
      "“yes” would mean: a default on federal debt, for one, ends FHA eligibility outright.",
  },
  {
    id: "ch7",
    q: "Signing off",
    secs: ["6", "7", "8", "9"],
    intro:
      "The last part is where the application becomes a legal document. The borrower reads the terms and signs; the " +
      "government asks its monitoring questions; and you attest, under your own name and number, that you helped " +
      "prepare it truthfully. Maya signs — and your signature carries weight too: a false attestation can mean " +
      "criminal exposure.",
  },
];

// Maya's answers, keyed by section id then by the exact field string from FORMS.
// Only the meaningful fields are filled; the rest stay blank on the form.
export const MAYA: Record<string, Record<string, string>> = {
  "1a": {
    "Legal name exactly as on government photo ID": "Maya A. Okonkwo",
    "Social Security number": "•••-••-4402",
    "Date of birth": "03/1996",
    "Citizenship status": "U.S. citizen",
    "Individual or joint credit": "Individual",
    "Marital status": "Unmarried",
    "Dependents and their ages": "None",
    "Home, cell, and work phone; email": "cell (415) 555–0198 · maya.o@email.com",
    "Current address, time there, own or rent, monthly housing expense":
      "1420 Larkin St #3B · 3 yrs · rent · $1,850/mo",
  },
  "1b": {
    "Employer name as it appears on paystubs": "Meridian Marketing Group",
    "Position or title": "Marketing coordinator",
    "Start date": "June 2021",
    "Years in the line of work": "6",
    "Business owner / self-employed box and ownership share": "No — W‑2 employee",
    "Base, overtime, bonus, commission, military entitlements, other": "Base $6,200/mo",
  },
  "1c": { "Same fields as 1b, for the additional employment": "Does not apply" },
  "1d": {
    "Employer name and complete address": "Bright Harbor Media, San Jose CA",
    "Position or title": "Marketing assistant",
    "Start date and end date": "Aug 2019 – May 2021",
  },
  "1e": { Other: "Does not apply" },
  "2a": {
    "Checking accounts": "First Republic · $4,400",
    "Savings accounts": "Ally · $18,400",
    "Retirement accounts": "401(k) · $31,000",
  },
  "2b": {},
  "2c": {
    "Account type: revolving, installment, open 30-day, lease, or other": "Installment / revolving",
    "Creditor name": "DriveOne Auto · Apex Card · (HELOC, $0)",
    "Unpaid balance": "$1,860 auto · $640 card · $0 line",
    "Minimum monthly payment": "$310 auto (6 left) · $35 card",
  },
  "2d": { "Other obligations": "None" },
  "3a": { "Complete address including unit and country": "Does not apply — no property owned" },
  "4a": {
    "Requested loan amount": "$315,000",
    "Loan purpose: purchase, refinance, or other": "Purchase",
    "Complete subject-property address": "88 Alders Ct #204, Oakland CA",
    "Estimated property value": "$340,000",
    "Intended occupancy: primary, second home, investment, FHA secondary residence": "Primary residence",
  },
  "4b": { "Creditor name": "Does not apply" },
  "4c": { "Expected monthly rental income": "Does not apply — primary residence" },
  "4d": { "Asset type: cash gift, gift of equity, or grant": "Does not apply" },
  "5a": {
    "Will you occupy it as your primary residence?": "Yes",
    "If yes, have you owned property in the last three years?": "No",
    "Do the buyer and seller have a family or business relationship?": "No",
    "Is any part of your down payment borrowed? How much?": "No",
  },
  "5b": {
    "Currently delinquent or in default on federal debt": "No",
    "Foreclosure in the last seven years": "No",
    "Bankruptcy in the last seven years, and the chapter": "No",
  },
  "6": { "Borrower signature": "Maya A. Okonkwo", Date: "today" },
  "7": { "Has the applicant, or the applicant’s spouse, served or is currently serving?": "No" },
  "8": {
    "Sex: female, male, or decline": "Female",
    "Ethnicity, with Hispanic or Latino subgroups": "Not Hispanic or Latino",
  },
  "9": { "MLO name, unique identifier, state license number": "you · NMLS #—" },
};

// A short beat of narration shown when "Follow Maya" reaches each chapter.
export const MAYA_BEAT: Record<string, string> = {
  ch1: "Maya is 29, single, with no dependents, and has rented the same apartment for three years.",
  ch2:
    "She has worked at Meridian Marketing for almost four years, earning a $6,200 base salary each month. " +
    "No second job, no other income.",
  ch3:
    "She has $18,400 in savings, a 401(k) worth about $31,000, and a car loan with six payments left. " +
    "She also mentions an old home-equity line she never uses.",
  ch4: "This is Maya’s first home, so she owns no property. This whole part of her file reads “does not apply.”",
  ch5: "She’s found the condo: $340,000 in Oakland, $25,000 down, a $315,000 loan, and she’ll live in it. She wants a 5/1 ARM.",
  ch6: "Every declaration comes back clean — no judgments, no federal debt, no bankruptcy. You ask each one anyway.",
  ch7: "She reads the terms and signs. You add your name and number, attesting you helped prepare it truthfully.",
};

// Study cards per chapter: front (a real question) / back (the rule). Feed the SRS later.
export const STUDY: Record<string, StudyPair[]> = {
  ch1: [
    {
      front: "Maya checks “unmarried.” Can you ask whether she’s divorced or single?",
      back: "No. Asking why someone is unmarried violates ECOA. She may volunteer it; you may never solicit it.",
    },
    {
      front: "How far back must a borrower’s address history go?",
      back: "Two years. Under two years at the current address, account for everything before it.",
    },
  ],
  ch2: [
    {
      front: "A borrower owns 30% of the company that pays them a W‑2 salary. Employed or self-employed?",
      back: "Self-employed. Owning 25% or more makes you self-employed, however you’re paid.",
    },
    {
      front: "Before asking about alimony a borrower receives, what must you say first?",
      back: "That it doesn’t need to be disclosed unless they want it counted as income.",
    },
  ],
  ch3: [
    {
      front: "Maya’s HELOC has a $0 balance. Does it go on the form?",
      back: "Yes — entered by hand. A zero balance today doesn’t remove future access to the line.",
    },
    {
      front: "Her car loan has 6 payments left and no payment shown. Counted?",
      back: "Ten or fewer months remaining is the exception — it can be excluded, subject to underwriting.",
    },
  ],
  ch4: [
    {
      front: "A borrower owns a house free and clear. Does it still go in Section 3?",
      back: "Yes. Even a lien-free property carries mandatory expenses like real-estate taxes.",
    },
    {
      front: "No tax return for a rental. How is rental income figured?",
      back: "75% of the gross rent on the lease, minus PITI — the discount covers vacancy.",
    },
  ],
  ch5: [
    {
      front: "Rent from a property being purchased — which section?",
      back: "4c. Rent from property already owned is 3a. Same idea, different section.",
    },
    {
      front: "“FHA secondary residence” — same as a second home?",
      back: "No. It’s a distinct occupancy choice in 4a, not the same as a second home.",
    },
  ],
  ch6: [
    {
      front: "A borrower is in default on a federal student loan. What does that affect?",
      back: "It makes them ineligible for FHA financing.",
    },
    {
      front: "Four declarations look back exactly seven years. Which?",
      back: "Deed in lieu, short sale, foreclosure, and bankruptcy.",
    },
  ],
  ch7: [
    {
      front: "A phone applicant declined demographic info. Later you could identify their race. Change it?",
      back: "Never. On a non-face-to-face application, a declined designation is never changed later.",
    },
    {
      front: "What does your signature on Section 9 attest?",
      back: "That you assisted in the truthful, correct, and complete preparation of the application.",
    },
  ],
};

// One recap card per chapter: the single takeaway.
export const RECAP: Record<string, string> = {
  ch1:
    "Identity, household, and two years of addresses — plus the fair-lending limit on marital status. " +
    "“Unmarried” is an answer to record, not a reason to ask why.",
  ch2:
    "The section answers one question: can they keep paying? Steady, documented, likely to continue. " +
    "And 25% ownership makes someone self-employed, however they’re paid.",
  ch3:
    "Assets first, then obligations. The traps live in the debts: a zero-balance line still gets entered, " +
    "a nearly-paid loan can come out.",
  ch4:
    "Every property owned, even free and clear — since it still carries taxes. No return for a rental? " +
    "75% of gross rent, minus PITI.",
  ch5:
    "This part records the deal itself: amount, property, occupancy, and where cash to close comes from. " +
    "Rent from the property being bought is 4c, not 3a.",
  ch6:
    "The questions that decide whether the loan can happen. You ask every one and answer none of them. " +
    "A federal-debt default ends FHA eligibility.",
  ch7:
    "The application becomes a legal document here. The borrower’s signature makes it true under penalty; " +
    "yours attests you prepared it honestly.",
};

// The judgment calls — one per chapter, drawn from the traps (ch3 gets two; ch4,
// the "does not apply" chapter, gets none). Each is a call an MLO actually faces.
export const SCENARIOS: Scenario[] = [
  {
    chapter: "ch1",
    stem: "An applicant checks “unmarried” on the application. You’re curious whether they’re divorced or widowed. What may you do?",
    right: "Nothing — record “unmarried” and move on.",
    wrong: [
      "Ask whether they’re divorced, widowed, or single.",
      "Note your best guess based on their age.",
      "Ask indirectly, by inquiring about a former spouse’s income.",
    ],
    teach:
      "Asking why someone is unmarried violates ECOA. They may volunteer it, but you may never solicit it — directly or indirectly.",
  },
  {
    chapter: "ch2",
    stem: "Before you ask a borrower about alimony or child support they receive, what must you tell them first?",
    right: "That they don’t have to disclose it unless they want it counted as income.",
    wrong: [
      "That it will raise their interest rate.",
      "That the lender will verify it with the court either way.",
      "Nothing — the question is required on every application.",
    ],
    teach:
      "You must tell the applicant alimony, child support, and separate maintenance don’t need to be disclosed unless they want them counted. The exception is income-sensitive products with household caps, like Community Lending Programs and USDA.",
  },
  {
    chapter: "ch3",
    stem: "A borrower owns a car outright and wants it counted as an asset. What supports listing it?",
    right: "An appraisal of its value, minus any vehicle liens, with a title showing no lien.",
    wrong: [
      "The borrower’s own estimate of resale value.",
      "The original purchase price on the bill of sale.",
      "The insurance policy’s declared value.",
    ],
    teach:
      "A vehicle counts as an asset only if its value is supported: an appraisal, minus any vehicle liens, plus a title showing no lien or a release for one.",
  },
  {
    chapter: "ch3",
    stem: "A borrower has a car loan with 8 payments left and no payment amount shown. How is that generally treated?",
    right: "It can be excluded — ten or fewer months remaining is the exception, subject to underwriting.",
    wrong: [
      "It must always be counted at the full balance.",
      "It disqualifies the borrower until paid off.",
      "It’s ignored automatically because it’s under $10,000.",
    ],
    teach:
      "Installment debt with ten or fewer months remaining is the exception to the missing-payment rule — subject to judgment and underwriting requirements.",
  },
  {
    chapter: "ch5",
    stem: "A borrower is buying a duplex to live in one unit and rent the other. Where does the expected rent go?",
    right: "Section 4c — rental income on the property being purchased.",
    wrong: [
      "Section 3a — property the borrower already owns.",
      "Section 1e — income from other sources.",
      "Section 2b — other assets and credits.",
    ],
    teach:
      "3a is rent from property already owned. 4c is rent from the property being bought. Same idea, different section — and the one people mix up most.",
  },
  {
    chapter: "ch6",
    stem: "During the declarations, a borrower mentions they defaulted on a federal student loan. What does that affect?",
    right: "It makes them ineligible for FHA financing.",
    wrong: [
      "Nothing — student loans are exempt from declarations.",
      "It only matters if the default is under seven years old.",
      "It raises the down-payment requirement but nothing else.",
    ],
    teach:
      "Default on federal debt makes a borrower ineligible for FHA financing. This is why the declaration question is asked — and why you never answer it for them.",
  },
  {
    chapter: "ch7",
    stem: "A borrower took a non-face-to-face application and declined to give demographic information. Later you meet them and feel you could identify their race. What do you do?",
    right: "Leave the declined designation as-is — never change it.",
    wrong: [
      "Update it based on your observation, now that you’ve met.",
      "Ask a colleague to confirm your guess, then record it.",
      "Record it and note that it was added later.",
    ],
    teach:
      "On a non-face-to-face application, never change a declined designation later — even if you come to believe you can identify the applicant’s race, national origin, or sex.",
  },
];

// Hero illustrations, one per chapter plus one for the borrower card. Mapped from
// the preview's loose associations onto the project's real character library.
// Floated to the side, text wrapping the silhouette; side alternates down the page.
export const HEROES: Record<string, HeroDef> = {
  hero_form: { file: "three-women-in-poodle-skirts-transparent.png", side: "right" },
  ch1: { file: "wedding-couple-on-scales-rear-view-transparent.png", side: "right" }, // marital status, ECOA
  ch2: { file: "beekeeper-with-hive-transparent.png", side: "left" }, // harvesting income from sources
  ch3: { file: "house-of-cards-made-of-credit-cards-transparent.png", side: "right" }, // assets and debts
  ch4: { file: "cash-pyramid-in-glass-display-case-transparent.png", side: "left" }, // property held as wealth
  ch5: { file: "burning-stack-of-cash-transparent.png", side: "right" }, // the loan request, cash out
  ch6: { file: "barrister-reading-comic-book-transparent.png", side: "left" }, // declarations under signature
  ch7: { file: "man-in-tailcoat-sawing-wood-transparent.png", side: "right" }, // signing off
};

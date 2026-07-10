// content/module6/application.ts
// Module 6 — Stage 1: the Application, taught through one worked borrower (Maya
// Okonkwo) instead of a section-by-section tour. Data only — consumed by
// components/Application.tsx. The form structure itself is reused from FORMS
// (the "borrower" form) in ./forms; this module adds the story layer: Maya's
// answers, the seven chapter framings, the beats, the judgment calls, and the
// study/recap decks. Ported from the stage-1 preview (stage1-preview.html),
// which is the visual + interaction ground truth. Intros are de-llm'd: they
// frame the "why" before any field, and never restate a heading.

import type { UnitRecap } from '@/lib/section';

export interface AppChapter {
  id: string;
  q: string;
  secs: string[];
  intro: string;
  /** Resolves the real RecapCard's die-cut category sticker at
   *  /illustrations/_stickers/{stickerId}.png — one of the seven chapter briefs. */
  stickerId: string;
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
    stickerId: "app-identity",
    intro:
      "Every loan starts with a person, and the lender has to establish exactly who: the legal identity, who " +
      "depends on their income, and where they’ve lived for the past two years. Most of it is simple to record. " +
      "One line — marital status — falls under fair-lending rules that limit what you’re allowed to ask.",
  },
  {
    id: "ch2",
    q: "What they earn",
    secs: ["1b", "1c", "1d", "1e"],
    stickerId: "app-income",
    intro:
      "This part is where the lender weighs whether the borrower can keep paying — where the money comes from, how " +
      "steady it is, how long it’s lasted. Maya draws a single salary, so her income is easy to document. The harder " +
      "files are the ones with several sources, or self-employment.",
  },
  {
    id: "ch3",
    q: "What they have and owe",
    secs: ["2a", "2b", "2c", "2d"],
    stickerId: "app-assets-debts",
    intro:
      "This part holds two questions at once: what the borrower could put toward the loan, and what already pulls " +
      "money from their pocket each month — assets, then debts. Maya’s are ordinary: a savings account, a car loan " +
      "almost paid off, an old credit line she’d forgotten. Each comes with a rule that’s easy to get wrong.",
  },
  {
    id: "ch4",
    q: "What they already own",
    secs: ["3a", "3bc"],
    stickerId: "app-realestate",
    intro:
      "Before lending against a new property, the lender wants every property the borrower already holds — even one " +
      "owned free and clear, since it still costs money to keep. Maya owns none; she’s a first-time buyer. Her file " +
      "reads “does not apply” here, which makes it a good place to learn what you’d do if she owned three.",
  },
  {
    id: "ch5",
    q: "What they’re asking for",
    secs: ["4a", "4b", "4c", "4d"],
    stickerId: "app-request",
    intro:
      "The earlier parts described the borrower; this one describes the deal — how much, against what, to live in or " +
      "rent, and where the cash to close comes from. Maya wants a $315,000 loan on a $340,000 condo she’ll live in. " +
      "It’s straightforward, except that one section here is easy to confuse with the property a borrower already owns.",
  },
  {
    id: "ch6",
    q: "What they declare",
    secs: ["5a", "5b"],
    stickerId: "app-declarations",
    intro:
      "These are the questions that decide whether the loan can happen at all. The borrower answers each under their " +
      "own signature — you ask, and you never answer for them. Maya’s come back clean. You still need to know what a " +
      "“yes” would mean: a default on federal debt, for one, ends FHA eligibility outright.",
  },
  {
    id: "ch7",
    q: "Signing off",
    secs: ["6", "7", "8", "9"],
    stickerId: "app-signoff",
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

// Scripted voiceover, one per chapter — NOT a reading of the form. The generator
// (scripts/generate-application-audio.ts) prepends the chapter's on-screen intro,
// then reads this continuation: the specific rules and traps that go beyond the
// intro. So the audio = the paragraph you're reading + the deeper walk-through.
// Generated to public/audio/application/{chapterId}.mp3 (same TTS voice as the reader).
export const VOICEOVER: Record<string, string> = {
  ch1:
    "Marital status is the line to watch. Only three boxes are allowed — married, separated, or unmarried — " +
    "and \"unmarried\" covers single, divorced, and widowed alike. You can record it, but you can never ask " +
    "why someone is unmarried; that crosses into an E-C-O-A violation. The address history matters too: it has " +
    "to reach back a full two years, so if the borrower has been at their place for less, account for wherever " +
    "they were before it.",
  ch2:
    "Watch how income gets recorded — every figure is a monthly amount, taken from documentation like pay " +
    "stubs, never a number the borrower just tells you. The trap is self-employment: owning twenty-five " +
    "percent or more of the business that pays you counts as self-employed, even with a regular paycheck. And " +
    "before you ask about alimony or child support a borrower receives, you have to tell them first that it " +
    "doesn't need to be disclosed unless they want it counted as income.",
  ch3:
    "Her assets are ordinary — savings, checking, a retirement account. The debts are where the traps live. " +
    "That old home-equity line with a zero balance still gets entered by hand: a zero balance today doesn't " +
    "stop her drawing on it tomorrow. And her car loan has six payments left — normally a debt with no payment " +
    "shown is a problem, but with ten or fewer months remaining, it can be left out of the numbers, subject to " +
    "underwriting.",
  ch4:
    "Even with Maya's file reading \"does not apply,\" know what you'd do if she owned something. Every " +
    "property gets disclosed — even one owned free and clear, because it still costs money in taxes and " +
    "upkeep. And for a rental with no tax return to go by, you don't take the borrower's word for the income: " +
    "you count seventy-five percent of the gross rent on the lease, minus the mortgage payment. That " +
    "twenty-five percent covers vacancy.",
  ch5:
    "It's a straightforward deal for her. The pair of sections people mix up: rent from the property she's " +
    "buying goes in four-C, while rent from a property she already owns goes in three-A. And watch the " +
    "occupancy choices — \"F-H-A secondary residence\" is its own option, and it's not the same as a second " +
    "home.",
  ch6:
    "Maya's declarations come back clean, but you ask every one, and you never answer them for her — she signs " +
    "under each. The reason it matters: a default on federal debt, like a student loan, makes a borrower " +
    "ineligible for F-H-A financing outright. And four of these questions look back exactly seven years — a " +
    "deed in lieu, a short sale, a foreclosure, and a bankruptcy.",
  ch7:
    "When Maya signs, everything on the form is true under penalty. The government's demographic questions " +
    "come next — required, they don't affect the decision, and there's a sharp rule: if a borrower declined to " +
    "answer on a phone or online application, you never fill it in later, even if you meet them and think you " +
    "can tell. And your own signature, in section nine, attests you helped prepare this truthfully, correctly, " +
    "and completely. Get that wrong and it can be criminal.",
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

// One recap card per chapter — the real UnitRecap shape.
export const RECAP: Record<string, UnitRecap> = {
  ch1: {
    plainLanguage:
      "Every file starts with exactly who's applying — legal identity, household, and two years of address " +
      "history. One line, marital status, sits under fair-lending rules that limit what you can ask.",
    facts: [
      "Marital status has only three permitted choices: <span class=\"hl\">married, separated, unmarried</span> — “unmarried” covers single, divorced, widowed, and more.",
      "Asking <em>why</em> someone is unmarried violates <span class=\"hl\">ECOA</span>. They may volunteer it; you may never solicit it.",
      "Residential history must cover <span class=\"hl\">two years</span> — under that at the current address, account for everything before it.",
      "Dependents are the ones claimed on the <span class=\"hl\">federal tax return</span>, listed youngest first.",
    ],
  },
  ch2: {
    plainLanguage:
      "This part weighs whether the borrower can keep paying — where the money comes from, how steady it is, and " +
      "how long it's lasted.",
    facts: [
      "Owning <span class=\"hl\">25% or more</span> of the business that employs you means self-employed — however you're paid.",
      "Before asking about alimony or child support a borrower receives, you must first say it doesn't need to be disclosed <span class=\"hl\">unless they want it counted</span> as income.",
      "The prior two years of employment must be accounted for, <span class=\"hl\">gaps included</span>.",
      "All income is entered as a <span class=\"hl\">monthly equivalent</span>, backed by documentation — never a verbal estimate.",
    ],
  },
  ch3: {
    plainLanguage:
      "This part holds two questions at once: what the borrower could put toward the loan, and what already " +
      "pulls money out of their pocket every month.",
    facts: [
      "A zero-balance line, like a paid-off HELOC, still gets entered <span class=\"hl\">by hand</span> — a $0 balance doesn't remove future access to it.",
      "Installment debt with <span class=\"hl\">ten or fewer months</span> remaining can be excluded, subject to underwriting.",
      "A vehicle counts as an asset only with <span class=\"hl\">an appraisal</span>, minus any liens, and a title showing none remain.",
      "In a joint application sharing only joint assets, list each one <span class=\"hl\">once</span> — never duplicated.",
    ],
  },
  ch4: {
    plainLanguage:
      "Every property the borrower already holds gets disclosed here — even one owned free and clear, since it " +
      "still carries mandatory expenses.",
    facts: [
      "A lien-free property still needs to be listed — it carries costs like <span class=\"hl\">real-estate taxes</span>.",
      "No tax return for a rental? Use <span class=\"hl\">75% of the gross rent</span> on the lease, minus PITI.",
      "Multiple liens on one property are entered on separate lines, but the <span class=\"hl\">housing expense is counted once</span>.",
    ],
  },
  ch5: {
    plainLanguage:
      "This part describes the deal itself — how much, against what, to live in or rent, and where the cash to " +
      "close comes from.",
    facts: [
      "Rent from the property being <span class=\"hl\">purchased</span> goes in 4c; rent from property already <span class=\"hl\">owned</span> goes in 3a.",
      "“FHA secondary residence” is its own occupancy choice in 4a — <span class=\"hl\">not</span> the same as a second home.",
      "Eligible gift sources include a relative, an employer, a nonprofit, or an <span class=\"hl\">unmarried partner</span>.",
    ],
  },
  ch6: {
    plainLanguage:
      "These questions decide whether the loan can happen at all. The borrower answers each one under their own " +
      "signature — you ask, and you never answer for them.",
    facts: [
      "A default on <span class=\"hl\">federal debt</span> makes a borrower ineligible for FHA financing.",
      "Deed in lieu, short sale, foreclosure, and bankruptcy all look back exactly <span class=\"hl\">seven years</span>.",
      "Borrowed down-payment funds may need their <span class=\"hl\">payment counted</span> in underwriting.",
    ],
  },
  ch7: {
    plainLanguage:
      "The application becomes a legal document here. The borrower reads the terms and signs; the government " +
      "asks its monitoring questions; and the loan originator attests to helping prepare it truthfully.",
    facts: [
      "Signing an application with false information can mean <span class=\"hl\">fraud</span> or a false statement to a financial institution.",
      "On a non-face-to-face application, a declined demographic designation is <span class=\"hl\">never changed later</span> — even if you come to believe otherwise.",
      "Your signature on Section 9 attests you assisted in <span class=\"hl\">truthful, correct, and complete</span> preparation.",
    ],
  },
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

// Field-level callouts — the "you couldn't know this from the form alone" rules
// and traps, keyed by section id then the exact field string from FORMS. Rendered
// as a wordless info affordance on the field row; hover/tap reveals the note. These
// are the same rules the study cards and recaps carry, surfaced at the point of use.
export const CALLOUTS: Record<string, Record<string, string>> = {
  "1a": {
    "Marital status":
      "Only three choices — married, separated, unmarried. Never ask why someone is unmarried; soliciting that violates ECOA.",
    "Dependents and their ages":
      "The dependents claimed on the federal tax return, listed youngest first — not limited to children.",
    "Current address, time there, own or rent, monthly housing expense":
      "A full two-year address history is required. Under two years here? Account for everywhere before it.",
  },
  "1b": {
    "Business owner / self-employed box and ownership share":
      "Owning 25% or more of the business that employs you counts as self-employed — however you're actually paid.",
    "Base, overtime, bonus, commission, military entitlements, other":
      "Every figure is a monthly equivalent, taken from documentation — never a verbal estimate.",
  },
  "1e": {
    Alimony:
      "You may not require alimony, child support, or separate maintenance to be disclosed unless the borrower wants it counted as income.",
  },
  "2c": {
    "Account type: revolving, installment, open 30-day, lease, or other":
      "Enter open zero-balance lines by hand — especially HELOCs. A $0 balance today doesn't remove future access to the line.",
    "Minimum monthly payment":
      "Installment debt with ten or fewer months remaining can be excluded — subject to underwriting.",
  },
  "3a": {
    "Complete address including unit and country":
      "Disclose every property owned — even one owned free and clear, since it still carries taxes.",
    "Gross monthly rental income (2–4 unit primary or investment)":
      "No tax return for a rental? Use 75% of the gross rent on the lease, minus PITI — the discount covers vacancy.",
  },
  "4a": {
    "Intended occupancy: primary, second home, investment, FHA secondary residence":
      "“FHA secondary residence” is a distinct occupancy choice here — not the same as a second home.",
  },
  "4c": {
    "Expected monthly rental income":
      "This is rent from the property being purchased (4c). Rent from a property already owned goes in 3a — the pair people mix up most.",
  },
  "5a": {
    "Is any part of your down payment borrowed? How much?":
      "Borrowed down-payment funds may need their payment counted in underwriting. Ask every declaration — never answer for the borrower.",
  },
  "5b": {
    "Currently delinquent or in default on federal debt":
      "A default on federal debt makes the borrower ineligible for FHA financing.",
    "Foreclosure in the last seven years":
      "Deed in lieu, short sale, foreclosure, and bankruptcy all look back exactly seven years.",
  },
  "6": {
    "Borrower signature":
      "The application is a legal document — signing one with false or inaccurate information can be fraud, or a false statement to a financial institution.",
  },
  "8": {
    "Race, one or more categories, with subcategories":
      "On a non-face-to-face application, a declined designation is never changed later — even if you later believe you can identify the applicant.",
  },
  "9": {
    "MLO signature and date":
      "By signing, the MLO attests to assisting in the truthful, correct, and complete preparation of the application — a false attestation can carry criminal exposure.",
  },
};

// Hero illustrations, one per chapter plus one for the borrower card. Mapped from
// the preview's loose associations onto the project's real character library.
// Floated to the side, text wrapping the silhouette; side alternates down the page.
export const HEROES: Record<string, HeroDef> = {
  hero_form: { file: "triathlete-snow-ski-transparent.png", side: "right" }, // Maya's own costumed avatar
  ch1: { file: "wedding-couple-on-scales-rear-view-transparent.png", side: "right" }, // marital status, ECOA
  ch2: { file: "beekeeper-with-hive-transparent.png", side: "left" }, // harvesting income from sources
  ch3: { file: "house-of-cards-made-of-credit-cards-transparent.png", side: "right" }, // assets and debts
  ch4: { file: "cash-pyramid-in-glass-display-case-transparent.png", side: "left" }, // property held as wealth
  ch5: { file: "burning-stack-of-cash-transparent.png", side: "right" }, // the loan request, cash out
  ch6: { file: "barrister-reading-comic-book-transparent.png", side: "left" }, // declarations under signature
  ch7: { file: "man-in-tailcoat-sawing-wood-transparent.png", side: "right" }, // signing off
};

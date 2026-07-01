import type { ReviewFlashcard } from "@/lib/section";

export interface ArchivedCard extends ReviewFlashcard {
  /** Cut reason code, e.g. "DUP-CLOZE", "DUP-SYNTH", "DUP-DEF", "OBVIOUS". */
  reason: string;
}

// Removed from the reader review deck in v3.19 (76 → 52 cards). Preserved
// verbatim (peg / topic / q / a unchanged) so any card can be restored by hand, and so
// they can later be promoted into the global SRS deck if wanted (see follow-up in spec).
// Grouped by unitId; ordering within a unit follows the original review-deck order.
export const archivedReviewFlashcards: Record<string, ArchivedCard[]> = {
  "respa": [
    {
      peg: "the toolkit",
      topic: "Disclosures",
      q: "What is another name for the Special Information Booklet, and when must it be issued?",
      a: "The <span class='hl'>HUD Home Loan Toolkit</span>. Issued within <span class='hl'>3 general business days</span> of application.",
      reason: "DUP-CLOZE",
    },
    {
      peg: "the sham",
      topic: "Affiliated businesses",
      q: "What is a sham affiliated business arrangement under RESPA?",
      a: "A shell company that <span class='hl'>appears</span> to be a legitimate settlement service provider but exists only to <span class='hl'>funnel referral fees</span> to its owner — it has no real operations, employees, or independent business.",
      reason: "DUP-SYNTH",
    },
    {
      peg: "Section 8",
      topic: "Kickbacks & referrals",
      q: "What does Section 8 of RESPA prohibit?",
      a: "The exchange of <span class='hl'>anything of value</span> between actual or potential referral sources in connection with a federally related mortgage loan — both giving and accepting.",
      reason: "DUP-SYNTH",
    },
    {
      peg: "pattern as evidence",
      topic: "Kickbacks & referrals",
      q: "Can a kickback agreement exist without a written or verbal agreement?",
      a: "Yes. A <span class='hl'>practice, pattern, or course of conduct</span> can establish it. Repeated receipt of value connected to referral volume is evidence of an agreement.",
      reason: "DUP-SYNTH",
    },
    {
      peg: "impound account",
      topic: "Escrow accounts",
      q: "What is another name for an escrow account?",
      a: "An <span class='hl'>impound account</span>.",
      reason: "OBVIOUS",
    },
  ],
  "ecoa": [
    {
      peg: "discouragement",
      topic: "Discouragement",
      q: "What is 'discouragement' under ECOA?",
      a: "acting in a way that would discourage a reasonable person from applying, on a prohibited basis — a violation even with <span class='hl'>no formal application</span>",
      reason: "DUP-CLOZE",
    },
    {
      peg: "corrective action",
      topic: "Testing & self-testing",
      q: "Taking corrective action after a self-test is —",
      a: "<span class='hl'>not an admission</span> that a violation occurred",
      reason: "DUP-CLOZE",
    },
    {
      peg: "elderly",
      topic: "Definitions",
      q: "Under ECOA, 'elderly' means —",
      a: "age <span class='hl'>62</span> or older",
      reason: "DUP-DEF",
    },
    {
      peg: "government credit",
      topic: "Exemptions",
      q: "Which ECOA exemption is the broadest?",
      a: "<span class='hl'>Government credit</span> — the only type exempt from the discrimination rule itself",
      reason: "DUP-SYNTH",
    },
    {
      peg: "offspring",
      topic: "Protected classes",
      q: "The 11th prohibited basis under § 1002.4(a) that's easy to miss?",
      a: "Whether the applicant intends to <span class='hl'>bear offspring</span>",
      reason: "DUP-CLOZE",
    },
  ],
  "tila": [
    {
      peg: "stale window",
      topic: "Rescission",
      q: "If the rescission disclosure was never properly given, the window becomes…",
      a: "<span class='hl'>3 years</span> after consummation",
      reason: "DUP-CLOZE",
    },
  ],
  "hoepa": [
    {
      peg: "disclosure",
      topic: "Disclosures",
      q: "When is the high-cost disclosure due?",
      a: "at least <span class='hl'>3 business days</span> before consummation",
      reason: "DUP-CLOZE",
    },
  ],
  "trid": [
    {
      peg: "honor",
      topic: "Loan Estimate",
      q: "How long must Loan Estimate terms be honored?",
      a: "at least <span class='hl'>10 business days</span>",
      reason: "DUP-CLOZE",
    },
  ],
  "hmda": [
    {
      peg: "the register",
      topic: "Data reporting",
      q: "Where does the reported HMDA data live?",
      a: "The <span class='hl'>Loan/Application Register</span> (LAR or L/AR)",
      reason: "DUP-DEF",
    },
  ],
  "fcra": [
    {
      peg: "most marks",
      topic: "Credit reporting",
      q: "How long do most derogatory items remain?",
      a: "Generally <span class='hl'>7 years</span> (late/missed payments up to about 7½)",
      reason: "DUP-CLOZE",
    },
  ],
  "facta": [
    {
      peg: "extended",
      topic: "Fraud alerts",
      q: "How long does an extended fraud alert last?",
      a: "<span class='hl'>7 years</span> (placed after real identity theft)",
      reason: "DUP-SYNTH",
    },
    {
      peg: "active-duty",
      topic: "Fraud alerts",
      q: "How long does an active-duty (military) alert last?",
      a: "<span class='hl'>1 year</span>",
      reason: "DUP-SYNTH",
    },
  ],
  "ftc-red-flags-rule": [
    {
      peg: "the program",
      topic: "Program requirement",
      q: "What must a covered institution maintain under the Red Flags Rule?",
      a: "A written <span class='hl'>Identity Theft Prevention Program</span>",
      reason: "DUP-CLOZE",
    },
  ],
  "bsa-aml": [
    {
      peg: "structuring",
      topic: "Structuring",
      q: "What is structuring?",
      a: "breaking deposits into amounts under <span class='hl'>$10,000</span> to dodge the CTR filing requirement — itself illegal",
      reason: "DUP-CLOZE",
    },
  ],
  "glba": [
    {
      peg: "opt-out",
      topic: "Privacy & opt-out",
      q: "What right does GLBA give consumers over information sharing?",
      a: "the right to <span class='hl'>opt out</span> of sharing nonpublic personal information with nonaffiliated third parties",
      reason: "DUP-SYNTH",
    },
  ],
  "dnc-tsr": [
    {
      peg: "abandonment",
      topic: "Call abandonment",
      q: "Maximum allowable call-abandonment rate?",
      a: "no more than <span class='hl'>3%</span>",
      reason: "DUP-CLOZE",
    },
  ],
  "maps-reg-n": [
    {
      peg: "records",
      topic: "Recordkeeping",
      q: "How long must MAPs advertising records be retained?",
      a: "<span class='hl'>24 months</span>",
      reason: "DUP-CLOZE",
    },
  ],
  "hpa": [
    {
      peg: "not current",
      topic: "Final termination",
      q: "If the borrower isn't current at 78%, when does final termination happen?",
      a: "at the <span class='hl'>midpoint of the loan's amortization period</span> (once the borrower is current)",
      reason: "DUP-SYNTH",
    },
  ],
  "dodd-frank": [
    {
      peg: "ARM notice",
      topic: "ARM disclosures",
      q: "When must a hybrid ARM reset notice be delivered?",
      a: "during the one-month period ending <span class='hl'>6 months</span> before the rate first adjusts",
      reason: "DUP-CLOZE",
    },
  ],
};

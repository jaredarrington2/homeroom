// lib/module6/art.ts
// The three mnemonic illustrations floated beside the prose where a section has room to wrap:
// 1a (identity → newlyweds on scales), 2c (liabilities → house of credit cards),
// L2 (title/ownership → money under glass). Absurdist-anchor style, served from public/.
// Keyed by "<formId>/<sectionId>". Extracted from the prototype's embedded base64 ART.

export interface Peg { side: 'left' | 'right'; alt: string; src: string; }

export const ART: Record<string, Peg> = {
  'borrower/1a': { side: 'right', alt: 'Newlyweds standing on a set of scales', src: '/illustrations/forms/1a.png' },
  'borrower/2c': { side: 'left', alt: 'A house built out of credit cards', src: '/illustrations/forms/2c.png' },
  'lender/L2': { side: 'right', alt: 'Money locked inside a glass cage', src: '/illustrations/forms/L2.png' },
};

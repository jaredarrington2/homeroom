import type { ExamItem } from '@/content/exam/types';

const bank: ExamItem[] = [
  {
    id: 'what-a-mortgage-is-x01',
    unitId: 'what-a-mortgage-is',
    moduleId: 'general-mortgage-knowledge',
    area: 'general',
    pool: 'section',
    stem: "A borrower stops paying on their home loan. Because of one feature of the mortgage, the lender is able to take the property and sell it to recover what it's owed. What is that claim on the house called?",
    options: ['The principal', 'The lien', 'The interest', 'The down payment'],
    correct: 1,
    explanation: "The lien is the lender's claim on the house that secures the loan — it's why a lender will hand over so much money, for so long, at the rates it does. Principal is the amount borrowed and interest is the charge for using the money; neither is the claim that lets the lender take the property.",
    difficulty: 'recall',
    source: 'reader: how a mortgage works · what a mortgage is',
  },
  {
    id: 'what-a-mortgage-is-x02',
    unitId: 'what-a-mortgage-is',
    moduleId: 'general-mortgage-knowledge',
    area: 'general',
    pool: 'section',
    stem: "A homeowner looks at a monthly statement and sees the payment split in two: one part reduces the amount originally borrowed, the other is the lender's charge for the use of the money. The part that reduces the amount borrowed is the:",
    options: ['interest', 'principal', 'lien', 'escrow'],
    correct: 1,
    explanation: 'Principal is the amount borrowed; the portion of each payment applied to it lowers the balance. Interest is the lender\'s charge for the use of the money, not the reduction of what was borrowed.',
    difficulty: 'recall',
    source: 'reader: how a mortgage works · principal and interest',
  },
  {
    id: 'what-a-mortgage-is-x03',
    unitId: 'what-a-mortgage-is',
    moduleId: 'general-mortgage-knowledge',
    area: 'general',
    pool: 'section',
    stem: "Two borrowers take the same loan amount at the same rate, but one spreads it over more years than the other. Compared with the shorter loan, the longer loan's monthly payment and total interest come out how?",
    options: [
      'Smaller payment, but more total interest over the life of the loan',
      'Larger payment, and more total interest',
      'Smaller payment, and less total interest',
      'Larger payment, but less total interest',
    ],
    correct: 0,
    explanation: 'Spreading the same loan over more years makes each payment smaller but the borrower pays more interest over the life of the loan. Over fewer years the payments are larger and the total interest is less.',
    difficulty: 'application',
    source: 'reader: how a mortgage works · principal and interest',
  },
];

export default bank;

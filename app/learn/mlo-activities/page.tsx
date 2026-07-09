// app/learn/mlo-activities/page.tsx
// Module 6 — MLO Activities. The forms slice: "Learn the forms," an in-tab learning experience for
// the nine forms in the URLA package (six URLA forms + URAR + Loan Estimate + Closing Disclosure).
// Overrides the generic [chapter] index for this chapter. Its lookup companion is ./explorer.
import LearnForms from '@/components/LearnForms';

export const metadata = {
  title: 'Learn the forms — Homeroom',
};

export default function Page() {
  return <LearnForms />;
}

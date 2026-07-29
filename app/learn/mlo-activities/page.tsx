// app/learn/mlo-activities/page.tsx
// Module 6 — MLO Activities. One recall-gradient reader for the whole origination arc
// (11 units, inquiry → funding → the math drill), on the same SectionReader contract as
// Modules 1/3/4/5. The worked URLA (Maya) and the nine-form trainer mount inside their
// units; the form explorer stays a standalone lookup tool at ./explorer, and the
// refinances reader is a sibling at ./refinances.
import SectionReader from '@/components/SectionReader';
import section6 from '@/content/sections/section-6';

export const metadata = {
  title: 'MLO Activities — Homeroom',
};

export default function Page() {
  return <SectionReader section={section6} />;
}

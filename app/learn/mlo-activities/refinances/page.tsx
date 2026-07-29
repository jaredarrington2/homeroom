// app/learn/mlo-activities/refinances/page.tsx
// Module 6 — Refinances. Recall-gradient reader (like Modules 3 & 4), a sibling of the
// bespoke forms slice at ./ (Learn the forms), ./application (Maya), and ./explorer.
// Unit ids double as chapters.json section ids; /learn/mlo-activities/<unit-id> redirects here.
import SectionReader from '@/components/SectionReader';
import m6Refinances from '@/content/sections/m6-refinances';

export const metadata = {
  title: 'Refinances — Homeroom',
};

export default function Page() {
  return <SectionReader section={m6Refinances} />;
}

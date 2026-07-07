// app/learn/general-mortgage-knowledge/page.tsx
// Module 5 — General Mortgage Knowledge. One reader page: each unit renders narrative +
// inline recall (cloze / synth / review) + a definitions deck. Overrides the generic
// [chapter] index for this chapter, same pattern as federal-mortgage-laws / uniform-state-content.
// Slice 1 ships the VA & USDA unit (which hosts the four-program comparison matrix).
import SectionReader from '@/components/SectionReader';
import section5 from '@/content/sections/section-5';

export const metadata = {
  title: 'General Mortgage Knowledge — Homeroom',
};

export default function Page() {
  return <SectionReader section={section5} />;
}

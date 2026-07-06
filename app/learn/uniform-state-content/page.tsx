// app/learn/uniform-state-content/page.tsx
// Module 4 — The SAFE Act & state licensing (Uniform State Content). One reader page:
// each unit renders narrative + inline recall (cloze / synth / review) + a definitions deck.
// Overrides the generic [chapter] index for this chapter, same pattern as federal-mortgage-laws.
import SectionReader from '@/components/SectionReader';
import section4 from '@/content/sections/section-4';

export const metadata = {
  title: 'The SAFE Act & state licensing — Homeroom',
};

export default function Page() {
  return <SectionReader section={section4} />;
}

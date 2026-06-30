// app/learn/federal-mortgage-laws/page.tsx
// Section 3 — Federal mortgage related laws. One reader page for all 17 laws:
// each unit renders narrative + margin art (characters/buildings matched by tag) and
// an inline recall block. Supersedes the old per-law custom pages (now redirects).
import SectionReader from '@/components/SectionReader';
import section3 from '@/content/sections/section-3';

export const metadata = {
  title: 'Federal mortgage related laws — Homeroom',
};

export default function Page() {
  return <SectionReader section={section3} />;
}

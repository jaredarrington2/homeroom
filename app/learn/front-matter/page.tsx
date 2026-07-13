// app/learn/front-matter/page.tsx — Module 1 reader (Slice G). Overrides the generic chapter
// index, same pattern as Modules 3/4/5. Rules-of-conduct / course-logistics move out of the
// module (exam-day housekeeping, not an introduction to mortgage lending) and redirect here.
import SectionReader from '@/components/SectionReader';
import section1 from '@/content/sections/section-1';

export const metadata = { title: 'Introduction to Mortgage Lending — Homeroom' };

export default function Page() {
  return <SectionReader section={section1} />;
}

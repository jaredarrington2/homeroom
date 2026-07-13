// app/learn/page.tsx — Learn home (Slice C). The dashboard: Continue · Where you stand · Modules.
// (Was the flat "Course material" chapter index.) Static module tree is built server-side and
// handed to LearnDashboard, which overlays progress from the shared context.
import LearnDashboard, { type DashModule } from '@/components/LearnDashboard';
import { getChapterTree } from '@/lib/content';

export const metadata = { title: 'Learn — Homeroom' };

export default function LearnPage() {
  const tree = getChapterTree();
  const modules: DashModule[] = tree.parts
    .flatMap((p) => p.chapters)
    .sort((a, b) => a.moduleNumber - b.moduleNumber)
    .map((ch) => ({
      id: ch.id,
      moduleNumber: ch.moduleNumber,
      title: ch.title,
      sections: ch.sections.map((s) => ({ id: s.id, title: s.title })),
    }));

  return <LearnDashboard modules={modules} />;
}

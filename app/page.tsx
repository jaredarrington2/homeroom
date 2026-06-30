import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';
import { getChapterTree } from '@/lib/content';

export default function Dashboard() {
  const tree = getChapterTree();
  const totalChapters = tree.parts.reduce((acc, p) => acc + p.chapters.length, 0);

  return (
    <div className="max-w-reading mx-auto">
      <Eyebrow>
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </Eyebrow>
      <h1 className="font-display text-4xl font-semibold tracking-display mt-2 mb-8">
        MLO Exam Prep
      </h1>

      <div className="grid gap-4 mb-10">
        <Link
          href="/learn"
          className="block border border-hairline p-5 hover:border-royal hover:bg-royal-faint transition-colors"
        >
          <div className="text-xs font-semibold uppercase tracking-eyebrow text-ink-faint mb-1">Learn</div>
          <div className="font-display text-lg text-ink">Course material</div>
          <div className="text-sm text-ink-muted mt-1">{totalChapters} chapters</div>
        </Link>

        <Link
          href="/flashcards"
          className="block border border-hairline p-5 hover:border-royal hover:bg-royal-faint transition-colors"
        >
          <div className="text-xs font-semibold uppercase tracking-eyebrow text-ink-faint mb-1">Flashcards</div>
          <div className="font-display text-lg text-ink">Spaced repetition review</div>
          <div className="text-sm text-ink-muted mt-1">Due cards load after content is generated</div>
        </Link>

        <Link
          href="/practice"
          className="block border border-hairline p-5 hover:border-royal hover:bg-royal-faint transition-colors"
        >
          <div className="text-xs font-semibold uppercase tracking-eyebrow text-ink-faint mb-1">Practice</div>
          <div className="font-display text-lg text-ink">Mock exam and topic drills</div>
          <div className="text-sm text-ink-muted mt-1">125-question mock · topic drills · missed questions</div>
        </Link>
      </div>

      {tree.parts.length > 0 && (
        <div>
          <Eyebrow>Course outline</Eyebrow>
          <div className="mt-3 space-y-1">
            {tree.parts.map(part => (
              <div key={part.id} className="text-sm text-ink-muted">
                {part.title} — {part.chapters.length} chapters
              </div>
            ))}
          </div>
        </div>
      )}

      {tree.parts.length === 0 && (
        <div className="border border-hairline p-6 text-sm text-ink-muted">
          <p className="font-medium text-ink mb-1">Content not yet generated</p>
          <p>Run <code className="font-mono text-xs bg-hairline px-1">npx ts-node scripts/extract-content.ts</code> to build the course content from the PDF.</p>
        </div>
      )}
    </div>
  );
}

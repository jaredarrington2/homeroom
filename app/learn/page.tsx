import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';
import { getChapterTree } from '@/lib/content';

export default function LearnPage() {
  const tree = getChapterTree();
  return (
    <div className="max-w-reading mx-auto">
      <Eyebrow>Learn</Eyebrow>
      <h1 className="font-display text-3xl font-semibold tracking-display mt-2 mb-8">Course material</h1>
      {tree.parts.length === 0 && (
        <p className="text-ink-muted text-sm">Content not yet generated. Run the extraction script.</p>
      )}
      {tree.parts.map(part => (
        <div key={part.id} className="mb-8">
          <h2 className="font-display text-xl font-medium text-ink mb-3 pb-2 border-b border-hairline">
            {part.title}
          </h2>
          <div className="space-y-2">
            {part.chapters.map(ch => (
              <Link
                key={ch.id}
                href={`/learn/${ch.id}`}
                className="flex items-center justify-between p-3 border border-hairline hover:border-royal hover:bg-royal-faint transition-colors"
              >
                <span className="font-sans text-sm text-ink">{ch.title}</span>
                <span className="text-xs text-ink-faint">{ch.sections.length} sections</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

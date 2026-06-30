import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';
import Button from '@/components/Button';
import { getChapterTree } from '@/lib/content';
import { notFound } from 'next/navigation';

export default function ChapterPage({ params }: { params: { chapter: string } }) {
  const tree = getChapterTree();
  const chapter = tree.parts.flatMap(p => p.chapters).find(c => c.id === params.chapter);
  if (!chapter) notFound();

  return (
    <div className="max-w-reading mx-auto">
      <Eyebrow>
        <Link href="/learn" className="hover:text-ink">Learn</Link> · {chapter.title}
      </Eyebrow>
      <h1 className="font-display text-3xl font-semibold tracking-display mt-2 mb-6">{chapter.title}</h1>
      <div className="space-y-2 mb-8">
        {chapter.sections.map((sec, i) => (
          <Link
            key={sec.id}
            href={`/learn/${chapter.id}/${sec.id}`}
            className="flex items-center gap-3 p-3 border border-hairline hover:border-royal hover:bg-royal-faint transition-colors"
          >
            <span className="text-xs text-ink-faint w-5 text-right">{i + 1}</span>
            <span className="text-sm text-ink">{sec.title}</span>
          </Link>
        ))}
      </div>
      {chapter.sections[0] && (
        <Link href={`/learn/${chapter.id}/${chapter.sections[0].id}`}>
          <Button>Begin chapter</Button>
        </Link>
      )}
    </div>
  );
}

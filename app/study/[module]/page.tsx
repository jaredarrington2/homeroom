// app/study/[module]/page.tsx — a reader module's sections, each with vocab + card counts.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReaderSection, vocabItems, cardItems } from '@/lib/readerContent';
import { getChapterTree } from '@/lib/content';

export default function StudyModulePage({ params }: { params: { module: string } }) {
  const section = getReaderSection(params.module);
  if (!section) notFound();
  const chapter = getChapterTree().parts.flatMap((p) => p.chapters).find((c) => c.id === params.module);

  return (
    <div className="max-w-reading mx-auto">
      <div className="font-mono text-[11px] uppercase tracking-eyebrow text-royal">
        Module {chapter?.moduleNumber ?? ''} · Study
      </div>
      <h1 className="font-display text-3xl font-semibold tracking-display mt-1 mb-8">{section.title}</h1>

      <div className="space-y-px">
        {section.units.map((u, i) => {
          const vocab = vocabItems(u).length;
          const cards = cardItems(u).length;
          return (
            <Link
              key={u.id}
              href={`/study/${params.module}/${u.id}`}
              className="flex items-center gap-4 py-3 border-b border-hairline hover:bg-royal-faint transition-colors"
            >
              <span className="font-mono text-xs text-ink-faint w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-ink flex-1">{u.name}</span>
              <span className="font-mono text-xs text-ink-faint shrink-0">
                {vocab} vocab · {cards} cards
              </span>
            </Link>
          );
        })}
      </div>

      <Link href="/study" className="inline-block mt-8 text-sm text-royal hover:underline">← All modules</Link>
    </div>
  );
}

// app/study/[module]/[section]/page.tsx — one section's two decks: Vocab (definitions) and
// Study cards (the unit's review flashcards). Both run on the shared SM-2 store via StudyDeck.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReaderUnit, vocabItems, cardItems } from '@/lib/readerContent';
import { getChapterTree } from '@/lib/content';
import StudyDeck from '@/components/StudyDeck';

export default function StudySectionPage({ params }: { params: { module: string; section: string } }) {
  const unit = getReaderUnit(params.module, params.section);
  if (!unit) notFound();
  const chapter = getChapterTree().parts.flatMap((p) => p.chapters).find((c) => c.id === params.module);

  const vocab = vocabItems(unit);
  const cards = cardItems(unit);

  return (
    <div className="max-w-reading mx-auto">
      <div className="font-mono text-[11px] uppercase tracking-eyebrow text-royal">
        Module {chapter?.moduleNumber ?? ''} · {chapter?.title ?? 'Study'}
      </div>
      <h1 className="font-display text-3xl font-semibold tracking-display mt-1 mb-1">{unit.name}</h1>
      <p className="text-sm text-ink-muted mb-8">
        <Link href={`/learn/${params.module}#${unit.id}`} className="text-royal hover:underline">Read the section →</Link>
      </p>

      <section className="mb-12">
        <h2 className="font-mono text-xs uppercase tracking-eyebrow text-ink-faint mb-4">Vocab · {vocab.length}</h2>
        <StudyDeck items={vocab} label="Vocab" />
      </section>

      <section className="mb-8">
        <h2 className="font-mono text-xs uppercase tracking-eyebrow text-ink-faint mb-4">Study cards · {cards.length}</h2>
        <StudyDeck items={cards} label="Study cards" />
      </section>

      <Link href={`/study/${params.module}`} className="inline-block text-sm text-royal hover:underline">← All sections</Link>
    </div>
  );
}

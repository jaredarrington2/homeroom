// app/study/page.tsx — Study home (Slice F). Modules → sections → two decks (vocab + cards).
// Reader modules (3/4/5) carry per-unit definitions + review cards; other modules link out to
// the global glossary / flashcards until their content moves onto the reader.
import Link from 'next/link';
import { getChapterTree } from '@/lib/content';
import { READER_SECTIONS } from '@/lib/readerContent';

export const metadata = { title: 'Study — Homeroom' };

export default function StudyPage() {
  const tree = getChapterTree();
  const modules = tree.parts
    .flatMap((p) => p.chapters)
    .sort((a, b) => a.moduleNumber - b.moduleNumber);

  return (
    <div className="max-w-reading mx-auto">
      <h1 className="font-display text-3xl font-semibold tracking-display mb-2">Study</h1>
      <p className="text-sm text-ink-muted mb-8">Vocab and study cards, by section. Grading a card schedules it — due cards span every deck.</p>

      <div className="space-y-px">
        {modules.map((m) => {
          const hasDecks = Boolean(READER_SECTIONS[m.id]);
          return (
            <div key={m.id} className="flex items-center gap-4 py-3 border-b border-hairline">
              <span className="font-mono text-xs text-ink-faint w-6 shrink-0">{m.moduleNumber}</span>
              {hasDecks ? (
                <Link href={`/study/${m.id}`} className="font-display text-ink hover:text-royal transition-colors flex-1">
                  {m.title}
                </Link>
              ) : (
                <span className="font-display text-ink-faint flex-1">{m.title}</span>
              )}
              <span className="font-mono text-xs text-ink-faint shrink-0">
                {hasDecks ? `${m.sections.length} sections` : 'in glossary'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex gap-4 text-sm">
        <Link href="/glossary" className="text-royal hover:underline">All vocab (glossary) →</Link>
        <Link href="/flashcards" className="text-royal hover:underline">All flashcards →</Link>
      </div>
    </div>
  );
}

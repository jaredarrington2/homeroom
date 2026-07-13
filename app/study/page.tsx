// app/study/page.tsx — Study hub (Slice C). Two decks: Vocab and Study cards.
// For now these point at the existing global glossary + flashcards surfaces; Slice F
// decomposes them by module → section and puts both on the shared SRS store.
import Link from 'next/link';

export const metadata = { title: 'Study — Homeroom' };

export default function StudyPage() {
  return (
    <div className="max-w-reading mx-auto">
      <h1 className="font-display text-3xl font-semibold tracking-display mb-8">Study</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/glossary"
          className="block border border-hairline p-5 hover:border-royal hover:bg-royal-faint transition-colors"
        >
          <div className="font-mono text-[11px] uppercase tracking-eyebrow text-royal mb-1">Vocab</div>
          <div className="font-display text-lg text-ink">Every term, defined</div>
          <div className="text-sm text-ink-muted mt-1">The definitions each unit leans on, in one place.</div>
        </Link>
        <Link
          href="/flashcards"
          className="block border border-hairline p-5 hover:border-royal hover:bg-royal-faint transition-colors"
        >
          <div className="font-mono text-[11px] uppercase tracking-eyebrow text-royal mb-1">Study cards</div>
          <div className="font-display text-lg text-ink">Spaced-repetition review</div>
          <div className="text-sm text-ink-muted mt-1">Cards come due on the schedule that keeps them stuck.</div>
        </Link>
      </div>
    </div>
  );
}

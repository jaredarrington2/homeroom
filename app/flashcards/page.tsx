import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';
import Button from '@/components/Button';
import { getFlashcards } from '@/lib/content';

export default function FlashcardsPage() {
  const cards = getFlashcards();
  const allTags = Array.from(new Set(cards.flatMap(c => c.tags))).sort();

  return (
    <div className="max-w-reading mx-auto">
      <Eyebrow>Flashcards</Eyebrow>
      <h1 className="font-display text-3xl font-semibold tracking-display mt-2 mb-6">Review decks</h1>

      {cards.length === 0 ? (
        <p className="text-ink-muted text-sm">No flashcards yet. Run the generation script first.</p>
      ) : (
        <>
          <Link href="/flashcards/review">
            <Button className="mb-6">Review all ({cards.length} cards)</Button>
          </Link>
          <div className="space-y-2">
            {allTags.map(tag => {
              const count = cards.filter(c => c.tags.includes(tag)).length;
              return (
                <Link
                  key={tag}
                  href={`/flashcards/review?tag=${encodeURIComponent(tag)}`}
                  className="flex items-center justify-between p-3 border border-hairline hover:border-royal hover:bg-royal-faint transition-colors"
                >
                  <span className="text-sm text-ink capitalize">{tag}</span>
                  <span className="text-xs text-ink-faint">{count} cards</span>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

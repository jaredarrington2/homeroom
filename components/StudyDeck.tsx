'use client';
// components/StudyDeck.tsx — a flip-through deck on the shared SM-2 SRS store, used by the
// per-section Study surface for both the vocab deck and the study-card deck. Cards order
// due-first; grading (again/hard/easy) writes flashcardSRS, so "due today" spans every deck.
// `back` may carry inline <span class="hl"> from the source (review answers do), so it renders
// as HTML.
import { useEffect, useRef, useState } from 'react';
import { useProgressContext } from '@/lib/ProgressContext';
import { gradeCard, defaultCardState } from '@/lib/srs';
import type { StudyItem } from '@/lib/readerContent';

export default function StudyDeck({ items, label }: { items: StudyItem[]; label: string }) {
  const { getFlashcardSRS, saveFlashcardSRS, loaded } = useProgressContext();
  const [order, setOrder] = useState<StudyItem[]>(items);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const ordered = useRef(false);

  // Order due-first once progress loads (new cards are due now).
  useEffect(() => {
    if (!loaded || ordered.current || !items.length) return;
    ordered.current = true;
    setOrder(
      [...items].sort(
        (a, b) =>
          (getFlashcardSRS(a.id) ?? defaultCardState()).due_at -
          (getFlashcardSRS(b.id) ?? defaultCardState()).due_at,
      ),
    );
  }, [loaded, items, getFlashcardSRS]);

  if (!items.length) {
    return <p className="text-sm text-ink-muted">No {label.toLowerCase()} for this section.</p>;
  }

  if (done) {
    return (
      <div className="border border-hairline p-6 text-center">
        <p className="font-display text-lg text-ink mb-3">Deck complete — {order.length} cards</p>
        <button
          onClick={() => { setIndex(0); setFlipped(false); setDone(false); }}
          className="text-sm font-medium text-royal hover:underline"
        >
          Go again
        </button>
      </div>
    );
  }

  const card = order[index];
  function grade(g: 'again' | 'hard' | 'easy') {
    const prev = getFlashcardSRS(card.id) ?? defaultCardState();
    saveFlashcardSRS(card.id, gradeCard(prev, g));
    setFlipped(false);
    if (index + 1 >= order.length) setDone(true);
    else setIndex((i) => i + 1);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 font-mono text-xs text-ink-faint">
        <span>{label}</span>
        <span>{index + 1} / {order.length}</span>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className={`w-full text-left border border-hairline p-6 min-h-[180px] flex flex-col justify-between transition-colors ${
          flipped ? 'bg-royal-faint' : 'bg-paper hover:border-ink-muted'
        }`}
      >
        {flipped ? (
          <p className="font-sans text-base text-ink leading-relaxed" dangerouslySetInnerHTML={{ __html: card.back }} />
        ) : (
          <p className="font-display text-xl text-ink leading-snug">{card.front}</p>
        )}
        <span className="font-mono text-[11px] uppercase tracking-eyebrow text-ink-faint mt-4">
          {flipped ? 'how well did you know it?' : 'tap to reveal'}
        </span>
      </button>

      {flipped && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          <button onClick={() => grade('again')}
            className="border border-hairline py-2 text-sm font-medium text-loose-margin hover:border-loose-margin transition-colors">
            Again
          </button>
          <button onClick={() => grade('hard')}
            className="border border-hairline py-2 text-sm font-medium text-ink-muted hover:border-ink-muted transition-colors">
            Hard
          </button>
          <button onClick={() => grade('easy')}
            className="border border-hairline py-2 text-sm font-medium text-royal hover:border-royal transition-colors">
            Easy
          </button>
        </div>
      )}
    </div>
  );
}

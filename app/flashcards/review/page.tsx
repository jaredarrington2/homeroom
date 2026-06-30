'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Flashcard from '@/components/Flashcard';
import Button from '@/components/Button';
import ProgressIndicator from '@/components/ProgressIndicator';
import { gradeCard, defaultCardState } from '@/lib/srs';
import { useProgressContext } from '@/lib/ProgressContext';
import type { Flashcard as FlashcardType } from '@/lib/types';

function FlashcardReviewInner() {
  const params = useSearchParams();
  const tagFilter = params.get('tag');
  const { getFlashcardSRS, saveFlashcardSRS, loaded } = useProgressContext();

  const [cards, setCards] = useState<FlashcardType[]>([]);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const ordered = useRef(false);

  useEffect(() => {
    fetch('/api/cards').then(r => r.json()).then((all: FlashcardType[]) => {
      const filtered = tagFilter ? all.filter(c => c.tags.includes(tagFilter)) : all;
      setCards(filtered);
      ordered.current = false;
    }).catch(() => {});
  }, [tagFilter]);

  // Once progress is loaded, sort due-first by saved SRS state (new cards are due now).
  useEffect(() => {
    if (!loaded || ordered.current || !cards.length) return;
    ordered.current = true;
    const sorted = [...cards].sort((a, b) => {
      const da = (getFlashcardSRS(a.id) ?? defaultCardState()).due_at;
      const db = (getFlashcardSRS(b.id) ?? defaultCardState()).due_at;
      return da - db;
    });
    setCards(sorted);
  }, [loaded, cards, getFlashcardSRS]);

  function handleGrade(grade: 'again' | 'hard' | 'easy') {
    const card = cards[index];
    if (!card) return;
    const prev = getFlashcardSRS(card.id) ?? defaultCardState();
    const next = gradeCard(prev, grade);
    saveFlashcardSRS(card.id, next);
    if (index + 1 >= cards.length) {
      setDone(true);
    } else {
      setIndex(i => i + 1);
    }
  }

  if (done) {
    return (
      <div className="max-w-reading mx-auto text-center py-16">
        <p className="font-display text-2xl font-medium text-ink mb-2">Session complete.</p>
        <p className="text-ink-muted text-sm mb-6">{cards.length} cards reviewed.</p>
        <Button onClick={() => { setIndex(0); setDone(false); }}>Review again</Button>
      </div>
    );
  }

  if (!cards.length) {
    return <div className="max-w-reading mx-auto py-8 text-sm text-ink-muted">No cards to review.</div>;
  }

  const card = cards[index];
  return (
    <div className="max-w-reading mx-auto">
      <ProgressIndicator value={index} max={cards.length} label={`${index + 1} of ${cards.length}`} />
      <div className="mt-8 mb-6">
        <Flashcard card={card} />
      </div>
      <div className="flex gap-3 justify-center">
        <Button variant="ghost" onClick={() => handleGrade('again')}>Again</Button>
        <Button variant="ghost" onClick={() => handleGrade('hard')}>Hard</Button>
        <Button onClick={() => handleGrade('easy')}>Easy</Button>
      </div>
    </div>
  );
}

export default function FlashcardReviewPage() {
  return (
    <Suspense fallback={<div className="max-w-reading mx-auto py-8 text-sm text-ink-muted">Loading…</div>}>
      <FlashcardReviewInner />
    </Suspense>
  );
}

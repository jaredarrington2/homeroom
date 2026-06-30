"use client";
// components/ReviewDeck.tsx — tier 3. End-of-unit recognition: flashcards (tap to flip)
// + MCQ (select to lock, marks correct/incorrect). Ported from the redesign reference.
// Persistence (v3.6): MCQ selections are saved per (unitId, mcqId) and restored on load.
// Flashcard flips remain in-session only.
import { useState, useEffect } from "react";
import type { ReviewFlashcard, ReviewMCQ } from "@/lib/section";
import { useProgressContext } from "@/lib/ProgressContext";

function Card({ card }: { card: ReviewFlashcard }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={"card" + (flipped ? " flipped" : "")} onClick={() => setFlipped((f) => !f)}>
      <div className="inner">
        <div className="face front">
          <span className="peg">{card.peg}</span>
          <div className="q">{card.q}</div>
          <span className="flip-hint">tap to flip</span>
        </div>
        <div className="face back">
          <span className="peg">{card.peg}</span>
          <div className="a" dangerouslySetInnerHTML={{ __html: card.a }} />
        </div>
      </div>
    </div>
  );
}

// Topic bar: the unique topics across the unit's flashcards, shown as pills.
// More than 5 unique → keep the 5 most common (ties broken by first appearance).
function topTopics(cards: ReviewFlashcard[]): string[] {
  const counts = new Map<string, number>();
  for (const c of cards) {
    const t = c.topic?.trim();
    if (!t) continue;
    counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  const unique = Array.from(counts.keys());
  if (unique.length <= 5) return unique;
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([t]) => t);
}

function Question({ m, unitId, mcqId }: { m: ReviewMCQ; unitId: string; mcqId: string }) {
  const { getMCQ, saveMCQ, loaded } = useProgressContext();
  const [picked, setPicked] = useState<number | null>(null);
  const locked = picked !== null;

  useEffect(() => {
    if (!loaded || picked !== null) return;
    const saved = getMCQ(unitId, mcqId);
    if (saved) setPicked(saved.selectedIndex);
  }, [loaded, getMCQ, unitId, mcqId, picked]);

  const select = (i: number) => {
    setPicked(i);
    saveMCQ(unitId, mcqId, { selectedIndex: i, correct: i === m.correct });
  };

  return (
    <div className="mcq">
      <div className="q">{m.q}</div>
      {m.opts.map((o, i) => {
        let cls = "opt";
        let mark = "";
        if (locked) {
          if (i === m.correct) { cls += " correct"; mark = "✓"; }
          else if (i === picked) { cls += " wrong"; mark = "✕"; }
        }
        return (
          <button key={i} className={cls} disabled={locked} onClick={() => select(i)}>
            {o}
            {mark && <span className="mk">{mark}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default function ReviewDeck({
  review, name, unitId,
}: { review: { flashcards: ReviewFlashcard[]; mcq: ReviewMCQ[] }; name: string; unitId: string }) {
  const hasCards = review.flashcards?.length > 0;
  const hasMcq = review.mcq?.length > 0;
  if (!hasCards && !hasMcq) return null;
  const topics = hasCards ? topTopics(review.flashcards) : [];
  return (
    <div className="review">
      <div className="head">Review · {name}</div>
      {hasCards && (
        <div className="topicbar">
          {topics.map((t) => <span key={t} className="topicpill">{t}</span>)}
          <span className="topiccount">{review.flashcards.length} cards</span>
        </div>
      )}
      {hasCards && (
        <>
          <div className="deckhead">Flashcards</div>
          <div className="cards">
            {review.flashcards.map((c, i) => <Card key={i} card={c} />)}
          </div>
        </>
      )}
      {hasMcq && (
        <>
          <div className="deckhead">Quick questions</div>
          <div>{review.mcq.map((m, i) => <Question key={i} m={m} unitId={unitId} mcqId={`${unitId}-mcq-${i}`} />)}</div>
        </>
      )}
    </div>
  );
}

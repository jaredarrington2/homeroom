'use client';
import { useState } from 'react';
import type { Flashcard as FlashcardType } from '@/lib/types';

export default function Flashcard({ card }: { card: FlashcardType }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="w-full max-w-[480px] mx-auto cursor-pointer select-none"
      style={{ aspectRatio: '1.6', perspective: '1000px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
          className="border border-hairline bg-paper flex flex-col justify-between p-6"
        >
          <div className="text-xs font-sans font-semibold uppercase tracking-eyebrow text-ink-faint">
            {card.tags[0] ?? 'Flashcard'}
          </div>
          <p className="font-display text-xl text-ink leading-snug">{card.front}</p>
          <div className="text-xs text-ink-faint">tap to reveal</div>
        </div>
        {/* Back */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            inset: 0,
            transform: 'rotateY(180deg)',
          }}
          className="border border-hairline bg-royal-faint flex flex-col justify-between p-6"
        >
          <div className="text-xs font-sans font-semibold uppercase tracking-eyebrow text-royal">
            {card.tags[0] ?? 'Answer'}
          </div>
          <p className="font-sans text-base text-ink leading-relaxed">{card.back}</p>
          <div className="text-xs text-ink-faint"></div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import type { Question } from '@/lib/types';

interface QuizProps {
  question: Question;
  mode: 'inline' | 'gated' | 'practice-only';
  onAnswer?: (correct: boolean) => void;
}

export default function Quiz({ question, mode, onAnswer }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleSelect(i: number) {
    if (selected !== null) return;
    setSelected(i);
    onAnswer?.(i === question.correct);
  }

  const showFeedback = selected !== null && mode !== 'practice-only';

  const wrapperClass =
    mode === 'inline'
      ? 'border-l-2 border-royal pl-4 py-2'
      : mode === 'gated'
      ? 'bg-royal-faint p-6'
      : 'bg-paper border border-hairline p-6 shadow-sm';

  return (
    <div className={wrapperClass}>
      <p className="font-sans text-base font-medium text-ink mb-4">{question.question}</p>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => {
          let optClass = 'border border-hairline text-left px-4 py-2 text-sm transition-colors ';
          if (showFeedback && i === question.correct) {
            optClass += 'border-correct bg-correct-faint text-correct font-medium';
          } else if (showFeedback && i === selected && i !== question.correct) {
            optClass += 'border-incorrect bg-incorrect-faint text-incorrect';
          } else if (selected !== null) {
            optClass += 'text-ink-muted cursor-default';
          } else {
            optClass += 'hover:bg-royal-faint hover:border-royal cursor-pointer text-ink';
          }
          return (
            <button key={i} className={optClass} onClick={() => handleSelect(i)}>
              {opt}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <p className="mt-3 text-sm text-ink-muted">
          {selected === question.correct ? 'Correct. ' : 'Incorrect. '}
          {question.explanation}
        </p>
      )}
    </div>
  );
}

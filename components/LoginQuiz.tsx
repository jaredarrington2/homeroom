'use client';
// components/LoginQuiz.tsx — once-per-session pop quiz of 3 MCQs drawn from completed
// sections, shown in a bottom-right panel. Always skippable. Seen ids tracked in
// localStorage so questions don't immediately repeat across sessions.
import { useEffect, useState } from 'react';

type Q = {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
};

export function LoginQuiz({ completedUnits }: { completedUnits: string[] }) {
  const [questions, setQuestions] = useState<Q[]>([]);
  const [shown, setShown] = useState(false);
  const [idx, setIdx] = useState(0);
  const [selections, setSelections] = useState<(number | null)[]>([]);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('homeroom_quiz_shown')) return;
    if (!completedUnits.length) return;

    const seen: string[] = JSON.parse(localStorage.getItem('homeroom_seen_q') ?? '[]');
    const params = new URLSearchParams({
      sections: completedUnits.join(','),
      exclude: seen.slice(-60).join(','),
    });

    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/login-quiz?${params}`);
        const data = await res.json();
        if (!data.questions?.length) return;
        setQuestions(data.questions);
        setSelections(new Array(data.questions.length).fill(null));
        setShown(true);
      } catch {
        // non-critical, fail silently
      }
    }, 600);

    return () => clearTimeout(t);
  }, [completedUnits]);

  const dismiss = () => {
    sessionStorage.setItem('homeroom_quiz_shown', '1');
    setShown(false);
  };

  const select = (optIdx: number) => {
    if (answered) return;
    const next = [...selections];
    next[idx] = optIdx;
    setSelections(next);
    setAnswered(true);

    const seen: string[] = JSON.parse(localStorage.getItem('homeroom_seen_q') ?? '[]');
    localStorage.setItem(
      'homeroom_seen_q',
      JSON.stringify([...seen.filter((id) => id !== questions[idx].id), questions[idx].id])
    );
  };

  const advance = () => {
    if (idx < questions.length - 1) {
      setIdx((n) => n + 1);
      setAnswered(false);
    } else {
      setDone(true);
      sessionStorage.setItem('homeroom_quiz_shown', '1');
    }
  };

  if (!shown) return null;

  const q = questions[idx];
  const score = selections.filter((s, i) => s === questions[i]?.correct).length;

  return (
    <>
      {/* Scrim */}
      <div className="fixed inset-0 z-40 bg-black/10" onClick={dismiss} aria-hidden="true" />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick check"
        className="fixed z-50 bg-paper border border-hairline-strong bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto sm:w-[440px] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-baseline justify-between px-6 pt-5 pb-3 border-b border-hairline">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-base text-ink font-semibold">Quick check</span>
            {!done && (
              <span className="font-mono text-xs text-ink-muted">{idx + 1} of {questions.length}</span>
            )}
          </div>
          <button
            onClick={dismiss}
            className="font-sans text-sm text-ink-muted hover:text-ink underline underline-offset-2"
          >
            Skip
          </button>
        </div>

        {/* Answering */}
        {!done && (
          <div className="px-6 py-5 flex flex-col gap-4">
            <p className="font-sans text-sm text-ink leading-relaxed">{q.question}</p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, i) => {
                const isSelected = selections[idx] === i;
                const isCorrect = i === q.correct;
                let cls = 'text-left px-4 py-2.5 font-sans text-sm transition-colors border ';
                if (!answered) {
                  cls += 'border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink cursor-pointer';
                } else if (isCorrect) {
                  cls += 'border-correct bg-correct-faint text-correct cursor-default';
                } else if (isSelected) {
                  cls += 'border-incorrect bg-incorrect-faint text-incorrect cursor-default';
                } else {
                  cls += 'border-hairline text-ink-faint cursor-default';
                }
                return (
                  <button key={i} onClick={() => select(i)} disabled={answered} className={cls}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className="flex items-start justify-between gap-4 pt-1">
                {q.explanation && (
                  <p className="font-sans text-xs text-ink-muted leading-relaxed flex-1">{q.explanation}</p>
                )}
                <button
                  onClick={advance}
                  className="shrink-0 font-sans text-sm font-medium text-paper bg-royal hover:bg-royal-hover px-4 py-2"
                >
                  {idx < questions.length - 1 ? 'Next' : 'Finish'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Done */}
        {done && (
          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-sm text-ink">{score} of {questions.length} correct</p>
              <p className="font-sans text-xs text-ink-muted mt-0.5">
                {score === questions.length ? 'Clean sweep.' : score === 0 ? 'Worth a second look.' : 'Getting there.'}
              </p>
            </div>
            <button
              onClick={dismiss}
              className="font-sans text-sm font-medium text-paper bg-royal hover:bg-royal-hover px-4 py-2"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </>
  );
}

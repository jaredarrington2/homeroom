'use client';
import { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import { sampleBlueprint } from '@/lib/exam/sampler';
import type { Question } from '@/lib/types';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function MockExamPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(190 * 60);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch('/api/questions')
      .then(r => r.json())
      .then((all: Question[]) => {
        // Blueprint-weighted, not a flat random draw — mirrors the real exam's area mix.
        setQuestions(sampleBlueprint(all, 125));
      });
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { setSubmitted(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function handleAnswer(i: number) {
    if (submitted) return;
    const q = questions[current];
    setAnswers(a => ({ ...a, [q.id]: i }));
  }

  function toggleFlag() {
    const id = questions[current]?.id;
    if (!id) return;
    setFlagged(f => {
      const n = new Set(f);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  function handleSubmit() {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
  }

  if (submitted && questions.length) {
    const correct = questions.filter(q => answers[q.id] === q.correct).length;
    const pct = Math.round((correct / questions.length) * 100);
    const passed = pct >= 75;
    return (
      <div className="max-w-reading mx-auto py-8">
        <h1 className="font-display text-3xl font-semibold mb-2">Exam complete</h1>
        <p className={`text-lg font-medium mb-6 ${passed ? 'text-royal' : 'text-warning'}`}>
          {correct}/{questions.length} — {pct}% — {passed ? 'Pass' : 'Not yet'}
        </p>
        <div className="space-y-6">
          {questions.filter(q => answers[q.id] !== q.correct).map(q => (
            <div key={q.id} className="border border-hairline p-4 text-sm">
              <p className="font-medium text-ink mb-2">{q.question}</p>
              <p className="text-warning mb-1">Your answer: {answers[q.id] != null ? q.options[answers[q.id]] : 'Not answered'}</p>
              <p className="text-royal mb-2">Correct: {q.options[q.correct]}</p>
              <p className="text-ink-muted">{q.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return <div className="max-w-reading mx-auto py-8 text-sm text-ink-muted">Loading questions…</div>;
  }

  const q = questions[current];
  const selectedAnswer = answers[q.id] ?? null;

  return (
    <div className="max-w-reading mx-auto">
      <div className="flex items-center justify-between mb-6 sticky top-14 bg-paper py-3 border-b border-hairline">
        <span className="text-sm text-ink-muted">{current + 1} / {questions.length}</span>
        <span className={`font-mono text-sm font-medium ${timeLeft < 600 ? 'text-warning' : 'text-ink'}`}>
          {formatTime(timeLeft)}
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={toggleFlag} className="text-xs px-2 py-1">
            {flagged.has(q.id) ? '⚑ Flagged' : '⚐ Flag'}
          </Button>
          <Button variant="ghost" onClick={handleSubmit} className="text-xs px-2 py-1">Submit</Button>
        </div>
      </div>

      <p className="font-sans text-base font-medium text-ink mb-4">{q.question}</p>
      <div className="flex flex-col gap-2 mb-6">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className={`text-left border px-4 py-2 text-sm transition-colors ${
              selectedAnswer === i
                ? 'border-royal bg-royal-faint text-royal'
                : 'border-hairline hover:border-royal hover:bg-royal-faint text-ink'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>
          ← Back
        </Button>
        {current < questions.length - 1 ? (
          <Button onClick={() => setCurrent(c => c + 1)}>Next →</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit exam</Button>
        )}
      </div>
    </div>
  );
}

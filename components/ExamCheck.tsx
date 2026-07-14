'use client';
// components/ExamCheck.tsx — the end-of-section exam check (Slice D). Sits after the review deck,
// before the recap/Mark-complete row. Unlike the recall gradient (which teaches), this MEASURES:
// 8 items, one at a time, NO feedback until submit. A quiet advisory timer. Results show the
// score, the 75% pass line, and every question with the key, your answer, and the explanation.
// Retake draws a fresh 8, preferring items you've seen least.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useProgressContext } from '@/lib/ProgressContext';
import { PASS_FRACTION } from '@/lib/progressStats';
import type { ExamItem } from '@/content/exam/types';

const DRAW = 8;
const SECONDS = 12 * 60;

function pickItems(items: ExamItem[], seen: Record<string, boolean>, seed: number): ExamItem[] {
  // Unseen first, then a deterministic-per-attempt shuffle so a retake reorders.
  const scored = items.map((it, i) => ({
    it,
    key: (it.id in seen ? 1 : 0) + (((i + 1) * 2654435761 * (seed + 1)) % 1000) / 1000,
  }));
  scored.sort((a, b) => a.key - b.key);
  return scored.slice(0, Math.min(DRAW, items.length)).map((s) => s.it);
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function ExamCheck({ unitId, items }: { unitId: string; items: ExamItem[] }) {
  const { progress, recordExamAttempt, examAttempts, loaded } = useProgressContext();
  const questionHistory = progress.questionHistory;
  const [open, setOpen] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [current, setCurrent] = useState(0);
  const [left, setLeft] = useState(SECONDS);
  const [submitted, setSubmitted] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const drawn = useMemo(() => pickItems(items, questionHistory, attempt), [items, questionHistory, attempt]);

  useEffect(() => {
    if (!open || submitted) return;
    timer.current = setInterval(() => setLeft((t) => (t <= 1 ? (setSubmitted(true), 0) : t - 1)), 1000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [open, submitted]);

  const priorBest = loaded
    ? examAttempts(unitId).reduce((m, a) => Math.max(m, a.total ? a.correct / a.total : 0), 0)
    : 0;

  if (!items.length) return null;

  function start() {
    setAnswers({}); setCurrent(0); setLeft(SECONDS); setSubmitted(false); setOpen(true);
  }

  function submit() {
    setSubmitted(true);
    if (timer.current) clearInterval(timer.current);
    const correct = drawn.reduce((n, it, i) => n + (answers[i] === it.correct ? 1 : 0), 0);
    const itemResults: Record<string, boolean> = {};
    drawn.forEach((it, i) => { itemResults[it.id] = answers[i] === it.correct; });
    recordExamAttempt(
      unitId,
      { at: Date.now(), correct, total: drawn.length, itemIds: drawn.map((d) => d.id), answers: drawn.map((_, i) => answers[i] ?? -1) },
      itemResults,
    );
  }

  // ── Collapsed entry ─────────────────────────────────────────────
  if (!open) {
    return (
      <div className="border border-hairline p-5 my-8">
        <div className="font-mono text-[11px] uppercase tracking-eyebrow text-royal mb-1">Section check</div>
        <p className="text-sm text-ink-muted mb-4">
          {Math.min(DRAW, items.length)} exam-style questions, scored at the end.
          {priorBest > 0 && ` Your best: ${Math.round(priorBest * 100)}%.`}
        </p>
        <button onClick={start} className="text-sm font-medium px-4 py-2 border border-royal text-royal rounded hover:bg-royal-faint transition-colors">
          {priorBest > 0 ? 'Retake' : 'Start'}
        </button>
      </div>
    );
  }

  // ── Results ─────────────────────────────────────────────────────
  if (submitted) {
    const correct = drawn.reduce((n, it, i) => n + (answers[i] === it.correct ? 1 : 0), 0);
    const frac = drawn.length ? correct / drawn.length : 0;
    const passed = frac >= PASS_FRACTION;
    return (
      <div className="border border-hairline p-5 my-8">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="font-display text-3xl font-semibold text-ink tabular-nums">{correct} / {drawn.length}</div>
            <div className={`font-mono text-xs uppercase tracking-eyebrow ${passed ? 'text-correct' : 'text-loose-margin'}`}>
              {Math.round(frac * 100)}% · {passed ? 'passed' : 'below 75%'}
            </div>
          </div>
          <button onClick={start} className="text-sm font-medium px-4 py-2 border border-royal text-royal rounded hover:bg-royal-faint transition-colors">
            Retake (fresh 8)
          </button>
        </div>
        <ol className="space-y-5">
          {drawn.map((it, i) => {
            const mine = answers[i];
            const right = mine === it.correct;
            return (
              <li key={it.id} className="border-t border-hairline pt-4">
                <p className="text-sm font-medium text-ink mb-2">{i + 1}. {it.stem}</p>
                <div className="space-y-1 mb-2">
                  {it.options.map((opt, oi) => {
                    const isKey = oi === it.correct;
                    const isMine = oi === mine;
                    return (
                      <div key={oi} className={`text-sm px-2 py-1 rounded ${isKey ? 'bg-correct-faint text-ink' : isMine ? 'bg-loose-paper text-ink' : 'text-ink-muted'}`}>
                        {isKey ? '✓ ' : isMine ? '✗ ' : ''}{opt}
                      </div>
                    );
                  })}
                </div>
                <p className={`text-xs ${right ? 'text-ink-muted' : 'text-ink'} leading-relaxed`}>{it.explanation}</p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  // ── Running ─────────────────────────────────────────────────────
  const it = drawn[current];
  return (
    <div className="border border-hairline p-5 my-8">
      <div className="flex items-center justify-between mb-4 font-mono text-xs text-ink-faint">
        <span>Question {current + 1} / {drawn.length}</span>
        <span>{fmt(left)}</span>
      </div>
      <p className="text-base text-ink mb-4">{it.stem}</p>
      <div className="space-y-2 mb-5">
        {it.options.map((opt, oi) => (
          <button
            key={oi}
            onClick={() => setAnswers((a) => ({ ...a, [current]: oi }))}
            className={`w-full text-left text-sm border px-3 py-2 rounded transition-colors ${
              answers[current] === oi ? 'border-royal bg-royal-faint text-royal' : 'border-hairline text-ink hover:border-ink-muted'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}
          className="text-sm text-ink-muted disabled:opacity-40 hover:text-ink">← Back</button>
        {current + 1 < drawn.length ? (
          <button onClick={() => setCurrent((c) => c + 1)}
            className="text-sm font-medium px-4 py-2 border border-hairline rounded hover:border-ink-muted">Next →</button>
        ) : (
          <button onClick={submit}
            className="text-sm font-medium px-4 py-2 border border-royal text-royal rounded hover:bg-royal-faint">Submit</button>
        )}
      </div>
    </div>
  );
}

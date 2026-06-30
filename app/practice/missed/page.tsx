'use client';
import { useState, useEffect } from 'react';
import Quiz from '@/components/Quiz';
import Eyebrow from '@/components/Eyebrow';
import { loadProgress } from '@/lib/kv';
import type { Question, PracticeAttempt } from '@/lib/types';

export default function MissedPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    Promise.all([
      loadProgress(),
      fetch('/api/questions').then(r => r.json()),
    ]).then(([progress, all]: [Awaited<ReturnType<typeof loadProgress>>, Question[]]) => {
      const missed = new Set(progress.practiceAttempts.flatMap((a: PracticeAttempt) => a.missed_question_ids));
      setQuestions(all.filter(q => missed.has(q.id)));
    });
  }, []);

  return (
    <div className="max-w-reading mx-auto">
      <Eyebrow>Practice · Missed questions</Eyebrow>
      <h1 className="font-display text-2xl font-semibold tracking-display mt-2 mb-6">Missed questions</h1>
      {questions.length === 0 && (
        <p className="text-sm text-ink-muted">No missed questions yet. Complete a practice exam first.</p>
      )}
      <div className="space-y-6">
        {questions.map(q => <Quiz key={q.id} question={q} mode="inline" />)}
      </div>
    </div>
  );
}

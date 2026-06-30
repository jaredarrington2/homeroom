'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Quiz from '@/components/Quiz';
import Eyebrow from '@/components/Eyebrow';
import type { Question } from '@/lib/types';

export default function TopicDrillPage() {
  const { topic } = useParams<{ topic: string }>();
  const decoded = decodeURIComponent(topic);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch('/api/questions')
      .then(r => r.json())
      .then((all: Question[]) => {
        const filtered = all.filter(q => q.topic_tags.includes(decoded)).slice(0, 20);
        setQuestions(filtered);
      });
  }, [decoded]);

  return (
    <div className="max-w-reading mx-auto">
      <Eyebrow>Topic drill</Eyebrow>
      <h1 className="font-display text-2xl font-semibold tracking-display mt-2 mb-6 capitalize">{decoded}</h1>
      {questions.length === 0 && <p className="text-sm text-ink-muted">No questions for this topic.</p>}
      <div className="space-y-6">
        {questions.map(q => <Quiz key={q.id} question={q} mode="practice-only" />)}
      </div>
    </div>
  );
}

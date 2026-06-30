import { NextRequest, NextResponse } from 'next/server';
import questionsData from '@/content/generated/questions.json';
import type { Question } from '@/lib/types';

// questions.json items associate to sections via `section_id` (e.g. "respa", "ecoa",
// "fair-lending") — these already match the unit ids stored in progress.completedUnits,
// so no prefix stripping is needed.
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const sections = (searchParams.get('sections') ?? '').split(',').filter(Boolean);
  const exclude = (searchParams.get('exclude') ?? '').split(',').filter(Boolean);

  if (!sections.length) return NextResponse.json({ questions: [] });

  const pool = (questionsData as Question[]).filter(
    (q) => sections.includes(q.section_id) && !exclude.includes(q.id)
  );

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const questions = pool.slice(0, 3).map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correct,
    explanation: q.explanation,
  }));

  return NextResponse.json({ questions });
}

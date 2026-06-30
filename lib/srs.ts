import type { FlashcardState } from './types';

export function defaultCardState(): FlashcardState {
  return { ease: 2.5, interval: 0, due_at: Date.now(), last_reviewed: 0 };
}

export function gradeCard(state: FlashcardState, grade: 'again' | 'hard' | 'easy'): FlashcardState {
  const gradeMap = { again: 0, hard: 3, easy: 5 };
  const q = gradeMap[grade];
  let { ease, interval } = state;

  if (q < 3) {
    interval = 1;
  } else if (interval === 0) {
    interval = 1;
  } else if (interval === 1) {
    interval = 6;
  } else {
    interval = Math.round(interval * ease);
  }

  ease = Math.max(1.3, ease + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  const due_at = Date.now() + interval * 24 * 60 * 60 * 1000;

  return { ease, interval, due_at, last_reviewed: Date.now() };
}

export function isDue(state: FlashcardState): boolean {
  return Date.now() >= state.due_at;
}

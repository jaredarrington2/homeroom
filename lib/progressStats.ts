// lib/progressStats.ts — pure derivations from one Progress blob.
// Used by Learn home (the counters + module rows) and later by Practice history.
// Kept free of React/DOM so it's trivially unit-testable.
import type { Progress } from './types';

/** SRS interval (days) at which a card counts as "known". */
export const KNOWN_INTERVAL_DAYS = 21;
/** Section-check score (fraction) at which a section counts as "passed". */
export const PASS_FRACTION = 0.75;

export interface CourseStats {
  /** Units the reader marked complete. */
  sectionsRead: number;
  /** Units whose best section-check attempt is ≥ 75% (0 until Slice D lands the exam field). */
  sectionsPassed: number;
  /** Flashcards whose SRS interval has reached the "known" threshold. */
  cardsKnown: number;
}

/** Minimal shape of the not-yet-built exam field, read defensively so this compiles pre-Slice-D. */
type ExamRecord = Record<string, { attempts?: { correct: number; total: number }[] }>;

export function courseStats(p: Progress): CourseStats {
  const sectionsRead = p.completedUnits.length;

  const cardsKnown = Object.values(p.flashcardSRS).filter(
    (s) => (s?.interval ?? 0) >= KNOWN_INTERVAL_DAYS,
  ).length;

  const exam = (p as Progress & { exam?: ExamRecord }).exam ?? {};
  const sectionsPassed = Object.values(exam).filter((e) =>
    (e.attempts ?? []).some((a) => a.total > 0 && a.correct / a.total >= PASS_FRACTION),
  ).length;

  return { sectionsRead, sectionsPassed, cardsKnown };
}

/** How many of a module's unit ids are complete. */
export function moduleReadCount(p: Progress, unitIds: string[]): number {
  const done = new Set(p.completedUnits);
  return unitIds.filter((id) => done.has(id)).length;
}

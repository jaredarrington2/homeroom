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

/** Union two per-unit maps: incoming wins on a key collision. */
function mergeNested<T>(
  base: Record<string, Record<string, T>> | undefined,
  incoming: Record<string, Record<string, T>> | undefined,
): Record<string, Record<string, T>> {
  const out: Record<string, Record<string, T>> = { ...(base ?? {}) };
  for (const [unitId, items] of Object.entries(incoming ?? {})) {
    out[unitId] = { ...(out[unitId] ?? {}), ...items };
  }
  return out;
}

/**
 * Union two progress blobs. Used when an admin adopts a pre-account device blob into an
 * account that already has work — nothing is dropped, and `incoming` wins per item.
 */
export function mergeProgress(base: Progress, incoming: Progress): Progress {
  return {
    ...base,
    completedUnits: Array.from(new Set([...(base.completedUnits ?? []), ...(incoming.completedUnits ?? [])])),
    cloze: mergeNested(base.cloze, incoming.cloze),
    synth: mergeNested(base.synth, incoming.synth),
    definitions: mergeNested(base.definitions, incoming.definitions),
    mcq: mergeNested(base.mcq, incoming.mcq),
    exam: { ...(base.exam ?? {}), ...(incoming.exam ?? {}) },
    flashcardSRS: { ...(base.flashcardSRS ?? {}), ...(incoming.flashcardSRS ?? {}) },
    questionHistory: { ...(base.questionHistory ?? {}), ...(incoming.questionHistory ?? {}) },
    practiceAttempts: [...(base.practiceAttempts ?? []), ...(incoming.practiceAttempts ?? [])],
    updatedAt: Date.now(),
  };
}

/** Does this blob hold anything worth carrying over / worth listing? */
export function hasWork(p: Progress | null | undefined): boolean {
  if (!p) return false;
  return (
    (p.completedUnits?.length ?? 0) > 0 ||
    Object.keys(p.cloze ?? {}).length > 0 ||
    Object.keys(p.synth ?? {}).length > 0 ||
    Object.keys(p.mcq ?? {}).length > 0 ||
    Object.keys(p.definitions ?? {}).length > 0 ||
    Object.keys(p.flashcardSRS ?? {}).length > 0
  );
}

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

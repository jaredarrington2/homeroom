// lib/progressReset.ts — pure progress-reset logic, shared by the API route and tests.
// One KV write of a filtered blob. Kept free of React/DOM/network.
import { emptyProgress, type Progress } from './types';

export type ResetScope =
  | { kind: 'answers' }              // cloze · synth · MCQ · exam/practice attempts · question history
  | { kind: 'unit'; unitId: string } // everything for one section
  | { kind: 'module'; unitIds: string[] } // everything for a module's units
  | { kind: 'all' };                 // the whole blob (settings preserved)

/** Parse the wire form ("answers" | "unit:respa" | "module:federal-mortgage-laws" | "all").
 *  Module needs its unit ids resolved by the caller (from chapters.json), passed separately. */
export function parseScope(raw: string, moduleUnitIds?: string[]): ResetScope | null {
  if (raw === 'answers') return { kind: 'answers' };
  if (raw === 'all') return { kind: 'all' };
  if (raw.startsWith('unit:')) return { kind: 'unit', unitId: raw.slice(5) };
  if (raw.startsWith('module:')) return { kind: 'module', unitIds: moduleUnitIds ?? [] };
  return null;
}

/** Drop a single unit's records from every unit-keyed field. */
function clearUnit(p: Progress, unitId: string): Progress {
  const drop = <T,>(rec: Record<string, T>) => {
    const { [unitId]: _omit, ...rest } = rec;
    return rest;
  };
  const exam = (p as Progress & { exam?: Record<string, unknown> }).exam;
  return {
    ...p,
    completedUnits: p.completedUnits.filter((id) => id !== unitId),
    cloze: drop(p.cloze),
    synth: drop(p.synth),
    definitions: drop(p.definitions),
    mcq: drop(p.mcq),
    ...(exam ? { exam: drop(exam) } : {}),
    lastVisitedSection:
      p.lastVisitedSection && p.lastVisitedSection.endsWith(`/${unitId}`) ? undefined : p.lastVisitedSection,
  };
}

export function applyReset(p: Progress, scope: ResetScope): Progress {
  switch (scope.kind) {
    case 'all':
      return { ...emptyProgress(), settings: p.settings };

    case 'answers':
      return {
        ...p,
        cloze: {},
        synth: {},
        mcq: {},
        questionHistory: {},
        practiceAttempts: [],
        ...(( p as Progress & { exam?: unknown }).exam ? { exam: {} } : {}),
      };

    case 'unit':
      return clearUnit(p, scope.unitId);

    case 'module':
      return scope.unitIds.reduce((acc, id) => clearUnit(acc, id), p);
  }
}

// content/exam/blueprint.ts — the NMLS National Test (with UST) blueprint, in ONE place so a
// change is a one-line edit. ⚠️ Re-verify against the current NMLS National Test Content Outline
// PDF (nationwidelicensingsystem.org) before shipping — published splits disagree.
import type { BlueprintArea } from './types';

export const FULL_EXAM = { items: 125, minutes: 190, passFraction: 0.75 } as const;
export const HALF_EXAM = { items: 60, minutes: 90, passFraction: 0.75 } as const;

/** Area weights (fractions of a form). Order = display order. */
export const BLUEPRINT: { area: BlueprintArea; label: string; weight: number }[] = [
  { area: 'activities', label: 'Mortgage loan origination activities', weight: 0.27 },
  { area: 'federal', label: 'Federal mortgage-related laws', weight: 0.24 },
  { area: 'general', label: 'General mortgage knowledge', weight: 0.20 },
  { area: 'ethics', label: 'Ethics', weight: 0.18 },
  { area: 'ust', label: 'Uniform state content', weight: 0.11 },
];

/** Which blueprint area a chapter belongs to. */
export const AREA_BY_CHAPTER: Record<string, BlueprintArea> = {
  'federal-mortgage-laws': 'federal',
  'uniform-state-content': 'ust',
  'general-mortgage-knowledge': 'general',
  'mlo-activities': 'activities',
  'ethics': 'ethics',
  'front-matter': 'general',
};

/** Split a total item count across areas by weight (largest-remainder, sums exactly to total). */
export function allocateByBlueprint(total: number): { area: BlueprintArea; n: number }[] {
  const raw = BLUEPRINT.map((b) => ({ area: b.area, exact: b.weight * total }));
  const floored = raw.map((r) => ({ area: r.area, n: Math.floor(r.exact), frac: r.exact - Math.floor(r.exact) }));
  let remaining = total - floored.reduce((s, r) => s + r.n, 0);
  floored.sort((a, b) => b.frac - a.frac);
  for (let i = 0; remaining > 0; i = (i + 1) % floored.length, remaining--) floored[i].n++;
  return floored.map(({ area, n }) => ({ area, n }));
}

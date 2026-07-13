// lib/exam/sampler.ts — blueprint-weighted sampling for the practice mock exam (Slice E).
// Allocates the item count across the five NMLS areas by their exam weights, then within each
// area prefers items the learner has seen least (via questionHistory). Backfills if an area is
// short so the exam always reaches the target count.
import type { Question } from '@/lib/types';
import { AREA_BY_CHAPTER, allocateByBlueprint } from '@/content/exam/blueprint';

export function sampleBlueprint(
  all: Question[],
  count: number,
  history: Record<string, boolean> = {},
): Question[] {
  const byArea: Record<string, Question[]> = {};
  for (const q of all) {
    const area = AREA_BY_CHAPTER[q.chapter_id] ?? 'general';
    (byArea[area] ??= []).push(q);
  }

  const seen = (id: string) => (id in history ? 1 : 0);
  const shuffle = <T,>(xs: T[]) => xs.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map(([, x]) => x);

  const picked: Question[] = [];
  const chosen = new Set<string>();
  for (const { area, n } of allocateByBlueprint(count)) {
    const pool = shuffle(byArea[area] ?? []).sort((a, b) => seen(a.id) - seen(b.id));
    for (const q of pool.slice(0, n)) { picked.push(q); chosen.add(q.id); }
  }

  if (picked.length < count) {
    const rest = shuffle(all.filter((q) => !chosen.has(q.id))).sort((a, b) => seen(a.id) - seen(b.id));
    for (const q of rest.slice(0, count - picked.length)) picked.push(q);
  }

  return shuffle(picked);
}

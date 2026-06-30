/**
 * Guarantees that every item in a flashcard/question array has a globally unique `id`.
 *
 * Background: ids are generated as `<concept_id>-<n>` (flashcards) or
 * `<concept_id>-q<n>` (questions). The same concept can be authored under two
 * different sections, which produces identical ids (e.g. `redlining-1` under both
 * the `fraud` and `hmda` sections). SRS state and quiz answer-tracking key by id,
 * so collisions share progress and clash as React keys.
 *
 * Fix: for any id that occurs more than once, namespace every member of that group
 * with its `section_id` (-> `<section_id>-<concept_id>-<n>`). Ids that are already
 * unique are left untouched, so stable ids (and existing progress keyed to them)
 * are preserved. A final safety net appends a numeric suffix in the unlikely event
 * namespacing still leaves a collision.
 */
export function ensureUniqueIds<T extends { id: string; section_id: string }>(
  items: T[]
): { items: T[]; renamed: number } {
  // Count occurrences of each id.
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item.id, (counts.get(item.id) ?? 0) + 1);
  }

  // Namespace every member of a colliding id group with its section_id.
  let renamed = 0;
  for (const item of items) {
    if ((counts.get(item.id) ?? 0) > 1) {
      item.id = `${item.section_id}-${item.id}`;
      renamed++;
    }
  }

  // Safety net: guarantee global uniqueness even if namespacing left a collision.
  const seen = new Set<string>();
  for (const item of items) {
    const base = item.id;
    let id = base;
    let n = 2;
    while (seen.has(id)) {
      id = `${base}-${n}`;
      n++;
    }
    if (id !== item.id) renamed++;
    item.id = id;
    seen.add(id);
  }

  return { items, renamed };
}

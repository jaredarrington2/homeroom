import fs from 'fs';
import path from 'path';
import { ensureUniqueIds } from './ensure-unique-ids';

/**
 * One-time fixer: rewrites flashcards.json and questions.json so every id is
 * globally unique. Idempotent — running it again on already-unique data is a no-op.
 */

interface Item {
  id: string;
  section_id: string;
  [key: string]: unknown;
}

function countDuplicates(items: Item[]): number {
  const counts = new Map<string, number>();
  for (const item of items) counts.set(item.id, (counts.get(item.id) ?? 0) + 1);
  let dups = 0;
  counts.forEach((c) => {
    if (c > 1) dups++;
  });
  return dups;
}

function fixFile(file: string): void {
  const items = JSON.parse(fs.readFileSync(file, 'utf-8')) as Item[];
  const before = countDuplicates(items);
  const { renamed } = ensureUniqueIds(items);
  const after = countDuplicates(items);
  fs.writeFileSync(file, JSON.stringify(items, null, 2) + '\n');
  console.log(
    `${path.basename(file)}: ${items.length} items, ${before} duplicate id(s) -> ${renamed} renamed -> ${after} duplicate id(s) remaining`
  );
}

function main() {
  const generated = path.resolve(__dirname, '../content/generated');
  fixFile(path.join(generated, 'flashcards.json'));
  fixFile(path.join(generated, 'questions.json'));
}

main();

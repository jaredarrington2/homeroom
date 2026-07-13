// lib/exam/sectionBank.ts — server-side access to a unit's end-of-section exam items.
// Returns [] for units with no authored bank, so ExamCheck simply renders nothing there.
import { SECTION_BANK } from '@/content/exam/bank';
import type { ExamItem } from '@/content/exam/types';

export function sectionItems(unitId: string): ExamItem[] {
  return SECTION_BANK[unitId] ?? [];
}

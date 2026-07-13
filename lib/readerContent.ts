// lib/readerContent.ts — server-side access to the hand-authored reader sections (Modules 3/4/5),
// so Study can surface each unit's definitions (vocab) and review flashcards (cards) by section
// without duplicating content. One source, two surfaces.
import section1 from '@/content/sections/section-1';
import section3 from '@/content/sections/section-3';
import section4 from '@/content/sections/section-4';
import section5 from '@/content/sections/section-5';
import type { SectionContent, SectionUnit } from '@/lib/section';

/** chapterId -> its reader content. Only chapters with a hand-authored reader appear here. */
export const READER_SECTIONS: Record<string, SectionContent> = {
  'front-matter': section1,
  'federal-mortgage-laws': section3,
  'uniform-state-content': section4,
  'general-mortgage-knowledge': section5,
};

export function getReaderSection(chapterId: string): SectionContent | undefined {
  return READER_SECTIONS[chapterId];
}

export function getReaderUnit(chapterId: string, unitId: string): SectionUnit | undefined {
  return READER_SECTIONS[chapterId]?.units.find((u) => u.id === unitId);
}

/** A study item: one flip card, front -> back, on the shared SRS store. */
export interface StudyItem {
  id: string;
  front: string;
  back: string;
}

/** Vocab deck for a unit — its definitions. Ids are stable so SRS state persists. */
export function vocabItems(unit: SectionUnit): StudyItem[] {
  return (unit.definitions ?? []).map((d, i) => ({
    id: `v:${unit.id}:${i}`,
    front: d.term,
    back: d.def,
  }));
}

/** Study-card deck for a unit — its review flashcards (Q -> A). */
export function cardItems(unit: SectionUnit): StudyItem[] {
  return (unit.review?.flashcards ?? []).map((c, i) => ({
    id: `c:${unit.id}:${i}`,
    front: c.q,
    back: c.a,
  }));
}

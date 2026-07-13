// content/exam/types.ts — the hand-authored exam-item schema (Plan v4, Slice D).
// Section-check items live in content/exam/bank/{unitId}.ts, one file per reader unit, so
// authoring is per-section and diffs are legible. Practice keeps the legacy questions.json.
export type BlueprintArea = 'federal' | 'ust' | 'general' | 'activities' | 'ethics';

export interface ExamItem {
  /** `${unitId}-x{nn}` */
  id: string;
  /** reader unit id — the join key questions.json lacks */
  unitId: string;
  /** chapter id */
  moduleId: string;
  area: BlueprintArea;
  /** section = end-of-section check only; practice = /practice only. The wall. */
  pool: 'section' | 'practice';
  /** a situation, not a definition */
  stem: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  /** why the key is right (and, ideally, why the tempting wrong ones aren't) */
  explanation: string;
  difficulty: 'recall' | 'application' | 'analysis';
  /** provenance — where the tested fact is taught, e.g. "reader: RESPA · Section 8" */
  source: string;
}

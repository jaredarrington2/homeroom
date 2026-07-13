export type ChapterTree = {
  parts: Array<{
    id: string;
    title: string;
    chapters: Array<{
      id: string;
      title: string;
      /** Ebook module number (1,3,4,5,6,7 — ebook keeps a gap at Module 2). */
      moduleNumber: number;
      sections: Array<{
        id: string;
        title: string;
        pageRange: [number, number];
      }>;
    }>;
  }>;
};

export type Concept = {
  id: string;
  term: string;
  definition: string;
  why_it_exists: string;
  examples: Array<{ scenario: string; outcome: string }>;
  cross_refs: string[];
  check_questions: Array<{ question: string; answer: string; type: 'recall' | 'application' | 'distinction' }>;
};

export type SectionContent = {
  summary: string;
  concepts: Concept[];
  key_numbers: Array<{ value: string; what_it_means: string; memorize_as: string }>;
  common_confusions: Array<{ often_confused_with: string; the_distinction: string }>;
};

export type Flashcard = {
  id: string;
  concept_id: string;
  chapter_id: string;
  section_id: string;
  front: string;
  back: string;
  tags: string[];
};

export type Question = {
  id: string;
  concept_id: string;
  chapter_id: string;
  section_id: string;
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
  difficulty: 'recall' | 'application' | 'edge-case';
  topic_tags: string[];
};

export type FlashcardState = {
  ease: number;
  interval: number;
  due_at: number;
  last_reviewed: number;
};

export type PracticeAttempt = {
  id: string;
  mode: 'mock' | 'topic' | 'missed';
  started_at: number;
  completed_at: number;
  score: number;
  total: number;
  missed_question_ids: string[];
};

// --- Recall-gradient reader persistence (v3.6) ---

export type ClozeState = {
  value: string;
  correct: boolean;
  revealed: boolean;
};

export type SynthState = {
  grade: 'got_it' | 'close' | 'not_quite';
  response: string;
  feedback?: string;
  canonicalAnswer?: string;
};

export type DefinitionPile = 'learn' | 'know';

export type MCQState = {
  selectedIndex: number;
  correct: boolean;
};

// One end-of-section exam-check attempt (Slice D).
export type ExamAttempt = {
  at: number;
  correct: number;
  total: number;
  itemIds: string[];
  answers: number[];
};

export type Progress = {
  // Completed units/sections — unit ids like "respa", "ecoa" (and generic section ids).
  completedUnits: string[];
  // Reader recall, keyed by unitId -> itemId.
  cloze: Record<string, Record<string, ClozeState>>;
  synth: Record<string, Record<string, SynthState>>;
  definitions: Record<string, Record<string, DefinitionPile>>;
  mcq: Record<string, Record<string, MCQState>>;
  // Global flashcard SM-2 SRS, keyed by card id.
  flashcardSRS: Record<string, FlashcardState>;
  questionHistory: Record<string, boolean>;
  // End-of-section exam checks, keyed by unitId (Slice D).
  exam: Record<string, { attempts: ExamAttempt[] }>;
  lastVisitedSection?: string;
  updatedAt: number;
  // Retained from earlier versions — still consumed by /settings and /practice.
  lastSection: string | null;
  practiceAttempts: PracticeAttempt[];
  settings: {
    quizMode: 'inline' | 'gated' | 'practice-only';
  };
};

export const emptyProgress = (): Progress => ({
  completedUnits: [],
  cloze: {},
  synth: {},
  definitions: {},
  mcq: {},
  flashcardSRS: {},
  questionHistory: {},
  exam: {},
  updatedAt: Date.now(),
  lastSection: null,
  practiceAttempts: [],
  settings: { quizMode: 'inline' },
});

export type ManifestEntry = {
  id: string;
  filename: string;
  literal_description: string;
  primary_subject: string;
  primary_action: string;
  tags: {
    concept: string[];
    mood: string[];
    domain: string[];
    metaphor: string[];
    demographic: string[];
    visual: string[];
  };
  mortgage_roles: string[];
  use_cases: string[];
  avoid_for: string[];
  kind?: 'character' | 'property';
  mortgage_relevance?: string[];
};

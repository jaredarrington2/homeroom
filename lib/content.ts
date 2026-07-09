import fs from 'fs';
import path from 'path';
import type { ChapterTree, SectionContent, Flashcard, Question } from './types';
import type { SearchIndex } from './search';

const GENERATED = path.join(process.cwd(), 'content', 'generated');

export function getChapterTree(): ChapterTree {
  const file = path.join(GENERATED, 'chapters.json');
  if (!fs.existsSync(file)) return { parts: [] };
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function getSectionContent(chapterId: string, sectionId: string): SectionContent | null {
  const file = path.join(GENERATED, 'concepts', chapterId, `${sectionId}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function getFlashcards(): Flashcard[] {
  const file = path.join(GENERATED, 'flashcards.json');
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function getQuestions(): Question[] {
  const file = path.join(GENERATED, 'questions.json');
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

// The search index carries the server-only embedding vectors, so it is loaded once and
// kept warm in module scope across invocations (never sent to the client — see /api/search).
let SEARCH_INDEX: SearchIndex | null = null;

export function getSearchIndex(): SearchIndex {
  if (SEARCH_INDEX) return SEARCH_INDEX;
  const file = path.join(GENERATED, 'search-index.json');
  if (!fs.existsSync(file)) return (SEARCH_INDEX = []);
  return (SEARCH_INDEX = JSON.parse(fs.readFileSync(file, 'utf-8')));
}

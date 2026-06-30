import fs from 'fs';
import path from 'path';
import type { ChapterTree, SectionContent, Flashcard, Question } from './types';

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

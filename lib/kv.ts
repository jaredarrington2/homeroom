'use client';
import { v4 as uuidv4 } from 'uuid';
import { emptyProgress, type Progress } from './types';

const KEY = 'homeroom_user_id';

export function getUserId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(KEY, id);
  }
  return id;
}

export function setUserId(id: string) {
  localStorage.setItem(KEY, id);
}

export const defaultProgress: Progress = emptyProgress();

export async function loadProgress(): Promise<Progress> {
  const userId = getUserId();
  if (!userId) return emptyProgress();
  const res = await fetch('/api/progress', {
    headers: { 'X-User-Id': userId },
  });
  if (!res.ok) return emptyProgress();
  return res.json();
}

export async function saveProgress(progress: Progress): Promise<void> {
  const userId = getUserId();
  if (!userId) return;
  await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-User-Id': userId },
    body: JSON.stringify(progress),
  });
}

// Clear part or all of the stored progress. `scope` is the wire form the reset route parses:
// "answers" | "unit:<id>" | "module:<chapterId>" | "all". Returns the server's new blob.
export async function resetProgress(scope: string): Promise<Progress | null> {
  const userId = getUserId();
  if (!userId) return null;
  const res = await fetch('/api/progress/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-User-Id': userId },
    body: JSON.stringify({ scope }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.progress ?? null;
}

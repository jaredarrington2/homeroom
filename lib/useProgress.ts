'use client';
// lib/useProgress.ts — single source of truth for reader + global progress.
// Loads once from KV, then debounce-saves the whole blob on every change.
// One instance is shared app-wide via ProgressContext.
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  emptyProgress,
  type Progress,
  type ClozeState,
  type SynthState,
  type DefinitionPile,
  type MCQState,
} from './types';
import type { FlashcardState } from './types';
import { loadProgress, saveProgress } from './kv';

const DEBOUNCE_MS = 800;

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(emptyProgress());
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef<Progress>(emptyProgress());

  useEffect(() => {
    loadProgress().then((p) => {
      // Merge over a fresh empty blob so older/partial records gain any new fields.
      const initial = { ...emptyProgress(), ...(p ?? {}) };
      setProgress(initial);
      pending.current = initial;
      setLoaded(true);
    });
  }, []);

  const scheduleSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveProgress(pending.current).catch(console.error);
    }, DEBOUNCE_MS);
  }, []);

  const update = useCallback((updater: (prev: Progress) => Progress) => {
    setProgress((prev) => {
      const next = { ...updater(prev), updatedAt: Date.now() };
      pending.current = next;
      scheduleSave();
      return next;
    });
  }, [scheduleSave]);

  const saveCloze = useCallback((unitId: string, clozeId: string, state: ClozeState) =>
    update((p) => ({ ...p, cloze: { ...p.cloze, [unitId]: { ...(p.cloze[unitId] ?? {}), [clozeId]: state } } }))
  , [update]);

  const getCloze = useCallback((unitId: string, clozeId: string) =>
    progress.cloze[unitId]?.[clozeId]
  , [progress]);

  const saveSynth = useCallback((unitId: string, synthId: string, state: SynthState) =>
    update((p) => ({ ...p, synth: { ...p.synth, [unitId]: { ...(p.synth[unitId] ?? {}), [synthId]: state } } }))
  , [update]);

  const getSynth = useCallback((unitId: string, synthId: string) =>
    progress.synth[unitId]?.[synthId]
  , [progress]);

  const clearSynth = useCallback((unitId: string, synthId: string) =>
    update((p) => {
      const unit = { ...(p.synth[unitId] ?? {}) };
      delete unit[synthId];
      return { ...p, synth: { ...p.synth, [unitId]: unit } };
    })
  , [update]);

  const saveDefinitionPile = useCallback((unitId: string, term: string, pile: DefinitionPile) =>
    update((p) => ({ ...p, definitions: { ...p.definitions, [unitId]: { ...(p.definitions[unitId] ?? {}), [term]: pile } } }))
  , [update]);

  const getDefinitionPiles = useCallback((unitId: string) =>
    progress.definitions[unitId] ?? {}
  , [progress]);

  const saveMCQ = useCallback((unitId: string, mcqId: string, state: MCQState) =>
    update((p) => ({ ...p, mcq: { ...p.mcq, [unitId]: { ...(p.mcq[unitId] ?? {}), [mcqId]: state } } }))
  , [update]);

  const getMCQ = useCallback((unitId: string, mcqId: string) =>
    progress.mcq[unitId]?.[mcqId]
  , [progress]);

  const saveFlashcardSRS = useCallback((cardId: string, state: FlashcardState) =>
    update((p) => ({ ...p, flashcardSRS: { ...p.flashcardSRS, [cardId]: state } }))
  , [update]);

  const getFlashcardSRS = useCallback((cardId: string) =>
    progress.flashcardSRS[cardId]
  , [progress]);

  const markUnitComplete = useCallback((unitId: string) =>
    update((p) => ({
      ...p,
      completedUnits: p.completedUnits.includes(unitId) ? p.completedUnits : [...p.completedUnits, unitId],
    }))
  , [update]);

  const isUnitComplete = useCallback((unitId: string) =>
    progress.completedUnits.includes(unitId)
  , [progress]);

  // Records where the reader is, as "chapterId/sectionId", for the Learn-home Continue card.
  // No-op if unchanged so scrolling through a unit doesn't thrash the debounced save.
  const setLastVisited = useCallback((chapterId: string, sectionId: string) => {
    const value = `${chapterId}/${sectionId}`;
    update((p) => (p.lastVisitedSection === value ? p : { ...p, lastVisitedSection: value }));
  }, [update]);

  return {
    progress, loaded,
    saveCloze, getCloze,
    saveSynth, getSynth, clearSynth,
    saveDefinitionPile, getDefinitionPiles,
    saveMCQ, getMCQ,
    saveFlashcardSRS, getFlashcardSRS,
    markUnitComplete, isUnitComplete,
    setLastVisited,
  };
}

'use client';
// lib/ProgressContext.tsx — shares one useProgress() instance across the whole app
// (reader recall + global flashcard SRS) so every consumer reads/writes the same blob.
import { createContext, useContext, ReactNode } from 'react';
import { useProgress } from './useProgress';

type ProgressCtx = ReturnType<typeof useProgress>;
const Ctx = createContext<ProgressCtx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  return <Ctx.Provider value={useProgress()}>{children}</Ctx.Provider>;
}

export function useProgressContext(): ProgressCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProgressContext used outside ProgressProvider');
  return ctx;
}

'use client';
// components/AppShell.tsx — app-wide ProgressProvider (so the reader AND the flashcard
// page share one progress instance) plus the once-per-session login pop quiz.
import { ProgressProvider, useProgressContext } from '@/lib/ProgressContext';
import { LoginQuiz } from './LoginQuiz';
import ListenPlayer from './ListenPlayer';
import { ReactNode } from 'react';

function AppShellInner({ children }: { children: ReactNode }) {
  const { progress, loaded } = useProgressContext();
  return (
    <>
      {children}
      {loaded && <LoginQuiz completedUnits={progress.completedUnits} />}
      <ListenPlayer />
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ProgressProvider>
      <AppShellInner>{children}</AppShellInner>
    </ProgressProvider>
  );
}

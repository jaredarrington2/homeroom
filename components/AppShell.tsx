'use client';
// components/AppShell.tsx — app-wide ProgressProvider (so the reader AND the flashcard
// page share one progress instance) plus the once-per-session login pop quiz.
import { ProgressProvider, useProgressContext } from '@/lib/ProgressContext';
import { ListenProvider } from '@/lib/ListenContext';
import { LoginQuiz } from './LoginQuiz';
import ListenBar from './ListenBar';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

function AppShellInner({ children }: { children: ReactNode }) {
  const { progress, loaded } = useProgressContext();
  // Never pop the quiz over the sign-in page — a signed-out visitor still loads the
  // device's anonymous blob, so without this the quiz lands on top of the login form.
  // /admin is excluded for the same reason: it isn't a study surface.
  const path = usePathname() || '';
  // The landing page at / is the same case: a marketing surface, not a study one.
  const noQuiz = path === '/' || path.startsWith('/login') || path.startsWith('/admin');
  return (
    <>
      {children}
      {loaded && !noQuiz && <LoginQuiz completedUnits={progress.completedUnits} />}
      <ListenBar />
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ProgressProvider>
      <ListenProvider>
        <AppShellInner>{children}</AppShellInner>
      </ListenProvider>
    </ProgressProvider>
  );
}

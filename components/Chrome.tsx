'use client';
// components/Chrome.tsx — the app chrome (reading bar, top bar, canvas gutters) around every
// route except the landing page. / brings its own top bar and runs its bands full-bleed, so it
// renders bare; keeping that decision here leaves the root layout a plain server component.
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import TopBar from './TopBar';
import ReadingProgress from './ReadingProgress';

export default function Chrome({ children }: { children: ReactNode }) {
  const path = usePathname() || '';
  if (path === '/') return <>{children}</>;

  return (
    <>
      <ReadingProgress />
      <TopBar />
      <main className="max-w-canvas mx-auto px-4 py-8">{children}</main>
    </>
  );
}

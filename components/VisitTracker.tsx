'use client';
// components/VisitTracker.tsx — a zero-height sentinel at a unit's section head.
// When the head scrolls into the top band of the viewport, it records the unit as the
// reader's last-visited section (for Learn home's Continue card). Debounced by the
// progress store; the setter no-ops when the value is unchanged.
import { useEffect, useRef } from 'react';
import { useProgressContext } from '@/lib/ProgressContext';

export default function VisitTracker({ chapterId, sectionId }: { chapterId: string; sectionId: string }) {
  const { setLastVisited } = useProgressContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) setLastVisited(chapterId, sectionId); },
      // Fire when the head sits in the upper third — i.e. it's the section being read.
      { rootMargin: '0px 0px -66% 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [chapterId, sectionId, setLastVisited]);

  // A measurable 1px block — a zero-area inline element never reports as intersecting.
  return <div ref={ref} aria-hidden style={{ height: 1, width: '100%' }} />;
}

'use client';
// components/MarkComplete.tsx — marks a section/unit complete via the shared progress
// context (debounced save). Restores its completed state on load without a network call.
import { useProgressContext } from '@/lib/ProgressContext';

export default function MarkComplete({ sectionId }: { sectionId: string }) {
  const { markUnitComplete, isUnitComplete } = useProgressContext();
  const complete = isUnitComplete(sectionId);

  return (
    <button
      onClick={() => { if (!complete) markUnitComplete(sectionId); }}
      disabled={complete}
      className={`text-sm font-medium px-4 py-2 border rounded transition-colors ${
        complete
          ? 'text-royal border-royal bg-royal-faint cursor-default'
          : 'text-ink-muted border-hairline hover:text-ink hover:border-ink-muted'
      }`}
    >
      {complete ? '✓ Complete' : 'Mark complete'}
    </button>
  );
}

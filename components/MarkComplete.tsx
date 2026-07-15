'use client';
// components/MarkComplete.tsx — marks a section/unit complete via the shared progress
// context (debounced save). Restores its completed state on load without a network call.
// Wordless: a check-circle that fills royal when complete (aria-label + tooltip carry the meaning).
import { useProgressContext } from '@/lib/ProgressContext';

export default function MarkComplete({ sectionId }: { sectionId: string }) {
  const { markUnitComplete, isUnitComplete } = useProgressContext();
  const complete = isUnitComplete(sectionId);

  return (
    <button
      onClick={() => { if (!complete) markUnitComplete(sectionId); }}
      disabled={complete}
      aria-label={complete ? 'Section complete' : 'Mark section complete'}
      title={complete ? 'Complete' : 'Mark complete'}
      className={`inline-flex items-center justify-center p-1.5 rounded-full transition-colors ${
        complete ? 'text-royal cursor-default' : 'text-ink-faint hover:text-royal'
      }`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill={complete ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.5 12.4l3 3 6-6.6" fill="none" stroke={complete ? '#FDFCF8' : 'currentColor'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

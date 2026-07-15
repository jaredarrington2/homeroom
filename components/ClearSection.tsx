'use client';
// components/ClearSection.tsx — the fast path for "I answered this wrong while testing."
// Clears just this unit's answers/completion via the shared progress context. Two-tap confirm
// so a stray click can't wipe a section. Wordless: a reset arrow that turns red once armed;
// aria-label + tooltip carry the meaning and the confirm state.
import { useState } from 'react';
import { useProgressContext } from '@/lib/ProgressContext';

export default function ClearSection({ unitId }: { unitId: string }) {
  const { resetScope } = useProgressContext();
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <button
      onClick={async () => {
        if (!confirm) { setConfirm(true); return; }
        setBusy(true);
        await resetScope(`unit:${unitId}`);
        setBusy(false);
        setConfirm(false);
      }}
      onBlur={() => setConfirm(false)}
      disabled={busy}
      aria-label={confirm ? 'Tap again to clear this section' : 'Clear this section'}
      title={confirm ? 'Tap again to clear' : 'Clear this section'}
      className={`inline-flex items-center justify-center p-1.5 rounded-full transition-colors disabled:opacity-50 ${
        confirm ? 'text-loose-margin' : 'text-ink-faint hover:text-loose-margin'
      }`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polyline points="2.5 5 2.5 10.5 8 10.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.6 15a8 8 0 1 0 1.9-8.3L2.5 10.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

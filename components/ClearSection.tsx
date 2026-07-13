'use client';
// components/ClearSection.tsx — the fast path for "I answered this wrong while testing."
// Clears just this unit's answers/completion via the shared progress context. Two-tap confirm
// so a stray click can't wipe a section. Understated to sit beside Mark complete.
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
      className="text-sm font-medium px-4 py-2 border rounded transition-colors text-ink-faint border-hairline hover:text-loose-margin hover:border-loose-margin disabled:opacity-50"
    >
      {confirm ? 'Confirm — clear' : 'Clear this section'}
    </button>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Eyebrow from '@/components/Eyebrow';
import Button from '@/components/Button';
import { getUserId, setUserId, loadProgress, saveProgress, resetProgress } from '@/lib/kv';
import type { Progress } from '@/lib/types';

export default function SettingsPage() {
  const [userId, setUserIdState] = useState('');
  const [progress, setProgress] = useState<Progress | null>(null);
  const [syncInput, setSyncInput] = useState('');
  const [confirmScope, setConfirmScope] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setUserIdState(getUserId());
    loadProgress().then(setProgress);
  }, []);

  function handleSwitchId() {
    const trimmed = syncInput.trim();
    if (!trimmed) return;
    setUserId(trimmed);
    setUserIdState(trimmed);
    setSyncInput('');
    loadProgress().then(setProgress);
  }

  async function handleReset(scope: string) {
    if (confirmScope !== scope) { setConfirmScope(scope); return; }
    setBusy(true);
    const next = await resetProgress(scope);
    if (next) setProgress(next);
    setBusy(false);
    setConfirmScope(null);
  }

  return (
    <div className="max-w-reading mx-auto">
      <Eyebrow>Settings</Eyebrow>
      <h1 className="font-display text-3xl font-semibold tracking-display mt-2 mb-8">Settings</h1>

      <section className="mb-8 pb-8 border-b border-hairline">
        <h2 className="font-display text-lg font-medium text-ink mb-1">Quiz mode</h2>
        <p className="text-sm text-ink-muted mb-4">Controls how check questions appear while reading.</p>
        <div className="flex flex-col gap-2">
          {(['inline', 'gated', 'practice-only'] as const).map(mode => (
            <button
              key={mode}
              onClick={async () => {
                if (!progress) return;
                const updated = { ...progress, settings: { ...progress.settings, quizMode: mode } };
                setProgress(updated);
                await saveProgress(updated);
              }}
              className={`text-left border px-4 py-2 text-sm transition-colors ${
                progress?.settings.quizMode === mode
                  ? 'border-royal bg-royal-faint text-royal'
                  : 'border-hairline text-ink hover:border-royal'
              }`}
            >
              {mode === 'inline' && 'Inline — questions appear in reading flow'}
              {mode === 'gated' && 'Gated — must answer to continue'}
              {mode === 'practice-only' && 'Practice only — no interruptions while reading'}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8 pb-8 border-b border-hairline">
        <h2 className="font-display text-lg font-medium text-ink mb-1">Sync code</h2>
        <p className="text-sm text-ink-muted mb-3">
          Use this code to access your progress on another device. Anyone with this code can read your progress.
        </p>
        <code className="block font-mono text-sm bg-hairline px-3 py-2 text-ink mb-4 break-all">{userId}</code>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste a sync code"
            value={syncInput}
            onChange={e => setSyncInput(e.target.value)}
            className="border border-hairline px-3 py-2 text-sm font-mono flex-1 focus:outline-none focus:border-royal"
          />
          <Button variant="ghost" onClick={handleSwitchId}>Switch</Button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-medium text-ink mb-1">Clear progress</h2>
        <p className="text-sm text-ink-muted mb-4">Pick what to clear. This can&apos;t be undone.</p>
        <div className="flex flex-col gap-3">
          <div>
            <Button variant="ghost" onClick={() => handleReset('answers')} disabled={busy}>
              {confirmScope === 'answers' ? 'Confirm — clear my answers' : 'Clear my answers'}
            </Button>
            <p className="text-xs text-ink-faint mt-1.5">
              Wipes the cloze, short-answer, quiz, and exam answers you&apos;ve typed. Keeps which sections
              you&apos;ve read and your flashcard schedule.
            </p>
          </div>
          <div>
            <Button variant="danger" onClick={() => handleReset('all')} disabled={busy}>
              {confirmScope === 'all' ? 'Confirm — reset everything' : 'Reset everything'}
            </Button>
            <p className="text-xs text-ink-faint mt-1.5">
              Clears the whole blob — answers, completed sections, flashcard history, and exam scores.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

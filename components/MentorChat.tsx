'use client';
// components/MentorChat.tsx — the deal-desk mentor: an in-desk chat with a pricing
// coach (POST /api/mentor) available while the learner works the pricing + lock
// simulation. Collapsed to a single trigger until opened; in-session state only.
// Microcopy is labels, not briefings. The desk snapshot rides with each question so
// the mentor sees what the learner sees.
import { useEffect, useRef, useState } from 'react';
import { getUserId } from '@/lib/kv';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function MentorChat({ desk }: { desk: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const q = input.trim();
    if (!q || busy) return;
    setInput('');
    setFailed(false);
    const next: Msg[] = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-User-Id': getUserId() },
        body: JSON.stringify({ messages: next.slice(-12), desk }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { reply?: string };
      if (!data.reply) throw new Error('empty');
      setMessages(m => [...m, { role: 'assistant', content: data.reply! }]);
    } catch {
      setFailed(true);
      setMessages(m => m.slice(0, -1));
      setInput(q);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={'dd-mentor' + (open ? ' open' : '')}>
      <button
        type="button"
        className="dd-mentor-trig"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" width="14" height="14">
          <path d="M3 4.5h14v8.5H8.5L5 16v-3H3z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        Mentor
      </button>
      {open && (
        <div className="dd-mentor-panel">
          <div className="dd-mentor-log" ref={logRef} aria-live="polite">
            {messages.length === 0 && !busy && (
              <p className="dd-mentor-hint">Ask about this file — the stack, the ladder, the lock.</p>
            )}
            {messages.map((m, i) => (
              <p key={i} className={'dd-mentor-msg ' + m.role}>{m.content}</p>
            ))}
            {busy && <p className="dd-mentor-msg assistant dd-mentor-busy">·&nbsp;·&nbsp;·</p>}
            {failed && <p className="dd-mentor-err">The mentor is unreachable — try again.</p>}
          </div>
          <div className="dd-mentor-row">
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={1500}
              placeholder="Ask the desk"
              aria-label="Ask the desk mentor"
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button type="button" className="dd-mentor-send" disabled={busy || !input.trim()} onClick={send}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

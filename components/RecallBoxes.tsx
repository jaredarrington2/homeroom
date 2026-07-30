'use client';
// components/RecallBoxes.tsx — free-recall drill: six blank boxes the learner fills
// in their own words, in any order. Each entry is resolved against a phrase/keyword
// matcher rather than an exact string, so "her salary", "income", and "what she
// earns" all land on the same item; a match locks the canonical label and reveals
// how Maya's file answers it. Duplicates are rejected by name.
//
// Once all six are down, the three-general-business-day Loan Estimate clock appears,
// drawn across a weekend so the business-day count is visible as calendar days.
//
// Skeuomorphic intake sheet, scoped .rb-* (the Worksheet/DisclosureVisual precedent).
// In-session state only — same as Worksheet and FormWalkthrough.
import { useRef, useState } from 'react';
import { CLOCK, ITEMS, SHEET, resolve, type DrillItem } from '@/content/drills/sixItems';

const BY_KEY: Record<string, DrillItem> = Object.fromEntries(ITEMS.map(i => [i.key, i]));

export type RecallDrillKind = 'six-items';

export default function RecallBoxes({ kind }: { kind: RecallDrillKind }) {
  const total = ITEMS.length;
  const [slots, setSlots] = useState<(string | null)[]>(() => Array(total).fill(null));
  const [vals, setVals] = useState<string[]>(() => Array(total).fill(''));
  const [wrong, setWrong] = useState<number | null>(null);
  const [dupe, setDupe] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  if (kind !== 'six-items') return null;

  const done = slots.filter(Boolean).length;
  const complete = done === total;

  const check = (i: number, quiet: boolean) => {
    if (slots[i]) return;
    // Read the live input rather than the `vals` snapshot: a value change and an
    // Enter that land in the same React batch would otherwise check stale state.
    const raw = (inputs.current[i]?.value ?? vals[i]).trim();
    if (!raw) return;

    const key = resolve(raw);
    if (!key) {
      if (!quiet) { setWrong(i); setDupe(null); }
      return;
    }
    if (slots.includes(key)) {
      setWrong(i);
      setDupe(i);
      return;
    }

    const next = [...slots];
    next[i] = key;
    setSlots(next);
    setWrong(null);
    setDupe(null);

    if (!quiet && next.filter(Boolean).length < total) {
      const openIdx = next.findIndex(s => s === null);
      if (openIdx >= 0) inputs.current[openIdx]?.focus();
    }
  };

  return (
    <div className="rb" role="group" aria-label="Name the six items that make an application">
      <div className="rb-head">
        <span className="rb-mark">{SHEET.lender}</span>
        <span className="rb-meta">{SHEET.meta}</span>
      </div>

      <div className="rb-boxes">
        {slots.map((key, i) => {
          const item = key ? BY_KEY[key] : null;
          const cls =
            'rb-box' +
            (item ? ' locked' : '') +
            (wrong === i ? ' wrong' : '') +
            (focused === i && !item ? ' focus' : '');
          return (
            <div
              key={i}
              className={cls}
              onClick={() => { if (!item) inputs.current[i]?.focus(); }}
              onAnimationEnd={() => { if (wrong === i) setWrong(null); }}
            >
              {item ? (
                <div className="rb-answer">{item.canon}</div>
              ) : (
                <>
                  <input
                    ref={el => { inputs.current[i] = el; }}
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label={`Item ${i + 1} of ${total}`}
                    value={vals[i]}
                    onChange={e => {
                      const v = [...vals];
                      v[i] = e.target.value;
                      setVals(v);
                      if (wrong === i) { setWrong(null); setDupe(null); }
                    }}
                    onFocus={() => setFocused(i)}
                    onBlur={() => { setFocused(null); check(i, true); }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') { e.preventDefault(); check(i, false); }
                    }}
                  />
                  <div className="rb-writeline" />
                </>
              )}
              <div className={'rb-sample' + (dupe === i ? ' warn' : '')}>
                {dupe === i ? 'already on the sheet' : item ? item.sample : ''}
              </div>
            </div>
          );
        })}
      </div>

      <div className={'rb-foot' + (complete ? ' done' : '')}>
        <span className="rb-count" aria-live="polite">
          {complete ? `${total} of ${total} · complete` : `${done} of ${total}`}
        </span>
        <span className="rb-scrawl" aria-hidden="true">any order&nbsp;↗</span>
      </div>

      {complete && (
        <div className="rb-clock">
          <div className="rb-clock-h">Loan Estimate due</div>
          <div className="rb-strip">
            {CLOCK.map((d, i) => (
              <div key={i} className={'rb-day ' + d.kind}>
                <span className="rb-day-lab">{d.label}</span>
                <span className="rb-day-n">
                  {d.kind === 'applied' ? 'applied' : d.kind === 'closed' ? 'closed' : `day ${d.n}`}
                </span>
              </div>
            ))}
          </div>
          <p className="rb-clock-note">
            Three <b>general business days</b> — days the lender is open. The weekend doesn&apos;t
            count, so an application taken Thursday has its Loan Estimate due Tuesday: three
            business days, five days on the calendar.
          </p>
        </div>
      )}
    </div>
  );
}

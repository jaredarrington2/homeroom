'use client';
// components/Calculator.tsx — the calculator dock (calculator-spec.md). A four-function calculator
// with a tape, docked beside the reader so it never covers the thing you're computing against.
// Self-contained like SearchPanel/ContentsDrawer: renders its own TopBar trigger + the dock and
// owns the "=" hotkey. Non-modal — no role="dialog", no focus trap, no scroll lock (§8).
//
// The feature is the bind-and-insert loop (§5): "=" from a focused .ws-amt/.cloze field docks
// bound to it; ↵ evaluates; a second ↵ on a settled result writes the value back through React's
// own setter and closes. The evaluator lives in lib/calc.ts (pure, unit-tested).
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { evaluate, tryEvaluate, fmt, raw } from '@/lib/calc';

/** Hand-drawn calculator glyph — the same wobbly-line register as SearchPanel's IconMag (§8). */
const IconCalc = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5.4 2.6c3-.2 6-.2 9 .1.5 1.9.6 8.9.1 13.7-.2 1-6.4 1-9.1.7-.7-3.9-.7-10.4-.1-14.5Z" />
    <path d="M6.7 6.1c2-.2 4.6-.2 6.7 0" />
    <path d="M7 9.6h.02M10 9.6h.02M13 9.6h.02M7 12.6h.02M10 12.6h.02M13 12.7c.4 1 .5 2 .3 2.8" />
  </svg>
);
const IconClose = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
);
const IconCollapse = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <path d="M3 7.5c2.7-.3 5.4-.3 8 0" />
  </svg>
);

type Placement = { mode: 'margin' | 'sheet'; left: number; width: number };
type TapeLine = { expr: string; value: number };

/** The bound field is a fill-in inside a worksheet amount cell or a cloze blank (§5). */
function boundLabelFor(el: HTMLElement): string {
  const aria = el.getAttribute('aria-label');
  if (aria && aria !== 'fill in the blank') return aria;
  const row = el.closest('.ws-row');
  const lab = row?.querySelector('.ws-lab');
  const txt = lab?.textContent?.trim();
  return txt || 'answer';
}
function isBindable(el: Element | null): el is HTMLInputElement {
  return (
    !!el &&
    (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') &&
    !!(el.closest('.ws-amt') || el.closest('.cloze'))
  );
}

const COARSE = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export default function Calculator() {
  const pathname = usePathname() || '';
  const onGate = pathname.startsWith('/learn') || pathname.startsWith('/practice');

  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [expr, setExpr] = useState('');
  const [tape, setTape] = useState<TapeLine[]>([]);
  const [memory, setMemory] = useState(0);
  const [place, setPlace] = useState<Placement>({ mode: 'sheet', left: 0, width: 0 });
  const [boundLabel, setBoundLabel] = useState<string | null>(null);
  const [coarse, setCoarse] = useState(false);

  const entryRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const boundRef = useRef<HTMLInputElement | null>(null); // the field "=" was pressed from
  const settledRef = useRef(false); // showing an evaluated result; a 2nd ↵ inserts
  const lastRef = useRef<number | null>(null); // the settled value
  const tapeRef = useRef<HTMLDivElement>(null);

  // Placement: a fixed panel in the right gutter when there's room + a fine pointer, else a bottom
  // sheet (§3). Gutter measured like FormWalkthrough.measureCaption (innerWidth − column.right).
  const measure = useCallback(() => {
    const col =
      (document.querySelector('.section-reader') as HTMLElement | null) ||
      (document.querySelector('main') as HTMLElement | null);
    const rect = col?.getBoundingClientRect();
    const gutter = rect ? window.innerWidth - rect.right : 0;
    if (!COARSE() && gutter >= 300 && rect) {
      setPlace({ mode: 'margin', left: rect.right + 24, width: Math.min(288, gutter - 40) });
    } else {
      setPlace({ mode: 'sheet', left: 0, width: 0 });
    }
  }, []);

  useEffect(() => {
    setCoarse(COARSE());
  }, []);

  useEffect(() => {
    if (!open) return;
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [open, measure]);

  // Keep the tape scrolled to the newest line.
  useEffect(() => {
    if (tapeRef.current) tapeRef.current.scrollTop = tapeRef.current.scrollHeight;
  }, [tape]);

  const focusEntry = useCallback(() => {
    requestAnimationFrame(() => entryRef.current?.focus());
  }, []);

  const openCalc = useCallback(
    (from: HTMLElement | null) => {
      setOpen(true);
      setCollapsed(false);
      if (isBindable(from)) {
        boundRef.current = from;
        setBoundLabel(boundLabelFor(from));
        // Seed from a selection that parses as a number (§5.2).
        const sel = window.getSelection?.()?.toString() ?? '';
        if (sel && tryEvaluate(sel) !== null) {
          setExpr(sel.replace(/[$,\s]/g, ''));
          settledRef.current = false;
        }
      } else {
        boundRef.current = null;
        setBoundLabel(null);
      }
      focusEntry();
    },
    [focusEntry]
  );

  const close = useCallback(
    (focus: 'bound' | 'trigger' | 'none') => {
      setOpen(false);
      setCollapsed(false);
      setExpr('');
      setTape([]);
      setMemory(0);
      settledRef.current = false;
      lastRef.current = null;
      const field = boundRef.current;
      boundRef.current = null;
      setBoundLabel(null);
      if (focus === 'bound') (field ?? triggerRef.current)?.focus();
      else if (focus === 'trigger') triggerRef.current?.focus();
    },
    []
  );

  // Write the settled result back into the bound field through React's own value setter — a bare
  // el.value is invisible to a controlled input, which Worksheet and ClozeProse both use (§5).
  const insert = useCallback(() => {
    const field = boundRef.current;
    if (!field || lastRef.current === null) return;
    const value = raw(lastRef.current);
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    setter?.call(field, value);
    field.dispatchEvent(new Event('input', { bubbles: true }));
    close('none'); // the field holds focus (§10) — don't steal it back to the trigger
    field.focus();
    // Fire the field's own check on the next tick, so a controlled input (Worksheet) has flushed
    // the onChange state before Enter reads it; a vanilla cloze input reads .value either way.
    setTimeout(() => field.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })), 0);
  }, [close]);

  // ↵ / "=" — evaluate; a second one on a settled result inserts into the bound field (§5.3).
  const doEnter = useCallback(() => {
    if (settledRef.current) {
      if (boundRef.current) insert();
      return;
    }
    const v = tryEvaluate(expr);
    if (v === null) return; // malformed → show nothing
    setTape((t) => [...t, { expr: expr.trim(), value: v }].slice(-40));
    setExpr(fmt(v));
    settledRef.current = true;
    lastRef.current = v;
  }, [expr, insert]);

  // A keypad press. Value-starters (digit/./`(`) begin a fresh entry after a settled result;
  // operators continue from it. Physical typing on a fine pointer flows through the input's onChange.
  const press = useCallback((ch: string, valueStart: boolean) => {
    setExpr((prev) => {
      if (settledRef.current) {
        settledRef.current = false;
        return (valueStart ? '' : prev) + ch;
      }
      return prev + ch;
    });
    focusEntry();
  }, [focusEntry]);

  const backspace = useCallback(() => {
    settledRef.current = false;
    setExpr((p) => p.slice(0, -1));
    focusEntry();
  }, [focusEntry]);

  const clearEntry = useCallback(() => {
    settledRef.current = false;
    setExpr('');
    focusEntry();
  }, [focusEntry]);

  const memRecall = useCallback(() => press(raw(memory), true), [press, memory]);
  const memClear = useCallback(() => setMemory(0), []);
  const memPlus = useCallback(() => {
    const v = tryEvaluate(expr);
    if (v !== null) setMemory((m) => m + v);
  }, [expr]);

  // Tap a tape line to push its value back into the entry — the exam's scratchpad (§7).
  const pushLine = useCallback((v: number) => press(raw(v), true), [press]);

  // "=" hotkey (§2). Fires from inside a worksheet field on purpose; "=" is never a legit keystroke
  // in a cloze answer or amount line, so nothing is swallowed. Unshifted "=" only.
  useEffect(() => {
    if (!onGate) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '=' && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const el = document.activeElement as HTMLElement | null;
        if (open && !collapsed && el === entryRef.current) return; // "=" inside the calc → evaluate
        e.preventDefault();
        openCalc(el);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onGate, open, collapsed, openCalc]);

  const onEntryKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      doEnter();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close('bound'); // Escape returns focus to the bound field (§2)
    }
  };

  if (!onGate) return null;

  const preview = settledRef.current ? null : tryEvaluate(expr);
  const previewText = preview === null ? '' : fmt(preview);

  // 4-column keypad (§7). Each: [glyph, insert char | action, aria, value-start?].
  type Key = { g: string; a: string; run: () => void };
  const K = (g: string, aria: string, run: () => void): Key => ({ g, a: aria, run });
  const keys: Key[] = [
    K('C', 'clear', clearEntry), K('MC', 'memory clear', memClear), K('MR', 'memory recall', memRecall), K('M+', 'memory add', memPlus),
    K('7', '7', () => press('7', true)), K('8', '8', () => press('8', true)), K('9', '9', () => press('9', true)), K('÷', 'divide', () => press('/', false)),
    K('4', '4', () => press('4', true)), K('5', '5', () => press('5', true)), K('6', '6', () => press('6', true)), K('×', 'multiply', () => press('*', false)),
    K('1', '1', () => press('1', true)), K('2', '2', () => press('2', true)), K('3', '3', () => press('3', true)), K('−', 'minus', () => press('-', false)),
    K('0', '0', () => press('0', true)), K('.', 'decimal point', () => press('.', true)), K('%', 'percent', () => press('%', false)), K('+', 'plus', () => press('+', false)),
    K('(', 'open parenthesis', () => press('(', true)), K(')', 'close parenthesis', () => press(')', false)), K('⌫', 'backspace', backspace), K('=', 'equals', doEnter),
  ];
  const isFn = (g: string) => g === 'C' || g === 'MC' || g === 'MR' || g === 'M+';
  const isOp = (g: string) => g === '÷' || g === '×' || g === '−' || g === '+' || g === '=';

  const dockStyle =
    place.mode === 'margin'
      ? { left: place.left, width: place.width }
      : undefined;

  // Collapsed → a small wordless tab that persists while you scroll, keeping the tape + bound field.
  if (open && collapsed) {
    return (
      <>
        <button ref={triggerRef} className="hcalc-trigger" onClick={() => openCalc(null)} aria-label="Calculator" title="Calculator">
          <IconCalc />
        </button>
        <button
          className={'hcalc-tab hcalc-tab-' + place.mode}
          style={place.mode === 'margin' ? { left: place.left } : undefined}
          onClick={() => { setCollapsed(false); focusEntry(); }}
          aria-label="Expand calculator"
          title="Calculator"
        >
          <IconCalc size={18} />
        </button>
      </>
    );
  }

  return (
    <>
      <button ref={triggerRef} className="hcalc-trigger" onClick={() => openCalc(null)} aria-label="Calculator" title="Calculator">
        <IconCalc />
      </button>

      {open && (
        <div
          className={'hcalc-dock hcalc-' + place.mode}
          style={dockStyle}
          aria-label="Calculator"
        >
          <div className="hcalc-head">
            <span className={'hcalc-mem' + (memory !== 0 ? ' on' : '')} aria-hidden={memory === 0}>M</span>
            <span className="hcalc-head-sp" />
            <button className="hcalc-ico" onClick={() => setCollapsed(true)} aria-label="Collapse calculator" title="Collapse">
              <IconCollapse />
            </button>
            <button className="hcalc-ico" onClick={() => close('bound')} aria-label="Close calculator" title="Close">
              <IconClose />
            </button>
          </div>

          {boundLabel && <div className="hcalc-bind">→ {boundLabel}</div>}

          {tape.length > 0 && (
            <div className="hcalc-tape" ref={tapeRef}>
              {tape.map((l, i) => (
                <div key={i} className="hcalc-tline" onClick={() => pushLine(l.value)} role="button" tabIndex={-1}>
                  <span className="hcalc-texpr">{l.expr}</span>
                  <span className="hcalc-tval">{fmt(l.value)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="hcalc-display">
            <input
              ref={entryRef}
              className="hcalc-entry"
              value={expr}
              onChange={(e) => { settledRef.current = false; setExpr(e.target.value); }}
              onKeyDown={onEntryKey}
              placeholder="0"
              autoComplete="off"
              spellCheck={false}
              aria-label="Expression"
              readOnly={coarse}
              inputMode={coarse ? 'none' : 'decimal'}
            />
            <div className="hcalc-preview" aria-live="polite">
              {previewText && <span className="hl">{previewText}</span>}
            </div>
          </div>

          <div className="hcalc-keys">
            {keys.map((k) => (
              <button
                key={k.a}
                className={'hcalc-key' + (isFn(k.g) ? ' fn' : '') + (isOp(k.g) ? ' op' : '')}
                onClick={k.run}
                aria-label={k.a}
                tabIndex={-1}
              >
                {k.g}
              </button>
            ))}
          </div>

          {coarse && boundLabel && (
            <button className="hcalc-insert" onClick={doEnter} aria-label="Insert result">↵ insert</button>
          )}

          {!coarse && (
            <div className="hcalc-hints">
              <span><b>↵</b> evaluate</span>
              <span><b>↵↵</b> insert</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// lib/calc.ts — the calculator dock's pure evaluator (calculator-spec.md §6).
//
// Tokenizer + shunting-yard → RPN. No eval(), no new Function(). Unit-testable in isolation
// (Calculator.tsx is the only consumer). Precedence: + − (2) < * / (3) < unary ~ (4); parens.
// `%` is postfix ÷100, so `375500 * 3.5%` reads the way the worksheet reads. `$` and `,` are
// stripped, so a pasted `$375,500` parses. Malformed input throws → the dock shows nothing,
// never NaN.
//
// Verified (§6): 375500*3.5% → 13,142.5 · 362357.50*1.75% → 6,341.25625 · 1+2*3 → 7 ·
// (1+2)*3 → 9 · -5+8 → 3 · 2*-3 → −6 · 100-25% → 99.75.

type Tok =
  | { t: 'num'; v: number }
  | { t: 'op'; v: '+' | '-' | '*' | '/' }
  | { t: 'u' } // unary minus (~)
  | { t: 'pct' } // postfix %
  | { t: 'lp' }
  | { t: 'rp' };

/** A number literal, once `$`/`,`/whitespace are stripped: 375, 3.5, .75, 42. */
const NUM = /^(?:\d+\.?\d*|\.\d+)$/;

export function tokenize(src: string): Tok[] {
  const s = src.replace(/[$,\s]/g, '');
  const toks: Tok[] = [];
  // A leading +/− is unary unless it follows a value (a number, a `)`, or a trailing `%`).
  const afterValue = () => {
    const p = toks[toks.length - 1];
    return !!p && (p.t === 'num' || p.t === 'rp' || p.t === 'pct');
  };
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const raw = s.slice(i, j);
      if (!NUM.test(raw)) throw new Error('bad number: ' + raw);
      toks.push({ t: 'num', v: parseFloat(raw) });
      i = j;
    } else if (c === '+' || c === '-') {
      if (afterValue()) toks.push({ t: 'op', v: c });
      else if (c === '-') toks.push({ t: 'u' }); // unary minus; unary plus is a no-op, dropped
      i++;
    } else if (c === '*' || c === '/') {
      toks.push({ t: 'op', v: c });
      i++;
    } else if (c === '%') {
      toks.push({ t: 'pct' });
      i++;
    } else if (c === '(') {
      toks.push({ t: 'lp' });
      i++;
    } else if (c === ')') {
      toks.push({ t: 'rp' });
      i++;
    } else {
      throw new Error('bad char: ' + c);
    }
  }
  return toks;
}

const prec = (t: Tok): number =>
  t.t === 'u' ? 4 : t.t === 'op' ? (t.v === '*' || t.v === '/' ? 3 : 2) : 0;

/** Shunting-yard → RPN. Binary ops are left-associative; unary `~` is right-associative;
 *  postfix `%` binds tightest, so it goes straight to the output. */
function toRPN(toks: Tok[]): Tok[] {
  const out: Tok[] = [];
  const stack: Tok[] = [];
  for (const tk of toks) {
    if (tk.t === 'num' || tk.t === 'pct') {
      out.push(tk);
    } else if (tk.t === 'op' || tk.t === 'u') {
      const right = tk.t === 'u';
      while (stack.length) {
        const top = stack[stack.length - 1];
        if (top.t === 'lp') break;
        if (prec(top) > prec(tk) || (prec(top) === prec(tk) && !right)) out.push(stack.pop()!);
        else break;
      }
      stack.push(tk);
    } else if (tk.t === 'lp') {
      stack.push(tk);
    } else {
      // rp
      let matched = false;
      while (stack.length) {
        const top = stack.pop()!;
        if (top.t === 'lp') { matched = true; break; }
        out.push(top);
      }
      if (!matched) throw new Error('unbalanced )');
    }
  }
  while (stack.length) {
    const top = stack.pop()!;
    if (top.t === 'lp') throw new Error('unbalanced (');
    out.push(top);
  }
  return out;
}

/** Evaluate `src` to a finite number, or throw on malformed input. */
export function evaluate(src: string): number {
  const rpn = toRPN(tokenize(src));
  const st: number[] = [];
  for (const t of rpn) {
    if (t.t === 'num') st.push(t.v);
    else if (t.t === 'pct') { if (!st.length) throw new Error('underflow'); st.push(st.pop()! / 100); }
    else if (t.t === 'u') { if (!st.length) throw new Error('underflow'); st.push(-st.pop()!); }
    else if (t.t === 'op') {
      if (st.length < 2) throw new Error('underflow');
      const b = st.pop()!, a = st.pop()!;
      st.push(t.v === '+' ? a + b : t.v === '-' ? a - b : t.v === '*' ? a * b : a / b);
    } else {
      throw new Error('malformed'); // lp/rp never reach the RPN output
    }
  }
  if (st.length !== 1) throw new Error('malformed');
  const v = st[0];
  if (!isFinite(v)) throw new Error('non-finite'); // 1/0, 0/0 → shows nothing, never NaN
  return v;
}

/** Try to evaluate; return null on any malformed/partial input (for the live preview). */
export function tryEvaluate(src: string): number | null {
  if (!src.trim()) return null;
  try { return evaluate(src); } catch { return null; }
}

/** Display form — grouped, up to 6 fractional digits (`13,142.5`, `6,341.25625`). */
export function fmt(v: number): string {
  return v.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

/** Insert form — the value with separators stripped, rounded to 1e-6 (`6341.25625`). The dock
 *  doesn't round for you (the exam's doesn't either); Worksheet's ±0.01 tolerance absorbs the tail. */
export function raw(v: number): string {
  return String(Math.round(v * 1e6) / 1e6);
}

'use client';
// components/SearchPanel.tsx — the search/ask surface ("find it in my notes"). Ported from
// homeroom-search-prototype.html (the visual + interaction ground truth). Ninth scoped surface,
// namespaced .hr-search (its own palette block in globals.css).
//
//  Find  — as-you-type dense-vector retrieval (/api/search). Instant, free.
//  Ask   — a grounded 2–3 sentence answer over the retrieved passages (/api/ask, Haiku). The
//          only part that spends credits; fired on ↵ (for a question) or Tab, never per keystroke.
//
// Self-contained like ContentsDrawer: renders its own TopBar trigger + the overlay, gated to
// /learn routes, plus the global "/" shortcut.
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getUserId } from '@/lib/kv';
import type { SearchResult } from '@/lib/search';

type Cite = { id: string; route: string; unitId: string; unitName: string; heading: string; gi?: number; kind: string };
type AskState = { answer: string; cites: Cite[] } | null;

const EXAMPLES = [
  'escrow cushion',
  'how long can they hold my tax money',
  'can I cancel my refinance after signing?',
  "which form has the borrower's SSN?",
  'fee for a veteran with a disability',
];

const IconMag = ({ size = 18, sw = 1.7 }: { size?: number; sw?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" aria-hidden="true">
    <path d="M8.6 3.2c3 .1 5.2 2.6 5 5.6-.2 3-2.7 5.1-5.6 4.9C5 13.5 3 11 3.2 8.1 3.4 5.2 5.8 3.1 8.6 3.2Z" />
    <path d="M12.7 12.9c1.3 1.2 2.7 2.5 4.1 3.7" />
  </svg>
);
const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
);

function isQuestion(s: string): boolean {
  const t = s.trim();
  return /\?$/.test(t) || /^(what|when|where|why|how|can|do|does|is|are|which|who|if)\b/i.test(t);
}

/** Where a result deep-links in the reader (§9). Prose → the exact group anchor; definition/recap
 *  → the unit anchor; a Module-6 form → the lookup companion (coarse for v1). */
function hrefFor(r: SearchResult | Cite): string {
  if (r.kind === 'form') return '/learn/mlo-activities/explorer';
  if (r.kind === 'definition' || r.kind === 'recap') return `${r.route}#${r.unitId ?? ''}`;
  return `${r.route}#grp-${r.unitId}-${r.gi}`;
}

function Meter({ score, max }: { score: number; max: number }) {
  const pct = Math.min(99, Math.round(38 + (max ? score / max : 0) * 58));
  const on = Math.max(1, Math.round(pct / 25));
  return (
    <div className="hr-meter">
      <div className="hr-bars">
        {[1, 2, 3, 4].map((i) => <i key={i} className={i <= on ? 'on' : ''} />)}
      </div>
      <div className="hr-pct">{pct}%</div>
    </div>
  );
}

/** Highlight query words in a snippet (escaped) — mirrors the prototype's <mark> hi(). */
function highlight(text: string, query: string): { __html: string } {
  const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));
  let out = esc(text);
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2).slice(0, 6);
  for (const w of words) {
    const safe = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(new RegExp(`(${safe})`, 'ig'), '<mark>$1</mark>');
  }
  return { __html: out };
}

export default function SearchPanel() {
  const pathname = usePathname() || '';
  const onLearn = pathname.startsWith('/learn');
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [ask, setAsk] = useState<AskState>(null);
  const [askLoading, setAskLoading] = useState(false);
  const [askLimited, setAskLimited] = useState(false);
  const [selIdx, setSelIdx] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reqIdRef = useRef(0);

  const questionable = isQuestion(query) && query.trim().length > 4;

  const closePanel = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const openPanel = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  // Global "/" opens the panel on /learn routes (ignored while typing in a field).
  useEffect(() => {
    if (!onLearn) return;
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || (el as HTMLElement).isContentEditable);
      if (e.key === '/' && !open && !typing) { e.preventDefault(); openPanel(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onLearn, open, openPanel]);

  // Lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // As-you-type Find (debounced ~90ms). Editing the query clears any stale answer.
  useEffect(() => {
    if (!open) return;
    setAsk(null);
    setSelIdx(0);
    const q = query.trim();
    if (q.length < 2) { setResults([]); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const rid = ++reqIdRef.current;
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-User-Id': getUserId() },
          body: JSON.stringify({ q }),
        });
        const data = await res.json();
        if (rid !== reqIdRef.current) return; // stale response
        setResults(Array.isArray(data.results) ? data.results : []);
      } catch {
        if (rid === reqIdRef.current) setResults([]);
      }
    }, 90);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, open]);

  const runAsk = useCallback(async () => {
    const q = query.trim();
    if (q.length < 4 || askLimited) return;
    // Need passages to ground on — wait for Find results.
    const passages = results;
    if (!passages.length) return;
    setAskLoading(true);
    setAsk(null);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-User-Id': getUserId() },
        body: JSON.stringify({ q, results: passages }),
      });
      if (res.status === 429) { setAskLimited(true); setAskLoading(false); return; }
      const data = await res.json();
      if (data.error) { setAskLoading(false); return; }
      setAsk({ answer: data.answer, cites: data.cites ?? [] });
    } catch {
      /* leave answer empty */
    } finally {
      setAskLoading(false);
    }
  }, [query, results, askLimited]);

  const jump = useCallback((r: SearchResult | Cite) => {
    const href = hrefFor(r);
    const [path, hash] = href.split('#');
    closePanel();
    if (hash && path === pathname) {
      // Same reader page — set the hash directly so the reader's hashchange handler fires
      // (Next's router.push to a hash on the current path does not emit hashchange).
      if (window.location.hash === `#${hash}`) window.dispatchEvent(new HashChangeEvent('hashchange'));
      else window.location.hash = hash;
    } else {
      router.push(href);
    }
  }, [router, closePanel, pathname]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelIdx((i) => Math.min(results.length - 1, i + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelIdx((i) => Math.max(0, i - 1)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (questionable) runAsk();
      else if (results[selIdx]) jump(results[selIdx]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (query.trim()) runAsk();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (query) { setQuery(''); setResults([]); setAsk(null); setAskLoading(false); inputRef.current?.focus(); }
      else closePanel();
    }
  };

  if (!onLearn) return null;

  const max = results.length ? results[0].score : 1;
  const showAsk = questionable && (askLoading || ask || askLimited);

  return (
    <>
      <button ref={triggerRef} className="hr-trigger" onClick={openPanel} aria-label="Search your notes" title="Search notes">
        <IconMag size={19} sw={1.6} />
      </button>

      <div className={'hr-scrim' + (open ? ' open' : '')} onClick={closePanel} aria-hidden="true" />

      <div className={'hr-search' + (open ? ' open' : '')} role="dialog" aria-modal="true" aria-label="Search your notes" aria-hidden={!open}>
        <div className="hr-inrow">
          <span className="hr-mag" aria-hidden="true"><IconMag /></span>
          <input
            ref={inputRef}
            className="hr-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="search your notes"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button className="hr-clear show" onClick={() => { setQuery(''); setResults([]); setAsk(null); inputRef.current?.focus(); }} aria-label="Clear search" title="Clear">
              <IconClose />
            </button>
          )}
          <span className="hr-modehint" style={{ opacity: questionable ? 1 : 0.55 }}><b>↵</b> ask</span>
        </div>

        <div className="hr-body">
          {!query.trim() ? (
            <div className="hr-empty">
              <div className="big">what are you looking for?</div>
              <div className="hr-tries">
                {EXAMPLES.map((ex) => (
                  <span key={ex} className="hr-try" onClick={() => { setQuery(ex); inputRef.current?.focus(); }}>{ex}</span>
                ))}
              </div>
            </div>
          ) : (
            <>
              {showAsk && (
                askLimited ? (
                  <div className="hr-ask hr-ask-note">ask limit reached for today — find still works</div>
                ) : askLoading ? (
                  <div className="hr-ask loading"><span className="spin" /></div>
                ) : ask ? (
                  <div className="hr-ask">
                    <div className="hr-ask-body" dangerouslySetInnerHTML={{ __html: ask.answer }} />
                    {ask.cites.length > 0 && (
                      <div className="hr-cites">
                        {ask.cites.map((c, i) => (
                          <span key={c.id} className="hr-chip" onClick={() => jump(c)}>
                            <span className="n">{i + 1}</span> {c.unitName} · {c.heading}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null
              )}
              {showAsk && <div className="hr-seclbl">sources</div>}

              {results.length > 0 ? (
                results.map((r, i) => (
                  <div
                    key={r.id}
                    className={'hr-row' + (i === selIdx ? ' sel' : '')}
                    onMouseEnter={() => setSelIdx(i)}
                    onClick={() => jump(r)}
                  >
                    <div>
                      <div className="hr-crumb"><span className="mod">{r.module} · </span>{r.unitName} › {r.heading}</div>
                      <div className="hr-snip" dangerouslySetInnerHTML={highlight(r.snippet, query)} />
                      <div className="hr-kind">{r.kind === 'form' ? 'form field' : r.kind === 'definition' ? 'definition' : r.kind === 'recap' ? 'recap' : 'passage'} · #{r.unitId}</div>
                    </div>
                    <Meter score={r.score} max={max} />
                  </div>
                ))
              ) : !questionable ? (
                <div className="hr-empty"><div className="big">nothing matched</div>try fewer or plainer words</div>
              ) : null}
            </>
          )}
        </div>

        <div className="hr-foot">
          <div className="hr-keys">
            <span><b>↑↓</b> move</span><span><b>↵</b> open</span><span><b>tab</b> ask</span><span><b>esc</b> clear</span>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';
// components/ContentsDrawer.tsx — slide-over course outline reachable from the TopBar
// on every /learn route. Full 6-chapter / 29-section tree, collapsible, current section
// marked, completed sections checked, tap-to-jump. Desktop: left slide-over separated by a
// hairline + scrim (no shadow, per canon). Mobile: bottom sheet (shadow allowed by precedent).
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import chaptersData from '@/content/generated/chapters.json';
import { loadProgress } from '@/lib/kv';

type Section = { id: string; title: string };
type Chapter = { id: string; title: string; sections: Section[] };

const CHAPTERS: Chapter[] = (chaptersData as { parts: { chapters: Chapter[] }[] }).parts
  .flatMap((p) => p.chapters);
const TOTAL = CHAPTERS.reduce((n, c) => n + c.sections.length, 0);

const IconLines = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" aria-hidden="true">
    <path d="M1 1.5h13M1 6.5h13M1 11.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconClose = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconChevron = () => (
  <svg className="cd-chev" width="9" height="12" viewBox="0 0 9 12" fill="none" aria-hidden="true">
    <path d="M2 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M2 7l3 3 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContentsDrawer() {
  const pathname = usePathname() || '';
  const onLearn = pathname.startsWith('/learn');

  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [hash, setHash] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const seg = pathname.split('/').filter(Boolean); // ['learn', chapter?, section?]
  const curChapterId = seg[1] ?? '';
  const curSectionId = seg[2] ?? hash.replace('#', '');

  // completion set — degrade gracefully (empty when KV unprovisioned: no checks rendered)
  useEffect(() => {
    let alive = true;
    loadProgress()
      .then((p) => { if (alive && p?.completedUnits) setCompleted(new Set(p.completedUnits)); })
      .catch(() => { /* progress unavailable — outline still renders */ });
    return () => { alive = false; };
  }, [open]);

  // track hash so the federal reader's current section (anchor) can be marked
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  // default: only the current chapter is expanded
  useEffect(() => { if (curChapterId) setExpanded(new Set([curChapterId])); }, [curChapterId]);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);
  const openDrawer = useCallback(() => {
    if (curChapterId) setExpanded((prev) => new Set(prev).add(curChapterId));
    setOpen(true);
  }, [curChapterId]);

  // open behavior: lock scroll, Escape/Tab/Arrow handling, scroll current into view, focus
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); closeDrawer(); return; }
      const panel = panelRef.current;
      if (!panel) return;
      if (e.key === 'Tab') {
        const f = panel.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const items = Array.from(
          panel.querySelectorAll<HTMLElement>('.cd-chapter-head, .cd-chapter-toggle, .cd-section')
        );
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (i === -1) return;
        e.preventDefault();
        const next = e.key === 'ArrowDown' ? Math.min(i + 1, items.length - 1) : Math.max(i - 1, 0);
        items[next]?.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    requestAnimationFrame(() => {
      const cur = panelRef.current?.querySelector<HTMLElement>('[data-current="true"]');
      cur?.scrollIntoView({ block: 'center' });
      (panelRef.current?.querySelector<HTMLElement>('.cd-close'))?.focus();
    });

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, closeDrawer]);

  if (!onLearn) return null;

  const pct = Math.min(100, Math.round((completed.size / TOTAL) * 100));

  return (
    <>
      <button ref={triggerRef} className="cd-trigger" onClick={openDrawer} aria-haspopup="dialog" aria-expanded={open} aria-label="Course contents" title="Contents">
        <IconLines />
      </button>

      <div className={'cd-scrim' + (open ? ' cd-open' : '')} onClick={closeDrawer} aria-hidden="true" />

      <aside
        ref={panelRef}
        className={'cd-drawer' + (open ? ' cd-open' : '')}
        role="dialog"
        aria-modal="true"
        aria-label="Course contents"
        aria-hidden={!open}
      >
        <div className="cd-head">
          <span className="cd-title">Contents</span>
          <button className="cd-close" onClick={closeDrawer} aria-label="Close contents">
            <IconClose />
          </button>
        </div>

        <div className="cd-body">
          {CHAPTERS.map((ch) => {
            const isCurChapter = ch.id === curChapterId;
            const isExpanded = expanded.has(ch.id);
            const doneCount = ch.sections.filter((s) => completed.has(s.id)).length;
            return (
              <div
                key={ch.id}
                className={'cd-chapter' + (isExpanded ? ' cd-expanded' : '') + (isCurChapter ? ' cd-current-chapter' : '')}
              >
                {isExpanded ? (
                  <div className="cd-chapter-head cd-chapter-head-open">
                    <button
                      className="cd-chapter-toggle"
                      aria-expanded={true}
                      aria-label={`Collapse ${ch.title}`}
                      onClick={() =>
                        setExpanded((prev) => {
                          const next = new Set(prev);
                          next.delete(ch.id);
                          return next;
                        })
                      }
                    >
                      <IconChevron />
                    </button>
                    <Link
                      href={`/learn/${ch.id}`}
                      className="cd-chapter-name cd-chapter-link"
                      onClick={() => {
                        closeDrawer();
                        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
                      }}
                    >
                      {ch.title}
                    </Link>
                    <span className="cd-chapter-count">{doneCount} / {ch.sections.length}</span>
                  </div>
                ) : (
                  <button
                    className="cd-chapter-head"
                    aria-expanded={false}
                    onClick={() =>
                      setExpanded((prev) => {
                        const next = new Set(prev);
                        next.add(ch.id);
                        return next;
                      })
                    }
                  >
                    <IconChevron />
                    <span className="cd-chapter-name">{ch.title}</span>
                    <span className="cd-chapter-count">{doneCount} / {ch.sections.length}</span>
                  </button>
                )}
                {isExpanded && (
                  <div className="cd-sections">
                    {ch.sections.map((s, i) => {
                      const isCur = isCurChapter && s.id === curSectionId;
                      const isDone = completed.has(s.id);
                      return (
                        <Link
                          key={s.id}
                          href={`/learn/${ch.id}/${s.id}`}
                          className={'cd-section' + (isCur ? ' cd-current' : '') + (isDone ? ' cd-done' : '')}
                          aria-current={isCur ? 'page' : undefined}
                          data-current={isCur ? 'true' : undefined}
                          onClick={closeDrawer}
                        >
                          <span className="cd-section-num">{String(i + 1).padStart(2, '0')}</span>
                          <span className="cd-mark">{isDone && !isCur ? <IconCheck /> : null}</span>
                          <span>{s.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="cd-foot">
          <span>{completed.size} / {TOTAL}</span>
          <span className="cd-progress"><span style={{ width: `${pct}%` }} /></span>
        </div>
      </aside>
    </>
  );
}

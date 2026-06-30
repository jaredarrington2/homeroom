'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTextSelection } from '@/hooks/useTextSelection';
import { getUserId } from '@/lib/kv';

type PopoverState = 'idle' | 'selected' | 'loading' | 'explained' | 'rate_limited' | 'error';

function isMobile() {
  return window.innerWidth <= 720;
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

export default function ExplainPopover() {
  const liveSelection = useTextSelection();
  // committedSelection holds the selection that was active when the user
  // clicked "Explain this". The live selection gets cleared by the click,
  // but we still need the text/rect for the ongoing request and positioning.
  const committedRef = useRef(liveSelection);
  const [state, setState] = useState<PopoverState>('idle');
  const [explanation, setExplanation] = useState('');
  const [resetsAt, setResetsAt] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const scrollAnchor = useRef(0);

  // Keep committed in sync with live while in selected state
  if (liveSelection && state === 'selected') {
    committedRef.current = liveSelection;
  }

  // The selection used for rendering and fetching
  const selection = state === 'idle' ? liveSelection : committedRef.current;

  const dismiss = useCallback(() => {
    setState('idle');
    setExplanation('');
    window.getSelection()?.removeAllRanges();
  }, []);

  // When live selection changes, reset to selected state (or idle)
  useEffect(() => {
    if (liveSelection) {
      committedRef.current = liveSelection;
      setState('selected');
      scrollAnchor.current = window.scrollY;
    } else if (state === 'selected') {
      // Selection cleared while waiting for user to click — dismiss
      setState('idle');
    }
    // While loading/explained/error, a cleared live selection is expected (click deselects);
    // don't touch state in those cases.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveSelection]);

  // Dismiss on scroll >100px
  useEffect(() => {
    function onScroll() {
      if (state === 'idle') return;
      if (Math.abs(window.scrollY - scrollAnchor.current) > 100) dismiss();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [state, dismiss]);

  // Dismiss on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && state !== 'idle') dismiss();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [state, dismiss]);

  // Dismiss on tap/click outside (pointerdown covers both mouse and touch)
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (state === 'idle') return;
      const target = e.target as Node;
      if (popoverRef.current?.contains(target)) return;
      if (mobileRef.current?.contains(target)) return;
      // Small delay so a tap on the selected text itself (re-selection) doesn't
      // immediately dismiss before selectionchange can update the state.
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) dismiss();
      }, 10);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [state, dismiss]);

  async function triggerExplain() {
    if (!selection) return;
    setState('loading');

    const userId = getUserId();
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId,
        },
        body: JSON.stringify({
          text: selection.text,
          sectionId: selection.sectionId,
          sectionTitle: selection.sectionTitle,
          chapterId: selection.chapterId,
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setResetsAt(data.resets_at ?? null);
        setState('rate_limited');
        return;
      }
      if (!res.ok || data.error) {
        setState('error');
        return;
      }
      setExplanation(data.explanation);
      setState('explained');
    } catch {
      setState('error');
    }
  }

  if (state === 'idle' || !selection) return null;
  // From here down, selection is the committed snapshot — safe to use even
  // after the live text selection was cleared by the user's button click.

  // ── Desktop popover position ──
  // rect is viewport-relative; fixed positioning uses viewport coords directly
  const rect = selection.rect;
  const popoverWidth = 340;
  const margin = 12;
  const viewportPadding = 16;

  const popoverHeight = popoverRef.current?.offsetHeight ?? 110;
  const above = rect.top > popoverHeight + margin;
  const popoverTop = above
    ? rect.top - popoverHeight - margin
    : rect.bottom + margin;

  const selCenter = rect.left + rect.width / 2;
  let popoverLeft = selCenter - popoverWidth / 2;
  if (popoverLeft < viewportPadding) popoverLeft = viewportPadding;
  if (popoverLeft + popoverWidth > window.innerWidth - viewportPadding) {
    popoverLeft = window.innerWidth - popoverWidth - viewportPadding;
  }
  const arrowLeft = Math.max(12, Math.min(popoverWidth - 12, selCenter - popoverLeft)) - 4;

  // ── Shared content rendering ──
  function renderContent(mobile: boolean) {
    const textSize = mobile ? 'text-[15px]' : 'text-[14.5px]';

    if (state === 'selected') {
      return (
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-2">
            selection
          </p>
          {selection!.text.length > 500 ? (
            <p className={`${textSize} text-ink-muted leading-snug`}>
              Try selecting a shorter passage.
            </p>
          ) : (
            <button
              onClick={triggerExplain}
              className="font-sans text-[14px] font-medium text-royal cursor-pointer bg-none border-none p-0 inline-flex items-center gap-1.5 hover:gap-2.5 transition-[gap] hover:text-royal-hover"
            >
              Explain this →
            </button>
          )}
        </>
      );
    }

    if (state === 'loading') {
      return (
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-2">
            explanation
          </p>
          <div className="flex gap-1 py-0.5">
            {[0, 150, 300].map((delay, i) => (
              <span
                key={i}
                className="w-[5px] h-[5px] rounded-full bg-royal animate-[dot-pulse_1.2s_infinite_ease-in-out]"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </>
      );
    }

    if (state === 'explained') {
      return (
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-2">
            explanation
          </p>
          <p className={`${textSize} text-ink leading-relaxed`}>{explanation}</p>
        </>
      );
    }

    if (state === 'rate_limited') {
      const resetTime = resetsAt
        ? new Date(resetsAt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'midnight UTC';
      return (
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-2">
            limit reached
          </p>
          <p className={`${textSize} text-ink-muted leading-snug`}>
            You&apos;ve used your daily explanations. Resets at {resetTime}.
          </p>
        </>
      );
    }

    if (state === 'error') {
      return (
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-warning mb-2">
            couldn&apos;t load
          </p>
          <p className={`${textSize} text-ink leading-snug`}>
            Something went wrong on our side.{' '}
            <button
              onClick={triggerExplain}
              className="text-royal underline underline-offset-[3px] cursor-pointer bg-none border-none font-sans text-[13px] p-0"
            >
              Try again
            </button>
          </p>
        </>
      );
    }
  }

  return (
    <>
      {/* Desktop popover */}
      <div
        ref={popoverRef}
        className="max-sm:hidden fixed z-[100] bg-paper border border-hairline-strong w-[340px] px-5 py-[18px]"
        style={{
          top: popoverTop,
          left: popoverLeft,
          ['--arrow-left' as string]: `${arrowLeft}px`,
        }}
      >
        {/* Arrow */}
        <span
          className={`absolute w-2 h-2 bg-paper border-hairline-strong ${above ? 'top-[-4px] border-t border-l border-b-0 border-r-0' : 'bottom-[-4px] border-b border-r border-t-0 border-l-0'} rotate-45`}
          style={{ left: `var(--arrow-left)` }}
        />
        {renderContent(false)}
      </div>

      {/* Mobile bottom chip / sheet */}
      <div
        ref={mobileRef}
        className="sm:hidden fixed left-4 right-4 bottom-4 z-[100] bg-paper border border-hairline-strong shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-[220ms] ease-out opacity-100 translate-y-0"
      >
        {(state === 'explained' || state === 'loading' || state === 'rate_limited' || state === 'error') && (
          <div className="w-9 h-1 bg-hairline-strong rounded-full mx-auto mt-2" />
        )}
        {/* Chip row */}
        <div className={`flex items-center gap-3 px-4 py-3 ${state !== 'selected' ? 'border-b border-hairline' : ''}`}>
          <p className="flex-1 text-[13px] text-ink-muted overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            <strong className="text-ink font-medium">&ldquo;{truncate(selection.text, 60)}&rdquo;</strong>
          </p>
          {state === 'selected' && (
            <button
              onClick={triggerExplain}
              className="font-sans text-[14px] font-medium text-royal cursor-pointer bg-none border-none p-0 shrink-0 inline-flex items-center gap-1"
            >
              Explain →
            </button>
          )}
        </div>
        {/* Sheet body */}
        {(state === 'explained' || state === 'loading' || state === 'rate_limited' || state === 'error') && (
          <div className="px-4 pb-4 pt-3">
            {renderContent(true)}
          </div>
        )}
      </div>
    </>
  );
}

'use client';
import { useState, useEffect, useRef } from 'react';

export type SelectionState = {
  text: string;
  range: Range;
  rect: DOMRect;
  sectionId: string;
  sectionTitle: string;
  chapterId: string;
};

function readSelection(): SelectionState | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;

  const text = sel.toString().trim();
  if (text.length < 5 || text.length > 500) return null;

  const range = sel.getRangeAt(0);
  const container = range.commonAncestorContainer;
  const el = container.nodeType === Node.TEXT_NODE
    ? container.parentElement
    : (container as Element);
  const ancestor = el?.closest('[data-explainable]') as HTMLElement | null;
  if (!ancestor) return null;

  const rect = range.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return null;

  return {
    text,
    range,
    rect,
    sectionId: ancestor.dataset.sectionId ?? '',
    sectionTitle: ancestor.dataset.sectionTitle ?? '',
    chapterId: ancestor.dataset.chapterId ?? '',
  };
}

export function useTextSelection(): SelectionState | null {
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function schedule(delay: number) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setSelection(readSelection()), delay);
    }

    // Desktop: selectionchange with 250ms debounce
    function onSelectionChange() {
      schedule(250);
    }

    // Mobile: pointerup fires at finger-lift — capture before the iOS native
    // popup can clear the selection. 50ms gives layout time to settle while
    // still beating iOS's ~300ms synthetic-event delay.
    function onPointerUp(e: PointerEvent) {
      if (e.pointerType !== 'touch') return;
      schedule(50);
    }

    document.addEventListener('selectionchange', onSelectionChange);
    document.addEventListener('pointerup', onPointerUp);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChange);
      document.removeEventListener('pointerup', onPointerUp);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return selection;
}

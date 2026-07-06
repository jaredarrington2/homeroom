'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { UnitRecap } from '@/lib/section';
import Sticker from './Sticker';

interface RecapCardProps {
  unitName: string;
  reg?: string;
  recap: UnitRecap;
  /** Unit id — resolves the die-cut category sticker at /illustrations/_stickers/{unitId}.png. */
  unitId: string;
}

function IconRecap() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function RecapCard({ unitName, reg, recap, unitId }: RecapCardProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // portals need a client DOM target; only render one after mount
  useEffect(() => setMounted(true), []);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    // lock background scroll while the card is up
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    const t = setTimeout(
      () => panelRef.current?.querySelector<HTMLElement>('.rc-close')?.focus(),
      50
    );
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open]);

  const overlay = (
    // portaled to <body>, so re-scope with .section-reader for the .rc-* CSS +
    // tokens; .rc-portal strips the reader column's max-width/margin/padding.
    <div className="section-reader rc-portal">
      <div className="rc-scrim" onClick={close}>
        <div
          ref={panelRef}
          className="rc-panel"
          role="dialog"
          aria-modal="true"
          aria-label={`Recap card — ${unitName}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="rc-close"
            aria-label="Close recap card"
            onClick={close}
          >
            ×
          </button>

          <Sticker
            className="rc-sticker"
            src={`/illustrations/_stickers/${unitId}.png`}
            alt={`${unitName} — category sticker`}
          />

          <div className="rc-kicker">the gist{reg ? ` · ${reg}` : ''}</div>
          <h3 className="rc-title">{unitName}</h3>

          <p className="rc-plain">{recap.plainLanguage}</p>

          <div className="rc-divider" aria-hidden="true" />

          <div className="rc-facts-label">key facts</div>
          <ul className="rc-facts">
            {recap.facts.map((fact, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: fact }} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="rc-trigger"
        aria-label={`Open recap card for ${unitName}`}
        onClick={() => setOpen(true)}
      >
        <IconRecap />
        <span className="rc-trigger-label">recap</span>
      </button>

      {open && mounted && createPortal(overlay, document.body)}
    </>
  );
}

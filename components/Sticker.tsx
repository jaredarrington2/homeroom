'use client';
// components/Sticker.tsx — a die-cut sticker that enlarges to a lightbox on click. Used by both
// the photoreal study cards and the end-of-unit RecapCards. The `className` carries the sticker's
// positioning (e.g. "sc-sticker sc-sticker--br" or "rc-sticker"); this renders a button with that
// class wrapping the image, plus a portaled full-screen lightbox on open.
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Sticker({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Capture-phase so this fires before any parent modal's Escape handler (e.g. the RecapCard),
    // and stop it there so Escape closes only the lightbox, not the card underneath.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`sticker-btn ${className}`}
        aria-label={`Enlarge sticker${alt ? `: ${alt}` : ''}`}
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} loading="lazy" />
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="sticker-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={alt || 'Sticker'}
            onClick={() => setOpen(false)}
          >
            <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
            <button
              type="button"
              className="sticker-lightbox-close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>,
          document.body
        )}
    </>
  );
}

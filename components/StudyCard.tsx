"use client";
// components/StudyCard.tsx — a live, layered photoreal study card (spec:
// ~/Downloads/homeroom-photoreal-study-cards-spec.md). Three stacked layers:
//   [ plate PNG ]   shared blank card face (OpenAI) — public/illustrations/_plates/index-card.png
//   [ title PNG ]   per-card Sharpie lettering (OpenAI), white dropped via mix-blend-mode:multiply
//   [ DOM overlay ] rules, dividers, typed body, highlighter, marginalia, tooltips — all drawn here
//
// The card is small in the reading column, so the whole card is click-to-enlarge: clicking opens
// a portaled lightbox with the same card at a large, readable width (cqw units scale it up).
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  PLATE_FILE,
  titleFile,
  stickerFile,
  type StudyCard as StudyCardT,
  type HighlighterColor,
} from "@/content/study-cards";

const src = (rel: string) => `/illustrations/${rel}`;

/** Wrap any tooltip terms found in a body line with an accessible gloss popover. */
function renderLine(line: string, tooltips: Record<string, string> | undefined): ReactNode {
  if (!tooltips) return line;
  const terms = Object.keys(tooltips).sort((a, b) => b.length - a.length);
  for (const term of terms) {
    const i = line.toLowerCase().indexOf(term.toLowerCase());
    if (i === -1) continue;
    const before = line.slice(0, i);
    const match = line.slice(i, i + term.length);
    const after = line.slice(i + term.length);
    return (
      <>
        {before}
        <span className="sc-term" tabIndex={0}>
          {match}
          <span className="sc-tip" role="tooltip">
            {tooltips[term]}
          </span>
        </span>
        {renderLine(after, tooltips)}
      </>
    );
  }
  return line;
}

function Column({
  header,
  lines,
  swipe,
  tooltips,
  marginalia,
}: {
  header?: string;
  lines: string[];
  swipe?: HighlighterColor;
  tooltips?: Record<string, string>;
  marginalia?: { text: string; anchor: string }[];
}) {
  return (
    <div className="sc-col">
      {header && (
        <div className="sc-colhead">
          <span className={`sc-stamp${swipe ? ` sc-stamp--${swipe}` : ""}`}>{header}</span>
        </div>
      )}
      {lines.map((ln, i) => {
        const note = marginalia?.find((m) => m.anchor === ln);
        return (
          <div className="sc-line" key={i}>
            <span className="sc-mk" aria-hidden>
              ·
            </span>
            <span className="sc-txt">
              {renderLine(ln, tooltips)}
              {note && <span className="sc-margin">{note.text}</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** The card visual itself — reused at reading size and blown up in the lightbox. */
function CardFace({ card }: { card: StudyCardT }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);

  // Auto-fit guard: if the typed body overflows the ruled area, step the font down.
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    setFit(1);
    let guard = 0;
    const shrink = () => {
      if (guard++ > 6) return;
      if (el.scrollHeight > el.clientHeight + 1) {
        setFit((f) => {
          const next = Math.max(0.8, f - 0.04);
          if (next !== f) requestAnimationFrame(shrink);
          return next;
        });
      }
    };
    requestAnimationFrame(shrink);
  }, [card.id]);

  return (
    <div className="sc-card" style={{ ["--sc-fit" as string]: fit }}>
      {/* layer 1 — blank paper plate */}
      <img className="sc-plate" src={src(PLATE_FILE)} alt="" loading="eager" />

      {/* layer 2 — Sharpie title (white multiplied out live) */}
      <img className="sc-title" src={src(titleFile(card))} alt={card.title} loading="eager" />

      {/* layer 3 — DOM overlay */}
      <div className="sc-overlay">
        {card.subtitle && <div className="sc-subtitle">{card.subtitle}</div>}
        <div className="sc-body" ref={bodyRef}>
          {card.columns.map((col, i) => (
            <Column
              key={i}
              header={col.header}
              lines={col.lines}
              swipe={card.highlighter?.find((h) => h.target === col.header)?.color}
              tooltips={card.tooltips}
              marginalia={card.marginalia}
            />
          ))}
        </div>
        {card.footer && <div className="sc-footer">{card.footer}</div>}
      </div>

      {/* die-cut category-cue sticker */}
      {card.sticker && (
        <img
          className={`sc-sticker sc-sticker--${card.sticker.corner ?? "br"}`}
          src={src(stickerFile(card))}
          alt={card.sticker.alt ?? ""}
          loading="lazy"
        />
      )}
    </div>
  );
}

export default function StudyCard({ card }: { card: StudyCardT }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <figure className={`sc sc--${card.format}`}>
      <button
        type="button"
        className="sc-open"
        aria-label={`Enlarge card: ${card.title}`}
        onClick={() => setOpen(true)}
      >
        <CardFace card={card} />
      </button>
      <figcaption className="sc-cap">{card.title} — tap to enlarge</figcaption>

      {open &&
        mounted &&
        createPortal(
          <div
            className="section-reader sc-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={card.title}
            onClick={() => setOpen(false)}
          >
            <div
              className={`sc sc--${card.format} sc-lightbox-card`}
              onClick={(e) => e.stopPropagation()}
            >
              <CardFace card={card} />
            </div>
            <button
              type="button"
              className="sc-lightbox-close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>,
          document.body
        )}
    </figure>
  );
}

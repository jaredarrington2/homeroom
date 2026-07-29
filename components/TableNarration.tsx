"use client";
// components/TableNarration.tsx — plays a timed narration track and spotlights the matching
// table element as each beat is spoken. The cue doc (audio + per-cue time windows + target
// selectors) is produced by scripts/gen-table-narration.mjs from ElevenLabs timestamps, so
// the highlight stays in sync with the voice. Cue detection runs off the <audio> element's
// timeupdate event. The control is deliberately minimal: a bare play triangle in the card's
// bottom-right corner, and the card's bottom border doubles as a subtle progress bar — both
// portaled into the .dv-pc card so they anchor to it.
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Cue { tStart: number; tEnd: number; targets: string[] }
interface CueDoc { audio: string; duration: number; cues: Cue[] }

export default function TableNarration({ src }: { src: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const gridRef = useRef<HTMLElement | null>(null);
  const lastCue = useRef<number>(-2);
  const [doc, setDoc] = useState<CueDoc | null>(null);
  const [card, setCard] = useState<HTMLElement | null>(null);
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch(`/audio/tables/${src}.cues.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: CueDoc | null) => setDoc(d))
      .catch(() => {});
  }, [src]);

  // Locate the table card (portal target for the control) and the grid (highlight target).
  useEffect(() => {
    const gb = rootRef.current?.closest(".group-block");
    setCard(gb?.querySelector<HTMLElement>(".dv-pc") ?? null);
    gridRef.current = gb?.querySelector<HTMLElement>(".dv-pc-grid") ?? null;
  }, [doc]);

  const grid = () => gridRef.current;

  const clearLit = useCallback(() => {
    const g = grid();
    if (!g) return;
    g.classList.remove("pc-narrating");
    g.querySelectorAll(".pc-lit").forEach((el) => el.classList.remove("pc-lit"));
  }, []);

  const applyCue = useCallback((cue: Cue | null) => {
    const g = grid();
    if (!g) return;
    g.querySelectorAll(".pc-lit").forEach((el) => el.classList.remove("pc-lit"));
    if (!cue || cue.targets.length === 0) { g.classList.remove("pc-narrating"); return; }
    g.classList.add("pc-narrating");
    const cols = new Set<string>();
    cue.targets.forEach((sel) => {
      g.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        el.classList.add("pc-lit");
        const pc = el.getAttribute("data-pc");
        if (pc && pc.includes(":")) cols.add(pc.split(":")[1]);
      });
    });
    cols.forEach((col) => g.querySelector<HTMLElement>(`[data-pc-col="${col}"]`)?.classList.add("pc-lit"));
  }, []);

  const onTime = useCallback(() => {
    const a = audioRef.current;
    if (!a || !doc) return;
    const t = a.currentTime;
    setProgress(doc.duration ? Math.min(1, t / doc.duration) : 0);
    const idx = doc.cues.findIndex((c) => t >= c.tStart && t < c.tEnd);
    if (idx !== lastCue.current) {
      lastCue.current = idx;
      applyCue(idx >= 0 ? doc.cues[idx] : null);
    }
  }, [doc, applyCue]);

  const play = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    void a.play().catch(() => {});
    setStatus("playing");
    grid()?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setStatus("paused");
  }, []);

  const onEnded = useCallback(() => {
    setStatus("idle"); setProgress(0); lastCue.current = -2; clearLit();
  }, [clearLit]);

  useEffect(() => () => clearLit(), [clearLit]);

  return (
    <div className="pc-narr-host" ref={rootRef}>
      {doc && <audio ref={audioRef} src={doc.audio} preload="none" onTimeUpdate={onTime} onEnded={onEnded} />}
      {card && createPortal(
        <>
          <div className="pc-narr-bar" aria-hidden="true" style={{ width: `${progress * 100}%`, opacity: status === "idle" ? 0 : 1 }} />
          <button
            type="button"
            className={"pc-narr-tri" + (status === "playing" ? " on" : "")}
            aria-label={status === "playing" ? "Pause narration" : "Play the table narration"}
            onClick={status === "playing" ? pause : play}
          >
            {status === "playing" ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
            )}
          </button>
        </>,
        card,
      )}
    </div>
  );
}

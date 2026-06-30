"use client";
// components/ListenBar.tsx — the slim bar pinned to the bottom while audio is active.
// Play/pause (→ Continue at a gate), unit label + thin progress + section line, speed, close.
import { useListenActions, useListenState } from "@/lib/ListenContext";
import type { GateType } from "@/lib/audioText";

const RATES = [0.75, 1, 1.25, 1.5];

const GATE_HELP: Record<GateType, string> = {
  synth: "Answer on screen, then continue",
  definitions: "Run the definitions, then continue",
  flashcards: "Flip the cards, then continue",
  mcq: "Answer the questions, then continue",
};

export default function ListenBar() {
  const { status, name, groupCount, currentItem, index, total, gateType, rate } = useListenState();
  const { toggle, skip, close, setRate } = useListenActions();

  if (status === "idle" || !currentItem) return null;

  const gated = status === "gated";
  const canSkip = status === "playing" || status === "paused";
  const progress = total > 1 ? Math.round((index / (total - 1)) * 100) : 0;
  const gi = currentItem.kind !== "gate" ? currentItem.gi : currentItem.gi;
  const sub = gated && gateType
    ? GATE_HELP[gateType]
    : gi != null
    ? `Section ${gi + 1} of ${groupCount}`
    : "";

  const cycleRate = () => setRate(RATES[(RATES.indexOf(rate) + 1) % RATES.length]);

  return (
    <div className="lp-bar" role="region" aria-label="Listen player">
      <button className="lp-bar-skip" onClick={() => skip(-5)} disabled={!canSkip} aria-label="Back 5 seconds">
        <Replay5 />
      </button>

      <button className="lp-bar-btn" onClick={toggle} aria-label={gated ? "Continue" : status === "playing" ? "Pause" : "Play"}>
        {gated ? (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M4 3l9 5-9 5z" /></svg>
        ) : status === "playing" ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 3h3v10H4zM9 3h3v10H9z" /></svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M4 3l9 5-9 5z" /></svg>
        )}
      </button>

      <button className="lp-bar-skip" onClick={() => skip(5)} disabled={!canSkip} aria-label="Forward 5 seconds">
        <Forward5 />
      </button>

      <div className="lp-bar-mid">
        <div className="lp-bar-lbl">{gated ? "Continue when ready" : name}</div>
        <div className="lp-prog"><div className="lp-prog-fill" style={{ width: `${progress}%` }} /></div>
        <div className="lp-bar-sub">{sub}</div>
      </div>

      <button className="lp-bar-speed" onClick={cycleRate} aria-label="Speed">{rate}×</button>
      <button className="lp-bar-x" onClick={close} aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3l10 10M13 3L3 13" /></svg>
      </button>
    </div>
  );
}

/* minimalist circular-arrow skip glyphs with a "5" */
function Replay5() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <text x="12" y="15.6" fontSize="8.5" fontWeight="700" fill="currentColor" stroke="none" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">5</text>
    </svg>
  );
}
function Forward5() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <text x="12" y="15.6" fontSize="8.5" fontWeight="700" fill="currentColor" stroke="none" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">5</text>
    </svg>
  );
}

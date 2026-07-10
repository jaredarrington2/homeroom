"use client";

// components/PiggybackStack.tsx — the piggyback-stack viz (vizWidget 'piggyback'). A single
// horizontal LTV bar the reader recomputes by picking a split; the PMI line sits at 80% and the
// first-lien segment stays at or below it in every valid split — the whole teach. Hand-rolled,
// flat white card, scoped .pb-*. In-session state only (the CapLadder / Worksheet precedent).
import { useState } from "react";
import { piggybackSplits, PMI_LINE } from "@/content/widgets/piggyback";

export default function PiggybackStack() {
  const [i, setI] = useState(3); // default to 80/10/10
  const [revealed, setRevealed] = useState(false);
  const s = piggybackSplits[i];

  return (
    <div className="pb" role="group" aria-label="piggyback loan-to-value split">
      <div className="pb-seg" role="tablist" aria-label="split">
        {piggybackSplits.map((sp, j) => (
          <button type="button" key={sp.label} role="tab" aria-selected={j === i} className={j === i ? "on" : ""} onClick={() => setI(j)}>
            {sp.label}
          </button>
        ))}
      </div>

      <div className="pb-bar" aria-hidden="true">
        {s.first > 0 && <span className="pb-seg-first" style={{ width: `${s.first}%` }}>{s.first}%</span>}
        {s.second > 0 && <span className="pb-seg-second" style={{ width: `${s.second}%` }}>{s.second}%</span>}
        {s.down > 0 && <span className="pb-seg-down" style={{ width: `${s.down}%` }}>{s.down}%</span>}
        <span className="pb-pmi" style={{ left: `${PMI_LINE}%` }} />
      </div>

      <div className="pb-legend">
        <span><i className="pb-k pb-kf" /> first lien</span>
        <span><i className="pb-k pb-ks" /> second lien</span>
        {s.down > 0 && <span><i className="pb-k pb-kd" /> down payment</span>}
        <span className="pb-pmi-lbl">PMI line — 80%</span>
      </div>

      <p className="pb-read">
        The first lien is <b>{s.first}%</b> of value —{" "}
        {s.first <= PMI_LINE
          ? "at or below the 80% PMI line, so no PMI attaches."
          : "above the 80% line, so PMI would attach."}{" "}
        The second lien carries <b>{s.second}%</b>
        {s.down > 0 ? <>, leaving <b>{s.down}%</b> as the down payment.</> : " of the price."}
      </p>

      <div className="pb-check">
        <p className="pb-q">A buyer puts 10% down and wants no PMI. What&apos;s the split?</p>
        {!revealed ? (
          <button type="button" className="pb-btn" onClick={() => setRevealed(true)}>Show me</button>
        ) : (
          <p className="pb-a">
            <span className="hl">80/10/10</span> — the first lien at 80% dodges PMI, a 10% second lien covers the gap, and the buyer&apos;s 10% down completes it.
          </p>
        )}
      </div>
    </div>
  );
}

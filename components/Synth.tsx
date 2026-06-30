"use client";
// components/Synth.tsx — tier 2. Synthesis short-answer after a concept group.
// Check -> /api/grade (semantic, reuses the explain key); verdict + canonical answer shown.
// Falls back to a local grader if the route is unavailable.
// Persistence (v3.6): the graded verdict + response are saved per (unitId, synthId) and
// restored on load (locked, with a "Try again" link to clear and retry).
import { useState, useRef, useCallback, useEffect } from "react";
import { useProgressContext } from "@/lib/ProgressContext";
import type { SynthState } from "@/lib/types";

type Verdict = "correct" | "partial" | "incorrect";

const toGrade: Record<Verdict, SynthState["grade"]> = {
  correct: "got_it", partial: "close", incorrect: "not_quite",
};
const toVerdict: Record<SynthState["grade"], Verdict> = {
  got_it: "correct", close: "partial", not_quite: "incorrect",
};

function local(canonical: string, answer: string): { verdict: Verdict; feedback: string } {
  const nums = (s: string) => (s.toLowerCase().match(/\$?\d[\d,]*(?:\.\d+)?%?/g) || []).map((x) => x.replace(/[$,]/g, ""));
  const cn = nums(canonical), an = nums(answer);
  const ok = cn.length === 0 || cn.every((n) => an.includes(n));
  const w = canonical.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((x) => x.length > 3);
  const ov = w.length ? w.filter((x) => answer.toLowerCase().includes(x)).length / w.length : 0;
  if (ok && ov >= 0.5) return { verdict: "correct", feedback: "Key facts present." };
  if (ok || ov >= 0.35) return { verdict: "partial", feedback: "On the right track — compare with the answer." };
  return { verdict: "incorrect", feedback: "Missing the tested fact — see the answer." };
}

export default function Synth({
  q, a, unitId, synthId,
}: { q: string; a: string; unitId: string; synthId: string }) {
  const { getSynth, saveSynth, clearSynth, loaded } = useProgressContext();
  const [state, setState] = useState<"idle" | Verdict>("idle");
  const [feedback, setFeedback] = useState("");
  const [showAns, setShowAns] = useState(false);
  const [busy, setBusy] = useState(false);
  const [locked, setLocked] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const restored = useRef(false);

  // Restore a previously graded answer once progress loads.
  useEffect(() => {
    if (!loaded || restored.current) return;
    const saved = getSynth(unitId, synthId);
    if (saved) {
      restored.current = true;
      if (taRef.current) taRef.current.value = saved.response;
      setState(toVerdict[saved.grade]);
      setFeedback(saved.feedback ?? "");
      setShowAns(true);
      setLocked(true);
    }
  }, [loaded, getSynth, unitId, synthId]);

  const grade = useCallback(async () => {
    const v = taRef.current?.value.trim() ?? "";
    if (!v) { taRef.current?.focus(); return; }
    setBusy(true);
    let verdict: Verdict; let fb: string;
    try {
      const r = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, canonical: a, answer: v }),
      });
      if (!r.ok) throw new Error();
      const j = (await r.json()) as { verdict: Verdict; feedback: string };
      verdict = j.verdict; fb = j.feedback || "";
    } catch {
      const lc = local(a, v); verdict = lc.verdict; fb = lc.feedback;
    }
    setState(verdict); setFeedback(fb); setBusy(false); setShowAns(true); setLocked(true);
    saveSynth(unitId, synthId, { grade: toGrade[verdict], response: v, feedback: fb, canonicalAnswer: a });
  }, [q, a, saveSynth, unitId, synthId]);

  const tryAgain = useCallback(() => {
    clearSynth(unitId, synthId);
    setState("idle"); setFeedback(""); setShowAns(false); setLocked(false);
    if (taRef.current) { taRef.current.value = ""; taRef.current.focus(); }
  }, [clearSynth, unitId, synthId]);

  const cls = state === "correct" ? "v-ok" : state === "partial" ? "v-mid" : "v-no";
  const label = state === "correct" ? "Got it" : state === "partial" ? "Close" : "Not quite";

  return (
    <div className="synth">
      <div className="lab">recall</div>
      <div className="q">{q}</div>
      <div className="body">
        <textarea
          ref={taRef}
          placeholder="A sentence is plenty."
          disabled={locked}
          onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") grade(); }}
        />
        {!locked && (
          <div className="row">
            <button className="btn" disabled={busy} onClick={grade}>{busy ? "Checking" : "Check"}</button>
            <button className="linkbtn" onClick={() => setShowAns(true)}>Show answer</button>
            <span className="hint">⌘/Ctrl+Enter</span>
          </div>
        )}
        <div className="vd">
          {state !== "idle" && (
            <>
              <span className={"tag " + cls}>{label}</span>
              {feedback && <div className="fb">{feedback}</div>}
            </>
          )}
          {showAns && <div className="ans">{a}</div>}
          {locked && (
            <button className="linkbtn" onClick={tryAgain} style={{ marginTop: 10 }}>Try again</button>
          )}
        </div>
      </div>
    </div>
  );
}

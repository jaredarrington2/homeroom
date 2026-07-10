"use client";
// components/ClozeProse.tsx — tier 1. Renders a concept group's paragraphs, then hydrates
// any inline `.cloze` spans into fill-in inputs. Ported from the redesign reference:
// type the value, Enter/blur checks against data-accept (normalized), correct locks to royal,
// a miss flags coral, "reveal" fills the canonical answer.
// Persistence (v3.6): correct/revealed answers are saved per (unitId, clozeId) and restored.
//
// The prose is rendered in a memoized child so that context-driven re-renders of this
// component (any debounced progress save re-renders every context consumer) never re-run
// dangerouslySetInnerHTML — which would otherwise wipe the imperatively-hydrated inputs.
import { useEffect, useRef, memo } from "react";
import type { SectionParagraph } from "@/lib/section";
import { useProgressContext } from "@/lib/ProgressContext";
import { checkAnswer } from "@/lib/answer";
import ListenMark from "./ListenMark";

const ProseHTML = memo(function ProseHTML({
  paras, unitId, groupIndex,
}: { paras: SectionParagraph[]; unitId: string; groupIndex: number }) {
  return (
    <>
      {paras.map((p, i) => {
        const segId = `audio-${unitId}-g${groupIndex}-p${i}`;
        // A paragraph carrying a real list/table can't sit inside a <p> (invalid HTML —
        // the browser would auto-close the <p>), so render block-bearing prose in a div.
        const rich = /<(ul|ol|table)\b/i.test(p.html);
        return (
          <div className="lp-seg" id={segId} key={i}>
            <ListenMark id={segId} unitId={unitId} />
            {rich ? (
              <div className="lp-rich" dangerouslySetInnerHTML={{ __html: p.html }} />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: p.html }} />
            )}
          </div>
        );
      })}
    </>
  );
});

export default function ClozeProse({
  paras, unitId, groupIndex,
}: { paras: SectionParagraph[]; unitId: string; groupIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { getCloze, saveCloze, loaded } = useProgressContext();
  // Latest save/get in a ref so listeners attached once never go stale.
  const api = useRef({ getCloze, saveCloze });
  api.current = { getCloze, saveCloze };

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>(".cloze").forEach((span, n) => {
      const clozeId = `${unitId}-cloze-${groupIndex}-${n}`;
      const reveal = span.dataset.reveal || "";
      const lock = (txt: string) => { span.innerHTML = `<span class="filled">${txt}</span>`; };

      if (!span.dataset.hydrated) {
        span.dataset.hydrated = "1";
        let accept: string[] = [];
        try { accept = JSON.parse(span.dataset.accept || "[]"); } catch { /* leave empty */ }
        span.innerHTML = `<input size="6" aria-label="fill in the blank" autocomplete="off" /><span class="rev">reveal</span>`;
        const input = span.querySelector("input") as HTMLInputElement;
        const rev = span.querySelector(".rev") as HTMLElement;
        const check = () => {
          const value = input.value.trim();
          if (checkAnswer(input.value, accept)) {
            lock(value);
            api.current.saveCloze(unitId, clozeId, { value, correct: true, revealed: false });
          } else {
            input.classList.add("wrong");
          }
        };
        input.addEventListener("keydown", (e) => {
          if ((e as KeyboardEvent).key === "Enter") { e.preventDefault(); check(); }
        });
        input.addEventListener("input", () => input.classList.remove("wrong"));
        input.addEventListener("blur", () => { if (input.value.trim()) check(); });
        rev.addEventListener("click", () => {
          lock(reveal);
          api.current.saveCloze(unitId, clozeId, { value: reveal, correct: false, revealed: true });
        });
      }

      // Restore once progress is loaded (idempotent).
      if (loaded && !span.dataset.restored) {
        const saved = api.current.getCloze(unitId, clozeId);
        if (saved && (saved.correct || saved.revealed)) {
          span.dataset.restored = "1";
          lock(saved.value);
        }
      }
    });
  }, [loaded, unitId, groupIndex]);

  return (
    <div ref={ref}>
      <ProseHTML paras={paras} unitId={unitId} groupIndex={groupIndex} />
    </div>
  );
}

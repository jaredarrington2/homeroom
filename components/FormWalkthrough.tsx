"use client";

// components/FormWalkthrough.tsx — guided, one-field-at-a-time walkthrough of a real
// government loan form. A single royal highlight glides region to region as the reader steps
// with Back/Next; everything else dims. An eye icon un-dims the whole form for free reading.
// In-session state only (no persistence) — same precedent as flashcard flips / RecapCard.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import LeForm from "./forms/LeForm";
import CdForm from "./forms/CdForm";
import { leWalk } from "@/content/forms/le";
import { cdWalk } from "@/content/forms/cd";
import type { FormWalkthroughData } from "@/content/forms/types";

const DATA: Record<"le" | "cd", FormWalkthroughData> = { le: leWalk, cd: cdWalk };
const PAD = 6;

function EyeIcon() {
  return (
    <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  );
}
function FocusIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
    </>
  );
}

export default function FormWalkthrough({ form }: { form: "le" | "cd" }) {
  const data = DATA[form];
  const steps = data.steps;
  const [i, setI] = useState(0);
  const [guided, setGuided] = useState(true);
  const docRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  const positionSpot = useCallback(() => {
    const doc = docRef.current;
    const spot = spotRef.current;
    if (!doc || !spot) return;
    if (!guided) {
      spot.style.opacity = "0";
      return;
    }
    const active = doc.querySelector<HTMLElement>(`.region[data-r="${steps[i].region}"]`);
    if (!active) return;
    const dr = doc.getBoundingClientRect();
    const rr = active.getBoundingClientRect();
    spot.style.top = rr.top - dr.top - PAD + "px";
    spot.style.left = rr.left - dr.left - PAD + "px";
    spot.style.width = rr.width + PAD * 2 + "px";
    spot.style.height = rr.height + PAD * 2 + "px";
    spot.style.opacity = "1";
  }, [guided, i, steps]);

  // mark the active region + move the highlight after every step / mode change
  useLayoutEffect(() => {
    const doc = docRef.current;
    if (!doc) return;
    const target = String(steps[i].region);
    doc.querySelectorAll<HTMLElement>(".region").forEach((el) => {
      el.classList.toggle("on", guided && el.getAttribute("data-r") === target);
    });
    positionSpot();
  }, [i, guided, steps, positionSpot]);

  // center the active region on a user step — but never yank the page on first render
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!guided) return;
    docRef.current
      ?.querySelector<HTMLElement>(`.region[data-r="${steps[i].region}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [i, guided, steps]);

  // keep the highlight aligned across resize + after webfonts settle (they shift metrics)
  useEffect(() => {
    const onResize = () => positionSpot();
    window.addEventListener("resize", onResize);
    const t1 = setTimeout(positionSpot, 250);
    const t2 = setTimeout(positionSpot, 800);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [positionSpot]);

  const s = steps[i];
  const FormBody = form === "le" ? LeForm : CdForm;
  const freeLabel = guided ? "See the whole form" : "Back to the walkthrough";

  return (
    <div className="fw">
      <div className="fw-hd">
        <div>
          <p className="fw-appttl">
            {data.label} — page {s.page}
          </p>
          <span className="fw-appsub">{data.sub}</span>
        </div>
        <button
          type="button"
          className="fw-icon"
          aria-pressed={!guided}
          aria-label={freeLabel}
          title={freeLabel}
          onClick={() => setGuided((g) => !g)}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {guided ? <EyeIcon /> : <FocusIcon />}
          </svg>
        </button>
      </div>

      <div ref={docRef} className={"fw-doc" + (guided ? " guided" : "")}>
        <div ref={spotRef} className="fw-spot" aria-hidden="true" />
        <FormBody />
      </div>

      {guided && (
        <div className="fw-cap">
          <div className="fw-prog">
            <div className="fw-dots">
              {steps.map((_, k) => (
                <span key={k} className={"fw-dot" + (k < i ? " done" : k === i ? " on" : "")} />
              ))}
            </div>
            <div className="fw-count">
              {i + 1} of {steps.length}
            </div>
          </div>
          <p className="fw-ttl">{s.title}</p>
          <p className="fw-body">{s.body}</p>
          {s.tell && <p className="fw-tell" dangerouslySetInnerHTML={{ __html: s.tell }} />}
          <div className="fw-row">
            <button type="button" className="fw-btn back" disabled={i === 0} onClick={() => setI((v) => Math.max(0, v - 1))}>
              Back
            </button>
            <button type="button" className="fw-btn next" onClick={() => setI((v) => Math.min(steps.length - 1, v + 1))}>
              {i === steps.length - 1 ? "Done" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

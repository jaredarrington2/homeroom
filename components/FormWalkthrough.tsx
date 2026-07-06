"use client";

// components/FormWalkthrough.tsx — guided, one-field-at-a-time walkthrough of a real
// government loan form. A single royal highlight glides region to region as the reader steps
// with Back/Next; everything else dims. An eye icon un-dims the whole form for free reading.
// Multi-page forms (the Closing Disclosure) add a minimalist arrow pager; each page has its own
// ordered steps. In-session state only (no persistence) — same precedent as flashcard flips.
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import LeForm from "./forms/LeForm";
import CdForm from "./forms/CdForm";
import { leWalk } from "@/content/forms/le";
import { cdWalk } from "@/content/forms/cd";
import type { FormWalkthroughData } from "@/content/forms/types";

const DATA: Record<"le" | "cd", FormWalkthroughData> = { le: leWalk, cd: cdWalk };
const PAD = 6;
// minimum right-gutter width (px) before the caption floats into the margin instead of the bottom
const MARGIN_MIN = 300;

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
  const [page, setPage] = useState(1);
  const [i, setI] = useState(0);
  const [guided, setGuided] = useState(true);
  // caption layout: 'margin' floats a fixed card in the right gutter on wide screens;
  // 'bottom' is the sticky-bottom fallback for narrow viewports (and mobile).
  const [cap, setCap] = useState<{ mode: "margin" | "bottom"; left: number; width: number }>({
    mode: "bottom",
    left: 0,
    width: 0,
  });
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);
  const pageMount = useRef(false);

  const pageSteps = useMemo(() => data.steps.filter((st) => st.page === page), [data.steps, page]);
  const step = pageSteps[Math.min(i, pageSteps.length - 1)] ?? pageSteps[0];

  // pick caption placement from the room to the right of the form
  const measureCaption = useCallback(() => {
    const doc = docRef.current;
    if (!doc) return;
    const r = doc.getBoundingClientRect();
    const rightMargin = window.innerWidth - r.right;
    if (rightMargin >= MARGIN_MIN) {
      setCap({ mode: "margin", left: Math.round(r.right + 24), width: Math.min(330, Math.round(rightMargin - 40)) });
    } else {
      setCap((c) => (c.mode === "bottom" ? c : { mode: "bottom", left: 0, width: 0 }));
    }
  }, []);

  const positionSpot = useCallback(() => {
    const doc = docRef.current;
    const spot = spotRef.current;
    if (!doc || !spot) return;
    if (!guided || !step) {
      spot.style.opacity = "0";
      return;
    }
    const active = doc.querySelector<HTMLElement>(`.region[data-r="${step.region}"]`);
    if (!active) return;
    const dr = doc.getBoundingClientRect();
    const rr = active.getBoundingClientRect();
    spot.style.top = rr.top - dr.top - PAD + "px";
    spot.style.left = rr.left - dr.left - PAD + "px";
    spot.style.width = rr.width + PAD * 2 + "px";
    spot.style.height = rr.height + PAD * 2 + "px";
    spot.style.opacity = "1";
  }, [guided, step]);

  // mark the active region + move the highlight after every step / page / mode change
  useLayoutEffect(() => {
    const doc = docRef.current;
    if (!doc) return;
    const target = step ? String(step.region) : "";
    doc.querySelectorAll<HTMLElement>(".region").forEach((el) => {
      el.classList.toggle("on", guided && el.getAttribute("data-r") === target);
    });
    positionSpot();
  }, [guided, step, positionSpot]);

  // center the active region on a user step — but never yank the page on first render
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!guided || !step) return;
    docRef.current
      ?.querySelector<HTMLElement>(`.region[data-r="${step.region}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [guided, step]);

  // on a page turn, bring the top of the form back into view
  useEffect(() => {
    if (!pageMount.current) {
      pageMount.current = true;
      return;
    }
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  // keep the highlight aligned + the caption placement current across resize and after
  // webfonts settle (they shift metrics)
  useEffect(() => {
    const onResize = () => {
      positionSpot();
      measureCaption();
    };
    onResize();
    window.addEventListener("resize", onResize);
    const t1 = setTimeout(onResize, 250);
    const t2 = setTimeout(onResize, 800);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [positionSpot, measureCaption]);

  // the margin card is position:fixed, so it can't self-hide on scroll — gate it on the
  // walkthrough being in view (the bottom card is sticky and self-gates)
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function goPage(p: number) {
    setPage(p);
    setI(0);
  }

  const FormBody = form === "le" ? LeForm : CdForm;
  const freeLabel = guided ? "See the whole form" : "Back to the walkthrough";
  const lastStep = pageSteps.length - 1;

  return (
    <div className="fw" ref={rootRef}>
      <div className="fw-hd">
        <div>
          <p className="fw-appttl">{data.label}</p>
          <span className="fw-appsub">{data.sub}</span>
        </div>
        <div className="fw-hd-right">
          {data.pageCount > 1 && (
            <div className="fw-pager">
              <button type="button" className="fw-arrow" aria-label="Previous page" disabled={page === 1} onClick={() => goPage(page - 1)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="fw-pagenum">Page {page} of {data.pageCount}</span>
              <button type="button" className="fw-arrow" aria-label="Next page" disabled={page === data.pageCount} onClick={() => goPage(page + 1)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
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
      </div>

      <div ref={docRef} className={"fw-doc" + (guided ? " guided" : "")}>
        <div ref={spotRef} className="fw-spot" aria-hidden="true" />
        <FormBody page={page} />
      </div>

      {guided && step && (
        <div
          className={
            "fw-cap" +
            (cap.mode === "margin" ? " fw-cap-margin" : "") +
            (cap.mode === "margin" && !inView ? " fw-cap-off" : "")
          }
          style={cap.mode === "margin" ? { left: cap.left, width: cap.width } : undefined}
        >
          <div className="fw-prog">
            <div className="fw-dots">
              {pageSteps.map((_, k) => (
                <span key={k} className={"fw-dot" + (k < i ? " done" : k === i ? " on" : "")} />
              ))}
            </div>
            <div className="fw-count">
              {i + 1} of {pageSteps.length}
            </div>
          </div>
          <p className="fw-ttl">{step.title}</p>
          <p className="fw-body">{step.body}</p>
          {step.tell && <p className="fw-tell" dangerouslySetInnerHTML={{ __html: step.tell }} />}
          <div className="fw-row">
            <button type="button" className="fw-btn back" disabled={i === 0} onClick={() => setI((v) => Math.max(0, v - 1))}>
              Back
            </button>
            <button type="button" className="fw-btn next" disabled={i >= lastStep} onClick={() => setI((v) => Math.min(lastStep, v + 1))}>
              {i >= lastStep ? "Done" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

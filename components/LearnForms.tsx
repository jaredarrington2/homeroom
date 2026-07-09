'use client';
// components/LearnForms.tsx
// Module 6 — "Learn the forms." Client shell for the in-tab learning experience. Renders the two
// static screens (home + lesson) and hands the scoped root to initLearnForms, which fills them
// imperatively (the ClozeProse precedent). In-session state only — progress isn't persisted.
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initLearnForms } from '@/lib/module6/learnForms';

export default function LearnForms() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current || !rootRef.current) return;
    inited.current = true;
    return initLearnForms(rootRef.current);
  }, []);

  return (
    <div className="learn-forms" ref={rootRef}>
      <div className="wrap">
        <div id="screen-home">
          <header className="masthead">
            <h1>Learn the forms</h1>
            <p className="lede">The URLA is <b>six separate forms</b>, not one: the borrower’s, the
              co-borrower’s, the unmarried addendum, the lender’s, a continuation sheet, and the SCIF.</p>
          </header>
          <div id="uphere" />
          <div className="trail hide" id="trail" />
          <div className="outline">
            <button className="olink" id="otoggle" type="button">See what&apos;s covered</button>
            <div className="obody" id="obody" />
          </div>
          <footer>
            <p>Progress isn&apos;t saved. Reloading starts you over.</p>
            <p className="lf-xlink">
              Looking up one field or form? <Link href="/learn/mlo-activities/explorer">Open the form explorer →</Link>
            </p>
          </footer>
        </div>

        <div id="screen-lesson" className="hide">
          <div className="lhead">
            <button className="quit" id="quit" type="button" aria-label="Leave this lesson">×</button>
          </div>
          <div id="fhead" />
          <div className="seclist" id="seclist" />
          <div className="practice" id="practice" />
        </div>
      </div>
    </div>
  );
}

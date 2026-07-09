'use client';
// components/FormExplorer.tsx
// Module 6 — the form explorer (lookup companion to "Learn the forms"). Renders the static shell
// (masthead + tabs + three panes) and hands the scoped root to initFormExplorer, which fills the
// rail, sheet, confusables, and drill imperatively.
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initFormExplorer } from '@/lib/module6/formExplorer';

export default function FormExplorer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current || !rootRef.current) return;
    inited.current = true;
    return initFormExplorer(rootRef.current);
  }, []);

  return (
    <div className="form-explorer" ref={rootRef}>
      <div className="wrap">
        <header className="masthead">
          <p className="kicker">Module 6 · form explorer</p>
          <h1>The forms</h1>
          <p className="lede">Nine forms, forty-two sections. The URLA alone is <b>six separate forms</b>,
            and knowing which one a fact belongs on is most of the skill. Browse them, then drill
            yourself on where each field goes.</p>
        </header>

        <div className="tabs">
          <button className="tab on" data-tab="explore" type="button">Explore</button>
          <button className="tab" data-tab="confuse" type="button">Easily confused</button>
          <button className="tab" data-tab="drill" type="button">Drill</button>
        </div>

        <div id="pane-explore">
          <div className="cols">
            <nav className="rail" id="rail"><p className="railhead">the forms</p></nav>
            <main id="sheet" />
          </div>
        </div>

        <div id="pane-confuse" className="hide">
          <div className="conf" id="conf" />
        </div>

        <div id="pane-drill" className="hide">
          <div className="drill">
            <div className="dcard">
              <div className="dhead"><span className="dh">where does it go?</span><span className="dsc" id="dsc">0 / 0</span></div>
              <div className="dbody">
                <p className="dq" id="dq">this belongs in which section?</p>
                <p className="dfield" id="dfield" />
                <p className="dform" id="dform" />
                <div id="dopts" />
                <div className="dfb" id="dfb"><div className="teach" id="dteach" /><button className="btn" id="dnext" type="button">Next field</button></div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <p>Every field, rule, and trap is taken from Module 6’s own description of the form. Where the
            module states a number — <b>25%</b> ownership, <b>two years</b> of history, <b>75%</b> of
            gross rent, <b>12 months</b> of counseling, <b>five years</b> of leasehold — the number is
            reproduced, not paraphrased.</p>
          <p className="fx-xlink"><Link href="/learn/mlo-activities">← Back to Learn the forms</Link></p>
        </footer>
      </div>
    </div>
  );
}

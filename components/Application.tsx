'use client';
// components/Application.tsx
// Module 6 — Stage 1: the Application. A story-driven reader for the Borrower
// Information Form, taught through one worked borrower (Maya Okonkwo). Nothing is
// gated: the whole form is open, her answers are filled in, and you can switch her
// off to read it blank. The ninth scoped skeuomorphic surface (.application),
// ported from the stage-1 preview (stage1-preview.html), which is the visual +
// interaction ground truth. In-session state only; nothing is persisted.
import { useEffect, useMemo, useRef, useState } from 'react';
import RecapCard from '@/components/RecapCard';
import { FORMS, type SectionDef } from '@/content/module6/forms';
import {
  CALLOUTS,
  CHAPTERS,
  HEROES,
  MAYA,
  MAYA_BEAT,
  MAYA_INTRO,
  RECAP,
  SCENARIOS,
  STUDY,
  type HeroDef,
  type Scenario,
  type StudyPair,
} from '@/content/module6/application';

const BORROWER = FORMS.find(f => f.id === 'borrower')!;
const SEC: Record<string, SectionDef> = Object.fromEntries(
  BORROWER.sections.map(s => [s.id, s]),
);

// ---- field control renderer (ported from build_stage1.py field_html) ----
type FieldKind = 'sign' | 'yesno' | 'checks' | 'group' | 'line';

function fkind(t: string): FieldKind {
  const s = t.trim();
  if (/signature|signs and dates|sign and date/i.test(s)) return 'sign';
  if (/^(Does|Is|Are|Will|Has|Have|Do|Any|Could|Whether)\b/i.test(s) || s.endsWith('?')) return 'yesno';
  if (s.includes(':')) {
    const after = s.slice(s.indexOf(':') + 1);
    const parts = after.split(/,\s*| or /).filter(x => x.trim());
    if (parts.length >= 2) return 'checks';
  }
  if ((s.match(/,/g) || []).length >= 2) return 'group';
  return 'line';
}
const cap = (s: string) => s.slice(0, 1).toUpperCase() + s.slice(1);

// Wordless callout affordance on a field with an extra rule/trap: an info dot that
// reveals the note on hover/focus (desktop) or tap (mobile). No visible label text.
function FieldNote({ note }: { note: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className={`fnote${open ? ' open' : ''}`}>
      <button
        type="button"
        className="fnote-dot"
        aria-label={`Callout: ${note}`}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="6.6" />
          <line x1="8" y1="7.2" x2="8" y2="11.2" />
          <circle cx="8" cy="4.7" r="0.5" />
        </svg>
      </button>
      <span className="ftip" role="tooltip">{note}</span>
    </span>
  );
}

function FieldRow({ field, value, note }: { field: string; value?: string; note?: string }) {
  const kind = fkind(field);
  const has = value != null;
  const filled = has ? ' filled' : '';

  if (kind === 'yesno') {
    let q = field.trim();
    if (/^Whether/i.test(q)) q = cap(q.replace(/^Whether\s+/i, ''));
    if (!q.endsWith('?')) q += '?';
    const v = (value ?? '').toLowerCase();
    const markY = has && (v.startsWith('y') || v.startsWith('female') || v.startsWith('not hispanic'));
    const markN = has && (v.startsWith('n') || v.startsWith('does not'));
    return (
      <div className={`frow yn${filled}`}>
        <span className="fq">{q}{note && <FieldNote note={note} />}</span>
        <span className="ynb"><i className={`box${markY ? ' on' : ''}`} />Yes</span>
        <span className="ynb"><i className={`box${markN ? ' on' : ''}`} />No</span>
        {has && !markY && !markN && <span className="ink">{value}</span>}
      </div>
    );
  }
  if (kind === 'checks') {
    const label = field.slice(0, field.indexOf(':')).trim();
    return (
      <div className={`frow${filled}`}>
        <span className="flabel">{label}{note && <FieldNote note={note} />}</span>
        {has ? <span className="ink">{value}</span> : <span className="fline" />}
      </div>
    );
  }
  if (kind === 'sign') {
    return (
      <div className={`frow sign${filled}`}>
        <span className="flabel">{field}{note && <FieldNote note={note} />}</span>
        {has ? (
          <span className="ink script">{value}</span>
        ) : (
          <span className="fline tall"><b>&times;</b></span>
        )}
      </div>
    );
  }
  // group and line render the same way
  return (
    <div className={`frow${filled}`}>
      <span className="flabel">{field}{note && <FieldNote note={note} />}</span>
      {has ? <span className="ink">{value}</span> : <span className="fline" />}
    </div>
  );
}

function bandNo(name: string) {
  const p = name.split('·');
  return p.length > 1 ? p[0].trim() : '';
}
function bandName(name: string) {
  const p = name.split('·');
  return (p.length > 1 ? p[1] : p[0]).trim();
}

// notes: only passed in the chapter walkthrough (the teaching context), not the
// full-form overview — the overview scrolls inside a clipped frame where a popover
// would be cut off, and the callouts belong with the story, not the reference dump.
function FormSection({ sid, notes }: { sid: string; notes?: Record<string, string> }) {
  const s = SEC[sid];
  if (!s) return null;
  const vals = MAYA[sid] || {};
  return (
    <div className="sec" data-sec={sid}>
      <div className="band">
        <span className="bn">{bandNo(s.name)}</span>
        <span className="bt">{bandName(s.name)}</span>
      </div>
      <div className="fields">
        {s.fields.map((f, i) => (
          <FieldRow key={i} field={f} value={vals[f]} note={notes?.[f]} />
        ))}
      </div>
    </div>
  );
}

// ---- the complete-form overview, with a section pager ----
function FullForm() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const idxRef = useRef(0);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const secs = Array.from(frame.querySelectorAll<HTMLElement>('.sec'));
    if (!secs.length) return;
    const name = (el: HTMLElement) => {
      const bn = el.querySelector('.bn')?.textContent?.trim() || '';
      const bt = el.querySelector('.bt')?.textContent?.trim() || '';
      return (bn ? bn + ' · ' : '') + bt;
    };
    const setFor = (n: number) => {
      const i = Math.max(0, Math.min(secs.length - 1, n));
      idxRef.current = i;
      setLabel(`${name(secs[i])}  —  ${i + 1} / ${secs.length}`);
      return i;
    };
    setFor(0);
    const show = (n: number) => {
      const i = setFor(n);
      frame.scrollTo({ top: secs[i].offsetTop - secs[0].offsetTop, behavior: 'smooth' });
    };
    const prev = () => show(idxRef.current - 1);
    const next = () => show(idxRef.current + 1);
    const prevBtn = frame.parentElement?.querySelector<HTMLButtonElement>('.pg-prev');
    const nextBtn = frame.parentElement?.querySelector<HTMLButtonElement>('.pg-next');
    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const top = frame.scrollTop;
        let best = 0;
        secs.forEach((sc, k) => {
          if (sc.offsetTop - secs[0].offsetTop <= top + 8) best = k;
        });
        setFor(best);
      }, 90);
    };
    frame.addEventListener('scroll', onScroll);
    return () => {
      prevBtn?.removeEventListener('click', prev);
      nextBtn?.removeEventListener('click', next);
      frame.removeEventListener('scroll', onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <section className="overview">
      <div className="ov-head">
        <div>
          <p className="ov-eyebrow">The complete form</p>
          <h2 className="ov-title">Borrower Information Form</h2>
        </div>
        <p className="ov-note">
          Its twenty-one sections group into <b>seven questions about a person</b>. Flip through the whole
          thing, or scroll past to the walkthrough.
        </p>
      </div>
      <div className="ov-pager">
        <button className="pg-arrow pg-prev" type="button" aria-label="Previous section">&lsaquo;</button>
        <span className="pg-label">{label}</span>
        <button className="pg-arrow pg-next" type="button" aria-label="Next section">&rsaquo;</button>
      </div>
      <div className="fullform" ref={frameRef}>
        {BORROWER.sections.map(s => (
          <FormSection key={s.id} sid={s.id} />
        ))}
      </div>
    </section>
  );
}

// ---- judgment call: stable-shuffled options, grade on click, reveal teach ----
function hashStr(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return h;
}
function stableShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = (seed >>> 0) || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function JudgmentCall({ scenario }: { scenario: Scenario }) {
  const options = useMemo(() => {
    const opts = [
      { text: scenario.right, right: true },
      ...scenario.wrong.map(w => ({ text: w, right: false })),
    ];
    return stableShuffle(opts, hashStr(scenario.stem));
  }, [scenario]);
  const [done, setDone] = useState(false);
  const [wrongPicks, setWrongPicks] = useState<Set<number>>(new Set());

  return (
    <div className="judgment">
      <p className="complabel">A judgment call</p>
      <p className="stem">{scenario.stem}</p>
      <div className="opts">
        {options.map((o, i) => {
          const isWrong = wrongPicks.has(i);
          const isRight = done && o.right;
          const cls = `opt${isRight ? ' right' : ''}${isWrong ? ' wrong' : ''}`;
          return (
            <button
              key={i}
              type="button"
              className={cls}
              disabled={done || isWrong}
              onClick={() => {
                if (done) return;
                if (o.right) setDone(true);
                else setWrongPicks(prev => new Set(prev).add(i));
              }}
            >
              {o.text}
            </button>
          );
        })}
      </div>
      {done && <div className="teach show">{scenario.teach}</div>}
    </div>
  );
}

// ---- study cards: ruled index-card faces, flip to the rule ----
function StudyCardFace({ card }: { card: StudyPair }) {
  const [flip, setFlip] = useState(false);
  return (
    <button
      className={`scard${flip ? ' flip' : ''}`}
      type="button"
      aria-label={flip ? `Answer: ${card.back}` : `Study card: ${card.front} — tap to flip`}
      onClick={() => setFlip(f => !f)}
    >
      <span className="sc-face sc-front">
        <span className="sc-front-inner">
          <span className="sc-q">{card.front}</span>
          <span className="sc-hint" aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <path d="M4 10a6 6 0 0 1 10.4-4.2M16 10a6 6 0 0 1-10.4 4.2" />
              <path d="M14.4 3.6v3h-3M5.6 16.4v-3h3" />
            </svg>
          </span>
        </span>
      </span>
      <span className="sc-face sc-back">
        <span className="sc-back-inner">
          <span className="sc-a-label">answer</span>
          <span className="sc-a">{card.back}</span>
        </span>
      </span>
    </button>
  );
}

function StudyDeck({ cards }: { cards: StudyPair[] }) {
  if (!cards.length) return null;
  return (
    <div className="studywrap">
      <p className="complabel">Study cards</p>
      <div className="studydeck">
        {cards.map((c, i) => (
          <StudyCardFace key={i} card={c} />
        ))}
      </div>
    </div>
  );
}

function Hero({ hero }: { hero?: HeroDef }) {
  if (!hero) return null;
  const src = `/characters/${hero.file}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`hero ${hero.side}`}
      src={src}
      alt=""
      style={{ ['--u' as string]: `url(${src})`, shapeOutside: `var(--u)` }}
    />
  );
}

// "Borrower Information Form · §1b–1e" — mirrors the design spec's own section notation.
function regFor(secs: string[]) {
  const range = secs.length > 1 ? `§${secs[0]}–${secs[secs.length - 1]}` : `§${secs[0]}`;
  return `Borrower Information Form · ${range}`;
}

function Chapter({ index }: { index: number }) {
  const chDef = CHAPTERS[index];
  const num = index + 1;
  const scenarios = SCENARIOS.filter(s => s.chapter === chDef.id);
  return (
    <section className="chapter" id={chDef.id}>
      <div className="chhead">
        <p className="cheyebrow">Maya’s application</p>
        <div className="chline">
          <span className="chnum">{num}</span>
          <h2 className="chtitle">{chDef.q}</h2>
        </div>
      </div>
      <div className="intro">
        <Hero hero={HEROES[chDef.id]} />
        <p>{chDef.intro}</p>
      </div>
      <div className="beat">
        <span className="beat-tag">following maya</span>
        {MAYA_BEAT[chDef.id]}
      </div>
      <div className="form">
        {chDef.secs.map(sid => (
          <FormSection key={sid} sid={sid} notes={CALLOUTS[sid]} />
        ))}
      </div>
      {scenarios.map((s, i) => (
        <JudgmentCall key={i} scenario={s} />
      ))}
      <StudyDeck cards={STUDY[chDef.id] || []} />
      <div className="chapter-foot">
        <RecapCard
          unitName={chDef.q}
          reg={regFor(chDef.secs)}
          recap={RECAP[chDef.id]}
          unitId={chDef.stickerId}
        />
      </div>
    </section>
  );
}

export default function Application() {
  const [following, setFollowing] = useState(true);
  return (
    <div className={`application${following ? ' following' : ''}`}>
      <div className="wrap">
        <header className="masthead">
          <p className="kicker">Stage 1 · Application</p>
          <h1>Maya’s application</h1>
          <p className="dek">
            A first-time buyer, one application, filled out end to end. Her answers are written in; switch her
            off to read the blank form.
          </p>
          <div className="mayacard">
            <Hero hero={HEROES.hero_form} />
            <p className="mc-label">The borrower</p>
            <p className="mc-body">{MAYA_INTRO}</p>
          </div>
        </header>

        <FullForm />

        <div className="followbar">
          <div
            className="follow-seg"
            role="group"
            aria-label="Follow Maya — show her answers written into the form, or read it blank"
          >
            <button
              type="button"
              className={`fs-btn${!following ? ' active' : ''}`}
              aria-pressed={!following}
              title="Read the blank form"
              onClick={() => setFollowing(false)}
            >
              {/* blank form: ruled, unwritten */}
              <svg viewBox="0 0 22 24" aria-hidden="true">
                <rect x="3.2" y="2.2" width="15.6" height="19.6" rx="1.3" />
                <line x1="6.4" y1="8" x2="15.6" y2="8" />
                <line x1="6.4" y1="12" x2="15.6" y2="12" />
                <line x1="6.4" y1="16" x2="12.8" y2="16" />
              </svg>
            </button>
            <button
              type="button"
              className={`fs-btn${following ? ' active' : ''}`}
              aria-pressed={following}
              title="Follow Maya — her answers written into the form"
              onClick={() => setFollowing(true)}
            >
              {/* filled form: her answers inked in */}
              <svg viewBox="0 0 22 24" aria-hidden="true">
                <rect x="3.2" y="2.2" width="15.6" height="19.6" rx="1.3" />
                <path d="M6.4 8c1-1.4 2 1.4 3 0s2-1.4 3 0 2 1.4 3 0" />
                <path d="M6.4 12c1-1.4 2 1.4 3 0s2-1.4 3 0 2 1.4 3 0" />
                <path d="M6.4 16c.8-1.2 1.7 1.2 2.5 0s1.7-1.2 2.5 0" />
              </svg>
            </button>
          </div>
          <nav className="toc">
            {CHAPTERS.map((c, i) => (
              <a key={c.id} href={`#${c.id}`}>{i + 1}</a>
            ))}
          </nav>
        </div>

        <div className="walk-lead">
          <p className="wl-eyebrow">The walkthrough</p>
          <h2 className="wl-title">Seven questions about Maya</h2>
          <p className="wl-sub">
            The same form, one part at a time — what each captures, where the rules bite, and how her answers land.
          </p>
        </div>

        {CHAPTERS.map((_, i) => (
          <Chapter key={i} index={i} />
        ))}

        <footer className="app-foot">
          <p>
            Study cards and recap cards will feed the review deck; nothing here is saved between visits.{' '}
            <a href="/learn/mlo-activities">Back to Learn the forms →</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

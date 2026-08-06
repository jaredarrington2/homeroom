'use client';
// components/home/HomeLanding.tsx — the signed-out landing page at /.
//
// Three pieces of it move on their own: the cloze blank the visitor can actually fill, the
// short-answer demo that types itself out, and the pricing-engine calculator that works the
// LTV. The two self-running ones start on an IntersectionObserver and loop on a long gap, so
// nothing animates off-screen. Everything below is scoped by home.module.css.
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './home.module.css';

const CLOZE_ANSWER = '78';
const TYPED_ANSWER =
  "Because by then there's enough equity that the lender could sell the house and still get " +
  "its money back, so it doesn't need the insurance.";
const SPEEDS = [1, 1.25, 1.5, 0.75];
const CALC_SEQ = ['3', '1', '2', '0', '0', '0', '÷', '3', '9', '0', '0', '0', '0', '='];
const TYPE_LOOP_GAP = 78000; // ~78s between passes
const CALC_LOOP_GAP = 62000;

const comma = (s: string) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const rateLabel = (s: number) => s.toFixed(2).replace(/0$/, '').replace(/\.$/, '.0');
const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- interactive reading */

function ReadingDemo() {
  const [value, setValue] = useState('');
  const [mark, setMark] = useState<'idle' | 'right' | 'wrong'>('idle');
  const settled = mark === 'right';

  function check() {
    if (settled) return;
    const val = value.trim().replace(/%$/, '');
    if (!val) return;
    setMark(val === CLOZE_ANSWER ? 'right' : 'wrong');
  }

  function reveal() {
    setValue(CLOZE_ANSWER);
    setMark('right');
  }

  return (
    <div className={styles.demo}>
      <p className={styles.prose}>
        The lender has to cancel it unasked once the balance reaches{' '}
        <span className={styles.cloze}>
          <input
            className={[styles.blank, mark === 'right' ? styles.isRight : '', mark === 'wrong' ? styles.isWrong : '']
              .filter(Boolean)
              .join(' ')}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            aria-label="Fill in the blank"
            value={value}
            readOnly={settled}
            onChange={(e) => {
              setValue(e.target.value);
              // Dropping the class and re-adding it is what replays the shake.
              setMark((m) => (m === 'wrong' ? 'idle' : m));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                check();
              }
            }}
            onBlur={check}
          />
          <span className={styles.pct}>%</span>
          <span className={`${styles.tick} ${settled ? styles.tickIn : ''}`} aria-hidden="true">
            ✓
          </span>
          {!settled && (
            <button className={styles.reveal} type="button" onClick={reveal}>
              reveal
            </button>
          )}
        </span>{' '}
        of the home&apos;s original value.
      </p>
      <Narration />
    </div>
  );
}

function Narration() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);
  const [speed, setSpeed] = useState(0);

  function paint() {
    const audio = audioRef.current;
    if (!audio) return;
    setPct(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play().catch(() => {});
    else audio.pause();
  }

  function seek(e: React.MouseEvent<HTMLSpanElement>) {
    const audio = audioRef.current;
    const track = trackRef.current;
    if (!audio || !track || !audio.duration) return;
    const r = track.getBoundingClientRect();
    audio.currentTime = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1) * audio.duration;
    paint();
  }

  function cycleRate() {
    const next = (speed + 1) % SPEEDS.length;
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  }

  return (
    <div className={styles.player}>
      <audio
        ref={audioRef}
        preload="none"
        src="/home/pmi-narration.mp3"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={paint}
        onLoadedMetadata={paint}
        onEnded={() => {
          if (audioRef.current) audioRef.current.currentTime = 0;
          paint();
        }}
      />
      <button
        className={`${styles.play} ${playing ? styles.isPlaying : ''}`}
        type="button"
        aria-label={playing ? 'Pause' : 'Play'}
        onClick={toggle}
      >
        <i />
      </button>
      <span className={styles.track} ref={trackRef} onClick={seek}>
        <i style={{ width: `${pct}%` }} />
        <b style={{ left: `${pct}%` }} />
      </span>
      <button className={styles.rate} type="button" aria-label="Playback speed" onClick={cycleRate}>
        {rateLabel(SPEEDS[speed])}×
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------- short answer */

function ShortAnswerDemo() {
  const hostRef = useRef<HTMLDivElement>(null);
  const outRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const verdictRef = useRef<HTMLDivElement>(null);

  // Typed one character at a time straight onto the DOM node: a state update per keystroke
  // would re-render the section a few hundred times per pass for no visible gain.
  useEffect(() => {
    const host = hostRef.current;
    const out = outRef.current;
    const cursor = cursorRef.current;
    const verdict = verdictRef.current;
    if (!host || !out || !cursor || !verdict) return;

    if (prefersReduced()) {
      out.textContent = TYPED_ANSWER;
      cursor.classList.add(styles.isGone);
      verdict.classList.add(styles.verdictIn);
      return;
    }

    let timers: ReturnType<typeof setTimeout>[] = [];
    let visible = false;
    let running = false;
    let waiting = false; // finished a pass, waiting out the loop gap

    const later = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    // human-ish cadence: quick within words, slower at spaces and punctuation,
    // with the occasional pause for thought
    function pauseAfter(ch: string) {
      let d = 46 + Math.random() * 50;
      if (ch === ' ') d += 18 + Math.random() * 45;
      if (ch === ',') d += 190 + Math.random() * 130;
      if (ch === '.') d += 360 + Math.random() * 200;
      if (Math.random() < 0.055) d += 170 + Math.random() * 240;
      return d;
    }

    function step(i: number) {
      out!.textContent = TYPED_ANSWER.slice(0, i);
      if (i >= TYPED_ANSWER.length) return finish();
      later(() => step(i + 1), pauseAfter(TYPED_ANSWER.charAt(i - 1)));
    }

    function finish() {
      cursor!.classList.remove(styles.isTyping);
      later(() => verdict!.classList.add(styles.verdictIn), 850);
      waiting = true;
      running = false;
      later(() => {
        waiting = false;
        if (visible) start();
      }, TYPE_LOOP_GAP);
    }

    function start() {
      if (running || waiting) return;
      running = true;
      timers.forEach(clearTimeout);
      timers = [];
      verdict!.classList.remove(styles.verdictIn);
      out!.textContent = '';
      cursor!.classList.add(styles.isTyping);
      later(() => step(1), 500);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visible = e.isIntersecting;
          if (visible) start();
        });
      },
      { threshold: 0.55 },
    );
    io.observe(host);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={styles.demo} ref={hostRef}>
      <p className={styles.q}>
        Why is a lender willing to drop PMI once you owe less than 80% of the home&apos;s value?
      </p>
      <p className={styles.typed}>
        <span className={styles.typeStack}>
          <span className={styles.typeGhost} aria-hidden="true">
            {TYPED_ANSWER}
          </span>
          <span className={styles.typeLayer}>
            <span ref={outRef} />
            <span className={styles.typeCursor} ref={cursorRef} aria-hidden="true" />
          </span>
        </span>
      </p>
      <div className={styles.verdict} ref={verdictRef}>
        <span className={styles.pill}>Close</span>
        <p>
          Right idea. One catch — that 80% is measured against the home&apos;s original value, not
          what it&apos;s worth now.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- pricing engine */

type TapeLine = { text: string; ok?: boolean };

const CALC_KEYS = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', '=', '+'];

const RATE_ROWS = [
  { rate: '6.125%', price: '98.300', points: '1.700', payment: '$1,896' },
  { rate: '6.375%', price: '99.250', points: '0.750', payment: '$1,946' },
  { rate: '6.625%', price: '100.125', points: '−0.125', payment: '$1,998', sel: true },
  { rate: '6.875%', price: '100.875', points: '−0.875', payment: '$2,050' },
  { rate: '7.125%', price: '101.500', points: '−1.500', payment: '$2,102' },
];

function PricingSim() {
  const simRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [tape, setTape] = useState<TapeLine[]>([]);
  const [disp, setDisp] = useState('0');
  const [ltv, setLtv] = useState<string | null>(null);
  const [hit, setHit] = useState<string | null>(null);

  // Works the LTV the way a loan officer would: 312,000 ÷ 390,000, then lights the rail.
  useEffect(() => {
    const sim = simRef.current;
    if (!sim) return;

    if (prefersReduced()) {
      setOpen(true);
      setTape([
        { text: '312,000' },
        { text: '÷ 390,000' },
        { text: '= 0.8' },
        { text: '80% LTV', ok: true },
      ]);
      setDisp('0.8');
      setLtv('80%');
      return;
    }

    let timers: ReturnType<typeof setTimeout>[] = [];
    let visible = false;
    let running = false;
    let waiting = false;

    const later = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    function run() {
      let buf = '';
      let first: number | null = null;
      setTape([]);
      setDisp('0');
      setLtv(null);
      setOpen(true);

      CALC_SEQ.forEach((k, i) => {
        later(() => {
          setHit(k);
          later(() => setHit((h) => (h === k ? null : h)), 130);

          if (k === '÷') {
            first = parseFloat(buf);
            setTape([{ text: comma(buf) }, { text: '÷ ' }]);
            buf = '';
          } else if (k === '=') {
            const second = parseFloat(buf);
            const res = (first as number) / second;
            setTape([
              { text: comma(String(first)) },
              { text: `÷ ${comma(buf)}` },
              { text: `= ${res}` },
              { text: `${Math.round(res * 100)}% LTV`, ok: true },
            ]);
            setDisp(String(res));
            later(() => setLtv(`${Math.round(res * 100)}%`), 420);
          } else {
            buf += k;
            setDisp(comma(buf));
            if (first !== null) {
              setTape([{ text: comma(String(first)) }, { text: `÷ ${comma(buf)}` }]);
            }
          }
        }, 620 + i * 185);
      });

      const end = 620 + CALC_SEQ.length * 185;
      later(() => setOpen(false), end + 6500);
      running = false;
      waiting = true;
      later(() => {
        waiting = false;
        if (visible) start();
      }, end + CALC_LOOP_GAP);
    }

    function start() {
      if (running || waiting) return;
      running = true;
      timers.forEach(clearTimeout);
      timers = [];
      run();
    }

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          visible = e.isIntersecting;
          if (visible) start();
        });
      },
      { threshold: 0.4 },
    );
    io.observe(sim);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={styles.sim} ref={simRef}>
      <div className={styles.tabs}>
        <span className={styles.tab}>CRM</span>
        <span className={styles.tab}>Loan file</span>
        <span className={`${styles.tab} ${styles.tabOn}`}>Pricing engine</span>
      </div>
      <div className={styles.simBody}>
        <div className={styles.simMain}>
          <div className={styles.simHead}>
            <span>
              Purchase · <b>30-year fixed</b>
            </span>
            <span>Conventional</span>
            <span>
              Score · <b>744</b>
            </span>
          </div>
          <table className={styles.ladder}>
            <thead>
              <tr>
                <th>Rate</th>
                <th>Price</th>
                <th>Points</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {RATE_ROWS.map((r) => (
                <tr key={r.rate} className={r.sel ? styles.sel : undefined}>
                  <td>{r.rate}</td>
                  <td>{r.price}</td>
                  <td>{r.points}</td>
                  <td>{r.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.simFoot}>
            <span className={styles.locked}>Locked · 45 days · expires Sep 15</span>
            <button className={styles.ghostBtn} type="button">
              Send Loan Estimate
            </button>
          </div>
        </div>
        <aside className={styles.simRail}>
          <p className={styles.railH}>Loan file</p>
          <div className={styles.railRow}>
            <span>Loan amount</span>
            <span>$312,000</span>
          </div>
          <div className={styles.railRow}>
            <span>Value</span>
            <span>$390,000</span>
          </div>
          <div className={`${styles.railRow} ${ltv ? styles.railLit : ''}`}>
            <span>LTV</span>
            <span>{ltv ?? '—'}</span>
          </div>
          <div className={`${styles.calc} ${open ? styles.calcOpen : ''}`}>
            <div className={styles.calcBar}>
              <span>Calculator</span>
              <span>×</span>
            </div>
            <div className={styles.calcTape}>
              {tape.map((line, i) => (
                <span key={i}>
                  {line.ok ? <span className={styles.ok}>{line.text}</span> : line.text}
                  {i < tape.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className={styles.calcDisp}>{disp}</div>
            <div className={styles.calcKeys}>
              {CALC_KEYS.map((k) => (
                <span key={k} className={hit === k ? styles.isHit : undefined}>
                  {k}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- page */

export default function HomeLanding() {
  return (
    <div className={styles.home}>
      {/* ============ TOP BAR ============ */}
      <nav className={styles.topbar}>
        <div className={styles.wrap}>
          <Link className={styles.mark} href="/">
            MLO <span>Homeroom</span>
          </Link>
          <div className={styles.topnav}>
            <Link className={styles.navLink} href="/login">
              Log in
            </Link>
            <Link className={styles.navBtn} href="/login">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>SAFE MLO exam + career prep</p>
          <h1>
            MLO courses give you <span className={styles.fill}>dense text</span>,{' '}
            <span className={styles.fill}>long modules</span>, and{' '}
            <span className={styles.fill}>exams</span>. MLO Homeroom gives you an{' '}
            <span className={styles.fill}>approachable</span>, interactive way to{' '}
            <span className={styles.fill}>learn the industry</span>—and{' '}
            <span className={`${styles.fill} ${styles.fillDone}`}>make it stick ✓</span>.
          </h1>
          <p className={styles.lede}>
            Homeroom is a study site for the SAFE MLO national exam. It&apos;s built so you recall
            the material as you read it.
          </p>
          <div className={styles.ctaRow}>
            <Link className={styles.btn} href="/login">
              Start studying
            </Link>
            <a className={styles.link} href="#inside">
              See what&apos;s inside ↓
            </a>
          </div>
          <p className={styles.heroFine}>
            MLO Homeroom is not an NMLS-approved course provider. The required 20 hours of
            pre-licensure education must be completed through an approved provider.
          </p>
        </div>
      </header>

      {/* ============ INSIDE A UNIT ============ */}
      <section className={`${styles.band} ${styles.bandRule}`} id="inside">
        <div className={styles.wrap}>
          <h2>Inside a unit</h2>

          <div className={styles.specs}>
            <div>
              <p className={styles.label}>Interactive reading</p>
              <ReadingDemo />
              <p className={styles.cap}>
                SAFE MLO concepts broken down in depth, in plain language with real examples. Read
                it or listen to it, filling in the key numbers as you go.
              </p>
            </div>

            <div>
              <p className={styles.label}>Short answer</p>
              <ShortAnswerDemo />
              <p className={styles.cap}>
                Answer questions in your own words and get instant feedback on what you missed.
              </p>
            </div>
          </div>

          {/* recap card */}
          <div className={styles.cardBlock}>
            <p className={styles.label}>Flashcards and recaps</p>
            <div className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardGist}>
                  <p className={styles.cardEyebrow}>Recap · homeowners protection act</p>
                  <h3 className={styles.cardTitle}>When PMI ends</h3>
                  <p className={styles.gist}>
                    PMI protects the lender, not you — so once you hold enough equity, the law makes
                    it stop.
                  </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.sticker}
                  src="/home/calculator-sticker.png"
                  alt=""
                  width={280}
                  height={406}
                />
              </div>
              <div className={styles.cardFacts}>
                <p className={styles.cardEyebrow}>Key facts</p>
                <ul className={styles.facts}>
                  <li>
                    A borrower who is current can ask for cancellation at{' '}
                    <span className={styles.hl}>80%</span> of the home&apos;s original value.
                  </li>
                  <li>
                    The servicer must end it automatically at <span className={styles.hl}>78%</span>,
                    no request needed.
                  </li>
                  <li>
                    If neither happens, it ends at the{' '}
                    <span className={styles.hl}>midpoint of the loan term</span>.
                  </li>
                </ul>
              </div>
            </div>
            <p className={styles.cardCap}>
              The key notes and numbers from every section, plus flashcards for the vocabulary you
              need to know.
            </p>
          </div>

          {/* simulators */}
          <div className={styles.simBlock}>
            <p className={styles.label}>MLO software simulators</p>
            <PricingSim />
            <p className={styles.simCap}>
              Practice on working versions of the software loan officers actually use, from pricing
              a loan to sending a Loan Estimate.
            </p>
          </div>

          <div className={styles.notice}>
            <h3>Not a licensing course</h3>
            <p>
              MLO Homeroom is not an NMLS-approved course provider. The 20 hours of pre-licensure
              education required for licensure, along with any additional hours required by your
              state, must be completed through an NMLS-approved provider, and only that provider can
              report completed hours to your NMLS record. Homeroom covers the same national exam
              content; no activity completed here counts toward the education requirement.
            </p>
          </div>
        </div>
      </section>

      {/* ============ TOOLS ============ */}
      <section className={`${styles.band} ${styles.bandWarm}`}>
        <div className={styles.wrap}>
          <h2>What you study with</h2>
          <div className={styles.tools}>
            <div className={styles.tool}>
              <h3>Listen</h3>
              <p>
                Play any unit as audio, blanks spoken as their answers. Pause anywhere, pick up
                where you stopped, and run it at 1.5× on the second pass.
              </p>
            </div>
            <div className={styles.tool}>
              <h3>Search and ask</h3>
              <p>
                Search every module, or ask a question and get an answer written for it. Highlight
                any passage to have it clarified or summarized.
              </p>
            </div>
            <div className={styles.tool}>
              <h3>Calculator</h3>
              <p>
                Press <span className={styles.key}>=</span> to dock the same four-function
                calculator the test allows, with a tape that keeps your steps beside the worksheet.
              </p>
            </div>
            <div className={styles.tool}>
              <h3>Flashcards</h3>
              <p>
                Drill 865 vocabulary cards from across every module. Cards you miss come back more
                often until you know them.
              </p>
            </div>
            <div className={styles.tool}>
              <h3>Practice exams</h3>
              <p>
                Take a full 125-question practice exam, weighted like the real test. Or work through
                712 questions one topic at a time, and check yourself at the end of every section.
              </p>
            </div>
            <div className={styles.tool}>
              <h3>Glossary</h3>
              <p>Look up any of 232 terms without leaving the page.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLOSE ============ */}
      <section className={`${styles.close} ${styles.bandRule}`}>
        <div className={styles.wrap}>
          <h2>Study alongside your 20 hours.</h2>
          <p className={styles.lede}>
            The same national exam content your course covers, in a form built for practice.
          </p>
          <div className={styles.ctaRow}>
            <Link className={styles.btn} href="/login">
              Create an account
            </Link>
            <Link className={`${styles.btn} ${styles.btnGhost}`} href="/login">
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

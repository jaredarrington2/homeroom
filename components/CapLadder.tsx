"use client";

// components/CapLadder.tsx — the first viz widget: the ARM CAP ladder. Two modes on one shell.
// Check-your-work (tabs Exercise 1 / Exercise 2): predict the peak year + rate, and a correct
// answer draws the worst-case rate climb + a reveal. Explore: a program toggle (Conventional
// 3-cap vs FHA·VA 2-cap) swaps the input set AND the cap logic, redrawing the ladder live.
// Hand-rolled SVG, no chart library (no-library canon); a flat white chart card, not a
// skeuomorphic document. In-session state only — same precedent as Worksheet / FormWalkthrough.
//
// The ladder math is the single source of truth in content/widgets/arm-cap-ladder.ts; the check
// reuses lib/answer (year integer-exact, rate within ±0.001). Nodes are React state, never
// named-element globals (the bug the reference prototype fixed).
import { useState } from "react";
import type { LadderConfig, VizWidgetKind } from "@/lib/section";
import { checkAnswer } from "@/lib/answer";
import { buildLadder, capExercises, explorerSeed } from "@/content/widgets/arm-cap-ladder";

// ---- the SVG chart (ports the reference prototype's renderChart onto the real tokens) ----
const ROYAL = "#1E3A8A";
const HL = "#FFE27A";
const RULE = "#C8534F"; // --loose-margin, the dashed ceiling
const GRID = "#E5E5E5";
const MUT = "#6B6B6B";

function LadderChart({ config }: { config: LadderConfig }) {
  const { rows, ceiling, peakYear, life, fixed } = buildLadder(config);
  const W = 560, H = 300, L = 46, R = 16, T = 18, B = 30;
  const pw = W - L - R, ph = H - T - B;
  const yMax = Math.ceil((ceiling + 1.5) / 2) * 2;
  const n = rows.length, col = pw / n;
  const xC = (y: number) => L + (y - 0.5) * col;
  const yP = (v: number) => T + ph - (v / yMax) * ph;

  const grid: JSX.Element[] = [];
  for (let t = 0; t <= yMax; t += 2) {
    const yy = yP(t);
    grid.push(<line key={`g${t}`} x1={L} y1={yy} x2={W - R} y2={yy} stroke={GRID} />);
    grid.push(
      <text key={`gt${t}`} x={L - 8} y={yy + 3} textAnchor="end" fontSize="10" fill={MUT}>{t}%</text>,
    );
  }

  // stair-step path: hold flat across each year, then jump to the next
  let d = `M ${L} ${yP(rows[0].rate)}`;
  rows.forEach((r, i) => {
    const xR = L + (i + 1) * col;
    d += ` L ${xR} ${yP(r.rate)}`;
    if (i + 1 < rows.length) d += ` L ${xR} ${yP(rows[i + 1].rate)}`;
  });

  const cy = yP(ceiling);
  const px = xC(peakYear), py = yP(ceiling);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`worst-case rate ladder, peaks at ${ceiling}% in year ${peakYear}`}>
      <rect x={L} y={T} width={fixed * col} height={ph} fill="#E8EDF7" opacity={0.55} />
      {grid}
      {rows.map((r) => (
        <text key={`y${r.year}`} x={xC(r.year)} y={H - 10} textAnchor="middle" fontSize="9.5" fill={MUT}>{r.year}</text>
      ))}
      <line x1={L} y1={cy} x2={W - R} y2={cy} stroke={RULE} strokeWidth="1.4" strokeDasharray="5 4" />
      <text x={W - R} y={cy - 6} textAnchor="end" fontSize="10" fill={RULE}>ceiling {ceiling}% (start + {life})</text>
      <path d={d} fill="none" stroke={ROYAL} strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx={px} cy={py} r="9" fill={HL} />
      <circle cx={px} cy={py} r="4" fill={ROYAL} />
      <text x={px} y={py - 16} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={ROYAL}>year {peakYear} · {ceiling}%</text>
      <text x={L + (fixed * col) / 2} y={T + 14} textAnchor="middle" fontSize="9.5" fill={ROYAL}>fixed {fixed} yr</text>
    </svg>
  );
}

// ---- one check-your-work exercise ----
interface ExState {
  year: string;
  rate: string;
  wrongY: boolean;
  wrongR: boolean;
  solved: boolean;
}
const freshEx = (): ExState => ({ year: "", rate: "", wrongY: false, wrongR: false, solved: false });

// State lives in the parent so a solved exercise stays drawn after switching tabs (in-session).
function Exercise({ index, st, update }: { index: number; st: ExState; update: (u: (s: ExState) => ExState) => void }) {
  const e = capExercises[index];
  const setSt = update;

  const check = () => {
    if (st.solved) return;
    const okY = checkAnswer(st.year, [String(e.answer.year)]);
    const gr = parseFloat(String(st.rate).replace(/[^0-9.]/g, ""));
    const okR = Number.isFinite(gr) && Math.abs(gr - e.answer.rate) <= 0.001;
    setSt((s) => ({ ...s, wrongY: !okY, wrongR: !okR, solved: okY && okR ? true : s.solved }));
  };
  const reveal = () => setSt((s) => ({ ...s, wrongY: false, wrongR: false, solved: true }));

  return (
    <div className="cl-prob">
      <p className="cl-q" dangerouslySetInnerHTML={{ __html: e.prompt }} />
      <div className="cl-asks">
        <label className={"cl-ask" + (st.solved ? " ok" : st.wrongY ? " no" : "")}>
          peak year
          <input
            type="text"
            inputMode="numeric"
            placeholder="—"
            aria-label="peak year"
            value={st.year}
            readOnly={st.solved}
            onChange={(ev) => setSt((s) => ({ ...s, year: ev.target.value, wrongY: false }))}
            onKeyDown={(ev) => { if (ev.key === "Enter") { ev.preventDefault(); check(); } }}
          />
        </label>
        <label className={"cl-ask" + (st.solved ? " ok" : st.wrongR ? " no" : "")}>
          peak rate
          <input
            type="text"
            inputMode="decimal"
            placeholder="—"
            aria-label="peak rate"
            value={st.rate}
            readOnly={st.solved}
            onChange={(ev) => setSt((s) => ({ ...s, rate: ev.target.value, wrongR: false }))}
            onKeyDown={(ev) => { if (ev.key === "Enter") { ev.preventDefault(); check(); } }}
          />
        </label>
      </div>
      {!st.solved && (
        <div className="cl-act">
          <button type="button" className="cl-btn pri" onClick={check}>Check</button>
          <button type="button" className="cl-btn" onClick={reveal}>Show me</button>
        </div>
      )}
      {st.solved && (
        <>
          <div className="cl-chart"><LadderChart config={e.config} /></div>
          <div className="cl-reveal" dangerouslySetInnerHTML={{ __html: e.reveal }} />
        </>
      )}
    </div>
  );
}

// ---- the explorer: program toggle swaps the input set + the logic; every field is live ----
function Explorer() {
  const [mode, setMode] = useState<"conv" | "fha">("conv");
  const [v, setV] = useState({ ...explorerSeed });
  const num = (key: keyof typeof v, fallback: number) => (Number.isFinite(v[key]) ? v[key] : fallback);
  const set = (key: keyof typeof v) => (ev: React.ChangeEvent<HTMLInputElement>) =>
    setV((s) => ({ ...s, [key]: parseFloat(ev.target.value) }));

  const config: LadderConfig =
    mode === "conv"
      ? { mode: "conv", start: num("start", 1.5), fixed: num("fixed", 3), iac: num("iac", 3), rac: num("rac", 1), lolc: num("lolc", 6) }
      : { mode: "fha", start: num("start", 2.5), fixed: num("fixed", 7), per: num("per", 2), life: num("life", 6) };

  const field = (label: string, k: keyof typeof v, step = 1) => (
    <label key={k}>
      {label}
      <input type="number" step={step} value={Number.isNaN(v[k]) ? "" : v[k]} onChange={set(k)} />
    </label>
  );

  return (
    <>
      <div className="cl-ctrls">
        <label>
          program
          <span className="cl-seg">
            <button type="button" className={mode === "conv" ? "on" : ""} onClick={() => setMode("conv")}>Conventional</button>
            <button type="button" className={mode === "fha" ? "on" : ""} onClick={() => setMode("fha")}>FHA · VA</button>
          </span>
        </label>
        {field("start rate %", "start", 0.25)}
        {field("fixed yrs", "fixed")}
        {mode === "conv"
          ? [field("initial cap", "iac"), field("periodic cap", "rac"), field("life cap", "lolc")]
          : [field("periodic cap", "per"), field("life cap", "life")]}
      </div>
      <div className="cl-chart"><LadderChart config={config} /></div>
    </>
  );
}

export default function CapLadder({ kind }: { kind: VizWidgetKind }) {
  const [tab, setTab] = useState(0);
  const [exStates, setExStates] = useState<ExState[]>(() => capExercises.map(freshEx));
  const updateEx = (i: number) => (u: (s: ExState) => ExState) =>
    setExStates((prev) => prev.map((s, j) => (j === i ? u(s) : s)));

  if (kind !== "arm-cap-ladder") return null; // amortization lands on this shell later

  return (
    <div className="cl" role="group" aria-label="ARM cap ladder">
      <div className="cl-tabs">
        {["Exercise 1", "Exercise 2", "Explore"].map((t, i) => (
          <button type="button" key={t} className={"cl-tab" + (tab === i ? " on" : "")} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>
      {tab === 0 && <Exercise index={0} st={exStates[0]} update={updateEx(0)} />}
      {tab === 1 && <Exercise index={1} st={exStates[1]} update={updateEx(1)} />}
      {tab === 2 && <Explorer />}
    </div>
  );
}

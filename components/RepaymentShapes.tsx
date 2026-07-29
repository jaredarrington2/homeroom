// components/RepaymentShapes.tsx — a static small-multiples of how a loan's balance behaves
// over time under each repayment structure taught in this unit: fixed-rate (amortizing),
// interest-only, balloon, and negative amortization. The unit's through-line is "every product
// changes the payment, the payoff date, or both" — the four silhouettes make that visible.
// Flat white chart card (charts aren't documents — the CapLadder precedent), hand-rolled SVG,
// no chart library. Server-rendered. Each panel is labeled (axes + a shared legend) so the
// line and the colors carry meaning on their own.
const ROYAL = "#1E3A8A";
const RED = "#C8534F"; // the balloon call — whole balance due at once
const WARN = "#B45309"; // the balance growing — negative amortization
const HAIR = "#CFCFCF"; // reference lines (starting balance / paid-off)
const AXIS = "#9A9A94"; // axis line + label ink

interface Shape {
  title: string;
  note: string;
  /** the royal balance curve */
  d: string;
  /** optional accented segment that carries the concept (the cliff, the growth) */
  accent?: { d: string; color: string };
}

// One coordinate system across all panels so the silhouettes compare cleanly:
// x 16→142 is time; the starting balance sits at y=26, zero at y=80; a rise goes above 26.
const SHAPES: Shape[] = [
  {
    title: "Fixed-rate",
    note: "paid off on schedule",
    d: "M16,26 C 52,31 100,52 142,80",
  },
  {
    title: "Interest-only",
    note: "flat, then re-casts",
    d: "M16,26 L74,26 C 100,33 122,60 142,80",
  },
  {
    title: "Balloon",
    note: "called early",
    d: "M16,26 C 44,29 72,34 98,38",
    accent: { d: "M98,38 L98,80", color: RED },
  },
  {
    title: "Negative am.",
    note: "grows first",
    d: "M56,16 C 88,28 118,58 142,80",
    accent: { d: "M16,26 C 30,20 44,16 56,16", color: WARN },
  },
];

function Panel({ s }: { s: Shape }) {
  return (
    <figure className="rs-panel">
      <svg viewBox="0 0 158 100" role="img" aria-label={`${s.title}: the balance ${s.note}, read left (closing) to right (end of term)`}>
        {/* axes: y = balance owed (up), x = time (right). Faint, with a direction cue. */}
        <line x1="16" y1="16" x2="16" y2="80" stroke={AXIS} strokeWidth="0.8" />
        <text x="11" y="50" transform="rotate(-90 11 50)" textAnchor="middle" fontSize="6" fill={AXIS} className="rs-axis">owed →</text>
        <text x="142" y="97" textAnchor="end" fontSize="6" fill={AXIS} className="rs-axis">time →</text>
        {/* starting balance (dashed) and paid-off / $0 (solid) references */}
        <line x1="16" y1="26" x2="142" y2="26" stroke={HAIR} strokeDasharray="3 3" />
        <line x1="16" y1="80" x2="142" y2="80" stroke={HAIR} />
        <path d={s.d} fill="none" stroke={ROYAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {s.accent && (
          <path d={s.accent.d} fill="none" stroke={s.accent.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        )}
        <circle cx="16" cy="26" r="2.2" fill={ROYAL} />
      </svg>
      <figcaption className="rs-cap">
        <span className="rs-ptitle">{s.title}</span>
        <span className="rs-pnote">{s.note}</span>
      </figcaption>
    </figure>
  );
}

export default function RepaymentShapes() {
  return (
    <figure className="rs">
      <figcaption className="rs-lede">Each line is the loan&apos;s balance — the amount still owed — read left (closing) to right (end of the term). The higher the line, the more is still owed.</figcaption>
      <div className="rs-grid">
        {SHAPES.map((s) => (
          <Panel key={s.title} s={s} />
        ))}
      </div>
      <ul className="rs-legend" aria-label="what the lines and colors mean">
        <li><span className="rs-sw rs-sw-royal" aria-hidden="true" />balance still owed</li>
        <li><span className="rs-sw rs-sw-dash" aria-hidden="true" />starting balance</li>
        <li><span className="rs-sw rs-sw-base" aria-hidden="true" />paid off ($0)</li>
        <li><span className="rs-sw rs-sw-red" aria-hidden="true" />balloon comes due</li>
        <li><span className="rs-sw rs-sw-warn" aria-hidden="true" />balance grew (negative am.)</li>
      </ul>
    </figure>
  );
}

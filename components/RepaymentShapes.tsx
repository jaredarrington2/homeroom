// components/RepaymentShapes.tsx — a static small-multiples of how a loan's balance behaves
// over time under each repayment structure taught in this unit: fixed-rate (amortizing),
// interest-only, balloon, and negative amortization. The unit's through-line is "every product
// changes the payment, the payoff date, or both" — the four silhouettes make that visible.
// Flat white chart card (charts aren't documents — the CapLadder precedent), hand-rolled SVG,
// no chart library. Server-rendered, decorative (aria-hidden); each panel names itself in text.
const ROYAL = "#1E3A8A";
const RED = "#C8534F"; // --loose-margin, the balloon call
const WARN = "#B45309"; // --warn, the balance growing
const HAIR = "#CFCFCF"; // --hair-strong

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
      <svg viewBox="0 0 158 92" role="img" aria-label={`${s.title}: ${s.note}`}>
        {/* starting balance (dashed) and zero (solid) references */}
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
    <figure className="rs" aria-hidden="true">
      <figcaption className="rs-lede">What&apos;s still owed, over the life of the loan</figcaption>
      <div className="rs-grid">
        {SHAPES.map((s) => (
          <Panel key={s.title} s={s} />
        ))}
      </div>
    </figure>
  );
}

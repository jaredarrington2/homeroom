// components/InkCard.tsx — the repayment unit's hand-drawn "study card" family: a cream card with
// a marker title, a Caveat subtitle, and a blue-ink SVG diagram that IS the card (no sticker).
// Ported from ~/Downloads/module 5 cards (repayment-study-cards-mock.html); the balloon card is
// authored here in the same language. Server-rendered, decorative (the prose carries the facts).
// A feTurbulence/feDisplacementMap filter gives the ink its hand-drawn wobble; filter ids are
// unique per card so four can share one page.
const INK = "#1f4fa8";
const INK_DEEP = "#153a80";

export type InkCardKind = "amortization" | "interest-only" | "re-cast" | "balloon";

const META: Record<InkCardKind, { title: string; sub: string }> = {
  amortization: {
    title: "Amortization",
    sub: "one level payment — but the split inside it shifts from interest to principal over the years.",
  },
  "interest-only": {
    title: "Interest-only",
    sub: "pay only the interest for a while — the balance never moves. then it re-casts, and the payment jumps.",
  },
  "re-cast": {
    title: "Re-cast",
    sub: "pay a lump sum against principal — the servicer resets to a smaller payment, same rate, same payoff date.",
  },
  balloon: {
    title: "Balloon",
    sub: "a small payment set on a long amortization — then the whole balance comes due at once, years early.",
  },
};

function InkFilter({ id, seed }: { id: string; seed: number }) {
  return (
    <defs>
      <filter id={id} x="-4%" y="-4%" width="108%" height="108%">
        <feTurbulence type="fractalNoise" baseFrequency="0.014 0.017" numOctaves={2} seed={seed} result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale={2.4} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  );
}

function AmortizationDiag() {
  return (
    <svg viewBox="0 0 900 430" xmlns="http://www.w3.org/2000/svg">
      <InkFilter id="ink-amort" seed={4} />
      <g filter="url(#ink-amort)" fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 300 L860 300" strokeWidth={2.5} />
        <path d="M860 300 l-13 -6 M860 300 l-12 7" strokeWidth={2} />
        <path d="M80 300 L80 60" strokeWidth={2.5} />
        <path d="M80 60 l-6 11 M80 60 l7 10" strokeWidth={2} />
        <path d="M95 92 C 300 108, 470 152, 560 196 C 675 245, 780 265, 845 272" strokeWidth={3} />
        <path d="M95 276 C 300 262, 470 238, 560 196 C 675 150, 780 108, 845 96" strokeWidth={3} />
        <circle cx={560} cy={196} r={6.5} strokeWidth={2.4} />
        <path d="M560 202 L560 300" strokeWidth={1.8} strokeDasharray="3 8" />
        <path d="M560 300 l0 8" strokeWidth={2} />
      </g>
      <g fill={INK} fontFamily="Caveat, cursive" fontWeight={700}>
        <text x={96} y={80} fontSize={24}>interest</text>
        <text x={96} y={298} fontSize={24}>principal</text>
        <text x={70} y={46} fontSize={16} fontWeight={600} fill={INK_DEEP}>share of each payment</text>
        <text x={72} y={324} fontSize={16} fontWeight={600}>0</text>
        <text x={527} y={326} fontSize={16} fontWeight={700} fill={INK_DEEP}>~yr 19</text>
        <text x={762} y={324} fontSize={17} fontWeight={600}>years</text>
        <text x={846} y={324} fontSize={16} fontWeight={600}>30</text>
      </g>
      <g fontFamily="Caveat, cursive">
        <text x={100} y={368} fontSize={19} fontWeight={700} fill={INK_DEEP}>the crossover — principal overtakes interest — sits past the halfway mark</text>
        <text x={100} y={400} fontSize={18} fontWeight={600} fill={INK}>$200k at 6%, 30 yrs → <tspan fontWeight={700} fill={INK_DEEP}>$231,676</tspan> in interest. pay extra → it moves left, total drops.</text>
      </g>
    </svg>
  );
}

function InterestOnlyDiag() {
  const shortBars = [104, 140, 176, 212, 248, 284];
  const tallBars = [360, 394, 428, 462, 496, 530, 564, 598, 632, 666, 700, 734];
  return (
    <svg viewBox="0 0 900 430" xmlns="http://www.w3.org/2000/svg">
      <InkFilter id="ink-io" seed={14} />
      <g filter="url(#ink-io)" fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 300 L860 300" strokeWidth={2.5} />
        <path d="M860 300 l-13 -6 M860 300 l-12 7" strokeWidth={2} />
        <path d="M100 120 L338 120 C 356 126, 372 140, 388 160" strokeWidth={3} />
        <path d="M388 160 l-8 -3 M388 160 l1 -9" strokeWidth={2} />
        <g strokeWidth={2.1}>
          {shortBars.map((x) => (
            <path key={x} d={`M${x} 300 L${x} 282 L${x + 16} 282 L${x + 16} 300`} />
          ))}
        </g>
        <g strokeWidth={2.1}>
          {tallBars.map((x) => (
            <path key={x} d={`M${x} 300 L${x} 240 L${x + 18} 240 L${x + 18} 300`} />
          ))}
        </g>
        <path d="M318 288 L352 252" strokeWidth={2.4} />
        <path d="M352 252 l-12 1 M352 252 l1 12" strokeWidth={2.2} />
        <path d="M340 120 L340 300" strokeWidth={1.7} strokeDasharray="3 8" />
      </g>
      <g fill={INK} fontFamily="Caveat, cursive" fontWeight={700}>
        <text x={104} y={110} fontSize={21}>balance stays flat — 0 to principal</text>
        <text x={470} y={214} fontSize={23} fill={INK_DEEP}>payment jumps</text>
        <text x={404} y={182} fontSize={16} fontWeight={600} fill={INK}>balance starts to fall</text>
        <text x={112} y={332} fontSize={18} fontWeight={600}>interest-only years</text>
        <text x={312} y={332} fontSize={17} fontWeight={600} fill={INK_DEEP}>re-cast · yr 10</text>
      </g>
      <g fontFamily="Caveat, cursive">
        <text x={100} y={366} fontSize={20} fontWeight={700} fill={INK_DEEP}>re-cast repays the full balance over the years left → the payment jumps</text>
        <text x={100} y={398} fontSize={19} fontWeight={600} fill={INK}>offered only on a <tspan fontWeight={700} fill={INK_DEEP}>non-QM</tspan> loan — kept in portfolio, or sold to a private investor.</text>
      </g>
    </svg>
  );
}

function RecastDiag() {
  const tallBars = [104, 138, 172, 206, 240, 274];
  const lowBars = [360, 394, 428, 462, 496, 530, 564, 598, 632, 666, 700, 734];
  return (
    <svg viewBox="0 0 900 430" xmlns="http://www.w3.org/2000/svg">
      <InkFilter id="ink-recast" seed={27} />
      <g filter="url(#ink-recast)" fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 300 L860 300" strokeWidth={2.5} />
        <path d="M860 300 l-13 -6 M860 300 l-12 7" strokeWidth={2} />
        <g strokeWidth={2.1}>
          {tallBars.map((x) => (
            <path key={x} d={`M${x} 300 L${x} 232 L${x + 18} 232 L${x + 18} 300`} />
          ))}
        </g>
        <g strokeWidth={2.1}>
          {lowBars.map((x) => (
            <path key={x} d={`M${x} 300 L${x} 266 L${x + 18} 266 L${x + 18} 300`} />
          ))}
        </g>
        <circle cx={322} cy={104} r={15} strokeWidth={2.4} />
        <path d="M322 122 L322 224" strokeWidth={2.4} />
        <path d="M322 224 l-9 -10 M322 224 l9 -10" strokeWidth={2.2} />
        <path d="M300 236 L352 262" strokeWidth={2.2} />
        <path d="M352 262 l-12 -2 M352 262 l0 -12" strokeWidth={2} />
        <path d="M338 122 L338 300" strokeWidth={1.7} strokeDasharray="3 8" />
      </g>
      <g fill={INK} fontFamily="Caveat, cursive" fontWeight={700}>
        <text x={314} y={98} fontSize={19} textAnchor="middle" fill={INK_DEEP}>$</text>
        <text x={196} y={220} fontSize={20}>original payment</text>
        <text x={474} y={254} fontSize={23} fill={INK_DEEP}>smaller payment</text>
        <text x={352} y={150} fontSize={17} fontWeight={600}>lump sum → principal</text>
        <text x={712} y={252} fontSize={17} fontWeight={600}>same payoff date</text>
      </g>
      <g fontFamily="Caveat, cursive">
        <text x={100} y={366} fontSize={20} fontWeight={700} fill={INK_DEEP}>same interest rate, same payoff date — just a smaller monthly payment</text>
        <text x={100} y={398} fontSize={19} fontWeight={600} fill={INK}>discretionary, often for a fee. (a plain prepay keeps the payment and ends the loan sooner.)</text>
      </g>
    </svg>
  );
}

function BalloonDiag() {
  const bars = [104, 140, 176, 212, 248, 284];
  return (
    <svg viewBox="0 0 900 430" xmlns="http://www.w3.org/2000/svg">
      <InkFilter id="ink-balloon" seed={39} />
      <g filter="url(#ink-balloon)" fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 300 L860 300" strokeWidth={2.5} />
        <path d="M860 300 l-13 -6 M860 300 l-12 7" strokeWidth={2} />
        {/* balance line: barely falls on a 30-yr clock, then the call cliffs it to zero */}
        <path d="M100 116 C 200 122, 300 130, 344 138" strokeWidth={3} />
        <path d="M344 138 L344 300" strokeWidth={3} />
        {/* small level payment bars for the years before the call */}
        <g strokeWidth={2.1}>
          {bars.map((x) => (
            <path key={x} d={`M${x} 300 L${x} 272 L${x + 16} 272 L${x + 16} 300`} />
          ))}
        </g>
        {/* the call — an emphasised down-arrow at the cliff */}
        <path d="M344 300 l-9 -12 M344 300 l9 -12" strokeWidth={2.2} />
      </g>
      <g fill={INK} fontFamily="Caveat, cursive" fontWeight={700}>
        <text x={104} y={104} fontSize={20}>balance barely falls</text>
        <text x={372} y={150} fontSize={23} fill={INK_DEEP}>the whole balance — due at once</text>
        <text x={112} y={332} fontSize={18} fontWeight={600}>small payment · 30-yr clock</text>
        <text x={318} y={332} fontSize={17} fontWeight={700} fill={INK_DEEP}>3/27 · yr 3</text>
      </g>
      <g fontFamily="Caveat, cursive">
        <text x={100} y={366} fontSize={20} fontWeight={700} fill={INK_DEEP}>pays like a 30-year loan, but the full balance comes due years early</text>
        <text x={100} y={398} fontSize={19} fontWeight={600} fill={INK}>convert instead with a <tspan fontWeight={700} fill={INK_DEEP}>CRTM</tspan> — written notice no later than 45 days before it's due.</text>
      </g>
    </svg>
  );
}

const DIAG: Record<InkCardKind, () => JSX.Element> = {
  amortization: AmortizationDiag,
  "interest-only": InterestOnlyDiag,
  "re-cast": RecastDiag,
  balloon: BalloonDiag,
};

export default function InkCard({ kind }: { kind: InkCardKind }) {
  const m = META[kind];
  const Diag = DIAG[kind];
  return (
    <figure className="ic" aria-hidden="true">
      <div className="ic-pad">
        {/* Sharpie title — same hand-lettering treatment as the photoreal study cards (a
            per-card OpenAI-generated ink-on-transparent PNG), not a web font. */}
        <img className="ic-title" src={`/illustrations/repayment/${kind}-title.png`} alt={m.title} loading="eager" />
        <div className="ic-sub">{m.sub}</div>
        <div className="ic-diag">
          <Diag />
        </div>
      </div>
    </figure>
  );
}

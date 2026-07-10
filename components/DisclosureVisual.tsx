// components/DisclosureVisual.tsx — full-width document mockups rendered inline in a
// concept group, showing what each RESPA disclosure actually contains. A deliberately
// skeuomorphic surface (warm paper, typewriter + handwriting, highlighters), scoped under
// `.dv-*` so it never leaks into the flat canon — same precedent as the Definitions deck.
// Pure presentational (no interactivity) → server-rendered.
import type { DisclosureVisualKind } from "@/lib/section";

export default function DisclosureVisual({ kind }: { kind: DisclosureVisualKind }) {
  return (
    <figure className="dv" aria-hidden="true">
      {kind === "lifecycle-timeline" && <LifecycleTimeline />}
      {kind === "escrow-accrual" && <EscrowAccrual />}
      {kind === "escrow-analysis" && <EscrowAnalysis />}
      {kind === "servicing-transfer" && <ServicingTransfer />}
      {kind === "apr-stack" && <AprStack />}
      {kind === "tolerance-buckets" && <ToleranceBuckets />}
      {kind === "licensed-vs-registered" && <LicensedVsRegistered />}
      {kind === "pe-ce-hours" && <PeCeHours />}
      {kind === "exam-attempts" && <ExamAttempts />}
      {kind === "temp-authority-windows" && <TempAuthorityWindows />}
      {kind === "program-comparison" && <ProgramComparison />}
      {kind === "reverse-disbursement" && <ReverseDisbursement />}
      {kind === "draw-schedule" && <DrawSchedule />}
    </figure>
  );
}

/* ── Module 5 — the four residential loan programs, side by side ─────────────── */
// Reference matrix (Conventional · FHA · VA · USDA). Illustrative-but-consistent
// figures verified against the 2026 ebook; `hl` marks the cells that separate the
// programs (0% down, no PMI, the lone non-assumable). Renders a desktop grid AND a
// per-program card stack — CSS shows one at a time (a 5-col grid can't reflow to
// column-major cards, so both are authored from the same rows).
const PC_PROGRAMS = ["Conventional", "FHA", "VA", "USDA"] as const;
type PcCell = string | { t: string; hl: true };
const PC_ROWS: { label: string; cells: [PcCell, PcCell, PcCell, PcCell] }[] = [
  { label: "min. down payment", cells: ["5% (3% community)", "3.5% (10% if score < 580)", { t: "0%", hl: true }, { t: "0%", hl: true }] },
  { label: "mortgage insurance", cells: ["PMI if < 20% down", "MIP — 1.75% up-front + annual", { t: "none — funding fee instead", hl: true }, { t: "none — guarantee fee (1% + 0.35%/yr)", hl: true }] },
  { label: "DTI guideline", cells: ["28 / 36", "31 / 43", "41 back-end only", "29 / 41"] },
  { label: "occupancy", cells: ["primary · second · investment", "primary (occupy ≤ 60 days, 1 yr)", "primary only", "primary only"] },
  { label: "seller concessions", cells: ["3 / 6 / 9% (2% investment)", "6%", "4%", "6%"] },
  { label: "loan limits (2026)", cells: ["FHFA conforming", "FHA floor → ceiling", "none, with full entitlement", "none — income-capped (115% AMI)"] },
  { label: "assumable", cells: [{ t: "no (due-on-sale)", hl: true }, "yes", "yes", "yes"] },
  { label: "backed by", cells: ["Fannie / Freddie", "FHA (HUD-insured)", "VA-guaranteed", "USDA-guaranteed"] },
];
function pcText(c: PcCell) {
  return typeof c === "string" ? c : <span className="dv-pc-hl">{c.t}</span>;
}
function ProgramComparison() {
  return (
    <div className="dv-paper dv-pc" style={{ padding: "26px 22px 20px" }}>
      <div className="dv-h">The four residential loan programs</div>
      <div className="dv-hsub">Who backs each loan sets its down payment and mortgage insurance</div>
      <hr className="dv-rule dv-double" />

      {/* desktop: 8-row × 5-column grid */}
      <div className="dv-pc-grid" role="presentation">
        <div className="dv-pc-corner" />
        {PC_PROGRAMS.map((p) => (
          <div key={p} className="dv-pc-head">{p}</div>
        ))}
        {PC_ROWS.map((row) => (
          <div key={row.label} className="dv-pc-line" role="presentation">
            <div className="dv-pc-rowlabel">{row.label}</div>
            {row.cells.map((c, i) => (
              <div key={PC_PROGRAMS[i]} className="dv-pc-cell">{pcText(c)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* mobile: one warm-paper card per program */}
      <div className="dv-pc-cards" role="presentation">
        {PC_PROGRAMS.map((p, i) => (
          <div key={p} className="dv-pc-card">
            <div className="dv-pc-card-head">{p}</div>
            <dl className="dv-pc-card-list">
              {PC_ROWS.map((row) => (
                <div key={row.label} className="dv-pc-card-pair">
                  <dt>{row.label}</dt>
                  <dd>{pcText(row.cells[i])}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 7. SAFE Act — registered vs. state-licensed decision tree ──────────────── */
function LicensedVsRegistered() {
  return (
    <div className="dv-paper" style={{ padding: "26px 24px 22px" }}>
      <div className="dv-h">Registered vs. State-Licensed</div>
      <div className="dv-hsub">One question sets which rules apply to a loan originator</div>
      <hr className="dv-rule dv-double" />

      <div className="dv-lr-q">Who employs you?</div>

      <div className="dv-lr-cols">
        <div className="dv-lr-col">
          <div className="dv-lr-branch">a bank, credit union, or other depository institution — or an FCA-regulated institution</div>
          <div className="dv-lr-tag dv-lr-reg">an EXEMPT entity → REGISTERED</div>
          <ul className="dv-checks">
            <li className="checked">register in the NMLS</li>
            <li className="checked">carry a unique identifier</li>
            <li className="checked"><span className="dv-hl-g">no state license needed</span></li>
            <li className="checked">no PE, exam, or CE required</li>
          </ul>
          <div className="dv-lr-why">a federal banking agency already supervises the employer</div>
        </div>

        <div className="dv-lr-col">
          <div className="dv-lr-branch">a mortgage broker or non-bank lender</div>
          <div className="dv-lr-tag dv-lr-lic">NOT exempt → STATE-LICENSED</div>
          <ul className="dv-checks">
            <li className="checked">register in the NMLS</li>
            <li className="checked">carry a unique identifier</li>
            <li className="checked"><span className="dv-hl-y">plus a state license</span></li>
            <li className="checked">20-hr PE · national exam · 8-hr CE</li>
            <li className="checked">sponsorship switches it on</li>
          </ul>
          <div className="dv-lr-why">no federal banking agency over the employer, so the state licenses the person</div>
        </div>
      </div>

      <hr className="dv-rule" />
      <div className="dv-mnote">
        Both kinds live in the NMLS with a unique identifier — the fork is only whether a <b>state license</b> sits on top.
      </div>
    </div>
  );
}

/* ── 8. Pre-licensing vs. continuing education hours ────────────────────────── */
function PeCeHours() {
  return (
    <div className="dv-paper" style={{ padding: "26px 24px 22px" }}>
      <div className="dv-h">Education hours</div>
      <div className="dv-hsub">Before the license (once) vs. every year to keep it</div>
      <hr className="dv-rule dv-double" />

      <div className="dv-apr-cols">
        <div className="dv-apr-col">
          <div className="dv-apr-fig">20<span className="dv-apr-unit"> hrs PE</span></div>
          <div className="dv-hrs-bar">
            <div className="dv-hrs-seg dv-hrs-fed">3<br />federal law</div>
            <div className="dv-hrs-seg dv-hrs-eth">3<br />ethics</div>
            <div className="dv-hrs-seg dv-hrs-nt">2<br />non-traditional</div>
            <div className="dv-hrs-seg dv-hrs-rest">12<br />remaining</div>
          </div>
          <div className="dv-apr-lender">Pre-licensing</div>
          <div className="dv-apr-sub">one time, before the exam</div>
        </div>

        <div className="dv-apr-col">
          <div className="dv-apr-fig">8<span className="dv-apr-unit"> hrs CE</span></div>
          <div className="dv-hrs-bar">
            <div className="dv-hrs-seg dv-hrs-fed">3<br />federal law</div>
            <div className="dv-hrs-seg dv-hrs-eth">2<br />ethics</div>
            <div className="dv-hrs-seg dv-hrs-nt">2<br />non-traditional</div>
            <div className="dv-hrs-seg dv-hrs-rest">1<br />remaining</div>
          </div>
          <div className="dv-apr-lender">Continuing ed</div>
          <div className="dv-apr-sub">every year, to renew</div>
        </div>
      </div>

      <hr className="dv-rule" />
      <div className="dv-mnote">
        Same three buckets both times — only the <b>ethics</b> hours differ (3 for PE, 2 for CE). A state may pile
        its own state-specific hours on top of either.
      </div>
    </div>
  );
}

/* ── 9. National exam — the retake ladder ──────────────────────────────────── */
function ExamAttempts() {
  return (
    <div className="dv-paper" style={{ padding: "26px 24px 22px" }}>
      <div className="dv-h">The national exam</div>
      <div className="dv-hsub">120 questions · pass at 75% · the retake ladder</div>
      <hr className="dv-rule dv-double" />

      <div className="dv-exam-row">
        <div className="dv-exam-try">
          <div className="dv-exam-n">1st</div>
          <div className="dv-exam-lbl">attempt</div>
        </div>
        <div className="dv-exam-gap">wait<br /><b>30 days</b></div>
        <div className="dv-exam-try">
          <div className="dv-exam-n">2nd</div>
          <div className="dv-exam-lbl">attempt</div>
        </div>
        <div className="dv-exam-gap">wait<br /><b>30 days</b></div>
        <div className="dv-exam-try">
          <div className="dv-exam-n">3rd</div>
          <div className="dv-exam-lbl">attempt</div>
        </div>
        <div className="dv-exam-gap dv-exam-wall">fail 3 →<br /><b>6 months</b></div>
        <div className="dv-exam-try dv-exam-repeat">
          <div className="dv-exam-n">↻</div>
          <div className="dv-exam-lbl">cycle repeats</div>
        </div>
      </div>

      <hr className="dv-rule" />
      <div className="dv-mnote">
        Three tries per cycle, each at least <b>30 days</b> apart; after three straight fails, a <b>6-month</b> wall
        before the ladder resets. Separately: let a license lapse <b>5+ years</b> (not counting registered time) and you re-sit the exam.
      </div>
    </div>
  );
}

/* ── 10. Temporary authority — the two paths + four end-conditions ──────────── */
function TempAuthorityWindows() {
  return (
    <div className="dv-paper" style={{ padding: "26px 24px 22px" }}>
      <div className="dv-h">Temporary authority</div>
      <div className="dv-hsub">Who qualifies to work before the new state license issues</div>
      <hr className="dv-rule dv-double" />

      <div className="dv-lr-cols">
        <div className="dv-lr-col">
          <div className="dv-lr-tag dv-lr-reg">REGISTERED → licensed</div>
          <div className="dv-lr-branch">a bank (registered) MLO joining a state-licensed company</div>
          <ul className="dv-checks">
            <li className="checked">clean record — no denial, revocation, suspension, or cease-and-desist</li>
            <li className="checked">state license application submitted</li>
            <li className="checked"><span className="dv-hl-y">NMLS-registered in the prior 1 year</span></li>
          </ul>
        </div>
        <div className="dv-lr-col">
          <div className="dv-lr-tag dv-lr-lic">LICENSED → new state</div>
          <div className="dv-lr-branch">a state-licensed MLO crossing into a new state</div>
          <ul className="dv-checks">
            <li className="checked">meets the standard requirements</li>
            <li className="checked">employed by a licensed company there</li>
            <li className="checked"><span className="dv-hl-y">licensed in another state in the prior 30 days</span></li>
          </ul>
        </div>
      </div>

      <div className="dv-ta-end">the bridge ends at the EARLIEST of —</div>
      <div className="dv-ta-conds">
        <span>application withdrawn</span>
        <span>state denies (or intends to)</span>
        <span>state grants the license</span>
        <span><b>120 days</b> if still incomplete</span>
      </div>

      <hr className="dv-rule" />
      <div className="dv-mnote">
        Same idea both ways: an already-vetted originator shouldn&apos;t sit idle just to change states or employers.
      </div>
    </div>
  );
}

/* ── 6. TRID fee tolerances — zero / 10% / no-tolerance ─────────────────────── */
function ToleranceBuckets() {
  return (
    <div className="dv-paper" style={{ padding: "26px 24px 22px" }}>
      <div className="dv-h">TRID fee tolerances</div>
      <div className="dv-hsub">How far a quoted fee may move from Loan Estimate to Closing Disclosure</div>
      <hr className="dv-rule dv-double" />

      <div className="dv-tol-cols">
        <div className="dv-tol-col">
          <div className="dv-tol-cap dv-tol-zero">Zero tolerance</div>
          <div className="dv-tol-rule">can&apos;t rise at all — the lender eats any increase</div>
          <ul className="dv-tol-list">
            <li>lender / origination fees</li>
            <li>a provider the lender requires</li>
            <li>transfer taxes</li>
          </ul>
          <div className="dv-tol-who">the lender controls these</div>
        </div>

        <div className="dv-tol-col">
          <div className="dv-tol-cap dv-tol-ten">10% tolerance</div>
          <div className="dv-tol-rule">the group&apos;s total may rise up to 10% — lender pays the rest</div>
          <ul className="dv-tol-list">
            <li>recording fees</li>
            <li>a provider you shopped from the lender&apos;s list</li>
          </ul>
          <div className="dv-tol-who">you shopped, but from the lender&apos;s list</div>
        </div>

        <div className="dv-tol-col">
          <div className="dv-tol-cap dv-tol-none">No tolerance</div>
          <div className="dv-tol-rule">may rise to the true cost, disclosed in good faith</div>
          <ul className="dv-tol-list">
            <li>prepaid interest, property taxes</li>
            <li>homeowner&apos;s insurance</li>
            <li>a provider you chose off the list</li>
          </ul>
          <div className="dv-tol-who">the lender doesn&apos;t control these</div>
        </div>
      </div>

      <hr className="dv-rule" />

      <div className="dv-mnote">
        The 10% test compares the LE and CD <b>totals</b> for the whole bucket, not fee by fee —
        anything above 110% of the disclosed total is the lender&apos;s to refund.
      </div>
    </div>
  );
}

/* ── 5. APR stack — same note rate, different fees → different APR ──────────── */
function AprStack() {
  return (
    <div className="dv-paper" style={{ padding: "26px 24px 22px" }}>
      <div className="dv-h">Annual Percentage Rate</div>
      <div className="dv-hsub">Same loan — $250,000 · 30-year fixed · 6% note rate</div>
      <hr className="dv-rule dv-double" />

      <div className="dv-apr-cols">
        <div className="dv-apr-col">
          <div className="dv-apr-fig">6.50%<span className="dv-apr-unit"> APR</span></div>
          <div className="dv-apr-bar">
            <div className="dv-apr-seg dv-apr-fees" style={{ height: 24 }}>+0.50%<br />fees</div>
            <div className="dv-apr-seg dv-apr-note" style={{ height: 96 }}>6.00%<br />note rate</div>
          </div>
          <div className="dv-apr-lender">Friend&apos;s lender</div>
          <div className="dv-apr-sub">lower up-front fees</div>
        </div>

        <div className="dv-apr-col">
          <div className="dv-apr-fig">6.625%<span className="dv-apr-unit"> APR</span></div>
          <div className="dv-apr-bar">
            <div className="dv-apr-seg dv-apr-fees" style={{ height: 34 }}>+0.625%<br />fees</div>
            <div className="dv-apr-seg dv-apr-note" style={{ height: 96 }}>6.00%<br />note rate</div>
          </div>
          <div className="dv-apr-lender">Realtor&apos;s lender</div>
          <div className="dv-apr-sub">higher up-front fees</div>
        </div>
      </div>

      <div className="dv-arrow" style={{ marginTop: 14, justifyContent: "center" }}>
        <span className="dv-arrow-mark">↑</span>
        <span className="dv-arrow-text">Same 6% note rate on both — the price of the money is identical</span>
      </div>

      <hr className="dv-rule" />

      <div className="dv-mnote" style={{ fontSize: 15 }}>
        The note rate sets the monthly payment. APR folds the up-front points &amp; fees back into one
        yearly number, so a higher APR on the same rate means higher fees — which is what makes two
        loans comparable.
      </div>
    </div>
  );
}

/* ── 1. Initial Escrow Account Disclosure (Escrow Accrual Sheet) ────────────── */
function EscrowAccrual() {
  return (
    <div className="dv-paper dv-tilt-r">
      <div className="dv-h">
        Initial Escrow Account<br />Disclosure Statement
      </div>
      <div className="dv-hsub">Escrow Accrual Sheet • Effective: Settlement Date</div>
      <hr className="dv-rule dv-double" />

      <div style={{ marginBottom: 16 }}>
        <div className="dv-row">
          <span className="dv-label">Total Monthly Payment:</span>
          <span className="dv-blank"><span className="dv-fill">$2,147.00</span></span>
        </div>
        <div className="dv-row" style={{ paddingLeft: 16 }}>
          <span className="dv-label">Principal &amp; Interest:</span>
          <span className="dv-blank"><span className="dv-fill">$1,685.00</span></span>
        </div>
        <div className="dv-row" style={{ paddingLeft: 16 }}>
          <span className="dv-label"><span className="dv-hl-y">Escrow Portion:</span></span>
          <span className="dv-blank"><span className="dv-fill">$462.00</span></span>
        </div>
      </div>

      <div className="dv-mnote" style={{ fontSize: 15, marginBottom: 14 }}>
        Must break out escrow from total payment ↑
      </div>

      <hr className="dv-rule" />

      <div className="dv-tw sm muted" style={{ marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
        Anticipated Disbursements — Computation Year
      </div>

      <table className="dv-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Recipient</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className="dv-hl-y">Property Tax</span></td>
            <td style={{ fontSize: 10 }}>Loudoun Co.</td>
            <td>Dec 5</td>
            <td>$3,240.00</td>
          </tr>
          <tr>
            <td><span className="dv-hl-y">Homeowner&apos;s Ins.</span></td>
            <td style={{ fontSize: 10 }}>State Farm</td>
            <td>Mar 15</td>
            <td>$1,404.00</td>
          </tr>
          <tr>
            <td>Flood Insurance</td>
            <td style={{ fontSize: 10 }}>NFIP</td>
            <td>Jun 1</td>
            <td>$900.00</td>
          </tr>
        </tbody>
      </table>

      <div className="dv-arrow">
        <span className="dv-arrow-mark">↑</span>
        <span className="dv-arrow-text">
          Must show: <span className="dv-ur">date</span>, <span className="dv-ur">amount</span>, AND{" "}
          <span className="dv-ur">recipient</span> for each
        </span>
      </div>

      <hr className="dv-rule" style={{ marginTop: 16 }} />

      <div className="dv-tw sm" style={{ marginBottom: 6 }}>
        Charges due within 60 calendar days of settlement:
      </div>
      <div style={{ background: "var(--dv-hl-p)", padding: "8px 10px", marginBottom: 6 }}>
        <div className="dv-tw sm" style={{ marginBottom: 4 }}>☐ Collected by third party at settlement</div>
        <div className="dv-tw sm">☐ Borrower acknowledges responsibility</div>
      </div>
      <div className="dv-mnote red" style={{ fontSize: 16, fontWeight: 600 }}>
        60-day rule! Servicer may not have loan on system yet — can&apos;t pay from escrow if it&apos;s not active
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="dv-row">
          <span className="dv-label">Borrower Signature:</span>
          <span className="dv-blank" style={{ minWidth: 140 }}>
            <span className="dv-fill" style={{ fontSize: 18 }}>Jane Homebuyer</span>
          </span>
          <span className="dv-label" style={{ marginLeft: 12 }}>Date:</span>
          <span className="dv-blank" style={{ minWidth: 60 }}><span className="dv-fill">6/15/26</span></span>
        </div>
      </div>
    </div>
  );
}

/* ── 2. Aggregate Escrow Analysis Statement ────────────────────────────────── */
function EscrowAnalysis() {
  return (
    <div className="dv-paper dv-tilt-l">
      <div className="dv-h">Annual Escrow<br />Account Statement</div>
      <div className="dv-hsub">Computation Year: Jan 2026 – Dec 2026</div>
      <hr className="dv-rule dv-double" />

      <div style={{ position: "relative" }}>
        <div className="dv-tw sm muted" style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
          <span className="dv-hl-b">Account History — Past Year</span>
        </div>

        <div className="dv-row">
          <span className="dv-label">Monthly payment (prior year):</span>
          <span className="dv-blank"><span className="dv-fill">$2,087.00</span></span>
        </div>
        <div className="dv-row" style={{ paddingLeft: 12 }}>
          <span className="dv-label">Escrow portion:</span>
          <span className="dv-blank"><span className="dv-fill">$402.00</span></span>
        </div>
        <div className="dv-row">
          <span className="dv-label">Total paid IN:</span>
          <span className="dv-blank"><span className="dv-fill">$4,824.00</span></span>
        </div>
        <div className="dv-row">
          <span className="dv-label">Total paid OUT:</span>
          <span className="dv-blank"><span className="dv-fill">$4,644.00</span></span>
        </div>
        <div className="dv-row" style={{ paddingLeft: 20 }}>
          <span className="dv-label" style={{ fontSize: 10 }}>Taxes:</span>
          <span className="dv-tw sm" style={{ minWidth: 50 }}>$3,240</span>
          <span className="dv-label" style={{ fontSize: 10 }}>Insurance:</span>
          <span className="dv-tw sm">$1,404</span>
        </div>
        <div className="dv-row" style={{ marginTop: 4 }}>
          <span className="dv-label"><span className="dv-hl-g">Ending Balance:</span></span>
          <span className="dv-blank"><span className="dv-fill" style={{ color: "var(--dv-green)" }}>$180.00</span></span>
        </div>
      </div>

      <div className="dv-arrow" style={{ margin: "4px 0" }}>
        <span className="dv-arrow-mark">←</span>
        <span className="dv-arrow-text">taxes + insurance itemized separately</span>
      </div>

      <hr className="dv-rule" />

      <div>
        <div className="dv-tw sm muted" style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
          <span className="dv-hl-b">Projected Activity — Next Year</span>
        </div>

        <div className="dv-row">
          <span className="dv-label"><span className="dv-hl-y">Monthly payment (current):</span></span>
          <span className="dv-blank"><span className="dv-fill">$2,147.00</span></span>
        </div>
        <div className="dv-row" style={{ paddingLeft: 12 }}>
          <span className="dv-label"><span className="dv-hl-y">Escrow portion:</span></span>
          <span className="dv-blank"><span className="dv-fill">$462.00</span></span>
        </div>
        <div className="dv-tw sm muted" style={{ marginTop: 8, fontSize: 10 }}>
          Projected disbursements: Property Tax $3,480 (Dec) • Insurance $1,476 (Mar) • Flood $900 (Jun)
        </div>
      </div>

      <hr className="dv-rule" />

      <div style={{ background: "var(--dv-hl-p)", padding: 10, marginBottom: 4 }}>
        <div className="dv-tw sm" style={{ fontWeight: "bold", marginBottom: 4 }}>Account Adjustment:</div>
        <ul className="dv-checks">
          <li className="checked"><span className="dv-hl-y">Surplus: $180 — applied to next year&apos;s payments</span></li>
          <li>Shortage: $___ — to be collected over ___ months</li>
          <li>Deficiency: $___ — due by ___</li>
        </ul>
      </div>

      <div className="dv-mnote" style={{ fontSize: 15, fontWeight: 600 }}>
        Exam loves this: surplus → how handled? Shortage → how repaid? Must explain BOTH
      </div>

      <div className="dv-sticky" style={{ transform: "rotate(1.2deg)", marginTop: 14 }}>
        <span style={{ fontWeight: 700, fontSize: 17 }}>⏱ 45 calendar days</span>
        <br />
        First analysis due within 45 days of settlement, then annually
      </div>
    </div>
  );
}

/* ── 3. Transfer of Servicing — goodbye + welcome letters ──────────────────── */
function ServicingTransfer() {
  return (
    <>
      <div className="dv-pair">
        <div className="dv-paper" style={{ transform: "rotate(-0.6deg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div className="dv-tw sm muted" style={{ textTransform: "uppercase", letterSpacing: 1 }}>From: Releasing Servicer</div>
              <div className="dv-tw" style={{ fontSize: 13, marginTop: 2 }}>First National Bank</div>
            </div>
            <span className="dv-stamp" style={{ fontSize: 9, transform: "rotate(-6deg)" }}>Goodbye</span>
          </div>

          <hr className="dv-rule" />

          <div className="dv-tw sm" style={{ marginBottom: 8 }}>Dear Borrower,</div>
          <div className="dv-tw sm" style={{ marginBottom: 8, lineHeight: 1.8 }}>
            Effective <span className="dv-hl-y">July 1, 2026</span>, the servicing of your mortgage will transfer to{" "}
            <span className="dv-hl-y">Meridian Mortgage Services</span>.
          </div>

          <ul className="dv-checks">
            <li className="checked">Transfer effective date</li>
            <li className="checked">New servicer name</li>
            <li className="checked">New servicer address &amp; contact</li>
            <li className="checked"><span className="dv-hl-g">No loan terms change</span></li>
            <li className="checked">Consumer rights</li>
          </ul>

          <div className="dv-mnote" style={{ fontSize: 14, marginTop: 10 }}>
            ≤ 15 calendar days <span style={{ fontWeight: 700 }}>BEFORE</span> transfer
          </div>
        </div>

        <div className="dv-paper" style={{ transform: "rotate(0.5deg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div className="dv-tw sm muted" style={{ textTransform: "uppercase", letterSpacing: 1 }}>From: Receiving Servicer</div>
              <div className="dv-tw" style={{ fontSize: 13, marginTop: 2 }}>Meridian Mortgage Svcs</div>
            </div>
            <span className="dv-stamp" style={{ fontSize: 9, transform: "rotate(3deg)", color: "var(--dv-green)", borderColor: "var(--dv-green)" }}>Welcome</span>
          </div>

          <hr className="dv-rule" />

          <div className="dv-tw sm" style={{ marginBottom: 8 }}>Dear Borrower,</div>
          <div className="dv-tw sm" style={{ marginBottom: 8, lineHeight: 1.8 }}>
            As of <span className="dv-hl-y">July 1, 2026</span>, we are your new mortgage servicer. Your loan terms remain unchanged.
          </div>

          <ul className="dv-checks">
            <li className="checked">Transfer effective date</li>
            <li className="checked">Servicer name &amp; contact</li>
            <li className="checked"><span className="dv-hl-g">No loan terms change</span></li>
            <li className="checked">Consumer rights</li>
          </ul>

          <div className="dv-mnote" style={{ fontSize: 14, marginTop: 10 }}>
            ≤ 15 calendar days <span style={{ fontWeight: 700 }}>AFTER</span> transfer
          </div>
        </div>
      </div>

      <div className="dv-paper" style={{ marginTop: 16, padding: "16px 20px", background: "#FFF9C4" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span className="dv-hand sharpie" style={{ fontSize: 22, flexShrink: 0 }}>⚠</span>
          <div>
            <div className="dv-hand sharpie" style={{ fontSize: 17, marginBottom: 4 }}>60-day safe harbor</div>
            <div className="dv-hand" style={{ fontSize: 15, color: "var(--dv-sharpie)" }}>
              For 60 calendar days after the transfer: <span className="dv-hand red" style={{ fontWeight: 600 }}>no late fees</span> and{" "}
              <span className="dv-hand red" style={{ fontWeight: 600 }}>no adverse credit reporting</span> if borrower accidentally pays the old servicer. After 60 days → normal rules apply.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── 4. Disclosure lifecycle timeline ──────────────────────────────────────── */
function LifecycleTimeline() {
  return (
    <div className="dv-paper" style={{ padding: "28px 28px 24px" }}>
      <div className="dv-h" style={{ fontSize: 12, marginBottom: 2 }}>RESPA Disclosure Timeline</div>
      <div className="dv-hsub" style={{ marginBottom: 16 }}>Application → Settlement → Servicing</div>
      <hr className="dv-rule dv-double" />

      <div className="dv-tl">
        <div className="dv-tl-event">
          <div className="dv-tl-dot" />
          <div className="dv-tl-label">Application</div>
          <div className="dv-tl-title">Special Information Booklet</div>
          <div className="dv-tl-detail">HUD Home Loan Toolkit (purchase only)</div>
          <div className="dv-tl-deadline">3 <span className="dv-hl-y">general</span> business days</div>
        </div>

        <div className="dv-tl-event">
          <div className="dv-tl-dot" />
          <div className="dv-tl-label">Application (HELOC)</div>
          <div className="dv-tl-title">When Your Home is on the Line</div>
          <div className="dv-tl-detail">HELOC disclosure booklet</div>
          <div className="dv-tl-deadline">3 <span className="dv-hl-p">precise</span> business days</div>
        </div>

        <div className="dv-tl-event">
          <div className="dv-tl-dot" />
          <div className="dv-tl-label">Application</div>
          <div className="dv-tl-title">Homeownership Counseling Disclosure</div>
          <div className="dv-tl-detail">≥10 HUD-approved agencies near borrower</div>
          <div className="dv-tl-deadline">3 <span className="dv-hl-p">precise</span> business days</div>
        </div>

        <div className="dv-tl-event">
          <div className="dv-tl-dot" />
          <div className="dv-tl-label">Application (non-TRID)</div>
          <div className="dv-tl-title">Mortgage Servicing Disclosure</div>
          <div className="dv-tl-detail">Will servicing be transferred?</div>
          <div className="dv-tl-deadline">3 <span className="dv-hl-p">precise</span> business days</div>
        </div>

        <div className="dv-tl-event">
          <div className="dv-tl-dot" />
          <div className="dv-tl-label">Referral / Application</div>
          <div className="dv-tl-title">ABAD</div>
          <div className="dv-tl-detail">Affiliated Business Arrangement Disclosure</div>
          <div className="dv-tl-deadline">At referral or within 3 business days</div>
        </div>

        <div className="dv-tl-event">
          <div className="dv-tl-dot" style={{ background: "var(--dv-red)", boxShadow: "0 0 0 1px var(--dv-red)" }} />
          <div className="dv-tl-label" style={{ color: "var(--dv-red)", fontWeight: "bold" }}>Settlement</div>
          <div className="dv-tl-title">Initial Escrow Account Disclosure</div>
          <div className="dv-tl-detail">Escrow Accrual Sheet — at closing</div>
          <div className="dv-tl-deadline" style={{ color: "var(--dv-sharpie)" }}>At settlement</div>
        </div>

        <div className="dv-tl-event">
          <div className="dv-tl-dot" />
          <div className="dv-tl-label">Post-settlement</div>
          <div className="dv-tl-title">Aggregate Escrow Analysis</div>
          <div className="dv-tl-detail">First analysis + annually thereafter</div>
          <div className="dv-tl-deadline">45 calendar days</div>
        </div>

        <div className="dv-tl-event">
          <div className="dv-tl-dot" style={{ background: "var(--dv-green)", boxShadow: "0 0 0 1px var(--dv-green)" }} />
          <div className="dv-tl-label" style={{ color: "var(--dv-green)" }}>Servicing Transfer</div>
          <div className="dv-tl-title">Transfer of Servicing Disclosure</div>
          <div className="dv-tl-detail">Goodbye letter (before) + Welcome letter (after)</div>
          <div className="dv-tl-deadline">15 calendar days each direction</div>
        </div>
      </div>

      <hr className="dv-rule" />

      <div style={{ marginTop: 10, display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div className="dv-hand" style={{ fontSize: 14, color: "var(--dv-muted)" }}>
          <span className="dv-hl-y" style={{ padding: "2px 6px" }}>general</span> = entity must be open
        </div>
        <div className="dv-hand" style={{ fontSize: 14, color: "var(--dv-muted)" }}>
          <span className="dv-hl-p" style={{ padding: "2px 6px" }}>precise</span> = every day but Sun + holidays
        </div>
      </div>

      <div className="dv-mnote red" style={{ fontSize: 15, marginTop: 12, fontWeight: 600 }}>
        Only ONE disclosure uses general business days — the Special Information Booklet. Everything else at application = precise.
      </div>
    </div>
  );
}

/* ── Module 5 — reverse mortgage: the 60% first-year cap + payout options ────── */
// Reference visual (not graded): the principal-limit bar with the first-year-accessible 60%
// shaded and the rest hatched, plus the four ways the money can arrive. The 60% figure is the
// U13 cloze; this reinforces it without re-testing.
function ReverseDisbursement() {
  return (
    <div className="dv-paper" style={{ padding: "26px 24px 22px" }}>
      <div className="dv-h">Reverse mortgage — how the money comes out</div>
      <div className="dv-hsub">The principal limit, and the first-year 60% cap</div>
      <hr className="dv-rule dv-double" />

      <div style={{ display: "flex", height: 36, border: "1px solid var(--dv-ink)", margin: "8px 0 4px" }}>
        <div style={{ width: "60%", background: "var(--dv-hl-y)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
          60% — available in year one
        </div>
        <div style={{ width: "40%", background: "repeating-linear-gradient(45deg, transparent, transparent 5px, #d8d8d8 5px, #d8d8d8 6px)", borderLeft: "1px dashed var(--dv-ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>
          40% — after
        </div>
      </div>
      <div className="dv-mnote" style={{ fontSize: 14 }}>
        The whole bar is the <b>principal limit</b> — set by the youngest borrower&apos;s age. The first-year draw can&apos;t exceed the shaded 60%.
      </div>

      <hr className="dv-rule" />

      <div className="dv-tw sm muted" style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
        How the proceeds can arrive
      </div>
      <ul className="dv-checks">
        <li className="checked"><b>Lump sum</b> — the whole available amount at once</li>
        <li className="checked"><b>Line of credit</b> — draw as needed; the unused line grows over time</li>
        <li className="checked"><b>Tenure</b> — a set monthly amount for as long as you live in the home</li>
        <li className="checked"><b>Term</b> — a larger monthly amount for a fixed number of years</li>
      </ul>
    </div>
  );
}

/* ── Module 5 — construction draw schedule (staged disbursement timeline) ─────── */
// Reference visual (not graded): closing → inspect → draw → inspect → draw → complete, with the
// interest-only-on-drawn-funds note. Mirrors the RESPA lifecycle-timeline pattern (.dv-tl).
function DrawSchedule() {
  return (
    <div className="dv-paper" style={{ padding: "28px 28px 24px" }}>
      <div className="dv-h" style={{ fontSize: 12, marginBottom: 2 }}>Construction draw schedule</div>
      <div className="dv-hsub" style={{ marginBottom: 16 }}>Closing → staged draws → the end loan</div>
      <hr className="dv-rule dv-double" />

      <div className="dv-tl">
        <div className="dv-tl-event">
          <div className="dv-tl-dot" />
          <div className="dv-tl-label">Closing</div>
          <div className="dv-tl-title">Land + first draw</div>
          <div className="dv-tl-detail">lender advances the lot and an agreed share of the build</div>
        </div>
        <div className="dv-tl-event">
          <div className="dv-tl-dot" />
          <div className="dv-tl-label">Phase done</div>
          <div className="dv-tl-title">Inspect → draw</div>
          <div className="dv-tl-detail">builder requests the next draw; lender inspects before releasing</div>
        </div>
        <div className="dv-tl-event">
          <div className="dv-tl-dot" />
          <div className="dv-tl-label">Phase done</div>
          <div className="dv-tl-title">Inspect → draw</div>
          <div className="dv-tl-detail">repeat until the home is complete and fully funded</div>
        </div>
        <div className="dv-tl-event">
          <div className="dv-tl-dot" style={{ background: "var(--dv-green)", boxShadow: "0 0 0 1px var(--dv-green)" }} />
          <div className="dv-tl-label" style={{ color: "var(--dv-green)" }}>Complete</div>
          <div className="dv-tl-title">Converts to the end loan</div>
          <div className="dv-tl-detail">permanent financing replaces the construction loan</div>
        </div>
      </div>

      <hr className="dv-rule" />
      <div className="dv-mnote red" style={{ fontSize: 15, marginTop: 12, fontWeight: 600 }}>
        During the build the borrower pays interest only — and only on the funds drawn so far.
      </div>
    </div>
  );
}

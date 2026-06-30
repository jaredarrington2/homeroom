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
    </figure>
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

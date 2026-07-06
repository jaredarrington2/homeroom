// components/forms/LeForm.tsx — the faithful Loan Estimate page 1 (Ficus Bank sample).
// Region wrappers carry data-r (matched by FormWalkthrough); values that are the point of a
// step wrap in <span className="fw-vhl"> and light up only when their region is active.
// Ported from le-walkthrough-page1.html; class names are scoped under .fw in globals.css.
export default function LeForm() {
  return (
    <>
      <div className="d-top">
        <div className="d-bank">FICUS BANK<small>4321 Random Boulevard · Somecity, ST 12340</small></div>
        <div className="d-compare">Save this Loan Estimate to compare with your Closing Disclosure.</div>
      </div>
      <div className="d-h1">Loan Estimate</div>

      <div className="d-meta">
        <div className="region" data-r="1">
          <dl className="kv">
            <dt>Date issued</dt><dd>2/15/2013</dd>
            <dt>Applicants</dt><dd>Michael Jones and Mary Stone<br />123 Anywhere Street<br />Anytown, ST 12345</dd>
            <dt>Property</dt><dd>456 Somewhere Avenue<br />Anytown, ST 12345</dd>
            <dt>Sale price</dt><dd>$180,000</dd>
          </dl>
        </div>
        <div>
          <div className="region" data-r="2">
            <dl className="kv">
              <dt>Loan term</dt><dd>30 years</dd>
              <dt>Purpose</dt><dd>Purchase</dd>
              <dt>Product</dt><dd>Fixed Rate</dd>
              <dt>Loan type</dt><dd>&#9746; Conventional&nbsp; &#9744; FHA&nbsp; &#9744; VA&nbsp; &#9744; ____</dd>
              <dt>Loan ID #</dt><dd>123456789</dd>
            </dl>
          </div>
          <div className="region" data-r="3" style={{ marginTop: 8 }}>
            <dl className="kv"><dt>Rate lock</dt><dd>&#9744; NO&nbsp; &#9746; YES, until <span className="fw-vhl">4/16/2013 at 5:00 p.m. EDT</span></dd></dl>
            <p className="note">Before closing, your interest rate, points, and lender credits can change unless you lock the interest rate. All other estimated closing costs expire on <span className="fw-vhl">3/4/2013 at 5:00 p.m. EDT</span></p>
          </div>
        </div>
      </div>

      <div className="bar">Loan Terms</div>
      <div className="region" data-r="4">
        <div className="colhdr"><span className="fw-vhl">Can this amount increase after closing?</span></div>
        <div className="trow"><div className="lab">Loan Amount</div><div className="ans">$162,000 &nbsp;·&nbsp; NO</div></div>
      </div>
      <div className="region" data-r="5">
        <div className="trow"><div className="lab">Interest Rate</div><div className="ans">3.875% &nbsp;·&nbsp; NO</div></div>
        <div className="trow"><div className="lab">Monthly Principal &amp; Interest<div className="sub">See Projected Payments below for your total monthly payment</div></div><div className="ans">$761.78 &nbsp;·&nbsp; NO</div></div>
      </div>
      <div className="region" data-r="6">
        <div className="feat">Does the loan have these features?</div>
        <div className="trow"><div className="lab">Prepayment Penalty</div><div className="ans">YES</div></div>
        <div className="trow" style={{ border: 0 }}><div className="sub">As high as $3,240 if you pay off the loan during the first 2 years</div><div className="ans">&nbsp;</div></div>
        <div className="trow"><div className="lab">Balloon Payment</div><div className="ans">NO</div></div>
      </div>

      <div className="bar">Projected Payments</div>
      <div className="region" data-r="7">
        <table className="pp">
          <tbody>
            <tr><th>Payment Calculation</th><th>Years 1&ndash;7</th><th>Years 8&ndash;30</th></tr>
            <tr><td>Principal &amp; Interest</td><td>$761.78</td><td>$761.78</td></tr>
            <tr><td>Mortgage Insurance</td><td>+ 82</td><td>+ &mdash;</td></tr>
          </tbody>
        </table>
      </div>
      <div className="region" data-r="8">
        <table className="pp">
          <tbody>
            <tr><td>Estimated Escrow <span className="sub2">Amount can increase over time</span></td><td>+ 206</td><td>+ 206</td></tr>
            <tr className="tot"><td>Estimated Total Monthly Payment</td><td>$1,050</td><td>$968</td></tr>
          </tbody>
        </table>
      </div>
      <div className="region" data-r="9">
        <div className="taxbox">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span>Estimated Taxes, Insurance &amp; Assessments <span className="sub2">Amount can increase over time</span></span><b>$206</b></div>
          <div style={{ marginTop: 4 }}>This estimate includes &nbsp;&#9746; Property Taxes&nbsp; &#9746; Homeowner's Insurance&nbsp; &#9744; Other</div>
          <div className="note" style={{ marginTop: 4 }}>See Section G on page 2 for escrowed property costs. You must pay for other property costs separately.</div>
        </div>
      </div>

      <div className="bar">Costs at Closing</div>
      <div className="region" data-r="10">
        <div className="cost"><div><b>Estimated Closing Costs</b><div className="exp">Includes $5,672 in Loan Costs + $2,382 in Other Costs &minus; $0 in Lender Credits. See page 2 for details.</div></div><div className="big">$8,054</div></div>
      </div>
      <div className="region" data-r="11">
        <div className="cost"><div><b>Estimated Cash to Close</b><div className="exp">Includes Closing Costs. See Calculating Cash to Close on page 2 for details.</div></div><div className="big">$16,054</div></div>
      </div>

      <div className="d-foot"><span>consumerfinance.gov/mortgage-estimate</span><span>LOAN ESTIMATE · PAGE 1 OF 3 · LOAN ID # 123456789</span></div>
    </>
  );
}

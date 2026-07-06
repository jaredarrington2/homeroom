// components/forms/CdForm.tsx — the faithful Closing Disclosure page 1 (same loan as the LE).
// Region wrappers carry data-r; values that diverge from the LE wrap in <span className="fw-vhl">.
// Ported from cd-walkthrough-page1.html; class names are scoped under .fw in globals.css.
export default function CdForm() {
  return (
    <>
      <div className="d-top">
        <div className="d-h1">Closing Disclosure</div>
        <div className="d-compare">This form is a statement of final loan terms and closing costs. Compare this document with your Loan Estimate.</div>
      </div>

      <div className="d-meta3">
        <div className="d-col">
          <h4>Closing Information</h4>
          <div className="region" data-r="1">
            <div className="f"><b>Date Issued</b> 4/15/2013</div>
            <div className="f"><b>Closing Date</b> 4/15/2013</div>
            <div className="f"><b>Disbursement Date</b> <span className="fw-vhl">4/15/2013</span></div>
          </div>
          <div className="region" data-r="2">
            <div className="f"><b>Settlement Agent</b> Epsilon Title Co.</div>
            <div className="f"><b>File #</b> 12-3456</div>
            <div className="f"><b>Property</b> 456 Somewhere Ave, Anytown, ST 12345</div>
            <div className="f"><b>Sale Price</b> $180,000</div>
          </div>
        </div>
        <div className="d-col">
          <h4>Transaction Information</h4>
          <div className="region" data-r="3">
            <div className="f"><b>Borrower</b> Michael Jones and Mary Stone, 123 Anywhere Street, Anytown, ST 12345</div>
            <div className="f"><b>Seller</b> <span className="fw-vhl">Steve Cole and Amy Doe, 321 Somewhere Drive, Anytown, ST 12345</span></div>
            <div className="f"><b>Lender</b> Ficus Bank</div>
          </div>
        </div>
        <div className="d-col">
          <h4>Loan Information</h4>
          <div className="region" data-r="4">
            <div className="f"><b>Loan Term</b> 30 years</div>
            <div className="f"><b>Purpose</b> Purchase</div>
            <div className="f"><b>Product</b> Fixed Rate</div>
            <div className="f"><b>Loan Type</b> &#9746; Conventional</div>
            <div className="f"><b>Loan ID #</b> 123456789</div>
            <div className="f"><b>MIC #</b> <span className="fw-vhl">000654321</span></div>
          </div>
        </div>
      </div>

      <div className="bar">Loan Terms</div>
      <div className="region" data-r="5">
        <div className="colhdr">Can this amount increase after closing?</div>
        <div className="trow"><div className="lab">Loan Amount</div><div className="ans">$162,000 &nbsp;·&nbsp; NO</div></div>
      </div>
      <div className="region" data-r="6">
        <div className="trow"><div className="lab">Interest Rate</div><div className="ans">3.875% &nbsp;·&nbsp; NO</div></div>
        <div className="trow"><div className="lab">Monthly Principal &amp; Interest<div className="sub">See Projected Payments below for your total monthly payment</div></div><div className="ans">$761.78 &nbsp;·&nbsp; NO</div></div>
      </div>
      <div className="region" data-r="7">
        <div className="feat">Does the loan have these features?</div>
        <div className="trow"><div className="lab">Prepayment Penalty</div><div className="ans">YES</div></div>
        <div className="trow" style={{ border: 0 }}><div className="sub">As high as $3,240 if you pay off the loan during the first 2 years</div><div className="ans">&nbsp;</div></div>
        <div className="trow"><div className="lab">Balloon Payment</div><div className="ans">NO</div></div>
      </div>

      <div className="bar">Projected Payments</div>
      <div className="region" data-r="8">
        <table className="pp">
          <tbody>
            <tr><th>Payment Calculation</th><th>Years 1&ndash;7</th><th>Years 8&ndash;30</th></tr>
            <tr><td>Principal &amp; Interest</td><td>$761.78</td><td>$761.78</td></tr>
            <tr><td>Mortgage Insurance</td><td>+ 82.35</td><td>+ &mdash;</td></tr>
          </tbody>
        </table>
      </div>
      <div className="region" data-r="9">
        <table className="pp">
          <tbody>
            <tr><td>Estimated Escrow <span className="sub2">Amount can increase over time</span></td><td>+ 206.13</td><td>+ 206.13</td></tr>
            <tr className="tot"><td>Estimated Total Monthly Payment</td><td>$1,050.26</td><td>$967.91</td></tr>
          </tbody>
        </table>
      </div>
      <div className="region" data-r="10">
        <div className="taxbox">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span>Estimated Taxes, Insurance &amp; Assessments <span className="sub2">Amount can increase over time</span></span><b><span className="fw-vhl">$356.13</span></b></div>
          <div style={{ marginTop: 4 }}>This estimate includes &nbsp;&#9746; Property Taxes&nbsp; &#9746; Homeowner's Insurance&nbsp; &#9746; Other: Homeowner's Association Dues</div>
          <div style={{ fontStyle: "italic", fontSize: 10, color: "#333", marginTop: 4 }}>You must pay for other property costs separately.</div>
        </div>
      </div>

      <div className="bar">Costs at Closing</div>
      <div className="region" data-r="11">
        <div className="cost"><div><b>Closing Costs</b><div className="exp">Includes $4,694.05 in Loan Costs + $5,018.05 in Other Costs &minus; $0 in Lender Credits. See page 2 for details.</div></div><div className="big">$9,712.10</div></div>
      </div>
      <div className="region" data-r="12">
        <div className="cost"><div><b>Cash to Close</b><div className="exp">Includes Closing Costs. See Calculating Cash to Close on <span className="fw-vhl">page 3</span> for details.</div></div><div className="big">$14,147.26</div></div>
      </div>

      <div className="d-foot"><span>Closing Disclosure</span><span>PAGE 1 OF 5 · LOAN ID # 123456789</span></div>
    </>
  );
}

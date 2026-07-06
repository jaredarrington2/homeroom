// components/forms/CdForm.tsx — the faithful Closing Disclosure, all 5 pages (same Ficus Bank
// loan as the LE). Page 1 is ported from cd-walkthrough-page1.html; pages 2–5 are built from the
// canonical CFPB H-25 sample and reconcile to page 1's totals. Region wrappers carry data-r;
// values that are the point of a step wrap in <span className="fw-vhl">. Rendered one page at a
// time by FormWalkthrough. Class names are scoped under .fw in globals.css.
import type { ReactNode } from "react";

/** One row of the page-2 six-column closing-cost grid. Returns six grid children (a fragment is
 *  transparent, so they sit directly in the .cc grid and line up column-to-column). */
function CostRow({
  desc, sec, sub, bAt, bBefore, sAt, sBefore, others,
}: {
  desc: ReactNode; sec?: boolean; sub?: boolean;
  bAt?: ReactNode; bBefore?: ReactNode; sAt?: ReactNode; sBefore?: ReactNode; others?: ReactNode;
}) {
  return (
    <>
      <div className={sec ? "cc-sec" : "cc-d cc-item"}>{desc}</div>
      <div className={"cc-a" + (sub ? " cc-sub" : "")}>{bAt}</div>
      <div className="cc-a">{bBefore}</div>
      <div className="cc-a">{sAt}</div>
      <div className="cc-a">{sBefore}</div>
      <div className="cc-a">{others}</div>
    </>
  );
}

function Page1() {
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

function Page2() {
  return (
    <>
      <div className="d-h1">Closing Cost Details</div>

      <div className="region cc" data-r="1">
        <div className="cc-d" />
        <div className="cc-grp" style={{ gridColumn: "span 2" }}>Borrower-Paid</div>
        <div className="cc-grp" style={{ gridColumn: "span 2" }}>Seller-Paid</div>
        <div className="cc-grp">Paid by<br />Others</div>
        <div className="cc-d" />
        <div className="cc-lbl">At Closing</div>
        <div className="cc-lbl">Before Closing</div>
        <div className="cc-lbl">At Closing</div>
        <div className="cc-lbl">Before Closing</div>
        <div className="cc-lbl" />
      </div>

      <div className="bar">Loan Costs</div>
      <div className="region cc" data-r="2">
        <CostRow sec desc="A. Origination Charges" sub bAt="$1,802.00" />
        <CostRow desc="0.25% of Loan Amount (Points)" bAt="$405.00" />
        <CostRow desc="Application Fee" bAt="$300.00" />
        <CostRow desc="Underwriting Fee" bAt="$1,097.00" />
      </div>
      <div className="region cc" data-r="3">
        <CostRow sec desc="B. Services Borrower Did Not Shop For" sub bAt="$236.55" />
        <CostRow desc="Appraisal Fee &mdash; John Smith Appraisers" others="$405.00" />
        <CostRow desc="Credit Report Fee &mdash; Information Inc." bBefore={<span className="fw-vhl">$29.80</span>} />
        <CostRow desc="Flood Determination Fee" bAt="$20.00" />
        <CostRow desc="Flood Monitoring Fee" bAt="$31.75" />
        <CostRow desc="Tax Monitoring Fee" bAt="$75.00" />
        <CostRow desc="Tax Status Research Fee" bAt="$80.00" />
      </div>
      <div className="region cc" data-r="4">
        <CostRow sec desc="C. Services Borrower Did Shop For" sub bAt="$2,655.50" />
        <CostRow desc="Pest Inspection Fee" bAt="$120.50" />
        <CostRow desc="Survey Fee" bAt="$85.00" />
        <CostRow desc="Title &ndash; Insurance Binder" bAt="$650.00" />
        <CostRow desc="Title &ndash; Lender's Title Insurance" bAt="$500.00" />
        <CostRow desc="Title &ndash; Settlement Agent Fee" bAt="$500.00" />
        <CostRow desc="Title &ndash; Title Search" bAt="$800.00" />
      </div>
      <div className="region cc" data-r="5">
        <CostRow sec sub desc="D. TOTAL LOAN COSTS (Borrower-Paid)" bAt="$4,694.05" />
      </div>

      <div className="bar">Other Costs</div>
      <div className="region cc" data-r="6">
        <CostRow sec desc="E. Taxes and Other Government Fees" sub bAt="$85.00" />
        <CostRow desc="Recording Fees (Deed $40; Mortgage $45)" bAt="$85.00" />
        <CostRow desc="Transfer Tax" sAt="$950.00" />
        <CostRow sec desc="F. Prepaids" sub bAt="$2,120.80" />
        <CostRow desc="Homeowner's Insurance Premium (12 mo)" bAt="$1,209.96" />
        <CostRow desc="Prepaid Interest ($17.44/day, 16 days)" bAt="$279.04" />
        <CostRow desc="Property Taxes (6 mo)" bAt="$631.80" />
        <CostRow sec desc="G. Initial Escrow Payment at Closing" sub bAt="$412.25" />
        <CostRow desc="Homeowner's Insurance $100.83 &times; 2 mo" bAt="$201.66" />
        <CostRow desc="Property Taxes $105.30 &times; 2 mo" bAt="$210.60" />
        <CostRow desc="Aggregate Adjustment" bAt="&minus; $0.01" />
      </div>
      <div className="region cc" data-r="7">
        <CostRow sec desc="H. Other" sub bAt="$2,400.00" />
        <CostRow desc="HOA Capital Contribution" bAt="$500.00" />
        <CostRow desc="HOA Processing Fee" bAt="$150.00" />
        <CostRow desc="Home Inspection Fee" bAt="$750.00" />
        <CostRow desc="Home Warranty Fee" sAt="$450.00" />
        <CostRow desc="Real Estate Commission &mdash; Alpha" sAt={<span className="fw-vhl">$5,700.00</span>} />
        <CostRow desc="Real Estate Commission &mdash; Omega" sAt={<span className="fw-vhl">$5,700.00</span>} />
        <CostRow desc="Title &ndash; Owner's Title Insurance (optional)" bAt="$1,000.00" />
      </div>
      <div className="region cc" data-r="8">
        <CostRow sec sub desc="I. TOTAL OTHER COSTS (Borrower-Paid)" bAt="$5,018.05" />
        <CostRow sec sub desc="J. TOTAL CLOSING COSTS (Borrower-Paid)" bAt="$9,712.10" />
        <CostRow desc="Lender Credits" bAt="$0" />
      </div>

      <div className="d-foot"><span>Closing Disclosure</span><span>PAGE 2 OF 5 · LOAN ID # 123456789</span></div>
    </>
  );
}

function Page3() {
  return (
    <>
      <div className="d-h1">Calculating Cash to Close</div>
      <div className="note" style={{ marginTop: 0 }}>Use this table to see what has changed from your Loan Estimate.</div>

      <div className="region c3" data-r="1">
        <div className="c3-d" />
        <div className="c3-h">Loan Estimate</div>
        <div className="c3-h">Final</div>
        <div className="c3-h">Did this change?</div>

        <div className="c3-d">Total Closing Costs (J)</div>
        <div className="c3-a">$8,054.00</div><div className="c3-a">$9,712.10</div>
        <div className="c3-q"><b>YES</b> · See Total Loan Costs (D) and Total Other Costs (I)</div>

        <div className="c3-d">Closing Costs Paid Before Closing</div>
        <div className="c3-a">$0</div><div className="c3-a"><span className="fw-vhl">&minus; $29.80</span></div>
        <div className="c3-q"><b>YES</b> · You paid these Closing Costs before closing</div>

        <div className="c3-d">Closing Costs Financed (Paid from Loan Amount)</div>
        <div className="c3-a">$0</div><div className="c3-a">$0</div>
        <div className="c3-q"><b>NO</b></div>

        <div className="c3-d">Down Payment / Funds from Borrower</div>
        <div className="c3-a">$18,000.00</div><div className="c3-a">$18,000.00</div>
        <div className="c3-q"><b>NO</b></div>

        <div className="c3-d">Deposit</div>
        <div className="c3-a">&minus; $10,000.00</div><div className="c3-a">&minus; $10,000.00</div>
        <div className="c3-q"><b>NO</b></div>

        <div className="c3-d">Funds for Borrower</div>
        <div className="c3-a">$0</div><div className="c3-a">$0</div>
        <div className="c3-q"><b>NO</b></div>

        <div className="c3-d">Seller Credits</div>
        <div className="c3-a">$0</div><div className="c3-a">&minus; $2,500.00</div>
        <div className="c3-q"><b>YES</b> · See Seller Credits in Section L</div>

        <div className="c3-d">Adjustments and Other Credits</div>
        <div className="c3-a">$0</div><div className="c3-a">&minus; $1,035.04</div>
        <div className="c3-q"><b>YES</b> · See details in Sections K and L</div>
      </div>

      <div className="region c3 c3-tot" data-r="2">
        <div className="c3-d"><b>Cash to Close</b></div>
        <div className="c3-a"><b>$16,054.00</b></div>
        <div className="c3-a"><b><span className="fw-vhl">$14,147.26</span></b></div>
        <div className="c3-q" />
      </div>

      <div className="bar">Summaries of Transactions</div>
      <div className="region sx" data-r="3">
        <div className="sx-h">BORROWER'S TRANSACTION</div>
        <div className="sx-row sx-sec"><span>K. Due from Borrower at Closing</span><span>$189,762.30</span></div>
        <div className="sx-row"><span>Sale Price of Property</span><span>$180,000.00</span></div>
        <div className="sx-row"><span>Closing Costs Paid at Closing (J)</span><span>$9,682.30</span></div>
        <div className="sx-row"><span>Adj. for Items Paid by Seller in Advance — HOA Dues (4/15–4/30)</span><span>$80.00</span></div>
        <div className="sx-row sx-sec"><span>L. Paid Already by or on Behalf of Borrower</span><span>$175,615.04</span></div>
        <div className="sx-row"><span>Deposit</span><span>$10,000.00</span></div>
        <div className="sx-row"><span>Loan Amount</span><span>$162,000.00</span></div>
        <div className="sx-row"><span>Seller Credit</span><span>$2,500.00</span></div>
        <div className="sx-row"><span>Rebate from Epsilon Title Co.</span><span>$750.00</span></div>
        <div className="sx-row"><span>Adj. for Items Unpaid by Seller — County Taxes</span><span>$365.04</span></div>
        <div className="sx-row sx-calc"><span>CASH TO CLOSE (K &minus; L)</span><span><span className="fw-vhl">$14,147.26</span></span></div>
      </div>
      <div className="region sx" data-r="4">
        <div className="sx-h">SELLER'S TRANSACTION</div>
        <div className="sx-row sx-sec"><span>M. Due to Seller at Closing</span><span>$180,080.00</span></div>
        <div className="sx-row"><span>Sale Price of Property</span><span>$180,000.00</span></div>
        <div className="sx-row"><span>Adj. for Items Paid by Seller in Advance — HOA Dues</span><span>$80.00</span></div>
        <div className="sx-row sx-sec"><span>N. Due from Seller at Closing</span><span>$115,665.04</span></div>
        <div className="sx-row"><span>Closing Costs Paid at Closing (J)</span><span>$12,800.00</span></div>
        <div className="sx-row"><span>Payoff of First Mortgage Loan</span><span>$100,000.00</span></div>
        <div className="sx-row"><span>Seller Credit</span><span>$2,500.00</span></div>
        <div className="sx-row"><span>Adj. for Items Unpaid by Seller — County Taxes</span><span>$365.04</span></div>
        <div className="sx-row sx-calc"><span>CASH TO SELLER (M &minus; N)</span><span>$64,414.96</span></div>
      </div>

      <div className="d-foot"><span>Closing Disclosure</span><span>PAGE 3 OF 5 · LOAN ID # 123456789</span></div>
    </>
  );
}

function Page4() {
  return (
    <>
      <div className="d-h1">Additional Information About This Loan</div>
      <div className="bar">Loan Disclosures</div>

      <div className="region ld" data-r="1">
        <div className="ld-t">Assumption</div>
        <div className="ld-b">If you sell or transfer this property to another person, your lender &#9744; will allow, under certain conditions, this person to assume this loan on the original terms &#9746; <b>will not allow</b> assumption of this loan on the original terms.</div>
      </div>
      <div className="region ld" data-r="2">
        <div className="ld-t">Demand Feature</div>
        <div className="ld-b">Your loan &#9744; has a demand feature &#9746; <b>does not have</b> a demand feature.</div>
      </div>
      <div className="region ld" data-r="3">
        <div className="ld-t">Late Payment</div>
        <div className="ld-b">If your payment is more than <b>15 days</b> late, your lender will charge a late fee of <b>5% of the monthly principal and interest payment</b>.</div>
      </div>
      <div className="region ld" data-r="4">
        <div className="ld-t">Negative Amortization <span className="ld-note">(Increase in Loan Amount)</span></div>
        <div className="ld-b">Under your loan terms, you &#9746; <b>do not have</b> a negative amortization feature.</div>
      </div>
      <div className="region ld" data-r="5">
        <div className="ld-t">Partial Payments</div>
        <div className="ld-b">Your lender &#9746; <b>may accept</b> payments that are less than the full amount due (partial payments) and apply them to your loan.</div>
      </div>
      <div className="region ld" data-r="6">
        <div className="ld-t">Escrow Account</div>
        <div className="taxbox" style={{ marginTop: 4 }}>
          <div>For now, your loan &#9746; <b>will have</b> an escrow account to pay the property costs below.</div>
          <table className="pp" style={{ marginTop: 4 }}>
            <tbody>
              <tr><td>Escrowed Property Costs over Year 1 <span className="sub2">Homeowner's Insurance, Property Taxes</span></td><td><span className="fw-vhl">$2,473.56</span></td></tr>
              <tr><td>Non-Escrowed Property Costs over Year 1 <span className="sub2">Homeowner's Association Dues</span></td><td>$1,800.00</td></tr>
              <tr><td>Initial Escrow Payment</td><td>$412.25</td></tr>
              <tr className="tot"><td>Monthly Escrow Payment</td><td>$206.13</td></tr>
            </tbody>
          </table>
          <div className="note" style={{ marginTop: 4 }}>If you waive an escrow account you would pay your property costs directly, possibly for a fee.</div>
        </div>
      </div>

      <div className="d-foot"><span>Closing Disclosure</span><span>PAGE 4 OF 5 · LOAN ID # 123456789</span></div>
    </>
  );
}

function Page5() {
  return (
    <>
      <div className="d-h1">Loan Calculations</div>
      <div className="region lc" data-r="1">
        <div className="lc-row"><div><b>Total of Payments.</b> Total you will have paid after you make all payments of principal, interest, mortgage insurance, and loan costs, as scheduled.</div><div className="lc-a">$285,803.36</div></div>
        <div className="lc-row"><div><b>Finance Charge.</b> The dollar amount the loan will cost you.</div><div className="lc-a">$118,830.27</div></div>
        <div className="lc-row"><div><b>Amount Financed.</b> The loan amount available after paying your upfront finance charge.</div><div className="lc-a">$162,000.00</div></div>
        <div className="lc-row"><div><b>Annual Percentage Rate (APR).</b> Your costs over the loan term expressed as a rate. This is not your interest rate.</div><div className="lc-a"><span className="fw-vhl">4.174%</span></div></div>
        <div className="lc-row"><div><b>Total Interest Percentage (TIP).</b> The total amount of interest that you will pay over the loan term as a percentage of your loan amount.</div><div className="lc-a">69.46%</div></div>
      </div>

      <div className="bar">Other Disclosures</div>
      <div className="region od" data-r="2">
        <div className="od-row"><b>Appraisal.</b> If the property was appraised, your lender must give you a copy at no additional cost at least 3 days before closing.</div>
        <div className="od-row"><b>Contract Details.</b> See your note and security instrument for what happens if you fail to make payments or default.</div>
        <div className="od-row"><b>Liability after Foreclosure.</b> State law may protect you from liability for the unpaid balance after foreclosure.</div>
        <div className="od-row"><b>Refinance.</b> Refinancing this loan will depend on your future financial situation, the property value, and market conditions.</div>
        <div className="od-row"><b>Tax Deductions.</b> If you borrow more than this property is worth, the interest on the excess is not deductible from your federal income taxes.</div>
      </div>

      <div className="bar">Contact Information</div>
      <div className="region ci" data-r="3">
        <div className="ci-row"><span className="ci-role">Lender</span><span>Ficus Bank</span><span className="ci-id">NMLS ID 222222</span></div>
        <div className="ci-row"><span className="ci-role">Real Estate Broker (B)</span><span>Omega Real Estate Broker Inc.</span><span className="ci-id">Lic. Z765416</span></div>
        <div className="ci-row"><span className="ci-role">Real Estate Broker (S)</span><span>Alpha Real Estate Broker Co.</span><span className="ci-id">Lic. Z61456</span></div>
        <div className="ci-row"><span className="ci-role">Settlement Agent</span><span>Epsilon Title Co.</span><span className="ci-id">Lic. Z61616</span></div>
      </div>

      <div className="bar">Confirm Receipt</div>
      <div className="region cr" data-r="4">
        <div className="cr-b">By signing, you are only confirming that you have received this form. You do not have to accept this loan because you have signed or received this form.</div>
        <div className="cr-sign"><span>Applicant Signature</span><span>Date</span></div>
        <div className="cr-sign"><span>Co-Applicant Signature</span><span>Date</span></div>
      </div>

      <div className="d-foot"><span>Closing Disclosure</span><span>PAGE 5 OF 5 · LOAN ID # 123456789</span></div>
    </>
  );
}

const PAGES = [Page1, Page2, Page3, Page4, Page5];

export default function CdForm({ page = 1 }: { page?: number }) {
  const Body = PAGES[page - 1] ?? Page1;
  return <Body />;
}

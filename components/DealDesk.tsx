'use client';
// components/DealDesk.tsx — the Module 6 deal desk: a pricing + lock simulation
// embedded on the pricing-locking unit. Follows the real PPE workflow the unit
// teaches, in five stages: (1) the borrower's file as the LOS holds it, (2) a
// target price + lock period set BEFORE any product is returned, (3) eligible
// and ineligible results (ineligible with expandable reasons), (4) a per-product
// detail with the rate ladder and the adjustment stack, (5) a lock REQUEST that
// sits Lock pending until the desk accepts, then inks the Loan Estimate.
// Post-lock: one extension, and a needs-re-price state if the file changes.
// In-session state only — the Worksheet/FormWalkthrough precedent. Microcopy is
// labels, not briefings.
import { useEffect, useMemo, useRef, useState } from 'react';
import MentorChat from './MentorChat';
import {
  COMP_POINTS,
  EXTENSIONS,
  LOCK_PERIODS,
  PRODUCTS,
  SCENARIO,
  adjustments,
  finalPrice,
  pmt,
  pointsDollars,
  type DeskProduct,
  type RateRung,
} from '@/content/module6/dealDesk';

const money0 = (n: number) => '$' + Math.round(Math.abs(n)).toLocaleString('en-US');
const money2 = (n: number) => '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const px = (n: number) => n.toFixed(3);
const parseNum = (s: string) => parseFloat(String(s).replace(/[^0-9.\-]/g, ''));

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

type Occ = 'primary' | 'investment';
type Comp = 'lp' | 'bp';
type LockState = 'none' | 'confirm' | 'pending' | 'locked' | 'reprice';

// the "least cash to close" graded prompt: right answer = the conv30 rung whose
// final price is highest (the deepest credit)
type QuizState = 'open' | 'right' | 'wrong' | 'done';

// checked dollar blank (Worksheet AskRow pattern; .ws-amt binds the calculator dock)
function DollarCheck({ target, label }: { target: number; label: string }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'empty' | 'wrong' | 'filled'>('empty');
  const check = () => {
    if (status === 'filled' || value.trim() === '') return;
    if (Math.abs(Math.abs(parseNum(value)) - Math.abs(target)) <= 1) setStatus('filled');
    else setStatus('wrong');
  };
  return (
    <div className="dd-check">
      <span className="dd-check-lab">{label}</span>
      <span className={'ws-amt ws-cell' + (status === 'filled' ? ' filled' : '') + (status === 'wrong' ? ' wrong' : '')}>
        <input
          type="text"
          inputMode="decimal"
          placeholder="—"
          aria-label={label}
          value={status === 'filled' ? money2(target) : value}
          readOnly={status === 'filled'}
          onChange={(e) => { setValue(e.target.value); if (status === 'wrong') setStatus('empty'); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); check(); } }}
          onBlur={check}
        />
        {status !== 'filled' && (
          <span className="ws-reveal" role="button" tabIndex={0} onClick={() => setStatus('filled')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStatus('filled'); } }}>
            show
          </span>
        )}
      </span>
    </div>
  );
}

export default function DealDesk() {
  // the file
  const [occ, setOcc] = useState<Occ>('primary');
  const [ssn, setSsn] = useState(false);
  const [lo, setLo] = useState(false);
  // the target
  const [price, setPrice] = useState('100.000');
  const [period, setPeriod] = useState<number | null>(null);
  const [searched, setSearched] = useState(false);
  // results + detail
  const [openId, setOpenId] = useState<string | null>(null);
  const [openReason, setOpenReason] = useState<string | null>(null);
  const [comp, setComp] = useState<Comp>('lp');
  const [quiz, setQuiz] = useState<QuizState>('open');
  // the lock
  const [lockState, setLockState] = useState<LockState>('none');
  const [lockRung, setLockRung] = useState<{ product: DeskProduct; rung: RateRung; price: number } | null>(null);
  const [lockPeriod, setLockPeriod] = useState(45);
  const [lockedAt, setLockedAt] = useState<Date | null>(null);
  const [ext, setExt] = useState<{ days: number; cost: number } | null>(null);
  const [gateMsg, setGateMsg] = useState(false);
  const pendToken = useRef(0);

  const eligible = PRODUCTS.filter((p) => p.eligible);
  const ineligible = PRODUCTS.filter((p) => !p.eligible);
  const open = openId ? PRODUCTS.find((p) => p.id === openId) ?? null : null;
  const stackFor = (p: DeskProduct) => adjustments(occ, p);

  // Lock pending → the desk accepts. One transition per request (token-guarded).
  useEffect(() => {
    if (lockState !== 'pending') return;
    const token = ++pendToken.current;
    const t = setTimeout(() => {
      if (pendToken.current === token) {
        setLockState('locked');
        setLockedAt(new Date());
      }
    }, 2600);
    return () => clearTimeout(t);
  }, [lockState]);

  const targetOk = !Number.isNaN(parseNum(price)) && parseNum(price) > 90 && parseNum(price) < 110;
  const canSearch = targetOk && period != null;

  const search = () => {
    if (!canSearch) return;
    setSearched(true);
    setLockPeriod(period!);
    setOpenId(null);
  };

  // editing the file after a lock = the stack no longer matches the locked price
  const setOccupancy = (o: Occ) => {
    if (o === occ) return;
    setOcc(o);
    setQuiz((q) => (q === 'open' ? q : 'done'));
    if (lockState === 'locked' || lockState === 'pending') {
      pendToken.current++;
      setLockState('reprice');
    }
  };

  const rerun = () => {
    setLockState('none');
    setLockRung(null);
    setExt(null);
    setLockedAt(null);
    setOpenId(null);
  };

  const bestCreditRung = useMemo(() => {
    const p = PRODUCTS.find((x) => x.id === 'conv30')!;
    const stack = adjustments('primary', p);
    return p.ladder!.reduce((best, r) =>
      finalPrice(r, lockPeriod, stack, 'lp') > finalPrice(best, lockPeriod, stack, 'lp') ? r : best,
    );
  }, [lockPeriod]);

  const onRow = (p: DeskProduct, r: RateRung, fp: number) => {
    if (lockState === 'pending' || lockState === 'locked') return;
    if (quiz === 'open' && searched) {
      if (p.id === 'conv30') {
        setQuiz(r.rate === bestCreditRung.rate ? 'right' : 'wrong');
        return;
      }
    }
    setLockRung({ product: p, rung: r, price: fp });
    setLockState('confirm');
    setGateMsg(false);
  };

  const requestLock = () => {
    if (!ssn || !lo) { setGateMsg(true); return; }
    setGateMsg(false);
    setLockState('pending');
  };

  const expires = lockedAt
    ? new Date(lockedAt.getTime() + (lockPeriod + (ext?.days ?? 0)) * 86400000)
    : null;

  const lockedDollars = lockRung ? pointsDollars(lockRung.price, SCENARIO.loan) : 0;

  return (
    <div className="dd" role="group" aria-label={`${SCENARIO.lender} pricing and lock desk`}>
      <div className="dd-head">
        <div className="dd-mark" aria-hidden="true">{SCENARIO.lender.charAt(0)}</div>
        <div>
          <div className="dd-lender">{SCENARIO.lender}</div>
          <div className="dd-doc">{SCENARIO.desk}</div>
        </div>
        <div className="dd-status">
          {lockState === 'pending' && <span className="dd-chip pend">Lock pending</span>}
          {lockState === 'locked' && expires && (
            <span className="dd-chip locked">Locked · {lockPeriod + (ext?.days ?? 0)} days · expires {fmtDate(expires)}</span>
          )}
          {lockState === 'reprice' && <span className="dd-chip reprice">Needs re-price</span>}
          {(lockState === 'none' || lockState === 'confirm') && <span className="dd-chip">Float</span>}
        </div>
      </div>

      {/* 1 · the file */}
      <div className="dd-sec">The loan file</div>
      <div className="dd-file">
        <div className="dd-f"><span>Borrower</span><b>{SCENARIO.borrower}</b></div>
        <div className="dd-f"><span>Purpose</span><b>{SCENARIO.purpose}</b></div>
        <div className="dd-f">
          <span>Occupancy</span>
          <span className="dd-seg" role="group" aria-label="Occupancy">
            <button type="button" className={occ === 'primary' ? 'on' : ''} onClick={() => setOccupancy('primary')}>Primary</button>
            <button type="button" className={occ === 'investment' ? 'on' : ''} onClick={() => setOccupancy('investment')}>Investment</button>
          </span>
        </div>
        <div className="dd-f"><span>Property</span><b>{SCENARIO.propertyType}</b></div>
        <div className="dd-f"><span>Location</span><b>{SCENARIO.location}</b></div>
        <div className="dd-f"><span>Value</span><b>{money0(SCENARIO.value)}</b></div>
        <div className="dd-f"><span>Loan</span><b>{money0(SCENARIO.loan)} · LTV {SCENARIO.ltv}</b></div>
        <div className="dd-f"><span>Credit · DTI</span><b>{SCENARIO.fico} · {SCENARIO.dti}</b></div>
        <div className="dd-f"><span>Escrow</span><b>{SCENARIO.escrow}</b></div>
        <div className="dd-f">
          <span>SSN</span>
          {ssn ? <b>{SCENARIO.ssnMasked}</b> : (
            <button type="button" className="dd-fix" onClick={() => setSsn(true)}>Not on file — collect</button>
          )}
        </div>
        <div className="dd-f">
          <span>Loan officer</span>
          {lo ? <b>Assigned · you</b> : (
            <button type="button" className="dd-fix" onClick={() => setLo(true)}>Unassigned — assign</button>
          )}
        </div>
      </div>

      {/* 2 · the target */}
      <div className="dd-sec">Target</div>
      <div className="dd-target">
        <label className="dd-t">
          <span>Desired price</span>
          <input
            type="text"
            inputMode="decimal"
            value={price}
            aria-label="Desired price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <div className="dd-t">
          <span>Lock period</span>
          <span className="dd-seg" role="group" aria-label="Lock period">
            {LOCK_PERIODS.map((d) => (
              <button key={d} type="button" className={period === d ? 'on' : ''} onClick={() => setPeriod(d)}>{d}</button>
            ))}
          </span>
        </div>
        <button type="button" className="dd-search" disabled={!canSearch} onClick={search}>Search</button>
      </div>

      {/* 3 · results */}
      {searched && (
        <>
          {quiz !== 'done' && (
            <div className={'dd-quiz' + (quiz === 'right' ? ' ok' : '') + (quiz === 'wrong' ? ' no' : '')}>
              {quiz === 'open' && <p>Maya wants the least cash at closing. Open the 30-year ladder and choose the row that does it.</p>}
              {quiz === 'right' && (
                <p>7.125% — the deepest credit on the sheet. Premium pricing: the higher rate generates {money0(pointsDollars(finalPrice(bestCreditRung, lockPeriod, adjustments('primary', PRODUCTS[0]), 'lp'), SCENARIO.loan))} toward her closing costs, and she must qualify at that payment. <button type="button" className="dd-fix" onClick={() => setQuiz('done')}>Continue</button></p>
              )}
              {quiz === 'wrong' && (
                <p>That row prices below the top of the ladder — she'd bring more cash than she needs to. The least cash sits at the highest rate, where the credit is deepest. <button type="button" className="dd-fix" onClick={() => setQuiz('open')}>Try again</button></p>
              )}
            </div>
          )}

          <div className="dd-sec">Eligible · {lockPeriod}-day lock</div>
          <div className="dd-elig">
            {eligible.map((p) => {
              const stack = stackFor(p);
              const isOpen = openId === p.id;
              return (
                <div key={p.id} className={'dd-prod' + (isOpen ? ' open' : '')}>
                  <button type="button" className="dd-prow" aria-expanded={isOpen} onClick={() => setOpenId(isOpen ? null : p.id)}>
                    <span className="dd-pname">{p.name}</span>
                    <span className="dd-pmeta">{p.ladder!.length} rates</span>
                  </button>
                  {isOpen && (
                    <div className="dd-detail">
                      <div className="dd-comp" role="group" aria-label="Compensation">
                        <button type="button" className={comp === 'lp' ? 'on' : ''} onClick={() => setComp('lp')}>Lender-paid</button>
                        <button type="button" className={comp === 'bp' ? 'on' : ''} onClick={() => setComp('bp')}>Borrower-paid</button>
                      </div>
                      <table className="dd-ladder">
                        <thead>
                          <tr><th>Rate</th><th>Price</th><th>Points / credit</th><th>P&amp;I</th></tr>
                        </thead>
                        <tbody>
                          {p.ladder!.map((r) => {
                            const fp = finalPrice(r, lockPeriod, stack, comp);
                            const dollars = pointsDollars(fp, SCENARIO.loan);
                            const sel = lockRung && lockRung.product.id === p.id && lockRung.rung.rate === r.rate && lockState !== 'none';
                            const nearTarget = Math.abs(fp - parseNum(price)) <= 0.1875;
                            return (
                              <tr
                                key={r.rate}
                                className={(sel ? 'sel ' : '') + (nearTarget ? 'near' : '')}
                                onClick={() => onRow(p, r, fp)}
                              >
                                <td>{r.rate.toFixed(3)}%</td>
                                <td>{px(fp)}</td>
                                <td>{fp === 100 ? 'par' : (fp < 100 ? `${px(100 - fp)} pts · ${money0(dollars)}` : `credit ${money0(dollars)}`)}</td>
                                <td>{money2(pmt(SCENARIO.loan, r.rate, p.termMonths))}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {comp === 'bp' && (
                        <p className="dd-fine">Borrower-paid: the sheet improves by {COMP_POINTS.toFixed(3)} — and an origination fee of {COMP_POINTS.toFixed(3)}% ({money0((COMP_POINTS / 100) * SCENARIO.loan)}) is paid directly by the borrower. Same loan; the compensation moved out of the rate.</p>
                      )}
                      <div className="dd-stack">
                        <div className="dd-stack-h">Where the price comes from</div>
                        <div className="dd-srow"><span>Lock period · {lockPeriod} days</span><b>{PERIOD_ADJ_LABEL(lockPeriod)}</b></div>
                        {stack.map((a) => (
                          <div className="dd-srow" key={a.label}><span>{a.label}</span><b>{a.amount === 0 ? 'none' : (a.amount > 0 ? '+' : '−') + Math.abs(a.amount).toFixed(3)}</b></div>
                        ))}
                        <div className="dd-srow tot"><span>Stack total — applied to every rung’s base</span><b>{a11(stack)}</b></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="dd-sec">Ineligible</div>
          <div className="dd-inelig">
            {ineligible.map((p) => (
              <div key={p.id} className="dd-prod inel">
                <button type="button" className="dd-prow" aria-expanded={openReason === p.id} onClick={() => setOpenReason(openReason === p.id ? null : p.id)}>
                  <span className="dd-pname">{p.name}</span>
                  <span className="dd-pmeta">why</span>
                </button>
                {openReason === p.id && <div className="dd-reason">{p.reason}</div>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* 5 · the lock request */}
      {lockState === 'confirm' && lockRung && (
        <div className="dd-confirm">
          <div className="dd-stack-h">Lock request</div>
          <div className="dd-srow"><span>Loan</span><b>{money0(SCENARIO.loan)} · {lockRung.product.name}</b></div>
          <div className="dd-srow"><span>Borrower</span><b>{SCENARIO.borrower}</b></div>
          <div className="dd-srow"><span>Lock</span><b>{lockRung.rung.rate.toFixed(3)}% · price {px(lockRung.price)} · {lockPeriod} days</b></div>
          {gateMsg && (
            <div className="dd-block">The request can&apos;t go: the file needs the borrower&apos;s SSN and an assigned loan officer.</div>
          )}
          <button type="button" className="dd-search" onClick={requestLock}>Request lock</button>
        </div>
      )}

      {lockState === 'reprice' && (
        <div className="dd-confirm">
          <div className="dd-block warn">The file changed after the lock — the adjustment stack no longer matches the locked price. A material change re-prices a locked loan.</div>
          <button type="button" className="dd-search" onClick={rerun}>Re-run pricing</button>
        </div>
      )}

      {/* the inked Loan Estimate */}
      {lockState === 'locked' && lockRung && expires && (
        <>
          <div className="dd-le" aria-label="Loan Estimate, page 1, reflecting the lock">
            <div className="dd-le-head">
              <span className="dd-le-t">Loan Estimate</span>
              <span className="dd-le-p">page 1 of 3</span>
            </div>
            <div className="dd-le-row"><span>Loan amount</span><i>{money0(SCENARIO.loan)}</i></div>
            <div className="dd-le-row"><span>Interest rate</span><i>{lockRung.rung.rate.toFixed(3)}%</i></div>
            <div className="dd-le-row"><span>Monthly principal &amp; interest</span><i>{money2(pmt(SCENARIO.loan, lockRung.rung.rate, lockRung.product.termMonths))}</i></div>
            <div className="dd-le-row"><span>{lockRung.price < 100 ? 'Points' : 'Lender credit'}</span><i>{lockRung.price === 100 ? '—' : money0(lockedDollars)}</i></div>
            <div className="dd-le-row"><span>Rate lock</span><i>YES · until {fmtDate(expires)}</i></div>
            <div className="dd-le-fine">Out within 3 business days of application — this one reflects the accepted lock.</div>
          </div>

          {lockRung.price !== 100 && (
            <DollarCheck
              target={lockedDollars}
              label={lockRung.price < 100 ? `${px(100 - lockRung.price)} points on ${money0(SCENARIO.loan)} costs` : `A price of ${px(lockRung.price)} credits`}
            />
          )}

          {!ext ? (
            <div className="dd-extend">
              <span className="dd-check-lab">Closing slips? Extend the lock</span>
              {EXTENSIONS.map((e) => (
                <button key={e.days} type="button" className="dd-fix" onClick={() => setExt(e)}>
                  {e.days} days · {e.cost.toFixed(3)}
                </button>
              ))}
            </div>
          ) : (
            <p className="dd-fine">Extended {ext.days} days for {ext.cost.toFixed(3)} ({money0((ext.cost / 100) * SCENARIO.loan)}) — new expiration {fmtDate(expires)}. A lapsed lock relocks at worst-case pricing instead.</p>
          )}
        </>
      )}

      <MentorChat
        desk={`occupancy ${occ}; target price ${price}, period ${period ?? 'unset'}; ${searched ? 'searched' : 'not searched yet'}; comp ${comp === 'lp' ? 'lender-paid' : 'borrower-paid'}; lock ${lockState}${lockRung ? ` at ${lockRung.rung.rate.toFixed(3)}% price ${px(lockRung.price)} (${lockRung.product.name})` : ''}`}
      />

      <div className="dd-foot">
        Product changes, relocks, and lock concessions exist on a real desk but aren&apos;t built here. A real engine also spans dozens of investors, more search styles, and the margin and rule configuration behind the secondary desk — outside an originator&apos;s seat.
      </div>
    </div>
  );
}

// tiny label helpers kept below the component for readability
function PERIOD_ADJ_LABEL(period: number): string {
  return { 15: '+0.250', 30: '+0.125', 45: '± 0', 60: '−0.250' }[period as 15 | 30 | 45 | 60] ?? '';
}
function a11(stack: { amount: number }[]): string {
  const s = stack.reduce((n, a) => n + a.amount, 0);
  return s === 0 ? '± 0' : (s > 0 ? '+ ' : '− ') + Math.abs(s).toFixed(3);
}

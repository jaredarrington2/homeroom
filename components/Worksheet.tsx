"use client";

// components/Worksheet.tsx — a chained computational cloze rendered as a lender's loan
// worksheet. The learner fills the blank amount lines; each answer feeds the next, and the
// statement checks it against derive() (the single source of truth). A wordless pencil icon
// in the letterhead flips to the explorer: the assumptions become editable and every asked
// line prints live. Reuses the cloze answer-check (lib/answer). In-session state only —
// same precedent as FormWalkthrough / flashcard flips.
//
// Nodes are referenced through React state, never named-element globals — the bug the
// prototype fixed was a reliance on getElementById lookups that dropped line items.
import { useMemo, useState } from "react";
import type { WorksheetKind, WorksheetScenario, WorksheetStep } from "@/lib/section";
import { checkAnswer } from "@/lib/answer";
import { fhaScenario, derive as fhaDerive, type FhaInputs } from "@/content/worksheets/fha";

type Derive = (i: Record<string, number>) => Record<string, number>;

const DATA: Partial<Record<WorksheetKind, { scenario: WorksheetScenario; derive: Derive }>> = {
  "fha-structure": { scenario: fhaScenario, derive: fhaDerive as unknown as Derive },
};

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n: number) => "$" + fmt(n);
const parseNum = (s: string) => parseFloat(String(s).replace(/[^0-9.\-]/g, "")) || 0;
const stripTags = (s: string) => s.replace(/<[^>]+>/g, "");

// live-format a currency input to $1,234.56 as the user types
function fmtMoney(str: string): string {
  let s = String(str).replace(/[^0-9.]/g, "");
  const i = s.indexOf(".");
  if (i !== -1) s = s.slice(0, i + 1) + s.slice(i + 1).replace(/\./g, "");
  if (s === "") return "";
  const [aRaw, b] = s.split(".");
  const a = aRaw ? parseInt(aRaw, 10).toLocaleString("en-US") : "0";
  return "$" + (b !== undefined ? a + "." + b.slice(0, 2) : a);
}

function PencilIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

// one asked (checked) line. Local state for the transient typed value / wrong / tried;
// lifts to the parent only when it locks correct (progress tally).
function AskRow({
  step,
  target,
  answered,
  onLock,
}: {
  step: WorksheetStep;
  target: number;
  answered: boolean;
  onLock: (key: string) => void;
}) {
  const [value, setValue] = useState(answered ? fmt(target) : "");
  const [status, setStatus] = useState<"empty" | "wrong" | "tried" | "filled">(answered ? "filled" : "empty");

  const lock = () => {
    setValue(fmt(target));
    setStatus("filled");
    onLock(step.key);
  };
  const check = () => {
    if (status === "filled" || value.trim() === "") return;
    const numeric = Math.abs(parseNum(value) - target) <= 0.01;
    const accepted = step.accept ? checkAnswer(value, step.accept) : false;
    if (numeric || accepted) lock();
    else setStatus("wrong");
  };

  const cls = "ws-amt ws-cell" + (status === "filled" ? " filled" : "") + (status === "wrong" ? " wrong" : "") + (status === "tried" ? " tried" : "");

  return (
    <div className={cls}>
      <input
        type="text"
        inputMode="decimal"
        placeholder="—"
        aria-label={stripTags(step.label)}
        value={value}
        readOnly={status === "filled"}
        onChange={(e) => {
          setValue(e.target.value);
          if (status === "wrong") setStatus("tried");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            check();
          }
        }}
        onBlur={check}
      />
      {status !== "filled" && (
        <span className="ws-reveal" role="button" tabIndex={0} onClick={lock} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lock(); } }}>
          show
        </span>
      )}
    </div>
  );
}

export default function Worksheet({ kind }: { kind: WorksheetKind }) {
  const entry = DATA[kind];
  const [editing, setEditing] = useState(false);
  const [answered, setAnswered] = useState<Set<string>>(new Set());
  // explorer input strings, seeded from the scenario defaults (currency pre-formatted)
  const [vals, setVals] = useState<Record<string, string>>(() => {
    const seed: Record<string, string> = {};
    if (entry) {
      for (const f of entry.scenario.explorer) {
        const n = entry.scenario.inputs[f.key];
        seed[f.key] = f.kind === "currency" ? money(n) : String(n);
      }
    }
    return seed;
  });

  const askKeys = useMemo(
    () => (entry ? entry.scenario.sections.flatMap((s) => s.steps).filter((st) => st.ask).map((st) => st.key) : []),
    [entry],
  );

  if (!entry) return null;
  const { scenario, derive } = entry;

  // drill uses the fixed scenario defaults; explorer uses the live edited values
  const activeInputs: Record<string, number> = editing
    ? Object.fromEntries(scenario.explorer.map((f) => [f.key, parseNum(vals[f.key] ?? "")]))
    : scenario.inputs;
  const d = derive(activeInputs);

  const onLock = (key: string) =>
    setAnswered((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });

  const toggleEdit = () => {
    setEditing((was) => {
      const now = !was;
      if (!now) {
        // reset the assumptions back to defaults on the way out
        const seed: Record<string, string> = {};
        for (const f of scenario.explorer) {
          const n = scenario.inputs[f.key];
          seed[f.key] = f.kind === "currency" ? money(n) : String(n);
        }
        setVals(seed);
      }
      return now;
    });
  };

  const initials = scenario.lender.charAt(0).toUpperCase();

  return (
    <div className="ws" role="group" aria-label={`${scenario.lender} loan worksheet`}>
      <div className="ws-head">
        <div className="ws-lender">
          <div className="ws-mark" aria-hidden="true">{initials}</div>
          <div>
            <div className="ws-name">{scenario.lender}</div>
            <div className="ws-doc">Loan structuring worksheet</div>
          </div>
        </div>
        <button
          type="button"
          className={"ws-edit" + (editing ? " on" : "")}
          aria-pressed={editing}
          title={editing ? "Back to the worksheet" : "Edit the assumptions"}
          aria-label={editing ? "Back to the worksheet" : "Edit the assumptions"}
          onClick={toggleEdit}
        >
          <PencilIcon />
        </button>
      </div>

      <div className="ws-meta">
        <span><b>Program</b> {scenario.program}</span>
        <span><b>Borrower</b> {scenario.borrower}</span>
        <span><b>Rate</b> {scenario.rate}</span>
      </div>

      {editing && (
        <div className="ws-exp">
          {scenario.explorer.map((f) => (
            <label key={f.key} data-tip={f.tip}>
              {f.label}
              <input
                type={f.kind === "currency" ? "text" : "number"}
                inputMode="decimal"
                step={f.step}
                value={vals[f.key] ?? ""}
                onChange={(e) => {
                  const raw = e.target.value;
                  setVals((prev) => ({ ...prev, [f.key]: f.kind === "currency" ? fmtMoney(raw) : raw }));
                }}
              />
            </label>
          ))}
        </div>
      )}

      <div className="ws-body">
        {scenario.sections.map((sec) => (
          <div key={sec.title}>
            <div className="ws-sec">{sec.title}</div>
            {sec.steps.map((step) => {
              const v = d[step.key];
              const printed = step.given || editing;
              return (
                <div className={"ws-row" + (step.total ? " tot" : "")} key={step.key}>
                  <div className="ws-lab">
                    <span className="ws-op">{step.op || ""}</span>
                    <span dangerouslySetInnerHTML={{ __html: step.label }} />
                  </div>
                  {printed ? (
                    <div className="ws-amt ws-cell">{money(v)}</div>
                  ) : (
                    <AskRow step={step} target={v} answered={answered.has(step.key)} onLock={onLock} />
                  )}
                  {step.scrawl && !editing && <span className="ws-scrawl">{step.scrawl} ↓</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="ws-foot">
        {scenario.footnote && <div className="ws-fine">{scenario.footnote}</div>}
        <div className="ws-prog">{editing ? "live figures" : `${answered.size} of ${askKeys.length} filled`}</div>
      </div>
    </div>
  );
}

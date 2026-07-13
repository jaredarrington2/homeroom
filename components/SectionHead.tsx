// components/SectionHead.tsx — the one header language for every /learn surface.
// Two levels, one CSS block (.sh-*):
//   ModuleMasthead — once per chapter page: MODULE N · title · "{n} sections · {m} read"
//   SectionHead    — once per unit/section: MODULE N · SECTION 0i / NN · name · statute
// The eyebrow says WHERE you are, never what's inside. No taglines, no teasers.
import SectionsReadMeta from "./SectionsReadMeta";

const pad = (n: number) => String(n).padStart(2, "0");

export function ModuleMasthead({
  moduleNumber,
  title,
  sectionCount,
  unitIds,
}: {
  moduleNumber: number;
  title: string;
  sectionCount: number;
  /** Reader unit ids for the live "· m read" count (client). Omit to show only the count. */
  unitIds?: string[];
}) {
  return (
    <header className="sh-module">
      <div className="sh-eyebrow">Module {moduleNumber}</div>
      <h1 className="sh-mtitle">{title}</h1>
      <div className="sh-meta">
        {sectionCount} section{sectionCount === 1 ? "" : "s"}
        {unitIds && unitIds.length > 0 && <SectionsReadMeta unitIds={unitIds} />}
      </div>
    </header>
  );
}

export default function SectionHead({
  moduleNumber,
  sectionName,
  sectionIndex,
  sectionTotal,
  statute,
  children,
}: {
  moduleNumber: number;
  sectionName: string;
  /** 1-based. */
  sectionIndex: number;
  sectionTotal: number;
  /** The law's actual name (unit.reg) — only where a statute exists. */
  statute?: string;
  /** Slot for the Listen entry, kept inside the head. */
  children?: React.ReactNode;
}) {
  return (
    <div className="sh-section">
      <div className="sh-eyebrow">
        Module {moduleNumber} · Section {pad(sectionIndex)} / {pad(sectionTotal)}
      </div>
      <h2 className="sh-title">{sectionName}</h2>
      {statute && <div className="sh-statute">{statute}</div>}
      {children}
    </div>
  );
}

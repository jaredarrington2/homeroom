"use client";
// components/ListenEntry.tsx — the NYT-style entry button under a unit's title.
// "Listen" when there's no saved spot; "Resume — section N" when there is (N read from the
// saved segment id, no manifest needed); "Listening" while this unit is the active one.
import { useEffect, useState } from "react";
import { useListenActions, useListenState } from "@/lib/ListenContext";

function sectionOf(segmentId: string): number | null {
  const m = /-g(\d+)-/.exec(segmentId);
  return m ? Number(m[1]) + 1 : null;
}

export default function ListenEntry({ unitId }: { unitId: string }) {
  const { start } = useListenActions();
  const { activeUnitId, status, posVersion } = useListenState();
  const [resumeSection, setResumeSection] = useState<number | null>(null);

  useEffect(() => {
    const pos = localStorage.getItem(`homeroom_listen_pos_${unitId}`);
    setResumeSection(pos ? sectionOf(pos) : null);
  }, [unitId, posVersion]);

  const isActive = activeUnitId === unitId && status !== "idle";
  const label = isActive ? "Listening" : resumeSection ? `Resume — section ${resumeSection}` : "Listen";

  return (
    <button className="lp-entry" onClick={() => start(unitId)} aria-label={label}>
      <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M4 3l9 5-9 5z" />
      </svg>
      <span>{label}</span>
    </button>
  );
}

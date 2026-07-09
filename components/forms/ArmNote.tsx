// components/forms/ArmNote.tsx — the ARM note artifact for FormWalkthrough. Unlike LeForm/CdForm
// (hard-coded government forms), this renders a labeled-field document from config (arm-note.ts) —
// the generalized artifact slot per the slice-3 spec. Each field is a .region[data-r=N] row, so
// the shared gliding highlight (.fw-spot) lands on it unchanged. Single page; accepts and
// ignores `page` so it shares FormWalkthrough's form slot with the multi-page LE/CD forms.
import { armNoteWalk } from "@/content/forms/arm-note";

export default function ArmNote(_props: { page?: number }) {
  const fields = armNoteWalk.fields ?? [];
  return (
    <div className="arm-note">
      {fields.map((f, idx) => (
        <div className="region arm-nrow" data-r={idx + 1} key={f.label}>
          <span className="arm-nlabel">{f.label}</span>
          <span className="arm-nval">{f.value}</span>
        </div>
      ))}
    </div>
  );
}

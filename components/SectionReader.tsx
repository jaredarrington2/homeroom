// components/SectionReader.tsx — renders one SectionContent in the recall-gradient design:
// a section masthead, then every unit through UnitReader (concept groups with woven recall
// + an end-of-unit review deck). Single reading column; canon tokens.
import UnitReader from "./UnitReader";
import ReaderDeepLink from "./ReaderDeepLink";
import { ModuleMasthead } from "./SectionHead";
import type { SectionContent } from "@/lib/section";

export default function SectionReader({ section }: { section: SectionContent }) {
  return (
    <div className="section-reader">
      <ReaderDeepLink />
      <ModuleMasthead
        moduleNumber={section.moduleNumber}
        title={section.title}
        sectionCount={section.units.length}
        unitIds={section.units.map((u) => u.id)}
      />

      {section.units.map((unit, i) => (
        <UnitReader
          key={unit.id}
          unit={unit}
          index={i}
          total={section.units.length}
          moduleNumber={section.moduleNumber}
          sectionId={section.id}
          sectionTitle={section.title}
        />
      ))}
    </div>
  );
}

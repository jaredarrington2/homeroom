// components/SectionReader.tsx — renders one SectionContent in the recall-gradient design:
// a section masthead, then every unit through UnitReader (concept groups with woven recall
// + an end-of-unit review deck). Single reading column; canon tokens.
import UnitReader from "./UnitReader";
import type { SectionContent } from "@/lib/section";

export default function SectionReader({ section }: { section: SectionContent }) {
  return (
    <div className="section-reader">
      <header className="sr-masthead">
        <div className="eyebrow">{section.kicker}</div>
        <h1>{section.title}</h1>
      </header>

      {section.units.map((unit, i) => (
        <UnitReader
          key={unit.id}
          unit={unit}
          index={i}
          total={section.units.length}
          sectionId={section.id}
          sectionTitle={section.title}
        />
      ))}
    </div>
  );
}

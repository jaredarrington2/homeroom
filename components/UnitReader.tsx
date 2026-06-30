// components/UnitReader.tsx — one law/topic, read top to bottom with recall woven through:
// concept groups (heading + optional small anchor + prose with inline cloze + optional synth),
// then an end-of-unit review deck. Narrative wrapped in ExplainableBody so highlight-to-explain works.
import Image from "next/image";
import ExplainableBody from "@/components/ExplainableBody";
import ClozeProse from "./ClozeProse";
import Synth from "./Synth";
import ReviewDeck from "./ReviewDeck";
import DefinitionsDeck from "./DefinitionsDeck";
import DisclosureVisual from "./DisclosureVisual";
import MarkComplete from "./MarkComplete";
import RecapCard from "./RecapCard";
import { figureSrc, type SectionUnit } from "@/lib/section";

export default function UnitReader({
  unit, index, total, sectionId, sectionTitle,
}: {
  unit: SectionUnit;
  index: number;
  total: number;
  sectionId: string;
  sectionTitle: string;
}) {
  return (
    <section id={unit.id} className="sr-unit">
      <div className="sr-unithead">
        <div className="eyebrow">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <h2>{unit.name}</h2>
        <div className="reg">{unit.reg}</div>
      </div>

      <ExplainableBody sectionId={sectionId} sectionTitle={sectionTitle} chapterId={sectionId}>
        {unit.groups.map((g, gi) => (
          <div className="group-block" key={gi}>
            {g.heading && <div className="group">{g.heading}</div>}
            {g.anchor && (
              <figure className="anchor">
                <Image
                  src={figureSrc(g.anchor)}
                  alt=""
                  width={170}
                  height={120}
                  unoptimized
                  loading="eager"
                  style={{ height: 118, width: "auto", display: "block" }}
                />
                <figcaption>{g.anchor.caption}</figcaption>
              </figure>
            )}
            <ClozeProse paras={g.paras} unitId={unit.id} groupIndex={gi} />
            {g.visual && <DisclosureVisual kind={g.visual} />}
            {g.synth && <Synth q={g.synth.q} a={g.synth.a} unitId={unit.id} synthId={`${unit.id}-synth-${gi}`} />}
          </div>
        ))}
      </ExplainableBody>

      {unit.definitions && unit.definitions.length > 0 && (
        <DefinitionsDeck defs={unit.definitions} name={unit.name} unitId={unit.id} />
      )}

      <ReviewDeck review={unit.review} name={unit.name} unitId={unit.id} />

      <div className="sr-unit-foot">
        {unit.recap && (
          <RecapCard unitName={unit.name} reg={unit.reg} recap={unit.recap} />
        )}
        <MarkComplete sectionId={unit.id} />
      </div>
    </section>
  );
}

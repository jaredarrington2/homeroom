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
import ListenEntry from "./ListenEntry";
import ListenMark from "./ListenMark";
import StudyCard from "./StudyCard";
import FormWalkthrough from "./FormWalkthrough";
import { figureSrc, type SectionUnit } from "@/lib/section";
import { getStudyCard } from "@/content/study-cards";

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
        <ListenEntry unitId={unit.id} />
      </div>

      <ExplainableBody sectionId={sectionId} sectionTitle={sectionTitle} chapterId={sectionId}>
        {unit.groups.map((g, gi) => (
          <div className="group-block" key={gi}>
            {g.heading && <div className="group">{g.heading}</div>}
            {g.anchor && (
              <figure className="anchor" id={g.anchor.spokenCaption ? `audio-${unit.id}-g${gi}-img` : undefined}>
                {g.anchor.spokenCaption && <ListenMark id={`audio-${unit.id}-g${gi}-img`} unitId={unit.id} />}
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
            {g.illustration && (
              <figure className="sr-illus">
                <Image
                  src={figureSrc(g.illustration)}
                  alt={g.illustration.caption}
                  width={1508}
                  height={983}
                  unoptimized
                  loading="eager"
                  sizes="(max-width: 40rem) 100vw, 40rem"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <figcaption>{g.illustration.caption}</figcaption>
              </figure>
            )}
            {g.visual && <DisclosureVisual kind={g.visual} />}
            {g.walkthrough && <FormWalkthrough form={g.walkthrough} />}
            {g.studyCard && getStudyCard(g.studyCard) && <StudyCard card={getStudyCard(g.studyCard)!} />}
            {g.synth && <Synth q={g.synth.q} a={g.synth.a} unitId={unit.id} groupIndex={gi} synthId={`${unit.id}-synth-${gi}`} />}
          </div>
        ))}
      </ExplainableBody>

      {unit.definitions && unit.definitions.length > 0 && (
        <DefinitionsDeck defs={unit.definitions} name={unit.name} unitId={unit.id} />
      )}

      <ReviewDeck review={unit.review} name={unit.name} unitId={unit.id} />

      <div className="sr-unit-foot">
        {unit.recap && (
          <RecapCard unitName={unit.name} reg={unit.reg} recap={unit.recap} unitId={unit.id} />
        )}
        <MarkComplete sectionId={unit.id} />
      </div>
    </section>
  );
}

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
import ClearSection from "./ClearSection";
import RecapCard from "./RecapCard";
import SectionHead from "./SectionHead";
import VisitTracker from "./VisitTracker";
import ListenEntry from "./ListenEntry";
import ListenMark from "./ListenMark";
import StudyCard from "./StudyCard";
import FormWalkthrough from "./FormWalkthrough";
import Worksheet from "./Worksheet";
import CapLadder from "./CapLadder";
import PiggybackStack from "./PiggybackStack";
import RepaymentShapes from "./RepaymentShapes";
import InkCard from "./InkCard";
import { figureSrc, type SectionUnit } from "@/lib/section";
import { getStudyCard } from "@/content/study-cards";

export default function UnitReader({
  unit, index, total, moduleNumber, sectionId, sectionTitle,
}: {
  unit: SectionUnit;
  index: number;
  total: number;
  moduleNumber: number;
  sectionId: string;
  sectionTitle: string;
}) {
  // Alternate anchor images left/right corner down the unit so they don't all stack
  // in the same corner. Counter resets per unit (one UnitReader renders one unit).
  let anchorSeen = 0;
  return (
    <section id={unit.id} className="sr-unit">
      <SectionHead
        moduleNumber={moduleNumber}
        sectionName={unit.name}
        sectionIndex={index + 1}
        sectionTotal={total}
        statute={unit.reg}
      >
        <VisitTracker chapterId={sectionId} sectionId={unit.id} />
        <ListenEntry unitId={unit.id} />
      </SectionHead>

      <ExplainableBody sectionId={sectionId} sectionTitle={sectionTitle} chapterId={sectionId}>
        {unit.groups.map((g, gi) => {
          const anchorSide = g.anchor ? (anchorSeen++ % 2 === 0 ? "anchor-right" : "anchor-left") : "";
          return (
          <div className="group-block" key={gi} id={`grp-${unit.id}-${gi}`} style={{ scrollMarginTop: 72 }}>
            {g.heading && <div className="group">{g.heading}</div>}
            {g.anchor && (
              <figure className={`anchor ${anchorSide}`} id={g.anchor.spokenCaption ? `audio-${unit.id}-g${gi}-img` : undefined}>
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
            {g.worksheet && <Worksheet kind={g.worksheet} />}
            {g.vizWidget === "piggyback" && <PiggybackStack />}
            {g.vizWidget && g.vizWidget !== "piggyback" && <CapLadder kind={g.vizWidget} />}
            {g.diagram === "repayment-shapes" && <RepaymentShapes />}
            {g.inkCard && <InkCard kind={g.inkCard} />}
            {g.studyCard && getStudyCard(g.studyCard) && <StudyCard card={getStudyCard(g.studyCard)!} />}
            {g.synth && <Synth q={g.synth.q} a={g.synth.a} unitId={unit.id} groupIndex={gi} synthId={`${unit.id}-synth-${gi}`} />}
          </div>
          );
        })}
      </ExplainableBody>

      {unit.definitions && unit.definitions.length > 0 && (
        <DefinitionsDeck defs={unit.definitions} name={unit.name} unitId={unit.id} />
      )}

      <ReviewDeck review={unit.review} name={unit.name} unitId={unit.id} />

      <div className="sr-unit-foot">
        {unit.recap && (
          <RecapCard unitName={unit.name} reg={unit.reg} recap={unit.recap} unitId={unit.id} />
        )}
        <ClearSection unitId={unit.id} />
        <MarkComplete sectionId={unit.id} />
      </div>
    </section>
  );
}

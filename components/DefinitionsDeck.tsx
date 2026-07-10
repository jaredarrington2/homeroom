"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import type { Definition } from "@/lib/section";
import { useProgressContext } from "@/lib/ProgressContext";

const LightbulbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
    <line x1="9" y1="21" x2="15" y2="21"/>
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

function shadowCount(n: number) {
  if (n >= 4) return 3;
  if (n === 3) return 2;
  if (n === 2) return 1;
  return 0;
}

function BackRules() {
  return (
    <div className="back-rules">
      {Array.from({ length: 8 }, (_, i) => <span key={i} />)}
    </div>
  );
}

function CardFaces({ d, name }: { d: Definition; name: string }) {
  return (
    <div className="defs-card-inner">
      <div className="defface deffront">
        <span className="def-label">{name}</span>
        <div className="def-front-rule" />
        <div className="defterm">{d.term}</div>
      </div>
      <div className="defface defback">
        <BackRules />
        <div className="defterm-sm">{d.term}</div>
        <div className="defbody">{d.def}</div>
      </div>
    </div>
  );
}

function Pile({
  pile, idx, defs, name, flipped,
  onFlip, onSort, onNext, sortIcon, sortTitle,
}: {
  pile: number[]; idx: number; defs: Definition[]; name: string; flipped: boolean;
  onFlip: () => void; onSort: () => void; onNext: () => void;
  sortIcon: React.ReactNode; sortTitle: string;
}) {
  const sc = shadowCount(pile.length);
  return (
    <>
      <div
        className={"defs-pile-wrap" + (flipped ? " flipped" : "")}
        onClick={pile.length > 0 ? onFlip : undefined}
        style={pile.length > 0 ? { cursor: "pointer" } : undefined}
      >
        {pile.length === 0 ? (
          <div className="defs-pile-empty" />
        ) : (
          <>
            {sc >= 3 && <div className="shadow-card s1" />}
            {sc >= 2 && <div className="shadow-card s2" />}
            {sc >= 1 && <div className="shadow-card s3" />}
            <div className="defs-top-card">
              <CardFaces d={defs[pile[idx]]} name={name} />
            </div>
          </>
        )}
      </div>
      <div className="defs-pile-pos">
        {pile.length > 0 ? `${idx + 1} / ${pile.length}` : ""}
      </div>
      {pile.length > 0 && (
        <div className="defs-sort-row">
          <button className="defs-sort-btn" onClick={onSort} title={sortTitle}>
            {sortIcon}
          </button>
          <button className="defs-sort-btn" onClick={onNext} title="Next">
            <ChevronIcon />
          </button>
        </div>
      )}
    </>
  );
}

export default function DefinitionsDeck({ defs, name, unitId }: { defs: Definition[]; name: string; unitId: string }) {
  if (!defs?.length) return null;

  const { getDefinitionPiles, saveDefinitionPile, loaded } = useProgressContext();
  const [learnPile, setLearnPile] = useState<number[]>(() => defs.map((_, i) => i));
  const [knowPile, setKnowPile] = useState<number[]>([]);
  const [learnIdx, setLearnIdx] = useState(0);
  const [knowIdx, setKnowIdx] = useState(0);
  const [learnFlipped, setLearnFlipped] = useState(false);
  const [knowFlipped, setKnowFlipped] = useState(false);
  const [activePile, setActivePile] = useState<'learn' | 'know'>('learn');
  const restored = useRef(false);

  // Restore pile assignment once progress loads: terms saved as 'know' move to the know pile.
  useEffect(() => {
    if (!loaded || restored.current) return;
    restored.current = true;
    const saved = getDefinitionPiles(unitId);
    const knowTerms = new Set(Object.entries(saved).filter(([, p]) => p === 'know').map(([t]) => t));
    if (!knowTerms.size) return;
    const learn: number[] = [];
    const know: number[] = [];
    defs.forEach((d, i) => (knowTerms.has(d.term) ? know : learn).push(i));
    setLearnPile(learn);
    setKnowPile(know);
    setLearnIdx(0);
    setKnowIdx(0);
  }, [loaded, getDefinitionPiles, unitId, defs]);

  const moveToKnow = useCallback(() => {
    if (!learnPile.length) return;
    const card = learnPile[learnIdx];
    const next = [...learnPile];
    next.splice(learnIdx, 1);
    setLearnPile(next);
    setKnowPile(k => [...k, card]);
    setLearnIdx(i => (next.length === 0 ? 0 : i >= next.length ? 0 : i));
    setLearnFlipped(false);
    saveDefinitionPile(unitId, defs[card].term, 'know');
  }, [learnPile, learnIdx, saveDefinitionPile, unitId, defs]);

  const moveToLearn = useCallback(() => {
    if (!knowPile.length) return;
    const card = knowPile[knowIdx];
    const next = [...knowPile];
    next.splice(knowIdx, 1);
    setKnowPile(next);
    setLearnPile(l => [...l, card]);
    setKnowIdx(i => (next.length === 0 ? 0 : i >= next.length ? 0 : i));
    setKnowFlipped(false);
    saveDefinitionPile(unitId, defs[card].term, 'learn');
  }, [knowPile, knowIdx, saveDefinitionPile, unitId, defs]);

  const nextLearn = useCallback(() => {
    if (learnPile.length <= 1) return;
    setLearnIdx(i => (i + 1) % learnPile.length);
    setLearnFlipped(false);
  }, [learnPile.length]);

  const nextKnow = useCallback(() => {
    if (knowPile.length <= 1) return;
    setKnowIdx(i => (i + 1) % knowPile.length);
    setKnowFlipped(false);
  }, [knowPile.length]);

  return (
    <div className="defs" id={`audio-${unitId}-gate-definitions`}>
      <div className="defs-head">
        <div className="eyebrow">{name}</div>
        <div className="defs-title">Definitions</div>
        <div className="defs-hint">{defs.length} terms</div>
      </div>

      {/* Mobile-only pile toggle — icon pills, no words */}
      <div className="defs-mob-toggle">
        <button
          className={"defs-mob-pill" + (activePile === 'learn' ? " active" : "")}
          onClick={() => setActivePile('learn')}
          title="Still learning"
        >
          <LightbulbIcon />
          <span className="defs-mob-n">{learnPile.length}</span>
        </button>
        <button
          className={"defs-mob-pill" + (activePile === 'know' ? " active" : "")}
          onClick={() => setActivePile('know')}
          title="Know it"
        >
          <CheckIcon />
          <span className="defs-mob-n">{knowPile.length}</span>
        </button>
      </div>

      <div className="defs-stacks">
        <div className={"defs-stack" + (learnPile.length > 0 ? " has-cards" : "") + (activePile === 'learn' ? " mob-active" : "")}>
          <div className="defs-stack-label">
            <LightbulbIcon />
            <span className="defs-n">{learnPile.length}</span>
          </div>
          <Pile
            pile={learnPile} idx={learnIdx} defs={defs} name={name}
            flipped={learnFlipped}
            onFlip={() => setLearnFlipped(f => !f)}
            onSort={moveToKnow} onNext={nextLearn}
            sortIcon={<CheckIcon />} sortTitle="Know it"
          />
        </div>
        <div className={"defs-stack" + (knowPile.length > 0 ? " has-cards" : "") + (activePile === 'know' ? " mob-active" : "")}>
          <div className="defs-stack-label">
            <CheckIcon />
            <span className="defs-n">{knowPile.length}</span>
          </div>
          <Pile
            pile={knowPile} idx={knowIdx} defs={defs} name={name}
            flipped={knowFlipped}
            onFlip={() => setKnowFlipped(f => !f)}
            onSort={moveToLearn} onNext={nextKnow}
            sortIcon={<LightbulbIcon />} sortTitle="Still learning"
          />
        </div>
      </div>
    </div>
  );
}

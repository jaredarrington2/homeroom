// lib/audioText.ts — turns authored unit content into an ordered list of audio segments
// and gates, in the same order UnitReader renders them. The generation script and the
// player both build from this, so the mp3 filenames and the DOM ids stay in lockstep.
//
// Segment id scheme (must match the ids set in the reader DOM):
//   prose    audio-{unitId}-g{gi}-p{pi}
//   image    audio-{unitId}-g{gi}-img
//   synth-q  audio-{unitId}-g{gi}-synthq
//   synth-a  audio-{unitId}-g{gi}-syntha
//   gates    audio-{unitId}-g{gi}-gate-synth, audio-{unitId}-gate-{definitions|flashcards|mcq}

import type { SectionUnit } from "@/lib/section";

const ENTITIES: Record<string, string> = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'",
  "&nbsp;": " ", "&mdash;": "—", "&ndash;": "–", "&hellip;": "…", "&deg;": "°",
  "&rsquo;": "’", "&lsquo;": "‘", "&rdquo;": "”", "&ldquo;": "“",
};

function decodeEntities(s: string): string {
  return s.replace(/&[a-zA-Z#0-9]+;/g, (m) => {
    if (ENTITIES[m]) return ENTITIES[m];
    if (m === "&sect;") return "Section ";
    const num = /^&#(\d+);$/.exec(m);
    if (num) return String.fromCharCode(parseInt(num[1], 10));
    const hex = /^&#x([0-9a-fA-F]+);$/.exec(m);
    if (hex) return String.fromCharCode(parseInt(hex[1], 16));
    return m;
  });
}

/** Replace cloze blanks with their answer (data-reveal, never the visible "?"), strip the
 *  rest of the HTML, decode entities, and make it read cleanly aloud (§ → "Section"). */
export function clozeHtmlToSpokenText(html: string): string {
  let out = html.replace(
    /<span\s+class="cloze"[^>]*data-reveal="([^"]*)"[^>]*>[\s\S]*?<\/span>/gi,
    "$1"
  );
  out = out.replace(/<[^>]+>/g, "");
  out = decodeEntities(out);
  out = out.replace(/§\s*/g, "Section ");
  return out.replace(/\s+/g, " ").trim();
}

export type AudioSegmentKind = "prose" | "image" | "synth-q" | "synth-a";
export type GateType = "synth" | "definitions" | "flashcards" | "mcq";

export interface AudioSegment {
  kind: AudioSegmentKind;
  id: string;
  /** group index (1-based "Section N of M" in the bar uses gi + 1) */
  gi: number;
  pi?: number;
  text: string;
}
export interface AudioGate {
  kind: "gate";
  gateType: GateType;
  id: string;
  gi?: number;
}
export type AudioItem = AudioSegment | AudioGate;

export interface UnitManifest {
  unitId: string;
  name: string;
  reg: string;
  groupCount: number;
  items: AudioItem[];
}

/** Build the ordered play-and-stop sequence for one unit, in UnitReader render order. */
export function unitAudioItems(unit: SectionUnit): AudioItem[] {
  const items: AudioItem[] = [];
  const u = unit.id;

  unit.groups.forEach((g, gi) => {
    g.paras.forEach((para, pi) => {
      const text =
        para.spoken ??
        (pi === 0 ? g.spoken : undefined) ??
        clozeHtmlToSpokenText(para.html);
      if (text && text.trim()) {
        items.push({ kind: "prose", id: `audio-${u}-g${gi}-p${pi}`, gi, pi, text: text.trim() });
      }
    });

    if (g.anchor?.spokenCaption?.trim()) {
      items.push({ kind: "image", id: `audio-${u}-g${gi}-img`, gi, text: g.anchor.spokenCaption.trim() });
    }

    // Synth is an interactive element: the player chimes + announces it and stops here.
    // The question/answer text is NOT narrated (you do it on screen).
    if (g.synth) {
      items.push({ kind: "gate", gateType: "synth", id: `audio-${u}-g${gi}-gate-synth`, gi });
    }
  });

  // end-of-unit interactive blocks — hard stops, no narration
  if (unit.definitions?.length) items.push({ kind: "gate", gateType: "definitions", id: `audio-${u}-gate-definitions` });
  if (unit.review.flashcards?.length) items.push({ kind: "gate", gateType: "flashcards", id: `audio-${u}-gate-flashcards` });
  if (unit.review.mcq?.length) items.push({ kind: "gate", gateType: "mcq", id: `audio-${u}-gate-mcq` });

  return items;
}

export function unitManifest(unit: SectionUnit): UnitManifest {
  return {
    unitId: unit.id,
    name: unit.name,
    reg: unit.reg,
    groupCount: unit.groups.length,
    items: unitAudioItems(unit),
  };
}

export const isSegment = (i: AudioItem): i is AudioSegment => i.kind !== "gate";

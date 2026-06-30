// lib/studyScript.ts — turns authored section content into listen-ready text.
//
// The reader stores prose as HTML with inline cloze blanks:
//   <span class="cloze" data-accept='[...]' data-reveal="X">?</span>
// For listening, the blank must be spoken as its answer X — hearing the fill-in is the
// whole point of a study pass. This module fills the blanks, strips the rest of the HTML,
// decodes entities, and flattens a section into an ordered list of speakable segments
// (one per sentence) tagged with where each lives in the DOM, so a player can highlight
// the matching paragraph as it reads.
//
// Pure + framework-free so it can be reused by a future text-export script too.

import type { SectionContent, SectionUnit } from "@/lib/section";

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&sect;": "§",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
  "&deg;": "°",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&rdquo;": "”",
  "&ldquo;": "“",
};

export function decodeEntities(s: string): string {
  return s
    .replace(/&[a-zA-Z#0-9]+;/g, (m) => {
      if (ENTITIES[m]) return ENTITIES[m];
      const num = /^&#(\d+);$/.exec(m);
      if (num) return String.fromCharCode(parseInt(num[1], 10));
      const hex = /^&#x([0-9a-fA-F]+);$/.exec(m);
      if (hex) return String.fromCharCode(parseInt(hex[1], 16));
      return m;
    });
}

/** Replace cloze spans with their answer, strip all other tags, decode entities, tidy space. */
export function clozeHtmlToText(html: string): string {
  let out = html.replace(
    /<span\s+class="cloze"[^>]*data-reveal="([^"]*)"[^>]*>[\s\S]*?<\/span>/gi,
    "$1"
  );
  out = out.replace(/<[^>]+>/g, "");
  out = decodeEntities(out);
  return out.replace(/\s+/g, " ").trim();
}

/** Split prose into sentences. Conservative: only breaks before a capital/quote so decimals
 *  (12.5) and section numbers (§ 1002.9) stay whole. Abbreviations like "U.S." may over-split,
 *  which only adds a small spoken pause — harmless. */
export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z"“'§])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface VoSegment {
  unitId: string;
  unitName: string;
  /** what the player highlights in the DOM */
  domKind: "unithead" | "heading" | "para";
  /** group index within the unit (heading + para) */
  g?: number;
  /** paragraph index within the group (para only) */
  p?: number;
  /** the text to speak */
  text: string;
}

/** Flatten one unit into ordered speakable segments (unit announce → headings → sentences). */
export function unitSegments(unit: SectionUnit): VoSegment[] {
  const segs: VoSegment[] = [];
  const reg = decodeEntities(unit.reg).replace(/\s*·\s*/g, ", ");
  segs.push({
    unitId: unit.id,
    unitName: unit.name,
    domKind: "unithead",
    text: `${unit.name}. ${reg}.`,
  });

  unit.groups.forEach((group, g) => {
    if (group.heading) {
      segs.push({
        unitId: unit.id,
        unitName: unit.name,
        domKind: "heading",
        g,
        text: decodeEntities(group.heading),
      });
    }
    group.paras.forEach((para, p) => {
      const text = clozeHtmlToText(para.html);
      for (const sentence of splitSentences(text)) {
        segs.push({ unitId: unit.id, unitName: unit.name, domKind: "para", g, p, text: sentence });
      }
    });
  });

  return segs;
}

/** Flatten a whole section into one ordered segment list, in reading order. */
export function sectionSegments(section: SectionContent): VoSegment[] {
  return section.units.flatMap(unitSegments);
}

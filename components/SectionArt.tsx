// components/SectionArt.tsx
//
// One entry point for the deterministic section art (a character + a property,
// chosen by hashing the sectionId). Works on the generic template AND on custom
// pages. Custom pages bypass the image system entirely — dropping <SectionArt />
// into them is what actually puts the generated library on screen.
//
// Thin composition on purpose: reuses the existing Character and PropertyImage
// components so all selection logic stays in lib/characters.ts. It does NOT
// re-implement the hash.
//
// ── Reconciled against the real source (2026-06-27) ──
//   1. Prop names. Character and PropertyImage take `tags: string[]` AND
//      `sectionId` (Character also takes optional `avoid`). They do NOT accept a
//      bare `sectionId`-only call, so we pass `tags` through. Leaving `tags`
//      empty makes pickCharacter/pickProperty fall through to their
//      hash-by-sectionId fallback — i.e. deterministic-by-section, which is
//      exactly what this component is for. Pass tags only when a page wants
//      relevance-biased art.
//   2. Export style. Both are default exports — default imports are correct.
//   3. Server vs client. lib/characters.ts reads the manifest via fs, so
//      Character/PropertyImage are server components. This stays a server
//      component too (no "use client").
//   4. Placement. Quiet footer strip below the lesson body. Character and
//      PropertyImage each already center themselves (flex justify-center), so
//      no width wrappers here — maxHeight governs size.

import Character from "@/components/Character";
import PropertyImage from "@/components/PropertyImage";

type SectionArtProps = {
  sectionId: string;
  /** Dense law pages may want just one piece. */
  show?: "both" | "character" | "property";
  /** Optional relevance hints. Empty = deterministic by sectionId. */
  tags?: string[];
  /** Character tags to steer away from. */
  avoid?: string[];
  className?: string;
};

export default function SectionArt({
  sectionId,
  show = "both",
  tags = [],
  avoid = [],
  className = "",
}: SectionArtProps) {
  const showCharacter = show === "both" || show === "character";
  const showProperty = show === "both" || show === "property";

  return (
    <aside
      className={`not-prose mt-12 flex items-end justify-center gap-8 border-t border-hairline pt-8 ${className}`}
      aria-hidden="true"
    >
      {showProperty && (
        <PropertyImage tags={tags} sectionId={sectionId} maxHeight={160} />
      )}
      {showCharacter && (
        <Character tags={tags} avoid={avoid} sectionId={sectionId} maxHeight={120} />
      )}
    </aside>
  );
}

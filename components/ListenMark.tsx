"use client";
// components/ListenMark.tsx — the small left-margin "play from here" dot on each spoken
// segment. Subscribes only to the stable actions context, so it mounts once and never
// re-renders as audio plays; its active/filled look is driven purely by CSS from the
// parent segment's imperatively-set [data-audio-active].
import { useListenActions } from "@/lib/ListenContext";

export default function ListenMark({ id, unitId }: { id: string; unitId: string }) {
  const { playFrom } = useListenActions();
  return (
    <button
      className="lp-dot"
      aria-label="Play from here"
      onClick={(e) => { e.stopPropagation(); playFrom(id, unitId); }}
    >
      <svg width="9" height="9" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M4 3l9 5-9 5z" />
      </svg>
    </button>
  );
}

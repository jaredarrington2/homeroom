"use client";
// lib/ListenContext.tsx — the Listen player's brain. Loads a unit's audio manifest, plays
// segments through FileSpeechEngine, stops at every interactive gate, highlights + scrolls
// the active line, and remembers position per unit in localStorage so re-entry resumes.
//
// Two contexts on purpose: actions are stable (margin dots subscribe to these and never
// re-render after mount), state changes as audio plays (the bar + entry buttons subscribe).
import {
  createContext, useContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { FileSpeechEngine } from "@/lib/speech";
import type { AudioItem, GateType, UnitManifest } from "@/lib/audioText";

type Status = "idle" | "playing" | "paused" | "gated";

interface ListenState {
  status: Status;
  activeUnitId: string | null;
  name: string;
  groupCount: number;
  currentItem: AudioItem | null;
  index: number;
  total: number;
  gateType: GateType | null;
  rate: number;
  posVersion: number; // bumps when a saved position changes (entry labels re-read on it)
}
interface ListenActions {
  start: (unitId: string) => void;
  playFrom: (segmentId: string, unitId: string) => void;
  toggle: () => void;
  skip: (deltaSeconds: number) => void;
  close: () => void;
  setRate: (r: number) => void;
}

const StateCtx = createContext<ListenState | null>(null);
const ActionsCtx = createContext<ListenActions | null>(null);

const RATE_KEY = "homeroom_listen_rate";
const posKey = (unitId: string) => `homeroom_listen_pos_${unitId}`;
const READER_PATH = "/learn/federal-mortgage-laws";

function clearAttr(name: string) {
  document.querySelectorAll(`[${name}="true"]`).forEach((el) => el.removeAttribute(name));
}

export function ListenProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const engineRef = useRef<FileSpeechEngine | null>(null);
  const manifestCache = useRef<Map<string, UnitManifest | null>>(new Map());

  // Live refs for the play loop (closures must see the latest without re-subscribing).
  const unitRef = useRef<string | null>(null);
  const manRef = useRef<UnitManifest | null>(null);
  const idxRef = useRef(0);
  const statusRef = useRef<Status>("idle");
  const rateRef = useRef(1);
  // One token per playIndex call; only the latest scheduled onEnd/onError may advance,
  // so a stale or double-fired audio callback can't skip a gate or double-advance.
  const tokenRef = useRef(0);

  const [state, setState] = useState<ListenState>({
    status: "idle", activeUnitId: null, name: "", groupCount: 0,
    currentItem: null, index: 0, total: 0, gateType: null, rate: 1, posVersion: 0,
  });

  const engine = () => (engineRef.current ??= new FileSpeechEngine());

  useEffect(() => {
    const saved = Number(localStorage.getItem(RATE_KEY));
    if ([0.75, 1, 1.25, 1.5].includes(saved)) { rateRef.current = saved; setState((s) => ({ ...s, rate: saved })); }
  }, []);

  const refreshResume = useCallback(() => {
    clearAttr("data-audio-resume");
    document.querySelectorAll<HTMLElement>(".section-reader .sr-unit").forEach((sec) => {
      const pos = localStorage.getItem(posKey(sec.id));
      if (!pos) return;
      const n = document.getElementById(pos);
      if (n && n.getAttribute("data-audio-active") !== "true") n.setAttribute("data-audio-resume", "true");
    });
  }, []);

  const setActive = useCallback((id: string) => {
    clearAttr("data-audio-active");
    const n = document.getElementById(id);
    if (n) { n.setAttribute("data-audio-active", "true"); n.scrollIntoView({ behavior: "smooth", block: "center" }); }
  }, []);

  const savePos = useCallback((unitId: string, id: string) => {
    localStorage.setItem(posKey(unitId), id);
    setState((s) => ({ ...s, posVersion: s.posVersion + 1 }));
  }, []);

  const sync = useCallback((man: UnitManifest, i: number, status: Status) => {
    const item = man.items[i] ?? null;
    setState((s) => ({
      ...s,
      status,
      activeUnitId: man.unitId,
      name: man.name,
      groupCount: man.groupCount,
      currentItem: item,
      index: i,
      total: man.items.length,
      gateType: item && item.kind === "gate" ? item.gateType : null,
    }));
  }, []);

  // Play manifest item i; stop (gated) on a gate, end at the tail.
  const playIndex = useCallback((man: UnitManifest, i: number) => {
    const item = man.items[i];
    idxRef.current = i;
    const token = ++tokenRef.current;
    const advance = () => { if (tokenRef.current === token && manRef.current === man) playIndex(man, i + 1); };
    if (!item) {
      engine().cancel();
      statusRef.current = "idle";
      clearAttr("data-audio-active");
      refreshResume();
      sync(man, i, "idle");
      return;
    }
    if (item.kind === "gate") {
      // Don't narrate the question — chime, announce there's something to do, and stop.
      engine().cancel();
      statusRef.current = "gated";
      savePos(man.unitId, item.id);
      setActive(item.id);
      refreshResume();
      sync(man, i, "gated");
      engine().chime();
      setTimeout(() => {
        if (tokenRef.current === token) engine().play(`/audio/_cue/${item.gateType}.mp3`, {});
      }, 460);
      return;
    }
    statusRef.current = "playing";
    savePos(man.unitId, item.id);
    setActive(item.id);
    refreshResume();
    sync(man, i, "playing");
    engine().play(`/audio/${man.unitId}/${item.id}.mp3`, {
      rate: rateRef.current,
      onEnd: advance,
      onError: advance,
    });
  }, [sync, setActive, savePos, refreshResume]);

  const loadManifest = useCallback(async (unitId: string): Promise<UnitManifest | null> => {
    if (manifestCache.current.has(unitId)) return manifestCache.current.get(unitId)!;
    try {
      const r = await fetch(`/audio/${unitId}/manifest.json`);
      const m = r.ok ? ((await r.json()) as UnitManifest) : null;
      manifestCache.current.set(unitId, m);
      return m;
    } catch {
      manifestCache.current.set(unitId, null);
      return null;
    }
  }, []);

  const start = useCallback(async (unitId: string) => {
    const man = await loadManifest(unitId);
    if (!man) return; // no audio for this unit → no bar
    unitRef.current = unitId; manRef.current = man;
    const saved = localStorage.getItem(posKey(unitId));
    let i = 0;
    if (saved) { const j = man.items.findIndex((x) => x.id === saved); if (j >= 0) i = j; }
    playIndex(man, i);
  }, [loadManifest, playIndex]);

  const playFrom = useCallback(async (segmentId: string, unitId: string) => {
    const man = await loadManifest(unitId);
    if (!man) return;
    const i = man.items.findIndex((x) => x.id === segmentId);
    if (i < 0) return;
    unitRef.current = unitId; manRef.current = man;
    engine().cancel();
    playIndex(man, i);
  }, [loadManifest, playIndex]);

  const toggle = useCallback(() => {
    const man = manRef.current;
    if (!man) return;
    if (statusRef.current === "playing") {
      engine().pause(); statusRef.current = "paused";
      savePos(man.unitId, man.items[idxRef.current]?.id ?? "");
      refreshResume();
      sync(man, idxRef.current, "paused");
    } else if (statusRef.current === "paused") {
      engine().resume(); statusRef.current = "playing";
      sync(man, idxRef.current, "playing");
    } else if (statusRef.current === "gated") {
      playIndex(man, idxRef.current + 1); // Continue past the gate
    }
  }, [savePos, refreshResume, sync, playIndex]);

  const skip = useCallback((deltaSeconds: number) => {
    if (statusRef.current !== "playing" && statusRef.current !== "paused") return;
    engine().skip(deltaSeconds);
  }, []);

  const close = useCallback(() => {
    const man = manRef.current;
    engine().cancel();
    statusRef.current = "idle";
    clearAttr("data-audio-active");
    if (man) savePos(man.unitId, man.items[idxRef.current]?.id ?? "");
    refreshResume();
    setState((s) => ({ ...s, status: "idle", currentItem: null, gateType: null }));
  }, [savePos, refreshResume]);

  const setRate = useCallback((r: number) => {
    rateRef.current = r;
    engine().setRate(r);
    localStorage.setItem(RATE_KEY, String(r));
    setState((s) => ({ ...s, rate: r }));
  }, []);

  // Mark resume points once the reader has painted.
  useEffect(() => {
    if (pathname !== READER_PATH) return;
    const t = setTimeout(refreshResume, 300);
    return () => clearTimeout(t);
  }, [pathname, refreshResume]);

  // Leaving the reader cancels audio.
  useEffect(() => {
    if (pathname === READER_PATH) return;
    engine().cancel();
    statusRef.current = "idle";
    setState((s) => (s.status === "idle" ? s : { ...s, status: "idle", currentItem: null, gateType: null }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => () => { engineRef.current?.cancel(); }, []);

  const actions = useMemo<ListenActions>(
    () => ({ start, playFrom, toggle, skip, close, setRate }),
    [start, playFrom, toggle, skip, close, setRate]
  );

  return (
    <ActionsCtx.Provider value={actions}>
      <StateCtx.Provider value={state}>{children}</StateCtx.Provider>
    </ActionsCtx.Provider>
  );
}

export function useListenActions(): ListenActions {
  const c = useContext(ActionsCtx);
  if (!c) throw new Error("useListenActions outside ListenProvider");
  return c;
}
export function useListenState(): ListenState {
  const c = useContext(StateCtx);
  if (!c) throw new Error("useListenState outside ListenProvider");
  return c;
}

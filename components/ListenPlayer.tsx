"use client";
// components/ListenPlayer.tsx — listen to the federal-laws reader while you read along.
//
// Uses the browser's SpeechSynthesis (no audio files, no API, works offline). It speaks the
// section sentence-by-sentence with cloze blanks already filled in (so you hear the answers),
// highlights the matching paragraph and scrolls it into view, and shows the current sentence as
// a caption. Auto-advances unit→unit. Controls: play/pause, prev/next sentence, speed, voice.
//
// Highlighting only adds/removes a class and scrolls — it never rewrites prose innerHTML, so it
// stays clear of ClozeProse's imperative cloze hydration.
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import section3 from "@/content/sections/section-3";
import { sectionSegments, type VoSegment } from "@/lib/studyScript";

const READER_PATH = "/learn/federal-mortgage-laws";
const RATES = [0.75, 1, 1.25, 1.5];
const RATE_KEY = "homeroom_vo_rate";
const VOICE_KEY = "homeroom_vo_voice";

// Built once — the section content is static.
const SEGMENTS: VoSegment[] = sectionSegments(section3);

function nodeFor(seg: VoSegment): HTMLElement | null {
  const sec = document.getElementById(seg.unitId);
  if (!sec) return null;
  if (seg.domKind === "unithead") return sec.querySelector(".sr-unithead");
  if (seg.domKind === "heading") return sec.querySelector(`[data-vo="h"][data-vo-g="${seg.g}"]`);
  return sec.querySelector(`[data-vo="p"][data-vo-g="${seg.g}"][data-vo-p="${seg.p}"]`);
}

export default function ListenPlayer() {
  const pathname = usePathname();
  const onReader = pathname === READER_PATH;

  const [supported, setSupported] = useState(false);
  const [open, setOpen] = useState(false); // false = collapsed pill, true = full bar
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string>("");

  // Generation token: each manual seek/cancel bumps it so a stale utterance's onend can't advance.
  const genRef = useRef(0);
  const playingRef = useRef(false);
  const rateRef = useRef(rate);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  rateRef.current = rate;

  // Capability + saved prefs + voice list.
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    const savedRate = Number(localStorage.getItem(RATE_KEY));
    if (RATES.includes(savedRate)) setRate(savedRate);
    setVoiceURI(localStorage.getItem(VOICE_KEY) || "");

    const loadVoices = () => {
      const en = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
      setVoices(en);
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  useEffect(() => {
    voiceRef.current = voices.find((v) => v.voiceURI === voiceURI) || null;
  }, [voices, voiceURI]);

  const clearHighlight = useCallback(() => {
    document.querySelectorAll(".section-reader .vo-active").forEach((el) => el.classList.remove("vo-active"));
  }, []);

  const highlight = useCallback((seg: VoSegment) => {
    clearHighlight();
    const node = nodeFor(seg);
    if (node) {
      node.classList.add("vo-active");
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [clearHighlight]);

  // Speak segment i and chain forward. Cancels anything in flight and takes a fresh token.
  const speakFrom = useCallback((i: number) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const gen = ++genRef.current;
    playingRef.current = true;
    setPlaying(true);

    const step = (j: number) => {
      if (genRef.current !== gen) return;
      const seg = SEGMENTS[j];
      if (!seg) {
        // reached the end of the section
        playingRef.current = false;
        setPlaying(false);
        clearHighlight();
        return;
      }
      setIdx(j);
      highlight(seg);
      const u = new SpeechSynthesisUtterance(seg.text);
      u.rate = rateRef.current;
      if (voiceRef.current) u.voice = voiceRef.current;
      u.onend = () => { if (genRef.current === gen && playingRef.current) step(j + 1); };
      u.onerror = () => { if (genRef.current === gen && playingRef.current) step(j + 1); };
      synth.speak(u);
    };
    step(i);
  }, [highlight, clearHighlight]);

  // Where to begin when pressing play fresh: URL hash, else the unit nearest the top.
  const startIndex = useCallback((): number => {
    let unitId = "";
    const units = Array.from(document.querySelectorAll<HTMLElement>(".section-reader .sr-unit"));
    for (const u of units) if (u.getBoundingClientRect().top <= 140) unitId = u.id;
    const hash = window.location.hash.replace("#", "");
    if (hash && SEGMENTS.some((s) => s.unitId === hash)) unitId = hash;
    if (!unitId) unitId = units[0]?.id || "";
    const found = SEGMENTS.findIndex((s) => s.unitId === unitId);
    return found < 0 ? 0 : found;
  }, []);

  const play = useCallback(() => {
    setOpen(true);
    const synth = window.speechSynthesis;
    if (synth.paused) { synth.resume(); playingRef.current = true; setPlaying(true); return; }
    // Begin fresh from current selection (first press) or resume from current idx.
    speakFrom(playing ? idx : (idx === 0 && !playingRef.current ? startIndex() : idx));
  }, [playing, idx, speakFrom, startIndex]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    playingRef.current = false;
    setPlaying(false);
  }, []);

  const seek = useCallback((delta: number) => {
    const next = Math.min(SEGMENTS.length - 1, Math.max(0, idx + delta));
    speakFrom(next);
  }, [idx, speakFrom]);

  const stopAndCollapse = useCallback(() => {
    genRef.current++;
    playingRef.current = false;
    setPlaying(false);
    window.speechSynthesis.cancel();
    clearHighlight();
    setOpen(false);
    setIdx(0);
  }, [clearHighlight]);

  // Persist prefs; apply a rate change live (SpeechSynthesis can't retune a live utterance).
  useEffect(() => {
    if (supported) localStorage.setItem(RATE_KEY, String(rate));
    if (playingRef.current) speakFrom(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate]);

  useEffect(() => {
    if (supported && voiceURI) localStorage.setItem(VOICE_KEY, voiceURI);
  }, [voiceURI, supported]);

  // Tear down on route change / unmount.
  useEffect(() => {
    if (onReader) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    genRef.current++;
    playingRef.current = false;
    window.speechSynthesis.cancel();
    clearHighlight();
    setPlaying(false);
    setOpen(false);
    setIdx(0);
  }, [onReader, clearHighlight]);

  useEffect(() => () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  if (!onReader || !supported) return null;

  const cur = SEGMENTS[idx];

  // Collapsed launcher.
  if (!open) {
    return (
      <button className="vo-pill" onClick={play} aria-label="Listen to this section">
        <PlayIcon />
        <span>Listen</span>
      </button>
    );
  }

  return (
    <div className="vo-bar" role="region" aria-label="Listen player">
      <button className="vo-btn vo-btn-primary" onClick={playing ? pause : play}
        aria-label={playing ? "Pause" : "Play"}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="vo-meta">
        <div className="vo-unit">{cur?.unitName}</div>
        <div className="vo-cap" title={cur?.text}>{cur?.text}</div>
      </div>

      <div className="vo-controls">
        <button className="vo-btn" onClick={() => seek(-1)} aria-label="Previous sentence"><PrevIcon /></button>
        <button className="vo-btn" onClick={() => seek(1)} aria-label="Next sentence"><NextIcon /></button>

        <select className="vo-select" value={rate} aria-label="Speed"
          onChange={(e) => setRate(Number(e.target.value))}>
          {RATES.map((r) => <option key={r} value={r}>{r}×</option>)}
        </select>

        {voices.length > 0 && (
          <select className="vo-select vo-voice" value={voiceURI} aria-label="Voice"
            onChange={(e) => setVoiceURI(e.target.value)}>
            <option value="">Default voice</option>
            {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>)}
          </select>
        )}

        <button className="vo-btn vo-close" onClick={stopAndCollapse} aria-label="Close player"><CloseIcon /></button>
      </div>
    </div>
  );
}

/* Inline icons — no icon library (canon). */
function PlayIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 3l9 5-9 5z" /></svg>; }
function PauseIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 3h3v10H4zM9 3h3v10H9z" /></svg>; }
function PrevIcon() { return <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3v10H4V3zM13 3v10l-7-5z" /></svg>; }
function NextIcon() { return <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M11 3v10h1V3zM3 3v10l7-5z" /></svg>; }
function CloseIcon() { return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3l10 10M13 3L3 13" /></svg>; }

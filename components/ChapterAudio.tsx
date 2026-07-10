'use client';
// components/ChapterAudio.tsx — a small wordless play/pause control for a Stage 1
// chapter's scripted voiceover (public/audio/application/{chapterId}.mp3). Graphical
// only: a play triangle that becomes a pause bar while playing, plus a thin progress
// tick. Pausing any other chapter's audio is left to the browser; this is deliberately
// lightweight (no global player) since Stage 1 is one page of short, standalone clips.
import { useEffect, useRef, useState } from 'react';

export default function ChapterAudio({ src, label }: { src: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnd = () => { setPlaying(false); setPct(0); };
    const onTime = () => setPct(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    a.addEventListener('ended', onEnd);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('pause', onPause);
    a.addEventListener('play', onPlay);
    return () => {
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('play', onPlay);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play(); else a.pause();
  };

  return (
    <span className={`chaudio${playing ? ' playing' : ''}`}>
      <button
        type="button"
        className="chaudio-btn"
        aria-label={playing ? `Pause the narration for ${label}` : `Play the narration for ${label}`}
        aria-pressed={playing}
        onClick={toggle}
      >
        {playing ? (
          <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="4" y="3.5" width="3" height="9" /><rect x="9" y="3.5" width="3" height="9" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5l7 4.5-7 4.5z" /></svg>
        )}
      </button>
      <span className="chaudio-track" aria-hidden="true"><span className="chaudio-fill" style={{ width: `${pct}%` }} /></span>
      <audio ref={audioRef} src={src} preload="none" />
    </span>
  );
}

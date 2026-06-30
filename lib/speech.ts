// lib/speech.ts — plays pre-generated narration mp3s through one reused <audio> element.
// Not an abstraction layer; it's the single thing the player drives.

export class FileSpeechEngine {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;

  private el(): HTMLAudioElement {
    if (!this.audio) this.audio = new Audio();
    return this.audio;
  }

  /** A short two-note chime, synthesized in-browser (no asset). Played when reaching an
   *  interactive element, just before the spoken cue. */
  chime() {
    try {
      const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
      this.ctx ??= new AC();
      const ctx = this.ctx;
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;
      [880, 1174.66].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(ctx.destination);
        const t = now + i * 0.12;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
        osc.start(t);
        osc.stop(t + 0.42);
      });
    } catch { /* Web Audio unavailable — skip the chime */ }
  }

  play(src: string, opts: { rate?: number; onEnd?: () => void; onError?: () => void }) {
    const a = this.el();
    a.onended = opts.onEnd ?? null;
    a.onerror = opts.onError ? () => opts.onError!() : null;
    a.src = src;
    a.playbackRate = opts.rate ?? 1;
    a.play().catch(() => opts.onError?.());
  }

  setRate(rate: number) {
    if (this.audio) this.audio.playbackRate = rate;
  }

  /** Seek by delta seconds within the current clip, clamped so it never runs off the end. */
  skip(delta: number) {
    const a = this.audio;
    if (!a || !a.src) return;
    let t = a.currentTime + delta;
    t = Math.max(0, t);
    if (isFinite(a.duration)) t = Math.min(t, Math.max(0, a.duration - 0.05));
    a.currentTime = t;
  }

  pause() { this.audio?.pause(); }

  resume() { this.audio?.play().catch(() => {}); }

  cancel() {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.onended = null;
    this.audio.onerror = null;
    this.audio.removeAttribute("src");
    this.audio.load();
  }
}

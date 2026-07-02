// lib/speech.ts — plays pre-generated narration mp3s through one reused <audio> element.
// Not an abstraction layer; it's the single thing the player drives.

export class FileSpeechEngine {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;

  private el(): HTMLAudioElement {
    if (!this.audio) this.audio = new Audio();
    return this.audio;
  }

  /** A three-note rising chime (G5 → C6 → E6), synthesized in-browser (no asset).
   *  Played when reaching an interactive element — it carries the whole "stop and
   *  look" signal on its own; there is no spoken cue. */
  chime() {
    try {
      const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
      this.ctx ??= new AC();
      const ctx = this.ctx;
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;
      [784, 1047, 1319].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(ctx.destination);
        const t = now + i * 0.12;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.16, t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
        osc.start(t);
        osc.stop(t + 0.34);
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

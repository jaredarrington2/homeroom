// content/widgets/arm-cap-ladder.ts — data + math for the CAP ladder viz widget.
// The single source of truth for both modes: the check-your-work exercises grade against
// buildLadder(); the explorer redraws it live. Mirrors content/worksheets/ (slice 2).
//
// The ladder is the exam crux — encode it exactly (arm-slice-content.md §2, verified §7):
//   ceiling = start + (conv ? lolc : life)
//   fixed period: rate = start; first adjustment: +iac (conv) / +per (fha);
//   every adjustment after: +rac (conv) / +per (fha); rate min-capped at the ceiling.
// Answers verify: Ex1 conv 1.5/3/1/6 → year 7, 7.5%;  Ex2 fha 2.5/3/8 → year 10, 10.5%.
import type { CapExercise, LadderConfig } from "@/lib/section";

export interface LadderPoint {
  year: number;
  rate: number;
}
export interface LadderResult {
  rows: LadderPoint[];
  ceiling: number;
  peakYear: number;
  peakRate: number;
  /** The life-cap magnitude (lolc for conv, life for fha) — the "start + N" label. */
  life: number;
  fixed: number;
}

const round3 = (n: number) => Math.round(n * 1000) / 1000;

/** Worst-case ARM rate ladder — every adjustment hits its cap. Conventional: the initial cap
 *  governs the first jump (off start), the periodic cap each one after (off prior); ceiling =
 *  start + lolc. FHA/VA: the periodic cap governs the first jump and every one after (no separate
 *  initial cap); ceiling = start + life. Annual adjustments; rate never exceeds the ceiling and
 *  never falls below margin (not exercised in the worst case). */
export function buildLadder(cfg: LadderConfig): LadderResult {
  const life = cfg.mode === "conv" ? cfg.lolc ?? 0 : cfg.life ?? 0;
  const ceiling = cfg.start + life;
  const rows: LadderPoint[] = [];
  let rate = cfg.start;
  const maxY = cfg.fixed + life + 2;
  for (let y = 1; y <= maxY; y++) {
    if (y <= cfg.fixed) {
      rate = cfg.start;
    } else {
      const first = y === cfg.fixed + 1;
      const step = cfg.mode === "conv" ? (first ? cfg.iac ?? 0 : cfg.rac ?? 0) : cfg.per ?? 0;
      rate = Math.min(rate + step, ceiling);
    }
    rows.push({ year: y, rate: round3(rate) });
    // stop one year past the ceiling so the chart shows a short flat top
    if (rate >= ceiling && y > cfg.fixed + 1 && (rows[rows.length - 2]?.rate ?? 0) >= ceiling) break;
  }
  const peakIdx = rows.findIndex((r) => r.rate >= ceiling);
  return {
    rows,
    ceiling: round3(ceiling),
    peakYear: peakIdx >= 0 ? rows[peakIdx].year : rows[rows.length - 1].year,
    peakRate: round3(ceiling),
    life,
    fixed: cfg.fixed,
  };
}

export const capExercises: CapExercise[] = [
  {
    config: { mode: "conv", start: 1.5, fixed: 3, iac: 3, rac: 1, lolc: 6 },
    prompt:
      "A <b>3/1 ARM</b> starts at <b>1.5%</b> with a <b>3/1/6</b> cap structure. Worst case — every adjustment hits its ceiling — what year does the rate peak, and at what rate?",
    answer: { year: 7, rate: 7.5 },
    reveal:
      'The initial cap (3) limits the first jump, the periodic cap (1) each one after, and the life cap sets the ceiling: <span class="hl">1.5% + 6 = 7.5%</span>. It reaches that in <span class="hl">year 7</span> and cannot climb higher.',
  },
  {
    config: { mode: "fha", start: 2.5, fixed: 7, per: 3, life: 8 },
    prompt:
      "An <b>FHA 7/1 ARM</b> starts at <b>2.5%</b> with a <b>3/8</b> cap structure. On an FHA or VA ARM the caps are two numbers — periodic, then life. Worst case, what year does it peak, and at what rate?",
    answer: { year: 10, rate: 10.5 },
    reveal:
      'FHA and VA ARMs have no separate initial cap — the periodic cap (3) governs the first adjustment and every one after, up to the life ceiling: <span class="hl">2.5% + 8 = 10.5%</span>, reached in <span class="hl">year 10</span>.',
  },
];

/** Explorer seed — shared start/fixed, plus both cap sets. The program toggle swaps which caps
 *  are live and which logic runs (matching the reference prototype's explorer defaults). */
export const explorerSeed = {
  start: 1.5,
  fixed: 3,
  iac: 3, // conventional initial cap
  rac: 1, // conventional periodic cap
  lolc: 6, // conventional life cap
  per: 2, // fha/va periodic cap
  life: 6, // fha/va life cap
};

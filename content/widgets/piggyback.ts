// content/widgets/piggyback.ts — the four canonical piggyback LTV splits (first + second +
// down = 100). Single source of truth for the piggyback-stack viz (PiggybackStack.tsx).
import type { PiggybackSplit } from "@/lib/section";

export const piggybackSplits: PiggybackSplit[] = [
  { label: "80/20", first: 80, second: 20, down: 0 },
  { label: "75/25", first: 75, second: 25, down: 0 },
  { label: "80/15/5", first: 80, second: 15, down: 5 },
  { label: "80/10/10", first: 80, second: 10, down: 10 },
];

export const PMI_LINE = 80;

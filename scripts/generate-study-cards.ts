/**
 * scripts/generate-study-cards.ts — generate the OpenAI assets for the photoreal study-card
 * family (spec: ~/Downloads/homeroom-photoreal-study-cards-spec.md).
 *
 * Runs LOCALLY ONLY. Mirrors scripts/generate-audio.ts / generate-finance-card.ts posture:
 * dry-run-first, skip-existing, cached, keys from gitignored .env.local, zero runtime API.
 *
 * DOCTRINE: OpenAI makes only what floats free —
 *   1. ONE blank card "plate" (paper/light/curl), shared by every format. Detected + cropped
 *      to a clean card face; the overlay draws all rules/margins/dividers, so no format-specific
 *      plates are needed (this supersedes the spec's per-format plate library — see the note in
 *      content/study-cards.ts).
 *   2. One "Sharpie title" per card (dark ink on white). The <StudyCard> component drops the
 *      white live via CSS mix-blend-mode: multiply — no keying, no bake.
 * Everything coordinate-bearing (rules, columns, dividers, typed body, highlighter, marginalia,
 * tooltips) is live DOM in the component.
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-study-cards.ts                  # dry run: cost plan, spends nothing
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-study-cards.ts --go             # generate the uncached work set
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-study-cards.ts --go --force     # re-make even cached assets
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-study-cards.ts --only trid-tolerances --go
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-study-cards.ts --model gpt-image-1-mini --quality low   # cheap prompt dialing
 */
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import Anthropic from "@anthropic-ai/sdk";
import { studyCards, PLATE_FILE, titleFile, type StudyCard } from "../content/study-cards";

// --- pricing (verify at platform.openai.com/docs/pricing — image prices change) ------------
// OpenAI image API, landscape 1536x1024, per image, as of 2026-07-02.
type Quality = "low" | "medium" | "high";
const PRICING: Record<string, Record<Quality, number>> = {
  "gpt-image-1.5": { low: 0.013, medium: 0.05, high: 0.199 },
  "gpt-image-1-mini": { low: 0.006, medium: 0.015, high: 0.052 },
  "gpt-image-2": { low: 0.013, medium: 0.041, high: 0.165 },
};
const DEFAULT_MODEL = "gpt-image-1.5";
const DEFAULT_QUALITY: Quality = "high";
const IMAGE_SIZE = "1536x1024";
const REROLL_BUDGET = 2; // titles are budgeted at 2x to cover expected spelling rerolls
const MAX_TITLE_ATTEMPTS = 3;

// --- geometry --------------------------------------------------------------------------------
const PLATE_W = 1400;
const PLATE_H = 875; // 8:5 card face
type Rect = { left: number; top: number; width: number; height: number };

// --- paths -----------------------------------------------------------------------------------
const ROOT = process.cwd();
const PUB = path.join(ROOT, "public", "illustrations");
const CACHE_DIR = path.join(ROOT, "scripts", ".cache");
const platePath = () => path.join(PUB, PLATE_FILE);
const titlePath = (c: StudyCard) => path.join(PUB, titleFile(c));

// --- prompts ---------------------------------------------------------------------------------
const PLATE_PROMPT =
  "A high-resolution flat-lay photograph of blank cream-manila index-card stock — thick matte " +
  "card paper — photographed perfectly straight-on and flat, with NO rotation, no tilt, no " +
  "perspective, and no curl. The cream card paper FILLS THE ENTIRE FRAME, edge to edge: no " +
  "background, no border, no desk, no drop shadow, no other surface visible — only the blank " +
  "card paper covering the whole image. Subtle natural paper-fiber texture, warm cream/ivory " +
  "tone, soft even lighting. The surface is COMPLETELY BLANK — no rule lines, no ruled lines, no " +
  "margin line, no writing, no printed text, no numbers, no marks of any kind. Just plain blank " +
  "cream card paper filling the whole frame.";

function titlePrompt(title: string): string {
  return (
    `A photograph of the words "${title}" written by hand on a single STRAIGHT, level horizontal ` +
    "line, jotted quickly with a slightly dry black marker so the ink coverage is uneven. It must " +
    "look like genuine, slightly messy HUMAN handwriting, NOT a computer font and NOT lettering: " +
    "every letter is a little different (repeated letters each look distinct), and the stroke " +
    "thickness varies naturally — some strokes heavier and thicker, others lighter and thinner, " +
    "with a little uneven ink and the odd rough edge. Imperfect, slightly messy letter shapes, " +
    "sizes and spacing, but the overall baseline stays straight and level (not slanted, not wavy, " +
    "not arched). No underline, no flourishes, no decorative lines. Black ink on clean white " +
    "paper, nothing else."
  );
}

// --- args ------------------------------------------------------------------------------------
function parseArgs() {
  const a = process.argv.slice(2);
  const val = (flag: string) => {
    const i = a.indexOf(flag);
    return i >= 0 && a[i + 1] ? a[i + 1] : undefined;
  };
  const model = val("--model") || DEFAULT_MODEL;
  const quality = (val("--quality") as Quality) || DEFAULT_QUALITY;
  if (!PRICING[model]) throw new Error(`Unknown --model "${model}". Known: ${Object.keys(PRICING).join(", ")}`);
  if (!["low", "medium", "high"].includes(quality)) throw new Error(`--quality must be low|medium|high`);
  return { go: a.includes("--go"), force: a.includes("--force"), only: val("--only"), model, quality };
}

// --- env -------------------------------------------------------------------------------------
function loadEnv(name: string): string {
  const p = path.join(ROOT, ".env.local");
  if (fs.existsSync(p)) {
    for (const line of fs.readFileSync(p, "utf8").split("\n")) {
      const m = new RegExp(`^\\s*${name}\\s*=\\s*(.+?)\\s*$`).exec(line);
      if (m) return m[1].replace(/^['"]|['"]$/g, "");
    }
  }
  return process.env[name] || "";
}

// --- OpenAI image generation -----------------------------------------------------------------
async function genImage(apiKey: string, prompt: string, model: string, quality: Quality): Promise<Buffer> {
  const url = "https://api.openai.com/v1/images/generations";
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, size: IMAGE_SIZE, quality, n: 1 }),
    });
    if (res.ok) {
      const json: any = await res.json();
      const b64 = json?.data?.[0]?.b64_json;
      const remote = json?.data?.[0]?.url;
      if (b64) return Buffer.from(b64, "base64");
      if (remote) return Buffer.from(await (await fetch(remote)).arrayBuffer());
      throw new Error(`Image response had neither b64_json nor url: ${JSON.stringify(json).slice(0, 300)}`);
    }
    const body = await res.text();
    if (attempt === 0 && (res.status === 429 || res.status >= 500)) {
      console.warn(`      ${res.status} — retrying in 2s…`);
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }
    throw new Error(`OpenAI Images ${res.status}: ${body.slice(0, 400)}`);
  }
  throw new Error("unreachable");
}

async function makePlate(apiKey: string, model: string, quality: Quality): Promise<void> {
  // The card is generated FULL-BLEED (cream texture filling the whole frame), so there is no
  // backdrop to detect/crop and no way for tilt or curl to leave a gray corner. The card's edge,
  // rounded corner, and drop shadow are supplied by CSS in <StudyCard>, which is more reliable
  // than a photographed edge. So the plate step is just: generate → normalize to the 8:5 face.
  console.log("  plate — generating full-bleed blank card face…");
  const raw = await genImage(apiKey, PLATE_PROMPT, model, quality);
  fs.mkdirSync(path.dirname(platePath()), { recursive: true });
  await sharp(raw).resize(PLATE_W, PLATE_H, { fit: "cover" }).removeAlpha().png().toFile(platePath());
  console.log(`      wrote ${path.relative(ROOT, platePath())} (${PLATE_W}×${PLATE_H})`);
}

// --- title: generate Sharpie lettering, trim to the ink bbox, keep on white -------------------
async function makeTitle(apiKey: string, card: StudyCard, model: string, quality: Quality, anthropic: Anthropic): Promise<void> {
  for (let attempt = 1; attempt <= MAX_TITLE_ATTEMPTS; attempt++) {
    console.log(`  title[${card.id}] — attempt ${attempt}/${MAX_TITLE_ATTEMPTS}…`);
    const raw = await genImage(apiKey, titlePrompt(card.title), model, quality);
    const trimmed = await trimToInk(raw);
    const check = await checkSpelling(anthropic, trimmed, card.title);
    if (check.ok) {
      fs.mkdirSync(path.dirname(titlePath(card)), { recursive: true });
      // Key the lettering to ink-on-TRANSPARENT (alpha from ink darkness) so there is no paper at
      // all — nothing to leave a faint rectangle behind the title on the card.
      fs.writeFileSync(titlePath(card), await inkOnTransparent(trimmed));
      console.log(`      spelling OK ("${check.read}") — wrote ${path.relative(ROOT, titlePath(card))}`);
      return;
    }
    console.warn(`      spelling mismatch: read "${check.read}" ≠ "${card.title}" — rerolling…`);
  }
  throw new Error(
    `Title for "${card.id}" failed the spelling gate after ${MAX_TITLE_ATTEMPTS} attempts. ` +
      `Refusing to ship a misspelled legal title. Try --model gpt-image-2 or rephrase card.title.`
  );
}

/** Crop the white margins so the title PNG is the lettering + a little padding. */
async function trimToInk(buf: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(buf).removeAlpha().greyscale().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  let l = W, r = 0, t = H, b = 0;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (data[y * W + x] < 128) { if (x < l) l = x; if (x > r) r = x; if (y < t) t = y; if (y > b) b = y; }
    }
  if (r <= l || b <= t) return buf; // no ink found — leave as-is
  const padX = Math.round((r - l) * 0.06), padY = Math.round((b - t) * 0.18);
  const left = Math.max(0, l - padX), top = Math.max(0, t - padY);
  const width = Math.min(W - left, r - l + 1 + padX * 2), height = Math.min(H - top, b - t + 1 + padY * 2);
  return sharp(buf).extract({ left, top, width, height }).png().toBuffer();
}

/** Convert dark-ink-on-white lettering to ink-on-TRANSPARENT: alpha = how dark each pixel is,
 *  so the white paper disappears entirely (keeping the ink's own tone). No paper => no faint box. */
async function inkOnTransparent(buf: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(buf).greyscale().normalise().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const out = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const g = data[i];
    let a = 255 - g; // dark ink -> opaque, white paper -> transparent
    if (a < 16) a = 0; // floor: drop faint paper texture to fully transparent
    out[i * 4] = g; out[i * 4 + 1] = g; out[i * 4 + 2] = g; out[i * 4 + 3] = a;
  }
  return sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
}

/** Vision spelling gate: transcribe the lettering and compare to the intended title. */
async function checkSpelling(anthropic: Anthropic, png: Buffer, expected: string): Promise<{ ok: boolean; read: string }> {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
  try {
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 60,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "image/png", data: png.toString("base64") } },
            { type: "text", text: 'Transcribe the hand-lettered words in this image exactly. Reply with ONLY the words, nothing else.' },
          ],
        },
      ],
    });
    const read = msg.content.map((c: any) => (c.type === "text" ? c.text : "")).join("").trim();
    return { ok: norm(read) === norm(expected), read };
  } catch (e: any) {
    // If the vision check itself fails, don't silently ship — surface and treat as a miss.
    console.warn(`      spelling check errored (${e?.message || e}) — treating as mismatch.`);
    return { ok: false, read: "<vision-check-failed>" };
  }
}

// --- work set + plan -------------------------------------------------------------------------
function workSet(force: boolean, only?: string) {
  const cards = only ? studyCards.filter((c) => c.id === only) : studyCards;
  if (only && cards.length === 0) throw new Error(`--only "${only}" matched no card in the manifest.`);
  const needPlate = force || !fs.existsSync(platePath());
  const titles = cards.filter((c) => force || !fs.existsSync(titlePath(c)));
  return { cards, needPlate, titles };
}

function money(n: number) {
  return `$${n.toFixed(3)}`;
}

function printPlan(model: string, quality: Quality, force: boolean, only?: string) {
  const unit = PRICING[model][quality];
  const { cards, needPlate, titles } = workSet(force, only);
  console.log("\nHomeroom study-card generation — PLAN (nothing generated)\n");

  console.log("PLATE (blank card face, shared by every format, generate once)");
  console.log(`  ${needPlate ? "[new]  " : "[cached]"} index-card   ${model}   ${IMAGE_SIZE}   ${quality}   ${needPlate ? money(unit) : "—"}`);
  const plateCost = needPlate ? unit : 0;

  console.log("\nTITLES (per card, ×2 reroll budget)");
  console.log("  card              title                                     unit $     budget $");
  let titleBudget = 0;
  for (const c of cards) {
    const make = titles.includes(c);
    const budget = make ? unit * REROLL_BUDGET : 0;
    titleBudget += budget;
    const t = `"${c.title}"`.padEnd(42).slice(0, 42);
    console.log(`  ${c.id.padEnd(17)} ${t} ${make ? money(unit) : "—     "}    ${make ? money(budget) : "[cached, skip]"}`);
  }

  const worst = plateCost + titleBudget;
  const typical = plateCost + titleBudget / REROLL_BUDGET;
  console.log(`\nGRAND TOTAL (worst case, all rerolls used)   ${money(worst)}`);
  console.log(`Typical (no rerolls)                        ${money(typical)}`);
  return { needPlate, titles, worst };
}

// --- main ------------------------------------------------------------------------------------
async function main() {
  const { go, force, only, model, quality } = parseArgs();
  const { needPlate, titles, worst } = printPlan(model, quality, force, only);

  if (!go) {
    console.log("\nNo images generated. Re-run with --go to spend.\n");
    return;
  }
  if (!needPlate && titles.length === 0) {
    console.log("\nNothing to do — every asset is cached. (Use --force to re-make.)\n");
    return;
  }

  const openaiKey = loadEnv("OPENAI_API_KEY");
  const anthropicKey = loadEnv("ANTHROPIC_API_KEY");
  if (!openaiKey) { console.error("\nOPENAI_API_KEY not found in .env.local.\n"); process.exit(1); }
  if (!anthropicKey && titles.length) { console.error("\nANTHROPIC_API_KEY not found in .env.local (needed for the title spelling gate).\n"); process.exit(1); }
  const anthropic = new Anthropic({ apiKey: anthropicKey });

  console.log(`\nAbout to spend ~${money(worst)} (worst case). Generating…\n`);
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  if (needPlate) await makePlate(openaiKey, model, quality);
  for (const c of titles) await makeTitle(openaiKey, c, model, quality, anthropic);

  console.log("\nDone. Commit the new PNGs under public/illustrations/.\n");
}

main().catch((e) => { console.error(e); process.exit(1); });

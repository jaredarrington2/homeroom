/**
 * scripts/generate-finance-card.ts — one-off photoreal "finance charge" study card.
 *
 * Runs LOCALLY ONLY. Produces a single committed, TRANSPARENT PNG at
 *   public/illustrations/tila/finance-charge-card.png
 * that the deployed app serves statically (zero runtime API calls — same posture as
 * public/audio/). OPENAI_API_KEY lives only in .env.local (gitignored); never shipped.
 *
 * This piece deliberately BREAKS the v3.19 ink-line illustration house style — it is
 * photoreal card stock and bakes a full content layout — so it lives in its own script.
 * See ~/Downloads/claude-code-prompt-finance-charge-card.md and the render-review rubric
 * ~/Downloads/homeroom-visual-render-review.md (this rebuild folds in that review's findings).
 *
 * THE PRINCIPLE (from the render review): draw what must line up; generate only what floats
 * free. An image model places paper fiber + shadow beautifully but CANNOT register rules under
 * our text, a margin at a known x, a divider between columns, or the card's own edges. So:
 *   1. OpenAI GPT Image -> a BLANK, UNRULED cream index-card on a flat seamless MID-GRAY
 *      backdrop (no desk, no rules, no text). This is the substrate only.
 *   2. sharp            -> detect the card, crop its paper, normalize to a clean axis-aligned
 *      8x5 rectangle. One known coordinate system from here on.
 *   3. Puppeteer        -> draw EVERYTHING with coordinates in one overlay: the blue rules +
 *      red margin, the two-column IN/OUT content, markers, highlighter, divider, arrow — with
 *      body line-height == rule pitch so baselines land ON the rules (not through glyphs).
 *   4. sharp            -> multiply-composite the overlay so ink sits into the paper, then add
 *      a neutral drop shadow and export a TRANSPARENT PNG that floats on the app's canvas.
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-finance-card.ts            # dry run (plan + cost, spends nothing)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-finance-card.ts --go       # generate plate + overlay + composite
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-finance-card.ts --go --force        # re-do even if the final exists (also re-rolls the plate)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-finance-card.ts --go --draft        # cheap plate via gpt-image-1-mini
 *
 * The blank plate is cached at scripts/.cache/finance-card-plate.png so re-running the overlay
 * never re-spends. --force re-rolls the plate too.
 */
import * as fs from "fs";
import * as path from "path";
import puppeteer from "puppeteer";
import sharp from "sharp";

// --- model ---------------------------------------------------------------------------------
// Verified live against platform.openai.com on 2026-07-01: gpt-image-1.5, gpt-image-1-mini,
// gpt-image-2, chatgpt-image-latest all present. Spec defaults to gpt-image-1.5. Strings
// churn — re-verify before spending.
const MODEL_FINAL = "gpt-image-1.5";
const MODEL_DRAFT = "gpt-image-1-mini";
const IMAGE_SIZE = "1536x1024"; // landscape substrate
const EST_USD_FINAL = 0.19;
const EST_USD_DRAFT = 0.02;

// --- geometry (the overlay's coordinate system; the substrate is normalized to this) -------
// The card is normalized to a clean axis-aligned 8x5 rectangle so the drawn rules/margin/
// divider register against it. RULE_PITCH doubles as the body line-height => baseline lock.
const CARD_W = 1400;
const CARD_H = 875; // 8:5
const RULE_PITCH = 46;
const RULE_TOP = 178; // y where the ruled writing zone begins (below the header)
const MARGIN_X = 116; // red vertical margin line
const CONTENT_L = 150; // text/rules left edge (right of the margin line)
const CONTENT_R = 72; // right padding
const DIVIDER_X = 739; // center between the two columns
const SHADOW_M = 54; // transparent margin around the card for the drop shadow
const OUT_W = CARD_W + SHADOW_M * 2; // 1508
const OUT_H = CARD_H + SHADOW_M * 2; // 983
const OVERLAY_SCALE = 2; // render the overlay at 2x then downscale for crisp type

type Rect = { left: number; top: number; width: number; height: number };
// Only used if card detection returns something unreasonable (centered ~90% of a 1536x1024 plate).
const FALLBACK_RECT: Rect = { left: 77, top: 51, width: 1382, height: 922 };

// --- paths ---------------------------------------------------------------------------------
const CACHE_DIR = path.join(process.cwd(), "scripts", ".cache");
const PLATE_PATH = path.join(CACHE_DIR, "finance-card-plate.png");
const OVERLAY_PATH = path.join(CACHE_DIR, "finance-card-overlay.png");
const OUT_DIR = path.join(process.cwd(), "public", "illustrations", "tila");
const OUT_PATH = path.join(OUT_DIR, "finance-charge-card.png");

// --- the blank-plate prompt (substrate ONLY — no rules, no text, mid-gray backdrop) --------
const PLATE_PROMPT =
  "Top-down flat-lay photograph of a single blank matte cream index-card, thick card stock " +
  "(not thin notebook filler paper), 8x5 inch proportions in landscape orientation, lying " +
  "flat and perfectly centered on a flat seamless mid-gray studio backdrop. The card is " +
  "axis-aligned with its edges parallel to the frame, filling about 90% of the frame. Subtle " +
  "natural paper-fiber texture, soft even diffuse studio lighting, a very faint realistic " +
  "edge shadow. Photorealistic, high detail, editorial product-photography look. The card is " +
  "completely blank — absolutely NO rule lines, no ruled lines, no horizontal lines, no " +
  "margin line, no text, no writing, no print, no numbers, no letters, no symbols anywhere on " +
  "it. Plain seamless gray background only — no desk, no wood, no surface texture, no objects.";

// --- the content overlay (copy is LOCKED — exact per spec) ---------------------------------
// Tokens: ink #0A0A0A, muted #6B6B6B, pencil #3F3F3F, royal #1E3A8A, red #C8534F, hl #FFE899,
// blue rule #B8D4E8, red margin #C8534F. Fonts: Fraunces / Inter / Caveat / Courier Prime.
// The overlay draws the rules + margin itself so text baselines lock to the pitch (render B2).
function overlayHtml(): string {
  const P = RULE_PITCH;
  // A rule painted in the bottom ~1.6px of each pitch band; body line-height == P sits the
  // baseline just above it, so every line of body text rests ON a rule.
  const rulesBg = `repeating-linear-gradient(to bottom, transparent 0, transparent ${P - 1.6}px, var(--rule) ${P - 1.6}px, var(--rule) ${P}px)`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&family=Caveat:wght@500;600;700&family=Courier+Prime:wght@400;700&display=swap">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:${CARD_W}px; height:${CARD_H}px; background:transparent; }
  :root {
    --ink:#0A0A0A; --muted:#6B6B6B; --pencil:#3F3F3F;
    --royal:#1E3A8A; --red:#C8534F; --hl:#FFE899; --rule:#B8D4E8;
  }
  .card { width:${CARD_W}px; height:${CARD_H}px; position:relative; color:var(--ink);
    font-family:'Inter',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }

  /* index-card furniture, drawn in-overlay so it registers to the card exactly */
  .rulezone { position:absolute; left:${CONTENT_L}px; right:${CONTENT_R}px; top:${RULE_TOP}px;
    bottom:44px; background-image:${rulesBg}; }
  .marginline { position:absolute; left:${MARGIN_X}px; top:40px; bottom:40px; width:0;
    border-left:2px solid rgba(200,83,79,0.5); }
  .divider { position:absolute; left:${DIVIDER_X}px; top:${RULE_TOP}px; bottom:56px; width:0;
    border-left:3px solid var(--ink); transform:rotate(0.5deg); transform-origin:top center; }

  /* header (top zone, above the ruled writing area) */
  .top { position:absolute; left:${CONTENT_L}px; right:${CONTENT_R}px; top:42px; }
  .kicker { font-family:'Courier Prime',monospace; font-size:15px; letter-spacing:.14em;
    text-transform:uppercase; color:var(--muted); }
  .headline { font-family:'Fraunces',serif; font-weight:700; font-size:52px; line-height:1.03;
    color:var(--ink); margin-top:8px; }
  .subnote { font-family:'Caveat',cursive; font-weight:600; font-size:30px; color:var(--pencil);
    margin-top:4px; }

  /* highlighter — canon swipe, cloned per line so it never breaks across a wrap (render P2) */
  mark { background:transparent; background-image:linear-gradient(transparent 60%, var(--hl) 60%);
    -webkit-box-decoration-break:clone; box-decoration-break:clone; color:inherit; padding:0 .05em; }

  /* two columns share one rule grid, so IN/OUT rows align across the gutter */
  .cols { position:absolute; left:${CONTENT_L}px; right:${CONTENT_R}px; top:${RULE_TOP}px;
    bottom:44px; display:flex; }
  .col { flex:1; }
  .col.in { padding-right:38px; }
  .col.out { padding-left:42px; }

  .colhead { height:${P * 2}px; display:flex; align-items:flex-end; gap:12px; padding-bottom:6px; }
  .colhead .sign { font-family:'Fraunces',serif; font-weight:700; font-size:44px; line-height:1; }
  .colhead .label { font-family:'Fraunces',serif; font-weight:700; font-size:42px;
    letter-spacing:.02em; line-height:1; }
  .in .colhead .sign, .in .colhead .label { color:var(--royal); }
  .out .colhead .sign, .out .colhead .label { color:var(--red); }

  /* each item is an integer number of pitch bands tall, so baselines stay locked; the flex
     marker+text split hang-indents wrapped lines under the text, not the marker (render P3) */
  .item { display:flex; gap:13px; align-items:flex-start; }
  .item .mk { font-family:'Fraunces',serif; font-weight:700; font-size:25px; line-height:${P}px;
    flex:none; width:16px; }
  .in .item .mk { color:var(--royal); }
  .out .item .mk { color:var(--red); }
  .item .txt { font-size:25px; line-height:${P}px; color:var(--ink); }

  .margin { font-family:'Caveat',cursive; font-weight:600; font-size:24px; color:var(--pencil);
    display:inline-block; transform:rotate(-4deg); margin-left:2px; }
  .arw { display:inline-block; vertical-align:middle; margin:0 2px 0 6px; }
</style></head>
<body>
  <div class="card">
    <div class="marginline"></div>
    <div class="rulezone"></div>
    <div class="divider"></div>

    <div class="top">
      <div class="kicker">TILA &middot; finance charge</div>
      <div class="headline">What counts in the finance charge</div>
      <div class="subnote">= the APR, just in dollars instead of a rate</div>
    </div>

    <div class="cols">
      <div class="col in">
        <div class="colhead"><span class="sign">+</span><span class="label">IN</span></div>
        <div class="item"><span class="mk">+</span><span class="txt">Interest + points</span></div>
        <div class="item"><span class="mk">+</span><span class="txt">The lender&rsquo;s own fees</span></div>
        <div class="item"><span class="mk">+</span><span class="txt">Insurance for the lender&rsquo;s default risk</span></div>
        <div class="item"><span class="mk">+</span><span class="txt">A required third-party fee &mdash; the part the lender keeps</span></div>
        <div class="item"><span class="mk">+</span><span class="txt">Broker&rsquo;s fee &mdash; <mark>always</mark><svg class="arw" width="42" height="24" viewBox="0 0 42 24"><path d="M3 6 C 16 3, 26 8, 34 17" fill="none" stroke="#3F3F3F" stroke-width="2" stroke-linecap="round"/><path d="M28 18 L35 19.5 L32 12 Z" fill="#3F3F3F"/></svg><span class="margin">even if you picked them</span></span></div>
      </div>
      <div class="col out">
        <div class="colhead"><span class="sign">&ndash;</span><span class="label">OUT</span></div>
        <div class="item"><span class="mk">&ndash;</span><span class="txt">Application fee (charged to everyone)</span></div>
        <div class="item"><span class="mk">&ndash;</span><span class="txt">Late &amp; over-limit fees</span></div>
        <div class="item"><span class="mk">&ndash;</span><span class="txt">The seller&rsquo;s points</span></div>
        <div class="item"><span class="mk">&ndash;</span><span class="txt">Pre-closing services &mdash; <mark>appraisal, credit&nbsp;report</mark></span></div>
      </div>
    </div>
  </div>
</body></html>`;
}

function loadApiKey(): string {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
      const m = /^\s*OPENAI_API_KEY\s*=\s*(.+?)\s*$/.exec(line);
      if (m) return m[1].replace(/^['"]|['"]$/g, "");
    }
  }
  return process.env.OPENAI_API_KEY || "";
}

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    go: args.includes("--go"),
    force: args.includes("--force"),
    draft: args.includes("--draft"),
  };
}

async function generatePlate(apiKey: string, draft: boolean): Promise<void> {
  const model = draft ? MODEL_DRAFT : MODEL_FINAL;
  const quality = draft ? "medium" : "high";
  console.log(`  [1/4] plate — ${model} ${IMAGE_SIZE} (${quality})…`);
  const url = "https://api.openai.com/v1/images/generations";
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt: PLATE_PROMPT, size: IMAGE_SIZE, quality, n: 1 }),
    });
    if (res.ok) {
      const json: any = await res.json();
      const b64 = json?.data?.[0]?.b64_json;
      const remoteUrl = json?.data?.[0]?.url;
      let buf: Buffer;
      if (b64) buf = Buffer.from(b64, "base64");
      else if (remoteUrl) buf = Buffer.from(await (await fetch(remoteUrl)).arrayBuffer());
      else throw new Error(`Image response had neither b64_json nor url: ${JSON.stringify(json).slice(0, 300)}`);
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      fs.writeFileSync(PLATE_PATH, buf);
      console.log(`        wrote ${path.relative(process.cwd(), PLATE_PATH)} (${(buf.length / 1024).toFixed(0)} KB)`);
      return;
    }
    const body = await res.text();
    if (attempt === 0 && (res.status === 429 || res.status >= 500)) {
      console.warn(`        ${res.status} — retrying in 2s…`);
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }
    throw new Error(`OpenAI Images ${res.status}: ${body.slice(0, 400)}`);
  }
}

/** Find the card's bounding box in the plate: bright + low-saturation cream against mid-gray. */
async function detectCardRect(): Promise<Rect> {
  const { data, info } = await sharp(PLATE_PATH).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, ch = info.channels;
  const isCard = (i: number) => {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 200 && sat < 0.14;
  };
  const colFrac = new Array(W).fill(0), rowFrac = new Array(H).fill(0);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (isCard((y * W + x) * ch)) { colFrac[x]++; rowFrac[y]++; }
    }
  }
  const thrCol = H * 0.35, thrRow = W * 0.35;
  let left = 0; while (left < W && colFrac[left] < thrCol) left++;
  let right = W - 1; while (right > 0 && colFrac[right] < thrCol) right--;
  let top = 0; while (top < H && rowFrac[top] < thrRow) top++;
  let bottom = H - 1; while (bottom > 0 && rowFrac[bottom] < thrRow) bottom--;
  const rect: Rect = { left, top, width: right - left + 1, height: bottom - top + 1 };
  const area = rect.width * rect.height, aspect = rect.width / rect.height;
  const ok = rect.width > 0 && rect.height > 0 &&
    area > 0.2 * W * H && area < 0.99 * W * H && aspect > 1.2 && aspect < 2.2;
  if (!ok) {
    console.warn(`        card detection looked off (${JSON.stringify(rect)}) — using fallback rect.`);
    return FALLBACK_RECT;
  }
  console.log(`        detected card: ${JSON.stringify(rect)}`);
  return rect;
}

/** Crop the detected card's paper (inset to shed any edge/shadow) and normalize to CARD_W×H. */
async function normalizeSubstrate(): Promise<Buffer> {
  console.log("  [2/4] substrate — cropping + normalizing the card paper…");
  const rect = await detectCardRect();
  const inx = Math.round(rect.width * 0.02), iny = Math.round(rect.height * 0.02);
  return sharp(PLATE_PATH)
    .extract({
      left: rect.left + inx,
      top: rect.top + iny,
      width: rect.width - inx * 2,
      height: rect.height - iny * 2,
    })
    .resize(CARD_W, CARD_H, { fit: "fill" })
    .removeAlpha()
    .toBuffer();
}

async function renderOverlay(): Promise<void> {
  console.log("  [3/4] overlay — drawing rules + content with Puppeteer…");
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: CARD_W, height: CARD_H, deviceScaleFactor: OVERLAY_SCALE });
    await page.setContent(overlayHtml(), { waitUntil: "load" });
    // Belt-and-suspenders: make sure the webfonts actually painted before the screenshot.
    // (setContent's waitUntil doesn't track the <link> font fetch, so fonts.ready is the gate.)
    await page.evaluateHandle("document.fonts.ready");
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    await page.screenshot({ path: OVERLAY_PATH, omitBackground: true });
    console.log(`        wrote ${path.relative(process.cwd(), OVERLAY_PATH)}`);
  } finally {
    await browser.close();
  }
}

async function composite(): Promise<void> {
  console.log("  [4/4] composite — multiply overlay into paper, add shadow, export alpha PNG…");
  const paper = await normalizeSubstrate(); // CARD_W×CARD_H, opaque cream

  // Downscale the 2x overlay to the exact card rect so drawn rules line up 1:1 with the layout.
  const overlay = await sharp(OVERLAY_PATH).resize(CARD_W, CARD_H, { fit: "fill" }).png().toBuffer();

  // Multiply so ink (and the drawn blue rules / red margin / divider) sits INTO the paper.
  const cardFinal = await sharp(paper)
    .composite([{ input: overlay, blend: "multiply" }])
    .png()
    .toBuffer();

  // Neutral drop shadow on a transparent canvas — reads as a physical card on the app's white.
  const shadowSil = await sharp({
    create: { width: CARD_W, height: CARD_H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0.4 } },
  }).png().toBuffer();
  const shadowLayer = await sharp({
    create: { width: OUT_W, height: OUT_H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: shadowSil, left: SHADOW_M + 4, top: SHADOW_M + 14 }])
    .blur(18)
    .png()
    .toBuffer();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  await sharp({
    create: { width: OUT_W, height: OUT_H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: shadowLayer },
      { input: cardFinal, left: SHADOW_M, top: SHADOW_M },
    ])
    .png()
    .toFile(OUT_PATH);
  console.log(`        wrote ${path.relative(process.cwd(), OUT_PATH)} (${OUT_W}×${OUT_H}, transparent)`);
}

function printPlan(draft: boolean) {
  const model = draft ? MODEL_DRAFT : MODEL_FINAL;
  const est = draft ? EST_USD_DRAFT : EST_USD_FINAL;
  console.log("\n  finance-charge study card — blank substrate + fully-drawn overlay\n");
  console.log("  plan:");
  console.log(`    1. OpenAI ${model} → 1 blank cream card on gray @ ${IMAGE_SIZE}   (~$${est.toFixed(2)})`);
  console.log("    2. sharp          → detect + crop + normalize card paper (free, local)");
  console.log("    3. Puppeteer      → draw rules + margin + content overlay (free, local)");
  console.log("    4. sharp          → multiply composite + shadow → transparent PNG (free, local)");
  console.log(`\n    plate cache : ${path.relative(process.cwd(), PLATE_PATH)}`);
  console.log(`    final       : ${path.relative(process.cwd(), OUT_PATH)}  (${OUT_W}×${OUT_H})`);
  console.log(`\n  est. spend this run: ~$${est.toFixed(2)} (1 API image). The gate is discipline, not budget.\n`);
}

async function main() {
  const { go, force, draft } = parseArgs();
  printPlan(draft);

  if (!go) {
    console.log("  Dry run — nothing generated, nothing spent. Re-run with --go to build.\n");
    return;
  }

  if (fs.existsSync(OUT_PATH) && !force) {
    console.log(`  Final already exists at ${path.relative(process.cwd(), OUT_PATH)} — skipping.`);
    console.log("  Re-run with --force to regenerate.\n");
    return;
  }

  const apiKey = loadApiKey();
  if (!apiKey) {
    console.error("\n  OPENAI_API_KEY not found in .env.local. Add it, then re-run.\n");
    process.exit(1);
  }

  // Step 1 — plate (cached; only the plate costs money).
  if (fs.existsSync(PLATE_PATH) && !force) {
    console.log(`  [1/4] plate — cached at ${path.relative(process.cwd(), PLATE_PATH)}, reusing (no spend). --force to re-roll.`);
  } else {
    await generatePlate(apiKey, draft);
  }

  // Steps 2–4 — local, free.
  await renderOverlay();
  await composite();

  console.log("\n  Done. Commit public/illustrations/tila/finance-charge-card.png.\n");
}

main().catch((e) => { console.error(e); process.exit(1); });

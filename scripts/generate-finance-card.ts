/**
 * scripts/generate-finance-card.ts — one-off photorealistic "finance charge" study card.
 *
 * Runs LOCALLY ONLY. Produces a single committed PNG at
 *   public/illustrations/tila/finance-charge-card.png
 * that the deployed app serves statically (zero runtime API calls — same posture as
 * public/audio/). The OPENAI_API_KEY lives only in .env.local (gitignored); never shipped.
 *
 * This piece deliberately BREAKS the v3.19 ink-line illustration house style — it is
 * photoreal and bakes a full content layout — so it lives in its own script rather than the
 * generic generate-illustrations.ts. See ~/Downloads/claude-code-prompt-finance-charge-card.md.
 *
 * Hybrid pipeline (image models garble baked-in text; this is exam content, so text is
 * composited locally as real, correct type):
 *   1. OpenAI GPT Image  -> a photorealistic BLANK ruled index card on a desk (no text).
 *   2. Puppeteer         -> render the exact copy/highlighter/markers to a transparent PNG.
 *   3. sharp             -> composite the overlay onto the card region with a multiply blend
 *                           so the ink sits into the paper.
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-finance-card.ts            # dry run (plan + cost, spends nothing)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-finance-card.ts --go       # generate plate + overlay + composite
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-finance-card.ts --go --force        # re-do even if the final exists
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-finance-card.ts --go --draft        # cheap plate via gpt-image-1-mini
 *
 * The blank plate is cached at scripts/.cache/finance-card-plate.png so re-running the overlay
 * never re-spends. --force regenerates the plate too.
 */
import * as fs from "fs";
import * as path from "path";
import puppeteer from "puppeteer";
import sharp from "sharp";

// --- model ---------------------------------------------------------------------------------
// Verified live against platform.openai.com on 2026-07-01: gpt-image-1.5, gpt-image-1-mini,
// gpt-image-2, chatgpt-image-latest all present. Spec defaults to gpt-image-1.5; gpt-image-2
// is a newer upgrade if a re-roll wants it. Strings churn — re-verify before spending.
const MODEL_FINAL = "gpt-image-1.5";
const MODEL_DRAFT = "gpt-image-1-mini";
const IMAGE_SIZE = "1536x1024"; // landscape
// gpt-image-1.5, landscape, high quality is ~$0.19/image; mini is a few cents. Rough estimate.
const EST_USD_FINAL = 0.19;
const EST_USD_DRAFT = 0.02;

// --- geometry ------------------------------------------------------------------------------
// The plate is a 1536x1024 flat-lay; the card fills ~84% of the width, centered & axis-aligned.
// This is the card's pixel rect inside the plate — the overlay is composited here.
const PLATE_W = 1536;
const PLATE_H = 1024;
const CARD_RECT = { left: 123, top: 82, width: 1290, height: 860 };
const OVERLAY_SCALE = 2; // render the overlay at 2x then downscale for crisp type

// --- paths ---------------------------------------------------------------------------------
const CACHE_DIR = path.join(process.cwd(), "scripts", ".cache");
const PLATE_PATH = path.join(CACHE_DIR, "finance-card-plate.png");
const OVERLAY_PATH = path.join(CACHE_DIR, "finance-card-overlay.png");
const OUT_DIR = path.join(process.cwd(), "public", "illustrations", "tila");
const OUT_PATH = path.join(OUT_DIR, "finance-charge-card.png");

// --- the blank-plate prompt (verbatim from the spec) ---------------------------------------
const PLATE_PROMPT =
  "Top-down flat-lay photograph of a single blank 8x5 inch ruled index card, landscape " +
  "orientation, lying flat on a warm neutral wooden desk. Cream/ivory paper with faint " +
  "evenly-spaced horizontal blue rule lines and one vertical red margin line near the left " +
  "edge. The card is centered, axis-aligned (edges parallel to the frame), filling about 84% " +
  "of the frame width with an even desk margin all around. Soft diffuse natural daylight from " +
  "the upper left, a gentle realistic contact shadow beneath the card, subtle paper-fiber " +
  "texture, a slight natural curl at one corner. Photorealistic, high detail, editorial " +
  "product-photography look, shallow believable depth of field. The card is completely blank " +
  "— absolutely no text, no writing, no print, no numbers, no letters, no symbols anywhere " +
  "in the image.";

// --- the content overlay (copy is LOCKED — exact per spec) ---------------------------------
// Tokens: ink #0A0A0A, muted #6B6B6B, pencil #3F3F3F, royal #1E3A8A, red #C8534F, hl #FFE899.
// Fonts: Fraunces / Inter / Caveat / Courier Prime via Google Fonts <link>.
function overlayHtml(): string {
  const W = CARD_RECT.width;
  const H = CARD_RECT.height;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&family=Caveat:wght@500;600;700&family=Courier+Prime:wght@400;700&display=swap">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:${W}px; height:${H}px; background:transparent; }
  :root {
    --ink:#0A0A0A; --muted:#6B6B6B; --pencil:#3F3F3F;
    --royal:#1E3A8A; --red:#C8534F; --hl:#FFE899;
  }
  .card { width:${W}px; height:${H}px; position:relative;
    padding:58px 64px 48px; opacity:0.94; color:var(--ink);
    font-family:'Inter',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
  mark { background:transparent;
    background-image:linear-gradient(transparent 62%, var(--hl) 62%);
    color:inherit; padding:0 .06em; }

  /* top strip */
  .kicker { font-family:'Courier Prime',monospace; font-size:19px; letter-spacing:.14em;
    text-transform:uppercase; color:var(--muted); }
  .headline { font-family:'Fraunces',serif; font-weight:700; font-size:56px; line-height:1.02;
    color:var(--ink); margin-top:10px; }
  .subnote { font-family:'Caveat',cursive; font-weight:600; font-size:32px; color:var(--pencil);
    margin-top:6px; }

  /* columns */
  .cols { position:absolute; left:64px; right:64px; top:236px; bottom:48px; display:flex; }
  .col { flex:1; padding-top:4px; }
  .col.in { padding-right:46px; }
  .col.out { padding-left:52px; }
  .divider { position:absolute; left:50%; top:236px; bottom:64px; width:0;
    border-left:3.5px solid var(--ink); transform:translateX(-1px) rotate(0.4deg); }

  .colhead { display:flex; align-items:baseline; gap:12px; margin-bottom:26px; }
  .colhead .sign { font-family:'Fraunces',serif; font-weight:700; font-size:46px; line-height:1; }
  .colhead .label { font-family:'Fraunces',serif; font-weight:700; font-size:44px;
    letter-spacing:.02em; line-height:1; }
  .in .colhead .sign, .in .colhead .label { color:var(--royal); }
  .out .colhead .sign, .out .colhead .label { color:var(--red); }

  .item { display:flex; gap:14px; align-items:flex-start;
    font-size:26px; line-height:1.34; padding:9px 0; }
  .item + .item { border-top:1px solid rgba(107,107,107,0.22); }
  .item .mk { font-family:'Fraunces',serif; font-weight:700; font-size:26px; flex:none;
    line-height:1.34; }
  .in .item .mk { color:var(--royal); }
  .out .item .mk { color:var(--red); }
  .item .txt { color:var(--ink); }

  .margin { font-family:'Caveat',cursive; font-weight:600; font-size:25px; color:var(--pencil);
    display:inline-block; transform:rotate(-4deg); margin-left:8px; }

  /* hand-drawn arrow from "always" to its marginalia */
  .arrow { position:absolute; }
</style></head>
<body>
  <div class="card">
    <div class="kicker">TILA &middot; finance charge</div>
    <div class="headline">What counts in the finance charge</div>
    <div class="subnote">= the APR, just in dollars instead of a rate</div>

    <div class="divider"></div>
    <div class="cols">
      <div class="col in">
        <div class="colhead"><span class="sign">+</span><span class="label">IN</span></div>
        <div class="item"><span class="mk">+</span><span class="txt">Interest + points</span></div>
        <div class="item"><span class="mk">+</span><span class="txt">The lender&rsquo;s own fees</span></div>
        <div class="item"><span class="mk">+</span><span class="txt">Insurance for the lender&rsquo;s default risk</span></div>
        <div class="item"><span class="mk">+</span><span class="txt">A required third-party fee &mdash; the part the lender keeps</span></div>
        <div class="item"><span class="mk">+</span><span class="txt">Broker&rsquo;s fee &mdash; <mark>always</mark><span class="margin">even if you picked them</span></span></div>
      </div>
      <div class="col out">
        <div class="colhead"><span class="sign">&ndash;</span><span class="label">OUT</span></div>
        <div class="item"><span class="mk">&ndash;</span><span class="txt">Application fee (charged to everyone)</span></div>
        <div class="item"><span class="mk">&ndash;</span><span class="txt">Late &amp; over-limit fees</span></div>
        <div class="item"><span class="mk">&ndash;</span><span class="txt">The seller&rsquo;s points</span></div>
        <div class="item"><span class="mk">&ndash;</span><span class="txt">Pre-closing services &mdash; <mark>appraisal, credit report</mark></span></div>
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
  console.log(`  [1/3] plate — ${model} ${IMAGE_SIZE} (${quality})…`);
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

async function renderOverlay(): Promise<void> {
  console.log("  [2/3] overlay — rendering text with Puppeteer…");
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: CARD_RECT.width,
      height: CARD_RECT.height,
      deviceScaleFactor: OVERLAY_SCALE,
    });
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
  console.log("  [3/3] composite — laying overlay into the card with multiply blend…");
  // Downscale the 2x overlay back to the exact card rect so it lines up 1:1 with the plate.
  const overlay = await sharp(OVERLAY_PATH)
    .resize(CARD_RECT.width, CARD_RECT.height, { fit: "fill" })
    .png()
    .toBuffer();

  // Normalize the plate to the expected plate geometry (the model returns exactly 1536x1024,
  // but be defensive in case a size variant slips through).
  const plate = sharp(PLATE_PATH).resize(PLATE_W, PLATE_H, { fit: "cover" });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  await plate
    .composite([{ input: overlay, left: CARD_RECT.left, top: CARD_RECT.top, blend: "multiply" }])
    .png()
    .toFile(OUT_PATH);
  console.log(`        wrote ${path.relative(process.cwd(), OUT_PATH)}`);
}

function printPlan(draft: boolean) {
  const model = draft ? MODEL_DRAFT : MODEL_FINAL;
  const est = draft ? EST_USD_DRAFT : EST_USD_FINAL;
  console.log("\n  finance-charge study card — hybrid plate + local text overlay\n");
  console.log("  plan:");
  console.log(`    1. OpenAI ${model} → 1 blank plate @ ${IMAGE_SIZE}   (~$${est.toFixed(2)})`);
  console.log("    2. Puppeteer      → transparent text overlay (free, local)");
  console.log("    3. sharp          → composite (multiply) → final PNG (free, local)");
  console.log(`\n    plate cache : ${path.relative(process.cwd(), PLATE_PATH)}`);
  console.log(`    final       : ${path.relative(process.cwd(), OUT_PATH)}`);
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
    console.log(`  [1/3] plate — cached at ${path.relative(process.cwd(), PLATE_PATH)}, reusing (no spend). --force to re-roll.`);
  } else {
    await generatePlate(apiKey, draft);
  }

  // Step 2 + 3 — local, free.
  await renderOverlay();
  await composite();

  console.log("\n  Done. Commit public/illustrations/tila/finance-charge-card.png.\n");
}

main().catch((e) => { console.error(e); process.exit(1); });

/**
 * scripts/generate-assets.ts — the Disclosure & Resource asset library (game-prop direction).
 *
 * SUPERSEDES scripts/generate-books.ts. The antique-hardcover system is retired: no gold, no
 * leather, no serif, no sparkles, no per-book jewel palette. This builds stylized
 * consumer-finance PROPS in four formats (book / envelope / form / folder), matte and chunky
 * like life-sim game props, with a constrained blue/red/teal palette where color = role.
 * Source of truth: disclosure-asset-spec.md + the 8 samples in disclosure-style-guide.html.
 *
 * Runs LOCALLY ONLY. The deployed app never calls the image API — it serves the static PNGs
 * this writes into public/assets/. The key lives only in .env.local (gitignored).
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-assets.ts                    # dry-run cost table
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-assets.ts --slug=charm        # one asset (VERSIONS variations)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-assets.ts --fmt=envelope       # every asset of one format
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-assets.ts --all               # everything
 *
 * Approval batch (one of each format — run first, then pause for a look-check):
 *   ... --slug=charm --slug=adverse --slug=estimate --slug=counseling
 *
 * Optional: --draft (gpt-image-1-mini + medium quality, for look iteration).
 *
 * Per asset: ONE n:VERSIONS call → write v1..vN.png (versions differ in orientation). Skips any
 * file already on disk, so a re-run continues rather than re-charging; to redo an asset, delete
 * its public/assets/<slug>/ folder and re-run. After writing, regenerates manifest.json.
 *
 * Text is deliberately minimal in the pixels — only the big title (plus format-appropriate
 * structure the samples show: a form banner, an envelope's generic postal imprints). Regulation,
 * due date, and channel are manifest metadata the app overlays — never baked in. This also
 * sidesteps the small-text garble that plagued the old book stamps.
 */
import * as fs from "fs";
import * as path from "path";

// Model strings verified live against platform.openai.com on 2026-07-01 (see
// generate-finance-card.ts / generate-books.ts). Strings churn — re-verify before spending.
const MODEL_FINAL = "gpt-image-1.5";
const MODEL_DRAFT = "gpt-image-1-mini";
const SIZE = "1024x1024";
const EST_USD_HIGH = 0.17;
const EST_USD_MEDIUM = 0.05;

const VERSIONS = 3; // variations per asset — one place to change it
const ASSETS_ROOT = path.join(process.cwd(), "public", "assets");
const REQUEST_GAP_MS = 500;

// --- house style (BASE + per-format), verbatim from the spec --------------------------------

const BASE_STYLE = `
A single stylized 3D consumer-finance object in a friendly life-simulation game-prop
style: chunky, softened, slightly toy-like forms with simplified geometry and a clean
readable silhouette. Matte, lightly textured surfaces. Bold flat color blocks and clean
modern sans-serif labels. Polished 3D illustration (NOT photorealistic), soft even
lighting, gently rounded edges, a soft grounding shadow.

Do NOT use: gold, foil, or metallic surfaces; leather, parchment, or aged/weathered
texture; gems, medallions, or sparkles; ornate serif or script type; gradients, glitter,
or decorative filigree; heavy bevels or glossy varnish; any desk, table, hands, room, or
background clutter.

Fully transparent background (PNG alpha). One object only. Controlled perspective.
`.trim();

const BOOK_STYLE = `A chunky matte consumer-guide book, like a household reference manual — visible page block and spine thickness, a color-blocked cover with one bold oversized title word and one central icon, a restrained spine label strip. Matte board, no shine.`;
const ENVELOPE_STYLE = `A flat white business-mail envelope with subtle folded-paper construction and soft thickness. A large color-blocked title panel, a simple return-address block, a permit/postmark imprint, an address window, and light routing lines — clean stylized game-world mail, not real photographed mail.`;
const FORM_STYLE = `A single white disclosure form/page with ONE dominant colored title banner, a few clean tables, bars, and fields in blue, intentionally sparse placeholder data, and large readable section labels. Simplified — a visual study object, not a real legal document. Limited red callouts only for a warning, shortage, or exception state.`;
const FOLDER_STYLE = `A thick warm manila file folder with a broad readable silhouette, rounded game-prop edges, a tab and inner pocket, optionally holding a white form peeking out. Soft depth and shadow. Minimal labeling.`;

const FMT_STYLE = { book: BOOK_STYLE, envelope: ENVELOPE_STYLE, form: FORM_STYLE, folder: FOLDER_STYLE };
const COLOR = { blue: "saturated institutional blue", red: "coral red", teal: "teal" };
const ORIENT = ["shown front-on, centered", "at a gentle three-quarter tilt", "lying flat and angled"];
const FOLDER_ORIENT = ["upright", "angled while holding a white form", "lying flat"];

// --- catalog (drives every prompt AND the manifest) -----------------------------------------

type Fmt = "book" | "envelope" | "form" | "folder";
type Role = "blue" | "red" | "teal";
type Asset = {
  slug: string; title: string; official: string;
  fmt: Fmt; role: Role; icon: string;
  reg: string; due: string; channel: "deliver" | "law" | "notify" | "posted";
};

const ASSETS: Asset[] = [
  { slug: "charm",      title: "CHARM",         official: "Consumer Handbook on ARMs",                  fmt: "book",     role: "red",  icon: "a simple layered heart",              reg: "REG Z",      due: "WITHIN 3 DAYS",         channel: "deliver" },
  { slug: "arm",        title: "ARM",           official: "Early ARM Disclosure",                       fmt: "book",     role: "teal", icon: "a flexing arm",                       reg: "REG Z",      due: "AT APPLICATION",        channel: "deliver" },
  { slug: "toolkit",    title: "TOOLKIT",       official: "Special Information Booklet",                 fmt: "book",     role: "blue", icon: "a toolbox",                           reg: "RESPA",      due: "WITHIN 3 DAYS",         channel: "deliver" },
  { slug: "heloc",      title: "HELOC",         official: "HELOC Brochure",                             fmt: "book",     role: "teal", icon: "a house on a tightrope",              reg: "REG Z",      due: "AT APPLICATION",        channel: "deliver" },
  { slug: "atr",        title: "ATR",           official: "Ability-to-Repay / Qualified Mortgage",      fmt: "book",     role: "blue", icon: "a calculator",                        reg: "DODD-FRANK", due: "BEFORE APPROVAL",       channel: "law" },
  { slug: "estimate",   title: "LOAN ESTIMATE", official: "Loan Estimate",                              fmt: "form",     role: "blue", icon: "loan-summary blocks",                 reg: "TRID",       due: "WITHIN 3 DAYS",         channel: "deliver" },
  { slug: "closing",    title: "CLOSING",       official: "Closing Disclosure",                         fmt: "form",     role: "red",  icon: "a padlock and a deadline clock",      reg: "TRID",       due: "3 DAYS BEFORE CLOSING", channel: "deliver" },
  { slug: "escrow",     title: "ESCROW",        official: "Aggregate Escrow Analysis Statement",        fmt: "form",     role: "blue", icon: "escrow-summary blocks with a shortage row", reg: "RESPA", due: "YEARLY",                channel: "deliver" },
  { slug: "score",      title: "SCORE",         official: "Credit Score Disclosure",                    fmt: "form",     role: "blue", icon: "a score gauge",                       reg: "FACTA",      due: "AT APPLICATION",        channel: "notify" },
  { slug: "payoff",     title: "PAYOFF",        official: "Payoff Statement",                           fmt: "form",     role: "blue", icon: "a checkered finish flag",             reg: "REG Z",      due: "WITHIN 7 DAYS",         channel: "deliver" },
  { slug: "cancel",     title: "CANCEL",        official: "Notice of Right to Cancel",                  fmt: "form",     role: "red",  icon: "a bold X over scissors",              reg: "REG Z",      due: "3-DAY WINDOW",          channel: "law" },
  { slug: "hoepa",      title: "HIGH-COST",     official: "High-Cost Mortgage Disclosure",              fmt: "form",     role: "red",  icon: "a warning triangle",                  reg: "HOEPA",      due: "3 DAYS BEFORE CLOSING", channel: "law" },
  { slug: "cip",        title: "CIP",           official: "Customer Identification Program Notice",     fmt: "form",     role: "blue", icon: "a fingerprint",                       reg: "PATRIOT ACT",due: "BEFORE OPENING",        channel: "notify" },
  { slug: "esign",      title: "E-SIGN",        official: "E-Sign Consent Disclosure",                  fmt: "form",     role: "blue", icon: "a pen signing a check-box",           reg: "E-SIGN ACT", due: "BEFORE E-DELIVERY",     channel: "law" },
  { slug: "flood",      title: "FLOOD",         official: "Notice of Special Flood Hazard",             fmt: "form",     role: "red",  icon: "water waves",                         reg: "FLOOD ACT",  due: "BEFORE CLOSING",        channel: "law" },
  { slug: "adverse",    title: "ADVERSE",       official: "Adverse Action Notice",                      fmt: "envelope", role: "red",  icon: "a thumbs-down on the title panel",    reg: "ECOA",       due: "WITHIN 30 DAYS",        channel: "notify" },
  { slug: "servicing",  title: "SERVICING",     official: "Servicing Transfer Statement",               fmt: "envelope", role: "blue", icon: "a handoff/relay on the title panel",  reg: "RESPA",      due: "15 DAYS AHEAD",         channel: "notify" },
  { slug: "privacy",    title: "PRIVACY",       official: "GLBA Privacy Notice",                        fmt: "envelope", role: "blue", icon: "a keyhole on the title panel",        reg: "GLBA",       due: "YEARLY",                channel: "notify" },
  { slug: "pmi",        title: "PMI",           official: "PMI Disclosures & Cancellation Notices",     fmt: "envelope", role: "blue", icon: "an umbrella on the title panel",      reg: "HPA",        due: "YEARLY",                channel: "notify" },
  { slug: "abad",       title: "ABAD",          official: "Affiliated Business Arrangement Disclosure",  fmt: "envelope", role: "blue", icon: "two linked rings on the title panel", reg: "RESPA",      due: "AT REFERRAL",           channel: "notify" },
  { slug: "counseling", title: "COUNSELING",    official: "Homeownership Counseling List",              fmt: "folder",   role: "blue", icon: "a house list on the tab",             reg: "RESPA",      due: "WITHIN 3 DAYS",         channel: "deliver" },
  { slug: "appraisal",  title: "APPRAISAL",     official: "Appraisal / Valuation Copy & Notice",        fmt: "folder",   role: "blue", icon: "a magnifier over a house",            reg: "ECOA",       due: "PROMPTLY",              channel: "law" },
];

// --- prompt composition ---------------------------------------------------------------------

// Keep the quoted title as the primary signal and add a per-word letter spelling that PRESERVES
// word boundaries ("LOAN ESTIMATE" → "L-O-A-N E-S-T-I-M-A-T-E"), so multi-word titles don't
// collapse. Titles are the #1 verify criterion.
const spellTitle = (t: string) => t.split(" ").map((w) => w.split("").join("-")).join("  ");

function prompt(a: Asset, version: number): string {
  const orient = (a.fmt === "folder" ? FOLDER_ORIENT : ORIENT)[version % 3];
  return `${BASE_STYLE}

${FMT_STYLE[a.fmt]}

The object is ${orient}. Primary color: ${COLOR[a.role]}, used in large blocks. The bold
oversized title reads "${a.title}" (${spellTitle(a.title)}) in a clean sans-serif. Central
visual metaphor: ${a.icon}. Keep all other text to an absolute minimum — no paragraphs, no
fine print, no regulation numbers. Transparent background.`;
}

// --- plumbing -------------------------------------------------------------------------------

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
  const all = args.includes("--all");
  const draft = args.includes("--draft");
  const qArg = args.find((a) => a.startsWith("--quality="));
  const quality = qArg ? qArg.slice("--quality=".length) : null; // high|medium|low; overrides the default
  const slugs = args.filter((a) => a.startsWith("--slug=")).map((a) => a.slice("--slug=".length));
  const fmts = args.filter((a) => a.startsWith("--fmt=")).map((a) => a.slice("--fmt=".length));
  return { all, draft, quality, slugs, fmts, dryRun: !all && !slugs.length && !fmts.length };
}

// Rough per-image USD by quality at 1024x1024 (gpt-image-1.5; mini is a few× cheaper).
const PRICE: Record<string, number> = { high: 0.17, medium: 0.04, low: 0.02 };

const versionPaths = (slug: string) => Array.from({ length: VERSIONS }, (_, i) => path.join(ASSETS_ROOT, slug, `v${i + 1}.png`));

async function generate(p: string, n: number, apiKey: string, model: string, quality: string): Promise<Buffer[]> {
  const url = "https://api.openai.com/v1/images/generations";
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt: p, size: SIZE, background: "transparent", output_format: "png", quality, n }),
    });
    if (res.ok) {
      const json = (await res.json()) as { data?: { b64_json?: string }[] };
      const bufs = (json.data ?? []).map((d) => d.b64_json && Buffer.from(d.b64_json, "base64")).filter(Boolean) as Buffer[];
      if (bufs.length !== n) throw new Error(`Expected ${n} image(s), got ${bufs.length}`);
      return bufs;
    }
    const body = await res.text();
    if (attempt < 2 && (res.status === 429 || res.status >= 500)) {
      console.warn(`    ${res.status} — retrying in 5s…`);
      await new Promise((r) => setTimeout(r, 5000));
      continue;
    }
    throw new Error(`OpenAI images ${res.status}: ${body.slice(0, 300)}`);
  }
  throw new Error("unreachable");
}

function writeManifest() {
  const manifest: Record<string, unknown> = {};
  for (const a of ASSETS) {
    const versions = versionPaths(a.slug).filter((p) => fs.existsSync(p)).map((p) => `/assets/${a.slug}/${path.basename(p)}`);
    if (!versions.length) continue;
    manifest[a.slug] = {
      title: a.title, official: a.official, fmt: a.fmt, role: a.role,
      reg: a.reg, due: a.due, channel: a.channel, versions,
    };
  }
  fs.mkdirSync(ASSETS_ROOT, { recursive: true });
  fs.writeFileSync(path.join(ASSETS_ROOT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`  manifest.json — ${Object.keys(manifest).length} asset(s)`);
}

function printCostTable(perImage: number, model: string, quality: string) {
  console.log("\n  slug         fmt        role   missing   est $");
  console.log("  ------------------------------------------------");
  let totalImgs = 0;
  for (const a of ASSETS) {
    const missing = versionPaths(a.slug).filter((p) => !fs.existsSync(p)).length;
    totalImgs += missing;
    console.log(`  ${a.slug.padEnd(12)} ${a.fmt.padEnd(10)} ${a.role.padEnd(6)} ${String(missing).padStart(7)}   $${(missing * perImage).toFixed(2)}`);
  }
  console.log("  ------------------------------------------------");
  console.log(`  ${"TOTAL".padEnd(29)} ${String(totalImgs).padStart(7)}   $${(totalImgs * perImage).toFixed(2)}`);
  console.log(`\n  ${model} @ ${SIZE} quality=${quality}, ${VERSIONS} versions/asset (~$${perImage.toFixed(2)}/image). Dry run — nothing generated.`);
  console.log(`  Run with --slug=<slug>, --fmt=<book|envelope|form|folder>, or --all to generate.\n`);
}

// --- main -----------------------------------------------------------------------------------

async function main() {
  const { all, draft, quality: qFlag, slugs, fmts, dryRun } = parseArgs();
  const model = draft ? MODEL_DRAFT : MODEL_FINAL;
  const quality = qFlag ?? (draft ? "medium" : "high");
  const perImage = (draft ? 0.5 : 1) * (PRICE[quality] ?? EST_USD_HIGH);

  if (dryRun) { printCostTable(perImage, model, quality); return; }

  const apiKey = loadApiKey();
  if (!apiKey) { console.error("No OPENAI_API_KEY in .env.local or env."); process.exit(1); }

  let targets = ASSETS;
  if (!all) {
    targets = ASSETS.filter((a) => slugs.includes(a.slug) || fmts.includes(a.fmt));
    const badSlugs = slugs.filter((s) => !ASSETS.some((a) => a.slug === s));
    if (badSlugs.length) { console.error(`Unknown slug(s): ${badSlugs.join(", ")}\nSlugs: ${ASSETS.map((a) => a.slug).join(", ")}`); process.exit(1); }
    if (!targets.length) { console.error("Nothing matched --slug/--fmt."); process.exit(1); }
  }

  console.log(`\n  ${model} @ ${SIZE} quality=${quality}, ${VERSIONS} versions/asset\n`);
  let written = 0, spent = 0;
  for (const a of targets) {
    fs.mkdirSync(path.join(ASSETS_ROOT, a.slug), { recursive: true });
    const missing = versionPaths(a.slug).filter((p) => !fs.existsSync(p));
    if (!missing.length) { console.log(`  ${a.slug} (${a.fmt}) — all ${VERSIONS} exist, skipping`); continue; }

    console.log(`  ${a.slug} (${a.fmt}, ${a.role}) — generating ${missing.length}…`);
    // Ask for exactly the missing versions, but keep each version's orientation stable by
    // generating from that version's index (so a re-roll of v2 still gets the three-quarter pose).
    for (const p of missing) {
      const v = Number(path.basename(p).replace(/\D/g, "")) - 1;
      const [buf] = await generate(prompt(a, v), 1, apiKey, model, quality);
      fs.writeFileSync(p, buf);
      console.log(`    wrote ${path.basename(p)} (${(buf.length / 1024).toFixed(0)} KB)`);
      written += 1; spent += perImage;
      await new Promise((r) => setTimeout(r, REQUEST_GAP_MS));
    }
  }

  writeManifest();
  console.log(`\n  Done — ${written} image(s) written, ~$${spent.toFixed(2)}.\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });

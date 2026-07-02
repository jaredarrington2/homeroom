/**
 * scripts/generate-books.ts — generate the Disclosure Books asset library via OpenAI GPT Image.
 *
 * Runs LOCALLY ONLY. The deployed app never calls the image API — it serves the static PNGs
 * this writes into public/books/. The API key lives only in .env.local (gitignored).
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-books.ts               # dry run (cost only)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-books.ts --doc=charm   # one book (covers + open)
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-books.ts --covers      # covers for all books
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-books.ts --open        # open views for all books
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-books.ts --all         # everything
 *
 * Optional: --draft (gpt-image-1-mini + medium quality, for look iteration).
 *
 * Per book: one n:3 cover call → cover-v1..v3.png (same title/color/emblem, varied drawing),
 * one n:1 open call → open.png. Skips any file already on disk, so a re-run continues rather
 * than re-charging; to redo a book, delete its files under public/books/<slug>/ and re-run.
 * After writing, regenerates public/books/manifest.json. Commit the PNGs + manifest.
 *
 * Visual contract: book-style-guide.html (the "resources and disclosures" spec). The only
 * text on a cover is the gold title word + the official name along the bottom border; the
 * only text in an open view is the reg label + one red due-date stamp.
 */
import * as fs from "fs";
import * as path from "path";

// Model strings verified live against platform.openai.com on 2026-07-01 (see
// generate-finance-card.ts). Strings churn — re-verify before spending.
const MODEL_FINAL = "gpt-image-1.5";
const MODEL_DRAFT = "gpt-image-1-mini";
const SIZE = "1024x1024";
// Rough per-image estimates at 1024x1024 (pay-as-you-go): high ≈ $0.17, medium ≈ $0.05.
const EST_USD_HIGH = 0.17;
const EST_USD_MEDIUM = 0.05;

const BOOKS_ROOT = path.join(process.cwd(), "public", "books");
const REQUEST_GAP_MS = 500;

// --- house style (every prompt = STYLE + "\n\n" + subject) ---------------------------------

const COVER_STYLE = `
A single closed antique hardcover book, front cover facing camera, straight-on,
centered, standing upright. Deep {COLOR} cloth cover with a gold-foil double-line
border and ornate flourished gold corner brackets. Spine at left with two thin gold
bands near top and bottom. Polished glossy 3D storybook render, ornate and lightly
whimsical, soft even studio light with a gentle sheen on the gold.

Fully transparent background (PNG alpha) — no floor, no scene, at most a faint soft
contact shadow beneath the book. Nothing else in frame.
`.trim();

const OPEN_STYLE = `
An antique hardcover book lying open flat to its middle, viewed straight-on from
above. Two cream ruled pages, faint paper texture, a thin gold border echoing the
cover. Glued to the lower-right page: an old-fashioned manila library pocket holding
a ruled "date due" card. Polished glossy 3D storybook render, soft warm light,
shadow in the gutter. Fully transparent background (PNG alpha). Nothing else in frame.
`.trim();

// --- catalog --------------------------------------------------------------------------------

type Book = {
  slug: string; title: string; official: string;
  color: string; emblem: string;      // emblem = the visual hint
  reg: string; due: string;            // printed in the open view
  channel: "deliver" | "law" | "notify" | "posted";
};

const BOOKS: Book[] = [
  { slug: "charm",      title: "CHARM",      official: "Consumer Handbook on ARMs",                 color: "crimson",        emblem: "a heart",                              reg: "REG Z",       due: "WITHIN 3 DAYS",         channel: "deliver" },
  { slug: "arm",        title: "ARM",        official: "Early ARM Disclosure",                      color: "teal",           emblem: "a flexing muscular arm",               reg: "REG Z",       due: "AT APPLICATION",        channel: "deliver" },
  { slug: "toolkit",    title: "TOOLKIT",    official: "Special Information Booklet",               color: "mustard yellow", emblem: "a toolbox",                            reg: "RESPA",       due: "WITHIN 3 DAYS",         channel: "deliver" },
  { slug: "heloc",      title: "HELOC",      official: "HELOC Brochure",                            color: "forest green",   emblem: "a house balancing on a tightrope",     reg: "REG Z",       due: "AT APPLICATION",        channel: "deliver" },
  { slug: "estimate",   title: "ESTIMATE",   official: "Loan Estimate",                             color: "slate blue",     emblem: "a crystal ball on a stand",            reg: "TRID",        due: "WITHIN 3 DAYS",         channel: "deliver" },
  { slug: "closing",    title: "CLOSING",    official: "Closing Disclosure",                        color: "plum purple",    emblem: "a closed padlock",                     reg: "TRID",        due: "3 DAYS BEFORE CLOSING", channel: "deliver" },
  { slug: "cancel",     title: "CANCEL",     official: "Notice of Right to Cancel",                 color: "oxblood red",    emblem: "a pair of open scissors",              reg: "REG Z",       due: "3 DAY WINDOW",          channel: "law" },
  { slug: "adverse",    title: "ADVERSE",    official: "Adverse Action Notice",                     color: "charcoal grey",  emblem: "a thumbs-down hand",                   reg: "ECOA",        due: "WITHIN 30 DAYS",        channel: "notify" },
  { slug: "privacy",    title: "PRIVACY",    official: "GLBA Privacy Notice",                       color: "indigo",         emblem: "a keyhole",                            reg: "GLBA",        due: "YEARLY",                channel: "notify" },
  { slug: "cip",        title: "CIP",        official: "Customer Identification Program Notice",    color: "bronze",         emblem: "a fingerprint",                        reg: "PATRIOT ACT", due: "BEFORE OPENING",        channel: "notify" },
  { slug: "counseling", title: "COUNSELING", official: "Homeownership Counseling List",             color: "olive green",    emblem: "a life ring",                          reg: "RESPA",       due: "WITHIN 3 DAYS",         channel: "deliver" },
  { slug: "servicing",  title: "SERVICING",  official: "Servicing Transfer Statement",              color: "steel blue",     emblem: "a relay baton",                        reg: "RESPA",       due: "15 DAYS AHEAD",         channel: "notify" },
  { slug: "escrow",     title: "ESCROW",     official: "Initial & Annual Escrow Statements",        color: "sandy tan",      emblem: "a piggy bank",                         reg: "RESPA",       due: "YEARLY",                channel: "deliver" },
  { slug: "payoff",     title: "PAYOFF",     official: "Payoff Statement",                          color: "amber gold",     emblem: "a checkered finish flag",              reg: "REG Z",       due: "WITHIN 7 DAYS",         channel: "deliver" },
  { slug: "hoepa",      title: "HOEPA",      official: "High-Cost Mortgage Disclosure",             color: "blood red",      emblem: "a warning triangle",                   reg: "HOEPA",       due: "3 DAYS BEFORE CLOSING", channel: "law" },
  { slug: "appraisal",  title: "APPRAISAL",  official: "Appraisal / Valuation Copy & Notice",       color: "moss green",     emblem: "a magnifying glass over a house",      reg: "ECOA",        due: "PROMPTLY",              channel: "law" },
  { slug: "score",      title: "SCORE",      official: "Credit Score Disclosure",                   color: "violet",         emblem: "a speedometer gauge",                  reg: "FACTA",       due: "AT APPLICATION",        channel: "notify" },
  { slug: "esign",      title: "ESIGN",      official: "E-Sign Consent Disclosure",                 color: "electric blue",  emblem: "a fountain pen with a lightning bolt", reg: "E-SIGN ACT",  due: "BEFORE E-DELIVERY",     channel: "law" },
  { slug: "pmi",        title: "PMI",        official: "PMI Disclosures & Cancellation Notices",    color: "aqua",           emblem: "an open umbrella",                     reg: "HPA",         due: "YEARLY",                channel: "notify" },
  { slug: "abad",       title: "ABAD",       official: "Affiliated Business Arrangement Disclosure", color: "burgundy",      emblem: "two interlinked rings",                reg: "RESPA",       due: "AT REFERRAL",           channel: "notify" },
  { slug: "atr",        title: "ATR",        official: "Ability-to-Repay / Qualified Mortgage",     color: "deep green",     emblem: "a calculator",                         reg: "DODD-FRANK",  due: "BEFORE APPROVAL",       channel: "law" },
  { slug: "flood",      title: "FLOOD",      official: "Notice of Special Flood Hazard",            color: "navy",           emblem: "three water waves",                    reg: "FLOOD ACT",   due: "BEFORE CLOSING",        channel: "law" },
];

// --- prompt composition -----------------------------------------------------------------------

function coverPrompt(b: Book): string {
  return `${COVER_STYLE.replace("{COLOR}", b.color)}

The title word "${b.title}" (${b.title.split("").join("-")}) embossed in gold in an
elegant classic serif, uppercase, across the upper third. Centered below it, a large
gold-outlined ${b.emblem} with a ${b.color}-toned fill, ringed by a few small gold
four-point sparkle stars. Along the bottom border, in small gold serif capitals,
exactly: "${b.official}" (spelled ${spellOut(b.official.toUpperCase())}).
The bottom-border text must be crisply lettered, every letter unambiguous and spelled
exactly as given. No other text anywhere in the image.`;
}

// Spell every word letter-by-letter (same trick as cover titles) — the model garbles
// small text otherwise (rendered DAYS as "DAVS", DUE as "OUE", HIGH as "HICH" without it).
// Digits get a word form too ("3" came out as "8", "15" as "IS").
const DIGIT_WORDS: Record<string, string> = { "3": "three", "7": "seven", "15": "fifteen", "30": "thirty", "60": "sixty" };
const spellOut = (s: string) => s.split(" ").map((w) =>
  DIGIT_WORDS[w] ? `the numeral ${w} meaning ${DIGIT_WORDS[w]}` : w.length > 1 ? w.split("").join("-") : w
).join(", ");

function openPrompt(b: Book): string {
  return `${OPEN_STYLE}
The book cover is deep ${b.color}. On the left page, a small gold ${b.emblem} and the
label "${b.reg}" (spelled ${spellOut(b.reg)}) in neat serif capitals. The card's printed
header reads exactly "DATE DUE" (D-A-T-E, D-U-E). The card is stamped once in red ink,
slightly rotated, reading exactly "${b.due}" (spelled ${spellOut(b.due)}).
No other text anywhere in the image.`;
}

// --- plumbing ---------------------------------------------------------------------------------

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
  const covers = args.includes("--covers");
  const open = args.includes("--open");
  const draft = args.includes("--draft");
  const docArg = args.find((a) => a.startsWith("--doc="));
  const doc = docArg ? docArg.slice("--doc=".length) : null;
  return { all, covers, open, draft, doc, dryRun: !all && !covers && !open && !doc };
}

const coverPaths = (slug: string) => [1, 2, 3].map((v) => path.join(BOOKS_ROOT, slug, `cover-v${v}.png`));
const openPath = (slug: string) => path.join(BOOKS_ROOT, slug, "open.png");

async function generate(prompt: string, n: number, apiKey: string, model: string, quality: string): Promise<Buffer[]> {
  const url = "https://api.openai.com/v1/images/generations";
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, size: SIZE, background: "transparent", output_format: "png", quality, n }),
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
  for (const b of BOOKS) {
    const covers = coverPaths(b.slug).filter((p) => fs.existsSync(p)).map((p) => `/books/${b.slug}/${path.basename(p)}`);
    const open = fs.existsSync(openPath(b.slug)) ? `/books/${b.slug}/open.png` : null;
    if (!covers.length && !open) continue;
    manifest[b.slug] = {
      title: b.title, official: b.official, reg: b.reg, due: b.due, channel: b.channel,
      covers, open,
    };
  }
  fs.mkdirSync(BOOKS_ROOT, { recursive: true });
  fs.writeFileSync(path.join(BOOKS_ROOT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`  manifest.json — ${Object.keys(manifest).length} book(s)`);
}

function printCostTable(perImage: number, model: string, quality: string) {
  console.log("\n  book         covers missing   open missing   images   est $");
  console.log("  ------------------------------------------------------------");
  let totalImgs = 0;
  for (const b of BOOKS) {
    const cMissing = coverPaths(b.slug).filter((p) => !fs.existsSync(p)).length;
    const oMissing = fs.existsSync(openPath(b.slug)) ? 0 : 1;
    const imgs = cMissing + oMissing;
    totalImgs += imgs;
    console.log(`  ${b.slug.padEnd(12)} ${String(cMissing).padStart(14)} ${String(oMissing).padStart(14)} ${String(imgs).padStart(8)}   $${(imgs * perImage).toFixed(2)}`);
  }
  console.log("  ------------------------------------------------------------");
  console.log(`  ${"TOTAL".padEnd(12)} ${" ".repeat(30)} ${String(totalImgs).padStart(8)}   $${(totalImgs * perImage).toFixed(2)}`);
  console.log(`\n  ${model} @ ${SIZE} quality=${quality} (~$${perImage.toFixed(2)}/image, rough). Dry run — nothing generated.`);
  console.log(`  Run with --doc=<slug>, --covers, --open, or --all to generate.\n`);
}

// --- main -------------------------------------------------------------------------------------

async function main() {
  const { all, covers, open, draft, doc, dryRun } = parseArgs();
  const model = draft ? MODEL_DRAFT : MODEL_FINAL;
  const quality = draft ? "medium" : "high";
  const perImage = draft ? EST_USD_MEDIUM : EST_USD_HIGH;

  if (dryRun) { printCostTable(perImage, model, quality); return; }

  const apiKey = loadApiKey();
  if (!apiKey) { console.error("No OPENAI_API_KEY in .env.local or env."); process.exit(1); }

  let targets = BOOKS;
  if (doc) {
    targets = BOOKS.filter((b) => b.slug === doc);
    if (!targets.length) { console.error(`No book "${doc}". Slugs: ${BOOKS.map((b) => b.slug).join(", ")}`); process.exit(1); }
  }
  const doCovers = doc ? true : all || covers;
  const doOpen = doc ? true : all || open;

  console.log(`\n  ${model} @ ${SIZE} quality=${quality}\n`);
  let written = 0, spent = 0;
  for (const b of targets) {
    fs.mkdirSync(path.join(BOOKS_ROOT, b.slug), { recursive: true });

    if (doCovers) {
      const missing = coverPaths(b.slug).filter((p) => !fs.existsSync(p));
      if (!missing.length) {
        console.log(`  ${b.slug} covers — all 3 exist, skipping`);
      } else {
        console.log(`  ${b.slug} covers — generating ${missing.length}…`);
        const bufs = await generate(coverPrompt(b), missing.length, apiKey, model, quality);
        missing.forEach((p, i) => { fs.writeFileSync(p, bufs[i]); console.log(`    wrote ${path.basename(p)} (${(bufs[i].length / 1024).toFixed(0)} KB)`); });
        written += missing.length; spent += missing.length * perImage;
        await new Promise((r) => setTimeout(r, REQUEST_GAP_MS));
      }
    }

    if (doOpen) {
      const p = openPath(b.slug);
      if (fs.existsSync(p)) {
        console.log(`  ${b.slug} open — exists, skipping`);
      } else {
        console.log(`  ${b.slug} open — generating…`);
        const [buf] = await generate(openPrompt(b), 1, apiKey, model, quality);
        fs.writeFileSync(p, buf);
        console.log(`    wrote open.png (${(buf.length / 1024).toFixed(0)} KB)`);
        written += 1; spent += perImage;
        await new Promise((r) => setTimeout(r, REQUEST_GAP_MS));
      }
    }
  }

  writeManifest();
  console.log(`\n  Done — ${written} image(s) written, ~$${spent.toFixed(2)}.\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });

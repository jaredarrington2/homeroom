import fs from 'fs';
import path from 'path';
import { anthropic } from './_client';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfParse = require('pdf-parse');

interface Section {
  id: string;
  title: string;
  startPage: number;
  endPage: number;
}

interface Chapter {
  id: string;
  title: string;
  startPage: number;
  endPage: number;
  sections: Section[];
}

const CHAPTERS: Chapter[] = [
  {
    id: 'front-matter',
    title: 'Front Matter',
    startPage: 1,
    endPage: 30,
    sections: [
      { id: 'rules-of-conduct', title: 'Rules of Conduct', startPage: 1, endPage: 15 },
      { id: 'course-logistics', title: 'Course Logistics', startPage: 16, endPage: 30 },
    ],
  },
  {
    id: 'federal-mortgage-laws',
    title: 'Federal Mortgage-Related Laws',
    startPage: 31,
    endPage: 270,
    sections: [
      { id: 'respa', title: 'RESPA – Real Estate Settlement Procedures Act', startPage: 31, endPage: 50 },
      { id: 'ecoa', title: 'ECOA – Equal Credit Opportunity Act', startPage: 51, endPage: 70 },
      { id: 'tila', title: 'TILA – Truth in Lending Act', startPage: 71, endPage: 100 },
      { id: 'hoepa', title: 'HOEPA – Home Ownership and Equity Protection Act', startPage: 101, endPage: 115 },
      { id: 'trid', title: 'TRID – TILA-RESPA Integrated Disclosure', startPage: 116, endPage: 145 },
      { id: 'hmda', title: 'HMDA – Home Mortgage Disclosure Act', startPage: 146, endPage: 165 },
      { id: 'fcra-facta', title: 'FCRA & FACTA', startPage: 166, endPage: 190 },
      { id: 'ftc-red-flags', title: 'FTC Red Flags Rule', startPage: 191, endPage: 205 },
      { id: 'bsa-aml', title: 'BSA/AML – Bank Secrecy Act and Anti-Money Laundering', startPage: 206, endPage: 225 },
      { id: 'glba', title: 'GLBA – Gramm-Leach-Bliley Act', startPage: 226, endPage: 240 },
      { id: 'dnc-tsr', title: 'DNC/TSR – Do Not Call and Telemarketing Sales Rule', startPage: 241, endPage: 252 },
      { id: 'maps', title: 'MAPs – Mortgage Assistance Relief Services', startPage: 253, endPage: 270 },
    ],
  },
  {
    id: 'general-mortgage-knowledge',
    title: 'General Mortgage Knowledge',
    startPage: 271,
    endPage: 390,
    sections: [
      { id: 'loan-products', title: 'Loan Products', startPage: 271, endPage: 310 },
      { id: 'loan-programs', title: 'Loan Programs', startPage: 311, endPage: 350 },
      { id: 'mortgage-terminology', title: 'Mortgage Terminology', startPage: 351, endPage: 390 },
    ],
  },
  {
    id: 'mlo-activities',
    title: 'MLO Activities',
    startPage: 391,
    endPage: 540,
    sections: [
      { id: 'application', title: 'Application', startPage: 391, endPage: 415 },
      { id: 'qualification', title: 'Qualification', startPage: 416, endPage: 440 },
      { id: 'processing-underwriting', title: 'Processing and Underwriting', startPage: 441, endPage: 470 },
      { id: 'appraisals', title: 'Appraisals', startPage: 471, endPage: 490 },
      { id: 'title', title: 'Title', startPage: 491, endPage: 505 },
      { id: 'closing', title: 'Closing', startPage: 506, endPage: 520 },
      { id: 'mortgage-math', title: 'Mortgage Math', startPage: 521, endPage: 540 },
    ],
  },
  {
    id: 'ethics',
    title: 'Ethics',
    startPage: 541,
    endPage: 570,
    sections: [
      { id: 'fraud', title: 'Mortgage Fraud', startPage: 541, endPage: 552 },
      { id: 'fair-lending', title: 'Fair Lending', startPage: 553, endPage: 562 },
      { id: 'prohibited-practices', title: 'Prohibited Practices', startPage: 563, endPage: 570 },
    ],
  },
  {
    id: 'uniform-state-content',
    title: 'Uniform State Content',
    startPage: 571,
    endPage: 600,
    sections: [
      { id: 'safe-act', title: 'SAFE Act', startPage: 571, endPage: 585 },
      { id: 'licensing-standards', title: 'Licensing Standards', startPage: 586, endPage: 600 },
    ],
  },
];

const SYSTEM_PROMPT = `You are extracting study material from a SAFE MLO licensing course ebook section. Return ONLY valid JSON — no preamble, no markdown fences.

Schema:
{
  "summary": "<2 sentence summary>",
  "concepts": [
    {
      "id": "<kebab-slug>",
      "term": "<name>",
      "definition": "<one sentence>",
      "why_it_exists": "<one sentence on the risk or business reason>",
      "examples": [{"scenario": "...", "outcome": "..."}],
      "cross_refs": ["<other-concept-id>"],
      "check_questions": [
        {"question": "...", "answer": "...", "type": "recall|application|distinction"},
        {"question": "...", "answer": "...", "type": "recall|application|distinction"}
      ]
    }
  ],
  "key_numbers": [{"value": "...", "what_it_means": "...", "memorize_as": "..."}],
  "common_confusions": [{"often_confused_with": "...", "the_distinction": "..."}]
}

Rules:
- Max 8 concepts per section. Prioritize the most exam-testable ones.
- One example per concept. Two check_questions per concept.
- Synthesize — paraphrase everything, no verbatim ebook text.
- Plain English, sentence case, active voice. No padding.
- For federal laws: cover purpose, trigger, who it protects, penalty.
- Pull every threshold, day count, dollar amount into key_numbers.`;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callClaude(sectionText: string, sectionTitle: string): Promise<object> {
  const attempt = async () => {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Section: "${sectionTitle}"\n\n${sectionText}`,
        },
      ],
    });
    const block = response.content[0];
    if (block.type !== 'text') throw new Error('Unexpected response type');
    return block.text;
  };

  let raw: string;
  try {
    raw = await attempt();
  } catch (err) {
    console.error('  API error, retrying in 5s...', err instanceof Error ? err.message : err);
    await sleep(5000);
    raw = await attempt();
  }

  const cleaned = raw.replace(/^```(?:json)?\s*/m, '').replace(/\s*```$/m, '').trim();
  return JSON.parse(cleaned);
}

async function main() {
  const pdfPath = path.resolve(__dirname, '../source/emlo.pdf');
  if (!fs.existsSync(pdfPath)) {
    console.error(`PDF not found at ${pdfPath}`);
    process.exit(1);
  }

  console.log('Parsing PDF text...');
  const buffer = fs.readFileSync(pdfPath);

  // Collect per-page text via the pagerender callback
  const pageTexts: string[] = [];
  await pdfParse(buffer, {
    pagerender: (pageData: any) => {
      return pageData.getTextContent().then((content: any) => {
        const text = content.items.map((item: any) => item.str).join(' ');
        pageTexts.push(text);
        return text;
      });
    },
  });

  // Fallback: if pagerender didn't fire, split the full text evenly
  if (pageTexts.length === 0) {
    const parsed = await pdfParse(buffer);
    const total = parsed.numpages || 600;
    const charsPerPage = Math.ceil(parsed.text.length / total);
    for (let i = 0; i < parsed.text.length; i += charsPerPage) {
      pageTexts.push(parsed.text.slice(i, i + charsPerPage));
    }
  }

  console.log(`Extracted text for ${pageTexts.length} pages.`);

  const conceptsDir = path.resolve(__dirname, '../content/generated/concepts');
  fs.mkdirSync(conceptsDir, { recursive: true });

  const total = CHAPTERS.reduce((sum, ch) => sum + ch.sections.length, 0);
  let idx = 0;

  for (const chapter of CHAPTERS) {
    for (const section of chapter.sections) {
      idx++;
      const outDir = path.join(conceptsDir, chapter.id);
      fs.mkdirSync(outDir, { recursive: true });
      const outFile = path.join(outDir, `${section.id}.json`);

      if (fs.existsSync(outFile)) {
        console.log(`[${idx}/${total}] ${chapter.id}/${section.id} — skipping (exists)`);
        continue;
      }

      console.log(`[${idx}/${total}] ${chapter.id}/${section.id} (pp. ${section.startPage}–${section.endPage})...`);

      // Extract text for this section's page range (0-indexed)
      const start = Math.max(0, section.startPage - 1);
      const end = Math.min(pageTexts.length - 1, section.endPage - 1);
      const sectionText = pageTexts.slice(start, end + 1).join('\n\n').trim();

      if (!sectionText) {
        console.warn(`  No text found for pages ${section.startPage}–${section.endPage}, skipping.`);
        continue;
      }

      let result: object;
      try {
        result = await callClaude(sectionText, section.title);
      } catch (err) {
        console.error(`  Failed: ${err instanceof Error ? err.message : err}`);
        await sleep(1000);
        continue;
      }

      const output = {
        chapter_id: chapter.id,
        section_id: section.id,
        section_title: section.title,
        chapter_title: chapter.title,
        page_range: { start: section.startPage, end: section.endPage },
        ...result,
      };

      fs.writeFileSync(outFile, JSON.stringify(output, null, 2));
      console.log(`  Saved.`);
      await sleep(1000);
    }
  }

  // Write chapters.json
  const chaptersFile = path.resolve(__dirname, '../content/generated/chapters.json');
  fs.writeFileSync(
    chaptersFile,
    JSON.stringify(
      {
        parts: [
          {
            id: 'all',
            title: 'SAFE MLO Course',
            chapters: CHAPTERS.map((ch) => ({
              id: ch.id,
              title: ch.title,
              sections: ch.sections.map((s) => ({
                id: s.id,
                title: s.title,
                pageRange: [s.startPage, s.endPage] as [number, number],
              })),
            })),
          },
        ],
      },
      null,
      2
    )
  );
  console.log(`\nDone. chapters.json written.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

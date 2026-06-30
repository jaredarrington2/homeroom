import fs from 'fs';
import path from 'path';
import { anthropic } from './_client';
import { ensureUniqueIds } from './ensure-unique-ids';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const FLASHCARD_PROMPT = `Generate flashcards for MLO exam prep from these concepts. For each concept, create 1-4 flashcards. Each card tests one specific, testable fact.

Return ONLY a JSON array of flashcard objects. No preamble, no markdown fences.

Schema:
[{
  "id": "<concept-id>-<n>",
  "concept_id": "<concept id>",
  "chapter_id": "<chapter id>",
  "section_id": "<section id>",
  "front": "<question or term — clear and specific>",
  "back": "<answer — direct, no fluff>",
  "tags": ["<topic tags>"]
}]

Rules:
- Front: a question, a term to define, or a "what happens when..." scenario
- Back: the answer only. No "Great question!" No restating the question.
- Tags: use topic slugs like "respa", "tila", "trid", "ecoa", "hmda", "fcra", "bsa-aml", "glba", "safe-act", "mortgage-math", "underwriting", "disclosures", "federal-law", "ethics", "fair-lending"
- Numbers and thresholds always get their own card
- Common confusions get their own card ("X vs Y: the difference is...")`;

interface ConceptFile {
  chapter_id: string;
  section_id: string;
  concepts?: Array<{ id: string; [key: string]: unknown }>;
  [key: string]: unknown;
}

function loadAllConcepts(conceptsDir: string): ConceptFile[] {
  const files: ConceptFile[] = [];
  if (!fs.existsSync(conceptsDir)) return files;
  for (const chapterDir of fs.readdirSync(conceptsDir)) {
    const chapterPath = path.join(conceptsDir, chapterDir);
    if (!fs.statSync(chapterPath).isDirectory()) continue;
    for (const file of fs.readdirSync(chapterPath)) {
      if (!file.endsWith('.json')) continue;
      const content = JSON.parse(fs.readFileSync(path.join(chapterPath, file), 'utf-8')) as ConceptFile;
      files.push(content);
    }
  }
  return files;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function generateFlashcardsForBatch(
  concepts: Array<{ chapter_id: string; section_id: string; [key: string]: unknown }>
): Promise<object[]> {
  const attempt = async () => {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: `${FLASHCARD_PROMPT}\n\nConcepts input:\n${JSON.stringify(concepts, null, 2)}`,
        },
      ],
    });
    const block = response.content[0];
    if (block.type !== 'text') throw new Error('Unexpected response type');
    const cleaned = block.text.replace(/^```(?:json)?\s*/m, '').replace(/\s*```$/m, '').trim();
    return JSON.parse(cleaned) as object[];
  };

  try {
    return await attempt();
  } catch (err) {
    console.error('  API error, retrying in 5s...', err instanceof Error ? err.message : err);
    await sleep(5000);
    try {
      return await attempt();
    } catch (retryErr) {
      console.error('  Retry failed, skipping batch.', retryErr instanceof Error ? retryErr.message : retryErr);
      return [];
    }
  }
}

async function main() {
  const conceptsDir = path.resolve(__dirname, '../content/generated/concepts');
  const outFile = path.resolve(__dirname, '../content/generated/flashcards.json');

  const conceptFiles = loadAllConcepts(conceptsDir);
  if (conceptFiles.length === 0) {
    console.error('No concept files found. Run extract-content.ts first.');
    process.exit(1);
  }

  // Flatten concepts and attach chapter/section ids
  const allConcepts: Array<{ chapter_id: string; section_id: string; [key: string]: unknown }> = [];
  for (const file of conceptFiles) {
    const concepts = (file.concepts as Array<{ id: string; [key: string]: unknown }> | undefined) ?? [];
    for (const concept of concepts) {
      allConcepts.push({ ...concept, chapter_id: file.chapter_id, section_id: file.section_id });
    }
  }

  console.log(`Found ${allConcepts.length} concepts across ${conceptFiles.length} sections.`);

  const batches = chunk(allConcepts, 5);
  const allFlashcards: object[] = [];

  for (let i = 0; i < batches.length; i++) {
    console.log(`[${i + 1}/${batches.length}] Generating flashcards for batch of ${batches[i].length} concepts...`);
    const cards = await generateFlashcardsForBatch(batches[i]);
    allFlashcards.push(...cards);
    console.log(`  Got ${cards.length} cards (total so far: ${allFlashcards.length})`);
    if (i < batches.length - 1) await sleep(1000);
  }

  // Namespace any colliding ids (same concept authored under two sections) so ids stay globally unique.
  const { renamed } = ensureUniqueIds(
    allFlashcards as Array<{ id: string; section_id: string }>
  );
  if (renamed > 0) console.log(`Namespaced ${renamed} flashcard id(s) to avoid collisions.`);

  fs.writeFileSync(outFile, JSON.stringify(allFlashcards, null, 2));
  console.log(`\nDone. ${allFlashcards.length} flashcards written to ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

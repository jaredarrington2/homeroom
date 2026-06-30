import fs from 'fs';
import path from 'path';
import { anthropic } from './_client';
import { ensureUniqueIds } from './ensure-unique-ids';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const QUESTIONS_PROMPT = `Generate SAFE MLO exam-style multiple-choice questions from these concepts. Create 3 questions per concept.

Return ONLY a JSON array. No preamble, no markdown fences.

Schema:
[{
  "id": "<concept-id>-q<n>",
  "concept_id": "<concept id>",
  "chapter_id": "<chapter id>",
  "section_id": "<section id>",
  "question": "<the question>",
  "options": ["<A>", "<B>", "<C>", "<D>"],
  "correct": <0|1|2|3>,
  "explanation": "<why the correct answer is right, and briefly why the main distractor is wrong>",
  "difficulty": "recall|application|edge-case",
  "topic_tags": ["<tags>"]
}]

Rules:
- Distractors must be plausible. Use common confusions, off-by-one errors, similar-sounding rules.
- Never use "All of the above" or "None of the above"
- Questions test understanding, not just recall of exact ebook wording
- Application questions describe a scenario and ask what rule applies or what the MLO must do
- Edge-case questions test boundary conditions (thresholds, exceptions, timing rules)
- Each explanation names the correct answer and refutes the most tempting wrong one`;

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

async function generateQuestionsForBatch(
  concepts: Array<{ chapter_id: string; section_id: string; [key: string]: unknown }>
): Promise<object[]> {
  const attempt = async () => {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: `${QUESTIONS_PROMPT}\n\nConcepts:\n${JSON.stringify(concepts, null, 2)}`,
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
  const outFile = path.resolve(__dirname, '../content/generated/questions.json');

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

  console.log(`Found ${allConcepts.length} concepts. Targeting ~1000 questions (4-6 per concept).`);

  const batches = chunk(allConcepts, 3);
  const allQuestions: object[] = [];

  for (let i = 0; i < batches.length; i++) {
    console.log(`[${i + 1}/${batches.length}] Generating questions for batch of ${batches[i].length} concepts...`);
    const questions = await generateQuestionsForBatch(batches[i]);
    allQuestions.push(...questions);
    console.log(`  Got ${questions.length} questions (total so far: ${allQuestions.length})`);
    if (i < batches.length - 1) await sleep(1000);
  }

  // Namespace any colliding ids (same concept authored under two sections) so ids stay globally unique.
  const { renamed } = ensureUniqueIds(
    allQuestions as Array<{ id: string; section_id: string }>
  );
  if (renamed > 0) console.log(`Namespaced ${renamed} question id(s) to avoid collisions.`);

  fs.writeFileSync(outFile, JSON.stringify(allQuestions, null, 2));
  console.log(`\nDone. ${allQuestions.length} questions written to ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

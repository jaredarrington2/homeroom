import Eyebrow from '@/components/Eyebrow';
import { getSectionContent, getChapterTree } from '@/lib/content';
import type { Concept } from '@/lib/types';
import Link from 'next/link';

export default function GlossaryPage() {
  const tree = getChapterTree();
  const allConcepts: Array<Concept & { chapterId: string; sectionId: string }> = [];

  for (const part of tree.parts) {
    for (const chapter of part.chapters) {
      for (const section of chapter.sections) {
        const content = getSectionContent(chapter.id, section.id);
        if (content) {
          for (const concept of content.concepts) {
            allConcepts.push({ ...concept, chapterId: chapter.id, sectionId: section.id });
          }
        }
      }
    }
  }

  allConcepts.sort((a, b) => a.term.localeCompare(b.term));

  const letters = Array.from(new Set(allConcepts.map(c => c.term[0]?.toUpperCase()))).sort();

  return (
    <div className="max-w-reading mx-auto">
      <Eyebrow>Glossary</Eyebrow>
      <h1 className="font-display text-3xl font-semibold tracking-display mt-2 mb-6">All terms</h1>
      {allConcepts.length === 0 && (
        <p className="text-sm text-ink-muted">No terms yet. Generate content to populate the glossary.</p>
      )}
      {letters.map(letter => (
        <div key={letter} className="mb-8">
          <h2 className="font-display text-xl font-medium text-ink pb-2 border-b border-hairline mb-3">{letter}</h2>
          <div className="space-y-4">
            {allConcepts.filter(c => c.term[0]?.toUpperCase() === letter).map(concept => (
              <div key={concept.id}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-sans font-medium text-ink">{concept.term}</h3>
                  <Link href={`/learn/${concept.chapterId}/${concept.sectionId}`} className="text-xs text-royal hover:underline">
                    view section →
                  </Link>
                </div>
                <p className="text-sm text-ink-muted mt-1">{concept.definition}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

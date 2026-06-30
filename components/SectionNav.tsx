import Link from 'next/link';
import Button from '@/components/Button';
import MarkComplete from '@/components/MarkComplete';
import { getChapterTree } from '@/lib/content';

interface SectionNavProps {
  chapterId: string;
  sectionId: string;
}

export default function SectionNav({ chapterId, sectionId }: SectionNavProps) {
  const tree = getChapterTree();
  const allChapters = tree.parts.flatMap(p => p.chapters);
  const chapterIdx = allChapters.findIndex(c => c.id === chapterId);
  const chapter = allChapters[chapterIdx];
  const sectionIdx = chapter.sections.findIndex(s => s.id === sectionId);

  // Previous: prior section in chapter, or last section of prior chapter
  let prevHref: string | null = null;
  if (sectionIdx > 0) {
    prevHref = `/learn/${chapterId}/${chapter.sections[sectionIdx - 1].id}`;
  } else if (chapterIdx > 0) {
    const prevChapter = allChapters[chapterIdx - 1];
    const lastSection = prevChapter.sections[prevChapter.sections.length - 1];
    prevHref = `/learn/${prevChapter.id}/${lastSection.id}`;
  }

  // Next: next section in chapter, or first section of next chapter
  let nextHref: string | null = null;
  if (sectionIdx < chapter.sections.length - 1) {
    nextHref = `/learn/${chapterId}/${chapter.sections[sectionIdx + 1].id}`;
  } else if (chapterIdx < allChapters.length - 1) {
    const nextChapter = allChapters[chapterIdx + 1];
    nextHref = `/learn/${nextChapter.id}/${nextChapter.sections[0].id}`;
  }

  return (
    <div className="mt-10 pt-6 border-t border-hairline flex justify-between items-center">
      {prevHref ? (
        <Link href={prevHref}><Button variant="ghost">← Previous</Button></Link>
      ) : <div />}
      <MarkComplete sectionId={sectionId} />
      {nextHref ? (
        <Link href={nextHref}><Button>Continue →</Button></Link>
      ) : <div />}
    </div>
  );
}

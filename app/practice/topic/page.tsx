import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';
import { getQuestions } from '@/lib/content';

export default function TopicPickerPage() {
  const questions = getQuestions();
  const tags = Array.from(new Set(questions.flatMap(q => q.topic_tags))).sort();

  return (
    <div className="max-w-reading mx-auto">
      <Eyebrow>Practice · Topic drill</Eyebrow>
      <h1 className="font-display text-2xl font-semibold tracking-display mt-2 mb-6">Topic drill</h1>
      {tags.length === 0 && <p className="text-sm text-ink-muted">No questions yet.</p>}
      <div className="space-y-2">
        {tags.map(tag => {
          const count = questions.filter(q => q.topic_tags.includes(tag)).length;
          return (
            <Link
              key={tag}
              href={`/practice/topic/${encodeURIComponent(tag)}`}
              className="flex items-center justify-between p-3 border border-hairline hover:border-royal hover:bg-royal-faint transition-colors"
            >
              <span className="text-sm text-ink capitalize">{tag}</span>
              <span className="text-xs text-ink-faint">{count} questions</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

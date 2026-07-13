import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';

export default function PracticePage() {
  return (
    <div className="max-w-reading mx-auto">
      <Eyebrow>Practice</Eyebrow>
      <h1 className="font-display text-3xl font-semibold tracking-display mt-2 mb-8">Practice modes</h1>
      <div className="space-y-4">
        <Link href="/practice/mock" className="block border border-hairline p-5 hover:border-royal hover:bg-royal-faint transition-colors">
          <div className="text-xs font-semibold uppercase tracking-eyebrow text-ink-faint mb-1">Mock exam</div>
          <div className="font-display text-lg text-ink">Full 125-question exam</div>
          <div className="text-sm text-ink-muted mt-1">190 minutes · 75% to pass · blueprint-weighted</div>
        </Link>
        <Link href="/practice/topic" className="block border border-hairline p-5 hover:border-royal hover:bg-royal-faint transition-colors">
          <div className="text-xs font-semibold uppercase tracking-eyebrow text-ink-faint mb-1">Topic drill</div>
          <div className="font-display text-lg text-ink">10–20 questions on one topic</div>
          <div className="text-sm text-ink-muted mt-1">Untimed · pick your focus area</div>
        </Link>
        <Link href="/practice/missed" className="block border border-hairline p-5 hover:border-royal hover:bg-royal-faint transition-colors">
          <div className="text-xs font-semibold uppercase tracking-eyebrow text-ink-faint mb-1">Missed questions</div>
          <div className="font-display text-lg text-ink">Questions you&apos;ve gotten wrong</div>
          <div className="text-sm text-ink-muted mt-1">Requires prior practice attempts</div>
        </Link>
      </div>
    </div>
  );
}

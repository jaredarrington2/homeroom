'use client';
// components/LearnDashboard.tsx — Learn home. Three blocks, no chrome, nothing announces itself:
//   1. Continue — one card, where you left off (or the start of the course).
//   2. Where you stand — three counters derived from the progress blob.
//   3. Modules — one row per module: number, title, a dot per section, a %, a link.
// Server passes the static module tree; progress is read from the shared context.
import Link from 'next/link';
import { useProgressContext } from '@/lib/ProgressContext';
import { courseStats, moduleReadCount } from '@/lib/progressStats';

export interface DashSection { id: string; title: string }
export interface DashModule { id: string; moduleNumber: number; title: string; sections: DashSection[] }

const pad = (n: number) => String(n).padStart(2, '0');

export default function LearnDashboard({ modules }: { modules: DashModule[] }) {
  const { progress, loaded, isUnitComplete } = useProgressContext();

  // Resolve the Continue target: last-visited "chapterId/sectionId", else the first section.
  const first = modules[0];
  let target: { mod: DashModule; secIdx: number } | null =
    first && first.sections.length ? { mod: first, secIdx: 0 } : null;
  const lv = progress.lastVisitedSection;
  if (lv) {
    const [chId, secId] = lv.split('/');
    const mod = modules.find((m) => m.id === chId);
    const secIdx = mod?.sections.findIndex((s) => s.id === secId) ?? -1;
    if (mod && secIdx >= 0) target = { mod, secIdx };
  }

  const stats = courseStats(progress);
  const resumed = Boolean(lv);

  return (
    <div className="max-w-reading mx-auto">
      <h1 className="font-display text-3xl font-semibold tracking-display mb-8">Learn</h1>

      {/* 1 — Continue */}
      {target && (
        <Link
          href={`/learn/${target.mod.id}/${target.mod.sections[target.secIdx].id}`}
          className="block border border-hairline p-5 mb-10 hover:border-royal hover:bg-royal-faint transition-colors"
        >
          <div className="font-mono text-[11px] uppercase tracking-eyebrow text-royal mb-1">
            {resumed ? 'Continue' : 'Start the course'}
          </div>
          <div className="font-display text-xl text-ink">{target.mod.sections[target.secIdx].title}</div>
          <div className="text-sm text-ink-muted mt-1">
            Module {target.mod.moduleNumber} · {target.mod.title} · {pad(target.secIdx + 1)} / {pad(target.mod.sections.length)}
          </div>
        </Link>
      )}

      {/* 2 — Where you stand */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <Counter n={stats.sectionsRead} label="sections read" loaded={loaded} />
        <Counter n={stats.sectionsPassed} label="sections passed" loaded={loaded} />
        <Counter n={stats.cardsKnown} label="cards known" loaded={loaded} />
      </div>

      {/* 3 — Modules */}
      <div className="space-y-px">
        {modules.map((m) => {
          const total = m.sections.length;
          const read = moduleReadCount(progress, m.sections.map((s) => s.id));
          const pct = total ? Math.round((read / total) * 100) : 0;
          return (
            <div key={m.id} className="flex items-center gap-4 py-3 border-b border-hairline">
              <Link href={`/learn/${m.id}`} className="font-mono text-xs text-ink-faint w-6 shrink-0 hover:text-royal">
                {m.moduleNumber}
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/learn/${m.id}`} className="font-display text-ink hover:text-royal transition-colors">
                  {m.title}
                </Link>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {m.sections.map((s) => (
                    <Link
                      key={s.id}
                      href={`/learn/${m.id}/${s.id}`}
                      title={s.title}
                      aria-label={`${m.title} — ${s.title}`}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        isUnitComplete(s.id) ? 'bg-royal' : 'bg-hairline hover:bg-ink-faint'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="font-mono text-xs text-ink-faint w-10 text-right shrink-0">{pct}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Counter({ n, label, loaded }: { n: number; label: string; loaded: boolean }) {
  return (
    <div>
      <div className="font-display text-4xl font-semibold text-ink tabular-nums">{loaded ? n : '—'}</div>
      <div className="font-mono text-[11px] uppercase tracking-eyebrow text-ink-faint mt-1">{label}</div>
    </div>
  );
}

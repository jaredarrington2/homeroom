import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';
import Quiz from '@/components/Quiz';
import Character from '@/components/Character';
import ScrollspyTOC from '@/components/ScrollspyTOC';
import ExplainableBody from '@/components/ExplainableBody';
import SectionNav from '@/components/SectionNav';
import { getChapterTree, getSectionContent, getQuestions } from '@/lib/content';
import { notFound } from 'next/navigation';

// Hand-chosen hero images for sections where a specific character fits the topic.
// Sections not listed fall back to the deterministic picker.
const HERO_OVERRIDES: Record<string, string> = {
  application: 'ballerina-holding-stack-of-folders-transparent.png',
};

export default function SectionPage({ params }: { params: { chapter: string; section: string } }) {
  const tree = getChapterTree();
  const chapter = tree.parts.flatMap(p => p.chapters).find(c => c.id === params.chapter);
  if (!chapter) notFound();
  const section = chapter.sections.find(s => s.id === params.section);
  if (!section) notFound();

  const content = getSectionContent(params.chapter, params.section);
  const allQuestions = getQuestions();
  const sectionQuestions = allQuestions.filter(q => q.section_id === params.section).slice(0, 2);

  const sectionIdx = chapter.sections.findIndex(s => s.id === params.section);
  const tocItems = content?.concepts.map(c => ({ id: c.id, term: c.term })) ?? [];

  return (
    <div className="max-w-canvas mx-auto px-4">
      <Eyebrow>
        <Link href="/learn" className="hover:text-ink">Learn</Link>
        {' · '}
        <Link href={`/learn/${params.chapter}`} className="hover:text-ink">{chapter.title}</Link>
        {' · '}{section.title}
      </Eyebrow>
      <h1 className="font-display text-4xl font-semibold tracking-display mt-2 mb-4">
        {section.title}
      </h1>

      {content ? (
        <>
        <section className="mt-6 mb-12 border border-hairline bg-loose-paper px-8 py-10 sm:px-12">
          <div className="flex flex-col-reverse items-center gap-8 sm:flex-row sm:items-end sm:gap-12">
            <p className="flex-1 font-display text-xl font-light leading-relaxed text-ink-muted sm:self-start sm:text-2xl">
              {content.summary}
            </p>
            <Character
              file={HERO_OVERRIDES[params.section]}
              tags={['mortgage', 'regulation', 'compliance']}
              sectionId={params.section}
              maxHeight={300}
            />
          </div>
        </section>

        <div className="lg:grid lg:grid-cols-[minmax(0,38rem)_220px] lg:gap-16">
          <div>
            <ExplainableBody
              sectionId={params.section}
              sectionTitle={section.title}
              chapterId={params.chapter}
            >
              <div className="mt-8 space-y-8">
                {content.concepts.map(concept => (
                  <div
                    key={concept.id}
                    id={`concept-${concept.id}`}
                    className="border-b border-hairline pb-6 scroll-mt-20"
                  >
                    <h2 className="font-display text-2xl font-semibold text-ink mb-2">
                      {concept.term}
                    </h2>
                    <p className="text-base text-ink leading-relaxed mb-3">{concept.definition}</p>
                    {concept.why_it_exists && (
                      <p className="text-sm text-ink-muted leading-relaxed mb-3">
                        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-faint">
                          Why it exists
                        </span>{' '}
                        {concept.why_it_exists}
                      </p>
                    )}
                    {concept.examples.length > 0 && (
                      <div className="space-y-2 mt-3">
                        {concept.examples.map((ex, i) => (
                          <div key={i} className="border-l-2 border-hairline pl-4 py-1">
                            <p className="font-medium text-sm text-ink">{ex.scenario}</p>
                            <p className="text-sm text-ink-muted mt-1">{ex.outcome}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ExplainableBody>

            {content.key_numbers.length > 0 && (
              <div className="mt-8 border border-hairline p-4">
                <h3 className="font-display text-base font-medium text-ink mb-3">Key numbers</h3>
                <table className="w-full text-sm">
                  <tbody>
                    {content.key_numbers.map((kn, i) => (
                      <tr key={i} className="border-b border-hairline last:border-0">
                        <td className="font-mono text-royal font-medium py-2 pr-4 w-24 align-top">
                          {kn.value}
                        </td>
                        <td className="text-ink py-2 align-top">{kn.what_it_means}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {sectionQuestions.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-base font-medium text-ink">Check your understanding</h3>
                {sectionQuestions.map(q => (
                  <Quiz key={q.id} question={q} mode="inline" />
                ))}
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-20">
              {tocItems.length > 0 && <ScrollspyTOC items={tocItems} />}
            </div>
          </aside>
        </div>
        </>
      ) : (
        <div className="border border-hairline p-6 text-sm text-ink-muted">
          Content for this section has not been generated yet. Run the extraction script to populate lessons.
        </div>
      )}

      <SectionNav chapterId={params.chapter} sectionId={params.section} />
    </div>
  );
}

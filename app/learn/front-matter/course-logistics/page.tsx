import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';
import Quiz from '@/components/Quiz';
import ExplainableBody from '@/components/ExplainableBody';
import SectionNav from '@/components/SectionNav';
import SectionArt from '@/components/SectionArt';
import { getChapterTree, getQuestions } from '@/lib/content';

function Def({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="bg-royal-faint border-l-[3px] border-royal px-5 py-4 my-5 text-sm leading-relaxed">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-royal mb-1.5">
        {term}
      </div>
      <p className="m-0 text-ink">{children}</p>
    </div>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="my-4 list-none m-0 p-0 counter-reset-[step]">
      {items.map((item, i) => (
        <li
          key={i}
          className="grid gap-4 py-3 border-t border-hairline first:border-t-0"
          style={{ gridTemplateColumns: '32px 1fr' }}
        >
          <span className="flex items-center justify-center w-7 h-7 border border-hairline-strong font-mono text-[13px] text-royal font-medium flex-none">
            {i + 1}
          </span>
          <p className="m-0 text-[17px] leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ol>
  );
}

function AgencyCard({
  name,
  acro,
  year,
  tag,
  rows,
  highlight,
}: {
  name: string;
  acro: string;
  year: string;
  tag: string;
  rows: { label: string; value: string }[];
  highlight?: boolean;
}) {
  return (
    <div className={`border p-7 -mt-px relative ${highlight ? 'border-royal bg-royal-faint' : 'border-hairline'}`}>
      <span className="absolute top-5 right-5 font-mono text-[11px] font-semibold uppercase tracking-widest text-royal border border-royal px-2 py-0.5">
        {tag}
      </span>
      <div className="flex items-baseline gap-3 flex-wrap mb-4">
        <span className="font-display text-2xl font-medium">{name}</span>
        <span className="font-mono text-[13px] text-royal tracking-wide">{acro}</span>
        <span className="font-mono text-[13px] text-ink-faint">est. {year}</span>
      </div>
      <dl className="m-0 grid gap-y-1.5 gap-x-4 text-[15px]" style={{ gridTemplateColumns: '130px 1fr' }}>
        {rows.map(({ label, value }) => (
          <>
            <dt key={`dt-${label}`} className="font-semibold text-ink-muted">{label}</dt>
            <dd key={`dd-${label}`} className="m-0 text-ink">{value}</dd>
          </>
        ))}
      </dl>
    </div>
  );
}

export default function CourseLogisticsPage() {
  const tree = getChapterTree();
  const chapter = tree.parts.flatMap(p => p.chapters).find(c => c.id === 'front-matter')!;
  const section = chapter.sections.find(s => s.id === 'course-logistics')!;

  const allQuestions = getQuestions();
  const sectionQuestions = allQuestions
    .filter(q => q.section_id === 'course-logistics')
    .slice(0, 3);

  return (
    <div className="max-w-reading mx-auto px-4 pb-16">
      <Eyebrow>
        <Link href="/learn" className="hover:text-ink">Learn</Link>
        {' · '}
        <Link href="/learn/front-matter" className="hover:text-ink">{chapter.title}</Link>
        {' · '}{section.title}
      </Eyebrow>

      <h1 className="font-display text-4xl font-semibold tracking-display mt-2 mb-3">
        How the mortgage market got built
      </h1>
      <p className="font-display text-xl text-ink-muted font-light leading-relaxed mb-10">
        Before you can originate loans, you need to know why the system that funds them exists — and what broke it badly enough that Congress had to license everyone in it.
      </p>

      <ExplainableBody sectionId="course-logistics" sectionTitle={section.title} chapterId="front-matter">

        {/* 0. WHAT IS A MORTGAGE */}
        <section className="border-b border-hairline pb-10 mb-10">
          <h2 className="font-display text-3xl font-medium mb-4">What is a mortgage?</h2>
          <p>
            A mortgage is a loan used to purchase real property — a house, condo, or land — where the property itself serves as collateral. If you stop making payments, the lender can take the property through a legal process called <strong>foreclosure</strong>. That's the fundamental deal: the lender gives you the money today, you give them the property as security, and you pay them back over time with interest.
          </p>
          <p>
            The document that creates the debt is called a <strong>promissory note</strong> — your written promise to repay. The document that pledges the property as collateral is called a <strong>mortgage</strong> (or deed of trust, depending on the state). Together, they give the lender both a claim on your money and a claim on your property.
          </p>

          <h3 className="font-display text-xl font-medium mt-6 mb-3">The moving parts of a mortgage payment</h3>
          <p>
            Most borrowers make one monthly payment that actually covers four things, abbreviated <strong>PITI</strong>:
          </p>
          <div className="mt-3">
            {[
              ['Principal', 'The portion of your payment that reduces what you owe. Early in a loan, this is a small slice. Over time, it grows.'],
              ['Interest', 'The lender\'s charge for lending you money — calculated as an annual percentage rate (APR) applied to your remaining balance. Early payments are mostly interest.'],
              ['Taxes', 'Your local property taxes, collected monthly by the servicer and held in an escrow account until the tax bill is due.'],
              ['Insurance', 'Homeowner\'s insurance (required by the lender) collected monthly and paid from escrow. PMI or MIP may also be included if your down payment was under 20%.'],
            ].map(([term, desc]) => (
              <div key={term as string} className="grid gap-x-6 py-3 border-t border-hairline first:border-t-0 text-[15px]" style={{ gridTemplateColumns: '110px 1fr' }}>
                <span className="font-semibold text-ink">{term}</span>
                <span className="text-ink">{desc}</span>
              </div>
            ))}
          </div>

          <h3 className="font-display text-xl font-medium mt-6 mb-3">Amortization: how the debt disappears</h3>
          <p>
            A fully amortizing mortgage is structured so that if you make every scheduled payment, the balance reaches exactly zero on the last payment. On a 30-year loan that's 360 payments. Payment one is almost entirely interest. Payment 360 is almost entirely principal. The slow shift from interest-heavy to principal-heavy is called <strong>amortization</strong>.
          </p>
          <p>
            Because your payment is fixed but your balance is shrinking, the interest portion of each payment falls and the principal portion rises — automatically, by math, not by choice.
          </p>

          <h3 className="font-display text-xl font-medium mt-6 mb-3">Down payment, LTV, and equity</h3>
          <p>
            When you buy a home, you pay a portion of the purchase price upfront — your <strong>down payment</strong>. The loan covers the rest. A $400,000 home with a 10% down payment means a $40,000 down payment and a $360,000 mortgage.
          </p>
          <p>
            <strong>Loan-to-value (LTV)</strong> expresses the loan as a percentage of the property's value: $360,000 ÷ $400,000 = 90% LTV. The remaining 10% is the borrower's <strong>equity</strong> — their ownership stake. With every principal payment, LTV falls and equity grows. LTV and equity always add up to 100%.
          </p>
          <p className="text-sm text-ink-muted">
            Lenders care about LTV because it measures their exposure if you default. A borrower who owes 95% of the home's value has almost nothing at stake. A borrower who owes 60% has a lot to lose — and is statistically much less likely to walk away.
          </p>

          <h3 className="font-display text-xl font-medium mt-6 mb-3">Fixed vs. adjustable rate</h3>
          <p>
            A <strong>fixed-rate mortgage</strong> locks your interest rate for the entire loan term — 15 or 30 years being most common. Your principal and interest payment never changes, no matter what interest rates do in the broader market.
          </p>
          <p>
            An <strong>adjustable-rate mortgage (ARM)</strong> has an interest rate that changes periodically based on a market index. A 5/1 ARM is fixed for the first five years, then adjusts annually. ARMs typically start lower than fixed rates — which is how they attract borrowers — but that rate can rise significantly after the initial period ends.
          </p>

          <h3 className="font-display text-xl font-medium mt-6 mb-3">The origination process in brief</h3>
          <p>
            Getting a mortgage involves a sequence of steps you'll learn in detail throughout this course. At a high level: a borrower applies, a loan originator collects their financial information, an underwriter evaluates the risk and decides whether to approve, an appraiser values the property, a title company confirms the seller actually owns it, and then everyone meets (or signs documents electronically) at closing to exchange money and keys.
          </p>
          <p>
            Your role as an MLO is at the front of that process — you're the person who takes the application, collects the documents, and guides the borrower toward the loan that best fits their situation.
          </p>
        </section>

        {/* 1. BEFORE THE SECONDARY MARKET */}
        <section className="border-b border-hairline pb-10 mb-10">
          <h2 className="font-display text-3xl font-medium mb-4">Before the secondary market</h2>
          <p>
            When you close on a house, your lender gives you the full purchase price upfront. You repay it over thirty years — but in the early 1900s, the lender had to wait the entire thirty years to get its money back.
          </p>
          <p>
            Banks funded mortgages out of their own depositor funds. Once that money was lent out, it was locked up until the borrower repaid. With no way to recycle capital, lenders protected themselves with brutal terms: roughly <strong>50% down payments</strong>, and <strong>call clauses of just 1–5 years</strong> — meaning the full loan balance came due long before it was paid off. Borrowers had to refinance constantly and rarely built real equity. Homeownership sat around <strong>10%</strong> nationally.
          </p>
          <p>
            Then the Great Depression hit. Banks failed. Homeowners who needed to refinance their call loans couldn't — no lender had money to lend. Mass foreclosures followed. The system had run out of road.
          </p>

          <Def term="Primary market (portfolio lending)">
            A lender makes a mortgage using its own funds, keeps the loan on its books, earns the interest, and carries the risk. No secondary buyer exists. The bank's capital is tied up until the borrower repays.
          </Def>
        </section>

        {/* 2. HOW THE SECONDARY MARKET WORKS */}
        <section className="border-b border-hairline pb-10 mb-10">
          <h2 className="font-display text-3xl font-medium mb-4">How the secondary market works</h2>
          <p>
            Congress needed a way for lenders to keep lending without waiting decades to get paid back. The answer: create a buyer for closed loans. Lend the money, sell the loan, get your capital back in days — then lend again.
          </p>
          <p>
            That's the secondary market. Here's how a single mortgage moves through it:
          </p>

          <Steps items={[
            'The lender makes your mortgage. You get the money to buy your home.',
            'The lender <strong>sells your loan</strong> to Fannie Mae or Freddie Mac and gets its cash back immediately — not in 30 years.',
            'Fannie or Freddie <strong>bundles</strong> your loan with thousands of others into a <strong>mortgage-backed security (MBS)</strong> — a bond that pays monthly income.',
            'Investors buy that bond. Each month, your principal and interest payments flow through to them as income.',
            'The investors\' money flows back to Fannie or Freddie, which uses it to buy the next batch of loans. The cycle repeats.',
          ]} />

          <Def term="Mortgage-backed security (MBS)">
            A bond built from many individual mortgages. Investors buy it to receive a share of the borrowers' monthly payments. The agency issuing it — Fannie, Freddie, or Ginnie — typically guarantees investors will keep getting paid even if some borrowers default.
          </Def>

          <p className="mt-4">
            If your loan is sold to Fannie or Freddie after closing, you will usually keep making payments to the same company. The <strong>servicer</strong> — the company that collects your payments and handles your escrow — often stays the same even after the loan changes ownership. You may never notice.
          </p>
        </section>

        {/* 3. THE FOUR FEDERAL AGENCIES */}
        <section className="border-b border-hairline pb-10 mb-10">
          <h2 className="font-display text-3xl font-medium mb-4">The four federal agencies</h2>
          <p>
            Congress built the secondary market through four agencies created between 1933 and 1970. Each solved a different piece of the problem. The exam tests all four by name, acronym, date, job, loan type, and who oversees them — know every one.
          </p>

          <div className="mt-6">
            <AgencyCard
              name="Federal Housing Administration"
              acro="FHA"
              year="1934"
              tag="Insurance"
              rows={[
                { label: 'Created by', value: 'National Housing Act of 1934' },
                { label: 'Job', value: "Insures individual mortgages written to its standards. If a borrower defaults, FHA pays the lender's loss — not the borrower's debt." },
                { label: 'Loan type', value: 'Government-backed (FHA loans). Lower down-payment requirements than conventional loans.' },
                { label: 'Answers to', value: 'Department of Housing and Urban Development (HUD)' },
                { label: 'Buys loans?', value: 'No — it insures them. FHA is a risk backstop for lenders, not a loan purchaser.' },
              ]}
            />
            <AgencyCard
              name="Fannie Mae"
              acro="FNMA — Federal National Mortgage Association"
              year="1938"
              tag="Conventional"
              rows={[
                { label: 'Created by', value: 'Roosevelt administration, as part of New Deal housing policy' },
                { label: 'Job', value: 'Buys closed mortgages from lenders, bundles them into MBS, and sells those to investors. This is what created the secondary market.' },
                { label: 'Loan type', value: "Conventional loans — mortgages not insured by a government agency. Must meet Fannie's underwriting standards to qualify." },
                { label: 'Answers to', value: 'Federal Housing Finance Agency (FHFA)' },
                { label: 'Buys loans?', value: 'Yes — this is its primary function.' },
              ]}
            />
            <AgencyCard
              name="Ginnie Mae"
              acro="GNMA — Government National Mortgage Association"
              year="1968"
              tag="Government"
              highlight
              rows={[
                { label: 'Created by', value: 'Housing and Urban Development Act of 1968' },
                { label: 'Job', value: "Guarantees MBS built from government-backed loans. Lenders assemble the bonds themselves — Ginnie doesn't buy loans or issue the bonds. It backs them with the full faith and credit of the U.S. government." },
                { label: 'Loan type', value: 'Government-backed loans only: FHA, VA (veterans), and USDA (rural development)' },
                { label: 'Answers to', value: 'Department of Housing and Urban Development (HUD) — Ginnie is a government corporation inside HUD, not a private company.' },
                { label: 'Buys loans?', value: 'No — it guarantees bonds. This is the key difference from Fannie and Freddie.' },
              ]}
            />
            <AgencyCard
              name="Freddie Mac"
              acro="FHLMC — Federal Home Loan Mortgage Corporation"
              year="1970"
              tag="Conventional"
              rows={[
                { label: 'Created by', value: 'Emergency Home Finance Act of 1970' },
                { label: 'Job', value: 'Buys conventional mortgages from lenders and securitizes them into MBS for investors. Works alongside Fannie Mae in the secondary market.' },
                { label: 'Loan type', value: "Conventional loans meeting Freddie's underwriting standards. Originally focused on savings-and-loan institutions; now serves the broader market." },
                { label: 'Answers to', value: 'Federal Housing Finance Agency (FHFA)' },
                { label: 'Buys loans?', value: 'Yes — same core function as Fannie Mae.' },
              ]}
            />
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            <strong className="text-ink">Ginnie vs. Fannie/Freddie:</strong> Fannie and Freddie buy loans; Ginnie does not. Fannie and Freddie are government-sponsored enterprises (GSEs) — private companies with government charters; Ginnie is a government corporation inside HUD.
          </p>
        </section>

        {/* 4. WHAT WENT WRONG */}
        <section className="border-b border-hairline pb-10 mb-10">
          <h2 className="font-display text-3xl font-medium mb-4">What went wrong</h2>
          <p>
            By the early 2000s, the secondary market had grown into a global machine. Lenders could sell any loan they closed — so they stopped asking whether borrowers could actually repay. Volume was income; risk was someone else's problem.
          </p>
          <p>
            That attitude created a self-reinforcing loop: easy credit let more buyers qualify, more buyers drove demand above supply, demand drove prices up, rising prices created equity, equity let people cash out and spend, spending made the economy look strong, and a strong economy justified even easier credit. The loop fed itself for years.
          </p>

          <h3 className="font-display text-xl font-medium mt-7 mb-3">How prices hit the ceiling</h3>
          <p>
            There's a limit to how expensive a house can get — even a $0-down, teaser-rate mortgage still has a monthly payment. When prices climbed past what buyers could afford even under the most lenient terms, demand stopped. When demand stopped, prices stopped rising. And when prices stopped rising, the entire logic of the market broke.
          </p>
          <p>
            Homeowners had used their homes as ATMs — cash-out refinances had pulled most of the equity out. The moment prices started falling, millions of households found themselves <strong>underwater</strong>: they owed more than their homes were worth.
          </p>

          <h3 className="font-display text-xl font-medium mt-7 mb-3">The ARM trap</h3>
          <p>
            Much of the creative financing from the bubble years used <strong>2/28 and 3/27 adjustable-rate mortgages</strong> — ARMs that offered a low teaser rate for 2 or 3 years, then reset to market rates. Lenders told borrowers not to worry: before the rate reset, they'd just refinance. That promise assumed prices would keep rising. They didn't.
          </p>
          <p>
            When the ARMs reset, payments jumped by hundreds of dollars a month. Homeowners tried to refinance — but no lender would refinance a loan on a house worth less than the balance owed. They tried to sell — but a sale wouldn't cover the debt. They were trapped: too expensive to keep, impossible to exit.
          </p>

          <h3 className="font-display text-xl font-medium mt-7 mb-3">The math</h3>

          {/* Crash math diagram */}
          <div className="my-6 overflow-x-auto">
            <svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '13px' }}>
              {/* Year labels */}
              <text x="70"  y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E3A8A">2002</text>
              <text x="220" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E3A8A">2005</text>
              <text x="370" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E3A8A">2006</text>
              <text x="520" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E3A8A">late 2007</text>
              <text x="670" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#C8534F">2008</text>

              {/* Timeline line */}
              <line x1="70" y1="38" x2="670" y2="38" stroke="#CFCFCF" strokeWidth="1.2"/>
              <circle cx="70"  cy="38" r="4" fill="#1E3A8A"/>
              <circle cx="220" cy="38" r="4" fill="#1E3A8A"/>
              <circle cx="370" cy="38" r="4" fill="#1E3A8A"/>
              <circle cx="520" cy="38" r="4" fill="#1E3A8A"/>
              <circle cx="670" cy="38" r="5" fill="#C8534F"/>

              {/* Cards */}
              {/* 2002 */}
              <rect x="18" y="50" width="104" height="118" fill="white" stroke="#E5E5E5" strokeWidth="1.2"/>
              <text x="70" y="69" textAnchor="middle" fontWeight="600" fontSize="12" fill="#0A0A0A">Buy the house</text>
              <line x1="18" y1="76" x2="122" y2="76" stroke="#E5E5E5" strokeWidth="1"/>
              <text x="26" y="93" fontSize="11" fill="#6B6B6B">Price</text>
              <text x="114" y="93" textAnchor="end" fontSize="11" fontFamily="monospace">$300,000</text>
              <text x="26" y="109" fontSize="11" fill="#6B6B6B">Down pmt</text>
              <text x="114" y="109" textAnchor="end" fontSize="11" fontFamily="monospace">$0</text>
              <text x="26" y="125" fontSize="11" fill="#6B6B6B">Rate</text>
              <text x="114" y="125" textAnchor="end" fontSize="11" fontFamily="monospace">4% ARM</text>
              <text x="26" y="141" fontSize="11" fill="#6B6B6B">Payment</text>
              <text x="114" y="141" textAnchor="end" fontSize="11" fontFamily="monospace">$1,432/mo</text>
              <text x="26" y="157" fontSize="11" fill="#6B6B6B">Equity</text>
              <text x="114" y="157" textAnchor="end" fontSize="11" fontFamily="monospace">$0</text>

              {/* 2005 */}
              <rect x="168" y="50" width="104" height="118" fill="white" stroke="#E5E5E5" strokeWidth="1.2"/>
              <text x="220" y="69" textAnchor="middle" fontWeight="600" fontSize="12" fill="#0A0A0A">Cash-out refi</text>
              <line x1="168" y1="76" x2="272" y2="76" stroke="#E5E5E5" strokeWidth="1"/>
              <text x="176" y="93" fontSize="11" fill="#6B6B6B">Value now</text>
              <text x="264" y="93" textAnchor="end" fontSize="11" fontFamily="monospace">$420,000</text>
              <text x="176" y="109" fontSize="11" fill="#6B6B6B">Refi to</text>
              <text x="264" y="109" textAnchor="end" fontSize="11" fontFamily="monospace">$380,000</text>
              <text x="176" y="125" fontSize="11" fill="#6B6B6B">Rate</text>
              <text x="264" y="125" textAnchor="end" fontSize="11" fontFamily="monospace">5% ARM</text>
              <text x="176" y="141" fontSize="11" fill="#6B6B6B">Payment</text>
              <text x="264" y="141" textAnchor="end" fontSize="11" fontFamily="monospace">$2,039/mo</text>
              <text x="176" y="157" fontSize="11" fill="#6B6B6B">Cash out</text>
              <text x="264" y="157" textAnchor="end" fontSize="11" fontFamily="monospace">$80,000</text>

              {/* 2006 */}
              <rect x="318" y="50" width="104" height="118" fill="white" stroke="#E5E5E5" strokeWidth="1.2"/>
              <text x="370" y="69" textAnchor="middle" fontWeight="600" fontSize="12" fill="#0A0A0A">Prices plateau</text>
              <line x1="318" y1="76" x2="422" y2="76" stroke="#E5E5E5" strokeWidth="1"/>
              <text x="326" y="93" fontSize="11" fill="#6B6B6B">Value</text>
              <text x="414" y="93" textAnchor="end" fontSize="11" fontFamily="monospace">$420,000</text>
              <text x="326" y="109" fontSize="11" fill="#6B6B6B">Owe</text>
              <text x="414" y="109" textAnchor="end" fontSize="11" fontFamily="monospace">$375,000</text>
              <text x="326" y="125" fontSize="11" fill="#6B6B6B">Equity</text>
              <text x="414" y="125" textAnchor="end" fontSize="11" fontFamily="monospace">$45,000</text>
              <text x="326" y="141" fontSize="11" fill="#6B6B6B">Demand</text>
              <text x="414" y="141" textAnchor="end" fontSize="11" fontFamily="monospace">falling</text>
              <text x="326" y="157" fontSize="11" fill="#6B6B6B">Prices</text>
              <text x="414" y="157" textAnchor="end" fontSize="11" fontFamily="monospace">starting ↓</text>

              {/* 2007 */}
              <rect x="468" y="50" width="104" height="118" fill="white" stroke="#E5E5E5" strokeWidth="1.2"/>
              <text x="520" y="69" textAnchor="middle" fontWeight="600" fontSize="12" fill="#0A0A0A">ARM resets</text>
              <line x1="468" y1="76" x2="572" y2="76" stroke="#E5E5E5" strokeWidth="1"/>
              <text x="476" y="93" fontSize="11" fill="#6B6B6B">Value now</text>
              <text x="564" y="93" textAnchor="end" fontSize="11" fontFamily="monospace">$280,000</text>
              <text x="476" y="109" fontSize="11" fill="#6B6B6B">Owe</text>
              <text x="564" y="109" textAnchor="end" fontSize="11" fontFamily="monospace">$370,000</text>
              <text x="476" y="125" fontSize="11" fill="#6B6B6B">Underwater</text>
              <text x="564" y="125" textAnchor="end" fontSize="11" fontFamily="monospace" fill="#C8534F">−$90,000</text>
              <text x="476" y="141" fontSize="11" fill="#6B6B6B">Rate resets</text>
              <text x="564" y="141" textAnchor="end" fontSize="11" fontFamily="monospace">4% → 8%</text>
              <text x="476" y="157" fontSize="11" fill="#6B6B6B">Payment</text>
              <text x="564" y="157" textAnchor="end" fontSize="11" fontFamily="monospace" fill="#C8534F">$2,715/mo</text>

              {/* 2008 */}
              <rect x="618" y="50" width="104" height="118" fill="#FEF9F9" stroke="#C8534F" strokeWidth="1.4"/>
              <text x="670" y="69" textAnchor="middle" fontWeight="600" fontSize="12" fill="#C8534F">No way out</text>
              <line x1="618" y1="76" x2="722" y2="76" stroke="#C8534F" strokeWidth="1" strokeOpacity=".4"/>
              <text x="626" y="93" fontSize="11" fill="#6B6B6B">Can't pay</text>
              <text x="714" y="93" textAnchor="end" fontSize="11" fill="#C8534F">+$676/mo</text>
              <text x="626" y="109" fontSize="11" fill="#6B6B6B">Can't refi</text>
              <text x="714" y="109" textAnchor="end" fontSize="11" fill="#C8534F">underwater</text>
              <text x="626" y="125" fontSize="11" fill="#6B6B6B">Can't sell</text>
              <text x="714" y="125" textAnchor="end" fontSize="11" fill="#C8534F">owe $90k more</text>
              <text x="626" y="141" fontSize="11" fill="#6B6B6B">Can't wait</text>
              <text x="714" y="141" textAnchor="end" fontSize="11" fill="#C8534F">ARM already reset</text>
              <text x="670" y="162" textAnchor="middle" fontSize="13" fontWeight="700" fill="#C8534F">Foreclosure</text>

              {/* Three traps */}
              <text x="380" y="202" textAnchor="middle" fontSize="11" fontWeight="600" letterSpacing=".08em" fill="#A8A8A8">MULTIPLY THIS BY MILLIONS OF HOUSEHOLDS</text>

              <rect x="18" y="214" width="218" height="58" fill="white" stroke="#E5E5E5" strokeWidth="1.2"/>
              <text x="127" y="232" textAnchor="middle" fontWeight="600" fontSize="12" fill="#C8534F">Foreclosures flood the market</text>
              <text x="127" y="249" textAnchor="middle" fontSize="11" fill="#6B6B6B">More supply → prices fall further</text>
              <text x="127" y="265" textAnchor="middle" fontSize="11" fill="#6B6B6B">→ more people go underwater</text>

              <rect x="271" y="214" width="218" height="58" fill="white" stroke="#E5E5E5" strokeWidth="1.2"/>
              <text x="380" y="232" textAnchor="middle" fontWeight="600" fontSize="12" fill="#C8534F">Securities collapse</text>
              <text x="380" y="249" textAnchor="middle" fontSize="11" fill="#6B6B6B">Rated AAA by agencies — actually</text>
              <text x="380" y="265" textAnchor="middle" fontSize="11" fill="#6B6B6B">full of subprime junk</text>

              <rect x="524" y="214" width="218" height="58" fill="white" stroke="#E5E5E5" strokeWidth="1.2"/>
              <text x="633" y="232" textAnchor="middle" fontWeight="600" fontSize="12" fill="#C8534F">Banks fail</text>
              <text x="633" y="249" textAnchor="middle" fontSize="11" fill="#6B6B6B">Lehman Brothers: Sept 15, 2008</text>
              <text x="633" y="265" textAnchor="middle" fontSize="11" fill="#6B6B6B">Credit markets freeze worldwide</text>

              {/* Caption */}
              <text x="380" y="310" textAnchor="middle" fontSize="11.5" fill="#6B6B6B">Credit default swaps — bets placed by fund managers on these securities failing — paid out</text>
              <text x="380" y="328" textAnchor="middle" fontSize="11.5" fill="#6B6B6B">enormous sums to those who saw it coming. Many got extraordinarily rich as millions lost their homes.</text>

              <defs>
                <marker id="arrowR2" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                  <path d="M0,1 L8,5 L0,9" fill="none" stroke="#C8534F" strokeWidth="1.8"/>
                </marker>
              </defs>
              {/* Cascade arrows between bottom boxes */}
              <path d="M236,243 L271,243" fill="none" stroke="#C8534F" strokeWidth="1.4" markerEnd="url(#arrowR2)"/>
              <path d="M489,243 L524,243" fill="none" stroke="#C8534F" strokeWidth="1.4" markerEnd="url(#arrowR2)"/>
            </svg>
          </div>

          <p>
            Wall Street had taken these mortgages, bundled them into securities, and sold them globally — rated AAA by agencies that either didn't look or didn't care. Fund managers who suspected the truth bought <strong>credit default swaps</strong>: essentially insurance policies that paid out if the mortgage bonds failed. When the bonds collapsed, those bets paid out in the billions. Some got very rich. Most everyone else paid for it.
          </p>
          <p>
            The core failure wasn't the secondary market itself — it was that no one in the chain was accountable for whether the original loan was appropriate. Originators had no license to lose. That was about to change.
          </p>
        </section>

        {/* 5. SAFE ACT & NMLS */}
        <section className="border-b border-hairline pb-10 mb-10">
          <h2 className="font-display text-3xl font-medium mb-4">The SAFE Act and NMLS</h2>
          <p>
            Congress passed the Housing and Economic Recovery Act (HERA) in 2008. Title V of that law — the <strong>SAFE Act</strong> (Secure and Fair Enforcement for Mortgage Licensing Act) — created the modern MLO licensing framework.
          </p>

          <Steps items={[
            'Every mortgage loan originator must register in the <strong>Nationwide Mortgage Licensing System & Registry (NMLS)</strong> and hold a unique ID number.',
            'MLOs working for non-depository lenders (non-bank mortgage companies) must get a <strong>state-issued license</strong> in each state where they originate. MLOs at federally regulated banks register but do not need a separate state license.',
            'State-licensed MLOs must complete <strong>20 hours of pre-licensing education (PE)</strong> before getting their first license, and <strong>8 hours of continuing education (CE)</strong> every year to renew by December 31.',
            'Background checks, credit checks, and a written exam are required. The exam has <strong>120 questions</strong>.',
          ]} />

          <Def term="NMLS unique identifier">
            A number assigned to every registered MLO through the Nationwide Mortgage Licensing System. Any borrower or regulator can look up an MLO's license status, employment history, and disciplinary record using this number. MLOs must provide it to borrowers on request.
          </Def>

          <p className="mt-4">
            The SAFE Act also introduced <strong>respondeat superior</strong> — Latin for "let the master answer." If an MLO employee violates the law, the employer can be held liable, even if the violation resulted from inadequate training. Employers have skin in the game now.
          </p>
        </section>

        {/* 6. YOUR JOB */}
        <section className="pb-10 mb-10">
          <h2 className="font-display text-3xl font-medium mb-4">Your job as an MLO</h2>
          <p>
            A mortgage loan originator is the person who takes a borrower's application, helps them find the right loan product, and guides them through to closing. You might be called a loan officer (LO), mortgage consultant, or mortgage originator — the title varies, the job doesn't.
          </p>
          <p>
            The legal obligation that comes with the job: you have a <strong>fiduciary duty</strong> to the borrower. That means every decision you make must be guided by what is best for your client — not what earns you the highest commission. If the loan that maximizes your income isn't the right fit for the borrower's financial situation, you are legally required to recommend the better fit.
          </p>
          <p>
            This obligation is why the SAFE Act existed in the first place. Pre-crisis originators prioritized volume. The SAFE Act made the person taking the application personally accountable for what happens next.
          </p>
        </section>

        {/* KEY NUMBERS */}
        <div className="border border-hairline p-5 mb-10">
          <h3 className="font-display text-base font-medium text-ink mb-3">Key numbers</h3>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['1929', 'Stock market crash — began Great Depression, triggered housing finance reforms'],
                ['1933', 'Banking Act (Glass-Steagall) — created the FDIC to insure deposits'],
                ['1934', 'National Housing Act — created the FHA'],
                ['1938', 'Fannie Mae (FNMA) created — secondary market born'],
                ['1968', 'Ginnie Mae (GNMA) chartered under HUD'],
                ['1970', 'Freddie Mac (FHLMC) established'],
                ['2008', 'HERA enacted; SAFE Act (Title V) created mandatory MLO licensing'],
                ['Sept 15, 2008', 'Lehman Brothers bankruptcy — the day the crisis hit the headlines'],
                ['20 hours', 'Pre-licensing education required under the SAFE Act'],
                ['8 hours', 'Annual CE required to renew an MLO license'],
                ['120 questions', 'Length of the SAFE/USC exam'],
                ['Dec 31', 'Annual MLO license renewal deadline'],
                ['~10%', 'U.S. homeownership rate in the early 1900s'],
                ['50%', 'Typical down payment required by early 20th-century portfolio lenders'],
              ].map(([value, meaning]) => (
                <tr key={value} className="border-b border-hairline last:border-0">
                  <td className="font-mono text-royal font-medium py-2 pr-4 w-28 align-top text-[13px]">
                    {value}
                  </td>
                  <td className="text-ink py-2 align-top">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* QUIZ */}
        {sectionQuestions.length > 0 && (
          <div className="mt-2 space-y-4">
            <h3 className="font-display text-base font-medium text-ink">Check your understanding</h3>
            {sectionQuestions.map(q => (
              <Quiz key={q.id} question={q} mode="inline" />
            ))}
          </div>
        )}
      </ExplainableBody>

      <SectionArt sectionId="course-logistics" />

      <SectionNav chapterId="front-matter" sectionId="course-logistics" />
    </div>
  );
}

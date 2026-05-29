import { ExperienceCard, type EraData } from './ExperienceCard';

const ERAS: EraData[] = [
  {
    id: 'platforms',
    period: '2022 — PRESENT',
    title: 'Platform Governance & Decoupling',
    focus: 'Division-Wide Architecture Standards',
    scopeLevel: '95%',
    narrative: 'Designing organizational systems, enforcing rigid component boundaries, and governing design system maturity across distributed business units. It is no longer just about writing code; it is about architecture governance, mentoring product divisions, and setting standard boundaries that keep multi-decade corporate systems composable and agile.',
    changed: 'The scale shifted from single-app engineering to orchestrating multi-team governance, shared component boundaries, and decoupled micro-frontend packages.',
    remained: 'A deep connection to the developers shipping code and an absolute commitment to the quality and latency of the end-user interaction.',
    learned: 'Governance is not about blocking developers with process; it is about establishing clear system contracts that set them free. True engineering leadership is human translation.',
    companies: ['Schilling ApS', 'Resights ApS'],
    vector: 'Design Systems Governance · Composable Contracts · Enterprise Scale',
    teamScope: 'Led frontend architecture across 4 product teams',
    governanceScope: 'Governed design system & standards used by 20+ engineers',
  },
  {
    id: 'scaling',
    period: '2015 — 2022',
    title: 'High-Traffic Adaptation & Scaling',
    focus: 'High-Throughput Consumer Networks',
    scopeLevel: '75%',
    narrative: 'Migrating to Copenhagen and scaling high-traffic affiliate matrices, real-time logistics visual DOM queues, and campaign portals. Handling millions of requests and handling massive, volatile data volumes without dropping frames. This era was a masterclass in event-driven state models, local caching strategies, and leading distributed engineering units.',
    changed: 'The network constraints of my origins dissolved, replaced by new ones: CPU cycle efficiency, memory leakages, complex multi-threaded log queues, and user attention budgets.',
    remained: 'The core conviction that a well-designed, strictly bounded system behaves predictably and durably under any operational workload.',
    learned: 'Speed is a byproduct of structure. If you couple your UI directly to your state cascades, the user pays the performance tax. Model the boundaries first.',
    companies: ['Novo Nordisk', 'Wunderman Nordic', 'GiG Media', 'Rebel Penguins'],
    vector: 'Virtualized DOM queues · Event-Driven State · Team Synchronization',
    teamScope: 'Coordinated 12+ developers across hybrid sprint squads',
    governanceScope: 'Managed real-time performance SLA across 2M+ users properties',
  },
  {
    id: 'genesis',
    period: '2007 — 2015',
    title: 'Constraint Genesis & Primitives',
    focus: 'Severe Bandwidth & Compute Constraints',
    scopeLevel: '50%',
    narrative: 'Havana, Cuba. Building digital systems under severe resource boundaries where 56kbps dial-up bandwidth was a luxury. When every kilobyte determines whether a system can be delivered or fails, optimization is not a post-launch polish—it is a fundamental survival constraint. Without modern bundlers, we built lightweight custom parsers and state registers from first principles.',
    changed: 'The tooling moved from pure, raw server-side scripts, dial-up sync scripts, and lightweight vanilla Javascript parsers to advanced isomorphic platforms.',
    remained: 'An absolute, unyielding obsession with payload discipline, asset budgets, and rendering speeds. I still count every single byte.',
    learned: 'Severe constraints are not blockers; they are guardrails that teach extreme coding hygiene and structural discipline. Bandwidth limits build clean minds.',
    companies: ['UCI National Library', 'ONEI', 'GEOCUBA R&D', 'Viruta Studio'],
    vector: 'Extreme Byte Optimization · Lightweight Parsers · Dial-up DB Sync',
    teamScope: 'Led local dev team of 4 engineers at Viruta Studio',
    governanceScope: 'Enforced sub-100KB payload budgets under strict bandwidth limits',
  }
];

export const ExperienceTimeline = () => {
  return (
    <section
      id="experience"
      className="relative border-t border-subtle bg-background py-28 md:py-40"
    >
      <div className="container mx-auto max-w-350 px-6">
        <div className="mb-24 flex flex-col justify-between gap-12 md:mb-32 md:flex-row">
          <h2 className="text-4xl font-light tracking-tight md:text-5xl lg:text-7xl leading-[1.05]">
            Professional <br />
            <span className="block font-serif italic text-primary">
              Experience & Origins
            </span>
          </h2>
          <div className="max-w-md md:self-end">
            <p className="text-foreground/60 text-sm leading-relaxed md:text-base font-light font-display">
              18+ years of building, scaling, and architecting resilient digital products from Havana to Copenhagen.
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-linear-to-b from-transparent via-border-subtle to-transparent md:block"
          />
          {ERAS.map((era, index) => (
            <ExperienceCard key={era.id} era={era} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

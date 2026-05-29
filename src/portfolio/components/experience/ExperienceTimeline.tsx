import { ExperienceCard, type EraData } from './ExperienceCard';

const ERAS: EraData[] = [
  {
    id: 'platforms',
    period: '2022 — PRESENT',
    title: 'Platforms & Systems Governance',
    focus: 'Division-Wide Enterprise Architecture',
    scopeLevel: '95%',
    description: 'Spearheading design system governance, enterprise frontend strategy, and micro-frontend structures. Transitioning complex multi-decade legacies into decoupled cloud architectures and mentoring product teams on performance and semantic isolation contracts.',
    achievements: [
      'Pioneered monorepo platform migration, slashing bundle payloads from 6.2MB to 350KB.',
      'Governed design system standard across product divisions, cutting component delivery cycle times by 30%.',
      'Established strict type-safe REST/GraphQL contract boundaries across distributed team workspaces.'
    ],
    companies: ['Schilling ApS', 'Resights ApS'],
    vector: 'Micro-frontends · Design Systems · Monorepo Orchestration',
  },
  {
    id: 'scaling',
    period: '2015 — 2022',
    title: 'Product Scaling & Lifecycle',
    focus: 'High-Traffic Frontend Systems',
    scopeLevel: '75%',
    description: 'Transitioning to Copenhagen. Scaling high-throughput data visualizers, logistics visual DOM queues, and campaign matrices across enterprise and high-traffic affiliate channels. Leading outsourced teams and modernizing legacy codebases.',
    achievements: [
      'Engineered virtualized DOM real-time dashboard queues handling 500+ updates/sec without frame drops.',
      'Led frontend modernization of affiliate matrices, improving page speeds and search rankings by 25%.',
      'Built Novo Nordisk administration templates with zero-leakage interfaces for medical staff.'
    ],
    companies: ['Novo Nordisk', 'Wunderman Nordic', 'GiG Media', 'Rebel Penguins'],
    vector: 'Real-time Dashboards · Event-Driven State · Team Leadership',
  },
  {
    id: 'genesis',
    period: '2007 — 2015',
    title: 'Constraint Genesis & Primitives',
    focus: 'Severe Resource Constraint Engineering',
    scopeLevel: '50%',
    description: 'Havana, Cuba. Developing high-density platforms under extreme network and compute constraints. When bandwidth is a rare commodity measured in kilobytes, resource allocation and asset footprint are the difference between delivery and failure.',
    achievements: [
      'Engineered custom ultra-lightweight client-side parsing libraries to minimize edge asset transfer.',
      'Architected custom geographical database synchronization layers over unreliable dial-up systems.',
      'Founded Viruta Studio, building custom lightweight CMS and tools for regional media platforms.'
    ],
    companies: ['UCI National Library', 'ONEI', 'GEOCUBA R&D', 'Viruta Studio'],
    vector: 'Constraint Optimization · Full-Stack Primitives · Lightweight Parsing',
  }
];

export const ExperienceTimeline = () => {
  return (
    <section
      id="experience"
      className="relative border-t border-subtle bg-background py-24 md:py-40"
    >
      <div className="container mx-auto max-w-350 px-6">
        <div className="mb-24 flex flex-col justify-between gap-12 md:mb-32 md:flex-row">
          <h2 className="text-4xl font-light tracking-tight md:text-5xl lg:text-7xl leading-[1.05]">
            Capability Growth & <br />
            <span className="block font-serif italic text-primary">
              Systems Ascension
            </span>
          </h2>
          <div className="max-w-md md:self-end md:text-right">
            <p className="text-foreground/50 font-mono text-sm uppercase tracking-wide md:text-base leading-relaxed">
              Trace the evolution of architectural ownership: from extreme bandwidth-constrained coding to global platform governance.
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

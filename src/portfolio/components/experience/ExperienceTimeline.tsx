import { ExperienceCard, type EraData } from './ExperienceCard';

const ERAS: EraData[] = [
  {
    id: 'platforms',
    period: '2022 — PRESENT',
    company: 'Schilling ApS & Resights',
    role: 'Senior Frontend Architect',
    bullets: [
      '**Led frontend architecture** across 4 product teams and governed decoupled monorepo frameworks.',
      '**Owned design-system governance**, standardizing UI patterns for 20+ active frontend engineers.',
      '**Reduced initial bundle payloads by 42%**, dropping LCP load time from 7.5s to 1.4s.',
      '**Increased feature-delivery cycles by 30%** through isolated monorepo workspace sub-apps.',
      '**Bridged coordination gaps** between product management, executive stakeholders, and engineering squads.'
    ],
    vector: 'Design Systems Governance · Monorepos · Decoupled Contracts · API Design'
  },
  {
    id: 'scaling',
    period: '2015 — 2022',
    company: 'Novo Nordisk, Wunderman, GiG Media & Rebel Penguins',
    role: 'Senior Frontend Developer & Team Lead',
    bullets: [
      '**Scaled high-traffic consumer portals** serving over 2,000,000 active monthly users in Europe.',
      '**Engineered event-driven virtualized DOM caching** handling 500+ updates/sec with zero frames dropped.',
      '**Slashed redundant server query overhead by 60%** via optimistic client-side caching layers.',
      '**Coordinated 12+ developers**, mentored cross-functional squads, and established coding standards to elevate system quality.',
      '**Maintained 100% Core Web Vitals scores** across major consumer analytics and campaign portals.'
    ],
    vector: 'Virtualized DOM · Event-Driven State · Optimistic Caching · Performance SLAs'
  },
  {
    id: 'genesis',
    period: '2007 — 2015',
    company: 'UCI National Library, ONEI, GEOCUBA & Viruta Studio',
    role: 'Full-Stack Software Engineer & R&D Lead',
    bullets: [
      '**Engineered lightweight, custom JavaScript engines** under Havana\'s severe 56kbps dial-up limits.',
      '**Cultivated lifelong codebase-hygiene habits**, counting every byte to guarantee client delivery under extreme constraints.',
      '**Built custom vanilla JavaScript data and state registers** from first principles without modern frameworks.',
      '**Led a local development team of 4 engineers**, shipped custom GIS applications, and managed data platforms under extreme constraints.',
      '**Achieved extreme asset compression**, enabling instant application loading and smooth execution on legacy networks.'
    ],
    vector: 'Extreme Byte Optimization · Lightweight Parsers · Dial-up DB Sync · Primitives'
  }
];

export const ExperienceTimeline = () => {
  return (
    <section
      id="experience"
      className="relative border-t border-subtle bg-background py-28 md:py-40"
    >
      {/* Blueprint grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[1.2%] bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-size-[36px_36px]" />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-24 flex flex-col justify-between gap-12 md:mb-32 md:flex-row">
          <h2 className="text-4xl font-light tracking-tight md:text-5xl lg:text-7xl leading-[1.05]">
            Professional <br />
            <span className="block font-serif italic text-primary">
              Experience & History
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

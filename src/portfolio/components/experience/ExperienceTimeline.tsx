import { useTranslation } from 'react-i18next'
import { Section, Container } from '../ui/layout/Section'
import { ExperienceCard, type EraData } from './ExperienceCard'

export const ExperienceTimeline = () => {
  const { t } = useTranslation()

  const eras: EraData[] = [
    {
      id: 'platforms',
      period: t('experience.eras.0.period', '2022 — PRESENT'),
      company: 'Schilling ApS & Resights',
      role: t('experience.eras.0.role', 'Staff Frontend Engineer & Technical Leader'),
      stackContext: t(
        'experience.eras.0.stackContext',
        'Vite Monorepos · TypeScript · React · Next.js · Design-System Governance · Micro-Frontends',
      ),
      contributions: [
        t(
          'experience.eras.0.contributions.0',
          '**Led the modular decoupling** of a 6.2MB legacy console platform into sub-app partitions.',
        ),
        t(
          'experience.eras.0.contributions.1',
          '**Owned design-system governance**, establishing shared module boundaries, standardizing contracts, and templates.',
        ),
        t(
          'experience.eras.0.contributions.2',
          '**Mentored cross-functional engineering squads**, standardizing coding practices and setting rigorous CI/CD quality gates.',
        ),
      ],
      outcomes: [
        t(
          'experience.eras.0.outcomes.0',
          '**Slashed initial bundle size by 94%**, resulting in a LCP reduction to a perfect 1.4s.',
        ),
        t(
          'experience.eras.0.outcomes.1',
          '**Accelerated feature delivery by 30%**, onboarding 20+ active engineers with zero regression incidents.',
        ),
      ],
      vector: t(
        'experience.eras.0.vector',
        'Design Systems Governance · Monorepos · Decoupled Contracts · API Design',
      ),
    },
    {
      id: 'scaling',
      period: t('experience.eras.1.period', '2015 — 2022'),
      company: 'Novo Nordisk, Wunderman, GiG Media & Rebel Penguins',
      role: t('experience.eras.1.role', 'Lead Frontend Developer'),
      stackContext: t(
        'experience.eras.1.stackContext',
        'TanStack Query · Virtualized DOM · Event-Driven Architecture · React · Optimistic Cache Synchronization',
      ),
      contributions: [
        t(
          'experience.eras.1.contributions.0',
          '**Engineered high-frequency DOM memoization queues** to handle logistics operational tracking dashboards.',
        ),
        t(
          'experience.eras.1.contributions.1',
          '**Integrated clientside query virtualization** to prevent DOM thrashing over unstable mobile networks.',
        ),
        t(
          'experience.eras.1.contributions.2',
          '**Coordinated 12+ developers** across agile sprints, leading audits and setting performance SLAs.',
        ),
      ],
      outcomes: [
        t(
          'experience.eras.1.outcomes.0',
          '**Slashed query overhead by 60%**, dropping server-socket query costs significantly.',
        ),
        t(
          'experience.eras.1.outcomes.1',
          '**Maintained steady 60FPS UI performance** on commercial viewports serving over 2,000,000 active European users.',
        ),
      ],
      vector: t(
        'experience.eras.1.vector',
        'Virtualized DOM · Event-Driven State · Optimistic Caching · Performance SLAs',
      ),
    },
    {
      id: 'genesis',
      period: t('experience.eras.2.period', '2007 — 2015'),
      company: 'UCI National Library, ONEI, GEOCUBA & Viruta Studio',
      role: t('experience.eras.2.role', 'Full-Stack Software Engineer & R&D Lead'),
      stackContext: t(
        'experience.eras.2.stackContext',
        'Vanilla JavaScript Primitives · Extreme Byte Compression · Lightweight Parsers · Relational DBs',
      ),
      contributions: [
        t(
          'experience.eras.2.contributions.0',
          "**Engineered lightweight, custom JavaScript engines** under Havana's severe 56kbps dial-up limits.",
        ),
        t(
          'experience.eras.2.contributions.1',
          '**Cultivated rigid codebase-hygiene habits**, counting every byte to secure asset delivery on legacy networks.',
        ),
        t(
          'experience.eras.2.contributions.2',
          '**Built custom vanilla JS data and state registers** from first principles without modern dependencies.',
        ),
      ],
      outcomes: [
        t(
          'experience.eras.2.outcomes.0',
          "**Achieved extreme asset compression**, enabling instant application loading on Cuba's legacy networks.",
        ),
        t(
          'experience.eras.2.outcomes.1',
          '**Successfully delivered GIS applications** and core data portals with zero external framework dependencies.',
        ),
      ],
      vector: t(
        'experience.eras.2.vector',
        'Extreme Byte Optimization · Lightweight Parsers · Dial-up DB Sync · Primitives',
      ),
    },
  ]

  return (
    <Section id="experience">
      <Container>
        <div className="mb-24 flex flex-col justify-between gap-12 md:mb-32 md:flex-row text-left">
          <h2 className="text-4xl font-light tracking-tight md:text-5xl lg:text-7xl leading-[1.05] text-foreground">
            {t('experience.title', 'Professional')} <br />
            <span className="block font-serif italic text-primary">
              {t('experience.titleAccent', 'Experience & History')}
            </span>
          </h2>
          <div className="max-w-md md:self-end">
            <p className="text-foreground/78 text-[16px] leading-relaxed md:text-[17px] font-light font-display">
              {t(
                'experience.subtitle',
                '18+ years of building, scaling, and architecting resilient digital products from Havana to Copenhagen.',
              )}
            </p>
          </div>
        </div>

        <div role="table" aria-label="Experience Era Table" className="relative w-full">
          <div
            aria-hidden
            className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-linear-to-b from-transparent via-border-subtle to-transparent md:block"
          />
          <div role="rowgroup">
            {eras.map((era, index) => (
              <ExperienceCard key={era.id} era={era} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

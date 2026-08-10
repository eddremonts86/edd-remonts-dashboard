import { m } from 'framer-motion'
import { ArrowUpRight, Compass, ShieldCheck, Zap, Activity, Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeInView } from '@/portfolio/lib/motion'

interface LessonItem {
  index: string
  title: string
  body: string
}

interface HowIWorkItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
}

export function EngineeringAuthoritySection() {
  const { t } = useTranslation()

  const lessons: LessonItem[] = [
    {
      index: '01',
      title: t('authority.lessons.0.title', 'Architecture is People'),
      body: t(
        'authority.lessons.0.body',
        "Systems succeed when coordination boundaries, team responsibilities, and system interfaces align cleanly. Conway's Law is not a theoretical concept, but an active engineering constraint.",
      ),
    },
    {
      index: '02',
      title: t('authority.lessons.1.title', 'Governance Enables Velocity'),
      body: t(
        'authority.lessons.1.body',
        'Strict modular boundaries, semantic versioning, and interface contracts are not blockers. They serve as essential guardrails, allowing independent teams to ship code safely at maximum velocity.',
      ),
    },
    {
      index: '03',
      title: t('authority.lessons.2.title', 'Performance is a Business Metric'),
      body: t(
        'authority.lessons.2.body',
        'Core Web Vitals, page-load latency, and interaction responsiveness directly determine user-retention and business-conversion rates. Treating performance as post-launch polish is a costly operational tax.',
      ),
    },
    {
      index: '04',
      title: t('authority.lessons.3.title', 'Complexity Compounds'),
      body: t(
        'authority.lessons.3.body',
        'The most expensive line of code is the one written without clear contracts, clean domain interfaces, and long-term isolation. A well-typed spaghetti codebase is still spaghetti.',
      ),
    },
    {
      index: '05',
      title: t('authority.lessons.4.title', 'The Best Systems are Boring'),
      body: t(
        'authority.lessons.4.body',
        'Highly predictable, stable, and decoupled patterns outperform exciting but fragile novelties. Predictable software execution is the ultimate indicator of organizational maturity.',
      ),
    },
  ]

  const howIWork: HowIWorkItem[] = [
    {
      icon: Compass,
      title: t('authority.howIWork.0.title', 'Pragmatic Decision-Making'),
      body: t(
        'authority.howIWork.0.body',
        'Strategy: Prioritize stable, predictable standards. Action: Model strict structural boundaries and data schemas. Outcome: Cut tooling regressions and design-choice fatigue.',
      ),
    },
    {
      icon: ShieldCheck,
      title: t('authority.howIWork.1.title', 'Active Mentorship & Trust'),
      body: t(
        'authority.howIWork.1.body',
        'Strategy: Replace siloed developer practices. Action: Foster peer alignment workshops and establish clean interface contracts. Outcome: Raise capabilities across 20+ active engineers.',
      ),
    },
    {
      icon: Zap,
      title: t('authority.howIWork.2.title', 'Product-Minded Alignment'),
      body: t(
        'authority.howIWork.2.body',
        'Strategy: Coordinate directly with business stakeholders. Action: Translate architectural complexity into high-value business outcomes. Outcome: Secure stakeholder buy-in with zero product-engineering alignment gaps.',
      ),
    },
    {
      icon: Activity,
      title: t('authority.howIWork.3.title', 'Debt-Minimization Strategy'),
      body: t(
        'authority.howIWork.3.body',
        'Strategy: Prevent modular coupling proactively. Action: Enforce isolated sub-apps and maintain exact API schemas. Outcome: Drop query overhead costs by 60% and streamline system upgrades.',
      ),
    },
    {
      icon: Award,
      title: t('authority.howIWork.4.title', 'Empowered Autonomy'),
      body: t(
        'authority.howIWork.4.body',
        'Strategy: Build decentralized developer confidence. Action: Standardize automated quality gates and monorepo boundaries. Outcome: Empower distributed squads to deploy daily with low-friction autonomy.',
      ),
    },
  ]

  return (
    <section id="authority" className="relative overflow-hidden py-28 md:py-40">
      <span aria-hidden="true" className="section-seam" />
      {/* Soft tonal aura — editorial light, no grid */}
      <div aria-hidden="true" className="pf-section-bg pf-section-bg--alt" />

      <div className="container relative z-10 mx-auto max-w-[1500px] px-6 md:px-10">
        {/* Section Header */}
        <m.div {...fadeInView()} className="mb-24 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="mb-4 font-mono text-[13px] uppercase tracking-[0.3em] text-primary font-bold block">
              {t('authority.eyebrow', '/ LEADERSHIP & PHILOSOPHY')}
            </span>
            <h2 className="font-display text-4xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl text-foreground">
              {t('authority.title', 'Engineering')} <br />
              <span className="font-serif italic text-primary">
                {t('authority.titleAccent', 'Leadership')}
              </span>
            </h2>
          </div>
          <div className="flex items-end lg:col-span-5">
            <p className="max-w-md text-[16px] font-light leading-relaxed text-foreground/75 md:text-[17px] font-display">
              {t(
                'authority.subtitle',
                'Technical excellence is not just about writing code; it is about scaling systems, aligning teams, and driving business outcomes through mature technical governance.',
              )}
            </p>
          </div>
        </m.div>

        {/* Dual Column Leadership Grid */}
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-start">
          {/* Column A: Lessons From 18 Years */}
          <div className="lg:col-span-6 space-y-12">
            <div className="border-b border-subtle pb-6">
              <span className="font-mono text-[12px] uppercase tracking-[0.25em] text-primary/70 block mb-2 font-bold">
                {t('authority.lessonsHeaderLabel', '/ MATURITY')}
              </span>
              <h3 className="text-2xl font-light tracking-tight text-foreground font-display">
                {t('authority.lessonsHeader', 'Lessons From 18 Years')}
              </h3>
            </div>

            <ol className="space-y-8 list-none">
              {lessons.map((lesson) => (
                <m.li
                  key={lesson.index}
                  {...fadeInView()}
                  className="flex gap-6 items-start animate-fade-in"
                >
                  <span className="font-serif text-2xl font-light italic text-foreground/20 shrink-0 select-none">
                    /{lesson.index}
                  </span>
                  <div className="space-y-1.5">
                    <h4 className="text-[16px] font-semibold tracking-tight text-foreground font-display">
                      {lesson.title}
                    </h4>
                    <p className="text-[15px] leading-relaxed text-foreground/80 font-light font-display">
                      {lesson.body}
                    </p>
                  </div>
                </m.li>
              ))}
            </ol>
          </div>

          {/* Column B: How I Work */}
          <div className="lg:col-span-6 space-y-12 lg:mt-0">
            <div className="border-b border-subtle pb-6">
              <span className="font-mono text-[12px] uppercase tracking-[0.25em] text-primary/70 block mb-2 font-bold">
                {t('authority.howIWorkHeaderLabel', '/ EXECUTION')}
              </span>
              <h3 className="text-2xl font-light tracking-tight text-foreground font-display">
                {t('authority.howIWorkHeader', 'How I Work')}
              </h3>
            </div>

            <div className="grid gap-6">
              {howIWork.map((item, i) => {
                const Icon = item.icon
                return (
                  <m.div
                    key={item.title}
                    {...fadeInView({ delay: i * 0.06 })}
                    className="pf-card group flex items-start gap-5 p-6"
                  >
                    <div className="p-2 rounded-lg border border-subtle bg-surface text-foreground/78 group-hover:text-primary transition-colors shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-[16px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-[15px] leading-relaxed text-foreground/80 font-light font-display">
                        {item.body}
                      </p>
                    </div>
                  </m.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Strategic CTA */}
        <div className="flex flex-col items-start justify-between gap-6 border-t border-subtle pt-16 mt-24 md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="font-mono text-[12px] uppercase tracking-[0.25em] text-primary block mb-2 font-bold">
              {t('authority.partnershipHeader', '/ PARTNERSHIP')}
            </span>
            <p className="text-lg font-light tracking-tight text-foreground md:text-xl max-w-lg font-display">
              {t(
                'authority.partnershipDesc',
                'Looking for a Staff Engineer who coordinates systems, governs boundaries, and mentors squads? Let’s talk.',
              )}
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-foreground/30 dark:border-white/20 bg-white text-zinc-950 px-6 py-3.5 text-[13px] font-medium uppercase tracking-widest transition-all duration-500 hover:bg-primary hover:text-white md:text-[15px] cursor-pointer font-mono"
          >
            {t('authority.ctaButton', 'Start a conversation')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </section>
  )
}

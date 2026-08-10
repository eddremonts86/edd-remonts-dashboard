import { m } from 'framer-motion'
import { Terminal, Shield, Compass, Sparkles, Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeInView } from '@/portfolio/lib/motion'
import { Section, Container } from '../ui/layout/Section'

interface AdvantageItem {
  id: string
  index: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  bullets: string[]
}

export const AboutSection = () => {
  const { t } = useTranslation()

  const advantages: AdvantageItem[] = [
    {
      id: 'experience',
      index: '01',
      icon: Award,
      title: t('about.advantages.0.title', '18 Years of Engineering Maturity'),
      subtitle: t(
        'about.advantages.0.subtitle',
        'A full-stack foundation evolved into elite frontend architecture.',
      ),
      bullets: [
        t(
          'about.advantages.0.bullets.0',
          'Started in 2007, spanning vanilla JavaScript to massive modern isomorphic architectures.',
        ),
        t(
          'about.advantages.0.bullets.1',
          'I maintain a hands-on developer mindset, guide architectural governance, and champion product-first capabilities.',
        ),
        t(
          'about.advantages.0.bullets.2',
          'I combine absolute visual craft with production-grade architectural patterns.',
        ),
      ],
    },
    {
      id: 'constraints',
      index: '02',
      icon: Terminal,
      title: t('about.advantages.1.title', 'Constraint-Born Efficiency DNA'),
      subtitle: t(
        'about.advantages.1.subtitle',
        'Obsessive performance habits forged under extreme resource limits.',
      ),
      bullets: [
        t(
          'about.advantages.1.bullets.0',
          "I cut my teeth under Cuba's severe dial-up limitations (56kbps), forcing extreme efficiency habits.",
        ),
        t(
          'about.advantages.1.bullets.1',
          'A strict hygiene mindset: counting every byte, pruning payloads, and micro-optimizing render-path execution.',
        ),
        t(
          'about.advantages.1.bullets.2',
          'I treat web performance not as a post-launch polish, but as a critical business-conversion driver.',
        ),
      ],
    },
    {
      id: 'scale',
      index: '03',
      icon: Shield,
      title: t('about.advantages.2.title', 'European Enterprise-SaaS Scale'),
      subtitle: t(
        'about.advantages.2.subtitle',
        'Proven authority scaling complex software platforms in Copenhagen.',
      ),
      bullets: [
        t(
          'about.advantages.2.bullets.0',
          'I led monorepo partitions, managed micro-frontend structures, and scaled systems at an enterprise level.',
        ),
        t(
          'about.advantages.2.bullets.1',
          'I slashed initial load payloads by 94% while raising delivery speeds by 30% across cross-functional engineering units.',
        ),
        t(
          'about.advantages.2.bullets.2',
          'I established strict modular boundaries to keep systems clean, testable, and highly composable.',
        ),
      ],
    },
    {
      id: 'product',
      index: '04',
      icon: Compass,
      title: t('about.advantages.3.title', 'Product-Minded Systems Architect'),
      subtitle: t(
        'about.advantages.3.subtitle',
        'Translating product vision and design system maturity into structured code.',
      ),
      bullets: [
        t(
          'about.advantages.3.bullets.0',
          'I align technical decisions, product metrics, and design-system aesthetics.',
        ),
        t(
          'about.advantages.3.bullets.1',
          'I model type-safe domain layers, coordinate client-side caching strategies, and manage database schema alignments.',
        ),
        t(
          'about.advantages.3.bullets.2',
          'I design user interfaces that are visually premium, highly responsive, and operationally maintainable.',
        ),
      ],
    },
    {
      id: 'leadership',
      index: '05',
      icon: Sparkles,
      title: t('about.advantages.4.title', 'Active Technical Leadership & Governance'),
      subtitle: t(
        'about.advantages.4.subtitle',
        'Orchestrating teams and mentorship cultures that scale.',
      ),
      bullets: [
        t(
          'about.advantages.4.bullets.0',
          'I governed technical standards adopted by 20+ engineers across 4 active product teams.',
        ),
        t(
          'about.advantages.4.bullets.1',
          'I replaced siloed engineering practices with active mentoring, clear system contracts, and collaborative workshops.',
        ),
        t(
          'about.advantages.4.bullets.2',
          'I empowered distributed squads to release independently, ship code daily, and operate with low-friction confidence.',
        ),
      ],
    },
  ]

  return (
    <Section id="about">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-120 w-120 rounded-full bg-primary/1 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-120 w-120 rounded-full bg-primary/1 blur-3xl" />

      <Container>
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <span className="font-mono text-[12px] uppercase tracking-[0.25em] text-primary font-bold block mb-4">
            {t('about.different', '/ WHAT MAKES ME DIFFERENT')}
          </span>
          <h2 className="text-4xl font-light tracking-tight md:text-5xl lg:text-7xl text-foreground leading-tight">
            {t('about.title.whyHire', 'Why you should')} <br />
            <span className="font-serif italic text-primary">
              {t('about.title.name', 'hire me')}
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-foreground/78 md:text-[17px] font-light font-display">
            {t(
              'about.description',
              'Many can write UI code. I specialize in bridging extreme technical constraints, European enterprise scale, product systems intuition, and team-wide governance.',
            )}
          </p>
        </div>

        {/* Dynamic 5-Card Stacked Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((adv, index) => {
            const Icon = adv.icon
            const isLastWide = index === 4
            const cardProps = fadeInView({ delay: index * 0.08 })

            return (
              <m.article
                key={adv.id}
                initial={cardProps.initial}
                whileInView={cardProps.whileInView}
                viewport={cardProps.viewport}
                transition={cardProps.transition}
                className={`pf-card group flex flex-col justify-between p-8 ${
                  isLastWide ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="space-y-6">
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between border-b border-subtle pb-4">
                    <span className="font-serif text-3xl font-light italic text-foreground/20 group-hover:text-primary transition-colors duration-300">
                      /{adv.index}
                    </span>
                    <div className="p-2 rounded-lg border border-subtle bg-surface text-foreground/70 group-hover:text-primary transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Headlines */}
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {adv.title}
                    </h3>
                    <p className="text-[15px] text-foreground/72 leading-relaxed font-light">
                      {adv.subtitle}
                    </p>
                  </div>

                  {/* Bullet Proof Points */}
                  <ul className="space-y-3 pt-2">
                    {adv.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2 text-[15px] leading-relaxed text-foreground/75 font-light font-display"
                      >
                        <span className="text-primary mt-1.5 shrink-0 block h-1 w-1 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </m.article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

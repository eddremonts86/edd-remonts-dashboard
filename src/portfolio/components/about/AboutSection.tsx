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
  proof: string
}

export const AboutSection = () => {
  const { t } = useTranslation()

  const advantages: AdvantageItem[] = [
    {
      id: 'experience',
      index: '01',
      icon: Award,
      title: t('about.advantages.0.title', '18 Years of Engineering Maturity'),
      proof: t(
        'about.advantages.0.proof',
        'Full-stack roots since 2007, evolved into elite frontend architecture — vanilla JavaScript to modern isomorphic systems.',
      ),
    },
    {
      id: 'constraints',
      index: '02',
      icon: Terminal,
      title: t('about.advantages.1.title', 'Constraint-Born Efficiency DNA'),
      proof: t(
        'about.advantages.1.proof',
        "Trained under Cuba's 56kbps dial-up. Performance is not a polish step — it's a conversion driver.",
      ),
    },
    {
      id: 'scale',
      index: '03',
      icon: Shield,
      title: t('about.advantages.2.title', 'European Enterprise-SaaS Scale'),
      proof: t(
        'about.advantages.2.proof',
        'Slashed initial payloads 94% and accelerated delivery 30% across 20+ engineers in Copenhagen enterprise teams.',
      ),
    },
    {
      id: 'product',
      index: '04',
      icon: Compass,
      title: t('about.advantages.3.title', 'Product-Minded Systems Architect'),
      proof: t(
        'about.advantages.3.proof',
        'Translates product metrics and design-system aesthetics into type-safe domain layers and state contracts.',
      ),
    },
    {
      id: 'leadership',
      index: '05',
      icon: Sparkles,
      title: t('about.advantages.4.title', 'Active Technical Leadership & Governance'),
      proof: t(
        'about.advantages.4.proof',
        'Governed technical standards adopted by 20+ engineers across 4 autonomous product squads.',
      ),
    },
  ]

  return (
    <Section id="about">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-120 w-120 rounded-full bg-primary/1 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-120 w-120 rounded-full bg-primary/1 blur-3xl" />

      <Container>
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary font-bold block mb-4">
            {t('about.different', '/ WHAT MAKES ME DIFFERENT')}
          </span>
          <h2 className="text-4xl font-light tracking-tight md:text-5xl lg:text-7xl text-foreground leading-tight">
            {t('about.title.whyHire', 'Why you should')} <br />
            <span className="font-serif italic text-primary">
              {t('about.title.name', 'hire me')}
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/60 md:text-base font-light font-display">
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
                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {adv.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/70 font-light">
                      {adv.proof}
                    </p>
                  </div>
                </div>
              </m.article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

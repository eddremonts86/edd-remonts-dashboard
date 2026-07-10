import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeInView } from '@/portfolio/lib/motion'
import { Section, Container } from '../ui/layout/Section'

export const AboutSection = () => {
  const { t } = useTranslation()

  return (
    <Section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pf-section-bg pf-section-bg--alt" />

      <Container>
        <div className="mx-auto max-w-3xl">
          <m.div {...fadeInView()} className="space-y-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
              {t('about.kicker', '/ ABOUT')}
            </p>

            <h2 className="font-display text-3xl font-light leading-[1.1] tracking-tight md:text-4xl lg:text-5xl text-foreground">
              {t('about.heading.line1', 'A frontend-first engineer with full-stack roots')}
              <br />
              <span className="font-serif italic text-primary">
                {t('about.heading.line2', 'and nearly two decades of shipping.')}
              </span>
            </h2>

            <div className="space-y-5 text-base leading-relaxed text-foreground/75 font-light font-display">
              <p>
                {t(
                  'about.p1',
                  'I started in 2007 building vanilla JavaScript engines for the Cuban state library under 56kbps dial-up — an extreme resource constraint that trained me to count every byte and micro-optimize every render path.',
                )}
              </p>
              <p>
                {t(
                  'about.p2',
                  'I moved to Copenhagen and scaled that hygiene mindset into enterprise SaaS: monorepo partitions, design-system contracts, optimistic state — the techniques that took Schilling\'s 6.2MB legacy bundle to 350KB and lifted the team from 12-month rewrites to independent shipping across 20+ engineers.',
                )}
              </p>
              <p>
                {t(
                  'about.p3',
                  'What I bring is not a single framework. It is the product-minded systems thinking that turns constraint-forged performance into business outcomes, and the governance that scales it across teams without slowing them down.',
                )}
              </p>
            </div>
          </m.div>
        </div>
      </Container>
    </Section>
  )
}

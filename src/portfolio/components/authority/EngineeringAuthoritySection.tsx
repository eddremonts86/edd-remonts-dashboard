import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeInView } from '@/portfolio/lib/motion'

export function EngineeringAuthoritySection() {
  const { t } = useTranslation()

  return (
    <section id="authority" className="relative overflow-hidden py-28 md:py-40">
      <span aria-hidden="true" className="section-seam" />
      {/* Soft tonal aura — editorial light, no grid */}
      <div aria-hidden="true" className="pf-section-bg pf-section-bg--alt" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <m.div {...fadeInView()} className="mb-24 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold block">
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
            <p className="max-w-md text-sm font-light leading-relaxed text-foreground/75 md:text-base font-display">
              {t(
                'authority.subtitle',
                'Technical excellence is not just about writing code; it is about scaling systems, aligning teams, and driving business outcomes through mature technical governance.',
              )}
            </p>
          </div>
        </m.div>

        {/* Strategic CTA */}
        <div className="flex flex-col items-start justify-between gap-6 border-t border-subtle pt-16 mt-24 md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary block mb-2 font-bold">
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
            className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-foreground/30 dark:border-white/20 bg-white text-zinc-950 px-6 py-3.5 text-[11px] font-medium uppercase tracking-widest transition-all duration-500 hover:bg-primary hover:text-white md:text-xs cursor-pointer font-mono"
          >
            {t('authority.ctaButton', 'Start a conversation')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </section>
  )
}

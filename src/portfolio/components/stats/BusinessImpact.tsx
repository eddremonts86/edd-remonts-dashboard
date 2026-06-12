import { m } from 'framer-motion'
import { Activity, ShieldCheck, Zap, Layers } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeInView } from '@/portfolio/lib/motion'

interface ImpactCard {
  id: string
  metric: string
  title: string
  whatChanged: string
  whatItImproved: string
  proofLink?: string
  Icon: React.ComponentType<{ className?: string }>
}

export const BusinessImpact = () => {
  const { t } = useTranslation()

  const impactCards: ImpactCard[] = [
    {
      id: 'payload',
      metric: t('stats.impactCards.payload.metric', '94%'),
      title: t('stats.impactCards.payload.title', 'Payload Reduction'),
      whatChanged: t(
        'stats.impactCards.payload.whatChanged',
        'Slashed initial bundle size by 94% through Vite monorepo partitions and code-splitting.',
      ),
      whatItImproved: t(
        'stats.impactCards.payload.whatItImproved',
        'Enabled distributed teams to release features independently, and improved LCP to 1.4s.',
      ),
      proofLink: 'https://github.com/eddremonts86/edd-remonts-dashboard',
      Icon: Layers,
    },
    {
      id: 'shipping',
      metric: t('stats.impactCards.shipping.metric', '30%'),
      title: t('stats.impactCards.shipping.title', 'Faster Shipping'),
      whatChanged: t(
        'stats.impactCards.shipping.whatChanged',
        'Coordinated design-system contracts, component standards, and modular versioning guidelines.',
      ),
      whatItImproved: t(
        'stats.impactCards.shipping.whatItImproved',
        'Accelerated overall feature-delivery speeds by 30% across 20+ frontend engineers.',
      ),
      proofLink: 'https://github.com/eddremonts86/edd-remonts-dashboard',
      Icon: ShieldCheck,
    },
    {
      id: 'latency',
      metric: t('stats.impactCards.latency.metric', 'Sub-12ms'),
      title: t('stats.impactCards.latency.title', 'Interaction Latency'),
      whatChanged: t(
        'stats.impactCards.latency.whatChanged',
        'Restructured site-builder rendering architecture to isolate mutation cycles to individual cells.',
      ),
      whatItImproved: t(
        'stats.impactCards.latency.whatItImproved',
        'Reduced perceived UI latency for real-time edits and secured 100% Core Web Vitals.',
      ),
      proofLink: 'https://github.com/eddremonts86/edd-remonts-dashboard',
      Icon: Zap,
    },
    {
      id: 'throughput',
      metric: t('stats.impactCards.throughput.metric', '98/100'),
      title: t('stats.impactCards.throughput.title', 'Sustained Performance'),
      whatChanged: t(
        'stats.impactCards.throughput.whatChanged',
        'Optimized real-time logistics socket rendering with virtualized list memoization queues.',
      ),
      whatItImproved: t(
        'stats.impactCards.throughput.whatItImproved',
        'Handled 500+ updates/sec with zero lag, and reduced infrastructure query costs by 60%.',
      ),
      proofLink: 'https://github.com/eddremonts86/edd-remonts-dashboard',
      Icon: Activity,
    },
  ]

  return (
    <section
      id="impact"
      className="relative overflow-hidden border-b border-subtle bg-background py-24 md:py-36"
    >
      {/* Blueprint Grid Motif */}
      <div className="absolute inset-0 pointer-events-none cinematic-grid" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <m.div {...fadeInView()} className="mb-20 max-w-3xl">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary font-bold block mb-4">
            {t('stats.businessImpact.eyebrow', '/ BUSINESS IMPACT')}
          </span>
          <h2 className="font-display text-4xl font-light tracking-tight md:text-5xl lg:text-7xl text-foreground leading-tight">
            {t('stats.businessImpact.title', 'Measurable')} <br />
            <span className="font-serif italic text-primary">
              {t('stats.businessImpact.titleAccent', 'Business Outcomes')}
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/60 md:text-base font-light font-display">
            {t(
              'stats.businessImpact.subtitle',
              'Technical excellence is relevant when it drives business value. Here is the concrete, verifiable operational and product impact delivered across enterprise-scale applications.',
            )}
          </p>
        </m.div>

        {/* 4-Column High-Contrast Outcomes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
          {impactCards.map((card, index) => {
            const Icon = card.Icon
            return (
              <m.article
                key={card.id}
                {...fadeInView({ delay: index * 0.08 })}
                className="group relative rounded-2xl border border-subtle bg-surface/30 p-6 backdrop-blur-md flex flex-col justify-between transition-all duration-500 hover:border-primary/25 hover:shadow-[0_16px_36px_rgba(209,52,38,0.02)] hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-subtle pb-3.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">
                      {t('stats.businessImpact.measuredOutcome', '/ Measured Outcome')}
                    </span>
                    <div className="p-1 rounded-lg border border-subtle bg-surface text-foreground/60 group-hover:text-primary transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Large Metric */}
                  <p className="font-serif text-5xl font-light tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {card.metric}
                  </p>

                  {/* Context Label */}
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                    {card.title}
                  </h3>
                </div>

                {/* Description split: Action & Business Benefit */}
                <div className="mt-6 space-y-3.5 text-xs text-left font-display">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-foreground/60 block">
                      {t('stats.businessImpact.techAction', '/ Technical Action')}
                    </span>
                    <p className="text-foreground/75 font-light leading-relaxed">
                      {card.whatChanged}
                    </p>
                  </div>
                  <div className="space-y-1 border-t border-subtle pt-3">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-primary block font-bold">
                      {t('stats.businessImpact.businessBenefit', '/ Business Benefit')}
                    </span>
                    <p className="text-foreground/90 font-medium leading-relaxed">
                      {card.whatItImproved}
                    </p>
                  </div>

                  {card.proofLink && (
                    <div className="border-t border-subtle pt-3">
                      <a
                        href={card.proofLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-primary hover:text-foreground transition-colors hover:underline"
                      >
                        {t('stats.businessImpact.proof', '[Proof Link →]')}
                      </a>
                    </div>
                  )}
                </div>
              </m.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

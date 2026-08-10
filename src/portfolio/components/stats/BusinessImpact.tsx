import { m } from 'framer-motion'
import { MapPin, MessageSquare, Search, Terminal } from 'lucide-react'
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

  // One card per flagship product, each linking to the thing itself. Previously
  // all four pointed at this repository, including the two whose numbers came
  // from client platforms — a "view proof" link that proved nothing.
  const impactCards: ImpactCard[] = [
    {
      id: 'builderhunt',
      metric: t('stats.impactCards.builderhunt.metric', '13'),
      title: t('stats.impactCards.builderhunt.title', 'Indexed Sources'),
      whatChanged: t(
        'stats.impactCards.builderhunt.whatChanged',
        'Reconciled 13 developer platforms into one identity, then scored activity by recency instead of lifetime totals.',
      ),
      whatItImproved: t(
        'stats.impactCards.builderhunt.whatItImproved',
        'A search returns the people shipping this month, not the ones who were popular three years ago.',
      ),
      proofLink: 'https://builderhunt.dev',
      Icon: Search,
    },
    {
      id: 'geolocal',
      metric: t('stats.impactCards.geolocal.metric', '25,000'),
      title: t('stats.impactCards.geolocal.title', 'Listings Mapped'),
      whatChanged: t(
        'stats.impactCards.geolocal.whatChanged',
        'Put properties, vehicles, services and experiences on one schema and one map, clustered by neighbourhood.',
      ),
      whatItImproved: t(
        'stats.impactCards.geolocal.whatItImproved',
        'A Copenhagen district is legible at a glance, across eight neighbourhoods, before any filter is applied.',
      ),
      proofLink: 'https://geo.eduardoinerarte.dk',
      Icon: MapPin,
    },
    {
      id: 'ai-os',
      metric: t('stats.impactCards.ai-os.metric', '~300'),
      title: t('stats.impactCards.ai-os.title', 'Skills, 6 CLIs'),
      whatChanged: t(
        'stats.impactCards.ai-os.whatChanged',
        'Made one git repository the source of truth and symlinked it into every AI CLI, with MCP servers as declarative YAML.',
      ),
      whatItImproved: t(
        'stats.impactCards.ai-os.whatItImproved',
        'A new machine reaches a full working setup with one command, and a skill has exactly one place it can be wrong.',
      ),
      proofLink: 'https://ai-os.eduardoinerarte.dk',
      Icon: Terminal,
    },
    {
      id: 'ai-schadcn-chat',
      metric: t('stats.impactCards.ai-schadcn-chat.metric', '8'),
      title: t('stats.impactCards.ai-schadcn-chat.title', 'Providers, One API'),
      whatChanged: t(
        'stats.impactCards.ai-schadcn-chat.whatChanged',
        'Put the model provider behind an adapter, so the chat panel only ever knows about a stream of tokens.',
      ),
      whatItImproved: t(
        'stats.impactCards.ai-schadcn-chat.whatItImproved',
        'Adding Anthropic, OpenAI or any OpenAI-compatible gateway is configuration rather than another fork to maintain.',
      ),
      proofLink: 'https://github.com/eddremonts86/ai-schadcn-chat',
      Icon: MessageSquare,
    },
  ]

  return (
    <section id="impact" className="relative overflow-hidden py-24 md:py-36">
      <span aria-hidden="true" className="section-seam" />
      {/* Soft tonal aura — editorial light, no grid */}
      <div aria-hidden="true" className="pf-section-bg pf-section-bg--alt" />

      <div className="container relative z-10 mx-auto max-w-[1500px] px-6 md:px-10">
        {/* Section Header */}
        <m.div {...fadeInView()} className="mb-20 max-w-3xl">
          <span className="font-mono text-[13px] uppercase tracking-[0.3em] text-primary font-bold block mb-4">
            {t('stats.businessImpact.eyebrow', '/ THE PRODUCTS')}
          </span>
          <h2 className="font-display text-4xl font-light tracking-tight md:text-5xl lg:text-7xl text-foreground leading-tight">
            {t('stats.businessImpact.title', 'What they')} <br />
            <span className="font-serif italic text-primary">
              {t('stats.businessImpact.titleAccent', 'actually do')}
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-foreground/78 md:text-[17px] font-light font-display">
            {t(
              'stats.businessImpact.subtitle',
              'The same four projects, in numbers. Each figure links to the running thing, so you can check it rather than take my word for it.',
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
                className="pf-card group flex flex-col justify-between p-6"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-subtle pb-3.5">
                    <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-foreground/78 font-bold">
                      {t('stats.businessImpact.measuredOutcome', '/ Measured Outcome')}
                    </span>
                    <div className="p-1 rounded-lg border border-subtle bg-surface text-foreground/78 group-hover:text-primary transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Large Metric */}
                  <p className="font-serif text-5xl font-light tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {card.metric}
                  </p>

                  {/* Context Label */}
                  <h3 className="font-mono text-[13px] uppercase tracking-wider text-primary font-bold">
                    {card.title}
                  </h3>
                </div>

                {/* Description split: Action & Business Benefit */}
                <div className="mt-6 space-y-3.5 text-[15px] text-left font-display">
                  <div className="space-y-1">
                    <span className="font-mono text-[12px] uppercase tracking-wider text-foreground/78 block">
                      {t('stats.businessImpact.techAction', '/ Technical Action')}
                    </span>
                    <p className="text-foreground/75 font-light leading-relaxed">
                      {card.whatChanged}
                    </p>
                  </div>
                  <div className="space-y-1 border-t border-subtle pt-3">
                    <span className="font-mono text-[12px] uppercase tracking-wider text-primary block font-bold">
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
                        className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-wider text-primary hover:text-foreground transition-colors hover:underline"
                      >
                        {t('stats.businessImpact.proof', '[View it →]')}
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

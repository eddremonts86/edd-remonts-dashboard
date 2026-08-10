import { m } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MorphingIcon } from '@/portfolio/components/ui/icons/MorphingIcon'
import type { MorphIconData } from '@/portfolio/components/ui/icons/MorphingIcon'
import {
  CIRCLE_CHECK,
  CPU,
  DATABASE,
  LAYERS,
  SPARKLES,
} from '@/portfolio/components/ui/icons/morphIconNodes'
import { fadeInView } from '@/portfolio/lib/motion'
import { TechFilmStrip } from './TechFilmStrip'

interface CuratedLayer {
  id: string
  name: string
  annot: string
  icon: MorphIconData
  items: string[]
  rationale: string
}

export const SkillsMarquee = () => {
  const { t } = useTranslation()
  const leftColProps = fadeInView()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const curatedLayers: CuratedLayer[] = useMemo(() => {
    return [
      {
        id: 'governance',
        name: t('skills.layers.governance.name', 'Architecture & Governance'),
        annot: t('skills.layers.governance.annot', '/ WORKSPACE SYSTEMS'),
        icon: LAYERS,
        items: [
          t('skills.layers.governance.items.0', 'Monorepo Boundaries'),
          t('skills.layers.governance.items.1', 'Design-System Contracts'),
          t('skills.layers.governance.items.2', 'Decoupled Modules'),
        ],
        rationale: t(
          'skills.layers.governance.rationale',
          'Enables distributed product teams to release features independently without breaking shared core architectures.',
        ),
      },
      {
        id: 'performance',
        name: t('skills.layers.performance.name', 'Performance Engineering'),
        annot: t('skills.layers.performance.annot', '/ LATENCY & CONVERSION'),
        icon: CPU,
        items: [
          t('skills.layers.performance.items.0', 'Interaction Latency'),
          t('skills.layers.performance.items.1', 'Optimistic State Sync'),
          t('skills.layers.performance.items.2', 'Core Web Vitals'),
        ],
        rationale: t(
          'skills.layers.performance.rationale',
          'Secures perfect Core Web Vitals and sub-12ms interaction responsiveness for enterprise-scale platforms.',
        ),
      },
      {
        id: 'leadership',
        name: t('skills.layers.leadership.name', 'Technical Leadership'),
        annot: t('skills.layers.leadership.annot', '/ ORG SYNCHRONIZATION'),
        icon: SPARKLES,
        items: [
          t('skills.layers.leadership.items.0', 'Developer Experience'),
          t('skills.layers.leadership.items.1', 'Active Mentorship'),
          t('skills.layers.leadership.items.2', 'Automated Quality Gates'),
        ],
        rationale: t(
          'skills.layers.leadership.rationale',
          'Accelerates feature-delivery cycles by 30% across 20+ active engineers via active mentorship.',
        ),
      },
      {
        id: 'product',
        name: t('skills.layers.product.name', 'Product Systems Alignment'),
        annot: t('skills.layers.product.annot', '/ FULL-STACK STRATEGY'),
        icon: DATABASE,
        items: [
          t('skills.layers.product.items.0', 'Domain Modeling'),
          t('skills.layers.product.items.1', 'Stakeholder Coordination'),
          t('skills.layers.product.items.2', 'State & Cache Contracts'),
        ],
        rationale: t(
          'skills.layers.product.rationale',
          'Bridges execution gaps between engineering teams, product managers, and executive stakeholders.',
        ),
      },
    ]
  }, [t])

  return (
    <section
      id="stack"
      /* The strip is a full-bleed band and reads as a divider, so it belongs
         near the section boundary. Left alone it sat 216px below the previous
         section's last line — that section's 160px of bottom padding plus this
         one's own. No top padding, and a negative margin to climb into the gap;
         the capability grid below keeps its breathing room. */
      className="relative z-20 isolate -mt-16 pt-0 pb-28 md:-mt-24 md:pb-40"
      aria-label={t('a11y.skillsMarquee')}
    >
      <span aria-hidden="true" className="section-seam" />
      <div aria-hidden="true" className="pf-section-bg pf-section-bg--alt" />

      {/* Film-strip marquee of the actual stack — full-bleed above the matrix */}
      <div className="relative mb-20 md:mb-28">
        <TechFilmStrip />
      </div>

      <div className="container mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-start">
          {/* Left Column: Section Title & Narrative (5 cols) */}
          <m.div
            initial={leftColProps.initial}
            whileInView={leftColProps.whileInView}
            viewport={leftColProps.viewport}
            transition={leftColProps.transition}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.3em] text-primary font-bold">
                {t('skills.kicker', '/ TECHNICAL EXPERTISE')}
              </p>
              <h2 className="font-display text-4xl font-light tracking-tight md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                {t('skills.title.architectural', 'Architectural')} <br />
                <span className="font-serif italic text-primary">
                  {t('skills.title.capabilities', 'Capabilities')}
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-foreground/80 font-light font-display">
                {t(
                  'skills.description',
                  'Technologies are commodities; architectural alignment and organizational governance are competitive differentiators. Here is how my capabilities are marshaled to deliver verified business speed and performance stability.',
                )}
              </p>
            </div>
          </m.div>

          {/* Right Column: The Curated Stack Layers Matrix (7 cols) */}
          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2 relative">
            {curatedLayers.map((layer, index) => {
              const cardProps = fadeInView({ delay: index * 0.08 })
              return (
                <m.div
                  key={layer.id}
                  initial={cardProps.initial}
                  whileInView={cardProps.whileInView}
                  viewport={cardProps.viewport}
                  transition={cardProps.transition}
                  onPointerEnter={() => setHoveredCard(layer.id)}
                  onPointerLeave={() => setHoveredCard(null)}
                  className="pf-card group p-6"
                >
                  {/* In the flow, not absolutely positioned over the card. As a
                      floating annotation it overlapped the capability heading
                      the moment the type got big enough to read. */}
                  <div className="mb-4 font-mono text-[12px] uppercase tracking-widest text-foreground/45">
                    {layer.annot}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-subtle text-foreground/70 transition-colors group-hover:border-primary/45 group-hover:text-primary bg-surface/50">
                      <MorphingIcon
                        icon={hoveredCard === layer.id ? CIRCLE_CHECK : layer.icon}
                        size={16}
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-primary block font-bold">
                        {t('skills.capabilityLabel', 'Capability')} 0{index + 1}
                      </span>
                      <h3 className="text-[16px] font-semibold tracking-tight text-foreground font-display">
                        {layer.name}
                      </h3>
                    </div>
                  </div>

                  {/* Monospaced Rationale Statement (Engineering Judgement) */}
                  <p className="font-mono text-[12px] text-foreground/78 leading-relaxed mb-6 bg-surface/40 p-3 rounded-lg border border-subtle select-none">
                    <span className="text-primary block font-bold uppercase tracking-wider text-[12px] mb-1">
                      {t('skills.valueProof', '/ VALUE PROOF')}
                    </span>
                    {layer.rationale}
                  </p>

                  {/* Curated Tech Items (Premium Outline Pills) */}
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full border border-subtle bg-surface/40 px-3 py-1.5 font-mono text-[12px] uppercase tracking-wider text-foreground/75 transition-colors group-hover:border-foreground/20 group-hover:bg-background"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </m.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

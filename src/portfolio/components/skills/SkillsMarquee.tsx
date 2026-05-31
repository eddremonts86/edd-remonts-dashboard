import { m } from 'framer-motion'
import { Layers, Database, Cpu, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { fadeInView } from '@/portfolio/lib/motion'

interface CuratedLayer {
  id: string
  name: string
  annot: string
  Icon: typeof Layers
  items: string[]
  rationale: string
}

export const SkillsMarquee = () => {
  const { t } = useTranslation()
  const leftColProps = fadeInView()

  const curatedLayers: CuratedLayer[] = useMemo(() => {
    return [
      {
        id: 'governance',
        name: 'Architecture & Governance',
        annot: '/ WORKSPACE SYSTEMS',
        Icon: Layers,
        items: ['Monorepo Boundaries', 'Design-System Contracts', 'Decoupled Modules'],
        rationale:
          'Enables distributed product teams to release features independently without breaking shared core architectures.',
      },
      {
        id: 'performance',
        name: 'Performance Engineering',
        annot: '/ LATENCY & CONVERSION',
        Icon: Cpu,
        items: ['Interaction Latency', 'Optimistic State Sync', 'Core Web Vitals'],
        rationale:
          'Secures perfect Core Web Vitals and sub-12ms interaction responsiveness for enterprise-scale platforms.',
      },
      {
        id: 'leadership',
        name: 'Technical Leadership',
        annot: '/ ORG SYNCHRONIZATION',
        Icon: Sparkles,
        items: ['Developer Experience', 'Active Mentorship', 'Automated Quality Gates'],
        rationale:
          'Accelerates feature-delivery cycles by 30% across 20+ active engineers via active mentorship.',
      },
      {
        id: 'product',
        name: 'Product Systems Alignment',
        annot: '/ FULL-STACK STRATEGY',
        Icon: Database,
        items: ['Domain Modeling', 'Stakeholder Coordination', 'State & Cache Contracts'],
        rationale:
          'Bridges execution gaps between engineering teams, product managers, and executive stakeholders.',
      },
    ]
  }, [])

  return (
    <section
      id="stack"
      className="relative z-20 isolate border-t border-subtle bg-surface py-28 md:py-40"
      aria-label={t('a11y.skillsMarquee')}
    >
      <div className="absolute inset-0 pointer-events-none opacity-2.5 bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-size-[32px_32px] mask-image-[linear-to-b,transparent,rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,transparent]" />

      <div className="container mx-auto max-w-7xl px-6">
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
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary font-bold">
                / TECHNICAL EXPERTISE
              </p>
              <h2 className="font-display text-4xl font-light tracking-tight md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                {t('skills.title.architectural', 'Architectural')} <br />
                <span className="font-serif italic text-primary">
                  {t('skills.title.capabilities', 'Capabilities')}
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/65 font-light font-display">
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
              const Icon = layer.Icon
              const cardProps = fadeInView({ delay: index * 0.08 })
              return (
                <m.div
                  key={layer.id}
                  initial={cardProps.initial}
                  whileInView={cardProps.whileInView}
                  viewport={cardProps.viewport}
                  transition={cardProps.transition}
                  className="group relative rounded-2xl border border-subtle bg-background p-6 shadow-xs transition-all duration-500 hover:border-primary/20 hover:shadow-[0_16px_36px_rgba(209,52,38,0.02)] hover:-translate-y-0.5"
                >
                  {/* Visual coordinate annotation */}
                  <div className="absolute top-4 right-5 font-mono text-[8px] text-foreground/20 uppercase tracking-widest">
                    {layer.annot}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-subtle text-foreground/70 transition-colors group-hover:border-primary/45 group-hover:text-primary bg-surface/50">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary block font-bold">
                        Capability 0{index + 1}
                      </span>
                      <h3 className="text-sm font-semibold tracking-tight text-foreground font-display">
                        {layer.name}
                      </h3>
                    </div>
                  </div>

                  {/* Monospaced Rationale Statement (Engineering Judgement) */}
                  <p className="font-mono text-[9px] text-foreground/60 leading-relaxed mb-6 bg-surface/40 p-3 rounded-lg border border-subtle select-none">
                    <span className="text-primary block font-bold uppercase tracking-wider text-[8px] mb-1">
                      / VALUE PROOF
                    </span>
                    {layer.rationale}
                  </p>

                  {/* Curated Tech Items (Premium Outline Pills) */}
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full border border-subtle bg-surface/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-foreground/75 transition-colors group-hover:border-foreground/20 group-hover:bg-background"
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

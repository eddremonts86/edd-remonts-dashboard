import { m } from 'framer-motion'
import { AlertTriangle, Gauge, Layers } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeInView } from '@/portfolio/lib/motion'
import { Section, Container } from '../ui/layout/Section'

interface ProblemItem {
  id: string
  Icon: React.ComponentType<{ className?: string }>
  symptom: string
  consequence: string
  capacity: string
  proof: string
  proofLink: string
}

const problems: ProblemItem[] = [
  {
    id: 'monolith',
    Icon: Layers,
    symptom: 'A 6MB legacy bundle is killing your LCP',
    consequence: 'Bounce rates climb, mobile users drop, the rewrite gets blocked by regression risk',
    capacity: 'Vite monorepo partitions with strict semver contracts',
    proof: '94% payload reduction. 1.4s LCP. 20+ engineers shipping independently with zero regressions.',
    proofLink: '#projects',
  },
  {
    id: 'realtime',
    Icon: Gauge,
    symptom: 'High-frequency socket updates thrash the DOM',
    consequence: 'Layout shifts, mobile freezes, infrastructure costs balloon',
    capacity: 'Virtualized DOM memoization + optimistic cache',
    proof: '60% traffic cut. 98 Lighthouse. 60FPS sustained at 500+ updates/sec on commercial mobile.',
    proofLink: '#projects',
  },
  {
    id: 'cascades',
    Icon: AlertTriangle,
    symptom: 'A single global state re-render cascades through your UI',
    consequence: 'INP spikes, interaction latency breaks the editor experience',
    capacity: 'Localized reactive leaf nodes + composite-UI registers',
    proof: 'Sub-12ms INP. 100% Core Web Vitals. Mutations isolated to leaves, no global dispatch.',
    proofLink: '#projects',
  },
]

export const ProblemsSection = () => {
  const { t } = useTranslation()

  return (
    <Section id="problems" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pf-section-bg pf-section-bg--alt" />

      <Container>
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
            {t('problems.kicker', '/ IF YOU HAVE THIS PROBLEM')}
          </p>
          <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl text-foreground">
            {t('problems.title.line1', 'I work on the problems that')}
            <br />
            <span className="font-serif italic text-primary">
              {t('problems.title.line2', 'block real product teams.')}
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.Icon
            return (
              <m.article
                key={p.id}
                {...fadeInView({ delay: i * 0.08 })}
                className="pf-card group flex flex-col gap-5 p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-subtle bg-surface text-foreground/70 group-hover:border-primary/45 group-hover:text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary font-bold">
                    / problem 0{i + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-display text-foreground leading-snug">
                    {p.symptom}
                  </p>
                  <p className="text-xs leading-relaxed text-foreground/55 font-light">
                    {p.consequence}
                  </p>
                </div>

                <div className="border-t border-subtle pt-4 space-y-2">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/40 block font-bold">
                    / what I bring
                  </span>
                  <p className="text-sm font-display text-foreground font-medium">
                    {p.capacity}
                  </p>
                </div>

                <div className="border-t border-subtle pt-4 space-y-2">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary block font-bold">
                    / proven
                  </span>
                  <p className="text-xs leading-relaxed text-foreground/70 font-light font-display">
                    {p.proof}
                  </p>
                  <a
                    href={p.proofLink}
                    className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.15em] text-foreground/50 hover:text-primary transition-colors mt-1"
                  >
                    {t('problems.seeCase', 'See case →')}
                  </a>
                </div>
              </m.article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

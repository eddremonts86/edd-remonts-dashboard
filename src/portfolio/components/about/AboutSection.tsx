import { m } from 'framer-motion'
import { fadeInView } from '@/portfolio/lib/motion'
import { Terminal, Shield, Compass, Sparkles, Award } from 'lucide-react'

interface AdvantageItem {
  id: string
  index: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  bullets: string[]
}

const ADVANTAGES: AdvantageItem[] = [
  {
    id: 'experience',
    index: '01',
    icon: Award,
    title: '18 Years of Engineering Maturity',
    subtitle: 'A full-stack foundation evolved into elite frontend architecture.',
    bullets: [
      'Started in 2007, spanning vanilla JavaScript to massive modern isomorphic architectures.',
      'Maintains a hands-on developer mindset, guides architectural governance, and champions product-first capabilities.',
      'Combines absolute visual craft with production-grade architectural patterns.',
    ],
  },
  {
    id: 'constraints',
    index: '02',
    icon: Terminal,
    title: 'Constraint-Born Efficiency DNA',
    subtitle: 'Obsessive performance habits forged under extreme resource limits.',
    bullets: [
      "Cut my teeth under Cuba's severe dial-up limitations (56kbps), forcing extreme efficiency habits.",
      'Hygiene mindset: counting every byte, pruning payloads, and micro-optimizing render-path execution.',
      'Treats web performance not as a post-launch polish, but as a critical business-conversion driver.',
    ],
  },
  {
    id: 'scale',
    index: '03',
    icon: Shield,
    title: 'European Enterprise-SaaS Scale',
    subtitle: 'Proven authority scaling complex software platforms in Copenhagen.',
    bullets: [
      'Led monorepo partitions, managed micro-frontend structures, and scaled systems on an enterprise level.',
      'Slashed initial load payloads by 42% while raising delivery speeds by 30% across cross-functional engineering units.',
      'Established strict modular boundaries to keep systems clean, testable, and highly composable.',
    ],
  },
  {
    id: 'product',
    index: '04',
    icon: Compass,
    title: 'Product-Minded Systems Architect',
    subtitle: 'Translating product vision and design system maturity into structured code.',
    bullets: [
      'Aligns technical decisions, product metrics, and design-system aesthetics.',
      'Models type-safe domain layers, coordinates client-side caching strategies, and manages database schema alignments.',
      'Designs user interfaces that are visually premium, highly responsive, and operationally maintainable.',
    ],
  },
  {
    id: 'leadership',
    index: '05',
    icon: Sparkles,
    title: 'Active Technical Leadership & Governance',
    subtitle: 'Orchestrating teams and mentorship cultures that scale.',
    bullets: [
      'Governed technical standards adopted by 20+ engineers across 4 autonomous product teams.',
      'Replaced siloed engineering practices with active mentoring, clear system contracts, and collaborative workshops.',
      'Empowered distributed squads to release independently, ship code daily, and operate with low-friction confidence.',
    ],
  },
]

export const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-surface py-28 md:py-40">
      {/* Visual background grids */}
      <div className="absolute inset-0 pointer-events-none opacity-[1.5%] bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-size-[32px_32px]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-120 w-120 rounded-full bg-primary/[0.01] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-120 w-120 rounded-full bg-primary/[0.01] blur-3xl" />

      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary font-bold block mb-4">
            / WHAT MAKES ME DIFFERENT
          </span>
          <h2 className="text-4xl font-light tracking-tight md:text-5xl lg:text-7xl text-white leading-tight">
            Why hire <br />
            <span className="font-serif italic text-primary">Eduardo Inerarte?</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/60 md:text-base font-light font-display">
            Senior Frontend Engineers are common. Architects who bridge extreme technical
            constraints, European enterprise scale, product intuition, and team-wide governance are
            rare.
          </p>
        </div>

        {/* Dynamic 5-Card Stacked Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((adv, index) => {
            const Icon = adv.icon
            const isLastWide = index === 4

            return (
              <m.article
                key={adv.id}
                {...fadeInView({ delay: index * 0.08 })}
                className={`group relative rounded-2xl border border-white/10 bg-white/[0.01] p-8 backdrop-blur-md flex flex-col justify-between transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.02] ${
                  isLastWide ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="space-y-6">
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="font-serif text-3xl font-light italic text-foreground/20 group-hover:text-primary transition-colors duration-300">
                      /{adv.index}
                    </span>
                    <div className="p-2 rounded-lg border border-white/5 bg-zinc-950 text-white/70 group-hover:text-primary transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Headlines */}
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                      {adv.title}
                    </h3>
                    <p className="text-xs text-foreground/50 leading-relaxed font-light">
                      {adv.subtitle}
                    </p>
                  </div>

                  {/* Bullet Proof Points */}
                  <ul className="space-y-3 pt-2">
                    {adv.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2 text-xs leading-relaxed text-foreground/75 font-light font-display"
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
      </div>
    </section>
  )
}

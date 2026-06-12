import { m } from 'framer-motion'
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext'
import { useAnimatedCounter } from '@/portfolio/hooks/useAnimatedCounter'
import { fadeInView } from '@/portfolio/lib/motion'

interface StatItem {
  id: string
  value: number
  suffix: string
  label: string
  description: string
  decimals?: number
}

const AnimatedNumber = ({
  value,
  suffix,
  decimals = 0,
}: {
  value: number
  suffix: string
  decimals?: number
}) => {
  const ref = useAnimatedCounter(value, suffix, decimals)
  return (
    <span ref={ref} className="font-mono tracking-tight font-light">
      {decimals > 0 ? value.toFixed(decimals) : value}
      {suffix}
    </span>
  )
}

export const StatsCounter = () => {
  const { stats, content, skills } = usePortfolioData()

  const technologiesCount = skills.length > 0 ? skills.length : stats.technologies
  const usersServed = Number((content['stats.usersServed'] || '').replace(/[^0-9]/g, ''))
  const usersValue = usersServed > 0 ? Math.round(usersServed / 1000) : 40

  const uptimeRaw = (content['stats.uptime'] || '').replace(',', '.').replace(/[^0-9.]/g, '')
  const uptime = uptimeRaw ? Number(uptimeRaw) : 0
  const uptimeDecimals = uptimeRaw.includes('.') ? uptimeRaw.split('.')[1].length : 0

  const migrations = Number((content['stats.migrations'] || '').replace(/[^0-9]/g, ''))
  const migrationsValue = migrations > 0 ? migrations : 16

  const statItems: StatItem[] = [
    {
      id: 'technologies',
      value: technologiesCount,
      suffix: '',
      label: '/ CURATED TECHNOLOGIES',
      description: 'Vetted isomorphic systems cataloged in full registry.',
    },
    {
      id: 'lighthouse',
      value: stats.lighthouse,
      suffix: '%',
      label: '/ LIGHTHOUSE PERFORMANCE',
      description: 'Average Core Web Vitals score across active systems.',
    },
    {
      id: 'users',
      value: usersValue,
      suffix: 'k+',
      label: '/ END USERS SERVED',
      description: 'High-traffic consumer networks and SaaS active users.',
    },
    {
      id: 'uptime',
      value: uptime > 0 ? uptime : 99.95,
      suffix: '%',
      label: '/ ENGINE UPTIME',
      decimals: uptimeDecimals || 2,
      description: 'Robust serverless architecture with zero SLA breaches.',
    },
    {
      id: 'migrations',
      value: migrationsValue,
      suffix: '+',
      label: '/ ENTERPRISE MIGRATIONS',
      description: 'Legacy codebases decoupled into agile modular structures.',
    },
  ]

  return (
    <section className="relative z-10 overflow-hidden py-16 md:py-20 select-none">
      <span aria-hidden="true" className="section-seam" />
      {/* Soft tonal aura — editorial light, no grid */}
      <div aria-hidden="true" className="pf-section-bg pf-section-bg--alt" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {statItems.map((stat, index) => (
            <m.article
              key={stat.id}
              {...fadeInView({ delay: index * 0.06 })}
              className="flex flex-col justify-start space-y-2"
            >
              <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-primary font-bold block">
                {stat.label}
              </span>

              <h3 className="font-display text-3xl font-light tracking-tight text-foreground md:text-4xl whitespace-nowrap">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </h3>

              <p className="text-[11px] leading-relaxed text-foreground/50 font-light font-display">
                {stat.description}
              </p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}

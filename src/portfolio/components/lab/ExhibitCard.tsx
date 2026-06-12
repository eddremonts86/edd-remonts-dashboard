import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { fadeInView } from '@/portfolio/lib/motion'

interface ExhibitCardProps {
  /** Exhibit number, rendered as `EXP.01` */
  index: number
  title: string
  /** One-line intent statement — what judgment this piece demonstrates */
  goal: string
  /** Actual tools used — keep honest */
  tools: string[]
  children: ReactNode
  className?: string
  /** Extra classes for the demo viewport (default fixed height) */
  demoClassName?: string
}

/**
 * Frame for a live Lab exhibit: header plate, interactive demo viewport,
 * and a footer with the goal + tools receipts.
 */
export const ExhibitCard = ({
  index,
  title,
  goal,
  tools,
  children,
  className = '',
  demoClassName = '',
}: ExhibitCardProps) => {
  const { t } = useTranslation()

  return (
    <m.article
      {...fadeInView({ delay: (index % 3) * 0.08, distance: 24 })}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-subtle bg-surface/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_48px_-16px_rgba(209,52,38,0.25)] ${className}`}
    >
      <header className="flex items-center justify-between border-b border-subtle px-5 py-3">
        <h3 className="font-display text-sm font-medium tracking-tight text-foreground">
          {title}
        </h3>
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
          {`EXP.${String(index).padStart(2, '0')}`}
        </span>
      </header>

      <div className={`relative flex-1 overflow-hidden ${demoClassName}`}>{children}</div>

      <footer className="space-y-3 border-t border-subtle px-5 py-4">
        <p className="text-xs font-light leading-relaxed text-foreground/70">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/45">
            {t('lab.goalLabel', 'Goal')}
            {' — '}
          </span>
          <span className="font-serif italic">{goal}</span>
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label={t('lab.toolsLabel', 'Tools used')}>
          {tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-subtle bg-background/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/55"
            >
              {tool}
            </li>
          ))}
        </ul>
      </footer>
    </m.article>
  )
}

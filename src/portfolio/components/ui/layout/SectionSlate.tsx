import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { APPLE_EASE, fadeInView } from '@/portfolio/lib/motion'

interface SectionSlateProps {
  /** Reel number shown in the slate, e.g. 2 → "REEL 02" */
  reel: number
  /** Mono kicker after the reel number, e.g. "SELECTED WORK" */
  kicker: string
  /** Main serif headline (first line) */
  title: string
  /** Italic crimson second line */
  accent?: string
  /** Optional short standfirst below the headline */
  description?: string
  className?: string
  children?: ReactNode
}

/**
 * Film-slate section header: `REEL 02 — KICKER` mono line, masked headline
 * reveal, and a hairline rule that draws itself on scroll. One component so
 * every chapter of the page opens with the same cinematic grammar.
 */
export const SectionSlate = ({
  reel,
  kicker,
  title,
  accent,
  description,
  className = '',
  children,
}: SectionSlateProps) => {
  const reelNo = String(reel).padStart(2, '0')

  return (
    <header className={`mb-16 max-w-3xl text-left md:mb-20 ${className}`}>
      <m.div {...fadeInView({ distance: 8 })} className="mb-5 flex items-center gap-4">
        <span className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] text-primary">
          {`REEL ${reelNo}`}
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
        <span className="font-mono text-[13px] uppercase tracking-[0.28em] text-foreground/75">
          {kicker}
        </span>
      </m.div>

      <h2 className="flex flex-col text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl">
        <span className="overflow-hidden">
          <m.span
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: APPLE_EASE }}
            className="inline-block"
          >
            {title}
          </m.span>
        </span>
        {accent && (
          <span className="overflow-hidden">
            <m.span
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: APPLE_EASE, delay: 0.12 }}
              className="mt-1 inline-block font-serif italic text-primary"
            >
              {accent}
            </m.span>
          </span>
        )}
      </h2>

      <m.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: APPLE_EASE, delay: 0.25 }}
        className="mt-6 h-px w-full origin-left bg-gradient-to-r from-primary/60 via-foreground/15 to-transparent"
        aria-hidden="true"
      />

      {description && (
        <m.p
          {...fadeInView({ delay: 0.3, distance: 10 })}
          className="mt-5 max-w-xl text-[16px] font-light leading-relaxed text-foreground/70 md:text-[17px]"
        >
          {description}
        </m.p>
      )}
      {children}
    </header>
  )
}

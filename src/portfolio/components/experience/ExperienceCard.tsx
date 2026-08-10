import { m } from 'framer-motion'
import { Layers, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CompanyChip } from '@/portfolio/components/ui/badges/CompanyChip'
import { fadeInView } from '@/portfolio/lib/motion'

export interface EraData {
  id: string
  period: string
  company: string
  role: string
  stackContext: string
  contributions: string[]
  outcomes: string[]
  vector: string
}

interface ExperienceCardProps {
  era: EraData
  index: number
}

export const ExperienceCard = ({ era, index }: ExperienceCardProps) => {
  const { t } = useTranslation()

  // Simple bold parser: splits by '**' and renders odd indices inside <strong>
  const parseBoldText = (text: string) => {
    const parts = text.split('**')
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong
          key={i}
          className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300"
        >
          {part}
        </strong>
      ) : (
        part
      ),
    )
  }

  return (
    <m.div
      {...fadeInView({ delay: Math.min(index * 0.12, 0.4) })}
      role="row"
      className="group relative flex cursor-default gap-6 py-12 transition-colors duration-500 md:gap-10 border-b border-subtle last:border-b-0"
    >
      {/* Timeline Node */}
      <div aria-hidden className="mt-1.5 shrink-0 flex-col items-center md:flex hidden">
        <span className="h-3 w-3 rounded-full border border-primary bg-background ring-4 ring-background transition-all duration-500 group-hover:bg-primary group-hover:scale-110" />
        <div className="w-px flex-1 bg-subtle mt-3 group-hover:bg-primary/20 transition-colors duration-500" />
      </div>

      {/* Content Layout */}
      <div className="flex flex-1 flex-col justify-between px-2 transition-colors duration-500 hover:bg-surface/5 md:flex-row md:rounded-2xl md:p-6 gap-8">
        {/* Left Column: Period, Role, Company */}
        <div role="cell" className="flex w-full flex-col md:w-[35%] text-left">
          <span className="flex items-center gap-1.5 font-mono text-[12px] tracking-[0.25em] text-primary uppercase font-bold mb-3">
            <Calendar className="h-3 w-3" />
            {era.period}
          </span>
          <h3 className="text-2xl font-light tracking-tight text-foreground font-serif italic group-hover:text-primary transition-colors duration-300 leading-snug">
            {era.role}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mt-3 select-none">
            {/* The company is the credential here, not a caption. */}
            {/* An era can cover several employers ("Novo Nordisk, Wunderman,
                GIG Media & Rebel Penguins"). One chip each: as a single chip it
                truncated and the individual names were the point. */}
            {era.company
              .split(/\s*(?:,|&|\band\b|\by\b|\bog\b)\s*/)
              .map((name) => name.trim())
              .filter(Boolean)
              .map((name) => (
                <CompanyChip key={name} name={name} size="md" />
              ))}
          </div>

          {/* Tech Vector indicator */}
          <div className="flex items-start gap-2 mt-6 border-t border-subtle pt-4">
            <Layers className="h-3.5 w-3.5 text-foreground/25 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-mono text-[12px] uppercase tracking-wider text-foreground/78 block">
                {t('experience.milestoneStack', 'Milestone Stack')}
              </span>
              <p className="font-mono text-[12px] leading-relaxed text-foreground/78">
                {era.vector}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contributions & Outcomes */}
        <div
          role="cell"
          className="flex w-full flex-col justify-start md:w-[65%] space-y-6 text-left"
        >
          {/* Stack context */}
          <div className="space-y-1">
            <span className="font-mono text-[12px] text-primary uppercase tracking-widest block font-bold">
              {t('experience.techStackScope', '/ Tech Stack & Scope')}
            </span>
            <p className="text-[15px] text-foreground/80 font-light leading-relaxed font-mono">
              {era.stackContext}
            </p>
          </div>

          {/* Contributions */}
          <div className="space-y-3">
            <span className="font-mono text-[12px] text-foreground/78 uppercase tracking-widest block border-b border-subtle pb-2">
              {t('experience.contributionsHeader', '/ Core Leadership & Contributions')}
            </span>
            <ul className="space-y-3">
              {era.contributions.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[15px] leading-relaxed text-foreground/70 font-light font-display"
                >
                  <span className="text-primary mt-1.5 shrink-0 block h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="flex-1">{parseBoldText(bullet)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Outcomes */}
          <div className="space-y-3">
            <span className="font-mono text-[12px] text-primary uppercase tracking-widest block border-b border-subtle pb-2 font-bold">
              {t('experience.outcomesHeader', '/ Verified Business Outcomes')}
            </span>
            <ul className="space-y-3">
              {era.outcomes.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[15px] leading-relaxed text-foreground font-medium font-display"
                >
                  <span className="text-green-500 mt-1.5 shrink-0 block h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span className="flex-1">{parseBoldText(bullet)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </m.div>
  )
}

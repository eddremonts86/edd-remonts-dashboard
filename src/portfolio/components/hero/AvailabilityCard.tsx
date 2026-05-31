import { m } from 'framer-motion'
import { MapPin, Calendar, Compass } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const AvailabilityCard = () => {
  const { t } = useTranslation()

  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
      className="mt-12 max-w-md overflow-hidden rounded-2xl border border-subtle bg-surface/30 p-5 backdrop-blur-md shadow-lg"
    >
      <div className="flex items-center gap-2 border-b border-subtle pb-3 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/60">
          {t('hero.availability.title', 'Hiring & Engagement Status')}
        </span>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-3 text-left">
        <div className="space-y-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1 font-bold">
            <Calendar className="h-3 w-3 shrink-0" />
            {t('hero.availability.timeline.label', 'TIMELINE')}
          </span>
          <span className="font-display text-[11px] font-semibold text-foreground block">
            {t('hero.availability.timeline.value', 'Q3 2026 Ready')}
          </span>
        </div>

        <div className="space-y-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1 font-bold">
            <MapPin className="h-3 w-3 shrink-0" />
            {t('hero.availability.location.label', 'LOCATION')}
          </span>
          <span className="font-display text-[11px] font-semibold text-foreground block">
            {t('hero.availability.location.value', 'Copenhagen, DK')}
          </span>
        </div>

        <div className="space-y-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1 font-bold">
            <Compass className="h-3 w-3 shrink-0" />
            {t('hero.availability.engagement.label', 'ENGAGEMENT')}
          </span>
          <span className="font-display text-[11px] font-semibold text-foreground block">
            {t('hero.availability.engagement.value', 'Remote / Hybrid')}
          </span>
        </div>
      </div>
    </m.div>
  )
}

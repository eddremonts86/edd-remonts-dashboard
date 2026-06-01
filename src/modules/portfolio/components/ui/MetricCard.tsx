import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface MetricCardProps {
  label: string
  value: string
  description?: string
  proofUrl?: string
  baseline?: string
  className?: string
  delay?: number
}

/**
 * Metric card with optional proof link.
 * Shows "VERIFIED / MEASURED AND REPORTED" badge if proofUrl is provided.
 */
export function MetricCard({
  label,
  value,
  description,
  proofUrl,
  baseline,
  className = '',
  delay = 0,
}: MetricCardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`rounded-xl border border-border bg-card p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-3xl font-light tracking-tight text-foreground">{value}</p>
          {baseline && <p className="mt-1 text-sm text-muted-foreground">{baseline}</p>}
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {proofUrl && (
          <a
            href={proofUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-muted-foreground hover:text-foreground"
            aria-label={t('metrics.viewProof', 'View evidence')}
            title={t('metrics.viewProof', 'View evidence')}
          >
            <ExternalLink className="size-4" />
          </a>
        )}
      </div>
      {proofUrl && (
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
            {t('metrics.verified', 'VERIFIED')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {t('metrics.measuredAndReported', 'MEASURED & REPORTED')}
          </span>
        </div>
      )}
    </motion.div>
  )
}

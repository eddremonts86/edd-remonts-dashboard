import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  background?: 'default' | 'muted' | 'card'
  /** Animation delay for children (seconds) */
  delay?: number
}

/**
 * Reusable section wrapper with consistent spacing and optional background.
 */
export function Section({
  id,
  children,
  className = '',
  background = 'default',
  delay = 0,
}: SectionProps) {
  const bgClasses = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    card: 'bg-card',
  }

  return (
    <section id={id} className={`py-24 md:py-32 ${bgClasses[background]} ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

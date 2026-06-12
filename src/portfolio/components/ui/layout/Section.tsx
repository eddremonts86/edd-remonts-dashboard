import { m, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  className?: string
  children: React.ReactNode
}

export const Section = ({ id, className = '', children, ...props }: SectionProps) => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Subtle dynamic visual depth: drift the aura vertically between -20px and 20px
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20])

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden py-24 md:py-36 ${className}`}
      {...props}
    >
      {/* Feathered chapter divider — dissolves into the shared ambient field */}
      <span aria-hidden="true" className="section-seam" />

      {/* Soft tonal aura — editorial light, no grid */}
      <m.div style={{ y }} className="pf-section-bg" aria-hidden="true" />
      {children}
    </section>
  )
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export const Container = ({ className = '', children, ...props }: ContainerProps) => {
  return (
    <div className={`container mx-auto max-w-7xl px-6 relative z-10 ${className}`} {...props}>
      {children}
    </div>
  )
}

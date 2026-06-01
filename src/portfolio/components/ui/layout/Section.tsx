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

  // Subtle dynamic visual depth: translate grid vertically between -12px and 12px
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12])

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden py-24 md:py-36 border-t border-subtle bg-background ${className}`}
      {...props}
    >
      {/* Blueprint Grid Motif with sutil scroll parallax */}
      <m.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none cinematic-grid"
      />
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

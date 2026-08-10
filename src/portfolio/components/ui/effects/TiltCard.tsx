import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { SPRING_CONFIG } from '@/portfolio/lib/motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max rotation in degrees at the card edge */
  maxTilt?: number
  /** Show a moving light sheen that follows the pointer */
  glare?: boolean
}

/**
 * Pointer-tracked 3D perspective tilt. Pure CSS transforms driven by springs —
 * disabled entirely under prefers-reduced-motion.
 */
export const TiltCard = ({
  children,
  className = '',
  maxTilt = 7,
  glare = true,
}: TiltCardProps) => {
  const prefersReducedMotion = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), SPRING_CONFIG)
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), SPRING_CONFIG)
  const glareX = useTransform(px, [0, 1], ['20%', '80%'])
  const glareY = useTransform(py, [0, 1], ['20%', '80%'])
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x as string} ${y as string}, rgba(255,255,255,0.14) 0%, transparent 55%)`,
  )

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - rect.left) / rect.width)
        py.set((e.clientY - rect.top) / rect.height)
      }}
      onPointerLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
      className={`relative [perspective:1000px] ${className}`}
    >
      {children}
      {glare && (
        <m.div
          aria-hidden="true"
          style={{ background: glareBackground }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      )}
    </m.div>
  )
}

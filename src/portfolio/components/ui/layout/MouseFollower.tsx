import { m, useReducedMotion } from 'framer-motion'
import { useInteractiveHover } from '@/portfolio/hooks/useInteractiveHover'
import { useMousePosition } from '@/portfolio/hooks/useMousePosition'

/**
 * Custom cursor companion. A small crimson dot that becomes a transparent
 * ring over interactive elements — a signifier that never covers the label.
 *
 * Deliberately NO mix-blend-mode: `difference` composites as a solid white
 * blob over elements with backdrop-filter in Chromium (the glass nav, CTA
 * pills and cards all use backdrop-blur), which looked broken on hover.
 */
export const MouseFollower = () => {
  const isHovering = useInteractiveHover()
  const reduceMotion = useReducedMotion()
  // Snappier than the shared CURSOR_SPRING — a cursor that trails feels broken.
  const { springX, springY } = useMousePosition({ stiffness: 550, damping: 28, mass: 0.4 })

  if (reduceMotion) return null

  return (
    <m.div
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
      aria-hidden="true"
    >
      <m.div style={{ x: springX, y: springY }} className="absolute left-0 top-0">
        <m.div
          animate={isHovering ? 'hover' : 'default'}
          initial="default"
          variants={{
            default: { width: 8, height: 8, opacity: 0.9 },
            hover: { width: 42, height: 42, opacity: 1 },
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full ${
            isHovering ? 'border border-primary/70 bg-primary/[0.06]' : 'bg-primary'
          }`}
        />
      </m.div>
    </m.div>
  )
}

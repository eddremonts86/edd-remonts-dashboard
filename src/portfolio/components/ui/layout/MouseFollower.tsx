import { m, useReducedMotion } from 'framer-motion'
import { useInteractiveHover } from '@/portfolio/hooks/useInteractiveHover'
import { useMousePosition } from '@/portfolio/hooks/useMousePosition'

export const MouseFollower = () => {
  const isHovering = useInteractiveHover()
  const reduceMotion = useReducedMotion()
  const { springX, springY } = useMousePosition()

  if (reduceMotion) return null

  // Larger diameter on hover: creates a visible "inversion lens" over interactive elements.
  const size = isHovering ? 52 : 10
  const offset = size / 2

  return (
    <m.div
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
      aria-hidden="true"
    >
      <m.div
        className="absolute rounded-full bg-white"
        style={{
          x: springX,
          y: springY,
          translateX: -offset,
          translateY: -offset,
          mixBlendMode: 'difference',
        }}
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      />
    </m.div>
  )
}

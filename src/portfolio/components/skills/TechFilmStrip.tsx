import {
  m,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useRef } from 'react'
import { techIconMap } from '@/portfolio/data/techIcons'

/** Unique, presentable entries from the canonical icon map */
const STRIP_ITEMS = (() => {
  const seen = new Set<string>()
  return Object.entries(techIconMap)
    .filter(([, path]) => {
      if (path.includes('default-tech') || seen.has(path)) return false
      seen.add(path)
      return true
    })
    .slice(0, 24)
})()

const StripRow = () => (
  <div className="flex shrink-0 items-center gap-10 pr-10">
    {STRIP_ITEMS.map(([name, path]) => (
      <span key={name} className="group/icon flex shrink-0 items-center gap-3">
        <span
          aria-hidden="true"
          className="block h-5 w-5 bg-foreground/50 transition-colors duration-300 group-hover/icon:bg-primary"
          style={{
            WebkitMaskImage: `url(${path})`,
            maskImage: `url(${path})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        />
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45 transition-colors duration-300 group-hover/icon:text-foreground">
          {name}
        </span>
        <span aria-hidden="true" className="ml-7 block h-1 w-1 rotate-45 bg-primary/40" />
      </span>
    ))}
  </div>
)

/**
 * Film-strip marquee of the real stack (the 52 SVGs in /tech-icons). Base
 * drift plus scroll-velocity boost and skew — scroll fast and the film "drags".
 * Static single row under prefers-reduced-motion.
 */
export const TechFilmStrip = () => {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 350 })
  const velocityBoost = useTransform(smoothVelocity, [-1200, 0, 1200], [-4, 0, 4])
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [4, -4])

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return
    const rowWidth = rowRef.current?.offsetWidth ?? 0
    if (!rowWidth) return
    const boost = velocityBoost.get()
    const moveBy = (-45 * (1 + Math.abs(boost)) * delta) / 1000
    let next = baseX.get() + moveBy
    // Wrap seamlessly — the row is rendered twice
    if (next <= -rowWidth) next += rowWidth
    if (next > 0) next -= rowWidth
    baseX.set(next)
  })

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative overflow-hidden border-y border-subtle bg-surface/30 py-5"
    >
      {/* Sprocket holes — film strip framing */}
      <div className="pointer-events-none absolute inset-x-0 top-1 flex justify-between px-4 opacity-30">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="h-1 w-2 rounded-[1px] bg-foreground/30" />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-between px-4 opacity-30">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="h-1 w-2 rounded-[1px] bg-foreground/30" />
        ))}
      </div>

      <m.div style={prefersReducedMotion ? undefined : { x: baseX, skewX }} className="flex w-max">
        <div ref={rowRef} className="flex shrink-0">
          <StripRow />
        </div>
        <div className="flex shrink-0">
          <StripRow />
        </div>
      </m.div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}

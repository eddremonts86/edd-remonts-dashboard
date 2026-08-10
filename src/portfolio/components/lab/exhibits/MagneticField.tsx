import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const COLS = 9
const ROWS = 6

/**
 * A field of dots repelled by the cursor with critically-damped spring
 * physics — one rAF loop and direct style writes, no per-dot React state.
 */
export const MagneticField = () => {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const fieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const field = fieldRef.current
    if (!field) return

    const dots = Array.from(field.querySelectorAll<HTMLSpanElement>('[data-dot]'))
    const state = dots.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
    const pointer = { x: -9999, y: -9999 }
    let raf = 0
    let running = false

    const onMove = (e: PointerEvent) => {
      const rect = field.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const STIFFNESS = 120
    const DAMPING = 14
    const RADIUS = 110
    const PUSH = 42

    let last = performance.now()
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const rect = field.getBoundingClientRect()

      dots.forEach((dot, i) => {
        const s = state[i]
        // Rest position from grid placement
        const cx = (((i % COLS) + 0.5) / COLS) * rect.width
        const cy = ((Math.floor(i / COLS) + 0.5) / ROWS) * rect.height

        // Repulsion target
        const dx = cx + s.x - pointer.x
        const dy = cy + s.y - pointer.y
        const dist = Math.hypot(dx, dy)
        let tx = 0
        let ty = 0
        if (dist < RADIUS && dist > 0.001) {
          const force = (1 - dist / RADIUS) * PUSH
          tx = (dx / dist) * force
          ty = (dy / dist) * force
        }

        // Spring integrate toward target offset
        s.vx += (-(s.x - tx) * STIFFNESS - s.vx * DAMPING) * dt
        s.vy += (-(s.y - ty) * STIFFNESS - s.vy * DAMPING) * dt
        s.x += s.vx * dt
        s.y += s.vy * dt

        const heat = Math.min(Math.hypot(s.x, s.y) / PUSH, 1)
        dot.style.transform = `translate(${s.x}px, ${s.y}px) scale(${1 + heat * 0.8})`
        dot.style.opacity = String(0.35 + heat * 0.65)
        dot.style.backgroundColor = heat > 0.25 ? 'var(--primary)' : 'var(--foreground)'
      })
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(field)

    field.addEventListener('pointermove', onMove, { passive: true })
    field.addEventListener('pointerleave', onLeave)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      field.removeEventListener('pointermove', onMove)
      field.removeEventListener('pointerleave', onLeave)
    }
  }, [prefersReducedMotion])

  return (
    <div
      ref={fieldRef}
      aria-label={t(
        'lab.exhibits.magnet.fieldLabel',
        'Magnetic dot field — move your cursor through it',
      )}
      className="relative h-full min-h-52 w-full overflow-hidden bg-background/60"
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
        aria-hidden="true"
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <span key={i} className="flex items-center justify-center">
            <span
              data-dot
              className="block h-1.5 w-1.5 rounded-full bg-foreground opacity-35 will-change-transform"
            />
          </span>
        ))}
      </div>
    </div>
  )
}

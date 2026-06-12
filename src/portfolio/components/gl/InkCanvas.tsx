import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useResolvedTheme } from '@/portfolio/hooks/useResolvedTheme'
import { createInkRenderer, hexToRgb, type InkParams } from './inkShader'

export interface InkCanvasProps {
  className?: string
  /** Drift speed multiplier */
  speed?: number
  /** Noise frequency multiplier */
  turbulence?: number
  /** Ink density 0..1 */
  inkAmount?: number
  /** Crimson vein intensity 0..1 */
  accentAmount?: number
  /** React to the pointer with a swirl + ember */
  interactive?: boolean
  /** Freeze the loop (still renders the last frame) */
  paused?: boolean
  /** Resolution scale 0.25..1 — Lab cards run lower than the hero */
  quality?: number
  /** Fade the canvas out without unmounting GL */
  hidden?: boolean
}

const PALETTES = {
  light: { paper: '#fbfaf9', ink: '#1c1a18', accent: '#d13426' },
  dark: { paper: '#0a0a0a', ink: '#3a3a3c', accent: '#ff4a3a' },
} as const

/**
 * Client-only WebGL ink canvas. Falls back to nothing (transparent) when WebGL
 * is unavailable — always layer a CSS background behind it. Pauses offscreen,
 * on hidden tabs, and renders a single still frame under prefers-reduced-motion.
 */
export const InkCanvas = ({
  className = '',
  speed = 1,
  turbulence = 1,
  inkAmount = 0.8,
  accentAmount = 0.6,
  interactive = false,
  paused = false,
  quality = 0.7,
  hidden = false,
}: InkCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resolvedTheme = useResolvedTheme()
  const prefersReducedMotion = useReducedMotion()

  // Live param refs — the rAF loop reads these so prop/theme changes apply
  // without tearing down the GL context. Synced in an effect each render.
  const palette = PALETTES[resolvedTheme === 'dark' ? 'dark' : 'light']
  const params: InkParams = {
    speed,
    turbulence,
    inkAmount,
    accentAmount,
    paper: hexToRgb(palette.paper),
    ink: hexToRgb(palette.ink),
    accent: hexToRgb(palette.accent),
  }
  const paramsRef = useRef<InkParams>(params)
  const pausedRef = useRef(paused)
  const reducedRef = useRef(prefersReducedMotion)
  useEffect(() => {
    paramsRef.current = params
    pausedRef.current = paused
    reducedRef.current = prefersReducedMotion
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = createInkRenderer(canvas)
    if (!renderer) return

    let raf = 0
    let running = false
    let inView = true
    let time = 12 // start mid-composition so the first frame is already rich
    let last = 0
    const pointer: [number, number] = [0.5, 0.5]
    const target: [number, number] = [0.5, 0.5]
    let glow = 0
    let glowTarget = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      renderer.resize(rect.width * dpr * quality, rect.height * dpr * quality)
      renderer.setParams(paramsRef.current)
      renderer.render(time, pointer, glow)
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (pausedRef.current) return
      time += dt
      pointer[0] += (target[0] - pointer[0]) * 0.07
      pointer[1] += (target[1] - pointer[1]) * 0.07
      glow += (glowTarget - glow) * 0.04
      glowTarget *= 0.985
      renderer.setParams(paramsRef.current)
      renderer.render(time, pointer, glow)
    }

    const start = () => {
      if (running || reducedRef.current) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }
    const sync = () => {
      if (inView && !document.hidden) start()
      else stop()
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      target[0] = (e.clientX - rect.left) / Math.max(rect.width, 1)
      target[1] = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1)
      glowTarget = 1
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    document.addEventListener('visibilitychange', sync)
    if (interactive) window.addEventListener('pointermove', onPointerMove, { passive: true })

    // Reduced motion: a single still frame was already drawn by resize()
    sync()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', sync)
      if (interactive) window.removeEventListener('pointermove', onPointerMove)
      renderer.destroy()
    }
  }, [interactive, quality])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full transition-opacity duration-1000 ${
        hidden ? 'opacity-0' : 'opacity-100'
      } ${className}`}
    />
  )
}

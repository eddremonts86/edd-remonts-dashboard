import { m, useReducedMotion } from 'framer-motion'
import { useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface DialProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}

const Dial = ({ label, value, min, max, step, onChange }: DialProps) => {
  const id = useId()
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={id}
        className="w-24 shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/55"
      >
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-full cursor-pointer accent-primary"
      />
      <output htmlFor={id} className="w-10 text-right font-mono text-[10px] text-foreground/70">
        {value}
      </output>
    </div>
  )
}

/**
 * Spring physics playground: click (or keyboard-step) anywhere in the chamber
 * and the puck travels there with the exact spring you dialed in. The same
 * config language every animation on this site is tuned with.
 */
export const SpringLab = () => {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const chamberRef = useRef<HTMLDivElement>(null)
  const [stiffness, setStiffness] = useState(150)
  const [damping, setDamping] = useState(15)
  const [mass, setMass] = useState(1)
  const [target, setTarget] = useState({ x: 0.5, y: 0.5 })

  const PUCK = 28

  const moveTo = (clientX: number, clientY: number) => {
    const rect = chamberRef.current?.getBoundingClientRect()
    if (!rect) return
    setTarget({
      x: Math.min(Math.max((clientX - rect.left) / rect.width, 0.06), 0.94),
      y: Math.min(Math.max((clientY - rect.top) / rect.height, 0.12), 0.88),
    })
  }

  return (
    <div className="flex h-full flex-col">
      <div
        ref={chamberRef}
        role="button"
        tabIndex={0}
        aria-label={t(
          'lab.exhibits.spring.chamberLabel',
          'Spring chamber — click to launch the puck',
        )}
        onPointerDown={(e) => moveTo(e.clientX, e.clientY)}
        onKeyDown={(e) => {
          const step = 0.18
          if (e.key === 'ArrowRight') setTarget((p) => ({ ...p, x: Math.min(p.x + step, 0.94) }))
          if (e.key === 'ArrowLeft') setTarget((p) => ({ ...p, x: Math.max(p.x - step, 0.06) }))
          if (e.key === 'ArrowDown') setTarget((p) => ({ ...p, y: Math.min(p.y + step, 0.88) }))
          if (e.key === 'ArrowUp') setTarget((p) => ({ ...p, y: Math.max(p.y - step, 0.12) }))
        }}
        className="relative min-h-44 flex-1 cursor-crosshair overflow-hidden bg-background/60 md:min-h-52"
      >
        {/* Chamber graticule */}
        <div aria-hidden="true" className="absolute inset-0 cinematic-grid opacity-[0.18]" />
        <span className="pointer-events-none absolute left-3 top-3 font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/40">
          {t('lab.exhibits.spring.hint', 'click anywhere — the puck obeys your spring')}
        </span>

        {/* Target ghost ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/40 transition-all duration-200"
          style={{ left: `${target.x * 100}%`, top: `${target.y * 100}%` }}
        />

        {/* The puck */}
        <m.div
          aria-hidden="true"
          animate={{ left: `${target.x * 100}%`, top: `${target.y * 100}%` }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness, damping, mass }
          }
          style={{ width: PUCK, height: PUCK, x: '-50%', y: '-50%' }}
          className="absolute rounded-full bg-primary shadow-[0_0_24px_rgba(209,52,38,0.5)]"
        />
      </div>

      <div className="space-y-2.5 border-t border-subtle bg-background/50 px-5 py-4">
        <Dial
          label="stiffness"
          value={stiffness}
          min={10}
          max={500}
          step={5}
          onChange={setStiffness}
        />
        <Dial label="damping" value={damping} min={1} max={50} step={1} onChange={setDamping} />
        <Dial label="mass" value={mass} min={0.5} max={5} step={0.5} onChange={setMass} />
      </div>
    </div>
  )
}

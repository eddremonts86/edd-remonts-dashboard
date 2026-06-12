import { useId, useState } from 'react'
import { InkCanvas } from '@/portfolio/components/gl/InkCanvas'

interface UniformSliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}

const UniformSlider = ({ label, value, min, max, step, onChange }: UniformSliderProps) => {
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
        {value.toFixed(2)}
      </output>
    </div>
  )
}

/**
 * The hero's raw-WebGL ink shader, exposed as an instrument: every slider is
 * a live GLSL uniform. The point is showing the machinery, not hiding it.
 */
export const InkStudy = () => {
  const [speed, setSpeed] = useState(1)
  const [turbulence, setTurbulence] = useState(1)
  const [ink, setInk] = useState(0.85)
  const [accent, setAccent] = useState(0.7)

  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-44 flex-1 md:min-h-52">
        <InkCanvas
          speed={speed}
          turbulence={turbulence}
          inkAmount={ink}
          accentAmount={accent}
          interactive
          quality={0.5}
          className="absolute inset-0"
        />
        <span className="pointer-events-none absolute left-3 top-3 font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/40">
          fragment shader · 1 draw call
        </span>
      </div>
      <div className="space-y-2.5 border-t border-subtle bg-background/50 px-5 py-4">
        <UniformSlider
          label="u_speed"
          value={speed}
          min={0}
          max={3}
          step={0.05}
          onChange={setSpeed}
        />
        <UniformSlider
          label="u_turbulence"
          value={turbulence}
          min={0.3}
          max={2.5}
          step={0.05}
          onChange={setTurbulence}
        />
        <UniformSlider
          label="u_ink"
          value={ink}
          min={0}
          max={1}
          step={0.05}
          onChange={setInk}
        />
        <UniformSlider
          label="u_accent"
          value={accent}
          min={0}
          max={1}
          step={0.05}
          onChange={setAccent}
        />
      </div>
    </div>
  )
}

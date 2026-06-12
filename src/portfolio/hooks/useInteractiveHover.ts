import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DEFAULT_SELECTOR = 'a, button, [role="button"], input, textarea, select'

export function useInteractiveHover(selector = DEFAULT_SELECTOR): boolean {
  const [isHovering, setIsHovering] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const handleOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(selector)) {
        setIsHovering(true)
      }
    }
    const handleOut = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.(selector)
      if (!el) return
      // mouseover/out bubble on every child boundary inside a link/button —
      // only drop the hover state when the pointer actually leaves the
      // interactive element (and isn't entering another one). Without this
      // the cursor lens flickers while traversing icons/spans inside a link.
      const next = e.relatedTarget as Element | null
      if (next && (el.contains(next) || next.closest?.(selector))) return
      setIsHovering(false)
    }

    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mouseout', handleOut, { passive: true })

    return () => {
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [reduceMotion, selector])

  return isHovering
}

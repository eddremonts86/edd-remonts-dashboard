import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

/** `useLayoutEffect` warns when it runs during SSR; there is no layout to read there. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Owns whether the title sequence plays.
 *
 * It plays on every load — it is the site's entrance, not a one-off. The single
 * exception is `prefers-reduced-motion`, where it is skipped outright.
 *
 * Starts `true` on both server and client so hydration matches, then drops to
 * `false` before the first paint for reduced-motion visitors. Doing that in a
 * layout effect rather than in `useState`'s initialiser is what keeps them from
 * seeing a frame of overlay they asked not to get.
 */
export function useTitleSequence(): [boolean, () => void] {
  const [playing, setPlaying] = useState(true)

  const finish = useCallback(() => setPlaying(false), [])

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) setPlaying(false)
  }, [])

  return [playing, finish]
}

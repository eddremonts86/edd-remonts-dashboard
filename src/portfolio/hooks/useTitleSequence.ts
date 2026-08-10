import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { STORAGE_KEYS } from '@/portfolio/lib/storageKeys'

/** `useLayoutEffect` warns when it runs during SSR; there is no layout to read there. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

function shouldSkip(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  try {
    return window.sessionStorage.getItem(STORAGE_KEYS.titleSequencePlayed) === '1'
  } catch {
    // Private mode / storage disabled — play it, that is the harmless default.
    return false
  }
}

/**
 * Owns whether the title sequence plays.
 *
 * Starts `true` on both server and client so hydration matches, then drops to
 * `false` before the first paint for anyone who has asked for reduced motion or
 * has already seen it this session. Doing that in a layout effect rather than
 * in `useState`'s initialiser is what keeps those visitors from seeing a frame
 * of overlay they never asked for.
 */
export function useTitleSequence(): [boolean, () => void] {
  const [playing, setPlaying] = useState(true)

  const finish = useCallback(() => {
    setPlaying(false)
    try {
      window.sessionStorage.setItem(STORAGE_KEYS.titleSequencePlayed, '1')
    } catch {
      // Nothing to do — worst case it plays again next navigation.
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (shouldSkip()) setPlaying(false)
  }, [])

  return [playing, finish]
}

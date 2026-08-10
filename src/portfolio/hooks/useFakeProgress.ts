import { useEffect, useRef, useState } from 'react'

/**
 * Drives the title-sequence progress bar.
 *
 * Defaults were 100 ms / 500 ms, which put the whole sequence at ~2.6 s and made
 * the preloader the page's LCP element. The theatre survives at roughly half
 * that; the numbers are the shortest that still read as a deliberate sequence
 * rather than a flicker.
 */
export function useFakeProgress(onComplete: () => void, intervalMs = 55, holdMs = 220): number {
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5
      if (currentProgress >= 100) {
        currentProgress = 100
        setProgress(100)
        clearInterval(interval)

        timeoutRef.current = setTimeout(() => {
          onComplete()
          document.body.style.overflow = ''
        }, holdMs)
      } else {
        setProgress(currentProgress)
      }
    }, intervalMs)

    return () => {
      clearInterval(interval)
      clearTimeout(timeoutRef.current)
      document.body.style.overflow = ''
    }
  }, [onComplete, intervalMs, holdMs])

  return progress
}

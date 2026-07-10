import { useEffect, useRef, useState } from 'react'

/**
 * @param onComplete  Called when the loader has finished (reached 100% AND held).
 * @param intervalMs   Tick interval for the progress bar. The total time
 *                    from 0 -> 100 is roughly (100 / averageIncrement) * intervalMs.
 * @param holdMs       Extra pause at 100% before invoking onComplete.
 *                    Use this to keep the preloader visible for inspection
 *                    AFTER the progress bar has filled (e.g. set to 600_000
 *                    for a 10 minute visible window).
 */
export function useFakeProgress(
  onComplete: () => void,
  intervalMs = 100,
  holdMs = 500,
): number {
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    let currentProgress = 0
    const getSafeRandomIncrement = () => {
      const randomBuffer = new Uint32Array(1)
      globalThis.crypto.getRandomValues(randomBuffer)
      return (randomBuffer[0] % 15) + 5
    }

    const interval = setInterval(() => {
      currentProgress += getSafeRandomIncrement()
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

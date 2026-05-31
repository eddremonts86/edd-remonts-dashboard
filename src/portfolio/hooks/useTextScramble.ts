import { useCallback, useEffect, useRef, useState } from 'react'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&'

/**
 * Returns a `display` string that scrambles from random characters to the
 * target `text` on each `scramble()` call.
 *
 * - Letters resolve left-to-right over `text.length * framesPerChar` frames.
 * - Only non-space characters are scrambled.
 * - Safe to call repeatedly mid-animation.
 */
export const useTextScramble = (text: string, framesPerChar = 3) => {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef<number | null>(null)

  // Keep text in sync if the prop changes (e.g. language switch)
  useEffect(() => {
    setDisplay(text)
  }, [text])

  const scramble = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)

    let frame = 0
    const totalFrames = text.length * framesPerChar

    const tick = () => {
      const resolved = Math.floor((frame / totalFrames) * text.length)

      const result = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < resolved) return char
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        })
        .join('')

      setDisplay(result)
      frame++

      if (frame <= totalFrames) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
        rafRef.current = null
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [text, framesPerChar])

  const reset = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    setDisplay(text)
  }, [text])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { display, scramble, reset }
}

import { useEffect, useState } from 'react'
import { STORAGE_KEYS } from '@/portfolio/lib/storageKeys'
import { ThemeProviderContext, type Theme, type ThemeProviderProps } from './ThemeContextBase'

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEYS.theme,
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem(storageKey)
     
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(stored as Theme)
    }
  }, [storageKey])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  const value = {
    theme,
    setTheme: (t: Theme) => {
      localStorage.setItem(storageKey, t)

      // Cinematic theme wipe via the View Transitions API — progressive
      // enhancement, gated behind a marker class so router-driven view
      // transitions are unaffected.
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { finished: Promise<void> }
      }
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!doc.startViewTransition || reduced) {
        setTheme(t)
        return
      }

      const root = document.documentElement
      root.classList.add('pf-theme-wipe')
      const transition = doc.startViewTransition(() => {
        // Apply the class synchronously so the new snapshot has the new theme
        root.classList.remove('light', 'dark')
        if (t === 'system') {
          root.classList.add(
            window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
          )
        } else {
          root.classList.add(t)
        }
        setTheme(t)
      })
      transition.finished.finally(() => root.classList.remove('pf-theme-wipe'))
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

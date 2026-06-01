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
      setTheme(t)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

import { AnimatePresence, m } from 'framer-motion'
import { ArrowDownToLine, Coffee, Copy, Globe, Languages, MoveRight, Terminal } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MorphingIcon } from '@/portfolio/components/ui/icons/MorphingIcon'
import { MOON, SUN } from '@/portfolio/components/ui/icons/morphIconNodes'
import { useTheme } from '@/portfolio/contexts/ThemeContextBase'
import { useNavSections } from '@/portfolio/data/navigation'
import { useResolvedTheme } from '@/portfolio/hooks/useResolvedTheme'
import { getCvUrl } from '@/portfolio/lib/cvUrl'
import { APPLE_EASE } from '@/portfolio/lib/motion'
import { STORAGE_KEYS } from '@/portfolio/lib/storageKeys'

interface Command {
  id: string
  label: string
  hint?: string
  icon: React.ReactNode
  /** Extra strings the filter matches against */
  keywords?: string
  /** Hidden commands only appear once the query touches their keywords */
  secret?: boolean
  run: () => void
}

const LANGS: Array<{ code: string; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'dk', label: 'Dansk' },
]

/**
 * ⌘K command palette — the engineer's easter egg. Section jumps, theme,
 * language, CV, plus a couple of commands best left undocumented.
 */
export const CommandPalette = () => {
  const { t, i18n } = useTranslation()
  const { setTheme } = useTheme()
  const resolvedTheme = useResolvedTheme()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
    restoreFocusRef.current?.focus?.()
  }, [])

  const announce = useCallback((message: string) => {
    clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = setTimeout(() => setToast(null), 2800)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((prev) => {
          if (!prev) restoreFocusRef.current = document.activeElement as HTMLElement
          return !prev
        })
        setQuery('')
        setActiveIndex(0)
      }
    }
    const onOpenEvent = () => {
      restoreFocusRef.current = document.activeElement as HTMLElement
      setOpen(true)
      setQuery('')
      setActiveIndex(0)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pf:open-palette', onOpenEvent)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pf:open-palette', onOpenEvent)
      clearTimeout(toastTimer.current)
    }
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const navSections = useNavSections()

  const commands = useMemo<Command[]>(() => {
    const goto = (id: string) => () => {
      close()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    const setLang = (code: string) => () => {
      i18n.changeLanguage(code)
      localStorage.setItem(STORAGE_KEYS.lang, code)
      close()
    }

    return [
      ...navSections.map((section) => ({
        id: `goto-${section.id}`,
        label: `${t('palette.goto', 'Go to')}: ${t(section.labelKey, section.id)}`,
        hint: `#${section.id}`,
        icon: <MoveRight className="h-3.5 w-3.5" />,
        keywords: `go jump section ${section.id}`,
        run: goto(section.id),
      })),
      {
        id: 'theme-toggle',
        label:
          resolvedTheme === 'dark'
            ? t('palette.themeLight', 'Switch to light — roll credits')
            : t('palette.themeDark', 'Switch to dark — kill the lights'),
        icon: <MorphingIcon icon={resolvedTheme === 'dark' ? SUN : MOON} size={14} />,
        keywords: 'theme dark light mode toggle',
        run: () => {
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
          close()
        },
      },
      ...LANGS.filter((lang) => lang.code !== i18n.language).map((lang) => ({
        id: `lang-${lang.code}`,
        label: `${t('palette.language', 'Language')}: ${lang.label}`,
        icon: <Languages className="h-3.5 w-3.5" />,
        keywords: `language idioma sprog ${lang.code} ${lang.label}`,
        run: setLang(lang.code),
      })),
      {
        id: 'cv',
        label: t('palette.cv', 'Download CV'),
        hint: 'PDF',
        icon: <ArrowDownToLine className="h-3.5 w-3.5" />,
        keywords: 'cv resume curriculum pdf download',
        run: () => {
          window.open(getCvUrl(i18n.language, resolvedTheme), '_blank', 'noopener,noreferrer')
          close()
        },
      },
      {
        id: 'copy-url',
        label: t('palette.copyUrl', 'Copy site URL'),
        icon: <Copy className="h-3.5 w-3.5" />,
        keywords: 'copy share url link',
        run: () => {
          navigator.clipboard?.writeText(window.location.href)
          announce(t('palette.copied', 'Copied — share it somewhere nice.'))
          close()
        },
      },
      {
        id: 'source',
        label: t('palette.source', 'View source — this site is a project too'),
        icon: <Globe className="h-3.5 w-3.5" />,
        keywords: 'source code github repo',
        run: () => {
          window.open(
            'https://github.com/eddremonts86/edd-remonts-dashboard',
            '_blank',
            'noopener,noreferrer',
          )
          close()
        },
      },
      {
        id: 'coffee',
        label: 'sudo make coffee',
        hint: '418',
        icon: <Coffee className="h-3.5 w-3.5" />,
        keywords: 'sudo make coffee teapot brew cafe',
        secret: true,
        run: () => {
          announce(t('palette.teapot', "HTTP 418 — I'm a teapot. Try the contact form instead."))
          close()
        },
      },
      {
        id: 'whoami',
        label: 'whoami',
        icon: <Terminal className="h-3.5 w-3.5" />,
        keywords: 'whoami terminal shell who',
        secret: true,
        run: () => {
          announce(
            t(
              'palette.whoami',
              'eduardo — staff frontend engineer. uptime: 18 years. no zombie processes.',
            ),
          )
          close()
        },
      },
    ]
  }, [navSections, t, i18n, resolvedTheme, setTheme, close, announce])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    // eslint-disable-next-line react-hooks/refs -- filter only reads labels; refs in `run` closures fire from event handlers
    return commands.filter((cmd) => {
      const haystack = `${cmd.label} ${cmd.keywords ?? ''}`.toLowerCase()
      if (cmd.secret) return q.length > 2 && haystack.includes(q)
      if (!q) return true
      return haystack.includes(q)
    })
  }, [commands, query])

  const clampedIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0))

  return (
    <>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] flex items-start justify-center bg-background/60 px-4 pt-[18vh] backdrop-blur-sm"
            onPointerDown={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label={t('palette.title', 'Command palette')}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: APPLE_EASE }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-subtle bg-surface shadow-[0_32px_80px_-12px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center gap-3 border-b border-subtle px-4">
                <Terminal className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-listbox"
                  aria-activedescendant={
                    filtered[clampedIndex] ? `palette-opt-${filtered[clampedIndex].id}` : undefined
                  }
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setActiveIndex(0)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.preventDefault()
                      close()
                    }
                    if (e.key === 'ArrowDown') {
                      e.preventDefault()
                      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
                    }
                    if (e.key === 'ArrowUp') {
                      e.preventDefault()
                      setActiveIndex((i) => Math.max(i - 1, 0))
                    }
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      filtered[clampedIndex]?.run()
                    }
                    if (e.key === 'Tab') e.preventDefault()
                  }}
                  placeholder={t('palette.placeholder', 'Type a command — or try "sudo"…')}
                  className="w-full bg-transparent py-4 font-mono text-[16px] text-foreground placeholder:text-foreground/35 focus:outline-none focus-visible:ring-0"
                />
                <kbd className="shrink-0 rounded border border-subtle px-1.5 py-0.5 font-mono text-[12px] uppercase text-foreground/70">
                  esc
                </kbd>
              </div>

              <ul id="palette-listbox" role="listbox" className="max-h-72 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center font-mono text-[15px] text-foreground/70">
                    {t('palette.empty', 'command not found — but nice try')}
                  </li>
                )}
                {filtered.map((cmd, i) => (
                  <li
                    key={cmd.id}
                    id={`palette-opt-${cmd.id}`}
                    role="option"
                    aria-selected={i === clampedIndex}
                  >
                    <button
                      type="button"
                      onClick={cmd.run}
                      onPointerEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 ${
                        i === clampedIndex
                          ? 'bg-primary/10 text-foreground'
                          : 'text-foreground/70 hover:bg-foreground/[0.04]'
                      }`}
                    >
                      <span
                        className={`shrink-0 ${i === clampedIndex ? 'text-primary' : 'text-foreground/70'}`}
                        aria-hidden="true"
                      >
                        {cmd.icon}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-mono text-[15px]">
                        {cmd.label}
                      </span>
                      {cmd.hint && (
                        <span className="shrink-0 font-mono text-[12px] uppercase tracking-wider text-foreground/78">
                          {cmd.hint}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between border-t border-subtle px-4 py-2 font-mono text-[12px] uppercase tracking-[0.2em] text-foreground/80">
                <span>{t('palette.footerHint', '↑↓ navigate · ↵ run')}</span>
                <span className="text-primary/70">edd.os</span>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Toast — palette command feedback */}
      <AnimatePresence>
        {toast && (
          <m.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: APPLE_EASE }}
            className="fixed bottom-6 left-1/2 z-[10001] -translate-x-1/2 rounded-full border border-subtle bg-surface px-5 py-2.5 font-mono text-[15px] text-foreground shadow-xl"
          >
            {toast}
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}

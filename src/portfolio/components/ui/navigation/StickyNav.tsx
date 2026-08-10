import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/portfolio/components/ui/media/Logo'
import { LanguageSelector } from '@/portfolio/components/ui/navigation/LanguageSelector'
import { ThemeToggle } from '@/portfolio/components/ui/navigation/ThemeToggle'
import { NAV_SECTIONS } from '@/portfolio/data/navigation'
import { useScrollSpy } from '@/portfolio/hooks/useScrollSpy'
import { useScrollVisibility } from '@/portfolio/hooks/useScrollVisibility'
import { useTextScramble } from '@/portfolio/hooks/useTextScramble'
import { APPLE_EASE } from '@/portfolio/lib/motion'

/** Single nav link with letter-scramble hover effect. */
const ScrambleNavLink = ({
  id,
  label,
  isActive,
  onClick,
}: {
  id: string
  label: string
  isActive: boolean
  onClick?: () => void
}) => {
  const { display, scramble, reset } = useTextScramble(label, 2)

  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className={`whitespace-nowrap border-b border-transparent pb-0.5 font-mono text-[13px] uppercase tracking-widest transition-all hover:text-foreground ${
        isActive ? 'border-primary text-foreground' : 'text-foreground/72'
      }`}
    >
      {display}
    </a>
  )
}

export const StickyNav = () => {
  const { t } = useTranslation()
  const visible = useScrollVisibility()
  const { activeSection } = useScrollSpy(NAV_SECTIONS)
  const [_mobileOpen, setMobileOpen] = useState(false)
  const mobileOpen = visible && _mobileOpen

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const navLinks = NAV_SECTIONS.filter((s) => s.id !== 'hero')

  return (
    <AnimatePresence>
      {visible && (
        <m.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: APPLE_EASE }}
          className="bg-background/60 fixed left-0 top-0 z-100 w-full border-b border-subtle/50 pt-[env(safe-area-inset-top)] backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_30px_rgba(0,0,0,0.3)]"
          aria-label={t('a11y.mainNav')}
        >
          <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-4">
            {/* Brand / Logo */}
            <a
              href="#hero"
              aria-label={t('nav.home')}
              className="shrink-0 text-foreground transition-opacity hover:opacity-80"
            >
              <Logo className="h-9 w-9 md:h-10 md:w-10" />
            </a>

            {/* Nav Links — hidden on mobile, visible on md+ */}
            <div className="hide-scrollbar hidden items-center gap-6 overflow-x-auto md:flex lg:gap-8">
              {navLinks.map(({ id, labelKey }) => (
                <ScrambleNavLink
                  key={id}
                  id={id}
                  label={t(labelKey)}
                  isActive={activeSection === id}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('pf:open-palette'))}
                aria-label={t('palette.title', 'Command palette')}
                title={t('palette.title', 'Command palette')}
                className="hidden items-center gap-1.5 rounded-full border border-subtle bg-surface/50 px-3 py-1.5 font-mono text-[13px] uppercase tracking-wider text-foreground/75 backdrop-blur-md transition-colors duration-300 hover:border-primary/50 hover:text-primary md:flex"
              >
                <kbd className="font-mono">⌘K</kbd>
              </button>
              <LanguageSelector />
              <ThemeToggle />

              {/* Hamburger — visible only on mobile */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="text-foreground/70 flex h-10 w-10 items-center justify-center rounded-full border border-subtle bg-surface transition-colors duration-300 hover:text-foreground md:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <m.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-4 w-4" />
                    </m.span>
                  ) : (
                    <m.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-4 w-4" />
                    </m.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          <AnimatePresence>
            {mobileOpen && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: APPLE_EASE }}
                className="overflow-hidden md:hidden"
              >
                <div className="container mx-auto flex flex-col gap-3 px-4 py-4">
                  {navLinks.map(({ id, labelKey }, i) => (
                    <m.div
                      key={id}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3, ease: APPLE_EASE }}
                    >
                      <ScrambleNavLink
                        id={id}
                        label={t(labelKey)}
                        isActive={activeSection === id}
                        onClick={closeMobile}
                      />
                    </m.div>
                  ))}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.nav>
      )}
    </AnimatePresence>
  )
}

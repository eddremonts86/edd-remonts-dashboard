import { AnimatePresence, m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useFakeProgress } from '@/portfolio/hooks/useFakeProgress'
import { APPLE_EASE } from '@/portfolio/lib/motion'

/** Boot log lines revealed as progress passes each threshold */
const BOOT_STEPS: Array<{ at: number; key: string; fallback: string }> = [
  { at: 5, key: 'preloader.boot.renderer', fallback: 'init renderer' },
  { at: 30, key: 'preloader.boot.fonts', fallback: 'load typefaces — cinzel, epilogue' },
  { at: 55, key: 'preloader.boot.shader', fallback: 'compile ink shader — 1 draw call' },
  { at: 80, key: 'preloader.boot.content', fallback: 'hydrate evidence' },
  { at: 100, key: 'preloader.boot.action', fallback: 'roll camera' },
]

/**
 * Title sequence — the load is theatre (assets are tiny), so it behaves like
 * one: boot log, wordmark reveal, hairline progress. Click anywhere to skip.
 *
 * It is an overlay, not a gate: the page is fully rendered underneath it, both
 * on the server and in the DOM. Previously it replaced the page until it
 * finished, which left crawlers with "Loading experience / 0% / Stand by" as
 * the entire document.
 */
export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useTranslation()
  const progress = useFakeProgress(onComplete)

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.7, ease: APPLE_EASE },
        }}
        onClick={onComplete}
        className="fixed inset-0 z-[99999] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-background text-foreground"
        // The page beneath is the real document; this is decoration over it.
        aria-hidden="true"
        aria-label={t('preloader.skip', 'Loading — click to skip')}
      >
        <m.div
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: APPLE_EASE } }}
          className="container relative z-10 flex h-full w-full max-w-350 flex-col justify-between px-6 py-12 md:py-24"
        >
          <div className="flex w-full items-start justify-between font-mono text-[11px] uppercase tracking-widest opacity-40">
            <span>{t('preloader.loading')}</span>
            <span>2026</span>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            {/* Wordmark — masked line reveal, same grammar as the hero.
                A <div>, not an <h1>: the hero owns the page's only h1, and the
                overlay must not add a second one. */}
            <div className="overflow-hidden">
              <m.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.05 }}
                className="text-center font-serif text-4xl font-light leading-tight tracking-tight text-foreground md:text-6xl"
              >
                Eduardo Inerarte
              </m.div>
            </div>
            <div className="overflow-hidden">
              <m.p
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.15 }}
                className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-primary"
              >
                {t('preloader.role', 'A Living Portfolio')}
              </m.p>
            </div>

            <div className="relative mt-12 h-px w-full max-w-xs overflow-hidden bg-foreground/10">
              <m.div
                className="absolute left-0 top-0 h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Boot log */}
            <div
              className="mt-8 flex h-24 flex-col items-center gap-1.5 font-mono text-[10px] tracking-wider text-foreground/45"
              aria-hidden="true"
            >
              {BOOT_STEPS.filter((step) => progress >= step.at).map((step) => (
                <m.span
                  key={step.key}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: APPLE_EASE }}
                >
                  <span className="text-primary">▸</span> {t(step.key, step.fallback)}
                  <span className="text-foreground/30"> — ok</span>
                </m.span>
              ))}
            </div>
          </div>

          <div className="flex w-full items-end justify-between font-mono text-[11px] uppercase tracking-widest opacity-40">
            <span>{progress}%</span>
            <span className="text-primary">{t('preloader.standby')}</span>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>
  )
}

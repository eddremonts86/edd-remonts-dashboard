import { m, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InkCanvas } from '@/portfolio/components/gl/InkCanvas'
import { MagneticButton } from '@/portfolio/components/ui/effects/MagneticButton'
import { MorphingIcon } from '@/portfolio/components/ui/icons/MorphingIcon'
import {
  ARROW_DOWN,
  ARROW_DOWN_TO_LINE,
  ARROW_RIGHT,
  FILE_TEXT,
} from '@/portfolio/components/ui/icons/morphIconNodes'
import { TiltCard } from '@/portfolio/components/ui/effects/TiltCard'
import { LanguageSelector } from '@/portfolio/components/ui/navigation/LanguageSelector'
import { ThemeToggle } from '@/portfolio/components/ui/navigation/ThemeToggle'
import { useHeroParallax } from '@/portfolio/hooks/useHeroParallax'
import { useResolvedTheme } from '@/portfolio/hooks/useResolvedTheme'
import { getCvUrl } from '@/portfolio/lib/cvUrl'
import { getHoverColors } from '@/portfolio/lib/hoverColors'
import { APPLE_EASE } from '@/portfolio/lib/motion'
import { AmbientLight } from './AmbientLight'
import { AvailabilityCard } from './AvailabilityCard'
import { BackgroundReveal } from './BackgroundReveal'
import { ScrollIndicator } from './ScrollIndicator'

export const HeroSection = () => {
  const { t, i18n } = useTranslation()
  const resolvedTheme = useResolvedTheme()
  const containerRef = useRef<HTMLElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [exploreHovered, setExploreHovered] = useState(false)
  const [cvHovered, setCvHovered] = useState(false)

  const cvUrl = getCvUrl(i18n.language, resolvedTheme)
  const { opacity, scale, y } = useHeroParallax(containerRef)

  const dynamicBG = resolvedTheme === 'dark' ? '/edd/edd_dark.jpg' : '/edd/edd_light.jpg'

  const { bgColor, textColor } = getHoverColors(isHovered, resolvedTheme)

  return (
    <section
      // NAV_SECTIONS lists 'hero' as the first dot; without this id the dot
      // navigation and the ⌘K "Go to: Home" entry pointed at nothing.
      id="hero"
      ref={containerRef}
      className={`relative flex min-h-svh flex-col overflow-hidden transition-colors duration-1000 ${bgColor}`}
    >
      {/* Living ink shot — CSS blobs stay underneath as the no-WebGL fallback */}
      <AmbientLight hidden={isHovered} />
      <div className="absolute inset-0" aria-hidden="true">
        <InkCanvas
          interactive
          quality={0.7}
          inkAmount={0.7}
          accentAmount={0.5}
          hidden={isHovered}
        />
      </div>

      <AnimatePresence>
        {isHovered && <BackgroundReveal src={dynamicBG} theme={resolvedTheme} />}
      </AnimatePresence>

      {/* ── Top utility row ──────────────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: APPLE_EASE }}
        className={`absolute inset-x-0 top-6 z-50 flex items-center justify-end px-6 transition-colors duration-700 lg:top-10 lg:px-12 ${textColor}`}
      >
        <div className="flex items-center gap-6">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </m.div>

      {/* ── Main grid ───────────────────────────────────────────────────── */}
      {/* Two elements on purpose: the outer one owns the flex centring, the
          inner one owns the measure. Tailwind's `container` class inside the
          hero's flex column did not resolve to the same width as every other
          section, which pushed the hero text 36px right of the page's line. */}
      <m.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex w-full flex-1 items-center py-28 md:py-32"
      >
        <div className="mx-auto grid w-full max-w-[1500px] gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
          {/* ── LEFT column ─ identity + role + description + CTAs ──────── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker */}
            <div className="overflow-hidden mb-4">
              <m.p
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.15, duration: 0.9, ease: APPLE_EASE }}
                className={`font-mono text-[13px] font-medium uppercase tracking-[0.3em] transition-colors duration-700 md:text-[15px] text-primary`}
              >
                Eduardo Inerarte
              </m.p>
            </div>

            {/* Name & Role */}
            <h1
              onPointerEnter={() => setIsHovered(true)}
              onPointerLeave={() => setIsHovered(false)}
              className="mb-8 flex flex-col font-serif text-[10vw] font-light leading-[0.9] tracking-[-0.02em] text-foreground sm:text-[8vw] md:mb-10 lg:text-[clamp(4rem,6vw,7rem)] cursor-crosshair"
            >
              <div className="overflow-hidden">
                <m.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.05, ease: APPLE_EASE, delay: 0.3 }}
                  className="inline-block"
                >
                  {t('hero.titleLine1', 'Staff Frontend Engineer')}
                </m.span>
              </div>
              <div className="overflow-hidden">
                <m.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.05, ease: APPLE_EASE, delay: 0.42 }}
                  className="font-serif italic text-primary"
                >
                  {t('hero.titleLine2', '& Technical Leader')}
                </m.span>
              </div>
            </h1>

            {/* Description */}
            {/* Shortened Copy with 2-3 Outcome-Focused Highlights */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mb-10 max-w-xl text-left"
            >
              <p className="text-[16px] font-light leading-relaxed text-foreground/75 md:text-lg">
                {t(
                  'hero.tagline',
                  '18 years shipping interfaces where the proof is measurable — 100% Core Web Vitals, sub-12ms interactions, design systems adopted by 20+ engineers.',
                )}{' '}
                <span className="font-serif italic text-foreground">
                  {t('hero.taglineAccent', 'Everything below is live. Touch it.')}
                </span>
              </p>
            </m.div>

            {/* CTAs */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease: APPLE_EASE }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <a
                  href="#projects"
                  onPointerEnter={() => setExploreHovered(true)}
                  onPointerLeave={() => setExploreHovered(false)}
                  className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-foreground/30 bg-white px-6 py-3 text-[13px] font-medium uppercase tracking-widest text-zinc-950 transition-all duration-500 hover:bg-primary hover:text-white md:text-[15px]"
                >
                  <span>{t('hero.explore', 'View Work')}</span>
                  {/* The button scrolls down to the projects index, so on hover
                      the arrow turns to point where it actually goes. */}
                  <MorphingIcon icon={exploreHovered ? ARROW_DOWN : ARROW_RIGHT} size={14} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-subtle bg-surface/30 backdrop-blur-md px-6 py-3 text-[13px] font-medium uppercase tracking-widest text-foreground transition-all duration-500 hover:bg-surface/50 hover:border-default md:text-[15px]"
                  onPointerEnter={() => {
                    setIsHovered(true)
                    setCvHovered(true)
                  }}
                  onPointerLeave={() => {
                    setIsHovered(false)
                    setCvHovered(false)
                  }}
                >
                  <MorphingIcon icon={cvHovered ? ARROW_DOWN_TO_LINE : FILE_TEXT} size={14} />
                  <span>{t('nav.resume', 'Download CV')}</span>
                </a>
              </MagneticButton>
            </m.div>

            {/* Availability Info */}
            <AvailabilityCard />
          </div>

          {/* ── RIGHT column ─ Highlight Metrics Panel ────────────────── */}
          <m.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: APPLE_EASE }}
            className="lg:col-span-5 lg:self-center"
          >
            <TiltCard maxTilt={5} className="rounded-2xl">
              <div className="overflow-hidden rounded-2xl border border-subtle bg-surface/30 backdrop-blur-md shadow-lg p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <span className="font-mono text-[12px] uppercase tracking-[0.25em] text-foreground/72 font-bold">
                    {t('hero.metrics.title', '/ PROVEN PERFORMANCE METRICS')}
                  </span>
                  <span className="font-mono text-[12px] text-primary font-bold">
                    {t('hero.metrics.verified', '[VERIFIED]')}
                  </span>
                </div>

                {/* 2x2 Grid of High-Impact Metrics */}
                <div className="grid grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-1">
                    <p className="font-serif text-3xl font-light text-foreground md:text-4xl">
                      {t('hero.metrics.bundle.value', '94%')}
                    </p>
                    <p className="font-mono text-[12px] uppercase tracking-wider text-primary font-bold">
                      {t('hero.metrics.bundle.label', 'Bundle Reduction')}
                    </p>
                    <p className="text-[13px] text-foreground/72 font-light leading-relaxed font-display">
                      {t(
                        'hero.metrics.bundle.desc',
                        'Decoupled architectural boundaries from 6.2MB down to 350KB.',
                      )}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-serif text-3xl font-light text-foreground md:text-4xl">
                      {t('hero.metrics.delivery.value', '30%')}
                    </p>
                    <p className="font-mono text-[12px] uppercase tracking-wider text-primary font-bold">
                      {t('hero.metrics.delivery.label', 'Faster Delivery')}
                    </p>
                    <p className="text-[13px] text-foreground/72 font-light leading-relaxed font-display">
                      {t(
                        'hero.metrics.delivery.desc',
                        'Accelerated delivery via contract-based workspace isolation.',
                      )}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-serif text-3xl font-light text-foreground md:text-4xl">
                      {t('hero.metrics.vitals.value', '100%')}
                    </p>
                    <p className="font-mono text-[12px] uppercase tracking-wider text-primary font-bold">
                      {t('hero.metrics.vitals.label', 'Core Web Vitals')}
                    </p>
                    <p className="text-[13px] text-foreground/72 font-light leading-relaxed font-display">
                      {t(
                        'hero.metrics.vitals.desc',
                        'Secured flawless Lighthouse scores across complex user paths.',
                      )}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-serif text-3xl font-light text-foreground md:text-4xl">
                      {t('hero.metrics.impact.value', '20+')}
                    </p>
                    <p className="font-mono text-[12px] uppercase tracking-wider text-primary font-bold">
                      {t('hero.metrics.impact.label', 'Engineers Impacted')}
                    </p>
                    <p className="text-[13px] text-foreground/72 font-light leading-relaxed font-display">
                      {t(
                        'hero.metrics.impact.desc',
                        'Mentored engineers, governed design systems, and aligned teams.',
                      )}
                    </p>
                  </div>
                </div>

                <div className="border-t border-subtle pt-4 flex justify-between font-mono text-[12px] text-foreground/78">
                  <span>{t('hero.metrics.status', 'STATUS: MEASURED & REPORTED')}</span>
                  <span>{t('hero.metrics.engagement', 'ENGAGEMENT: FULL-TIME')}</span>
                </div>
              </div>
            </TiltCard>
          </m.aside>
        </div>
      </m.div>

      <ScrollIndicator
        label={t('hero.scroll', 'Scroll')}
        isHovered={isHovered}
        theme={resolvedTheme}
      />
    </section>
  )
}

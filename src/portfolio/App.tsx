import { AnimatePresence, domMax, LazyMotion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { AboutSection } from './components/about/AboutSection'
import { EngineeringAuthoritySection } from './components/authority/EngineeringAuthoritySection'
import { ExperienceTimeline } from './components/experience/ExperienceTimeline'
import { Footer } from './components/footer/Footer'
import { HeroSection } from './components/hero/HeroSection'
import { SkillsMarquee } from './components/skills/SkillsMarquee'
import { BusinessImpact } from './components/stats/BusinessImpact'
import { StatsCounter } from './components/stats/StatsCounter'
import { TestimonialBlock } from './components/testimonials/TestimonialBlock'
import { MouseFollower } from './components/ui/layout/MouseFollower'
import { Preloader } from './components/ui/layout/Preloader'
import { SEO } from './components/ui/layout/SEO'
import { CommandPalette } from './components/ui/navigation/CommandPalette'
import { DotNavigation } from './components/ui/navigation/DotNavigation'
import { StickyNav } from './components/ui/navigation/StickyNav'
import { useTitleSequence } from './hooks/useTitleSequence'

/* ── Below-fold sections — code-split for faster initial load ── */
const ProjectsGallery = lazy(() =>
  import('./components/projects/ProjectsGallery').then((m) => ({ default: m.ProjectsGallery })),
)
const LabSection = lazy(() =>
  import('./components/lab/LabSection').then((m) => ({ default: m.LabSection })),
)
const BuildLogSection = lazy(() =>
  import('./components/buildlog/BuildLogSection').then((m) => ({ default: m.BuildLogSection })),
)
const ContactSection = lazy(() =>
  import('./components/contact/ContactSection').then((m) => ({ default: m.ContactSection })),
)

export function App() {
  const { t } = useTranslation()
  const [booting, finishBooting] = useTitleSequence()

  return (
    <LazyMotion features={domMax} strict>
      {/* The page renders unconditionally, on the server too. The title
          sequence is an overlay on top of it, never a replacement for it —
          gating on `loading` used to make the server-rendered document
          nothing but "Loading experience / 0% / Stand by". */}
      <div className="min-h-screen bg-background text-foreground">
        <SEO />
        <a href="#content" className="skip-to-content">
          {t('a11y.skipToContent', 'Skip to content')}
        </a>
        <MouseFollower />
        <CommandPalette />
        <StickyNav />
        <DotNavigation />

        {/* Evidence-first running order: work and the playground lead;
            biography and process follow. */}
        <main id="content">
          <HeroSection />
          <StatsCounter />

          <Suspense fallback={null}>
            <ProjectsGallery />
          </Suspense>

          <Suspense fallback={null}>
            <LabSection />
          </Suspense>

          <Suspense fallback={null}>
            <BuildLogSection />
          </Suspense>

          <BusinessImpact />
          <AboutSection />
          <EngineeringAuthoritySection />
          <SkillsMarquee />
          <ExperienceTimeline />
          <TestimonialBlock />

          <Suspense fallback={null}>
            <ContactSection />
          </Suspense>
        </main>
        <Footer />
      </div>

      <AnimatePresence>
        {booting && <Preloader key="preloader" onComplete={finishBooting} />}
      </AnimatePresence>
    </LazyMotion>
  )
}

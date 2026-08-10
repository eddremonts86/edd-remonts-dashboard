import { AnimatePresence, domMax, LazyMotion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { AboutSection } from './components/about/AboutSection'
import { EngineeringAuthoritySection } from './components/authority/EngineeringAuthoritySection'
import { ExperienceTimeline } from './components/experience/ExperienceTimeline'
import { Footer } from './components/footer/Footer'
import { HeroSection } from './components/hero/HeroSection'
import { ServicesSection } from './components/services/ServicesSection'
import { SkillsMarquee } from './components/skills/SkillsMarquee'
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

          {/* Two sections deliberately left off the landing. Their components
              stay in the tree, intact, for a future standalone route:
                - components/lab/       the interaction experiments
                - components/buildlog/  the "learning in public" commit log
              Both are process, not evidence; a founder scanning for 60 seconds
              is looking for outcomes. */}

          {/* BusinessImpact removed: it restated the same four metrics a third
              time, after the story panels and the index rows. */}
          <AboutSection />
          <EngineeringAuthoritySection />
          <SkillsMarquee />
          <ExperienceTimeline />
          <TestimonialBlock />
          {/* The bridge from "this is impressive" to "let's talk": it sits
              after the proof and immediately before the ask. */}
          <ServicesSection />

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

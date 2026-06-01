import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
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
import { DotNavigation } from './components/ui/navigation/DotNavigation'
import { StickyNav } from './components/ui/navigation/StickyNav'

/* ── Below-fold sections — code-split for faster initial load ── */
const ProjectsGallery = lazy(() =>
  import('./components/projects/ProjectsGallery').then((m) => ({ default: m.ProjectsGallery })),
)
const ContactSection = lazy(() =>
  import('./components/contact/ContactSection').then((m) => ({ default: m.ContactSection })),
)

export function App() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <m.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-background text-foreground"
          >
            <SEO />
            <a href="#content" className="skip-to-content">
              {t('a11y.skipToContent', 'Skip to content')}
            </a>
            <MouseFollower />
            <StickyNav />
            <DotNavigation />

            <main id="content">
              <HeroSection />
              <BusinessImpact />
              <AboutSection />
              <SkillsMarquee />

              <Suspense fallback={null}>
                <ProjectsGallery />
              </Suspense>

              <StatsCounter />
              <EngineeringAuthoritySection />
              <ExperienceTimeline />
              <TestimonialBlock />

              <Suspense fallback={null}>
                <ContactSection />
              </Suspense>
            </main>
            <Footer />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

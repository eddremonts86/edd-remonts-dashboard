import { AnimatePresence, m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext'
import { useCarousel } from '@/portfolio/hooks/useCarousel'
import { Section, Container } from '../ui/layout/Section'
import { CarouselControls } from './CarouselControls'
import { TestimonialSlide } from './TestimonialSlide'

export const TestimonialBlock = () => {
  const { t } = useTranslation()
  const { testimonials, isLoading } = usePortfolioData()

  const { currentIndex, direction, setIsPaused, paginate, handleGoto } = useCarousel(
    testimonials.length,
  )

  // While data is still loading from the DB, render nothing
  if (isLoading) return null

  // When the DB has no testimonials, hide the section entirely
  if (testimonials.length === 0) return null

  const safeIndex = currentIndex >= 0 && currentIndex < testimonials.length ? currentIndex : 0
  const currentTestimonial = testimonials[safeIndex]

  return (
    <Section className="border-y border-subtle bg-background">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/2 h-150 w-150 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-3xl dark:bg-primary/[0.04]" />
        <div className="absolute -right-40 top-1/2 h-125 w-125 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-3xl dark:bg-primary/[0.03]" />
      </div>

      <Container className="max-w-2xl mx-auto">
        {/* Eyebrow */}
        <m.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center font-mono text-xs uppercase tracking-[0.25em] text-foreground/35"
        >
          {t('testimonials_label', 'What clients say')}
        </m.p>

        {/* Content area */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Static decorative " — stays fixed while slides change */}
          <m.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-6 select-none font-serif text-[9rem] leading-none text-primary/[0.07] md:-left-4 md:-top-10 md:text-[13rem]"
          >
            &#8220;
          </m.span>

          {/* Slide — content-driven height, no overflow-hidden */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <TestimonialSlide
              key={currentTestimonial.author}
              testimonial={currentTestimonial}
              direction={direction}
            />
          </AnimatePresence>
        </div>

        <CarouselControls
          total={testimonials.length}
          current={currentIndex}
          onPrev={() => paginate(-1)}
          onNext={() => paginate(1)}
          onGoto={handleGoto}
        />
      </Container>
    </Section>
  )
}

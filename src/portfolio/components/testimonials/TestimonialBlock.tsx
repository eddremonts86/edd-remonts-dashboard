import { AnimatePresence, m } from 'framer-motion';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCarousel } from '@/portfolio/hooks/useCarousel';
import { CarouselControls } from './CarouselControls';
import { TestimonialSlide } from './TestimonialSlide';

export const TestimonialBlock = () => {
  const { t } = useTranslation();

  const rawTestimonials = t('testimonials', { returnObjects: true });
  const testimonials = useMemo(
    () => (Array.isArray(rawTestimonials) ? rawTestimonials : []),
    [rawTestimonials],
  );

  const { currentIndex, direction, setIsPaused, paginate, handleGoto } = useCarousel(
    testimonials.length,
  );

  if (testimonials.length === 0) {
    return (
      <div className="text-foreground/50 flex justify-center py-24 text-sm">
        {t('testimonials_loading')}
      </div>
    );
  }

  const safeIndex = currentIndex >= 0 && currentIndex < testimonials.length ? currentIndex : 0;
  const currentTestimonial = testimonials[safeIndex];

  return (
    <section className="relative overflow-hidden border-y border-subtle bg-background py-24 md:py-32">
      <div className="container relative z-10 mx-auto max-w-[1200px] px-6">
        <div
          className="flex flex-col items-center text-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <m.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 block font-serif text-8xl leading-[0] text-primary opacity-20"
          >
            "
          </m.span>

          <div className="relative mx-auto flex min-h-[350px] w-full max-w-4xl items-center justify-center overflow-hidden md:min-h-[220px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <TestimonialSlide testimonial={currentTestimonial} direction={direction} />
            </AnimatePresence>
          </div>

          <CarouselControls
            total={testimonials.length}
            current={currentIndex}
            onPrev={() => paginate(-1)}
            onNext={() => paginate(1)}
            onGoto={handleGoto}
          />
        </div>
      </div>
    </section>
  );
};

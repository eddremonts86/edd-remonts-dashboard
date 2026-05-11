import { m } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CarouselControls = ({
  total,
  current,
  onPrev,
  onNext,
  onGoto,
}: {
  total: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onGoto: (idx: number) => void;
}) => {
  const { t } = useTranslation();

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-12 flex items-center justify-center gap-6 md:mt-16"
    >
      <button
        onClick={onPrev}
        className="text-foreground/50 hover:border-foreground/30 hover:bg-foreground/5 focus:ring-primary/50 flex h-10 w-10 items-center justify-center rounded-full border border-subtle transition-all duration-300 hover:text-foreground focus:outline-none focus:ring-2"
        aria-label={t('a11y.prevTestimonial')}
      >
        <ChevronLeft className="ml-[-1px] h-4 w-4" />
      </button>
      <div className="flex gap-3">
        {Array.from({ length: total }, (_, idx) => (
          <button
            key={`dot-${idx}`}
            onClick={() => onGoto(idx)}
            className={`h-2 rounded-full transition-all duration-500 focus:outline-none ${
              idx === current ? 'w-6 bg-primary' : 'bg-foreground/10 hover:bg-foreground/30 w-2'
            }`}
            aria-label={t('a11y.gotoTestimonial', { number: idx + 1 })}
          />
        ))}
      </div>
      <button
        onClick={onNext}
        className="text-foreground/50 hover:border-foreground/30 hover:bg-foreground/5 focus:ring-primary/50 flex h-10 w-10 items-center justify-center rounded-full border border-subtle transition-all duration-300 hover:text-foreground focus:outline-none focus:ring-2"
        aria-label={t('a11y.nextTestimonial')}
      >
        <ChevronRight className="mr-[-1px] h-4 w-4" />
      </button>
    </m.div>
  );
};

import { m } from 'framer-motion';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: { z: 0, x: 0, opacity: 1, filter: 'blur(0px)' },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    filter: 'blur(4px)',
  }),
};

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const TestimonialSlide = ({
  testimonial,
  direction,
}: {
  testimonial: Testimonial;
  direction: number;
}) => (
  <m.div
    key={testimonial.author}
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      filter: { duration: 0.4 },
    }}
    className="absolute flex w-full flex-col items-center px-4"
  >
    <blockquote className="mb-10 font-serif text-xl font-light italic leading-[1.5] tracking-tight text-foreground md:text-3xl lg:text-4xl">
      {testimonial?.quote}
    </blockquote>
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium tracking-wide text-foreground">{testimonial?.author}</p>
      <p className="text-foreground/50 font-mono text-xs uppercase tracking-widest">
        {testimonial?.role}
      </p>
    </div>
  </m.div>
);

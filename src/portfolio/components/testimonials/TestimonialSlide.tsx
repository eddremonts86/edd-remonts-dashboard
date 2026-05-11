import { m } from 'framer-motion';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    filter: 'blur(8px)',
  }),
  center: { x: 0, opacity: 1, filter: 'blur(0px)' },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    filter: 'blur(8px)',
  }),
};

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  /** URL to a photo. If absent, initials are shown instead. */
  avatar?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-11 w-11 rounded-full object-cover ring-2 ring-subtle ring-offset-2 ring-offset-background"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold tracking-wide text-primary ring-2 ring-subtle ring-offset-2 ring-offset-background"
    >
      {getInitials(name)}
    </div>
  );
}

export const TestimonialSlide = ({
  testimonial,
  direction,
}: {
  testimonial: Testimonial;
  direction: number;
}) => (
  <m.div
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.38 },
      filter: { duration: 0.38 },
    }}
    className="flex flex-col items-center pt-6 pb-2 text-center"
  >
    {/* Quote text — the hero */}
    <blockquote className="mb-10 max-w-[62ch] font-serif text-xl font-light italic leading-[1.65] tracking-tight text-foreground md:text-2xl lg:text-[1.65rem]">
      {testimonial.quote}
    </blockquote>

    {/* Attribution — staggered entry after the quote enters */}
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22, duration: 0.4, ease: 'easeOut' }}
      className="flex items-center gap-3"
    >
      <Avatar name={testimonial.author} src={testimonial.avatar} />
      <div className="text-left">
        <p className="text-sm font-semibold tracking-wide text-foreground">
          {testimonial.author}
        </p>
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
          {testimonial.role}
        </p>
      </div>
    </m.div>
  </m.div>
);

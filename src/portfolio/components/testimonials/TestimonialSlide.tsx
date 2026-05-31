import { m } from 'framer-motion';
import { ShieldCheck, CalendarRange, Workflow } from 'lucide-react';

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
  company?: string;
  avatar?: string;
}

// Map testimonial authors to dynamic, high-authority engineering context
function getTestimonialAuthority(author: string) {
  const name = author.toLowerCase();
  if (name.includes('warrer')) {
    return {
      relationship: 'Direct Architectural Sponsor',
      timeline: 'Collaborated 4 Years (2014 - 2018)',
      context: 'Microfrontend Core & Team Refinement at GiG',
    };
  }
  if (name.includes('braun')) {
    return {
      relationship: 'Collaborative Systems Delivery',
      timeline: 'Collaborated 3 Years (2015 - 2018)',
      context: 'Cross-functional API Synchronization & Core Pipelines',
    };
  }
  if (name.includes('torres')) {
    return {
      relationship: 'Full-Stack Collaboration Partner',
      timeline: 'Collaborated 2 Years (2012 - 2014)',
      context: 'Systems Integration & Mobile Layout Primitives',
    };
  }
  if (name.includes('kumar')) {
    return {
      relationship: 'Frontend Platform Alignment',
      timeline: 'Collaborated 4 Years (2014 - 2018)',
      context: 'Platform Migrations & Outsource Governance',
    };
  }
  return {
    relationship: 'Verified Technology Partner',
    timeline: 'Systems Sync',
    context: 'Core Platform Delivery',
  };
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
        className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-base font-semibold tracking-wide text-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
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
}) => {
  const authority = getTestimonialAuthority(testimonial.author);

  return (
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
      {/* Context Badge Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-primary">
          <ShieldCheck className="h-3 w-3" />
          {authority.relationship}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-subtle bg-surface px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-foreground/60">
          <CalendarRange className="h-3 w-3 text-primary animate-pulse" />
          {authority.timeline}
        </span>
      </div>

      {/* Quote text — the hero */}
      <blockquote className="mb-10 max-w-[62ch] font-serif text-xl font-light italic leading-[1.7] tracking-tight text-foreground md:text-2xl lg:text-[1.75rem]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Verification platform detail */}
      <div className="mb-8 font-mono text-[10px] text-foreground/60 flex items-center gap-1.5 justify-center">
        <Workflow className="h-3 w-3 text-primary" />
        <span>Context: {authority.context}</span>
      </div>

      {/* Attribution — staggered entry after the quote enters */}
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.4, ease: 'easeOut' }}
        className="flex items-center gap-4 border-t border-subtle pt-6 w-full justify-center max-w-md"
      >
        <Avatar name={testimonial.author} src={testimonial.avatar} />
        <div className="text-left">
          <p className="text-base font-semibold tracking-wide text-foreground">
            {testimonial.author}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mt-0.5">
            {[testimonial.role, testimonial.company].filter(Boolean).join(' · ')}
          </p>
        </div>
      </m.div>
    </m.div>
  );
};

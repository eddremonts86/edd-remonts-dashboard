import { m } from 'framer-motion';
import { fadeInView } from '@/portfolio/lib/motion';
import { Activity, ShieldCheck, Zap, Layers } from 'lucide-react';

interface ImpactCard {
  id: string;
  metric: string;
  label: string;
  outcome: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const IMPACT_CARDS: ImpactCard[] = [
  {
    id: 'payload',
    metric: '42%',
    label: 'Payload Reduction',
    outcome: 'Engineered route sandboxing and dependency decoupling on an enterprise SaaS platform, slashing the initial bundle from 6.2MB to 350KB and improving LCP from 7.5s to 1.4s.',
    Icon: Layers,
  },
  {
    id: 'shipping',
    metric: '30%',
    label: 'Faster Shipping',
    outcome: 'Established shared component standards and governed frontend architecture contracts adopted by 20+ engineers across 4 business product teams.',
    Icon: ShieldCheck,
  },
  {
    id: 'latency',
    metric: 'Sub-12ms',
    label: 'Interaction Latency',
    outcome: 'Designed composite reactive layout states for a full-stack site assembler, isolating rendering mutations to leaves and maintaining a perfect 100% Core Web Vitals score.',
    Icon: Zap,
  },
  {
    id: 'throughput',
    metric: '98 Score',
    label: 'Performance Uptime',
    outcome: 'Built event-driven DOM memoization queues for a real-time logistics dashboard, handling 500+ updates/sec with zero frame drops while cutting server socket queries by 60%.',
    Icon: Activity,
  },
];

export const BusinessImpact = () => {
  return (
    <section
      id="impact"
      className="relative overflow-hidden border-b border-subtle bg-background py-24 md:py-36"
    >
      {/* Blueprint Grid Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[1.5%] bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-size-[32px_32px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <m.div
          {...fadeInView()}
          className="mb-20 max-w-3xl"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary font-bold block mb-4">
            / BUSINESS IMPACT
          </span>
          <h2 className="font-display text-4xl font-light tracking-tight md:text-5xl lg:text-7xl text-white leading-tight">
            Measurable <br />
            <span className="font-serif italic text-primary">Business Outcomes</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base font-light font-display">
            Technical excellence is relevant when it drives business value. Here is the concrete, verifiable operational and product impact delivered across enterprise scale applications.
          </p>
        </m.div>

        {/* 4-Column High-Contrast Outcomes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
          {IMPACT_CARDS.map((card, index) => {
            const Icon = card.Icon;
            return (
              <m.article
                key={card.id}
                {...fadeInView({ delay: index * 0.08 })}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-md flex flex-col justify-between transition-all duration-500 hover:border-primary/25 hover:shadow-[0_16px_36px_rgba(209,52,38,0.02)] hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 font-bold">
                      Outcome 0{index + 1}
                    </span>
                    <div className="p-1 rounded-lg border border-white/5 bg-zinc-950 text-white/40 group-hover:text-primary transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Large Metric */}
                  <p className="font-serif text-5xl font-light tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                    {card.metric}
                  </p>

                  {/* Context Label */}
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                    {card.label}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-6 text-xs leading-relaxed text-white/60 font-light font-display">
                  {card.outcome}
                </p>
              </m.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

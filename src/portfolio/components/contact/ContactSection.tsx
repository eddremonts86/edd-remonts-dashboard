import { ContactInfoItem } from '@/portfolio/components/ui/badges/ContactInfoItem';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { Mail, MapPin, Server, Clock, Activity, Cpu } from 'lucide-react';
import { useFormspree } from '@/portfolio/hooks/useFormspree';
import { FORMSPREE_FORM_ID } from '@/portfolio/lib/config';
import { ContactForm } from './ContactForm';
import { SuccessMessage } from './SuccessMessage';

export const ContactSection = () => {
  const { personalInfo } = usePortfolioData();
  const { status: formStatus, handleSubmit, reset } = useFormspree(FORMSPREE_FORM_ID);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#09090b] py-28 text-neutral-100 selection:bg-primary selection:text-white md:py-40 border-t border-white/5"
    >
      {/* Subtle blueprint grid fade into the void */}
      <div className="absolute inset-0 pointer-events-none opacity-[2%] bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-size-[32px_32px] mask-image-[linear-to-b,transparent,rgba(0,0,0,1)_30%,rgba(0,0,0,1)_70%,transparent]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-start">
          
          {/* Left Column: The Final Manifesto & Operational Telemetry Dashboard */}
          <m.div
            {...fadeInView({ distance: 30, axis: 'x' })}
            className="lg:col-span-7 space-y-12"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary font-bold block mb-4 animate-pulse">
                / COORDINATION CHANNEL
              </span>
              <h2 className="mb-6 font-display text-4xl font-light leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                The Final Act: <br />
                <span className="font-serif italic text-primary">Establish Connection</span>
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/50 font-light mt-4">
                Ready to coordinate operations? Initiate a secure direct payload connection or establish administrative channel synchronization.
              </p>
            </div>

            {/* High-Fidelity Interactive Telemetry Block */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[1%] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[12px_12px]" />
              
              {/* Telemetry Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/55">
                    Operational Telemetry
                  </span>
                </div>
                <div className="font-mono text-[8px] text-white/35">INSPECT: ACTIVE</div>
              </div>

              {/* Status details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-black/45 p-4 space-y-2">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1.5 font-bold">
                    <Server className="h-3 w-3 text-primary" />
                    OPERATIONAL STATUS
                  </span>
                  <span className="font-display text-sm font-semibold text-white block">
                    Operational & Available
                  </span>
                  <span className="font-mono text-[9px] text-white/35 block">
                    Current Load: STANDBY // Q3 2026 Ready
                  </span>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/45 p-4 space-y-2">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1.5 font-bold">
                    <Clock className="h-3 w-3 text-primary" />
                    COORDINATION TARGET
                  </span>
                  <span className="font-display text-sm font-semibold text-white block">
                    Copenhagen, DK
                  </span>
                  <span className="font-mono text-[9px] text-white/35 block">
                    TZ: Europe/Copenhagen (GMT+2)
                  </span>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/45 p-4 space-y-2">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1.5 font-bold">
                    <Activity className="h-3 w-3 text-primary animate-pulse" />
                    INPUT LATENCY
                  </span>
                  <span className="font-display text-sm font-semibold text-white block">
                    &lt; 12ms Response
                  </span>
                  <span className="font-mono text-[9px] text-white/35 block">
                    INP Spec: EXCELLENT // optimized latency
                  </span>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/45 p-4 space-y-2">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1.5 font-bold">
                    <Cpu className="h-3 w-3 text-primary" />
                    COMPLIANCE
                  </span>
                  <span className="font-display text-sm font-semibold text-white block">
                    100% Core Web Vitals
                  </span>
                  <span className="font-mono text-[9px] text-white/35 block">
                    Performance budget: fully verified
                  </span>
                </div>
              </div>
            </div>

            {/* Location & Timezone context - Sleek Vertical Stack to avoid overlap */}
            <div className="flex flex-col gap-6 max-w-xl">
              <ContactInfoItem
                icon={Mail}
                label="Direct channel"
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
              />
              <ContactInfoItem
                icon={MapPin}
                label="COORDINATION POINT"
                value="Copenhagen, DK · 55.6761° N"
              />
            </div>
          </m.div>

          {/* Right Column: High-fidelity Workspace Form */}
          <m.div
            {...fadeInView({ delay: 0.2 })}
            className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 p-8 text-white md:p-12 shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
          >
            {/* Glowing active node background */}
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                Establish Connection Node
              </span>
            </div>

            {formStatus === 'success' ? (
              <SuccessMessage onReset={reset} />
            ) : (
              <ContactForm status={formStatus} onSubmit={handleSubmit} />
            )}
          </m.div>
        </div>
      </div>
    </section>
  );
};

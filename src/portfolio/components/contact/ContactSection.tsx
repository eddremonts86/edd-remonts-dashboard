import { m } from 'framer-motion'
import { Mail, MapPin, Server, Cpu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext'
import { useFormspree } from '@/portfolio/hooks/useFormspree'
import { FORMSPREE_FORM_ID } from '@/portfolio/lib/config'
import { fadeInView } from '@/portfolio/lib/motion'
import { CopyButton } from '../ui/badges/CopyButton'
import { Section, Container } from '../ui/layout/Section'
import { ContactForm } from './ContactForm'
import { SuccessMessage } from './SuccessMessage'

export const ContactSection = () => {
  const { t } = useTranslation()
  const { personalInfo } = usePortfolioData()
  const { status: formStatus, handleSubmit, reset } = useFormspree(FORMSPREE_FORM_ID)

  return (
    <Section
      id="contact"
      className="text-foreground selection:bg-primary selection:text-primary-foreground"
    >
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-start">
          {/* Left Column: The Final Manifesto & Operational Telemetry Dashboard */}
          <m.div
            {...fadeInView({ distance: 30, axis: 'x' })}
            className="lg:col-span-7 space-y-12 relative"
          >
            {/* Cinematic text spotlight glow to dampen grid contrast and optimize readability */}
            <div className="absolute -left-16 -top-16 h-[120%] w-[120%] rounded-full bg-background/50 blur-[90px] pointer-events-none -z-10 dark:bg-background/80" />

            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary font-bold block mb-4 animate-pulse">
                {t('contact.eyebrow', '/ GET IN TOUCH')}
              </span>
              <h2 className="mb-6 font-display text-4xl font-light leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                {t('contact.title', "Let's Build")} <br />
                <span className="font-serif italic text-primary">
                  {t('contact.titleAccent', 'Something Together')}
                </span>
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-foreground/60 font-light mt-4 font-display">
                {t(
                  'contact.subtitle',
                  "Ready to discuss a project, hiring a Staff Engineer, or technical consulting? Send a message and let's start a conversation.",
                )}
              </p>
            </div>

            {/* High-Fidelity Engagement Target Parameters Block */}
            <div className="rounded-2xl border border-subtle bg-surface/30 p-6 backdrop-blur-md relative overflow-hidden select-none">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-subtle pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/60">
                    {t('contact.params.title', 'Hiring & Engagement Parameters')}
                  </span>
                </div>
                <div className="font-mono text-[8px] text-foreground/60">
                  {t('contact.params.status', 'STATUS: AVAILABLE')}
                </div>
              </div>

              {/* Status details - High-fidelity grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-subtle bg-surface/40 p-4 space-y-2 hover:border-primary/30 hover:bg-surface/50 transition-all duration-300">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1.5 font-bold">
                    <Server className="h-3 w-3 text-primary animate-pulse" />
                    {t('contact.params.avail.label', 'AVAILABILITY STATUS')}
                  </span>
                  <span className="font-display text-sm font-semibold text-foreground block">
                    {t('contact.params.avail.value', 'Active & Ready')}
                  </span>
                  <span className="font-mono text-[9px] text-foreground/60 block">
                    {t('contact.params.avail.sub', 'Immediate Q3 2026 Engagement')}
                  </span>
                </div>

                <div className="rounded-xl border border-subtle bg-surface/40 p-4 space-y-2 hover:border-primary/30 hover:bg-surface/50 transition-all duration-300">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1.5 font-bold">
                    <MapPin className="h-3 w-3 text-primary" />
                    {t('contact.params.geo.label', 'GEOGRAPHY & MODE')}
                  </span>
                  <span className="font-display text-sm font-semibold text-foreground block">
                    {t('contact.params.geo.value', 'Copenhagen, DK')}
                  </span>
                  <span className="font-mono text-[9px] text-foreground/60 block">
                    {t('contact.params.geo.sub', 'EU Remote-Friendly (GMT+2/1)')}
                  </span>
                </div>

                <div className="rounded-xl border border-subtle bg-surface/40 p-4 space-y-2 sm:col-span-2 hover:border-primary/30 hover:bg-surface/50 transition-all duration-300">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1.5 font-bold">
                    <Cpu className="h-3 w-3 text-primary" />
                    {t('contact.params.roles.label', 'PREFERRED TARGET ROLES')}
                  </span>
                  <span className="font-display text-sm font-semibold text-foreground block">
                    {t(
                      'contact.params.roles.value',
                      'Staff Engineer · Technical Leader · Frontend Architect · Systems Consultant',
                    )}
                  </span>
                  <span className="font-mono text-[9px] text-foreground/60 block">
                    {t(
                      'contact.params.roles.sub',
                      'Specialized in enterprise-SaaS scaling and platform decoupling',
                    )}
                  </span>
                </div>

                {/* mailto for people who use a mail client, copy for everyone
                    else — the address should never be a manual transcription. */}
                <div className="relative rounded-xl border border-subtle bg-surface/40 transition-all duration-300 hover:border-primary/45 hover:bg-primary/3 group">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="block space-y-2 p-4 pr-14 cursor-pointer"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1.5 font-bold group-hover:text-primary transition-colors">
                      <Mail className="h-3 w-3 text-primary transition-transform group-hover:scale-110" />
                      {t('contact.params.emailLabel', 'Direct Email')}
                    </span>
                    <span className="font-display text-sm font-semibold text-foreground block truncate group-hover:text-primary transition-colors">
                      {personalInfo.email}
                    </span>
                    <span className="font-mono text-[9px] text-foreground/60 block group-hover:text-foreground/75 transition-colors">
                      {t('contact.form.target', 'Initiate Connection')}
                    </span>
                  </a>
                  <CopyButton
                    value={personalInfo.email}
                    label={t('contact.copyEmail', 'Copy email address')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-surface/80 backdrop-blur-sm"
                  />
                </div>

                <div className="rounded-xl border border-subtle bg-surface/40 p-4 space-y-2 hover:border-primary/30 hover:bg-surface/50 transition-all duration-300">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-primary flex items-center gap-1.5 font-bold">
                    <MapPin className="h-3 w-3 text-primary" />
                    {t('contact.params.locationLabel', 'Location')}
                  </span>
                  <span className="font-display text-sm font-semibold text-foreground block">
                    {t('contact.params.locationValue', 'Copenhagen, Denmark')}
                  </span>
                  <span className="font-mono text-[9px] text-foreground/60 block">
                    {t('contact.params.locationLabel', 'Location')}
                  </span>
                </div>
              </div>
            </div>
          </m.div>

          {/* Right Column: High-fidelity Workspace Form */}
          <m.div
            {...fadeInView({ delay: 0.2 })}
            className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-surface/30 border border-subtle p-8 text-foreground md:p-12 shadow-lg"
          >
            {/* Glowing active node background */}
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="flex items-center gap-2 mb-8 border-b border-subtle pb-4">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                {t('contact.sendMsg', 'Send a Message')}
              </span>
            </div>

            {formStatus === 'success' ? (
              <SuccessMessage onReset={reset} />
            ) : (
              <ContactForm status={formStatus} onSubmit={handleSubmit} />
            )}
          </m.div>
        </div>
      </Container>
    </Section>
  )
}

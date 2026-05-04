import { ContactInfoItem } from '@/portfolio/components/ui/badges/ContactInfoItem';
import { StatusBadge } from '@/portfolio/components/ui/badges/StatusBadge';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFormspree } from '@/portfolio/hooks/useFormspree';
import { FORMSPREE_FORM_ID } from '@/portfolio/lib/config';
import { ContactForm } from './ContactForm';
import { SuccessMessage } from './SuccessMessage';

export const ContactSection = () => {
  const { t } = useTranslation();
  const { personalInfo } = usePortfolioData();
  const { status: formStatus, handleSubmit, reset } = useFormspree(FORMSPREE_FORM_ID);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-foreground py-24 text-background selection:bg-primary selection:text-white md:py-32"
    >
      {/* Subtle Abstract Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03]">
        <h2 className="whitespace-nowrap text-[25vw] font-black uppercase leading-none tracking-tighter text-inherit">
          {t('nav.contact')}
        </h2>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 md:gap-24 lg:grid-cols-2">
          {/* Left Column: Info */}
          <m.div
            {...fadeInView({ distance: 30, axis: 'x' })}
            className="flex flex-col justify-center"
          >
            <div className="mb-12">
              <StatusBadge
                label={t('hero.available', 'Available for new opportunities')}
                className="border-background/20 bg-background/5 text-background/80 mb-8"
              />

              <h2 className="mb-6 text-5xl font-black uppercase leading-tight tracking-tighter text-background md:text-7xl lg:text-8xl">
                {t('contact.title')} <br />
                <span className="text-primary">{t('contact.titleAccent')}</span>
              </h2>

              <p className="max-w-md font-body text-lg leading-relaxed opacity-80 md:text-xl">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="space-y-8 font-display">
              <ContactInfoItem
                icon={Mail}
                label={t('contact.info.emailLabel')}
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
              />
              <ContactInfoItem
                icon={MapPin}
                label={t('contact.info.locationLabel')}
                value={personalInfo.location}
              />
            </div>
          </m.div>

          {/* Right Column: Form */}
          <m.div
            {...fadeInView({ delay: 0.2 })}
            className="relative overflow-hidden rounded-2xl bg-background p-8 text-foreground shadow-2xl md:p-12 lg:p-14"
          >
            <div className="bg-primary/10 pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full blur-[100px]" />

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

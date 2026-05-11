import { useContentBlock } from '@/portfolio/hooks/useContentBlock';
import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FeatureCard } from './FeatureCard';
import { ScrollRevealText } from './ScrollRevealText';


export const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const { data: aboutIntro } = useContentBlock('about.intro');

  return (
    <section id="about" className="relative bg-surface py-24 md:py-40">
      <div className="container mx-auto max-w-[1400px] px-6">
        <ScrollRevealText text={aboutIntro?.[`value${i18n.language.charAt(0).toUpperCase() + i18n.language.slice(1)}`] || t('about.intro')} />

        <div className="mt-24 grid gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Left Column */}
          <div className="flex flex-col lg:col-span-4">
            <m.div {...fadeInView()} className="sticky top-32">
              <h2 className="mb-6 text-4xl font-light tracking-tight md:text-5xl lg:text-7xl">
                {t('about.titleAccent')}
                <br />
                <span className="font-serif italic text-primary">{t('about.title')}</span>
              </h2>
              <p className="text-foreground/40 font-mono text-sm uppercase tracking-widest">
                {t('about.servicesSub', 'Refined & Scalable')}
              </p>
            </m.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12 md:gap-16 lg:col-span-8">
            {/* TODO: Migrar features a la BD y consumirlos aquí. Por ahora, se mantienen estáticos o se puede hacer una consulta similar si se modelan como bloques. */}
            {[0,1,2].map((_, index) => (
              <FeatureCard key={index} icon={['users','rocket','zap'][index]} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

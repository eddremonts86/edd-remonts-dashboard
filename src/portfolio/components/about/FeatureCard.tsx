import { IconComponent } from '@/portfolio/components/ui/media/IconComponent';
import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const FeatureCard = ({ icon, index }: { icon: string; index: number }) => {
  const { t } = useTranslation();

  return (
    <m.div
      {...fadeInView({ delay: index * 0.15 })}
      className="group relative flex flex-col items-start gap-6 sm:flex-row md:gap-12"
    >
      <div className="mt-1 flex-shrink-0">
        <div className="text-foreground/50 group-hover:bg-primary/5 flex h-12 w-12 items-center justify-center rounded-full bg-foreground/[0.04] transition-all duration-700 group-hover:text-primary">
          <IconComponent
            name={icon}
            className="h-5 w-5 transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="relative z-10 flex-1 pb-12 transition-colors duration-700 md:pb-16">
        <div className="mb-4 flex items-baseline gap-4">
          <span className="text-foreground/30 font-mono text-xs transition-colors duration-700 group-hover:text-primary">
            0{index + 1}
          </span>
          <h3 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {t(`about.features.${index}.title`)}
          </h3>
        </div>
        <p className="text-foreground/70 max-w-2xl text-base font-light leading-relaxed md:text-lg">
          {t(`about.features.${index}.description`)}
        </p>
      </div>
    </m.div>
  );
};

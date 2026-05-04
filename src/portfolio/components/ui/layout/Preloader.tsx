import { AnimatePresence, m } from 'framer-motion';
import { APPLE_EASE } from '@/portfolio/lib/motion';
import { useTranslation } from 'react-i18next';
import { useFakeProgress } from '@/portfolio/hooks/useFakeProgress';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useTranslation();
  const progress = useFakeProgress(onComplete);

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 1.2, ease: APPLE_EASE, delay: 0.2 },
        }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-background text-foreground"
      >
        <m.div
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: APPLE_EASE } }}
          className="container relative z-10 flex h-full w-full max-w-[1400px] flex-col justify-between px-6 py-12 md:py-24"
        >
          <div className="flex w-full items-start justify-between font-mono text-[11px] uppercase tracking-widest opacity-40">
            <span>{t('preloader.loading')}</span>
            <span>2026</span>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            <m.div
              className="text-foreground/80 font-serif text-7xl font-light lowercase leading-none tracking-tight md:text-[8rem]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
            >
              {progress}%
            </m.div>
            <div className="bg-subtle relative mt-12 h-[1px] w-full max-w-xs overflow-hidden">
              <m.div
                className="absolute left-0 top-0 h-full bg-foreground"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <div className="flex w-full items-end justify-between font-mono text-[11px] uppercase tracking-widest opacity-40">
            <span>{t('preloader.standby')}</span>
            <span className="text-primary">Eduardo Inerarte</span>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>
  );
};

import { CodeBlock } from './CodeBlock';
import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const CodeShowcase = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden border-b border-subtle bg-background py-24 md:py-40">
      {/* Refined abstract background type */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-[0.02]">
        <h2 className="whitespace-nowrap text-center font-serif text-[25vw] italic leading-none tracking-tight text-foreground">
          craft.
        </h2>
      </div>

      <div className="container relative z-10 mx-auto max-w-[1400px] px-6">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Left: Refined typography */}
          <m.div {...fadeInView({ distance: 30, axis: 'x' })} className="lg:col-span-5">
            <div className="mb-10">
              <span className="mb-6 block font-mono text-[11px] uppercase tracking-widest text-primary">
                {t('codeShowcase.badge')}
              </span>
              <h2 className="break-words text-4xl font-light leading-[1.1] tracking-tight md:text-5xl lg:text-7xl">
                {t('codeShowcase.title')}
                <span className="mt-2 block font-serif italic text-primary">
                  {t('codeShowcase.titleAccent')}
                </span>
              </h2>
            </div>
            <p className="text-foreground/70 max-w-md text-sm font-light leading-relaxed md:text-base">
              {t('codeShowcase.description')}
            </p>
          </m.div>

          {/* Right: The CodeBlock in an elegant frame */}
          <m.div {...fadeInView({ delay: 0.2, distance: 40 })} className="lg:col-span-7">
            <div className="from-subtle relative rounded-2xl bg-gradient-to-b to-transparent p-1 shadow-2xl">
              <div className="overflow-hidden rounded-xl bg-[#101010] shadow-inner">
                <CodeBlock />
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

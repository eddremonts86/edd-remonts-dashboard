import { m } from 'framer-motion';

export const ScrollIndicator = ({
  label,
  isHovered,
  theme,
}: {
  label: string;
  isHovered: boolean;
  theme: 'light' | 'dark';
}) => {
  const isDarkHover = isHovered && theme === 'dark';
  const isLightHover = isHovered && theme === 'light';
  const trackColor = isDarkHover
    ? 'bg-white/20'
    : isLightHover
      ? 'bg-black/20'
      : 'bg-foreground/20';
  const thumbColor = isDarkHover ? 'bg-white' : isLightHover ? 'bg-black' : 'bg-primary';
  const textColor = isDarkHover
    ? 'text-white/60'
    : isLightHover
      ? 'text-black/60'
      : 'text-foreground/60';

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className={`absolute bottom-8 left-6 flex items-center gap-4 transition-colors duration-700 md:left-12 ${textColor}`}
    >
      <span
        className="text-xs font-bold tracking-widest uppercase rotate-180"
        style={{ writingMode: 'vertical-rl' }}
      >
        {label}
      </span>
      <div className={`h-16 w-[1px] overflow-hidden transition-colors duration-700 ${trackColor}`}>
        <m.div
          className={`h-1/2 w-full transition-colors duration-700 ${thumbColor}`}
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </m.div>
  );
};

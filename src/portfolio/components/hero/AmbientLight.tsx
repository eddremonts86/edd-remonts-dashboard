import { m } from 'framer-motion';

export const AmbientLight = ({ hidden }: { hidden: boolean }) => (
  <div
    className={`pointer-events-none absolute inset-0 overflow-hidden mix-blend-multiply transition-opacity duration-1000 dark:mix-blend-lighten ${hidden ? 'opacity-0' : 'opacity-40 dark:opacity-20'}`}
  >
    <m.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      className="bg-primary/10 absolute right-[-5%] top-[-10%] h-[70vw] w-[70vw] rounded-full blur-[120px]"
    />
    <m.div
      animate={{ opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      className="bg-secondary/10 absolute bottom-[-10%] left-[10%] h-[50vw] w-[50vw] rounded-full blur-[100px]"
    />
  </div>
);

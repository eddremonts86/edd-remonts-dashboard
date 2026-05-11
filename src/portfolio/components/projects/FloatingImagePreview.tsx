import { OptimizedImage } from '@/portfolio/components/ui/media/OptimizedImage';
import { type CvProject } from '@/portfolio/contexts/PortfolioDataContext';
import { APPLE_EASE } from '@/portfolio/lib/motion';
import { AnimatePresence, m, type MotionValue } from 'framer-motion';

type Project = CvProject;

export const FloatingImagePreview = ({
  project,
  cursorX,
  cursorY,
}: {
  project: Project | null;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}) => (
  <m.div
  aria-hidden="true"
    className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-[320px] w-[450px] overflow-hidden rounded-xl shadow-2xl lg:block"
    style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: project ? 1 : 0, scale: project ? 1 : 0.95 }}
    transition={{ duration: 0.5, ease: APPLE_EASE }}
  >
    <AnimatePresence mode="wait">
      {project && (
        <m.div
          key={project.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
          className="relative h-full w-full"
        >
          <OptimizedImage
            src={`/projects/${project.id}-md.webp`}
            alt={project.title}
            fallbackSrc={project.image}
            className="h-full w-full object-cover grayscale-0"
          />
        </m.div>
      )}
    </AnimatePresence>
  </m.div>
);

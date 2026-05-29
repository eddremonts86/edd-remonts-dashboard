import { m, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  /** Pull strength — 0 = no pull, 1 = cursor reaches center */
  strength?: number;
  className?: string;
}

/**
 * Wraps any child in a magnetic container that physically attracts toward
 * the cursor position. Creates tactile, "physical" button feedback.
 *
 * Uses spring physics for natural momentum — the element overshoots slightly
 * then settles, mimicking real mass.
 */
export const MagneticButton = ({
  children,
  strength = 0.38,
  className,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 320, damping: 26, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 320, damping: 26, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <m.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </m.div>
  );
};

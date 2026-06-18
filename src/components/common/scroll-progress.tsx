import type { FC } from 'react';
import { motion, useScroll } from 'motion/react';

/**
 * @description [en] Global vertical scroll progress indicator. A 1px column
 * pinned to the right edge that fills downward with the accent color as the
 * user scrolls. Driven by Motion's useScroll (no scroll listener), so it never
 * triggers React re-renders per frame.
 */
const ScrollProgress: FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 top-0 z-40 hidden h-screen w-px bg-border md:block"
    >
      <motion.div
        className="h-full w-full origin-top bg-accent"
        style={{ scaleY: scrollYProgress }}
      />
    </div>
  );
};

export default ScrollProgress;

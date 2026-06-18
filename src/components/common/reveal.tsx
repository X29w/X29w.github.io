import type { FC, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * @description [en] Scroll-reveal primitive. Items rise + fade as they enter the
 * viewport. Lightweight whileInView (no scroll listener, no GSAP). Reduced
 * motion still plays a softer reveal (smaller travel, faster) rather than
 * disappearing entirely — this page is itself a motion demo.
 */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'span' | 'p' | 'section';
  once?: boolean;
}

const Reveal: FC<RevealProps> = ({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
  once = true,
}) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const travel = reduce ? Math.min(8, y) : y;
  const duration = reduce ? 0.4 : 0.7;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;

import type { FC, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * @description [en] Scroll-reveal primitive. Items rise + fade as they enter the
 * viewport. Honors prefers-reduced-motion by rendering static. Lightweight
 * whileInView (no scroll listener, no GSAP) per taste-skill motion rules.
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

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;

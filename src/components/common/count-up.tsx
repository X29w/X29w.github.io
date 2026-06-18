import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * @description [en] Counts up to a target integer once it scrolls into view.
 * IntersectionObserver trigger, rAF easing, runs once. Reduced motion shows the
 * final value immediately.
 */
interface CountUpProps {
  value: number;
  className?: string;
  durationMs?: number;
}

const CountUp: FC<CountUpProps> = ({ value, className, durationMs = 1400 }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const start = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const step = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          setDisplay(Math.round(ease(progress) * value));
          if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [value, reduce, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default CountUp;

import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * @description [en] Decrypt / scramble reveal. Each character settles from random
 * glyphs to the final letter, left to right. Single rAF-driven interval, cleaned
 * up on unmount. Under reduced motion it renders the final text immediately.
 */
interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms before the effect starts */
  delay?: number;
  /** how fast characters settle (lower = faster) */
  speed?: number;
}

const GLYPHS = '!<>-_\\/[]{}=+*^?#01XAZ$%&';

const ScrambleText: FC<ScrambleTextProps> = ({ text, className, delay = 0, speed = 28 }) => {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? text : '');
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }

    const chars = text.split('');
    let settled = 0;

    const tick = () => {
      frameRef.current += 1;
      // Reveal one more character every few frames.
      if (frameRef.current % 2 === 0 && settled < chars.length) {
        settled += 1;
      }
      const out = chars
        .map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < settled) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');
      setDisplay(out);

      if (settled < chars.length) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    timeoutRef.current = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduce]);

  return <span className={className}>{display || '\u00A0'}</span>;
};

export default ScrambleText;

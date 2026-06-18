import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * @description [en] Decrypt / scramble reveal. Each character settles from random
 * glyphs to the final letter, left to right. Single rAF-driven interval, cleaned
 * up on unmount. Under reduced motion the effect still runs but faster, so users
 * who set the preference still get the headline reveal — just less drawn out.
 */
interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms before the effect starts */
  delay?: number;
}

const GLYPHS = '!<>-_\\/[]{}=+*^?#01XAZ$%&';

const ScrambleText: FC<ScrambleTextProps> = ({ text, className, delay = 0 }) => {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState('');
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const chars = text.split('');
    let settled = 0;
    // Reveal one char per N frames; reduce mode reveals 2x faster.
    const stride = reduce ? 1 : 2;

    const tick = () => {
      frameRef.current += 1;
      if (frameRef.current % stride === 0 && settled < chars.length) {
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
  }, [text, delay, reduce]);

  return <span className={className}>{display || '\u00A0'}</span>;
};

export default ScrambleText;

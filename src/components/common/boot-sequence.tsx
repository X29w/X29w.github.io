import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

/**
 * @description [en] Intro decode sequence. A brief full-screen "boot" overlay
 * that streams hex/log lines and a progress bar, then wipes away to reveal the
 * page. Real typography, not a fake terminal window. Skips instantly under
 * reduced motion or if already shown this session.
 */
const LINES = [
  'init renderer ............ ok',
  'compile shaders .......... ok',
  'load geometry ............ ok',
  'mount interface .......... ok',
  'establish uplink ......... ok',
];

const BootSequence: FC = () => {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem('boot-shown') === '1';
    } catch {
      alreadyShown = false;
    }

    if (alreadyShown) {
      setDone(true);
      return;
    }

    try {
      sessionStorage.setItem('boot-shown', '1');
    } catch {
      // ignore
    }

    // Lock scroll during boot.
    document.body.style.overflow = 'hidden';

    // Reduced motion gets a faster, less staggered version (still plays).
    const lineDelay = reduce ? 60 : 150;
    const totalMs = reduce ? 900 : 1500;

    const lineTimers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      lineTimers.push(setTimeout(() => setVisibleLines(i + 1), 100 + i * lineDelay));
    });

    let p = 0;
    const progressTimer = setInterval(() => {
      p = Math.min(100, p + Math.random() * 16 + 6);
      setProgress(Math.floor(p));
      if (p >= 100) clearInterval(progressTimer);
    }, reduce ? 50 : 90);

    const endTimer = setTimeout(() => {
      document.body.style.overflow = '';
      setDone(true);
    }, totalMs);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearInterval(progressTimer);
      clearTimeout(endTimer);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-50" />

          <div className="relative w-full max-w-md px-6 font-mono text-sm">
            <div className="mb-6 flex items-baseline justify-between">
              <span className="text-accent">x29://boot</span>
              <span className="text-muted">{progress}%</span>
            </div>

            <div className="space-y-1.5">
              {LINES.slice(0, visibleLines).map((line) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-muted"
                >
                  <span className="text-accent">{'>'}</span>
                  <span>{line}</span>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-px w-full bg-border">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;

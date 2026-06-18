import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * @description [en] Tiny self-typing code snippet HUD. Cycles through a few
 * real-shaped snippets (React, NestJS, Electron, RN) at a typewriter pace.
 * Under reduced motion the cycle still runs but the typing is faster and the
 * hold longer, so users keep the demo with a calmer cadence.
 */
const SNIPPETS: Array<{ tag: string; code: string }> = [
  {
    tag: 'react.tsx',
    code: `const App = () => {\n  return <Portfolio />\n}`,
  },
  {
    tag: 'nest.controller.ts',
    code: `@Controller('user')\nclass UserController {\n  @Get() find() {}\n}`,
  },
  {
    tag: 'electron.main.ts',
    code: `app.whenReady().then(() => {\n  createWindow()\n})`,
  },
  {
    tag: 'rn.screen.tsx',
    code: `<Screen>\n  <Animated.View />\n</Screen>`,
  },
];

const TYPE_MS = 32;
const HOLD_MS = 1800;

const CodeStream: FC = () => {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState('');

  useEffect(() => {
    let cancelled = false;
    const target = SNIPPETS[idx].code;
    // Reduced motion: type faster + linger longer.
    const typeMs = reduce ? 14 : TYPE_MS;
    const holdMs = reduce ? 3200 : HOLD_MS;
    let i = 0;

    const type = () => {
      if (cancelled) return;
      i += 1;
      setShown(target.slice(0, i));
      if (i < target.length) {
        timer = setTimeout(type, typeMs);
      } else {
        timer = setTimeout(() => {
          if (cancelled) return;
          setIdx((cur) => (cur + 1) % SNIPPETS.length);
        }, holdMs);
      }
    };

    let timer: ReturnType<typeof setTimeout> = setTimeout(type, 80);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [idx, reduce]);

  const snip = SNIPPETS[idx];

  return (
    <div className="flex flex-col gap-2 border border-border bg-background/70 p-4 font-mono text-[11px] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 text-[9px] uppercase tracking-[0.25em] text-muted">
        <span>// {snip.tag}</span>
        <span className="text-accent">●</span>
      </div>
      <pre className="m-0 whitespace-pre leading-[1.6] text-foreground/85">{shown}</pre>
    </div>
  );
};

export default CodeStream;

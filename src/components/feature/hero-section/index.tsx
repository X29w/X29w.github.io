import { useEffect, useState, type FC } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { IconArrowDownRight, IconTerminal2 } from '@tabler/icons-react';
import ParticleMorph from '@/components/common/particle-morph';
import ScrambleText from '@/components/common/scramble-text';
import Magnetic from '@/components/common/magnetic';
import CodeStream from '@/components/common/code-stream';

/**
 * @description [en] Immersive single-stage hero. The particle field is laid out
 * full-bleed across the section (anchored toward the right) instead of being
 * sandboxed in a column, so the whole viewport reads as one console. Floating
 * HUD modules (corner ticks, edge readouts, an auto-typing code snippet) sit on
 * top, and a live status bar runs along the bottom. Text content hugs the left
 * and is interleaved with the visuals — no hard left/right divider, no two-pane
 * feel. Reduced motion shows a settled static frame.
 */

const MORPH_WORDS = ['X29', '</>', '=>', '>_'];
const MORPH_MS = 2800;

// Map IANA time zones to display city names. Falls back to Tianjin when the
// browser does not expose a useful zone or it is unmapped.
const ZONE_TO_CITY: Record<string, string> = {
  'Asia/Shanghai': 'shanghai',
  'Asia/Beijing': 'beijing',
  'Asia/Chongqing': 'chongqing',
  'Asia/Harbin': 'harbin',
  'Asia/Urumqi': 'urumqi',
  'Asia/Hong_Kong': 'hong kong',
  'Asia/Macau': 'macau',
  'Asia/Taipei': 'taipei',
  'Asia/Tokyo': 'tokyo',
  'Asia/Seoul': 'seoul',
  'Asia/Singapore': 'singapore',
  'Asia/Bangkok': 'bangkok',
  'Asia/Jakarta': 'jakarta',
  'Asia/Kolkata': 'kolkata',
  'Asia/Dubai': 'dubai',
  'Europe/London': 'london',
  'Europe/Paris': 'paris',
  'Europe/Berlin': 'berlin',
  'America/New_York': 'new york',
  'America/Los_Angeles': 'los angeles',
  'America/Chicago': 'chicago',
  'America/Toronto': 'toronto',
  'Australia/Sydney': 'sydney',
};

const detectCity = (): string => {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zone && ZONE_TO_CITY[zone]) return ZONE_TO_CITY[zone];
    if (zone) {
      const tail = zone.split('/').pop();
      if (tail) return tail.replace(/_/g, ' ').toLowerCase();
    }
  } catch {
    // ignore
  }
  return 'tianjin';
};

const HeroSection: FC = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [wordIdx, setWordIdx] = useState(0);
  const [clock, setClock] = useState('');
  const [city, setCity] = useState('tianjin');

  const lines = [t('hero.lineOne'), t('hero.lineTwo'), t('hero.lineThree')];

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setWordIdx((i) => (i + 1) % MORPH_WORDS.length);
    }, MORPH_MS);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      setClock(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setCity(detectCity());
  }, []);

  const handleScrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden border-b border-border pt-16"
    >
      {/* layered backdrops */}
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 70% 50%, rgba(var(--accent-rgb),0.10), transparent 55%)',
        }}
      />

      {/* Full-bleed particle field — anchored toward the right on desktop. */}
      <div className="pointer-events-auto absolute inset-0 hidden md:block">
        <ParticleMorph centerX={0.68} centerY={0.5} scale={1.05} />
      </div>

      {/* Outer HUD corner ticks framing the whole section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-5 z-10 hidden md:block">
        <span className="hud-corner left-0 top-0 border-l-2 border-t-2" />
        <span className="hud-corner right-0 top-0 border-r-2 border-t-2" />
        <span className="hud-corner bottom-0 left-0 border-b-2 border-l-2" />
        <span className="hud-corner bottom-0 right-0 border-b-2 border-r-2" />
      </div>

      {/* Top HUD edge readouts */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-20 z-10 hidden items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted md:flex"
      >
        <span>render://particles</span>
        <span>fullstack.engineer</span>
        <span className="text-accent">live</span>
      </div>

      {/* Main content — text hugs the left, visuals breathe on the right */}
      <div className="shell relative z-10 flex flex-1 items-center">
        <div className="grid w-full grid-cols-1 items-center gap-12 py-12 md:grid-cols-12">
          <div className="flex flex-col md:col-span-7">
            {/* eyebrow + status */}
            <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 font-mono text-sm"
              >
                <IconTerminal2 className="h-4 w-4 text-accent" stroke={1.75} />
                <span className="text-accent">~/x29</span>
                <span className="text-muted">$</span>
                <span className="text-foreground">whoami</span>
              </motion.span>

              <motion.span
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2.5 font-mono text-xs tracking-wide text-foreground"
              >
                <span className="relative flex h-2 w-2">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {t('hero.available')}
              </motion.span>
            </div>

            <motion.span
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="label mb-5 block"
            >
              {t('hero.role')}
            </motion.span>

            <h1 className="font-display text-[clamp(2.5rem,7.5vw,6rem)] leading-[0.98] text-foreground">
              {lines.map((line, i) => (
                <span key={line} className="block">
                  <ScrambleText
                    text={line}
                    delay={300 + i * 230}
                    className={i === 1 ? 'text-accent' : undefined}
                  />
                  {i === lines.length - 1 && <span className="caret" aria-hidden="true" />}
                </span>
              ))}
            </h1>

            {/* Mobile particle slot — only shown when full-bleed layer is hidden */}
            <div className="relative mt-10 h-64 border border-border bg-surface/40 md:hidden">
              <ParticleMorph />
            </div>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-10 max-w-[52ch] font-mono text-sm leading-relaxed text-muted md:text-base"
            >
              <span className="text-accent">{'// '}</span>
              {t('hero.intro')}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="mt-10"
            >
              <Magnetic
                strength={0.3}
                onClick={handleScrollToWork}
                aria-label={t('hero.cta')}
                innerClassName="group inline-flex items-center gap-3 border border-accent bg-accent/[0.06] px-7 py-4 font-mono text-sm uppercase tracking-widest text-accent backdrop-blur-sm transition-colors duration-300 hover:bg-accent hover:text-background"
              >
                {t('hero.cta')}
                <IconArrowDownRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  stroke={1.75}
                />
              </Magnetic>
            </motion.div>
          </div>

          {/* Right column reserves space so text doesn't overlap the particles' formed glyph */}
          <div aria-hidden="true" className="hidden md:col-span-5 md:block" />
        </div>
      </div>

      {/* Floating HUD: auto-typing code snippet (right side, mid-low). Kept on
          lg+ only — at md the right column is already busy with the formed
          glyph and the code card crowds it. */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="pointer-events-auto absolute bottom-24 right-10 z-10 hidden w-[280px] lg:block"
      >
        <CodeStream />
      </motion.div>

      {/* Floating HUD: forming caption (top-right of the field) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-32 z-10 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted md:flex md:flex-col md:items-end md:gap-1"
      >
        <span>
          forming <span className="text-accent">{MORPH_WORDS[wordIdx].trim()}</span>
        </span>
        <span>drag to scatter</span>
      </div>

      {/* Live status bar */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="relative z-10 border-t border-border bg-background/60 backdrop-blur-sm"
      >
        <div className="shell flex h-9 items-center justify-between gap-4 overflow-hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
            <span className="text-accent">online</span>
            <span className="hidden sm:inline">/ {city}</span>
          </span>
          <span className="hidden md:inline">stack: react · ts · nest · electron · rn · taro</span>
          <span className="flex items-center gap-3">
            <span className="hidden sm:inline">local</span>
            <span className="tabular-nums text-foreground">{clock || '--:--:--'}</span>
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

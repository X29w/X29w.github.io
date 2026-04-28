import { useRef, useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '@/components/feature/project-card';
import { projects } from '@/utils/feature/constant';

/**
 * @description [en] Desktop projects layout — horizontal scroll driven by vertical scroll progress.
 * Card widths are viewport-relative (no max-w cap) so the total content width always
 * exceeds the viewport on any screen size, including 4K.
 */
const DesktopProjectsLayout: FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [sectionHeight, setSectionHeight] = useState('300vh');

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;

      // Force a layout read after any pending paint
      const contentWidth = el.scrollWidth;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const range = Math.max(0, contentWidth - vw);
      setScrollRange(range);

      // Section must be tall enough so the sticky panel can scroll through
      // the full horizontal range. Add 1.5× viewport height for breathing room.
      setSectionHeight(`${range + vh * 1.5}px`);
    };

    // Delay one frame so the flex layout has been painted
    const raf = requestAnimationFrame(measure);

    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -scrollRange]);
  const orbX = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      {/* Decorative orb */}
      <motion.div
        className="absolute top-1/3 -right-20 w-96 h-96 pointer-events-none"
        aria-hidden="true"
        style={{
          x: orbX,
          background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
          opacity: 0.04,
          filter: 'blur(100px)',
        }}
      />

      {/* Sticky panel — pins to viewport while section scrolls */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex items-stretch gap-[3vw] px-[6vw]"
          style={{ x }}
        >
          {/* Title card — always 28vw wide */}
          <div className="flex-shrink-0 flex flex-col justify-center w-[28vw]">
            <h2 className="text-[clamp(2.5rem,4vw,6rem)] font-bold text-foreground tracking-tight leading-none">
              {t('projects.title')}
            </h2>
            <div
              className="mt-6 h-px w-32"
              style={{
                background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary), transparent)',
              }}
            />
            <p className="mt-5 text-sm text-muted font-light tracking-wide max-w-xs">
              A selection of recent work
            </p>
          </div>

          {/* Project cards — each 30vw wide, no max-w cap */}
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative flex-shrink-0 w-[30vw] min-w-[280px]"
            >
              {/* Decorative number */}
              <span
                className="absolute -top-8 -left-2 text-8xl font-bold pointer-events-none select-none"
                aria-hidden="true"
                style={{
                  color: 'var(--accent)',
                  opacity: 0.05,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <ProjectCard
                titleKey={`projects.items.${project.translationIndex}.name`}
                descriptionKey={`projects.items.${project.translationIndex}.description`}
                detailKey={`projects.items.${project.translationIndex}.detail`}
                tags={project.tags}
                href={project.href}
                image={project.image}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DesktopProjectsLayout;

'use client';

import { useRef, useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import ProjectCard from '@/components/feature/project-card';
import { projects } from '@/utils/feature/constant';

/**
 * @description [zh-CN] 桌面端项目布局组件，水平滚动卡片展示
 * @description [en] Desktop projects layout component with horizontal scrolling card display
 * @description [ja] 水平スクロールカード表示のデスクトッププロジェクトレイアウトコンポーネント
 * @description [zh-TW] 桌面端專案佈局元件，水平捲動卡片展示
 */
const DesktopProjectsLayout: FC = () => {
  const t = useTranslations('projects');
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Measure the actual overflow width of the horizontal content
  useEffect(() => {
    const measure = () => {
      if (scrollContainerRef.current) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        setScrollRange(Math.max(0, scrollWidth - clientWidth));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll to horizontal translateX using measured width
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -scrollRange]);

  // Decorative orb
  const orbX = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: '250vh' }}
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

      {/* Sticky container — pins to viewport while section scrolls */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={scrollContainerRef}
          className="flex items-stretch gap-8 px-[8vw]"
          style={{ x }}
        >
          {/* Title card */}
          <div className="flex-shrink-0 flex flex-col justify-center w-[80vw] sm:w-[50vw] md:w-[40vw] max-w-[500px]">
            <h2 className="text-5xl font-bold text-foreground md:text-7xl lg:text-8xl tracking-tight leading-none">
              {t('title')}
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

          {/* Project cards */}
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative flex-shrink-0 w-[80vw] sm:w-[55vw] md:w-[38vw] min-w-[300px] max-w-[420px]"
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

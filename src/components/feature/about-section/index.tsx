import { useRef, useMemo } from 'react';
import type { FC } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import AnimatedStat from './animated-stat';
import SkillMarquee from './skill-marquee';
import RevealWord from './reveal-word';

/**
 * @description [zh-CN] 关于部分组件，包含个人简介、统计数据和技能展示
 * @description [en] About section component with bio, stats, and skills showcase
 * @description [ja] 自己紹介、統計データ、スキルショーケースを含むアバウトセクションコンポーネント
 * @description [zh-TW] 關於區塊元件，包含個人簡介、統計資料和技能展示
 */
const AboutSection: FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'end 0.2'],
  });

  // Title
  const titleY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const lineScaleX = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  // Bento grid
  const bentoOpacity = useTransform(scrollYProgress, [0.08, 0.25], [0, 1]);
  const bentoY = useTransform(scrollYProgress, [0.08, 0.25], [60, 0]);

  // Bio — word-by-word reveal on scroll
  const bioText = t('about.bio');
  const words = useMemo(() => bioText.split(' '), [bioText]);
  const wordCount = useTransform(scrollYProgress, [0.15, 0.45], [0, words.length]);

  // Stats
  const statsOpacity = useTransform(scrollYProgress, [0.2, 0.38], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.2, 0.38], [40, 0]);

  // Skills
  const skillsY = useTransform(scrollYProgress, [0.3, 0.5], [40, 0]);
  const skillsOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // Decorative orb parallax
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-56 px-6 overflow-hidden">
      {/* Decorative orb */}
      <motion.div
        className="absolute top-20 right-[10%] w-96 h-96 pointer-events-none"
        aria-hidden="true"
        style={{
          y: orbY,
          rotate: orbRotate,
          background: 'conic-gradient(from 0deg, var(--accent), var(--accent-secondary), transparent, var(--accent))',
          opacity: 0.05,
          filter: 'blur(80px)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Title */}
        <motion.div className="mb-16 md:mb-32 text-center" style={{ y: titleY, opacity: titleOpacity }}>
          <h2 className="text-3xl font-bold text-foreground md:text-5xl lg:text-6xl tracking-tight">
            {t('about.title')}
          </h2>
          <motion.div
            className="mx-auto mt-6 h-px origin-center"
            style={{
              scaleX: lineScaleX,
              width: '8rem',
              background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-secondary), transparent)',
            }}
          />
        </motion.div>

        {/* Bento grid layout */}
        <motion.div
          className="grid gap-6 md:grid-cols-3 mb-20"
          style={{ opacity: bentoOpacity, y: bentoY }}
        >
          {/* Large bio card — word-by-word reveal */}
          <div
            className="md:col-span-2 rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-sm p-6 md:p-10 lg:p-14 relative overflow-hidden group transition-colors duration-500 hover:border-accent/40"
          >
            {/* Subtle gradient corner */}
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              aria-hidden="true"
              style={{
                background: 'radial-gradient(circle at top right, var(--accent), transparent 70%)',
                opacity: 0.06,
              }}
            />
            <div className="relative">
              <div className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-6">
                {t('about.title')}
              </div>
              {/* Pull-quote style bio with word-by-word reveal */}
              <blockquote className="text-lg md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 font-light">
                <span className="text-accent text-3xl leading-none mr-1">&ldquo;</span>
                {words.map((word, i) => (
                  <RevealWord key={`${i}-${word}`} word={word} index={i} wordCount={wordCount} />
                ))}
                <span className="text-accent text-3xl leading-none ml-1">&rdquo;</span>
              </blockquote>
            </div>
          </div>

          {/* Stats card */}
          <motion.div
            className="rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-sm p-6 md:p-10 flex flex-col justify-center gap-8 transition-all duration-500 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,212,216,0.08)]"
            style={{ opacity: statsOpacity, y: statsY }}
          >
            <AnimatedStat value="5+" label="Years Experience" />
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)' }} />
            <AnimatedStat value="20+" label="Projects Built" />
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)' }} />
            <AnimatedStat value="10+" label="Technologies" />
          </motion.div>
        </motion.div>

        {/* Horizontal divider */}
        <div className="my-20 flex items-center justify-center">
          <div
            className="h-px w-full max-w-md"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-secondary), transparent)',
              opacity: 0.3,
            }}
          />
        </div>

        {/* Skills marquee */}
        <motion.div className="pb-8" style={{ y: skillsY, opacity: skillsOpacity }}>
          <h3 className="mb-8 text-base font-mono tracking-[0.2em] uppercase text-accent text-center">
            {t('about.skillsTitle')}
          </h3>
          <SkillMarquee />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

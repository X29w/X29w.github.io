'use client';

import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { isWebGLSupported } from '@/utils/common/webgl-detect';
import SceneFallback from '@/components/feature/scene-fallback';
import { useMediaQuery } from '@/utils/common/use-media-query';
import WordCycler from './word-cycler';

const Scene3D = dynamic(
  () => import('@/components/feature/scene-3d').then((mod) => mod.default),
  { ssr: false },
);

/**
 * @description [zh-CN] 英雄区块组件，包含 3D 场景、文字动画和滚动交互效果
 * @description [en] Hero section component with 3D scene, text animations, and scroll-linked interactions
 * @description [ja] 3D シーン、テキストアニメーション、スクロール連動インタラクションを含むヒーローセクションコンポーネント
 * @description [zh-TW] 英雄區塊元件，包含 3D 場景、文字動畫和捲動互動效果
 */
const HeroSection: FC = () => {
  const t = useTranslations('hero');
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [webglSupported, setWebglSupported] = useState(true);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setWebglSupported(isWebGLSupported());
    setMounted(true);
  }, []);

  const theme = (resolvedTheme === 'dark' ? 'dark' : 'light') as 'light' | 'dark';

  // Scroll-linked: dramatic exit — text splits apart, 3D zooms through
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Name splits left, tagline splits right
  const nameX = useTransform(scrollYProgress, [0, 0.5], [0, isMobile ? -80 : -200]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const nameRotate = useTransform(scrollYProgress, [0, 0.5], [0, -5]);

  const taglineX = useTransform(scrollYProgress, [0, 0.5], [0, isMobile ? 80 : 200]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const badgeY = useTransform(scrollYProgress, [0, 0.4], [0, -120]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const sceneScale = useTransform(scrollYProgress, [0, 0.8], [1, 2.5]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

  // Scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Character-by-character animation for the name
  const name = t('name');
  const characters = name.split('');

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Grid pattern background (Vercel-style) */}
      <div
        className="absolute inset-0 grid-pattern pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.4 }}
      />

      {/* Radial fade over grid */}
      {mounted && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, #09090b 80%)'
              : 'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, #fafafa 80%)',
          }}
        />
      )}

      {/* 3D scene — zooms dramatically as you scroll */}
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        role="presentation"
        style={{ scale: sceneScale, opacity: sceneOpacity }}
      >
        {mounted && webglSupported ? (
          <Scene3D theme={theme} reducedQuality={isMobile} />
        ) : mounted ? (
          <SceneFallback />
        ) : null}
      </motion.div>

      {/* Vignette */}
      {mounted && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(9,9,11,0.85) 100%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(250,250,250,0.85) 100%)',
          }}
        />
      )}

      {/* Scroll-driven fade to background color */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: overlayOpacity, background: 'var(--bg)' }}
      />

      {/* Text content — splits apart on scroll */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl">
        {/* Badge / tagline pill */}
        {mounted && (
          <motion.div
            style={{ y: badgeY, opacity: badgeOpacity }}
            className="mb-8"
          >
            <motion.span
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 200 }}
              className="inline-block rounded-full border border-border/50 bg-surface/30 backdrop-blur-md px-5 py-2 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-muted"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 animate-pulse" />
              {t('tagline')}
            </motion.span>
          </motion.div>
        )}

        {/* Main name — character-by-character reveal with gradient text */}
        {mounted && (
          <motion.h1
            style={{
              x: nameX,
              opacity: nameOpacity,
              scale: nameScale,
              rotate: nameRotate,
              fontSize: isMobile ? 'clamp(2rem, 12vw, 4rem)' : 'clamp(3rem, 10vw, 8rem)',
              lineHeight: 0.95,
            }}
            className="font-bold tracking-tighter"
          >
            {characters.map((char, i) => (
              <motion.span
                key={`${i}-${char}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.04 }}
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, var(--fg) 0%, var(--fg) 40%, var(--accent) 70%, var(--accent-secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
        )}

        {/* Animated divider */}
        {mounted && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ opacity: taglineOpacity }}
            className="my-8 h-px w-32 origin-center"
          >
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-secondary), transparent)',
              }}
            />
          </motion.div>
        )}

        {/* Tagline with word cycling */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ x: taglineX, opacity: taglineOpacity }}
            className="text-lg text-muted md:text-xl lg:text-2xl max-w-2xl font-light tracking-wide"
          >
            <span>Creative </span>
            <WordCycler />
            <span> & {t('tagline').split('&').pop()?.trim() || 'Designer'}</span>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator — animated line */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted/40"
          >
            Scroll
          </motion.span>
          <div className="relative w-px h-12 overflow-hidden">
            <div
              className="absolute inset-0 w-full"
              style={{
                background: 'linear-gradient(to bottom, var(--accent), transparent)',
                animation: 'scrollLine 2s ease-in-out infinite',
              }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;

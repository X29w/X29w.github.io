'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMediaQuery } from '@/utils/common/use-media-query';

/**
 * @description [zh-CN] 精致的自定义光标组件，带有拖尾效果。主圆圈加上淡出的拖尾圆圈，在交互元素上扩展并带有平滑混合模式。
 * @description [en] Polished custom cursor with trailing effect. Main circle plus fading trail circles behind it. Expands on interactive elements with smooth blend mode.
 * @description [ja] トレイリングエフェクト付きの洗練されたカスタムカーソル。メインの円とその後ろにフェードするトレイル円。インタラクティブ要素上でスムーズなブレンドモードで拡大する。
 * @description [zh-TW] 精緻的自訂游標元件，帶有拖尾效果。主圓圈加上淡出的拖尾圓圈，在互動元素上擴展並帶有平滑混合模式。
 */
export const CursorEffect = () => {
  const isPointerDevice = useMediaQuery('(pointer: fine)');
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Raw cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Main cursor — fast spring
  const mainX = useSpring(cursorX, { stiffness: 500, damping: 35, mass: 0.3 });
  const mainY = useSpring(cursorY, { stiffness: 500, damping: 35, mass: 0.3 });

  // Trail cursor — slower spring for lag effect
  const trailX = useSpring(cursorX, { stiffness: 150, damping: 25, mass: 0.8 });
  const trailY = useSpring(cursorX, { stiffness: 150, damping: 25, mass: 0.8 });
  const trailY2 = useSpring(cursorY, { stiffness: 150, damping: 25, mass: 0.8 });

  // Outer trail — even slower
  const outerX = useSpring(cursorX, { stiffness: 80, damping: 20, mass: 1.2 });
  const outerY = useSpring(cursorY, { stiffness: 80, damping: 20, mass: 1.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isPointerDevice || typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select';

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isPointerDevice, cursorX, cursorY]);

  if (!isPointerDevice || !mounted) return null;

  return (
    <>
      {/* Outer trail — large, faint */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full"
        aria-hidden="true"
        style={{
          x: outerX,
          y: outerY,
          width: isHovering ? 80 : 48,
          height: isHovering ? 80 : 48,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid var(--accent)',
          opacity: 0.1,
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
      />

      {/* Middle trail */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full"
        aria-hidden="true"
        style={{
          x: trailX,
          y: trailY2,
          width: isHovering ? 56 : 24,
          height: isHovering ? 56 : 24,
          translateX: '-50%',
          translateY: '-50%',
          background: 'var(--accent)',
          opacity: 0.04,
          transition: 'width 0.25s ease, height 0.25s ease',
        }}
      />

      {/* Main cursor circle */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full"
        aria-hidden="true"
        style={{
          x: mainX,
          y: mainY,
          width: isHovering ? 64 : 12,
          height: isHovering ? 64 : 12,
          translateX: '-50%',
          translateY: '-50%',
          border: isHovering
            ? '1.5px solid var(--accent-secondary)'
            : '1.5px solid var(--accent)',
          background: isHovering ? 'transparent' : 'var(--accent)',
          opacity: isHovering ? 0.6 : 0.4,
          mixBlendMode: 'difference',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
};

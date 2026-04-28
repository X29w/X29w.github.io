'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

/**
 * @description [zh-CN] ScrollReveal 组件的属性接口
 * @description [en] ScrollReveal component props interface
 * @description [ja] ScrollReveal コンポーネントのプロパティインターフェース
 * @description [zh-TW] ScrollReveal 元件的屬性介面
 */
interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'slide-left' | 'slide-right' | 'blur-in';
  delay?: number;
  duration?: number;
  viewportThreshold?: number;
  className?: string;
}

/**
 * @description [zh-CN] 将动画持续时间限制在 0.4 到 0.8 秒之间，非有限值返回 0.6
 * @description [en] Clamps animation duration between 0.4 and 0.8 seconds, returns 0.6 for non-finite values
 * @description [ja] アニメーション時間を 0.4〜0.8 秒の間にクランプし、非有限値の場合は 0.6 を返す
 * @description [zh-TW] 將動畫持續時間限制在 0.4 到 0.8 秒之間，非有限值返回 0.6
 */
export const clampDuration = (duration: number): number => {
  if (!Number.isFinite(duration)) return 0.6;
  return Math.min(0.8, Math.max(0.4, duration));
};

const variants = {
  'fade-up': {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  'fade-in': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  'scale-up': {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
  },
  'slide-left': {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  'slide-right': {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  'blur-in': {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
  },
};

/**
 * @description [zh-CN] 滚动显示组件，当元素进入视口时触发动画
 * @description [en] Scroll reveal component that triggers animation when element enters viewport
 * @description [ja] 要素がビューポートに入ったときにアニメーションをトリガーするスクロールリビールコンポーネント
 * @description [zh-TW] 捲動顯示元件，當元素進入視口時觸發動畫
 */
export const ScrollReveal = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  viewportThreshold = 0.15,
  className,
}: ScrollRevealProps) => {
  const variant = variants[animation];
  const clampedDuration = clampDuration(duration / 1000);

  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.animate}
      transition={{
        duration: clampedDuration,
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, amount: viewportThreshold }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * @description [zh-CN] 视差包装组件，子元素以不同于滚动的速度移动。speed: 0 = 固定, 1 = 正常滚动, >1 = 更快, <0 = 反向
 * @description [en] Parallax wrapper — children move at a different speed than scroll. speed: 0 = fixed, 1 = normal scroll, >1 = faster, <0 = reverse
 * @description [ja] パララックスラッパー — 子要素がスクロールとは異なる速度で移動する。speed: 0 = 固定, 1 = 通常スクロール, >1 = 高速, <0 = 逆方向
 * @description [zh-TW] 視差包裝元件，子元素以不同於捲動的速度移動。speed: 0 = 固定, 1 = 正常捲動, >1 = 更快, <0 = 反向
 */
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * @description [zh-CN] 视差滚动效果组件
 * @description [en] Parallax scroll effect component
 * @description [ja] パララックススクロールエフェクトコンポーネント
 * @description [zh-TW] 視差捲動效果元件
 */
export const Parallax = ({ children, speed = 0.5, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

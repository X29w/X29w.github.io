'use client';

import { useRef, useEffect, useState } from 'react';
import type { FC } from 'react';
import { useInView } from 'motion/react';

/**
 * @description [zh-CN] 动画计数器组件的属性接口
 * @description [en] AnimatedStat component props interface
 * @description [ja] AnimatedStat コンポーネントのプロパティインターフェース
 * @description [zh-TW] 動畫計數器元件的屬性介面
 */
interface AnimatedStatProps {
  value: string;
  label: string;
}

/**
 * @description [zh-CN] 动画计数器组件，当元素进入视口时从零计数到目标值
 * @description [en] Animated counter component that counts up from zero to target value when in view
 * @description [ja] ビューポートに入ったときにゼロからターゲット値までカウントアップするアニメーションカウンターコンポーネント
 * @description [zh-TW] 動畫計數器元件，當元素進入視口時從零計數到目標值
 */
const AnimatedStat: FC<AnimatedStatProps> = ({ value, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const numericPart = Number.parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/\d/g, '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * numericPart));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, numericPart]);

  return (
    <div ref={ref} className="text-center group/stat cursor-default">
      <div className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text transition-transform duration-300 group-hover/stat:scale-110">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted mt-1 font-mono tracking-wide uppercase">{label}</div>
    </div>
  );
};

export default AnimatedStat;

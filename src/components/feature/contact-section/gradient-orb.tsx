import { useEffect } from 'react';
import type { FC } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * @description [zh-CN] 鼠标响应式渐变光球组�?
 * @description [en] Mouse-responsive gradient orb component
 * @description [ja] マウスレスポンシブなグラデーションオーブコンポーネン�?
 * @description [zh-TW] 滑鼠響應式漸變光球元�?
 */
const GradientOrb: FC = () => {
  const orbX = useSpring(useMotionValue(0), { stiffness: 50, damping: 30 });
  const orbY = useSpring(useMotionValue(0), { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * 100;
      orbX.set(x);
      orbY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [orbX, orbY]);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
      aria-hidden="true"
      style={{
        x: orbX,
        y: orbY,
        background: 'radial-gradient(circle, var(--accent) 0%, var(--accent-secondary) 30%, transparent 70%)',
        opacity: 0.06,
        filter: 'blur(80px)',
        borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%',
      }}
    />
  );
};

export default GradientOrb;

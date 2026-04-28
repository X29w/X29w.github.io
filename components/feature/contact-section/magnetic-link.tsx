'use client';

import { useRef, useCallback } from 'react';
import type { FC } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * @description [zh-CN] 根据图标名称从 Lucide 图标库中获取对应图标组件
 * @description [en] Retrieves the corresponding icon component from the Lucide icon library by icon name
 * @description [ja] アイコン名に基づいて Lucide アイコンライブラリから対応するアイコンコンポーネントを取得する
 * @description [zh-TW] 根據圖示名稱從 Lucide 圖示庫中取得對應圖示元件
 */
const getIcon = (iconName: string): LucideIcon | null => {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return Icon ?? null;
};

/**
 * @description [zh-CN] 磁性链接按钮组件的属性接口
 * @description [en] MagneticLink component props interface
 * @description [ja] MagneticLink コンポーネントのプロパティインターフェース
 * @description [zh-TW] 磁性連結按鈕元件的屬性介面
 */
interface MagneticLinkProps {
  href: string;
  ariaLabel: string;
  icon: string;
  platform: string;
  delay: number;
}

/**
 * @description [zh-CN] 磁性链接按钮组件，光标靠近时产生吸附效果
 * @description [en] Magnetic link button component that follows cursor slightly when nearby
 * @description [ja] カーソルが近づくとわずかに追従するマグネティックリンクボタンコンポーネント
 * @description [zh-TW] 磁性連結按鈕元件，游標靠近時產生吸附效果
 */
const MagneticLink: FC<MagneticLinkProps> = ({
  href,
  ariaLabel,
  icon: iconName,
  platform,
  delay,
}) => {
  const Icon = getIcon(iconName);
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (!Icon) return null;

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{ x: springX, y: springY }}
      className="relative inline-flex flex-col items-center justify-center gap-3 group"
    >
      <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-md overflow-hidden">
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at center, var(--accent), transparent 70%)',
            opacity: 0,
          }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500"
          style={{ background: 'var(--accent)' }}
        />
        {/* Animated border glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: '0 0 20px rgba(212, 212, 216, 0.2), inset 0 0 20px rgba(212, 212, 216, 0.06)',
          }}
        />
        <Icon className="relative h-7 w-7 md:h-9 md:w-9 text-muted group-hover:text-accent transition-colors duration-300" />
      </div>
      <span className="text-xs font-mono tracking-wider text-muted group-hover:text-foreground transition-colors uppercase">
        {platform}
      </span>
    </motion.a>
  );
};

export default MagneticLink;

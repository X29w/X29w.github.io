'use client';

import type { FC } from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * @description [zh-CN] 技能标签组件的属性接口
 * @description [en] SkillTag component props interface
 * @description [ja] SkillTag コンポーネントのプロパティインターフェース
 * @description [zh-TW] 技能標籤元件的屬性介面
 */
interface SkillTagProps {
  name: string;
  icon?: string;
}

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
 * @description [zh-CN] 技能标签组件，带有悬停动画和图标支持
 * @description [en] Skill tag component with hover animation and icon support
 * @description [ja] ホバーアニメーションとアイコンサポートを備えたスキルタグコンポーネント
 * @description [zh-TW] 技能標籤元件，帶有懸停動畫和圖示支援
 */
const SkillTag: FC<SkillTagProps> = ({ name, icon }) => {
  const Icon = icon ? getIcon(icon) : null;

  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -3, rotate: Math.random() > 0.5 ? 2 : -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      className="relative inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-surface/80 backdrop-blur-sm px-4 py-2 text-sm text-foreground cursor-default group overflow-hidden"
    >
      {/* Gradient background on hover */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-[0.12] transition-opacity duration-300"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
        }}
      />
      {/* Subtle glow ring on hover */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
        style={{
          boxShadow: '0 0 15px rgba(212, 212, 216, 0.12), inset 0 0 15px rgba(212, 212, 216, 0.04)',
        }}
      />
      {Icon && (
        <Icon className="relative h-3.5 w-3.5 text-muted group-hover:text-accent transition-colors duration-300" />
      )}
      <span className="relative group-hover:text-accent transition-colors duration-300 font-medium">
        {name}
      </span>
    </motion.div>
  );
};

export default SkillTag;

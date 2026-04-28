import { useCallback } from 'react';
import type { FC } from 'react';
import { motion } from 'motion/react';
import { Code2, Link, Mail, ArrowUp, type LucideIcon } from 'lucide-react';
import { socialLinks } from '@/utils/feature/constant';

/**
 * @description [zh-CN] 社交链接图标映射�?
 * @description [en] Social link icon mapping
 * @description [ja] ソーシャルリンクアイコンマッピン�?
 * @description [zh-TW] 社交連結圖示映射�?
 */
const iconMap: Record<string, LucideIcon> = {
  Github: Code2,
  Linkedin: Link,
  Mail,
};

/**
 * @description [zh-CN] 技术栈列表常量
 * @description [en] Tech stack list constant
 * @description [ja] 技術スタックリスト定数
 * @description [zh-TW] 技術棧列表常數
 */
const techStack = ['Next.js', 'React', 'Three.js', 'Motion', 'Tailwind CSS'];

/**
 * @description [zh-CN] 页脚组件，包含社交链接、技术栈徽章和返回顶部按�?
 * @description [en] Footer component with social links, tech stack badges, and back-to-top button
 * @description [ja] ソーシャルリンク、技術スタックバッジ、トップに戻るボタンを含むフッターコンポーネン�?
 * @description [zh-TW] 頁尾元件，包含社交連結、技術棧徽章和返回頂部按�?
 */
const Footer: FC = () => {
  /**
   * @description [zh-CN] 平滑滚动到页面顶�?
   * @description [en] Smoothly scrolls to the top of the page
   * @description [ja] ページの先頭にスムーズにスクロールす�?
   * @description [zh-TW] 平滑捲動到頁面頂�?
   */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="relative border-t border-transparent py-12 md:py-20 overflow-hidden">
      {/* Gradient divider line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-secondary), transparent)',
        }}
      />

      {/* Large decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[6rem] md:text-[12rem] lg:text-[24rem] font-bold tracking-tighter whitespace-nowrap"
          style={{
            color: 'var(--fg)',
            opacity: 0.03,
            lineHeight: 1,
          }}
        >
          PORTFOLIO
        </span>
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-6">
        {/* Back to top button */}
        <motion.button
          type="button"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-surface/50 backdrop-blur-sm text-muted hover:text-accent hover:border-accent/40 hover:shadow-[0_0_20px_rgba(212,212,216,0.1)] transition-all duration-300 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>

        {/* Social links with hover animations */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <motion.a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-surface/50 backdrop-blur-sm text-muted hover:text-accent hover:border-accent/30 transition-all duration-300 group"
              >
                {Icon ? <Icon className="h-5 w-5" /> : null}
              </motion.a>
            );
          })}
        </div>

        {/* Built with tech stack badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted/50 font-mono mr-2">Built with</span>
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-white/[0.04] bg-white/[0.02] px-3 py-1 text-xs font-mono text-muted/60"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted/40 font-light">
          &copy; {new Date().getFullYear()} X29w. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

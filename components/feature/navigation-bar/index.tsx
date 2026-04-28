'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll } from 'motion/react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/config/theme-toggle';
import { LanguageSwitcher } from '@/components/config/language-switcher';
import { useActiveSection } from '@/utils/common/use-active-section';
import MobileMenu from '../mobile-menu';

/**
 * @description [zh-CN] 导航栏组件的属性接口
 * @description [en] NavigationBar component props interface
 * @description [ja] NavigationBar コンポーネントのプロパティインターフェース
 * @description [zh-TW] 導航列元件的屬性介面
 */
interface NavigationBarProps {
  locale: string;
}

/**
 * @description [zh-CN] 导航链接列表常量
 * @description [en] Navigation links list constant
 * @description [ja] ナビゲーションリンクリスト定数
 * @description [zh-TW] 導航連結列表常數
 */
const navLinks = [
  { id: 'hero', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'projects', key: 'projects' },
  { id: 'contact', key: 'contact' },
] as const;

const sectionIds = navLinks.map((l) => l.id);

/**
 * @description [zh-CN] 顶部导航栏组件，包含桌面端导航链接、滚动进度条和移动端菜单
 * @description [en] Top navigation bar component with desktop nav links, scroll progress bar, and mobile menu
 * @description [ja] デスクトップナビリンク、スクロールプログレスバー、モバイルメニューを含むトップナビゲーションバーコンポーネント
 * @description [zh-TW] 頂部導航列元件，包含桌面端導航連結、捲動進度條和行動端選單
 */
const NavigationBar: FC<NavigationBarProps> = ({ locale }) => {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  // Page scroll progress for the progress bar
  const { scrollYProgress: pageProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/60 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/5'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{
            scaleX: pageProgress,
            background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
          }}
        />

        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors group"
                >
                  <span
                    className={`relative z-10 ${
                      activeSection === link.id
                        ? 'text-accent'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {t(link.key)}
                  </span>

                  {/* Animated underline on hover */}
                  <span
                    className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: 'var(--accent)' }}
                  />

                  {/* Active indicator dot */}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:text-accent transition-colors cursor-pointer"
            aria-label="Open menu"
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Right side: theme toggle + language switcher */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        locale={locale}
      />
    </>
  );
};

export default NavigationBar;

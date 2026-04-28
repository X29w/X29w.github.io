'use client';

import { useEffect } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/config/theme-toggle';
import { LanguageSwitcher } from '@/components/config/language-switcher';

/**
 * @description [zh-CN] 移动端菜单组件的属性接口
 * @description [en] MobileMenu component props interface
 * @description [ja] MobileMenu コンポーネントのプロパティインターフェース
 * @description [zh-TW] 行動端選單元件的屬性介面
 */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
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

/**
 * @description [zh-CN] 全屏移动端导航菜单组件
 * @description [en] Full-screen mobile navigation menu component
 * @description [ja] フルスクリーンモバイルナビゲーションメニューコンポーネント
 * @description [zh-TW] 全螢幕行動端導航選單元件
 */
const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose, locale }) => {
  const t = useTranslations('nav');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col bg-background"
        >
          <div className="flex items-center justify-end p-4">
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:text-accent transition-colors cursor-pointer"
              aria-label="Close menu"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-2xl font-medium text-foreground hover:text-accent transition-colors cursor-pointer"
                type="button"
              >
                {t(link.key)}
              </button>
            ))}
          </nav>

          <div className="flex items-center justify-center gap-4 pb-12">
            <ThemeToggle />
            <LanguageSwitcher currentLocale={locale} dropUp />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

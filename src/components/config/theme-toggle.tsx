import { useTheme } from 'next-themes';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

/**
 * @description [zh-CN] 主题切换按钮组件，支持明暗模式切换动�?
 * @description [en] Theme toggle button component with light/dark mode switch animation
 * @description [ja] ライ�?ダークモード切り替えアニメーション付きテーマトグルボタンコンポーネント
 * @description [zh-TW] 主題切換按鈕元件，支援明暗模式切換動�?
 */
export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <button
        className="relative flex h-9 w-9 items-center justify-center border border-border bg-surface text-foreground"
        aria-label="Toggle theme"
        type="button"
      >
        <span className="h-5 w-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center border border-border bg-surface text-foreground hover:text-accent transition-colors cursor-pointer"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <IconSun className="h-5 w-5" stroke={1.5} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <IconMoon className="h-5 w-5" stroke={1.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

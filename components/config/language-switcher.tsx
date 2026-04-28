'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from '@/utils/config/i18n-navigation';
import { Languages } from 'lucide-react';

/**
 * @description [zh-CN] 语言切换器组件的属性接口
 * @description [en] LanguageSwitcher component props interface
 * @description [ja] LanguageSwitcher コンポーネントのプロパティインターフェース
 * @description [zh-TW] 語言切換器元件的屬性介面
 */
interface LanguageSwitcherProps {
  currentLocale: string;
  /** @description [zh-CN] 为 true 时下拉菜单向上展开（用于底部的移动菜单） @description [en] When true, dropdown opens upward (for use in mobile menu at bottom) @description [ja] true の場合、ドロップダウンが上方向に開く（下部のモバイルメニュー用） @description [zh-TW] 為 true 時下拉選單向上展開（用於底部的行動選單） */
  dropUp?: boolean;
}

/**
 * @description [zh-CN] 支持的语言列表常量
 * @description [en] Supported languages list constant
 * @description [ja] サポートされている言語リスト定数
 * @description [zh-TW] 支援的語言列表常數
 */
const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh-CN', label: '简体中文', short: '简' },
  { code: 'zh-TW', label: '繁體中文', short: '繁' },
  { code: 'ja', label: '日本語', short: '日' },
] as const;

/**
 * @description [zh-CN] 语言切换器组件，提供下拉菜单选择语言
 * @description [en] Language switcher component with dropdown menu for locale selection
 * @description [ja] ロケール選択用のドロップダウンメニューを備えた言語切り替えコンポーネント
 * @description [zh-TW] 語言切換器元件，提供下拉選單選擇語言
 */
export const LanguageSwitcher = ({ currentLocale, dropUp }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = languages.find((l) => l.code === currentLocale) ?? languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * @description [zh-CN] 处理语言选择，保存偏好并切换路由语言
   * @description [en] Handles language selection, saves preference and switches route locale
   * @description [ja] 言語選択を処理し、設定を保存してルートのロケールを切り替える
   * @description [zh-TW] 處理語言選擇，儲存偏好並切換路由語言
   */
  const handleSelect = (code: string) => {
    setIsOpen(false);
    try {
      localStorage.setItem('preferred-locale', code);
    } catch {
      // localStorage may not be available
    }
    router.replace(pathname, { locale: code as 'en' | 'zh-CN' | 'zh-TW' | 'ja' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 min-w-[44px] items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-sm text-foreground hover:text-accent transition-colors cursor-pointer"
        aria-label="Switch language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
      >
        <Languages className="h-4 w-4" />
        <span>{currentLang.short}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 w-44 rounded-xl border border-border bg-surface py-1.5 shadow-xl z-50 ${
            dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
          role="listbox"
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer min-h-[44px] ${
                lang.code === currentLocale
                  ? 'text-accent bg-accent/10'
                  : 'text-foreground hover:bg-accent/5 hover:text-accent'
              }`}
              role="option"
              aria-selected={lang.code === currentLocale}
              type="button"
            >
              <span className="w-6 text-center font-medium">{lang.short}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

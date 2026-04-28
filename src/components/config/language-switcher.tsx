import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { LOCALE_STORAGE_KEY } from "@/utils/config/locale-match";

interface LanguageSwitcherProps {
  currentLocale: string;
  /** When true, dropdown opens upward (for mobile menu at bottom) */
  dropUp?: boolean;
}

const languages = [
  { code: "en", label: "English", short: "EN" },
  { code: "zh-CN", label: "简体中文", short: "简" },
  { code: "zh-TW", label: "繁體中文", short: "繁" },
  { code: "ja", label: "日本語", short: "日" },
] as const;

export const LanguageSwitcher = ({
  currentLocale,
  dropUp,
}: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const currentLang = languages.find((l) => l.code === currentLocale) ?? languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    setIsOpen(false);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, code);
    } catch {
      // ignore
    }
    navigate({ to: "/$locale", params: { locale: code } });
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
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
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
                  ? "text-accent bg-accent/10"
                  : "text-foreground hover:bg-accent/5 hover:text-accent"
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

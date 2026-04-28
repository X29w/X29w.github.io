import { type Locale, LOCALES, DEFAULT_LOCALE } from "@/i18n/config";

export const LOCALE_STORAGE_KEY = "preferred-locale";

/**
 * @description [en] Matches a browser language string to a supported locale.
 * Handles exact matches, prefix matches, and always returns a valid locale.
 */
export const matchLocale = (browserLang: string): Locale => {
  if (!browserLang) return DEFAULT_LOCALE;

  const normalized = browserLang.toLowerCase().trim();
  if (!normalized) return DEFAULT_LOCALE;

  // Exact match
  const exactMap = new Map<string, Locale>([
    ["en", "en"],
    ["zh-cn", "zh-CN"],
    ["zh-tw", "zh-TW"],
    ["ja", "ja"],
  ]);
  const exact = exactMap.get(normalized);
  if (exact) return exact;

  // Prefix match — more specific first
  const prefixMap: [string, Locale][] = [
    ["zh-hant", "zh-TW"],
    ["zh-hans", "zh-CN"],
    ["zh-tw", "zh-TW"],
    ["zh-cn", "zh-CN"],
    ["zh", "zh-CN"],
    ["ja", "ja"],
    ["en", "en"],
  ];
  for (const [prefix, locale] of prefixMap) {
    if (normalized.startsWith(prefix)) return locale;
  }

  return DEFAULT_LOCALE;
};

export { LOCALES, DEFAULT_LOCALE };
export type { Locale };

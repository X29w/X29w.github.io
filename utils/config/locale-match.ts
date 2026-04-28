import type { Locale } from "@/utils/config/i18n-routing";
import { routing } from "@/utils/config/i18n-routing";

/**
 * @description [zh-CN] 将浏览器语言字符串匹配到支持的 locale。处理精确匹配、前缀匹配，并始终返回有效的 locale。不会抛出异常或返回 undefined。
 * @description [en] Matches a browser language string to a supported locale. Handles exact matches, prefix matches, and always returns a valid locale. Never throws or returns undefined.
 * @description [ja] ブラウザの言語文字列をサポートされている locale にマッチさせる。完全一致、プレフィックス一致を処理し、常に有効な locale を返す。例外をスローしたり undefined を返すことはない。
 * @description [zh-TW] 將瀏覽器語言字串匹配到支援的 locale。處理精確匹配、前綴匹配，並始終返回有效的 locale。不會拋出例外或返回 undefined。
 */
export const matchLocale = (browserLang: string): Locale => {
  if (!browserLang) {
    return routing.defaultLocale;
  }

  const normalized = browserLang.toLowerCase().trim();

  if (!normalized) {
    return routing.defaultLocale;
  }

  // Exact match mapping (normalized -> locale)
  const exactMap = new Map<string, Locale>([
    ["en", "en"],
    ["zh-cn", "zh-CN"],
    ["zh-tw", "zh-TW"],
    ["ja", "ja"],
  ]);

  const exactMatch = exactMap.get(normalized);
  if (exactMatch) {
    return exactMatch;
  }

  // Prefix match mapping (prefix -> locale). Order matters: more specific prefixes first
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
    if (normalized.startsWith(prefix)) {
      return locale;
    }
  }

  return routing.defaultLocale;
};

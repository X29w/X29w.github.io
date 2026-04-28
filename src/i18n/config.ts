import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import zhCN from "@/locales/zh-CN.json";
import zhTW from "@/locales/zh-TW.json";
import ja from "@/locales/ja.json";

export const LOCALES = ["en", "zh-CN", "zh-TW", "ja"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "preferred-locale";

export const resources = {
  en: { translation: en },
  "zh-CN": { translation: zhCN },
  "zh-TW": { translation: zhTW },
  ja: { translation: ja },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

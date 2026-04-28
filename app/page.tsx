"use client";

import { useEffect } from "react";
import { matchLocale } from "@/utils/config/locale-match";

const LOCALE_STORAGE_KEY = "preferred-locale";

/**
 * @description [zh-CN] 根页面组件，检测用户语言偏好并重定向到对应语言路径
 * @description [en] Root page component that detects user language preference and redirects to the corresponding locale path
 * @description [ja] ユーザーの言語設定を検出し、対応するロケールパスにリダイレクトするルートページコンポーネント
 * @description [zh-TW] 根頁面元件，偵測使用者語言偏好並重新導向到對應語言路徑
 */
const RootPage = () => {
  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    const detected = saved || matchLocale(navigator.language);
    window.location.replace(`/${detected}`);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-accent" />
    </div>
  );
};

export default RootPage;

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * @description [zh-CN] 主题提供者组件，使用 next-themes 提供明暗模式支持
 * @description [en] Theme provider component using next-themes for light/dark mode support
 * @description [ja] next-themes を使用してライト/ダークモードをサポートするテーマプロバイダーコンポーネント
 * @description [zh-TW] 主題提供者元件，使用 next-themes 提供明暗模式支援
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
};

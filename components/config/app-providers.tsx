"use client";

import { useEffect } from "react";
import { NextIntlClientProvider } from "next-intl";

/**
 * @description [zh-CN] 应用提供者组件的属性接口
 * @description [en] AppProviders component props interface
 * @description [ja] AppProviders コンポーネントのプロパティインターフェース
 * @description [zh-TW] 應用提供者元件的屬性介面
 */
interface AppProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}

/**
 * @description [zh-CN] 应用级提供者组件，包装国际化上下文并设置文档语言属性
 * @description [en] Application-level providers component that wraps i18n context and sets document lang attribute
 * @description [ja] 国際化コンテキストをラップし、ドキュメントの lang 属性を設定するアプリケーションレベルのプロバイダーコンポーネント
 * @description [zh-TW] 應用級提供者元件，包裝國際化上下文並設定文件語言屬性
 */
export const AppProviders = ({
  children,
  locale,
  messages,
}: AppProvidersProps) => {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

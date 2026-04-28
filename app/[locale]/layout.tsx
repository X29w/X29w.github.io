import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "@/utils/config/i18n-routing";
import { AppProviders } from "@/components/config/app-providers";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * @description [zh-CN] 生成所有支持语言的静态参数
 * @description [en] Generates static params for all supported locales
 * @description [ja] サポートされているすべてのロケールの静的パラメータを生成する
 * @description [zh-TW] 產生所有支援語言的靜態參數
 */
export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

/**
 * @description [zh-CN] 根据当前语言生成页面元数据（标题、描述、OpenGraph 等）
 * @description [en] Generates page metadata (title, description, OpenGraph, etc.) based on current locale
 * @description [ja] 現在のロケールに基づいてページメタデータ（タイトル、説明、OpenGraph など）を生成する
 * @description [zh-TW] 根據當前語言產生頁面中繼資料（標題、描述、OpenGraph 等）
 */
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await getMessages()) as Record<string, unknown>;
  const metadata = messages.metadata as Record<string, string>;

  return {
    title: metadata?.title ?? "Portfolio",
    description: metadata?.description ?? "",
    openGraph: {
      title: metadata?.title ?? "Portfolio",
      description: metadata?.description ?? "",
      locale,
      type: "website",
      url: `https://your-username.github.io/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata?.title ?? "Portfolio",
      description: metadata?.description ?? "",
    },
  };
};

/**
 * @description [zh-CN] 语言布局组件，为子页面提供国际化上下文
 * @description [en] Locale layout component that provides i18n context for child pages
 * @description [ja] 子ページに国際化コンテキストを提供するロケールレイアウトコンポーネント
 * @description [zh-TW] 語言佈局元件，為子頁面提供國際化上下文
 */
const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await getMessages()) as Record<string, unknown>;

  return (
    <AppProviders locale={locale} messages={messages}>
      {children}
    </AppProviders>
  );
};

export default LocaleLayout;

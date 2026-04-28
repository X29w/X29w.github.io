import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/config/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * @description [zh-CN] 根布局组件，提供全局字体和主题配置
 * @description [en] Root layout component providing global fonts and theme configuration
 * @description [ja] グローバルフォントとテーマ設定を提供するルートレイアウトコンポーネント
 * @description [zh-TW] 根佈局元件，提供全域字體和主題配置
 */
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

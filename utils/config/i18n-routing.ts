import { defineRouting } from "next-intl/routing";

/**
 * @description [zh-CN] 国际化路由配置，定义支持的语言和默认语言
 * @description [en] Internationalization routing configuration, defines supported locales and default locale
 * @description [ja] 国際化ルーティング設定、サポートされるロケールとデフォルトロケールを定義
 * @description [zh-TW] 國際化路由配置，定義支援的語言和預設語言
 */
export const routing = defineRouting({
	locales: ["en", "zh-CN", "zh-TW", "ja"],
	defaultLocale: "en",
});

/**
 * @description [zh-CN] 支持的语言类型
 * @description [en] Supported locale type
 * @description [ja] サポートされるロケール型
 * @description [zh-TW] 支援的語言類型
 */
export type Locale = (typeof routing.locales)[number];

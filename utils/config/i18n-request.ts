import { getRequestConfig } from "next-intl/server";
import { routing } from "@/utils/config/i18n-routing";
import en from "@/locales/en.json";
import zhCN from "@/locales/zh-CN.json";
import zhTW from "@/locales/zh-TW.json";
import ja from "@/locales/ja.json";

/**
 * @description [zh-CN] 翻译消息映射表，按 locale 索引
 * @description [en] Translation messages map indexed by locale
 * @description [ja] ロケールでインデックスされた翻訳メッセージマップ
 * @description [zh-TW] 翻譯訊息映射表，按 locale 索引
 */
const messages: Record<string, typeof en> = {
	en,
	"zh-CN": zhCN,
	"zh-TW": zhTW,
	ja,
};

/**
 * @description [zh-CN] 服务端请求配置，根据请求的 locale 加载对应的翻译消息
 * @description [en] Server-side request configuration that loads translation messages based on the requested locale
 * @description [ja] リクエストされたロケールに基づいて翻訳メッセージを読み込むサーバーサイドリクエスト設定
 * @description [zh-TW] 伺服器端請求配置，根據請求的 locale 載入對應的翻譯訊息
 */
export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		timeZone: 'UTC',
		messages: messages[locale] ?? messages.en,
	};
});

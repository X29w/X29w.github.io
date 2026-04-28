import { createNavigation } from "next-intl/navigation";
import { routing } from "./i18n-routing";

/**
 * @description [zh-CN] 国际化导航工具，导出 Link、redirect、usePathname、useRouter、getPathname
 * @description [en] Internationalized navigation utilities, exports Link, redirect, usePathname, useRouter, getPathname
 * @description [ja] 国際化ナビゲーションユーティリティ、Link、redirect、usePathname、useRouter、getPathname をエクスポート
 * @description [zh-TW] 國際化導航工具，匯出 Link、redirect、usePathname、useRouter、getPathname
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);

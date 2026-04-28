/**
 * @description [zh-CN] 主题颜色配置接口
 * @description [en] Theme colors configuration interface
 * @description [ja] テーマカラー設定インターフェース
 * @description [zh-TW] 主題顏色配置介面
 */
export interface ThemeColors {
  /** @description [zh-CN] 主背景色 @description [en] Main background color @description [ja] メイン背景色 @description [zh-TW] 主背景色 */
  background: string;
  /** @description [zh-CN] 主前景色（文字） @description [en] Main foreground color (text) @description [ja] メイン前景色（テキスト） @description [zh-TW] 主前景色（文字） */
  foreground: string;
  /** @description [zh-CN] 主色调（强调色） @description [en] Primary accent color @description [ja] メインアクセントカラー @description [zh-TW] 主色調（強調色） */
  accent: string;
  /** @description [zh-CN] 辅助强调色 @description [en] Secondary accent color @description [ja] サブアクセントカラー @description [zh-TW] 輔助強調色 */
  accentSecondary: string;
  /** @description [zh-CN] 卡片/面板背景 @description [en] Card/panel background @description [ja] カード/パネル背景 @description [zh-TW] 卡片/面板背景 */
  surface: string;
  /** @description [zh-CN] 边框色 @description [en] Border color @description [ja] ボーダー色 @description [zh-TW] 邊框色 */
  border: string;
  /** @description [zh-CN] 弱化文字色 @description [en] Muted text color @description [ja] 控えめなテキスト色 @description [zh-TW] 弱化文字色 */
  muted: string;
  /** @description [zh-CN] 3D 场景光照色 @description [en] 3D scene light color @description [ja] 3D シーンのライト色 @description [zh-TW] 3D 場景光照色 */
  sceneLight: string;
  /** @description [zh-CN] 3D 场景材质色 @description [en] 3D scene material color @description [ja] 3D シーンのマテリアル色 @description [zh-TW] 3D 場景材質色 */
  sceneMaterial: string;
  /** @description [zh-CN] 粒子颜色 @description [en] Particle color @description [ja] パーティクル色 @description [zh-TW] 粒子顏色 */
  particle: string;
}

/**
 * @description [zh-CN] 浅色主题配置
 * @description [en] Light theme configuration
 * @description [ja] ライトテーマ設定
 * @description [zh-TW] 淺色主題配置
 */
export const lightTheme: ThemeColors = {
  background: '#fafafa',
  foreground: '#171717',
  accent: '#52525b',
  accentSecondary: '#71717a',
  surface: '#ffffff',
  border: '#e4e4e7',
  muted: '#71717a',
  sceneLight: '#ffffff',
  sceneMaterial: '#71717a',
  particle: '#a1a1aa',
};

/**
 * @description [zh-CN] 深色主题配置
 * @description [en] Dark theme configuration
 * @description [ja] ダークテーマ設定
 * @description [zh-TW] 深色主題配置
 */
export const darkTheme: ThemeColors = {
  background: '#09090b',
  foreground: '#fafafa',
  accent: '#d4d4d8',
  accentSecondary: '#a1a1aa',
  surface: '#18181b',
  border: '#27272a',
  muted: '#71717a',
  sceneLight: '#e4e4e7',
  sceneMaterial: '#d4d4d8',
  particle: '#a1a1aa',
};

/**
 * @description [zh-CN] 主题映射对象，包含浅色和深色主题
 * @description [en] Theme map object containing light and dark themes
 * @description [ja] ライトテーマとダークテーマを含むテーママップオブジェクト
 * @description [zh-TW] 主題映射物件，包含淺色和深色主題
 */
export const themes: Record<'light' | 'dark', ThemeColors> = {
  light: lightTheme,
  dark: darkTheme,
};

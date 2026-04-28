/**
 * @description [zh-CN] 项目数据接口
 * @description [en] Project data interface
 * @description [ja] プロジェクトデータインターフェース
 * @description [zh-TW] 專案資料介面
 */
export interface Project {
  /** @description [zh-CN] 唯一标识符 @description [en] Unique identifier @description [ja] 一意識別子 @description [zh-TW] 唯一識別碼 */
  id: string;
  /** @description [zh-CN] 翻译 key 前缀，对应 locales 中的 projects.items[n] @description [en] Translation key prefix, corresponds to projects.items[n] in locales @description [ja] 翻訳キーのプレフィックス、locales の projects.items[n] に対応 @description [zh-TW] 翻譯 key 前綴，對應 locales 中的 projects.items[n] */
  translationIndex: number;
  /** @description [zh-CN] 技术标签（不翻译） @description [en] Technology tags (not translated) @description [ja] 技術タグ（翻訳なし） @description [zh-TW] 技術標籤（不翻譯） */
  tags: string[];
  /** @description [zh-CN] 项目链接（可选，非个人项目可能没有） @description [en] Project link (optional, may not exist for non-personal projects) @description [ja] プロジェクトリンク（任意、個人プロジェクト以外にはない場合がある） @description [zh-TW] 專案連結（可選，非個人專案可能沒有） */
  href?: string;
  /** @description [zh-CN] 可选的项目封面图路径 @description [en] Optional project cover image path @description [ja] 任意のプロジェクトカバー画像パス @description [zh-TW] 可選的專案封面圖路徑 */
  image?: string;
}

/**
 * @description [zh-CN] 社交链接接口
 * @description [en] Social link interface
 * @description [ja] ソーシャルリンクインターフェース
 * @description [zh-TW] 社交連結介面
 */
export interface SocialLink {
  /** @description [zh-CN] 平台名称 @description [en] Platform name @description [ja] プラットフォーム名 @description [zh-TW] 平台名稱 */
  platform: string;
  /** @description [zh-CN] 链接 URL @description [en] Link URL @description [ja] リンク URL @description [zh-TW] 連結 URL */
  href: string;
  /** @description [zh-CN] lucide-react 图标名称 @description [en] lucide-react icon name @description [ja] lucide-react アイコン名 @description [zh-TW] lucide-react 圖示名稱 */
  icon: string;
  /** @description [zh-CN] 无障碍标签 @description [en] Accessibility label @description [ja] アクセシビリティラベル @description [zh-TW] 無障礙標籤 */
  ariaLabel: string;
}

/**
 * @description [zh-CN] 技能数据接口
 * @description [en] Skill data interface
 * @description [ja] スキルデータインターフェース
 * @description [zh-TW] 技能資料介面
 */
export interface Skill {
  /** @description [zh-CN] 技能名称（不翻译） @description [en] Skill name (not translated) @description [ja] スキル名（翻訳なし） @description [zh-TW] 技能名稱（不翻譯） */
  name: string;
  /** @description [zh-CN] 技能类别 @description [en] Skill category @description [ja] スキルカテゴリ @description [zh-TW] 技能類別 */
  category: "frontend" | "backend" | "tools" | "other";
  /** @description [zh-CN] 可选的图标名称 @description [en] Optional icon name @description [ja] 任意のアイコン名 @description [zh-TW] 可選的圖示名稱 */
  icon?: string;
}

/**
 * @description [zh-CN] 项目列表数据
 * @description [en] Project list data
 * @description [ja] プロジェクトリストデータ
 * @description [zh-TW] 專案列表資料
 */
export const projects: Project[] = [
  {
    id: "project-alpha",
    translationIndex: 0,
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    href: "https://github.com/username/project-alpha",
  },
  {
    id: "project-beta",
    translationIndex: 1,
    tags: ["Three.js", "React Three Fiber", "WebGL", "TypeScript"],
    href: "https://github.com/username/project-beta",
  },
  {
    id: "project-gamma",
    translationIndex: 2,
    tags: ["Node.js", "PostgreSQL", "GraphQL", "Docker"],
    href: "https://github.com/username/project-gamma",
  },
];

/**
 * @description [zh-CN] 社交链接列表数据
 * @description [en] Social links list data
 * @description [ja] ソーシャルリンクリストデータ
 * @description [zh-TW] 社交連結列表資料
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    href: "https://github.com/username",
    icon: "Github",
    ariaLabel: "Visit GitHub profile",
  },
  {
    platform: "LinkedIn",
    href: "https://linkedin.com/in/username",
    icon: "Linkedin",
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    platform: "Email",
    href: "mailto:hello@example.com",
    icon: "Mail",
    ariaLabel: "Send an email",
  },
];

/**
 * @description [zh-CN] 技能列表数据
 * @description [en] Skills list data
 * @description [ja] スキルリストデータ
 * @description [zh-TW] 技能列表資料
 */
export const skills: Skill[] = [
  { name: "React", category: "frontend", icon: "Code2" },
  { name: "TypeScript", category: "frontend", icon: "FileCode" },
  { name: "Next.js", category: "frontend", icon: "Globe" },
  { name: "Tailwind CSS", category: "frontend", icon: "Palette" },
  { name: "Three.js", category: "frontend", icon: "Box" },
  { name: "Node.js", category: "backend", icon: "Server" },
  { name: "PostgreSQL", category: "backend", icon: "Database" },
  { name: "GraphQL", category: "backend", icon: "Share2" },
  { name: "Docker", category: "tools", icon: "Container" },
  { name: "Git", category: "tools", icon: "GitBranch" },
];

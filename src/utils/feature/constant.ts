/**
 * @description [en] Project data interface for the editorial work index.
 */
export interface Project {
  /** @description [en] Unique identifier */
  id: string;
  /** @description [en] Translation key index, corresponds to projects.items[n] in locales */
  translationIndex: number;
  /** @description [en] Year the work shipped (real range label, not decoration) */
  year: string;
  /** @description [en] Technology tags (not translated) */
  tags: string[];
  /** @description [en] Project link (optional) */
  href?: string;
  /** @description [en] Real preview image (picsum seed) */
  image: string;
}

/**
 * @description [en] Social link interface.
 */
export interface SocialLink {
  platform: string;
  href: string;
  /** @description [en] Tabler icon name */
  icon: string;
  ariaLabel: string;
}

/**
 * @description [en] Capability shown in the marquee strip.
 */
export interface Capability {
  name: string;
}

/**
 * @description [en] Project list. Names are concrete product-style names,
 * not "Project Alpha" slop. Each carries a real preview image.
 */
export const projects: Project[] = [
  {
    id: "meridian",
    translationIndex: 0,
    year: "2025",
    tags: ["React", "NestJS", "PostgreSQL", "WebSocket"],
    href: "https://github.com/X29w",
    image: "https://picsum.photos/seed/meridian-analytics-dark/1200/900",
  },
  {
    id: "halcyon",
    translationIndex: 1,
    year: "2024",
    tags: ["Electron", "React", "Node.js", "SQLite"],
    href: "https://github.com/X29w",
    image: "https://picsum.photos/seed/halcyon-desktop-app/1200/900",
  },
  {
    id: "fieldnote",
    translationIndex: 2,
    year: "2024",
    tags: ["React Native", "Taro", "TypeScript", "GraphQL"],
    href: "https://github.com/X29w",
    image: "https://picsum.photos/seed/fieldnote-mobile-app/1200/900",
  },
  {
    id: "cobalt",
    translationIndex: 3,
    year: "2023",
    tags: ["WebGL", "GLSL", "Motion", "Vite"],
    href: "https://github.com/X29w",
    image: "https://picsum.photos/seed/cobalt-webgl-engine/1200/900",
  },
];

/**
 * @description [en] Social links.
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    href: "https://github.com/X29w",
    icon: "Github",
    ariaLabel: "Visit GitHub profile",
  },
  {
    platform: "LinkedIn",
    href: "https://linkedin.com/in/x29w",
    icon: "Linkedin",
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    platform: "Email",
    href: "mailto:hi@x29.dev",
    icon: "Mail",
    ariaLabel: "Send an email",
  },
];

/**
 * @description [en] Capabilities marquee content (the single marquee on the page).
 * Full-stack + cross-platform breadth.
 */
export const capabilities: Capability[] = [
  { name: 'React' },
  { name: 'TypeScript' },
  { name: 'NestJS' },
  { name: 'Node.js' },
  { name: 'Electron' },
  { name: 'React Native' },
  { name: 'Taro' },
  { name: 'WebGL & GLSL' },
  { name: 'Motion' },
  { name: 'PostgreSQL' },
];

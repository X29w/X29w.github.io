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
 * @description [en] Project list — four real flagship projects spanning
 * full-stack web, desktop, mobile, and an open-source platform. Only the
 * open-source one carries an external href; company/closed projects show the
 * detail modal only.
 */
export const projects: Project[] = [
  {
    id: "storeforge",
    translationIndex: 0,
    year: "2025",
    tags: ["NestJS", "Next.js", "Prisma", "Monorepo"],
    image: "https://picsum.photos/seed/storeforge-lowcode-builder/1200/900",
  },
  {
    id: "ezremote",
    translationIndex: 1,
    year: "2024",
    tags: ["Electron", "WebRTC", "node-pty", "C++ SDK"],
    image: "https://picsum.photos/seed/ezremote-desktop-control/1200/900",
  },
  {
    id: "rewind",
    translationIndex: 2,
    year: "2024",
    tags: ["TypeScript", "NestJS", "SDK", "PostgreSQL"],
    href: "https://github.com/X29w/rewind",
    image: "https://picsum.photos/seed/rewind-monitoring-replay/1200/900",
  },
  {
    id: "wanderlust",
    translationIndex: 3,
    year: "2023",
    tags: ["React Native", "Expo", "TypeScript"],
    image: "https://picsum.photos/seed/wanderlust-travel-social/1200/900",
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

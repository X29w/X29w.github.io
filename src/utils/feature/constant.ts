import elevolutionImage from "@/images/elevolution.png";
import remoteControlImage from "@/images/remote-control.png";
import storeForgeImage from "@/images/storeforge.png";
import rewindImage from "@/images/rewind.png";
import wanderTripImage from "@/images/wandertrip.png";

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
    id: "ezremote",
    translationIndex: 0,
    year: "2026",
    tags: ["Electron", "WebRTC", "node-pty", "C++ SDK"],
    image: remoteControlImage,
  },
  {
    id: "elevolution",
    translationIndex: 1,
    year: "2026",
    tags: ["Electron", "React", "Vite", "TypeScript", "Turborepo"],
    image: elevolutionImage,
  },
  {
    id: "rewind",
    translationIndex: 2,
    year: "2026",
    tags: ["TypeScript", "NestJS", "SDK", "PostgreSQL"],
    image: rewindImage,
  },
  {
    id: "wandertrip",
    translationIndex: 3,
    year: "2024",
    tags: ["React Native", "Expo", "TypeScript"],
    image: wanderTripImage,
  },
  {
    id: "storeforge",
    translationIndex: 4,
    year: "2023",
    tags: ["NestJS", "Next.js", "Prisma", "Monorepo"],
    image: storeForgeImage,
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
];

/**
 * @description [en] Capabilities marquee content (the single marquee on the page).
 * Full-stack + cross-platform breadth.
 */
export const capabilities: Capability[] = [
  { name: "React" },
  { name: "TypeScript" },
  { name: "NestJS" },
  { name: "Node.js" },
  { name: "Electron" },
  { name: "React Native" },
  { name: "Taro" },
  { name: "Motion" },
  { name: "PostgreSQL" },
];

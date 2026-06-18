import type { FC } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  IconBrandReact,
  IconBrandTypescript,
  IconBrandNodejs,
  IconServer,
  IconDeviceDesktop,
  IconBrandReactNative,
  IconBrandTaobao,
  IconBrandGraphql,
  IconBrandTailwind,
  IconBrandVite,
  IconDatabase,
  IconCode,
  type Icon,
} from '@tabler/icons-react';

/**
 * @description [en] Skill matrix as an inline data-vis grid. Each cell is a
 * technology with a name, a category tag, and a proficiency bar. Animates in on
 * scroll, accent-highlights on hover. A compact, engineer-flavoured way to show
 * the stack instead of a flat list.
 */
interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'desktop' | 'mobile' | 'tooling';
  level: number; // 0..100
  icon: Icon;
}

const skills: Skill[] = [
  { name: 'React', category: 'frontend', level: 95, icon: IconBrandReact },
  { name: 'TypeScript', category: 'frontend', level: 92, icon: IconBrandTypescript },
  { name: 'Tailwind', category: 'frontend', level: 90, icon: IconBrandTailwind },
  { name: 'Vite', category: 'tooling', level: 85, icon: IconBrandVite },
  { name: 'NestJS', category: 'backend', level: 88, icon: IconServer },
  { name: 'Node.js', category: 'backend', level: 90, icon: IconBrandNodejs },
  { name: 'GraphQL', category: 'backend', level: 80, icon: IconBrandGraphql },
  { name: 'PostgreSQL', category: 'backend', level: 78, icon: IconDatabase },
  { name: 'Electron', category: 'desktop', level: 86, icon: IconDeviceDesktop },
  { name: 'React Native', category: 'mobile', level: 84, icon: IconBrandReactNative },
  { name: 'Taro', category: 'mobile', level: 80, icon: IconBrandTaobao },
  { name: 'WebGL / GLSL', category: 'frontend', level: 75, icon: IconCode },
];

const CATEGORY_LABEL: Record<Skill['category'], string> = {
  frontend: 'FE',
  backend: 'BE',
  desktop: 'DT',
  mobile: 'MB',
  tooling: 'TL',
};

const SkillMatrix: FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
      {skills.map((skill, i) => {
        const Icon = skill.icon;
        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduce ? 0.3 : 0.55,
              delay: reduce ? 0 : i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative flex flex-col gap-3 bg-background p-5 transition-colors duration-200 hover:bg-surface"
          >
            {/* Top: icon + name + category tag */}
            <div className="flex items-start justify-between">
              <Icon
                className="h-5 w-5 text-muted transition-colors duration-200 group-hover:text-accent"
                stroke={1.5}
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted/70">
                {CATEGORY_LABEL[skill.category]}
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-base text-foreground md:text-lg">
                {skill.name}
              </span>
              <span className="font-mono text-xs tabular-nums text-muted">
                {skill.level}
              </span>
            </div>

            {/* Proficiency bar */}
            <div className="relative h-px w-full bg-border">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: reduce ? 0.4 : 0.9,
                  delay: reduce ? 0 : 0.2 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillMatrix;

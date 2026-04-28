'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from '@/components/feature/project-card';
import { projects } from '@/utils/feature/constant';

/**
 * @description [zh-CN] 移动端项目布局组件，垂直卡片堆叠展示
 * @description [en] Mobile projects layout component with vertical card stack display
 * @description [ja] 垂直カードスタック表示のモバイルプロジェクトレイアウトコンポーネント
 * @description [zh-TW] 行動端專案佈局元件，垂直卡片堆疊展示
 */
const MobileProjectsLayout: FC = () => {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground tracking-tight leading-none">
            {t('title')}
          </h2>
          <div
            className="mt-4 h-px w-24"
            style={{
              background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary), transparent)',
            }}
          />
          <p className="mt-4 text-sm text-muted font-light tracking-wide max-w-xs">
            A selection of recent work
          </p>
        </div>

        {/* Vertical card stack */}
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <div key={project.id} className="relative">
              {/* Decorative number */}
              <span
                className="absolute -top-6 -left-1 text-6xl font-bold pointer-events-none select-none"
                aria-hidden="true"
                style={{
                  color: 'var(--accent)',
                  opacity: 0.05,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <ProjectCard
                titleKey={`projects.items.${project.translationIndex}.name`}
                descriptionKey={`projects.items.${project.translationIndex}.description`}
                detailKey={`projects.items.${project.translationIndex}.detail`}
                tags={project.tags}
                href={project.href}
                image={project.image}
                isMobile
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileProjectsLayout;

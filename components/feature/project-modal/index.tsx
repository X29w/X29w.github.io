'use client';

import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { X, ArrowUpRight } from 'lucide-react';

/**
 * @description [zh-CN] 项目详情模态框组件的属性接口
 * @description [en] ProjectModal component props interface
 * @description [ja] ProjectModal コンポーネントのプロパティインターフェース
 * @description [zh-TW] 專案詳情模態框元件的屬性介面
 */
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleKey: string;
  descriptionKey: string;
  detailKey: string;
  tags: string[];
  href?: string;
  /** @description [zh-CN] 可选的装饰性封面图路径 @description [en] Optional decorative cover image path @description [ja] 任意の装飾用カバー画像パス @description [zh-TW] 可選的裝飾性封面圖路徑 */
  image?: string;
}

/**
 * @description [zh-CN] 项目详情模态框组件，展示项目的完整信息
 * @description [en] Project detail modal component that displays full project information
 * @description [ja] プロジェクトの完全な情報を表示するプロジェクト詳細モーダルコンポーネント
 * @description [zh-TW] 專案詳情模態框元件，展示專案的完整資訊
 */
const ProjectModal: FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  titleKey,
  descriptionKey,
  detailKey,
  tags,
  href,
  image,
}) => {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  // Ensure portal target is available (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-surface/95 backdrop-blur-xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-secondary), transparent)',
              }}
            />

            {/* Decorative cover image area */}
            <div className="relative h-40 md:h-48 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 rounded-t-2xl overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              ) : null}
              {/* Gradient overlay — always present, acts as fallback when no image */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 50%, var(--surface) 100%)',
                  opacity: image ? 0.7 : 1,
                }}
              />
              {/* Decorative dot grid */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle, var(--muted) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  opacity: 0.06,
                }}
              />
              {/* Bottom fade into content */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16"
                style={{ background: 'linear-gradient(to top, var(--surface), transparent)' }}
              />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-muted hover:text-foreground hover:border-accent/40 transition-all duration-200 cursor-pointer"
              aria-label={t('projects.close')}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="pr-8">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                {t(titleKey)}
              </h3>

              <p className="text-sm text-muted mb-4">
                {t(descriptionKey)}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div
                className="h-px w-full mb-6"
                style={{
                  background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary), transparent)',
                  opacity: 0.2,
                }}
              />

              {/* Detail */}
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-6">
                {t(detailKey)}
              </p>

              {/* Link (only if href exists) */}
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/50 px-5 py-2.5 text-sm font-medium text-accent hover:text-accent-secondary hover:border-accent/40 hover:shadow-[0_0_20px_rgba(212,212,216,0.1)] transition-all duration-300"
                >
                  {t('projects.viewProject')}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectModal;

import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { IconX, IconArrowUpRight } from '@tabler/icons-react';
import type { Project } from '@/utils/feature/constant';

/**
 * @description [en] Project detail modal. Sharp editorial panel with a real
 * cover image, full write-up, tags, and an external link. Esc + backdrop close,
 * body scroll lock, focus-friendly.
 */
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal: FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const nameKey = project ? `projects.items.${project.translationIndex}.name` : '';
  const summaryKey = project ? `projects.items.${project.translationIndex}.summary` : '';
  const detailKey = project ? `projects.items.${project.translationIndex}.detail` : '';

  return createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-y-auto border border-border bg-bg"
            style={{ background: 'var(--bg)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cover */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={project.image}
                alt={`${t(nameKey)} cover`}
                className="h-full w-full object-cover"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-background/20 bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-white"
                aria-label={t('projects.close')}
                type="button"
              >
                <IconX className="h-5 w-5" stroke={1.5} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-4xl text-foreground md:text-5xl">
                  {t(nameKey)}
                </h3>
                <span className="font-mono text-sm text-muted">{project.year}</span>
              </div>

              <p className="mt-3 text-base text-accent">{t(summaryKey)}</p>

              <div className="hairline my-7" />

              <p className="max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
                {t(detailKey)}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs uppercase tracking-wider text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-10 inline-flex items-center gap-3 border border-foreground px-6 py-4 font-mono text-sm uppercase tracking-widest text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
                >
                  {t('projects.viewProject')}
                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" stroke={1.5} />
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

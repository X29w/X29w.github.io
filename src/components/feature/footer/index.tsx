import { useCallback } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconArrowUp } from '@tabler/icons-react';

const techStack = ['React', 'TypeScript', 'Motion', 'Tailwind', 'Vite'];

/**
 * @description [en] Minimal editorial footer. Back-to-top, build credit, copyright.
 * No version stamps, no decorative oversized background text.
 */
const Footer: FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-2xl font-medium text-foreground">
              <span className="text-accent">$</span> x29<span className="text-accent">_</span>
            </span>
            <p className="mt-3 max-w-[36ch] text-sm text-muted">
              {t('hero.role')}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent md:self-auto"
          >
            {t('footer.backToTop')}
            <IconArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" stroke={1.5} />
          </button>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs">
            &copy; {year} X29. {t('footer.rights')}.
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
            <span className="text-muted/70">{t('footer.builtWith')}</span>
            {techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

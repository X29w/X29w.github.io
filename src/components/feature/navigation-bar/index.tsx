import { useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { IconMenu2 } from '@tabler/icons-react';
import { ThemeToggle } from '@/components/config/theme-toggle';
import { LanguageSwitcher } from '@/components/config/language-switcher';
import { useActiveSection } from '@/utils/common/use-active-section';
import MobileMenu from '../mobile-menu';

interface NavigationBarProps {
  locale: string;
}

const navLinks = [
  { id: 'hero', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'projects', key: 'projects' },
  { id: 'contact', key: 'contact' },
] as const;

const sectionIds = navLinks.map((l) => l.id);

/**
 * @description [en] Top navigation. Single line at desktop, <= 72px tall. Brand
 * wordmark left, section links center-right, theme + language right. Scroll
 * progress hairline. No scroll listener (Motion useScroll + event).
 */
const NavigationBar: FC<NavigationBarProps> = ({ locale }) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-border bg-background/80 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between md:h-[72px]">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="font-mono text-lg font-medium tracking-tight text-foreground"
          >
            <span className="text-accent">$</span> x29
            <span className="text-accent">_</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                    activeSection === link.id
                      ? 'text-accent'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:text-accent md:hidden"
              aria-label="Open menu"
              type="button"
            >
              <IconMenu2 className="h-5 w-5" stroke={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        locale={locale}
      />
    </>
  );
};

export default NavigationBar;

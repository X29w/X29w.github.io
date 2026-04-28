import { useRef } from 'react';
import type { FC } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import GradientOrb from './gradient-orb';
import { socialLinks } from '@/utils/feature/constant';
import MagneticLink from './magnetic-link';

/**
 * @description [zh-CN] 联系区块组件，包含社交链接和联系方式
 * @description [en] Contact section component with social links and contact information
 * @description [ja] ソーシャルリンクと連絡先情報を含むコンタクトセクションコンポーネント
 * @description [zh-TW] 聯繫區塊元件，包含社交連結和聯繫方式
 */
const ContactSection: FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'end 0.2'],
  });

  // Title
  const titleY = useTransform(scrollYProgress, [0, 0.15], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Animated horizontal line
  const lineScaleX = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

  // Tagline
  const taglineY = useTransform(scrollYProgress, [0.08, 0.22], [30, 0]);
  const taglineOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-56 px-6 overflow-hidden">
      <GradientOrb />

      {/* Animated horizontal line that extends across full width */}
      <motion.div
        className="absolute top-16 md:top-32 left-0 right-0 h-px origin-center"
        style={{
          scaleX: lineScaleX,
          background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-secondary), transparent)',
          opacity: 0.4,
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div className="mb-10" style={{ y: titleY, opacity: titleOpacity }}>
          {/* Large dramatic title with text stroke */}
          <h2
            className="text-3xl font-bold md:text-8xl lg:text-9xl tracking-tight contact-title-stroke"
            style={{
              background: 'linear-gradient(135deg, var(--fg) 0%, var(--accent) 60%, var(--accent-secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('contact.title')}
          </h2>
          <motion.div
            className="mx-auto mt-8 h-px origin-center"
            style={{
              scaleX: lineScaleX,
              width: '10rem',
              background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-secondary), transparent)',
            }}
          />
        </motion.div>

        <motion.p
          className="mb-24 text-lg md:text-xl text-muted max-w-md mx-auto font-light"
          style={{ y: taglineY, opacity: taglineOpacity }}
        >
          {t('contact.tagline')}
        </motion.p>

        {/* Social icons in a horizontal line with dramatic spacing */}
        <div className="flex items-center justify-center gap-6 md:gap-16 lg:gap-24">
          {socialLinks.map((link, i) => (
            <MagneticLink
              key={link.platform}
              href={link.href}
              ariaLabel={link.ariaLabel}
              icon={link.icon}
              platform={link.platform}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* "Or email me directly" */}
        <div className="mt-16 text-sm text-muted/60 font-light">
          or email me directly at{' '}
          <a
            href="mailto:hello@example.com"
            className="text-accent hover:text-accent-secondary underline underline-offset-4 decoration-accent/30 hover:decoration-accent/60 transition-colors duration-300"
          >
            hello@example.com
          </a>
        </div>

        {/* Extra bottom space before footer */}
        <div className="mt-20" aria-hidden="true" />
      </div>
    </section>
  );
};

export default ContactSection;

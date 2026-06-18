import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconArrowUpRight, type Icon } from '@tabler/icons-react';
import { socialLinks } from '@/utils/feature/constant';
import Reveal from '@/components/common/reveal';

const iconMap: Record<string, Icon> = {
  Github: IconBrandGithub,
  Linkedin: IconBrandLinkedin,
  Mail: IconMail,
};

/**
 * @description [en] Contact section. One CTA intent (email). Giant editorial
 * statement, the email as the primary link, social links as a secondary row.
 */
const ContactSection: FC = () => {
  const { t } = useTranslation();
  const email = t('contact.email');
  const social = socialLinks.filter((l) => l.platform !== 'Email');

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28 md:py-48">
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="accent-glow pointer-events-none absolute -bottom-1/4 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2"
      />
      <div className="shell relative">
        <span className="prompt text-sm">$ ./connect --now</span>
        <span className="label mt-4 block">{t('contact.label')}</span>

        <Reveal y={24}>
          <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(3rem,11vw,10rem)] text-foreground">
            {t('contact.heading')}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <Reveal delay={0.05} className="md:col-span-6">
            <p className="max-w-[44ch] text-base leading-relaxed text-muted md:text-lg">
              {t('contact.intro')}
            </p>
          </Reveal>

          <div className="md:col-span-5 md:col-start-8">
            {/* Primary: email */}
            <Reveal delay={0.1}>
              <span className="label">{t('contact.emailLabel')}</span>
              <a
                href={`mailto:${email}`}
                className="group mt-3 flex items-center justify-between gap-4 border-b border-foreground pb-4 font-display text-2xl text-foreground transition-colors duration-300 hover:text-accent md:text-3xl"
              >
                {email}
                <IconArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" stroke={1.5} />
              </a>
            </Reveal>

            {/* Secondary: elsewhere */}
            <Reveal delay={0.16}>
              <span className="label mt-12 block">{t('contact.elsewhere')}</span>
              <ul className="mt-3 divide-y divide-border border-y border-border">
                {social.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <li key={link.platform}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.ariaLabel}
                        className="group flex items-center justify-between py-4 text-foreground transition-colors duration-300 hover:text-accent"
                      >
                        <span className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest">
                          {Icon && <Icon className="h-4 w-4" stroke={1.5} />}
                          {link.platform}
                        </span>
                        <IconArrowUpRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" stroke={1.5} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

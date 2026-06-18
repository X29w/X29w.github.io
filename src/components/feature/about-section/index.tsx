import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/common/reveal';
import CountUp from '@/components/common/count-up';
import SkillMatrix from './skill-matrix';

/**
 * @description [en] Profile section. Asymmetric editorial layout: sticky label
 * column on the left, statement heading + body + stats on the right. Stats use
 * plain layout (no card boxes) per low visual density.
 */
const AboutSection: FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: t('about.stats.yearsValue'), label: t('about.stats.yearsLabel') },
    { value: t('about.stats.projectsValue'), label: t('about.stats.projectsLabel') },
    { value: t('about.stats.stackValue'), label: t('about.stats.stackLabel') },
  ];

  return (
    <section id="about" className="relative scroll-mt-24 py-28 md:py-44">
      <div className="shell">
        <div className="hairline mb-16 md:mb-24" />

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Left rail: label */}
          <div className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <span className="prompt text-sm">$ cat profile.md</span>
              <span className="label mt-4 block">{t('about.label')}</span>
              <span className="mt-2 block font-mono text-sm text-accent">// 01</span>
            </div>
          </div>

          {/* Right: statement + body + stats */}
          <div className="md:col-span-9 md:col-start-4">
            <Reveal>
              <h2 className="max-w-[18ch] font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] text-foreground">
                {t('about.heading')}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
              <Reveal delay={0.05}>
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  {t('about.paragraphOne')}
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  {t('about.paragraphTwo')}
                </p>
              </Reveal>
            </div>

            {/* Stats — plain, divided by hairlines, mono numerals */}
            <div className="mt-20 grid grid-cols-1 border-t border-border sm:grid-cols-3">
              {stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 0.08}
                  className={`flex items-baseline gap-4 border-b border-border py-7 sm:flex-col sm:gap-3 sm:border-b-0 sm:py-9 ${
                    i > 0 ? 'sm:border-l sm:border-border sm:pl-8' : ''
                  }`}
                >
                  <span className="font-mono text-5xl font-medium text-accent md:text-6xl">
                    <CountUp value={Number(stat.value)} />
                    <span aria-hidden="true">+</span>
                  </span>
                  <span className="label">{stat.label}</span>
                </Reveal>
              ))}
            </div>

            {/* Skill matrix — engineer-flavoured data-vis grid */}
            <div className="mt-24">
              <div className="mb-6 flex items-baseline justify-between">
                <span className="prompt text-sm">$ ./stack --proficiency</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {t('about.matrixCount')}
                </span>
              </div>
              <SkillMatrix />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { capabilities } from '@/utils/feature/constant';

/**
 * @description [en] Capabilities strip — the single marquee on the page. Words
 * scroll horizontally, separated by the accent mark. Pure CSS animation,
 * collapses under reduced motion via the global guard.
 */
const CapabilitiesSection: FC = () => {
  const { t } = useTranslation();
  // Double the list for a seamless -50% loop.
  const loop = [...capabilities, ...capabilities];

  return (
    <section className="relative overflow-hidden border-y border-border py-10 md:py-14">
      <span className="prompt shell mb-2 block text-sm">$ ./stack --list</span>
      <span className="label shell mb-8 block">{t('capabilities.label')}</span>
      <div className="marquee-track">
        {loop.map((cap, i) => (
          <span
            key={`${cap.name}-${i}`}
            className="flex shrink-0 items-center font-display text-[clamp(2rem,6vw,5rem)] text-foreground"
          >
            <span className="px-8">{cap.name}</span>
            <span className="text-accent" aria-hidden="true">
              ::
            </span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default CapabilitiesSection;

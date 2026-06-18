import { useRef, useState, useEffect, type FC } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { projects } from '@/utils/feature/constant';
import ProjectShowcaseCard from '@/components/feature/project-card';
import ProjectModal from '@/components/feature/project-modal';

/**
 * @description [en] Selected work as a horizontal scroll-hijack: the section
 * pins while vertical scroll drives a horizontal pan through large showcase
 * cards. Implemented with Motion's useScroll (sticky inner track) per the
 * taste-skill horizontal-pan pattern — pin starts at top, scrubbed travel.
 * On mobile and under reduced motion it collapses to a vertical stack.
 */
const ProjectsSection: FC = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches && !reduce);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  // Measure how far the track must travel horizontally.
  useEffect(() => {
    if (!isDesktop) {
      setDistance(0);
      return;
    }
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="projects" ref={sectionRef} className="relative scroll-mt-24">
      {isDesktop ? (
        // Pinned horizontal pan. Section height = viewport + travel distance.
        <div style={{ height: `calc(100vh + ${distance}px)` }}>
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <div className="shell mb-10 flex items-end justify-between">
              <div>
                <span className="prompt text-sm">$ ls ./work --selected</span>
                <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,5rem)] text-foreground">
                  {t('projects.heading')}
                </h2>
              </div>
              <span className="font-mono text-sm text-muted">
                [ {String(projects.length).padStart(2, '0')} ]
              </span>
            </div>

            <motion.div ref={trackRef} style={{ x }} className="flex items-stretch gap-8 px-[6vw]">
              {projects.map((project, index) => (
                <ProjectShowcaseCard
                  key={project.id}
                  index={index}
                  year={project.year}
                  image={project.image}
                  nameKey={`projects.items.${project.translationIndex}.name`}
                  summaryKey={`projects.items.${project.translationIndex}.summary`}
                  tags={project.tags}
                  onOpen={() => setActiveIndex(index)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        // Mobile / reduced-motion: vertical stack.
        <div className="py-24">
          <div className="shell mb-12">
            <span className="prompt text-sm">$ ls ./work --selected</span>
            <h2 className="mt-3 font-display text-4xl text-foreground">{t('projects.heading')}</h2>
          </div>
          <div className="shell flex flex-col gap-10">
            {projects.map((project, index) => (
              <ProjectShowcaseCard
                key={project.id}
                index={index}
                year={project.year}
                image={project.image}
                nameKey={`projects.items.${project.translationIndex}.name`}
                summaryKey={`projects.items.${project.translationIndex}.summary`}
                tags={project.tags}
                onOpen={() => setActiveIndex(index)}
                stacked
              />
            ))}
          </div>
        </div>
      )}

      <ProjectModal
        isOpen={activeIndex !== null}
        onClose={() => setActiveIndex(null)}
        project={activeIndex !== null ? projects[activeIndex] : null}
      />
    </section>
  );
};

export default ProjectsSection;

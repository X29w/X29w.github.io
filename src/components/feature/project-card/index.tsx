import { useRef, type FC } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { useTranslation } from 'react-i18next';
import { IconArrowUpRight } from '@tabler/icons-react';

/**
 * @description [en] Large showcase card. On desktop it tilts in 3D toward the
 * cursor with a moving accent spotlight; in the horizontal-pan track it reads as
 * a gallery panel. On mobile (stacked) it is a static image + meta block.
 * Tilt uses motion values only (no per-frame React state).
 */
interface ProjectShowcaseCardProps {
  index: number;
  year: string;
  image: string;
  nameKey: string;
  summaryKey: string;
  tags: string[];
  onOpen: () => void;
  stacked?: boolean;
}

const ProjectShowcaseCard: FC<ProjectShowcaseCardProps> = ({
  index,
  year,
  image,
  nameKey,
  summaryKey,
  tags,
  onOpen,
  stacked,
}) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useMotionValue(50);
  const sy = useMotionValue(50);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20 });
  const spotX = useSpring(sx, { stiffness: 200, damping: 25 });
  const spotY = useSpring(sy, { stiffness: 200, damping: 25 });
  const spotlight = useTransform(
    [spotX, spotY],
    ([px, py]) =>
      `radial-gradient(420px circle at ${px}% ${py}%, rgba(var(--accent-rgb),0.18), transparent 60%)`,
  );

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || stacked) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    sx.set(px * 100);
    sy.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    sx.set(50);
    sy.set(50);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={stacked ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative block overflow-hidden border border-border bg-surface text-left transition-colors duration-300 hover:border-accent/50 ${
        stacked ? 'w-full' : 'h-[64vh] w-[78vw] shrink-0 md:w-[46vw] lg:w-[40vw]'
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${stacked ? 'h-52' : 'h-[62%]'}`}>
        <img
          src={image}
          alt={`${t(nameKey)} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--surface), transparent 55%)' }}
        />
        {/* Index badge */}
        <span className="absolute left-4 top-4 font-mono text-xs text-accent">
          {String(index + 1).padStart(2, '0')} / {year}
        </span>
        {/* Cursor spotlight (desktop only) */}
        {!stacked && !reduce && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: spotlight }}
          />
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-3 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-2xl text-foreground md:text-4xl">{t(nameKey)}</h3>
          <IconArrowUpRight
            className="h-6 w-6 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            stroke={1.5}
          />
        </div>
        <p className="text-sm text-muted md:text-base">{t(summaryKey)}</p>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
          {tags.map((tag) => (
            <span key={tag} className="font-mono text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
};

export default ProjectShowcaseCard;

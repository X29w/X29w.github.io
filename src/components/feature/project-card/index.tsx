import { useRef, useState, useCallback } from 'react';
import type { FC } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Eye } from 'lucide-react';
import ProjectModal from '@/components/feature/project-modal';

/**
 * @description [zh-CN] 项目卡片组件的属性接口
 * @description [en] ProjectCard component props interface
 * @description [ja] ProjectCard コンポーネントのプロパティインターフェース
 * @description [zh-TW] 專案卡片元件的屬性介面
 */
interface ProjectCardProps {
  titleKey: string;
  descriptionKey: string;
  detailKey: string;
  tags: string[];
  href?: string;
  image?: string;
  isMobile?: boolean;
}

/**
 * @description [zh-CN] 根据鼠标在卡片上的位置计算 3D 倾斜角度
 * @description [en] Computes 3D tilt angles based on mouse position over the card
 * @description [ja] カード上のマウス位置に基づいて 3D チルト角度を計算する
 * @description [zh-TW] 根據滑鼠在卡片上的位置計算 3D 傾斜角度
 */
export const computeTiltAngle = (
  x: number,
  y: number,
  width: number,
  height: number,
): { rotateX: number; rotateY: number } => {
  if (
    !Number.isFinite(x) || !Number.isFinite(y) ||
    !Number.isFinite(width) || !Number.isFinite(height) ||
    width === 0 || height === 0
  ) {
    return { rotateX: 0, rotateY: 0 };
  }
  const normalizedX = (x - width / 2) / (width / 2);
  const normalizedY = (y - height / 2) / (height / 2);
  const rotateY = Math.min(15, Math.max(-15, normalizedX * 15));
  const rotateX = Math.min(15, Math.max(-15, -normalizedY * 15));
  return { rotateX, rotateY };
};


/**
 * @description [zh-CN] 项目卡片组件，支持 3D 倾斜效果和悬停交互
 * @description [en] Project card component with 3D tilt effect and hover interactions
 * @description [ja] 3D チルトエフェクトとホバーインタラクションを備えたプロジェクトカードコンポーネント
 * @description [zh-TW] 專案卡片元件，支援 3D 傾斜效果和懸停互動
 */
const ProjectCard: FC<ProjectCardProps> = ({ titleKey, descriptionKey, detailKey, tags, href, image, isMobile }) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt(computeTiltAngle(x, y, rect.width, rect.height));
    setMousePos({ x, y });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  return (
    <>
      <motion.button
        ref={cardRef as React.RefObject<HTMLButtonElement>}
        type="button"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setModalOpen(true)}
        animate={isMobile ? undefined : { rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        whileHover={isMobile ? undefined : { y: -8 }}
        style={isMobile ? undefined : { perspective: 800, transformStyle: 'preserve-3d' }}
        className={`relative rounded-2xl bg-surface/50 backdrop-blur-md border border-white/[0.08] group overflow-hidden h-full cursor-pointer w-full text-left ${
          isMobile ? 'p-5' : 'p-8'
        }`}
      >
        {/* Gradient border overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          aria-hidden="true"
          style={{
            padding: '1px',
            background: isHovered
              ? 'linear-gradient(135deg, var(--accent), var(--accent-secondary), transparent, var(--accent))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.06), transparent, rgba(255,255,255,0.03))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            transition: 'background 0.5s ease',
            opacity: isHovered ? 0.8 : 0.4,
          }}
        />

        {/* Cursor-following spotlight glow */}
        {isHovered && !isMobile && (
          <div
            className="absolute pointer-events-none"
            aria-hidden="true"
            style={{
              left: mousePos.x - 150,
              top: mousePos.y - 150,
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
              opacity: 0.12,
              filter: 'blur(30px)',
            }}
          />
        )}

        {/* Gradient preview area at top */}
        <div
          className={`relative overflow-hidden rounded-t-2xl ${
            isMobile ? 'h-28 -mx-5 -mt-5 mb-5' : 'h-40 -mx-8 -mt-8 mb-8'
          }`}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, var(--accent), var(--accent-secondary))'
                : 'linear-gradient(135deg, var(--surface), var(--bg))',
              backgroundSize: isHovered ? '200% 200%' : '100% 100%',
              animation: isHovered ? 'gradientShift 3s ease infinite' : 'none',
              transition: 'background 0.5s ease',
              opacity: isHovered ? 0.15 : 0.5,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--muted) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              opacity: isHovered ? 0.15 : 0.05,
              transition: 'opacity 0.5s ease',
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-secondary), transparent)',
              opacity: isHovered ? 0.8 : 0.2,
              transition: 'opacity 0.3s ease',
            }}
          />
        </div>

        <div className="relative">
          <h3 className={`font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300 ${
            isMobile ? 'text-lg' : 'text-xl'
          }`}>
            {t(titleKey)}
          </h3>
          <p className="text-sm text-muted mb-6 leading-relaxed">
            {t(descriptionKey)}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-muted font-mono group-hover:border-accent/20 group-hover:text-accent/80 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Details button */}
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 px-5 py-2.5 text-sm font-medium text-accent group-hover:text-accent-secondary group-hover:border-accent/40 transition-all duration-300">
            {t('projects.viewDetails')}
            <Eye className="h-4 w-4" />
          </span>
        </div>
      </motion.button>

      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        titleKey={titleKey}
        descriptionKey={descriptionKey}
        detailKey={detailKey}
        tags={tags}
        href={href}
        image={image}
      />
    </>
  );
};

export default ProjectCard;

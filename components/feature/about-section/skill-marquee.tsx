import type { FC } from 'react';
import SkillTag from '@/components/feature/skill-tag';
import { skills } from '@/utils/feature/constant';

/**
 * @description [zh-CN] 水平滚动技能标签跑马灯组件
 * @description [en] Horizontal scrolling skill tag marquee component
 * @description [ja] 水平スクロールスキルタグマーキーコンポーネント
 * @description [zh-TW] 水平捲動技能標籤跑馬燈元件
 */
const SkillMarquee: FC = () => {
  return (
    <div className="relative overflow-hidden py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />

      <div className="flex" style={{ animation: 'marquee 30s linear infinite', width: 'max-content' }}>
        {/* Double the skills for seamless loop */}
        {[...skills, ...skills].map((skill, i) => (
          <div key={`${skill.name}-${i}`} className="mx-1.5 flex-shrink-0">
            <SkillTag name={skill.name} icon={skill.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillMarquee;

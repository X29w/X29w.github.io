import type { FC } from 'react';
import { useMediaQuery } from '@/utils/common/use-media-query';
import MobileProjectsLayout from './mobile-projects-layout';
import DesktopProjectsLayout from './desktop-projects-layout';

/**
 * @description [zh-CN] 项目展示区块组件，根据屏幕尺寸自动切换移动端和桌面端布局
 * @description [en] Projects section component that automatically switches between mobile and desktop layouts based on screen size
 * @description [ja] 画面サイズに基づいてモバイルとデスクトップレイアウトを自動切り替えするプロジェクトセクションコンポーネント
 * @description [zh-TW] 專案展示區塊元件，根據螢幕尺寸自動切換行動端和桌面端佈局
 */
const ProjectsSection: FC = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return isMobile ? <MobileProjectsLayout /> : <DesktopProjectsLayout />;
};

export default ProjectsSection;

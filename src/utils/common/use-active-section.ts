import { useState, useEffect } from 'react';

/**
 * @description [zh-CN] 使用 IntersectionObserver 跟踪当前可见的页面区域。返回当前活跃区域的 ID。
 * @description [en] Tracks the currently visible page section using IntersectionObserver. Returns the active section ID.
 * @description [ja] IntersectionObserver を使用して現在表示されているページセクションを追跡する。アクティブなセクション ID を返す。
 * @description [zh-TW] 使用 IntersectionObserver 追蹤當前可見的頁面區域。返回當前活躍區域的 ID。
 */
export const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3 }
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};

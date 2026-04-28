import { useEffect, useState } from 'react';

/**
 * @description [zh-CN] 跟踪 CSS 媒体查询是否匹配的 Hook。在 SSR 和初始渲染时返回 false。
 * @description [en] Hook that tracks whether a CSS media query matches. Returns false during SSR and on initial render.
 * @description [ja] CSS メディアクエリが一致するかどうかを追跡する Hook。SSR および初回レンダリング時は false を返す。
 * @description [zh-TW] 追蹤 CSS 媒體查詢是否匹配的 Hook。在 SSR 和初始渲染時返回 false。
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

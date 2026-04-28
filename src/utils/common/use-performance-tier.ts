import { useEffect, useState } from 'react';

/**
 * @description [zh-CN] 设备性能档位
 * @description [en] Device performance tier
 */
export type PerformanceTier = 'high' | 'medium' | 'low';

/**
 * @description [zh-CN] 检测设备性能档位的 Hook。
 * - high:   桌面端高性能设备（8+ 核心 / 8GB+ 内存）
 * - medium: 普通桌面端或高端移动端
 * - low:    低端设备或移动端
 *
 * @description [en] Hook that detects device performance tier.
 * - high:   Desktop with 8+ CPU cores or 8GB+ RAM
 * - medium: Average desktop or high-end mobile
 * - low:    Low-end device or mobile
 */
export const usePerformanceTier = (): PerformanceTier => {
  const [tier, setTier] = useState<PerformanceTier>('medium');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const nav = navigator as Navigator & {
      hardwareConcurrency?: number;
      deviceMemory?: number;
      connection?: { effectiveType?: string; saveData?: boolean };
    };

    const cores = nav.hardwareConcurrency ?? 4;
    const memory = nav.deviceMemory ?? 4; // GB, only available in Chrome
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const saveData = nav.connection?.saveData ?? false;
    const slowNetwork = ['slow-2g', '2g', '3g'].includes(nav.connection?.effectiveType ?? '');

    if (saveData || slowNetwork || isMobile) {
      setTier('low');
      return;
    }

    if (cores >= 8 && memory >= 8) {
      setTier('high');
    } else if (cores >= 4 && memory >= 4) {
      setTier('medium');
    } else {
      setTier('low');
    }
  }, []);

  return tier;
};

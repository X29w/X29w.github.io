'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'motion/react';
import { useMediaQuery } from './use-media-query';

/**
 * @description [zh-CN] 跟踪鼠标光标位置并使用弹簧平滑处理的 Hook。仅在指针设备（pointer: fine）上跟踪。返回 x 和 y 坐标的 motion values。
 * @description [en] Hook that tracks mouse cursor position with spring-based smoothing. Only tracks on pointer devices (pointer: fine). Returns motion values for x and y coordinates.
 * @description [ja] マウスカーソルの位置をスプリングベースのスムージングで追跡する Hook。ポインターデバイス（pointer: fine）でのみ追跡する。x と y 座標の motion values を返す。
 * @description [zh-TW] 追蹤滑鼠游標位置並使用彈簧平滑處理的 Hook。僅在指標裝置（pointer: fine）上追蹤。返回 x 和 y 座標的 motion values。
 */
export const useCursorPosition = () => {
  const isPointerDevice = useMediaQuery('(pointer: fine)');

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!isPointerDevice || typeof window === 'undefined') {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isPointerDevice, cursorX, cursorY]);

  return { x, y };
};

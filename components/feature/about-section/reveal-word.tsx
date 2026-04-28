'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { useMotionValueEvent, type MotionValue } from 'motion/react';

/**
 * @description [zh-CN] 根据滚动进度逐字显示的文字组件的属性接口
 * @description [en] RevealWord component props interface
 * @description [ja] RevealWord コンポーネントのプロパティインターフェース
 * @description [zh-TW] 根據捲動進度逐字顯示的文字元件的屬性介面
 */
interface RevealWordProps {
  word: string;
  index: number;
  wordCount: MotionValue<number>;
}

/**
 * @description [zh-CN] 根据滚动进度逐字显示的文字组件
 * @description [en] Word component that reveals based on scroll progress
 * @description [ja] スクロール進行に基づいて表示されるワードコンポーネント
 * @description [zh-TW] 根據捲動進度逐字顯示的文字元件
 */
const RevealWord: FC<RevealWordProps> = ({ word, index, wordCount }) => {
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(wordCount, 'change', (latest) => {
    setVisible(index < latest);
  });

  return (
    <span
      className="transition-opacity duration-150"
      style={{ opacity: visible ? 1 : 0.15 }}
    >
      {word}{' '}
    </span>
  );
};

export default RevealWord;

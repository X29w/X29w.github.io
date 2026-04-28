'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CYCLING_WORDS = ['Developer', 'Designer', 'Creator', 'Engineer'];

/**
 * @description [zh-CN] 文字循环切换组件，自动轮播显示不同的词语
 * @description [en] Word cycling component that automatically rotates through different words
 * @description [ja] 異なる単語を自動的にローテーション表示するワードサイクリングコンポーネント
 * @description [zh-TW] 文字循環切換元件，自動輪播顯示不同的詞語
 */
const WordCycler: FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom" style={{ minWidth: '2ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={CYCLING_WORDS[index]}
          initial={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute left-0"
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {CYCLING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default WordCycler;

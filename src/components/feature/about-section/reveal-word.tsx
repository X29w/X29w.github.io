import { useState } from 'react';
import type { FC } from 'react';
import { useMotionValueEvent } from 'motion/react';
import type { MotionValue } from 'motion/react';

interface RevealWordProps {
  word: string;
  index: number;
  wordCount: MotionValue<number>;
}

const RevealWord: FC<RevealWordProps> = ({ word, index, wordCount }) => {
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(wordCount, 'change', (latest) => {
    setVisible(latest > index);
  });

  return (
    <span
      className="inline-block transition-all duration-300 mr-[0.25em]"
      style={{
        opacity: visible ? 1 : 0.15,
        filter: visible ? 'blur(0px)' : 'blur(2px)',
      }}
    >
      {word}
    </span>
  );
};

export default RevealWord;

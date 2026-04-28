import type { FC } from 'react';

/**
 * @description [zh-CN] WebGL 不支持时的 CSS 渐变动画回退组件
 * @description [en] CSS gradient animation fallback component when WebGL is not supported
 * @description [ja] WebGL がサポートされていない場合の CSS グラデーションアニメーションフォールバックコンポーネント
 * @description [zh-TW] WebGL 不支援時的 CSS 漸變動畫回退元件
 */
const SceneFallback: FC = () => {
  return (
    <div
      className="h-full w-full"
      aria-hidden="true"
      role="presentation"
      style={{
        background:
          'linear-gradient(-45deg, var(--accent), var(--accent-secondary), var(--bg), var(--accent))',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite',
      }}
    />
  );
};

export default SceneFallback;

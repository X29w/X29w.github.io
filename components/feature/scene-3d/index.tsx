'use client';

import { Suspense, useCallback, useRef } from 'react';
import type { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { themes } from '@/utils/config/theme-config';
import HeroGeometry from '@/components/feature/hero-geometry';
import ParticleField from '@/components/feature/particle-field';

// Suppress THREE.Clock deprecation warning from @react-three/fiber internals.
// R3F hasn't updated to use THREE.Timer yet. Safe to ignore.
if (typeof window !== 'undefined') {
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
    origWarn.apply(console, args);
  };
}

/**
 * @description [zh-CN] 3D 场景组件的属性接口
 * @description [en] Scene3D component props interface
 * @description [ja] Scene3D コンポーネントのプロパティインターフェース
 * @description [zh-TW] 3D 場景元件的屬性介面
 */
interface Scene3DProps {
  theme: 'light' | 'dark';
  reducedQuality: boolean;
}

/**
 * @description [zh-CN] 3D 场景容器组件，针对性能优化并增强视觉效果
 * @description [en] 3D scene container optimized for performance with enhanced visuals
 * @description [ja] パフォーマンスに最適化され、ビジュアルが強化された 3D シーンコンテナコンポーネント
 * @description [zh-TW] 3D 場景容器元件，針對效能最佳化並增強視覺效果
 */
const Scene3D: FC<Scene3DProps> = ({ theme, reducedQuality }) => {
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      };
    },
    [],
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
      role="presentation"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={reducedQuality ? 1 : [1, 2]}
        gl={{
          antialias: !reducedQuality,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight
            position={[5, 5, 5]}
            intensity={1}
            color={themes[theme].sceneLight}
          />
          <pointLight
            position={[-5, -3, 3]}
            intensity={0.5}
            color={themes[theme].particle}
          />
          {/* Additional rim light for depth */}
          <pointLight
            position={[0, -5, -5]}
            intensity={0.3}
            color={themes[theme].accentSecondary}
          />
          <HeroGeometry
            theme={theme}
            reducedQuality={reducedQuality}
            mouseRef={mouseRef}
          />
          <ParticleField theme={theme} reducedQuality={reducedQuality} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;

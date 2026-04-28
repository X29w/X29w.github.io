import { useRef, useMemo } from 'react';
import type { FC } from 'react';
import { useFrame } from '@react-three/fiber';
import { themes } from '@/utils/config/theme-config';
import * as THREE from 'three';

/**
 * @description [zh-CN] 粒子场组件的属性接�?
 * @description [en] ParticleField component props interface
 * @description [ja] ParticleField コンポーネントのプロパティインターフェー�?
 * @description [zh-TW] 粒子場元件的屬性介�?
 */
interface ParticleFieldProps {
  theme: 'light' | 'dark';
  reducedQuality: boolean;
}

/**
 * @description [zh-CN] 在球体体积内创建随机分布的粒子位�?
 * @description [en] Creates randomly distributed particle positions within a sphere volume
 * @description [ja] 球体ボリューム内にランダムに分布したパーティクル位置を作成す�?
 * @description [zh-TW] 在球體體積內建立隨機分佈的粒子位�?
 */
const createSpherePositions = (count: number, radius: number): Float32Array => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
};

/**
 * @description [zh-CN] 在球壳区域内创建随机分布的粒子位�?
 * @description [en] Creates randomly distributed particle positions within a spherical shell region
 * @description [ja] 球殻領域内にランダムに分布したパーティクル位置を作成す�?
 * @description [zh-TW] 在球殼區域內建立隨機分佈的粒子位�?
 */
const createShellPositions = (count: number, minR: number, maxR: number): Float32Array => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = minR + Math.random() * (maxR - minR);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
};

/**
 * @description [zh-CN] 为粒子创建不同大小的尺寸数组
 * @description [en] Creates varying sizes array for particles
 * @description [ja] パーティクル用のさまざまなサイズの配列を作成する
 * @description [zh-TW] 為粒子建立不同大小的尺寸陣列
 */
const createSizes = (count: number, minSize: number, maxSize: number): Float32Array => {
  const arr = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    arr[i] = minSize + Math.random() * (maxSize - minSize);
  }
  return arr;
};

/**
 * @description [zh-CN] 增强型双层粒子场组件，带有不同大小和微妙的脉冲动�?
 * @description [en] Enhanced dual-layer particle field with varying sizes and subtle pulse animation
 * @description [ja] さまざまなサイズと微妙なパルスアニメーションを備えた強化デュアルレイヤーパーティクルフィール�?
 * @description [zh-TW] 增強型雙層粒子場元件，帶有不同大小和微妙的脈衝動�?
 */
const ParticleField: FC<ParticleFieldProps> = ({ theme, reducedQuality }) => {
  const innerRef = useRef<THREE.Points>(null);
  const outerRef = useRef<THREE.Points>(null);
  const themeColors = themes[theme];

  const innerCount = reducedQuality ? 300 : 1200;
  const outerCount = reducedQuality ? 150 : 600;

  const innerGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(createSpherePositions(innerCount, 3), 3));
    return geo;
  }, [innerCount]);

  const outerGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(createShellPositions(outerCount, 3.5, 8), 3));
    return geo;
  }, [outerCount]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.03;
      innerRef.current.rotation.x += delta * 0.01;

      // Update size only every ~10 frames to reduce material state changes
      // On reduced quality, skip size animation entirely
      if (!reducedQuality && Math.round(time * 6) % 10 === 0) {
        const mat = innerRef.current.material as THREE.PointsMaterial;
        mat.size = 0.03 + Math.sin(time * 0.5) * 0.005;
      }
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.015;
      outerRef.current.rotation.z += delta * 0.008;

      if (!reducedQuality && Math.round(time * 6) % 10 === 0) {
        const mat = outerRef.current.material as THREE.PointsMaterial;
        mat.size = 0.022 + Math.cos(time * 0.3) * 0.003;
      }
    }
  });

  const particleColor = useMemo(
    () => new THREE.Color(themeColors.particle),
    [themeColors.particle],
  );

  const accentColor = useMemo(
    () => new THREE.Color(themeColors.sceneMaterial),
    [themeColors.sceneMaterial],
  );

  return (
    <>
      <points ref={innerRef} geometry={innerGeometry}>
        <pointsMaterial
          color={particleColor}
          size={reducedQuality ? 0.025 : 0.03}
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={outerRef} geometry={outerGeometry}>
        <pointsMaterial
          color={accentColor}
          size={reducedQuality ? 0.015 : 0.022}
          transparent
          opacity={0.3}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};

export default ParticleField;

'use client';

import { useRef, useMemo } from 'react';
import type { FC } from 'react';
import { useFrame } from '@react-three/fiber';
import { themes } from '@/utils/config/theme-config';
import * as THREE from 'three';

/**
 * @description [zh-CN] 英雄几何体组件的属性接口
 * @description [en] HeroGeometry component props interface
 * @description [ja] HeroGeometry コンポーネントのプロパティインターフェース
 * @description [zh-TW] 英雄幾何體元件的屬性介面
 */
interface HeroGeometryProps {
  theme: 'light' | 'dark';
  reducedQuality: boolean;
  mouseRef: React.RefObject<{ x: number; y: number } | null>;
}

/**
 * @description [zh-CN] 变形线框二十面体组件，带有扭曲效果、发光边缘和环绕轨道环
 * @description [en] Morphing wireframe icosahedron with distortion, glowing edges, and orbiting rings
 * @description [ja] 歪み、発光エッジ、周回リングを備えたモーフィングワイヤーフレーム正二十面体コンポーネント
 * @description [zh-TW] 變形線框二十面體元件，帶有扭曲效果、發光邊緣和環繞軌道環
 */
const HeroGeometry: FC<HeroGeometryProps> = ({
  theme,
  reducedQuality,
  mouseRef,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const mainRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const themeColors = themes[theme];

  const materialColor = useMemo(
    () => new THREE.Color(themeColors.sceneMaterial),
    [themeColors.sceneMaterial],
  );

  const accentColor = useMemo(
    () => new THREE.Color(themeColors.particle),
    [themeColors.particle],
  );

  // Create wireframe edges geometry for glowing effect
  const edgesGeometry = useMemo(() => {
    const detail = reducedQuality ? 1 : 2;
    const ico = new THREE.IcosahedronGeometry(1.4, detail);
    return new THREE.EdgesGeometry(ico);
  }, [reducedQuality]);

  const icoDetail = reducedQuality ? 1 : 2;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Smooth auto-rotation
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += delta * 0.04;

    // Mouse parallax — more responsive
    const mouse = mouseRef.current;
    if (mouse) {
      groupRef.current.rotation.z +=
        (mouse.x * 0.25 - groupRef.current.rotation.z) * 0.04;
      groupRef.current.rotation.x +=
        (mouse.y * 0.15 - groupRef.current.rotation.x) * 0.02;
    }

    // Distort the main geometry vertices for morphing effect
    if (mainRef.current) {
      const geo = mainRef.current.geometry;
      const positions = geo.attributes.position;
      if (positions) {
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          const z = positions.getZ(i);
          const len = Math.sqrt(x * x + y * y + z * z);
          if (len > 0) {
            const distortion = 1 + Math.sin(time * 0.8 + x * 3 + y * 2) * 0.08
              + Math.cos(time * 0.6 + z * 4) * 0.05;
            const targetLen = 1.4 * distortion;
            const scale = targetLen / len;
            positions.setXYZ(i, x * scale, y * scale, z * scale);
          }
        }
        positions.needsUpdate = true;
      }
    }

    // Orbiting rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4;
      ring1Ref.current.rotation.z += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.3;
      ring2Ref.current.rotation.x += delta * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.25;
      ring3Ref.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main morphing icosahedron — wireframe */}
      <mesh ref={mainRef}>
        <icosahedronGeometry args={[1.4, icoDetail]} />
        <meshBasicMaterial
          color={materialColor}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glowing edges overlay */}
      <lineSegments geometry={edgesGeometry} ref={wireRef}>
        <lineBasicMaterial
          color={accentColor}
          transparent
          opacity={0.5}
          linewidth={1}
        />
      </lineSegments>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* Orbiting ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.01, 16, 100]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.35} />
      </mesh>

      {/* Orbiting ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.6, 0.008, 16, 100]} />
        <meshBasicMaterial color={materialColor} transparent opacity={0.2} />
      </mesh>

      {/* Orbiting ring 3 */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[1.9, 0.006, 16, 80]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

export default HeroGeometry;

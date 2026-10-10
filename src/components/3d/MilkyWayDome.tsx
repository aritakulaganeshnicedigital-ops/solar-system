import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getMilkyWayTexture } from '../../utils/textureGenerator';

interface MilkyWayDomeProps {
  revealOpacity: number; // 0.05 to 0.95
}

export const MilkyWayDome: React.FC<MilkyWayDomeProps> = ({ revealOpacity }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => getMilkyWayTexture(), []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.002;
    }
  });

  return (
    <group rotation={[0.4, 0.2, -0.3]}>
      {/* Expansive Celestial Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[750, 48, 48]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.BackSide}
          transparent
          opacity={Math.min(0.95, Math.max(0.1, revealOpacity))}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

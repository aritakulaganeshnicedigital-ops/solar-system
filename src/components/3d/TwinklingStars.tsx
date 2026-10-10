import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TwinklingStarsProps {
  count?: number;
  brilliance?: number;
}

export const TwinklingStars: React.FC<TwinklingStarsProps> = ({ count = 3500, brilliance = 1.0 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Pre-generate star positions and natural star colors (no pink)
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 480 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Natural stellar colors: Ice blue, diamond white, soft solar amber
      const tint = Math.random();
      if (tint > 0.65) {
        col[i * 3] = 0.75; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 1.0; // Ice blue
      } else if (tint > 0.35) {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.96; col[i * 3 + 2] = 0.88; // Warm starlight
      } else {
        col[i * 3] = 1.0; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 1.0; // Diamond white
      }
    }

    return [pos, col];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.size = Math.min(3.2, 1.5 * Math.sqrt(Math.max(0.5, brilliance)));
    mat.opacity = Math.min(1.0, 0.7 * brilliance);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.6}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

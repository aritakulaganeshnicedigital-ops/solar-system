import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TwinklingStarsProps {
  count?: number;
  brilliance?: number; // Global brightness multiplier
}

export const TwinklingStars: React.FC<TwinklingStarsProps> = ({ count = 3500, brilliance = 1.0 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Pre-generate star positions and random twinkle phase / speeds
  const [positions, phases, speeds, baseSizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const pha = new Float32Array(count);
    const spd = new Float32Array(count);
    const siz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Celestial sphere distribution (radius 480 - 580)
      const r = 480 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      pha[i] = Math.random() * Math.PI * 2;
      spd[i] = 1.2 + Math.random() * 3.5;
      siz[i] = 1.2 + Math.random() * 2.2;

      // Color tints: blue-white, pure diamond white, warm yellow, violet
      const tint = Math.random();
      if (tint > 0.7) {
        col[i * 3] = 0.7; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1.0; // Cyan-blue
      } else if (tint > 0.4) {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.95; col[i * 3 + 2] = 0.8; // Warm golden
      } else if (tint > 0.2) {
        col[i * 3] = 0.9; col[i * 3 + 1] = 0.75; col[i * 3 + 2] = 1.0; // Violet
      } else {
        col[i * 3] = 1.0; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 1.0; // Pure white
      }
    }

    return [pos, pha, spd, siz, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();

    // Twinkle material size pulsation
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    // Base size modulated by global brilliance
    mat.size = Math.min(3.5, 1.6 * Math.sqrt(Math.max(0.5, brilliance)));
    mat.opacity = Math.min(1.0, 0.7 * brilliance);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.8}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

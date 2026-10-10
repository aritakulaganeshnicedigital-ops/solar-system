import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CosmicDustProps {
  density?: number;
  brilliance?: number;
}

export const CosmicDust: React.FC<CosmicDustProps> = ({ density = 1200, brilliance = 1.0 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 3D natural starlight dust cloud distribution
  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(density * 3);
    const vel = new Float32Array(density * 3);
    const col = new Float32Array(density * 3);

    // Natural clean starlight palette (no pink)
    const palette = [
      new THREE.Color('#38bdf8'), // Ice cyan
      new THREE.Color('#94a3b8'), // Starlight slate
      new THREE.Color('#f8fafc'), // Diamond white
      new THREE.Color('#cbd5e1'), // Pale silver
    ];

    for (let i = 0; i < density; i++) {
      const r = 20 + Math.random() * 220;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = r * Math.cos(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi) * Math.sin(theta);

      vel[i * 3] = (Math.random() - 0.5) * 0.7;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.7;

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, vel, col];
  }, [density]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < density; i++) {
      let x = posAttr.getX(i) + velocities[i * 3] * delta;
      let y = posAttr.getY(i) + velocities[i * 3 + 1] * delta;
      let z = posAttr.getZ(i) + velocities[i * 3 + 2] * delta;

      if (x > 240) x = -240;
      else if (x < -240) x = 240;
      if (y > 180) y = -180;
      else if (y < -180) y = 180;
      if (z > 240) z = -240;
      else if (z < -240) z = 240;

      posAttr.setXYZ(i, x, y, z);
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.1}
        vertexColors
        transparent
        opacity={Math.min(0.75, 0.4 * brilliance)}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

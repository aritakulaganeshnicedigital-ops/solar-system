import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html, Line } from '@react-three/drei';

interface HabitableZoneProps {
  show: boolean;
}

export const HabitableZone: React.FC<HabitableZoneProps> = ({ show }) => {
  const innerRingPoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
      const th = (i / 64) * Math.PI * 2;
      pts.push([Math.cos(th) * 30, 0, Math.sin(th) * 30]);
    }
    return pts;
  }, []);

  const outerRingPoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
      const th = (i / 64) * Math.PI * 2;
      pts.push([Math.cos(th) * 42, 0, Math.sin(th) * 42]);
    }
    return pts;
  }, []);

  if (!show) return null;

  return (
    <group>
      {/* Translucent Green/Cyan Habitable Belt Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[30, 42, 64]} />
        <meshBasicMaterial
          color="#10b981"
          side={THREE.DoubleSide}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner Boundary (Too Hot) */}
      <Line
        points={innerRingPoints}
        color="#ef4444"
        lineWidth={1}
        transparent
        opacity={0.35}
      />

      {/* Outer Boundary (Too Cold) */}
      <Line
        points={outerRingPoints}
        color="#38bdf8"
        lineWidth={1}
        transparent
        opacity={0.35}
      />

      {/* Educational Billboard Label */}
      <Html position={[36, 0, 0]} center distanceFactor={140}>
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-mono shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md pointer-events-none whitespace-nowrap">
          <div className="font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            CIRCUMSTELLAR HABITABLE ZONE
          </div>
          <div className="text-[10px] text-emerald-400/80">0.95 AU – 1.37 AU (Goldilocks Orbit)</div>
        </div>
      </Html>
    </group>
  );
};

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getSunTexture } from '../../utils/textureGenerator';
import { PlanetData } from '../../data/planetsData';

interface SunMeshProps {
  data: PlanetData;
  isSelected: boolean;
  onSelect: (planet: PlanetData) => void;
  scaleMode: 'artistic' | 'real';
}

export const SunMesh: React.FC<SunMeshProps> = ({ data, isSelected, onSelect, scaleMode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef1 = useRef<THREE.Mesh>(null);
  const coronaRef2 = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => getSunTexture(), []);

  const sunRadius = scaleMode === 'artistic' ? data.radius : 12; // Scaled for scene balance

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }
    if (coronaRef1.current) {
      coronaRef1.current.rotation.z += delta * 0.05;
      coronaRef1.current.rotation.y -= delta * 0.03;
    }
    if (coronaRef2.current) {
      coronaRef2.current.rotation.z -= delta * 0.07;
      coronaRef2.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Sunlight point source */}
      <pointLight
        color="#fff5e6"
        intensity={3.2}
        distance={450}
        decay={0.4}
      />
      <pointLight
        color="#ffaa44"
        intensity={1.8}
        distance={200}
        decay={0.8}
      />

      {/* Main Glowing Solar Core */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(data);
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[sunRadius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive="#ff6600"
          emissiveMap={texture}
          emissiveIntensity={1.4}
          roughness={0.9}
        />
      </mesh>

      {/* Inner Coronal Atmospheric Glow */}
      <mesh ref={coronaRef1} scale={1.12}>
        <sphereGeometry args={[sunRadius, 32, 32]} />
        <meshBasicMaterial
          color="#ff9900"
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Diffuse Plasma Flare Veil */}
      <mesh ref={coronaRef2} scale={1.28}>
        <sphereGeometry args={[sunRadius, 32, 32]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Pulsing Selection Ring when Sun is clicked */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[sunRadius * 1.35, sunRadius * 1.45, 64]} />
          <meshBasicMaterial
            color="#00f0ff"
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
    </group>
  );
};

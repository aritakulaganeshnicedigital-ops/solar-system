import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetData } from '../../data/planetsData';
import {
  getPlanetTexture,
  getEarthCloudsTexture,
  getMoonTexture,
  getSaturnRingsTexture
} from '../../utils/textureGenerator';

interface PlanetMeshProps {
  data: PlanetData;
  isSelected: boolean;
  onSelect: (planet: PlanetData) => void;
  onHover: (planet: PlanetData | null) => void;
  showOrbits: boolean;
  showLabels: boolean;
  scaleMode: 'artistic' | 'real';
  simulationSpeed: number;
  isPaused: boolean;
  timeRef: React.MutableRefObject<number>;
  registerPlanetPosition?: (id: string, getPos: () => THREE.Vector3) => void;
}

export const PlanetMesh: React.FC<PlanetMeshProps> = ({
  data,
  isSelected,
  onSelect,
  onHover,
  showOrbits,
  showLabels,
  scaleMode,
  isPaused,
  timeRef,
  registerPlanetPosition,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetBodyRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Compute radius and distance based on scale mode
  const radius = useMemo(() => {
    if (scaleMode === 'artistic') return data.radius;
    return Math.max(0.6, (data.realRadiusKm / 6371) * 1.5);
  }, [scaleMode, data.radius, data.realRadiusKm]);

  const orbitDistance = useMemo(() => {
    if (scaleMode === 'artistic') return data.artisticDistance;
    return 15 + Math.log10(data.distanceFromSunAU + 1) * 65;
  }, [scaleMode, data.artisticDistance, data.distanceFromSunAU]);

  // Textures
  const texture = useMemo(() => getPlanetTexture(data.id), [data.id]);
  const cloudsTexture = useMemo(() => (data.hasClouds ? getEarthCloudsTexture() : null), [data.hasClouds]);
  const moonTexture = useMemo(() => (data.id === 'earth' ? getMoonTexture() : null), [data.id]);
  const saturnRingsTexture = useMemo(() => (data.id === 'saturn' ? getSaturnRingsTexture() : null), [data.id]);

  // Initial random orbit angle offset
  const orbitAngleOffset = useMemo(() => {
    const seed = data.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return (seed % 360) * (Math.PI / 180);
  }, [data.name]);

  // Orbit path circle points
  const orbitPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push([Math.cos(theta) * orbitDistance, 0, Math.sin(theta) * orbitDistance]);
    }
    return points;
  }, [orbitDistance]);

  // Moon orbit circle points
  const moonOrbitPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    const segments = 48;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push([Math.cos(theta) * radius * 3.2, 0, Math.sin(theta) * radius * 3.2]);
    }
    return points;
  }, [radius]);

  // Expose current position getter to parent camera controller
  useEffect(() => {
    if (registerPlanetPosition) {
      registerPlanetPosition(data.id, () => {
        if (groupRef.current) {
          const worldPos = new THREE.Vector3();
          groupRef.current.getWorldPosition(worldPos);
          return worldPos;
        }
        return new THREE.Vector3(orbitDistance, 0, 0);
      });
    }
  }, [data.id, orbitDistance, registerPlanetPosition]);

  useFrame((_, delta) => {
    // 1. Orbital position
    const currentSimTime = timeRef.current;
    const orbitalSpeed = (2 * Math.PI) / (Math.max(10, data.orbitalPeriodDays) * 0.15);
    const angle = orbitAngleOffset + currentSimTime * orbitalSpeed * 0.05;

    const x = Math.cos(angle) * orbitDistance;
    const z = Math.sin(angle) * orbitDistance;

    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
    }

    // 2. Self rotation on axis
    if (!isPaused && planetBodyRef.current) {
      const spinSpeed = Math.sign(data.rotationPeriodHours) * Math.max(0.1, 24 / Math.abs(data.rotationPeriodHours || 24));
      planetBodyRef.current.rotation.y += delta * 0.4 * spinSpeed;
    }

    // 3. Cloud rotation for Earth/Venus
    if (!isPaused && cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.45;
    }

    // 4. Moon orbit around Earth
    if (!isPaused && moonRef.current) {
      moonRef.current.rotation.y += delta * 0.8;
    }
  });

  const tiltRad = (data.axialTiltDeg * Math.PI) / 180;

  return (
    <>
      {/* Orbital Path Ring */}
      {showOrbits && (
        <Line
          points={orbitPoints}
          color={isSelected ? '#00f0ff' : '#334155'}
          lineWidth={1}
          transparent
          opacity={isSelected ? 0.75 : 0.28}
        />
      )}

      {/* Planet Group Container */}
      <group ref={groupRef}>
        {/* Tilted Axis Group */}
        <group rotation={[tiltRad, 0, 0]}>
          {/* Planet Body Mesh */}
          <mesh
            ref={planetBodyRef}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(data);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              onHover(data);
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
              onHover(null);
            }}
          >
            <sphereGeometry args={[radius, 48, 48]} />
            <meshStandardMaterial
              map={texture}
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>

          {/* Earth/Venus Clouds Layer */}
          {data.hasClouds && cloudsTexture && (
            <mesh ref={cloudsRef}>
              <sphereGeometry args={[radius * 1.025, 48, 48]} />
              <meshStandardMaterial
                map={cloudsTexture}
                transparent
                opacity={0.75}
                blending={THREE.NormalBlending}
                depthWrite={false}
              />
            </mesh>
          )}

          {/* Atmospheric Glow Rim */}
          <mesh scale={1.04}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={0.12}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Saturn Rings */}
          {data.hasRings && data.id === 'saturn' && (
            <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0, 0]}>
              <ringGeometry args={[radius * 1.35, radius * 2.45, 64]} />
              <meshStandardMaterial
                map={saturnRingsTexture || undefined}
                color="#e5c899"
                side={THREE.DoubleSide}
                transparent
                opacity={0.92}
                roughness={0.8}
              />
            </mesh>
          )}

          {/* Uranus Rings */}
          {data.hasRings && data.id === 'uranus' && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius * 1.3, radius * 1.8, 64]} />
              <meshBasicMaterial
                color="#7dd3fc"
                side={THREE.DoubleSide}
                transparent
                opacity={0.4}
              />
            </mesh>
          )}

          {/* Earth's Moon */}
          {data.id === 'earth' && (
            <group ref={moonRef}>
              <mesh position={[radius * 3.2, 0, 0]}>
                <sphereGeometry args={[radius * 0.27, 24, 24]} />
                <meshStandardMaterial
                  map={moonTexture || undefined}
                  roughness={0.8}
                />
              </mesh>
              {/* Moon orbit trail */}
              <Line
                points={moonOrbitPoints}
                color="#64748b"
                lineWidth={0.8}
                transparent
                opacity={0.25}
              />
            </group>
          )}
        </group>

        {/* Selected Target Reticle Halo */}
        {isSelected && (
          <group>
            {/* Spinning inner targeting bracket */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius * 1.5, radius * 1.62, 48]} />
              <meshBasicMaterial
                color="#00f0ff"
                side={THREE.DoubleSide}
                transparent
                opacity={0.9}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius * 1.75, radius * 1.8, 4]} />
              <meshBasicMaterial
                color="#8b5cf6"
                side={THREE.DoubleSide}
                transparent
                opacity={0.7}
              />
            </mesh>
          </group>
        )}

        {/* 3D Floating Interactive Planet Label */}
        {showLabels && (
          <Html
            position={[0, radius + 1.8, 0]}
            center
            distanceFactor={120}
            zIndexRange={[100, 0]}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(data);
              }}
              className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer pointer-events-auto backdrop-blur-md ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-accent border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'bg-space-900/80 text-slate-300 border border-slate-700/60 hover:border-cyan-400/60 hover:text-white'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: data.color }}
              />
              <span className="font-semibold uppercase">{data.name}</span>
            </button>
          </Html>
        )}
      </group>
    </>
  );
};

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetData } from '../../data/planetsData';
import { getBlackHoleAccretionTexture } from '../../utils/textureGenerator';
import { audioSystem } from '../../utils/audioSystem';

interface BlackHoleMeshProps {
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

export const BlackHoleMesh: React.FC<BlackHoleMeshProps> = ({
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
  const diskRef = useRef<THREE.Group>(null);
  const lensedHaloRef = useRef<THREE.Mesh>(null);
  const jetsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const ripplesRef = useRef<THREE.Group>(null);

  const radius = useMemo(() => {
    if (scaleMode === 'artistic') return data.radius;
    return 3.2;
  }, [scaleMode, data.radius]);

  const orbitDistance = useMemo(() => {
    if (scaleMode === 'artistic') return data.artisticDistance;
    return 145;
  }, [scaleMode, data.artisticDistance]);

  const hitRadius = Math.max(radius * 3.0, 10.0);

  // Accretion disk texture with relativistic beaming and turbulence
  const accretionTexture = useMemo(() => getBlackHoleAccretionTexture(), []);

  // Orbit path circle points
  const orbitPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    const segments = 160;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push([Math.cos(theta) * orbitDistance, 0, Math.sin(theta) * orbitDistance]);
    }
    return points;
  }, [orbitDistance]);

  // Initial orbit angle offset
  const orbitAngleOffset = useMemo(() => (315 * Math.PI) / 180, []);

  // Generate infalling accretion disk particles
  const particleCount = 420;
  const { particlePositions, particleColors, particleData } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const pData: { radius: number; angle: number; speed: number; yOffset: number }[] = [];

    const colorPalette = [
      new THREE.Color('#ffffff'), // Pure white
      new THREE.Color('#fef08a'), // Gold
      new THREE.Color('#f97316'), // Intense orange
      new THREE.Color('#c084fc'), // Electric violet
      new THREE.Color('#00f0ff'), // Cherenkov cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      const r = radius * 1.35 + Math.random() * (radius * 3.8);
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.8 + Math.random() * 1.4) * Math.pow(radius / r, 1.2);
      const yOffset = (Math.random() - 0.5) * (radius * 0.25) * (1 - (r - radius * 1.35) / (radius * 3.8));

      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = yOffset;
      positions[i * 3 + 2] = Math.sin(angle) * r;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      pData.push({ radius: r, angle, speed, yOffset });
    }

    return { particlePositions: positions, particleColors: colors, particleData: pData };
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

  // Frame animation loop
  useFrame((state, delta) => {
    const currentSimTime = timeRef.current;
    const simDelta = isPaused ? 0 : delta;

    // 1. Slow, majestic cosmic orbital motion beyond Pluto
    const angularVelocity = 0.045; // Very slow majestic orbit
    const angle = orbitAngleOffset + currentSimTime * angularVelocity;
    const x = Math.cos(angle) * orbitDistance;
    const z = Math.sin(angle) * orbitDistance;

    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
    }

    // 2. High-speed spinning accretion disk (near lightspeed relativistic rotation)
    if (diskRef.current) {
      diskRef.current.rotation.z += simDelta * 2.2;
    }

    // 3. Gravitational Lensing vertical halo slow gyroscopic precession
    if (lensedHaloRef.current) {
      lensedHaloRef.current.rotation.z += simDelta * 1.4;
    }

    // 4. Relativistic Polar Jet oscillation and energy pulses
    if (jetsRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 8) * 0.08;
      jetsRef.current.scale.set(1 + pulse * 0.5, 1 + pulse, 1 + pulse * 0.5);
    }

    // 5. Orbiting accretion particles vortex animation
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        p.angle += simDelta * p.speed * 2.5;

        // Inward spiral drift with recycling
        p.radius -= simDelta * 0.15;
        if (p.radius < radius * 1.15) {
          p.radius = radius * 4.6;
          p.angle = Math.random() * Math.PI * 2;
        }

        array[i * 3] = Math.cos(p.angle) * p.radius;
        array[i * 3 + 1] = p.yOffset;
        array[i * 3 + 2] = Math.sin(p.angle) * p.radius;
      }
      posAttr.needsUpdate = true;
    }

    // 6. Spacetime Gravitational Wave ripple expansions
    if (ripplesRef.current) {
      ripplesRef.current.children.forEach((child, idx) => {
        const mesh = child as THREE.Mesh;
        const speed = 0.6;
        const progress = ((state.clock.elapsedTime * speed + idx * 0.33) % 1.0);
        const currentScale = 1.0 + progress * 3.5;
        mesh.scale.set(currentScale, currentScale, currentScale);
        if (mesh.material instanceof THREE.Material) {
          mesh.material.opacity = Math.max(0, (1 - progress) * 0.45);
        }
      });
    }
  });

  const tiltRad = (data.axialTiltDeg * Math.PI) / 180;

  return (
    <>
      {/* Abyssal Orbit Ring Path (Mystic Violet) */}
      {showOrbits && (
        <Line
          points={orbitPoints}
          color={isSelected ? '#c084fc' : '#4c1d95'}
          lineWidth={1.2}
          transparent
          opacity={isSelected ? 0.9 : 0.35}
        />
      )}

      {/* Main Container Group */}
      <group ref={groupRef}>
        {/* Invisible enlarged hit sphere for easy selection */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            audioSystem.playBlackHoleSelect();
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
          <sphereGeometry args={[hitRadius, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Tilted System Anchor: Accretion Disk, Event Horizon & Polar Jets */}
        <group rotation={[tiltRad, 0, Math.PI / 6]}>
          {/* ============================================================== */}
          {/* 1. THE EVENT HORIZON: Pitch-black void that occludes everything */}
          {/* ============================================================== */}
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              audioSystem.playBlackHoleSelect();
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
            <sphereGeometry args={[radius, 64, 64]} />
            <meshBasicMaterial color="#000000" depthWrite={true} />
          </mesh>

          {/* ============================================================== */}
          {/* 2. PHOTON SPHERE & INNERMOST STABLE ORBIT (ISCO) GLOW RIMS     */}
          {/* ============================================================== */}
          {/* Razor-sharp white-hot photon sphere halo */}
          <mesh scale={1.035}>
            <sphereGeometry args={[radius, 48, 48]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.92}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Incandescent amber/gold transition rim */}
          <mesh scale={1.07}>
            <sphereGeometry args={[radius, 48, 48]} />
            <meshBasicMaterial
              color="#f59e0b"
              transparent
              opacity={0.65}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* High-energy violet/Cherenkov outer corona */}
          <mesh scale={1.14}>
            <sphereGeometry args={[radius, 48, 48]} />
            <meshBasicMaterial
              color="#c084fc"
              transparent
              opacity={0.35}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* ============================================================== */}
          {/* 3. RELATIVISTIC ACCRETION DISK (HORIZONTAL EQUATORIAL PLANE)    */}
          {/* ============================================================== */}
          <group ref={diskRef} rotation={[Math.PI / 2, 0, 0]}>
            {/* Main high-resolution swirling plasma disk */}
            <mesh>
              <ringGeometry args={[radius * 1.25, radius * 4.6, 128]} />
              <meshBasicMaterial
                map={accretionTexture}
                color="#ffffff"
                side={THREE.DoubleSide}
                transparent
                opacity={0.96}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Innermost ultra-hot incandescent golden ring */}
            <mesh>
              <ringGeometry args={[radius * 1.12, radius * 1.9, 96]} />
              <meshBasicMaterial
                color="#fef08a"
                side={THREE.DoubleSide}
                transparent
                opacity={0.88}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Outermost diffuse violet cosmic dust veil */}
            <mesh>
              <ringGeometry args={[radius * 4.2, radius * 6.2, 96]} />
              <meshBasicMaterial
                color="#9333ea"
                side={THREE.DoubleSide}
                transparent
                opacity={0.32}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>

          {/* ============================================================== */}
          {/* 4. GRAVITATIONALLY LENSED VERTICAL HALO (THE GARGANTUA EFFECT) */}
          {/* Light bent by spacetime over the top and bottom of the horizon */}
          {/* ============================================================== */}
          <mesh
            ref={lensedHaloRef}
            rotation={[0, 0, 0]}
          >
            <ringGeometry args={[radius * 1.35, radius * 2.65, 96]} />
            <meshBasicMaterial
              color="#f59e0b"
              side={THREE.DoubleSide}
              transparent
              opacity={0.78}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Secondary tilted lensed arch for depth and parallax */}
          <mesh rotation={[0.4, 0.3, 0]}>
            <ringGeometry args={[radius * 1.5, radius * 2.9, 96]} />
            <meshBasicMaterial
              color="#e11d48"
              side={THREE.DoubleSide}
              transparent
              opacity={0.45}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* ============================================================== */}
          {/* 5. ORBITING ACCRETION PARTICLES VORTEX                          */}
          {/* ============================================================== */}
          <points ref={particlesRef} rotation={[Math.PI / 2, 0, 0]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[particlePositions, 3]}
              />
              <bufferAttribute
                attach="attributes-color"
                args={[particleColors, 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.45}
              vertexColors
              transparent
              opacity={0.85}
              blending={THREE.AdditiveBlending}
              sizeAttenuation
              depthWrite={false}
            />
          </points>

          {/* ============================================================== */}
          {/* 6. RELATIVISTIC POLAR PLASMA JETS                              */}
          {/* Colossal beams shooting from north and south magnetic poles    */}
          {/* ============================================================== */}
          <group ref={jetsRef}>
            {/* North Pole Upper Outer Jet */}
            <mesh position={[0, 16, 0]}>
              <cylinderGeometry args={[0.3, 2.2, 30, 32, 1, true]} />
              <meshBasicMaterial
                color="#00f0ff"
                transparent
                opacity={0.48}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* North Pole Core High-Energy Laser Beam */}
            <mesh position={[0, 16, 0]}>
              <cylinderGeometry args={[0.08, 0.6, 32, 16, 1, true]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* South Pole Lower Outer Jet */}
            <mesh position={[0, -16, 0]}>
              <cylinderGeometry args={[2.2, 0.3, 30, 32, 1, true]} />
              <meshBasicMaterial
                color="#a855f7"
                transparent
                opacity={0.48}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* South Pole Core High-Energy Laser Beam */}
            <mesh position={[0, -16, 0]}>
              <cylinderGeometry args={[0.6, 0.08, 32, 16, 1, true]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>

          {/* ============================================================== */}
          {/* 7. SPACETIME GRAVITATIONAL WAVE RIPPLES                        */}
          {/* ============================================================== */}
          <group ref={ripplesRef} rotation={[Math.PI / 2, 0, 0]}>
            {[0, 1, 2].map((idx) => (
              <mesh key={idx}>
                <ringGeometry args={[radius * 2.2, radius * 2.35, 64]} />
                <meshBasicMaterial
                  color="#c084fc"
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.35}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            ))}
          </group>
        </group>

        {/* ============================================================== */}
        {/* 8. SELECTED TARGETING RETICLE & EVENT HORIZON BRACKETS          */}
        {/* ============================================================== */}
        {isSelected && (
          <group>
            {/* Spinning inner targeting halo */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius * 5.2, radius * 5.4, 64]} />
              <meshBasicMaterial
                color="#c084fc"
                side={THREE.DoubleSide}
                transparent
                opacity={0.95}
              />
            </mesh>
            {/* Outer golden bracket ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius * 5.7, radius * 5.85, 4]} />
              <meshBasicMaterial
                color="#f59e0b"
                side={THREE.DoubleSide}
                transparent
                opacity={0.8}
              />
            </mesh>
          </group>
        )}

        {/* ============================================================== */}
        {/* 9. 3D FLOATING INTERACTIVE BADGE LABEL                         */}
        {/* ============================================================== */}
        {showLabels && (
          <Html
            position={[0, radius + 4.8, 0]}
            center
            distanceFactor={140}
            zIndexRange={[100, 0]}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                audioSystem.playBlackHoleSelect();
                onSelect(data);
              }}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer pointer-events-auto backdrop-blur-xl ${
                isSelected
                  ? 'bg-purple-950/70 text-purple-200 border-2 border-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.65)] ring-2 ring-purple-400/50'
                  : 'bg-space-950/90 text-purple-200 border border-purple-500/50 hover:border-amber-400 hover:text-white hover:shadow-[0_0_18px_rgba(245,158,11,0.5)]'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
              </span>
              <span className="font-bold tracking-widest text-slate-100 uppercase group-hover:text-amber-300 transition-colors">
                {data.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                SINGULARITY
              </span>
            </button>
          </Html>
        )}
      </group>
    </>
  );
};

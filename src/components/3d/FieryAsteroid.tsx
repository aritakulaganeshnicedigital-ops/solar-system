import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FieryAsteroidProps {
  progress: number; // 0 to 1 across the streak duration
  active: boolean;
}

export const FieryAsteroid: React.FC<FieryAsteroidProps> = ({ progress, active }) => {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const sparksRef = useRef<THREE.Points>(null);

  // Parabolic trajectory sweeping across the upper night sky
  // From upper left-back to lower right-front
  const startPos = useMemo(() => new THREE.Vector3(-140, 95, -120), []);
  const endPos = useMemo(() => new THREE.Vector3(130, 45, 60), []);

  // Compute current position along arc with gentle curve
  const currentPosition = useMemo(() => {
    const t = Math.max(0, Math.min(1, progress));
    const pos = new THREE.Vector3().lerpVectors(startPos, endPos, t);
    // Add parabolic arc bump to trajectory
    pos.y += Math.sin(t * Math.PI) * 18;
    return pos;
  }, [progress, startPos, endPos]);

  // Direction vector for orienting the tail
  const flightDirection = useMemo(() => {
    return new THREE.Vector3().subVectors(endPos, startPos).normalize();
  }, [startPos, endPos]);

  // Ember spark particles trailing behind
  const sparkCount = 80;
  const sparkData = useMemo(() => {
    const positions = new Float32Array(sparkCount * 3);
    const opacities = new Float32Array(sparkCount);
    for (let i = 0; i < sparkCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = -Math.random() * 25; // trailing behind
      opacities[i] = Math.random();
    }
    return { positions, opacities };
  }, []);

  useFrame((_, delta) => {
    if (!active || !groupRef.current) return;

    groupRef.current.position.copy(currentPosition);

    // Look along flight direction
    const lookTarget = currentPosition.clone().add(flightDirection);
    groupRef.current.lookAt(lookTarget);

    // Animate trailing spark embers
    if (sparksRef.current) {
      const geo = sparksRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < sparkCount; i++) {
        // Drifting backward and expanding
        posAttr.setZ(i, posAttr.getZ(i) - delta * 40);
        if (posAttr.getZ(i) < -35) {
          posAttr.setZ(i, -Math.random() * 3);
          posAttr.setX(i, (Math.random() - 0.5) * 3);
          posAttr.setY(i, (Math.random() - 0.5) * 3);
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  if (!active || progress <= 0 || progress >= 1) return null;

  return (
    <group ref={groupRef} position={currentPosition}>
      {/* Blazing Meteor Point Light Source */}
      <pointLight color="#ff8800" intensity={6.5} distance={140} decay={1.2} />
      <pointLight color="#ffeeaa" intensity={4.0} distance={40} decay={0.8} />

      {/* Fiery Asteroid Glowing Core */}
      <mesh>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Incandescent Plasma Corona Glow */}
      <mesh scale={1.8}>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh scale={2.5}>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Elongated Tapered Fiery Flame Tail */}
      <mesh
        ref={tailRef}
        position={[0, 0, -18]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <coneGeometry args={[1.8, 36, 16, 1, true]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner White-Hot Plasma Jet Stream */}
      <mesh
        position={[0, 0, -10]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <coneGeometry args={[0.9, 20, 16, 1, true]} />
        <meshBasicMaterial
          color="#ffeedd"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Trailing Ember Sparks */}
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.9}
          color="#ffcc44"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

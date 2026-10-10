import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidBeltProps {
  showAsteroids: boolean;
  isPaused: boolean;
  timeRef: React.MutableRefObject<number>;
}

export const AsteroidBelt: React.FC<AsteroidBeltProps> = ({ showAsteroids, isPaused, timeRef }) => {
  const mainBeltRef = useRef<THREE.InstancedMesh>(null);
  const kuiperBeltRef = useRef<THREE.InstancedMesh>(null);

  const mainCount = 1200;
  const kuiperCount = 800;

  // Generate transformation matrices and speeds for Main Asteroid Belt
  const mainData = useMemo(() => {
    const data = [];
    const minR = 48;
    const maxR = 54;

    for (let i = 0; i < mainCount; i++) {
      const radius = minR + Math.random() * (maxR - minR);
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 2.5;
      const scale = 0.08 + Math.random() * 0.22;
      const rotationSpeed = 0.2 + Math.random() * 0.8;

      data.push({ radius, angle, height, scale, rotationSpeed });
    }
    return data;
  }, []);

  // Generate transformation matrices for Kuiper Belt
  const kuiperData = useMemo(() => {
    const data = [];
    const minR = 114;
    const maxR = 132;

    for (let i = 0; i < kuiperCount; i++) {
      const radius = minR + Math.random() * (maxR - minR);
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4.5;
      const scale = 0.12 + Math.random() * 0.35;
      const rotationSpeed = 0.1 + Math.random() * 0.4;

      data.push({ radius, angle, height, scale, rotationSpeed });
    }
    return data;
  }, []);

  const tempObj = useMemo(() => new THREE.Object3D(), []);

  // Initialize instance matrices
  useEffect(() => {
    if (mainBeltRef.current) {
      mainData.forEach((ast, idx) => {
        const x = Math.cos(ast.angle) * ast.radius;
        const z = Math.sin(ast.angle) * ast.radius;
        tempObj.position.set(x, ast.height, z);
        tempObj.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        tempObj.scale.set(ast.scale, ast.scale, ast.scale);
        tempObj.updateMatrix();
        mainBeltRef.current?.setMatrixAt(idx, tempObj.matrix);
      });
      mainBeltRef.current.instanceMatrix.needsUpdate = true;
    }

    if (kuiperBeltRef.current) {
      kuiperData.forEach((ast, idx) => {
        const x = Math.cos(ast.angle) * ast.radius;
        const z = Math.sin(ast.angle) * ast.radius;
        tempObj.position.set(x, ast.height, z);
        tempObj.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        tempObj.scale.set(ast.scale, ast.scale, ast.scale);
        tempObj.updateMatrix();
        kuiperBeltRef.current?.setMatrixAt(idx, tempObj.matrix);
      });
      kuiperBeltRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [mainData, kuiperData, tempObj]);

  useFrame((_, delta) => {
    if (isPaused) return;

    if (mainBeltRef.current) {
      mainBeltRef.current.rotation.y += delta * 0.012;
    }
    if (kuiperBeltRef.current) {
      kuiperBeltRef.current.rotation.y += delta * 0.003;
    }
  });

  if (!showAsteroids) return null;

  return (
    <group>
      {/* Main Asteroid Belt (Mars - Jupiter) */}
      <instancedMesh
        ref={mainBeltRef}
        args={[undefined, undefined, mainCount]}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#8b8075"
          roughness={0.9}
          metalness={0.15}
        />
      </instancedMesh>

      {/* Kuiper Belt (Beyond Neptune) */}
      <instancedMesh
        ref={kuiperBeltRef}
        args={[undefined, undefined, kuiperCount]}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.95}
          metalness={0.05}
        />
      </instancedMesh>
    </group>
  );
};

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { PlanetData } from '../../data/planetsData';

interface CameraControllerProps {
  selectedPlanet: PlanetData | null;
  getPlanetPosition: (id: string) => THREE.Vector3 | null;
  resetSignal: number;
  cinemaMode: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  selectedPlanet,
  getPlanetPosition,
  resetSignal,
  cinemaMode,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  const isTransitioningRef = useRef(false);
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 85, 140));

  // Reset camera signal
  useEffect(() => {
    if (resetSignal > 0) {
      isTransitioningRef.current = true;
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 85, 140);
    }
  }, [resetSignal]);

  // Planet selection transition
  useEffect(() => {
    if (selectedPlanet) {
      isTransitioningRef.current = true;
      const pos = getPlanetPosition(selectedPlanet.id) || new THREE.Vector3(selectedPlanet.artisticDistance, 0, 0);
      targetLookAt.current.copy(pos);

      // Offset camera based on planet radius
      const dist = Math.max(4.5, selectedPlanet.radius * 3.2);
      targetCamPos.current.set(pos.x + dist * 0.8, pos.y + dist * 0.5, pos.z + dist * 0.8);
    } else {
      targetLookAt.current.set(0, 0, 0);
    }
  }, [selectedPlanet, getPlanetPosition]);

  useFrame((state, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    // Cinema Mode subtle slow drift
    if (cinemaMode && !selectedPlanet) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
    } else {
      controls.autoRotate = false;
    }

    if (selectedPlanet) {
      // Dynamic tracking of moving planet
      const currentPos = getPlanetPosition(selectedPlanet.id);
      if (currentPos) {
        // Smoothly interpolate controls target toward planet position
        controls.target.lerp(currentPos, delta * 3.5);

        if (isTransitioningRef.current) {
          const dist = Math.max(5.0, selectedPlanet.radius * 3.2);
          const desiredPos = new THREE.Vector3(
            currentPos.x + dist * 0.8,
            currentPos.y + dist * 0.45,
            currentPos.z + dist * 0.8
          );
          camera.position.lerp(desiredPos, delta * 2.5);

          if (camera.position.distanceTo(desiredPos) < 0.5) {
            isTransitioningRef.current = false;
          }
        }
      }
    } else if (isTransitioningRef.current) {
      // Resetting to Solar System overview
      controls.target.lerp(targetLookAt.current, delta * 2.5);
      camera.position.lerp(targetCamPos.current, delta * 2.5);

      if (
        camera.position.distanceTo(targetCamPos.current) < 1.0 &&
        controls.target.distanceTo(targetLookAt.current) < 0.5
      ) {
        isTransitioningRef.current = false;
      }
    }

    controls.update();
  });

  return (
    <DreiOrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={6}
      maxDistance={400}
      maxPolarAngle={Math.PI / 2 + 0.15} // Prevent going fully beneath ecliptic
    />
  );
};

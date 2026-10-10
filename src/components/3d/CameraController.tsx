import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import type { PlanetData } from '../../data/planetsData';

interface CameraControllerProps {
  selectedPlanet: PlanetData | null;
  getPlanetPosition: (id: string) => THREE.Vector3 | null;
  resetSignal: number;
  zoomSignal: number;
  cinemaMode: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  selectedPlanet,
  getPlanetPosition,
  resetSignal,
  zoomSignal,
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

  // Zoom In / Out signals
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || zoomSignal === 0) return;

    if (zoomSignal > 0) {
      // Zoom closer
      camera.position.lerp(controls.target, 0.3);
    } else {
      // Zoom out
      const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
      const currentDist = camera.position.distanceTo(controls.target);
      camera.position.addScaledVector(dir, Math.max(10, currentDist * 0.3));
    }
    controls.update();
  }, [zoomSignal, camera]);

  // Planet selection transition
  useEffect(() => {
    if (selectedPlanet) {
      isTransitioningRef.current = true;
      const pos = getPlanetPosition(selectedPlanet.id) || new THREE.Vector3(selectedPlanet.artisticDistance, 0, 0);
      targetLookAt.current.copy(pos);

      // Offset camera based on planet radius with a dynamic angle
      const dist = Math.max(3.8, selectedPlanet.radius * 2.8);
      targetCamPos.current.set(pos.x + dist * 0.8, pos.y + dist * 0.45, pos.z + dist * 0.8);
    } else {
      targetLookAt.current.set(0, 0, 0);
    }
  }, [selectedPlanet, getPlanetPosition]);

  useFrame((_, delta) => {
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
        if (isTransitioningRef.current) {
          // Smooth transition to planet
          controls.target.lerp(currentPos, delta * 3.5);

          const dist = Math.max(3.8, selectedPlanet.radius * 2.8);
          const desiredPos = new THREE.Vector3(
            currentPos.x + dist * 0.8,
            currentPos.y + dist * 0.45,
            currentPos.z + dist * 0.8
          );
          camera.position.lerp(desiredPos, delta * 2.5);

          if (camera.position.distanceTo(desiredPos) < 0.4) {
            isTransitioningRef.current = false;
          }
        } else {
          // After transition completes, camera tracks the planet continuously in orbit
          // while preserving user's manual mouse rotation/zoom offset
          const deltaTarget = new THREE.Vector3().subVectors(currentPos, controls.target);
          camera.position.add(deltaTarget);
          controls.target.copy(currentPos);
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
      minDistance={1.8}
      maxDistance={600}
      maxPolarAngle={Math.PI / 2 + 0.25}
    />
  );
};

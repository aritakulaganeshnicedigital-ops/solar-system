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
  isCinematicActive?: boolean;
  controlsRefExternal?: React.MutableRefObject<OrbitControlsImpl | null>;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  selectedPlanet,
  getPlanetPosition,
  resetSignal,
  zoomSignal,
  cinemaMode,
  isCinematicActive = false,
  controlsRefExternal,
}) => {
  const localControlsRef = useRef<OrbitControlsImpl>(null);
  const controlsRef = controlsRefExternal || localControlsRef;
  const { camera } = useThree();

  const isTransitioningRef = useRef(false);
  const transitionTimeRef = useRef(0);
  const startCamPos = useRef(new THREE.Vector3());
  const startTargetPos = useRef(new THREE.Vector3());

  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 85, 140));

  // Reset camera signal
  useEffect(() => {
    if (resetSignal > 0 && !isCinematicActive) {
      const controls = controlsRef.current;
      if (controls) {
        startCamPos.current.copy(camera.position);
        startTargetPos.current.copy(controls.target);
      }
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 85, 140);
      isTransitioningRef.current = true;
      transitionTimeRef.current = 0;
    }
  }, [resetSignal, camera, isCinematicActive, controlsRef]);

  // Zoom In / Out signals
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || zoomSignal === 0 || isCinematicActive) return;

    if (zoomSignal > 0) {
      camera.position.lerp(controls.target, 0.3);
    } else {
      const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
      const currentDist = camera.position.distanceTo(controls.target);
      camera.position.addScaledVector(dir, Math.max(10, currentDist * 0.3));
    }
    controls.update();
  }, [zoomSignal, camera, isCinematicActive, controlsRef]);

  // Planet selection transition
  useEffect(() => {
    if (isCinematicActive) return;
    const controls = controlsRef.current;
    if (controls) {
      startCamPos.current.copy(camera.position);
      startTargetPos.current.copy(controls.target);
    }
    isTransitioningRef.current = true;
    transitionTimeRef.current = 0;
  }, [selectedPlanet, camera, isCinematicActive, controlsRef]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    // During cinematic prologue sequence, disable manual controls
    if (isCinematicActive) {
      controls.enabled = false;
      return;
    }
    controls.enabled = true;

    // Cinema Mode subtle slow drift
    if (cinemaMode && !selectedPlanet) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
    } else {
      controls.autoRotate = false;
    }

    if (selectedPlanet) {
      const currentPos = getPlanetPosition(selectedPlanet.id);
      if (currentPos) {
        const dist = Math.max(3.8, selectedPlanet.radius * 2.8);
        const desiredCamPos = new THREE.Vector3(
          currentPos.x + dist * 0.8,
          currentPos.y + dist * 0.45,
          currentPos.z + dist * 0.8
        );

        if (isTransitioningRef.current) {
          transitionTimeRef.current += delta;
          const t = Math.min(1.0, transitionTimeRef.current / 1.1);
          const ease = 1 - Math.pow(1 - t, 3);

          camera.position.lerpVectors(startCamPos.current, desiredCamPos, ease);
          controls.target.lerpVectors(startTargetPos.current, currentPos, ease);

          if (t >= 1.0) {
            isTransitioningRef.current = false;
          }
        } else {
          // Continuous orbit tracking
          const deltaTarget = new THREE.Vector3().subVectors(currentPos, controls.target);
          camera.position.add(deltaTarget);
          controls.target.copy(currentPos);
        }
      }
    } else if (isTransitioningRef.current) {
      // Resetting to Solar System overview
      transitionTimeRef.current += delta;
      const t = Math.min(1.0, transitionTimeRef.current / 1.0);
      const ease = 1 - Math.pow(1 - t, 3);

      camera.position.lerpVectors(startCamPos.current, targetCamPos.current, ease);
      controls.target.lerpVectors(startTargetPos.current, targetLookAt.current, ease);

      if (t >= 1.0) {
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

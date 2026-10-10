import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { audioSystem } from '../../utils/audioSystem';

interface CinematicDirectorProps {
  isPlaying: boolean;
  onComplete: () => void;
  setCinematicState: (state: {
    asteroidProgress: number;
    asteroidActive: boolean;
    milkyWayOpacity: number;
    starBrilliance: number;
    dustBrilliance: number;
    narrativeText: string;
  }) => void;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

export const CinematicDirector: React.FC<CinematicDirectorProps> = ({
  isPlaying,
  onComplete,
  setCinematicState,
  controlsRef,
}) => {
  const { camera } = useThree();
  const timeRef = useRef(0);
  const wasPlayingRef = useRef(false);

  // Cubic ease function
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

  useEffect(() => {
    if (isPlaying && !wasPlayingRef.current) {
      timeRef.current = 0;
      wasPlayingRef.current = true;
      audioSystem.playWarp();
    } else if (!isPlaying) {
      wasPlayingRef.current = false;
    }
  }, [isPlaying]);

  useFrame((_, delta) => {
    if (!isPlaying) return;

    timeRef.current += delta;
    const t = timeRef.current;
    const controls = controlsRef.current;

    // Timeline phases:
    // 0.0s - 3.5s: Tilt upward toward night sky
    // 3.0s - 6.5s: Fiery asteroid streaks across frame
    // 5.5s - 9.5s: Gradual reveal of glowing Milky Way
    // 7.0s - 11.0s: Stars sparkle brighter one by one & cosmic dust
    // 9.5s - 13.5s: Smooth seamless descent to Solar System
    // 13.5s+: Complete

    let camPos = new THREE.Vector3();
    let lookTarget = new THREE.Vector3();
    let asteroidProgress = 0;
    let asteroidActive = false;
    let milkyWayOpacity = 0.15;
    let starBrilliance = 1.0;
    let dustBrilliance = 1.0;
    let narrativeText = '';

    if (t < 3.5) {
      // PHASE 1: Camera slowly tilts upward toward the night sky
      narrativeText = 'Camera slowly tilts upward toward the night sky...';
      const p = Math.min(1, t / 3.5);
      const easeP = easeInOutCubic(p);

      // Start low at [0, 18, 55], looking toward [0, 15, -60]
      // Tilts upward: lookTarget moves from [0, 15, -60] up to [0, 90, -40]
      camPos.set(0, 18 + easeP * 12, 55 - easeP * 10);
      lookTarget.set(0, 15 + easeP * 75, -60 + easeP * 20);

      milkyWayOpacity = 0.15 + easeP * 0.1;
      starBrilliance = 0.9 + easeP * 0.3;
      dustBrilliance = 0.8 + easeP * 0.4;
    } else if (t < 6.5) {
      // PHASE 2: A fiery asteroid streaks across the frame
      narrativeText = 'A fiery asteroid streaks across the celestial vault...';
      const p = (t - 3.2) / 3.0; // 0 to 1 across asteroid flight
      asteroidProgress = Math.max(0, Math.min(1, p));
      asteroidActive = true;

      // Camera gently tracks following the meteor's radiant arc
      const camP = (t - 3.5) / 3.0;
      camPos.set(camP * 10, 30 + camP * 8, 45);
      lookTarget.set(camP * 20, 90 - camP * 10, -40);

      // Milky Way begins glowing as asteroid passes
      const mwReveal = Math.min(1, (t - 4.5) / 2.0);
      milkyWayOpacity = 0.25 + mwReveal * 0.45;
      starBrilliance = 1.2 + mwReveal * 0.5;
      dustBrilliance = 1.2 + mwReveal * 0.4;
    } else if (t < 9.5) {
      // PHASE 3: Gradual reveal of the glowing Milky Way in breathtaking brilliance
      narrativeText = 'The glowing Milky Way reveals in breathtaking brilliance...';
      const p = (t - 6.5) / 3.0;
      const easeP = easeOutQuad(p);

      // Wide awe-inspiring vista of the galaxy
      camPos.set(10 - easeP * 10, 38 + easeP * 15, 45 + easeP * 25);
      lookTarget.set(20 - easeP * 20, 80 + easeP * 15, -40 - easeP * 10);

      // Galaxy reaches full splendor
      milkyWayOpacity = 0.7 + easeP * 0.25; // Reaches 0.95
      starBrilliance = 1.7 + easeP * 0.8;   // Reaches 2.5
      dustBrilliance = 1.6 + easeP * 0.6;
    } else if (t < 13.5) {
      // PHASE 4: Smooth descent down toward Solar System with no cuts
      narrativeText = 'Descending into the Solar System orbital plane...';
      const p = (t - 9.5) / 4.0;
      const easeP = easeInOutCubic(p);

      // Smoothly arcs down from high galaxy vista to default solar system view:
      // camPos: from [0, 53, 70] to [0, 85, 140]
      // lookTarget: from [0, 95, -50] down to [0, 0, 0]
      camPos.set(
        0,
        53 + easeP * 32,
        70 + easeP * 70
      );
      lookTarget.set(
        0,
        95 * (1 - easeP),
        -50 * (1 - easeP)
      );

      // Galaxy settles into serene cosmic background
      milkyWayOpacity = 0.95 - easeP * 0.2;
      starBrilliance = 2.5 - easeP * 1.3;
      dustBrilliance = 2.2 - easeP * 1.2;
    } else {
      // COMPLETE
      onComplete();
      return;
    }

    // Apply smooth camera positioning and target
    camera.position.copy(camPos);
    if (controls) {
      controls.target.copy(lookTarget);
      controls.update();
    } else {
      camera.lookAt(lookTarget);
    }

    setCinematicState({
      asteroidProgress,
      asteroidActive,
      milkyWayOpacity,
      starBrilliance,
      dustBrilliance,
      narrativeText,
    });
  });

  return null;
};

import React, { useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { PLANETS_DATA, PlanetData } from '../../data/planetsData';
import { SunMesh } from './SunMesh';
import { PlanetMesh } from './PlanetMesh';
import { AsteroidBelt } from './AsteroidBelt';
import { HabitableZone } from './HabitableZone';
import { CameraController } from './CameraController';
import { CosmicDust } from './CosmicDust';
import { TwinklingStars } from './TwinklingStars';
import { FieryAsteroid } from './FieryAsteroid';
import { CinematicDirector } from './CinematicDirector';
import { BlackHoleMesh } from './BlackHoleMesh';

export interface CinematicState {
  asteroidProgress: number;
  asteroidActive: boolean;
  milkyWayOpacity: number;
  starBrilliance: number;
  dustBrilliance: number;
  narrativeText: string;
}

interface SolarSystemCanvasProps {
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData | null) => void;
  onHoverPlanet: (planet: PlanetData | null) => void;
  showOrbits: boolean;
  showLabels: boolean;
  showAsteroids: boolean;
  educationalMode: boolean;
  scaleMode: 'artistic' | 'real';
  simulationSpeed: number;
  isPaused: boolean;
  resetSignal: number;
  zoomSignal: number;
  cinemaMode: boolean;
  isCinematicActive: boolean;
  onCompleteCinematic: () => void;
  cinematicState: CinematicState;
  setCinematicState: React.Dispatch<React.SetStateAction<CinematicState>>;
}

const SimulationClock: React.FC<{
  isPaused: boolean;
  simulationSpeed: number;
  timeRef: React.MutableRefObject<number>;
}> = ({ isPaused, simulationSpeed, timeRef }) => {
  useFrame((_, delta) => {
    if (!isPaused) {
      timeRef.current += delta * simulationSpeed;
    }
  });
  return null;
};

export const SolarSystemCanvas: React.FC<SolarSystemCanvasProps> = ({
  selectedPlanet,
  onSelectPlanet,
  onHoverPlanet,
  showOrbits,
  showLabels,
  showAsteroids,
  educationalMode,
  scaleMode,
  simulationSpeed,
  isPaused,
  resetSignal,
  zoomSignal,
  cinemaMode,
  isCinematicActive,
  onCompleteCinematic,
  cinematicState,
  setCinematicState,
}) => {
  const timeRef = useRef<number>(0);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const planetPositionsRef = useRef<Map<string, () => THREE.Vector3>>(new Map());

  const registerPlanetPosition = useCallback((id: string, getPos: () => THREE.Vector3) => {
    planetPositionsRef.current.set(id, getPos);
  }, []);

  const getPlanetPosition = useCallback((id: string): THREE.Vector3 | null => {
    const fn = planetPositionsRef.current.get(id);
    return fn ? fn() : null;
  }, []);

  const sunData = PLANETS_DATA.find((p) => p.id === 'sun')!;
  const blackHoleData = PLANETS_DATA.find((p) => p.id === 'black-hole');
  const planetList = PLANETS_DATA.filter((p) => p.id !== 'sun' && p.id !== 'black-hole' && p.id !== 'moon');

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 85, 140], fov: 45, near: 0.1, far: 2500 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onPointerMissed={() => {
          if (!isCinematicActive) {
            onSelectPlanet(null);
          }
        }}
      >
        {/* Deep, pristine space black */}
        <color attach="background" args={['#020409']} />

        {/* Ambient lighting */}
        <ambientLight color="#182033" intensity={0.55} />

        {/* Natural Twinkling Stars */}
        <TwinklingStars brilliance={cinematicState.starBrilliance} />

        {/* Deep Cosmic Starfield */}
        <Stars
          radius={380}
          depth={90}
          count={6000}
          factor={5}
          saturation={0.5}
          fade
          speed={0.8}
        />

        {/* Gently Drifting Natural Cosmic Dust */}
        <CosmicDust brilliance={cinematicState.dustBrilliance} />

        {/* Fiery Asteroid Streaking Across the Frame */}
        <FieryAsteroid
          progress={cinematicState.asteroidProgress}
          active={cinematicState.asteroidActive}
        />

        {/* Global Simulation Time Driver */}
        <SimulationClock
          isPaused={isPaused}
          simulationSpeed={simulationSpeed}
          timeRef={timeRef}
        />

        {/* The Sun */}
        <SunMesh
          data={sunData}
          isSelected={selectedPlanet?.id === 'sun'}
          onSelect={onSelectPlanet}
          scaleMode={scaleMode}
        />

        {/* The Planets */}
        {planetList.map((planet) => (
          <PlanetMesh
            key={planet.id}
            data={planet}
            isSelected={selectedPlanet?.id === planet.id}
            selectedPlanetId={selectedPlanet?.id}
            onSelect={onSelectPlanet}
            onHover={onHoverPlanet}
            showOrbits={showOrbits}
            showLabels={showLabels}
            scaleMode={scaleMode}
            simulationSpeed={simulationSpeed}
            isPaused={isPaused}
            timeRef={timeRef}
            registerPlanetPosition={registerPlanetPosition}
          />
        ))}

        {/* The Majestic Gravitational Singularity (Black Hole Beyond Pluto) */}
        {blackHoleData && (
          <BlackHoleMesh
            data={blackHoleData}
            isSelected={selectedPlanet?.id === blackHoleData.id}
            onSelect={onSelectPlanet}
            onHover={onHoverPlanet}
            showOrbits={showOrbits}
            showLabels={showLabels}
            scaleMode={scaleMode}
            simulationSpeed={simulationSpeed}
            isPaused={isPaused}
            timeRef={timeRef}
            registerPlanetPosition={registerPlanetPosition}
          />
        )}

        {/* Asteroid Belts */}
        <AsteroidBelt
          showAsteroids={showAsteroids}
          isPaused={isPaused}
          timeRef={timeRef}
        />

        {/* Circumstellar Habitable Zone (Educational Mode) */}
        <HabitableZone show={educationalMode} />

        {/* Camera Controller & OrbitControls */}
        <CameraController
          selectedPlanet={selectedPlanet}
          getPlanetPosition={getPlanetPosition}
          resetSignal={resetSignal}
          zoomSignal={zoomSignal}
          cinemaMode={cinemaMode}
          isCinematicActive={isCinematicActive}
          controlsRefExternal={controlsRef}
        />

        {/* Cinematic Sequence Director */}
        <CinematicDirector
          isPlaying={isCinematicActive}
          onComplete={onCompleteCinematic}
          setCinematicState={setCinematicState}
          controlsRef={controlsRef}
        />
      </Canvas>
    </div>
  );
};

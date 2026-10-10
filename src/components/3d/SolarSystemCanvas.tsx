import React, { useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS_DATA, PlanetData } from '../../data/planetsData';
import { SunMesh } from './SunMesh';
import { PlanetMesh } from './PlanetMesh';
import { AsteroidBelt } from './AsteroidBelt';
import { HabitableZone } from './HabitableZone';
import { CameraController } from './CameraController';

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
}) => {
  const timeRef = useRef<number>(0);
  const planetPositionsRef = useRef<Map<string, () => THREE.Vector3>>(new Map());

  const registerPlanetPosition = useCallback((id: string, getPos: () => THREE.Vector3) => {
    planetPositionsRef.current.set(id, getPos);
  }, []);

  const getPlanetPosition = useCallback((id: string): THREE.Vector3 | null => {
    const fn = planetPositionsRef.current.get(id);
    return fn ? fn() : null;
  }, []);

  const sunData = PLANETS_DATA.find((p) => p.id === 'sun')!;
  const planetList = PLANETS_DATA.filter((p) => p.id !== 'sun');

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 85, 140], fov: 45, near: 0.1, far: 2000 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onPointerMissed={() => {
          onSelectPlanet(null);
        }}
      >
        <color attach="background" args={['#030509']} />

        {/* Deep space ambience lighting */}
        <ambientLight color="#182033" intensity={0.55} />

        {/* Realistic Cosmic Starfield */}
        <Stars
          radius={350}
          depth={90}
          count={7000}
          factor={6}
          saturation={0.8}
          fade
          speed={0.8}
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

        {/* Asteroid Belts */}
        <AsteroidBelt
          showAsteroids={showAsteroids}
          isPaused={isPaused}
          timeRef={timeRef}
        />

        {/* Circumstellar Habitable Zone (Educational Mode) */}
        <HabitableZone show={educationalMode} />

        {/* Cinematic Camera Controller & OrbitControls */}
        <CameraController
          selectedPlanet={selectedPlanet}
          getPlanetPosition={getPlanetPosition}
          resetSignal={resetSignal}
          zoomSignal={zoomSignal}
          cinemaMode={cinemaMode}
        />
      </Canvas>
    </div>
  );
};

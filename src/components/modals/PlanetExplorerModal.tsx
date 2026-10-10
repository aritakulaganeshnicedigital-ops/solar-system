import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import {
  X,
  Layers,
  Wind,
  Moon,
  Rocket,
  Compass,
  Thermometer,
  Shield,
  Orbit,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { PLANETS_DATA, PlanetData } from '../../data/planetsData';
import {
  getPlanetTexture,
  getEarthCloudsTexture,
  getSaturnRingsTexture,
  getBlackHoleAccretionTexture
} from '../../utils/textureGenerator';
import { audioSystem } from '../../utils/audioSystem';

interface PlanetExplorerModalProps {
  planet: PlanetData | null;
  onClose: () => void;
  onSelectPlanet: (planet: PlanetData) => void;
}

// Mini interactive 3D Planet Preview Mesh inside modal
const Interactive3DPlanet: React.FC<{ planet: PlanetData }> = ({ planet }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const diskRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => getPlanetTexture(planet.id), [planet.id]);
  const cloudsTexture = useMemo(
    () => (planet.hasClouds ? getEarthCloudsTexture() : null),
    [planet.hasClouds]
  );
  const ringsTexture = useMemo(
    () => (planet.id === 'saturn' ? getSaturnRingsTexture() : null),
    [planet.id]
  );
  const accretionTexture = useMemo(
    () => (planet.id === 'black-hole' ? getBlackHoleAccretionTexture() : null),
    [planet.id]
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.32;
    }
    if (diskRef.current) {
      diskRef.current.rotation.z += delta * 1.6;
    }
  });

  const tiltRad = (planet.axialTiltDeg * Math.PI) / 180;

  if (planet.id === 'black-hole') {
    return (
      <group rotation={[tiltRad * 0.5, 0, Math.PI / 6]}>
        {/* Event Horizon */}
        <mesh>
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshBasicMaterial color="#000000" depthWrite={true} />
        </mesh>
        {/* Photon Sphere Rim */}
        <mesh scale={1.04}>
          <sphereGeometry args={[1.8, 48, 48]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh scale={1.09}>
          <sphereGeometry args={[1.8, 48, 48]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.6}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Relativistic Accretion Disk */}
        <mesh ref={diskRef} rotation={[Math.PI / 2.3, 0, 0]}>
          <ringGeometry args={[2.2, 5.8, 96]} />
          <meshBasicMaterial
            map={accretionTexture || undefined}
            side={THREE.DoubleSide}
            transparent
            opacity={0.96}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Lensed Vertical Ring */}
        <mesh rotation={[0, 0, 0]}>
          <ringGeometry args={[2.4, 4.2, 64]} />
          <meshBasicMaterial
            color="#f59e0b"
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Polar Jets */}
        <mesh position={[0, 6, 0]}>
          <cylinderGeometry args={[0.08, 0.45, 12, 16, 1, true]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh position={[0, -6, 0]}>
          <cylinderGeometry args={[0.45, 0.08, 12, 16, 1, true]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group rotation={[tiltRad * 0.5, 0, 0]}>
      {/* Central Planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        {planet.id === 'sun' ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshStandardMaterial map={texture} roughness={0.7} metalness={0.1} />
        )}
      </mesh>

      {/* Earth Clouds */}
      {planet.hasClouds && cloudsTexture && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[2.26, 64, 64]} />
          <meshStandardMaterial
            map={cloudsTexture}
            transparent
            opacity={0.75}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Saturn Rings */}
      {planet.hasRings && planet.id === 'saturn' && (
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <ringGeometry args={[2.9, 5.2, 64]} />
          <meshStandardMaterial
            map={ringsTexture || undefined}
            color="#e5c899"
            side={THREE.DoubleSide}
            transparent
            opacity={0.92}
            roughness={0.8}
          />
        </mesh>
      )}

      {/* Uranus Rings */}
      {planet.hasRings && planet.id === 'uranus' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.8, 3.8, 64]} />
          <meshBasicMaterial
            color="#7dd3fc"
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}

      {/* Subtle Atmosphere Rim */}
      <mesh scale={1.05}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export const PlanetExplorerModal: React.FC<PlanetExplorerModalProps> = ({
  planet,
  onClose,
  onSelectPlanet,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'structure' | 'atmosphere' | 'moons' | 'missions'>('overview');
  const [currentPlanet, setCurrentPlanet] = useState<PlanetData>(planet || PLANETS_DATA[3]);

  React.useEffect(() => {
    if (planet) {
      setCurrentPlanet(planet);
    }
  }, [planet]);

  if (!planet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] glass-panel-violet rounded-3xl flex flex-col overflow-hidden border border-violet-500/30 shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-space-950/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Quick Planet Switcher Dropdown */}
            <div className="relative">
              <select
                value={currentPlanet.id}
                onChange={(e) => {
                  const found = PLANETS_DATA.find((p) => p.id === e.target.value);
                  if (found) {
                    audioSystem.playPlanetSelect();
                    setCurrentPlanet(found);
                    onSelectPlanet(found);
                  }
                }}
                className="bg-space-900 border border-violet-500/40 text-violet-200 font-bold text-sm sm:text-base rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono cursor-pointer"
              >
                {PLANETS_DATA.map((p) => (
                  <option key={p.id} value={p.id} className="bg-space-950 text-white">
                    {p.name.toUpperCase()} ({p.type})
                  </option>
                ))}
              </select>
            </div>

            <span className="text-xs text-slate-400 hidden sm:inline font-mono">
              Deep Planetary Laboratory
            </span>
          </div>

          {/* Close Modal Button */}
          <button
            onClick={() => {
              audioSystem.playUiClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-slate-800/80 bg-space-950/40 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Stats', icon: Info },
            { id: 'structure', label: 'Internal Structure', icon: Layers },
            { id: 'atmosphere', label: 'Atmosphere & Climate', icon: Wind },
            { id: 'moons', label: `Moons & Rings (${currentPlanet.moonsCount})`, icon: Moon },
            { id: 'missions', label: 'Exploration History', icon: Rocket },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  audioSystem.playUiClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-cyan-400 text-cyan-accent bg-cyan-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive 3D Planet Rotator (4 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-b from-space-900 to-space-950 border border-violet-500/20 overflow-hidden relative shadow-inner">
              <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                <ambientLight color="#2a3352" intensity={0.8} />
                <directionalLight position={[5, 3, 5]} intensity={2.0} color="#fff" />
                <Interactive3DPlanet planet={currentPlanet} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.0} />
              </Canvas>

              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-400 pointer-events-none">
                <span>Drag to rotate</span>
                <span className="text-cyan-accent">Axial Tilt: {currentPlanet.axialTiltDeg}°</span>
              </div>
            </div>

            {/* Quick telemetry badges under 3D canvas */}
            <div className="grid grid-cols-2 gap-2 w-full mt-3 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-space-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400">PLANETARY MASS</span>
                <div className="text-white font-bold truncate">{currentPlanet.massKg}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-space-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400">GRAVITY</span>
                <div className="text-cyan-accent font-bold">{currentPlanet.gravityMps2} m/s²</div>
              </div>
            </div>
          </div>

          {/* Right Column: Tab View Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {currentPlanet.name} — {currentPlanet.tagline}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentPlanet.detailedDescription}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-space-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-accent uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Scientific Highlights & Curiosities</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {currentPlanet.quickFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: INTERNAL STRUCTURE */}
            {activeTab === 'structure' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Internal Layer Stratigraphy
                  </h3>
                  <p className="text-xs text-slate-400">
                    Cross-section composition determined through seismology, gravity mapping, and magnetic dynamo models.
                  </p>
                </div>

                <div className="space-y-3">
                  {currentPlanet.internalStructure.map((layer, idx) => (
                    <div
                      key={layer.name}
                      className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: layer.color }}
                          />
                          <span className="text-sm font-bold text-white font-mono">
                            {idx + 1}. {layer.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-cyan-accent bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                          {layer.thickness}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        {layer.composition}
                      </div>
                      <p className="text-xs text-slate-300">
                        {layer.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: ATMOSPHERE & CLIMATE */}
            {activeTab === 'atmosphere' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Atmospheric Chemistry & Thermal Regime
                  </h3>
                  <p className="text-xs text-slate-400">
                    Spectroscopic breakdown of primary volatile and molecular compounds.
                  </p>
                </div>

                {/* Composition Bars */}
                <div className="space-y-2.5 p-4 rounded-2xl bg-space-900/80 border border-slate-800">
                  {currentPlanet.atmosphereComposition.map((gas) => (
                    <div key={gas.gas} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-200">{gas.gas}</span>
                        <span className="text-cyan-accent font-bold">{gas.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-space-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                          style={{ width: `${Math.min(100, gas.percentage)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Thermal extremes */}
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-3 rounded-xl bg-space-900/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400">MIN TEMP</div>
                    <div className="text-sm font-bold text-cyan-400">{currentPlanet.surfaceTempC.min}°C</div>
                  </div>
                  <div className="p-3 rounded-xl bg-space-900/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400">MEAN TEMP</div>
                    <div className="text-sm font-bold text-white">{currentPlanet.surfaceTempC.avg}°C</div>
                  </div>
                  <div className="p-3 rounded-xl bg-space-900/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400">MAX TEMP</div>
                    <div className="text-sm font-bold text-rose-400">{currentPlanet.surfaceTempC.max}°C</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MOONS & RINGS */}
            {activeTab === 'moons' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      Natural Satellites & Planetary Rings
                    </h3>
                    <p className="text-xs text-slate-400">
                      Total confirmed moons: <span className="text-cyan-accent font-mono font-bold">{currentPlanet.moonsCount}</span>
                    </p>
                  </div>
                </div>

                {currentPlanet.notableMoons.length > 0 ? (
                  <div className="space-y-2.5">
                    {currentPlanet.notableMoons.map((moon) => (
                      <div
                        key={moon.name}
                        className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white font-mono">
                            {moon.name}
                          </span>
                          <span className="text-xs font-mono text-cyan-accent">
                            Diameter: {moon.diameterKm.toLocaleString()} km
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Discovered by {moon.discoveredBy} ({moon.discoveryYear > 0 ? moon.discoveryYear : 'Ancient'})
                        </div>
                        <p className="text-xs text-slate-300">
                          {moon.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-2xl bg-space-900/40 border border-slate-800 text-slate-400 text-xs font-mono">
                    No confirmed natural satellites in orbit around this body.
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: EXPLORATION MISSIONS */}
            {activeTab === 'missions' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Human Exploration Fleet
                  </h3>
                  <p className="text-xs text-slate-400">
                    Spacecraft and robotic emissaries dispatched to study {currentPlanet.name}.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentPlanet.explorationMissions.map((miss) => (
                    <div
                      key={miss}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-space-900/90 border border-cyan-500/30 text-xs font-mono text-slate-200"
                    >
                      <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{miss}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

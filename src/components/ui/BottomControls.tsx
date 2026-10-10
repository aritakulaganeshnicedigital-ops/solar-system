import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Disc,
  Tag,
  Layers,
  Scale,
  GraduationCap,
  SlidersHorizontal,
  Gauge
} from 'lucide-react';
import { audioSystem } from '../../utils/audioSystem';
import type { PlanetData } from '../../data/planetsData';

interface BottomControlsProps {
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  simulationSpeed: number;
  setSimulationSpeed: (speed: number) => void;
  showOrbits: boolean;
  setShowOrbits: (show: boolean) => void;
  showLabels: boolean;
  setShowLabels: (show: boolean) => void;
  showAsteroids: boolean;
  setShowAsteroids: (show: boolean) => void;
  educationalMode: boolean;
  setEducationalMode: (edu: boolean) => void;
  scaleMode: 'artistic' | 'real';
  setScaleMode: (mode: 'artistic' | 'real') => void;
  onResetCamera: () => void;
  selectedPlanet: PlanetData | null;
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  isPaused,
  setIsPaused,
  simulationSpeed,
  setSimulationSpeed,
  showOrbits,
  setShowOrbits,
  showLabels,
  setShowLabels,
  showAsteroids,
  setShowAsteroids,
  educationalMode,
  setEducationalMode,
  scaleMode,
  setScaleMode,
  onResetCamera,
  selectedPlanet,
}) => {
  const [showAdvancedTray, setShowAdvancedTray] = React.useState(false);

  const speedPresets = [
    { label: '0.1x', value: 0.1 },
    { label: '1x', value: 1.0 },
    { label: '5x', value: 5.0 },
    { label: '20x', value: 20.0 },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 pointer-events-none px-3 sm:px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
        {/* Advanced Layers Popover Tray */}
        {showAdvancedTray && (
          <div className="pointer-events-auto glass-panel px-4 py-2.5 rounded-2xl flex flex-wrap items-center justify-center gap-3 border border-slate-800 animate-in fade-in slide-in-from-bottom duration-200">
            {/* Speed Slider */}
            <div className="flex items-center gap-2 px-3 py-1 bg-space-950/80 rounded-xl border border-slate-800 text-xs font-mono">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Speed:</span>
              <input
                type="range"
                min="0.1"
                max="25"
                step="0.5"
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                className="w-24 accent-cyan-400 cursor-pointer"
              />
              <span className="text-cyan-accent font-bold w-10 text-right">{simulationSpeed.toFixed(1)}x</span>
            </div>

            {/* Toggle Asteroids */}
            <button
              onClick={() => {
                audioSystem.playUiClick();
                setShowAsteroids(!showAsteroids);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                showAsteroids
                  ? 'bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                  : 'text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Asteroids: {showAsteroids ? 'ON' : 'OFF'}</span>
            </button>

            {/* Toggle Scale Mode */}
            <button
              onClick={() => {
                audioSystem.playUiClick();
                setScaleMode(scaleMode === 'artistic' ? 'real' : 'artistic');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                scaleMode === 'real'
                  ? 'bg-violet-500/25 text-violet-300 border border-violet-500/40 shadow-[0_0_8px_rgba(139,92,246,0.2)]'
                  : 'bg-space-900 text-slate-300 border border-slate-800 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Scale: {scaleMode === 'artistic' ? 'Cinematic' : 'Realistic'}</span>
            </button>

            {/* Toggle Educational Mode */}
            <button
              onClick={() => {
                audioSystem.playUiClick();
                setEducationalMode(!educationalMode);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                educationalMode
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                  : 'text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Habitable Zone: {educationalMode ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        )}

        {/* Primary Floating Mission Control Console */}
        <div className="pointer-events-auto glass-panel px-3 py-2 sm:px-5 sm:py-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 border border-cyan-500/25 shadow-glass w-full sm:w-auto">
          {/* 1. Play / Pause Button */}
          <button
            onClick={() => {
              audioSystem.playUiClick();
              setIsPaused(!isPaused);
            }}
            title={isPaused ? 'Resume Simulation (Spacebar)' : 'Pause Simulation (Spacebar)'}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer ${
              isPaused
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-cyan-500/20 border-cyan-400 text-cyan-accent shadow-[0_0_15px_rgba(0,240,255,0.3)]'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
          </button>

          {/* 2. Reset Camera to Solar System View */}
          <button
            onClick={() => {
              audioSystem.playUiClick();
              onResetCamera();
            }}
            title="Reset Camera to Full Solar System (Esc)"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-panel border border-slate-700/80 text-slate-200 hover:text-cyan-accent hover:border-cyan-500/40 transition-all text-xs font-mono cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset View</span>
          </button>

          {/* 3. Orbit Toggle Button (Direct 1-Click Access) */}
          <button
            onClick={() => {
              audioSystem.playUiClick();
              setShowOrbits(!showOrbits);
            }}
            title="Toggle Orbital Path Lines"
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
              showOrbits
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-accent shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                : 'glass-panel border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Orbits: {showOrbits ? 'ON' : 'OFF'}</span>
          </button>

          {/* 4. Planet Labels Toggle Button (Direct 1-Click Access) */}
          <button
            onClick={() => {
              audioSystem.playUiClick();
              setShowLabels(!showLabels);
            }}
            title="Toggle Planet Names in 3D Scene"
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
              showLabels
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-accent shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                : 'glass-panel border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Labels: {showLabels ? 'ON' : 'OFF'}</span>
          </button>

          {/* 5. Simulation Speed Selector */}
          <div className="flex items-center gap-1 bg-space-950/70 p-1 rounded-xl border border-slate-800">
            {speedPresets.map((preset) => {
              const isSelected = simulationSpeed === preset.value;
              return (
                <button
                  key={preset.value}
                  onClick={() => {
                    audioSystem.playUiClick();
                    setSimulationSpeed(preset.value);
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/25 text-cyan-accent border border-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* 6. Advanced Settings Toggle Button */}
          <button
            onClick={() => {
              audioSystem.playUiClick();
              setShowAdvancedTray(!showAdvancedTray);
            }}
            title="Advanced Simulation Layers (Scale, Asteroids, Habitable Zone)"
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              showAdvancedTray
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-accent shadow-[0_0_10px_rgba(0,240,255,0.25)]'
                : 'glass-panel border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

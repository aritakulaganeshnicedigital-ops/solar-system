import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Layers,
  Tag,
  Disc,
  GraduationCap,
  Scale,
  Activity,
  SlidersHorizontal,
} from 'lucide-react';
import { audioSystem } from '../../utils/audioSystem';
import { PlanetData } from '../../data/planetsData';

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
  const [showOptionsTray, setShowOptionsTray] = React.useState(false);

  const speedPresets = [
    { label: '0.1x', value: 0.1, desc: 'Slow' },
    { label: '1x', value: 1.0, desc: 'Realtime' },
    { label: '5x', value: 5.0, desc: 'High' },
    { label: '20x', value: 20.0, desc: 'Warp' },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 pointer-events-none px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-2">
        {/* Expanded Options Tray (on demand or desktop) */}
        {showOptionsTray && (
          <div className="pointer-events-auto glass-panel px-4 py-2.5 rounded-2xl flex flex-wrap items-center justify-center gap-3 border border-slate-800 animate-in fade-in slide-in-from-bottom duration-200">
            {/* Toggle Orbits */}
            <button
              onClick={() => {
                audioSystem.playUiClick();
                setShowOrbits(!showOrbits);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                showOrbits
                  ? 'bg-cyan-500/20 text-cyan-accent border border-cyan-500/40'
                  : 'text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
              <span>Orbits: {showOrbits ? 'ON' : 'OFF'}</span>
            </button>

            {/* Toggle Labels */}
            <button
              onClick={() => {
                audioSystem.playUiClick();
                setShowLabels(!showLabels);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                showLabels
                  ? 'bg-cyan-500/20 text-cyan-accent border border-cyan-500/40'
                  : 'text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Labels: {showLabels ? 'ON' : 'OFF'}</span>
            </button>

            {/* Toggle Asteroids */}
            <button
              onClick={() => {
                audioSystem.playUiClick();
                setShowAsteroids(!showAsteroids);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                showAsteroids
                  ? 'bg-cyan-500/20 text-cyan-accent border border-cyan-500/40'
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
                  ? 'bg-violet-500/25 text-violet-300 border border-violet-500/40'
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
              <span>Education Mode: {educationalMode ? 'ACTIVE' : 'OFF'}</span>
            </button>
          </div>
        )}

        {/* Main Floating Control Bar */}
        <div className="pointer-events-auto glass-panel px-3 py-2 sm:px-5 sm:py-2.5 rounded-2xl flex items-center justify-between gap-3 sm:gap-6 border border-cyan-500/20 shadow-glass">
          {/* Left: Play / Pause & Reset */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Play / Pause */}
            <button
              onClick={() => {
                audioSystem.playUiClick();
                setIsPaused(!isPaused);
              }}
              title={isPaused ? 'Resume Simulation (Space)' : 'Pause Simulation (Space)'}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                isPaused
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                  : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-accent shadow-[0_0_12px_rgba(0,240,255,0.25)]'
              }`}
            >
              {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
            </button>

            {/* Reset Camera View */}
            <button
              onClick={() => {
                audioSystem.playUiClick();
                onResetCamera();
              }}
              title="Reset Camera to Solar System Overview (Esc)"
              className="flex items-center gap-1.5 px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl glass-panel border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all text-xs font-mono cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Reset View</span>
            </button>
          </div>

          {/* Center: Simulation Speed Buttons */}
          <div className="flex items-center gap-1 bg-space-950/60 p-1 rounded-xl border border-slate-800">
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
                      ? 'bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 shadow-[0_0_8px_rgba(0,240,255,0.25)]'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Right: Quick Options Button & Live Telemetry Pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioSystem.playUiClick();
                setShowOptionsTray(!showOptionsTray);
              }}
              title="Visual & Simulation Layers"
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                showOptionsTray
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-accent'
                  : 'glass-panel border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Live Telemetry Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-space-950/70 border border-slate-800 font-mono text-[11px]">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                }`}
              />
              <span className="text-slate-400">
                {isPaused ? 'SIMULATION PAUSED' : 'ORBIT ENGINE RUNNING'}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-accent font-semibold">
                {selectedPlanet ? `TARGET: ${selectedPlanet.name.toUpperCase()}` : 'SOLAR SYSTEM OVERVIEW'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Compass, Shield, Thermometer, Orbit, Wind, ArrowRight, Sparkles } from 'lucide-react';
import type { PlanetData } from '../../data/planetsData';
import { audioSystem } from '../../utils/audioSystem';

interface PlanetInfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
  onOpenExplorer: (planet: PlanetData) => void;
}

export const PlanetInfoPanel: React.FC<PlanetInfoPanelProps> = ({
  planet,
  onClose,
  onOpenExplorer,
}) => {
  if (!planet) return null;

  const diameterKm = planet.realRadiusKm * 2;

  return (
    <div className="fixed top-16 sm:top-20 right-2 sm:right-4 bottom-20 sm:bottom-24 z-30 w-[calc(100vw-1rem)] sm:w-96 max-w-sm pointer-events-none flex flex-col justify-end">
      <div className="relative w-full max-h-[85vh] sm:max-h-full glass-panel rounded-2xl flex flex-col overflow-hidden pointer-events-auto border border-cyan-500/25 shadow-glass animate-in fade-in slide-in-from-right duration-300">
        {/* HUD Tech Corner Accents */}
        <div className="hud-corner hud-tl" />
        <div className="hud-corner hud-tr" />
        <div className="hud-corner hud-bl" />
        <div className="hud-corner hud-br" />

        {/* Panel Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-space-950/70 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Glowing Planet Orb Thumbnail */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg relative"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.secondaryColor})`,
                boxShadow: `0 0 20px ${planet.color}66`,
              }}
            >
              {planet.hasRings && (
                <div
                  className="absolute w-16 h-3 rounded-full border border-yellow-200/60 -rotate-12 pointer-events-none"
                  style={{ borderColor: planet.ringsConfig?.color || '#e5c899' }}
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white font-sans">
                  {planet.name}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-accent border border-cyan-500/30">
                  {planet.type}
                </span>
              </div>
              <div className="text-xs text-slate-400 italic">
                "{planet.tagline}"
              </div>
            </div>
          </div>

          {/* Close Panel Button */}
          <button
            onClick={() => {
              audioSystem.playUiClick();
              onClose();
            }}
            title="Return to Solar System Overview"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Telemetry Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Scientific Summary Description */}
          <p className="text-xs text-slate-300 leading-relaxed">
            {planet.description}
          </p>

          {/* Primary Scientific Telemetry Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {/* 1. Diameter */}
            <div className="p-2.5 rounded-xl bg-space-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mb-1">
                <Compass className="w-3 h-3 text-cyan-400" />
                <span>MEAN DIAMETER</span>
              </div>
              <div className="font-bold text-slate-100">
                {diameterKm.toLocaleString()} km
              </div>
              <div className="text-[10px] text-cyan-300/80">
                Radius: {planet.realRadiusKm.toLocaleString()} km
              </div>
            </div>

            {/* 2. Distance from Sun */}
            <div className="p-2.5 rounded-xl bg-space-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mb-1">
                <Orbit className="w-3 h-3 text-violet-400" />
                <span>DISTANCE FROM SUN</span>
              </div>
              <div className="font-bold text-slate-100">
                {planet.distanceFromSunAU === 0 ? '0 AU' : `${planet.distanceFromSunAU} AU`}
              </div>
              <div className="text-[10px] text-slate-400">
                {planet.distanceFromSunKm === 0 ? 'Central Star' : `${planet.distanceFromSunKm}M km`}
              </div>
            </div>

            {/* 3. Orbital Period */}
            <div className="p-2.5 rounded-xl bg-space-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mb-1">
                <Orbit className="w-3 h-3 text-emerald-400" />
                <span>ORBITAL PERIOD</span>
              </div>
              <div className="font-bold text-slate-100">
                {planet.orbitalPeriodDays === 0
                  ? 'N/A'
                  : planet.orbitalPeriodDays > 365
                  ? `${(planet.orbitalPeriodDays / 365.25).toFixed(1)} Earth Yrs`
                  : `${planet.orbitalPeriodDays.toFixed(1)} Days`}
              </div>
              <div className="text-[10px] text-slate-400">
                {planet.orbitalPeriodDays === 0 ? 'Stationary' : `${planet.orbitalPeriodDays.toLocaleString()} Earth Days`}
              </div>
            </div>

            {/* 4. Rotation Period (Day Length) */}
            <div className="p-2.5 rounded-xl bg-space-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mb-1">
                <Compass className="w-3 h-3 text-amber-400" />
                <span>ROTATION PERIOD</span>
              </div>
              <div className="font-bold text-slate-100">
                {Math.abs(planet.rotationPeriodHours) > 24
                  ? `${(Math.abs(planet.rotationPeriodHours) / 24).toFixed(1)} Earth Days`
                  : `${Math.abs(planet.rotationPeriodHours).toFixed(1)} Hours`}
              </div>
              <div className="text-[10px] text-slate-400">
                {planet.rotationPeriodHours < 0 ? 'Retrograde' : 'Prograde'} ({Math.abs(planet.rotationPeriodHours).toFixed(1)} hrs)
              </div>
            </div>

            {/* 5. Surface Temperature */}
            <div className="p-2.5 rounded-xl bg-space-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mb-1">
                <Thermometer className="w-3 h-3 text-rose-400" />
                <span>SURFACE TEMP</span>
              </div>
              <div className="font-bold text-slate-100">
                {planet.surfaceTempC.avg.toLocaleString()} °C
              </div>
              <div className="text-[10px] text-slate-500">
                {planet.surfaceTempC.min}°C to {planet.surfaceTempC.max}°C
              </div>
            </div>

            {/* 6. Surface Gravity */}
            <div className="p-2.5 rounded-xl bg-space-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mb-1">
                <Shield className="w-3 h-3 text-blue-400" />
                <span>GRAVITY</span>
              </div>
              <div className="font-bold text-slate-100">
                {planet.gravityMps2} m/s²
              </div>
              <div className="text-[10px] text-slate-500">
                {(planet.gravityMps2 / 9.807).toFixed(2)}x Earth g
              </div>
            </div>
          </div>

          {/* Moons Breakdown */}
          <div className="p-3 rounded-xl bg-space-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Confirmed Moons (Satellites)
              </span>
              <span className="text-xs font-mono font-bold text-cyan-accent">
                {planet.moonsCount}
              </span>
            </div>
            {planet.notableMoons.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {planet.notableMoons.map((moon) => (
                  <span
                    key={moon.name}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-slate-700/60"
                  >
                    {moon.name} ({moon.diameterKm.toLocaleString()} km)
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-[10px] text-slate-500 italic">
                No natural satellites detected
              </div>
            )}
            <div className="text-[9px] text-slate-500 mt-2 font-mono">
              Source: NASA / JPL Solar System Dynamics Archive
            </div>
          </div>

          {/* Atmospheric Composition */}
          {planet.atmosphereComposition.length > 0 && (
            <div className="p-3 rounded-xl bg-space-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 mb-2 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <Wind className="w-3 h-3 text-cyan-400" />
                <span>Atmospheric Composition</span>
              </div>
              <div className="space-y-1.5">
                {planet.atmosphereComposition.slice(0, 4).map((item) => (
                  <div key={item.gas} className="space-y-0.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-300">{item.gas}</span>
                      <span className="text-cyan-accent font-semibold">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
                        style={{ width: `${Math.min(100, item.percentage)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Panel Footer Action Buttons */}
        <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-space-950/80 flex flex-col gap-2">
          <button
            onClick={() => {
              audioSystem.playWarp();
              onOpenExplorer(planet);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-mono text-xs font-bold text-space-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 hover:brightness-110 shadow-cyan-glow transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXPLORE PLANET IN DETAIL</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>

          <button
            onClick={() => {
              audioSystem.playUiClick();
              onClose();
            }}
            className="w-full py-1.5 text-[11px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer text-center"
          >
            Return to Solar System View
          </button>
        </div>
      </div>
    </div>
  );
};

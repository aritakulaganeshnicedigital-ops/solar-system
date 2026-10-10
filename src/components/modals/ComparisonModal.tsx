import React, { useState } from 'react';
import { X, Scale, ArrowLeftRight, Check, Sparkles } from 'lucide-react';
import { PLANETS_DATA, PlanetData } from '../../data/planetsData';
import { audioSystem } from '../../utils/audioSystem';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlanetA?: PlanetData | null;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  defaultPlanetA,
}) => {
  const [planetAId, setPlanetAId] = useState<string>(defaultPlanetA?.id || 'earth');
  const [planetBId, setPlanetBId] = useState<string>('mars');

  if (!isOpen) return null;

  const planetA = PLANETS_DATA.find((p) => p.id === planetAId) || PLANETS_DATA[3]; // Earth
  const planetB = PLANETS_DATA.find((p) => p.id === planetBId) || PLANETS_DATA[4]; // Mars

  // Size ratio for visual scaling (clamped for readability)
  const maxRadius = Math.max(planetA.realRadiusKm, planetB.realRadiusKm);
  const scaleA = Math.max(0.2, (planetA.realRadiusKm / maxRadius));
  const scaleB = Math.max(0.2, (planetB.realRadiusKm / maxRadius));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] glass-panel-violet rounded-3xl flex flex-col overflow-hidden border border-cyan-500/30 shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-space-950/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans">
                Comparative Planetary Laboratory
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Side-by-side metric, gravitational, and thermal analysis
              </div>
            </div>
          </div>

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

        {/* Planet Selectors Bar */}
        <div className="p-4 bg-space-950/50 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Planet A selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-cyan-accent">PRIMARY:</span>
            <select
              value={planetAId}
              onChange={(e) => {
                audioSystem.playUiClick();
                setPlanetAId(e.target.value);
              }}
              className="flex-1 bg-space-900 border border-cyan-500/40 text-cyan-200 font-bold text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono cursor-pointer"
            >
              {PLANETS_DATA.map((p) => (
                <option key={p.id} value={p.id} className="bg-space-950 text-white">
                  {p.name} ({p.type})
                </option>
              ))}
            </select>
          </div>

          {/* Planet B selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-violet-400">SECONDARY:</span>
            <select
              value={planetBId}
              onChange={(e) => {
                audioSystem.playUiClick();
                setPlanetBId(e.target.value);
              }}
              className="flex-1 bg-space-900 border border-violet-500/40 text-violet-200 font-bold text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-violet-400 font-mono cursor-pointer"
            >
              {PLANETS_DATA.map((p) => (
                <option key={p.id} value={p.id} className="bg-space-950 text-white">
                  {p.name} ({p.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Visual Scale Spheres comparison */}
          <div className="p-4 sm:p-6 rounded-2xl bg-space-900/60 border border-slate-800 flex flex-col items-center">
            <div className="text-xs font-mono text-slate-400 mb-6 uppercase tracking-wider">
              Relative Physical Size Comparison
            </div>
            <div className="flex items-center justify-around w-full max-w-lg min-h-[160px]">
              {/* Planet A Orb */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative"
                  style={{
                    width: `${scaleA * 130}px`,
                    height: `${scaleA * 130}px`,
                    background: `radial-gradient(circle at 30% 30%, ${planetA.color}, ${planetA.secondaryColor})`,
                    boxShadow: `0 0 25px ${planetA.color}55`,
                  }}
                />
                <span className="text-xs font-mono font-bold text-cyan-accent">
                  {planetA.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {planetA.realRadiusKm.toLocaleString()} km radius
                </span>
              </div>

              <div className="text-slate-600 font-mono text-lg font-bold">VS</div>

              {/* Planet B Orb */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative"
                  style={{
                    width: `${scaleB * 130}px`,
                    height: `${scaleB * 130}px`,
                    background: `radial-gradient(circle at 30% 30%, ${planetB.color}, ${planetB.secondaryColor})`,
                    boxShadow: `0 0 25px ${planetB.color}55`,
                  }}
                />
                <span className="text-xs font-mono font-bold text-violet-400">
                  {planetB.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {planetB.realRadiusKm.toLocaleString()} km radius
                </span>
              </div>
            </div>
          </div>

          {/* Comparative Metrics Table */}
          <div className="space-y-3 font-mono">
            {/* Metric: Gravity */}
            <div className="p-3.5 rounded-xl bg-space-900/70 border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-cyan-accent font-bold">{planetA.gravityMps2} m/s²</span>
                <span className="text-slate-400 uppercase tracking-wider">Surface Gravity</span>
                <span className="text-violet-400 font-bold">{planetB.gravityMps2} m/s²</span>
              </div>
              <div className="flex items-center gap-2 h-2">
                <div className="flex-1 bg-space-950 rounded-full h-full flex justify-end">
                  <div
                    className="bg-cyan-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, (planetA.gravityMps2 / 25) * 100)}%` }}
                  />
                </div>
                <div className="flex-1 bg-space-950 rounded-full h-full">
                  <div
                    className="bg-violet-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, (planetB.gravityMps2 / 25) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Metric: Mean Temperature */}
            <div className="p-3.5 rounded-xl bg-space-900/70 border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-cyan-accent font-bold">{planetA.surfaceTempC.avg} °C</span>
                <span className="text-slate-400 uppercase tracking-wider">Mean Surface Temp</span>
                <span className="text-violet-400 font-bold">{planetB.surfaceTempC.avg} °C</span>
              </div>
            </div>

            {/* Metric: Distance from Sun */}
            <div className="p-3.5 rounded-xl bg-space-900/70 border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-cyan-accent font-bold">{planetA.distanceFromSunAU} AU</span>
                <span className="text-slate-400 uppercase tracking-wider">Distance From Sun</span>
                <span className="text-violet-400 font-bold">{planetB.distanceFromSunAU} AU</span>
              </div>
            </div>

            {/* Metric: Orbital Period */}
            <div className="p-3.5 rounded-xl bg-space-900/70 border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-cyan-accent font-bold">
                  {planetA.orbitalPeriodDays > 365
                    ? `${(planetA.orbitalPeriodDays / 365.25).toFixed(1)} Yrs`
                    : `${planetA.orbitalPeriodDays} Days`}
                </span>
                <span className="text-slate-400 uppercase tracking-wider">Orbital Period (Year)</span>
                <span className="text-violet-400 font-bold">
                  {planetB.orbitalPeriodDays > 365
                    ? `${(planetB.orbitalPeriodDays / 365.25).toFixed(1)} Yrs`
                    : `${planetB.orbitalPeriodDays} Days`}
                </span>
              </div>
            </div>

            {/* Metric: Confirmed Moons */}
            <div className="p-3.5 rounded-xl bg-space-900/70 border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-cyan-accent font-bold">{planetA.moonsCount} Moons</span>
                <span className="text-slate-400 uppercase tracking-wider">Natural Satellites</span>
                <span className="text-violet-400 font-bold">{planetB.moonsCount} Moons</span>
              </div>
            </div>
          </div>

          {/* Comparative Scientific Insight Generator */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-violet-950/40 border border-cyan-500/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-200 space-y-1">
              <div className="font-bold text-white uppercase tracking-wider font-mono">
                Comparative Astrodynamic Insight:
              </div>
              <p>
                {planetA.name}’s radius is{' '}
                <span className="text-cyan-accent font-bold">
                  {(planetA.realRadiusKm / planetB.realRadiusKm).toFixed(2)}x
                </span>{' '}
                that of {planetB.name}. A person weighing 70 kg on {planetA.name} would experience an effective weight of{' '}
                <span className="text-violet-300 font-bold">
                  {((70 * planetB.gravityMps2) / planetA.gravityMps2).toFixed(1)} kg
                </span>{' '}
                standing on the surface of {planetB.name}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

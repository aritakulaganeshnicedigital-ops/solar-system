import React, { useState, useMemo } from 'react';
import { X, Rocket, Calendar, Compass, CheckCircle2, Navigation, ArrowUpRight, Filter } from 'lucide-react';
import { SPACE_MISSIONS, SpaceMission } from '../../data/missionsData';
import { PLANETS_DATA, PlanetData } from '../../data/planetsData';
import { audioSystem } from '../../utils/audioSystem';

interface MissionsTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlanet: (planet: PlanetData) => void;
}

export const MissionsTimelineModal: React.FC<MissionsTimelineModalProps> = ({
  isOpen,
  onClose,
  onSelectPlanet,
}) => {
  const [targetFilter, setTargetFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMissions = useMemo(() => {
    return SPACE_MISSIONS.filter((m) => {
      const matchTarget = targetFilter === 'all' || m.targetPlanetId === targetFilter;
      const matchStatus = statusFilter === 'all' || m.status === statusFilter;
      return matchTarget && matchStatus;
    });
  }, [targetFilter, statusFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] glass-panel-violet rounded-3xl flex flex-col overflow-hidden border border-cyan-500/30 shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-space-950/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-accent">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans">
                Interplanetary Missions Archive
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Historic expeditions & deep space robotic probes
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

        {/* Filter Controls Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-800 bg-space-950/40 flex flex-wrap items-center gap-3">
          {/* Target filter */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">TARGET:</span>
            <select
              value={targetFilter}
              onChange={(e) => setTargetFilter(e.target.value)}
              className="bg-space-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">All Celestial Targets</option>
              {PLANETS_DATA.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">STATUS:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-space-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">All Operational Statuses</option>
              <option value="Active">Active Science Operation</option>
              <option value="Completed">Mission Completed</option>
              <option value="En Route">En Route / Transit</option>
            </select>
          </div>

          <span className="text-xs font-mono text-cyan-accent ml-auto">
            {filteredMissions.length} MISSIONS LOGGED
          </span>
        </div>

        {/* Scrollable Missions Timeline Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMissions.map((mission) => {
              const targetPlanet = PLANETS_DATA.find((p) => p.id === mission.targetPlanetId);
              return (
                <div
                  key={mission.id}
                  className="p-4 sm:p-5 rounded-2xl bg-space-900/70 border border-slate-800/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-2">
                    {/* Mission Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold">
                            {mission.agency}
                          </span>
                          <span
                            className={`text-xs font-mono px-2 py-0.5 rounded border ${
                              mission.status === 'Active'
                                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                : mission.status === 'En Route'
                                ? 'bg-cyan-500/15 text-cyan-accent border-cyan-500/30'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            {mission.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-accent transition-colors">
                          {mission.name}
                        </h3>
                      </div>

                      <div className="text-right font-mono text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{mission.launchYear}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mission Summary */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {mission.summary}
                    </p>

                    {/* Highlight Pill */}
                    <div className="p-2.5 rounded-xl bg-space-950/60 border border-slate-800 text-xs font-mono text-slate-300">
                      <span className="text-cyan-accent font-bold">KEY HIGHLIGHT: </span>
                      {mission.highlight}
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-1 text-[11px] text-slate-400 font-mono">
                      {mission.keyAchievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Action: Focus Target Planet */}
                  {targetPlanet && (
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">
                        Target: <span className="text-white font-semibold">{targetPlanet.name}</span>
                      </span>
                      <button
                        onClick={() => {
                          audioSystem.playPlanetSelect();
                          onSelectPlanet(targetPlanet);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-accent border border-cyan-500/40 text-xs font-mono transition-all cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Lock Target in 3D</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

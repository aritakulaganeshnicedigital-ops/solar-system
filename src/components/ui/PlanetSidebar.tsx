import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { PLANETS_DATA, PlanetData } from '../../data/planetsData';
import { audioSystem } from '../../utils/audioSystem';

interface PlanetSidebarProps {
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const PlanetSidebar: React.FC<PlanetSidebarProps> = ({
  selectedPlanet,
  onSelectPlanet,
  isCollapsed,
  setIsCollapsed,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Terrestrial' | 'Gas Giant' | 'Ice Giant' | 'Moons' | 'Singularity'>('All');

  const filteredPlanets = useMemo(() => {
    return PLANETS_DATA.filter((planet) => {
      const matchesSearch =
        planet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        planet.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterType === 'All' ||
        (filterType === 'Singularity'
          ? planet.type === 'Black Hole'
          : filterType === 'Moons'
          ? planet.type === 'Moon'
          : planet.type === filterType);
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType]);

  const handleSelect = (planet: PlanetData) => {
    if (planet.id === 'black-hole') {
      audioSystem.playBlackHoleSelect();
    } else {
      audioSystem.playPlanetSelect();
    }
    onSelectPlanet(planet);
  };

  return (
    <aside
      className={`fixed top-20 left-4 bottom-24 z-30 transition-all duration-300 pointer-events-none flex items-stretch ${
        isCollapsed ? 'w-12' : 'w-72 sm:w-80'
      }`}
    >
      <div className="relative w-full h-full glass-panel rounded-2xl flex flex-col overflow-hidden pointer-events-auto border border-cyan-500/20 shadow-glass">
        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => {
            audioSystem.playUiClick();
            setIsCollapsed(!isCollapsed);
          }}
          title={isCollapsed ? 'Expand Fleet Radar' : 'Collapse Fleet Radar'}
          className="absolute -right-3 top-5 z-40 w-6 h-6 rounded-full bg-space-900 border border-cyan-500/40 text-cyan-accent flex items-center justify-center hover:bg-cyan-500/20 shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {!isCollapsed ? (
          <>
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-800/80 bg-space-950/40">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-accent animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                    Planetary Array
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-accent border border-cyan-500/20">
                  {filteredPlanets.length} BODIES
                </span>
              </div>

              {/* Search Field */}
              <div className="relative mb-2.5">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search celestial bodies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-space-900/90 border border-slate-700/60 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
                {(['All', 'Terrestrial', 'Gas Giant', 'Ice Giant', 'Moons', 'Singularity'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      audioSystem.playUiClick();
                      setFilterType(type);
                    }}
                    className={`text-[10px] font-mono px-2 py-1 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                      filterType === type
                        ? 'bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Planets Scrollable List */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
              {filteredPlanets.map((planet) => {
                const isActive = selectedPlanet?.id === planet.id;
                return (
                  <div
                    key={planet.id}
                    onClick={() => handleSelect(planet)}
                    onMouseEnter={() => audioSystem.playUiHover()}
                    className={`group relative p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? planet.id === 'black-hole'
                          ? 'bg-purple-950/40 border-purple-400 shadow-[0_0_18px_rgba(192,132,252,0.35)]'
                          : planet.id === 'moon'
                          ? 'bg-slate-100/15 border-slate-300 shadow-[0_0_15px_rgba(255,255,255,0.35)]'
                          : 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        : 'bg-space-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-space-850/60'
                    }`}
                  >
                    {/* Active Pulsing Indicator Line */}
                    {isActive && (
                      <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-r ${
                        planet.id === 'black-hole'
                          ? 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]'
                          : planet.id === 'moon'
                          ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                          : 'bg-cyan-accent shadow-cyan-glow'
                      }`} />
                    )}

                    <div className="flex items-center gap-3 pl-1">
                      {/* Stylized Planet/Black Hole/Moon Thumbnail Orb */}
                      {planet.id === 'black-hole' ? (
                        <div
                          className="relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110"
                          style={{
                            boxShadow: isActive ? '0 0 16px rgba(192, 132, 252, 0.8)' : '0 0 8px rgba(192, 132, 252, 0.3)',
                          }}
                        >
                          {/* Glowing Accretion Ring Halo */}
                          <div className="absolute inset-[-3px] rounded-full border border-amber-400/80 animate-spin opacity-90 shadow-[0_0_8px_rgba(245,158,11,0.6)]" style={{ animationDuration: '4s' }} />
                          <div className="absolute inset-[-1px] rounded-full border border-purple-400/70" />
                          {/* Black Hole Shadow */}
                          <div className="w-5 h-5 rounded-full bg-black relative z-10 ring-1 ring-amber-300" />
                          {/* Polar Jets */}
                          <div className="absolute -top-1 -bottom-1 w-[2px] bg-cyan-300 shadow-[0_0_4px_cyan] pointer-events-none" />
                        </div>
                      ) : planet.id === 'moon' ? (
                        <div
                          className="relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110 overflow-hidden"
                          style={{
                            boxShadow: isActive ? '0 0 14px rgba(226, 232, 240, 0.8)' : undefined,
                            background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #cbd5e1 50%, #475569 100%)',
                          }}
                        >
                          <div className="absolute inset-0 rounded-full border border-slate-400/50" />
                        </div>
                      ) : (
                        <div
                          className="relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.secondaryColor})`,
                            boxShadow: isActive ? `0 0 12px ${planet.color}` : undefined,
                          }}
                        >
                          {planet.hasRings && (
                            <div
                              className="absolute w-12 h-2 rounded-full border border-yellow-200/50 -rotate-12 pointer-events-none"
                              style={{ borderColor: planet.ringsConfig?.color || '#e5c899' }}
                            />
                          )}
                        </div>
                      )}

                      {/* Planet Names & Tagline */}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-semibold ${isActive ? 'text-cyan-accent' : 'text-slate-100 group-hover:text-white'}`}>
                            {planet.name}
                          </span>
                          {planet.id === 'earth' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Origin Planet" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                          {planet.tagline}
                        </div>
                      </div>
                    </div>

                    {/* Telemetry snippet: distance or type */}
                    <div className="text-right font-mono">
                      <div className="text-[10px] text-cyan-300/80">
                        {planet.distanceFromSunAU === 0 ? 'CENTRAL' : `${planet.distanceFromSunAU} AU`}
                      </div>
                      <div className="text-[9px] text-slate-500 uppercase">
                        {planet.type}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Mini Collapsed Bar */
          <div className="flex-1 py-4 flex flex-col items-center gap-3 overflow-y-auto no-scrollbar">
            <span className="w-2 h-2 rounded-full bg-cyan-accent animate-pulse" />
            {PLANETS_DATA.map((p) => {
              const isActive = selectedPlanet?.id === p.id;
              if (p.id === 'black-hole') {
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    title={p.name}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer relative ${
                      isActive ? 'ring-2 ring-purple-400 scale-110 shadow-[0_0_12px_rgba(192,132,252,0.8)]' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="absolute inset-0 rounded-full border border-amber-400/90 animate-spin" style={{ animationDuration: '3s' }} />
                    <div className="w-4 h-4 rounded-full bg-black ring-1 ring-purple-400" />
                  </button>
                );
              }
              if (p.id === 'moon') {
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    title={p.name}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer relative overflow-hidden ${
                      isActive ? 'ring-2 ring-slate-200 scale-110 shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #cbd5e1 50%, #475569 100%)',
                    }}
                  />
                );
              }
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  title={p.name}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isActive ? 'ring-2 ring-cyan-400 scale-110 shadow-cyan-glow' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${p.color}, ${p.secondaryColor})`,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};

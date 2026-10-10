import React from 'react';
import type { PlanetData } from '../../data/planetsData';
import { Plus, Minus } from 'lucide-react';
import { audioSystem } from '../../utils/audioSystem';

interface HUDOverlayProps {
  hoveredPlanet: PlanetData | null;
  selectedPlanet: PlanetData | null;
  cinemaMode: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({
  hoveredPlanet,
  selectedPlanet,
  cinemaMode,
  onZoomIn,
  onZoomOut,
}) => {
  if (cinemaMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center">
      {/* Subtle Center Navigation Reticle */}
      {!selectedPlanet && (
        <div className="relative opacity-25 hover:opacity-50 transition-opacity">
          <div className="w-12 h-12 border border-cyan-400/30 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
          </div>
          {/* Subtle crosshair ticks */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-400/30 -translate-x-1/2 scale-y-125" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyan-400/30 -translate-y-1/2 scale-x-125" />
        </div>
      )}

      {/* Floating On-Screen Zoom Controls (Great for touch/mobile devices) */}
      <div className="absolute right-4 bottom-24 hidden sm:flex flex-col gap-1.5 pointer-events-auto">
        <button
          onClick={() => {
            audioSystem.playUiClick();
            onZoomIn();
          }}
          title="Zoom In (+)"
          className="w-8 h-8 rounded-xl glass-panel border border-slate-800 text-slate-300 hover:text-cyan-accent hover:border-cyan-500/40 flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            audioSystem.playUiClick();
            onZoomOut();
          }}
          title="Zoom Out (-)"
          className="w-8 h-8 rounded-xl glass-panel border border-slate-800 text-slate-300 hover:text-cyan-accent hover:border-cyan-500/40 flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Hover Information Tooltip Card */}
      {hoveredPlanet && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 glass-panel-violet px-4 py-2.5 rounded-xl border border-violet-500/40 shadow-violet-glow flex items-center gap-3 animate-in fade-in zoom-in-95 duration-150">
          <div
            className="w-4 h-4 rounded-full shadow-sm shrink-0"
            style={{ backgroundColor: hoveredPlanet.color }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase font-mono">
                {hoveredPlanet.name}
              </span>
              <span className="text-[10px] text-violet-300 font-mono">
                {hoveredPlanet.distanceFromSunAU === 0 ? 'CENTRAL STAR' : `${hoveredPlanet.distanceFromSunAU} AU`}
              </span>
            </div>
            <div className="text-[10px] text-slate-300 italic">
              {hoveredPlanet.tagline}
            </div>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 border-l border-violet-500/30 pl-3">
            Click to Lock Target
          </span>
        </div>
      )}
    </div>
  );
};

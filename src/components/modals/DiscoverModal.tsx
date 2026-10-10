import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, Compass, BookOpen, Quote, ChevronRight } from 'lucide-react';
import { COSMIC_FACTS, CosmicFact } from '../../data/factsData';
import { PLANETS_DATA, PlanetData } from '../../data/planetsData';
import { audioSystem } from '../../utils/audioSystem';

interface DiscoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlanet: (planet: PlanetData) => void;
}

export const DiscoverModal: React.FC<DiscoverModalProps> = ({
  isOpen,
  onClose,
  onSelectPlanet,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentFact = COSMIC_FACTS[currentIndex];
  const relatedPlanet = currentFact.relatedPlanetId
    ? PLANETS_DATA.find((p) => p.id === currentFact.relatedPlanetId)
    : null;

  const handleNextFact = () => {
    audioSystem.playWarp();
    setCurrentIndex((prev) => (prev + 1) % COSMIC_FACTS.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] glass-panel-violet rounded-3xl flex flex-col overflow-hidden border border-violet-500/40 shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-space-950/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans">
                Cosmic Discoveries & Wonders
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Astronomical curiosities from the outer realms
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

        {/* Highlighted Discovery Card */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-space-900/90 via-space-950/90 to-violet-950/30 border border-violet-500/30 shadow-violet-glow relative space-y-4">
            <Quote className="w-10 h-10 text-violet-500/20 absolute right-6 top-6 pointer-events-none" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold uppercase">
                {currentFact.category}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Fact {currentIndex + 1} of {COSMIC_FACTS.length}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {currentFact.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              "{currentFact.fact}"
            </p>

            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div>
                <span className="text-slate-500">Citation: </span>
                <span className="text-slate-300">{currentFact.source}</span>
              </div>

              {relatedPlanet && (
                <button
                  onClick={() => {
                    audioSystem.playPlanetSelect();
                    onSelectPlanet(relatedPlanet);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-accent border border-cyan-500/40 font-mono transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Fly to {relatedPlanet.name} in 3D</span>
                </button>
              )}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleNextFact}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-space-950 bg-gradient-to-r from-violet-400 via-cyan-300 to-cyan-400 hover:brightness-110 shadow-violet-glow transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>GENERATE NEXT DISCOVERY</span>
            </button>

            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Curated by International Astrophysical Archives
            </span>
          </div>

          {/* Quick Browse List of All Facts */}
          <div className="space-y-2 pt-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              All Cosmic Facts in Archive
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COSMIC_FACTS.map((fact, idx) => (
                <div
                  key={fact.id}
                  onClick={() => {
                    audioSystem.playUiClick();
                    setCurrentIndex(idx);
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    idx === currentIndex
                      ? 'bg-violet-500/15 border-violet-400 text-white shadow-[0_0_10px_rgba(139,92,246,0.25)]'
                      : 'bg-space-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold mb-0.5 truncate">{fact.title}</div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase">{fact.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

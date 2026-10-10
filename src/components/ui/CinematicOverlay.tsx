import React from 'react';
import { FastForward, Sparkles } from 'lucide-react';
import { audioSystem } from '../../utils/audioSystem';

interface CinematicOverlayProps {
  isActive: boolean;
  narrativeText: string;
  onSkip: () => void;
}

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
  isActive,
  narrativeText,
  onSkip,
}) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between overflow-hidden animate-in fade-in duration-500">
      {/* Top Letterbox Bar */}
      <div className="w-full h-12 sm:h-16 bg-black/90 border-b border-cyan-500/10 flex items-center justify-between px-6 pointer-events-auto">
        <div className="flex items-center gap-2 text-cyan-accent text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>COSMOS 3D — CINEMATIC PROLOGUE</span>
        </div>

        <button
          onClick={() => {
            audioSystem.playUiClick();
            onSkip();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-mono transition-all cursor-pointer border border-white/10"
        >
          <span>Skip Prologue</span>
          <FastForward className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      {/* Center Narrative Subtitle */}
      <div className="self-center mb-8 px-6 py-3 rounded-2xl glass-panel border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.2)] max-w-xl text-center animate-in fade-in zoom-in-95 duration-300">
        <p className="text-sm sm:text-base font-sans font-medium text-slate-100 tracking-wide drop-shadow-md">
          {narrativeText}
        </p>
      </div>

      {/* Bottom Letterbox Bar */}
      <div className="w-full h-12 sm:h-16 bg-black/90 border-t border-cyan-500/10 flex items-center justify-center px-6">
        <div className="text-[11px] font-mono text-slate-400 tracking-widest uppercase">
          Beyond Our Solar System • Realtime Photometric Engine
        </div>
      </div>
    </div>
  );
};

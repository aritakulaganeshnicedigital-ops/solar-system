import React from 'react';
import { X, HelpCircle, MousePointer, Keyboard, Eye, Orbit } from 'lucide-react';
import { audioSystem } from '../../utils/audioSystem';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] glass-panel rounded-3xl flex flex-col overflow-hidden border border-cyan-500/30 shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-space-950/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-accent">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans">
                Mission Commander Guide
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Interaction controls and keyboard commands
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Mouse & Touch Controls */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-accent uppercase tracking-wider mb-3">
              <MousePointer className="w-4 h-4" />
              <span>3D Navigation & View Controls</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Left Click + Drag</span>
                <span className="text-cyan-accent">Rotate Camera Angle</span>
              </div>
              <div className="p-3 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Right Click + Drag</span>
                <span className="text-cyan-accent">Pan View</span>
              </div>
              <div className="p-3 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Scroll Wheel / Pinch</span>
                <span className="text-cyan-accent">Zoom In / Out</span>
              </div>
              <div className="p-3 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Click Any Planet / Label</span>
                <span className="text-cyan-accent">Focus & Lock Target</span>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-violet-400 uppercase tracking-wider mb-3">
              <Keyboard className="w-4 h-4" />
              <span>Keyboard Command Matrix</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Spacebar</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Play / Pause</span>
              </div>
              <div className="p-2.5 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Escape (Esc)</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Reset View</span>
              </div>
              <div className="p-2.5 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Number Keys (1 - 9)</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Select Planets</span>
              </div>
              <div className="p-2.5 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Number 0</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Focus The Sun</span>
              </div>
              <div className="p-2.5 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Key M</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Toggle Sound</span>
              </div>
              <div className="p-2.5 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Key F</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Fullscreen</span>
              </div>
              <div className="p-2.5 rounded-xl bg-space-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Key H</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Cinema HUD</span>
              </div>
            </div>
          </div>

          {/* Educational Highlights */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
            <div className="font-bold text-cyan-accent font-mono uppercase">
              Educational Mode Tip:
            </div>
            <p>
              Toggle Educational Mode in the bottom controls tray to visualize the circumstellar Habitable "Goldilocks" Zone (where liquid water can exist) and view celestial boundary distances!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

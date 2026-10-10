import React from 'react';
import {
  Compass,
  Globe2,
  Rocket,
  Scale,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  HelpCircle
} from 'lucide-react';
import { audioSystem } from '../../utils/audioSystem';

interface TopNavProps {
  activeTab: 'explore' | 'planets' | 'missions' | 'comparison' | 'discover';
  setActiveTab: (tab: 'explore' | 'planets' | 'missions' | 'comparison' | 'discover') => void;
  cinemaMode: boolean;
  setCinemaMode: (cinema: boolean) => void;
  onOpenHelp: () => void;
  onOpenMissions: () => void;
  onOpenComparison: () => void;
  onOpenDiscover: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  cinemaMode,
  setCinemaMode,
  onOpenHelp,
  onOpenMissions,
  onOpenComparison,
  onOpenDiscover,
}) => {
  const [isMuted, setIsMuted] = React.useState(audioSystem.getMuted());
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Monitor fullscreen change events
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleSound = () => {
    const muted = audioSystem.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      audioSystem.playUiClick();
    }
  };

  const handleToggleFullscreen = () => {
    audioSystem.playUiClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="pointer-events-auto flex items-center gap-3 glass-panel px-4 py-2.5 rounded-xl border border-cyan-500/20 shadow-cyan-subtle">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 shadow-cyan-glow">
            <Compass className="w-5 h-5 text-space-950 animate-spin-very-slow" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-accent animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wider bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                COSMOS 3D
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-accent border border-cyan-500/30">
                v2.4
              </span>
            </div>
            <div className="text-[10px] text-slate-400 tracking-widest font-mono uppercase -mt-0.5">
              Beyond Our Solar System
            </div>
          </div>
        </div>

        {/* Central View Navigation Mode Buttons */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1.5 glass-panel px-2 py-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              audioSystem.playUiClick();
              setActiveTab('explore');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'explore'
                ? 'bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => {
              audioSystem.playUiClick();
              setActiveTab('planets');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'planets'
                ? 'bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Planets</span>
          </button>

          <button
            onClick={() => {
              audioSystem.playUiClick();
              onOpenMissions();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-accent hover:bg-white/5 border border-transparent transition-all"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Missions</span>
          </button>

          <button
            onClick={() => {
              audioSystem.playUiClick();
              onOpenComparison();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-accent hover:bg-white/5 border border-transparent transition-all"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>

          <button
            onClick={() => {
              audioSystem.playUiClick();
              onOpenDiscover();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-violet-400 hover:bg-white/5 border border-transparent transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Discover</span>
          </button>
        </nav>

        {/* Right utility buttons: Sound, Cinema, Fullscreen, Help */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Cinema Mode Toggle */}
          <button
            onClick={() => {
              audioSystem.playUiClick();
              setCinemaMode(!cinemaMode);
            }}
            title={cinemaMode ? 'Show Interface (H)' : 'Distraction-Free Cinema Mode (H)'}
            className={`p-2.5 rounded-xl border transition-all ${
              cinemaMode
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-accent shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'glass-panel border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {cinemaMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Turn Sound On (M)' : 'Mute Sound (M)'}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
              !isMuted
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-accent shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'glass-panel border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-accent" />
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-cyan-accent animate-pulse" />
                  <span className="w-0.5 h-3 bg-cyan-accent animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-cyan-accent animate-pulse delay-150" />
                </div>
              </>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={handleToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen View (F)'}
            className="p-2.5 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Help & Shortcuts Guide */}
          <button
            onClick={() => {
              audioSystem.playUiClick();
              onOpenHelp();
            }}
            title="Mission Controls & Guide (?)"
            className="p-2.5 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-cyan-accent hover:border-cyan-500/40 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

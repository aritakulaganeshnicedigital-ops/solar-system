import React, { useState, useEffect, useCallback } from 'react';
import { PLANETS_DATA, PlanetData } from './data/planetsData';
import { SolarSystemCanvas } from './components/3d/SolarSystemCanvas';
import { TopNav } from './components/ui/TopNav';
import { PlanetSidebar } from './components/ui/PlanetSidebar';
import { PlanetInfoPanel } from './components/ui/PlanetInfoPanel';
import { BottomControls } from './components/ui/BottomControls';
import { HUDOverlay } from './components/ui/HUDOverlay';
import { PlanetExplorerModal } from './components/modals/PlanetExplorerModal';
import { MissionsTimelineModal } from './components/modals/MissionsTimelineModal';
import { ComparisonModal } from './components/modals/ComparisonModal';
import { DiscoverModal } from './components/modals/DiscoverModal';
import { HelpModal } from './components/modals/HelpModal';
import { audioSystem } from './utils/audioSystem';

export const App: React.FC = () => {
  // Main Selection & Hover States
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetData | null>(null);
  const [activeNavTab, setActiveNavTab] = useState<'explore' | 'planets' | 'missions' | 'comparison' | 'discover'>('explore');

  // Simulation Controls
  const [isPaused, setIsPaused] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1.0);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showAsteroids, setShowAsteroids] = useState(true);
  const [educationalMode, setEducationalMode] = useState(false);
  const [scaleMode, setScaleMode] = useState<'artistic' | 'real'>('artistic');
  const [resetSignal, setResetSignal] = useState(0);
  const [zoomSignal, setZoomSignal] = useState(0);

  // UI Visibility States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);

  // Modals
  const [explorerPlanet, setExplorerPlanet] = useState<PlanetData | null>(null);
  const [isMissionsOpen, setIsMissionsOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Reset Camera action
  const handleResetCamera = useCallback(() => {
    setSelectedPlanet(null);
    setResetSignal((prev) => prev + 1);
  }, []);

  // Zoom In & Out actions
  const handleZoomIn = useCallback(() => {
    setZoomSignal((prev) => (prev > 0 ? prev + 1 : 1));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomSignal((prev) => (prev < 0 ? prev - 1 : -1));
  }, []);

  // Keyboard navigation & Shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'SELECT') {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        audioSystem.playUiClick();
        setIsPaused((prev) => !prev);
      } else if (e.key === 'Escape') {
        // Close modals if open, or reset camera
        if (explorerPlanet) setExplorerPlanet(null);
        else if (isMissionsOpen) setIsMissionsOpen(false);
        else if (isComparisonOpen) setIsComparisonOpen(false);
        else if (isDiscoverOpen) setIsDiscoverOpen(false);
        else if (isHelpOpen) setIsHelpOpen(false);
        else handleResetCamera();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key.toLowerCase() === 'm') {
        audioSystem.toggleMute();
      } else if (e.key.toLowerCase() === 'h') {
        setCinemaMode((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      } else if (e.key === '0') {
        const sun = PLANETS_DATA.find((p) => p.id === 'sun');
        if (sun) {
          audioSystem.playPlanetSelect();
          setSelectedPlanet(sun);
        }
      } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
        const planetList = PLANETS_DATA.filter((p) => p.id !== 'sun');
        const index = parseInt(e.key, 10) - 1;
        if (planetList[index]) {
          audioSystem.playPlanetSelect();
          setSelectedPlanet(planetList[index]);
        }
      } else if (e.key === '?') {
        setIsHelpOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [explorerPlanet, isMissionsOpen, isComparisonOpen, isDiscoverOpen, isHelpOpen, handleResetCamera, handleZoomIn, handleZoomOut]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-space-950 font-sans select-none">
      {/* 3D Solar System Canvas */}
      <SolarSystemCanvas
        selectedPlanet={selectedPlanet}
        onSelectPlanet={(planet) => {
          if (planet) audioSystem.playPlanetSelect();
          setSelectedPlanet(planet);
        }}
        onHoverPlanet={setHoveredPlanet}
        showOrbits={showOrbits}
        showLabels={showLabels}
        showAsteroids={showAsteroids}
        educationalMode={educationalMode}
        scaleMode={scaleMode}
        simulationSpeed={simulationSpeed}
        isPaused={isPaused}
        resetSignal={resetSignal}
        zoomSignal={zoomSignal}
        cinemaMode={cinemaMode}
      />

      {/* Sci-Fi HUD Crosshair & Hover Tooltip */}
      <HUDOverlay
        hoveredPlanet={hoveredPlanet}
        selectedPlanet={selectedPlanet}
        cinemaMode={cinemaMode}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />

      {/* User Interface Overlays (hidden in cinema mode) */}
      {!cinemaMode && (
        <>
          {/* Top Navigation */}
          <TopNav
            activeTab={activeNavTab}
            setActiveTab={(tab) => {
              setActiveNavTab(tab);
              if (tab === 'planets') {
                setIsSidebarCollapsed(false);
              }
            }}
            cinemaMode={cinemaMode}
            setCinemaMode={setCinemaMode}
            onOpenHelp={() => setIsHelpOpen(true)}
            onOpenMissions={() => setIsMissionsOpen(true)}
            onOpenComparison={() => setIsComparisonOpen(true)}
            onOpenDiscover={() => setIsDiscoverOpen(true)}
          />

          {/* Left Planet Radar Sidebar */}
          <PlanetSidebar
            selectedPlanet={selectedPlanet}
            onSelectPlanet={(planet) => {
              setSelectedPlanet(planet);
            }}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />

          {/* Right Floating Planet Telemetry Panel */}
          <PlanetInfoPanel
            planet={selectedPlanet}
            onClose={() => setSelectedPlanet(null)}
            onOpenExplorer={(planet) => {
              setExplorerPlanet(planet);
            }}
          />

          {/* Bottom Simulation Control Bar */}
          <BottomControls
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            simulationSpeed={simulationSpeed}
            setSimulationSpeed={setSimulationSpeed}
            showOrbits={showOrbits}
            setShowOrbits={setShowOrbits}
            showLabels={showLabels}
            setShowLabels={setShowLabels}
            showAsteroids={showAsteroids}
            setShowAsteroids={setShowAsteroids}
            educationalMode={educationalMode}
            setEducationalMode={setEducationalMode}
            scaleMode={scaleMode}
            setScaleMode={setScaleMode}
            onResetCamera={handleResetCamera}
            selectedPlanet={selectedPlanet}
          />
        </>
      )}

      {/* Floating Cinema Exit Button when Cinema Mode is active */}
      {cinemaMode && (
        <button
          onClick={() => {
            audioSystem.playUiClick();
            setCinemaMode(false);
          }}
          className="fixed top-5 right-5 z-50 glass-panel px-4 py-2 rounded-xl text-xs font-mono text-cyan-accent border border-cyan-400/40 hover:bg-cyan-500/20 shadow-cyan-glow transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Exit Cinema Mode (H)</span>
        </button>
      )}

      {/* Modals */}
      {/* 1. Deep Planet Explorer Modal */}
      <PlanetExplorerModal
        planet={explorerPlanet}
        onClose={() => setExplorerPlanet(null)}
        onSelectPlanet={(planet) => {
          setSelectedPlanet(planet);
        }}
      />

      {/* 2. Space Missions Timeline Modal */}
      <MissionsTimelineModal
        isOpen={isMissionsOpen}
        onClose={() => setIsMissionsOpen(false)}
        onSelectPlanet={(planet) => {
          setSelectedPlanet(planet);
        }}
      />

      {/* 3. Planet Comparison Modal */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        defaultPlanetA={selectedPlanet}
      />

      {/* 4. Cosmic Discoveries Modal */}
      <DiscoverModal
        isOpen={isDiscoverOpen}
        onClose={() => setIsDiscoverOpen(false)}
        onSelectPlanet={(planet) => {
          setSelectedPlanet(planet);
        }}
      />

      {/* 5. Help & Keyboard Controls Guide Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
};

export default App;

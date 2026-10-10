# COSMOS 3D — Beyond Our Solar System

An immersive, cinematic, interactive 3D Solar System exploration platform built with React, TypeScript, Three.js, React Three Fiber, Drei, and Tailwind CSS.

---

## 🌟 Core Features

### 1. Interactive 3D Solar System Engine
- **The Sun**: Dynamic procedural solar surface with active granules, sunspots, and animated coronal flare atmospheric glow with realistic point lighting.
- **Eight Major Planets + Pluto**:
  - **Mercury**: Cratered terrestrial surface, iron-rich mantle.
  - **Venus**: Dense sulfuric cloud streaks and thick greenhouse atmosphere.
  - **Earth**: Photorealistic continental landmasses, liquid water oceans, rotating atmospheric clouds, and the orbiting Moon (Luna).
  - **Mars**: Rusty iron-oxide surface, dark volcanic basalt plains, and polar ice caps.
  - **Jupiter**: High-resolution atmospheric bands with turbulent wind shearing and the Great Red Spot anticyclone.
  - **Saturn**: Golden gaseous body with a majestic dual-ring system featuring the Cassini Division and realistic opacity.
  - **Uranus**: Aquamarine ice giant revolving at a 97.8° axial tilt with vertical rings.
  - **Neptune**: Azure ice giant with high-altitude cirrus streaks and the Great Dark Spot.
  - **Pluto**: Dwarf planet with the Tombaugh Regio (Sputnik Planitia) nitrogen-ice heart.
- **Asteroid Belts**:
  - **Main Asteroid Belt**: Over 1,200 instanced tumbling asteroids orbiting between Mars and Jupiter.
  - **Kuiper Belt**: Over 800 icy bodies orbiting beyond Neptune and Pluto.
- **Circumstellar Habitable Zone**: Visualizer showing the Goldilocks zone (0.95 AU to 1.37 AU) where liquid water can exist.

### 2. Space Mission Control Interface
- **Top Navigation**:
  - Mission branding with pulsing pulsar badge.
  - Mode switches: **Explore**, **Planets**, **Missions**, **Compare**, **Discover**.
  - **Cosmic Soundscape Synthesizer**: Built with Web Audio API (ambient drone + sci-fi UI chimes, muted by default).
  - **Cinema Mode (H)**: Hides all UI panels for a distraction-free, slowly orbiting wallpaper experience.
  - **Fullscreen (F)**: Native HTML5 Fullscreen API toggle.
  - **Mission Commander Guide (?)**: Full keyboard and mouse shortcuts cheat sheet.
- **Left Planetary Radar Sidebar**:
  - Live filtering by search query and category (Terrestrial, Gas Giant, Ice Giant).
  - Stylized color orbs, orbital distances, and active pulsing indicator.
  - Collapsible toggle to expand or minimize the panel.
- **Right Scientific Telemetry Panel**:
  - Real-time planetary statistics: Mean Radius, Distance from Sun, Orbital Period, Day Length, Surface Temperature range, Surface Gravity, and Confirmed Moons (NASA/JPL Solar System Dynamics).
  - Atmospheric composition gauges.
  - One-click trigger to enter the **Deep Planet Explorer**.
- **Bottom Simulation Control Console**:
  - Play / Pause (Spacebar).
  - Simulation speed presets: `0.1x` (Slow-mo), `1x` (Realtime), `5x` (High speed), `20x` (Warp speed).
  - Reset Camera view (Escape key).
  - Layer toggles: Orbits, Labels, Asteroids, Scale Mode (Cinematic vs. Realistic Logarithmic), Educational Mode.
  - Live status telemetry bar.

### 3. Deep Laboratory Modals
- **Deep Planet Explorer**: Fullscreen modal for each celestial body with an interactive 3D rotator, internal structure cutaway stratigraphy, atmospheric chemistry, moon breakdown, and robotic exploration history.
- **Interplanetary Missions Timeline**: Interactive chronicle of humanity's greatest missions (Apollo 11, Voyager 1 & 2, Cassini-Huygens, Curiosity, Perseverance, New Horizons, Parker Solar Probe, Europa Clipper, etc.) with agency filters and direct "Lock Target in 3D" button.
- **Comparative Planetary Laboratory**: Side-by-side comparison of any two planets with relative size scaling, gravitational difference calculations, temperature comparisons, and automated astrodynamic insights.
- **Cosmic Discoveries & Wonders**: Astronomical curiosity generator featuring peer-reviewed astrophysics facts with citations and direct 3D fly-to links.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / Pause Orbital Simulation |
| `Esc` | Reset Camera to Solar System Overview / Close Modals |
| `0` | Focus Camera on The Sun |
| `1` – `9` | Focus Camera on Mercury through Pluto |
| `M` | Toggle Ambient Cosmic Soundscape |
| `H` | Toggle Distraction-Free Cinema Mode |
| `F` | Toggle Fullscreen |
| `?` | Open Mission Commander Help Guide |

---

## 🛠️ Technology Stack

- **React 19 & TypeScript**: Modern component architecture and strict type safety.
- **Vite**: Ultra-fast build tool and development server.
- **Three.js**: WebGL 3D rendering pipeline.
- **@react-three/fiber & @react-three/drei**: Declarative 3D scene graph, stars, fat lines, and camera controls.
- **Tailwind CSS**: Custom futuristic glassmorphism styles and HUD components.
- **Web Audio API**: Pure client-side procedural soundscape synthesizer.
- **Lucide React**: Clean, modern iconography.

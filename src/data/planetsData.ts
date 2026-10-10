export interface MoonData {
  name: string;
  diameterKm: number;
  orbitRadiusKm: number;
  discoveryYear: number;
  discoveredBy: string;
  description: string;
}

export interface InternalLayer {
  name: string;
  thickness: string;
  composition: string;
  color: string;
  description: string;
}

export interface PlanetData {
  id: string;
  name: string;
  tagline: string;
  type: 'Star' | 'Terrestrial' | 'Gas Giant' | 'Ice Giant' | 'Dwarf Planet' | 'Black Hole';
  color: string; // Accent color hex
  secondaryColor: string;
  radius: number; // Artistic scale radius
  realRadiusKm: number; // Real physical radius
  distanceFromSunAU: number; // AU
  distanceFromSunKm: number; // Million km
  artisticDistance: number; // Visual 3D scene distance
  orbitalPeriodDays: number; // Earth days for one orbit
  rotationPeriodHours: number; // Hours for one rotation
  axialTiltDeg: number; // Tilt in degrees
  orbitSpeed: number; // Visual speed coefficient
  massKg: string;
  gravityMps2: number; // m/s^2
  surfaceTempC: {
    min: number;
    avg: number;
    max: number;
  };
  moonsCount: number;
  notableMoons: MoonData[];
  hasRings: boolean;
  ringsConfig?: {
    innerRadius: number;
    outerRadius: number;
    color: string;
    opacity: number;
  };
  hasClouds?: boolean;
  cloudSpeed?: number;
  atmosphereComposition: { gas: string; percentage: number }[];
  internalStructure: InternalLayer[];
  quickFacts: string[];
  explorationMissions: string[];
  description: string;
  detailedDescription: string;
}

export const PLANETS_DATA: PlanetData[] = [
  {
    id: 'sun',
    name: 'The Sun',
    tagline: 'Heart of the Solar System',
    type: 'Star',
    color: '#ffaa00',
    secondaryColor: '#ff4400',
    radius: 7.5,
    realRadiusKm: 696340,
    distanceFromSunAU: 0,
    distanceFromSunKm: 0,
    artisticDistance: 0,
    orbitalPeriodDays: 0,
    rotationPeriodHours: 609.12, // ~25.4 Earth days at equator
    axialTiltDeg: 7.25,
    orbitSpeed: 0,
    massKg: '1.989 × 10³⁰ kg (333,000 Earths)',
    gravityMps2: 274.0,
    surfaceTempC: { min: 5500, avg: 5505, max: 15000000 },
    moonsCount: 0,
    notableMoons: [],
    hasRings: false,
    atmosphereComposition: [
      { gas: 'Hydrogen (H₂)', percentage: 73.46 },
      { gas: 'Helium (He)', percentage: 24.85 },
      { gas: 'Oxygen (O)', percentage: 0.77 },
      { gas: 'Carbon (C)', percentage: 0.29 },
      { gas: 'Iron (Fe)', percentage: 0.16 },
      { gas: 'Other elements', percentage: 0.47 },
    ],
    internalStructure: [
      { name: 'Core', thickness: '175,000 km', composition: 'Dense plasma fusion furnace (15,000,000 °C)', color: '#ffffff', description: 'Hydrogen atoms fuse into helium, producing all the Sun’s radiant energy.' },
      { name: 'Radiative Zone', thickness: '350,000 km', composition: 'Photon diffusion zone', color: '#ffdd44', description: 'Energy slowly travels outward via photon radiation over 100,000+ years.' },
      { name: 'Convection Zone', thickness: '200,000 km', composition: 'Boiling plasma currents', color: '#ff8800', description: 'Huge thermal boiling currents carry heat to the surface photosphere.' },
      { name: 'Photosphere', thickness: '500 km', composition: 'Visible luminous surface', color: '#ff4400', description: 'The glowing visible surface featuring sunspots and solar granules.' },
    ],
    quickFacts: [
      'Contains 99.86% of all mass in the Solar System.',
      'Fuses 600 million tons of hydrogen into helium every second.',
      'Light from the Sun takes roughly 8 minutes and 20 seconds to reach Earth.',
      'Expected to shine steadily for another 5 billion years before expanding into a Red Giant.'
    ],
    explorationMissions: ['SOHO', 'Parker Solar Probe', 'Solar Orbiter', 'STEREO', 'TRACE'],
    description: 'The yellow dwarf star at the gravitational center of our solar system, providing the light and energy that sustains life on Earth.',
    detailedDescription: 'The Sun is a G-type main-sequence star (G2V) comprising 99.86% of the solar system’s total mass. Its internal nuclear fusion furnace generates staggering electromagnetic radiation across the entire spectrum. Solar winds emitted from its corona sculpt the heliosphere, shielding the planets from interstellar cosmic radiation.'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    tagline: 'The Scorched Messenger',
    type: 'Terrestrial',
    color: '#a3a3a3',
    secondaryColor: '#737373',
    radius: 1.1,
    realRadiusKm: 2439.7,
    distanceFromSunAU: 0.387,
    distanceFromSunKm: 57.9,
    artisticDistance: 16,
    orbitalPeriodDays: 87.97,
    rotationPeriodHours: 1407.6, // 58.6 Earth days
    axialTiltDeg: 0.034,
    orbitSpeed: 4.15,
    massKg: '3.3011 × 10²³ kg (0.055 Earths)',
    gravityMps2: 3.7,
    surfaceTempC: { min: -180, avg: 167, max: 430 },
    moonsCount: 0,
    notableMoons: [],
    hasRings: false,
    atmosphereComposition: [
      { gas: 'Oxygen (O₂)', percentage: 42.0 },
      { gas: 'Sodium (Na)', percentage: 29.0 },
      { gas: 'Hydrogen (H₂)', percentage: 22.0 },
      { gas: 'Helium (He)', percentage: 6.0 },
      { gas: 'Potassium & trace', percentage: 1.0 },
    ],
    internalStructure: [
      { name: 'Metallic Core', thickness: '2,074 km radius', composition: 'Molten & solid iron-nickel', color: '#e5e7eb', description: 'Enormous metallic core occupying roughly 85% of Mercury’s radius.' },
      { name: 'Silicate Mantle', thickness: '400 km', composition: 'Dense silicate rock', color: '#9ca3af', description: 'Thin rocky silicate layer compressed beneath tectonic scarps.' },
      { name: 'Crust', thickness: '35 km', composition: 'Silicates and graphite', color: '#4b5563', description: 'Heavily cratered surface darkened by native carbon and impact debris.' },
    ],
    quickFacts: [
      'Smallest planet in the solar system, only slightly larger than Earth’s Moon.',
      'Experiences the most extreme temperature swings in the solar system (600°C variation).',
      'Orbits the Sun faster than any other planet, traveling at 47 km per second.',
      'Has water ice trapped inside permanently shadowed polar craters.'
    ],
    explorationMissions: ['Mariner 10 (1974)', 'MESSENGER (2011)', 'BepiColombo (2025)'],
    description: 'A heavily cratered terrestrial world with a massive iron core, orbiting closest to the Sun with drastic day-and-night temperature swings.',
    detailedDescription: 'Mercury is the closest planet to the Sun and the smallest in the Solar System. Without a substantial atmosphere to retain warmth, its sunlit side scorches at 430°C while its midnight hemisphere drops to -180°C. MESSENGER observations revealed a weak global magnetic field and high abundances of volatile sulfur and potassium.'
  },
  {
    id: 'venus',
    name: 'Venus',
    tagline: 'The Veiled Inferno',
    type: 'Terrestrial',
    color: '#eab308',
    secondaryColor: '#ca8a04',
    radius: 1.8,
    realRadiusKm: 6051.8,
    distanceFromSunAU: 0.723,
    distanceFromSunKm: 108.2,
    artisticDistance: 24,
    orbitalPeriodDays: 224.7,
    rotationPeriodHours: -5832.5, // 243 days retrograde
    axialTiltDeg: 177.3,
    orbitSpeed: 1.62,
    massKg: '4.8675 × 10²⁴ kg (0.815 Earths)',
    gravityMps2: 8.87,
    surfaceTempC: { min: 438, avg: 464, max: 482 },
    moonsCount: 0,
    notableMoons: [],
    hasRings: false,
    hasClouds: true,
    cloudSpeed: 1.8,
    atmosphereComposition: [
      { gas: 'Carbon Dioxide (CO₂)', percentage: 96.5 },
      { gas: 'Nitrogen (N₂)', percentage: 3.5 },
      { gas: 'Sulfur Dioxide (SO₂)', percentage: 0.015 },
      { gas: 'Water Vapor (H₂O)', percentage: 0.002 },
      { gas: 'Argon & trace', percentage: 0.001 },
    ],
    internalStructure: [
      { name: 'Metallic Core', thickness: '3,000 km radius', composition: 'Iron-nickel alloy', color: '#d1d5db', description: 'Likely partially molten iron-nickel core without active dynamo generation.' },
      { name: 'Rocky Mantle', thickness: '3,000 km', composition: 'Silicate rocks and peridotite', color: '#d97706', description: 'Viscous convective mantle fueling thousands of ancient shield volcanoes.' },
      { name: 'Crust', thickness: '20-50 km', composition: 'Basaltic lava flows', color: '#78350f', description: 'Smooth volcanic plains scarred by huge continent-like highland plateaus.' },
    ],
    quickFacts: [
      'Hottest planet in the Solar System due to a runaway greenhouse effect.',
      'Surface atmospheric pressure is 92 times greater than Earth’s (like 900m underwater).',
      'Rotates backwards (retrograde) compared to most planets; Sun rises in the west.',
      'A single Venusian day (243 Earth days) is longer than its entire year (225 Earth days).'
    ],
    explorationMissions: ['Venera series (USSR)', 'Magellan (NASA)', 'Venus Express (ESA)', 'Akatsuki (JAXA)', 'DAVINCI / VERITAS (Upcoming)'],
    description: 'Often called Earth’s twin in size, Venus is an inhospitable greenhouse world swaddled in dense sulfuric acid clouds.',
    detailedDescription: 'Venus possesses a crushing carbon dioxide atmosphere and a runaway greenhouse effect that makes its surface even hotter than Mercury. The Soviet Venera landers survived only tens of minutes on its scorched volcanic basalt terrain. Radar mapping by NASA’s Magellan probe revealed dramatic fracture belts, impact craters, and vast lava plains.'
  },
  {
    id: 'earth',
    name: 'Earth',
    tagline: 'The Pale Blue Sanctuary',
    type: 'Terrestrial',
    color: '#0ea5e9',
    secondaryColor: '#10b981',
    radius: 2.0,
    realRadiusKm: 6371.0,
    distanceFromSunAU: 1.0,
    distanceFromSunKm: 149.6,
    artisticDistance: 34,
    orbitalPeriodDays: 365.25,
    rotationPeriodHours: 23.93,
    axialTiltDeg: 23.44,
    orbitSpeed: 1.0,
    massKg: '5.972 × 10²⁴ kg (1.00 Earth)',
    gravityMps2: 9.807,
    surfaceTempC: { min: -89.2, avg: 15, max: 56.7 },
    moonsCount: 1,
    notableMoons: [
      {
        name: 'The Moon (Luna)',
        diameterKm: 3474.8,
        orbitRadiusKm: 384400,
        discoveryYear: -2000,
        discoveredBy: 'Known since antiquity',
        description: 'Fifth largest moon in the Solar System, responsible for Earth’s ocean tides and stabilizing axial tilt.'
      }
    ],
    hasRings: false,
    hasClouds: true,
    cloudSpeed: 1.2,
    atmosphereComposition: [
      { gas: 'Nitrogen (N₂)', percentage: 78.08 },
      { gas: 'Oxygen (O₂)', percentage: 20.95 },
      { gas: 'Argon (Ar)', percentage: 0.93 },
      { gas: 'Carbon Dioxide (CO₂)', percentage: 0.04 },
      { gas: 'Water vapor & trace', percentage: 0.01 },
    ],
    internalStructure: [
      { name: 'Inner Core', thickness: '1,220 km radius', composition: 'Solid crystalline iron-nickel (5,400 °C)', color: '#fef08a', description: 'Under immense pressure, iron atoms crystallize into a solid sphere hotter than the surface of the Sun.' },
      { name: 'Outer Core', thickness: '2,200 km', composition: 'Liquid churning iron & nickel', color: '#f97316', description: 'Convecting conductive fluid generates Earth’s protective geomagnetic dynamo.' },
      { name: 'Mantle', thickness: '2,900 km', composition: 'Semi-solid silicate peridotite', color: '#ea580c', description: 'Convecting rock drives plate tectonics, mountain building, and volcanic activity.' },
      { name: 'Crust', thickness: '5-70 km', composition: 'Oceanic basalt & continental granite', color: '#0284c7', description: 'Dynamic brittle outer crust hosting liquid water oceans and all known biological life.' },
    ],
    quickFacts: [
      'The only known astronomical object in the universe confirmed to harbor life.',
      'Surface is roughly 71% liquid water oceans, earning it the title "The Blue Marble".',
      'Powerful magnetosphere shields surface organisms from lethal solar and cosmic rays.',
      'Axial tilt of 23.44° creates the four seasons essential to diverse planetary ecosystems.'
    ],
    explorationMissions: ['Apollo 8 & 11', 'ISS (International Space Station)', 'Terra & Aqua', 'Landsat', 'Sentinel'],
    description: 'The cradle of known life, Earth is a dynamic ocean world with an oxygen-rich atmosphere, protective magnetic field, and active geology.',
    detailedDescription: 'Formed 4.54 billion years ago, Earth sits comfortably within the Sun’s habitable zone. Liquid water covers over 70% of its surface, regulated by an active hydrological cycle and carbon-silicate tectonic cycle. Its active magnetic field deflects the solar wind, shielding the atmosphere from depletion and safeguarding life.'
  },
  {
    id: 'mars',
    name: 'Mars',
    tagline: 'The Rust Planet',
    type: 'Terrestrial',
    color: '#ef4444',
    secondaryColor: '#b91c1c',
    radius: 1.4,
    realRadiusKm: 3389.5,
    distanceFromSunAU: 1.524,
    distanceFromSunKm: 227.9,
    artisticDistance: 44,
    orbitalPeriodDays: 686.98,
    rotationPeriodHours: 24.62,
    axialTiltDeg: 25.19,
    orbitSpeed: 0.53,
    massKg: '6.4171 × 10²³ kg (0.107 Earths)',
    gravityMps2: 3.721,
    surfaceTempC: { min: -140, avg: -63, max: 20 },
    moonsCount: 2,
    notableMoons: [
      {
        name: 'Phobos',
        diameterKm: 22.2,
        orbitRadiusKm: 9376,
        discoveryYear: 1877,
        discoveredBy: 'Asaph Hall',
        description: 'Heavily cratered captured asteroid orbiting so close that it will eventually break apart or collide with Mars.'
      },
      {
        name: 'Deimos',
        diameterKm: 12.4,
        orbitRadiusKm: 23463,
        discoveryYear: 1877,
        discoveredBy: 'Asaph Hall',
        description: 'Smooth outer captured asteroid with a thick regolith blanket and microgravity.'
      }
    ],
    hasRings: false,
    atmosphereComposition: [
      { gas: 'Carbon Dioxide (CO₂)', percentage: 95.32 },
      { gas: 'Nitrogen (N₂)', percentage: 2.6 },
      { gas: 'Argon (Ar)', percentage: 1.9 },
      { gas: 'Oxygen (O₂)', percentage: 0.13 },
      { gas: 'Carbon Monoxide (CO)', percentage: 0.05 },
    ],
    internalStructure: [
      { name: 'Metallic Core', thickness: '1,830 km radius', composition: 'Liquid iron, nickel & light sulfur', color: '#fed7aa', description: 'NASA InSight discovered a larger, less dense liquid metallic core than previously assumed.' },
      { name: 'Silicate Mantle', thickness: '1,500 km', composition: 'Olivine and pyroxene silicates', color: '#c2410c', description: 'Solid stagnant-lid rocky mantle lacking active plate tectonics.' },
      { name: 'Crust', thickness: '24-72 km', composition: 'Iron-rich volcanic basalt regolith', color: '#991b1b', description: 'Covered in oxidized iron minerals (rust dust) giving Mars its blood-red appearance.' },
    ],
    quickFacts: [
      'Home to Olympus Mons, the largest volcano in the Solar System (21.9 km high, nearly 3x Everest).',
      'Houses Valles Marineris, a canyon system 4,000 km long and up to 7 km deep.',
      'Water ice deposits exist at both Martian polar caps and beneath shallow subsurface regolith.',
      'Experiences planet-wide dust storms that can obscure the entire surface for months.'
    ],
    explorationMissions: ['Viking 1 & 2', 'Curiosity (2012)', 'Perseverance (2021)', 'Ingenuity Helicopter', 'Mars Express', 'Tianwen-1'],
    description: 'A cold, desert world coated in iron oxide rust, featuring ancient dry river valleys, massive shield volcanoes, and polar ice caps.',
    detailedDescription: 'Mars is the primary frontier of human interplanetary exploration. Ancient lakebeds, river deltas (such as Jezero Crater explored by Perseverance), and sedimentary minerals confirm that liquid water flowed copiously across its surface 3.8 billion years ago before the loss of its internal magnetic dynamo allowed solar wind to strip its atmosphere.'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    tagline: 'Colossus of the Realm',
    type: 'Gas Giant',
    color: '#f59e0b',
    secondaryColor: '#d97706',
    radius: 4.8,
    realRadiusKm: 69911,
    distanceFromSunAU: 5.204,
    distanceFromSunKm: 778.5,
    artisticDistance: 58,
    orbitalPeriodDays: 4332.59, // 11.86 Earth years
    rotationPeriodHours: 9.93,
    axialTiltDeg: 3.13,
    orbitSpeed: 0.084,
    massKg: '1.8982 × 10²⁷ kg (317.8 Earths)',
    gravityMps2: 24.79,
    surfaceTempC: { min: -145, avg: -110, max: -40 },
    moonsCount: 95,
    notableMoons: [
      {
        name: 'Ganymede',
        diameterKm: 5268.2,
        orbitRadiusKm: 1070400,
        discoveryYear: 1610,
        discoveredBy: 'Galileo Galilei',
        description: 'Largest moon in the Solar System (bigger than Mercury and Pluto) and the only moon with its own magnetic field.'
      },
      {
        name: 'Europa',
        diameterKm: 3121.6,
        orbitRadiusKm: 670900,
        discoveryYear: 1610,
        discoveredBy: 'Galileo Galilei',
        description: 'Smooth icy crust concealing a vast subsurface saltwater ocean holding more liquid water than all Earth’s oceans combined.'
      },
      {
        name: 'Io',
        diameterKm: 3643.2,
        orbitRadiusKm: 421700,
        discoveryYear: 1610,
        discoveredBy: 'Galileo Galilei',
        description: 'Most volcanically active body in the Solar System with over 400 active volcanoes driven by tidal friction.'
      },
      {
        name: 'Callisto',
        diameterKm: 4820.6,
        orbitRadiusKm: 1882700,
        discoveryYear: 1610,
        discoveredBy: 'Galileo Galilei',
        description: 'Ancient, heavily cratered ice-rock moon with minimal geological activity.'
      }
    ],
    hasRings: false,
    atmosphereComposition: [
      { gas: 'Hydrogen (H₂)', percentage: 89.8 },
      { gas: 'Helium (He)', percentage: 10.2 },
      { gas: 'Methane (CH₄)', percentage: 0.3 },
      { gas: 'Ammonia (NH₃)', percentage: 0.026 },
      { gas: 'Trace gases', percentage: 0.001 },
    ],
    internalStructure: [
      { name: 'Diffuse Heavy Core', thickness: '15,000 km radius', composition: 'Dense rock, ice & metallic elements', color: '#e2e8f0', description: 'NASA Juno revealed a fuzzy, dilute core mixed with hydrogen rather than a rigid sphere.' },
      { name: 'Metallic Hydrogen', thickness: '40,000 km', composition: 'Liquid metallic hydrogen conductor', color: '#fbbf24', description: 'Electrically conducting liquid metal hydrogen under millions of atmospheres pressure, generating huge magnetosphere.' },
      { name: 'Molecular Hydrogen', thickness: '20,000 km', composition: 'Fluid molecular hydrogen & helium', color: '#f59e0b', description: 'Supercritical hydrogen-helium fluid grading seamlessly into the outer cloud tops.' },
      { name: 'Cloud Layer', thickness: '1,000 km', composition: 'Ammonia and ammonium hydrosulfide ice clouds', color: '#b45309', description: 'Visible colorful belts and zones driven by 600 km/h jet streams.' },
    ],
    quickFacts: [
      'Mass is 2.5 times greater than all other planets in the Solar System combined.',
      'Fastest rotating planet in the Solar System, completing a rotation in less than 10 hours.',
      'The Great Red Spot is a giant anticyclonic storm larger than Earth that has raged for over 350 years.',
      'Has a radiation belt and magnetosphere 20,000 times stronger than Earth’s.'
    ],
    explorationMissions: ['Pioneer 10 & 11', 'Voyager 1 & 2', 'Galileo (1995)', 'New Horizons', 'Juno (2016-Present)', 'JUICE (En route)'],
    description: 'The undisputed monarch of the Solar System, an immense gas giant with dynamic storm belts and 95 known moons.',
    detailedDescription: 'Jupiter’s gravitational presence protects the inner planets by deflecting and absorbing countless comets and asteroids. Its atmosphere features vivid zones and belts of ammonia and ammonium hydrosulfide crystals, sheared by counter-flowing jet streams reaching 650 km/h. Beneath the visible clouds, hydrogen transforms into an electrically conductive liquid metal.'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    tagline: 'The Crowned Jewel',
    type: 'Gas Giant',
    color: '#e2b36e',
    secondaryColor: '#c59b58',
    radius: 4.2,
    realRadiusKm: 58232,
    distanceFromSunAU: 9.582,
    distanceFromSunKm: 1433.5,
    artisticDistance: 74,
    orbitalPeriodDays: 10759.22, // 29.45 Earth years
    rotationPeriodHours: 10.66,
    axialTiltDeg: 26.73,
    orbitSpeed: 0.034,
    massKg: '5.6834 × 10²⁶ kg (95.16 Earths)',
    gravityMps2: 10.44,
    surfaceTempC: { min: -178, avg: -139, max: -80 },
    moonsCount: 146,
    notableMoons: [
      {
        name: 'Titan',
        diameterKm: 5149.5,
        orbitRadiusKm: 1221870,
        discoveryYear: 1655,
        discoveredBy: 'Christiaan Huygens',
        description: 'Second largest moon in the Solar System, featuring a dense nitrogen atmosphere and lakes of liquid methane and ethane.'
      },
      {
        name: 'Enceladus',
        diameterKm: 504.2,
        orbitRadiusKm: 238040,
        discoveryYear: 1789,
        discoveredBy: 'William Herschel',
        description: 'Pristine ice moon spewing water vapor and organic molecules from hydrothermal vents in its south polar geysers.'
      },
      {
        name: 'Mimas',
        diameterKm: 396.4,
        orbitRadiusKm: 185540,
        discoveryYear: 1789,
        discoveredBy: 'William Herschel',
        description: 'Nicknamed the "Death Star" due to the colossal 130 km Herschel impact crater covering nearly a third of its face.'
      }
    ],
    hasRings: true,
    ringsConfig: {
      innerRadius: 5.8,
      outerRadius: 10.5,
      color: '#d4b37f',
      opacity: 0.88,
    },
    atmosphereComposition: [
      { gas: 'Hydrogen (H₂)', percentage: 96.3 },
      { gas: 'Helium (He)', percentage: 3.25 },
      { gas: 'Methane (CH₄)', percentage: 0.45 },
      { gas: 'Ammonia (NH₃)', percentage: 0.012 },
      { gas: 'Hydrogen Deuteride', percentage: 0.011 },
    ],
    internalStructure: [
      { name: 'Rocky Ice Core', thickness: '12,000 km radius', composition: 'Iron, nickel, silicates & high-pressure ice', color: '#cbd5e1', description: 'Massive rocky core surrounded by metallic and compressed helium fluids.' },
      { name: 'Liquid Metallic Hydrogen', thickness: '25,000 km', composition: 'Conductive liquid hydrogen & helium rain', color: '#fde047', description: 'Helium rain separates from hydrogen, generating extra internal thermal heat.' },
      { name: 'Molecular Fluid Hydrogen', thickness: '22,000 km', composition: 'Liquid hydrogen-helium ocean', color: '#facc15', description: 'Fluid transitions gradually from dense gas into liquid with increasing depth.' },
      { name: 'Upper Atmosphere', thickness: '1,000 km', composition: 'Ammonia haze & golden bands', color: '#eab308', description: 'Features a unique persistent hexagonal hurricane vortex at its north pole.' },
    ],
    quickFacts: [
      'Famous for the most magnificent and extensive ring system in the Solar System.',
      'Rings span up to 282,000 km wide but are remarkably thin — averaging just 10 meters thick!',
      'Has the lowest mean density of any planet (0.687 g/cm³); Saturn would float in a gigantic ocean of water.',
      'Possesses the most confirmed natural satellites of any planet in our solar system: 146 moons!'
    ],
    explorationMissions: ['Pioneer 11', 'Voyager 1 & 2', 'Cassini-Huygens (2004-2017)', 'Dragonfly to Titan (Planned)'],
    description: 'The golden ringed spectacle of the cosmos, flanked by 146 moons including methane-rich Titan and cryovolcanic Enceladus.',
    detailedDescription: 'Saturn is instantly recognizable by its dazzling ring system, composed of countless billions of water ice chunks and rocky grains ranging in size from dust particles to mountaintops. The Cassini-Huygens mission revealed bizarre features including a persistent geometric hexagonal storm at its north pole and active saltwater geysers on Enceladus.'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    tagline: 'The Tilted Ice Giant',
    type: 'Ice Giant',
    color: '#38bdf8',
    secondaryColor: '#0284c7',
    radius: 3.0,
    realRadiusKm: 25362,
    distanceFromSunAU: 19.191,
    distanceFromSunKm: 2872.5,
    artisticDistance: 90,
    orbitalPeriodDays: 30685.4, // 84.02 Earth years
    rotationPeriodHours: -17.24, // Retrograde rotation
    axialTiltDeg: 97.77,
    orbitSpeed: 0.012,
    massKg: '8.6810 × 10²⁵ kg (14.54 Earths)',
    gravityMps2: 8.69,
    surfaceTempC: { min: -224, avg: -195, max: -150 },
    moonsCount: 28,
    notableMoons: [
      {
        name: 'Titania',
        diameterKm: 1577.8,
        orbitRadiusKm: 435910,
        discoveryYear: 1787,
        discoveredBy: 'William Herschel',
        description: 'Largest moon of Uranus, laced with colossal fault canyons and tectonic scarps.'
      },
      {
        name: 'Miranda',
        diameterKm: 471.6,
        orbitRadiusKm: 129390,
        discoveryYear: 1948,
        discoveredBy: 'Gerard Kuiper',
        description: 'Features the most extreme patchwork cliff terrain in the solar system, including the 20 km high Verona Rupes cliff.'
      },
      {
        name: 'Oberon',
        diameterKm: 1522.8,
        orbitRadiusKm: 583520,
        discoveryYear: 1787,
        discoveredBy: 'William Herschel',
        description: 'Second-largest and outermost major Uranian moon, heavily cratered and scarred by ancient cryovolcanism.'
      }
    ],
    hasRings: true,
    ringsConfig: {
      innerRadius: 3.8,
      outerRadius: 5.2,
      color: '#7dd3fc',
      opacity: 0.45,
    },
    atmosphereComposition: [
      { gas: 'Hydrogen (H₂)', percentage: 82.5 },
      { gas: 'Helium (He)', percentage: 15.2 },
      { gas: 'Methane (CH₄)', percentage: 2.3 },
      { gas: 'Hydrogen Deuteride', percentage: 0.009 },
      { gas: 'Ammonia & trace', percentage: 0.001 },
    ],
    internalStructure: [
      { name: 'Rocky Core', thickness: '5,000 km radius', composition: 'Silicates and iron-nickel', color: '#94a3b8', description: 'Modest solid core at approximately 4,700 °C.' },
      { name: 'Icy Mantle', thickness: '15,000 km', composition: 'Supercritical water, ammonia & methane "ices"', color: '#38bdf8', description: 'Hot, dense, electrically conducting supercritical fluid slush ocean.' },
      { name: 'Outer Atmosphere', thickness: '5,000 km', composition: 'Hydrogen, helium and methane gas', color: '#7dd3fc', description: 'Methane absorbs red light, lending the planet its serene aquamarine cyan hue.' },
    ],
    quickFacts: [
      'Rotates practically on its side with an axial tilt of 97.77°, likely caused by a primordial planet-sized impact.',
      'Experiences extreme 42-year long seasons of continuous polar sunlight followed by 42 years of night.',
      'Has the coldest recorded planetary atmosphere in the Solar System, dropping to -224°C.',
      'Has 13 faint, dark rings oriented vertically relative to the plane of the Solar System.'
    ],
    explorationMissions: ['Voyager 2 (1986 flyby)', 'Uranus Orbiter & Probe (NASA Decadal Survey Priority)'],
    description: 'An aquamarine ice giant revolving almost entirely on its side, cloaked in cold methane clouds and flanked by vertical dark rings.',
    detailedDescription: 'Discovered in 1781 by William Herschel, Uranus was the first planet discovered using a telescope. Its bizarre 98-degree axial tilt causes the poles to point almost directly at the Sun at solstices. Its internal heat emission is remarkably lower than any other giant planet, posing one of planetary science’s greatest thermodynamic enigmas.'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    tagline: 'The Azure Storm King',
    type: 'Ice Giant',
    color: '#3b82f6',
    secondaryColor: '#1d4ed8',
    radius: 2.9,
    realRadiusKm: 24622,
    distanceFromSunAU: 30.07,
    distanceFromSunKm: 4498.4,
    artisticDistance: 106,
    orbitalPeriodDays: 60190.0, // 164.79 Earth years
    rotationPeriodHours: 16.11,
    axialTiltDeg: 28.32,
    orbitSpeed: 0.006,
    massKg: '1.0241 × 10²⁶ kg (17.15 Earths)',
    gravityMps2: 11.15,
    surfaceTempC: { min: -218, avg: -201, max: -160 },
    moonsCount: 16,
    notableMoons: [
      {
        name: 'Triton',
        diameterKm: 2706.8,
        orbitRadiusKm: 354760,
        discoveryYear: 1846,
        discoveredBy: 'William Lassell',
        description: 'Captured Kuiper Belt dwarf moon orbiting backwards (retrograde) with active nitrogen ice geysers reaching 8 km high.'
      },
      {
        name: 'Proteus',
        diameterKm: 420.0,
        orbitRadiusKm: 117647,
        discoveryYear: 1989,
        discoveredBy: 'Voyager 2 Science Team',
        description: 'Oddly boxy, non-spherical inner moon holding the limit of size before gravity forces a body into hydrostatic equilibrium.'
      },
      {
        name: 'Nereid',
        diameterKm: 340.0,
        orbitRadiusKm: 5513811,
        discoveryYear: 1949,
        discoveredBy: 'Gerard Kuiper',
        description: 'One of the most eccentric orbits of any moon in the solar system, ranging from 1.3 to 9.6 million km from Neptune.'
      }
    ],
    hasRings: true,
    ringsConfig: {
      innerRadius: 3.5,
      outerRadius: 4.8,
      color: '#60a5fa',
      opacity: 0.35,
    },
    atmosphereComposition: [
      { gas: 'Hydrogen (H₂)', percentage: 80.0 },
      { gas: 'Helium (He)', percentage: 19.0 },
      { gas: 'Methane (CH₄)', percentage: 1.5 },
      { gas: 'Hydrogen Deuteride', percentage: 0.019 },
      { gas: 'Ethane & trace', percentage: 0.001 },
    ],
    internalStructure: [
      { name: 'Rock & Iron Core', thickness: '6,000 km radius', composition: 'Silicate rocks and nickel-iron', color: '#94a3b8', description: 'Dense core roughly 1.2 times the mass of the entire Earth.' },
      { name: 'Mantle of Hot Ices', thickness: '14,000 km', composition: 'Superionic water, ammonia, methane & "diamond rain"', color: '#2563eb', description: 'Under extreme pressure, methane molecules split, precipitating solid diamond crystals sinking toward the core.' },
      { name: 'Active Atmosphere', thickness: '5,000 km', composition: 'Molecular hydrogen, helium and methane', color: '#60a5fa', description: 'Vivid deep royal blue atmosphere driven by powerful internal heat currents.' },
    ],
    quickFacts: [
      'Windiest world in the Solar System, with supersonic hurricane winds reaching up to 2,100 km/h (1,300 mph).',
      'The only planet in the Solar System located through mathematical prediction before telescope observation.',
      'Completed its first full orbit since discovery (1846) in the year 2011.',
      'Radiates 2.6 times more internal heat than it receives from the distant Sun.'
    ],
    explorationMissions: ['Voyager 2 (1989 flyby)', 'Hubble Space Telescope monitoring', 'JWST (2022 ring imaging)'],
    description: 'The outermost major planet, a deep sapphire ice giant swept by the most violent supersonic winds in the solar system.',
    detailedDescription: 'Neptune orbits 30 times further from the Sun than Earth in the frigid twilight of the solar system. Despite receiving mere fractions of solar radiation, its dynamic atmosphere is powered by strong internal heat that drives supersonic winds, high-altitude cirrus clouds of methane ice, and gargantuan anticyclonic storms known as Great Dark Spots.'
  },
  {
    id: 'pluto',
    name: 'Pluto',
    tagline: 'King of the Kuiper Belt',
    type: 'Dwarf Planet',
    color: '#c4b5fd',
    secondaryColor: '#8b5cf6',
    radius: 0.8,
    realRadiusKm: 1188.3,
    distanceFromSunAU: 39.48,
    distanceFromSunKm: 5906.4,
    artisticDistance: 122,
    orbitalPeriodDays: 90560.0, // 247.9 Earth years
    rotationPeriodHours: -153.3, // 6.39 Earth days retrograde
    axialTiltDeg: 122.53,
    orbitSpeed: 0.004,
    massKg: '1.303 × 10²² kg (0.0022 Earths)',
    gravityMps2: 0.62,
    surfaceTempC: { min: -240, avg: -229, max: -218 },
    moonsCount: 5,
    notableMoons: [
      {
        name: 'Charon',
        diameterKm: 1212.0,
        orbitRadiusKm: 19591,
        discoveryYear: 1978,
        discoveredBy: 'James Christy',
        description: 'Colossal binary partner moon so massive that the system’s center of mass lies in empty space between Pluto and Charon.'
      },
      {
        name: 'Nix & Hydra',
        diameterKm: 45.0,
        orbitRadiusKm: 48694,
        discoveryYear: 2005,
        discoveredBy: 'Hubble Space Telescope Team',
        description: 'Small chaotic tumbling icy satellites orbiting the Pluto-Charon binary system.'
      }
    ],
    hasRings: false,
    atmosphereComposition: [
      { gas: 'Nitrogen (N₂)', percentage: 99.0 },
      { gas: 'Methane (CH₄)', percentage: 0.5 },
      { gas: 'Carbon Monoxide (CO)', percentage: 0.5 },
    ],
    internalStructure: [
      { name: 'Rocky Core', thickness: '850 km radius', composition: 'Hydrated silicates and minerals', color: '#94a3b8', description: 'Dense rocky core making up approximately 70% of Pluto’s total mass.' },
      { name: 'Subsurface Ocean / Slush', thickness: '100-180 km', composition: 'Liquid water enriched with ammonia', color: '#6366f1', description: 'Thermal insulation may preserve a liquid water mantle beneath Tombaugh Regio.' },
      { name: 'Water-Ice Crust', thickness: '200 km', composition: 'Hard water-ice bedrock capped in nitrogen glaciers', color: '#ddd6fe', description: 'Features the famous bright heart-shaped nitrogen ice plain Sputnik Planitia.' },
    ],
    quickFacts: [
      'Famous for Sputnik Planitia, a heart-shaped glacier of convective nitrogen and carbon monoxide ice.',
      'Forms a true binary planetary system with its largest moon Charon, mutually tidally locked.',
      'Reclassified as a dwarf planet by the International Astronomical Union in 2006.',
      'Has tall water-ice mountain ranges as high as the Rocky Mountains, kept rigid by cryogenic cold.'
    ],
    explorationMissions: ['New Horizons (Historic flyby July 14, 2015)'],
    description: 'The beloved dwarf planet at the inner edge of the Kuiper Belt, sporting a nitrogen heart glacier and dramatic water-ice peaks.',
    detailedDescription: 'When NASA’s New Horizons spacecraft flew past Pluto in 2015, it shattered expectations by revealing an active world with smooth nitrogen-ice plains, cryovolcanoes, towering mountain ranges of rock-hard water ice, and a tenuous blue-tinted atmospheric haze reaching hundreds of kilometers into space.'
  },
  {
    id: 'black-hole',
    name: 'Cygnus X-Omega',
    tagline: 'Singularity · Beyond the Abyss',
    type: 'Black Hole',
    color: '#c084fc',
    secondaryColor: '#f59e0b',
    radius: 3.5,
    realRadiusKm: 56.4,
    distanceFromSunAU: 75.0,
    distanceFromSunKm: 11220.0,
    artisticDistance: 165,
    orbitalPeriodDays: 240000.0,
    rotationPeriodHours: 0.0008,
    axialTiltDeg: 42.0,
    orbitSpeed: 0.001,
    massKg: '3.78 × 10³¹ kg (~19.0 Solar Masses)',
    gravityMps2: 3.5e12,
    surfaceTempC: { min: -273.15, avg: 12000000, max: 25000000 },
    moonsCount: 3,
    notableMoons: [
      {
        name: 'Relativistic Accretion Ring',
        diameterKm: 420000,
        orbitRadiusKm: 850000,
        discoveryYear: 2026,
        discoveredBy: 'Event Horizon Space Array',
        description: 'Superheated incandescent plasma swirling into the event horizon at 0.45c with relativistic Doppler beaming.'
      },
      {
        name: 'Trapped Micro-Pulsar PSR-B1919',
        diameterKm: 22.0,
        orbitRadiusKm: 2450000,
        discoveryYear: 2026,
        discoveredBy: 'Deep Space Gravitational Interferometer',
        description: 'Compact neutron star caught in an extreme decaying orbit, emitting coherent radio bursts each epoch.'
      },
      {
        name: 'Tidally Disrupted Comet Cluster',
        diameterKm: 140.0,
        orbitRadiusKm: 4900000,
        discoveryYear: 2026,
        discoveredBy: 'James Webb Deep Survey',
        description: 'Icy Oort-cloud bodies spaghettified into a luminous stream of ionized gas feeding the outer disk.'
      }
    ],
    hasRings: true,
    ringsConfig: {
      innerRadius: 4.8,
      outerRadius: 14.5,
      color: '#f59e0b',
      opacity: 0.95,
    },
    atmosphereComposition: [
      { gas: 'Superheated Relativistic Plasma (e⁻ / p⁺)', percentage: 92.5 },
      { gas: 'Synchrotron Magnetic Flux', percentage: 6.2 },
      { gas: 'Ultra-high Energy Cosmic Rays', percentage: 1.3 },
    ],
    internalStructure: [
      { name: 'Ergosphere', thickness: '120 km radius', composition: 'Frame-dragged spacetime vortex', color: '#c084fc', description: 'Region outside the event horizon where spacetime itself is dragged faster than light. Energy can be extracted via the Penrose process.' },
      { name: 'Photon Sphere (ISCO)', thickness: '84.6 km radius', composition: 'Trapped orbital light trajectories', color: '#fef08a', description: 'Unstable circular orbit where photons travel in endless circles, forming the razor-sharp glowing Einstein ring.' },
      { name: 'Event Horizon', thickness: '56.4 km radius', composition: 'Point of no return (Rs = 2GM/c²)', color: '#09090b', description: 'The outer boundary where the escape velocity exactly equals the speed of light. Absolute darkness from which nothing escapes.' },
      { name: 'Inner Cauchy Horizon', thickness: '28.0 km radius', composition: 'Quantum relativistic boundary', color: '#6366f1', description: 'Inner Cauchy horizon of a rotating Kerr black hole, separating causal spacetime from deep quantum instability.' },
      { name: 'Gravitational Singularity', thickness: 'Point of zero volume', composition: 'Infinite density, spacetime curvature ∞', color: '#000000', description: 'The infinite density center where general relativity breaks down and quantum gravity reigns supreme.' },
    ],
    quickFacts: [
      'Located 75 AU from the Sun, far past Pluto, anchoring the mysterious outer boundary of the Kuiper Cliff.',
      'Gravitational lensing bends light from the rear of the accretion disk over and under the event horizon, producing the iconic Interstellar double-ring silhouette.',
      'Extreme gravitational time dilation: 1 hour spent in close orbit near the photon sphere equals 7.4 years on Earth.',
      'Shoots two colossal relativistic plasma jets thousands of kilometers into interstellar space from its north and south magnetic poles.'
    ],
    explorationMissions: ['Event Horizon Array (Deep Space VLBI)', 'James Webb Deep Void Survey', 'Project Icarus Gravitational Probe'],
    description: 'A stellar-mass gravitational singularity situated far beyond Pluto, surrounded by a blinding relativistic accretion disk and immense spacetime distortion.',
    detailedDescription: 'Dwelling in the frozen abyss past Pluto, Cygnus X-Omega is a 19-solar-mass rotating Kerr black hole. Its event horizon spans just 56 km across, yet its gravitational pull warps surrounding starlight into a breathtaking Einstein ring. Gas and cosmic dust spiraling inward at near-light speeds generate intense synchrotron radiation and two relativistic plasma jets that pierce the cosmic void.'
  }
];

export const CELESTIAL_BODIES = PLANETS_DATA;

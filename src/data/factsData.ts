export interface CosmicFact {
  id: string;
  category: 'Atmosphere' | 'Geology' | 'Moons' | 'Physics' | 'Cosmic Scale' | 'Deep History';
  title: string;
  fact: string;
  relatedPlanetId?: string;
  relatedPlanetName?: string;
  source: string;
}

export const COSMIC_FACTS: CosmicFact[] = [
  {
    id: 'f1',
    category: 'Atmosphere',
    title: 'Diamond Rain on Ice Giants',
    fact: 'Deep inside Uranus and Neptune, intense atmospheric pressure exceeding 1.5 million atmospheres splits methane hydrocarbons into carbon and hydrogen, compressing the carbon into solid diamonds that literally precipitate as "diamond hail" sinking toward the planets\' cores.',
    relatedPlanetId: 'neptune',
    relatedPlanetName: 'Neptune',
    source: 'SLAC National Accelerator Laboratory / Nature Astronomy'
  },
  {
    id: 'f2',
    category: 'Physics',
    title: 'A Day Longer Than a Year',
    fact: 'Venus takes 243 Earth days to rotate once on its axis (in slow retrograde motion), but only 225 Earth days to complete one full revolution around the Sun. This means a single Venusian sidereal day is actually longer than its entire planetary year!',
    relatedPlanetId: 'venus',
    relatedPlanetName: 'Venus',
    source: 'NASA Planetary Science'
  },
  {
    id: 'f3',
    category: 'Geology',
    title: 'The Solar System’s Super-Volcano',
    fact: 'Mars hosts Olympus Mons, an extinct shield volcano standing roughly 21.9 km (72,000 ft) high — nearly three times the height of Mount Everest. Its caldera alone is wide enough to engulf the entire city of London.',
    relatedPlanetId: 'mars',
    relatedPlanetName: 'Mars',
    source: 'NASA Mars Reconnaissance Orbiter'
  },
  {
    id: 'f4',
    category: 'Moons',
    title: 'An Ocean Exceeding All Earth Combined',
    fact: 'Jupiter’s icy moon Europa hides a global liquid saltwater ocean beneath its 15-25 km thick ice shell. Scientists estimate this ocean contains more than double the volume of all water in Earth’s oceans combined.',
    relatedPlanetId: 'jupiter',
    relatedPlanetName: 'Jupiter',
    source: 'NASA JPL Galileo Science Team'
  },
  {
    id: 'f5',
    category: 'Atmosphere',
    title: 'The Persistent 350-Year Hurricane',
    fact: 'Jupiter’s Great Red Spot is an anticyclonic high-pressure vortex so colossal that it could easily swallow planet Earth whole. Winds at its outer perimeter scream at over 680 km/h (425 mph).',
    relatedPlanetId: 'jupiter',
    relatedPlanetName: 'Jupiter',
    source: 'NASA Juno Mission'
  },
  {
    id: 'f6',
    category: 'Cosmic Scale',
    title: 'Saturn Would Float in Water',
    fact: 'Saturn has the lowest average density of any planet in our Solar System at just 0.687 g/cm³. Because water has a density of 1.0 g/cm³, if you had a bathtub large enough to hold it, Saturn would effortlessly float like a beach ball!',
    relatedPlanetId: 'saturn',
    relatedPlanetName: 'Saturn',
    source: 'NASA Solar System Exploration'
  },
  {
    id: 'f7',
    category: 'Moons',
    title: 'Methane Lakes on Titan',
    fact: 'Saturn’s moon Titan is the only celestial body in the universe other than Earth with confirmed rivers, rainfall, and lakes of stable surface liquids — except Titan’s hydrological cycle is made entirely of liquid methane and ethane at -179 °C.',
    relatedPlanetId: 'saturn',
    relatedPlanetName: 'Saturn',
    source: 'Cassini-Huygens Mission Radar Team'
  },
  {
    id: 'f8',
    category: 'Physics',
    title: 'The Tilted Planet Revolving on its Side',
    fact: 'Uranus rotates at an axial tilt of 97.8 degrees, essentially rolling around the Sun like a cosmic bowling ball. This extreme geometry causes each pole to experience 42 continuous Earth years of unbroken daylight followed by 42 years of polar night.',
    relatedPlanetId: 'uranus',
    relatedPlanetName: 'Uranus',
    source: 'Hubble Space Telescope Planetary Observations'
  },
  {
    id: 'f9',
    category: 'Cosmic Scale',
    title: 'The True Thickness of Saturn’s Rings',
    fact: 'While Saturn’s majestic ring system spans a breathtaking 282,000 kilometers across space, their vertical thickness averages only about 10 meters (30 feet) — thinner in proportion than a razor blade!',
    relatedPlanetId: 'saturn',
    relatedPlanetName: 'Saturn',
    source: 'Cassini Radio Occultation Data'
  },
  {
    id: 'f10',
    category: 'Geology',
    title: 'Pluto’s Beating Nitrogen Heart',
    fact: 'The bright heart-shaped region on Pluto, Sputnik Planitia, is a 1,000-km-wide glacier of solid nitrogen, carbon monoxide, and methane ice that constantly renews its surface via convective thermal plumes over millions of years.',
    relatedPlanetId: 'pluto',
    relatedPlanetName: 'Pluto',
    source: 'NASA New Horizons Mission'
  },
  {
    id: 'f11',
    category: 'Physics',
    title: 'The Sun’s Staggering Fusion Engine',
    fact: 'Every single second, the Sun’s core fuses approximately 600 million metric tons of hydrogen into 596 million tons of helium. The missing 4 million tons of matter is converted purely into radiant energy according to Einstein’s E=mc².',
    relatedPlanetId: 'sun',
    relatedPlanetName: 'The Sun',
    source: 'NASA Goddard Space Flight Center'
  },
  {
    id: 'f12',
    category: 'Deep History',
    title: 'The Most Distant Footprint of Humanity',
    fact: 'Voyager 1, launched in 1977, is currently over 24 billion kilometers (163 Astronomical Units) away from Earth traveling through interstellar space. A radio signal traveling at the speed of light takes more than 22.5 hours to reach it one-way.',
    relatedPlanetId: 'sun',
    relatedPlanetName: 'Beyond Solar System',
    source: 'NASA Deep Space Network'
  }
];

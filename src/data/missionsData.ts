export interface SpaceMission {
  id: string;
  name: string;
  agency: 'NASA' | 'ESA' | 'JAXA' | 'ISRO' | 'CNSA' | 'Roscosmos' | 'International';
  targetPlanetId: string;
  targetPlanetName: string;
  launchYear: number;
  status: 'Completed' | 'Active' | 'En Route' | 'Planned';
  type: 'Orbiter' | 'Lander / Rover' | 'Flyby' | 'Crewed' | 'Space Telescope';
  summary: string;
  highlight: string;
  distanceTraveledKm?: string;
  keyAchievements: string[];
}

export const SPACE_MISSIONS: SpaceMission[] = [
  {
    id: 'parker-solar-probe',
    name: 'Parker Solar Probe',
    agency: 'NASA',
    targetPlanetId: 'sun',
    targetPlanetName: 'The Sun',
    launchYear: 2018,
    status: 'Active',
    type: 'Orbiter',
    summary: 'The historic mission flying directly through the Sun’s blazing outer corona to unlock the mysteries of solar wind heating.',
    highlight: 'Fastest human-made object in history (reaching ~690,000 km/h) and closest approach to the Sun (~6.1 million km).',
    distanceTraveledKm: '7+ Billion km',
    keyAchievements: [
      'First spacecraft to fly inside the Alfvén critical surface of the solar corona.',
      'Discovered magnetic switchbacks — rapid zig-zag reversals in the solar wind magnetic field.',
      'Protected by an advanced 11.4 cm carbon-composite heat shield enduring 1,400 °C temperatures.'
    ]
  },
  {
    id: 'messenger',
    name: 'MESSENGER',
    agency: 'NASA',
    targetPlanetId: 'mercury',
    targetPlanetName: 'Mercury',
    launchYear: 2004,
    status: 'Completed',
    type: 'Orbiter',
    summary: 'The first orbital mission around Mercury, mapping 100% of the scorched planet’s surface topography and mineral composition.',
    highlight: 'Discovered abundant volatile elements and vast water ice deposits concealed in permanently shadowed polar craters.',
    distanceTraveledKm: '7.9 Billion km',
    keyAchievements: [
      'Conducted 4,104 orbits of Mercury over four historic operational years.',
      'Discovered that Mercury’s magnetic core occupies an extraordinary 85% of its entire planetary radius.',
      'Discovered unusual surface hollows likely formed by recent volatile sublimation.'
    ]
  },
  {
    id: 'bepicolombo',
    name: 'BepiColombo',
    agency: 'ESA',
    targetPlanetId: 'mercury',
    targetPlanetName: 'Mercury',
    launchYear: 2018,
    status: 'En Route',
    type: 'Orbiter',
    summary: 'Joint European-Japanese dual-satellite flagship mission headed for comprehensive orbital science at Mercury in 2026.',
    highlight: 'Dual orbiters: ESA’s Mercury Planetary Orbiter and JAXA’s Mercury Magnetospheric Orbiter.',
    distanceTraveledKm: '9 Billion km planned',
    keyAchievements: [
      'Performed multiple gravity assist flybys of Earth, Venus, and Mercury.',
      'Equipped with ion propulsion engines and high-resolution multispectral cameras.'
    ]
  },
  {
    id: 'venera-13',
    name: 'Venera 13',
    agency: 'Roscosmos',
    targetPlanetId: 'venus',
    targetPlanetName: 'Venus',
    launchYear: 1981,
    status: 'Completed',
    type: 'Lander / Rover',
    summary: 'The Soviet lander that successfully survived the hellish 460 °C, 89-atmosphere surface of Venus for 127 minutes.',
    highlight: 'Returned the first true color panoramic photographs and the first direct acoustic audio recordings from the surface of Venus.',
    keyAchievements: [
      'Drilled into the volcanic basalt bedrock and conducted in-situ X-ray fluorescence mineral spectrometry.',
      'Recorded wind sound and mechanical noise on the surface of an alien world.'
    ]
  },
  {
    id: 'apollo-11',
    name: 'Apollo 11',
    agency: 'NASA',
    targetPlanetId: 'earth',
    targetPlanetName: 'The Moon / Earth',
    launchYear: 1969,
    status: 'Completed',
    type: 'Crewed',
    summary: 'The historic crewed flight that landed Neil Armstrong and Buzz Aldrin on the Moon, returning them safely to Earth.',
    highlight: 'First humans ever to walk upon another celestial body on July 20, 1969.',
    distanceTraveledKm: '1.5 Million km',
    keyAchievements: [
      'Returned 21.55 kg of lunar regolith and pristine basalt rock samples.',
      'Deployed the Early Apollo Scientific Experiments Package (EASEP) including laser retroreflectors still used today.',
      'Achieved President John F. Kennedy’s bold national challenge within the decade.'
    ]
  },
  {
    id: 'perseverance',
    name: 'Mars 2020 Perseverance & Ingenuity',
    agency: 'NASA',
    targetPlanetId: 'mars',
    targetPlanetName: 'Mars',
    launchYear: 2020,
    status: 'Active',
    type: 'Lander / Rover',
    summary: 'Advanced car-sized astrobiology rover and helicopter exploring Jezero Crater to search for ancient microbial biosignatures.',
    highlight: 'Accompanied by Ingenuity, the first rotorcraft ever to achieve powered, controlled flight in the thin atmosphere of another planet.',
    distanceTraveledKm: '470 Million km transit',
    keyAchievements: [
      'Ingenuity completed 72 historic flights across 3 years on Mars.',
      'Collected and sealed dozens of sealed rock core samples for the upcoming Mars Sample Return mission.',
      'Produced oxygen from the Martian carbon-dioxide atmosphere using the MOXIE instrument.'
    ]
  },
  {
    id: 'curiosity',
    name: 'Curiosity Mars Science Laboratory',
    agency: 'NASA',
    targetPlanetId: 'mars',
    targetPlanetName: 'Mars',
    launchYear: 2011,
    status: 'Active',
    type: 'Lander / Rover',
    summary: 'Nuclear-powered rover climbing Mount Sharp in Gale Crater, examining ancient sedimentary rocks for habitable past environments.',
    highlight: 'Definitively confirmed that ancient Mars had fresh, neutral-pH liquid lakes capable of supporting microbial life.',
    distanceTraveledKm: '32+ km surface drive',
    keyAchievements: [
      'Discovered diverse organic carbon molecules preserved in 3.5-billion-year-old mudstones.',
      'Discovered ancient stream gravel beds with rounded pebbles proving vigorous flowing water.',
      'Operational for over 12 continuous Earth years on the Martian surface.'
    ]
  },
  {
    id: 'juno',
    name: 'Juno',
    agency: 'NASA',
    targetPlanetId: 'jupiter',
    targetPlanetName: 'Jupiter',
    launchYear: 2011,
    status: 'Active',
    type: 'Orbiter',
    summary: 'Solar-powered spacecraft in a close polar orbit studying Jupiter’s gravitational anomalies, interior composition, and auroral storms.',
    highlight: 'Revealed that Jupiter possesses a giant, fuzzy, dilute heavy-element core rather than a sharp solid rock.',
    distanceTraveledKm: '3.4 Billion km',
    keyAchievements: [
      'Captured breathtaking close-up images of Jupiter’s swirling cyclonic polar geometric clusters.',
      'Measured atmospheric water abundance and depth of the Great Red Spot down to 300+ km.',
      'Conducted thrilling low-altitude flybys of moons Ganymede, Europa, and Io.'
    ]
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    agency: 'NASA',
    targetPlanetId: 'jupiter',
    targetPlanetName: 'Jupiter / Europa',
    launchYear: 2024,
    status: 'En Route',
    type: 'Orbiter',
    summary: 'NASA’s largest planetary science spacecraft, journeying to investigate if Jupiter’s icy moon Europa has conditions suitable for life.',
    highlight: 'Equipped with ice-penetrating radar, infrared spectrometers, and massive solar wings spanning 30.5 meters.',
    distanceTraveledKm: '2.9 Billion km planned',
    keyAchievements: [
      'Successfully launched October 2024 aboard a SpaceX Falcon Heavy rocket.',
      'Scheduled to perform nearly 50 close flybys of Europa dipping down to 25 km altitude upon 2030 arrival.'
    ]
  },
  {
    id: 'cassini-huygens',
    name: 'Cassini-Huygens',
    agency: 'NASA',
    targetPlanetId: 'saturn',
    targetPlanetName: 'Saturn',
    launchYear: 1997,
    status: 'Completed',
    type: 'Orbiter',
    summary: 'Grand 13-year exploration of the Saturnian realm, deploying ESA’s Huygens probe onto the hydrocarbon sands of moon Titan.',
    highlight: 'Discovered hydrothermal activity and saltwater ocean plumes spewing from Enceladus’s south pole.',
    distanceTraveledKm: '7.9 Billion km',
    keyAchievements: [
      'Huygens achieved humanity’s furthest landing from Earth on moon Titan in 2005.',
      'Took 453,048 images, revealed new rings and moons, and studied the mysterious North Polar Hexagon.',
      'Concluded in 2017 with the "Grand Finale" suicidal dive into Saturn’s atmosphere to protect pristine moons from contamination.'
    ]
  },
  {
    id: 'voyager-2',
    name: 'Voyager 2',
    agency: 'NASA',
    targetPlanetId: 'uranus',
    targetPlanetName: 'Uranus & Neptune',
    launchYear: 1977,
    status: 'Active',
    type: 'Flyby',
    summary: 'The only spacecraft in human history to complete the Grand Tour of all four giant planets: Jupiter, Saturn, Uranus, and Neptune.',
    highlight: 'The only spacecraft ever to visit Uranus (1986) and Neptune (1989), now operating in interstellar space.',
    distanceTraveledKm: '20+ Billion km',
    keyAchievements: [
      'Discovered 10 new moons and 2 new rings around Uranus.',
      'Discovered the Great Dark Spot and supersonic 2,000 km/h winds on Neptune.',
      'Crossed the heliopause into interstellar space in November 2018, continuing to transmit scientific data.'
    ]
  },
  {
    id: 'new-horizons',
    name: 'New Horizons',
    agency: 'NASA',
    targetPlanetId: 'pluto',
    targetPlanetName: 'Pluto & Kuiper Belt',
    launchYear: 2006,
    status: 'Active',
    type: 'Flyby',
    summary: 'Fastest spacecraft at launch, traversing the solar system in 9.5 years to conduct the historic maiden reconnaissance of Pluto.',
    highlight: 'First spacecraft to explore Pluto and its moons, followed by the distant Kuiper Belt contact binary Arrokoth.',
    distanceTraveledKm: '8+ Billion km',
    keyAchievements: [
      'Revealed Pluto’s 1,000 km wide nitrogen-ice glacier heart (Sputnik Planitia) and active cryovolcanism.',
      'Photographed the complex haze layers of Pluto’s blue atmosphere against space.',
      'Explored the primordial bi-lobed Kuiper Belt planetesimal Arrokoth in January 2019.'
    ]
  },
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    agency: 'NASA',
    targetPlanetId: 'saturn',
    targetPlanetName: 'Interstellar Space',
    launchYear: 1977,
    status: 'Active',
    type: 'Flyby',
    summary: 'The most distant human-made object in existence, carrying the Golden Record as an ambassador of human civilization.',
    highlight: 'First spacecraft to cross the heliopause and enter interstellar space on August 25, 2012.',
    distanceTraveledKm: '24.4+ Billion km (163 AU from Earth)',
    keyAchievements: [
      'Captured the famous "Pale Blue Dot" photograph of Earth from 6 billion km away.',
      'Discovered active volcanism on Jupiter’s moon Io and the complex ring structure of Saturn.',
      'Continuously communicating with the NASA Deep Space Network after 48+ years in space.'
    ]
  }
];

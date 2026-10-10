import * as THREE from 'three';

// Cache generated textures so we don't recreate them on every re-render
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Creates a pseudo-random 2D noise / simplex-like utility
 */
function createNoiseHelper(seed = 42) {
  let s = seed;
  const pseudoRandom = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  return {
    rand: pseudoRandom,
    noise2D: (x: number, y: number) => {
      const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return n - Math.floor(n);
    }
  };
}

export function getSunTexture(): THREE.CanvasTexture {
  if (textureCache.has('sun')) return textureCache.get('sun')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep fiery base gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#ff4500');
  grad.addColorStop(0.3, '#ff7700');
  grad.addColorStop(0.7, '#ffaa00');
  grad.addColorStop(1, '#ff3300');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Solar granules and turbulent convection cells
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const nx = (x / width) * 16;
      const ny = (y / height) * 8;
      
      const v1 = Math.sin(nx * 3 + Math.cos(ny * 4));
      const v2 = Math.cos(ny * 5 + Math.sin(nx * 2));
      const turbulence = (v1 + v2) * 0.5;

      const r = 255;
      const g = Math.min(255, Math.max(120, Math.floor(180 + turbulence * 60)));
      const b = Math.min(255, Math.max(0, Math.floor(40 + turbulence * 40)));

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Overlay bright solar flares / active regions
  ctx.fillStyle = 'rgba(255, 245, 180, 0.25)';
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const rad = 20 + Math.random() * 50;
    const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    radial.addColorStop(0, 'rgba(255, 255, 220, 0.8)');
    radial.addColorStop(0.4, 'rgba(255, 200, 50, 0.4)');
    radial.addColorStop(1, 'rgba(255, 60, 0, 0)');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dark sunspots
  for (let i = 0; i < 12; i++) {
    const sx = Math.random() * width;
    const sy = height * 0.3 + Math.random() * (height * 0.4);
    const srad = 4 + Math.random() * 9;
    const spot = ctx.createRadialGradient(sx, sy, 0, sx, sy, srad);
    spot.addColorStop(0, 'rgba(60, 10, 0, 0.95)');
    spot.addColorStop(0.5, 'rgba(120, 30, 0, 0.6)');
    spot.addColorStop(1, 'rgba(200, 60, 0, 0)');
    ctx.fillStyle = spot;
    ctx.beginPath();
    ctx.arc(sx, sy, srad, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('sun', texture);
  return texture;
}

export function getMercuryTexture(): THREE.CanvasTexture {
  if (textureCache.has('mercury')) return textureCache.get('mercury')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#6b6e73';
  ctx.fillRect(0, 0, width, height);

  // Basalt mottled texture
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 10 + Math.random() * 40;
    const gray = Math.floor(70 + Math.random() * 50);
    ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, 0.25)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Impact craters with dark rims and white central peaks
  for (let i = 0; i < 180; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const rad = 2 + Math.random() * 14;

    ctx.strokeStyle = 'rgba(40, 42, 45, 0.7)';
    ctx.lineWidth = Math.max(1, rad * 0.2);
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(160, 165, 175, 0.4)';
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(1, rad * 0.3), 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('mercury', texture);
  return texture;
}

export function getVenusTexture(): THREE.CanvasTexture {
  if (textureCache.has('venus')) return textureCache.get('venus')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Smooth warm atmospheric sulfur gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#caa265');
  grad.addColorStop(0.3, '#dfc18b');
  grad.addColorStop(0.5, '#e8cf9c');
  grad.addColorStop(0.7, '#d3b077');
  grad.addColorStop(1, '#be9455');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Swirling thick sulfuric cloud streaks
  for (let i = 0; i < 60; i++) {
    const y = (i / 60) * height;
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 240, 190, 0.35)' : 'rgba(160, 120, 60, 0.25)';
    ctx.lineWidth = 6 + Math.random() * 16;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < width; x += 30) {
      const wave = Math.sin(x * 0.02 + i) * 15 + Math.cos(x * 0.008) * 10;
      ctx.lineTo(x, y + wave);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('venus', texture);
  return texture;
}

export function getEarthTexture(): THREE.CanvasTexture {
  if (textureCache.has('earth')) return textureCache.get('earth')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep oceanic blue
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#103058');
  oceanGrad.addColorStop(0.5, '#0b3d75');
  oceanGrad.addColorStop(1, '#0e2b4d');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Continental landmasses
  ctx.fillStyle = '#2e7d32'; // Forest green
  const continents = [
    // North America
    { x: 220, y: 160, w: 160, h: 100 },
    // South America
    { x: 290, y: 310, w: 100, h: 140 },
    // Eurasia
    { x: 580, y: 140, w: 260, h: 120 },
    // Africa
    { x: 520, y: 260, w: 130, h: 150 },
    // Australia
    { x: 820, y: 360, w: 80, h: 60 },
  ];

  continents.forEach(cont => {
    ctx.beginPath();
    ctx.ellipse(cont.x, cont.y, cont.w * 0.5, cont.h * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mountainous ochre/desert centers
    ctx.fillStyle = '#b48a48';
    ctx.beginPath();
    ctx.ellipse(cont.x, cont.y, cont.w * 0.3, cont.h * 0.3, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2e7d32';
  });

  // Coastal shallows turquoise blend
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 6;
  continents.forEach(cont => {
    ctx.strokeRect(cont.x - cont.w * 0.5, cont.y - cont.h * 0.5, cont.w, cont.h);
  });

  // Polar ice caps
  ctx.fillStyle = '#f8fafc';
  // North Pole
  ctx.fillRect(0, 0, width, 40);
  // South Pole (Antarctica)
  ctx.fillRect(0, height - 55, width, 55);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('earth', texture);
  return texture;
}

export function getEarthCloudsTexture(): THREE.CanvasTexture {
  if (textureCache.has('earth-clouds')) return textureCache.get('earth-clouds')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, width, height);

  // Swirling white clouds with alpha transparency
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * width;
    const y = 50 + Math.random() * (height - 100);
    const rx = 15 + Math.random() * 50;
    const ry = 8 + Math.random() * 20;
    const opacity = 0.2 + Math.random() * 0.45;

    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, Math.random() * 0.4 - 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cyclone vortex
  const cycX = width * 0.65;
  const cycY = height * 0.4;
  for (let a = 0; a < Math.PI * 4; a += 0.2) {
    const dist = a * 12;
    const px = cycX + Math.cos(a) * dist;
    const py = cycY + Math.sin(a) * dist * 0.6;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.arc(px, py, 14, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('earth-clouds', texture);
  return texture;
}

export function getMarsTexture(): THREE.CanvasTexture {
  if (textureCache.has('mars')) return textureCache.get('mars')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Martian rust base
  ctx.fillStyle = '#b94d28';
  ctx.fillRect(0, 0, width, height);

  // Dark volcanic plains (Syrtis Major, Acidalia Planitia)
  ctx.fillStyle = 'rgba(75, 30, 20, 0.55)';
  for (let i = 0; i < 30; i++) {
    const cx = Math.random() * width;
    const cy = 100 + Math.random() * (height - 200);
    const rw = 40 + Math.random() * 120;
    const rh = 20 + Math.random() * 60;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rw, rh, Math.random() * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Craters and canyons (Valles Marineris)
  ctx.strokeStyle = 'rgba(50, 18, 10, 0.8)';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(width * 0.35, height * 0.55);
  ctx.bezierCurveTo(width * 0.45, height * 0.58, width * 0.55, height * 0.52, width * 0.65, height * 0.56);
  ctx.stroke();

  // White CO2 polar ice caps
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, width, 25);
  ctx.fillRect(0, height - 35, width, 35);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('mars', texture);
  return texture;
}

export function getJupiterTexture(): THREE.CanvasTexture {
  if (textureCache.has('jupiter')) return textureCache.get('jupiter')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Alternating gas giant belts and zones
  const colors = [
    '#9e663a', '#d9b48f', '#b8794c', '#e2cfb4',
    '#7f4a27', '#e8d6c0', '#aa6b3e', '#cb9e76',
    '#8b552d', '#ebd5ba', '#9c6237', '#e2cbb0'
  ];

  const bandH = height / colors.length;
  colors.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.fillRect(0, idx * bandH, width, bandH + 2);
  });

  // Turbulent wave swirls between bands
  for (let b = 0; b < colors.length; b++) {
    const y = b * bandH;
    ctx.fillStyle = b % 2 === 0 ? 'rgba(255, 230, 200, 0.25)' : 'rgba(90, 45, 15, 0.25)';
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < width; x += 20) {
      const wave = Math.sin(x * 0.04 + b * 2) * 5 + Math.cos(x * 0.08) * 3;
      ctx.lineTo(x, y + wave);
    }
    ctx.lineTo(width, y + 10);
    ctx.lineTo(0, y + 10);
    ctx.closePath();
    ctx.fill();
  }

  // Great Red Spot anticyclone
  const spotX = width * 0.62;
  const spotY = height * 0.68;
  const spotR = 40;
  const redSpot = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotR);
  redSpot.addColorStop(0, '#c83820');
  redSpot.addColorStop(0.6, '#b42814');
  redSpot.addColorStop(0.9, '#dd6b4b');
  redSpot.addColorStop(1, 'rgba(180, 80, 50, 0)');
  ctx.fillStyle = redSpot;
  ctx.beginPath();
  ctx.ellipse(spotX, spotY, spotR * 1.5, spotR * 0.8, -0.05, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('jupiter', texture);
  return texture;
}

export function getSaturnTexture(): THREE.CanvasTexture {
  if (textureCache.has('saturn')) return textureCache.get('saturn')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Warm golden haze bands
  const bands = [
    '#b49467', '#d8be8d', '#e5cca0', '#c9ab7b',
    '#dfc79b', '#bfa06f', '#f0dcaf', '#d4b584',
    '#c8a977', '#ebd2a5', '#bfa170', '#e3caa0'
  ];

  const bandH = height / bands.length;
  bands.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.fillRect(0, idx * bandH, width, bandH + 2);
  });

  // Soft atmospheric diffusion
  ctx.fillStyle = 'rgba(255, 250, 220, 0.12)';
  for (let i = 0; i < 30; i++) {
    const y = Math.random() * height;
    ctx.fillRect(0, y, width, 4 + Math.random() * 8);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('saturn', texture);
  return texture;
}

export function getSaturnRingsTexture(): THREE.CanvasTexture {
  if (textureCache.has('saturn-rings')) return textureCache.get('saturn-rings')!;

  // 1D radial ring texture (width 1024 x height 64)
  const width = 1024;
  const height = 64;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, width, height);

  // Gradient along width representing radial distance from inner to outer ring
  const grad = ctx.createLinearGradient(0, 0, width, 0);
  grad.addColorStop(0.0, 'rgba(210, 180, 130, 0)');      // Transparent inside
  grad.addColorStop(0.08, 'rgba(215, 185, 135, 0.4)');    // D ring
  grad.addColorStop(0.20, 'rgba(225, 195, 145, 0.85)');   // C ring
  grad.addColorStop(0.55, 'rgba(240, 215, 165, 0.95)');   // B ring (brightest)
  grad.addColorStop(0.66, 'rgba(0, 0, 0, 0.05)');         // Cassini Division (dark gap)
  grad.addColorStop(0.70, 'rgba(230, 205, 155, 0.88)');   // A ring
  grad.addColorStop(0.88, 'rgba(190, 165, 125, 0.6)');    // Encke gap / edge
  grad.addColorStop(0.96, 'rgba(160, 140, 100, 0.2)');    // F ring faint
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');             // Transparent edge

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Add hundreds of subtle micro-grooves
  for (let x = 80; x < width - 40; x += 3) {
    if (Math.random() > 0.4) {
      const dark = Math.random() * 0.15;
      ctx.fillStyle = `rgba(0, 0, 0, ${dark})`;
      ctx.fillRect(x, 0, 1 + Math.random() * 2, height);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('saturn-rings', texture);
  return texture;
}

export function getUranusTexture(): THREE.CanvasTexture {
  if (textureCache.has('uranus')) return textureCache.get('uranus')!;

  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#5eead4');
  grad.addColorStop(0.3, '#38bdf8');
  grad.addColorStop(0.7, '#0284c7');
  grad.addColorStop(1, '#0369a1');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle cyan methane streaks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  for (let i = 0; i < 15; i++) {
    const y = Math.random() * height;
    ctx.fillRect(0, y, width, 2 + Math.random() * 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('uranus', texture);
  return texture;
}

export function getNeptuneTexture(): THREE.CanvasTexture {
  if (textureCache.has('neptune')) return textureCache.get('neptune')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#1e40af');
  grad.addColorStop(0.4, '#2563eb');
  grad.addColorStop(0.7, '#1d4ed8');
  grad.addColorStop(1, '#1e3a8a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Great Dark Spot storm
  const darkSpot = ctx.createRadialGradient(width * 0.4, height * 0.45, 0, width * 0.4, height * 0.45, 35);
  darkSpot.addColorStop(0, '#0f172a');
  darkSpot.addColorStop(0.7, '#1e293b');
  darkSpot.addColorStop(1, 'rgba(30, 64, 175, 0)');
  ctx.fillStyle = darkSpot;
  ctx.beginPath();
  ctx.ellipse(width * 0.4, height * 0.45, 45, 25, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // White high-altitude cirrus clouds ("Scooter")
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 4;
  for (let i = 0; i < 20; i++) {
    const y = 80 + Math.random() * (height - 160);
    const x = Math.random() * width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 50 + Math.random() * 100, y + (Math.random() - 0.5) * 8);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('neptune', texture);
  return texture;
}

export function getPlutoTexture(): THREE.CanvasTexture {
  if (textureCache.has('pluto')) return textureCache.get('pluto')!;

  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Mottled tan-brown terrain
  ctx.fillStyle = '#8c7661';
  ctx.fillRect(0, 0, width, height);

  // Dark tholin deposits
  ctx.fillStyle = 'rgba(60, 35, 20, 0.6)';
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.beginPath();
    ctx.ellipse(x, y, 20 + Math.random() * 40, 10 + Math.random() * 20, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Famous Tombaugh Regio "Heart" (Sputnik Planitia) in bright cream white
  const hx = width * 0.48;
  const hy = height * 0.52;
  ctx.fillStyle = '#f8f4ee';
  ctx.beginPath();
  // Draw heart-like lobe
  ctx.arc(hx - 15, hy - 10, 22, 0, Math.PI * 2);
  ctx.arc(hx + 15, hy - 10, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(hx - 32, hy - 2);
  ctx.lineTo(hx, hy + 30);
  ctx.lineTo(hx + 32, hy - 2);
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('pluto', texture);
  return texture;
}

export function getMoonTexture(): THREE.CanvasTexture {
  if (textureCache.has('moon')) return textureCache.get('moon')!;

  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#888888';
  ctx.fillRect(0, 0, width, height);

  // Dark Lunar Maria (basalt basins)
  ctx.fillStyle = 'rgba(50, 50, 50, 0.45)';
  for (let i = 0; i < 12; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.beginPath();
    ctx.ellipse(x, y, 25 + Math.random() * 40, 15 + Math.random() * 25, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // White crater impact rays
  ctx.fillStyle = 'rgba(230, 230, 230, 0.6)';
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    ctx.beginPath();
    ctx.arc(cx, cy, 2 + Math.random() * 5, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('moon', texture);
  return texture;
}

export function getPlanetTexture(planetId: string): THREE.CanvasTexture {
  switch (planetId) {
    case 'sun':
      return getSunTexture();
    case 'mercury':
      return getMercuryTexture();
    case 'venus':
      return getVenusTexture();
    case 'earth':
      return getEarthTexture();
    case 'mars':
      return getMarsTexture();
    case 'jupiter':
      return getJupiterTexture();
    case 'saturn':
      return getSaturnTexture();
    case 'uranus':
      return getUranusTexture();
    case 'neptune':
      return getNeptuneTexture();
    case 'pluto':
      return getPlutoTexture();
    default:
      return getMercuryTexture();
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030509',
          900: '#070b14',
          850: '#0d1322',
          800: '#141c30',
          700: '#1e2945',
        },
        cyan: {
          accent: '#00f0ff',
          dim: 'rgba(0, 240, 255, 0.15)',
        },
        violet: {
          accent: '#8b5cf6',
          dim: 'rgba(139, 92, 246, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(0, 240, 255, 0.35)',
        'cyan-subtle': '0 0 15px rgba(0, 240, 255, 0.15)',
        'violet-glow': '0 0 25px rgba(139, 92, 246, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-very-slow': 'spin 40s linear infinite',
      }
    },
  },
  plugins: [],
}

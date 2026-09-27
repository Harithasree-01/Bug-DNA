/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lab: {
          950: '#05070a',
          900: '#0a0d13',
          850: '#0e131b',
          800: '#131923',
          700: '#1b232f',
          600: '#26313f',
          500: '#3a4a5c',
          400: '#5c7186',
          300: '#8ea0b3',
          200: '#c2ccd6',
          100: '#e7ebef',
        },
        trace: {
          DEFAULT: '#39e0c0',
          dim: '#1f8f7b',
          glow: '#7ffbe4',
        },
        signal: {
          amber: '#f0a63c',
          rose: '#ef5a72',
          violet: '#9d7bf0',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(rgba(57,224,192,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(57,224,192,0.055) 1px, transparent 1px)',
      },
      boxShadow: {
        glass: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(57,224,192,0.35), 0 0 24px rgba(57,224,192,0.25)',
      },
      keyframes: {
        pulseline: {
          '0%,100%': { opacity: 0.35 },
          '50%': { opacity: 1 },
        },
        strandflow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 -400px' },
        },
        drift: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        pulseline: 'pulseline 2.4s ease-in-out infinite',
        strandflow: 'strandflow 12s linear infinite',
        drift: 'drift 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

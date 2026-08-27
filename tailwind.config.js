/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Core brand — taken from the WT mark: ink black, warm paper, signal yellow */
        ink: {
          DEFAULT: '#0B0B0C',
          800: '#141416',
          700: '#1D1E21',
          600: '#2A2B2F',
          500: '#3C3E43',
          400: '#5C5F66',
          300: '#8A8D95',
          200: '#B7BAC1',
          100: '#DCDDE1',
        },
        paper: {
          DEFAULT: '#F7F6F3',
          200: '#EFEDE7',
          300: '#E4E1D9',
          400: '#D3CFC5',
        },
        signal: {
          DEFAULT: '#FFB905',
          600: '#E5A400',
          700: '#B98400',
          100: '#FFF3D2',
        },
        portal: {
          DEFAULT: '#000A68',
          600: '#0A1690',
          300: '#5C69C9',
        },
      },
      fontFamily: {
        sans: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        /* Editorial display scale — clamped so it breathes on every viewport */
        'display-sm': ['clamp(2rem, 6vw, 3.5rem)', { lineHeight: '0.94', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.25rem, 7vw, 5rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.4rem, 8.2vw, 6.5rem)', { lineHeight: '0.86', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(4rem, 15vw, 13rem)', { lineHeight: '0.82', letterSpacing: '-0.04em' }],
      },
      opacity: {
        /* Hairline weights the default scale doesn't reach */
        3: '0.03',
        8: '0.08',
        12: '0.12',
        18: '0.18',
      },
      letterSpacing: {
        label: '0.18em',
        stencil: '0.32em',
      },
      maxWidth: {
        shell: '84rem',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'signal-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slow-zoom': {
          from: { transform: 'scale(1.08)' },
          to: { transform: 'scale(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'signal-sweep': 'signal-sweep 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'slow-zoom': 'slow-zoom 14s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        blink: 'blink 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

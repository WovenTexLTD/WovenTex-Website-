/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#ffb905',
          600: '#d97706',
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,185,5,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(255,185,5,0.65)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400% 0' },
          '100%': { backgroundPosition: '400% 0' },
        },
      },
    },
  },
  plugins: [],
};

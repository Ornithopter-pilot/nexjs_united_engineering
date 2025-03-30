/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0d47a1',
        'primary-light': '#5472d3',
        'primary-dark': '#002171',
        'accent': '#00e5ff',
        'accent-light': '#6effff',
        'accent-dark': '#00b2cc',
        'dark': '#0a0a0a',
        'dark-gray': '#121212',
        'medium-gray': '#1e1e1e',
        'light-gray': '#2d2d2d'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite alternate',
        'slide-left': 'slideLeft 0.8s forwards',
        'slide-right': 'slideRight 0.8s forwards',
        'fade-in': 'fadeIn 0.6s forwards',
        'scale-in': 'scaleIn 0.6s forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 5px 0 rgba(0, 229, 255, 0.4)' },
          '100%': { boxShadow: '0 0 20px 0 rgba(0, 229, 255, 0.8)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

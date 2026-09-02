/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#8e7015',
          light: '#a98721',
          dark: '#735a0f',
        },
        dark: {
          900: '#111111',
          800: '#1a1a1a',
          700: '#222222',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['Cinzel', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}

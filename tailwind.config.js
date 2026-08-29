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
        serif: ['Georgia', 'serif'],
        sans: ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

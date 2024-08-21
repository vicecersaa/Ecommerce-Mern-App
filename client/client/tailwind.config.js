// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif']
      },
      textOverflow: {
        ellipsis: 'ellipsis', 
      },
      whitespace: {
        nowrap: 'nowrap', 
      },
      keyframes: {
        popUp: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
      },
      animation: {
        popUp: 'popUp 0.3s ease-out',
      },
    },
  },
  variants: {
    extend: {
      textOverflow: ['responsive', 'hover'],
      whitespace: ['responsive', 'hover'],
    },
  },
  plugins: [],
}

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        hide: 'hidden',
        
      },
      scrollSnapType: {
        mandatory: 'x mandatory', 
      },
      touchAction: {
        panX: 'pan-x', 
      },
      screens: {
        'custom-lg': "1290px"
      },
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

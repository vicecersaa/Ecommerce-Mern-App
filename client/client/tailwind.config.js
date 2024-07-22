/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          sans: ['Roboto', 'sans-serif']
        },
        textOverflow: {
          ellipsis: 'ellipsis', 
        },
        whitespace: {
          nowrap: 'nowrap', 
        },
      
    },
  },

  variants: {
    extend: {
      // Menambahkan varian jika perlu
      textOverflow: ['responsive', 'hover'],
      whitespace: ['responsive', 'hover'],
    },
  },
  plugins: [],
}


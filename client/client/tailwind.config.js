/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#03AC0E'
      },
      flexDirections: {
        'col' : ['column'],
        'col-reverse' : ['column-reverse']
      }
    },
  },
  plugins: [],
}


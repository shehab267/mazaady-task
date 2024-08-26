/** @type {import('tailwindcss').Config} */
const tailwindcssForms = require("@tailwindcss/forms")
module.exports = {
  content: [
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./nuxt.config.ts",
    "./app.vue",
  ],
  pinia:{
    storesDirs : ["./stores/**"],
  },
  theme: {
  extend: {
      padding: {
        21: '5.25rem',
      },
      colors: {
        muted: '#E0E0E0',
        primary: '#D20653',
        secondary: '#FF951D ',
        'gray-light': '#828282',
        'gray-dark': '#333',
        'orange-light': '#FFF5E9',
        'orange-dark': '#FF951D',
      },
      gradientColorStops: {
        primary: '#D20653',
        secondary: '#FF951D',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [tailwindcssForms]
}

/** @type {import('tailwindcss').Config} */
const tailwindcssForms = require("@tailwindcss/forms")
module.exports = {
  content: [
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./nuxt.config.ts",
    "./app.vue",
    "./**/*.ts",
  ],
  pinia:{
    storesDirs : ["./stores/**"],
  },
  theme: {
  
  },
  plugins: [tailwindcssForms]
}

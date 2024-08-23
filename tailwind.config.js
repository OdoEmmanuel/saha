/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      screens: {
        xss: "300px",
        xs: "340px",
        xsm: "500px",
        mxl: "1400px",
        ...defaultTheme.screens,
      },
    extend: {},
  },
  plugins: [
    // require('daisyui'),
  ], 
  variants:{
    variants:{
      extend:{
        display:["focus-group"]
      }
    }
  }
}
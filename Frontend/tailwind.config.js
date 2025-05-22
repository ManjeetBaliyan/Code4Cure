 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: { 
      colors:{
        'primary':"#008000" // Here we set the primary color of our website.
      },
      gridTemplateColumns:{ // It is the auto Css for the  grid-cols-auto in the TopDoctors.jsx components.
        'auto':'repeat(auto-fill,minmax(200px,1fr))'
      }
    },
  },
  plugins: [],
}
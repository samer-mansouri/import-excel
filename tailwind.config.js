const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'

  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      animation: {
          bounce200: 'bounce 1s infinite 200ms',
          bounce400: 'bounce 1s infinite 400ms',
      },
     
      colors: {
        succ: "#26c281",
        curr: "#31c5d2",
        cyan: colors.cyan,
        orange:colors.orange ,
        stone:colors.stone,
        sky:colors.sky,
        violet:colors.violet,
        zinc:colors.zinc  , 
        amber:colors.amber,
         

      },
     
  },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderWidth: ['first'],
      borderWidth: ['last'],
      backgroundColor: ['odd'],
      backgroundColor: ['even'],

      },
      
        
    
    },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),

  ],
}
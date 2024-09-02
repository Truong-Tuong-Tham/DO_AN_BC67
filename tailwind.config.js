/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Example primary color
        secondary: '#4B5563', // Example secondary color
        accent: '#F59E0B', // Example accent color
      },
   
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1200px',
        '2xl': '1536px',
      },
      spacing: {
        'extra-small': '4px',
        'small': '8px',
        'medium': '16px',
        'large': '32px',
        'extra-large': '64px',
      },
      borderRadius: {
        'extra-small': '2px',
        'small': '4px',
        'medium': '8px',
        'large': '16px',
        'extra-large': '32px',
      },
    },
  },
  plugins: [],
};

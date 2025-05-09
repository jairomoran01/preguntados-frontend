/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'geografia': '#4CAF50',
          'historia': '#FFC107',
          'deportes': '#2196F3',
          'ciencia': '#9C27B0',
          'entretenimiento': '#FF5722'
        }
      },
    },
    plugins: [],
  }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'system-ui': ['-apple-system', 'BlinkMacSystemFont', 'Arial', 'sans-serif']
      },
      colors: {
        'primary-blue': '#0072e0',
        'secondary-gray': '#F1F3F4',
        'text-gray': '#5F6368',
        'text-dark': '#202124'
      }
    },
  },
  plugins: [],
}

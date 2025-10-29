/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'indian-saffron': '#FF9933',
        'indian-orange': '#FF9933',
        'indian-green': '#138808',
        'indian-blue': '#000080',
      },
    },
  },
  plugins: [],
};

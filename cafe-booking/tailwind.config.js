/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6c5ce7',
        'secondary': '#00cec9',
        'accent': '#fd79a8',
        'background-dark': '#2d3436',
        'text-light': '#dfe6e9',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.500), 0 0 10px theme(colors.primary.500), 0 0 20px theme(colors.primary.500)',
      },
      textShadow: {
        'neon': '0 0 5px theme(colors.primary.500), 0 0 10px theme(colors.primary.500), 0 0 20px theme(colors.primary.500)',
      },
    },
  },
  plugins: [],
}


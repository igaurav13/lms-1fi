/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#6c28d9",
        surface: "#fefeff",
        ink: "#364154",
      },
    },
  },
  plugins: [],
};

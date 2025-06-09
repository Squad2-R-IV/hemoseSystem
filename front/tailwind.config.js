// tailwind.config.js
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B91C1C",
        secondary: "#111827",
        accent: "#2563EB",
        background: "#F8FAFC",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
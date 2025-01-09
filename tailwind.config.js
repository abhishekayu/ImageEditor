/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "50%": { backgroundPosition: "100% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shine: "shine 4s linear infinite",
      },
    },
  },
  plugins: [],
};

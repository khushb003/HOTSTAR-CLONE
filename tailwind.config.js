const flowbitePlugin = require("flowbite/plugin");

module.exports = {
  darkMode: "class",

  content: ["./public/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],

  theme: {
    extend: {
      colors: {
        hotstar: {
          // Primary & Brand
          blue: "#C99F55", // Main Hotstar blue
          blueLight: "#66b3ff", // Hover/active blue

          // Backgrounds
          dark: "#0f1014", // Entire app background
          nav: "#0f1014", // Navbar/footer background
          card: "#1c2331", // Movie cards / sections
          cardHover: "#ebd189", // Hover effect background

          // Text
          textLight: "#e6e6e6", // For titles
          textDim: "#b3b3b3", // For subtitles / descriptions

          // Borders & Dividers
          border: "#2a3245",

          // Gradients (used in promos)
          gradientStart: "#0c111b",
          gradientEnd: "#1f80e0",
        },
      },

      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },

  plugins: [
    flowbitePlugin,

    // Custom utility to hide scrollbars
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};

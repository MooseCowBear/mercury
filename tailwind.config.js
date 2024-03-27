const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.{js, jsx}",

    "./public/*.html",
    "./app/javascript/components/*.{js, jsx}",
    "./app/views/**/*.{erb,haml,html,slim}",
    "./app/**/*.{html,js,jsx}",
  ],
  theme: {
    screens: {
      xs: "450px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        autofit: "repeat(auto-fit, minmax(280px, 1fr))",
      },
      height: {
        clamp: "clamp(580px, 60vh, 800px)",
      },
      colors: {
        coolpink: {
          500: "#c850c0",
        },
        melon: {
          500: "#ffcc70",
        },
        raspberry: {
          500: "#fe794e",
        },
        raspberry: {
          500: "#d040e0",
        },
        white: "#ffffff",
      },
    },
  },
};

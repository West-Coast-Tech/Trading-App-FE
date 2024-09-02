/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:"var(--color-primary)",
        secondary:"var(--color-secondary)",
        background:"var(--color-background)",
        tBase:"var(--color-text-base)",
        gray: {
          "100": "#1c1f2d",
          "200": "#030000",
          "300": "rgba(255, 255, 255, 0.36)",
        },
        "border-brand-default": "#2c2c2c",
        darkgray: {
          "100": "#aeaeae",
          "200": "#a5a4a4",
        },
        "grays-white": "#fff",
        royalblue: "#5d77ff",
        red: "#ff0a0a",
        limegreen: {
          "100": "#21dd03",
          "200": "#08c400",
          "300": "#18ac00",
        },
        mediumblue: "#064bff",
        gainsboro: "rgba(217, 217, 217, 0)",
      },
      spacing: {
        "space-200": "8px",
      },
      
      borderRadius: {
        "81xl": "100px",
      },
    },
    
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      proxima: ['Proxima Nova', 'sans-serif'],
    },
  },
  corePlugins: {
    preflight: false,
  },
};
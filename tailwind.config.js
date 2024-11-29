/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1090px",
    },
    extend: {
      fontFamily: {
        pixel: ["LanaPixel", "sans-serif"],
      },
      fontSize: {
        tiny: "0.625rem",
        small: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        purple: "#715BEF",
        lightPurple: "#AB9FF2",
        roseRed: "#B93EF1",
        yellow: "#F7931A",
        grey: "#777E91",
        darkYellow: "#CA8C44",
        darkWhite: "#9A9A9A",
        lightGrey: " #161616",
      },
    },
  },
  plugins: [],
};

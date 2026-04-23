/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#658c51",
        secondary: "#545454",
        background: "hsl(var(--background))",
        contentBg: "#F9F9F9",
        text: "#333333",
        textHero: "#FFFFFF",
      },
      fontFamily: {
        heading: ["'Instrument Serif'", "serif"],
        body: ["'Barlow'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
      }
    },
  },
  plugins: [],
}

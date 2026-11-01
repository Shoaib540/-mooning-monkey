/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0c0a09",
          900: "#1c1917",
          800: "#292524",
        },
        sand: "#f5f0e8",
        fog: "#a8a29e",
        blaze: {
          DEFAULT: "#f97316",
          deep: "#ea580c",
        },
        leaf: "#16a34a",
      },
      fontFamily: {
        display: ['"Syne"', "system-ui", "sans-serif"],
        body: ['"Manrope"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        forge:
          "radial-gradient(70% 50% at 80% 0%, rgba(249,115,22,0.22), transparent 55%), radial-gradient(50% 40% at 10% 100%, rgba(22,163,74,0.10), transparent 50%), linear-gradient(160deg, #0c0a09 0%, #1c1917 55%, #292524 100%)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050d18",
          900: "#0a1628",
          800: "#12233a",
          700: "#1a3352",
        },
        ink: "#eef2f7",
        mute: "#8fa3bc",
        paper: "#f7f4ee",
        marigold: {
          DEFAULT: "#e8a317",
          soft: "#f6c65a",
          deep: "#b8790a",
        },
        sea: "#2ec4b6",
      },
      fontFamily: {
        display: ['"Syne"', "system-ui", "sans-serif"],
        body: ['"Figtree"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "hero-wash":
          "radial-gradient(80% 70% at 70% 20%, rgba(232,163,23,0.22), transparent 55%), radial-gradient(60% 50% at 10% 80%, rgba(46,196,182,0.12), transparent 50%), linear-gradient(160deg, #050d18 0%, #0a1628 45%, #12233a 100%)",
        "grid-soft":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "sheet-in": "sheetIn 0.9s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2.8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sheetIn: {
          "0%": { opacity: "0", transform: "translateY(40px) rotate(2deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotate(0deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

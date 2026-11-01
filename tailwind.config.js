/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          950: "#050608",
          900: "#0b0e13",
          800: "#141922",
          700: "#1e2633",
        },
        mist: "#c6d0dd",
        mute: "#7d8b9e",
        signal: {
          DEFAULT: "#ff4d3a",
          soft: "#ff7a6b",
        },
        go: {
          DEFAULT: "#3dffb5",
          dim: "#1fa87a",
        },
        warn: "#ffc14d",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ['"Manrope"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      backgroundImage: {
        stage:
          "radial-gradient(70% 55% at 85% 10%, rgba(61,255,181,0.12), transparent 50%), radial-gradient(55% 45% at 10% 90%, rgba(255,77,58,0.10), transparent 45%), linear-gradient(165deg, #050608 0%, #0b0e13 50%, #141922 100%)",
        hatch:
          "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseBar: {
          "0%,100%": { transform: "scaleX(0.92)", opacity: "0.7" },
          "50%": { transform: "scaleX(1)", opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.65s ease-out both",
        pulseBar: "pulseBar 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

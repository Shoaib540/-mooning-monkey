/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#07080a",
        panel: "#101318",
        panel2: "#161b22",
        line: "rgba(184, 255, 60, 0.16)",
        ink: "#eef3f0",
        mute: "#8b968c",
        signal: {
          DEFAULT: "#b8ff3c",
          soft: "#d8ff8f",
          deep: "#6fad12",
        },
        platinum: "#d7dee8",
        amber: "#ffb347",
        rose: "#ff6b7a",
      },
      fontFamily: {
        display: ['"Syne"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        hud: "0 0 0 1px rgba(184,255,60,0.14), 0 20px 60px rgba(0,0,0,0.45)",
        orb: "0 0 90px rgba(184,255,60,0.28), 0 0 160px rgba(111,173,18,0.18)",
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(184,255,60,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(184,255,60,0.045) 1px, transparent 1px)",
        aurora:
          "radial-gradient(ellipse 70% 45% at 20% 0%, rgba(184,255,60,0.16), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 10%, rgba(215,222,232,0.08), transparent 50%)",
      },
      keyframes: {
        spinSlow: { to: { transform: "rotate(360deg)" } },
        pulseRing: {
          "0%,100%": { opacity: "0.4", transform: "scale(0.94)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        spinSlow: "spinSlow 22s linear infinite",
        spinMed: "spinSlow 12s linear infinite reverse",
        pulseRing: "pulseRing 2.6s ease-in-out infinite",
        floatY: "floatY 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

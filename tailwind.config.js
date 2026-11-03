/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#02060c",
        panel: "#07111c",
        panel2: "#0b1826",
        line: "rgba(86, 214, 255, 0.18)",
        ink: "#d7f4ff",
        mute: "#7ea8bd",
        cyan: {
          DEFAULT: "#56d6ff",
          soft: "#9ae8ff",
          deep: "#1090c8",
        },
        amber: {
          DEFAULT: "#ffc14d",
          soft: "#ffe0a3",
        },
        rose: "#ff6b8a",
      },
      fontFamily: {
        display: ['"Orbitron"', "sans-serif"],
        body: ['"Rajdhani"', "sans-serif"],
        mono: ['"Share Tech Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        hud: "0 0 0 1px rgba(86,214,255,0.18), 0 0 40px rgba(16,144,200,0.18)",
        orb: "0 0 80px rgba(86,214,255,0.45), 0 0 160px rgba(16,144,200,0.25)",
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(86,214,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(86,214,255,0.06) 1px, transparent 1px)",
        radar:
          "radial-gradient(circle at center, rgba(86,214,255,0.18), transparent 55%)",
      },
      keyframes: {
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        pulseRing: {
          "0%,100%": { opacity: "0.35", transform: "scale(0.92)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        dash: {
          to: { strokeDashoffset: "-24" },
        },
      },
      animation: {
        spinSlow: "spinSlow 18s linear infinite",
        spinMed: "spinSlow 10s linear infinite",
        pulseRing: "pulseRing 2.4s ease-in-out infinite",
        scan: "scan 3.5s linear infinite",
        floatY: "floatY 5s ease-in-out infinite",
        dash: "dash 1s linear infinite",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#05030a",
        bg2: "#0a0612",
        ink: "#e8e6f0",
        neon: {
          purple: "#9b5cff",
          pink: "#ff4dd2",
          cyan: "#3df0ff",
          lime: "#c6ff3d",
          gold: "#ffcf3d",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 30%, rgba(155,92,255,0.35), rgba(0,0,0,0) 60%)",
      },
      boxShadow: {
        glow: "0 0 60px rgba(155,92,255,0.35)",
        glowPink: "0 0 60px rgba(255,77,210,0.35)",
        glowCyan: "0 0 60px rgba(61,240,255,0.35)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        shine: "shine 2.5s linear infinite",
        pulseGlow: "pulseGlow 2.6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.6", filter: "blur(20px)" },
          "50%": { opacity: "1", filter: "blur(28px)" },
        },
      },
    },
  },
  plugins: [],
}


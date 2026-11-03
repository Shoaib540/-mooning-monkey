import { motion } from "framer-motion";
import type { WorldHeadline } from "../types";

const HEADLINES: WorldHeadline[] = [
  {
    id: "1",
    title: "Orbital weather mesh expands coverage",
    region: "Pacific",
    severity: "low",
    summary: "Satellite mesh reports calmer storm corridors across the north Pacific.",
  },
  {
    id: "2",
    title: "City grid load balancing active",
    region: "Europe",
    severity: "medium",
    summary: "Peak demand routed through secondary substations without outages.",
  },
  {
    id: "3",
    title: "AI research summit opens",
    region: "Asia",
    severity: "low",
    summary: "Labs present local-first assistant frameworks and desktop agents.",
  },
  {
    id: "4",
    title: "Network latency spike mitigated",
    region: "Americas",
    severity: "high",
    summary: "Backbone providers rerouted traffic after brief Atlantic cable congestion.",
  },
];

export default function WorldMonitor() {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="hud-panel relative flex min-h-[360px] items-center justify-center overflow-hidden p-6">
        <div className="absolute inset-0 bg-grid bg-[size:36px_36px] opacity-40" />
        <div className="absolute inset-0 bg-radar" />
        <motion.div
          className="relative h-56 w-56 rounded-full border border-cyan/30 md:h-72 md:w-72"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(154,232,255,0.35), rgba(7,17,28,0.9) 55%), repeating-conic-gradient(from 0deg, rgba(86,214,255,0.08) 0 8deg, transparent 8deg 16deg)",
            boxShadow: "inset 0 0 60px rgba(16,144,200,0.35), 0 0 50px rgba(86,214,255,0.2)",
          }}
        >
          <div className="absolute left-[22%] top-[34%] h-2 w-2 rounded-full bg-amber shadow-[0_0_12px_#ffc14d]" />
          <div className="absolute left-[62%] top-[28%] h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_#56d6ff]" />
          <div className="absolute left-[48%] top-[58%] h-2 w-2 rounded-full bg-rose shadow-[0_0_12px_#ff6b8a]" />
          <div className="absolute inset-8 rounded-full border border-dashed border-cyan/20" />
        </motion.div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div>
            <p className="hud-label">World Monitor</p>
            <p className="hud-title mt-1">Global Pulse</p>
          </div>
          <p className="font-mono text-xs text-mute">Demo feed · cinematic HUD</p>
        </div>
      </div>

      <div className="hud-panel flex flex-col overflow-hidden">
        <div className="border-b border-line px-4 py-3">
          <p className="hud-label">Event Stream</p>
          <p className="hud-title mt-1">Hotspots & Headlines</p>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {HEADLINES.map((h) => (
            <article key={h.id} className="rounded-sm border border-line bg-void/40 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                  {h.region}
                </p>
                <span
                  className={
                    h.severity === "high"
                      ? "font-mono text-[10px] uppercase text-rose"
                      : h.severity === "medium"
                        ? "font-mono text-[10px] uppercase text-amber"
                        : "font-mono text-[10px] uppercase text-cyan"
                  }
                >
                  {h.severity}
                </span>
              </div>
              <h3 className="mt-2 font-display text-sm tracking-[0.08em] text-ink">
                {h.title}
              </h3>
              <p className="mt-1 font-body text-sm text-mute">{h.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

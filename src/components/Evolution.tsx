import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ASSETS } from "../assets";
import { Zap } from "lucide-react";

const STAGES = [
  { n: 1, name: "Hatchling", power: 12, supply: "10,000", desc: "Genesis mint. Pure cosmic potential, daily $TAK drip begins." },
  { n: 2, name: "Awakened", power: 38, supply: "5,000", desc: "Burn 2 hatchlings + 1,000 $TAK to evolve. Multiplier x2 on rewards." },
  { n: 3, name: "Ascendant", power: 71, supply: "1,500", desc: "Cross-game playable avatar. Unlocks crash arena VIP rooms." },
  { n: 4, name: "Cosmic", power: 100, supply: "300", desc: "Final form. Governance keys, comic royalties, lifetime alpha." },
];

export default function Evolution() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const [active, setActive] = useState(0);

  return (
    <section id="evolution" ref={ref} className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="chip mx-auto"><Zap size={14} /> Four-Stage Evolution</span>
          <h2 className="font-display text-4xl md:text-6xl">From hatchling to <span className="text-gradient">cosmic.</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">Burn, merge, and ascend. Each evolution unlocks higher rewards, deeper utility, and rarer aesthetics.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Sticky 3D card */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-8 bg-gradient-to-tr from-neon-purple to-neon-pink opacity-30 blur-3xl rounded-full animate-pulseGlow" />
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.92, rotateY: -25 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6 }}
                className="relative glass-strong rounded-3xl p-6 shadow-glow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="chip">Stage {STAGES[active].n} / 4</span>
                  <span className="text-xs font-mono text-white/55">SUPPLY · {STAGES[active].supply}</span>
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-black/50 ring-1 ring-white/10">
                  <img src={ASSETS.evo[active]} alt={STAGES[active].name} className="w-full h-full object-contain animate-float" />
                </div>
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl">{STAGES[active].name}</span>
                    <span className="font-mono text-neon-lime">PWR {STAGES[active].power}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      key={active + "-bar"}
                      initial={{ width: 0 }}
                      animate={{ width: `${STAGES[active].power}%` }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-neon-lime via-neon-cyan to-neon-pink"
                    />
                  </div>
                  <p className="text-sm text-white/65">{STAGES[active].desc}</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-2 bottom-2 w-px bg-white/10 overflow-hidden">
              <motion.div style={{ height: lineH }} className="w-full bg-gradient-to-b from-neon-purple via-neon-pink to-neon-cyan" />
            </div>
            <ul className="space-y-6">
              {STAGES.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.n}>
                    <button
                      onClick={() => setActive(i)}
                      className={`w-full text-left relative pl-16 pr-5 py-5 rounded-2xl transition-all ${
                        isActive ? "glass-strong shadow-glow" : "glass hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center font-display text-sm transition-all ${
                          isActive
                            ? "bg-gradient-to-tr from-neon-purple to-neon-pink text-white shadow-glow"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        {s.n}
                      </span>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-lg">{s.name}</span>
                        <span className="text-xs font-mono text-white/55">PWR {s.power}</span>
                      </div>
                      <p className="text-sm text-white/55 mt-1">{s.desc}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

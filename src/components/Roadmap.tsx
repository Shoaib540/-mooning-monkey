import { motion } from "framer-motion";
import { Check, Circle, Rocket } from "lucide-react";

const PHASES = [
  {
    q: "Q1 · Genesis",
    title: "The Birth of the Tribe",
    items: ["10K Genesis NFT mint on Solana", "$TAK token contract & airdrop", "Comic Chapter I 'Dark Days' release"],
    done: true,
  },
  {
    q: "Q2 · Awakening",
    title: "Holder Utilities Online",
    items: ["Daily $TAK rewards portal", "Stage 2 evolution mechanic", "Marketplace integrations (Magic Eden, Tensor)"],
    done: true,
  },
  {
    q: "Q3 · Crash Arena",
    title: "Play-to-Earn Goes Live",
    items: ["Crash Game public beta", "Comic Chapter II 'The Awakening'", "Holder-only VIP arena rooms"],
    done: false,
    active: true,
  },
  {
    q: "Q4 · Multiverse",
    title: "Full GameFi Universe",
    items: ["Stage 3 + 4 evolutions", "$TAK CEX listings", "DAO governance launch", "Comic Chapters III–IV"],
    done: false,
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative section-pad overflow-hidden">
      <div className="aurora opacity-30" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="chip mx-auto"><Rocket size={14} /> Roadmap</span>
          <h2 className="font-display text-4xl md:text-6xl">From mint to <span className="text-gradient">multiverse.</span></h2>
        </div>

        <div className="relative">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple via-neon-pink to-neon-cyan" />
          <ul className="space-y-12">
            {PHASES.map((p, i) => {
              const left = i % 2 === 0;
              return (
                <motion.li
                  key={p.q}
                  initial={{ opacity: 0, x: left ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 ${left ? "" : "md:[&>div:first-child]:order-2"}`}
                >
                  {/* node */}
                  <span className={`absolute left-5 md:left-1/2 -translate-x-1/2 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    p.done ? "bg-neon-lime border-neon-lime shadow-[0_0_20px_#c6ff3d]" :
                    p.active ? "bg-neon-pink border-neon-pink shadow-glowPink animate-pulse" :
                    "bg-bg2 border-white/30"
                  }`}>
                    {p.done && <Check size={12} className="text-black" />}
                  </span>

                  <div className={`pl-12 md:pl-0 ${left ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                    <div className="text-xs tracking-[0.3em] uppercase text-neon-cyan">{p.q}</div>
                    <h3 className="font-display text-2xl md:text-3xl mt-1">{p.title}</h3>
                  </div>
                  <div className={`pl-12 md:pl-0 mt-3 md:mt-0 ${left ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
                    <ul className={`glass rounded-2xl p-5 space-y-2 ${p.active ? "ring-1 ring-neon-pink/40" : ""}`}>
                      {p.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-sm text-white/75">
                          {p.done ? <Check size={14} className="text-neon-lime mt-0.5 flex-none" /> : <Circle size={12} className="text-white/40 mt-1 flex-none" />}
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Coins, Flame, Gift, Lock, Users, Zap } from "lucide-react";

const ALLOC = [
  { label: "Play-to-Earn Rewards", pct: 40, color: "#9b5cff" },
  { label: "Liquidity & Listings", pct: 20, color: "#3df0ff" },
  { label: "Holder Airdrops", pct: 15, color: "#ff4dd2" },
  { label: "Treasury & DAO", pct: 12, color: "#c6ff3d" },
  { label: "Team (locked 2y)", pct: 8, color: "#ffcf3d" },
  { label: "Marketing", pct: 5, color: "#7ad7ff" },
];

const UTILS = [
  { icon: Coins, t: "Gas of the Universe", d: "$TAK powers crash bets, evolutions, comic unlocks and marketplace fees." },
  { icon: Gift, t: "Daily Holder Drip", d: "NFT holders earn passive $TAK every day — no staking required." },
  { icon: Flame, t: "Deflationary Burn", d: "2% of every game pot is burned to keep $TAK scarcity rising." },
  { icon: Lock, t: "Governance & Voting", d: "Lock $TAK to vote on roadmap, comic arcs, and treasury moves." },
  { icon: Users, t: "Referral Rewards", d: "Bring friends to the arena and earn 5% of their $TAK forever." },
  { icon: Zap, t: "Boosted Multipliers", d: "Spend $TAK to increase your max crash multiplier ceiling." },
];

function Donut() {
  // build conic-gradient string
  let acc = 0;
  const stops = ALLOC.map((a) => {
    const start = acc;
    acc += a.pct;
    return `${a.color} ${start}% ${acc}%`;
  }).join(", ");
  return (
    <div className="relative w-72 h-72 mx-auto">
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: `conic-gradient(${stops})`, filter: "drop-shadow(0 0 30px rgba(155,92,255,0.45))" }}
      />
      <div className="absolute inset-6 rounded-full bg-bg2 flex flex-col items-center justify-center text-center">
        <div className="text-xs tracking-[0.3em] text-white/55 uppercase">Total Supply</div>
        <div className="font-display text-4xl text-gradient">100,000,000</div>
        <div className="text-xs text-white/55 mt-1">$TAK · TAKION</div>
      </div>
    </div>
  );
}

export default function Token() {
  return (
    <section id="token" className="relative section-pad overflow-hidden">
      <div className="aurora opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="chip mx-auto"><Coins size={14} /> Tokenomics · $TAK</span>
          <h2 className="font-display text-4xl md:text-6xl">The fuel of the <span className="text-gradient-gold">Takion economy.</span></h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Donut />
            <ul className="grid grid-cols-2 gap-3 mt-8 text-sm">
              {ALLOC.map((a) => (
                <li key={a.label} className="flex items-center gap-3 glass rounded-xl px-3 py-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: a.color, boxShadow: `0 0 12px ${a.color}` }} />
                  <span className="flex-1 text-white/75">{a.label}</span>
                  <span className="font-mono text-white">{a.pct}%</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {UTILS.map((u, i) => (
              <motion.div
                key={u.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="glass rounded-2xl p-5 hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-purple to-neon-pink flex items-center justify-center mb-3 shadow-glow">
                  <u.icon size={18} />
                </div>
                <div className="font-display text-lg mb-1">{u.t}</div>
                <p className="text-sm text-white/60 leading-relaxed">{u.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

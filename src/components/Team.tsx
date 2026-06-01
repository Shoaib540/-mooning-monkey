import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { ASSETS } from "../assets";

const TEAM = [
  { name: "Astra Vex", role: "Founder · Creative Director", bio: "Ex-Riot Games concept lead. Built the entire Mooning Monkey visual language.", monkey: 0 },
  { name: "Kairo Lin", role: "CTO · Smart Contracts", bio: "Solana core contributor. Architected the $TAK economy and crash arena RNG.", monkey: 3 },
  { name: "Nova Reyes", role: "Head of Gameplay", bio: "Designed 4 mobile titles at Supercell. Owns the play-to-earn loop balance.", monkey: 6 },
  { name: "Echo Tanaka", role: "Comic Showrunner", bio: "Illustrator behind two Eisner-nominated indie comics. Writes the canon.", monkey: 9 },
  { name: "Dax Mboya", role: "Community Lead", bio: "Built 3 web3 communities to 100k+ members. Lives in Discord 18 hrs a day.", monkey: 12 },
  { name: "Sable Voss", role: "Treasury & DAO", bio: "Former DeFi quant at Jump Crypto. Engineers the deflationary model.", monkey: 15 },
];

export default function Team() {
  return (
    <section id="team" className="relative section-pad overflow-hidden">
      <div className="aurora opacity-25" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14 space-y-4">
          <span className="chip mx-auto"><Users size={14} /> The Tribe Behind The Tribe</span>
          <h2 className="font-display text-4xl md:text-6xl">A team of <span className="text-gradient">veterans, not anons.</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">Doxxed leadership across gaming, smart contracts, and storytelling — all in on Mooning Monkey full-time.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-3xl p-5 hover:bg-white/[0.06] transition-colors"
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-pink/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-bg2 shadow-glow shrink-0">
                  <img src={ASSETS.monkeys[m.monkey]} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-lg leading-tight truncate">{m.name}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-neon-cyan mt-1">{m.role}</div>
                </div>
              </div>
              <p className="text-sm text-white/65 leading-relaxed">{m.bio}</p>
              <div className="mt-4 flex items-center gap-3 text-[11px] font-mono text-white/45">
                <span className="hover:text-white cursor-pointer">𝕏 @{m.name.split(" ")[0].toLowerCase()}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="hover:text-white cursor-pointer">linkedin</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

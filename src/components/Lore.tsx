import { motion } from "framer-motion";
import { ASSETS } from "../assets";
import { BookOpenText } from "lucide-react";

const CHAPTERS = [
  { n: "I", title: "Dark Days", desc: "An ancient meteor crashes on Earth's last colony, mutating a tribe of monkeys with cosmic radiation called TAKION." },
  { n: "II", title: "The Awakening", desc: "The chosen 10,000 are imprinted onto the Solana ledger and ascend into the Mooning Monkey collective." },
  { n: "III", title: "Crash Protocol", desc: "Driven by hunger for TAKION, the monkeys build a high-stakes arena where fortunes 1× to 100× in seconds." },
  { n: "IV", title: "New Genesis", desc: "Holders evolve into a player-owned multiverse — gaming, governance, and an open metaverse economy." },
];

export default function Lore() {
  return (
    <section id="lore" className="relative section-pad overflow-hidden">
      <div className="aurora opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="chip mx-auto"><BookOpenText size={14} /> The Comic Saga</span>
          <h2 className="font-display text-4xl md:text-6xl">A <span className="text-gradient">cinematic universe</span><br/>told across four chapters.</h2>
          <p className="text-white/60 max-w-2xl mx-auto">From asteroid impact to interstellar revolution — every NFT is a page of the story, every holder is a character in it.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative glass rounded-3xl overflow-hidden p-5 hover:border-white/30 transition-colors"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-neon-purple/40 to-neon-pink/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 ring-1 ring-white/10 bg-black">
                <img
                  src={ASSETS.collectionThumbs[i % ASSETS.collectionThumbs.length]}
                  alt={c.title}
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 font-display text-5xl text-gradient-gold drop-shadow-lg">{c.n}</div>
              </div>
              <h3 className="font-display text-xl mb-1">{c.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured story panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 grid md:grid-cols-2 gap-8 items-center glass-strong rounded-3xl overflow-hidden"
        >
          <div className="relative aspect-video md:aspect-auto md:h-full">
            <img src={ASSETS.sec3} alt="Lore panel" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
          </div>
          <div className="p-8 md:p-12 space-y-4">
            <div className="text-xs tracking-[0.3em] text-neon-cyan uppercase">Featured Issue</div>
            <h3 className="font-display text-3xl md:text-4xl">"They didn't fall from the moon. <span className="text-gradient">They were sent.</span>"</h3>
            <p className="text-white/65 leading-relaxed">
              Every Mooning Monkey holder owns a unique fragment of the canon. Buy a single page, an entire issue, or unlock the full digital comic to gain narrative privileges and on-chain governance rights.
            </p>
            <a href="#comic" className="btn-ghost mt-2 inline-flex">
              Open the comic vault
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

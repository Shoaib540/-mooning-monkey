import { motion } from "framer-motion";
import { ASSETS } from "../assets";
import { BookOpen, ExternalLink } from "lucide-react";

export default function Comic() {
  const pages = ASSETS.collectionThumbs;
  return (
    <section id="comic" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="chip"><BookOpen size={14} /> Comic Vault</span>
          <h2 className="font-display text-4xl md:text-6xl">Own a piece of the <span className="text-gradient-gold">canon.</span></h2>
          <p className="text-white/65 leading-relaxed">
            The Mooning Monkey saga unfolds across four illustrated chapters. Mint a single page, a full issue, or unlock the limited Genesis Collector edition for governance perks and royalty splits.
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>• 4 chapters · 96 hand-illustrated pages</li>
            <li>• Page-level NFTs with on-chain provenance</li>
            <li>• Collectors share in Mooning Monkey IP royalties</li>
            <li>• Animated issues drop alongside crash-arena seasons</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <a href={ASSETS.pdf} target="_blank" rel="noreferrer" className="btn-primary">
              Read 1-pager <ExternalLink size={16} />
            </a>
            <a href="#" className="btn-ghost">Open the vault</a>
          </div>
        </div>
        <div className="lg:col-span-7 relative">
          <div className="relative grid grid-cols-3 gap-3 perspective-1000">
            {pages.slice(0, 9).map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, rotateY: 20, y: 20 }}
                whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                whileHover={{ y: -8, rotateZ: i % 2 ? 1.5 : -1.5 }}
                className="relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-white/10 bg-bg2 shadow-glow"
              >
                <img src={p} alt={`Page ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent flex justify-between text-[10px] font-mono text-white/80">
                  <span>P. {String(i + 1).padStart(2, "0")}</span>
                  <span className="text-neon-lime">◎ {(0.15 + i * 0.04).toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
            <div className="absolute -inset-6 bg-gradient-to-tr from-neon-purple/20 via-transparent to-neon-pink/20 blur-3xl -z-10 rounded-[3rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}

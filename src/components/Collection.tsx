import { motion } from "framer-motion";
import { ASSETS } from "../assets";
import { Image as ImageIcon } from "lucide-react";

export default function Collection() {
  // Use the 24 monkey character images for a hover-reveal grid
  const items = ASSETS.monkeys.slice(0, 12);
  return (
    <section id="collection" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14 space-y-4">
          <span className="chip mx-auto"><ImageIcon size={14} /> Genesis Collection</span>
          <h2 className="font-display text-4xl md:text-6xl">10,000 hand-crafted <span className="text-gradient">monkeys.</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">Every monkey is a unique combination of 280+ traits — tribes, auras, accessories, and ultra-rare cosmic mutations.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {items.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 bg-bg2 aspect-square"
            >
              <img src={src} alt={`Monkey ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-xs">
                <span className="font-mono text-white">#{(1234 + i * 17).toString().padStart(4, "0")}</span>
                <span className="font-mono text-neon-lime">◎ {(2 + (i % 5) * 0.4).toFixed(2)}</span>
              </div>
              <div className="absolute top-2 left-2 chip text-[9px] !py-0.5 !px-2 !bg-black/50 !border-white/20">
                {["Lunar", "Plasma", "Void", "Solar"][i % 4]}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="text-white/55">Floor</span>
          <span className="font-mono text-neon-lime">◎ 4.20</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-white/55">Listed</span>
          <span className="font-mono text-white">3,481</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-white/55">Holders</span>
          <span className="font-mono text-white">5,712</span>
          <a href="#" className="ml-3 btn-ghost">Browse all 10,000 →</a>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-stage">
      <div
        className="pointer-events-none absolute inset-0 bg-hatch opacity-70"
        style={{ backgroundSize: "44px 44px" }}
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-5 pb-16 pt-28 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl font-extrabold leading-[0.92] tracking-tight text-mist sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Scale<span className="text-go">Gate</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-xl font-display text-2xl font-bold leading-tight text-mist sm:text-3xl md:text-4xl"
          >
            Know your max ad CPA before you scale
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-md text-base text-mute md:text-lg"
          >
            Factor COD fees, courier costs, and RTO — then see if your Facebook/TikTok CPA
            is still profitable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#calc" className="btn-primary">
              Run calculator <ArrowDown size={16} />
            </a>
            <a href="#pricing" className="btn-ghost">
              Pro — $27 lifetime
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="relative"
          aria-hidden
        >
          <div className="absolute -inset-8 bg-gradient-to-br from-go/20 via-transparent to-signal/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-md border border-white/10 bg-void-900/90 p-6 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-mute">
              Live verdict
            </p>
            <p className="mt-3 font-display text-4xl font-extrabold text-signal">KILL</p>
            <p className="mt-2 text-sm text-mist/80">
              CPA Rs 1,200 · max affordable Rs 780
            </p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[65%] origin-left animate-pulseBar rounded-full bg-signal" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="border border-white/10 bg-void-950/60 p-3">
                <p className="text-[10px] uppercase tracking-wider text-mute">Max CPA</p>
                <p className="mt-1 font-mono text-lg font-semibold text-go">Rs 780</p>
              </div>
              <div className="border border-white/10 bg-void-950/60 p-3">
                <p className="text-[10px] uppercase tracking-wider text-mute">BE ROAS</p>
                <p className="mt-1 font-mono text-lg font-semibold text-warn">3.6x</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { whatsAppLink } from "../lib/contact";
import { DAILY_TARGET_PKR } from "../lib/types";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-forge">
      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-5 pb-16 pt-28 md:grid-cols-[1.15fr_0.85fr] md:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Foran
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-xl font-display text-2xl font-bold leading-tight sm:text-3xl md:text-4xl"
          >
            Same-day AI work shops already pay for
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-md text-base text-fog md:text-lg"
          >
            Not another calculator SaaS. Productized jobs: listings, WhatsApp reply systems,
            inbox automation — priced so one order can clear ~Rs {DAILY_TARGET_PKR.toLocaleString()}+.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#packages" className="btn-primary">
              See packages <ArrowDown size={16} />
            </a>
            <a
              className="btn-ghost"
              href={whatsAppLink("I want the WhatsApp Reply System (Rs 12,000).")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Order on WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.75 }}
          className="relative"
          aria-hidden
        >
          <div className="absolute -inset-6 bg-blaze/20 blur-3xl" />
          <div className="relative border border-white/10 bg-ink-900/90 p-6 shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fog">
              Fastest path to cash
            </p>
            <ol className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="font-mono text-blaze">01</span>
                <span>Publish 3 Fiverr gigs (copy in Start today)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-blaze">02</span>
                <span>Send 20 WhatsApp messages to local shops</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-blaze">03</span>
                <span>Forward the brief here — delivery kit is ready</span>
              </li>
            </ol>
            <p className="mt-6 border-t border-white/10 pt-4 text-xs text-fog">
              Apps don’t pay on day one. Closed orders do.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

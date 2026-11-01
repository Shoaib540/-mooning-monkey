import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { money } from "../lib/format";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-hero-wash"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-soft opacity-60"
        style={{ backgroundSize: "48px 48px" }}
      />
      <div className="pointer-events-none absolute -right-24 top-16 h-[70vh] w-[55vw] rounded-full bg-marigold/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-5 pb-16 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pt-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Naya<span className="text-marigold">Bill</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-6 max-w-xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-4xl"
          >
            Get paid faster on WhatsApp
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="mt-4 max-w-md text-base text-mute md:text-lg"
          >
            Professional invoices with JazzCash, Easypaisa, bank & Payoneer — ready
            to send in 30 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#builder" className="btn-primary">
              Create free invoice
              <ArrowDown size={16} />
            </a>
            <a href="#pricing" className="btn-ghost">
              Go Pro — $19 lifetime
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          aria-hidden
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-marigold/25 via-transparent to-sea/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-sm bg-paper text-navy-950 shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-navy-950/10 px-6 py-4">
              <div>
                <p className="font-display text-lg font-extrabold tracking-tight">
                  NayaBill
                </p>
                <p className="text-xs text-navy-800/60">Invoice NB-20261101-482</p>
              </div>
              <span className="rounded bg-navy-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-marigold">
                Due
              </span>
            </div>
            <div className="space-y-5 px-6 py-6">
              <div className="flex justify-between gap-4 text-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-navy-800/45">
                    From
                  </p>
                  <p className="font-semibold">Shoaib Ahmad</p>
                  <p className="text-navy-800/60">Karachi</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-navy-800/45">
                    Bill to
                  </p>
                  <p className="font-semibold">Acme Studio</p>
                  <p className="text-navy-800/60">London</p>
                </div>
              </div>
              <div className="border-t border-dashed border-navy-950/15 pt-4">
                <div className="flex justify-between text-sm">
                  <span>Landing page redesign</span>
                  <span className="font-mono font-semibold">
                    {money(85000, "PKR")}
                  </span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span>WhatsApp automation setup</span>
                  <span className="font-mono font-semibold">
                    {money(25000, "PKR")}
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-between border-t border-navy-950/15 pt-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-sea/15 px-3 py-1 text-xs font-semibold text-[#0a6b62]">
                  <MessageCircle size={12} /> WhatsApp ready
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-navy-800/45">
                    Total
                  </p>
                  <p className="font-display text-3xl font-extrabold text-navy-950">
                    {money(110000, "PKR")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

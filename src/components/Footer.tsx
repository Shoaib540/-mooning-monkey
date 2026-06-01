import { MessageCircle, Send, ArrowUpRight, Globe, Hash } from "lucide-react";
import { ASSETS } from "../assets";

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10 px-5 overflow-hidden">
      <div className="aurora opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* CTA strip */}
        <div className="glass-strong rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center mb-16 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink blur-3xl opacity-30" />
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-neon-cyan mb-3">Join the tribe</div>
            <h3 className="font-display text-3xl md:text-5xl">Be there when the rocket leaves <span className="text-gradient">orbit.</span></h3>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="email"
              placeholder="your@wallet.email"
              className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-full px-5 py-4 outline-none text-white placeholder:text-white/40 focus:border-neon-purple"
            />
            <button className="btn-primary justify-center whitespace-nowrap shrink-0">Notify me <ArrowUpRight size={18} /></button>
          </form>
        </div>

        {/* Columns */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={ASSETS.logo} alt="" className="w-10 h-10 rounded-xl ring-1 ring-white/10" />
              <span className="font-display text-lg">MOONING<span className="text-neon-purple">.</span>MONKEY</span>
            </div>
            <p className="text-sm text-white/55">A Solana-native GameFi multiverse. Built by the tribe, for the tribe.</p>
            <div className="flex gap-2">
              {[Hash, MessageCircle, Send, Globe].map((I, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition">
                  <I size={16} />
                </a>
              ))}
            </div>
          </div>
          {[
            { h: "Universe", l: ["Lore", "Evolution", "Comic", "Roadmap"] },
            { h: "Economy", l: ["$TAK Tokenomics", "Crash Arena", "Marketplace", "Treasury"] },
            { h: "Resources", l: ["Whitepaper", "Brand kit", "Audit reports", "Help center"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="text-xs tracking-[0.3em] uppercase text-white/55 mb-4">{c.h}</div>
              <ul className="space-y-2 text-sm text-white/75">
                {c.l.map((x) => (
                  <li key={x}><a href="#" className="hover:text-white">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-line mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <div>© {new Date().getFullYear()} Mooning Monkey Labs · Built on Solana</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

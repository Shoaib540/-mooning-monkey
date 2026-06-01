import { motion, useScroll, useTransform } from "framer-motion";
import { ASSETS } from "../assets";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#lore", label: "Lore" },
  { href: "#evolution", label: "Evolution" },
  { href: "#token", label: "$TAK" },
  { href: "#game", label: "Crash Game" },
  { href: "#collection", label: "Collection" },
  { href: "#roadmap", label: "Roadmap" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 200], [6, 16]);
  const bg = useTransform(scrollY, [0, 200], ["rgba(8,6,14,0.20)", "rgba(8,6,14,0.65)"]);
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      style={{ backdropFilter: blur.get() ? `blur(${blur.get()}px)` : undefined, background: bg }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 shadow-glow">
            <img src={ASSETS.logo} alt="Mooning Monkey" className="w-full h-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold tracking-tight">MOONING<span className="text-neon-purple">.</span>MONKEY</div>
            <div className="text-[10px] tracking-[0.3em] text-white/50">SOLANA · GAMEFI</div>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-8 text-sm text-white/70">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative hover:text-white transition-colors">
                <span>{l.label}</span>
                <span className="absolute -bottom-1 left-0 right-0 h-px scale-x-0 origin-left bg-gradient-to-r from-neon-purple to-neon-pink transition-transform duration-300 hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#" className="btn-ghost text-sm">
            <span className="w-2 h-2 rounded-full bg-neon-lime shadow-[0_0_10px_#c6ff3d] animate-pulse" />
            Mint Live
          </a>
          <a href="#" className="btn-primary text-sm"><Wallet size={16} /> Connect Wallet</a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden glass-strong border-t border-white/5 px-5 py-6 space-y-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-white/80 text-base">
              {l.label}
            </a>
          ))}
          <a href="#" className="btn-primary w-full justify-center"><Wallet size={16} /> Connect Wallet</a>
        </div>
      )}
    </motion.nav>
  );
}

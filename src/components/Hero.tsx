import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles, Wallet } from "lucide-react";
import { useRef } from "react";
import { ASSETS } from "../assets";
import SplitWords from "./SplitWords";
import CountUp from "./CountUp";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Mouse-tilt for the NFT card (3D)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 120, damping: 15 });
  const rotY = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 120, damping: 15 });

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onCardLeave = () => { mx.set(0); my.set(0); };

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden pt-28 pb-16">
      {/* Background hero video — deferred for fast first paint */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 -z-10 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${ASSETS.heroMonkey})`, filter: "blur(40px) saturate(140%)" }}
        />
        <video
          src={ASSETS.heroVideo}
          autoPlay muted loop playsInline preload="metadata"
          poster={ASSETS.heroMonkey}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/65 to-bg" />
      </motion.div>
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto w-full px-5 grid lg:grid-cols-12 gap-10 items-center"
      >
        {/* LEFT — animated text */}
        <div className="lg:col-span-7 space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="chip"
          >
            <Sparkles size={14} className="text-neon-lime" />
            <span className="shine-text">New Era · Mint Phase 02 Live</span>
          </motion.div>

          <h1 className="font-display text-[44px] md:text-[80px] leading-[0.95] tracking-tight">
            <SplitWords
              as="span"
              text="The Mooning Monkey"
              className="block"
              highlight={[
                { word: "Mooning", node: <span className="text-gradient">Mooning</span> },
                { word: "Monkey", node: <span className="text-gradient">Monkey</span> },
              ]}
            />
            <SplitWords
              as="span"
              text="Multiverse Awakens."
              className="block"
              delay={0.4}
              highlight={[{ word: "Awakens.", node: <span className="text-gradient-gold">Awakens.</span> }]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-white/70 text-lg max-w-xl leading-relaxed"
          >
            A Solana-native GameFi universe where evolving NFTs, the
            <span className="text-neon-lime font-semibold"> $TAK </span>
            token, a crash-game economy, and a 4-chapter sci-fi comic collide
            into one cinematic player-owned franchise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#game" className="btn-primary group">
              Enter The Crash Arena
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#lore" className="btn-ghost"><Play size={16} /> Watch The Lore</a>
            <a href="#" className="btn-ghost"><Wallet size={16} /> Connect Wallet</a>
          </motion.div>

          {/* Animated stats with count-up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6"
          >
            {[
              { v: <CountUp end={10000} />, l: "Genesis Monkeys" },
              { v: <CountUp end={4} suffix=" Stages" />, l: "Evolution" },
              { v: <CountUp end={100} suffix="M" />, l: "$TAK Supply" },
              { v: <CountUp end={100} suffix="×" />, l: "Max Crash" },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl px-4 py-3 will-change-transform"
              >
                <div className="font-display text-2xl text-gradient">{s.v}</div>
                <div className="text-xs text-white/55 uppercase tracking-wider">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — animated NFT card with 3D tilt + orbit ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -25 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5 relative"
          style={{ perspective: 1200 }}
        >
          <div className="relative mx-auto max-w-md">
            {/* Outer glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 -z-10"
            >
              <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,#9b5cff,#ff4dd2,#3df0ff,#c6ff3d,#9b5cff)] opacity-30 blur-3xl" />
            </motion.div>

            {/* Orbiting ring with mini monkeys */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -z-0 hidden md:block"
            >
              <div className="relative w-full h-full">
                {[0, 90, 180, 270].map((deg, i) => (
                  <motion.div
                    key={deg}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${deg}deg) translate(220px) rotate(-${deg}deg) translate(-50%,-50%)`,
                    }}
                    className="origin-center"
                  >
                    <div className="w-12 h-12 rounded-full ring-2 ring-white/15 overflow-hidden bg-bg2 shadow-glow">
                      <img src={ASSETS.monkeys[i * 3]} alt="" className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tilt card */}
            <motion.div
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
              style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
              className="relative glass-strong rounded-[2rem] p-5 shadow-glow will-change-transform"
            >
              {/* Sheen overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] overflow-hidden">
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{ x: "120%" }}
                  transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </div>

              <div className="flex items-center justify-between mb-4 relative">
                <span className="chip">#0001 · Genesis</span>
                <span className="text-xs font-mono text-white/60">RARITY · 99.7</span>
              </div>

              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-neon-purple/30 to-neon-pink/30 ring-1 ring-white/10">
                <motion.img
                  src={ASSETS.heroMonkey}
                  alt="Genesis Monkey"
                  style={{ translateZ: 60 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full object-contain"
                />
                {/* scanline */}
                <motion.div
                  initial={{ y: "-20%" }}
                  animate={{ y: "120%" }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent pointer-events-none"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] tracking-widest text-white/60 uppercase">Holder</div>
                    <div className="font-mono text-sm">0xMOON…7AK</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] tracking-widest text-white/60 uppercase">Floor</div>
                    <div className="font-mono text-sm text-neon-lime">◎ 4.20</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                {[["Tribe", "Lunar"], ["Aura", "Plasma"], ["Stage", "II / IV"]].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-white/5 border border-white/10 px-2 py-1.5">
                    <div className="text-white/40 uppercase tracking-wider text-[9px]">{k}</div>
                    <div className="text-white font-semibold">{v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-white/55">Daily $TAK earnings</span>
                <span className="font-mono text-neon-lime"><CountUp end={42.69} decimals={2} prefix="+ " suffix=" / day" /></span>
              </div>
            </motion.div>

            {/* Floating mini-cards with animated counters */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{ x: { delay: 0.8, duration: 0.8 }, y: { duration: 4, repeat: Infinity } }}
              className="absolute -left-8 top-12 hidden md:block glass-strong rounded-2xl p-3 w-44 shadow-glowPink"
            >
              <div className="text-[10px] uppercase tracking-widest text-white/50">Last Crash</div>
              <div className="font-display text-2xl text-neon-pink">
                <CountUp end={12.48} decimals={2} suffix="×" />
              </div>
              <div className="text-[10px] text-white/45">+ 0.84 SOL · 3s ago</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0, y: [0, 12, 0] }}
              transition={{ x: { delay: 0.95, duration: 0.8 }, y: { duration: 5, repeat: Infinity } }}
              className="absolute -right-6 bottom-10 hidden md:block glass-strong rounded-2xl p-3 w-44 shadow-glowCyan"
            >
              <div className="text-[10px] uppercase tracking-widest text-white/50">Next Evolution</div>
              <div className="font-display text-lg text-gradient">Stage III</div>
              <div className="text-[10px] text-white/45">Unlocks in 18d 04h</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ y: { delay: 1.1, duration: 4.5, repeat: Infinity }, opacity: { delay: 1.1 } }}
              className="absolute right-8 -top-4 hidden md:flex items-center gap-2 glass rounded-full pl-2 pr-3 py-1.5 text-[11px]"
            >
              <span className="w-2 h-2 rounded-full bg-neon-lime shadow-[0_0_10px_#c6ff3d] animate-pulse" />
              <span className="font-mono text-white/80">LIVE · 1,284 online</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 text-[10px] tracking-[0.4em] flex flex-col items-center gap-2"
      >
        SCROLL
        <span className="block w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ASSETS } from "../assets";

/**
 * Cinematic preloader: shows a glowing rotating monkey + count-up progress.
 * Hides after window 'load' event OR after a minimum dwell time (whichever is later).
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const minDwell = 1300; // ms — give the brand a moment to land
    const start = performance.now();

    // animated progress
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(98, (elapsed / minDwell) * 100);
      setProgress(pct);
      if (visible) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      const wait = Math.max(0, minDwell - (performance.now() - start));
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
        }, 350);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        >
          {/* Aurora background */}
          <div className="aurora" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(60% 50% at 50% 50%, rgba(155,92,255,0.25), transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            {/* Logo + orbit ring */}
            <div className="relative w-32 h-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #9b5cff, #ff4dd2, #3df0ff, #c6ff3d, #9b5cff)",
                  filter: "blur(14px)",
                  opacity: 0.55,
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-white/20"
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 rounded-full overflow-hidden ring-2 ring-white/20 bg-bg2 shadow-glow"
              >
                <img src={ASSETS.logo} alt="Mooning Monkey" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* Wordmark */}
            <div className="text-center space-y-2">
              <div className="font-display text-2xl md:text-3xl tracking-tight">
                MOONING<span className="text-neon-purple">.</span>MONKEY
              </div>
              <div className="text-[10px] tracking-[0.5em] uppercase text-white/55">
                Initialising · Takion Protocol
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-64 max-w-[80vw] space-y-2">
              <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan rounded-full"
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/55">
                <span>LOADING ASSETS</span>
                <span>{Math.floor(progress).toString().padStart(3, "0")}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

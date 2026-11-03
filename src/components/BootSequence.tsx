import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "Booting Stonic neural substrate…",
  "Calibrating voice matrix…",
  "Loading memory lattice…",
  "Linking desktop interface…",
  "Synchronizing HUD panels…",
  "Core online. Awaiting commander.",
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setIndex((i) => Math.min(i + 1, LINES.length - 1));
    }, 520);
    const progressTimer = window.setInterval(() => {
      setProgress((p) => Math.min(p + 2.2, 100));
    }, 60);
    const done = window.setTimeout(onDone, 3400);
    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-void"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-grid bg-[size:48px_48px] opacity-30" />
        <div className="absolute inset-0 scanlines opacity-40" />
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent"
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 w-[min(560px,92vw)] px-6 text-center">
          <motion.p
            className="font-display text-4xl tracking-[0.35em] text-cyan md:text-5xl"
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.1 }}
          >
            STONIC
          </motion.p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.4em] text-mute">
            Generation 3 · Desktop Intelligence
          </p>

          <div className="mt-10 h-1.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-deep via-cyan to-amber"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 min-h-[1.5rem] font-mono text-sm text-cyan-soft">
            {LINES[index]}
          </div>

          <button
            className="no-drag mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-mute transition hover:text-cyan"
            onClick={onDone}
          >
            Skip intro
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

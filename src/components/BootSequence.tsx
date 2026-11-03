import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "Igniting Shoaib core…",
  "Binding live weather + news meshes…",
  "Calibrating voice channel…",
  "Mounting memory lattice…",
  "Desktop bridge ready.",
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setIndex((i) => Math.min(i + 1, LINES.length - 1));
    }, 480);
    const progressTimer = window.setInterval(() => {
      setProgress((p) => Math.min(p + 2.4, 100));
    }, 55);
    const done = window.setTimeout(onDone, 3000);
    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-grid bg-[size:42px_42px] opacity-40" />

      <div className="relative z-10 w-[min(560px,92vw)] px-6 text-center">
        <motion.p
          className="font-display text-5xl font-extrabold tracking-tight text-ink md:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Shoaib
        </motion.p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.35em] text-signal">
          Personal Desktop Intelligence
        </p>

        <div className="mt-10 h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-signal-deep via-signal to-platinum"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-5 min-h-[1.4rem] font-mono text-sm text-mute">{LINES[index]}</p>
        <button
          className="no-drag mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-mute transition hover:text-signal"
          onClick={onDone}
        >
          Skip intro
        </button>
      </div>
    </motion.div>
  );
}

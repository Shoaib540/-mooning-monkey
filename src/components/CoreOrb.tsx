import { motion } from "framer-motion";
import clsx from "clsx";
import type { AssistantState, VoiceGender } from "../types";

export default function CoreOrb({
  state,
  gender,
  name,
  onTap,
}: {
  state: AssistantState;
  gender: VoiceGender;
  name: string;
  onTap: () => void;
}) {
  const listening = state === "listening";
  const speaking = state === "speaking";
  const thinking = state === "thinking";

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute h-[420px] w-[420px] rounded-full bg-radar opacity-70 blur-2xl" />

      <button
        onClick={onTap}
        className="group relative flex h-[280px] w-[280px] items-center justify-center md:h-[340px] md:w-[340px]"
        aria-label="Activate voice"
      >
        <div
          className={clsx(
            "absolute inset-0 rounded-full border border-cyan/20 animate-spinSlow",
            listening && "border-cyan/50",
          )}
          style={{
            background:
              "conic-gradient(from 90deg, transparent, rgba(86,214,255,0.25), transparent 40%)",
          }}
        />
        <div className="absolute inset-6 rounded-full border border-dashed border-cyan/25 animate-spinMed" />
        <div
          className={clsx(
            "absolute inset-14 rounded-full border border-cyan/30 animate-pulseRing",
            speaking && "border-amber/60",
          )}
        />

        <motion.div
          className={clsx(
            "relative z-10 flex h-40 w-40 items-center justify-center rounded-full shadow-orb md:h-48 md:w-48",
            gender === "female"
              ? "bg-[radial-gradient(circle_at_35%_30%,#9ae8ff,#1090c8_45%,#06101a_78%)]"
              : "bg-[radial-gradient(circle_at_35%_30%,#ffe0a3,#1090c8_42%,#06101a_78%)]",
          )}
          animate={{
            scale: listening ? [1, 1.06, 1] : speaking ? [1, 1.04, 1] : 1,
          }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <div className="absolute inset-3 rounded-full border border-white/10" />
          <div className="absolute inset-0 overflow-hidden rounded-full scanlines opacity-30" />
          <div className="relative text-center">
            <p className="font-display text-lg tracking-[0.28em] text-white md:text-xl">
              {name.toUpperCase()}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
              {listening
                ? "Listening"
                : thinking
                  ? "Thinking"
                  : speaking
                    ? "Speaking"
                    : "Ready"}
            </p>
          </div>
        </motion.div>

        {(listening || speaking) &&
          Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-2 w-2 rounded-full bg-cyan"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-150px)`,
                opacity: 0.35 + (i % 3) * 0.2,
                boxShadow: "0 0 12px #56d6ff",
              }}
            />
          ))}
      </button>

      <p className="mt-4 max-w-sm text-center font-body text-base text-mute">
        Tap the core or press{" "}
        <span className="text-cyan">Ctrl+Shift+S</span> to talk. Ask me to open
        YouTube, search the web, or remember something.
      </p>
    </div>
  );
}

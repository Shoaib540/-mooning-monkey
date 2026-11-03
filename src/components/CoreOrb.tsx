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
      <div className="absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(184,255,60,0.16),transparent_60%)] blur-2xl" />

      <button
        onClick={onTap}
        className="group relative flex h-[280px] w-[280px] items-center justify-center md:h-[340px] md:w-[340px]"
        aria-label="Activate voice"
      >
        <div className="absolute inset-0 rounded-full border border-signal/20 animate-spinSlow" />
        <div className="absolute inset-7 rounded-full border border-dashed border-platinum/20 animate-spinMed" />
        <div
          className={clsx(
            "absolute inset-14 rounded-full border border-signal/30 animate-pulseRing",
            speaking && "border-amber/70",
          )}
        />

        <motion.div
          className={clsx(
            "relative z-10 flex h-40 w-40 items-center justify-center rounded-full shadow-orb md:h-48 md:w-48",
            gender === "female"
              ? "bg-[radial-gradient(circle_at_35%_30%,#d8ff8f,#6fad12_48%,#0b1208_80%)]"
              : "bg-[radial-gradient(circle_at_35%_30%,#eef3f0,#b8ff3c_40%,#101318_78%)]",
          )}
          animate={{
            scale: listening ? [1, 1.06, 1] : speaking ? [1, 1.04, 1] : 1,
          }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <div className="absolute inset-3 rounded-full border border-white/10" />
          <div className="relative text-center">
            <p className="font-display text-xl font-bold tracking-tight text-void md:text-2xl">
              {name}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-void/70">
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
      </button>

      <p className="mt-4 max-w-md text-center font-body text-base text-mute">
        Tap the core or press <span className="text-signal">Ctrl+Shift+S</span>. Try
        “play music”, “play Believer”, “weather in Karachi”, or “world news”.
      </p>
    </div>
  );
}

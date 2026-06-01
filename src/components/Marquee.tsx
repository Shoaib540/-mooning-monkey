import { Star } from "lucide-react";

const ITEMS = [
  "PLAY · EVOLVE · EARN",
  "$TAK · TAKION ECONOMY",
  "GENESIS · 10,000 MONKEYS",
  "CRASH · 1% – 100×",
  "FOUR CHAPTERS OF LORE",
  "SOLANA NATIVE",
  "HOLDERS GET DAILY REWARDS",
];

export default function Marquee() {
  const row = (
    <div className="marquee-track py-6">
      {[...ITEMS, ...ITEMS].map((t, i) => (
        <span key={i} className="flex items-center gap-4 whitespace-nowrap font-display text-2xl md:text-4xl text-white/85">
          {t}
          <Star size={18} className="text-neon-pink" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative border-y border-white/10 bg-gradient-to-r from-neon-purple/10 via-transparent to-neon-pink/10 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />
      {row}
    </div>
  );
}

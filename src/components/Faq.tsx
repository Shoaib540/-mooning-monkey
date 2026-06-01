import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "What exactly is Mooning Monkey?",
    a: "A Solana-native multiverse combining a 10,000-NFT genesis collection, a deflationary $TAK token, a live crash-game arena, and a 4-chapter sci-fi comic. Holders earn rewards, vote on the roadmap, and own slices of the IP royalties.",
  },
  {
    q: "How do I mint a Genesis Monkey?",
    a: "Mint goes live in two phases. Phase 01 is the allowlist (free + gas, max 2 per wallet). Phase 02 is public at 0.69 SOL. Connect a Solana wallet from this site to check eligibility once mint opens.",
  },
  {
    q: "What can I do with $TAK?",
    a: "$TAK is the fuel of the Takion economy. Use it to place crash bets, evolve your monkey to higher stages, unlock comic chapters, vote in DAO proposals, and boost your daily reward multiplier.",
  },
  {
    q: "Is the crash game gambling? Is it legal where I live?",
    a: "The crash arena is a skill-meets-luck game with provably-fair on-chain RNG. Availability depends on your jurisdiction — geo-checks are enforced at the smart-contract level. Always play responsibly and only with funds you can afford to lose.",
  },
  {
    q: "How does the 4-stage evolution work?",
    a: "Burn 2 lower-stage monkeys + a $TAK fee to evolve to the next stage. Each upgrade boosts daily reward rate, unlocks new gameplay tiers, and grants rarer aesthetics. Only 300 monkeys will ever reach Stage IV (Cosmic).",
  },
  {
    q: "Who owns the comic and the IP?",
    a: "The community does. The DAO treasury owns the master IP; holders of Stage III+ monkeys and comic-page NFTs share in licensing revenue forever (Bored Ape-style, but split more fairly).",
  },
  {
    q: "What chains is this on? Will it bridge to Ethereum?",
    a: "We're Solana-first for speed and fees. ETH and Base bridges are scoped for Q4 via Wormhole — your monkey will remain mintable cross-chain without losing its Solana origin metadata.",
  },
  {
    q: "Is the team doxxed? Are contracts audited?",
    a: "Yes to both. Leadership is fully doxxed with linked socials (see the Team section above). Smart contracts are audited by CertiK with the report published on GitHub before mint.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14 space-y-4">
          <span className="chip mx-auto"><HelpCircle size={14} /> Frequently Asked</span>
          <h2 className="font-display text-4xl md:text-6xl">Everything you need to know <span className="text-gradient">before the launch.</span></h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`glass rounded-2xl overflow-hidden transition-colors ${isOpen ? "bg-white/[0.06] ring-1 ring-white/15" : ""}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-base md:text-lg leading-snug">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isOpen ? "bg-gradient-to-tr from-neon-purple to-neon-pink shadow-glow" : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                    >
                      <div className="px-5 pb-5 -mt-1 text-sm text-white/70 leading-relaxed">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-white/55">Still curious? Pop into our Discord — devs and founders reply daily.</p>
          <a href="#" className="btn-primary mt-4 inline-flex">Join the conversation</a>
        </div>
      </div>
    </section>
  );
}

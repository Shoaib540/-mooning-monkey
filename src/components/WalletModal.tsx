import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConnected: (address: string) => void;
}

type Step = "select" | "approving" | "success";

const WALLETS = [
  { id: "phantom", name: "Phantom", tag: "Most popular", color: "#ab9ff2", icon: "👻" },
  { id: "solflare", name: "Solflare", tag: "Recommended", color: "#ffae35", icon: "🔥" },
  { id: "backpack", name: "Backpack", tag: "Mobile-ready", color: "#e33e3f", icon: "🎒" },
  { id: "ledger", name: "Ledger", tag: "Hardware", color: "#888", icon: "🔒" },
];

export default function WalletModal({ open, onClose, onConnected }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStep("select");
      setSelected(null);
    }
  }, [open]);

  const handleSelect = (id: string) => {
    setSelected(id);
    setStep("approving");
    // simulate signature request
    setTimeout(() => {
      setStep("success");
      // generate mock address
      const addr = "0x" + Math.random().toString(16).slice(2, 6).toUpperCase() + "…" + Math.random().toString(16).slice(2, 5).toUpperCase();
      setTimeout(() => {
        onConnected(addr);
      }, 900);
    }, 1600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative w-full max-w-md glass-strong rounded-3xl p-6 md:p-8 shadow-glow border border-white/10"
          >
            <div className="absolute -inset-px rounded-3xl pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(155,92,255,0.25), transparent 50%)" }} />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
            >
              <X size={16} />
            </button>

            {step === "select" && (
              <div className="space-y-5 relative">
                <div className="space-y-2">
                  <div className="text-xs tracking-[0.3em] uppercase text-neon-cyan">Step 01 · Choose</div>
                  <h3 className="font-display text-2xl md:text-3xl">Connect your wallet</h3>
                  <p className="text-sm text-white/55">Pick a Solana wallet to enter the Mooning Monkey arena. We never read your private keys.</p>
                </div>

                <div className="space-y-2">
                  {WALLETS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => handleSelect(w.id)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 hover:bg-white/[0.07] transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                          style={{ background: `${w.color}22`, boxShadow: `0 0 20px ${w.color}40` }}
                        >
                          {w.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-display text-base">{w.name}</div>
                          <div className="text-[10px] tracking-wider uppercase text-white/45">{w.tag}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-white/40 group-hover:text-white">→</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-white/45">
                  <ShieldCheck size={14} className="text-neon-lime" />
                  <span>Audited by CertiK · Non-custodial · Demo mode</span>
                </div>
              </div>
            )}

            {step === "approving" && (
              <div className="text-center py-6 space-y-5">
                <div className="relative mx-auto w-20 h-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon-purple border-r-neon-pink"
                  />
                  <div className="absolute inset-2 rounded-full bg-bg2 flex items-center justify-center">
                    <Loader2 size={24} className="text-neon-cyan animate-spin" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl">Awaiting signature…</h3>
                  <p className="text-sm text-white/55 mt-2">Approve the connection in <span className="text-white">{WALLETS.find((w) => w.id === selected)?.name}</span> to continue.</p>
                </div>
                <div className="text-[11px] font-mono text-white/40">No transaction · No gas</div>
              </div>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-5"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-neon-lime to-neon-cyan flex items-center justify-center shadow-glow"
                >
                  <CheckCircle2 size={36} className="text-black" />
                </motion.div>
                <div>
                  <h3 className="font-display text-2xl">Welcome to the tribe</h3>
                  <p className="text-sm text-white/55 mt-2">Connecting your evolution dashboard…</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

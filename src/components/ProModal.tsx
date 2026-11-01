import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { checkoutUrl, verifyProCode } from "../lib/pro";
import { unlockPro } from "../lib/storage";
import { PRO_PRICE_USD } from "../lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onUnlocked: () => void;
};

export default function ProModal({ open, onClose, onUnlocked }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!verifyProCode(code)) {
      setError("Invalid code. Check your purchase email.");
      return;
    }
    unlockPro();
    onUnlocked();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="pro-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="w-full max-w-md border border-white/10 bg-void-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="pro-title" className="font-display text-2xl font-extrabold text-mist">
                  Unlock ScaleGate Pro
                </h2>
                <p className="mt-2 text-sm text-mute">
                  ${PRO_PRICE_USD} lifetime. After payment you get an unlock code.
                </p>
              </div>
              <button type="button" className="btn-ghost !px-2 !py-2" onClick={onClose} aria-label="Close">
                <X size={16} />
              </button>
            </div>

            <a
              href={checkoutUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full"
            >
              Pay ${PRO_PRICE_USD}
            </a>

            <form onSubmit={submit} className="mt-5 space-y-3">
              <div>
                <label className="label" htmlFor="pro-code">Already paid? Enter code</label>
                <input
                  id="pro-code"
                  className="field"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError(null);
                  }}
                  placeholder="SCALE-XXXX"
                  autoComplete="off"
                />
              </div>
              {error && <p className="text-sm text-signal">{error}</p>}
              <button type="submit" className="btn-ghost w-full">
                Activate Pro
              </button>
              <p className="text-center text-[11px] text-mute">
                Demo: <span className="font-mono text-mist">SCALE-DEMO-2026</span>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

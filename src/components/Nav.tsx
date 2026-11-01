import { Lock, Unlock } from "lucide-react";

type Props = {
  isPro: boolean;
  onUnlock: () => void;
};

export default function Nav({ isPro, onUnlock }: Props) {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight text-mist md:text-2xl">
          Scale<span className="text-go">Gate</span>
        </a>
        <nav className="flex items-center gap-2 md:gap-3">
          <a href="#calc" className="hidden text-sm font-medium text-mute hover:text-mist sm:inline">
            Calculator
          </a>
          <a href="#pricing" className="hidden text-sm font-medium text-mute hover:text-mist sm:inline">
            Pricing
          </a>
          {isPro ? (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-go/40 bg-go/10 px-3 py-1.5 text-xs font-bold text-go">
              <Unlock size={14} /> Pro
            </span>
          ) : (
            <button type="button" onClick={onUnlock} className="btn-ghost !px-3 !py-2 text-xs md:text-sm">
              <Lock size={14} /> Unlock Pro
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

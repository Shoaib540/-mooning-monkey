import { Lock, Unlock } from "lucide-react";

type Props = {
  isPro: boolean;
  onUnlock: () => void;
};

export default function Nav({ isPro, onUnlock }: Props) {
  return (
    <header className="no-print absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
          Naya<span className="text-marigold">Bill</span>
        </a>
        <nav className="flex items-center gap-2 md:gap-3">
          <a href="#builder" className="hidden text-sm font-medium text-mute hover:text-ink sm:inline">
            Create
          </a>
          <a href="#pricing" className="hidden text-sm font-medium text-mute hover:text-ink sm:inline">
            Pricing
          </a>
          {isPro ? (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-sea/40 bg-sea/10 px-3 py-1.5 text-xs font-bold text-sea">
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

import { Minus, Square, X } from "lucide-react";
import { useClock } from "../hooks/useClock";

const isDesktop = Boolean(window.shoaibDesktop?.isDesktop);

export default function TitleBar() {
  const now = useClock();

  return (
    <header className="drag-region relative z-40 flex h-12 items-center justify-between border-b border-line bg-void/75 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal text-void font-display text-xs font-bold">
          S
        </div>
        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-ink">Shoaib</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            Desktop Intelligence
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-5 md:flex">
        <p className="font-mono text-xs text-mute">
          {now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
        </p>
        <p className="font-display text-sm tracking-wide text-signal">
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
      </div>

      <div className="no-drag flex items-center gap-1">
        {isDesktop ? (
          <>
            <button className="rounded-lg p-1.5 text-mute hover:bg-white/5 hover:text-ink" onClick={() => window.shoaibDesktop?.minimize()} aria-label="Minimize">
              <Minus size={14} />
            </button>
            <button className="rounded-lg p-1.5 text-mute hover:bg-white/5 hover:text-ink" onClick={() => window.shoaibDesktop?.maximize()} aria-label="Maximize">
              <Square size={12} />
            </button>
            <button className="rounded-lg p-1.5 text-mute hover:bg-rose/20 hover:text-rose" onClick={() => window.shoaibDesktop?.close()} aria-label="Close">
              <X size={14} />
            </button>
          </>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Browser Mode</span>
        )}
      </div>
    </header>
  );
}

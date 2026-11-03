import { Minus, Square, X } from "lucide-react";
import { useClock } from "../hooks/useClock";

const isDesktop = Boolean(window.stonicDesktop?.isDesktop);

export default function TitleBar() {
  const now = useClock();

  return (
    <header className="drag-region relative z-40 flex h-11 items-center justify-between border-b border-line bg-void/70 px-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-cyan/40 bg-cyan/10 font-display text-[10px] text-cyan">
          S
        </div>
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-cyan">
            Stonic AI
          </p>
          <p className="font-mono text-[10px] text-mute">Gen 3 · Desktop Core</p>
        </div>
      </div>

      <div className="hidden items-center gap-6 md:flex">
        <p className="font-mono text-xs text-mute">
          {now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
        </p>
        <p className="font-display text-sm tracking-[0.12em] text-ink">
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
      </div>

      <div className="no-drag flex items-center gap-1">
        {isDesktop ? (
          <>
            <button
              className="rounded p-1.5 text-mute transition hover:bg-white/5 hover:text-ink"
              onClick={() => window.stonicDesktop?.minimize()}
              aria-label="Minimize"
            >
              <Minus size={14} />
            </button>
            <button
              className="rounded p-1.5 text-mute transition hover:bg-white/5 hover:text-ink"
              onClick={() => window.stonicDesktop?.maximize()}
              aria-label="Maximize"
            >
              <Square size={12} />
            </button>
            <button
              className="rounded p-1.5 text-mute transition hover:bg-rose/20 hover:text-rose"
              onClick={() => window.stonicDesktop?.close()}
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
            Browser Mode
          </span>
        )}
      </div>
    </header>
  );
}

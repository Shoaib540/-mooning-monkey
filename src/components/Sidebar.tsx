import clsx from "clsx";
import {
  Brain,
  Globe2,
  LayoutDashboard,
  ListTodo,
  MessageSquareText,
  Music2,
  Settings2,
} from "lucide-react";
import type { ViewId } from "../types";

const ITEMS: Array<{ id: ViewId; label: string; icon: typeof Globe2 }> = [
  { id: "core", label: "Core", icon: LayoutDashboard },
  { id: "chat", label: "Chat", icon: MessageSquareText },
  { id: "world", label: "World", icon: Globe2 },
  { id: "music", label: "Music", icon: Music2 },
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "memory", label: "Memory", icon: Brain },
  { id: "settings", label: "Settings", icon: Settings2 },
];

export default function Sidebar({
  view,
  onChange,
}: {
  view: ViewId;
  onChange: (id: ViewId) => void;
}) {
  return (
    <aside className="flex w-[92px] flex-col items-center gap-2 border-r border-line bg-void/40 py-4 backdrop-blur-md md:w-[112px]">
      {ITEMS.map(({ id, label, icon: Icon }) => {
        const active = view === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={clsx(
              "group relative flex w-[76px] flex-col items-center gap-1 rounded-xl px-2 py-3 transition md:w-[88px]",
              active
                ? "bg-signal/10 text-signal shadow-hud"
                : "text-mute hover:bg-white/5 hover:text-ink",
            )}
          >
            {active && (
              <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r bg-signal shadow-[0_0_12px_#b8ff3c]" />
            )}
            <Icon size={18} strokeWidth={1.7} />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em]">{label}</span>
          </button>
        );
      })}
      <div className="mt-auto px-2 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mute/70">
          Ctrl+Shift+S
        </p>
        <p className="font-mono text-[9px] text-mute/50">Voice</p>
      </div>
    </aside>
  );
}

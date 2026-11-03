import clsx from "clsx";
import {
  Brain,
  Globe2,
  LayoutDashboard,
  MessageSquareText,
  Settings2,
  ListTodo,
} from "lucide-react";
import type { ViewId } from "../types";

const ITEMS: Array<{ id: ViewId; label: string; icon: typeof Globe2 }> = [
  { id: "core", label: "Core", icon: LayoutDashboard },
  { id: "chat", label: "Chat", icon: MessageSquareText },
  { id: "world", label: "World", icon: Globe2 },
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
    <aside className="flex w-[88px] flex-col items-center gap-2 border-r border-line bg-void/50 py-4 backdrop-blur-md md:w-[108px]">
      {ITEMS.map(({ id, label, icon: Icon }) => {
        const active = view === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={clsx(
              "group relative flex w-[72px] flex-col items-center gap-1 rounded-sm px-2 py-3 transition md:w-[84px]",
              active
                ? "bg-cyan/10 text-cyan shadow-hud"
                : "text-mute hover:bg-white/5 hover:text-ink",
            )}
          >
            {active && (
              <span className="absolute left-0 top-2 bottom-2 w-[2px] bg-cyan shadow-[0_0_12px_#56d6ff]" />
            )}
            <Icon size={18} strokeWidth={1.7} />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              {label}
            </span>
          </button>
        );
      })}
      <div className="mt-auto px-2 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute/70">
          Ctrl+Shift+S
        </p>
        <p className="font-mono text-[9px] text-mute/50">Voice</p>
      </div>
    </aside>
  );
}

import { useState } from "react";
import type { FormEvent } from "react";
import { Trash2 } from "lucide-react";
import type { MemoryItem } from "../types";

export default function MemoryPanel({
  memory,
  onAdd,
  onRemove,
  onClear,
}: {
  memory: MemoryItem[];
  onAdd: (key: string, value: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const [key, setKey] = useState("preference");
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(key.trim() || "note", value.trim());
    setValue("");
  };

  return (
    <div className="hud-panel flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="hud-label">Persistent Memory</p>
          <p className="hud-title mt-1">Known Context</p>
        </div>
        <button
          onClick={onClear}
          className="rounded-sm border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mute hover:text-rose"
        >
          Clear all
        </button>
      </div>

      <form onSubmit={submit} className="grid gap-2 border-b border-line p-4 md:grid-cols-[140px_1fr_auto]">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="rounded-sm border border-line bg-void/60 px-3 py-2 font-mono text-sm outline-none focus:border-cyan/40"
          placeholder="Key"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-sm border border-line bg-void/60 px-3 py-2 font-body text-base outline-none focus:border-cyan/40"
          placeholder="Remember something…"
        />
        <button className="rounded-sm border border-cyan/40 bg-cyan/10 px-4 font-mono text-xs uppercase tracking-[0.18em] text-cyan">
          Save
        </button>
      </form>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {memory.length === 0 && (
          <p className="font-mono text-sm text-mute">
            Memory is empty. Say “remember that I like jazz” or add a note here.
          </p>
        )}
        {memory.map((m) => (
          <div key={m.id} className="flex items-start justify-between gap-3 rounded-sm border border-line bg-void/40 p-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                {m.key}
              </p>
              <p className="mt-1 font-body text-base text-ink">{m.value}</p>
            </div>
            <button onClick={() => onRemove(m.id)} className="text-mute hover:text-rose">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

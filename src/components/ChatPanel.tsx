import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Mic, MicOff, Send, Trash2, VolumeX } from "lucide-react";
import type { AssistantState, ChatMessage } from "../types";

export default function ChatPanel({
  messages,
  state,
  onSend,
  onListen,
  onStopSpeak,
  onClear,
  compact = false,
}: {
  messages: ChatMessage[];
  state: AssistantState;
  onSend: (text: string) => void;
  onListen: () => void;
  onStopSpeak: () => void;
  onClear: () => void;
  compact?: boolean;
}) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, state]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className={compact ? "flex h-full flex-col" : "hud-panel flex h-full flex-col"}>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="hud-label">Core Chat</p>
          <p className="hud-title mt-1">Conversation Stream</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onStopSpeak}
            className="rounded-sm border border-line p-2 text-mute hover:text-ink"
            title="Stop speaking"
          >
            <VolumeX size={14} />
          </button>
          <button
            onClick={onClear}
            className="rounded-sm border border-line p-2 text-mute hover:text-rose"
            title="Clear chat"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className="font-mono text-sm text-mute">
            No messages yet. Say “hello”, “open youtube”, or ask anything.
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "ml-8 rounded-sm border border-cyan/20 bg-cyan/5 px-3 py-2"
                : m.role === "system"
                  ? "rounded-sm border border-amber/20 bg-amber/5 px-3 py-2"
                  : "mr-8 rounded-sm border border-line bg-panel2/80 px-3 py-2"
            }
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
              {m.role}
            </p>
            <p className="mt-1 whitespace-pre-wrap font-body text-[15px] leading-relaxed text-ink">
              {m.content}
            </p>
          </div>
        ))}
        {state === "thinking" && (
          <p className="font-mono text-xs text-cyan animate-pulse">Synthesizing reply…</p>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="flex gap-2 border-t border-line p-3">
        <button
          type="button"
          onClick={onListen}
          className={
            state === "listening"
              ? "rounded-sm border border-cyan bg-cyan/15 px-3 text-cyan"
              : "rounded-sm border border-line px-3 text-mute hover:text-ink"
          }
          title="Voice input"
        >
          {state === "listening" ? <Mic size={16} /> : <MicOff size={16} />}
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Command or conversation…"
          className="flex-1 rounded-sm border border-line bg-void/60 px-3 py-2 font-body text-base text-ink outline-none placeholder:text-mute/60 focus:border-cyan/50"
        />
        <button
          type="submit"
          className="rounded-sm border border-cyan/40 bg-cyan/10 px-3 text-cyan hover:bg-cyan/20"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

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
}: {
  messages: ChatMessage[];
  state: AssistantState;
  onSend: (text: string) => void;
  onListen: () => void;
  onStopSpeak: () => void;
  onClear: () => void;
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
    <div className="hud-panel flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="hud-label">Conversation</p>
          <p className="hud-title">Live stream</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onStopSpeak} className="rounded-xl border border-line p-2 text-mute hover:text-ink" title="Stop speaking">
            <VolumeX size={14} />
          </button>
          <button onClick={onClear} className="rounded-xl border border-line p-2 text-mute hover:text-rose" title="Clear chat">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className="font-mono text-sm text-mute">
            Ask for live weather, news, crypto, Wikipedia, system status, or just talk.
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "ml-8 rounded-2xl border border-signal/20 bg-signal/5 px-3 py-2"
                : m.role === "system"
                  ? "rounded-2xl border border-amber/20 bg-amber/5 px-3 py-2"
                  : "mr-8 rounded-2xl border border-line bg-panel2/80 px-3 py-2"
            }
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{m.role}</p>
            <p className="mt-1 whitespace-pre-wrap font-body text-[15px] leading-relaxed text-ink">
              {m.content}
            </p>
          </div>
        ))}
        {state === "thinking" && (
          <p className="animate-pulse font-mono text-xs text-signal">Working…</p>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="flex gap-2 border-t border-line p-3">
        <button
          type="button"
          onClick={onListen}
          className={
            state === "listening"
              ? "rounded-xl border border-signal bg-signal/15 px-3 text-signal"
              : "rounded-xl border border-line px-3 text-mute hover:text-ink"
          }
          title="Voice input"
        >
          {state === "listening" ? <Mic size={16} /> : <MicOff size={16} />}
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask Shoaib anything…"
          className="field flex-1"
        />
        <button type="submit" className="rounded-xl border border-signal/40 bg-signal/10 px-3 text-signal hover:bg-signal/20">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

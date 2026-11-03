import clsx from "clsx";
import type { AssistantState, AppSettings } from "../types";

export default function StatusHud({
  state,
  settings,
  speechOk,
  partial,
}: {
  state: AssistantState;
  settings: AppSettings;
  speechOk: boolean;
  partial: string;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="hud-panel corner-frame p-4">
        <p className="hud-label">Assistant State</p>
        <div className="mt-3 flex items-center gap-3">
          <span
            className={clsx(
              "h-2.5 w-2.5 rounded-full shadow-[0_0_12px_currentColor]",
              state === "listening" && "text-cyan bg-cyan",
              state === "speaking" && "text-amber bg-amber",
              state === "thinking" && "text-amber-soft bg-amber-soft",
              state === "idle" && "text-cyan-deep bg-cyan-deep",
            )}
          />
          <p className="font-display text-sm uppercase tracking-[0.2em]">
            {state}
          </p>
        </div>
        <p className="mt-2 font-mono text-xs text-mute">
          {partial ? `Heard: ${partial}` : "Mic channel clear"}
        </p>
      </div>

      <div className="hud-panel corner-frame p-4">
        <p className="hud-label">Persona</p>
        <p className="mt-3 font-display text-sm uppercase tracking-[0.18em]">
          {settings.personality}
        </p>
        <p className="mt-2 font-mono text-xs text-mute">
          Voice {settings.voiceGender} · {settings.voiceEnabled ? "TTS on" : "TTS off"}
        </p>
      </div>

      <div className="hud-panel corner-frame p-4">
        <p className="hud-label">Provider</p>
        <p className="mt-3 font-display text-sm uppercase tracking-[0.18em]">
          {settings.apiProvider}
        </p>
        <p className="mt-2 font-mono text-xs text-mute">
          {speechOk ? "Speech API ready" : "Speech unavailable"} ·{" "}
          {settings.apiKey ? "Key linked" : "Demo mode"}
        </p>
      </div>
    </div>
  );
}

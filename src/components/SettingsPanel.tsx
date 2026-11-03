import type { ReactNode } from "react";
import type { AppSettings, PersonalityId, VoiceGender } from "../types";

const PERSONALITIES: PersonalityId[] = ["jarvis", "mentor", "friend", "custom"];
const PROVIDERS: AppSettings["apiProvider"][] = ["demo", "openai", "groq", "custom"];

export default function SettingsPanel({
  settings,
  onChange,
}: {
  settings: AppSettings;
  onChange: (next: AppSettings) => void;
}) {
  const patch = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) =>
    onChange({ ...settings, [key]: value });

  return (
    <div className="hud-panel h-full overflow-y-auto p-4 md:p-6">
      <p className="hud-label">Configuration</p>
      <p className="hud-title mt-1">Stonic Settings</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Your name">
          <input
            value={settings.displayName}
            onChange={(e) => patch("displayName", e.target.value)}
            className="field"
          />
        </Field>
        <Field label="Assistant name">
          <input
            value={settings.assistantName}
            onChange={(e) => patch("assistantName", e.target.value)}
            className="field"
          />
        </Field>

        <Field label="Personality">
          <select
            value={settings.personality}
            onChange={(e) => patch("personality", e.target.value as PersonalityId)}
            className="field"
          >
            {PERSONALITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Voice gender">
          <select
            value={settings.voiceGender}
            onChange={(e) => patch("voiceGender", e.target.value as VoiceGender)}
            className="field"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>

        {settings.personality === "custom" && (
          <div className="md:col-span-2">
            <Field label="Custom personality">
              <textarea
                value={settings.customPersonality}
                onChange={(e) => patch("customPersonality", e.target.value)}
                className="field min-h-[90px]"
              />
            </Field>
          </div>
        )}

        <label className="flex items-center gap-3 font-body text-base text-ink">
          <input
            type="checkbox"
            checked={settings.voiceEnabled}
            onChange={(e) => patch("voiceEnabled", e.target.checked)}
          />
          Speak replies aloud
        </label>
        <label className="flex items-center gap-3 font-body text-base text-ink">
          <input
            type="checkbox"
            checked={settings.autoGreet}
            onChange={(e) => patch("autoGreet", e.target.checked)}
          />
          Auto-greet on boot
        </label>

        <Field label="AI provider">
          <select
            value={settings.apiProvider}
            onChange={(e) =>
              patch("apiProvider", e.target.value as AppSettings["apiProvider"])
            }
            className="field"
          >
            {PROVIDERS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Model">
          <input
            value={settings.model}
            onChange={(e) => patch("model", e.target.value)}
            className="field"
            placeholder="gpt-4o-mini / llama-3.3-70b-versatile"
          />
        </Field>

        <div className="md:col-span-2">
          <Field label="API key (stored locally in this browser/app)">
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => patch("apiKey", e.target.value)}
              className="field"
              placeholder="sk-… or gsk-…"
            />
          </Field>
        </div>

        {settings.apiProvider === "custom" && (
          <div className="md:col-span-2">
            <Field label="Custom OpenAI-compatible base URL">
              <input
                value={settings.apiBaseUrl}
                onChange={(e) => patch("apiBaseUrl", e.target.value)}
                className="field"
                placeholder="https://api.openai.com/v1"
              />
            </Field>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-sm border border-line bg-void/50 p-4">
        <p className="hud-label">Desktop notes</p>
        <ul className="mt-3 space-y-2 font-body text-sm text-mute">
          <li>Run `npm run dev:electron` for the frameless desktop window.</li>
          <li>Demo mode works offline with cinematic replies and local skills.</li>
          <li>OpenAI / Groq / custom providers unlock fuller conversation.</li>
          <li>Voice uses the Web Speech API — Chrome/Edge recommended.</li>
        </ul>
      </div>

      <style>{`
        .field {
          width: 100%;
          border-radius: 2px;
          border: 1px solid rgba(86, 214, 255, 0.18);
          background: rgba(2, 6, 12, 0.65);
          padding: 0.55rem 0.75rem;
          color: #d7f4ff;
          font-family: Rajdhani, sans-serif;
          font-size: 1rem;
          outline: none;
        }
        .field:focus {
          border-color: rgba(86, 214, 255, 0.5);
        }
        select.field option {
          background: #07111c;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="hud-label">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

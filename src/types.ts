export type ViewId =
  | "core"
  | "chat"
  | "world"
  | "tasks"
  | "memory"
  | "settings";

export type PersonalityId = "jarvis" | "mentor" | "friend" | "operator" | "custom";

export type VoiceGender = "male" | "female";

export type AssistantState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "offline";

export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: number;
}

export interface MemoryItem {
  id: string;
  key: string;
  value: string;
  createdAt: number;
}

export interface TaskItem {
  id: string;
  title: string;
  detail: string;
  status: "queued" | "running" | "done" | "failed";
  createdAt: number;
}

export interface AppSettings {
  displayName: string;
  assistantName: string;
  personality: PersonalityId;
  customPersonality: string;
  voiceGender: VoiceGender;
  voiceEnabled: boolean;
  autoGreet: boolean;
  homeCity: string;
  apiProvider: "demo" | "openai" | "groq" | "openrouter" | "custom";
  apiKey: string;
  apiBaseUrl: string;
  model: string;
  wakeWord: string;
}

export interface WeatherSnapshot {
  city: string;
  country: string;
  tempC: number;
  feelsLikeC: number;
  humidity: number;
  windKph: number;
  weatherCode: number;
  description: string;
  updatedAt: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
}

export interface SystemSnapshot {
  platform: string;
  release: string;
  arch: string;
  hostname: string;
  uptimeSec: number;
  cpuModel: string;
  cpuCores: number;
  totalMemGb: number;
  freeMemGb: number;
  usedMemGb: number;
  homeDir?: string;
  userInfo?: string;
  browserFallback?: boolean;
}

declare global {
  interface Window {
    shoaibDesktop?: {
      minimize: () => Promise<void>;
      maximize: () => Promise<void>;
      close: () => Promise<void>;
      openExternal: (url: string) => Promise<void>;
      openPath: (target: string) => Promise<{ ok: boolean; error: string | null }>;
      runSafe: (commandKey: string) => Promise<{ ok: boolean; error: string | null }>;
      getVersion: () => Promise<string>;
      getSystemInfo: () => Promise<SystemSnapshot>;
      writeClipboard: (text: string) => Promise<boolean>;
      readClipboard: () => Promise<string>;
      fetchText: (url: string) => Promise<string>;
      fetchJson: (url: string) => Promise<unknown>;
      onHotkey: (cb: (action: string) => void) => () => void;
      isDesktop: boolean;
    };
  }
}

export {};

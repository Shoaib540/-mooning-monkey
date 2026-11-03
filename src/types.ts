export type ViewId =
  | "core"
  | "chat"
  | "world"
  | "tasks"
  | "memory"
  | "settings";

export type PersonalityId = "jarvis" | "mentor" | "friend" | "custom";

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
  spoken?: boolean;
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
  apiProvider: "demo" | "openai" | "groq" | "custom";
  apiKey: string;
  apiBaseUrl: string;
  model: string;
  wakeWord: string;
}

export interface WorldHeadline {
  id: string;
  title: string;
  region: string;
  severity: "low" | "medium" | "high";
  summary: string;
}

declare global {
  interface Window {
    stonicDesktop?: {
      minimize: () => Promise<void>;
      maximize: () => Promise<void>;
      close: () => Promise<void>;
      openExternal: (url: string) => Promise<void>;
      getVersion: () => Promise<string>;
      onHotkey: (cb: (action: string) => void) => () => void;
      isDesktop: boolean;
    };
  }
}

export {};

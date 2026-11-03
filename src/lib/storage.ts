import type { AppSettings, ChatMessage, MemoryItem, TaskItem } from "../types";

const KEYS = {
  settings: "stonic.settings.v1",
  messages: "stonic.messages.v1",
  memory: "stonic.memory.v1",
  tasks: "stonic.tasks.v1",
  booted: "stonic.booted.v1",
} as const;

export const defaultSettings: AppSettings = {
  displayName: "Commander",
  assistantName: "Stonic",
  personality: "jarvis",
  customPersonality: "A calm cinematic AI companion with dry wit.",
  voiceGender: "male",
  voiceEnabled: true,
  autoGreet: true,
  apiProvider: "demo",
  apiKey: "",
  apiBaseUrl: "https://api.openai.com/v1",
  model: "gpt-4o-mini",
  wakeWord: "stonic",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getSettings: () => ({ ...defaultSettings, ...read(KEYS.settings, {}) }),
  setSettings: (value: AppSettings) => write(KEYS.settings, value),
  getMessages: () => read<ChatMessage[]>(KEYS.messages, []),
  setMessages: (value: ChatMessage[]) => write(KEYS.messages, value),
  getMemory: () => read<MemoryItem[]>(KEYS.memory, []),
  setMemory: (value: MemoryItem[]) => write(KEYS.memory, value),
  getTasks: () => read<TaskItem[]>(KEYS.tasks, []),
  setTasks: (value: TaskItem[]) => write(KEYS.tasks, value),
  getBooted: () => read(KEYS.booted, false),
  setBooted: (value: boolean) => write(KEYS.booted, value),
};

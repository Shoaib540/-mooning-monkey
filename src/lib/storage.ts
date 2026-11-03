import type { AppSettings, ChatMessage, MemoryItem, TaskItem } from "../types";

const KEYS = {
  settings: "shoaib.settings.v1",
  messages: "shoaib.messages.v1",
  memory: "shoaib.memory.v1",
  tasks: "shoaib.tasks.v1",
} as const;

export const defaultSettings: AppSettings = {
  displayName: "Commander",
  assistantName: "Shoaib",
  personality: "jarvis",
  customPersonality:
    "A precise, confident desktop intelligence with dry humor and zero fluff.",
  voiceGender: "male",
  voiceEnabled: true,
  autoGreet: true,
  homeCity: "Karachi",
  apiProvider: "demo",
  apiKey: "",
  apiBaseUrl: "https://api.openai.com/v1",
  model: "gpt-4o-mini",
  wakeWord: "shoaib",
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
};

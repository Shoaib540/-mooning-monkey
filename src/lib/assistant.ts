import type { AppSettings, ChatMessage, MemoryItem, PersonalityId } from "../types";

const PERSONALITY: Record<PersonalityId, string> = {
  jarvis:
    "Precise, composed, slightly witty, loyal. Address the user respectfully. Keep replies spoken-friendly and sharp.",
  mentor:
    "Wise mentor: calm, encouraging, insightful. Guide without lecturing. Warm and clear.",
  friend:
    "Best-friend energy: casual, supportive, playful, emotionally intelligent. Short natural replies.",
  operator:
    "Elite operations AI: terse, high-signal, mission-focused. Prefer bullets and exact facts.",
  custom: "",
};

function systemPrompt(settings: AppSettings, memory: MemoryItem[]) {
  const personality =
    settings.personality === "custom"
      ? settings.customPersonality || PERSONALITY.jarvis
      : PERSONALITY[settings.personality];

  const memoryBlock =
    memory.length === 0
      ? "No stored memories yet."
      : memory
          .slice(-24)
          .map((m) => `- ${m.key}: ${m.value}`)
          .join("\n");

  return [
    `You are ${settings.assistantName}, a premium personal desktop intelligence named Shoaib.`,
    personality,
    `User display name: ${settings.displayName}. Home city: ${settings.homeCity}.`,
    "You already have local tools for weather, news, Wikipedia, crypto, system diagnostics, clipboard, and opening apps.",
    "When those tools already answered, do not invent conflicting numbers.",
    "Prefer concise spoken answers under 90 words unless asked for depth.",
    "Known memory:",
    memoryBlock,
  ].join("\n");
}

function demoReply(input: string, settings: AppSettings): string {
  const q = input.toLowerCase();
  const name = settings.displayName || "Commander";

  if (q.includes("joke")) {
    return `${name}, I ran a humor subroutine: my jokes have low latency and high regret.`;
  }
  if (q.includes("help") || q.includes("what can you do")) {
    return `I can talk, remember facts, pull live weather/news/crypto, research Wikipedia, diagnose this machine, open apps, search the web, and compute math. Add an API key in Settings for deeper conversation.`;
  }
  if (q.includes("better") || q.includes("stonic")) {
    return `I’m Shoaib — built for live data and desktop control, not demo theater. Try “weather in ${settings.homeCity}”, “world news”, or “system status”.`;
  }

  return `Acknowledged, ${name}. Demo brain heard “${input.slice(0, 110)}”. For production reasoning, add OpenAI, Groq, or OpenRouter in Settings. Live tools still work now.`;
}

export async function generateAssistantReply(options: {
  settings: AppSettings;
  messages: ChatMessage[];
  memory: MemoryItem[];
  input: string;
}): Promise<string> {
  const { settings, messages, memory, input } = options;

  if (settings.apiProvider === "demo" || !settings.apiKey.trim()) {
    await delay(450 + Math.random() * 500);
    return demoReply(input, settings);
  }

  const base =
    settings.apiProvider === "groq"
      ? "https://api.groq.com/openai/v1"
      : settings.apiProvider === "openrouter"
        ? "https://openrouter.ai/api/v1"
        : settings.apiBaseUrl.replace(/\/$/, "");

  const model =
    settings.model ||
    (settings.apiProvider === "groq"
      ? "llama-3.3-70b-versatile"
      : settings.apiProvider === "openrouter"
        ? "openai/gpt-4o-mini"
        : "gpt-4o-mini");

  const payload = {
    model,
    temperature: 0.7,
    messages: [
      { role: "system", content: systemPrompt(settings, memory) },
      ...messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-18)
        .map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: input },
    ],
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${settings.apiKey.trim()}`,
  };
  if (settings.apiProvider === "openrouter") {
    headers["HTTP-Referer"] = "https://shoaib.local";
    headers["X-Title"] = "Shoaib";
  }

  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API ${res.status}: ${errText.slice(0, 180)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Empty model response");
  return content;
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

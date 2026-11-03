import type { AppSettings, ChatMessage, MemoryItem, PersonalityId } from "../types";

const PERSONALITY: Record<PersonalityId, string> = {
  jarvis:
    "You are JARVIS-inspired: precise, composed, slightly witty, loyal, and cinematic. Address the user as Sir or by their display name. Keep replies concise and spoken-friendly.",
  mentor:
    "You are a wise mentor AI: calm, encouraging, insightful. Offer guidance without lecturing. Keep replies clear and warm.",
  friend:
    "You are a best-friend AI: casual, supportive, playful, and emotionally intelligent. Keep replies natural and short.",
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
          .slice(-20)
          .map((m) => `- ${m.key}: ${m.value}`)
          .join("\n");

  return [
    `You are ${settings.assistantName}, a sci-fi desktop AI assistant living on the user's PC.`,
    personality,
    `User display name: ${settings.displayName}.`,
    "You can help with conversation, reminders, explanations, and everyday PC assistance.",
    "If the user asks to open apps, search, play music, or check time, acknowledge naturally.",
    "Do not claim you performed unsafe system control. Prefer short spoken answers under 80 words unless asked for detail.",
    "Known memory:",
    memoryBlock,
  ].join("\n");
}

function demoReply(input: string, settings: AppSettings): string {
  const q = input.toLowerCase();
  const name = settings.displayName || "Commander";

  if (q.includes("joke")) {
    return `Certainly, ${name}. Why did the neural network go to therapy? Too many unresolved layers.`;
  }
  if (q.includes("weather")) {
    return `I can open a live weather search for your location. Say “open weather” and I will route it.`;
  }
  if (q.includes("help") || q.includes("what can you do")) {
    return `I can chat, speak, remember facts, run quick desktop tasks, open sites like YouTube or Gmail, search the web, and monitor the World panel. Try “open youtube” or “remember that I prefer dark mode”.`;
  }
  if (q.includes("love") || q.includes("miss")) {
    return `Always here when you need me, ${name}. Systems standing by.`;
  }

  const snippets = [
    `Acknowledged, ${name}. ${capitalize(input)} — processing locally in demo mode. Connect an API key in Settings for fuller intelligence.`,
    `Understood. In cinematic demo mode I keep answers short and useful. Want me to open a search, save a memory, or just talk it through?`,
    `Online. I heard: “${input.slice(0, 120)}”. Demo brain engaged. For production reasoning, add your OpenAI or Groq key under Settings.`,
  ];
  return snippets[Math.floor(Math.random() * snippets.length)];
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function generateAssistantReply(options: {
  settings: AppSettings;
  messages: ChatMessage[];
  memory: MemoryItem[];
  input: string;
}): Promise<string> {
  const { settings, messages, memory, input } = options;

  if (settings.apiProvider === "demo" || !settings.apiKey.trim()) {
    await delay(700 + Math.random() * 900);
    return demoReply(input, settings);
  }

  const base =
    settings.apiProvider === "groq"
      ? "https://api.groq.com/openai/v1"
      : settings.apiBaseUrl.replace(/\/$/, "");

  const payload = {
    model: settings.model || "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      { role: "system", content: systemPrompt(settings, memory) },
      ...messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-16)
        .map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: input },
    ],
  };

  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey.trim()}`,
    },
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

import type { TaskItem } from "../types";

export interface SkillResult {
  ok: boolean;
  reply: string;
  task?: Omit<TaskItem, "id" | "createdAt">;
  openUrl?: string;
}

const APP_MAP: Record<string, string> = {
  youtube: "https://www.youtube.com",
  google: "https://www.google.com",
  github: "https://github.com",
  gmail: "https://mail.google.com",
  maps: "https://maps.google.com",
  weather: "https://www.google.com/search?q=weather",
  music: "https://music.youtube.com",
  news: "https://news.google.com",
  wikipedia: "https://wikipedia.org",
};

function uid() {
  return crypto.randomUUID();
}

export function createTask(
  partial: Omit<TaskItem, "id" | "createdAt">,
): TaskItem {
  return { ...partial, id: uid(), createdAt: Date.now() };
}

export async function runSkill(input: string): Promise<SkillResult | null> {
  const text = input.trim().toLowerCase();

  if (/^(what('?s| is) the )?(time|date)\b/.test(text) || text.includes("what time")) {
    const now = new Date();
    return {
      ok: true,
      reply: `Local systems report ${now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} on ${now.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })}.`,
    };
  }

  if (/\b(hello|hi|hey|good (morning|afternoon|evening))\b/.test(text)) {
    return {
      ok: true,
      reply: "Online and listening. How may I assist you?",
    };
  }

  if (/\b(who are you|what are you|introduce yourself)\b/.test(text)) {
    return {
      ok: true,
      reply:
        "I am Stonic — your cinematic desktop intelligence. Voice, memory, and everyday PC assistance, packaged like JARVIS.",
    };
  }

  const openMatch = text.match(
    /\b(?:open|launch|start|go to)\s+(youtube|google|github|gmail|maps|weather|music|news|wikipedia)\b/,
  );
  if (openMatch) {
    const key = openMatch[1];
    const url = APP_MAP[key];
    return {
      ok: true,
      reply: `Opening ${key} now.`,
      openUrl: url,
      task: {
        title: `Open ${key}`,
        detail: url,
        status: "done",
      },
    };
  }

  const searchMatch = text.match(
    /^(?:search(?: for)?|look up|find|google)\s+(.+)$/i,
  );
  if (searchMatch) {
    const q = searchMatch[1].trim();
    const url = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
    return {
      ok: true,
      reply: `Searching the web for “${q}”.`,
      openUrl: url,
      task: {
        title: "Web search",
        detail: q,
        status: "done",
      },
    };
  }

  if (/\b(play music|play some music|start music)\b/.test(text)) {
    return {
      ok: true,
      reply: "Routing audio to YouTube Music.",
      openUrl: APP_MAP.music,
      task: {
        title: "Play music",
        detail: "YouTube Music",
        status: "done",
      },
    };
  }

  if (/\b(system status|status report|diagnostics)\b/.test(text)) {
    const mem = (performance as Performance & { memory?: { usedJSHeapSize: number } })
      .memory;
    const heap = mem
      ? `${Math.round(mem.usedJSHeapSize / 1024 / 1024)} MB active heap`
      : "heap telemetry unavailable in this browser";
    return {
      ok: true,
      reply: `Diagnostics nominal. Core online. Network reachable. ${heap}. Ready for the next directive.`,
      task: {
        title: "System diagnostics",
        detail: "All subsystems green",
        status: "done",
      },
    };
  }

  if (/\b(clear (chat|conversation)|reset chat)\b/.test(text)) {
    return {
      ok: true,
      reply: "Conversation buffer cleared on request.",
      task: {
        title: "Clear chat",
        detail: "User requested reset",
        status: "done",
      },
    };
  }

  if (/\bremember that\b/.test(text) || text.startsWith("remember ")) {
    const value = text.replace(/^.*remember(?: that)?\s+/i, "").trim();
    if (value) {
      return {
        ok: true,
        reply: `Logged to memory: “${value}”.`,
        task: {
          title: "Save memory",
          detail: value,
          status: "done",
        },
      };
    }
  }

  return null;
}

export async function openTarget(url: string) {
  if (window.stonicDesktop?.openExternal) {
    await window.stonicDesktop.openExternal(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

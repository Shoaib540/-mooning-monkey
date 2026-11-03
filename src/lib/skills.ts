import {
  formatUptime,
  getCryptoPrices,
  getPublicIpInfo,
  getSystemSnapshot,
  getWeather,
  getWikipediaSummary,
  getWorldNews,
} from "./liveData";
import {
  findStation,
  RADIO_STATIONS,
  spotifySearchUrl,
  type MusicAction,
  youtubeMusicSearchUrl,
} from "./music";
import { openExternal } from "./net";
import type { TaskItem } from "../types";

export interface SkillResult {
  ok: boolean;
  reply: string;
  task?: Omit<TaskItem, "id" | "createdAt">;
  openUrl?: string;
  clearChat?: boolean;
  memory?: { key: string; value: string };
  music?: MusicAction;
  openMusicView?: boolean;
}

const APP_MAP: Record<string, string> = {
  youtube: "https://www.youtube.com",
  google: "https://www.google.com",
  github: "https://github.com",
  gmail: "https://mail.google.com",
  maps: "https://maps.google.com",
  music: "https://music.youtube.com",
  twitter: "https://x.com",
  linkedin: "https://www.linkedin.com",
  chatgpt: "https://chatgpt.com",
};

export function createTask(
  partial: Omit<TaskItem, "id" | "createdAt">,
): TaskItem {
  return { ...partial, id: crypto.randomUUID(), createdAt: Date.now() };
}

function calc(expr: string): number | null {
  const cleaned = expr.replace(/[^0-9+\-*/().%\s]/g, "").trim();
  if (!cleaned || !/[0-9]/.test(cleaned)) return null;
  if (!/^[\d+\-*/().%\s]+$/.test(cleaned)) return null;
  try {
    const value = new Function(`"use strict"; return (${cleaned});`)() as unknown;
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

export async function runSkill(
  input: string,
  homeCity: string,
): Promise<SkillResult | null> {
  const text = input.trim();
  const lower = text.toLowerCase();

  if (/^(what('?s| is) the )?(time|date)\b/.test(lower) || lower.includes("what time")) {
    const now = new Date();
    return {
      ok: true,
      reply: `Local time is ${now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })} on ${now.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })}.`,
    };
  }

  if (/\b(hello|hi|hey|salam|assalam|good (morning|afternoon|evening))\b/.test(lower)) {
    return {
      ok: true,
      reply: "Online. I’m Shoaib — ready for voice, desktop tasks, live weather, news, and research.",
    };
  }

  if (/\b(who are you|what are you|introduce yourself)\b/.test(lower)) {
    return {
      ok: true,
      reply:
        "I’m Shoaib, your personal desktop intelligence. I speak, remember, pull live weather and news, research Wikipedia, track crypto, and drive everyday PC actions.",
    };
  }

  const openMatch = lower.match(
    /\b(?:open|launch|start|go to)\s+(youtube|google|github|gmail|maps|music|twitter|linkedin|chatgpt)\b/,
  );
  if (openMatch) {
    const key = openMatch[1];
    const url = APP_MAP[key];
    return {
      ok: true,
      reply: `Opening ${key}.`,
      openUrl: url,
      task: { title: `Open ${key}`, detail: url, status: "done" },
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
      reply: `Searching the live web for “${q}”.`,
      openUrl: url,
      task: { title: "Web search", detail: q, status: "done" },
    };
  }

  if (
    /\b(stop music|stop the music|stop playing|stop song|stop radio)\b/.test(
      lower,
    )
  ) {
    return {
      ok: true,
      reply: "Music stopped.",
      music: { type: "stop" },
      task: { title: "Stop music", detail: "playback halted", status: "done" },
    };
  }

  if (/\b(pause music|pause the music|pause song|pause radio)\b/.test(lower)) {
    return {
      ok: true,
      reply: "Paused.",
      music: { type: "pause" },
      task: { title: "Pause music", detail: "paused", status: "done" },
    };
  }

  if (
    /\b(resume music|continue music|unpause|resume playback)\b/.test(lower)
  ) {
    return {
      ok: true,
      reply: "Resuming playback.",
      music: { type: "resume" },
      task: { title: "Resume music", detail: "resumed", status: "done" },
    };
  }

  if (
    /\b(next (station|radio|track|song)|skip (station|radio|track|song))\b/.test(
      lower,
    )
  ) {
    return {
      ok: true,
      reply: "Switching to the next radio station.",
      music: { type: "next-station" },
      openMusicView: true,
      task: { title: "Next station", detail: "radio", status: "done" },
    };
  }

  const stationPlay =
    lower.match(
      /^(?:play|put on|start)\s+(?:radio\s+)?(?:station\s+)?(.+)$/i,
    ) || lower.match(/^play\s+(.+?)\s+radio$/i);
  if (stationPlay) {
    const q = stationPlay[1].trim();
    const station = findStation(q);
    if (
      station ||
      /\bradio\b/.test(lower) ||
      RADIO_STATIONS.some((s) => lower.includes(s.id))
    ) {
      const pick =
        station ||
        RADIO_STATIONS.find((s) => lower.includes(s.id)) ||
        RADIO_STATIONS[0];
      return {
        ok: true,
        reply: `Playing ${pick.name} — ${pick.genre}.`,
        music: { type: "play-station", stationId: pick.id },
        openMusicView: true,
        task: {
          title: "Play radio",
          detail: pick.name,
          status: "done",
        },
      };
    }
  }

  if (
    /\b(play music|play some music|start music|play radio|start radio)\b/.test(
      lower,
    )
  ) {
    const pick = RADIO_STATIONS[0];
    return {
      ok: true,
      reply: `Starting ${pick.name} in Shoaib’s music player. Say “play Believer” for a song, or open the Music tab for stations.`,
      music: { type: "play-station", stationId: pick.id },
      openMusicView: true,
      task: { title: "Play music", detail: pick.name, status: "done" },
    };
  }

  const songPlay = text.match(
    /^(?:play|put on)\s+(?!radio\b)(.+?)(?:\s+on\s+(youtube|spotify))?$/i,
  );
  if (songPlay) {
    const query = songPlay[1].trim();
    const service = (songPlay[2] || "youtube").toLowerCase();
    if (query && !/^music$/i.test(query)) {
      if (service === "spotify") {
        return {
          ok: true,
          reply: `Opening Spotify search for “${query}”.`,
          openUrl: spotifySearchUrl(query),
          openMusicView: true,
          task: { title: "Play on Spotify", detail: query, status: "done" },
        };
      }
      return {
        ok: true,
        reply: `Opening YouTube Music for “${query}”.`,
        music: { type: "play-search", query },
        openUrl: youtubeMusicSearchUrl(query),
        openMusicView: true,
        task: { title: "Play song", detail: query, status: "done" },
      };
    }
  }

  const weatherMatch =
    lower.match(/\bweather(?:\s+in\s+([a-zA-Z\s\-']+))?/) ||
    lower.match(/\btemperature(?:\s+in\s+([a-zA-Z\s\-']+))?/);
  if (weatherMatch) {
    const city = (weatherMatch[1] || homeCity || "Karachi").trim();
    try {
      const w = await getWeather(city);
      return {
        ok: true,
        reply: `${w.city}${w.country ? `, ${w.country}` : ""}: ${w.tempC.toFixed(
          1,
        )}°C, feels like ${w.feelsLikeC.toFixed(1)}°C, ${w.description.toLowerCase()}. Humidity ${w.humidity}%, wind ${w.windKph.toFixed(0)} km/h.`,
        task: {
          title: "Live weather",
          detail: `${w.city} ${w.tempC.toFixed(1)}°C`,
          status: "done",
        },
      };
    } catch (err) {
      return {
        ok: false,
        reply: `Weather lookup failed: ${err instanceof Error ? err.message : "unknown error"}`,
        task: { title: "Live weather", detail: city, status: "failed" },
      };
    }
  }

  const wikiMatch = text.match(
    /^(?:wiki|wikipedia|what is|who is|tell me about)\s+(.+)$/i,
  );
  if (wikiMatch) {
    const topic = wikiMatch[1].replace(/\?+$/, "").trim();
    try {
      const page = await getWikipediaSummary(topic);
      return {
        ok: true,
        reply: `${page.title}: ${page.extract}`,
        openUrl: page.url || undefined,
        task: {
          title: "Wikipedia research",
          detail: page.title,
          status: "done",
        },
      };
    } catch (err) {
      return {
        ok: false,
        reply: `Wikipedia failed: ${err instanceof Error ? err.message : "unknown error"}`,
        task: { title: "Wikipedia research", detail: topic, status: "failed" },
      };
    }
  }

  if (/\b(news|headlines|world news)\b/.test(lower)) {
    try {
      const news = await getWorldNews();
      const top = news.slice(0, 5);
      const lines = top.map((n, i) => `${i + 1}. ${n.title} (${n.source})`).join("\n");
      return {
        ok: true,
        reply: `Live headlines:\n${lines}`,
        task: {
          title: "Live news",
          detail: `${top.length} headlines`,
          status: "done",
        },
      };
    } catch (err) {
      return {
        ok: false,
        reply: `News fetch failed: ${err instanceof Error ? err.message : "unknown error"}`,
        task: { title: "Live news", detail: "feed error", status: "failed" },
      };
    }
  }

  if (/\b(crypto|bitcoin|ethereum|btc|eth|solana)\b/.test(lower)) {
    try {
      const prices = await getCryptoPrices();
      const fmt = (id: string, label: string) => {
        const row = prices[id];
        if (!row) return `${label}: n/a`;
        const ch = row.usd_24h_change;
        const sign = ch && ch > 0 ? "+" : "";
        return `${label}: $${row.usd.toLocaleString()} (${sign}${(ch || 0).toFixed(2)}% 24h)`;
      };
      return {
        ok: true,
        reply: [
          fmt("bitcoin", "Bitcoin"),
          fmt("ethereum", "Ethereum"),
          fmt("solana", "Solana"),
        ].join(". "),
        task: { title: "Crypto prices", detail: "CoinGecko live", status: "done" },
      };
    } catch (err) {
      return {
        ok: false,
        reply: `Crypto feed failed: ${err instanceof Error ? err.message : "unknown error"}`,
        task: { title: "Crypto prices", detail: "error", status: "failed" },
      };
    }
  }

  if (/\b(my ip|ip address|where am i|network info)\b/.test(lower)) {
    try {
      const ip = await getPublicIpInfo();
      return {
        ok: true,
        reply: `Public IP ${ip.ip}. Approx location: ${[ip.city, ip.region, ip.country_name]
          .filter(Boolean)
          .join(", ")}. Network: ${ip.org || "unknown"}.`,
        task: { title: "Network info", detail: ip.ip, status: "done" },
      };
    } catch (err) {
      return {
        ok: false,
        reply: `Network lookup failed: ${err instanceof Error ? err.message : "unknown error"}`,
        task: { title: "Network info", detail: "error", status: "failed" },
      };
    }
  }

  if (/\b(system status|status report|diagnostics|system info)\b/.test(lower)) {
    try {
      const sys = await getSystemSnapshot();
      return {
        ok: true,
        reply: `Host ${sys.hostname} · ${sys.platform}/${sys.arch} · ${sys.cpuCores} cores (${sys.cpuModel}). Memory ${sys.usedMemGb}/${sys.totalMemGb} GB used. Uptime ${formatUptime(sys.uptimeSec)}.${sys.browserFallback ? " Browser telemetry mode." : ""}`,
        task: {
          title: "System diagnostics",
          detail: `${sys.platform} ${sys.release}`,
          status: "done",
        },
      };
    } catch (err) {
      return {
        ok: false,
        reply: `Diagnostics failed: ${err instanceof Error ? err.message : "unknown error"}`,
        task: { title: "System diagnostics", detail: "error", status: "failed" },
      };
    }
  }

  const calcMatch = lower.match(
    /^(?:calculate|compute|math|what(?:'| i)s)\s+(.+)$/i,
  ) || lower.match(/^([0-9().\s+\-*/%]+)$/);
  if (calcMatch) {
    const result = calc(calcMatch[1]);
    if (result !== null) {
      return {
        ok: true,
        reply: `Result: ${result}`,
        task: { title: "Calculate", detail: String(result), status: "done" },
      };
    }
  }

  if (/\b(open calculator|launch calculator)\b/.test(lower)) {
    if (window.shoaibDesktop?.runSafe) {
      const res = await window.shoaibDesktop.runSafe("calculator");
      return {
        ok: res.ok,
        reply: res.ok ? "Calculator launched." : `Could not open calculator: ${res.error}`,
        task: {
          title: "Open calculator",
          detail: res.ok ? "native" : res.error || "failed",
          status: res.ok ? "done" : "failed",
        },
      };
    }
    return {
      ok: true,
      reply: "Native calculator needs the Electron desktop app. Say a math expression and I’ll compute it here.",
    };
  }

  if (/\b(open (files|file manager|explorer)|open terminal)\b/.test(lower)) {
    if (!window.shoaibDesktop?.runSafe) {
      return {
        ok: false,
        reply: "File manager / terminal control requires the Shoaib desktop app.",
      };
    }
    const key = lower.includes("terminal") ? "terminal" : "files";
    const res = await window.shoaibDesktop.runSafe(key);
    return {
      ok: res.ok,
      reply: res.ok ? `Opened ${key}.` : `Failed: ${res.error}`,
      task: {
        title: `Open ${key}`,
        detail: res.ok ? "native" : res.error || "failed",
        status: res.ok ? "done" : "failed",
      },
    };
  }

  const copyMatch = text.match(/^copy\s+(.+)$/i);
  if (copyMatch) {
    const value = copyMatch[1].trim();
    if (window.shoaibDesktop?.writeClipboard) {
      await window.shoaibDesktop.writeClipboard(value);
    } else {
      await navigator.clipboard?.writeText(value);
    }
    return {
      ok: true,
      reply: "Copied to clipboard.",
      task: { title: "Clipboard", detail: value.slice(0, 80), status: "done" },
    };
  }

  if (/\b(clear (chat|conversation)|reset chat)\b/.test(lower)) {
    return {
      ok: true,
      reply: "Conversation buffer cleared.",
      clearChat: true,
      task: { title: "Clear chat", detail: "reset", status: "done" },
    };
  }

  if (/^remember(?: that)?\s+/i.test(text) || /\bremember that\b/i.test(lower)) {
    const value = text.replace(/^.*remember(?: that)?\s+/i, "").trim();
    if (value) {
      return {
        ok: true,
        reply: `Saved to memory: “${value}”.`,
        memory: { key: "note", value },
        task: { title: "Save memory", detail: value, status: "done" },
      };
    }
  }

  return null;
}

export { openExternal };

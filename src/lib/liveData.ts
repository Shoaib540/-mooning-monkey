import { fetchJson, fetchText } from "./net";
import type { NewsItem, SystemSnapshot, WeatherSnapshot } from "../types";

const WMO: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

interface GeoResult {
  results?: Array<{
    name: string;
    country?: string;
    latitude: number;
    longitude: number;
    admin1?: string;
  }>;
}

interface Forecast {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

export async function resolveCity(query: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query,
  )}&count=1&language=en&format=json`;
  const data = await fetchJson<GeoResult>(url);
  const hit = data.results?.[0];
  if (!hit) throw new Error(`Could not find location “${query}”.`);
  return hit;
}

export async function getWeather(city: string): Promise<WeatherSnapshot> {
  const place = await resolveCity(city);
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}` +
    `&longitude=${place.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&wind_speed_unit=kmh&timezone=auto`;
  const data = await fetchJson<Forecast>(url);
  const code = data.current.weather_code;
  return {
    city: place.name,
    country: place.country || place.admin1 || "",
    tempC: data.current.temperature_2m,
    feelsLikeC: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windKph: data.current.wind_speed_10m,
    weatherCode: code,
    description: WMO[code] || `Code ${code}`,
    updatedAt: Date.now(),
  };
}

function stripHtml(html: string) {
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseRss(xml: string, source: string): NewsItem[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 12);
  return items.map((match, i) => {
    const block = match[1];
    const title = stripHtml(
      block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "Untitled",
    );
    const link = stripHtml(
      block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ||
        block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i)?.[1] ||
        "",
    );
    const desc = stripHtml(
      block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || "",
    );
    const pub =
      stripHtml(block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || "") ||
      new Date().toUTCString();
    return {
      id: `${source}-${i}-${title.slice(0, 24)}`,
      title,
      source,
      url: link,
      publishedAt: pub,
      summary: desc.slice(0, 180),
    };
  });
}

async function getRssNews(): Promise<NewsItem[]> {
  const feeds = [
    { source: "BBC", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
    { source: "NPR", url: "https://feeds.npr.org/1001/rss.xml" },
  ];
  const batches = await Promise.allSettled(
    feeds.map(async (feed) => parseRss(await fetchText(feed.url), feed.source)),
  );
  return batches.flatMap((b) => (b.status === "fulfilled" ? b.value : []));
}

async function getHackerNews(): Promise<NewsItem[]> {
  const ids = await fetchJson<number[]>(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );
  const top = ids.slice(0, 12);
  const stories = await Promise.all(
    top.map(async (id) => {
      const item = await fetchJson<{
        id: number;
        title?: string;
        url?: string;
        time?: number;
        by?: string;
        text?: string;
      }>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      return {
        id: `hn-${item.id}`,
        title: item.title || "Untitled",
        source: "Hacker News",
        url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
        publishedAt: item.time
          ? new Date(item.time * 1000).toUTCString()
          : new Date().toUTCString(),
        summary: item.text ? stripHtml(item.text).slice(0, 180) : `by ${item.by || "unknown"}`,
      } satisfies NewsItem;
    }),
  );
  return stories;
}

async function getRedditWorldNews(): Promise<NewsItem[]> {
  const data = await fetchJson<{
    data?: {
      children?: Array<{
        data?: {
          id?: string;
          title?: string;
          url?: string;
          created_utc?: number;
          selftext?: string;
          subreddit_name_prefixed?: string;
        };
      }>;
    };
  }>("https://www.reddit.com/r/worldnews/hot.json?limit=12");

  return (data.data?.children || [])
    .map((child) => child.data)
    .filter(Boolean)
    .map((post) => ({
      id: `reddit-${post!.id}`,
      title: post!.title || "Untitled",
      source: post!.subreddit_name_prefixed || "Reddit",
      url: post!.url || `https://reddit.com/${post!.id}`,
      publishedAt: post!.created_utc
        ? new Date(post!.created_utc * 1000).toUTCString()
        : new Date().toUTCString(),
      summary: (post!.selftext || "").slice(0, 180),
    }));
}

export async function getWorldNews(): Promise<NewsItem[]> {
  const preferDesktopRss = Boolean(window.shoaibDesktop?.fetchText);
  if (preferDesktopRss) {
    const rss = await getRssNews();
    if (rss.length) return rss.slice(0, 16);
  }

  const batches = await Promise.allSettled([
    preferDesktopRss ? Promise.resolve([] as NewsItem[]) : getRssNews(),
    getHackerNews(),
    getRedditWorldNews(),
  ]);

  const merged = batches.flatMap((b) => (b.status === "fulfilled" ? b.value : []));
  const unique = new Map<string, NewsItem>();
  for (const item of merged) {
    if (!unique.has(item.title)) unique.set(item.title, item);
  }
  const list = [...unique.values()].slice(0, 16);
  if (!list.length) {
    throw new Error("News feeds unavailable from this network.");
  }
  return list;
}

export async function getWikipediaSummary(topic: string) {
  const title = topic.trim().replace(/\s+/g, "_");
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const data = await fetchJson<{
    title: string;
    extract: string;
    content_urls?: { desktop?: { page?: string } };
    type?: string;
  }>(url);
  if (data.type === "disambiguation") {
    return {
      title: data.title,
      extract: data.extract,
      url: data.content_urls?.desktop?.page || "",
    };
  }
  return {
    title: data.title,
    extract: data.extract,
    url: data.content_urls?.desktop?.page || "",
  };
}

export async function getCryptoPrices() {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true";
  return fetchJson<Record<string, { usd: number; usd_24h_change?: number }>>(url);
}

export async function getPublicIpInfo() {
  return fetchJson<{
    ip: string;
    city?: string;
    region?: string;
    country_name?: string;
    org?: string;
    latitude?: number;
    longitude?: number;
  }>("https://ipapi.co/json/");
}

export async function getSystemSnapshot(): Promise<SystemSnapshot> {
  if (window.shoaibDesktop?.getSystemInfo) {
    return window.shoaibDesktop.getSystemInfo();
  }
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };
  return {
    platform: navigator.platform || "web",
    release: navigator.userAgent.split(" ").slice(-1)[0] || "browser",
    arch: "web",
    hostname: location.hostname,
    uptimeSec: Math.floor(performance.now() / 1000),
    cpuModel: "Browser runtime",
    cpuCores: nav.hardwareConcurrency || 4,
    totalMemGb: nav.deviceMemory || 0,
    freeMemGb: 0,
    usedMemGb: 0,
    browserFallback: true,
  };
}

export function formatUptime(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${h}h ${m}m`;
}

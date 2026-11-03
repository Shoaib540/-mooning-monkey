import { RefreshCw } from "lucide-react";
import { openExternal } from "../lib/net";
import type { NewsItem, WeatherSnapshot } from "../types";

export default function WorldMonitor({
  weather,
  news,
  loading,
  error,
  onRefresh,
}: {
  weather: WeatherSnapshot | null;
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}) {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="hud-panel relative flex min-h-[320px] flex-col overflow-hidden p-5">
        <div className="absolute inset-0 bg-grid bg-[size:34px_34px] opacity-30" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="hud-label">Live weather</p>
            <p className="hud-title">Open-Meteo</p>
          </div>
          <button
            onClick={onRefresh}
            className="rounded-xl border border-line p-2 text-mute hover:text-signal"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {weather ? (
          <div className="relative z-10 mt-auto">
            <p className="font-display text-4xl font-bold tracking-tight text-ink">
              {weather.tempC.toFixed(1)}°C
            </p>
            <p className="mt-2 font-body text-lg text-signal-soft">
              {weather.city}
              {weather.country ? `, ${weather.country}` : ""}
            </p>
            <p className="mt-1 font-body text-mute">{weather.description}</p>
            <div className="mt-5 grid grid-cols-3 gap-3 font-mono text-xs text-mute">
              <div>
                <p className="text-ink">{weather.feelsLikeC.toFixed(1)}°C</p>
                <p>Feels</p>
              </div>
              <div>
                <p className="text-ink">{weather.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div>
                <p className="text-ink">{weather.windKph.toFixed(0)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="relative z-10 mt-10 font-mono text-sm text-mute">
            {loading
              ? "Fetching live weather…"
              : error?.includes("Weather")
                ? error
                : "No weather yet"}
          </p>
        )}
      </div>

      <div className="hud-panel flex flex-col overflow-hidden">
        <div className="border-b border-line px-4 py-3">
          <p className="hud-label">Live headlines</p>
          <p className="hud-title">World pulse</p>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {error && !news.length && (
            <p className="font-mono text-sm text-rose">{error}</p>
          )}
          {loading && !news.length && (
            <p className="font-mono text-sm text-mute">Loading live news…</p>
          )}
          {news.map((n) => (
            <button
              key={n.id}
              onClick={() => n.url && void openExternal(n.url)}
              className="block w-full rounded-2xl border border-line bg-void/40 p-3 text-left transition hover:border-signal/30"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                  {n.source}
                </p>
                <p className="font-mono text-[10px] text-mute/70">
                  {new Date(n.publishedAt).toLocaleString()}
                </p>
              </div>
              <h3 className="mt-2 font-display text-sm font-semibold text-ink">{n.title}</h3>
              {n.summary && (
                <p className="mt-1 line-clamp-2 font-body text-sm text-mute">{n.summary}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

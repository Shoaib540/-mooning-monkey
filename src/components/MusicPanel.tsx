import {
  ExternalLink,
  Pause,
  Play,
  Radio,
  SkipForward,
  Square,
  Volume2,
} from "lucide-react";
import type { MusicPlayer } from "../hooks/useMusicPlayer";
import { openExternal } from "../lib/net";
import { youtubeMusicSearchUrl } from "../lib/music";
import { useState } from "react";
import type { FormEvent } from "react";

export default function MusicPanel({ music }: { music: MusicPlayer }) {
  const [query, setQuery] = useState("");

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    void music.playSearch(q);
    setQuery("");
  };

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="hud-panel flex flex-col overflow-hidden">
        <div className="border-b border-line px-4 py-3">
          <p className="hud-label">Now playing</p>
          <p className="hud-title">Shoaib Music</p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-5 p-6 text-center">
          <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#d8ff8f,#6fad12_45%,#101318_80%)] shadow-orb">
            <Radio
              size={42}
              className={music.playing ? "animate-pulse text-void" : "text-void/70"}
            />
          </div>

          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              {music.nowPlaying?.title || "Silence"}
            </p>
            <p className="mt-1 font-body text-mute">
              {music.nowPlaying?.subtitle ||
                "Play a live radio station or search YouTube Music"}
            </p>
            {music.loading && (
              <p className="mt-2 font-mono text-xs text-signal">Buffering stream…</p>
            )}
            {music.error && (
              <p className="mt-2 font-mono text-xs text-rose">{music.error}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => music.stop()}
              className="rounded-xl border border-line p-3 text-mute hover:text-ink"
              title="Stop"
            >
              <Square size={16} />
            </button>
            <button
              onClick={() =>
                music.playing ? music.pause() : void music.resume()
              }
              className="rounded-2xl border border-signal/40 bg-signal/15 px-5 py-3 text-signal hover:bg-signal/25"
              title={music.playing ? "Pause" : "Play"}
            >
              {music.playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={() => void music.nextStation()}
              className="rounded-xl border border-line p-3 text-mute hover:text-ink"
              title="Next station"
            >
              <SkipForward size={16} />
            </button>
          </div>

          <div className="flex w-full max-w-sm items-center gap-3">
            <Volume2 size={16} className="text-mute" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={music.volume}
              onChange={(e) => music.setVolume(Number(e.target.value))}
              className="w-full accent-[#b8ff3c]"
            />
          </div>

          <form onSubmit={submitSearch} className="flex w-full max-w-lg gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field flex-1"
              placeholder="Play a song / artist on YouTube Music…"
            />
            <button
              type="submit"
              className="rounded-xl border border-signal/40 bg-signal/10 px-4 font-mono text-xs uppercase tracking-[0.16em] text-signal"
            >
              Play
            </button>
          </form>
          <p className="font-mono text-[11px] text-mute">
            Voice: “play radio”, “play groove salad”, “play Believer”, “pause music”,
            “stop music”
          </p>
        </div>
      </div>

      <div className="hud-panel flex flex-col overflow-hidden">
        <div className="border-b border-line px-4 py-3">
          <p className="hud-label">Live radio</p>
          <p className="hud-title">SomaFM streams</p>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {music.stations.map((station) => {
            const active = music.nowPlaying?.stationId === station.id;
            return (
              <button
                key={station.id}
                onClick={() => void music.playStation(station)}
                className={
                  active
                    ? "flex w-full items-center justify-between rounded-2xl border border-signal/40 bg-signal/10 px-3 py-3 text-left"
                    : "flex w-full items-center justify-between rounded-2xl border border-line bg-void/40 px-3 py-3 text-left hover:border-signal/30"
                }
              >
                <div>
                  <p className="font-display text-sm font-semibold text-ink">
                    {station.name}
                  </p>
                  <p className="font-mono text-[11px] text-mute">{station.genre}</p>
                </div>
                <div className="flex items-center gap-2">
                  {active && music.playing && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                      Live
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      void openExternal(station.homepage);
                    }}
                    className="rounded-lg border border-line p-1.5 text-mute hover:text-ink"
                    title="Station page"
                  >
                    <ExternalLink size={12} />
                  </button>
                </div>
              </button>
            );
          })}
        </div>
        <div className="border-t border-line p-3">
          <button
            onClick={() => void openExternal(youtubeMusicSearchUrl("top hits"))}
            className="w-full rounded-xl border border-line px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-mute hover:text-signal"
          >
            Open YouTube Music
          </button>
        </div>
      </div>
    </div>
  );
}

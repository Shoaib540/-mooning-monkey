import { useCallback, useEffect, useRef, useState } from "react";
import {
  findStation,
  RADIO_STATIONS,
  type MusicAction,
  type RadioStation,
  youtubeMusicSearchUrl,
} from "../lib/music";
import { openExternal } from "../lib/net";

export interface NowPlaying {
  title: string;
  subtitle: string;
  source: "radio" | "external";
  stationId?: string;
}

export function useMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolumeState] = useState(0.85);
  const [error, setError] = useState<string | null>(null);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const stationIndexRef = useRef(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    // Do not set crossOrigin — live radio CDNs often omit CORS headers,
    // which would break playback even though the stream itself is public.
    audioRef.current = audio;

    const onPlaying = () => {
      setLoading(false);
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoading(true);
    const onError = () => {
      setLoading(false);
      setPlaying(false);
      setError("Stream failed. Try another station.");
    };

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playStation = useCallback(async (station: RadioStation) => {
    const audio = audioRef.current;
    if (!audio) return;
    setError(null);
    setLoading(true);
    setNowPlaying({
      title: station.name,
      subtitle: station.genre,
      source: "radio",
      stationId: station.id,
    });
    const idx = RADIO_STATIONS.findIndex((s) => s.id === station.id);
    if (idx >= 0) stationIndexRef.current = idx;

    const candidates = [
      station.streamUrl,
      station.streamUrl.replace("ice2.", "ice1."),
      station.streamUrl.replace("ice2.", "ice4."),
      station.streamUrl.replace("-128-mp3", "-128-aac").replace("ice2.", "ice6."),
    ];

    let lastError: unknown = null;
    for (const url of candidates) {
      try {
        audio.pause();
        audio.src = url;
        audio.load();
        await audio.play();
        setPlaying(true);
        setLoading(false);
        return;
      } catch (err) {
        lastError = err;
      }
    }

    setLoading(false);
    setPlaying(false);
    setError(
      lastError instanceof Error
        ? lastError.message
        : "Could not start playback",
    );
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const resume = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio?.src) return;
    try {
      await audio.play();
      setPlaying(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Resume failed");
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    setPlaying(false);
    setLoading(false);
    setNowPlaying(null);
  }, []);

  const nextStation = useCallback(async () => {
    const next = (stationIndexRef.current + 1) % RADIO_STATIONS.length;
    stationIndexRef.current = next;
    await playStation(RADIO_STATIONS[next]);
  }, [playStation]);

  const playSearch = useCallback(async (query: string) => {
    const url = youtubeMusicSearchUrl(query);
    setNowPlaying({
      title: query,
      subtitle: "YouTube Music search",
      source: "external",
    });
    await openExternal(url);
  }, []);

  const dispatch = useCallback(
    async (action: MusicAction) => {
      switch (action.type) {
        case "play-station": {
          const station =
            RADIO_STATIONS.find((s) => s.id === action.stationId) ||
            findStation(action.stationId);
          if (station) await playStation(station);
          break;
        }
        case "play-search":
          await playSearch(action.query);
          break;
        case "pause":
          pause();
          break;
        case "resume":
          await resume();
          break;
        case "stop":
          stop();
          break;
        case "next-station":
          await nextStation();
          break;
      }
    },
    [nextStation, pause, playSearch, playStation, resume, stop],
  );

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  return {
    stations: RADIO_STATIONS,
    playing,
    loading,
    volume,
    error,
    nowPlaying,
    playStation,
    pause,
    resume,
    stop,
    nextStation,
    playSearch,
    dispatch,
    setVolume,
  };
}

export type MusicPlayer = ReturnType<typeof useMusicPlayer>;

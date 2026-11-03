import { useCallback, useEffect, useState } from "react";
import { getWeather, getWorldNews } from "../lib/liveData";
import type { NewsItem, WeatherSnapshot } from "../types";

export function useLiveWorld(homeCity: string) {
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const city = homeCity || "Karachi";
    const [weatherResult, newsResult] = await Promise.allSettled([
      getWeather(city),
      getWorldNews(),
    ]);

    if (weatherResult.status === "fulfilled") {
      setWeather(weatherResult.value);
    } else {
      setWeather(null);
    }

    if (newsResult.status === "fulfilled") {
      setNews(newsResult.value);
    } else {
      setNews([]);
    }

    const errors = [
      weatherResult.status === "rejected"
        ? `Weather: ${weatherResult.reason instanceof Error ? weatherResult.reason.message : "failed"}`
        : null,
      newsResult.status === "rejected"
        ? `News: ${newsResult.reason instanceof Error ? newsResult.reason.message : "failed"}`
        : null,
    ].filter(Boolean);

    setError(errors.length ? errors.join(" · ") : null);
    setLoading(false);
  }, [homeCity]);

  useEffect(() => {
    const boot = window.setTimeout(() => void refresh(), 0);
    const id = window.setInterval(() => void refresh(), 5 * 60 * 1000);
    return () => {
      window.clearTimeout(boot);
      window.clearInterval(id);
    };
  }, [refresh]);

  return { weather, news, loading, error, refresh };
}

export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  streamUrl: string;
  homepage: string;
}

/** Public HTTPS radio streams verified for browser Audio playback. */
export const RADIO_STATIONS: RadioStation[] = [
  {
    id: "paradise",
    name: "Radio Paradise",
    genre: "Eclectic / Rock",
    streamUrl: "https://stream.radioparadise.com/aac-128",
    homepage: "https://radioparadise.com/",
  },
  {
    id: "classicvinyl",
    name: "Classic Vinyl HD",
    genre: "Classic Hits",
    streamUrl: "https://icecast.walmradio.com:8443/classic",
    homepage: "https://walmradio.com/",
  },
  {
    id: "jazz",
    name: "Adroit Jazz Underground",
    genre: "Jazz",
    streamUrl: "https://icecast.walmradio.com:8443/jazz",
    homepage: "https://walmradio.com/",
  },
  {
    id: "anonfm",
    name: "Anon FM",
    genre: "Electronic",
    streamUrl: "https://icecast.anon.fm/radio",
    homepage: "https://anon.fm/",
  },
  {
    id: "ibiza",
    name: "Ibiza Chillout Lounge",
    genre: "Chill / Lounge",
    streamUrl:
      "https://0nlineradio.radioho.st/lounge-ibiza-chillout-lounge?ref=shoaib",
    homepage: "https://onlineradio.com/",
  },
  {
    id: "secretagent",
    name: "SomaFM Secret Agent",
    genre: "Soundtrack / Lounge",
    streamUrl: "https://ice5.somafm.com/secretagent-128-mp3",
    homepage: "https://somafm.com/secretagent/",
  },
  {
    id: "calm",
    name: "Calm Radio",
    genre: "Ambient / Calm",
    streamUrl: "https://listen9.myradio24.com/6262",
    homepage: "https://myradio24.com/",
  },
  {
    id: "jclub",
    name: "J-Club Bandstand",
    genre: "Jazz / Swing",
    streamUrl: "https://cast1.torontocast.com:2060/;.mp3",
    homepage: "https://torontocast.com/",
  },
];

export type MusicAction =
  | { type: "play-station"; stationId: string }
  | { type: "play-search"; query: string }
  | { type: "pause" }
  | { type: "resume" }
  | { type: "stop" }
  | { type: "next-station" };

export function findStation(query: string): RadioStation | null {
  const q = query.toLowerCase().trim();
  return (
    RADIO_STATIONS.find(
      (s) =>
        s.id === q ||
        s.name.toLowerCase() === q ||
        s.genre.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        q.split(/\s+/).every((part) =>
          `${s.name} ${s.genre} ${s.id}`.toLowerCase().includes(part),
        ),
    ) || null
  );
}

export function youtubeMusicSearchUrl(query: string) {
  return `https://music.youtube.com/search?q=${encodeURIComponent(query)}`;
}

export function youtubeSearchUrl(query: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function spotifySearchUrl(query: string) {
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}

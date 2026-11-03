export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  streamUrl: string;
  homepage: string;
}

/** Free public SomaFM streams — real audio, no API key. */
export const RADIO_STATIONS: RadioStation[] = [
  {
    id: "groovesalad",
    name: "Groove Salad",
    genre: "Chill / Downtempo",
    streamUrl: "https://ice1.somafm.com/groovesalad-128-mp3",
    homepage: "https://somafm.com/groovesalad/",
  },
  {
    id: "spacestation",
    name: "Space Station Soma",
    genre: "Ambient Electronic",
    streamUrl: "https://ice1.somafm.com/spacestation-128-mp3",
    homepage: "https://somafm.com/spacestation/",
  },
  {
    id: "dronezone",
    name: "Drone Zone",
    genre: "Ambient / Drone",
    streamUrl: "https://ice1.somafm.com/dronezone-128-mp3",
    homepage: "https://somafm.com/dronezone/",
  },
  {
    id: "indiepop",
    name: "Indie Pop Rocks",
    genre: "Indie Pop",
    streamUrl: "https://ice1.somafm.com/indiepop-128-mp3",
    homepage: "https://somafm.com/indiepop/",
  },
  {
    id: "beatblender",
    name: "Beat Blender",
    genre: "Deep House",
    streamUrl: "https://ice1.somafm.com/beatblender-128-mp3",
    homepage: "https://somafm.com/beatblender/",
  },
  {
    id: "defcon",
    name: "DEF CON Radio",
    genre: "Electronica",
    streamUrl: "https://ice1.somafm.com/defcon-128-mp3",
    homepage: "https://somafm.com/defcon/",
  },
  {
    id: "folkfwd",
    name: "Folk Forward",
    genre: "Alt-Folk",
    streamUrl: "https://ice1.somafm.com/folkfwd-128-mp3",
    homepage: "https://somafm.com/folkfwd/",
  },
  {
    id: "metal",
    name: "Metal Detector",
    genre: "Metal",
    streamUrl: "https://ice1.somafm.com/metal-128-mp3",
    homepage: "https://somafm.com/metal/",
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
        s.name.toLowerCase().includes(q),
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

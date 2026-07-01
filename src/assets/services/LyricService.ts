const BASE = import.meta.env.DEV ? "/lrclib/api" : "https://lrclib.net/api";

export interface LrcLine {
  time: number; // Seconds
  text: string;
}

export interface LyricsResults {
  synced: LrcLine[] | null;
  plain: string | null;
}

// Gets Cached Lyrics (Quicker)
export async function GetCached(
  title: string,
  artist: string,
  album: string,
  duration: number,
): Promise<LyricsResults> {
  const params = new URLSearchParams({
    track_name: title,
    artist_name: artist,
    album_name: album,
    duration: Math.floor(duration).toString(),
  });

  const response = await fetch(`${BASE}/get-cached?${params}`);
  if (!response.ok) return Get(title, artist, album, duration);

  const data = await response.json();

  return {
    synced: data.syncedLyrics ? parseLrc(data.syncedLyrics) : null,
    plain: data.plainLyrics ?? null,
  };
}

//Gets Lyrics from external sources (Slower) -- Backup

async function Get(
  title: string,
  artist: string,
  album: string,
  duration: number,
): Promise<LyricsResults> {
  const params = new URLSearchParams({
    artist_name: artist,
    track_name: title,
    album_name: album,
    duration: Math.floor(duration).toString(),
  });

  const response = await fetch(`${BASE}/get?${params}`);
  if (!response.ok) return { synced: null, plain: null };

  const data = await response.json();

  return {
    synced: data.syncedLyrics ? parseLrc(data.syncedLyrics) : null,
    plain: data.plainLyrics ?? null,
  };
}

function parseLrc(lrc: string): LrcLine[] {
  const lines: LrcLine[] = [];
  const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;

  for (const line of lrc.split("\n")) {
    const match = line.match(regex);
    if (!match) continue;
    const minutes = parseInt(match[1]);
    const seconds = parseInt(match[2]);
    const ms = parseInt(match[3]);
    lines.push({
      time: minutes * 60 + seconds + ms / 1000,
      text: match[4].trim(),
    });
  }
  return lines;
}

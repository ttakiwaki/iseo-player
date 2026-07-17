export interface Track {
  title: string;
  url: string;
  artist?: string;
  album?: string;
  trackNumber?: number;
  metaDuration?: number;
  cover?: string | undefined;
  albumArtist?: string | undefined;
  albumMBID?: string | undefined;
}

export interface Album {
  title: string;
  cover: string | null;
  tracks: Array<Track>;
  artist?: string;
}

export interface Track {
  title: string;
  url: string;
  artist?: string;
  trackNumber?: number;
  metaDuration?: number;
}

export interface Album {
  title: string;
  cover: string | null;
  tracks: Array<Track>;
  artist?: string;
}

import "./MPlayerLyrics.css";
import MLyricsBody from "./MLyricsBody/MLyricsBody";
import type { Album } from "../../../../types";
import type { LyricsResults } from "../../../../assets/services/LyricService";

import iconlight from "../../../../assets/icons/icon-light.svg";
import icondark from "../../../../assets/icons/icon-dark.svg";

interface MPlayerLyricsProps {
  albumsArray: Album[];
  currentAlbum: number | null;
  currentTrack: number | null;
  lyrics: LyricsResults | null;
  sync: boolean;
  isDark: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

function MPlayerLyrics({
  albumsArray,
  currentAlbum,
  currentTrack,
  lyrics,
  sync,
  isDark,
  audioRef,
}: MPlayerLyricsProps) {
  return (
    <div className="mplayer-lyrics">
      <div className="mlyrics-header">
        <div className="mlyrics-header-left">
          <img
            src={
              currentAlbum !== null && currentTrack !== null
                ? (albumsArray[currentAlbum].tracks[currentTrack].cover ??
                  albumsArray[currentAlbum].cover ??
                  (isDark ? icondark : iconlight))
                : isDark
                  ? icondark
                  : iconlight
            }
            alt=""
          />
          <div className="mlyrics-info">
            <p>
              {currentAlbum !== null && currentTrack !== null
                ? (albumsArray[currentAlbum].tracks[currentTrack].title.replace(
                    /\.(mp3|flac|wav|aac|ogg|m4a)$/i,
                    "",
                  ) ?? "Unknown")
                : "Unknown"}
            </p>
            <p>
              {currentAlbum !== null && currentTrack !== null
                ? (albumsArray[currentAlbum].tracks[currentTrack].artist ??
                  "Unknown")
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>
      <MLyricsBody lyrics={lyrics} audioRef={audioRef} sync={sync} />
    </div>
  );
}

export default MPlayerLyrics;

import type { Album } from "../../../types";
import { AudioLines } from "lucide-react";
import "./LyricHeader.css";
import type { LyricsResults } from "../../../assets/services/LyricService";

import iconlight from "../../../assets/icons/icon-light.svg";
import icondark from "../../../assets/icons/icon-dark.svg";

interface LyricHeaderProps {
  albumsArray: Album[];
  currentAlbum: number | null;
  currentTrack: number | null;
  lyrics: LyricsResults | null;
  sync: boolean;
  setSync: (value: boolean) => void;
  isDark: boolean;
}

function LyricHeader({
  albumsArray,
  currentAlbum,
  currentTrack,
  lyrics,
  setSync,
  sync,
  isDark,
}: LyricHeaderProps) {
  return (
    <div className="lyricheader">
      <div className="lyricheader-left">
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
        <div className="lyricheader-info">
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
      <div className={lyrics?.synced ? "lyric-sync" : "hidden"}>
        <button
          onClick={() => {
            setSync(!sync);
          }}
        >
          <AudioLines className={sync ? "selected" : ""}></AudioLines>
          <span className={sync ? "selected" : "fontColor"}>Sync</span>
        </button>
      </div>
    </div>
  );
}

export default LyricHeader;

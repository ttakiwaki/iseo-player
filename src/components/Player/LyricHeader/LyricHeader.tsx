import type { Album, Track } from "../../../types";
import { AudioLines } from "lucide-react";
import "./LyricHeader.css";

interface LyricHeaderProps {
  album: Album;
  track: Track;
  sync: boolean;
  setSync: (value: boolean) => void;
}

function LyricHeader({ album, track, setSync, sync }: LyricHeaderProps) {
  return (
    <div className="lyricheader">
      <div className="lyricheader-left">
        <img src={track.cover ?? album.cover ?? ""} alt="" />
        <div className="lyricheader-info">
          <p>{track.title.replace(/\.(mp3|flac|wav|aac|ogg|m4a)$/i, "")}</p>
          <p>{track.artist}</p>
        </div>
      </div>
      <div className="lyric-sync">
        <button
          onClick={() => {
            setSync(!sync);
          }}
        >
          <AudioLines className={sync ? "button-selected" : ""}></AudioLines>
          <span className={sync ? "button-selected" : ""}>Sync</span>
        </button>
      </div>
    </div>
  );
}

export default LyricHeader;

import type { Album, Track } from "../../../types";
import "./PlayerDisplay.css";
import iconlight from "../../../assets/icons/icon-light.svg";
import icondark from "../../../assets/icons/icon-dark.svg";

interface PlayerDisplayProps {
  album: Album;
  track: Track;
  isDark: boolean;
}

function PlayerDisplay({ album, track, isDark }: PlayerDisplayProps) {
  return (
    <div className="player-display">
      <img
        src={track.cover ?? album.cover ?? (isDark ? icondark : iconlight)}
        alt=""
      />
      <div className="player-info">
        <p className="player-title">
          {track.title.replace(/\.(mp3|flac|wav|aac|ogg|m4a)$/i, "")}
        </p>
        <p className="player-artist">{track.artist}</p>
      </div>
    </div>
  );
}

export default PlayerDisplay;

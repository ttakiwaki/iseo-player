import type { Album, Track } from "../../../types";
import "./PlayerDisplay.css";

interface PlayerDisplayProps {
  album: Album;
  track: Track;
}

function PlayerDisplay({ album, track }: PlayerDisplayProps) {
  return (
    <div className="player-display">
      <img src={album.cover ?? ""} alt="" />
      <div className="player-info">
        <p className="player-title">{track.title.replace(/\.[^/.]+$/, "")}</p>
        <p className="player-artist">{track.artist}</p>
      </div>
    </div>
  );
}

export default PlayerDisplay;

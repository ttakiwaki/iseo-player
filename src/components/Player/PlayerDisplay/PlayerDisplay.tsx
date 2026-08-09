import type { Album } from "../../../types";
import "./PlayerDisplay.css";
import iconlight from "../../../assets/icons/icon-light.svg";
import icondark from "../../../assets/icons/icon-dark.svg";

interface PlayerDisplayProps {
  albumsArray: Album[];
  currentTrack: number | null;
  currentAlbum: number | null;
  isDark: boolean;
}

function PlayerDisplay({
  currentAlbum,
  currentTrack,
  albumsArray,
  isDark,
}: PlayerDisplayProps) {
  return (
    <div className="player-display">
      <img
        src={
          (currentAlbum !== null && currentTrack !== null
            ? albumsArray[currentAlbum]?.tracks[currentTrack]?.cover
            : null) ?? (isDark ? icondark : iconlight)
        }
        alt=""
      />
      <div className="player-info">
        <p>
          {(currentAlbum !== null && currentTrack !== null
            ? albumsArray[currentAlbum]?.tracks[currentTrack].title
            : null) ?? "Not Playing"}
        </p>
        <p>
          {(currentAlbum !== null && currentTrack !== null
            ? albumsArray[currentAlbum]?.tracks[currentTrack].artist
            : null) ?? " -- "}
        </p>
      </div>
    </div>
  );
}

export default PlayerDisplay;

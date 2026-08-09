import "./VibrantBg.css";
import type { Album } from "../../types";

interface VibrantBgProps {
  vibranceEnabled: boolean;
  albumsArray: Album[];
  currentAlbum: number | null;
  currentTrack: number | null;
}

function VibrantBg({
  vibranceEnabled,
  albumsArray,
  currentAlbum,
  currentTrack,
}: VibrantBgProps) {
  if (
    vibranceEnabled === false ||
    albumsArray === null ||
    currentAlbum === null ||
    currentTrack === null
  )
    return null;

  return (
    <img
      className="vibrant-bg"
      src={albumsArray[currentAlbum].tracks[currentTrack].cover}
    ></img>
  );
}

export default VibrantBg;

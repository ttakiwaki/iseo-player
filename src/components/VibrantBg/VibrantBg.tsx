import "./VibrantBg.css";
import type { Album } from "../../types";

interface VibrantBgProps {
  vibranceEnabled: boolean;
  albumsArray: Album[];
  currentAlbum: number | null;
  currentTrack: number | null;
  mobile?: boolean;
}

function VibrantBg({
  vibranceEnabled,
  albumsArray,
  currentAlbum,
  currentTrack,
  mobile,
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
      className={mobile ? "vibrant-bg-mobile" : "vibrant-bg"}
      src={albumsArray[currentAlbum].tracks[currentTrack].cover}
    ></img>
  );
}

export default VibrantBg;

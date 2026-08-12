import type { Album } from "../../../../types";
import iconlight from "../../../../assets/icons/icon-light.svg";
import icondark from "../../../../assets/icons/icon-dark.svg";
import "./MAlbumTile.css";

interface MAlbumTileProps {
  album: Album;
  originalIndex: number;
  setViewedAlbum: (value: number | null) => void;
  isDark: boolean;
  albumOpen: boolean;
  setAlbumOpen: (value: boolean) => void;
  playerOpen: boolean;
}

function MAlbumTile({
  album,
  originalIndex,
  setViewedAlbum,
  isDark,
  albumOpen,
  setAlbumOpen,
  playerOpen,
}: MAlbumTileProps) {
  if (!album) return null;

  return (
    <div
      className="malbum-tile"
      onClick={() => {
        if (!albumOpen && !playerOpen) {
          setViewedAlbum(originalIndex);
          setAlbumOpen(true);
        }
      }}
    >
      <img
        src={
          album.title === "NA" ||
          album.title === "Singles" ||
          album.title === "Various"
            ? isDark
              ? icondark
              : iconlight
            : (album.cover ??
              album.tracks[0]?.cover ??
              (isDark ? icondark : iconlight))
        }
        alt=""
      />
      <p className="malbum-tile-title">{album.title}</p>
      <p className="malbum-tile-artist">{album.artist}</p>
    </div>
  );
}

export default MAlbumTile;

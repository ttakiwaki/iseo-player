import type { Album } from "../../../../types";
import iconlight from "../../../../assets/icons/icon-light.svg";
import icondark from "../../../../assets/icons/icon-dark.svg";
import "./AlbumTile.css";

interface AlbumTileProps {
  album: Album;
  originalIndex: number;
  setViewedAlbum: (value: number | null) => void;
  isDark: boolean;
}

function AlbumTile({
  album,
  originalIndex,
  setViewedAlbum,
  isDark,
}: AlbumTileProps) {
  if (!album) return null;

  return (
    <div className="album-tile" onClick={() => setViewedAlbum(originalIndex)}>
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
      <p className="album-tile-title">{album.title}</p>
      <p className="album-tile-artist">{album.artist}</p>
    </div>
  );
}

export default AlbumTile;

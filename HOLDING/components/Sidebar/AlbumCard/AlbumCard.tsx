import "./AlbumCard.css";
import iconlight from "../../../assets/icons/icon-light.svg";
import icondark from "../../../assets/icons/icon-dark.svg";
import { useState } from "react";
import type { Album } from "../../../types";

interface AlbumCardProps extends Album {
  currentTrack: number | null;
  currentAlbum: number | null;
  setTrack: (value: number | null) => void;
  setAlbum: (value: number | null) => void;
  albumIndex: number;
  isDark: boolean;
}

function AlbumCard({
  currentTrack,
  currentAlbum,
  title,
  cover,
  tracks,
  artist,
  setTrack,
  setAlbum,
  albumIndex,
  isDark,
}: AlbumCardProps) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m)}:${String(s).padStart(2, "0")}`;
  }

  const artists = tracks.map((track) => track.artist);
  const uniqueArtists = new Set(artists);

  return (
    <div className="album-card" onClick={handleClick}>
      <div className="album-head">
        <img src={cover ?? (isDark ? icondark : iconlight)} alt="cover" />
        <div className="card-info">
          <p className="card-title">{title}</p>
          <p className="card-artist">
            {tracks[0]?.albumArtist ??
              (uniqueArtists.size > 3 ? "Various Artists" : artist)}
          </p>
        </div>
      </div>
      <div className="album-foot">
        {open ? (
          <ul>
            {tracks.map((track, index) => (
              <li
                className={
                  currentTrack === index && currentAlbum === albumIndex
                    ? "song-selected"
                    : ""
                }
                key={track.url}
                onClick={(e) => {
                  e.stopPropagation();
                  setAlbum(albumIndex);
                  setTrack(index);
                }}
              >
                <div className="album-foot-song">
                  <span>{track.trackNumber ?? index + 1}</span>
                  <span>
                    {track.title.replace(/\.(mp3|flac|wav|aac|ogg|m4a)$/i, "")}
                  </span>
                  <span>
                    {track.metaDuration ? formatTime(track.metaDuration) : ""}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default AlbumCard;

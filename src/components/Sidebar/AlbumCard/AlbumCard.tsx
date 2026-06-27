import "./AlbumCard.css";
import icon from "../../../assets/icons/icon-light.svg";
import { useState } from "react";
import type { Album } from "../../../types";

interface AlbumCardProps extends Album {
  currentTrack: number | null;
  currentAlbum: number | null;
  setTrack: (value: number | null) => void;
  setAlbum: (value: number | null) => void;
  albumIndex: number;
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

  return (
    <div className="album-card" onClick={handleClick}>
      <div className="album-head">
        <img src={cover ?? icon} alt="cover" />
        <div className="card-info">
          <p className="card-title">{title}</p>
          <p className="card-artist">{artist}</p>
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
                  <span>{track.title.replace(/\.[^/.]+$/, "")}</span>
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

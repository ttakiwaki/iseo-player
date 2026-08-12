import "./MAlbumInfo.css";
import { ChevronLeft } from "lucide-react";
import { formatTime } from "../../../assets/services/FormatTime";
import type { Album, Track } from "../../../types";

import iconlight from "../../../assets/icons/icon-light.svg";
import icondark from "../../../assets/icons/icon-dark.svg";

interface MAlbumInfoProps {
  currentAlbum: number | null;
  currentTrack: number | null;
  setTrack: (value: number | null) => void;
  albumsArray: Album[];
  setAlbum: (value: number | null) => void;
  viewedAlbum: number | null;
  isDark: boolean;
  originalTracksRef: React.RefObject<Track[]>;
  setShuffling: (value: boolean) => void;
  shuffling: boolean;
  albumOpen: boolean;
  setAlbumOpen: (value: boolean) => void;
}

function MAlbumInfo({
  currentAlbum,
  albumsArray,
  setTrack,
  currentTrack,
  setAlbum,
  viewedAlbum,
  isDark,
  originalTracksRef,
  setShuffling,
  shuffling,
  albumOpen,
  setAlbumOpen,
}: MAlbumInfoProps) {
  if (viewedAlbum === null) return null;

  return (
    <div className="malbum-info">
      <div className="malbum-info-header">
        <ChevronLeft
          className="close-album"
          onClick={() => {
            if (albumOpen) {
              setAlbumOpen(false);
            }
          }}
        />
      </div>

      <div className="malbum-info-content">
        <img
          src={
            albumsArray[viewedAlbum].title === "NA" ||
            albumsArray[viewedAlbum].title === "Singles" ||
            albumsArray[viewedAlbum].title === "Various"
              ? isDark
                ? icondark
                : iconlight
              : (albumsArray[viewedAlbum].cover ??
                albumsArray[viewedAlbum].tracks[0].cover ??
                (isDark ? icondark : iconlight))
          }
          alt=""
        />
        <div className="malbum-info-text">
          <p className="">
            Album <span>•</span> {albumsArray[viewedAlbum].tracks.length} Songs
          </p>
          <p>{albumsArray[viewedAlbum ?? 0]?.title}</p>
          <p>{albumsArray[viewedAlbum ?? 0]?.artist}</p>
        </div>
      </div>
      <div
        className={
          currentAlbum !== null && currentTrack !== null
            ? "malbuminfo-songs taller"
            : "malbuminfo-songs"
        }
      >
        <ul>
          {albumsArray[viewedAlbum].tracks.map((track, index) => (
            <li
              className={
                currentTrack === index && currentAlbum === viewedAlbum
                  ? "selected"
                  : ""
              }
              key={track.url}
              onClick={(e) => {
                e.stopPropagation();
                if (currentAlbum !== null && shuffling) {
                  console.log(originalTracksRef.current);
                  albumsArray[currentAlbum].tracks = originalTracksRef.current;
                  setShuffling(false);
                }
                setAlbum(viewedAlbum);
                setTrack(index);
              }}
            >
              <div className="malbuminfo-song">
                <span>{track.trackNumber ?? index + 1}</span>
                <div>
                  <span>
                    {track.title.replace(/\.(mp3|flac|wav|aac|ogg|m4a)$/i, "")}
                  </span>
                  <span>{track.artist}</span>
                </div>
                <span>
                  {track.metaDuration ? formatTime(track.metaDuration) : ""}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MAlbumInfo;

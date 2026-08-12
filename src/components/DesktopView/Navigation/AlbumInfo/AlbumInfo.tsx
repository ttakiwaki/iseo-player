import type { Album, Track } from "../../../../types/index";
import { formatTime } from "../../../../assets/services/FormatTime";
import iconlight from "../../../../assets/icons/icon-light.svg";
import icondark from "../../../../assets/icons/icon-dark.svg";
import "./AlbumInfo.css";

interface AlbumInfoProps {
  currentAlbum: number | null;
  currentTrack: number | null;
  setTrack: (value: number | null) => void;
  albumsArray: Album[];
  setAlbum: (value: number | null) => void;
  viewedAlbum: number | null;
  navCollapsed: boolean;
  isDark: boolean;
  originalTracksRef: React.RefObject<Track[]>;
  setShuffling: (value: boolean) => void;
  shuffling: boolean;
}

function AlbumInfo({
  currentAlbum,
  albumsArray,
  setTrack,
  currentTrack,
  setAlbum,
  viewedAlbum,
  navCollapsed,
  isDark,
  originalTracksRef,
  setShuffling,
  shuffling,
}: AlbumInfoProps) {
  if (viewedAlbum === null) return <div className="albuminfo"></div>;

  return (
    <>
      {!navCollapsed ? (
        <div className="albuminfo">
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
            className="albuminfo-image"
          />
          <div className="albuminfo-details">
            <p className="albuminfo-title">
              {albumsArray[viewedAlbum].title ?? "Unknown"}
            </p>
            <p style={{ textAlign: "center" }}>
              {albumsArray[viewedAlbum].artist ?? "Unknown"}
            </p>
          </div>
          <hr className="albuminfo-rule"></hr>
          <div className="albuminfo-footer">
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
                      albumsArray[currentAlbum].tracks =
                        originalTracksRef.current;
                      setShuffling(false);
                    }
                    setAlbum(viewedAlbum);
                    setTrack(index);
                  }}
                >
                  <div className="albuminfo-footer-song">
                    <span>{track.trackNumber ?? index + 1}</span>
                    <span>
                      {track.title.replace(
                        /\.(mp3|flac|wav|aac|ogg|m4a)$/i,
                        "",
                      )}
                    </span>
                    <span>
                      {track.metaDuration ? formatTime(track.metaDuration) : ""}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="albuminfo"></div>
      )}
    </>
  );
}

export default AlbumInfo;

import "./PlayerMain.css";
import PlayerControls from "./PlayerControls/PlayerControls";
import TimeControls from "./TimeControls/TimeControls";
import BottomControls from "./BottomControls/BottomControls";
import PlayerDisplay from "./PlayerDisplay/PlayerDisplay";
import type { Album } from "../../types";

interface PlayerMainProps {
  currentTrack: number | null;
  currentAlbum: number | null;
  albumsArray: Album[];
  playing: boolean;
  setTrack: (value: number | null) => void;
  setAlbumsArray: (value: Album[]) => void;
  setPlaying: (value: boolean) => void;
  isDark: boolean;
  setDark: (value: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

function PlayerMain({
  currentTrack,
  currentAlbum,
  albumsArray,
  playing,
  setTrack,
  setAlbumsArray,
  setPlaying,
  isDark,
  setDark,
  audioRef,
}: PlayerMainProps) {
  if (currentAlbum === null) return null;
  const album = albumsArray[currentAlbum];

  if (currentTrack === null) return null;
  const track = album.tracks[currentTrack];

  return (
    <div className="player-main">
      <PlayerDisplay album={album} track={track}></PlayerDisplay>
      <TimeControls audioRef={audioRef}></TimeControls>
      <PlayerControls
        currentTrack={currentTrack}
        currentAlbum={currentAlbum}
        albumsArray={albumsArray}
        playing={playing}
        setTrack={setTrack}
        setAlbumsArray={setAlbumsArray}
        setPlaying={setPlaying}
        audioRef={audioRef}
      ></PlayerControls>
      <BottomControls
        audioRef={audioRef}
        isDark={isDark}
        setDark={setDark}
      ></BottomControls>
    </div>
  );
}

export default PlayerMain;

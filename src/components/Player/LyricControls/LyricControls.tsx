import PlayerControls from "../PlayerControls/PlayerControls";
import TimeControls from "../TimeControls/TimeControls";

import "../TimeControls/TimeControls.css";
import "../PlayerControls/PlayerControls.css";
import "./LyricControls.css";
import type { Album } from "../../../types";

interface LyricControlsProps {
  currentTime: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setCurrentTime: (value: number) => void;
  currentTrack: number | null;
  currentAlbum: number | null;
  albumsArray: Album[];
  playing: boolean;
  setTrack: (value: number | null) => void;
  setAlbumsArray: (value: Album[]) => void;
  setPlaying: (value: boolean) => void;
  looping: boolean;
  setLooping: (value: boolean) => void;
}

function LyricControls({
  currentTime,
  audioRef,
  setCurrentTime,
  currentTrack,
  currentAlbum,
  albumsArray,
  playing,
  setTrack,
  setAlbumsArray,
  setPlaying,
  looping,
  setLooping,
}: LyricControlsProps) {
  return (
    <div className="lyriccontrols">
      <div className="lyriccontrols-top">
        <TimeControls
          currentTime={currentTime}
          audioRef={audioRef}
          setCurrentTime={setCurrentTime}
        ></TimeControls>
      </div>
      <div className="lyriccontrols-bot">
        <PlayerControls
          currentTrack={currentTrack}
          currentAlbum={currentAlbum}
          albumsArray={albumsArray}
          playing={playing}
          setTrack={setTrack}
          setAlbumsArray={setAlbumsArray}
          setPlaying={setPlaying}
          audioRef={audioRef}
          looping={looping}
          setLooping={setLooping}
        ></PlayerControls>
      </div>
    </div>
  );
}

export default LyricControls;

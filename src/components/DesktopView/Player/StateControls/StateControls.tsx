import "./StateControls.css";
import usePlayerControls from "../../../../hooks/usePlayerControls";
import type { Album, Track } from "../../../../types";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
} from "lucide-react";

interface StateControlsProps {
  currentTrack: number | null;
  currentAlbum: number | null;
  albumsArray: Album[];
  playing: boolean;
  setTrack: (value: number | null) => void;
  setAlbumsArray: (value: Album[]) => void;
  setPlaying: (value: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  looping: boolean;
  setLooping: (value: boolean) => void;
  setCurrentTime: (value: number) => void;
  currentTime: number;
  shuffling: boolean;
  setShuffling: (value: boolean) => void;
  originalTracksRef: React.RefObject<Track[]>;
}

function StateControls({
  currentTrack,
  currentAlbum,
  albumsArray,
  playing,
  setTrack,
  setAlbumsArray,
  setPlaying,
  audioRef,
  looping,
  setLooping,
  setCurrentTime,
  currentTime,
  shuffling,
  setShuffling,
  originalTracksRef,
}: StateControlsProps) {
  const { handlePlayPause, nextSong, prevSong, shuffleSong, loopSong } =
    usePlayerControls({
      currentTrack,
      currentAlbum,
      albumsArray,
      playing,
      setTrack,
      setAlbumsArray,
      setPlaying,
      audioRef,
      looping,
      setLooping,
      setCurrentTime,
      currentTime,
      shuffling,
      setShuffling,
      originalTracksRef,
    });

  return (
    <div className="state-controls">
      <Shuffle
        className={shuffling ? "small-controls selected" : "small-controls"}
        onClick={shuffleSong}
      ></Shuffle>
      <div className="main-controls">
        <SkipBack
          className="control-icon secondary"
          onClick={prevSong}
        ></SkipBack>
        {playing ? (
          <Pause
            className="control-icon primary"
            onClick={() => {
              handlePlayPause();
            }}
          ></Pause>
        ) : (
          <Play
            className="control-icon primary"
            onClick={() => {
              handlePlayPause();
            }}
          ></Play>
        )}
        <SkipForward
          className="control-icon secondary"
          onClick={nextSong}
        ></SkipForward>
      </div>
      <Repeat
        className={looping ? "small-controls selected" : "small-controls"}
        onClick={() => {
          loopSong();
        }}
      ></Repeat>
    </div>
  );
}

export default StateControls;

import { useEffect, useState } from "react";
import type { Album, Track } from "../../../../types";
import Scrubber from "../../../Scrubber/Scrubber";
import StateControls from "../StateControls/StateControls";
import "./PlayerControls.css";

interface PlayerControlsProps {
  albumsArray: Album[];
  currentAlbum: number | null;
  currentTrack: number | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playing: boolean;
  setTrack: (value: number | null) => void;
  setAlbumsArray: (value: Album[]) => void;
  setPlaying: (value: boolean) => void;
  looping: boolean;
  setLooping: (value: boolean) => void;
  shuffling: boolean;
  setShuffling: (value: boolean) => void;
  originalTracksRef: React.RefObject<Track[]>;
}

function PlayerControls({
  albumsArray,
  currentAlbum,
  currentTrack,
  audioRef,
  playing,
  setTrack,
  setAlbumsArray,
  setPlaying,
  looping,
  setLooping,
  shuffling,
  setShuffling,
  originalTracksRef,
}: PlayerControlsProps) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function handleTimeUpdate() {
      setCurrentTime(audio!.currentTime);
    }
    function handleLoadedMetadata() {
      setDuration(audio!.duration);
    }

    if (audio.readyState >= 1) {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    }

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef]);

  return (
    <div className="player-controls">
      <div className="timebar-container">
        <Scrubber
          size="medium"
          value={duration > 0 ? (currentTime / duration) * 100 : 0}
          onChange={(percent) => {
            if (audioRef.current) {
              const newTime = (percent / 100) * audioRef.current.duration;
              audioRef.current.currentTime = newTime;
              setCurrentTime(newTime);
            }
          }}
          currentTime={currentTime}
          duration={duration}
        ></Scrubber>
        <StateControls
          albumsArray={albumsArray}
          currentAlbum={currentAlbum}
          currentTrack={currentTrack}
          audioRef={audioRef}
          playing={playing}
          setTrack={setTrack}
          setAlbumsArray={setAlbumsArray}
          setPlaying={setPlaying}
          looping={looping}
          setLooping={setLooping}
          setCurrentTime={setCurrentTime}
          currentTime={currentTime}
          shuffling={shuffling}
          setShuffling={setShuffling}
          originalTracksRef={originalTracksRef}
        ></StateControls>
      </div>
    </div>
  );
}

export default PlayerControls;

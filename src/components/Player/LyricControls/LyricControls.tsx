import { useEffect, useState } from "react";
import type { Album } from "../../../types";
import Scrubber from "../../Scrubber/Scrubber";
import StateControls from "../StateControls/StateControls";
import "./LyricControls.css";

interface LyricControlsProps {
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
}

function LyricControls({
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
}: LyricControlsProps) {
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
        ></StateControls>
      </div>
    </div>
  );
}

export default LyricControls;

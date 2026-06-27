import { useEffect, useState } from "react";
import "./TimeControls.css";

interface TimeControlsProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m)}:${String(s).padStart(2, "0")}`;
}

function TimeControls({ audioRef }: TimeControlsProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [audioRef]);

  return (
    <div className="time-controls">
      <p>{formatTime(currentTime)}</p>
      <input
        type="range"
        id="scrubber"
        min="0"
        max={duration}
        defaultValue="0"
        value={currentTime}
        onChange={(e) => {
          const newTime = Number(e.target.value);
          setCurrentTime(newTime);
          if (audioRef.current) {
            audioRef.current.currentTime = newTime;
          }
        }}
      />
      <p>{formatTime(duration)}</p>
    </div>
  );
}

export default TimeControls;

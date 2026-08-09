import { useEffect, useState } from "react";
import "./TimeControls.css";

interface TimeControlsProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentTime: number;
  setCurrentTime: (value: number) => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m)}:${String(s).padStart(2, "0")}`;
}

function TimeControls({ audioRef, currentTime }: TimeControlsProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateDuration = () => setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", updateDuration);

    if (audio.duration) setDuration(audio.duration);

    return () => {
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
          if (audioRef.current)
            audioRef.current.currentTime = Number(e.target.value);
        }}
      />
      <p>{formatTime(duration)}</p>
    </div>
  );
}

export default TimeControls;

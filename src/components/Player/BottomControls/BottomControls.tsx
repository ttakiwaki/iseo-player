import "./BottomControls.css";
import { Volume2, MicVocal } from "lucide-react";
import { useState } from "react";

interface VolumeScrubberProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setLyricsOpen: (value: boolean) => void;
  lyricsOpen: boolean;
}

function BottomControls({
  audioRef,
  setLyricsOpen,
  lyricsOpen,
}: VolumeScrubberProps) {
  const [volOpen, setVolOpen] = useState(true);

  return (
    <div className="bottom-controls">
      <button
        onClick={() => {
          setLyricsOpen(!lyricsOpen);
        }}
      >
        <MicVocal className="button-iconsm"></MicVocal>
      </button>

      <button
        onClick={() => {
          setVolOpen(!volOpen);
        }}
      >
        <Volume2 className="button-iconsm"></Volume2>
      </button>
      <input
        className={volOpen ? "hidden" : ""}
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        onChange={(e) => {
          const newVolume = Number(e.target.value) / 100;
          if (audioRef.current) {
            audioRef.current.volume = newVolume;
          }
        }}
      />
    </div>
  );
}

export default BottomControls;

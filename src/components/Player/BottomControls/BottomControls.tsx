import "./BottomControls.css";
import { Volume2, Palette, MoonStar, Sun } from "lucide-react";
import { useState } from "react";

interface VolumeScrubberProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isDark: boolean;
  setDark: (value: boolean) => void;
}

function BottomControls({ audioRef, isDark, setDark }: VolumeScrubberProps) {
  const [volOpen, setVolOpen] = useState(true);

  return (
    <div className="bottom-controls">
      <button
        onClick={() => {
          document.documentElement.classList.toggle("dark");
          setDark(!isDark);
        }}
      >
        {isDark ? (
          <Sun className="button-iconsm"></Sun>
        ) : (
          <MoonStar className="button-iconsm"></MoonStar>
        )}
      </button>

      <button
        onClick={() => {
          const newColor = window.prompt(
            "New Select Color? Return a Hex Code (Default: FF746C)",
          );
          if (newColor === null) return;
          else {
            document.documentElement.style.setProperty(
              "--selectColor",
              "#" + newColor,
            );
          }
        }}
      >
        <Palette className="button-iconsm"></Palette>
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

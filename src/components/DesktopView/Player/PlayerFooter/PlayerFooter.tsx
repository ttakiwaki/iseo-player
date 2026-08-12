import { Volume2, MicVocal } from "lucide-react";
import Scrubber from "../../../Scrubber/Scrubber";
import "./PlayerFooter.css";

interface PlayerVolumeProps {
  setVolume: (value: number) => void;
  volume: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  lyricsOpen: boolean;
  setLyricsOpen: (value: boolean) => void;
}

function PlayerVolume({
  volume,
  setVolume,
  audioRef,
  lyricsOpen,
  setLyricsOpen,
}: PlayerVolumeProps) {
  return (
    <div className="player-footer">
      <MicVocal
        className="lyric-button"
        onClick={() => {
          setLyricsOpen(!lyricsOpen);
        }}
      ></MicVocal>
      <div className="player-volume">
        <Volume2 size={20}></Volume2>
        <div className="volumebar-container">
          <Scrubber
            value={volume * 100}
            onChange={(percent) => {
              setVolume(percent / 100);
              if (audioRef.current) audioRef.current.volume = percent / 100;
            }}
            size={"large"}
          ></Scrubber>
        </div>
      </div>
    </div>
  );
}

export default PlayerVolume;

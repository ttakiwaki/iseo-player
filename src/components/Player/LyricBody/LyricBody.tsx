import { useRef, useEffect, useState } from "react";
import type { LyricsResults } from "../../../assets/services/LyricService";
import "./LyricBody.css";

interface LyricBodyProps {
  lyrics: LyricsResults | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  sync: boolean;
}

function LyricBody({ lyrics, audioRef, sync }: LyricBodyProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const activeRef = useRef<HTMLParagraphElement>(null);
  const activeIndex =
    lyrics?.synced?.findLastIndex((line) => line.time <= currentTime) ?? -1;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    function handleTimeUpdate() {
      setCurrentTime(audio!.currentTime);
    }
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef]);

  useEffect(() => {
    console.log("effect fired", { sync, activeIndex, ref: activeRef.current });
    if (sync) {
      activeRef.current?.scrollIntoView({
        block: "center",
      });
    }
  }, [activeIndex]);

  if (!lyrics) return <div className="lyric-area">Finding your lyrics...</div>;
  if (!lyrics.plain && !lyrics.synced)
    return <div className="lyric-area">No lyrics found</div>;

  if (lyrics.synced) {
    return (
      <div className="lyric-area">
        {lyrics.synced.map((line, i) => (
          <p
            key={i}
            ref={i === activeIndex ? activeRef : null}
            className={i === activeIndex ? "active" : ""}
          >
            {line.text}
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div className="lyric-area">
        {lyrics.plain?.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    );
  }
}

export default LyricBody;

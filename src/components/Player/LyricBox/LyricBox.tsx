import { useRef, useEffect } from "react";
import type { LyricsResults } from "../../../assets/services/LyricService";
import "./LyricBox.css";

interface LyricBoxProps {
  lyrics: LyricsResults | null;
  currentTime: number;
  sync: boolean;
}

function LyricBox({ lyrics, currentTime, sync }: LyricBoxProps) {
  if (!lyrics) return <div className="lyric-area">Finding your lyrics...</div>;
  if (!lyrics.plain && !lyrics.synced)
    return <div className="lyric-area">No lyrics found</div>;

  if (lyrics.synced) {
    const activeIndex = lyrics.synced.findLastIndex(
      (line) => line.time <= currentTime,
    );

    useEffect(() => {
      if (sync) {
        activeRef.current?.scrollIntoView({
          block: "center",
        });
      }
    }, [activeIndex]);

    const activeRef = useRef<HTMLParagraphElement>(null);

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
  }

  return (
    <div className="lyric-area">
      {lyrics.plain?.split("\n").map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}

export default LyricBox;

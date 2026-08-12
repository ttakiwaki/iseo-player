import { useRef, useEffect, useState } from "react";
import type { LyricsResults } from "../../../../../assets/services/LyricService";
import "./MLyricsBody.css";

interface MLyricsBodyProps {
  lyrics: LyricsResults | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  sync: boolean;
}

function MLyricsBody({ lyrics, audioRef, sync }: MLyricsBodyProps) {
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
    if (sync && activeRef.current) {
      const container = activeRef.current.closest(
        ".mlyric-area",
      ) as HTMLElement | null;
      if (!container) return;

      const el = activeRef.current;
      const targetScroll =
        el.offsetTop - container.clientHeight * 0.75 + el.clientHeight / 2;

      const maxScroll = container.scrollHeight - container.clientHeight;
      container.scrollTop = Math.max(0, Math.min(targetScroll, maxScroll));
    }
  }, [activeIndex]);

  if (!lyrics) return <div className="mlyric-area">Finding your lyrics...</div>;
  if (!lyrics.plain && !lyrics.synced)
    return <div className="mlyric-area">No lyrics found</div>;

  if (lyrics.synced) {
    return (
      <div className="mlyric-area">
        {lyrics.synced.map((line, i) => (
          <p
            key={i}
            ref={i === activeIndex ? activeRef : null}
            className={i === activeIndex ? "mactive" : ""}
          >
            {line.text}
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div className="mlyric-area">
        {lyrics.plain?.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    );
  }
}

export default MLyricsBody;

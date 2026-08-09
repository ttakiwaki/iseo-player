import "./Scrubber.css";
import { useRef, useEffect, useState } from "react";
import { formatTime } from "../../assets/services/FormatTime";

interface ScrubberProps {
  value: number;
  onChange: (value: number) => void;
  size: "small" | "medium" | "large";
  currentTime?: number;
  duration?: number;
}

function Scrubber({
  value,
  onChange,
  size,
  currentTime,
  duration,
}: ScrubberProps) {
  const [dragging, setDragging] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<number>(value);
  const trackRef = useRef<HTMLDivElement>(null);

  function calculatePercent(clientX: number) {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    return Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );
  }

  function handlePointerDown(e: React.PointerEvent) {
    setDragging(true);
    const percent = calculatePercent(e.clientX);
    setLocalValue(percent);
    onChange(percent);
  }

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      if (!dragging) return;
      const percent = calculatePercent(e.clientX);
      setLocalValue(percent);
      onChange(percent);
    }

    function handlePointerUp() {
      if (!dragging) return;
      setDragging(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragging, localValue]);

  const displayValue = dragging ? localValue : value;
  const showTime = currentTime !== undefined && duration !== undefined;

  return (
    <div className="scrubber-wrapper">
      {showTime && <p className="scrubber-time">{formatTime(currentTime)}</p>}
      <div
        className={`scrubber-track scrubber-${size}`}
        ref={trackRef}
        onPointerDown={handlePointerDown}
      >
        <div
          className="scrubber-fill"
          style={{ width: `${displayValue}%` }}
        ></div>
        <div
          className="scrubber-location"
          style={{ left: `${displayValue}%` }}
        ></div>
      </div>
      {showTime && <p className="scrubber-time">{formatTime(duration)}</p>}
    </div>
  );
}

export default Scrubber;

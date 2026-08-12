import { useEffect, useState } from "react";
import type { Album, Track } from "../../../../types";
import type { LyricsResults } from "../../../../assets/services/LyricService";
import Scrubber from "../../../Scrubber/Scrubber";
import usePlayerControls from "../../../../hooks/usePlayerControls";
import "./MPlayerControls.css";

import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  AudioLines,
} from "lucide-react";

interface MPlayerControlsProps {
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
  shuffling: boolean;
  setShuffling: (value: boolean) => void;
  originalTracksRef: React.RefObject<Track[]>;
  setSync: (value: boolean) => void;
  sync: boolean;
  lyricsOpen: boolean;
  lyrics: LyricsResults | null;
}

function MPlayerControls({
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
  shuffling,
  setShuffling,
  originalTracksRef,
  setSync,
  sync,
  lyricsOpen,
  lyrics,
}: MPlayerControlsProps) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { handlePlayPause, nextSong, prevSong, shuffleSong, loopSong } =
    usePlayerControls({
      currentTrack,
      currentAlbum,
      albumsArray,
      playing,
      setTrack,
      setAlbumsArray,
      setPlaying,
      audioRef,
      looping,
      setLooping,
      setCurrentTime,
      currentTime,
      shuffling,
      setShuffling,
      originalTracksRef,
    });

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
    <div className="mplayer-controls">
      <div className="timebar-container">
        <Scrubber
          size="medium"
          showLocation={true}
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
      </div>
      <div className="mplayer-controls-footer">
        <div
          className={
            lyricsOpen && lyrics?.synced
              ? "mstate-controls small"
              : "mstate-controls"
          }
        >
          <Shuffle
            className={
              shuffling ? "msmall-controls selected" : "small-controls"
            }
            onClick={shuffleSong}
          ></Shuffle>
          <div className="mmain-controls">
            <SkipBack
              className="mcontrol-icon secondary"
              onClick={prevSong}
            ></SkipBack>
            {playing ? (
              <Pause
                className="mcontrol-icon primary"
                onClick={() => {
                  handlePlayPause();
                }}
              ></Pause>
            ) : (
              <Play
                className="mcontrol-icon primary"
                onClick={() => {
                  handlePlayPause();
                }}
              ></Play>
            )}
            <SkipForward
              className="mcontrol-icon secondary"
              onClick={nextSong}
            ></SkipForward>
          </div>
          <Repeat
            className={looping ? "msmall-controls selected" : "small-controls"}
            onClick={() => {
              loopSong();
            }}
          ></Repeat>
        </div>
        {lyricsOpen && lyrics?.synced && (
          <button
            onClick={() => {
              setSync(!sync);
            }}
          >
            <AudioLines className={sync ? "selected" : ""}></AudioLines>
            <span className={sync ? "selected" : "fontColor"}>Sync</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default MPlayerControls;

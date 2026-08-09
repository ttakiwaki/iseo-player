import "./StateControls.css";
import { useEffect, useRef, useState } from "react";
import type { Album, Track } from "../../../types";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
} from "lucide-react";

interface StateControlsProps {
  currentTrack: number | null;
  currentAlbum: number | null;
  albumsArray: Album[];
  playing: boolean;
  setTrack: (value: number | null) => void;
  setAlbumsArray: (value: Album[]) => void;
  setPlaying: (value: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  looping: boolean;
  setLooping: (value: boolean) => void;
  setCurrentTime: (value: number) => void;
  currentTime: number;
}

function StateControls({
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
}: StateControlsProps) {
  const [shuffling, setShuffling] = useState(false);

  const originalTracks = useRef<Track[]>([]);

  function handlePlayPause() {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play();
        setPlaying(true);
      }
    }
  }

  function nextSong() {
    if (currentAlbum === null || currentTrack === null) return;
    const nextTrack = currentTrack + 1;
    if (nextTrack < albumsArray[currentAlbum].tracks.length) {
      setTrack(nextTrack);
    }
  }

  function prevSong() {
    if (currentAlbum === null || currentTrack === null) return;
    if (currentTime >= 5) {
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      const nextTrack = currentTrack - 1;
      if (
        nextTrack >= 0 &&
        nextTrack < albumsArray[currentAlbum].tracks.length
      ) {
        setTrack(nextTrack);
      }
    }
  }

  const currentURL = useRef<string>("");
  const previousAlbum = useRef<number | undefined>(undefined);

  function shuffleSong() {
    if (currentAlbum === null || currentTrack === null) return;
    if (!shuffling) {
      setShuffling(true);
      originalTracks.current = [...albumsArray[currentAlbum].tracks];
      const shuffledTracks = [...albumsArray[currentAlbum].tracks];
      previousAlbum.current = currentAlbum;
      for (let i = shuffledTracks.length - 1; i > 0; i--) {
        const nextTrack = Math.floor(Math.random() * (i + 1));
        [shuffledTracks[i], shuffledTracks[nextTrack]] = [
          shuffledTracks[nextTrack],
          shuffledTracks[i],
        ];
      }
      const updatedAlbums = [...albumsArray];
      updatedAlbums[currentAlbum].tracks = shuffledTracks;
      setAlbumsArray(updatedAlbums);
      setTrack(0);
      if (audioRef.current) {
        audioRef.current.src = shuffledTracks[0].url;
        audioRef.current.play();
      }
    } else {
      setShuffling(false);
      currentURL.current = albumsArray[currentAlbum].tracks[currentTrack].url;
      const updatedAlbums = [...albumsArray];
      updatedAlbums[currentAlbum].tracks = originalTracks.current;
      setAlbumsArray(updatedAlbums);
      setTrack(
        albumsArray[currentAlbum].tracks.findIndex(
          (i) => i.url === currentURL.current,
        ),
      );
    }
  }
  useEffect(() => {
    if (
      shuffling &&
      currentAlbum !== null &&
      currentTrack !== null &&
      previousAlbum.current !== undefined
    ) {
      setShuffling(false);
      currentURL.current = albumsArray[currentAlbum].tracks[currentTrack].url;
      const updatedAlbums = [...albumsArray];
      updatedAlbums[previousAlbum.current].tracks = originalTracks.current;
      setAlbumsArray(updatedAlbums);
    }
  }, [currentAlbum, currentTrack, albumsArray, shuffling, setAlbumsArray]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        if (playing) {
          audioRef.current?.pause();
          setPlaying(false);
        } else {
          audioRef.current?.play();
          setPlaying(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playing, useRef]);

  return (
    <div className="state-controls">
      <Shuffle
        className={shuffling ? "small-controls selected" : "small-controls"}
        onClick={shuffleSong}
      ></Shuffle>
      <div className="main-controls">
        <SkipBack
          className="control-icon secondary"
          onClick={prevSong}
        ></SkipBack>
        {playing ? (
          <Pause
            className="control-icon primary"
            onClick={() => {
              handlePlayPause();
            }}
          ></Pause>
        ) : (
          <Play
            className="control-icon primary"
            onClick={() => {
              handlePlayPause();
            }}
          ></Play>
        )}
        <SkipForward
          className="control-icon secondary"
          onClick={nextSong}
        ></SkipForward>
      </div>
      <Repeat
        className={looping ? "small-controls selected" : "small-controls"}
        onClick={() => {
          if (!looping && currentTrack !== null && audioRef.current) {
            audioRef.current.loop = true;
            setLooping(true);
          } else {
            if (currentTrack !== null && audioRef.current) {
              audioRef.current.loop = false;
              setLooping(false);
            }
          }
        }}
      ></Repeat>
    </div>
  );
}

export default StateControls;

import "./PlayerControls.css";
import type { Album, Track } from "../../../types";
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PlayerControlsProps {
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
}

function PlayerControls({
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
}: PlayerControlsProps) {
  /* Initialize Functions */

  const [shuffling, setShuffling] = useState(false);

  const originalTracks = useRef<Track[]>([]);

  function nextSong() {
    if (currentAlbum === null || currentTrack === null) return;
    const nextTrack = currentTrack + 1;
    if (nextTrack < albumsArray[currentAlbum].tracks.length) {
      setTrack(nextTrack);
    }
  }

  function prevSong() {
    if (currentAlbum === null || currentTrack === null) return;
    const nextTrack = currentTrack - 1;
    if (nextTrack >= 0 && nextTrack < albumsArray[currentAlbum].tracks.length) {
      setTrack(nextTrack);
    }
  }

  let currentURL: string = "";
  const previousAlbum = useRef<number | undefined>(undefined);

  function shuffleSong() {
    if (currentAlbum === null || currentTrack === null) return;
    if (!shuffling) {
      setShuffling(true);
      originalTracks.current = [...albumsArray[currentAlbum].tracks];
      let shuffledTracks = albumsArray[currentAlbum].tracks;
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
      currentURL = albumsArray[currentAlbum].tracks[currentTrack].url;
      const updatedAlbums = [...albumsArray];
      updatedAlbums[currentAlbum].tracks = originalTracks.current;
      setAlbumsArray(updatedAlbums);
      setTrack(
        albumsArray[currentAlbum].tracks.findIndex((i) => i.url === currentURL),
      );
    }
  }
  useEffect(() => {
    if (
      shuffling &&
      currentAlbum &&
      currentTrack &&
      previousAlbum.current !== undefined
    ) {
      setShuffling(false);
      currentURL = albumsArray[currentAlbum].tracks[currentTrack].url;
      const updatedAlbums = [...albumsArray];
      updatedAlbums[previousAlbum.current].tracks = originalTracks.current;
      setAlbumsArray(updatedAlbums);
    }
  }, [currentAlbum]);

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
  }, [playing]);

  return (
    /* JSX */
    <div className="player-controls">
      <button className="shuffle-btn" onClick={shuffleSong}>
        <Shuffle
          className={
            shuffling ? "button-iconsm button-selected" : "button-iconsm"
          }
        ></Shuffle>
      </button>
      <button onClick={prevSong}>
        <SkipBack className="button-icon"></SkipBack>
      </button>
      <button
        onClick={() => {
          if (audioRef.current) {
            if (playing) {
              audioRef.current.pause();
              setPlaying(false);
            } else {
              audioRef.current.play();
              setPlaying(true);
            }
          }
        }}
      >
        {playing ? (
          <Pause className="button-icon"></Pause>
        ) : (
          <Play className="button-icon"></Play>
        )}
      </button>
      <button onClick={nextSong}>
        <SkipForward className="button-icon"></SkipForward>
      </button>
      <button
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
      >
        <Repeat2
          className={
            looping ? "button-iconsm button-selected" : "button-iconsm"
          }
        ></Repeat2>
      </button>
    </div>
  );
}

export default PlayerControls;

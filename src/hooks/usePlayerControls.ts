import { useEffect, useRef } from "react";
import type { Album, Track } from "../types";

interface usePlayerControlsProps {
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
  shuffling: boolean;
  setShuffling: (value: boolean) => void;
  originalTracksRef: React.RefObject<Track[]>;
}

function usePlayerControls({
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
}: usePlayerControlsProps) {
  const currentURL = useRef<string>("");
  const previousAlbum = useRef<number | undefined>(undefined);

  function handlePlayPause() {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current
          .play()
          .catch((err) => console.error("Play error:", err));
        setPlaying(true);
      }
    }
  }

  function nextSong() {
    if (currentAlbum === null || currentTrack === null) return;

    const currentTracks = albumsArray[currentAlbum]?.tracks;
    if (!currentTracks) return;

    const nextTrackIndex = currentTrack + 1;

    if (nextTrackIndex < currentTracks.length) {
      const nextTrackObj = currentTracks[nextTrackIndex];

      if (audioRef.current) {
        // Synchronous audio mutation keeps background session alive on iOS
        audioRef.current.src = nextTrackObj.url;
        audioRef.current
          .play()
          .catch((err) => console.error("Next song playback error:", err));
      }
      setTrack(nextTrackIndex);
      setPlaying(true);
    }
  }

  function prevSong() {
    if (currentAlbum === null || currentTrack === null) return;

    if (currentTime >= 5 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    const prevTrackIndex = currentTrack - 1;
    const currentTracks = albumsArray[currentAlbum]?.tracks;

    if (currentTracks && prevTrackIndex >= 0) {
      const prevTrackObj = currentTracks[prevTrackIndex];

      if (audioRef.current) {
        audioRef.current.src = prevTrackObj.url;
        audioRef.current
          .play()
          .catch((err) => console.error("Prev song playback error:", err));
      }

      setTrack(prevTrackIndex);
      setPlaying(true);
    }
  }

  function loopSong() {
    if (audioRef.current) {
      const nextLoopState = !looping;
      audioRef.current.loop = nextLoopState;
      setLooping(nextLoopState);
    }
  }

  function shuffleSong() {
    if (currentAlbum === null || currentTrack === null) return;

    if (!shuffling) {
      setShuffling(true);
      originalTracksRef.current = [...albumsArray[currentAlbum].tracks];
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
        audioRef.current
          .play()
          .catch((err) => console.error("Shuffle play error:", err));
      }
    } else {
      setShuffling(false);
      currentURL.current = albumsArray[currentAlbum].tracks[currentTrack].url;
      const updatedAlbums = [...albumsArray];
      updatedAlbums[currentAlbum].tracks = originalTracksRef.current;
      setAlbumsArray(updatedAlbums);

      const restoredIndex = originalTracksRef.current.findIndex(
        (i) => i.url === currentURL.current,
      );
      setTrack(restoredIndex !== -1 ? restoredIndex : 0);
    }
  }

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent triggering if user is typing in an input element
      if (
        event.key === " " &&
        !(
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement
        )
      ) {
        event.preventDefault();
        handlePlayPause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playing]);

  return {
    handlePlayPause,
    nextSong,
    prevSong,
    shuffleSong,
    shuffling,
    loopSong,
  };
}

export default usePlayerControls;

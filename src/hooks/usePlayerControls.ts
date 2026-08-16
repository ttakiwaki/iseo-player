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
        audioRef.current.play();
        setPlaying(true);
      }
    }
  }

  function nextSong() {
    if (currentAlbum === null || currentTrack === null) return;

    const nextTrack = currentTrack + 1;
    const currentTracks = albumsArray[currentAlbum]?.tracks;

    if (currentTracks && nextTrack < currentTracks.length) {
      const nextTrackObj = currentTracks[nextTrack];

      // Play audio directly (bypasses background JS throttling)
      if (audioRef.current) {
        audioRef.current.src = nextTrackObj.url;
        audioRef.current.play().catch(() => {});
      }

      setTrack(nextTrack);
      setPlaying(true);
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
      const prevTrack = currentTrack - 1;
      const currentTracks = albumsArray[currentAlbum]?.tracks;

      if (currentTracks && prevTrack >= 0) {
        const prevTrackObj = currentTracks[prevTrack];

        if (audioRef.current) {
          audioRef.current.src = prevTrackObj.url;
          audioRef.current.play().catch(() => {});
        }

        setTrack(prevTrack);
        setPlaying(true);
      }
    }
  }

  function loopSong() {
    if (!looping && currentTrack !== null && audioRef.current) {
      audioRef.current.loop = true;
      setLooping(true);
    } else {
      if (currentTrack !== null && audioRef.current) {
        audioRef.current.loop = false;
        setLooping(false);
      }
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
        audioRef.current.play();
      }
    } else {
      setShuffling(false);
      currentURL.current = albumsArray[currentAlbum].tracks[currentTrack].url;
      const updatedAlbums = [...albumsArray];
      updatedAlbums[currentAlbum].tracks = originalTracksRef.current;
      setAlbumsArray(updatedAlbums);
      setTrack(
        albumsArray[currentAlbum].tracks.findIndex(
          (i) => i.url === currentURL.current,
        ),
      );
    }
  }

  // Listens for spacebar press to pause
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

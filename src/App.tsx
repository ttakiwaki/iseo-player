import "./App.css";
import DesktopView from "./components/DesktopView/DesktopView.tsx";
import MobileView from "./components/MobileView/MobileView.tsx";
import usePlayerControls from "./hooks/usePlayerControls.ts";

import { useRef, useEffect, useState } from "react";
import { GetCached } from "./assets/services/LyricService.ts";
import { GetColors } from "./assets/services/ColorService.ts";

import type { Album, Track } from "./types/index.tsx";
import type { LyricsResults } from "./assets/services/LyricService.ts";

function App() {
  const [currentTrack, setTrack] = useState<number | null>(null);
  const [currentAlbum, setAlbum] = useState<number | null>(null);
  const [viewedAlbum, setViewedAlbum] = useState<number | null>(null);
  const [albumsArray, setAlbumsArray] = useState<Album[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [looping, setLooping] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [shuffling, setShuffling] = useState<boolean>(false);
  const originalTracksRef = useRef<Track[]>([]);

  const [lyrics, setLyrics] = useState<LyricsResults | null>(null);
  const [lyricsOpen, setLyricsOpen] = useState<boolean>(false);

  const { nextSong, prevSong } = usePlayerControls({
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

  // Settings States
  const [isDark, setDark] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("darkToggle") ?? "false");
  });
  const [vibranceEnabled, setVibranceEnabled] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("vibrantToggle") ?? "false");
  });
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem("username") ?? "";
  });

  // Keep references to latest song navigation functions for media session and event listeners
  const nextSongRef = useRef(nextSong);
  const prevSongRef = useRef(prevSong);

  useEffect(() => {
    nextSongRef.current = nextSong;
    prevSongRef.current = prevSong;
  }, [nextSong, prevSong]);

  // Handle Mobile view detection safely in side effect
  useEffect(() => {
    const userMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);
    document.body.classList.toggle("is-mobile", userMobile);
  }, []);

  // Handle Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      setVolume(0.5);
    }
  }, []);

  // CRITICAL FOR IOS: Native 'ended' listener that executes synchronously on track finish
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      // Loop handles itself natively if audioRef.current.loop is true
      if (audio.loop) return;

      // Trigger next song transition directly
      nextSongRef.current();
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  // Track & Album updates + MediaSession Configuration
  useEffect(() => {
    if (currentTrack === null || currentAlbum === null || !audioRef.current)
      return;

    const track = albumsArray[currentAlbum]?.tracks[currentTrack];
    if (!track) return;

    // Load track into audio element if not already set
    if (audioRef.current.src !== track.url) {
      audioRef.current.src = track.url;
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch((err) => console.error("Playback error:", err));
    }

    document.title = `${track.title} - iseo`;

    // Configure Web Media Session API for iOS background controls
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist ?? "",
        album: track.album ?? albumsArray[currentAlbum]?.title ?? "",
        artwork: [
          {
            src: track.cover ?? albumsArray[currentAlbum]?.cover ?? "",
            sizes: "512x512",
            type: "image/jpeg",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current?.play();
        setPlaying(true);
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current?.pause();
        setPlaying(false);
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        nextSongRef.current();
      });

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        prevSongRef.current();
      });
    }
  }, [currentTrack, currentAlbum, albumsArray]);

  // Lyric Fetch
  useEffect(() => {
    if (currentAlbum !== null && currentTrack !== null && lyricsOpen) {
      const track = albumsArray[currentAlbum].tracks[currentTrack];
      setLyrics(null);
      GetCached(
        track.title,
        track.artist ?? "",
        track.album ?? "",
        track.metaDuration ?? 0,
      ).then((result) => {
        setLyrics(result);
      });
    }
  }, [currentAlbum, currentTrack, lyricsOpen]);

  // Vibrance / Palette calculation
  useEffect(() => {
    if (currentTrack !== null && currentAlbum !== null && vibranceEnabled) {
      document.documentElement.style.removeProperty("--paletteSelect");
      GetColors(
        albumsArray[currentAlbum].tracks[currentTrack].cover ??
          albumsArray[currentAlbum].cover,
      );
    } else {
      document.documentElement.style.removeProperty("--paletteSelect");
    }
  }, [currentTrack, currentAlbum, vibranceEnabled]);

  const userMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);

  return (
    <div id="app">
      <audio ref={audioRef} playsInline></audio>
      {userMobile ? (
        <MobileView
          albumsArray={albumsArray}
          currentAlbum={currentAlbum}
          currentTrack={currentTrack}
          audioRef={audioRef}
          playing={playing}
          setTrack={setTrack}
          setAlbumsArray={setAlbumsArray}
          setPlaying={setPlaying}
          looping={looping}
          setLooping={setLooping}
          lyrics={lyrics}
          lyricsOpen={lyricsOpen}
          setLyricsOpen={setLyricsOpen}
          isDark={isDark}
          setAlbum={setAlbum}
          viewedAlbum={viewedAlbum}
          setViewedAlbum={setViewedAlbum}
          setDark={setDark}
          vibranceEnabled={vibranceEnabled}
          setVibranceEnabled={setVibranceEnabled}
          username={username}
          setUsername={setUsername}
          shuffling={shuffling}
          setShuffling={setShuffling}
          originalTracksRef={originalTracksRef}
        />
      ) : (
        <DesktopView
          albumsArray={albumsArray}
          currentAlbum={currentAlbum}
          currentTrack={currentTrack}
          audioRef={audioRef}
          playing={playing}
          setTrack={setTrack}
          setAlbumsArray={setAlbumsArray}
          setPlaying={setPlaying}
          looping={looping}
          setLooping={setLooping}
          setVolume={setVolume}
          volume={volume}
          lyrics={lyrics}
          lyricsOpen={lyricsOpen}
          setLyricsOpen={setLyricsOpen}
          isDark={isDark}
          setAlbum={setAlbum}
          viewedAlbum={viewedAlbum}
          setViewedAlbum={setViewedAlbum}
          setDark={setDark}
          vibranceEnabled={vibranceEnabled}
          setVibranceEnabled={setVibranceEnabled}
          username={username}
          setUsername={setUsername}
          shuffling={shuffling}
          setShuffling={setShuffling}
          originalTracksRef={originalTracksRef}
        />
      )}
    </div>
  );
}

export default App;

import "./App.css";
import DesktopView from "./components/DesktopView/DesktopView.tsx";
import MobileView from "./components/MobileView/MobileView.tsx";

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

  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [looping, setLooping] = useState(false);

  const [shuffling, setShuffling] = useState(false);
  const originalTracksRef = useRef<Track[]>([]);

  const [lyrics, setLyrics] = useState<LyricsResults | null>(null);
  const [lyricsOpen, setLyricsOpen] = useState<boolean>(false);

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

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      setVolume(0.5);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function handleEnded() {
      if (
        currentTrack !== null &&
        currentAlbum !== null &&
        albumsArray !== null
      ) {
        const nextTrack = currentTrack + 1;
        if (nextTrack < albumsArray[currentAlbum].tracks.length) {
          setTrack(nextTrack);
        }
      }
    }

    audio.addEventListener("ended", handleEnded);

    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentAlbum, currentTrack, albumsArray]);

  useEffect(() => {
    if (currentTrack !== null && currentAlbum !== null && audioRef.current) {
      audioRef.current.src = albumsArray[currentAlbum].tracks[currentTrack].url;
      audioRef.current.play().catch(() => {});
      setPlaying(true);
      document.title = `${albumsArray[currentAlbum].tracks[currentTrack].title} - iseo`;

      navigator.mediaSession.metadata = new MediaMetadata({
        title: albumsArray[currentAlbum].tracks[currentTrack].title,
        artist: albumsArray[currentAlbum].tracks[currentTrack].artist,
        album: albumsArray[currentAlbum].tracks[currentTrack].album,
        artwork: [
          {
            src:
              albumsArray[currentAlbum].tracks[currentTrack].cover ??
              albumsArray[currentAlbum].cover ??
              "",
            sizes: "512x512",
            type: "image/jpeg",
          },
        ],
      });
    }
  }, [currentTrack, currentAlbum]);

  useEffect(() => {
    // Lyric Fetch
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
        console.log(result);
      });
    }
  }, [currentAlbum, currentTrack, lyricsOpen]);

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

  // Display Mobile or Desktop
  const userMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <div id="app">
      <audio ref={audioRef}></audio>
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
        ></MobileView>
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
        ></DesktopView>
      )}
    </div>
  );
}

export default App;

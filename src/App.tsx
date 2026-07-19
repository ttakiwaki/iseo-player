import "./App.css";
import Sidebar from "./components/Sidebar/SidebarMain.tsx";
import Player from "./components/Player/PlayerMain.tsx";
import Settings from "./components/SettingsMenu/SettingsMain.tsx";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { GetCached } from "./assets/services/LyricService.ts";
import { GetColors } from "./assets/services/ColorService.ts";

import type { Album } from "./types/index.tsx";
import type { LyricsResults } from "./assets/services/LyricService.ts";

function App() {
  const [currentTrack, setTrack] = useState<number | null>(null);
  const [currentAlbum, setAlbum] = useState<number | null>(null);
  const [albumsArray, setAlbumsArray] = useState<Album[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [looping, setLooping] = useState(false);

  const [lyrics, setLyrics] = useState<LyricsResults | null>(null);
  const [lyricsOpen, setLyricsOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem("username") ?? "";
  });

  // Settings States
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [isDark, setDark] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });
  const [vibranceEnabled, setVibranceEnabled] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("vibranceEnabled") ?? "false");
  });
  const [rpcEnabled, setRpcEnabled] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("rpcEnabled") ?? "false");
  });
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

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

      // DISCORD RPC UPDATES
      if (rpcEnabled) {
        audioRef.current?.addEventListener(
          "loadedmetadata",
          () => {
            void fetch("http://localhost:8000/update", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: albumsArray[currentAlbum].tracks[currentTrack].title,
                artist: albumsArray[currentAlbum].tracks[currentTrack].artist,
                album: albumsArray[currentAlbum].tracks[currentTrack].album,
                currentTime: audioRef.current?.currentTime,
                duration: audioRef.current?.duration,
                playing: playing,
                startTime: Date.now() / 1000,
                albumMBID:
                  albumsArray[currentAlbum].tracks[currentTrack].albumMBID,
              }),
            }).catch(() => {
              console.error("Discord RPC Unreachable");
            });
          },
          { once: true },
        );
      }
    }
  }, [currentTrack, currentAlbum, audioRef.current?.src]);

  // DISCORD RPC UPDATES
  // Playing & Pausing Logic
  useEffect(() => {
    if (rpcEnabled && currentAlbum !== null && currentTrack != null) {
      void fetch("http://localhost:8000/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: albumsArray[currentAlbum].tracks[currentTrack].title,
          artist: albumsArray[currentAlbum].tracks[currentTrack].artist,
          album: albumsArray[currentAlbum].tracks[currentTrack].album,
          currentTime: audioRef.current?.currentTime,
          duration: audioRef.current?.duration,
          playing: playing,
          startTime: Date.now() / 1000,
          albumMBID: albumsArray[currentAlbum].tracks[currentTrack].albumMBID,
        }),
      }).catch(() => {
        console.error("Discord RPC Unreachable");
      });
    }
  }, [playing]);

  // DISCORD RPC UPDATES
  // Looping Logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !rpcEnabled) return;

    let wasNearEnd = false;
    const handleTimeUpdate = () => {
      if (!audio.loop) return;

      if (audio.currentTime > audio.duration - 2) {
        wasNearEnd = true;
      }

      if (wasNearEnd && audio.currentTime < 1) {
        wasNearEnd = false;
        console.log("looped");
        if (currentAlbum !== null && currentTrack != null) {
          void fetch("http://localhost:8000/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: albumsArray[currentAlbum].tracks[currentTrack].title,
              artist: albumsArray[currentAlbum].tracks[currentTrack].artist,
              album: albumsArray[currentAlbum].tracks[currentTrack].album,
              currentTime: 0,
              duration: audioRef.current?.duration,
              playing: playing,
              startTime: Date.now() / 1000,
              albumMBID:
                albumsArray[currentAlbum].tracks[currentTrack].albumMBID,
              looped: true,
            }),
          }).catch(() => {
            console.error("Discord RPC Unreachable");
          });
        }
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [currentTrack, currentAlbum, rpcEnabled, looping]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

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
      document.documentElement.style.removeProperty("--paletteLib");
      document.documentElement.style.removeProperty("--palettePlayer");
      GetColors(
        albumsArray[currentAlbum].tracks[currentTrack].cover ??
          albumsArray[currentAlbum].cover,
        isDark,
      );
    } else {
      document.documentElement.style.removeProperty("--paletteSelect");
      document.documentElement.style.removeProperty("--paletteLib");
      document.documentElement.style.removeProperty("--palettePlayer");
    }
  }, [currentTrack, currentAlbum, isDark, vibranceEnabled]);

  //console.log(albumsArray);

  return (
    <div id="app">
      {settingsOpen && (
        <Settings
          settingsOpen={settingsOpen}
          setSettingsOpen={setSettingsOpen}
          vibranceEnabled={vibranceEnabled}
          setVibranceEnabled={setVibranceEnabled}
          isDark={isDark}
          setDark={setDark}
          setUsername={setUsername}
          rpcEnabled={rpcEnabled}
          setRpcEnabled={setRpcEnabled}
        ></Settings>
      )}
      <audio src={undefined} ref={audioRef}></audio>
      <Sidebar
        currentTrack={currentTrack}
        currentAlbum={currentAlbum}
        albumsArray={albumsArray}
        setTrack={setTrack}
        setAlbum={setAlbum}
        setAlbumsArray={setAlbumsArray}
        isDark={isDark}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      ></Sidebar>
      <Player
        currentTrack={currentTrack}
        currentAlbum={currentAlbum}
        albumsArray={albumsArray}
        playing={playing}
        setTrack={setTrack}
        setAlbumsArray={setAlbumsArray}
        setPlaying={setPlaying}
        isDark={isDark}
        setDark={setDark}
        audioRef={audioRef}
        lyrics={lyrics}
        lyricsOpen={lyricsOpen}
        setLyricsOpen={setLyricsOpen}
        username={username}
        looping={looping}
        setLooping={setLooping}
      ></Player>
    </div>
  );
}

export default App;

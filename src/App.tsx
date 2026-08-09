import "./App.css";
import NavigationMain from "./components/Navigation/NavigationMain.tsx";
import LibraryMain from "./components/Library/LibraryMain.tsx";
import PlayerMain from "./components/Player/PlayerMain.tsx";
import SettingsMain from "./components/Settings/SettingsMain.tsx";
import Welcome from "./components/Library/Welcome/Welcome.tsx";
import VibrantBg from "./components/VibrantBg/VibrantBg.tsx";

import { useRef, useEffect, useState } from "react";
import { GetCached } from "./assets/services/LyricService.ts";
import { GetColors } from "./assets/services/ColorService.ts";

import type { Album } from "./types/index.tsx";
import type { LyricsResults } from "./assets/services/LyricService.ts";

function App() {
  const [currentTrack, setTrack] = useState<number | null>(null);
  const [currentAlbum, setAlbum] = useState<number | null>(null);
  const [viewedAlbum, setViewedAlbum] = useState<number | null>(null);
  const [albumsArray, setAlbumsArray] = useState<Album[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [looping, setLooping] = useState(false);

  const [lyrics, setLyrics] = useState<LyricsResults | null>(null);
  const [lyricsOpen, setLyricsOpen] = useState<boolean>(false);

  // Settings States
  const [isDark, setDark] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("darkToggle") ?? "false");
  });
  const [vibranceEnabled, setVibranceEnabled] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("vibrantToggle") ?? "false");
  });
  const [rpcEnabled, setRpcEnabled] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("rpcToggle") ?? "false");
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
  }, [currentTrack, currentAlbum]);

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

  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      setVolume(0.5);
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
      GetColors(
        albumsArray[currentAlbum].tracks[currentTrack].cover ??
          albumsArray[currentAlbum].cover,
      );
    } else {
      document.documentElement.style.removeProperty("--paletteSelect");
    }
  }, [currentTrack, currentAlbum, vibranceEnabled]);

  // Tab Logic

  const [activeTab, setActiveTab] = useState("library");

  return (
    <div id="app">
      <audio ref={audioRef}></audio>
      <NavigationMain
        setAlbumsArray={setAlbumsArray}
        albumsArray={albumsArray}
        currentAlbum={currentAlbum}
        currentTrack={currentTrack}
        setTrack={setTrack}
        setAlbum={setAlbum}
        viewedAlbum={viewedAlbum}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
      ></NavigationMain>
      <div
        className={
          vibranceEnabled && currentTrack !== null
            ? "content-area vibrance-on"
            : "content-area"
        }
      >
        <VibrantBg
          vibranceEnabled={vibranceEnabled}
          albumsArray={albumsArray}
          currentAlbum={currentAlbum}
          currentTrack={currentTrack}
        ></VibrantBg>
        {activeTab === "library" &&
          (albumsArray.length <= 0 ? (
            <Welcome username={username}></Welcome>
          ) : (
            <LibraryMain
              albumsArray={albumsArray}
              setViewedAlbum={setViewedAlbum}
              isDark={isDark}
            ></LibraryMain>
          ))}
        {activeTab === "player" && (
          <PlayerMain
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
          ></PlayerMain>
        )}
        {activeTab === "settings" && (
          <SettingsMain
            isDark={isDark}
            setDark={setDark}
            vibranceEnabled={vibranceEnabled}
            setVibranceEnabled={setVibranceEnabled}
            rpcEnabled={rpcEnabled}
            setRpcEnabled={setRpcEnabled}
            username={username}
            setUsername={setUsername}
          ></SettingsMain>
        )}
      </div>
    </div>
  );
}

export default App;

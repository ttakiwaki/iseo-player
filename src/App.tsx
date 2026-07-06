import "./App.css";
import Sidebar from "./components/Sidebar/SidebarMain.tsx";
import Player from "./components/Player/PlayerMain.tsx";
import Settings from "./components/SettingsMenu/SettingsMain.tsx";
//import Changelog from "./components/Changelog/Changelog.tsx";

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

  const [lyrics, setLyrics] = useState<LyricsResults | null>(null);
  const [lyricsOpen, setLyricsOpen] = useState<boolean>(false);
  // const [showChangelog, setShowChangelog] = useState<boolean>(false); For Cadenza

  // Settings States
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [isDark, setDark] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });
  const [vibranceEnabled, setVibranceEnabled] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("vibranceEnabled") ?? "false");
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
      audioRef.current.play();
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
  }, [currentTrack, currentAlbum, audioRef.current?.src]);

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
      {/*showChangelog && <Changelog></Changelog>*/}
      {settingsOpen && (
        <Settings
          settingsOpen={settingsOpen}
          setSettingsOpen={setSettingsOpen}
          vibranceEnabled={vibranceEnabled}
          setVibranceEnabled={setVibranceEnabled}
          isDark={isDark}
          setDark={setDark}
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
      ></Player>
    </div>
  );
}

export default App;

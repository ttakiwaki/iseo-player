import "./App.css";
import Sidebar from "./components/Sidebar/SidebarMain.tsx";
import Player from "./components/Player/PlayerMain.tsx";

import { useEffect, useState } from "react";
import { useRef } from "react";
import type { Album } from "./types/index.tsx";

function App() {
  const [currentTrack, setTrack] = useState<number | null>(null);
  const [currentAlbum, setAlbum] = useState<number | null>(null);
  const [albumsArray, setAlbumsArray] = useState<Album[]>([]);
  const [isDark, setDark] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (currentTrack !== null && currentAlbum !== null && audioRef.current) {
      audioRef.current.src = albumsArray[currentAlbum].tracks[currentTrack].url;
      audioRef.current.play();
      setPlaying(true);
      document.title = `${albumsArray[currentAlbum].tracks[currentTrack].title} - iseo`;
    }
  }, [currentTrack, currentAlbum]);

  if (audioRef.current) {
    audioRef.current.volume = 0.5;
  }

  console.log(albumsArray);
  return (
    <div id="app">
      <audio src="" ref={audioRef}></audio>
      <Sidebar
        currentTrack={currentTrack}
        currentAlbum={currentAlbum}
        albumsArray={albumsArray}
        setTrack={setTrack}
        setAlbum={setAlbum}
        setAlbumsArray={setAlbumsArray}
        isDark={isDark}
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
      ></Player>
    </div>
  );
}

export default App;

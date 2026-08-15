import "./MobileView.css";
import MLibrary from "./MLibrary/MLibrary.tsx";
import MAlbumInfo from "./MAlbumInfo/MAlbumInfo.tsx";
import MPlayer from "./MPlayer/MPlayer.tsx";
import MSettings from "./MSettings/MSettings.tsx";
import MiniPlayer from "./MiniPlayer/MiniPlayer.tsx";
import VibrantBg from "../VibrantBg/VibrantBg.tsx";

import type { Album, Track } from "../../types/index.tsx";
import type { LyricsResults } from "../../assets/services/LyricService.ts";
import { useState } from "react";

interface MobileViewProps {
  albumsArray: Album[];
  currentAlbum: number | null;
  currentTrack: number | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playing: boolean;
  setTrack: (value: number | null) => void;
  setAlbumsArray: (value: Album[]) => void;
  setPlaying: (value: boolean) => void;
  looping: boolean;
  setLooping: (value: boolean) => void;
  lyrics: LyricsResults | null;
  lyricsOpen: boolean;
  setLyricsOpen: (value: boolean) => void;
  isDark: boolean;
  setAlbum: (value: number | null) => void;
  viewedAlbum: number | null;
  setViewedAlbum: (value: number | null) => void;
  setDark: (value: boolean) => void;
  vibranceEnabled: boolean;
  setVibranceEnabled: (value: boolean) => void;
  username: string;
  setUsername: (value: string) => void;
  originalTracksRef: React.RefObject<Track[]>;
  setShuffling: (value: boolean) => void;
  shuffling: boolean;
}

function MobileView({
  albumsArray,
  currentAlbum,
  currentTrack,
  audioRef,
  playing,
  setTrack,
  setAlbumsArray,
  setPlaying,
  looping,
  setLooping,
  lyrics,
  lyricsOpen,
  setLyricsOpen,
  isDark,
  setAlbum,
  viewedAlbum,
  setViewedAlbum,
  setDark,
  vibranceEnabled,
  setVibranceEnabled,
  originalTracksRef,
  setShuffling,
  shuffling,
}: MobileViewProps) {
  const [albumOpen, setAlbumOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  return (
    <>
      <VibrantBg
        vibranceEnabled={vibranceEnabled}
        albumsArray={albumsArray}
        currentAlbum={currentAlbum}
        currentTrack={currentTrack}
        mobile={true}
      ></VibrantBg>
      <div
        id="mobile"
        className={
          vibranceEnabled && currentTrack !== null
            ? "mcontent-area vibrance-on"
            : "mcontent-area"
        }
      >
        {currentTrack !== null && currentAlbum !== null && !playerOpen && (
          <MiniPlayer
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
            setCurrentTime={setCurrentTime}
            currentTime={currentTime}
            shuffling={shuffling}
            setShuffling={setShuffling}
            originalTracksRef={originalTracksRef}
            playerOpen={playerOpen}
            setPlayerOpen={setPlayerOpen}
            settingsOpen={settingsOpen}
          ></MiniPlayer>
        )}
        {settingsOpen && (
          <MSettings
            isDark={isDark}
            setDark={setDark}
            setSettingsOpen={setSettingsOpen}
            settingsOpen={settingsOpen}
            vibranceEnabled={vibranceEnabled}
            setVibranceEnabled={setVibranceEnabled}
          ></MSettings>
        )}
        {playerOpen && !settingsOpen && (
          <MPlayer
            playerOpen={playerOpen}
            setPlayerOpen={setPlayerOpen}
            albumsArray={albumsArray}
            currentAlbum={currentAlbum}
            currentTrack={currentTrack}
            audioRef={audioRef}
            playing={playing}
            setTrack={setTrack}
            setAlbumsArray={setAlbumsArray}
            setPlaying={setPlaying}
            setLooping={setLooping}
            looping={looping}
            lyrics={lyrics}
            lyricsOpen={lyricsOpen}
            setLyricsOpen={setLyricsOpen}
            isDark={isDark}
            shuffling={shuffling}
            setShuffling={setShuffling}
            originalTracksRef={originalTracksRef}
          ></MPlayer>
        )}
        {albumOpen && !playerOpen && (
          <MAlbumInfo
            currentAlbum={currentAlbum}
            albumsArray={albumsArray}
            currentTrack={currentTrack}
            setTrack={setTrack}
            setAlbum={setAlbum}
            viewedAlbum={viewedAlbum}
            originalTracksRef={originalTracksRef}
            isDark={isDark}
            setShuffling={setShuffling}
            shuffling={shuffling}
            albumOpen={albumOpen}
            setAlbumOpen={setAlbumOpen}
          ></MAlbumInfo>
        )}
        {!albumOpen && !playerOpen && !settingsOpen && (
          <MLibrary
            isDark={isDark}
            albumsArray={albumsArray}
            setViewedAlbum={setViewedAlbum}
            setAlbumsArray={setAlbumsArray}
            albumOpen={albumOpen}
            setAlbumOpen={setAlbumOpen}
            playerOpen={playerOpen}
            currentAlbum={currentAlbum}
            currentTrack={currentTrack}
            settingsOpen={settingsOpen}
            setSettingsOpen={setSettingsOpen}
          ></MLibrary>
        )}
      </div>
    </>
  );
}

export default MobileView;

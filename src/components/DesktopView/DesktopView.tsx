import "./DesktopView.css";
import NavigationMain from "./Navigation/NavigationMain.tsx";
import LibraryMain from "./Library/LibraryMain.tsx";
import PlayerMain from "./Player/PlayerMain.tsx";
import SettingsMain from "./Settings/SettingsMain.tsx";
import Welcome from "./Library/Welcome/Welcome.tsx";
import VibrantBg from "../VibrantBg/VibrantBg.tsx";

import type { Album, Track } from "../../types/index.tsx";
import type { LyricsResults } from "../../assets/services/LyricService.ts";

import { useEffect, useState } from "react";

interface DesktopViewProps {
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
  setVolume: (value: number) => void;
  volume: number;
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
  shuffling: boolean;
  setShuffling: (value: boolean) => void;
  originalTracksRef: React.RefObject<Track[]>;
}

function DesktopView({
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
  setVolume,
  volume,
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
  username,
  setUsername,
  shuffling,
  setShuffling,
  originalTracksRef,
}: DesktopViewProps) {
  const [rpcEnabled, setRpcEnabled] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("rpcToggle") ?? "false");
  });

  // DISCORD RPC UPDATES
  useEffect(() => {
    if (currentTrack !== null && currentAlbum !== null && audioRef.current) {
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

  // Tab Logic
  const [activeTab, setActiveTab] = useState("library");

  return (
    <div id="desktop">
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
        originalTracksRef={originalTracksRef}
        setShuffling={setShuffling}
        shuffling={shuffling}
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
            shuffling={shuffling}
            setShuffling={setShuffling}
            originalTracksRef={originalTracksRef}
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

export default DesktopView;

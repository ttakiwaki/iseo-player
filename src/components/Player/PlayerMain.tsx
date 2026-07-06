import "./PlayerMain.css";
import LyricBox from "./LyricBox/LyricBox";
import LyricHeader from "./LyricHeader/LyricHeader";
import LyricControls from "./LyricControls/LyricControls";
import PlayerControls from "./PlayerControls/PlayerControls";
import TimeControls from "./TimeControls/TimeControls";
import BottomControls from "./BottomControls/BottomControls";
import PlayerDisplay from "./PlayerDisplay/PlayerDisplay";
import type { Album } from "../../types";
import { useState, useEffect } from "react";
import type { LyricsResults } from "../../assets/services/LyricService";

interface PlayerMainProps {
  currentTrack: number | null;
  currentAlbum: number | null;
  albumsArray: Album[];
  playing: boolean;
  setTrack: (value: number | null) => void;
  setAlbumsArray: (value: Album[]) => void;
  setPlaying: (value: boolean) => void;
  isDark: boolean;
  setDark: (value: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  lyrics: LyricsResults | null;
  lyricsOpen: boolean;
  setLyricsOpen: (value: boolean) => void;
}

function PlayerMain({
  currentTrack,
  currentAlbum,
  albumsArray,
  playing,
  setTrack,
  setAlbumsArray,
  setPlaying,
  isDark,
  setDark,
  audioRef,
  lyrics,
  lyricsOpen,
  setLyricsOpen,
}: PlayerMainProps) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [sync, setSync] = useState<boolean>(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audioRef]);

  function nextSong() {
    if (currentAlbum === null || currentTrack === null) return;
    const nextTrack = currentTrack + 1;
    if (nextTrack < albumsArray[currentAlbum].tracks.length) {
      setTrack(nextTrack);
    }
  }

  function prevSong() {
    if (currentAlbum === null || currentTrack === null) return;
    const nextTrack = currentTrack - 1;
    if (nextTrack >= 0 && nextTrack < albumsArray[currentAlbum].tracks.length) {
      setTrack(nextTrack);
    }
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("ended", nextSong);
    return () => audio.removeEventListener("ended", nextSong);
  }, [audioRef, currentAlbum, currentTrack]);

  if (currentAlbum === null) return null;
  const album = albumsArray[currentAlbum];

  if (currentTrack === null) return null;
  const track = album.tracks[currentTrack];

  navigator.mediaSession.setActionHandler("play", () => {
    audioRef.current?.play();
    setPlaying(true);
  });

  navigator.mediaSession.setActionHandler("pause", () => {
    audioRef.current?.pause();
    setPlaying(false);
  });

  navigator.mediaSession.setActionHandler("nexttrack", () => {
    nextSong();
  });

  navigator.mediaSession.setActionHandler("previoustrack", () => {
    prevSong();
  });

  return (
    <div className="player-main">
      {lyricsOpen ? (
        <>
          <LyricHeader
            album={album}
            track={track}
            sync={sync}
            setSync={setSync}
            lyrics={lyrics}
          ></LyricHeader>
          <LyricBox
            lyrics={lyrics}
            currentTime={currentTime}
            sync={sync}
          ></LyricBox>
          <LyricControls
            currentTime={currentTime}
            audioRef={audioRef}
            setCurrentTime={setCurrentTime}
            currentTrack={currentTrack}
            currentAlbum={currentAlbum}
            albumsArray={albumsArray}
            playing={playing}
            setTrack={setTrack}
            setAlbumsArray={setAlbumsArray}
            setPlaying={setPlaying}
          ></LyricControls>
        </>
      ) : (
        <>
          <PlayerDisplay
            album={album}
            track={track}
            isDark={isDark}
          ></PlayerDisplay>
          <TimeControls
            audioRef={audioRef}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
          ></TimeControls>
          <PlayerControls
            currentTrack={currentTrack}
            currentAlbum={currentAlbum}
            albumsArray={albumsArray}
            playing={playing}
            setTrack={setTrack}
            setAlbumsArray={setAlbumsArray}
            setPlaying={setPlaying}
            audioRef={audioRef}
          ></PlayerControls>
        </>
      )}
      <BottomControls
        audioRef={audioRef}
        setLyricsOpen={setLyricsOpen}
        lyricsOpen={lyricsOpen}
      ></BottomControls>
    </div>
  );
}

export default PlayerMain;

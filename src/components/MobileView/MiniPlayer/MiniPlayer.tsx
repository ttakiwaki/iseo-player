import "./MiniPlayer.css";
import type { Album, Track } from "../../../types";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";

import usePlayerControls from "../../../hooks/usePlayerControls";

interface MiniPlayerProps {
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
  setPlayerOpen: (value: boolean) => void;
  playerOpen: boolean;
  settingsOpen: boolean;
}

function MiniPlayer({
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
  setPlayerOpen,
  playerOpen,
  settingsOpen,
}: MiniPlayerProps) {
  const { handlePlayPause, nextSong, prevSong } = usePlayerControls({
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

  if (currentTrack === null || currentAlbum === null) return null;

  return (
    <div
      className="miniplayer"
      onClick={() => {
        if (!playerOpen && !settingsOpen) {
          setPlayerOpen(true);
        }
      }}
    >
      <img src={albumsArray[currentAlbum].tracks[currentTrack]?.cover}></img>
      <div className="miniplayer-info">
        <p>{albumsArray[currentAlbum].tracks[currentTrack]?.title}</p>
        <p>{albumsArray[currentAlbum].tracks[currentTrack]?.artist}</p>
      </div>
      <div className="miniplayer-controls" onClick={(e) => e.stopPropagation()}>
        <SkipBack
          className="minicontrol-icon secondary"
          onClick={prevSong}
        ></SkipBack>
        {playing ? (
          <Pause
            className="minicontrol-icon primary"
            onClick={() => {
              handlePlayPause();
            }}
          ></Pause>
        ) : (
          <Play
            className="minicontrol-icon primary"
            onClick={() => {
              handlePlayPause();
            }}
          ></Play>
        )}
        <SkipForward
          className="minicontrol-icon secondary"
          onClick={nextSong}
        ></SkipForward>
      </div>
    </div>
  );
}

export default MiniPlayer;

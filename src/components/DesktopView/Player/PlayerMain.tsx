import "./PlayerMain.css";
import type { Album, Track } from "../../../types/index";
import type { LyricsResults } from "../../../assets/services/LyricService";
import { useState } from "react";
import PlayerDisplay from "./PlayerDisplay/PlayerDisplay";
import PlayerControls from "./PlayerControls/PlayerControls";
import PlayerFooter from "./PlayerFooter/PlayerFooter";
import LyricHeader from "./LyricHeader/LyricHeader";
import LyricBody from "./LyricBody/LyricBody";
import LyricControls from "./LyricControls/LyricControls";

interface PlayerMainProps {
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
  shuffling: boolean;
  setShuffling: (value: boolean) => void;
  originalTracksRef: React.RefObject<Track[]>;
}

function PlayerMain({
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
  shuffling,
  setShuffling,
  originalTracksRef,
}: PlayerMainProps) {
  const [sync, setSync] = useState<boolean>(true);
  return (
    <>
      {lyricsOpen ? (
        <div className="lyrics-main">
          <div className="lyrics-top">
            <LyricHeader
              sync={sync}
              setSync={setSync}
              albumsArray={albumsArray}
              currentAlbum={currentAlbum}
              currentTrack={currentTrack}
              lyrics={lyrics}
              isDark={isDark}
            ></LyricHeader>
            <LyricBody
              lyrics={lyrics}
              sync={sync}
              audioRef={audioRef}
            ></LyricBody>
            <LyricControls
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
              shuffling={shuffling}
              setShuffling={setShuffling}
              originalTracksRef={originalTracksRef}
            ></LyricControls>
          </div>
          <div className="player-bottom">
            <PlayerFooter
              setVolume={setVolume}
              volume={volume}
              audioRef={audioRef}
              lyricsOpen={lyricsOpen}
              setLyricsOpen={setLyricsOpen}
            ></PlayerFooter>
          </div>
        </div>
      ) : (
        <div className="player-main">
          <div className="player-top">
            <PlayerDisplay
              albumsArray={albumsArray}
              currentAlbum={currentAlbum}
              currentTrack={currentTrack}
              isDark={isDark}
            ></PlayerDisplay>
            <PlayerControls
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
              shuffling={shuffling}
              setShuffling={setShuffling}
              originalTracksRef={originalTracksRef}
            ></PlayerControls>
          </div>
          <div className="player-bottom">
            <PlayerFooter
              setVolume={setVolume}
              volume={volume}
              audioRef={audioRef}
              lyricsOpen={lyricsOpen}
              setLyricsOpen={setLyricsOpen}
            ></PlayerFooter>
          </div>
        </div>
      )}
    </>
  );
}

export default PlayerMain;

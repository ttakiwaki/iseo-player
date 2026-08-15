import "./MPlayer.css";
import { ChevronDown, MicVocal } from "lucide-react";
import type { Album, Track } from "../../../types";
import type { LyricsResults } from "../../../assets/services/LyricService";
import { useState } from "react";

import MPlayerControls from "./MPlayerControls/MPlayerControls";
import MPlayerLyrics from "./MPlayerLyrics/MPlayerLyrics";
import icondark from "../../../assets/icons/icon-dark.svg";
import iconlight from "../../../assets/icons/icon-light.svg";

interface MPlayerProps {
  playerOpen: boolean;
  setPlayerOpen: (open: boolean) => void;
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
  shuffling: boolean;
  setShuffling: (value: boolean) => void;
  originalTracksRef: React.RefObject<Track[]>;
}

function MPlayer({
  playerOpen,
  setPlayerOpen,
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
  shuffling,
  setShuffling,
  originalTracksRef,
}: MPlayerProps) {
  const [sync, setSync] = useState<boolean>(true);

  if (!playerOpen || currentAlbum === null || currentTrack === null)
    return null;

  return (
    <div className="mplayer">
      <div className="mplayer-header">
        <ChevronDown
          className="close-player"
          onClick={() => {
            if (playerOpen) {
              setPlayerOpen(false);
            }
          }}
        />
        <div className="mplayer-header-controls">
          <MicVocal
            size={23}
            onClick={() => {
              setLyricsOpen(!lyricsOpen);
            }}
          />
        </div>
      </div>
      {!lyricsOpen ? (
        <div className="mplayer-display">
          <p className="now-playing">Now Playing</p>
          <img
            src={
              (currentAlbum !== null && currentTrack !== null
                ? albumsArray[currentAlbum]?.tracks[currentTrack]?.cover
                : null) ?? (isDark ? icondark : iconlight)
            }
            alt=""
          />
          <div className="mplayer-info">
            <p>
              {(currentAlbum !== null && currentTrack !== null
                ? albumsArray[currentAlbum]?.tracks[currentTrack].title
                : null) ?? "Not Playing"}
            </p>
            <p>
              {(currentAlbum !== null && currentTrack !== null
                ? albumsArray[currentAlbum]?.tracks[currentTrack].artist
                : null) ?? " -- "}
            </p>
          </div>
        </div>
      ) : (
        <MPlayerLyrics
          albumsArray={albumsArray}
          currentAlbum={currentAlbum}
          currentTrack={currentTrack}
          lyrics={lyrics}
          sync={sync}
          isDark={isDark}
          audioRef={audioRef}
        />
      )}
      <div>
        <MPlayerControls
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
          setSync={setSync}
          sync={sync}
          lyricsOpen={lyricsOpen}
          lyrics={lyrics}
        ></MPlayerControls>
      </div>
    </div>
  );
}

export default MPlayer;

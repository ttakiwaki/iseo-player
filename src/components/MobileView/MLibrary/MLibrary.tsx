import "./MLibrary.css";
import MLibraryHeader from "./MLibraryHeader/MLibraryHeader";
import MLibrarySearch from "./MLibrarySearch/MLibrarySearch";
import MAlbumTile from "./MAlbumTile/MAlbumTile";

import { useState } from "react";
import type { Album } from "../../../types/index";

interface MLibraryProps {
  isDark: boolean;
  albumsArray: Album[];
  setViewedAlbum: (value: number | null) => void;
  setAlbumsArray: (value: Album[]) => void;
  albumOpen: boolean;
  setAlbumOpen: (value: boolean) => void;
  playerOpen: boolean;
  currentAlbum: number | null;
  currentTrack: number | null;
  settingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
}

function MLibrary({
  isDark,
  albumsArray,
  setViewedAlbum,
  setAlbumsArray,
  albumOpen,
  setAlbumOpen,
  playerOpen,
  currentAlbum,
  currentTrack,
  settingsOpen,
  setSettingsOpen,
}: MLibraryProps) {
  const [search, setSearch] = useState("");
  const filteredAlbums = albumsArray.filter((album) =>
    album.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mlibrary">
      <MLibraryHeader
        isDark={isDark}
        setAlbumsArray={setAlbumsArray}
        albumsArray={albumsArray}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      ></MLibraryHeader>
      <MLibrarySearch setSearch={setSearch}></MLibrarySearch>
      <div
        className={
          currentAlbum !== null && currentTrack !== null
            ? "mlibrary-grid taller"
            : "mlibrary-grid"
        }
      >
        {filteredAlbums.map((album) => {
          const originalIndex = albumsArray.findIndex((a) => a === album);
          return (
            <MAlbumTile
              key={album.cover ?? `${album.title}-${album.artist}`}
              album={album}
              originalIndex={originalIndex}
              setViewedAlbum={setViewedAlbum}
              isDark={isDark}
              albumOpen={albumOpen}
              setAlbumOpen={setAlbumOpen}
              playerOpen={playerOpen}
            ></MAlbumTile>
          );
        })}
      </div>
    </div>
  );
}

export default MLibrary;

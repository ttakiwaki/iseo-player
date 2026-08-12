import "./LibraryMain.css";
import type { Album } from "../../../types/index";
import { useState } from "react";
import AlbumTile from "./AlbumTile/AlbumTile";
import LibrarySearch from "./LibrarySearch/LibrarySearch";

interface LibraryMainProps {
  albumsArray: Album[];
  setViewedAlbum: (value: number | null) => void;
  isDark: boolean;
}

function LibraryMain({
  albumsArray,
  setViewedAlbum,
  isDark,
}: LibraryMainProps) {
  const [search, setSearch] = useState("");
  const filteredAlbums = albumsArray.filter((album) =>
    album.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="library">
      <LibrarySearch setSearch={setSearch}></LibrarySearch>
      <div className="library-grid">
        {filteredAlbums.map((album) => {
          const originalIndex = albumsArray.findIndex((a) => a === album);
          return (
            <AlbumTile
              key={album.cover ?? `${album.title}-${album.artist}`}
              album={album}
              originalIndex={originalIndex}
              setViewedAlbum={setViewedAlbum}
              isDark={isDark}
            ></AlbumTile>
          );
        })}
      </div>
    </div>
  );
}

export default LibraryMain;

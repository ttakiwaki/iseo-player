import "./SidebarMain.css";
import Searchbar from "./Searchbar/Searchbar";
import Upload from "./UploadButton/UploadButton";
import Header from "./Header/Header";
import AlbumShelf from "./AlbumShelf/AlbumShelf";

import type { Album } from "../../types";
import { useState } from "react";

interface SidebarMainProps {
  currentTrack: number | null;
  currentAlbum: number | null;
  albumsArray: Album[];
  setTrack: (value: number | null) => void;
  setAlbum: (value: number | null) => void;
  setAlbumsArray: (value: Album[]) => void;
  isDark: boolean;
}

function SidebarMain({
  currentTrack,
  currentAlbum,
  albumsArray,
  setTrack,
  setAlbum,
  setAlbumsArray,
  isDark,
}: SidebarMainProps) {
  const [search, setSearch] = useState("");
  const filteredAlbums = albumsArray.filter((album) =>
    album.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="sidebar-main">
      <Header isDark={isDark}></Header>
      <Searchbar setSearch={setSearch}></Searchbar>
      <AlbumShelf
        currentTrack={currentTrack}
        currentAlbum={currentAlbum}
        setTrack={setTrack}
        setAlbum={setAlbum}
        filteredAlbums={filteredAlbums}
        isDark={isDark}
      ></AlbumShelf>
      <Upload
        albumsArray={albumsArray}
        setAlbumsArray={setAlbumsArray}
      ></Upload>
    </div>
  );
}

export default SidebarMain;

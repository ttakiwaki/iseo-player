import "./NavigationMain.css";
import NavHeader from "./NavHeader/NavHeader";
import TabCards from "./TabCards/TabCards";
import UploadArea from "./UploadArea/UploadArea";
import AlbumInfo from "./AlbumInfo/AlbumInfo";

import type { Album, Track } from "../../../types/index";
import { useState } from "react";

interface NavigationMainProps {
  setAlbumsArray: (value: Album[]) => void;
  albumsArray: Album[];
  currentAlbum: number | null;
  currentTrack: number | null;
  setTrack: (value: number | null) => void;
  setAlbum: (value: number | null) => void;
  viewedAlbum: number | null;
  activeTab: string;
  setActiveTab: (value: string) => void;
  isDark: boolean;
  originalTracksRef: React.RefObject<Track[]>;
  setShuffling: (value: boolean) => void;
  shuffling: boolean;
}

function NavigationMain({
  setAlbumsArray,
  albumsArray,
  currentAlbum,
  currentTrack,
  setTrack,
  setAlbum,
  viewedAlbum,
  activeTab,
  setActiveTab,
  isDark,
  originalTracksRef,
  setShuffling,
  shuffling,
}: NavigationMainProps) {
  const [navCollapsed, setNavCollapsed] = useState<boolean>(false);

  return (
    <div className="navBody">
      <NavHeader
        navCollapsed={navCollapsed}
        setNavCollapsed={setNavCollapsed}
        isDark={isDark}
      ></NavHeader>
      <TabCards
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navCollapsed={navCollapsed}
      ></TabCards>
      <AlbumInfo
        currentAlbum={currentAlbum}
        albumsArray={albumsArray}
        currentTrack={currentTrack}
        setTrack={setTrack}
        setAlbum={setAlbum}
        viewedAlbum={viewedAlbum}
        originalTracksRef={originalTracksRef}
        navCollapsed={navCollapsed}
        isDark={isDark}
        setShuffling={setShuffling}
        shuffling={shuffling}
      ></AlbumInfo>
      <UploadArea
        setAlbumsArray={setAlbumsArray}
        albumsArray={albumsArray}
        navCollapsed={navCollapsed}
      ></UploadArea>
    </div>
  );
}

export default NavigationMain;

import type { Album } from "../../../types";
import AlbumCard from "../AlbumCard/AlbumCard";
import "./AlbumShelf.css";

interface AlbumShelfProps {
  currentTrack: number | null;
  currentAlbum: number | null;
  setTrack: (value: number | null) => void;
  setAlbum: (value: number | null) => void;
  filteredAlbums: Album[];
}

function AlbumShelf({
  currentTrack,
  currentAlbum,
  setTrack,
  setAlbum,
  filteredAlbums,
}: AlbumShelfProps) {
  return (
    <div className="albumshelf">
      {filteredAlbums.map((album, index) => (
        <AlbumCard
          key={index}
          {...album}
          setTrack={setTrack}
          setAlbum={setAlbum}
          albumIndex={index}
          currentTrack={currentTrack}
          currentAlbum={currentAlbum}
        ></AlbumCard>
      ))}
    </div>
  );
}

export default AlbumShelf;

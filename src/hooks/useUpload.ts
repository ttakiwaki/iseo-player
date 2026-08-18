import type { Album } from "../types/index";
import { parseBlob } from "music-metadata";

interface useUploadProps {
  setAlbumsArray: (value: Album[]) => void;
  albumsArray: Album[];
}

function useUpload({ setAlbumsArray, albumsArray }: useUploadProps) {
  const VALID_AUDIO_EXTENSIONS = [
    ".mp3",
    ".flac",
    ".wav",
    ".m4a",
    ".ogg",
    ".aac",
    ".opus",
  ];

  function isAudioFile(filename: string): boolean {
    return VALID_AUDIO_EXTENSIONS.some((ext) =>
      filename.toLowerCase().endsWith(ext),
    );
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const albumShipping: { [key: string]: Album } = {}; // Package all Albums
    const files = e.target.files;
    if (!files) return; // Return early if no files exist. Need this line to fix Array.from(files)
    const hasSubfolders = Array.from(files).some((file) => {
      const segments = file.webkitRelativePath.split("/");
      if (segments.length > 2) {
        return true;
      }
    });
    if (hasSubfolders) {
      for (const file of files) {
        const segments = file.webkitRelativePath.split("/");
        const albumName: string = segments[1];
        if (!albumShipping[albumName]) {
          albumShipping[albumName] = {
            title: albumName,
            cover: null,
            tracks: [],
            artist: "Unknown Artist",
          };
        }
        if (isAudioFile(file.name)) {
          let title = file.name;
          let artist = "Unknown Artist";
          let album = "Unknown Album";
          let trackNumber = undefined;
          let metaDuration = undefined;
          let cover = undefined;
          let albumArtist = undefined;
          let albumMBID = undefined;

          try {
            const metadata = await parseBlob(file);
            title = metadata.common.title ?? file.name;
            artist = metadata.common.artist ?? "Unknown Artist";
            album = metadata.common.album ?? "Unknown Album";
            trackNumber = metadata.common.track.no ?? undefined;
            metaDuration = metadata.format.duration ?? undefined;
            albumArtist = metadata.common.albumartist ?? undefined;
            albumMBID = metadata.common.musicbrainz_albumid ?? undefined;
            const pictures = metadata.common.picture;
            if (pictures && pictures.length > 0) {
              const blob = new Blob([pictures[0].data as unknown as BlobPart], {
                type: pictures[0].format,
              });
              cover = URL.createObjectURL(blob);
            }
          } catch (error) {
            console.error(error);
          }

          albumShipping[albumName].artist = albumArtist;
          albumShipping[albumName].tracks.push({
            title,
            url: URL.createObjectURL(file),
            artist,
            album,
            trackNumber,
            metaDuration,
            albumArtist,
            cover,
            albumMBID,
          });
        } else if (file.type.startsWith("image/")) {
          albumShipping[albumName].cover = URL.createObjectURL(file);
        }
      }
    } else {
      const firstFile = files[0].webkitRelativePath;
      const albumName = firstFile ? firstFile.split("/")[0] : "Unknown Album";
      for (const file of files) {
        if (!albumShipping[albumName]) {
          albumShipping[albumName] = {
            title: albumName,
            cover: null,
            tracks: [],
          };
        }
        if (isAudioFile(file.name)) {
          let title = file.name;
          let artist = "Unknown Artist";
          let album = "Unknown Album";
          let trackNumber = undefined;
          let metaDuration = undefined;
          let cover = undefined;
          let albumArtist = undefined;
          let albumMBID = undefined;

          try {
            const metadata = await parseBlob(file);
            title = metadata.common.title ?? file.name;
            artist = metadata.common.artist ?? "Unknown Artist";
            album = metadata.common.album ?? "Unknown Album";
            trackNumber = metadata.common.track.no ?? undefined;
            metaDuration = metadata.format.duration ?? undefined;
            albumArtist = metadata.common.albumartist ?? undefined;
            albumMBID = metadata.common.musicbrainz_albumid ?? undefined;
            const pictures = metadata.common.picture;
            if (pictures && pictures.length > 0) {
              const blob = new Blob([pictures[0].data as unknown as BlobPart], {
                type: pictures[0].format,
              });
              cover = URL.createObjectURL(blob);
            }
          } catch (error) {
            console.error(error);
          }

          albumShipping[albumName].artist = artist;
          albumShipping[albumName].tracks.push({
            title,
            url: URL.createObjectURL(file),
            artist,
            album,
            trackNumber,
            metaDuration,
            cover,
            albumArtist,
            albumMBID,
          });
        } else if (file.type.startsWith("image/")) {
          albumShipping[albumName].cover = URL.createObjectURL(file);
        }
      }
    }
    const validAlbums = Object.values(albumShipping).filter(
      (album) => album.tracks.length > 0,
    );

    for (const album of validAlbums) {
      album.tracks.sort((a, b) => (a.trackNumber ?? 0) - (b.trackNumber ?? 0));
    }
    setAlbumsArray([...albumsArray, ...validAlbums]);
  }
  return { handleUpload };
}

export default useUpload;

import "./MLibraryHeader.css";
import useUpload from "../../../../hooks/useUpload";
import iconlight from "../../../../assets/icons/icon-light.svg";
import icondark from "../../../../assets/icons/icon-dark.svg";

import { Settings, Upload } from "lucide-react";
import type { Album } from "../../../../types";

interface MLibraryHeaderProps {
  isDark: boolean;
  setAlbumsArray: (value: Album[]) => void;
  albumsArray: Album[];
  settingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
}

function MLibraryHeader({
  isDark,
  setAlbumsArray,
  albumsArray,
  settingsOpen,
  setSettingsOpen,
}: MLibraryHeaderProps) {
  const { handleUpload } = useUpload({ setAlbumsArray, albumsArray });

  return (
    <div className="mlib-header">
      <div className="mlib-top">
        <img src={isDark ? icondark : iconlight} className="mlib-icon" />
      </div>
      <div className="mlib-bottom">
        <h1>Library</h1>
        <div className="mlib-buttons">
          <button
            className="msettings-button"
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <Settings size={17}></Settings>
          </button>
          <label htmlFor="upload-button" className="mupload-button">
            <Upload size={17}></Upload>
            Upload
          </label>
          <input
            type="file"
            id="upload-button"
            {...{ webkitdirectory: "true" }}
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

export default MLibraryHeader;

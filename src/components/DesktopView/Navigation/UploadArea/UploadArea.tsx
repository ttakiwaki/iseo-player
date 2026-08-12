import "./UploadArea.css";
import useUpload from "../../../../hooks/useUpload";
import type { Album } from "../../../../types/index";
import { Upload } from "lucide-react";

interface UploadAreaProps {
  setAlbumsArray: (value: Album[]) => void;
  albumsArray: Album[];
  navCollapsed: boolean;
}

function UploadArea({
  setAlbumsArray,
  albumsArray,
  navCollapsed,
}: UploadAreaProps) {
  const { handleUpload } = useUpload({ setAlbumsArray, albumsArray });

  return (
    <div className="upload-area">
      <label htmlFor="upload-button" className="custom-upload">
        <Upload style={{ width: 20 }}></Upload>
        <span className={navCollapsed ? "hidden" : ""}>Upload Album</span>
      </label>
      <input
        type="file"
        id="upload-button"
        className="upload-button"
        {...{ webkitdirectory: "true" }}
        onChange={(e) => handleUpload(e)}
      />
    </div>
  );
}

export default UploadArea;

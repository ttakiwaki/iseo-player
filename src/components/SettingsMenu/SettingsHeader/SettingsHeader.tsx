import "./SettingsHeader.css";
import { X } from "lucide-react";

interface SettingsHeaderProps {
  settingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
}

function SettingsHeader({
  settingsOpen,
  setSettingsOpen,
}: SettingsHeaderProps) {
  return (
    <div className="settings-header">
      <h1 className="settings-title">Settings</h1>
      <button
        className="settings-exit-button"
        onClick={() => {
          setSettingsOpen(!settingsOpen);
        }}
      >
        <X></X>
      </button>
    </div>
  );
}

export default SettingsHeader;

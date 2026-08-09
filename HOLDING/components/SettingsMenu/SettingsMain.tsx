import Apperance from "./Apperance/Appearance";
import Personalize from "./Personalize/Personalize";
import SettingsHeader from "./SettingsHeader/SettingsHeader";
import "./SettingsMain.css";
import { useEffect } from "react";

interface SettingsMainProps {
  settingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
  vibranceEnabled: boolean;
  setVibranceEnabled: (value: boolean) => void;
  isDark: boolean;
  setDark: (value: boolean) => void;
  setUsername: (value: string) => void;
  rpcEnabled: boolean;
  setRpcEnabled: (value: boolean) => void;
}

function SettingsMain({
  settingsOpen,
  setSettingsOpen,
  vibranceEnabled,
  setVibranceEnabled,
  isDark,
  setDark,
  setUsername,
  rpcEnabled,
  setRpcEnabled,
}: SettingsMainProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "x") {
        event.preventDefault();
        if (settingsOpen) {
          setSettingsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [settingsOpen]);

  return (
    <div className="settings-body">
      <div className="settings-content">
        <SettingsHeader
          settingsOpen={settingsOpen}
          setSettingsOpen={setSettingsOpen}
        ></SettingsHeader>
        <Apperance
          vibranceEnabled={vibranceEnabled}
          setVibranceEnabled={setVibranceEnabled}
          isDark={isDark}
          setDark={setDark}
        ></Apperance>
        <Personalize
          setUsername={setUsername}
          rpcEnabled={rpcEnabled}
          setRpcEnabled={setRpcEnabled}
        ></Personalize>
      </div>
    </div>
  );
}

export default SettingsMain;

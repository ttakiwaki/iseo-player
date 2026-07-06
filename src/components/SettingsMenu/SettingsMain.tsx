import Apperance from "./Apperance/Appearance";
import SettingsHeader from "./SettingsHeader/SettingsHeader";
import "./SettingsMain.css";

interface SettingsMainProps {
  settingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
  vibranceEnabled: boolean;
  setVibranceEnabled: (value: boolean) => void;
  isDark: boolean;
  setDark: (value: boolean) => void;
}

function SettingsMain({
  settingsOpen,
  setSettingsOpen,
  vibranceEnabled,
  setVibranceEnabled,
  isDark,
  setDark,
}: SettingsMainProps) {
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
      </div>
    </div>
  );
}

export default SettingsMain;

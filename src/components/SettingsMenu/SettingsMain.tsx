import Apperance from "./Apperance/Appearance";
import Personalize from "./Personalize/Personalize";
import SettingsHeader from "./SettingsHeader/SettingsHeader";
import "./SettingsMain.css";

interface SettingsMainProps {
  settingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
  vibranceEnabled: boolean;
  setVibranceEnabled: (value: boolean) => void;
  isDark: boolean;
  setDark: (value: boolean) => void;
  setUsername: (value: string) => void;
}

function SettingsMain({
  settingsOpen,
  setSettingsOpen,
  vibranceEnabled,
  setVibranceEnabled,
  isDark,
  setDark,
  setUsername,
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
        <Personalize setUsername={setUsername}></Personalize>
      </div>
    </div>
  );
}

export default SettingsMain;

import "./MSettings.css";
import {
  Sun,
  Moon,
  PaintbrushIcon,
  SquareDashedText,
  ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import MSettingsSection from "./MSettingsSection/MSettingsSection";
import MSettingsRow from "./MSettingsRow/MSettingsRow";
import Toggle from "../../DesktopView/Settings/SettingsComponents/Toggle/Toggle";
import Input from "../../DesktopView/Settings/SettingsComponents/Input/Input";

interface MSettingsProps {
  isDark: boolean;
  setDark: (value: boolean) => void;
  vibranceEnabled: boolean;
  setVibranceEnabled: (value: boolean) => void;
  setSettingsOpen: (value: boolean) => void;
  settingsOpen: boolean;
}

function MSettings({
  isDark,
  setDark,
  vibranceEnabled,
  setVibranceEnabled,
  settingsOpen,
  setSettingsOpen,
}: MSettingsProps) {
  function validHex(hex: string): boolean {
    return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
  }

  const [customSelect, setCustomSelect] = useState("");

  useEffect(() => {
    if (customSelect === "None") {
      document.documentElement.style.removeProperty("--selectColor");
    } else if (validHex(customSelect)) {
      document.documentElement.style.setProperty("--selectColor", customSelect);
    }
  }, [customSelect]);

  return (
    <div className="msettings">
      <div className="malbum-info-header">
        <ChevronLeft
          className="close-settings"
          onClick={() => {
            setSettingsOpen(!settingsOpen);
          }}
        />
      </div>
      <MSettingsSection header="Appearance">
        <MSettingsRow
          icon={isDark ? <Sun></Sun> : <Moon></Moon>}
          title="Dark Mode"
          control={
            <Toggle
              value={isDark}
              onChange={setDark}
              id="darkToggle"
              store={true}
            ></Toggle>
          }
        ></MSettingsRow>
        <MSettingsRow
          icon={<PaintbrushIcon></PaintbrushIcon>}
          title="Vibrant Themes"
          control={
            <Toggle
              value={vibranceEnabled}
              onChange={setVibranceEnabled}
              id="vibrantToggle"
              store={true}
            ></Toggle>
          }
        ></MSettingsRow>
        <MSettingsRow
          icon={<SquareDashedText></SquareDashedText>}
          title="Select Color"
          control={
            <Input
              value={customSelect}
              onChange={setCustomSelect}
              id="inputSelect"
            ></Input>
          }
        ></MSettingsRow>
      </MSettingsSection>
    </div>
  );
}

export default MSettings;

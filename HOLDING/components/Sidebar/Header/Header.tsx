import "./Header.css";
import iconlight from "../../../assets/icons/icon-light.svg";
import icondark from "../../../assets/icons/icon-dark.svg";

interface HeaderProps {
  isDark: boolean;
  settingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
}

function Header({ isDark, settingsOpen, setSettingsOpen }: HeaderProps) {
  return (
    <div>
      <img
        onClick={() => {
          setSettingsOpen(!settingsOpen);
        }}
        src={isDark ? icondark : iconlight}
        alt="iseo logo"
        className="icon"
      />
    </div>
  );
}

export default Header;

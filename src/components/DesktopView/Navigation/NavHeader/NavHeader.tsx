import "./NavHeader.css";
import { PanelRightClose, PanelLeftClose } from "lucide-react";
import iconlight from "../../../../assets/icons/icon-light.svg";
import icondark from "../../../../assets/icons/icon-dark.svg";

interface NavHeaderProps {
  navCollapsed: boolean;
  setNavCollapsed: (value: boolean) => void;
  isDark: boolean;
}

function NavHeader({ navCollapsed, setNavCollapsed, isDark }: NavHeaderProps) {
  return (
    <div className={`nav-header ${navCollapsed ? "collapsed" : ""}`}>
      {!navCollapsed && (
        <img
          src={isDark ? icondark : iconlight}
          alt=""
          className="header-icon"
        />
      )}
      {navCollapsed ? (
        <PanelRightClose
          className="nav-collapsed-icon"
          onClick={() => {
            setNavCollapsed(!navCollapsed);
            document.documentElement.style.removeProperty("--tabWidth");
          }}
        />
      ) : (
        <PanelLeftClose
          className="nav-collapse-icon"
          onClick={() => {
            setNavCollapsed(!navCollapsed);
            document.documentElement.style.setProperty("--tabWidth", "5%");
          }}
        />
      )}
    </div>
  );
}

export default NavHeader;

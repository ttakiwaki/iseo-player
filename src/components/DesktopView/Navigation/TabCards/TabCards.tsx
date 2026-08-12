import "./TabCards.css";
import { Settings, GalleryVerticalEnd, Disc } from "lucide-react";

interface TabCardsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  navCollapsed: boolean;
}

function TabCards({ activeTab, setActiveTab, navCollapsed }: TabCardsProps) {
  return (
    <div className="tab-body">
      <div
        className={activeTab === "library" ? "tab-card active-tab" : "tab-card"}
        onClick={() => {
          setActiveTab("library");
        }}
      >
        <GalleryVerticalEnd></GalleryVerticalEnd>{" "}
        <span className={navCollapsed ? "hidden" : ""}>Library</span>
      </div>
      <div
        className={activeTab === "player" ? "tab-card active-tab" : "tab-card"}
        onClick={() => {
          setActiveTab("player");
        }}
      >
        <Disc></Disc>{" "}
        <span className={navCollapsed ? "hidden" : ""}>Player</span>
      </div>

      <div
        className={
          activeTab === "settings" ? "tab-card active-tab" : "tab-card"
        }
        onClick={() => {
          setActiveTab("settings");
        }}
      >
        <Settings></Settings>{" "}
        <span className={navCollapsed ? "hidden" : ""}>Settings</span>
      </div>
    </div>
  );
}

export default TabCards;

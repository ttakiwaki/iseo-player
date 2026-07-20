import {
  Paintbrush,
  RulerDimensionLine,
  SquareDashedText,
  MoonStar,
  Sun,
} from "lucide-react";
import { useEffect } from "react";
import "./Appearance.css";

interface AppearanceProps {
  vibranceEnabled: boolean;
  setVibranceEnabled: (value: boolean) => void;
  isDark: boolean;
  setDark: (value: boolean) => void;
}

function Apperance({
  vibranceEnabled,
  setVibranceEnabled,
  isDark,
  setDark,
}: AppearanceProps) {
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("vibranceEnabled", JSON.stringify(vibranceEnabled));
  }, [vibranceEnabled]);

  return (
    <div className="appearance">
      <h2>Appearance</h2>
      <div className="cards-row">
        {/* Dark / Light Settings */}
        <div className="settings-card">
          {isDark ? <MoonStar></MoonStar> : <Sun></Sun>}
          <p className="settings-card-title">Dark / Light Mode</p>
          <p className="settings-card-desc">
            Switches between light and dark mode. When Vibrant Themes is
            enabled, the color palette adapts to suit the selected mode.
          </p>
          <button
            className="settings-card-button"
            onClick={() => {
              document.documentElement.classList.toggle("dark");
              setDark(!isDark);
            }}
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        {/* Vibrance Settings */}
        <div className="settings-card">
          <Paintbrush></Paintbrush>
          <p className="settings-card-title">Vibrant Themes</p>
          <p className="settings-card-desc">
            Dynamically tints the library, player, and accent colors based on
            the currently playing album's artwork. Output theme is determined
            based on the original light / dark theme that is set. Requires
            embedded cover art or a folder image to take effect.
          </p>
          <button
            className="settings-card-button"
            onClick={() => {
              setVibranceEnabled(!vibranceEnabled);
            }}
          >
            {vibranceEnabled ? "Enabled" : "Disabled"}
          </button>
        </div>

        {/* Select Color Settings */}
        <div className="settings-card">
          <SquareDashedText></SquareDashedText>
          <p className="settings-card-title">Select Color</p>
          <p className="settings-card-desc">
            Customize the highlight color used for selections. This will
            overwrite all other select colors in the app.&nbsp;
            <strong>
              Default is <span className="color-example">#ff746c</span> when
              Vibrance is disabled.
            </strong>
            Please enter a hex code, or enter 'None' to remove the selected
            color.
          </p>
          <input
            className="settings-card-input"
            onChange={(e) => {
              const newColor = e.target.value.trim();
              if (newColor.toLowerCase() === "none") {
                document.documentElement.style.removeProperty("--selectColor");
              } else if (newColor.startsWith("#")) {
                document.documentElement.style.setProperty(
                  "--selectColor",
                  newColor,
                );
              } else {
                document.documentElement.style.setProperty(
                  "--selectColor",
                  "#" + newColor,
                );
              }
            }}
          ></input>
        </div>

        {/* Library Size Settings */}
        <div className="settings-card">
          <RulerDimensionLine></RulerDimensionLine>
          <p className="settings-card-title">Library Size</p>
          <p className="settings-card-desc">
            Adjusts the width of the library sidebar as a percentage of the
            screen. Useful for wider screens or if you prefer more room for the
            player. <strong>Default is 22%</strong>
          </p>
          <input
            className="settings-card-input"
            defaultValue={22}
            onChange={(e) => {
              if (e.target.value !== null) {
                document.documentElement.style.setProperty(
                  "--libWidth",
                  e.target.value + "%",
                );
              }
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Apperance;

/*onClick={() => {
          const sidebarWidth: string | null = window.prompt(
            "New Library Size? Answer in % (Default: 20%)",
          );
          if (sidebarWidth === null) return;
          else if (Number(sidebarWidth) < 2) {
            window.alert("Input must be > 2!");
          } else if (!isNaN(Number(sidebarWidth))) {
            const libSize = Number(sidebarWidth);
            document.documentElement.style.setProperty(
              "--libWidth",
              libSize + "%",
            );
          } else {
            window.alert("Input in integers only!");
          }
        }}*/

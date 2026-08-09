import "./SettingsSection.css";
import type { ReactNode } from "react";

interface settingsSection {
  header: string;
  children: ReactNode;
}

function SettingsSection({ header, children }: settingsSection) {
  return (
    <div className="settings-section">
      <p className="section-header">{header}</p>
      {children}
    </div>
  );
}

export default SettingsSection;

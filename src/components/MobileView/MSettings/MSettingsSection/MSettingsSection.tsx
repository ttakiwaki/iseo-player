import "./MSettingsSection.css";
import type { ReactNode } from "react";

interface settingsSection {
  header: string;
  children: ReactNode;
}

function MSettingsSection({ header, children }: settingsSection) {
  return (
    <div className="msettings-section">
      <p className="msection-header">{header}</p>
      {children}
    </div>
  );
}

export default MSettingsSection;

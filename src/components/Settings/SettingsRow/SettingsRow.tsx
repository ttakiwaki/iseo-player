import "./SettingsRow.css";
import type { settingsRow } from "../../../types";

function SettingsRow({ icon, title, description, control }: settingsRow) {
  return (
    <div className="settings-row">
      {icon}
      <div className="row-information">
        <p className="row-title">{title}</p>
        <span className="row-description">{description}</span>
      </div>
      {control}
    </div>
  );
}

export default SettingsRow;

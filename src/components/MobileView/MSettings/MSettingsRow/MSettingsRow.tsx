import "./MSettingsRow.css";
import type { settingsRow } from "../../../../types";

function MSettingsRow({ icon, title, control }: settingsRow) {
  return (
    <div className="msettings-row">
      {icon}
      <div className="mrow-information">
        <p className="mrow-title">{title}</p>
      </div>
      {control}
    </div>
  );
}

export default MSettingsRow;

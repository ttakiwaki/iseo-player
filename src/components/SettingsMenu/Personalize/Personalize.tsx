import { UserRound } from "lucide-react";
import "./Personalize.css";

interface PersonalizeProps {
  setUsername: (value: string) => void;
}

function Personalize({ setUsername }: PersonalizeProps) {
  return (
    <div className="personalize">
      <h2>Make ISEO Yours</h2>
      <div className="cards-row">
        {/* Name Settings */}
        <div className="settings-card">
          <UserRound></UserRound>
          <p className="settings-card-title">Edit your Name</p>
          <p className="settings-card-desc">
            Set your name to personalize your ISEO. Shown on the welcome screen
            when no music is playing.
          </p>
          <input
            className="settings-card-input"
            onChange={(e) => {
              setUsername(e.target.value);
              localStorage.setItem("username", e.target.value);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Personalize;

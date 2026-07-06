import "./Welcome.css";
import { Settings } from "lucide-react";
import { useMemo } from "react";

interface WelcomeProps {
  username: string;
}

function Welcome({ username }: WelcomeProps) {
  const welcomeMessages = [
    [`Welcome back, ${username}.`, `Ready to play something good?`],
    [`Good to see you again, ${username}.`, `What are we putting on today?`],
    [`${username}, your library's been waiting.`, `What are we listening to?`],
    [`Back again, ${username}?`, `Let's pick up where you left off.`],
    [`Ready to listen, ${username}?`, `Your music is right where you left it.`],
  ];

  const [line1, line2] = useMemo(() => {
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  }, [username]);
  if (username) {
    return (
      <div className="welcome-area">
        <h2 className="welcome-message">
          {line1} <br /> {line2}
        </h2>
        <hr style={{ width: 1000 }}></hr>
        <h3 className="version-title">What's new in Aria (Version 3) </h3>
        <p className="whats-new">
          ✦ <strong>Lyrics</strong> — Synced and plain lyrics via LRCLib <br />✦{" "}
          <strong>Vibrant Themes</strong> — Colors that shift with your album
          art
          <br />✦ <strong>Settings</strong> — Persistent preferences, now saved
          across sessions
        </p>
        <div className="settings-info">
          <Settings></Settings>
          <p>Press the ISEO icon to open the settings menu</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="welcome-area">
        <h2 className="welcome-message">
          Welcome to ISEO, <br />
          Upload your music folder to get started
        </h2>
        <hr style={{ width: 1000 }}></hr>
        <h3 className="version-title">What's new in Aria (Version 3) </h3>
        <p className="whats-new">
          ✦ <strong>Lyrics</strong> — Synced and plain lyrics via LRCLib <br />✦{" "}
          <strong>Vibrant Themes</strong> — Colors that shift with your album
          art
          <br />✦ <strong>Settings</strong> — Persistent preferences, now saved
          across sessions
        </p>
        <div className="settings-info">
          <Settings></Settings>
          <p>Press the ISEO icon to open the settings menu</p>
        </div>
      </div>
    );
  }
}

export default Welcome;

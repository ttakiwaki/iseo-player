import "./Welcome.css";
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
        <h3 className="version-title">What's new in Cadenza (Version 4) </h3>
        <p className="whats-new">
          ✦ <strong>ISEO UI Overhaul</strong> — The entire UI for ISEO has been
          redone, with the addition of some new features! <br />✦{" "}
          <strong>Discord Rich Presence</strong> — Show off what your playing on
          Discord <br />
        </p>
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
        <h3 className="version-title">What's new in Cadenza (Version 4) </h3>
        <p className="whats-new">
          ✦ <strong>ISEO UI Overhaul</strong> — The entire UI for ISEO has been
          redone, with the addition of some new features! <br />✦{" "}
          <strong>Discord Rich Presence</strong> — Show off what you're
          listening to on iseo using Discord's Rich Presence. <br />
        </p>
      </div>
    );
  }
}

export default Welcome;

import "./Header.css";

interface HeaderProps {
  isDark: boolean;
}

function Header({ isDark }: HeaderProps) {
  return (
    <div>
      <img
        onClick={() => {
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
        }}
        src={
          isDark
            ? "src/assets/icons/icon-dark.svg"
            : "src/assets/icons/icon-light.svg"
        }
        alt="iseo logo"
        className="icon"
      />
    </div>
  );
}

export default Header;

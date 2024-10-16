import styles from "../../App.module.css";
import logo from "../../assets/logo.svg";
import NavButton from "./NavButton";
import { globalStore } from "../../store/global-store";
import { usePlaylistActions } from "../..//features/Playlist/store/usePlaylistActions";

type NavProps = {
  children: React.ReactNode;
};

export const Nav: React.FC<NavProps> = ({ children }) => {
  const { createPlaylist } = usePlaylistActions();
  const navButtons = globalStore.useStore((state) => state.navItems);

  const handleTabChange = (tab: number) => {
    globalStore.setState({
      ...globalStore.getState(),
      selectedTab: tab,
      selectedPlaylistId: navButtons[tab].id,
    });
  };

  return (
    <>
      <main className={styles.app}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <nav>
          <ul className={styles.menu}>
            {navButtons.map((button) => {
              if (button.tab === -1) {
                return (
                  <li
                    key={"createPlayListKey"}
                    style={{
                      color: "white",
                    }}
                  >
                    <NavButton
                      name={"Create Playlist"}
                      tab={-1}
                      handleTabChange={createPlaylist}
                    />
                  </li>
                );
              } else {
                return (
                  <li key={button.id}>
                    <NavButton
                      name={button.name}
                      tab={button.tab}
                      handleTabChange={handleTabChange}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </nav>
        <div
          style={{
            maxWidth: "400px",
          }}
        >
          {children}
        </div>
      </main>
    </>
  );
};

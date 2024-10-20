import styles from "../../App.module.css";
import logo from "../../assets/logo.svg";
import NavButton from "./NavButton";
import { globalStore } from "../../store/global-store";
import { usePlaylistActions } from "../..//features/Playlist/store/usePlaylistActions";
import Button from "../Button/Button";

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <img src={logo} className={styles.logo} alt="Logo" />
          <Button
            title={"Create playlist"}
            label={"Create playlist"}
            onClick={createPlaylist}
          />
        </div>
        <nav>
          <ul className={styles.menu}>
            {navButtons.map((button) => {
              return (
                <li key={button.id}>
                  <NavButton
                    name={button.name}
                    tab={button.tab}
                    handleTabChange={handleTabChange}
                  />
                </li>
              );
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

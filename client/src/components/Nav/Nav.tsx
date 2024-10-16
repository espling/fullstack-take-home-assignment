import styles from "../../App.module.css";
import logo from "../../assets/logo.svg";
import { v4 as uuidv4 } from "uuid";
import NavButton from "./NavButton";
import { globalStore, type NavItems, navItems } from "../../store/global-store";
import { playListStore } from "../../features/Playlist/store/playlist-store";
import { PlayList } from "@/features/Playlist/types/playlist";

type NavProps = {
  children: React.ReactNode;
};

export const Nav: React.FC<NavProps> = ({ children }) => {
  const navButtons = globalStore.useStore((state) => state.navItems);
  const handleTabChange = (tab: number) => {
    globalStore.setState({
      ...globalStore.getState(),
      selectedTab: tab,
      selectedPlaylistId: navButtons[tab].id,
    });
  };
  const playLists = playListStore.getState().playLists;

  const createPlaylist = () => {
    const newPlaylist = {
      id: uuidv4(),
      name: `New Playlist ${playLists.length + 1}`,
      tracks: [],
    };

    playLists.push(newPlaylist);

    const playlistNavItems = playLists.map((item: PlayList, idx) => {
      const navItem: NavItems = {
        id: item.id,
        name: item.name,
        tab: 2 + idx, // 2 is the index of the first 2 playlist tab
      };
      return navItem;
    });

    playListStore.setState({
      ...playListStore.getState(),
      playLists: playLists,
    });
    const newTabIdx = navItems.length;
    globalStore.setState({
      ...globalStore.getState(),
      navItems: navItems.concat(playlistNavItems),
      selectedTab: newTabIdx,
      selectedPlaylistId: newPlaylist.id,
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

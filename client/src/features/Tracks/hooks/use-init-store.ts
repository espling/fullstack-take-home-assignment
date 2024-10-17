import { LocalStorage } from "../../../utils/local-storage.ts";
import { playListStore } from "../../Playlist/store/playlist-store.ts";
import { PlayList, PlayLists } from "../../Playlist/types/playlist.ts";
import { useEffect } from "react";
import {
  globalStore,
  navItems,
  NavItems,
} from "../../../store/global-store.ts";

export function useInitStore() {
  const playLists = LocalStorage.getItem<PlayLists>("__playlists__");

  useEffect(() => {
    if (playLists) {
      if (playListStore.getState().playLists.length === 0) {
        const playlistNavItems = playLists.playLists.map(
          (item: PlayList, idx) => {
            const navItem: NavItems = {
              id: item.id,
              name: item.name,
              tab: 2 + idx, // 2 is the index of the first 2 playlist tab
            };
            return navItem;
          }
        );

        playListStore.setState({
          playLists: playLists.playLists,
          storageKey: "__playlists__",
        });
        globalStore.setState({
          ...globalStore.getState(),
          navItems: navItems.concat(playlistNavItems),
          selectedTab: 0,
          selectedPlaylistId: null,
        });
      }
    }
  }, [playLists]);
}

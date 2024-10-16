import { useCallback } from "react";
import { globalStore, NavItems } from "../../../store/global-store";
import { playListStore } from "../store/playlist-store";
import { Tracks } from "../../../features/Tracks/components/Tracks";
import { PlayList } from "../types/playlist";

export const PlayListPage: React.FC = () => {
  const playListId = globalStore.useStore((state) => state.selectedPlaylistId);
  const list = playListStore.useStore(
    (state) => state.playLists.filter((list) => list.id === playListId)[0]
  );

  const deleteList = useCallback(() => {
    const playLists = playListStore.getState().playLists;
    const newPlayList = playLists.filter((list) => list.id !== playListId);
    playListStore.setState({
      ...playListStore.getState(),
      playLists: newPlayList,
    });

    //     if (playListId === globalStore.getState().selectedPlaylistId) {
    //       globalStore.setState({
    //         ...globalStore.getState(),
    //         selectedPlaylistId: "",
    // }
// console.log('newPlayList', newPlayList)
    const playlistNavItems = newPlayList.map((item: PlayList, idx) => {
      const navItem: NavItems = {
        id: item.id,
        name: item.name,
        tab: 2 + idx, // 2 is the index of the first 2 playlist tab
      };
      return navItem;
    });

    globalStore.setState({
      ...globalStore.getState(),
      selectedTab: 0,
      selectedPlaylistId: "",
      navItems: playlistNavItems,
    });
  }, [playListId]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <div>
          <button onClick={deleteList}>Delete playlist</button>
        </div>
      </div>
      <Tracks tracks={list.tracks ?? []} />
    </>
  );
};

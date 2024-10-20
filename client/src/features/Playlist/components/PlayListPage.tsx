import { useCallback } from "react";
import { globalStore, navItems, NavItems } from "../../../store/global-store";
import { playListStore } from "../store/playlist-store";
import { Tracks } from "../../../features/Tracks/components/Tracks";
import { PlayList } from "../types/playlist";
import Button from "../../../components/Button/Button";

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

    const playlistNavItems = newPlayList.map((item: PlayList, idx) => {
      const navItem: NavItems = {
        id: item.id,
        name: item.name,
        tab: idx + 1,
      };
      return navItem;
    });

    globalStore.setState({
      ...globalStore.getState(),
      selectedTab: 0,
      selectedPlaylistId: "",
      navItems: navItems.concat(playlistNavItems),
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
          <Button
            onClick={deleteList}
            title="Delete playlist"
            label={"Delete playlist"}
          >
            Delete playlist
          </Button>
        </div>
      </div>
      <Tracks tracks={list?.tracks ?? []} />
    </>
  );
};

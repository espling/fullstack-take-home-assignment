import { useCallback } from "react";
import { playListStore } from "./playlist-store";
import { globalStore, NavItems, navItems } from "../../../store/global-store";
import { Track } from "../../Tracks/types/track";
import { PlayList } from "../types/playlist";
import { v4 as uuidv4 } from "uuid";

export const usePlaylistActions = () => {
  const deleteTrackFromPlaylist = useCallback((track: Track) => {
    const selectedPlaylistId = globalStore.getState().selectedPlaylistId;
    const playLists = playListStore.getState().playLists;
    const newPlayList = playLists.map((list) => {
      if (list.id === selectedPlaylistId) {
        return {
          ...list,
          tracks: list.tracks?.filter((t) => t.id !== track.id),
        };
      }
      return list;
    });

    playListStore.setState({
      ...playListStore.getState(),
      playLists: newPlayList,
    });
  }, []);

  const updateTrack = useCallback((track: Track) => {
    globalStore.setState({
      ...globalStore.getState(),
      selectedSong: track,
    });
  }, []);

  const openPlaylistModal = useCallback((track: Track) => {
    globalStore.setState({
      ...globalStore.getState(),
      selectedTrackToAdd: track,
      selectedPlaylistId: null,
    });

    globalStore.setState({
      ...globalStore.getState(),
      showPlaylistModal: true,
      selectedPlaylistId: null,
    });
  }, []);

  const createPlaylist = () => {
    const playLists = playListStore.getState().playLists;
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

  return {
    deleteTrackFromPlaylist,
    updateTrack,
    openPlaylistModal,
    createPlaylist,
  };
};

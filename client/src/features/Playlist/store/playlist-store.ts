import store from "../../../store/store";
import { LocalStorage } from "../../../utils/local-storage.ts";
import { PlayList } from "../../../features/Playlist/types/playlist";
import { PlayLists } from "../types/playlist";

export const playListStore = store<PlayLists>({
  playLists: [], //LocalStorage.getItem<PlayList[]>("__playlists__") ?? [],
  storageKey: "__playlists__",
});

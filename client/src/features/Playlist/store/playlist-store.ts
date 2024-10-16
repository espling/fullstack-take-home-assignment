import store from "../../../store/store";

import { PlayLists } from "../types/playlist";

export const playListStore = store<PlayLists>({
  playLists: [],
  storageKey: null,
});

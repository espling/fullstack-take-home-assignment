import { Track } from "../../../features/Tracks/types/track";

export type PlayList = {
  id: string;
  name: string;
  tracks: Track[];
};

export type PlayLists = {
  playLists: PlayList[];
  storageKey: string | null;
};

import { Track } from "@/features/Tracks/types/track";
import store from "./store";

export type GlobalStore = {
  selectedTab: number;
  selectedPlaylistId: string | null;
  selectedSong: Track | null;
  storageKey: string | null;
};

export type GlobalStoreNoKey = Omit<GlobalStore, "storageKey">;

export const globalStore = store({
  selectedTab: 0,
  selectedPlaylistId: null,
  selectedSong: null,
  storageKey: null,
} as GlobalStore);

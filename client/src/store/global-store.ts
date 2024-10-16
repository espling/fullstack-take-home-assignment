import { Track } from "@/features/Tracks/types/track";
import store from "./store";

export type GlobalStore = {
  selectedTab: number;
  selectedPlaylistId: string | null;
  selectedSong: Track | null;
  selectedTrackToAdd: Track | null;
  storageKey: string | null;
  showPlaylistModal?: boolean;
  navItems: NavItems[];
};

export type NavItems = {
  id: string;
  name: string;
  tab: number;
};

export const navItems: NavItems[] = [
  {
    id: "0",
    name: "Tracks",
    tab: 0,
  },
  {
    id: "1",
    name: "Create Playlist",
    tab: -1,
  },
];

export type GlobalStoreNoKey = Omit<GlobalStore, "storageKey">;

export const globalStore = store({
  selectedTab: 0,
  selectedPlaylistId: null,
  selectedSong: null,
  selectedTrackToAdd: null,
  storageKey: null,
  showPlaylistModal: false,
  navItems,
} as GlobalStore);

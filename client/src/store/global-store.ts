import { Track } from "@/features/Tracks/types/track";
import store from "./store";

export type GlobalStore = {
  selectedTab: number;
  selectedPlaylistId: string | null;
  selectedSong: Track | null;
  isPlaying: boolean;
  selectedTrackToAdd: Track | null;
  storageKey: string | null;
  showPlaylistModal?: boolean;
  audioRef?: React.RefObject<HTMLAudioElement>;
  dialogRef?: React.RefObject<HTMLDialogElement>;
  showCreatePlaylistModal?: boolean;
  showDeletePlaylistModal?: boolean;
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
];

export type GlobalStoreNoKey = Omit<GlobalStore, "storageKey">;

export const globalStore = store({
  selectedTab: 0,
  selectedPlaylistId: null,
  selectedSong: null,
  isPlaying: false,
  selectedTrackToAdd: null,
  storageKey: null,
  showPlaylistModal: false,
  showCreatePlaylistModal: false,
  showDeletePlaylistModal: false,
  navItems,
} as GlobalStore);
